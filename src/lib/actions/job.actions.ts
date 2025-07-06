"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

// Define the structure of the data expected by our action
interface CreateJobParams {
  title: string;
  description: string;
  categories: string[];
  location: string;
  minRate: number;
  providerId: string;
}

/**
 * Creates a new job listing in the database.
 * This is a server action and only runs on the server.
 * @param params - The job details.
 */
export async function createJob(params: CreateJobParams) {
  try {
    const { title, description, categories, location, minRate, providerId } = params;

    // Validate that the provider ID exists
    if (!providerId) {
      throw new Error("User is not authenticated.");
    }

    // Use Prisma to create the new job entry
    await prisma.job.create({
      data: {
        title,
        description,
        categories,
        location,
        minRate,
        providerId,
        // The 'status' field defaults to 'open' as defined in your schema
      },
    });

    // After creating the job, revalidate the dashboard path.
    // This tells Next.js to refresh the data on the dashboard page,
    // so the new job appears without a manual page reload.
    revalidatePath("/dashboard");

    return { success: true, message: "Job created successfully." };
  } catch (error) {
    console.error("Failed to create job:", error);
    // Return a structured error response
    return { success: false, message: "An error occurred while creating the job." };
  }
}
