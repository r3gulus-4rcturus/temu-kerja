"use client"

import { MapPin } from "lucide-react"
import Link from "next/link"
import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"

// ---
// Interface for Form Data
// ---
interface FormData {
  username: string;
  password: string;
}

// ---
// LoginPage Component
// ---
export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null) // State for handling errors
  const router = useRouter()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrUsername: formData.username,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Login failed")
        setIsLoading(false)
        return
      }

      // Conditional redirect based on role
      if (data.role === "jobprovider") {
        // router.push("/dashboard")
        window.location.href = "/dashboard" // hard navigation, force reload
      } else if (data.role === "jobseeker") {
        // router.push("/seeker-dashboard")
        window.location.href = "/seeker-dashboard" // hard navigation, force reload
      } else {
        setError("Unrecognized role") // Handle unrecognized roles
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Something went wrong during login.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Log in</h1>
              <p className="text-blue-600 text-sm">Masuk jika kamu telah memiliki akun!</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Error Message Display */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
                  <p>{error}</p>
                </div>
              )}

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("username", e.target.value)}
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Masuk..." : "Masuk"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-600">Belum memiliki akun sebelumnya?</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Create Account Button */}
            <Link
              href="/register"
              className="w-full block text-center bg-white text-blue-600 py-3 px-4 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Buat Akun
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}