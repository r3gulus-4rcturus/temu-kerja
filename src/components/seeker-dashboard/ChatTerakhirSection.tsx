import { ChevronRight } from "lucide-react"

// ---
// Interface for Chat Item
// ---

interface ChatItem {
  id: number;
  name: string;
  avatar?: string; // Optional if some chats might not have an avatar
  lastMessage: string;
  status: string;
}

// ---
// ChatTerakhirSection Component
// ---

export default function ChatTerakhirSection() {
  const chatItems: ChatItem[] = [
    {
      id: 1,
      name: "Nirmala Sanika",
      avatar: "/placeholder.svg?height=48&width=48",
      lastMessage: "Bisanya dihari apa ya? Saya butuh minggu ini...",
      status: "Aktif 4 menit lalu",
    },
    {
      id: 2,
      name: "Yunanto Martono",
      avatar: "/placeholder.svg?height=48&width=48",
      lastMessage: "Kamu: Selasa, jam 4 sore aman pak?",
      status: "Aktif 4 menit lalu",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Chat Terakhir</h2>
          <p className="text-gray-600">Akses Cepat untuk Menghubungi Client</p>
        </div>
        <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="space-y-4">
        {chatItems.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
              <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900">{chat.name}</h3>
                <span className="text-sm text-blue-600">• {chat.status}</span>
              </div>
              <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}