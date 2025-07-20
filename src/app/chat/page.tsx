"use client";

import ChatSidebar from "../../components/chat/ChatSidebar";

export default function ChatPage() {
  return (
    <>
      <ChatSidebar
        selectedChat={null}
        onChatSelect={() => {}}
        onBack={() => {}}
        isMobile={false}
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
