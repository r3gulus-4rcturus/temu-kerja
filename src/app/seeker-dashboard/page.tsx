import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import DashboardClient from "../../components/seeker-dashboard/SeekerDashboardClient";

// ---
// Data Fetching and Processing
// ---

const getJobs = async () => {
  // In a real application, you would fetch this data from your database or API
  return [
    {
      id: "job-1",
      date: "Maret",
      dateRange: "2 - 5",
      time: "12:00 PM",
      provider: "Kurniawan",
      jobTitle: "Jasa Tukang Kebun",
      status: "Belum Dimulai",
      location: "Jl. Margonda Raya 1, Blok DC No.19, Depok",
      tariff: "Rp 500,000.00",
      statusColor: "bg-red-500",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "job-2",
      date: "Maret",
      dateRange: "2 - 5",
      time: "12:00 PM",
      provider: "Kurniawan",
      jobTitle: "Jasa Tukang Kebun",
      status: "Sedang Dikerjakan",
      location: "Jl. Margonda Raya 1, Blok DC No.19, Depok",
      tariff: "Rp 500,000.00",
      statusColor: "bg-green-500",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];
};

const getCompletedJobs = async () => {
  return [
    {
      id: "job-3",
      date: "Maret",
      dateRange: "2 - 5",
      time: "12:00 PM",
      provider: "Kurniawan",
      jobTitle: "Jasa Tukang Kebun",
      status: "Selesai",
      location: "Jl. Margonda Raya 1, Blok DC No.19, Depok",
      tariff: "Rp 500,000.00",
      statusColor: "bg-gray-800",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];
};

const getIncomeData = async () => {
  return [
    {
      id: 1,
      type: "income",
      title: "Pendapatan Pesanan #531",
      date: "1 Apr 2025 18:00",
      amount: "+250.000",
      color: "text-green-600",
      icon: "ArrowUpRight",
    },
    {
      id: 2,
      type: "expense",
      title: "Penarikan Saldo",
      date: "1 Apr 2025 12:00",
      amount: "-150.000",
      color: "text-red-600",
      icon: "ArrowDownRight",
    },
    {
      id: 3,
      type: "income",
      title: "Pendapatan Pesanan #530",
      date: "1 Apr 2025 09:00",
      amount: "+300.000",
      color: "text-green-600",
      icon: "ArrowUpRight",
    },
  ];
};

const getReviews = async () => {
  return [
    {
      id: 1,
      reviewerName: "Jons Sena",
      reviewerAvatar: "/placeholder.svg?height=48&width=48",
      timeAgo: "2 days ago",
      rating: 4.5,
      reviewText:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
      backgroundImage: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      reviewerName: "Sofia",
      reviewerAvatar: "/placeholder.svg?height=48&width=48",
      timeAgo: "2 days ago",
      rating: 4.5,
      reviewText:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
      backgroundImage: "/placeholder.svg?height=200&width=300",
    },
  ];
};

export default async function SeekerDashboard() {
  const jobs = await getJobs();
  const completedJobs = await getCompletedJobs();
  const incomeData = await getIncomeData();
  const reviews = await getReviews();

  return (
    <DashboardClient
      jobs={jobs}
      completedJobs={completedJobs}
      incomeData={incomeData}
      reviews={reviews}
    />
  );
}