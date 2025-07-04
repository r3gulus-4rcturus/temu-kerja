"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react" // Import LucideIcon for typing icons
import DashboardMain from "../../components/dashboard/DashboardMain"
import DashboardSidebar from "../../components/dashboard/DashboardSidebar"
import JobUploadSection from "../../components/dashboard/JobUploadSection"
import ContactWorkersSection from "../../components/dashboard/ContactWorkersSection"
import JustSwipeSection from "../../components/dashboard/JustSwipeSection"
import FindWorkerSection from "../../components/dashboard/FindWorkerSection"
import Footer from "../../components/shared/Footer"

// ---
// Interfaces for Data Structures
// ---

interface Order {
  id: number;
  date: string;
  dateRange: string;
  time: string;
  worker: string;
  tag: string;
  status: string;
  price: string;
  statusColor: string;
}

interface Notification {
  id: number;
  date: string;
  message: string;
}

// Using the provided DashboardSidebarProps interface
interface DashboardSidebarProps {
  currentDate: Date // Date object passed from parent
  navigateMonth: (direction: number) => void // Function to navigate months, passed from parent
  monthNames: string[] // Array of month names, passed from parent
  notifications: Notification[] // Array of notifications, passed from parent
}

// ---
// Dashboard Component
// ---

export default function Dashboard() {
  // Initialize currentDate with explicit Date type. Set it to July 2, 2025, 00:00:00 local time
  const [currentDate, setCurrentDate] = useState<Date>(new Date("2025-07-02T00:00:00"));

  const orders: Order[] = [ // Explicitly type the array
    {
      id: 1,
      date: "Maret",
      dateRange: "2 - 5",
      time: "12:00 PM",
      worker: "Mukhlis",
      tag: "Tulang Kelapa",
      status: "Belum Dimulai",
      price: "Rp 500,000.00",
      statusColor: "bg-red-500",
    },
    {
      id: 2,
      date: "Maret",
      dateRange: "2 - 5",
      time: "12:00 PM",
      worker: "Mukhlis",
      tag: "Tulang Kelapa",
      status: "Sedang Dikerjakan",
      price: "Rp 500,000.00",
      statusColor: "bg-green-500",
    },
    {
      id: 3,
      date: "Maret",
      dateRange: "2 - 5",
      time: "12:00 PM",
      worker: "Mukhlis",
      tag: "Tulang Kelapa",
      status: "Selesai",
      price: "Rp 500,000.00",
      statusColor: "bg-gray-800",
    },
  ];

  const notifications: Notification[] = [ // Explicitly type the array
    {
      id: 1,
      date: "1 Apr 2025 12:00",
      message: "Pesanan Berhasil Dijadwalkan!",
    },
    {
      id: 2,
      date: "1 Apr 2025 12:00",
      message: "Menunggu Pembayaran!",
    },
  ];

  // Note: getDaysInMonth function is no longer directly passed via props based on the provided DashboardSidebarProps.
  // It should either be an internal helper in DashboardSidebar or passed if DashboardSidebarProps were updated to include it.
  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // Sunday - Saturday : 0 - 6

    const days: (number | null)[] = [];

    // Adjusting for Monday start (if your calendar week view starts Monday)
    const adjustedStartingDayOfWeek = (startingDayOfWeek === 0) ? 6 : startingDayOfWeek - 1;

    for (let i = 0; i < adjustedStartingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const monthNames: string[] = [ // Explicitly type the array
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigateMonth = (direction: number) => { // Explicitly type 'direction' as number
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
            <DashboardMain orders={orders} />
          </div>

          {/* Right Side - History & Calendar */}
          <DashboardSidebar
            currentDate={currentDate}
            navigateMonth={navigateMonth}
            monthNames={monthNames}
            notifications={notifications}
            // If DashboardSidebar still needs getDaysInMonth, its props interface needs to be updated.
            // For now, based on your provided DashboardSidebarProps, it's removed.
          />
        </div>

        {/* Job Upload Section */}
        <div className="mt-12">
          <JobUploadSection />
        </div>

        {/* Contact Workers Section */}
        <div className="mt-12">
          <ContactWorkersSection />
        </div>

        {/* Just Swipe Section */}
        <div className="mt-12">
          <JustSwipeSection />
        </div>

        {/* Find Worker Section */}
        <div className="mt-12">
          <FindWorkerSection />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}