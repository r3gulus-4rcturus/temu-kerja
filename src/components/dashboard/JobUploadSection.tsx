"use client"; // Convert to a client component to use state and event handlers

import { useState, JSX } from "react";
import JobFormModal from "./JobFormModal"; // Import the modal
import { Job } from "@prisma/client";


interface JobUploadSectionProps {
  userId: string;
  jobs: Job[];
}

export default function JobUploadSection({ userId, jobs }: JobUploadSectionProps): JSX.Element {
  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-start gap-10 w-full max-w-screen-xl h-auto">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-1 w-full">
          <h1
            className="text-4xl font-bold leading-[120%] bg-gradient-to-r from-[#1D364B] via-[#5B7E9B] to-[#3F75A1] bg-clip-text text-transparent"
            style={{
              textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
              fontFamily: "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Unggah Lowongan Pekerjaan
          </h1>
          <p
            className="text-[#2F587A] text-xl font-semibold leading-[200%]"
            style={{
              fontFamily: "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Tambahkan lowongan pekerjaan Anda!
          </p>
        </div>

        {/* Cards Section */}
        <div className="flex items-center gap-8 flex-wrap lg:flex-nowrap">
          {/* Add Job Card Button */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex h-40 w-72 py-2.5 px-8 flex-col justify-center items-center gap-2.5 rounded-2xl border-2 border-dashed border-[#2F587A] cursor-pointer hover:bg-blue-50 active:bg-blue-100 hover:border-blue-500 transition-all duration-200"
          >
            <div className="flex items-center gap-5">
              <div
                className="text-[#3F75A1] text-[44px] font-bold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                +
              </div>
              <div
                className="text-[#3F75A1] text-2xl font-bold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Tambah Pekerjaan
              </div>
            </div>
          </div>

          {/* Dynamic Job Cards */}
          {jobs.map((job) => (
            <div key={job.id} className="flex h-40 w-72 py-2.5 px-8 flex-col justify-center items-center gap-2.5 rounded-2xl border-2 border-[#2F587A]">
              <div className="flex flex-col items-center gap-8 text-center">
                <div
                  className="text-[#3F75A1] text-2xl font-bold leading-[120%] truncate w-full"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  title={job.title} // Show full title on hover
                >
                  {job.title}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[#1D364B] text-xl font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
                    Status :
                  </div>
                  <div className="flex w-28 py-2 px-2 justify-center items-center rounded-full bg-[#BCD3E5]">
                    <div className="text-[#1D364B] text-base font-semibold capitalize" style={{ fontFamily: "Urbanist, sans-serif" }}>
                      {job.status === 'open' ? 'Dibuka' : "Ditutup"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conditionally render the modal based on state */}
      {isModalOpen && (
        <JobFormModal userId={userId} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}