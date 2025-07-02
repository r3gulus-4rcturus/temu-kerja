"use client"

import { ArrowLeft } from "lucide-react"

// ---
// Interfaces for Data Structures
// ---

// Defines the shape of a single chat item
interface ChatItem {
  id: number | string // Assuming chat ID can be number or string
  name: string
  lastMessage: string
  time: string // e.g., "Aktif 4 menit lalu"
  avatar?: string // Avatar is optional
}

// Defines the shape of the selected chat object (similar to ChatItem, but it's often good to keep them distinct if their usage differs)
interface SelectedChat {
  id: number | string
  name: string
  // Add other properties if selectedChat carries more data than just ChatItem relevant for display
}


// ---
// Interface for Component Props
// ---

interface ChatSidebarProps {
  selectedChat: SelectedChat | null // Can be a SelectedChat object or null
  onChatSelect: (chat: ChatItem) => void // Function that takes a ChatItem and returns void
  onBack: () => void // Function with no arguments, returns void
  isMobile: boolean
}

// ---
// ChatSidebar Component
// ---

export default function ChatSidebar({ selectedChat, onChatSelect, onBack, isMobile }: ChatSidebarProps) {
  // The 'chats' array is hardcoded. If this were dynamic (e.g., fetched from an API),
  // it would typically be part of a state or props managed by a parent.
  const chats: ChatItem[] = [ // Explicitly type the chats array
    {
      id: 1,
      name: "Nirmala Sanika",
      lastMessage: "Bisanya dihari apa ya? Saya butuh minggu ini...",
      time: "Aktif 4 menit lalu",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Nirmala Sanika",
      lastMessage: "Kamu: Selasa, jam 4 sore aman pak?",
      time: "Aktif 4 menit lalu",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col h-full ${isMobile ? "w-full" : "w-96"}`}>
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {isMobile && selectedChat && (
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Chat</h2>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)} // Pass the chat item to the handler
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChat?.id === chat.id ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className="w-full h-full object-cover" />
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900">{chat.name}</h3>
                  <span className="text-sm text-blue-600">• {chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{chat.lastMessage}</p>
              </div>

              {/* Arrow */}
              <div className="text-gray-400 mt-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}