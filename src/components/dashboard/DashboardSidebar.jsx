"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

export default function DashboardSidebar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2)) // March 2024

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

  return (
    <div className="space-y-6">
      {/* History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Histori Pesanan</h3>
            <p className="text-sm text-gray-600">Akun dibuat: 2025</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-blue-600 rounded-lg shadow-sm p-6 text-white">
        <h3 className="text-lg font-medium mb-4">Calendar</h3>

        <div className="bg-white rounded-lg p-4 text-gray-900">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h4>
            <div className="flex gap-2">
              <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="p-2 font-medium text-gray-600">
                {day}
              </div>
            ))}

            {getDaysInMonth(currentDate).map((day, index) => (
              <div key={index} className="p-2">
                {day && (
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      day === 2
                        ? "bg-blue-600 text-white"
                        : day === 5
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                    }`}
                  >
                    {day}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600">2-5 Maret</span>
              <span className="text-gray-600">[Mukhlis] Pembersihan Taman</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-blue-600 rounded-lg shadow-sm p-6 text-white">
        <h3 className="text-lg font-medium mb-4">Notifications</h3>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-white rounded-lg p-3 text-gray-900">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">{notification.date}</p>
                  <p className="font-medium">{notification.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
