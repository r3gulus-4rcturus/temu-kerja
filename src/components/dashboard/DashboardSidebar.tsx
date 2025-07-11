"use client";

import { useState, useMemo } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Order } from "../../lib/actions/fetchPropsForDashboard";

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
  orders: Order[]
}

export default function DashboardSidebar({
  currentDate,
  navigateMonth,
  monthNames,
  notifications, // Use the notifications passed as prop
  orders = [], // Default to empty array to prevent errors
}: DashboardSidebarProps) {

  // Memoize the set of order dates for efficient lookup
  const orderDates = useMemo(() => {
    const dates = new Set<string>();
    orders.forEach(order => {
      // The `order.date` is already a formatted string like "July 10, 2025"
      // We need to parse it back to a Date object to work with it
      const orderDate = new Date(order.date);
      if (!isNaN(orderDate.getTime())) { // Check if the date is valid
        // Store date as 'YYYY-M-D' string for easy comparison
        dates.add(`${orderDate.getFullYear()}-${orderDate.getMonth()}-${orderDate.getDate()}`);
      }
    });
    return dates;
  }, [orders]);

  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    const adjustedStartingDayOfWeek = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    for (let i = 0; i < adjustedStartingDayOfWeek; i++) {
      days.push(null);
    }
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

    // Style for dates with an order
    const dateString = `${dayDate.getFullYear()}-${dayDate.getMonth()}-${dayDate.getDate()}`;
    if (orderDates.has(dateString)) {
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
          <div className="mt-3 space-y-2 max-h-28 overflow-y-auto">
            {orders.map((order) => {
                const orderDate = new Date(order.date);
                const date = orderDate.getDate();
                const month = orderDate.toLocaleString('id-ID', { month: 'short' });
                return (
                    <div key={order.id} className="flex items-center gap-2 px-4 py-1 rounded-lg">
                        <Calendar className="w-4 h-4 text-[#4581B2] flex-shrink-0" />
                        <span className="text-xs font-bold text-[#1D364B]">
                            {date} {month}:
                        </span>
                        <span className="text-xs text-[#2F587A] truncate" title={order.worker}>
                            [{order.worker}] {order.tag}
                        </span>
                    </div>
                );
            })}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[#3F75A1] rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-5 text-center">Notifications</h3>
        {/* <div className="bg-white rounded-3xl p-5 border border-[#D9D9D9] flex gap-3">
          <div className="flex-1 space-y-5">
            {notifications.map(notification => (
                <div key={notification.id} className="flex items-center gap-3 p-4 border border-[#D9D9D9] rounded-xl bg-white">
                    <svg className="w-9 h-9 text-[#4581B2]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C11.1716 3 10.5 3.672 10.5 4.5C7.18635 4.5 4.5 7.1865 4.5 10.5V13.5V25.5C4.5 28.812 7.18635 31.5 10.5 31.5H25.5C28.8137 31.5 31.5 28.8135 31.5 25.5V13.5V10.5C31.5 7.1865 28.8137 4.5 25.5 4.5C25.5 3.672 24.8285 3 24 3C23.1716 3 22.5 3.672 22.5 4.5H13.5C13.5 3.672 12.8285 3 12 3ZM10.5 7.5C10.5 8.328 11.1716 9 12 9C12.8285 9 13.5 8.328 13.5 7.5H22.5C22.5 8.328 23.1716 9 24 9C24.8285 9 25.5 8.328 25.5 7.5C27.1569 7.5 28.5 8.8425 28.5 10.5V12C25.6136 12 10.3865 12 7.5 12V10.5C7.5 8.8425 8.8431 7.5 10.5 7.5ZM7.5 15C10.3865 15 25.6136 15 28.5 15V25.5C28.5 27.1545 27.1569 28.5 25.5 28.5H10.5C8.8431 28.5 7.5 27.1575 7.5 25.5V15ZM22.5 18C22.1162 18 21.7617 18.129 21.4688 18.4215L18.0468 21.891L16.0782 19.9215C15.4923 19.3365 14.5545 19.3365 13.9688 19.9215C13.383 20.508 13.383 21.492 13.9688 22.0785L16.9688 25.0785C17.5545 25.6635 18.4923 25.6635 19.0782 25.0785L23.5782 20.5785C24.164 19.992 24.164 19.008 23.5782 18.4215C23.2853 18.129 22.8839 18 22.5 18Z" fill="currentColor" /></svg>
                    <div className="flex-1">
                        <p className="text-xs text-[#888] font-medium mb-1">{notification.date}</p>
                        <p className="text-xs font-bold text-black">{notification.message}</p>
                    </div>
                </div>
            ))}
          </div>
          <div className="w-1.5 bg-[#EBF2F7] rounded-full flex justify-center">
            <div className="w-full h-32 bg-[#1D364B] rounded-full"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
