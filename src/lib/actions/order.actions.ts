import { getCurrentUser } from '../auth';
import { prisma } from '../prisma';
import { JobStatus } from '@prisma/client';

// Define the Order interface here so it can be exported and reused
export interface Order {
  id: string; // Changed to string to match Prisma's UUID
  date: string;
  time: string;
  worker: string;
  tag: string;
  status: string;
  price: string;
  statusColor: string;
}

// Helper function to map status to a color
export const getStatusColor = (status: JobStatus): string => {
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
export const getStatusDisplayName = (status: JobStatus): string => {
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
/**
 * Fetches and processes all non-open jobs for the current user.
 * @returns {Promise<Order[]>} A promise that resolves to an array of orders.
 */
export async function getOrdersForUser(): Promise<Order[]> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    // Return an empty array if no user is logged in
    return [];
  }

  const jobs = await prisma.job.findMany({
    where: {
      // Condition 1: The job's provider must be the current user.
      providerId: currentUser.id,
      // Condition 2: The job's status must NOT be 'open'.
      status: {
        not: 'open',
      },
      // Condition 3: The job must have at least one 'accepted' application.
      applications: {
        some: {
          status: 'accepted',
        },
      },
    },
    include: {
      // To get the worker's name, we only need to include the accepted application
      // and the user who submitted it (the seeker).
      applications: {
        where: {
          status: 'accepted',
        },
        include: {
          // Include the related user (seeker) to get their name.
          seeker: {
            select: {
              fullname: true,
            },
          },
        },
        // We only need the first accepted application to identify the worker.
        take: 1,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const orders: Order[] = jobs.map((job) => {
    // Since we filtered to only include the first accepted application, we can safely access it.
    const acceptedApplication = job.applications[0];
    return {
      id: job.id,
      date: new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }).format(job.createdAt),
      time: new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(job.createdAt),
      // Use the fullname from the included seeker (user) record.
      worker: acceptedApplication?.seeker?.fullname ?? 'N/A',
      tag: job.categories[0] || 'General',
      status: getStatusDisplayName(job.status),
      price: `Rp ${job.priceRate?.toLocaleString('id-ID') || 'N/A'}`,
      statusColor: getStatusColor(job.status),
    };
  });

  return orders;
}