"use client"

import { useState, useRef, JSX } from "react"
import { useRouter } from "next/navigation"
import { Mic, MicOff, Upload, Sparkles } from "lucide-react"

interface FormData {
  description: string
  certificationFile: File | null
  workDocumentationFile: File | null
}

type FileUploadType = "certificationFile" | "workDocumentationFile"

export default function CVGeneratorPage(): JSX.Element {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    description: "",
    certificationFile: null,
    workDocumentationFile: null,
  })
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false) // State for the popup

  const handleBack = (): void => {
    router.push("/add-job/upload-cv")
  }

  const handleSubmit = (): void => {
    if (!formData.description.trim()) {
      alert("Silakan deskripsikan pengalaman kerja Anda terlebih dahulu")
      return
    }

    // Show the popup instead of the alert
    setShowPopup(true)

    // Simulate CV generation and download
    const link = document.createElement("a")
    link.href = "/cv.pdf" // Assumes cv.pdf is in your `public` folder
    link.setAttribute("download", "cv-hasil-ai.pdf") // The filename the user will see
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Redirect back to upload CV page after a delay
    setTimeout(() => {
      router.push("/add-job/upload-cv")
    }, 3000) // 3-second delay
  }

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      recorder.ondataavailable = (event: BlobEvent): void => {
        // Handle audio data here
        console.log("Audio data available:", event.data)
      }

      recorder.onstop = (): void => {
        stream.getTracks().forEach((track) => track.stop())
        setIsRecording(false)
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert(
        "Tidak dapat mengakses mikrofon. Pastikan Anda memberikan izin akses."
      )
    }
  }

  const stopRecording = (): void => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setMediaRecorder(null)
    }
  }

  const handleMicClick = (): void => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const handleFileUpload = (file: File, type: FileUploadType): void => {
    setFormData((prev) => ({
      ...prev,
      [type]: file,
    }))
  }

  const handleRemoveFile = (type: FileUploadType): void => {
    setFormData((prev) => ({
      ...prev,
      [type]: null,
    }))
  }

  const formatFileSize = (bytes?: number): string => {
    if (!bytes || bytes === 0) return "File uploaded"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    )
  }

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setFormData((prev) => ({ ...prev, description: e.target.value }))
  }

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: FileUploadType
  ): void => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file, type)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-auto transform transition-all scale-100 opacity-100">
            <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-5 animate-pulse" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              CV Sedang Dibuat!
            </h3>
            <p className="text-gray-600 text-lg">
              Anda akan diarahkan kembali ke halaman upload...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 rounded-lg"
        >
          Kembali
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            Buat CV Anda dengan AI!
            <Sparkles className="w-8 h-8 text-purple-500" />
          </h1>
          <p className="text-gray-600">
            Deskripsikan tentang pekerjaan dan pengalaman Anda dengan lengkap!
          </p>
        </div>

        {/* Main Description Input */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <textarea
            ref={textareaRef}
            value={formData.description}
            onChange={handleTextareaChange}
            placeholder="Deskripsikan tentang pekerjaan Anda dan pengalaman kerja Anda dengan detail!"
            className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Microphone Section */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handleMicClick}
            className={`p-4 rounded-full transition-colors ${
              isRecording
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {isRecording ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>
          <p className="text-blue-600 font-medium">
            {isRecording
              ? "Sedang merekam... Klik untuk berhenti"
              : "Klik mikrofon dan mulai berbicara untuk mendeskripsikan!"}
          </p>
        </div>

        {/* Upload Documents Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Upload Dokumen Pendukung
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Certification Upload */}
            <div>
              <h3 className="text-blue-600 font-medium mb-4">
                Unggah Sertifikasi (Jika ada)
              </h3>

              {!formData.certificationFile ? (
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileInputChange(e, "certificationFile")
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-blue-600 font-medium">
                    Unggah Dokumen Anda Di sini!
                  </p>
                </div>
              ) : (
                <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {formData.certificationFile.name}
                      </p>
                      <p className="text-xs text-green-600">
                        {formatFileSize(formData.certificationFile.size)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFile("certificationFile")}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Work Documentation Upload */}
            <div>
              <h3 className="text-blue-600 font-medium mb-4">
                Unggah Dokumentasi Hasil Pekerjaan (Jika ada)
              </h3>

              {!formData.workDocumentationFile ? (
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileInputChange(e, "workDocumentationFile")
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-blue-600 font-medium">
                    Unggah Dokumen Anda Di sini!
                  </p>
                </div>
              ) : (
                <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {formData.workDocumentationFile.name}
                      </p>
                      <p className="text-xs text-green-600">
                        {formatFileSize(formData.workDocumentationFile.size)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFile("workDocumentationFile")}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
