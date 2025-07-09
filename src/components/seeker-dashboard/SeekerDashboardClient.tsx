"use client";

import { useState } from "react";
import Footer from "../shared/Footer";
import SeekerDashboardMain from "./SeekerDashboardMain";
import SeekerDashboardSidebar from "./SeekerDashboardSidebar";
import ChatTerakhirSection from "./ChatTerakhirSection";
import MatchSection from "./MatchSection";
import JustSwipeSection from "./JustSwipeSection";
import RatingUlasanSection from "./RatingUlasanSection";

// ---
// Interfaces for Data Structures
// ---

interface Job {
  id: string;
  date: string;
  dateRange: string;
  time: string;
  avatar?: string;
  provider: string;
  jobTitle: string;
  status: string;
  location: string;
  tariff: string;
  statusColor: string;
}

interface IncomeItem {
  id: number;
  type: "income" | "expense";
  title: string;
  date: string;
  amount: string;
  color: string;
  icon: string; // Changed to string
}

interface Review {
  id: number;
  reviewerName: string;
  reviewerAvatar?: string;
  timeAgo: string;
  rating: number;
  reviewText: string;
  backgroundImage?: string;
}

interface DashboardClientProps {
  jobs: Job[];
  completedJobs: Job[];
  incomeData: IncomeItem[];
  reviews: Review[];
}

export default function DashboardClient({ jobs, completedJobs, incomeData, reviews }: DashboardClientProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date("2025-07-02T00:00:00"));

  const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
  );
}