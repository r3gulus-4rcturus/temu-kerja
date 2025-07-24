"use client";

import { useState, useEffect } from "react";
import ChatSidebar from "../../components/chat/ChatSidebar";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChatSelect = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <>
      <ChatSidebar
        selectedChat={null}
        onChatSelect={handleChatSelect}
        onBack={() => {}}
        isMobile={isMobile}
      />
      <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-gray-50 text-center">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Select a chat to start messaging
          </h2>
          <p className="text-gray-500 mt-2">
            Your conversations will appear here.
          </p>
        </div>
      </div>
    </>
  );
}