"use server";

import { prisma } from "../prisma";
import { Job } from "@prisma/client";

/**
 * Fetches all jobs for a specific provider.
 * @param providerId - The ID of the user who created the jobs.
 * @returns {Promise<Job[]>} A promise that resolves to an array of jobs.
 */
export async function getJobsByProvider(providerId: string): Promise<Job[]> {
  try {
    // Return an empty array if no provider ID is given
    if (!providerId) {
      return [];
    }

    // Fetch all jobs from the database where the providerId matches
    const jobs = await prisma.job.findMany({
      where: {
        providerId: providerId,
      },
      orderBy: {
        createdAt: 'desc', // Show the newest jobs first
      },
    });

    return jobs;
  } catch (error) {
    // Log the error and return an empty array on failure
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}
