"use client"

import { JSX, useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Bot, CheckCircle } from "lucide-react"

interface FormDataState {
  cvFile: File | null
  portfolioLinks: string
  additionalNotes: string
}

export default function UploadCVPage(): JSX.Element {
  const router = useRouter()
  const [formData, setFormData] = useState<FormDataState>({
    cvFile: null,
    portfolioLinks: "",
    additionalNotes: "",
  })
  const [showNotification, setShowNotification] = useState(false) // State for the notification

  const handleFileUpload = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      cvFile: file,
    }))
  }

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      cvFile: null,
    }))
  }

  const handleAIGeneratorClick = () => {
    const currentProgress = {
      step: 4,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("jobCreationProgress", JSON.stringify(currentProgress))
    router.push("/cv-generator")
  }

  const handleBack = () => {
    router.push("/add-job/wages")
  }

  const handleNext = async () => {
    if (!formData.cvFile) {
      alert("Silakan unggah CV atau buat CV menggunakan AI terlebih dahulu")
      return
    }

    const allJobData = JSON.parse(localStorage.getItem("addJobData") || "{}")
    const updatedData = {
      ...allJobData,
      cvFile: formData.cvFile,
      portfolioLinks: formData.portfolioLinks,
      additionalNotes: formData.additionalNotes,
      step: 4,
      completed: true,
    }
    localStorage.setItem("addJobData", JSON.stringify(updatedData))
    // console.log(">>> FINAL Job Data:", localStorage.getItem("addJobData"))
    // const data = JSON.parse(localStorage.getItem("addJobData") || "{}")
    // console.log("jobName:", data.jobDetails?.jobName)
    // console.log("jobDescription:", data.jobDetails?.jobDescription)
    // console.log("categories:", data.jobDetails?.categories)
    // console.log("skillLevel:", data.workloadEstimation?.skillLevel)
    // console.log("workload:", data.workloadEstimation?.workload)
    // console.log("dailyDuration:", data.workloadEstimation?.dailyDuration)
    // console.log("rateType:", data.wages?.rateType)
    // console.log("minRate:", data.wages?.minRate)
    // console.log("maxRate:", data.wages?.maxRate)

    try {
      const parsedData = updatedData

      const res = await fetch("/api/add-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      })

      if (!res.ok) {
        const { error } = await res.json()
        alert(`Job creation failed: ${error}`)
        return
      }

      // Show notification instead of alert
      setShowNotification(true)
      localStorage.removeItem("addJobData")
      localStorage.removeItem("registrationData")

      // Redirect after a delay
      setTimeout(() => {
        router.push("/seeker-dashboard")
      }, 2000) // 2-second delay
    } catch (error) {
      console.error("Error submitting job data:", error)
      alert(
        "Terjadi kesalahan saat mengirim data pekerjaan. Silakan coba lagi."
      )
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return "File uploaded"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-500">
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border border-green-200">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <p className="font-medium text-gray-800">
              Pekerjaan berhasil dibuat!
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Unggah CV atau Portfolio
          </h1>
          <p className="text-gray-600 mb-6">
            CV/Portfolio adalah rangkuman pengalaman kerja dan sertifikasi yang
            Anda miliki.
          </p>

          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
            <div className="w-8 h-1 bg-blue-600 rounded"></div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            CV/Portfolio/Pengalaman Kerja
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-600 mb-4">
              Unggah CV/Portfolio
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {!formData.cvFile ? (
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handleFileUpload(file)
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-blue-600 font-medium mb-1">
                    Unggah Dokumen Anda Di sini!
                  </p>
                  <p className="text-xs text-gray-500">
                    Format: PDF, DOC, DOCX (Max: 5MB)
                  </p>
                </div>
              ) : (
                <div className="border-2 border-green-300 rounded-lg p-6 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {formData.cvFile.name}
                      </p>
                      <p className="text-xs text-green-600">
                        {formatFileSize(formData.cvFile.size)}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={handleAIGeneratorClick}
              className="bg-blue-100 border-2 border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-200 transition-colors"
            >
              <Bot className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-900 mb-2">
                Rekomendasi!
              </h3>
              <p className="text-sm text-blue-700">
                Buat CV Anda dengan mudah menggunakan AI!
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Kembali
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  )
}
