"use client";

import { useState, useEffect, JSX } from "react";
import ChatSidebar from "../../../components/chat/ChatSidebar";
import ChatWindow from "../../../components/chat/ChatWindow";
import NegotiationPanel from "../../../components/chat/NegotiationPanel";
import { useParams } from "next/navigation";

// Define Chat type based on what your chat object contains
type ChatType = {
  id: string;
  name: string;
  lastMessage?: string;
  avatar?: string;
  time?: string;
};

// Mock function to get chat details by ID
const getChatDetailsById = (id: string): ChatType | null => {
  // In a real app, you would fetch this from an API
  const chats: ChatType[] = [
    {
      id: "1", // Hardcoded to match the sidebar
      name: "Kadek Chandra",
      lastMessage: "",
      time: "Aktif",
      avatar: "https://i.pravatar.cc/150?u=chan",
    },
  ];
  return chats.find((chat) => chat.id === id) || null;
};

export default function ChatIdPage(): JSX.Element {
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [isNegotiationOpen, setIsNegotiationOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const params = useParams();
  const chatId = params.chatId as string;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (chatId) {
      const chatDetails = getChatDetailsById(chatId);
      setSelectedChat(chatDetails);
    }
  }, [chatId]);

  const handleToggleNegotiation = () => {
    setIsNegotiationOpen((prev) => !prev);
  };

  const handleBack = () => {
    if (isNegotiationOpen) {
      setIsNegotiationOpen(false);
    }
    // In mobile, going "back" from a chat window should probably go to the sidebar list.
    // This would be handled by navigation, e.g., router.push('/chat')
  };

  return (
    <>
      {(!isMobile || !selectedChat) && (
        <ChatSidebar
          selectedChat={selectedChat}
          onChatSelect={() => {}}
          onBack={handleBack}
          isMobile={isMobile}
        />
      )}

      {(!isMobile || selectedChat) && (
        <>
          {(!isNegotiationOpen || !isMobile) && (
            <ChatWindow
              selectedChat={selectedChat}
              onToggleNegotiation={handleToggleNegotiation}
              isNegotiationOpen={isNegotiationOpen}
              onBack={handleBack}
              isMobile={isMobile}
            />
          )}
        </>
      )}

      {selectedChat && (
        <>
          {isMobile && isNegotiationOpen && (
            <NegotiationPanel
              isOpen={isNegotiationOpen}
              onToggle={handleToggleNegotiation}
              selectedChat={selectedChat}
              onBack={handleBack}
              isMobile={isMobile}
            />
          )}

          {!isMobile && (
            <NegotiationPanel
              isOpen={isNegotiationOpen}
              onToggle={handleToggleNegotiation}
              selectedChat={selectedChat}
              isMobile={isMobile}
            />
          )}
        </>
      )}
    </>
  );
}
