"use client";

import { JSX, useState } from "react";
import { Job } from "../../lib/actions/fetchJobForSeeker.actions";

// ---
// Interfaces and Props
// ---

interface MatchSectionProps {
  negotiationJobs: Job[];
  sentJobs: Job[];
}

const MatchJobCard: React.FC<{ job: Job }> = ({ job }) => {
    const date = new Date(job.dateTime);
    const schedule = `${date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}, ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;

    return (
        <div className="flex h-auto md:h-48 items-stretch w-full rounded-xl bg-white shadow-lg">
            <img src={job.provider.avatar} alt={job.provider.username} className="w-1/3 md:w-48 h-auto md:h-48 object-cover rounded-l-xl" />
            <div className="flex w-full flex-col md:flex-row py-4 px-6 justify-between items-start md:items-center">
                <div className="flex flex-col items-start gap-2">
                    <div className="text-[#4581B2] text-xl font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>{job.title}</div>
                    <div className="flex flex-col items-start">
                        <div className="text-gray-600 text-sm">Oleh: {job.provider.username}</div>
                        <div className="text-[#2F587A] text-base md:text-lg font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>{job.location}</div>
                    </div>
                    <div className="flex flex-wrap items-start gap-2 text-sm">
                        <div className="flex py-1 px-2 justify-center items-center gap-2.5 rounded-full bg-[#EBF2F7]"><div className="text-[#1D364B] font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>Jadwal: {schedule}</div></div>
                        <div className="flex py-1 px-2 justify-center items-center gap-2.5 rounded-full bg-[#EBF2F7]"><div className="text-[#1D364B] font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>Tarif: Rp {job.priceRate.toLocaleString('id-ID')}</div></div>
                    </div>
                </div>
                <div className="flex w-full md:w-auto mt-4 md:mt-0 items-center justify-end gap-4 cursor-pointer">
                    <div className="text-[#4581B2] text-xl font-semibold" style={{ fontFamily: "Urbanist, -apple-system, Roboto, Helvetica, sans-serif" }}>Hubungi</div>
                    <div className="w-12 h-12 bg-[#3F75A1] rounded-full flex items-center justify-center">
                        <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.334 2C6.003 2 0 7.33374 0 14C0 16.1636 0.645 18.2592 1.833 20.0815C2.023 20.3735 2.188 21.0333 2.083 21.6652C1.976 22.3184 1.635 22.957 0.959 23.3316C0.748 23.4489 0.007 23.7742 0 24.6647C-0.007 25.5552 0.761 25.9938 1.333 25.9978C2.687 26.0084 11.004 25.9978 13.334 25.9978C20.664 25.9978 26.667 20.6641 26.667 14C26.667 7.33589 20.664 2 13.334 2ZM13.334 4.66635C19.258 4.66635 24 8.88153 24 14C24 19.1185 19.258 23.3337 13.334 23.3337C11.563 23.3337 7.499 23.3337 4.333 23.3337C4.945 22.0633 4.9 20.0463 4.041 18.6266C3.18 17.2002 2.667 15.6404 2.667 14C2.667 8.88374 7.409 4.66635 13.334 4.66635ZM8 12.6667C7.264 12.6667 6.667 13.264 6.667 14C6.667 14.736 7.264 15.3333 8 15.3333C8.736 15.3333 9.333 14.736 9.333 14C9.333 13.264 8.736 12.6667 8 12.6667ZM13.334 12.6667C12.598 12.6667 12 13.264 12 14C12 14.736 12.598 15.3333 13.334 15.3333C14.07 15.3333 14.667 14.736 14.667 14C14.667 13.264 14.07 12.6667 13.334 12.6667ZM18.667 12.6667C17.931 12.6667 17.334 13.264 17.334 14C17.334 14.736 17.931 15.3333 18.667 15.3333C19.403 15.3333 20 14.736 20 14C20 13.264 19.403 12.6667 18.667 12.6667Z" fill="white" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function MatchSection({ negotiationJobs = [], sentJobs = [] }: MatchSectionProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'match' | 'sent'>('match');

  const jobsToDisplay = activeTab === 'match' ? negotiationJobs : sentJobs;

  return (
    <div className="relative w-full max-w-screen-xl">
      {/* Background illustration */}
      <div className="absolute right-0 top-0 w-[506px] h-[476px] opacity-20">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dee5f658d4580300ea80bd89cc52a07bf913e25c?width=1013"
          alt="Background illustration"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col items-start gap-10 w-full h-auto pt-16">
        {/* Header */}
        <div className="flex flex-col items-start gap-1 w-full">
          <h1
            className="text-4xl font-bold leading-[120%] bg-gradient-to-r from-[#1D364B] via-[#5B7E9B] to-[#3F75A1] bg-clip-text text-transparent"
            style={{
              textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
              fontFamily:
                "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Match! Kalian sama-sama tertarik!
          </h1>
          <p
            className="text-[#2F587A] text-xl font-semibold leading-[200%]"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Peluang kerja lebih besar karena penyedia kerja juga tertarik
            mempekerjakan Anda!
          </p>
        </div>

        {/* Matched Job Cards */}
        <div className="flex flex-col items-start gap-6 w-full relative">
            <div className="flex justify-center items-center w-full rounded-lg border border-[#D9D9D9] bg-white relative">
                <div onClick={() => setActiveTab('match')} className={`flex h-11 flex-col justify-center items-center flex-1 relative cursor-pointer ${activeTab === 'match' ? 'text-[#3F75A1]' : 'text-[#1D364B]'}`}>
                    {activeTab === 'match' && <div className="absolute top-0 left-0 w-full h-1 rounded-full bg-gradient-to-r from-[#386DB1] to-[#BDD6F6]"></div>}
                    <div className="font-bold">Match!</div>
                </div>
                <div onClick={() => setActiveTab('sent')} className={`flex h-11 py-2.5 px-6 justify-center items-center gap-1.5 flex-1 rounded-lg cursor-pointer ${activeTab === 'sent' ? 'text-[#3F75A1]' : 'text-[#1D364B]'}`}>
                    {activeTab === 'sent' && <div className="absolute top-0 left-0 w-full h-1 rounded-full bg-gradient-to-r from-[#386DB1] to-[#BDD6F6]"></div>}
                    <div className="font-bold">Daftar Lamaran</div>
                </div>
            </div>
            <div className="flex flex-col gap-6 w-full">
                {jobsToDisplay.length > 0 ? (
                    jobsToDisplay.map((job) => <MatchJobCard key={job.id} job={job} />)
                ) : (
                    <div className="text-center w-full py-12 text-gray-500">Tidak ada pekerjaan dalam kategori ini.</div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
