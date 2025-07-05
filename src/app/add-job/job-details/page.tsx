"use client"

import { MapPin, Plus, X } from "lucide-react"
import { JSX, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React from "react"

interface JobFormData {
  jobName: string
  jobDescription: string
  categories: string[]
}

export default function JobDetailsPage(): JSX.Element {
  const router = useRouter()
  const [formData, setFormData] = useState<JobFormData>({
    jobName: "",
    jobDescription: "",
    categories: [],
  })

  const [newCategory, setNewCategory] = useState<string>("")
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const predefinedCategories: string[] = [
    "Jasa Kebersihan",
    "Tanaman",
    "Kebun",
    "Tukang Listrik",
    "Tukang Ledeng",
    "Montir",
    "Perawatan Kolam",
    "Pembersihan Rumah",
  ]

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((cat) => cat !== category)
        : [...prev.categories, category],
    }))
  }

  const handleAddNewCategory = () => {
    const trimmed = newCategory.trim()
    if (trimmed && !formData.categories.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, trimmed],
      }))
      setNewCategory("")
      setShowAddCategory(false)
    }
  }

  const handleRemoveCategory = (categoryToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== categoryToRemove),
    }))
  }

  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.jobName.trim()) {
      alert("Nama pekerjaan harus diisi")
      return
    }

    if (!formData.jobDescription.trim()) {
      alert("Deskripsi pekerjaan harus diisi")
      return
    }

    if (formData.categories.length === 0) {
      alert("Pilih minimal satu kategori")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      localStorage.setItem(
        "addJobData",
        JSON.stringify({
          jobDetails: formData,
          currentStep: 1,
        }),
      )

      // console.log(">>> FINAL Job Data:", localStorage.getItem("addJobData"))

      router.push("/add-job/workload-estimation")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Nama Pekerjaan</h1>
            <p className="text-gray-600 text-base mb-6">
              Isi nama pekerjaan dan deskripsikan pekerjaan Anda dengan lengkap
            </p>

            <div className="flex justify-center gap-2 mb-8">
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <form onSubmit={handleContinue} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Nama Pekerjaan</label>
                <input
                  type="text"
                  value={formData.jobName}
                  onChange={(e) => handleInputChange("jobName", e.target.value)}
                  placeholder="Jasa Pembersihan Kebun"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Deskripsi Pekerjaan</label>
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                  placeholder="Deskripsikan tentang pekerjaan Anda ..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Kategori</label>

                <div className="flex flex-wrap gap-3 mb-4">
                  {predefinedCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-4 py-2 rounded-full border-2 transition-colors text-sm font-medium ${
                        formData.categories.includes(category)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {category}
                    </button>
                  ))}

                  {formData.categories
                    .filter((cat) => !predefinedCategories.includes(cat))
                    .map((category) => (
                      <div
                        key={category}
                        className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
                      >
                        <span>{category}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(category)}
                          className="text-white hover:text-gray-200 ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                  {!showAddCategory ? (
                    <button
                      type="button"
                      onClick={() => setShowAddCategory(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Kategori baru"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddNewCategory()
                          }
                        }}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleAddNewCategory}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Tambah
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddCategory(false)
                          setNewCategory("")
                        }}
                        className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                      >
                        Batal
                      </button>
                    </div>
                  )}
                </div>

                {formData.categories.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <span>Kategori terpilih: </span>
                    <span className="font-medium">{formData.categories.join(", ")}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
