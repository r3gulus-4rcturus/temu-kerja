import { ChevronDown, Search } from "lucide-react"; // 1. Import the Search icon
import { Order } from '../../lib/actions/order.actions';
import OrderCard from './OrderCard';

interface DashboardMainProps {
  orders: Order[];
  username: string;
}

export default function DashboardMain({ orders, username }: DashboardMainProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#464255] mb-3">Dashboard</h1>
        <p className="text-[#2F587A] text-base font-semibold">
          Hi, {username}. Welcome back to Temu Kerja!
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-[#EBF2F7] rounded-lg shadow-lg p-8">
        {/* 2. Check if there are orders to display */}
        {orders.length > 0 ? (
          <>
            {/* If orders exist, map through them and show the button */}
            <div className="space-y-6">
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
            <div className="flex justify-end pt-8">
              <button className="bg-[#4581B2] text-white px-9 py-4 rounded-lg text-xl font-bold hover:bg-[#3F75A1] transition-colors">
                Temukan Pekerja!
              </button>
            </div>
          </>
        ) : (
          // 3. If no orders exist, display the centered empty state message
          <div className="flex flex-col items-center justify-center text-center min-h-[800px] space-y-8">
            <div className="flex items-center gap-3 text-xl text-gray-500">
              <Search className="w-9 h-9 text-[#3F75A1]" />
              <span className="font-plusjakarta text-2xl font-bold text-[#3F75A1]">Belum Ada Pekerjaan Aktif Saat Ini!</span>
            </div>
            <button className="bg-[#4581B2] text-white px-9 py-4 rounded-lg text-xl font-bold hover:bg-[#3F75A1] transition-colors">
              Temukan Pekerja!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}