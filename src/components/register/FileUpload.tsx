"use client"

import { Upload, X, FileText } from "lucide-react"
import { useState, useRef, ChangeEvent, DragEvent } from "react" // Import event types

// ---
// Interfaces for Props and Data Structures
// ---

// Defines the shape of a file object after it's been processed for upload
interface UploadedFile {
  file: File;
  preview: string | ArrayBuffer | null; // Data URL for image preview or null
  name: string;
  size: number;
}

// Defines the props for the FileUpload component
interface FileUploadProps {
  label: string;
  onFileSelect: (fileData: UploadedFile) => void;
  uploadedFile: UploadedFile | null; // Can be an UploadedFile object or null if no file is uploaded
  onRemoveFile: () => void;
  acceptedTypes?: string; // e.g., "image/*", ".pdf", "image/png,image/jpeg"
  maxSize?: number; // Max file size in bytes
  placeholder?: string;
}

// ---
// FileUpload Component
// ---

export default function FileUpload({
  label,
  onFileSelect,
  uploadedFile,
  onRemoveFile,
  acceptedTypes = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  placeholder = "Unggah Dokumen Anda Di sini!",
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null) // Specify type for useRef

  const formatFileSize = (bytes: number): string => { // Explicitly type 'bytes' as number and return as string
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFileSelect = (file: File) => { // Explicitly type 'file' as File
    // Check for file type based on acceptedTypes prop
    const isAcceptedType = acceptedTypes.split(',').some(type => {
        const trimmedType = type.trim();
        if (trimmedType.endsWith('/*')) {
            return file.type.startsWith(trimmedType.slice(0, -1));
        }
        return file.type === trimmedType || file.name.toLowerCase().endsWith(trimmedType);
    });


    if (!isAcceptedType) {
        alert(`Please select a valid file type. Accepted types: ${acceptedTypes}`);
        return;
    }

    if (file.size > maxSize) {
      alert(`File terlalu besar. Maksimal ${formatFileSize(maxSize)}`)
      return
    }

    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => { // Explicitly type event
      const fileData: UploadedFile = { // Explicitly type fileData
        file: file,
        preview: e.target?.result || null, // e.target.result can be string or ArrayBuffer
        name: file.name,
        size: file.size,
      }
      onFileSelect(fileData)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => { // Explicitly type ChangeEvent
    const file = e.target.files?.[0] // Use optional chaining for files array
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { // Explicitly type DragEvent
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { // Explicitly type DragEvent
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => { // Explicitly type DragEvent
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click() // Use optional chaining
  }

  const handleRemoveFile = () => {
    onRemoveFile()
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // Clear the file input value
    }
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
              {uploadedFile.preview && typeof uploadedFile.preview === 'string' && uploadedFile.file.type.startsWith('image/') ? (
                <img
                  src={uploadedFile.preview}
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