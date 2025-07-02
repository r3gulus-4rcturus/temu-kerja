"use client"

import { useState, useEffect, JSX } from "react"
import Navbar from "../../components/shared/Navbar"
import ChatSidebar from "../../components/chat/ChatSidebar"
import ChatWindow from "../../components/chat/ChatWindow"
import NegotiationPanel from "../../components/chat/NegotiationPanel"
import Footer from "../../components/shared/Footer"

// Define Chat type based on what your chat object contains
type ChatType = {
  id: string
  name: string
  lastMessage?: string
  // Add more fields as needed
}

export default function Chat(): JSX.Element {
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null)
  const [isNegotiationOpen, setIsNegotiationOpen] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleChatSelect = (chat: ChatType) => {
    setSelectedChat(chat)
    setIsNegotiationOpen(false)
  }

  const handleToggleNegotiation = () => {
    setIsNegotiationOpen((prev) => !prev)
  }

  const handleBack = () => {
    if (isNegotiationOpen) {
      setIsNegotiationOpen(false)
    } else {
      setSelectedChat(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar userRole="jobprovider" />

      <div className="flex-1 flex overflow-hidden">
        {(!isMobile || !selectedChat) && (
          <ChatSidebar
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
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
      </div>

      {(!isMobile || !selectedChat) && <Footer />}
    </div>
  )
}
