import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  get100AvailableJobs,
  getAcceptedApplicationJobs,
  getOnNegotiationApplicationJobs,
  getSentApplicationJobs,
} from "../../lib/actions/fetchJobForSeeker.actions";
import DashboardClient from "../../components/seeker-dashboard/SeekerDashboardClient";
import { getCurrentUser } from "../../lib/auth";

export default async function SeekerDashboard() {
  // Fetch all necessary job data concurrently
  const [
    random100AvailableJobs,
    acceptedJobs,
    onnegotiationJobs,
    sentJobs,
  ] = await Promise.all([
    get100AvailableJobs(),
    getAcceptedApplicationJobs(),
    getOnNegotiationApplicationJobs(),
    getSentApplicationJobs(),
  ]);
  const user = await getCurrentUser();
// Keep hardcoded data for sections not yet migrated to DB fetching
  const incomeData = [
    {
      id: 1,
      type: "income" as const,
      title: "Pendapatan Pesanan #531",
      date: "1 Apr 2025 18:00",
      amount: "+250.000",
      color: "text-green-600",
      icon: "ArrowUpRight",
    },
    {
      id: 2,
      type: "expense" as const,
      title: "Penarikan Saldo",
      date: "1 Apr 2025 12:00",
      amount: "-150.000",
      color: "text-red-600",
      icon: "ArrowDownRight",
    },
    {
      id: 3,
      type: "income" as const,
      title: "Pendapatan Pesanan #530",
      date: "1 Apr 2025 09:00",
      amount: "+300.000",
      color: "text-green-600",
      icon: "ArrowUpRight",
    },
  ];

  const reviews = [
    {
      id: 1,
      reviewerName: "Jons Sena",
      reviewerAvatar: "/placeholder.svg?height=48&width=48",
      timeAgo: "2 days ago",
      rating: 4.5,
      reviewText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
      backgroundImage: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      reviewerName: "Sofia",
      reviewerAvatar: "/placeholder.svg?height=48&width=48",
      timeAgo: "2 days ago",
      rating: 4.5,
      reviewText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
      backgroundImage: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <DashboardClient
      random100AvailableJobs={random100AvailableJobs}
      acceptedJobs={acceptedJobs}
      onnegotiationJobs={onnegotiationJobs}
      sentJobs={sentJobs}
      incomeData={incomeData}
      reviews={reviews}
      username={user?.username || ""}
    />
  );
}