"use client";

import { Send, Paperclip, Mic, ArrowLeft } from "lucide-react";
import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import { pusherClient } from "../../lib/pusher-client";
import { Channel } from "pusher-js";

// --- Interfaces ---
interface Message {
  id: string;
  content: string;
  sentAt: string;
  sender: {
    id: string;
    username: string;
    avatar: string | null;
  };
}

interface SelectedChat {
  id: string;
  name: string;
  avatar?: string;
  time?: string;
  currentUserId: string;
}

interface ChatWindowProps {
  selectedChat: SelectedChat | null;
  initialMessages: Message[];
  onToggleNegotiation: () => void;
  isNegotiationOpen: boolean;
  onBack: () => void;
  isMobile: boolean;
}

// --- Component ---
export default function ChatWindow({
  selectedChat,
  initialMessages,
  onToggleNegotiation,
  isNegotiationOpen,
  onBack,
  isMobile,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const channelRef = useRef<Channel | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Effect for Pusher subscription
  useEffect(() => {
    if (!selectedChat?.id) return;
    if (channelRef.current) pusherClient.unsubscribe(channelRef.current.name);
    
    const channelName = `private-chat-${selectedChat.id}`;
    const channel = pusherClient.subscribe(channelName);
    channelRef.current = channel;

    // Bind to the 'new-message' event
    channel.bind("new-message", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Cleanup on component unmount or when chatId changes
    return () => {
      if (channelRef.current) {
        pusherClient.unsubscribe(channelRef.current.name);
        channelRef.current = null;
      }
    };
  }, [selectedChat?.id]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: selectedChat.id, content: newMessage }),
      });
      if (res.ok) setNewMessage("");
    } catch (error) {
      console.error(error);
      // Optionally, show an error message to the user
    }
  };

  if (!selectedChat) return null;

  return (
    <div className={`flex flex-col h-full bg-[#fdfdff] rounded-[20px] border border-solid border-[#ebf2f7] transition-all duration-300 ${isMobile ? "w-full" : "flex-1"}`}>
      {/* Header */}
      <div className="flex h-24 items-center justify-between px-8 bg-[#ebf2f7] rounded-t-[10px]">
        <div className="inline-flex items-center gap-3">
          {isMobile && (
            <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <img src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="inline-flex items-center gap-2">
            <div className="font-semibold text-black text-lg" style={{fontFamily: 'var(--sub-heading-s3-font-family)'}}>
              {selectedChat.name}
            </div>
            <div className="w-1 h-1 bg-[#46464680] rounded-sm" />
            <div className="font-normal text-[#1976d2] text-base" style={{fontFamily: 'Public_Sans-Regular, Helvetica'}}>
              {selectedChat.time || "Online"}
            </div>
          </div>
        </div>
        <button onClick={onToggleNegotiation} className="border-[3px] border-[#558ebd] h-[42px] w-36 rounded-lg text-[#3f75a1] font-bold text-sm hover:bg-blue-50 transition-colors" style={{fontFamily: 'var(--heading-h7-font-family)'}}>
          {isNegotiationOpen ? "Tutup Negosiasi" : "Mulai Negosiasi"}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender.id === selectedChat.currentUserId
                ? "justify-end"
                : "justify-start"
                }`}
                >
              {msg.sender.id !== selectedChat.currentUserId && (
                <img src={msg.sender.avatar || "/placeholder.svg"} alt="Avatar" className="w-8 h-8 rounded-full object-cover self-start" />
              )}
              <div className={`flex flex-col ${msg.sender.id === selectedChat.currentUserId ? "items-end" : "items-start"}`}>
                <div className={`max-w-md p-3 rounded-[10px] ${msg.sender.id === selectedChat.currentUserId ? "bg-[#558ebd] text-white" : "bg-white border border-solid border-[#4581b2]"}`}>
                  <p className="text-xs leading-5" style={{fontFamily: 'Roboto-Regular, Helvetica'}}>
                    {msg.content}
                  </p>
                </div>
                <p className="text-[10px] text-[#333333] mt-1 px-2" style={{fontFamily: 'Public_Sans-Regular, Helvetica'}}>
                  {new Date(msg.sentAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6">
        <form onSubmit={handleSendMessage} className="relative w-full h-[57px]">
          <div className="relative w-full h-full bg-white rounded-[10px] border border-solid border-[#4581b2] flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
              placeholder="Tulis Pesan . . ."
              className="w-full h-full pl-6 pr-32 bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
              style={{fontFamily: 'var(--body-b2-font-family)'}}
            />
            <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center gap-3">
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full"><Paperclip className="w-5 h-5 text-gray-600" /></button>
              <button type="button" className="p-1.5 hover:bg-gray-100 rounded-full"><Mic className="w-5 h-5 text-[#4581B2]" /></button>
              <button type="submit" disabled={!newMessage.trim()} className="w-10 h-10 bg-[#4581b2] rounded-[10px] flex items-center justify-center disabled:opacity-50">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
