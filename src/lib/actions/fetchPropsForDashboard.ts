"use server";

import { prisma } from "../prisma";
import { getCurrentUser } from "../auth";
import { Job, JobStatus, Application, User } from "@prisma/client";
import { unique } from "next/dist/build/utils";

// ---
// Type Definitions
// ---

// Defines the shape of the Order data for the dashboard
export interface Order {
  id: string;
  date: string;
  time: string;
  worker: string;
  tag: string;
  status: string;
  price: string;
  statusColor: string;
}

// Defines a more detailed type for our application data
export type FullApplication = Application & {
  job: Job;
  seeker: User;
};

export type ApplicantInfo = {
    id: string;
    fullname: string;
    location: string; // using city for location
    tags: string[];
    avatar: string | null;
};


// ---
// Internal Helper Functions
// ---

// Helper function to map status to a color
const getStatusColor = (status: JobStatus): string => {
  switch (status) {
    case 'completed':
      return 'gray';
    case 'inprogress':
      return 'green';
    case 'closed':
      return 'red';
    default:
      return 'gray';
  }
};

// Helper function to map status to a display name
const getStatusDisplayName = (status: JobStatus): string => {
  switch (status) {
    case 'completed':
      return 'Selesai';
    case 'inprogress':
      return 'Sedang Dikerjakan';
    case 'closed':
      return 'Belum Dimulai';
    default:
      return status;
  }
};


// ---
// Data Fetching Implementations
// ---

/**
 * Fetches and processes all non-open jobs for the current user.
 * @returns {Promise<Order[]>} A promise that resolves to an array of orders.
 */
export async function getOrdersForUser(): Promise<Order[]> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  const jobs = await prisma.job.findMany({
    where: {
      providerId: currentUser.id,
      status: { not: 'open' },
      applications: { some: { status: 'accepted' } },
    },
    include: {
      applications: {
        where: { status: 'accepted' },
        include: { seeker: { select: { fullname: true } } },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return jobs.map((job) => {
    const acceptedApplication = job.applications[0];
    return {
      id: job.id,
      date: new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }).format(job.dateTime),
      time: new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(job.dateTime),
      worker: acceptedApplication?.seeker?.fullname ?? 'N/A',
      tag: job.categories[0] || 'General',
      status: getStatusDisplayName(job.status),
      price: `Rp ${job.priceRate?.toLocaleString('id-ID') || 'N/A'}`,
      statusColor: getStatusColor(job.status),
    };
  });
}

/**
 * Fetches all jobs for a specific provider.
 * @param providerId - The ID of the user who created the jobs.
 * @returns {Promise<Job[]>} A promise that resolves to an array of jobs.
 */
export async function getJobsByProvider(providerId: string): Promise<Job[]> {
  try {
    if (!providerId) {
      return [];
    }
    return await prisma.job.findMany({
      where: { providerId: providerId },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
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
 * Fetches a list of unique applicants for the current provider's jobs.
 * It aggregates all skills (tags) from the various applications a user might have submitted.
 * @returns {Promise<ApplicantInfo[]>} A promise that resolves to an array of unique applicants.
 */
export async function getApplicantsForProvider(): Promise<ApplicantInfo[]> {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return [];
    }

    // Find all applications for jobs created by the current provider
    const applications = await prisma.application.findMany({
        where: {
            job: {
                providerId: currentUser.id,
            },
            status: "sent"
        },
        include: {
            seeker: {
                select: {
                    id: true,
                    fullname: true,
                    city: true,
                    avatar: true,
                },
            },
            job: {
                select: {
                    categories: true,
                }
            }
        },
    });
    // console.log(applications)

    // Process to get unique seekers and aggregate their application tags
    const applicantsMap = new Map<string, ApplicantInfo>();

    applications.forEach(app => {
        if (!app.seeker) return;

        if (!applicantsMap.has(app.seeker.id)) {
            applicantsMap.set(app.seeker.id, {
                id: app.seeker.id,
                fullname: app.seeker.fullname ?? 'Unknown Applicant',
                location: app.seeker.city ?? 'Unknown Location',
                avatar: app.seeker.avatar,
                tags: [],
            });
        }
        
        const applicant = applicantsMap.get(app.seeker.id)!;
        // Assuming tags/categories are on the job, not the application
        if (app.job && app.job.categories) {
            applicant.tags.push(...app.job.categories);
        }
    });

    // Deduplicate tags for each applicant
    const uniqueApplicants = Array.from(applicantsMap.values()).map(applicant => ({
        ...applicant,
        tags: [...new Set(applicant.tags)],
    }));

    console.log(uniqueApplicants)

    return uniqueApplicants;
}