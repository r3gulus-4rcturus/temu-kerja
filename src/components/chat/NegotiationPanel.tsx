"use client"

import { Calendar, ArrowLeft } from "lucide-react"
import { useState } from "react"

// Define type for selectedChat
type SelectedChat = {
  id: string
  name: string
  avatar?: string
}

// Props for NegotiationPanel
type NegotiationPanelProps = {
  isOpen: boolean
  onToggle: () => void
  selectedChat: SelectedChat | null
  onBack?: () => void
  isMobile?: boolean
}

export default function NegotiationPanel({
  isOpen,
  onToggle,
  selectedChat,
  onBack,
  isMobile = false,
}: NegotiationPanelProps) {
  const [formData, setFormData] = useState({
    location: "Jl. Kukusan Barat, Depok Raya, Blok C No. 57, Jawa Barat",
    date: "",
    duration: "3",
    durationUnit: "Jam",
    days: "1",
    tariff: "50000",
  })

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAgreement = () => {
    console.log("Agreement submitted:", formData)
  }

  if (!isOpen) return null

  if (isMobile) {
    return (
      <div className="w-full bg-white flex flex-col h-full">
        {/* Mobile Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={selectedChat?.avatar || "/placeholder.svg"}
                  alt={selectedChat?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-900 text-base truncate">{selectedChat?.name}</h3>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="px-3 py-1.5 rounded-lg font-medium transition-colors text-sm flex-shrink-0 ml-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              Kembali ke Chat
            </button>
          </div>
        </div>

        {/* Mobile Form */}
        <FormContent formData={formData} handleInputChange={handleInputChange} />

        {/* Mobile Footer */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <button
            onClick={handleAgreement}
            className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-base"
          >
            Sepakat Kerja
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Desktop Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-900">Negosiasi</h2>
          <button
            onClick={onToggle}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Chat
          </button>
        </div>
        <p className="text-sm text-gray-600">Lakukan negosiasi dengan mudah!</p>
      </div>

      {/* Desktop Form */}
      <FormContent formData={formData} handleInputChange={handleInputChange} />

      {/* Desktop Footer */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleAgreement}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Sepakat Kerja
        </button>
      </div>
    </div>
  )
}

// 🧩 Reusable Form content for mobile & desktop
type FormProps = {
  formData: {
    location: string
    date: string
    duration: string
    durationUnit: string
    days: string
    tariff: string
  }
  handleInputChange: (field: keyof FormProps["formData"], value: string) => void
}

function FormContent({ formData, handleInputChange }: FormProps) {
  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      {/* Location */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">Lokasi</label>
        <textarea
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">Tanggal</label>
        <div className="relative">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          />
          <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">Durasi Bekerja</label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            className="w-20 p-3 border border-gray-300 rounded-lg text-center"
            min="1"
          />
          <select
            value={formData.durationUnit}
            onChange={(e) => handleInputChange("durationUnit", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="Jam">Jam</option>
            <option value="Menit">Menit</option>
          </select>
          <input
            type="number"
            value={formData.days}
            onChange={(e) => handleInputChange("days", e.target.value)}
            className="w-20 p-3 border border-gray-300 rounded-lg text-center"
            min="1"
          />
          <span className="text-gray-700 text-base">Hari</span>
        </div>
      </div>

      {/* Tariff */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">Tarif</label>
        <input
          type="number"
          value={formData.tariff}
          onChange={(e) => handleInputChange("tariff", e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="50,000"
        />
        <p className="text-sm text-red-500 mt-2">
          *Upah tidak layak berdasarkan beban kerja. Masukkan tarif lebih tinggi.
        </p>
      </div>
    </div>
  )
}
