import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { pusherServer } from "../../../../lib/pusher";
import { UserRole } from "@prisma/client";

/**
 * Handles one side of a negotiation agreement.
 * Updates the user's status in the negotiation to 'agreed'.
 * If both parties have agreed, it finalizes the deal by updating the job and application statuses,
 * and cleans up any other pending applications for the job.
 *
 * @param {NextRequest} req - The incoming request.
 * @returns {NextResponse} A success message or an error.
 */
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chatId } = await req.json();
    if (!chatId) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    }

    // Find the parent chat to get the negotiationChatId and related model IDs
    const parentChat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { negotiationChat: true, jobApplication: true },
    });

    if (!parentChat || !parentChat.negotiationChat || !parentChat.jobApplicationId) {
      return NextResponse.json({ error: "Negotiation session not found" }, { status: 404 });
    }

    const negotiationChatId = parentChat.negotiationChat.id;

    // Determine which status field to update based on the user's role
    const statusFieldToUpdate =
      currentUser.role === UserRole.jobprovider
        ? "providerStatus"
        : "seekerStatus";

    // Update the user's status to 'agreed'
    const updatedNegotiationChat = await prisma.negotiationChat.update({
      where: { id: negotiationChatId },
      data: {
        [statusFieldToUpdate]: "agreed",
      },
    });

    const channelName = `private-negotiation-${negotiationChatId}`;

    // Check if both parties have now agreed
    if (
      updatedNegotiationChat.providerStatus === "agreed" &&
      updatedNegotiationChat.seekerStatus === "agreed"
    ) {
      // --- FINAL AGREEMENT & CLEANUP ---
      const jobId = parentChat.jobId;
      const acceptedJobApplicationId = parentChat.jobApplicationId;

      await prisma.$transaction(async (tx) => {
        // 1. Update the accepted JobApplication status
        await tx.jobApplication.update({
          where: { id: acceptedJobApplicationId },
          data: { status: "accepted" },
        });

        // 2. Update the job status to 'closed'
        await tx.job.update({
          where: { id: jobId },
          data: { status: "closed" },
        });

        // 3. Find all other job applications for this job to be deleted
        const applicationsToDelete = await tx.jobApplication.findMany({
          where: {
            jobId: jobId,
            id: { not: acceptedJobApplicationId },
          },
          select: { id: true },
        });

        if (applicationsToDelete.length === 0) return; // No cleanup needed

        const applicationIdsToDelete = applicationsToDelete.map(app => app.id);

        // 4. Find all chats linked to the applications that will be deleted
        const chatsToDelete = await tx.chat.findMany({
          where: {
            jobApplicationId: { in: applicationIdsToDelete },
          },
          select: { id: true },
        });
        
        if (chatsToDelete.length > 0) {
            const chatIdsToDelete = chatsToDelete.map(chat => chat.id);

            // 5. Find negotiation chats to delete
            const negotiationChatsToDelete = await tx.negotiationChat.findMany({
                where: { chatId: { in: chatIdsToDelete } },
                select: { id: true },
            });
            const negotiationChatIdsToDelete = negotiationChatsToDelete.map(nc => nc.id);

            // 6. Delete all dependent records in order to avoid constraint violations
            if (negotiationChatIdsToDelete.length > 0) {
                await tx.negotiationMessage.deleteMany({
                    where: { negotiationChatId: { in: negotiationChatIdsToDelete } },
                });
            }
            await tx.negotiationChat.deleteMany({
                where: { id: { in: negotiationChatIdsToDelete } },
            });
            await tx.message.deleteMany({
                where: { chatId: { in: chatIdsToDelete } },
            });
            await tx.chat.deleteMany({
                where: { id: { in: chatIdsToDelete } },
            });
        }

        // 7. Finally, delete the now-obsolete job applications
        await tx.jobApplication.deleteMany({
          where: { id: { in: applicationIdsToDelete } },
        });
      });

      // Trigger Pusher event to notify both users of completion
      await pusherServer.trigger(channelName, "negotiation-complete", {
        message: "Deal! Cek Dashboard untuk melihat aktivitas!",
      });

    } else {
      // --- ONE PARTY AGREED ---
      // Notify the other user that this user has agreed
      await pusherServer.trigger(channelName, "status-updated", {
        updatedStatus: updatedNegotiationChat,
      });
    }

    return NextResponse.json({
      message: "Agreement status updated successfully.",
      negotiation: updatedNegotiationChat,
    });
  } catch (error) {
    console.error("Failed to update agreement status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
