"use client"

import { useState, FormEvent, useEffect } from "react"
import { createJob } from "../../lib/actions/job.actions" // Import our new server action
import { X, CheckCircle, XCircle } from "lucide-react"

interface JobFormModalProps {
  userId: string
  onClose: () => void // Function to close the modal from the parent
}

export default function JobFormModal({ userId, onClose }: JobFormModalProps) {
  // State to manage the form inputs
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "", // We'll use a single string for input, then split it into an array
    location: "",
    price: "",
    dateTime: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: "success" | "error"
  } | null>(null)

  // Effect to auto-dismiss notification and close modal on success
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
        if (notification.type === "success") {
          onClose()
        }
      }, 3000) // Notification stays for 3 seconds
      return () => clearTimeout(timer)
    }
  }, [notification, onClose])

  // Generic handler to update form state on input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handler for form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setNotification(null)

    try {
      // Prepare the data for the server action
      const jobData = {
        title: formData.title,
        description: formData.description,
        // Split the tags string into an array, trimming whitespace and removing empty tags
        categories: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        location: formData.location,
        priceRate: parseFloat(formData.price), // Convert price string to a number
        providerId: userId,
        dateTime: new Date(formData.dateTime),
      }

      // Basic validation
      if (isNaN(jobData.priceRate)) {
        throw new Error("Tarif harus berupa angka yang valid.")
      }
      if (jobData.categories.length === 0) {
        throw new Error("Mohon masukkan setidaknya satu tag.")
      }

      // Call the server action
      const result = await createJob(jobData)

      if (!result.success) {
        throw new Error(result.message)
      }

      setNotification({
        message: "Berhasil menambahkan lowongan pekerjaan",
        type: "success",
      })
    } catch (err) {
      setNotification({ message: (err as Error).message, type: "error" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getNotificationStyle = () => {
    if (!notification) return {}
    switch (notification.type) {
      case "success":
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          borderColor: "border-green-200",
        }
      case "error":
        return {
          icon: <XCircle className="w-6 h-6 text-red-500" />,
          borderColor: "border-red-200",
        }
    }
  }

  return (
    // Modal backdrop
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4 transition-opacity duration-300">
      {/* Notification Popup */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-top-5 duration-500">
          <div
            className={`bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border ${
              getNotificationStyle().borderColor
            }`}
          >
            {getNotificationStyle().icon}
            <p className="font-medium text-gray-800">{notification.message}</p>
          </div>
        </div>
      )}
      {/* Modal panel */}
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-lg relative transform transition-all duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[#1D364B] via-[#5B7E9B] to-[#3F75A1] bg-clip-text text-transparent">
          Tambah Pekerjaan Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Pekerjaan
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tag (pisahkan dengan koma, contoh: kebun, kolam)
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={formData.tags}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Tarif (Rp)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: 50000"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Lokasi
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="dateTime"
              className="block text-sm font-medium text-gray-700"
            >
              Tanggal dan Waktu
            </label>
            <input
              type="datetime-local"
              name="dateTime"
              id="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Deskripsi
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 active:bg-gray-400 transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-white rounded-md bg-[#4581B2] hover:bg-[#3F75A1] disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Pekerjaan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
