"use client"

import { MapPin } from "lucide-react"
import Link from "next/link"
import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"

type PersonalInfo = {
  fullName: string
  email: string
  phoneNumber: string
  address: string
  province: string
  city: string
}

export default function PersonalInfoPage() {
  const [formData, setFormData] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    province: "",
    city: "",
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleInputChange = (
    field: keyof PersonalInfo,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      console.log("Personal info step:", formData)
      const existingData = JSON.parse(localStorage.getItem("registrationData") || "{}")
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...existingData,
          personalInfo: formData,
        })
      )
      router.push("/register/upload-id")
      setIsLoading(false)
    }, 1000)
  }

  const handleBack = () => {
    router.push("/register/role")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Header Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Daftar Akun</h1>
            <p className="text-blue-600 text-base mb-6">Buat akun baru, lengkapi informasi dirimu!</p>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-8 h-1 bg-blue-600 rounded-full" />
              <div className="w-8 h-1 bg-blue-600 rounded-full" />
              <div className="w-8 h-1 bg-gray-300 rounded-full" />
              <div className="w-8 h-1 bg-gray-300 rounded-full" />
            </div>
          </div>

          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Lengkapi Data Dirimu!</h2>
            </div>

            <form onSubmit={handleContinue} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="johndoe@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="+62 812345678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-900 mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={4}
                  placeholder="Tulis alamat lengkap anda ..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Province & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-900 mb-2">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    id="province"
                    value={formData.province}
                    onChange={(e) => handleInputChange("province", e.target.value)}
                    placeholder="Jawa Barat"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-900 mb-2">
                    Kota
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Depok"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-white text-gray-600 py-3 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
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
