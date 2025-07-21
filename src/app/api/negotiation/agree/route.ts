import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { pusherServer } from "../../../../lib/pusher";
import { UserRole } from "@prisma/client";

/**
 * Handles one side of a negotiation agreement.
 * Updates the user's status in the negotiation to 'agreed'.
 * If both parties have agreed, it finalizes the deal by updating the job and application statuses.
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

    // Find the parent chat to get the negotiationChatId
    const parentChat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: { negotiationChat: true },
    });

    if (!parentChat || !parentChat.negotiationChat) {
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
      // --- FINAL AGREEMENT ---
      // Update application status to 'accepted'
      await prisma.application.update({
        where: { id: parentChat.applicationId! },
        data: { status: "accepted" },
      });

      // Update job status to 'closed'
      await prisma.job.update({
        where: { id: parentChat.jobId! },
        data: { status: "closed" },
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
