"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";

// ---
// Interfaces for Data Structures and Props
// ---

interface Notification {
  id: number;
  date: string;
  message: string;
}

interface DashboardSidebarProps {
  currentDate: Date; // Date object passed from parent
  navigateMonth: (direction: number) => void; // Function to navigate months, passed from parent
  monthNames: string[]; // Array of month names, passed from parent
  notifications: Notification[]; // Array of notifications, passed from parent
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
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // Sunday - Saturday : 0 - 6

    const days: (number | null)[] = []; // Array can contain numbers or null

    // Add empty cells for days before the first day of the month
    // Adjusting for Monday start (0=Sunday, 1=Monday... 6=Saturday)
    // If startingDayOfWeek is 0 (Sunday), we want 6 empty slots before it if our calendar starts on Monday.
    // (startingDayOfWeek + 6) % 7 will give 0 for Mon, 1 for Tue etc. (assuming Monday is 0 for our purposes)
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
            <h4 className="text-xl font-semibold text-black">March 2024</h4>
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
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
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
              {/* Row 1 - Previous month days */}
              {["23", "24", "25", "26", "27", "28"].map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-center h-8 text-xs font-bold text-[#B3B3B3]"
                >
                  {day}
                </div>
              ))}
              <div className="flex items-center justify-center h-8 text-xs font-bold text-[#E56A1F]">
                1
              </div>

              {/* Row 2 - March 2-8 */}
              <div className="flex items-center justify-center h-8 text-xs font-bold text-white bg-[#3F75A1] rounded-xl border-2 border-[#3F75A1]">
                2
              </div>
              <div className="flex items-center justify-center h-8 text-xs font-bold text-black bg-[#CFDAF7] rounded-xl">
                3
              </div>
              <div className="flex items-center justify-center h-8 text-xs font-bold text-black bg-[#CFDAF7] rounded-xl">
                4
              </div>
              <div className="flex items-center justify-center h-8 text-xs font-bold text-black bg-[#CFDAF7] rounded-xl border-2 border-[#3F75A1]">
                5
              </div>
              <div className="flex items-center justify-center h-8 text-xs font-bold text-black">
                6
              </div>
              <div className="flex items-center justify-center h-8 text-xs font-bold text-black">
                7
              </div>
              <div className="flex items-center justify-center h-8 text-xs font-bold text-black">
                8
              </div>

              {/* Rows 3-6 - Rest of March */}
              {[
                9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                25, 26, 27, 28, 29, 30, 31,
              ].map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-center h-8 text-xs font-bold text-black"
                >
                  {day}
                </div>
              ))}

              {/* Next month days */}
              {[1, 2, 3, 4, 5].map((day) => (
                <div
                  key={`next-${day}`}
                  className="flex items-center justify-center h-8 text-xs font-bold text-black"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Event Legend */}
          <div className="mt-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4 text-[#4581B2]" />
              <span className="text-xs font-bold text-[#1D364B]">
                2-5 Maret
              </span>
              <span className="text-xs font-bold text-[#2F587A]">
                [Mukhlis] Pembersihan Taman
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[#3F75A1] rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-5 text-center">Notifications</h3>

        <div className="bg-white rounded-3xl p-5 border border-[#D9D9D9] flex gap-3">
          <div className="flex-1 space-y-5">
            {/* Notification 1 */}
            <div className="flex items-center gap-3 p-4 border border-[#D9D9D9] rounded-xl bg-white">
              <svg
                className="w-9 h-9 text-[#4581B2]"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3C11.1716 3 10.5 3.672 10.5 4.5C7.18635 4.5 4.5 7.1865 4.5 10.5V13.5V25.5C4.5 28.812 7.18635 31.5 10.5 31.5H25.5C28.8137 31.5 31.5 28.8135 31.5 25.5V13.5V10.5C31.5 7.1865 28.8137 4.5 25.5 4.5C25.5 3.672 24.8285 3 24 3C23.1716 3 22.5 3.672 22.5 4.5H13.5C13.5 3.672 12.8285 3 12 3ZM10.5 7.5C10.5 8.328 11.1716 9 12 9C12.8285 9 13.5 8.328 13.5 7.5H22.5C22.5 8.328 23.1716 9 24 9C24.8285 9 25.5 8.328 25.5 7.5C27.1569 7.5 28.5 8.8425 28.5 10.5V12C25.6136 12 10.3865 12 7.5 12V10.5C7.5 8.8425 8.8431 7.5 10.5 7.5ZM7.5 15C10.3865 15 25.6136 15 28.5 15V25.5C28.5 27.1545 27.1569 28.5 25.5 28.5H10.5C8.8431 28.5 7.5 27.1575 7.5 25.5V15ZM22.5 18C22.1162 18 21.7617 18.129 21.4688 18.4215L18.0468 21.891L16.0782 19.9215C15.4923 19.3365 14.5545 19.3365 13.9688 19.9215C13.383 20.508 13.383 21.492 13.9688 22.0785L16.9688 25.0785C17.5545 25.6635 18.4923 25.6635 19.0782 25.0785L23.5782 20.5785C24.164 19.992 24.164 19.008 23.5782 18.4215C23.2853 18.129 22.8839 18 22.5 18Z"
                  fill="currentColor"
                />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-[#888] font-medium mb-1">
                  1 Apr 2025 12.00
                </p>
                <p className="text-xs font-bold text-black">
                  Pesanan Berhasil Dijadwalkan!
                </p>
              </div>
            </div>

            {/* Notification 2 */}
            <div className="flex items-center gap-3 p-4 border border-[#D9D9D9] rounded-xl bg-white">
              <svg
                className="w-9 h-9 text-[#4581B2]"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99999 6C5.172 6 4.5 6.67155 4.5 7.5C4.5 8.32845 5.172 9 5.99999 9H30C30.828 9 31.5 8.32845 31.5 7.5C31.5 6.67155 30.828 6 30 6H5.99999ZM5.99999 12C3.5145 12 1.5 14.0146 1.5 16.5V25.5C1.5 27.9855 3.5145 30 5.99999 30H28.5H30C32.4855 30 34.5 27.9855 34.5 25.5V16.5C34.5 14.0146 32.4855 12 30 12H5.99999ZM8.74348 15.0165L27.285 14.9898C27.771 16.6845 29.598 18 31.5 18V24C29.598 24 27.8865 25.227 27.258 27.003L8.72249 26.9925C8.12849 25.254 6.40199 24 4.5 24V18C6.40199 18 8.11648 16.755 8.74348 15.0165ZM18 16.5C15.5145 16.5 13.5 18.5145 13.5 21C13.5 23.4855 15.5145 25.5 18 25.5C20.4855 25.5 22.5 23.4855 22.5 21C22.5 18.5145 20.4855 16.5 18 16.5ZM18 19.5C18.828 19.5 19.5 20.172 19.5 21C19.5 21.828 18.828 22.5 18 22.5C17.172 22.5 16.5 21.828 16.5 21C16.5 20.172 17.172 19.5 18 19.5Z"
                  fill="currentColor"
                />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-[#888] font-medium mb-1">
                  1 Apr 2025 12.00
                </p>
                <p className="text-xs font-bold text-black">
                  Menunggu Pembayaran!
                </p>
              </div>
            </div>
          </div>

          {/* Scrollbar */}
          <div className="w-1.5 bg-[#EBF2F7] rounded-full flex justify-center">
            <div className="w-full h-32 bg-[#1D364B] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
  