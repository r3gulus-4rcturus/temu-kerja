"use server";

import { prisma } from "../prisma";
import { getCurrentUser } from "../auth";
import { revalidatePath } from "next/cache";
import { pusherServer } from "../pusher"; // Import the Pusher server instance

/**
 * Handles a job provider's interest in a seeker's application.
 * This action finds the corresponding 'sent' JobApplication from the seeker,
 * updates its status to 'onnegotiation', and creates a new chat session.
 * @param applicationId The ID of the base Application record displayed to the provider.
 */
export async function handleProviderInterest(applicationId: string) {
  // 1. Authenticate the provider
  const provider = await getCurrentUser();
  if (!provider || provider.role !== "jobprovider") {
    return { success: false, message: "Unauthorized: Not a provider." };
  }

  // 2. Find the base application to identify the seeker
  const baseApplication = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { seekerId: true },
  });

  if (!baseApplication) {
    return { success: false, message: "Base application profile not found." };
  }

  const { seekerId } = baseApplication;

  // 3. Find the specific "sent" JobApplication from this seeker to this provider.
  // This represents the seeker's interest that the provider is now matching.
  const jobApplicationToMatch = await prisma.jobApplication.findFirst({
    where: {
      seekerId: seekerId,
      providerId: provider.id,
      status: "sent",
    },
  });

  if (!jobApplicationToMatch) {
    return {
      success: false,
      message: "No pending application from this seeker found to match with.",
    };
  }

  try {
    // 4. Update the JobApplication status to onnegotiation
    const updatedJobApplication = await prisma.jobApplication.update({
      where: { id: jobApplicationToMatch.id },
      data: { status: "onnegotiation" },
    });

    // 5. Create a new Chat and connect it to the Job, Application, and both users.
    const newChat = await prisma.chat.create({
      data: {
        // Connect participants
        participants: {
          connect: [{ id: provider.id }, { id: seekerId }],
        },
        // Connect to the specific job from the matched application
        job: {
          connect: { id: updatedJobApplication.jobId },
        },
        // Connect to the new JobApplication via the 1-to-1 relation
        jobApplication: {
          connect: { id: updatedJobApplication.id },
        }
      },
      include: {
        participants: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    // 6. Create the associated NegotiationChat entry
    await prisma.negotiationChat.create({
      data: {
        chatId: newChat.id,
        participants: {
          connect: [{ id: provider.id }, { id: seekerId }],
        },
      },
    });

    // 7. Trigger a Pusher event to notify the seeker in real-time
    const seekerChannel = `private-user-${seekerId}`;
    await pusherServer.trigger(seekerChannel, "new-chat", newChat);

    // 8. Revalidate the dashboard path to update the UI
    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Match! Silahkan melanjutkan negosiasi di fitur chat.",
    };
  } catch (error) {
    console.error("Error starting negotiation:", error);
    return { success: false, message: "Failed to start negotiation." };
  }
}
