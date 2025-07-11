"use client"

import { Send, Paperclip, Mic, ArrowLeft } from "lucide-react"
import { useState, FormEvent, ChangeEvent } from "react" // Import event types

// ---
// Interfaces for Data Structures
// ---

// Defines the shape of a single chat message
interface Message {
  id: number
  sender: "other" | "me" // Sender can only be 'other' or 'me'
  content: string
  time: string
  avatar?: string // Avatar is optional, only present for 'other' sender
}

// Defines the shape of the selected chat object
interface SelectedChat {
  id: number | string // Assuming chat ID can be number or string
  name: string
  avatar?: string // Optional avatar for the chat partner
  time: string // Last active time of the chat
}

// ---
// Interface for Component Props
// ---

interface ChatWindowProps {
  selectedChat: SelectedChat | null // Can be a SelectedChat object or null
  onToggleNegotiation: () => void // Function with no arguments, returns void
  isNegotiationOpen: boolean
  onBack: () => void // Function with no arguments, returns void
  isMobile: boolean
}

// ---
// ChatWindow Component
// ---

export default function ChatWindow({
  selectedChat,
  onToggleNegotiation,
  isNegotiationOpen,
  onBack,
  isMobile,
}: ChatWindowProps) {
  const [message, setMessage] = useState<string>("") // Explicitly type useState for string

  // The 'messages' array is hardcoded. If this were dynamic (e.g., fetched from an API),
  // it would typically be part of a state or props managed by a parent.
  const messages: Message[] = [ // Explicitly type the messages array
    // {
    //   id: 1,
    //   sender: "other",
    //   content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    //   time: "07:00",
    //   avatar: "/placeholder.svg?height=32&width=32",
    // },
    // {
    //   id: 2,
    //   sender: "me",
    //   content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    //   time: "07:51",
    // },
    // {
    //   id: 3,
    //   sender: "other",
    //   content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    //   time: "13:00",
    //   avatar: "/placeholder.svg?height=32&width=32",
    // },
    // {
    //   id: 4,
    //   sender: "me",
    //   content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    //   time: "14:11",
    // },
  ]

  const handleSendMessage = (e: FormEvent) => { // Type event as FormEvent
    e.preventDefault()
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  // Render null if no chat is selected (especially for mobile to hide the window)
  if (!selectedChat) {
    return null
  }

  return (
    <div className={`flex flex-col bg-gray-50 transition-all duration-300 ${isMobile ? "w-full" : "flex-1"}`}>
      {/* Chat Header */}
      <div className="p-4 md:p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {isMobile && (
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={selectedChat.avatar || "/placeholder.svg"}
                alt={selectedChat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900 text-base md:text-lg truncate">{selectedChat.name}</h3>
              <p className="text-sm text-blue-600 truncate">{selectedChat.time}</p>
            </div>
          </div>

          <button
            onClick={onToggleNegotiation}
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium transition-colors text-sm md:text-base flex-shrink-0 ml-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            {isNegotiationOpen ? "Kembali ke Chat" : "Mulai Negosiasi"}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex gap-2 md:gap-3 max-w-xs md:max-w-md ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.sender === "other" && (
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                  <img src={msg.avatar || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex flex-col">
                <div
                  className={`px-3 md:px-4 py-2 md:py-3 rounded-2xl ${
                    msg.sender === "me"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                <p
                  className={`text-xs text-gray-500 mt-1 ${msg.sender === "me" ? "text-right mr-2" : "text-left ml-2"}`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 md:p-6 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 md:gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} // Type ChangeEvent
              placeholder="Tulis Pesan"
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-16 md:pr-20 text-sm md:text-base"
            />
            <div className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 md:gap-2">
              <button type="button" className="p-1 md:p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                <Paperclip className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
              </button>
              <button type="button" className="p-1 md:p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                <Mic className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 md:p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}