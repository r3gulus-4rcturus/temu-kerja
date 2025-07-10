"use server";

import { prisma } from "../prisma";
import { getCurrentUser } from "../auth";
import { revalidatePath } from "next/cache";

/**
 * Handles a seeker's interest in a job.
 * If an application from the provider is already pending, it updates it to 'onnegotiation' and creates a chat.
 * Otherwise, it finds the seeker's base application, links it to the job, and sets the status to 'sent'.
 * @param jobId The ID of the job the seeker is interested in.
 */
export async function handleSeekerInterest(jobId: string) {
  const seeker = await getCurrentUser();
  if (!seeker || seeker.role !== 'jobseeker') {
    return { success: false, message: "Unauthorized: Not a seeker." };
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { success: false, message: "Job not found." };
  }

  // Check if an application from this seeker for this job already exists (e.g., a 'pending' one from the provider)
  const existingApplication = await prisma.application.findFirst({
    where: {
      jobId: jobId,
      seekerId: seeker.id,
    },
  });

  if (existingApplication) {
    // Case 1: Application exists. Seeker is "matching" the provider's interest.
    try {
      const updatedApplication = await prisma.application.update({
        where: { id: existingApplication.id },
        data: { status: 'onnegotiation' },
      });

      // Create a new Chat entry
      await prisma.chat.create({
        data: {
          participants: {
            connect: [
              { id: seeker.id },
              { id: job.providerId }, // Connect with the job's provider
            ],
          },
          job: {
            connect: { id: jobId },
          },
          application: {
            connect: { id: updatedApplication.id },
          },
        },
      });

      revalidatePath('/seeker-dashboard');
      return { success: true, message: "Match! Negotiation started and chat created." };
    } catch (error) {
      console.error("Error starting negotiation:", error);
      return { success: false, message: "Failed to start negotiation." };
    }
  } else {
    // Case 2: No application exists. Seeker is initiating the interest.
    try {
      // Find the seeker's base application (one that is not yet assigned to a job)
      const baseApplication = await prisma.application.findFirst({
        where: {
          seekerId: seeker.id,
          jobId: null,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      if (!baseApplication) {
        return { success: false, message: "Could not find a base application for this user. Please complete your profile." };
      }

      // Update the base application to link it to this job and set status to 'sent'
      await prisma.application.update({
        where: { id: baseApplication.id },
        data: {
          jobId: jobId,
          status: 'sent',
        },
      });

      revalidatePath('/seeker-dashboard');
      return { success: true, message: "Application sent successfully!" };
    } catch (error) {
      console.error("Error sending application:", error);
      return { success: false, message: "Failed to send application." };
    }
  }
}
