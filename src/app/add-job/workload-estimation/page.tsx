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
    { value: "kecil", label: "Pekerjaan Kecil" },
    { value: "sedang", label: "Pekerjaan Sedang" },
    { value: "besar", label: "Pekerjaan Besar" },
  ]

  const dailyDurations = [
    { value: "kurang-3", label: "< 3 jam" },
    { value: "3-6", label: "3-6 jam" },
    { value: "lebih-6", label: "> 6 jam" },
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
      {/* ... UI remains unchanged ... */}
    </div>
  )
}
