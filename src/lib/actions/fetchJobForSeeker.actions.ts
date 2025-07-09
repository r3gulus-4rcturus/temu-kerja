"use server";

import { prisma } from "../prisma";
import { getCurrentUser } from "../auth";
import { getStatusColor, getStatusDisplayName } from "./order.actions";

/**
 * Defines the shape of the job data returned by our custom fetch actions.
 * It includes a subset of the Job model and the provider's username.
 */
export type Job = {
  id: string;
  title: string;
  location: string;
  priceRate: number;
  status: string;
  dateTime: Date;
  provider: {
    username: string;
    avatar?: string;
  };
  statusColor: string;
};

/**
 * Defines the shape of the job data returned by our custom fetch actions.
 * It includes a subset of the Job model and the provider's username.
 */
export type JobWithTimeDetails = {
  id: string;
  title: string;
  location: string;
  priceRate: number;
  status: string;
  dateTime: Date;
  provider: {
    username: string;
    avatar?: string;
  };
  statusColor: string;
  dateMonth: string;
  dateDate: number;
  dateHour: string;
};

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

/**
 * Fetches up to 100 random job entries from the database.
 * @returns {Promise<Job[]>} A promise that resolves to an array of jobs.
 */
export async function get100Jobs(): Promise<Job[]> {
  try {
    const jobCount = await prisma.job.count();
    if (jobCount === 0) {
      return [];
    }

    // Generate a random offset, ensuring it doesn't go out of bounds
    const skip = Math.max(0, Math.floor(Math.random() * (jobCount - 100)));

    const jobsWithoutColor = await prisma.job.findMany({
      take: 100,
      skip: skip,
      select: {
        id: true,
        title: true,
        location: true,
        priceRate: true,
        status: true,
        dateTime: true,
        provider: {
          select: {
            username: true,
            avatar: true
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Order by creation date for consistency
      },
    });

    // Map over the jobs to add the statusColor
    const jobs = jobsWithoutColor.map(job => ({
      ...job,
      statusColor: getStatusColor(job.status),
      status: getStatusDisplayName(job.status),
    }));

    return jobs;
  } catch (error) {
    console.error("Failed to fetch random jobs:", error);
    return [];
  }
}

/**
 * Fetches all jobs for which the current user has an 'accepted' application.
 * @returns {Promise<Job[]>} A promise that resolves to an array of jobs.
 */
export async function getAcceptedApplicationJobs(): Promise<JobWithTimeDetails[]> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      // Return empty array if no user is logged in
      return [];
    }

    const jobsWithoutColor = await prisma.job.findMany({
      where: {
        applications: {
          some: {
            seekerId: currentUser.id,
            status: 'accepted',
          },
        },
      },
      select: {
        id: true,
        title: true,
        location: true,
        priceRate: true,
        status: true,
        dateTime: true,
        provider: {
          select: {
            username: true,
            avatar: true
          },
        },
      },
    });

    // Map over the jobs to add the statusColor
    const jobs = jobsWithoutColor.map(job => ({
      ...job,
      statusColor: getStatusColor(job.status),
      status: getStatusDisplayName(job.status),
      dateMonth: getMonth(job.dateTime),
      dateDate: getDateInMonth(job.dateTime),
      dateHour: getHour(job.dateTime),
    }));

    console.log(jobs)

    return jobs;
  } catch (error) {
    console.error("Failed to fetch accepted application jobs:", error);
    return [];
  }
}

/**
 * Fetches all jobs for which the current user has an 'onNegotiation' application.
 * @returns {Promise<Job[]>} A promise that resolves to an array of jobs.
 */
export async function getOnNegotiationApplicationJobs(): Promise<Job[]> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const jobsWithoutColor = await prisma.job.findMany({
      where: {
        applications: {
          some: {
            seekerId: currentUser.id,
            status: 'onnegotiation',
          },
        },
      },
      select: {
        id: true,
        title: true,
        location: true,
        priceRate: true,
        status: true,
        dateTime: true,
        provider: {
          select: {
            username: true,
            avatar: true
          },
        },
      },
    });

    // Map over the jobs to add the statusColor
    const jobs = jobsWithoutColor.map(job => ({
      ...job,
      statusColor: getStatusColor(job.status),
      status: getStatusDisplayName(job.status),
    }));

    return jobs;
  } catch (error) {
    console.error("Failed to fetch jobs with applications on negotiation:", error);
    return [];
  }
}

/**
 * Fetches all jobs for which the current user has a 'sent' application.
 * @returns {Promise<Job[]>} A promise that resolves to an array of jobs.
 */
export async function getSentApplicationJobs(): Promise<Job[]> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const jobsWithoutColor = await prisma.job.findMany({
      where: {
        applications: {
          some: {
            seekerId: currentUser.id,
            status: 'sent',
          },
        },
      },
      select: {
        id: true,
        title: true,
        location: true,
        priceRate: true,
        status: true,
        dateTime: true,
        provider: {
          select: {
            username: true,
            avatar: true
          },
        },
      },
    });

    // Map over the jobs to add the statusColor
    const jobs = jobsWithoutColor.map(job => ({
      ...job,
      statusColor: getStatusColor(job.status),
      status: getStatusDisplayName(job.status),
    }));

    return jobs;
  } catch (error) {
    console.error("Failed to fetch jobs with sent applications:", error);
    return [];
  }
}
