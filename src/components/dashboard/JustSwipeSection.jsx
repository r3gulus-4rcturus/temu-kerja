import { MapPin } from "lucide-react"

export default function JustSwipeSection() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm p-8 relative overflow-hidden min-h-[600px]">
      {/* Background decoration with profile photos */}
      <div className="absolute inset-0 opacity-20">
        {/* Scattered profile circles */}
        <div className="absolute top-16 left-8 w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
          <img src="/placeholder.svg?height=48&width=48" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-32 left-32 w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-8 right-16 w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
          <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-32 left-16 w-14 h-14 bg-gray-300 rounded-full overflow-hidden">
          <img src="/placeholder.svg?height=56&width=56" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-16 right-32 w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="w-full h-full object-cover" />
        </div>

        {/* Map pins */}
        <div className="absolute top-20 right-24">
          <MapPin className="w-6 h-6 text-blue-400" />
        </div>
        <div className="absolute bottom-40 right-8">
          <MapPin className="w-8 h-8 text-blue-300" />
        </div>
        <div className="absolute bottom-8 left-40">
          <MapPin className="w-5 h-5 text-blue-400" />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-40 right-12 w-24 h-24 bg-blue-200 rounded-full"></div>
        <div className="absolute bottom-20 left-8 w-32 h-32 bg-blue-100 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <h2 className="text-4xl font-bold text-blue-600 mb-2">Just Swipe!</h2>
        <h3 className="text-2xl font-semibold text-blue-500 mb-4">Jelajah Sekitar dan Temukan Kecocokan</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Fitur rekomendasi pekerja di sekitar wilayahmu. Geser untuk menjelajah.
          <br />
          Beri bintang untuk memasukkan Pekerja pada Daftar Favoritmu!
        </p>
      </div>

      {/* Swipe Card Interface */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Image */}
            <div className="h-80 md:h-96">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Garden work"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Profile Info */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 flex flex-col">
              {/* Header */}
              <div className="bg-blue-800 bg-opacity-30 rounded-lg px-4 py-2 mb-4 inline-block self-start">
                <span className="font-medium">Melamar</span>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Irwan Wirawan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Irwan Wirawan</h4>
                  <p className="text-blue-100 text-sm">27 tahun, Kab. Bogor</p>
                </div>
              </div>

              {/* Primary Skill */}
              <div className="mb-4">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">Tukang Kebun</span>
              </div>

              {/* Additional Skills */}
              <div className="mb-4">
                <p className="text-blue-100 text-sm mb-2">Tag lainnya</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs">Perawatan Kolam</span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs">Perawatan Tanaman Hias</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 flex-1">
                <p className="text-blue-50 text-sm leading-relaxed">
                  Berpengalaman sebagai tukang kebun profesional selama 3 tahun. Mampu menangani berbagai jenis
                  perawatan tanaman hias.
                </p>
              </div>

              {/* Price */}
              <div className="border-t border-blue-300 pt-4">
                <p className="text-blue-100 text-sm mb-1">Estimasi Tarif</p>
                <p className="font-bold text-lg">Rp 200,000.00 - 600,000.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Swipe Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow group">
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button className="w-16 h-16 bg-red-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-red-600 transition-all group">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>

          <button className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow group">
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
