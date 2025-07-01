export default function JobUploadSection() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-2">Unggah Lowongan Pekerjaan</h2>
      <p className="text-gray-600 mb-8">Tambahkan lowongan pekerjaan Anda!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Job Card */}
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-blue-400 transition-colors cursor-pointer">
          <div className="text-blue-600 text-4xl mb-4">+</div>
          <span className="text-blue-600 font-medium">Tambah Pekerjaan</span>
        </div>

        {/* Job Card 1 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Pembersihan Kebun</h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Status :</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Dibuka</span>
          </div>
        </div>

        {/* Job Card 2 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Perawatan Kolam Ikan</h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Status :</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Dibuka</span>
          </div>
        </div>
      </div>
    </div>
  )
}
