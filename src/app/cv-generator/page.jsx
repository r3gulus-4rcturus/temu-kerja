"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Mic, MicOff, Upload, Sparkles } from "lucide-react"
import Navbar from "@/components/shared/Navbar"

export default function CVGeneratorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    description: "",
    certificationFile: null,
    workDocumentationFile: null,
  })
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const textareaRef = useRef(null)

  const handleBack = () => {
    router.push("/add-job/upload-cv")
  }

  const handleSubmit = () => {
    if (!formData.description.trim()) {
      alert("Silakan deskripsikan pengalaman kerja Anda terlebih dahulu")
      return
    }

    // Here you would typically send the data to an AI service
    // For now, we'll simulate CV generation
    alert("CV sedang dibuat dengan AI... Anda akan diarahkan kembali ke halaman upload.")

    // Redirect back to upload CV page
    router.push("/add-job/upload-cv")
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      recorder.ondataavailable = (event) => {
        // Handle audio data here
        console.log("Audio data available:", event.data)
      }

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop())
        setIsRecording(false)
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Tidak dapat mengakses mikrofon. Pastikan Anda memberikan izin akses.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setMediaRecorder(null)
    }
  }

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const handleFileUpload = (file, type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: file,
    }))
  }

  const handleRemoveFile = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: null,
    }))
  }

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "File uploaded"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

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
          <p className="text-gray-600">Deskripsikan tentang pekerjaan dan pengalaman Anda dengan lengkap!</p>
        </div>

        {/* Main Description Input */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <textarea
            ref={textareaRef}
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Deskripsikan tentang pekerjaan Anda dan pengalaman kerja Anda dengan detail!"
            className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Microphone Section */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handleMicClick}
            className={`p-4 rounded-full transition-colors ${
              isRecording ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <p className="text-blue-600 font-medium">
            {isRecording
              ? "Sedang merekam... Klik untuk berhenti"
              : "Klik mikrofon dan mulai berbicara untuk mendeskripsikan!"}
          </p>
        </div>

        {/* Upload Documents Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Dokumen Pendukung</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Certification Upload */}
            <div>
              <h3 className="text-blue-600 font-medium mb-4">Unggah Sertifikasi (Jika ada)</h3>

              {!formData.certificationFile ? (
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        handleFileUpload(file, "certificationFile")
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-blue-600 font-medium">Unggah Dokumen Anda Di sini!</p>
                </div>
              ) : (
                <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{formData.certificationFile.name}</p>
                      <p className="text-xs text-green-600">{formatFileSize(formData.certificationFile.size)}</p>
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
              <h3 className="text-blue-600 font-medium mb-4">Unggah Dokumentasi Hasil Pekerjaan (Jika ada)</h3>

              {!formData.workDocumentationFile ? (
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file) {
                        handleFileUpload(file, "workDocumentationFile")
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-blue-600 font-medium">Unggah Dokumen Anda Di sini!</p>
                </div>
              ) : (
                <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{formData.workDocumentationFile.name}</p>
                      <p className="text-xs text-green-600">{formatFileSize(formData.workDocumentationFile.size)}</p>
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
