"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

// ---
// Interfaces for Data Structures
// ---

interface Job {
  id: string; // Assuming each job has a unique ID for the key prop
  date: string;
  dateRange: string;
  time: string;
  avatar?: string; // Optional if some jobs might not have an avatar
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
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
    {/* Date Card */}
    <div className="bg-blue-300 rounded-lg p-4 text-center min-w-[100px]">
      <div className="text-sm text-blue-800 font-medium">{job.date}</div>
      <div className="text-lg font-bold text-blue-900">{job.dateRange}</div>
      <div className="text-xs text-blue-700 mt-1">{job.time}</div>
    </div>

    {/* Job Info */}
    <div className="flex items-center gap-3 flex-1">
      <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
        <img src={job.avatar || "/placeholder.svg"} alt={job.provider} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900">{job.provider}</span>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900">{job.jobTitle}</div>
          <div className="text-sm text-gray-600">
            <span>Status : {job.status}</span>
          </div>
          <div className="text-sm text-gray-600">
            <span>Lokasi : {job.location}</span>
          </div>
          <div className="text-sm text-gray-600">
            <span>Tarif : {job.tariff}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Status Indicator */}
    <div className={`w-4 h-4 rounded-full ${job.statusColor}`}></div>
  </div>
)

// ---
// SeekerDashboardMain Component
// ---

export default function SeekerDashboardMain({ jobs, completedJobs }: SeekerDashboardMainProps) {
  const [showCompletedJobs, setShowCompletedJobs] = useState<boolean>(true)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">Talent</span>
      </div>
      <p className="text-gray-600 mb-6">Hi, Mukhlis. Welcome back to Temu Kerja!</p>

      {/* Active Jobs */}
      <div className="space-y-4 mb-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Completed Jobs Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Selesai</h3>
          <button
            onClick={() => setShowCompletedJobs(!showCompletedJobs)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showCompletedJobs ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {showCompletedJobs && (
          <div className="space-y-4">
            {completedJobs.map((job) => (
              <div key={job.id}>
                <JobCard job={job} />
                <div className="flex justify-end mt-2 mb-4">
                  <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Beri Penilaian
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Temukan Pekerjaan!
        </button>
      </div>
    </div>
  )
}