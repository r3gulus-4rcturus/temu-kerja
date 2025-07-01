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

        {/* Map pins and chat bubbles */}
        <div className="absolute top-20 right-24">
          <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">📍</span>
          </div>
        </div>
        <div className="absolute bottom-40 right-8">
          <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">💬</span>
          </div>
        </div>
        <div className="absolute bottom-8 left-40">
          <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">📍</span>
          </div>
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
          Geser untuk menjelajah rekomendasi pekerjaanmu. Beri bintang untuk mengirimkan lamaran!
        </p>
      </div>

      {/* Swipe Card Interface */}
      <div className="relative z-10 max-w-md mx-auto">
        <div className="bg-blue-400 rounded-2xl shadow-xl overflow-hidden text-white">
          {/* Status Badge */}
          <div className="bg-gray-800 bg-opacity-50 rounded-lg px-4 py-2 mx-6 mt-6 mb-4 inline-block">
            <span className="font-medium text-sm">Ingin mempekerjakan Anda</span>
          </div>

          {/* Provider Profile */}
          <div className="flex items-center gap-3 px-6 mb-6">
            <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
              <img src="/placeholder.svg?height=48&width=48" alt="Kurniawan" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Kurniawan</h4>
            </div>
          </div>

          {/* Job Title */}
          <div className="px-6 mb-6">
            <h3 className="text-2xl font-bold">Pembersihan Taman</h3>
          </div>

          {/* Job Details */}
          <div className="px-6 space-y-3 mb-6">
            <div>
              <p className="text-blue-100 text-sm">Lokasi :</p>
              <p className="font-medium">Jl. Kukusan Barat, Depok Raya</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Jadwal :</p>
              <p className="font-medium">12 Maret 2025, 3 Jam</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-blue-300 mx-6 mb-6"></div>

          {/* Offered Rate */}
          <div className="px-6 pb-8">
            <p className="text-blue-100 text-sm mb-1">Tarif yang ditawarkan :</p>
            <p className="font-bold text-2xl">Rp 300.000</p>
          </div>
        </div>

        {/* Swipe Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-blue-700 transition-all group">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button className="w-16 h-16 bg-red-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-red-600 transition-all group">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>

          <button className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-blue-700 transition-all group">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
