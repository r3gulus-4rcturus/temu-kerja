"use client"

import { MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

// Define a union type for the possible roles
type UserRole = "jobseeker" | "jobprovider";

export default function RoleSelectionPage() {
  // Explicitly type selectedRole using the UserRole union type
  const [selectedRole, setSelectedRole] = useState<UserRole>("jobseeker");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Explicitly type boolean state
  const router = useRouter();

  // Type 'role' parameter as UserRole
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    setIsLoading(true);

    // Simulate processing
    setTimeout(() => {
      console.log("Selected role:", selectedRole);
      // Store role data in localStorage for next step
      const existingData = JSON.parse(localStorage.getItem("registrationData") || "{}");
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...existingData,
          role: selectedRole,
        }),
      );
      // Redirect to personal info step
      router.push("/register/personal-info");
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    router.push("/register");
  };

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
        <div className="w-full max-w-lg">
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

          {/* Role Selection Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {/* Section Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Pilih Peranmu!</h2>
            </div>

            {/* Role Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Job Seeker Option */}
              <button
                onClick={() => handleRoleSelect("jobseeker")}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === "jobseeker"
                    ? "bg-blue-100 border-blue-600 text-blue-800"
                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Saya Mencari Pekerjaan!</h3>
                </div>
              </button>

              {/* Job Provider Option */}
              <button
                onClick={() => handleRoleSelect("jobprovider")}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === "jobprovider"
                    ? "bg-blue-100 border-blue-600 text-blue-800"
                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Saya Menyediakan Pekerjaan</h3>
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
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Lanjut..." : "Lanjut"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}