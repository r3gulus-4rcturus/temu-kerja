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
const getStatusColor = (status: JobStatus): string => {
  switch (status) {
    case 'completed':
      return 'green';
    case 'inprogress':
      return 'blue';
    case 'closed':
      return 'gray';
    default:
      return 'gray';
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
      providerId: currentUser.id,
      status: {
        not: 'open',
      },
    },
    include: {
      provider: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const orders: Order[] = jobs.map((job) => ({
    id: job.id,
    date: new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(job.createdAt),
    time: new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(job.createdAt),
    worker: job.provider.fullname,
    tag: job.categories[0] || 'General',
    status: job.status,
    price: `Rp ${job.minRate?.toLocaleString('id-ID') || 'N/A'}`,
    statusColor: getStatusColor(job.status),
  }));

  return orders;
}