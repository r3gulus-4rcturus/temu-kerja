"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { Search } from "lucide-react"
import Footer from "../../components/shared/Footer"

type TrainingProgram = {
  id: number
  title: string
  category: string
  price: string
  image: string
  badge: string
}

export default function PelatihanKerjaPage() {
  const [searchQuery, setSearchQuery] = useState<string>("")

  const trainingPrograms: TrainingProgram[] = [
    {
      id: 1,
      title: "Asisten Pembuat Pakaian",
      category: "Garmen Apparel",
      price: "Gratis",
      image: "/placeholder.svg?height=200&width=300",
      badge: "GRATIS dari KEMNAKER",
    },
    {
      id: 2,
      title: "Layanan Pembersihan Kamar",
      category: "Pariwisata",
      price: "Gratis",
      image: "/placeholder.svg?height=200&width=300",
      badge: "GRATIS dari KEMNAKER",
    },
    {
      id: 3,
      title: "Pengoprasian Inst. Elektronik",
      category: "Teknik Elektronika",
      price: "Gratis",
      image: "/placeholder.svg?height=200&width=300",
      badge: "GRATIS dari KEMNAKER",
    },
    {
      id: 4,
      title: "Layanan Pembersihan Kamar",
      category: "Pariwisata",
      price: "Gratis",
      image: "/placeholder.svg?height=200&width=300",
      badge: "GRATIS dari KEMNAKER",
    },
    {
      id: 5,
      title: "Pengoprasian Inst. Elektronik",
      category: "Teknik Elektronika",
      price: "Gratis",
      image: "/placeholder.svg?height=200&width=300",
      badge: "GRATIS dari KEMNAKER",
    },
    {
      id: 6,
      title: "Asisten Pembuat Pakaian",
      category: "Garmen Apparel",
      price: "Gratis",
      image: "/placeholder.svg?height=200&width=300",
      badge: "GRATIS dari KEMNAKER",
    },
  ]

  const filteredPrograms = trainingPrograms.filter((program) =>
    program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Cari Pelatihan Kerja dan Sertifikasi untuk Menunjang Karirmu!
          </h1>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            Tingkatkan kesempatan kerja dengan melakukan pelatihan kerja dan mendapat sertifikasi kerja! Program
            diselenggarakan oleh Kemnaker!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search here"
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-14"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </form>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Rekomendasi Anda!</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {program.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{program.category}</p>
                  <div className="mb-4">
                    <span className="text-sm text-gray-600">Harga</span>
                    <p className="text-xl font-bold text-gray-900">{program.price}</p>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Lihat Program
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Tidak ada program pelatihan yang ditemukan untuk "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Lihat semua program
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
