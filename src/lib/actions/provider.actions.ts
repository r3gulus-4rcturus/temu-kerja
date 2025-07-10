"use server";

import { prisma } from "../prisma";
import { getCurrentUser } from "../auth";
import { revalidatePath } from "next/cache";

/**
 * Handles a job provider's interest in a seeker's application.
 * If the application is for a specific job from this provider, it moves it to negotiation and creates a chat.
 * Otherwise, it uses the seeker's first-ever application as a template to create new 'pending' applications for all of the provider's open jobs.
 * @param applicationId The ID of the application the provider is interested in.
 */
export async function handleProviderInterest(applicationId: string) {
  const provider = await getCurrentUser();
  if (!provider || provider.role !== 'jobprovider') {
    return { success: false, message: "Unauthorized: Not a provider." };
  }

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { job: true } // Include job to check its provider
  });

  if (!application) {
    return { success: false, message: "Application not found." };
  }

  // Case 1: The application is for a specific job owned by the current provider.
  // The provider is "matching" the seeker's application.
  if (application.job && application.job.providerId === provider.id) {
    try {
      // Update application status to onNegotiation
      await prisma.application.update({
        where: { id: applicationId },
        data: { status: 'onnegotiation' },
      });

      // Create a new Chat entry
      await prisma.chat.create({
        data: {
          participants: {
            connect: [
              { id: provider.id },
              { id: application.seekerId },
            ],
          },
          job: {
            connect: { id: application.jobId! },
          },
          application: {
            connect: { id: applicationId },
          },
        },
      });

      revalidatePath('/dashboard');
      return { success: true, message: "Negotiation started and chat created." };

    } catch (error) {
      console.error("Error starting negotiation:", error);
      return { success: false, message: "Failed to start negotiation." };
    }
  } else {
    // Case 2: The application is a general one, or for another provider's job.
    // The provider wants to offer their open jobs to this seeker.
    try {
      // Find the seeker's very first application to use as a template.
      const baseApplication = await prisma.application.findFirst({
        where: { seekerId: application.seekerId },
        orderBy: { createdAt: 'asc' },
      });

      if (!baseApplication) {
        return { success: false, message: "Could not find a base application for this seeker." };
      }

      const openJobs = await prisma.job.findMany({
        where: {
          providerId: provider.id,
          status: 'open',
        },
      });

      if (openJobs.length === 0) {
        return { success: false, message: "You have no open jobs to offer." };
      }

      // Update the seeker's base application to link it to the provider's job.
      await prisma.application.update({
        where: {
          id: baseApplication.id,
        },
        data: {
          additionalNotes: `Offered by ${provider.username}.`,
        },
      });

      // Loop through each of the provider's open jobs
      for (const job of openJobs) {
        // Update the job to connect it to the seeker's base application.
        // This does NOT create a new application record.
        await prisma.job.update({
          where: { 
            id: job.id 
          },
          data: {
            applications: {
              connect: {
                id: baseApplication.id,
              },
            },
          },
        });
      }

      revalidatePath('/dashboard');
      return { success: true, message: `Offered ${openJobs.length} job(s) to the applicant.` };

    } catch (error) {
      console.error("Error offering jobs:", error);
      return { success: false, message: "Failed to offer jobs." };
    }
  }
}
