"use client"

import { MapPin } from "lucide-react"
import Link from "next/link"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import FileUpload from "../../../components/register/FileUpload" // Ensure this path is correct

// Use the provided UploadedFile interface
interface UploadedFile {
  file: File;
  preview: string | ArrayBuffer | null; // Data URL for image preview or null
  name: string;
  size: number;
}

export default function UploadIdPage() {
  // Explicitly type uploadedFile state using the provided interface
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  // Type fileData according to the UploadedFile interface
  const handleFileSelect = (fileData: UploadedFile) => {
    setUploadedFile(fileData)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault()

    if (!uploadedFile) {
      alert("Please upload your ID card first")
      return
    }

    setIsLoading(true)

    // Simulate processing
    setTimeout(() => {
      console.log("ID upload step:", uploadedFile)
      // Store file data in localStorage for next step
      const existingData = JSON.parse(localStorage.getItem("registrationData") || "{}")
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...existingData,
          idDocument: {
            name: uploadedFile.name,
            size: uploadedFile.size,
            uploaded: true,
          },
        }),
      )
      // Redirect to profile picture step
      router.push("/register/upload-profile")
      setIsLoading(false)
    }, 1000)
  }

  const handleBack = () => {
    router.push("/register/personal-info")
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
        <div className="w-full max-w-2xl">
          {/* Header Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Daftar Akun</h1>
            <p className="text-blue-600 text-base mb-6">Buat akun baru, lengkapi informasi dirimu!</p>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Upload ID Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {/* Section Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Unggah KTP</h2>
            </div>

            <form onSubmit={handleContinue} className="space-y-6">
              {/* File Upload Component */}
              <FileUpload
                label="Kartu Tanda Penduduk"
                onFileSelect={handleFileSelect}
                uploadedFile={uploadedFile} // This prop expects UploadedFile | null
                onRemoveFile={handleRemoveFile}
                acceptedTypes="image/*"
                maxSize={5 * 1024 * 1024} // 5MB
                placeholder="Unggah Dokumen Anda Di sini!"
              />

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
                  disabled={isLoading || !uploadedFile}
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