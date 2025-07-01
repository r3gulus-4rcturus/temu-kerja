import { MapPin } from "lucide-react"

export default function ContactWorkersSection() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-300 rounded-full"></div>
        <div className="absolute bottom-20 right-40 w-20 h-20 bg-blue-200 rounded-full"></div>
        <div className="absolute top-40 right-60 w-16 h-16 bg-blue-400 rounded-full"></div>
        {/* Map pins */}
        <div className="absolute top-16 right-32">
          <MapPin className="w-8 h-8 text-blue-400" />
        </div>
        <div className="absolute bottom-32 right-20">
          <MapPin className="w-6 h-6 text-blue-300" />
        </div>
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">Hubungi Pekerja yang Anda Inginkan!</h2>
        <p className="text-gray-600 mb-8">Pilih pekerja pada Daftar Pelamar atau Daftar Favorit.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daftar Pelamar */}
          <div>
            <div className="bg-blue-100 rounded-t-lg px-6 py-3">
              <h3 className="font-semibold text-blue-800">Daftar Pelamar</h3>
            </div>
            <div className="border border-t-0 border-gray-200 rounded-b-lg p-6 space-y-6">
              {/* Worker 1 */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=64&width=64"
                    alt="Arfan Khoirul"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-600 mb-1">Arfan Khoirul</h4>
                  <p className="text-gray-600 text-sm mb-2">Lokasi: Jl. Kukusan Barat, Depok Raya</p>
                  <div className="flex gap-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Tukang Kebun</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Perawatan Tanaman Hias</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  <span>Hubungi</span>
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">💬</span>
                  </div>
                </button>
              </div>

              {/* Worker 2 */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=64&width=64"
                    alt="Arfan Khoirul"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-600 mb-1">Arfan Khoirul</h4>
                  <p className="text-gray-600 text-sm mb-2">Lokasi: Jl. Kukusan Barat, Depok Raya</p>
                  <div className="flex gap-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Tukang Kebun</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Perawatan Tanaman Hias</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  <span>Hubungi</span>
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">💬</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Daftar Favorit */}
          <div>
            <div className="bg-gray-100 rounded-t-lg px-6 py-3">
              <h3 className="font-semibold text-gray-700">Daftar Favorit Anda</h3>
            </div>
            <div className="border border-t-0 border-gray-200 rounded-b-lg p-6 min-h-[300px] flex items-center justify-center">
              <p className="text-gray-500 text-center">Belum ada pekerja favorit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
