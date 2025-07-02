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
    <div className="bg-white rounded-lg shadow-sm p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-700">Rating dan Ulasanmu!</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(currentReviewIndex, currentReviewIndex + 3).map((review) => (
          <div key={review.id} className="relative bg-gray-50 rounded-lg overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={review.backgroundImage || "/placeholder.svg"}
                alt="Work background"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col">
              {/* Reviewer Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={review.reviewerAvatar || "/placeholder.svg"}
                    alt={review.reviewerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{review.reviewerName}</h3>
                  <p className="text-sm text-gray-600">{review.timeAgo}</p>
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-1 mb-4">
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">{review.reviewText}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                <span className="font-semibold text-gray-900">{review.rating}</span>
              </div>
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
