"use client"

import { Upload, X, FileText } from "lucide-react"
import { useState, useRef } from "react"

export default function FileUpload({
  label,
  onFileSelect,
  uploadedFile,
  onRemoveFile,
  acceptedTypes = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  placeholder = "Unggah Dokumen Anda Di sini!",
}) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxSize) {
        alert(`File terlalu besar. Maksimal ${formatFileSize(maxSize)}`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const fileData = {
          file: file,
          preview: e.target.result,
          name: file.name,
          size: file.size,
        }
        onFileSelect(fileData)
      }
      reader.readAsDataURL(file)
    } else {
      alert("Please select a valid image file (JPG, PNG, etc.)")
    }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    onRemoveFile()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-4">{label}</label>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Area */}
      {!uploadedFile ? (
        <div
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragOver ? "border-blue-500 bg-blue-50" : "border-blue-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-blue-500 mb-4" />
            <p className="text-blue-600 font-medium text-lg mb-2">{placeholder}</p>
            <p className="text-gray-500 text-sm">Klik untuk memilih file atau seret file ke sini</p>
            <p className="text-gray-400 text-xs mt-2">Format: JPG, PNG, PDF (Max: {formatFileSize(maxSize)})</p>
          </div>
        </div>
      ) : (
        /* File Preview */
        <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50">
          <div className="flex items-start gap-4">
            {/* File Preview */}
            <div className="flex-shrink-0">
              {uploadedFile.preview ? (
                <img
                  src={uploadedFile.preview || "/placeholder.svg"}
                  alt="File Preview"
                  className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">{uploadedFile.name}</h4>
              <p className="text-sm text-gray-500">{formatFileSize(uploadedFile.size)}</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Berhasil diunggah
                </span>
              </div>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemoveFile}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Replace File Button */}
          <button
            type="button"
            onClick={handleUploadClick}
            className="mt-4 w-full text-center py-2 px-4 border border-blue-300 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors text-sm font-medium"
          >
            Ganti File
          </button>
        </div>
      )}
    </div>
  )
}
