"use client";

import { useState, useEffect } from "react";
import ChatSidebar from "../../../components/chat/ChatSidebar";
import ChatWindow from "../../../components/chat/ChatWindow";
import NegotiationPanel from "../../../components/chat/NegotiationPanel";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";

// --- Type Definitions ---
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
  currentUserRole: UserRole;
}

interface ChatClientPageProps {
  selectedChat: SelectedChat;
  initialMessages: Message[];
}

// --- Client-Side Component ---
export default function ChatClientPage({
  selectedChat,
  initialMessages,
}: ChatClientPageProps) {
  const [isNegotiationOpen, setIsNegotiationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggleNegotiation = () => {
    setIsNegotiationOpen((prev) => !prev);
  };

  const handleBackToSidebar = () => {
    router.push("/chat");
  };

  const handleBackToChat = () => {
    if (isNegotiationOpen) {
      setIsNegotiationOpen(false);
    }
  };

  if (isMobile) {
    if (isNegotiationOpen) {
      return (
        <NegotiationPanel
          isOpen={isNegotiationOpen}
          onToggle={handleBackToChat}
          selectedChat={selectedChat}
          isMobile={isMobile}
        />
      );
    }
    return (
      <ChatWindow
        selectedChat={selectedChat}
        initialMessages={initialMessages}
        onToggleNegotiation={handleToggleNegotiation}
        isNegotiationOpen={isNegotiationOpen}
        onBack={handleBackToSidebar}
        isMobile={isMobile}
      />
    );
  }

  return (
    <div className="flex w-full h-full p-8 gap-8">
      <ChatSidebar onBack={() => {}} isMobile={isMobile} selectedChat={selectedChat} onChatSelect={(chatId) => router.push(`/chat/${chatId}`)} />
      <div className="flex-1 flex gap-8">
        <ChatWindow
          selectedChat={selectedChat}
          initialMessages={initialMessages}
          onToggleNegotiation={handleToggleNegotiation}
          isNegotiationOpen={isNegotiationOpen}
          onBack={handleBackToSidebar}
          isMobile={isMobile}
        />
        <NegotiationPanel
          isOpen={isNegotiationOpen}
          onToggle={handleToggleNegotiation}
          selectedChat={selectedChat}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
