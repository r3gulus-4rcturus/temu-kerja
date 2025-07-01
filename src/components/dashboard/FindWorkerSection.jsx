import { Search, ChevronDown, ChevronRight } from "lucide-react"

export default function FindWorkerSection() {
  const workers = [
    {
      id: 1,
      category: "Montir",
      name: "Suwadi",
      age: 32,
      location: "Kab. Bogor",
      description:
        "Berpengalaman sebagai montir profesional selama 8 tahun. Mampu menangani kendaraan bermotor, khususnya mobil.",
      priceRange: "Rp 100,000.00 - 400,000.00",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      category: "Jasa Bersih-Bersih Rumah",
      name: "Maria Husna",
      age: 40,
      location: "Kab. Bogor",
      description: "Telaten dan cekatan dalam melakukan pekerjaan rumah. Menerima bersih-bersih besar.",
      priceRange: "Rp 200,000.00 - 600,000.00",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      category: "Tukang Kebun",
      name: "Irwan Wirawan",
      age: 27,
      location: "Kab. Bogor",
      description:
        "Berpengalaman sebagai tukang kebun profesional selama 3 tahun. Mampu menangani berbagai jenis perawatan tanaman hias.",
      priceRange: "Rp 200,000.00 - 600,000.00",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Duplicate workers for recommendation section (6 total cards)
  const recommendedWorkers = [...workers, ...workers].map((worker, index) => ({
    ...worker,
    id: `rec-${index + 1}`,
  }))

  const WorkerCard = ({ worker }) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Worker Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={worker.image || "/placeholder.svg"}
          alt={`${worker.name} - ${worker.category}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Worker Info */}
      <div className="p-6">
        {/* Category */}
        <h4 className="text-xl font-bold text-gray-900 mb-2">{worker.category}</h4>

        {/* Name and Details */}
        <p className="text-gray-600 mb-3">
          {worker.name}, {worker.age} tahun, {worker.location}
        </p>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">{worker.description}</p>

        {/* Price */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Estimasi Tarif</p>
          <p className="font-semibold text-gray-900">{worker.priceRange}</p>
        </div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Lihat Detail
        </button>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">Temukan Pekerja Terbaikmu!</h2>
        <p className="text-gray-600 text-lg">
          Temukan pekerja terbaik dengan fitur rekomendasi yang telah dipersonalisasi menggunakan AI!
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-6 h-6 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-gray-800">Daftar Favoritmu</h3>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Favorites Worker Cards */}
      <div className="relative mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>

        {/* Navigation Arrow for Favorites */}
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-10">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Recommendation Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-gray-800">Rekomendasi</h3>
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Recommendation Worker Cards */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>

        {/* Navigation Arrow for Recommendations */}
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-10">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
