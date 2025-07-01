"use client"

import { ArrowLeft, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function WagesPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    rateType: "hourly", // "hourly" or "fixed"
    minRate: "",
    maxRate: "",
    availability: [],
    workingHours: {
      start: "",
      end: "",
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [savedData, setSavedData] = useState(null)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Check if previous steps data exists
    const addJobData = localStorage.getItem("addJobData")
    if (!addJobData) {
      router.push("/add-job/job-details")
      return
    }

    try {
      const parsedData = JSON.parse(addJobData)
      if (!parsedData.jobDetails || !parsedData.workloadEstimation) {
        router.push("/add-job/job-details")
        return
      }
      setSavedData(parsedData)

      // Load existing wages data if available
      if (parsedData.wages) {
        setFormData(parsedData.wages)
      }
    } catch (error) {
      console.error("Error parsing saved data:", error)
      router.push("/add-job/job-details")
    }
  }, [router])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Check for wage warning
    if (field === "minRate" || field === "maxRate") {
      const min = field === "minRate" ? Number.parseInt(value) : Number.parseInt(formData.minRate)
      const max = field === "maxRate" ? Number.parseInt(value) : Number.parseInt(formData.maxRate)

      if (min && max && min >= max) {
        setShowWarning(true)
      } else {
        setShowWarning(false)
      }
    }
  }

  const handleRateTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      rateType: type,
    }))
  }

  const handleAvailabilityChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }))
  }

  const handleBack = () => {
    router.push("/add-job/workload-estimation")
  }

  const handleNext = () => {
    if (!formData.minRate || !formData.maxRate) {
      alert("Mohon lengkapi range upah")
      return
    }

    if (Number.parseInt(formData.minRate) >= Number.parseInt(formData.maxRate)) {
      alert("Upah minimum harus lebih kecil dari upah maksimum")
      return
    }

    setIsLoading(true)

    // Simulate processing
    setTimeout(() => {
      // Update localStorage with current step data
      const updatedData = {
        ...savedData,
        wages: formData,
        currentStep: 3,
      }

      localStorage.setItem("addJobData", JSON.stringify(updatedData))
      router.push("/add-job/upload-cv")
      setIsLoading(false)
    }, 500)
  }

  if (!savedData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-blue-600 text-xl font-semibold">temu kerja</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-12">
        <div className="w-full max-w-4xl">
          {/* Header Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Upah Kerja</h1>
            <p className="text-gray-600 text-base mb-6">Berikan kisaran upah kerja yang Anda harapkan</p>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {/* Payment Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => handleRateTypeChange("hourly")}
                className={`p-6 rounded-xl border-2 text-center font-medium transition-all ${
                  formData.rateType === "hourly"
                    ? "border-blue-500 bg-blue-100 text-blue-800"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Bayaran Perjam
              </button>
              <button
                type="button"
                onClick={() => handleRateTypeChange("fixed")}
                className={`p-6 rounded-xl border-2 text-center font-medium transition-all ${
                  formData.rateType === "fixed"
                    ? "border-blue-500 bg-blue-100 text-blue-800"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Bayaran Tetap
              </button>
            </div>

            {/* Wage Range */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Range Upah</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Minimum Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mulai</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={formData.minRate}
                      onChange={(e) => handleInputChange("minRate", e.target.value)}
                      placeholder="50.000"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.rateType === "hourly" && <span className="text-gray-600 text-sm">per jam</span>}
                  </div>
                </div>

                {/* Maximum Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sampai</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={formData.maxRate}
                      onChange={(e) => handleInputChange("maxRate", e.target.value)}
                      placeholder="70.000"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.rateType === "hourly" && <span className="text-gray-600 text-sm">per jam</span>}
                  </div>
                </div>
              </div>

              {/* Warning Message */}
              {showWarning && (
                <div className="mt-4 text-red-600 text-sm">
                  *Peringatan : Upah Anda tidak layak berdasarkan beban kerja Anda. Masukkan Upah lebih tinggi.
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading..." : "Lanjut"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
