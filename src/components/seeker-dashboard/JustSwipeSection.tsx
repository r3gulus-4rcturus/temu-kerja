"use client";

import { useState, JSX } from "react";
import { MapPin, ArrowLeft, ArrowRight, Star } from "lucide-react";
import JobOfferCard, { JobOffer } from './JobOfferCard'; // Import the new card and its type

// 1. Generate 10 hardcoded job offers
const jobOffers: JobOffer[] = [
  { id: 1, providerName: 'Budi Santoso', providerAvatar: 'https://i.pravatar.cc/150?u=1', jobTitle: 'Pembersihan Taman', location: 'Jakarta Selatan', schedule: '10 Juli 2025, 4 Jam', price: 350000, image: 'https://images.unsplash.com/photo-1585336261022-680e2954d18d?q=80&w=2070' },
  { id: 2, providerName: 'Citra Muzaki Lestari', providerAvatar: 'https://i.pravatar.cc/150?u=2', jobTitle: 'Perawatan Kolam Ikan', location: 'Surabaya Pusat', schedule: '12 Juli 2025, 2 Jam', price: 200000, image: 'https://images.unsplash.com/photo-1595433362558-15f575de2f35?q=80&w=2070' },
  { id: 3, providerName: 'Agus Wijaya', providerAvatar: 'https://i.pravatar.cc/150?u=3', jobTitle: 'Mengecat Pagar Rumah', location: 'Bandung Kota', schedule: '15 Juli 2025, 6 Jam', price: 500000, image: 'https://images.unsplash.com/photo-1600181523338-a009403435ER?q=80&w=2070' },
  { id: 4, providerName: 'Dewi Naufal Anggraini', providerAvatar: 'https://i.pravatar.cc/150?u=4', jobTitle: 'Merakit Furnitur IKEA', location: 'Tangerang Selatan', schedule: '18 Juli 2025, 3 Jam', price: 250000, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1974' },
  { id: 5, providerName: 'Naufal Eko Prasetyo', providerAvatar: 'https://i.pravatar.cc/150?u=5', jobTitle: 'Bantuan Pindahan Rumah', location: 'Bekasi Barat', schedule: '20 Juli 2025, 8 Jam', price: 800000, image: 'https://images.unsplash.com/photo-1598908312402-5443497d3c1d?q=80&w=2070' },
  { id: 6, providerName: 'Fitriani', providerAvatar: 'https://i.pravatar.cc/150?u=6', jobTitle: 'Memasak untuk Acara Keluarga', location: 'Depok', schedule: '22 Juli 2025, 5 Jam', price: 450000, image: 'https://images.unsplash.com/photo-1600565193348-f74d3c2723a9?q=80&w=2070' },
  { id: 7, providerName: 'Rafsanjani', providerAvatar: 'https://i.pravatar.cc/150?u=7', jobTitle: 'Mengajar Les', location: 'Depok', schedule: '15 Juli 2025, 2 Jam', price: 200000, image: 'https://images.unsplash.com/photo-1567697629362-a8a8f34521b2?q=80&w=2070' },
  { id: 8, providerName: 'Hesti Purwanti', providerAvatar: 'https://i.pravatar.cc/150?u=8', jobTitle: 'Jasa Fotografi Produk', location: 'Jakarta Pusat', schedule: '28 Juli 2025, 2 Jam', price: 750000, image: 'https://images.unsplash.com/photo-1520342891905-555535b734b5?q=80&w=2070' },
  { id: 9, providerName: 'Indra Permana', providerAvatar: 'https://i.pravatar.cc/150?u=9', jobTitle: 'Membuat Website Sederhana', location: 'Online', schedule: '1-5 Agustus 2025', price: 1500000, image: 'https://images.unsplash.com/photo-1555066931-4365d1469c98?q=80&w=2070' },
  { id: 10, providerName: 'Joko Susilo', providerAvatar: 'https://i.pravatar.cc/150?u=10', jobTitle: 'Membersihkan AC', location: 'Jakarta Timur', schedule: '7 Agustus 2025, 1 Jam', price: 150000, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070' },
];

export default function JustSwipeSection(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorited, setFavorited] = useState<Record<number, boolean>>({});

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % jobOffers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + jobOffers.length) % jobOffers.length);
  };

  const handleFavorite = () => {
    const currentId = jobOffers[currentIndex].id;
    setFavorited((prev) => ({
      ...prev,
      [currentId]: !prev[currentId], // Toggle the favorited state for the current card
    }));
  };

  const isCurrentFavorited = favorited[jobOffers[currentIndex].id];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm p-4 md:p-8 relative overflow-hidden min-h-[600px]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-24 hidden md:block"><MapPin className="w-6 h-6 text-blue-400" /></div>
        <div className="absolute bottom-8 left-40 hidden md:block"><MapPin className="w-5 h-5 text-blue-400" /></div>
        <div className="absolute top-40 right-12 w-24 h-24 bg-blue-200 rounded-full hidden md:block"></div>
        <div className="absolute bottom-20 left-8 w-32 h-32 bg-blue-100 rounded-full hidden md:block"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-center mb-8">
        <h1 className="w-full max-w-4xl text-3xl md:text-4xl font-bold leading-tight text-center bg-gradient-to-r from-[#1D364B] via-[#5B7E9B] to-[#3F75A1] bg-clip-text text-transparent" style={{ textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Just Swipe! Jelajah Sekitar dan Temukan Kecocokan
        </h1>
        <p className="w-full max-w-2xl text-[#3F75A1] text-center text-lg md:text-xl font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
          Geser untuk menjelajah rekomendasi pekerjaanmu. Beri bintang untuk mengirimkan lamaran!
        </p>
      </div>

      {/* Swipe Card Interface */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto rounded-lg bg-[#EBF2F7] shadow-lg p-4 sm:p-8 md:p-16">
        <div className="relative w-full h-[650px] md:h-[700px]">
          {/* Layered Background Cards (for desktop) */}
          <div className="absolute inset-0 hidden md:block">
            <div className="absolute left-10 top-[75px] w-[calc(100%-80px)] h-[586px] bg-[#CBDFEE] rounded-[27px]"></div>
            <div className="absolute left-5 top-[61px] w-[calc(100%-40px)] h-[586px] bg-[#B2D1EA] rounded-[27px]"></div>
          </div>

          {/* Main Card Area */}
          <JobOfferCard offer={jobOffers[currentIndex]} />

          {/* Swipe Controls */}
          <div className="absolute -bottom-8 sm:-bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[384px] h-[127px] flex justify-center items-center gap-4 md:gap-10">
            <div className="absolute inset-x-0 top-4 h-24 bg-white rounded-[51px] shadow-lg"></div>
            
            <button onClick={handlePrev} className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-[#3F75A1] rounded-full flex items-center justify-center hover:bg-[#366A8F] active:bg-[#2F587A] transition-colors">
              <ArrowLeft className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </button>

            <button onClick={handleFavorite} className={`relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-colors duration-300 ${isCurrentFavorited ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-[#F64D64] hover:bg-[#E04458]'}`}>
              <Star className="w-12 h-12 md:w-16 md:h-16 text-white" fill={isCurrentFavorited ? 'white' : 'none'} />
            </button>

            <button onClick={handleNext} className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-[#3F75A1] rounded-full flex items-center justify-center hover:bg-[#366A8F] active:bg-[#2F587A] transition-colors">
              <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
