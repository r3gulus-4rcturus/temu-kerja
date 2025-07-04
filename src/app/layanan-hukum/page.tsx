"use client"

import { useState, FormEvent, ChangeEvent, KeyboardEvent } from "react"
import { Send, AlertTriangle, Bot, User } from "lucide-react"
import Footer from "../../components/shared/Footer"

// Tipe untuk setiap pesan di chat
type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  sources?: string[]
}

export default function LayananHukumPage() {
  const [inputMessage, setInputMessage] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showChat, setShowChat] = useState<boolean>(false)

  const NGROK_API_URL = "https://steady-lioness-formerly.ngrok-free.app/query"

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    if (!showChat) setShowChat(true)

    setIsLoading(true)
    setInputMessage("")

    try {
      const response = await fetch(NGROK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage.text }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const botResponse: Message = {
        id: Date.now() + 1,
        text: data.answer,
        sources: data.sources,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error fetching data:", error)
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: "Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)
  }

  const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleFormSubmit(e as unknown as FormEvent<HTMLFormElement>)
    }
  }

  if (showChat) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-t-lg border-b border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">ChatBot Layanan Hukum</h2>
                <p className="text-sm text-green-600">● Online</p>
              </div>
            </div>
          </div>

          <div className="bg-white flex-1 p-6 space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-xs md:max-w-md ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === "user" ? "bg-blue-600" : "bg-gray-600"}`}>
                    {message.sender === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex flex-col">
                    <div className={`px-4 py-3 rounded-2xl ${message.sender === "user" ? "bg-blue-600 text-white rounded-br-md" : "bg-gray-100 text-gray-900 rounded-bl-md"}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      {message.sender === "bot" && message.sources && (
                        <div className="mt-2 pt-2 border-t border-gray-500 border-opacity-30 text-xs">
                          <p className="font-bold mb-1">Sumber:</p>
                          <ul className="list-disc list-inside">
                            {message.sources.map((source, index) => (
                              <li key={index}>{source}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${message.sender === "user" ? "text-right mr-2" : "text-left ml-2"}`}>
                      {message.timestamp.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-b-lg border-t border-gray-200 p-6">
            <form onSubmit={handleFormSubmit} className="flex items-end gap-3">
              <textarea
                value={inputMessage}
                onChange={handleInputChange}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Tuliskan pertanyaan hukum Anda..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="fixed bottom-6 right-6">
            <div className="bg-red-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 cursor-pointer hover:bg-red-600 transition-colors">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">Terjadi tindakan Kejahatan? Laporkan!</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
              <span className="text-2xl">✨</span>
              Mulai Diskusi dengan ChatBot Layanan Hukum
              <span className="text-2xl">✨</span>
            </h1>
            <div className="space-y-2">
              <p className="text-gray-600 text-lg">Memiliki kebingungan seputar Aturan Pekerja di Indonesia? Mengalami kekerasan saat bekerja?</p>
              <p className="text-gray-600 text-lg font-medium">Diskusikan langkah solutif dengan ChatBot kami!</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <textarea
                  value={inputMessage}
                  onChange={handleInputChange}
                  placeholder="Tuliskan sesuatu..."
                  className="w-full h-64 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
          <div className="fixed bottom-6 right-6">
            <div className="bg-red-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 cursor-pointer hover:bg-red-600 transition-colors">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">Terjadi tindakan Kejahatan? Laporkan!</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
