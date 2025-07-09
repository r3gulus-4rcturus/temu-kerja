"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react"; // 1. Import the Search icon

// ---
// Interfaces for Data Structures
// ---

interface JobWithTimeDetails {
  id: string;
  title: string;
  location: string;
  priceRate: number;
  status: string;
  dateTime: Date;
  provider: {
    username: string;
    avatar?: string;
  };
  statusColor: string;
  dateMonth: string;
  dateDate: number;
  dateHour: string;
};

interface SeekerDashboardMainProps {
  username: string;
  jobs: JobWithTimeDetails[];
}

// Helper to map color names to Tailwind CSS classes
const colorMap: { [key: string]: string } = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  gray: 'bg-gray-800',
  red: 'bg-red-500',
};

// ---
// JobCard Component
// ---

const JobCard: React.FC<{ job: JobWithTimeDetails }> = ({ job }) => (
  <div className="bg-white rounded-xl flex overflow-hidden">
    {/* Date Section */}
    <div className="bg-[#9FB6EF] px-9 py-5 flex flex-col items-center justify-between min-w-[125px]">
      <div className="text-center">
        <div className="text-[#666] text-base mb-1">{job.dateMonth}</div>
        <div className="text-[#181818] text-2xl font-normal tracking-[4.56px]">
          {job.dateDate}
        </div>
      </div>
      <div className="text-[#3C3C43] text-xs mt-16">{job.dateHour}</div>
    </div>

    {/* Content Section */}
    <div className="flex-1 p-4 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Worker Info Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
              <img
                src={job.provider.avatar || "/api/placeholder/46/46"}
                alt={job.provider.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xl font-semibold text-black">
              {job.provider.username}
            </div>
          </div>
            <div className={`w-6 h-6 rounded-full ${colorMap[job.statusColor] || 'bg-gray-400'}`}></div>
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-[#E6E6E6]"></div>

        <div className="text-grey px-2 py-2">
          {job.title}
        </div>

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
              {job.priceRate}
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
  username,
  jobs,
}: SeekerDashboardMainProps) {
  const [showCompletedJobs, setShowCompletedJobs] = useState<boolean>(true);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-3">
          <h1 className="text-3xl font-bold text-[#464255]">Dashboard</h1>
          <div className="flex py-2 px-4 justify-center items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1D364B] via-[#3C6B90] to-[#1D364B]">
            <div className="text-white text-sm md:text-base font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
              Talent
            </div>
          </div>
        </div>
        <p className="text-[#2F587A] text-base font-semibold">
          Hi, {username}. Welcome back to Temu Kerja!
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-[#EBF2F7] rounded-lg shadow-lg p-8">
        {/* 2. Check if there are Jobs to display */}
        {jobs.length > 0 ? (
          <>
            {/* If jobs exist, map through them and show the button */}
            <div className="space-y-6">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <div className="flex justify-end pt-8">
              <button className="bg-[#4581B2] text-white px-9 py-4 rounded-lg text-xl font-bold hover:bg-[#3F75A1] transition-colors">
                Temukan Pekerja!
              </button>
            </div>
          </>
        ) : (
          // 3. If no orders exist, display the centered empty state message
          <div className="flex flex-col items-center justify-center text-center min-h-[800px] space-y-8">
            <div className="flex items-center gap-3 text-xl text-gray-500">
              <Search className="w-9 h-9 text-[#3F75A1]" />
              <span className="font-plusjakarta text-2xl font-bold text-[#3F75A1]">Belum Ada Pekerjaan Aktif Saat Ini!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}