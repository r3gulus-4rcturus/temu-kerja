"use server";

import { prisma } from "../prisma";

/**
 * Defines the shape of the Worker data for the dashboard sections.
 */
export interface Worker {
  id: string;
  category: string;
  name: string;
  location: string;
  description: string;
  priceRange: string;
  image?: string | null;
}

/**
 * Fetches up to 100 applications from the database and maps them
 * to the Worker interface for display.
 * @returns {Promise<Worker[]>} A promise that resolves to an array of workers.
 */
export async function getWorkers(): Promise<Worker[]> {
  try {
    const applications = await prisma.application.findMany({
      take: 100,
      include: {
        seeker: {
          select: {
            fullname: true,
            city: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Map the fetched application data to the Worker structure
    const workers: Worker[] = applications.map((application) => ({
      id: application.id,
      category: application.tags.join(', ') || 'General',
      name: application.seeker.fullname,
      location: application.seeker.city,
      description: application.description,
      priceRange: `Rp ${application.minRate.toLocaleString('id-ID')} - Rp ${application.maxRate.toLocaleString('id-ID')}`,
      image: application.seeker.avatar,
    }));

    return workers;
  } catch (error) {
    console.error("Failed to fetch workers:", error);
    return [];
  }
}
