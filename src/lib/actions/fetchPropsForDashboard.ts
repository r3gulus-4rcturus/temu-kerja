"use server";

import { prisma } from "../prisma";
import { getCurrentUser } from "../auth";
import { Job, JobStatus, Application, User } from "@prisma/client";
import { unique } from "next/dist/build/utils";

const getMonth = (date: Date): string => {
  return date.toLocaleDateString('id-ID', { month: 'long' });

}

const getDateInMonth = (date: Date): number => {
  return date.getDate();
}

const getHour = (date: Date): string => {
  // 3. Get the time with AM/PM format
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // This is key for AM/PM format
  });
}

// ---
// Type Definitions
// ---

// Defines the shape of the Order data for the dashboard
export interface Order {
  id: string;
  month: string;
  date: string;
  hour: string;
  dateTime: Date,
  worker: string;
  title: string;
  tag: string;
  status: string;
  price: string;
  statusColor: string;
  avatar: string;
}

// Defines a more detailed type for our application data
export type FullApplication = Application & {
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
 * Fetches and processes all 'closed' jobs for the current provider that have an accepted application.
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
      status: 'closed',
      applicants: {
        some: {
          status: 'accepted',
        },
      },
    },
    include: {
      applicants: {
        where: { status: 'accepted' },
        include: { seeker: { select: { fullname: true, avatar: true } } },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return jobs.map((job) => {
    const acceptedApplication = job.applicants[0];
    return {
      id: job.id,
      month: getMonth(job.dateTime),
      date: String(getDateInMonth(job.dateTime)),
      hour: getHour(job.dateTime),
      dateTime: job.dateTime,
      worker: acceptedApplication?.seeker?.fullname ?? 'N/A',
      tag: job.categories[0] || 'General',
      status: getStatusDisplayName(job.status),
      price: `Rp ${job.priceRate?.toLocaleString('id-ID') || 'N/A'}`,
      statusColor: getStatusColor(job.status),
      avatar: acceptedApplication?.seeker?.avatar ?? null,
      title: job.title,
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
 * Fetches a list of unique applicants who have sent a JobApplication to the current provider.
 * It aggregates all skills (tags) from the various jobs a user might have applied to.
 * @returns {Promise<ApplicantInfo[]>} A promise that resolves to an array of unique applicants.
 */
export async function getApplicantsForProvider(): Promise<ApplicantInfo[]> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }

  // Find all unique seekers who have a 'sent' JobApplication for the current provider
  const applicants = await prisma.user.findMany({
    where: {
      submittedJobApplications: {
        some: {
          providerId: currentUser.id,
          status: 'sent',
        },
      },
    },
    include: {
      // We need the applications to aggregate the tags from the jobs
      submittedJobApplications: {
        where: {
          providerId: currentUser.id,
          status: 'sent',
        },
        include: {
          job: {
            select: {
              categories: true,
            },
          },
        },
      },
    },
  });

  // Process to get unique seekers and aggregate their application tags
  return applicants.map(applicant => {
    const allTags = applicant.submittedJobApplications.flatMap(app => app.job.categories);
    return {
      id: applicant.id,
      fullname: applicant.fullname ?? 'Unknown Applicant',
      location: applicant.city ?? 'Unknown Location',
      avatar: applicant.avatar,
      tags: [...new Set(allTags)], // Deduplicate tags
    };
  });
}

/**
 * Fetches the first-ever created 'Application' for each seeker who has sent a 'JobApplication'
 * to the current provider. This is used for the "Just Swipe" feature.
 * @returns A promise that resolves to an array of full application details.
 */
export async function getJobApplicationsForProvider(): Promise<FullApplication[]> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return [];
  }

  try {
    // Step 1: Find all seeker IDs who have sent a JobApplication to the current provider.
    const seekersWithSentApplications = await prisma.user.findMany({
      where: {
        submittedJobApplications: {
          some: {
            providerId: currentUser.id,
            status: 'sent',
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (seekersWithSentApplications.length === 0) {
      return [];
    }

    const seekerIds = seekersWithSentApplications.map(s => s.id);

    // Step 2: For each seeker, find their first-ever 'Application' record.
    const firstApplications = await Promise.all(
      seekerIds.map(seekerId =>
        prisma.application.findFirst({
          where: {
            seekerId: seekerId,
          },
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            seeker: true,
          },
        })
      )
    );

    // Filter out any null results and ensure the type matches FullApplication.
    const validApplications = firstApplications.filter(app => app !== null) as FullApplication[];

    return validApplications;

  } catch (error) {
    console.error("Failed to fetch job applications for provider:", error);
    return [];
  }
}
