"use client"

import { Calendar, ChevronLeft, ChevronRight, LucideIcon } from "lucide-react"
import { JSX } from "react"

interface IncomeDataItem {
  id: string | number
  title: string
  date: string
  amount: string
  type: "income" | "expense"
  color: string
  icon: LucideIcon
}

interface SeekerDashboardSidebarProps {
  currentDate: Date
  navigateMonth: (direction: number) => void
  monthNames: string[]
  incomeData: IncomeDataItem[]
}

export default function SeekerDashboardSidebar({
  currentDate,
  navigateMonth,
  monthNames,
  incomeData
}: SeekerDashboardSidebarProps): JSX.Element {
  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (number | null)[] = []

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

  const handlePreviousMonth = (): void => {
    navigateMonth(-1)
  }

  const handleNextMonth = (): void => {
    navigateMonth(1)
  }

  const getDayClassName = (day: number): string => {
    if (day === 2) {
      return "bg-blue-600 text-white"
    }
    if (day === 5) {
      return "bg-blue-100 text-blue-600"
    }
    return "hover:bg-gray-100"
  }

  const dayAbbreviations: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="space-y-6">
      {/* History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Histori Pesanan</h3>
            <p className="text-sm text-gray-600">Akun dibuat: 2025</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
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
              <button 
                onClick={handlePreviousMonth} 
                className="p-1 hover:bg-gray-100 rounded"
                type="button"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNextMonth} 
                className="p-1 hover:bg-gray-100 rounded"
                type="button"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {dayAbbreviations.map((day: string) => (
              <div key={day} className="p-2 font-medium text-gray-600">
                {day}
              </div>
            ))}

            {getDaysInMonth(currentDate).map((day: number | null, index: number) => (
              <div key={index} className="p-2">
                {day && (
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded ${getDayClassName(day)}`}
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

      {/* Income Section */}
      <div className="bg-blue-600 rounded-lg shadow-sm p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Pendapatan</h3>
          <ChevronRight className="w-5 h-5 text-white" />
        </div>

        <div className="bg-white rounded-lg p-4 text-gray-900">
          <div className="space-y-3">
            {incomeData.map((item: IncomeDataItem) => {
              const IconComponent = item.icon
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <div className={`p-1 rounded ${item.type === "income" ? "bg-green-100" : "bg-red-100"}`}>
                    <IconComponent className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                  <span className={`text-sm font-medium ${item.color}`}>{item.amount}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}