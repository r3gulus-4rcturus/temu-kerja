// src/components/ChatTerakhirSection.tsx

import { ChevronRight } from "lucide-react";
import { FC, JSX } from "react";

// ---
// Type Definitions
// ---

interface ChatItemProps {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  status: string;
  isOnline: boolean;
}

// ---
// Data
// ---

const chatItems: ChatItemProps[] = [
  {
    id: 1,
    name: "Nirmala Sanika",
    avatar: "/avatar1.png", // Path to the image in your public folder
    lastMessage: "Bisanya dihari apa ya? Saya butuh minggu ini.",
    status: "Aktif 4 menit lalu",
    isOnline: true,
  },
  {
    id: 2,
    name: "Yunanto Martono",
    avatar: "/icon1.png", // Path to the default icon in your public folder
    lastMessage: "Kamu: Selasa, jam 4 sore aman pak?",
    status: "Aktif 4 menit lalu",
    isOnline: true,
  },
];

// ---
// Sub-Components
// ---

const ChatRow: FC<{ chat: ChatItemProps; isFirst: boolean }> = ({ chat, isFirst }) => (
  <div
    className={`flex items-center gap-4 p-6 cursor-pointer transition-colors hover:bg-gray-50 ${!isFirst ? "border-t border-gray-100" : ""
      }`}
  >
    {/* Avatar */}
    <div className="relative flex-shrink-0">
      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Online Status Badge */}
      {chat.isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      )}
    </div>

    {/* Message Content */}
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline gap-2 mb-1">
        <h3 className="text-lg font-semibold text-gray-800">{chat.name}</h3>
        <span className="text-sm text-blue-500">• {chat.status}</span>
      </div>
      <p className="text-base text-gray-500 truncate">{chat.lastMessage}</p>
    </div>

    {/* Chevron Icon */}
    <ChevronRight className="w-6 h-6 text-gray-300 flex-shrink-0" />
  </div>
);

// ---
// Main Component
// ---

export default function ChatTerakhirSection(): JSX.Element {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-4xl font-bold leading-[120%] bg-gradient-to-r from-[#1D364B] via-[#5B7E9B] to-[#3F75A1] bg-clip-text text-transparent"
            style={{
              textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
              fontFamily:
                "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Chat Terakhir
          </h1>
          <p
            className="text-[#2F587A] text-xl font-semibold leading-[200%]"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Akses Cepat untuk Menghubungi Client
          </p>
        </div>
        <button
          aria-label="View all chats"
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Chat List Card */}
      <div className="mt-8 rounded-xl bg-white shadow-lg">
        <div>
          {chatItems.map((chat, index) => (
            <ChatRow key={chat.id} chat={chat} isFirst={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}