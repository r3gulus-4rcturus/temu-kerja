"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react"; // 1. Import the Search icon

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

interface SeekerDashboardMainProps {
  jobs: Job[];
  completedJobs: Job[];
}

// ---
// JobCard Component
// ---

const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="bg-white rounded-xl flex overflow-hidden">
    {/* Date Section */}
    <div className="bg-[#9FB6EF] px-9 py-5 flex flex-col items-center justify-between min-w-[125px]">
      <div className="text-center">
        <div className="text-[#666] text-base mb-1">{job.date}</div>
        <div className="text-[#181818] text-2xl font-normal tracking-[4.56px]">
          {job.dateRange}
        </div>
      </div>
      <div className="text-[#3C3C43] text-xs mt-16">{job.time}</div>
    </div>

    {/* Content Section */}
    <div className="flex-1 p-4 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Worker Info Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
              <img
                src={job.avatar || "/api/placeholder/46/46"}
                alt={job.provider}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xl font-semibold text-black">
              {job.provider}
            </div>
            <div className="bg-[#3C3C43] text-white text-xs px-2 py-2 rounded-full">
              {job.jobTitle}
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full ${job.statusColor}`}></div>
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-[#E6E6E6]"></div>

        {/* Status and Tarif */}
        <div className="space-y-1">
          <div className="flex items-center gap-5">
            <span className="text-[#181818] font-semibold text-base">
              Status :
            </span>
            <span className="text-[#181818] font-semibold text-base">
              {job.status}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[#181818] font-semibold text-base">
              Lokasi :
            </span>
            <span className="text-[#181818] font-semibold text-base">
              {job.location}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[#181818] font-semibold text-base">
              Tarif :
            </span>
            <span className="text-[#181818] font-semibold text-base">
              {job.tariff}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ---
// SeekerDashboardMain Component
// ---

export default function SeekerDashboardMain({
  jobs,
  completedJobs,
}: SeekerDashboardMainProps) {
  const [showCompletedJobs, setShowCompletedJobs] = useState<boolean>(true);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#464255] mb-3">Dashboard</h1>
        <p className="text-[#2F587A] text-base font-semibold">
          Hi, Mukhlis. Welcome back to Temu Kerja!
        </p>
      </div>
      <div className="bg-[#EBF2F7] rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center justify-center text-center min-h-[800px] space-y-8">
          <div className="flex items-center gap-3 text-xl text-gray-500">
            <Search className="w-9 h-9 text-[#3F75A1]" />
            <span className="font-plusjakarta text-2xl font-bold text-[#3F75A1]">Belum Ada Pekerjaan Aktif Saat Ini!</span>
          </div>
        </div>
      </div>
    </div>
  );
}