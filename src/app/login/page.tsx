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
}

// ---
// LoginPage Component
// ---
export default function LoginPage() {
  // Explicitly type formData state
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  })
  // Explicitly type isLoading state
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  // Type 'field' as a key of FormData and 'value' as string
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Type event as FormEvent
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailOrUsername: formData.username,
          password: formData.password,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Login failed')
        setIsLoading(false)
        return
      }

      const { role } = await res.json()

      // Conditional redirect based on role
      if (role === 'jobprovider') {
        router.push('/dashboard')
      } else if (role === 'jobseeker') {
        router.push('/seeker-dashboard')
      } else {
        alert('Unrecognized role')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Something went wrong during login.')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-100">
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