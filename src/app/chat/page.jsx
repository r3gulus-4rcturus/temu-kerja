"use client"

import { useState, useEffect } from "react"
import Navbar from "../../components/shared/Navbar"
import ChatSidebar from "../../components/chat/ChatSidebar"
import ChatWindow from "../../components/chat/ChatWindow"
import NegotiationPanel from "../../components/chat/NegotiationPanel"
import Footer from "../../components/shared/Footer"

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [isNegotiationOpen, setIsNegotiationOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
    setIsNegotiationOpen(false) // Reset negotiation when selecting new chat
  }

  const handleToggleNegotiation = () => {
    setIsNegotiationOpen(!isNegotiationOpen)
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
      {/* Navbar - Pass user role */}
      <Navbar userRole="jobprovider" />

      {/* Chat Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile: Show sidebar when no chat selected, hide when chat selected */}
        {/* Desktop: Always show sidebar */}
        {(!isMobile || !selectedChat) && (
          <ChatSidebar
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
            onBack={handleBack}
            isMobile={isMobile}
          />
        )}

        {/* Mobile: Show chat or negotiation based on state */}
        {/* Desktop: Always show chat area */}
        {(!isMobile || selectedChat) && (
          <>
            {/* Show Chat Window when negotiation is closed OR on desktop */}
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

        {/* Show Negotiation Panel */}
        {selectedChat && (
          <>
            {/* Mobile: Full screen negotiation when open */}
            {isMobile && isNegotiationOpen && (
              <NegotiationPanel
                isOpen={isNegotiationOpen}
                onToggle={handleToggleNegotiation}
                selectedChat={selectedChat}
                onBack={handleBack}
                isMobile={isMobile}
              />
            )}

            {/* Desktop: Side panel */}
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

      {/* Footer - Hidden on mobile when chat is selected */}
      {(!isMobile || !selectedChat) && <Footer />}
    </div>
  )
}
