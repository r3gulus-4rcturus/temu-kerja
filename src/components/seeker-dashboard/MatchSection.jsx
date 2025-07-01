export default function MatchSection() {
  const matchJobs = [
    {
      id: 1,
      provider: "Kurniawan",
      jobTitle: "Pembersihan Kebun",
      location: "Jl. Kukusan Barat, Depok Raya",
      schedule: "12 Maret 2025, 3 Jam",
      tariff: "Rp300.000",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      id: 2,
      provider: "Kurniawan",
      jobTitle: "Pembersihan Kebun",
      location: "Jl. Kukusan Barat, Depok Raya",
      schedule: "12 Maret 2025, 3 Jam",
      tariff: "Rp300.000",
      avatar: "/placeholder.svg?height=64&width=64",
    },
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm p-8 relative overflow-hidden min-h-[600px]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        {/* Scattered profile circles */}
        <div className="absolute top-16 right-8 w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
          <img src="/placeholder.svg?height=48&width=48" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-32 right-32 w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-32 right-16 w-14 h-14 bg-gray-300 rounded-full overflow-hidden">
          <img src="/placeholder.svg?height=56&width=56" alt="Profile" className="w-full h-full object-cover" />
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
        <div className="absolute bottom-8 right-40">
          <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">📍</span>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-40 right-12 w-24 h-24 bg-blue-200 rounded-full"></div>
        <div className="absolute bottom-20 right-8 w-32 h-32 bg-blue-100 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Match! Kalian sama-sama tertarik!</h2>
        <p className="text-gray-600 max-w-2xl">
          Peluang kerja lebih besar karena penyedia kerja juga tertarik mempekerjakan Anda!
        </p>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Match Tab */}
        <div className="lg:col-span-2">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-t-lg">
            <h3 className="font-semibold">Match!</h3>
          </div>

          <div className="bg-white rounded-b-lg p-6 space-y-6">
            {matchJobs.map((job) => (
              <div key={job.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={job.avatar || "/placeholder.svg"}
                    alt={job.provider}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-600 text-sm mb-1">{job.provider}</h4>
                  <h3 className="font-bold text-blue-700 text-lg mb-2">{job.jobTitle}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Lokasi :</span> {job.location}
                    </p>
                    <p>
                      <span className="font-medium">Jadwal :</span> {job.schedule}
                    </p>
                    <p>
                      <span className="font-medium">Tarif yang ditawarkan :</span> {job.tariff}
                    </p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  <span>Hubungi</span>
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">💬</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Daftar Lamaran */}
        <div>
          <div className="bg-gray-100 text-gray-700 px-6 py-3 rounded-t-lg">
            <h3 className="font-semibold">Daftar Lamaran</h3>
          </div>
          <div className="bg-white rounded-b-lg p-6 min-h-[300px] flex items-center justify-center">
            <p className="text-gray-500 text-center">Belum ada lamaran yang diajukan</p>
          </div>
        </div>
      </div>
    </div>
  )
}
