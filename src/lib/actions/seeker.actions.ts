"use server";

import { prisma } from "../prisma";
import { getCurrentUser } from "../auth";
import { revalidatePath } from "next/cache";

/**
 * Handles a seeker's interest in a job by creating a new JobApplication entry.
 * @param jobId The ID of the job the seeker is interested in.
 */
export async function handleSeekerInterest(jobId: string) {
  // 1. Get the current user and validate their role.
  const seeker = await getCurrentUser();
  if (!seeker || seeker.role !== "jobseeker") {
    return { success: false, message: "Unauthorized: Not a seeker." };
  }

  // 2. Find the job to get its provider's ID.
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { providerId: true }, // We only need the providerId from the job.
  });

  if (!job) {
    return { success: false, message: "Job not found." };
  }

  // 3. Check if an application for this specific job from this seeker already exists.
  const existingJobApplication = await prisma.jobApplication.findFirst({
    where: {
      jobId: jobId,
      seekerId: seeker.id,
    },
  });

  if (existingJobApplication) {
    return { success: false, message: "You have already applied for this job." };
  }

  // 4. Create the new JobApplication with a 'sent' status.
  try {
    await prisma.jobApplication.create({
      data: {
        jobId: jobId,
        seekerId: seeker.id,
        providerId: job.providerId,
        status: "sent",
      },
    });

    // 5. Revalidate the path to ensure the UI updates.
    revalidatePath("/seeker-dashboard");

    return { success: true, message: "Lamaran berhasil dikirim!" };
  } catch (error) {
    console.error("Error creating JobApplication:", error);
    return { success: false, message: "Failed to send application." };
  }
}
