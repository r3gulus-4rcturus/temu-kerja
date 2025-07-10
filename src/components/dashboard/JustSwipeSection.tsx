"use client";

import { useState } from "react";
import { FullApplication } from "../../lib/actions/fetchPropsForDashboard";
import { handleProviderInterest } from "../../lib/actions/provider.actions";
import ApplicationCard from "./ApplicationCard";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

interface JustSwipeSectionProps {
  applications: FullApplication[];
}

// Add a default empty array to the applications prop to prevent errors
export default function JustSwipeSection({ applications = [] }: JustSwipeSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [favorited, setFavorited] = useState<Record<string, boolean>>({});

  // Handler to move to the next application
  const handleNext = () => {
    // Add a guard clause to prevent errors if the array is empty
    if (applications.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % applications.length);
  };

  // Handler to move to the previous application
  const handlePrev = () => {
    // Add a guard clause
    if (applications.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + applications.length) % applications.length);
  };

  const handleFavorite = async () => {
    if (applications.length === 0 || isSubmitting) return;

    const currentApplication = applications[currentIndex];
    const applicationId = currentApplication.id;

    console.log("xxxxxx=", applicationId)

    if (favorited[applicationId]) {
        alert("You have already interacted with this application in this session.");
        return;
    }

    setIsSubmitting(true);
    try {
        const result = await handleProviderInterest(applicationId);
        if (result.success) {
            setFavorited(prev => ({ ...prev, [applicationId]: true }));
            alert(result.message);
            handleNext(); // Move to the next card
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Failed to handle interest:", error);
        alert("An unexpected error occurred.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const currentApplication = applications.length > 0 ? applications[currentIndex] : null;
  const isCurrentFavorited = currentApplication ? favorited[currentApplication.id] : false;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm p-8 relative overflow-hidden min-h-[850px]">
      <div className="relative z-10 flex flex-col items-center gap-2 text-center mb-8">
        <h1 className="w-full max-w-4xl text-4xl font-bold leading-[120%] text-center bg-gradient-to-r from-[#1D364B] via-[#5B7E9B] to-[#3F75A1] bg-clip-text text-transparent" style={{ textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Just Swipe! Jelajah Sekitar dan Temukan Kecocokan
        </h1>
        <p className="w-full max-w-2xl text-[#3F75A1] text-center text-xl font-semibold leading-[151%]" style={{ fontFamily: "Urbanist, sans-serif" }}>
          Fitur rekomendasi pekerja di sekitar wilayahmu. Geser untuk menjelajah. Beri bintang untuk menerima lamaran mereka!
        </p>
      </div>

      {/* Swipe Card Interface */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto rounded-lg bg-[#EBF2F7] shadow-lg p-16">
        <div className="relative w-full max-w-4xl h-[700px]">
          <div className="absolute inset-0 hidden md:block">
            <div className="absolute left-10 top-[75px] w-[calc(100%-80px)] h-[586px] bg-[#CBDFEE] rounded-[27px]"></div>
            <div className="absolute left-5 top-[61px] w-[calc(100%-40px)] h-[586px] bg-[#B2D1EA] rounded-[27px]"></div>
            <div className="absolute left-0 top-0 w-[804px] h-[633px] bg-[#8CB1D0] rounded-[27px]"></div>
          </div>

          {/* Main Card Area */}
          {currentApplication ? (
            <ApplicationCard application={currentApplication} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-2xl font-semibold text-gray-500">Tidak ada lamaran yang menunggu.</p>
            </div>
          )}

          {/* Swipe Controls */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[584px] w-[384px] h-[127px] flex justify-center items-center gap-10 drop-shadow-lg">
            <div className="absolute inset-0 top-4 h-24 bg-white rounded-[51px] shadow-lg"></div>
            
            {/* Left Button */}
            <button onClick={handlePrev} disabled={applications.length < 2} className="relative w-[77px] h-[77px] bg-[#3F75A1] rounded-full flex items-center justify-center hover:bg-[#366A8F] active:bg-[#2F587A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowLeft className="w-10 h-10 text-white" />
            </button>
            <button onClick={handleFavorite} disabled={!currentApplication || isSubmitting || isCurrentFavorited} className={`relative w-[127px] h-[127px] rounded-full flex items-center justify-center transition-colors duration-300 ${isCurrentFavorited ? 'bg-yellow-400' : 'bg-[#F64D64] hover:bg-[#E04458]'} disabled:opacity-50 disabled:cursor-wait`}>
              <Star className="w-16 h-16 text-white" />
            </button>

            {/* Right Button */}
            <button onClick={handleNext} disabled={applications.length < 2} className="relative w-[77px] h-[77px] bg-[#3F75A1] rounded-full flex items-center justify-center hover:bg-[#366A8F] active:bg-[#2F587A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowRight className="w-10 h-10 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
