"use client"

import { MapPin } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, ChangeEvent, FormEvent, JSX } from "react"
import { useRouter } from "next/navigation"

interface FormData {
  skillLevel: string
  workload: string
  dailyDuration: string
}

export default function WorkloadEstimationPage(): JSX.Element {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    skillLevel: "",
    workload: "",
    dailyDuration: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [jobDetailsData, setJobDetailsData] = useState<any>(null)

  const skillLevels = [
    { value: "pemula", label: "Pemula" },
    { value: "menengah", label: "Menengah" },
    { value: "profesional", label: "Profesional" },
  ]

  const workloadTypes = [
    { value: "pekerjaan_kecil", label: "Pekerjaan Kecil" },
    { value: "pekerjaan_sedang", label: "Pekerjaan Sedang" },
    { value: "pekerjaan_besar", label: "Pekerjaan Besar" },
  ]

  const dailyDurations = [
    { value: "THREE_HOURS", label: "< 3 jam" },
    { value: "THREE_TO_SIX", label: "3-6 jam" },
    { value: "SIX_HOURS", label: "> 6 jam" },
  ]

  useEffect(() => {
    const addJobData = localStorage.getItem("addJobData")
    if (addJobData) {
      const data = JSON.parse(addJobData)
      setJobDetailsData(data.jobDetails)
    } else {
      router.push("/add-job/job-details")
    }
  }, [router])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleBack = () => {
    router.push("/add-job/job-details")
  }

  const handleContinue = (e: FormEvent) => {
    e.preventDefault()

    if (!formData.skillLevel) {
      alert("Pilih tingkat kemampuan")
      return
    }

    if (!formData.workload) {
      alert("Pilih beban pekerjaan")
      return
    }

    if (!formData.dailyDuration) {
      alert("Pilih durasi pekerjaan per-hari")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const existingData = JSON.parse(localStorage.getItem("addJobData") || "{}")

      localStorage.setItem(
        "addJobData",
        JSON.stringify({
          ...existingData,
          workloadEstimation: formData,
          currentStep: 2,
        }),
      )
      // console.log(">>> FINAL Job Data:", localStorage.getItem("addJobData"))

      router.push("/add-job/wages")
      setIsLoading(false)
    }, 1000)
  }

  if (!jobDetailsData) {
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
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Header Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Estimasi Kemampuan dan Beban Kerja</h1>
            <p className="text-gray-600 text-base mb-6">Sesuaikan tingkat kemampuan dan beban pekerjaan Anda</p>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <form onSubmit={handleContinue} className="space-y-8">
              {/* Skill Level */}
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-4">Tingkat Kemampuan</label>
                <div className="space-y-3">
                  {skillLevels.map((level) => (
                    <label key={level.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="skillLevel"
                        value={level.value}
                        checked={formData.skillLevel === level.value}
                        onChange={(e) => handleInputChange("skillLevel", e.target.value)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-3 text-gray-900 font-medium">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Workload and Duration Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Workload */}
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-4">Beban Pekerjaan</label>
                  <div className="space-y-3">
                    {workloadTypes.map((workload) => (
                      <label key={workload.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="workload"
                          value={workload.value}
                          checked={formData.workload === workload.value}
                          onChange={(e) => handleInputChange("workload", e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-900 font-medium">{workload.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Daily Duration */}
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-4">Durasi Pekerjaan per-Hari</label>
                  <div className="space-y-3">
                    {dailyDurations.map((duration) => (
                      <label key={duration.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="dailyDuration"
                          value={duration.value}
                          checked={formData.dailyDuration === duration.value}
                          onChange={(e) => handleInputChange("dailyDuration", e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-900 font-medium">{duration.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-white text-gray-600 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Lanjut..." : "Lanjut"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
