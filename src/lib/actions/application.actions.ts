"use server";

import { prisma } from "../prisma";
import { Application, Job, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Define a more detailed type for our application data
export type FullApplication = Application & {
  job: Job;       // Include the job details
  seeker: User;   // Include the applicant's details
};

/**
 * Fetches all pending applications for all jobs created by a specific user.
 * @param providerId - The ID of the job provider (the current user).
 * @returns A promise that resolves to an array of full application details.
 */
export async function getPendingApplicationsForProvider(providerId: string): Promise<FullApplication[]> {
  try {
    if (!providerId) return [];

    const applications = await prisma.application.findMany({
      where: {
        // Find applications where the related job's providerId matches the current user
        job: {
          providerId: providerId,
        },
        // Only fetch applications with a 'pending' status
        status: 'pending',
      },
      include: {
        job: true,    // Include the full Job object
        seeker: true, // Include the full User object of the applicant
      },
      orderBy: {
        createdAt: 'asc', // Show the oldest applications first
      },
    });

    console.log(applications)

    return applications;
  } catch (error) {
    console.error("Failed to fetch pending applications:", error);
    return [];
  }
}

/**
 * Updates the status of a specific application to 'accepted'.
 * @param applicationId - The ID of the application to accept.
 * @returns An object indicating success or failure.
 */
export async function acceptApplication(applicationId: string) {
  try {
    if (!applicationId) {
      throw new Error("Application ID is required.");
    }

    // First, update the application and retrieve its details, including the jobId.
    const application = await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        status: 'accepted',
      },
    });

    // If the application isn't linked to a job, we can't proceed.
    if (!application.jobId) {
      throw new Error("Application is not associated with a job.");
    }

    // Now, update the related job's status to 'closed' using its unique ID.
    await prisma.job.update({
      where: {
        id: application.jobId,
      },
      data: {
        status: 'closed',
      },
    });

    // Revalidate the dashboard path to refresh the data after an update
    revalidatePath("/dashboard");

    return { success: true, message: "Application accepted." };
  } catch (error) {
    console.error("Failed to accept application:", error);
    return { success: false, message: "An error occurred." };
  }
}
