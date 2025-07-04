"use client"

import { MapPin } from "lucide-react"
import Link from "next/link"
import { useState, ChangeEvent, FormEvent } from "react" // Import event types
import { useRouter } from "next/navigation"

// ---
// Interface for Form Data
// ---
interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

// ---
// RegisterPage Component
// ---
export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({ // Explicitly type useState
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false) // Explicitly type useState
  const router = useRouter()

  const handleInputChange = (field: keyof FormData, value: string) => { // Type 'field' as a key of FormData
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRegister = async (e: FormEvent) => { // Type event as FormEvent
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!")
      setIsLoading(false)
      return
    }

    // Simulate registration process
    setTimeout(() => {
      console.log("Registration step 1:", formData)
      // Store form data in localStorage for next step
      localStorage.setItem("registrationData", JSON.stringify(formData))
      // Redirect to role selection
      router.push("/register/role")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Daftar Akun</h1>
            <p className="text-blue-600 text-base mb-6">Buat akun baru, lengkapi informasi dirimu!</p>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Register Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("username", e.target.value)} // Type ChangeEvent
                  placeholder="Mukhlis"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value)} // Type ChangeEvent
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-2">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("confirmPassword", e.target.value)} // Type ChangeEvent
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {isLoading ? "Lanjut..." : "Lanjut"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-600">Sudah memiliki akun sebelumnya?</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Login Button */}
            <Link
              href="/login"
              className="w-full block text-center bg-white text-blue-600 py-3 px-4 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}