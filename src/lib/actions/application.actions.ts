"use server";

import { prisma } from "../prisma";
import { Application, Job, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";

// Define a more detailed type for our application data
export type FullApplication = Application & {
  job: Job;       // Include the job details
  seeker: User;   // Include the applicant's details
};

/**
 * Finds the first application for the current user, updates it to 'sent',
 * and links it to a specific job.
 * @param jobId - The ID of the job to apply for.
 * @returns An object indicating success or failure.
 */
export async function updateAndSendApplication(jobId: string) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new Error("User not authenticated.");
        }

        // Find the first application created by this user.
        // This assumes a user has at least one base application record created during registration.
        const userApplication = await prisma.application.findFirst({
            where: {
                seekerId: currentUser.id,
            },
            orderBy: {
                createdAt: 'asc', // Get the oldest one, assuming it's the initial one
            },
        });

        if (!userApplication) {
            // This case happens if the user was created without an initial application record.
            return { success: false, message: "No base application found for this user." };
        }

        // Update the found application to link it to the new job and set status to 'sent'
        await prisma.application.update({
            where: {
                id: userApplication.id,
            },
            data: {
                status: 'sent',
                jobId: jobId, 
            },
        });

        // Revalidate the path to update UI where sent applications are displayed
        revalidatePath('/seeker-dashboard');

        return { success: true, message: "Application sent successfully." };
    } catch (error) {
        console.error("Failed to send application:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, message: errorMessage };
    }
}


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
