"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

// Define a union type for the possible roles
type UserRole = "jobseeker" | "jobprovider"

export default function RoleSelectionPage() {
  // Explicitly type selectedRole using the UserRole union type
  const [selectedRole, setSelectedRole] = useState<UserRole>("jobseeker")
  const [isLoading, setIsLoading] = useState<boolean>(false) // Explicitly type boolean state
  const router = useRouter()

  // Type 'role' parameter as UserRole
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
  }

  const handleContinue = async () => {
    setIsLoading(true)

    // Simulate processing
    setTimeout(() => {
      console.log("Selected role:", selectedRole)
      // Store role data in localStorage for next step
      const existingData = JSON.parse(
        localStorage.getItem("registrationData") || "{}"
      )
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...existingData,
          role: selectedRole,
        })
      )
      // Redirect to personal info step
      router.push("/register/personal-info")
      setIsLoading(false)
    }, 1000)
  }

  const handleBack = () => {
    router.push("/register")
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --colors-primary-100: #ebf2f7;
          --colors-primary-200: #bcd3e5;
          --colors-primary-500: #4581b2;
          --colors-primary-600: #3f75a1;
          --colors-primary-700: #2f587a;
          --theme-colordark: #464255;
          --heading-h3-font-family: "Plus Jakarta Sans", sans-serif;
          --heading-h3-font-size: 32px;
          --heading-h3-line-height: 120%;
          --heading-h3-font-weight: 700;
          --heading-h5-font-family: "Plus Jakarta Sans", sans-serif;
          --heading-h5-font-size: 20px;
          --heading-h5-line-height: 120%;
          --heading-h5-font-weight: 700;
          --sub-heading-s5-font-family: "Urbanist", sans-serif;
          --sub-heading-s5-font-size: 16px;
          --sub-heading-s5-line-height: 200%;
          --sub-heading-s5-font-weight: 600;
        }
        .role-page-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 2rem 1rem;
        }
        .role-selection-card {
          border-radius: 15px;
          border: 1.5px solid var(--colors-primary-700);
          padding: 2.5rem;
          width: 100%;
          max-width: 654px;
        }
      `}</style>
      <div className="role-page-container">
        <div className="flex flex-col w-full max-w-[654px] items-center gap-6">
          <div className="inline-flex flex-col items-center gap-[11px]">
            <h1
              className="mt-[-1.00px] text-center"
              style={{
                fontFamily: "var(--heading-h3-font-family)",
                fontWeight: "var(--heading-h3-font-weight)",
                fontSize: "var(--heading-h3-font-size)",
                color: "var(--theme-colordark)",
                lineHeight: "var(--heading-h3-line-height)",
              }}
            >
              Daftar Akun
            </h1>
            <p
              className="w-fit whitespace-nowrap"
              style={{
                fontFamily: "var(--sub-heading-s5-font-family)",
                fontWeight: "var(--sub-heading-s5-font-weight)",
                fontSize: "var(--sub-heading-s5-font-size)",
                color: "var(--colors-primary-700)",
                lineHeight: "var(--sub-heading-s5-line-height)",
              }}
            >
              Buat akun baru, lengkapi informasi dirimu!
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mb-2">
            <div className="w-8 h-1 bg-[#4581b2] rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>

          <div className="role-selection-card">
            <div className="text-center mb-8">
              <h2
                className="text-2xl font-bold"
                style={{ color: "var(--theme-colordark)" }}
              >
                Pilih Peranmu!
              </h2>
            </div>

            {/* Role Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => handleRoleSelect("jobseeker")}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === "jobseeker"
                    ? "bg-blue-100 border-blue-600 text-blue-800"
                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    Saya Mencari Pekerjaan!
                  </h3>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect("jobprovider")}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === "jobprovider"
                    ? "bg-blue-100 border-blue-600 text-blue-800"
                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    Saya Menyediakan Pekerjaan
                  </h3>
                </div>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-white text-gray-600 py-3 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handleContinue}
                disabled={isLoading}
                className="flex-1 bg-[#4581b2] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#3f75a1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Lanjut..." : "Lanjut"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
