"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// ---
// Interfaces for Data Structures
// ---

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar?: string;
}

interface ChatSidebarProps {
  selectedChat: any | null; // Replace 'any' with the actual chat type if available
  onChatSelect: (chatId: string) => void;
  onBack: () => void;
  isMobile: boolean;
}

// ---
// ChatSidebar Component
// ---

export default function ChatSidebar({ onBack, isMobile }: ChatSidebarProps) {
  const params = useParams();
  const currentChatId = params.chatId as string;
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/chats");
        if (res.ok) {
          const data = await res.json();
          setChats(data);
        } else {
          console.error("Failed to fetch chats");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="flex-shrink-0 w-full md:w-[460px] h-full flex flex-col">
      <div className="p-8">
        <h1 style={{fontFamily: 'var(--heading-h3-font-family)', fontWeight: 'var(--heading-h3-font-weight)', color: 'var(--theme-colordark)', fontSize: 'var(--heading-h3-font-size)'}} className="whitespace-nowrap">
          Chat
        </h1>
      </div>

      <div className="flex-1 px-4 pb-4">
        <div className="flex flex-col h-full items-start gap-4 p-5 bg-[#fdfdff] rounded-[20px] border border-solid border-[#ebf2f7] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 w-full">Loading chats...</div>
          ) : chats.length === 0 ? (
            <div className="p-4 text-center text-gray-500 w-full">No conversations yet.</div>
          ) : (
            chats.map((chat) => (
              <Link href={`/chat/${chat.id}`} key={chat.id} className="w-full">
                <div className={`flex w-full items-center p-4 rounded-[10px] border border-solid border-[#dfe0eb] cursor-pointer transition-colors ${currentChatId === chat.id ? "bg-blue-50" : "bg-white hover:bg-gray-50"}`}>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative w-12 h-12">
                        <img src={chat.avatar || '/placeholder.svg'} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-black text-xl truncate" style={{fontFamily: 'Roboto-Medium, Helvetica'}}>
                          {chat.name}
                        </p>
                        <div className="w-1 h-1 bg-[#46464680] rounded-sm" />
                        <p className="text-[#1976d2] text-base whitespace-nowrap" style={{fontFamily: 'Public_Sans-Regular, Helvetica'}}>
                          {chat.time}
                        </p>
                      </div>
                      <p className="font-body-b2 text-[#a1a1a1] text-sm truncate" style={{fontFamily: 'var(--body-b2-font-family)'}}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 ml-4" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
