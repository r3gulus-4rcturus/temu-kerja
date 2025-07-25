"use client"

import { MapPin, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RegistrationSuccessPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // const registrationData = localStorage.getItem("registrationData")
    // console.log("FINALRegistration Data:", registrationData)
    const role = localStorage.getItem("role")
    if (role) {
      setUserRole(role)
    } else {
      router.push("/register")
      return
    }

    setIsLoading(false)
  }, [router])

  const handleAddJob = () => {
    router.push("/add-job/job-details")
  }

  const handleSkipForNow = () => {
    router.push("/seeker-dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Optional role-based guard
  if (userRole === "jobprovider") {
    router.push("/dashboard")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-12">
        <div className="w-full max-w-2xl text-center">
          {/* Success Message */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Akun Berhasil Dibuat!</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Selanjutnya, unggah pekerjaanmu sekarang!
            </h2>
            <div className="space-y-2 text-gray-600 max-w-xl mx-auto">
              <p>Isi informasi mengenai pekerjaan anda dengan lengkap untuk mulai bekerja!</p>
              <p>Anda bisa memiliki lebih dari satu peran pekerjaan!</p>
            </div>
          </div>

          {/* Add Job Button */}
          <div className="space-y-4">
            <button
              onClick={handleAddJob}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-white border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors text-lg"
            >
              <Plus className="w-6 h-6" />
              <span>Tambah Pekerjaan</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
