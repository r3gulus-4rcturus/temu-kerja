"use client"

import { useState } from "react"
import { Order } from "../../lib/actions/order.actions"; // Import the Order interface
import DashboardMain from "./DashboardMain"
import DashboardSidebar from "./DashboardSidebar"
import JobUploadSection from "./JobUploadSection"
import ContactWorkersSection from "./ContactWorkersSection"
import JustSwipeSection from "./JustSwipeSection"
import FindWorkerSection from "./FindWorkerSection"
import Footer from "../shared/Footer"

interface DashboardClientProps {
  orders: Order[]; // Receive orders as a prop
  username: string; // Receive username as a prop
}

// Define the Notification type here or import it if defined elsewhere
interface Notification {
  id: number;
  date: string;
  message: string;
}

export default function DashboardClient({ orders, username }: DashboardClientProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date("2025-07-02T00:00:00"));

  const notifications: Notification[] = [
    { id: 1, date: "1 Apr 2025 12:00", message: "Pesanan Berhasil Dijadwalkan!" },
    { id: 2, date: "1 Apr 2025 12:00", message: "Menunggu Pembayaran!" },
  ];

  const monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DashboardMain orders={orders} username={username}/>
          </div>
          <DashboardSidebar
            currentDate={currentDate}
            navigateMonth={navigateMonth}
            monthNames={monthNames}
            notifications={notifications}
          />
        </div>
        <div className="mt-12"> <JobUploadSection /> </div>
        <div className="mt-12"> <ContactWorkersSection /> </div>
        <div className="mt-12"> <JustSwipeSection /> </div>
        <div className="mt-12"> <FindWorkerSection /> </div>
      </div>
      <Footer />
    </div>
  );
}