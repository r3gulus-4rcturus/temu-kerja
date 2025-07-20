"use client";

import { useState, useEffect } from "react";
import ChatSidebar from "../../../components/chat/ChatSidebar";
import ChatWindow from "../../../components/chat/ChatWindow";
import NegotiationPanel from "../../../components/chat/NegotiationPanel";

// ---
// Type Definitions
// ---

interface Message {
  id: string;
  content: string;
  sentAt: Date;
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
  currentUserId: string;
}

interface ChatClientPageProps {
  selectedChat: SelectedChat;
  initialMessages: Message[];
}

// ---
// Client-Side Component
// ---

export default function ChatClientPage({
  selectedChat,
  initialMessages,
}: ChatClientPageProps) {
  const [isNegotiationOpen, setIsNegotiationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggleNegotiation = () => {
    setIsNegotiationOpen((prev) => !prev);
  };

  const handleBack = () => {
    if (isNegotiationOpen) {
      setIsNegotiationOpen(false);
    }
    // In a real mobile app, you might use router.back() or similar
  };

  return (
    <>
      <ChatSidebar onBack={handleBack} isMobile={isMobile} />

      <ChatWindow
        selectedChat={selectedChat}
        initialMessages={initialMessages}
        onToggleNegotiation={handleToggleNegotiation}
        isNegotiationOpen={isNegotiationOpen}
        onBack={handleBack}
        isMobile={isMobile}
      />

      <NegotiationPanel
        isOpen={isNegotiationOpen}
        onToggle={handleToggleNegotiation}
        selectedChat={selectedChat}
        isMobile={isMobile}
      />
    </>
  );
}
