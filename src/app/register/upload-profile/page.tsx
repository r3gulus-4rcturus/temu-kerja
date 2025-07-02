"use client"

import { MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import FileUpload from "../../../components/register/FileUpload"

interface UploadedFile {
  file: File
  preview: string | ArrayBuffer | null
  name: string
  size: number
}

export default function UploadProfilePage() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleFileSelect = (fileData: UploadedFile) => {
    setUploadedFile(fileData)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!uploadedFile) {
      alert("Please upload your profile picture first")
      return
    }

    setIsLoading(true)

    // Simulate processing
    setTimeout(() => {
      console.log("Profile picture upload step:", uploadedFile)
      const existingData = JSON.parse(localStorage.getItem("registrationData") || "{}")
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...existingData,
          profilePicture: {
            name: uploadedFile.name,
            size: uploadedFile.size,
            uploaded: true,
          },
        }),
      )
      router.push("/register/success")
      setIsLoading(false)
    }, 1000)
  }

  const handleBack = () => {
    router.push("/register/upload-id")
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Daftar Akun</h1>
            <p className="text-blue-600 text-base mb-6">Buat akun baru, lengkapi informasi dirimu!</p>
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Unggah Foto Diri</h2>
            </div>

            <form onSubmit={handleContinue} className="space-y-6">
              <FileUpload
                label="Pas Foto"
                onFileSelect={handleFileSelect}
                uploadedFile={uploadedFile}
                onRemoveFile={handleRemoveFile}
                acceptedTypes="image/*"
                maxSize={5 * 1024 * 1024}
                placeholder="Unggah Dokumen Anda Di sini!"
              />

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
                  {isLoading ? "Selesai..." : "Lanjut"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
