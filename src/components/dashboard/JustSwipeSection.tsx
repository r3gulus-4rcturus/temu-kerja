"use client";

import { useState } from "react";
import { FullApplication, acceptApplication } from "../../lib/actions/application.actions";
import ApplicationCard from "./ApplicationCard";
import { ArrowLeft, ArrowRight, Star, MapPin } from "lucide-react";


interface JustSwipeSectionProps {
  applications: FullApplication[];
}

// Add a default empty array to the applications prop to prevent errors
export default function JustSwipeSection({ applications = [] }: JustSwipeSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAccepting, setIsAccepting] = useState(false);

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

  // Handler for the "accept" action
  const handleAccept = async () => {
    if (isAccepting || applications.length === 0) return;

    setIsAccepting(true);
    const currentApplicationId = applications[currentIndex].id;
    
    await acceptApplication(currentApplicationId);
    
    // Note: The page will automatically re-render with the updated application list
    // because of the `revalidatePath` call in the server action.
    // We reset the index and loading state.
    setCurrentIndex(0);
    setIsAccepting(false);
  };

  const currentApplication = applications.length > 0 ? applications[currentIndex] : null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm p-8 relative overflow-hidden min-h-[600px]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-24"><MapPin className="w-6 h-6 text-blue-400" /></div>
        <div className="absolute bottom-40 right-8"><MapPin className="w-8 h-8 text-blue-300" /></div>
        <div className="absolute bottom-8 left-40"><MapPin className="w-5 h-5 text-blue-400" /></div>
        <div className="absolute top-40 right-12 w-24 h-24 bg-blue-200 rounded-full"></div>
        <div className="absolute bottom-20 left-8 w-32 h-32 bg-blue-100 rounded-full"></div>
      </div>

      {/* Header */}
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
          {/* Layered Background Cards */}
          <div className="absolute inset-0">
            <div className="absolute left-10 top-[75px] w-[722px] h-[586px] bg-[#CBDFEE] rounded-[27px]"></div>
            <div className="absolute left-5 top-[61px] w-[761px] h-[586px] bg-[#B2D1EA] rounded-[27px]"></div>
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

            {/* Star/Accept Button */}
            <button onClick={handleAccept} disabled={isAccepting || applications.length === 0} className="relative w-[127px] h-[127px] bg-[#F64D64] rounded-full flex items-center justify-center hover:bg-[#E04458] active:bg-[#C93C4D] transition-colors disabled:opacity-50 disabled:cursor-wait">
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
