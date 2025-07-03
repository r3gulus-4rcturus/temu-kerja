import { ChevronDown } from "lucide-react";

interface Order {
  id: number;
  date: string;
  dateRange: string;
  time: string;
  worker: string;
  tag: string;
  status: string;
  price: string;
  statusColor: string;
}

interface DashboardMainProps {
  orders: Order[];
}

export default function DashboardMain({ orders }: DashboardMainProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#464255] mb-3">Dashboard</h1>
        <p className="text-[#2F587A] text-base font-semibold">
          Hi, Kurniawan. Welcome back to Temu Kerja!
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-[#EBF2F7] rounded-lg shadow-lg p-8 space-y-5">
        {/* Active Orders */}
        <div className="space-y-5">
          {/* Order Card 1 */}
          <div className="bg-white rounded-xl flex overflow-hidden">
            {/* Date Section */}
            <div className="bg-[#9FB6EF] px-9 py-5 flex flex-col items-center justify-between min-w-[125px]">
              <div className="text-center">
                <div className="text-[#666] text-base mb-1">Maret</div>
                <div className="text-[#181818] text-2xl font-normal tracking-[4.56px]">
                  2-5
                </div>
              </div>
              <div className="text-[#3C3C43] text-xs mt-16">12:00 PM</div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Worker Info Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                      <img
                        src="/api/placeholder/46/46"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xl font-semibold text-black">
                      Mukhlis
                    </div>
                    <div className="bg-[#3C3C43] text-white text-xs px-2 py-2 rounded-full">
                      Tukang Kebun
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#FF5252]"></div>
                </div>

                {/* Divider */}
                <div className="h-0.5 bg-[#E6E6E6]"></div>

                {/* Status and Tarif */}
                <div className="space-y-1">
                  <div className="flex items-center gap-5">
                    <span className="text-[#181818] font-semibold text-base">
                      Status :
                    </span>
                    <span className="text-[#181818] font-semibold text-base">
                      Belum Dimulai
                    </span>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-[#181818] font-semibold text-base">
                      Tarif :
                    </span>
                    <span className="text-[#181818] font-semibold text-base">
                      Rp 500.000,00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Card 2 */}
          <div className="bg-white rounded-xl flex overflow-hidden">
            {/* Date Section */}
            <div className="bg-[#9FB6EF] px-9 py-5 flex flex-col items-center justify-between min-w-[125px]">
              <div className="text-center">
                <div className="text-[#666] text-base mb-1">Maret</div>
                <div className="text-[#181818] text-2xl font-normal tracking-[4.56px]">
                  2-5
                </div>
              </div>
              <div className="text-[#3C3C43] text-xs mt-16">12:00 PM</div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Worker Info Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                      <img
                        src="/api/placeholder/46/46"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xl font-semibold text-black">
                      Mukhlis
                    </div>
                    <div className="bg-[#3C3C43] text-white text-xs px-2 py-2 rounded-full">
                      Tukang Kebun
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#21AB82]"></div>
                </div>

                {/* Divider */}
                <div className="h-0.5 bg-[#E6E6E6]"></div>

                {/* Status and Tarif */}
                <div className="space-y-1">
                  <div className="flex items-center gap-5">
                    <span className="text-[#181818] font-semibold text-base">
                      Status :
                    </span>
                    <span className="text-[#181818] font-semibold text-base">
                      Sedang Dikerjakan
                    </span>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-[#181818] font-semibold text-base">
                      Tarif :
                    </span>
                    <span className="text-[#181818] font-semibold text-base">
                      Rp 500.000,00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selesai Section */}
        <div className="px-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-[#3F75A1]">Selesai</h3>
            <ChevronDown className="w-6 h-6 text-[#B9BBBD]" />
          </div>

          {/* Completed Order Card */}
          <div className="bg-white rounded-xl flex overflow-hidden">
            {/* Date Section */}
            <div className="bg-[#9FB6EF] px-9 py-5 flex flex-col items-center justify-between min-w-[125px]">
              <div className="text-center">
                <div className="text-[#666] text-base mb-1">Maret</div>
                <div className="text-[#181818] text-2xl font-normal tracking-[4.56px]">
                  2-5
                </div>
              </div>
              <div className="text-[#3C3C43] text-xs mt-16">12:00 PM</div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Worker Info Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                      <img
                        src="/api/placeholder/46/46"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xl font-semibold text-black">
                      Mukhlis
                    </div>
                    <div className="bg-[#3C3C43] text-white text-xs px-2 py-2 rounded-full">
                      Tukang Kebun
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#464646]"></div>
                </div>

                {/* Divider */}
                <div className="h-0.5 bg-[#E6E6E6]"></div>

                {/* Status and Tarif */}
                <div className="space-y-1">
                  <div className="flex items-center gap-5">
                    <span className="text-[#181818] font-semibold text-base">
                      Status :
                    </span>
                    <span className="text-[#181818] font-semibold text-base">
                      Selesai
                    </span>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-[#181818] font-semibold text-base">
                      Tarif :
                    </span>
                    <span className="text-[#181818] font-semibold text-base">
                      Rp 500.000,00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-end pt-4">
          <button className="bg-[#4581B2] text-white px-9 py-4 rounded-lg text-xl font-bold hover:bg-[#3F75A1] transition-colors">
            Temukan Pekerja!
          </button>
        </div>
      </div>
    </div>
  );
}
