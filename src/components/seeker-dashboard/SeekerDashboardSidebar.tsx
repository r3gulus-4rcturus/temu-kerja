"use client";

import { Calendar, ChevronLeft, ChevronRight, Clock, LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { JSX, useMemo } from "react";
import { JobWithTimeDetails } from "../../lib/actions/fetchJobForSeeker.actions";

// ---
// Interfaces for Data Structures and Props
// ---

interface IncomeDataItem {
  id: string | number;
  title: string;
  date: string;
  amount: string;
  type: "income" | "expense";
  color: string;
  icon: string;
}

interface SeekerDashboardSidebarProps {
  currentDate: Date;
  navigateMonth: (direction: number) => void;
  monthNames: string[];
  incomeData: IncomeDataItem[];
  acceptedJobs: JobWithTimeDetails[];
}

const iconMap: { [key: string]: LucideIcon } = {
  ArrowUpRight,
  ArrowDownRight,
};

export default function SeekerDashboardSidebar({
  currentDate,
  navigateMonth,
  monthNames,
  incomeData,
  acceptedJobs,
}: SeekerDashboardSidebarProps): JSX.Element {

  // Memoize the set of job dates for efficient lookup
  const jobDates = useMemo(() => {
    const dates = new Set<string>();
    acceptedJobs.forEach(job => {
      const jobDate = new Date(job.dateTime);
      // Store date as 'YYYY-M-D' string for easy comparison
      dates.add(`${jobDate.getFullYear()}-${jobDate.getMonth()}-${jobDate.getDate()}`);
    });
    return dates;
  }, [acceptedJobs]);

  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // Sunday - Saturday : 0 - 6

    const days: (number | null)[] = [];

    // Adjust for Monday start
    const adjustedStartingDayOfWeek =
      startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    for (let i = 0; i < adjustedStartingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const dayAbbreviations: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDayClassName = (day: number | null): string => {
    if (!day) return "";

    const today = new Date();
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    // Style for today's date
    if (
      dayDate.getDate() === today.getDate() &&
      dayDate.getMonth() === today.getMonth() &&
      dayDate.getFullYear() === today.getFullYear()
    ) {
      return "text-white bg-[#3F75A1] rounded-xl border-2 border-[#3F75A1]";
    }

    // Style for dates with an accepted job
    const dateString = `${dayDate.getFullYear()}-${dayDate.getMonth()}-${dayDate.getDate()}`;
    if (jobDates.has(dateString)) {
      return "text-black bg-[#CFDAF7] rounded-xl";
    }

    // Default style for other days
    return "text-black";
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      {/* History */}
      <div className="w-full bg-white rounded-2xl border-2 border-blue-300 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-xl">
                Histori Pesanan
              </h3>
              <p className="text-base text-gray-500 mt-1">Akun dibuat: 2025</p>
            </div>
          </div>
          <ChevronRight className="w-7 h-7 text-gray-300" />
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-[#3F75A1] rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-5 text-center">Calendar</h3>

        <div className="bg-white rounded-3xl p-5 text-gray-900 border border-[#D9D9D9]">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xl font-semibold text-black">{`${monthNames[currentDate.getMonth()]
              } ${currentDate.getFullYear()}`}</h4>
            <div className="flex gap-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="flex items-center justify-center w-6 h-6"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="flex items-center justify-center w-6 h-6"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>

          {/* Calendar Grid Container */}
          <div className="p-4 border border-[#D9D9D9] rounded-3xl">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayAbbreviations.map((day) => (
                <div
                  key={day}
                  className="text-center py-2 text-base font-semibold text-black"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div key={index} className={`flex items-center justify-center h-8 text-xs font-bold ${getDayClassName(day)}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Event Legend */}
          <div className="mt-3">
            {acceptedJobs.map((job) => (
              <div key={job.id} className="flex items-center gap-2 px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-[#4581B2]" />
                <span className="text-xs font-bold text-[#1D364B]">
                  {job.dateDate} {job.dateMonth}
                </span>
                <span className="text-xs font-bold text-[#2F587A]">
                  [{job.provider.username}] {job.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Income Section */}
      <div className="bg-[#3F75A1] rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-5 text-center">Pendapatan</h3>
        {/* <div className="bg-white rounded-3xl p-5 border border-[#D9D9D9] flex gap-3">
          <div className="flex-1 space-y-5">
            {incomeData.map((item) => {
              const IconComponent = iconMap[item.icon];
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-4 border border-[#D9D9D9] rounded-xl bg-white"
                >
                  <IconComponent
                    className={`w-9 h-9 ${item.color}`}
                  />
                  <div className="flex-1">
                    <p className="text-xs text-[#888] font-medium mb-1">
                      {item.date}
                    </p>
                    <p className="text-xs font-bold text-black">
                      {item.title}
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${item.color}`}>{item.amount}</span>
                </div>
              );
            })}
          </div> */}
        {/* Scrollbar */}
        {/* <div className="w-1.5 bg-[#EBF2F7] rounded-full flex justify-center">
            <div className="w-full h-32 bg-[#1D364B] rounded-full"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
