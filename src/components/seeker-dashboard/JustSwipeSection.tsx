"use client"

import { useState, JSX, useEffect } from "react"
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  Star,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react"
import { Job } from "../../lib/actions/fetchJobForSeeker.actions"
import { handleSeekerInterest } from "../../lib/actions/seeker.actions"
import Image from "next/image"

// ---
// Child Component for displaying a single job offer
// ---
const JobOfferCard: React.FC<{ job: Job }> = ({ job }) => {
  const date = new Date(job.dateTime)
  const schedule = `${date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}, ${date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })}`

  return (
    <div className="absolute left-0 top-0 w-full h-[620px] flex flex-col md:flex-row shadow-2xl rounded-[32px] bg-[#8CB1D0]">
      <div className="flex flex-col items-start gap-4 p-6 md:p-8 text-white w-full">
        <div className="flex py-2 px-4 justify-center items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1D364B] via-[#3C6B90] to-[#1D364B]">
          <div
            className="text-white text-sm md:text-base font-semibold"
            style={{ fontFamily: "Urbanist, sans-serif" }}
          >
            Rekomendasi Pekerjaan
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden border-2 border-white">
            <Image
              src={`https://i.pravatar.cc/150?u=${job.provider.username}`}
              alt={job.provider.username}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="text-white text-xl font-semibold"
            style={{ fontFamily: "Urbanist, sans-serif" }}
          >
            {job.provider.username}
          </div>
        </div>
        <div
          className="text-white text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          {job.title}
        </div>
        <div
          className="flex flex-col items-start gap-2 w-full"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <p className="text-sm font-semibold flex items-center gap-1">
            <MapPin size={16} /> Lokasi:
          </p>
          <p className="pl-5">{job.location}</p>
          <p className="text-sm font-semibold mt-2">Jadwal:</p>
          <p className="pl-5">{schedule}</p>
        </div>
        <div className="w-full mt-auto pt-4">
          <div className="h-px w-full bg-white my-3 opacity-50"></div>
          <div
            className="text-white text-base font-semibold"
            style={{ fontFamily: "Urbanist, sans-serif" }}
          >
            Estimasi Tarif
          </div>
          <div
            className="text-white text-2xl font-bold"
            style={{ fontFamily: "Urbanist, sans-serif" }}
          >
            Rp {job.priceRate.toLocaleString("id-ID")}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---
// Main Component
// ---

interface JustSwipeSectionProps {
  randomJobs: Job[]
}

export default function JustSwipeSection({
  randomJobs = [],
}: JustSwipeSectionProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorited, setFavorited] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: "success" | "error" | "info"
  } | null>(null)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleNext = () => {
    if (randomJobs.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % randomJobs.length)
  }

  const handlePrev = () => {
    if (randomJobs.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + randomJobs.length) % randomJobs.length)
  }

  const handleFavorite = async () => {
    if (randomJobs.length === 0 || isSubmitting) return

    const currentJob = randomJobs[currentIndex]
    const currentId = currentJob.id

    if (favorited[currentId]) {
      setNotification({
        message: "You have already sent an application for this job.",
        type: "info",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const result = await handleSeekerInterest(currentId)
      if (result.success) {
        setFavorited((prev) => ({
          ...prev,
          [currentId]: true,
        }))
        setNotification({ message: result.message, type: "success" })
        setTimeout(handleNext, 500)
      } else {
        setNotification({ message: result.message, type: "error" })
      }
    } catch (error) {
      console.error("Failed to handle interest:", error)
      setNotification({
        message: "An unexpected error occurred.",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isCurrentFavorited =
    randomJobs.length > 0 ? favorited[randomJobs[currentIndex].id] : false

  const getNotificationStyle = () => {
    if (!notification) return {}
    switch (notification.type) {
      case "success":
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          borderColor: "border-green-200",
        }
      case "error":
        return {
          icon: <XCircle className="w-6 h-6 text-red-500" />,
          borderColor: "border-red-200",
        }
      case "info":
        return {
          icon: <Info className="w-6 h-6 text-blue-500" />,
          borderColor: "border-blue-200",
        }
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm p-4 md:p-8 relative overflow-hidden min-h-[850px]">
      {/* Notification Popup */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-500">
          <div
            className={`bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border ${
              getNotificationStyle().borderColor
            }`}
          >
            {getNotificationStyle().icon}
            <p className="font-medium text-gray-800">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-24 hidden md:block">
          <MapPin className="w-6 h-6 text-blue-400" />
        </div>
        <div className="absolute bottom-8 left-40 hidden md:block">
          <MapPin className="w-5 h-5 text-blue-400" />
        </div>
        <div className="absolute top-40 right-12 w-24 h-24 bg-blue-200 rounded-full hidden md:block"></div>
        <div className="absolute bottom-20 left-8 w-32 h-32 bg-blue-100 rounded-full hidden md:block"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-center mb-8">
        <h1
          className="w-full max-w-4xl text-3xl md:text-4xl font-bold leading-tight text-center bg-gradient-to-r from-[#1D364B] via-[#5B7E9B] to-[#3F75A1] bg-clip-text text-transparent"
          style={{
            textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Just Swipe! Jelajah Sekitar dan Temukan Kecocokan
        </h1>
        <p
          className="w-full max-w-2xl text-[#3F75A1] text-center text-lg md:text-xl font-semibold"
          style={{ fontFamily: "Urbanist, sans-serif" }}
        >
          Geser untuk menjelajah rekomendasi pekerjaanmu. Beri bintang untuk
          mengirimkan lamaran!
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
          {randomJobs.length > 0 ? (
            <JobOfferCard job={randomJobs[currentIndex]} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Tidak ada pekerjaan yang direkomendasikan saat ini.
            </div>
          )}

          {/* Swipe Controls */}
          <div className="absolute -bottom-8 sm:-bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[384px] h-[127px] flex justify-center items-center gap-4 md:gap-10">
            <div className="absolute inset-x-0 top-4 h-24 bg-white rounded-[51px] shadow-lg"></div>

            <button
              onClick={handlePrev}
              disabled={randomJobs.length < 2}
              className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-[#3F75A1] rounded-full flex items-center justify-center hover:bg-[#366A8F] active:bg-[#2F587A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </button>

            <button
              onClick={handleFavorite}
              disabled={
                randomJobs.length === 0 || isSubmitting || isCurrentFavorited
              }
              className={`relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-colors duration-300 ${
                isCurrentFavorited
                  ? "bg-yellow-400"
                  : "bg-[#F64D64] hover:bg-[#E04458]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Star
                className="w-12 h-12 md:w-16 md:h-16 text-white"
                fill={isCurrentFavorited ? "white" : "none"}
              />
            </button>

            <button
              onClick={handleNext}
              disabled={randomJobs.length < 2}
              className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-[#3F75A1] rounded-full flex items-center justify-center hover:bg-[#366A8F] active:bg-[#2F587A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
