import { Order } from '../../lib/actions/fetchPropsForDashboard';

interface OrderCardProps {
  order: Order;
}

// Helper to map color names to Tailwind CSS classes
const colorMap: { [key: string]: string } = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  gray: 'bg-gray-800',
  red: 'bg-red-500',
};

export default function OrderCard({ order }: OrderCardProps) {
  const dateObj = new Date(order.date);
  const month = dateObj.toLocaleString('id-ID', { month: 'long' });
  const day = dateObj.getDate();

  return (
    <div className="bg-white rounded-xl flex overflow-hidden shadow-sm">
      {/* Date Section */}
      <div className="bg-[#9FB6EF] px-9 py-5 flex flex-col items-center justify-between min-w-[125px]">
        <div className="text-center">
          <div className="text-[#666] text-base mb-1">{month}</div>
          <div className="text-[#181818] text-2xl font-normal tracking-[4.56px]">
            {day}
          </div>
        </div>
        <div className="text-[#3C3C43] text-xs mt-16">{order.time}</div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Worker Info Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={order.avatar || "/api/placeholder/46/46"}
                  alt={order.worker}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xl font-semibold text-black">{order.worker}</div>
              <div className="bg-[#3C3C43] text-white text-xs px-2 py-2 rounded-full">
                {order.tag}
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full ${colorMap[order.statusColor] || 'bg-gray-400'}`}></div>
          </div>

          {/* Divider */}
          <div className="h-0.5 bg-[#E6E6E6]"></div>

          {/* Status and Tarif */}
          <div className="space-y-1">
            <div className="flex items-center gap-5">
              <span className="text-[#181818] font-semibold text-base">Status :</span>
              <span className="text-[#181818] font-semibold text-base">{order.status}</span>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-[#181818] font-semibold text-base">Tarif :</span>
              <span className="text-[#181818] font-semibold text-base">{order.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}