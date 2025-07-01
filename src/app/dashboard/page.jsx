"use client"

import { useState } from "react"
import Navbar from "../../components/shared/Navbar"
import DashboardMain from "../../components/dashboard/DashboardMain"
import DashboardSidebar from "../../components/dashboard/DashboardSidebar"
import JobUploadSection from "../../components/dashboard/JobUploadSection"
import ContactWorkersSection from "../../components/dashboard/ContactWorkersSection"
import JustSwipeSection from "../../components/dashboard/JustSwipeSection"
import FindWorkerSection from "../../components/dashboard/FindWorkerSection"
import Footer from "../../components/shared/Footer"

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2)) // March 2024

  const orders = [
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
  ]

  const notifications = [
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
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const monthNames = [
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
  ]

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  // At the top of the component, add userRole detection
  // For demo purposes, we'll use "jobprovider" as default
  // In real app, this would come from authentication/API

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Pass user role */}
      <Navbar userRole="jobprovider" />

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
  )
}
