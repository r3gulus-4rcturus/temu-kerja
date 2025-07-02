"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

// ---
// Interfaces for Data Structures and Props
// ---

interface Notification {
  id: number
  date: string
  message: string
}

interface DashboardSidebarProps {
  currentDate: Date // Date object passed from parent
  navigateMonth: (direction: number) => void // Function to navigate months, passed from parent
  monthNames: string[] // Array of month names, passed from parent
  notifications: Notification[] // Array of notifications, passed from parent
}

export default function DashboardSidebar({
  currentDate,
  navigateMonth,
  monthNames,
  notifications, // Use the notifications passed as prop
}: DashboardSidebarProps) {
  // IMPORTANT: The original code re-initialized notifications and monthNames here,
  // effectively ignoring the props. I'm assuming you want to use the props.
  // If you intended for these to be internal component state/data, they should be
  // managed with useState or defined outside and then passed as props if needed elsewhere.

  // If you intended to override the prop with these specific notifications:
  // notifications = [
  //   {
  //     id: 1,
  //     date: "1 Apr 2025 12:00",
  //     message: "Pesanan Berhasil Dijadwalkan!",
  //   },
  //   {
  //     id: 2,
  //     date: "1 Apr 2025 12:00",
  //     message: "Menunggu Pembayaran!",
  //   },
  // ]

  // If you intended to override the prop with these specific month names:
  // monthNames = [
  //   "January", "February", "March", "April", "May", "June",
  //   "July", "August", "September", "October", "November", "December",
  // ]

  // IMPORTANT: If 'navigateMonth' was meant to modify internal state of 'currentDate'
  // within this component, 'currentDate' should be a state variable here (useState).
  // Given it's a prop, 'navigateMonth' must be a function passed down from the parent
  // that updates 'currentDate' in the parent. The commented-out code below would be
  // if you managed date state internally.

  // const [internalCurrentDate, setInternalCurrentDate] = useState<Date>(new Date());
  // const internalNavigateMonth = (direction: number) => {
  //   setInternalCurrentDate((prev) => {
  //     const newDate = new Date(prev);
  //     newDate.setMonth(prev.getMonth() + direction);
  //     return newDate;
  //   });
  // };

  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay() // Sunday - Saturday : 0 - 6

    const days: (number | null)[] = [] // Array can contain numbers or null

    // Add empty cells for days before the first day of the month
    // Adjusting for Monday start (0=Sunday, 1=Monday... 6=Saturday)
    // If startingDayOfWeek is 0 (Sunday), we want 6 empty slots before it if our calendar starts on Monday.
    // (startingDayOfWeek + 6) % 7 will give 0 for Mon, 1 for Tue etc. (assuming Monday is 0 for our purposes)
    const adjustedStartingDayOfWeek = (startingDayOfWeek === 0) ? 6 : startingDayOfWeek - 1;


    for (let i = 0; i < adjustedStartingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
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
                      // Adjusted logic to show current date: July 2, 2025
                      (currentDate.getDate() === day && currentDate.getMonth() === 6 && currentDate.getFullYear() === 2025)
                        ? "bg-blue-600 text-white" // Current date styling
                        : (day === 5 && currentDate.getMonth() === 6) // Example of a specific highlighted day in current month
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