"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react"
import Navbar from "../../components/shared/Navbar"
import Footer from "../../components/shared/Footer"
import SeekerDashboardMain from "../../components/seeker-dashboard/SeekerDashboardMain"
import SeekerDashboardSidebar from "../../components/seeker-dashboard/SeekerDashboardSidebar"
import ChatTerakhirSection from "../../components/seeker-dashboard/ChatTerakhirSection"
import MatchSection from "../../components/seeker-dashboard/MatchSection"
import JustSwipeSection from "../../components/seeker-dashboard/JustSwipeSection"
import RatingUlasanSection from "../../components/seeker-dashboard/RatingUlasanSection"

// ---
// Interfaces for Data Structures
// ---

// Using the provided Job interface
interface Job {
  id: string; // Assuming each job has a unique ID for the key prop
  date: string;
  dateRange: string;
  time: string;
  avatar?: string; // Optional if some jobs might not have an avatar
  provider: string;
  jobTitle: string;
  status: string;
  location: string;
  tariff: string;
  statusColor: string;
}

interface IncomeItem {
  id: number;
  type: "income" | "expense"; // Literal union type
  title: string;
  date: string;
  amount: string;
  color: string;
  icon: LucideIcon; // Type for Lucide React icons
}

interface Review {
  id: number;
  reviewerName: string;
  reviewerAvatar?: string; // Optional avatar
  timeAgo: string;
  rating: number;
  reviewText: string;
  backgroundImage?: string; // Optional background image
}

// ---
// SeekerDashboard Component
// ---

export default function SeekerDashboard() {
  // Initialize currentDate with explicit Date type. Set it to July 2, 2025, 00:00:00 local time
  const [currentDate, setCurrentDate] = useState<Date>(new Date("2025-07-02T00:00:00"))

  const jobs: Job[] = [ // Explicitly type the array
    {
      id: "job-1", // Changed to string ID
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
      id: "job-2", // Changed to string ID
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
  ]

  const completedJobs: Job[] = [ // Explicitly type the array
    {
      id: "job-3", // Changed to string ID
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
  ]

  const incomeData: IncomeItem[] = [ // Explicitly type the array
    {
      id: 1,
      type: "income",
      title: "Pendapatan Pesanan #531",
      date: "1 Apr 2025 18:00",
      amount: "+250.000",
      color: "text-green-600",
      icon: ArrowUpRight,
    },
    {
      id: 2,
      type: "expense",
      title: "Penarikan Saldo",
      date: "1 Apr 2025 12:00",
      amount: "-150.000",
      color: "text-red-600",
      icon: ArrowDownRight,
    },
    {
      id: 3,
      type: "income",
      title: "Pendapatan Pesanan #530",
      date: "1 Apr 2025 09:00",
      amount: "+300.000",
      color: "text-green-600",
      icon: ArrowUpRight,
    },
  ]

  const reviews: Review[] = [ // Explicitly type the array
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
    {
      id: 3,
      reviewerName: "Anandreansyah",
      reviewerAvatar: "/placeholder.svg?height=48&width=48",
      timeAgo: "2 days ago",
      rating: 4.5,
      reviewText:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
      backgroundImage: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      reviewerName: "Maria Husna",
      reviewerAvatar: "/placeholder.svg?height=48&width=48",
      timeAgo: "3 days ago",
      rating: 5.0,
      reviewText:
        "Excellent work! Very professional and completed the job perfectly. Highly recommended for garden maintenance work.",
      backgroundImage: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      reviewerName: "Budi Santoso",
      reviewerAvatar: "/placeholder.svg?height=48&width=48",
      timeAgo: "1 week ago",
      rating: 4.0,
      reviewText: "Good service and punctual. The garden looks much better now. Will hire again for future projects.",
      backgroundImage: "/placeholder.svg?height=200&width=300",
    },
  ]

  const monthNames: string[] = [ // Explicitly type the array
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]

  const navigateMonth = (direction: number) => { // Explicitly type 'direction' as number
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Job Seeker Role */}
      <Navbar userRole="jobseeker" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Dashboard */}
          <div className="lg:col-span-2">
            <SeekerDashboardMain jobs={jobs} completedJobs={completedJobs} />
          </div>

          {/* Right Side - History, Calendar & Income */}
          <SeekerDashboardSidebar
            currentDate={currentDate}
            navigateMonth={navigateMonth}
            monthNames={monthNames}
            incomeData={incomeData}
          />
        </div>

        {/* Chat Terakhir Section */}
        <div className="mt-12">
          <ChatTerakhirSection />
        </div>

        {/* Match Section */}
        <div className="mt-12">
          <MatchSection />
        </div>

        {/* Just Swipe Section */}
        <div className="mt-12">
          <JustSwipeSection />
        </div>

        {/* Rating dan Ulasan Section */}
        <div className="mt-12">
          <RatingUlasanSection reviews={reviews} />
        </div>
      </div>

      {/* Footer - Seeker Role */}
      <Footer userRole="jobseeker" />
    </div>
  )
}