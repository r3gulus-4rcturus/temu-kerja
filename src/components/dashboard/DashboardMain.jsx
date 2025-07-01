import { User, ChevronDown } from "lucide-react"

export default function DashboardMain() {
  const orders = [
    {
      id: 1,
      date: "Maret",
      dateRange: "2 - 5",
      time: "12:00 PM",
      worker: "Mukhlis",
      tag: "Tulang Kelapa",
      status: "Belum Dimulai",
      price: "Rp 500,000.00",
      statusColor: "bg-red-500",
    },
    {
      id: 2,
      date: "Maret",
      dateRange: "2 - 5",
      time: "12:00 PM",
      worker: "Mukhlis",
      tag: "Tulang Kelapa",
      status: "Sedang Dikerjakan",
      price: "Rp 500,000.00",
      statusColor: "bg-green-500",
    },
    {
      id: 3,
      date: "Maret",
      dateRange: "2 - 5",
      time: "12:00 PM",
      worker: "Mukhlis",
      tag: "Tulang Kelapa",
      status: "Selesai",
      price: "Rp 500,000.00",
      statusColor: "bg-gray-800",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Hi, Kurniawan. Welcome back to Temu Kerja!</p>

      {/* Orders */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            {/* Date Card */}
            <div className="bg-blue-300 rounded-lg p-4 text-center min-w-[100px]">
              <div className="text-sm text-blue-800 font-medium">{order.date}</div>
              <div className="text-lg font-bold text-blue-900">{order.dateRange}</div>
              <div className="text-xs text-blue-700 mt-1">{order.time}</div>
            </div>

            {/* Worker Info */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{order.worker}</span>
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">{order.tag}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <span>Status : {order.status}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>Tarif : {order.price}</span>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className={`w-4 h-4 rounded-full ${order.statusColor}`}></div>
          </div>
        ))}

        {/* Selesai Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Selesai</h3>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-300 rounded-lg p-4 text-center min-w-[100px]">
              <div className="text-sm text-blue-800 font-medium">Maret</div>
              <div className="text-lg font-bold text-blue-900">2 - 5</div>
              <div className="text-xs text-blue-700 mt-1">12:00 PM</div>
            </div>

            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">Mukhlis</span>
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Tulang Kelapa</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <span>Status : Selesai</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>Tarif : Rp 500,000.00</span>
                </div>
              </div>
            </div>

            <div className="w-4 h-4 rounded-full bg-gray-800"></div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Temukan Pekerja!
          </button>
        </div>
      </div>
    </div>
  )
}
