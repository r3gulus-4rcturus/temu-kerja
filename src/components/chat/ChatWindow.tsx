"use client";

import { Send, Paperclip, Mic, ArrowLeft } from "lucide-react";
import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import { pusherClient } from "../../lib/pusher-client";
import { Channel } from "pusher-js";

// ---
// Interfaces for Data Structures
// ---

// Defines the shape of a single chat message, matching our Prisma schema
interface Message {
  id: string;
  content: string;
  sentAt: Date; // Comes as string from JSON
  sender: {
    id: string;
    username: string;
    avatar: string | null;
  };
}

// Defines the shape of the selected chat object
interface SelectedChat {
  id: string // Assuming chat ID can be number or string
  name: string
  avatar?: string // Optional avatar for the chat partner
  currentUserId: string; // ID of the current user for message alignment
}

// ---
// Interface for Component Props
// ---

interface ChatWindowProps {
  selectedChat: SelectedChat | null;
  initialMessages: Message[];
  onToggleNegotiation: () => void;
  isNegotiationOpen: boolean;
  onBack: () => void;
  isMobile: boolean;
}

// ---
// ChatWindow Component
// ---

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
    if (!selectedChat?.id) {
      return;
    }

    // Prevent subscribing multiple times
    if (channelRef.current) {
      pusherClient.unsubscribe(channelRef.current.name);
      channelRef.current = null;
    }

    // Channel names for private channels must start with "private-"
    const channelName = `private-chat-${selectedChat.id}`;
    const channel = pusherClient.subscribe(channelName);
    channelRef.current = channel;

    // Bind to the 'new-message' event
    channel.bind("new-message", (newMessage: Message) => {
      // Add the new message to the state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
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
        body: JSON.stringify({
          chatId: selectedChat.id,
          content: newMessage,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setNewMessage(""); // Clear the input field on successful send
    } catch (error) {
      console.error(error);
      // Optionally, show an error message to the user
    }
  };

  if (!selectedChat) {
    return null;
  }

  return (
    <div
      className={`flex flex-col bg-gray-50 transition-all duration-300 ${
        isMobile ? "w-full" : "flex-1"
      }`}
    >
      {/* Chat Header */}
      <div className="p-4 md:p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {isMobile && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
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
              <h3 className="font-medium text-gray-900 text-base md:text-lg truncate">
                {selectedChat.name}
              </h3>
              <p className="text-sm text-blue-600 truncate">
                {"Online"}
              </p>
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
          <div
            key={msg.id}
            className={`flex ${
              msg.sender.id === selectedChat.currentUserId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex gap-2 md:gap-3 max-w-xs md:max-w-md ${
                msg.sender.id === selectedChat.currentUserId
                  ? "flex-row-reverse"
                  : "flex-row"
              }`}
            >
              {msg.sender.id !== selectedChat.currentUserId && (
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={msg.sender.avatar || "/placeholder.svg"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <div
                  className={`px-3 md:px-4 py-2 md:py-3 rounded-2xl ${
                    msg.sender.id === selectedChat.currentUserId
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                <p
                  className={`text-xs text-gray-500 mt-1 ${
                    msg.sender.id === selectedChat.currentUserId
                      ? "text-right mr-2"
                      : "text-left ml-2"
                  }`}
                >
                  {new Date(msg.sentAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 md:p-6 bg-white border-t border-gray-200">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 md:gap-3"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewMessage(e.target.value)
              }
              placeholder="Tulis Pesan"
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-16 md:pr-20 text-sm md:text-base"
            />
            <div className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 md:gap-2">
              <button
                type="button"
                className="p-1 md:p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Paperclip className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
              </button>
              <button
                type="button"
                className="p-1 md:p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Mic className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 md:p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
