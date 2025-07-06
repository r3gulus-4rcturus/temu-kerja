"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

type Review = {
  id: string | number
  reviewerName: string
  reviewerAvatar?: string
  rating: number
  reviewText: string
  timeAgo: string
  backgroundImage?: string
}

type RatingUlasanSectionProps = {
  reviews: Review[]
}

export default function RatingUlasanSection({ reviews }: RatingUlasanSectionProps) {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const nextReviews = () => {
    if (currentReviewIndex + 3 < reviews.length) {
      setCurrentReviewIndex(currentReviewIndex + 1)
    }
  }

  const prevReviews = () => {
    if (currentReviewIndex > 0) {
      setCurrentReviewIndex(currentReviewIndex - 1)
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-300 absolute" />
            <div className="overflow-hidden w-1/2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />)
      }
    }

    return stars
  }

  return (
    <div className="rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
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
              Rating dan Ulasanmu!</h1> </div> </div>

        {reviews.length > 3 && (
          <div className="flex gap-2">
            <button
              onClick={prevReviews}
              disabled={currentReviewIndex === 0}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextReviews}
              disabled={currentReviewIndex + 3 >= reviews.length}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {reviews.slice(currentReviewIndex, currentReviewIndex + 2).map((review) => (
          <div key={review.id} className="flex bg-gray-50 rounded-2xl shadow-lg overflow-hidden">

            {/* Left Side: Review Content */}
            <div className="p-6 flex flex-col flex-1">
              {/* Reviewer Info */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={review.reviewerAvatar || "/placeholder.svg"}
                    alt={review.reviewerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{review.reviewerName}</h3>
                  <p className="text-sm text-gray-500">{review.timeAgo}</p>
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-grow mb-5">
                <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-yellow-500">
                  {/* The renderStars function should generate star icons. 
                Example: <StarIcon className="w-5 h-5" /> */}
                  {renderStars(review.rating)}
                </div>
                <span className="font-semibold text-gray-800 text-lg">{review.rating}</span>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="hidden sm:block sm:w-2/5 flex-shrink-0">
              <img
                src={review.backgroundImage || "/placeholder.svg"}
                alt="Work background"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Show more reviews indicator */}
      {reviews.length > 3 && (
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Menampilkan {Math.min(currentReviewIndex + 3, reviews.length)} dari {reviews.length} ulasan
          </p>
        </div>
      )}
    </div>
  )
}
