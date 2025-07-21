"use client";

import { Calendar, ArrowLeft, CheckCircle, XCircle, Info } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { pusherClient } from "../../lib/pusher-client";
import { Channel } from "pusher-js";
import { UserRole } from "@prisma/client";

// --- Type Definitions ---

type User = {
  id: string;
  username: string;
  avatar?: string | null;
};

type NegotiationMessage = {
  id: string;
  senderId: string;
  sender: User;
  negotiationPrice: number;
  workHoursDuration: number;
  workDaysDuration: number;
  createdAt: string;
};

type NegotiationData = {
  id: string;
  chatId: string;
  providerStatus: "onnegotiation" | "agreed";
  seekerStatus: "onnegotiation" | "agreed";
  jobDetails: {
    location: string;
    dateTime: string;
  };
  messages: NegotiationMessage[];
};

type SelectedChat = {
  id: string;
  name: string;
  avatar?: string;
  currentUserId: string;
  currentUserRole: UserRole;
};

type NegotiationPanelProps = {
  isOpen: boolean;
  onToggle: () => void;
  selectedChat: SelectedChat | null;
  isMobile?: boolean;
};

type AgreementState =
  | "initial" // Both sides onnegotiation, no new offer
  | "can_propose" // User has typed something
  | "waiting_other" // User has made an offer
  | "can_accept" // The other user has made an offer
  | "user_agreed" // Current user has agreed, waiting for other
  | "agreed"; // Both parties have agreed

// --- Main Component ---

export default function NegotiationPanel({
  isOpen,
  onToggle,
  selectedChat,
  isMobile = false,
}: NegotiationPanelProps) {
  const [formData, setFormData] = useState({
    workHoursDuration: "3",
    workDaysDuration: "1",
    tariff: "50000",
  });
  const [negotiationData, setNegotiationData] = useState<NegotiationData | null>(null);
  const [lastOffer, setLastOffer] = useState<NegotiationMessage | null>(null);
  const [agreementState, setAgreementState] = useState<AgreementState>("initial");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const channelRef = useRef<Channel | null>(null);

  // --- Data Fetching and Pusher Subscription ---
  useEffect(() => {
    if (!isOpen || !selectedChat) return;

    const fetchNegotiationData = async () => {
      const res = await fetch(`/api/chat/${selectedChat.id}/negotiation`);
      if (res.ok) {
        const data: NegotiationData = await res.json();
        setNegotiationData(data);
        updateFullState(data);
      }
    };

    fetchNegotiationData();

    const channelName = `private-negotiation-${negotiationData?.id || selectedChat.id}`;
    if (channelRef.current?.name !== channelName) {
        if (channelRef.current) {
            pusherClient.unsubscribe(channelRef.current.name);
        }
        const channel = pusherClient.subscribe(channelName);
        channelRef.current = channel;

        channel.bind("new-offer", (newOffer: NegotiationMessage) => {
            setNegotiationData(prev => prev ? {...prev, messages: [newOffer, ...prev.messages]} : null);
            updateFullState({ ...negotiationData!, messages: [newOffer] });
        });

        channel.bind("status-updated", (data: { updatedStatus: NegotiationData }) => {
            setNegotiationData(prev => prev ? {...prev, ...data.updatedStatus} : null);
            updateFullState(data.updatedStatus);
        });

        channel.bind("negotiation-complete", (data: { message: string }) => {
            setNotification({ message: data.message, type: 'success' });
            setAgreementState("agreed");
        });
    }

    return () => {
      if (channelRef.current) {
        pusherClient.unsubscribe(channelRef.current.name);
        channelRef.current = null;
      }
    };
  }, [isOpen, selectedChat, negotiationData?.id]);
  
  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);


  const updateFullState = (data: NegotiationData) => {
    const latestMessage = data.messages && data.messages.length > 0 ? data.messages[0] : null;
    if (latestMessage) {
        setLastOffer(latestMessage);
        setFormData({
            workHoursDuration: latestMessage.workHoursDuration.toString(),
            workDaysDuration: latestMessage.workDaysDuration.toString(),
            tariff: latestMessage.negotiationPrice.toString(),
        });
    }

    const { providerStatus, seekerStatus } = data;
    const myRole = selectedChat?.currentUserRole;

    if (providerStatus === 'agreed' && seekerStatus === 'agreed') {
        setAgreementState("agreed");
    } else if (myRole === 'jobprovider' && providerStatus === 'agreed') {
        setAgreementState('user_agreed');
    } else if (myRole === 'jobseeker' && seekerStatus === 'agreed') {
        setAgreementState('user_agreed');
    } else if (latestMessage && latestMessage.senderId !== selectedChat?.currentUserId) {
        setAgreementState("can_accept");
    } else if (latestMessage && latestMessage.senderId === selectedChat?.currentUserId) {
        setAgreementState("waiting_other");
    } else {
        setAgreementState("initial");
    }
  };

  // --- Event Handlers ---
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setAgreementState("can_propose");
  };

  const handlePropose = async () => {
    if (!negotiationData) return;
    const res = await fetch("/api/negotiation/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        negotiationChatId: negotiationData.id,
        negotiationPrice: formData.tariff,
        workHoursDuration: formData.workHoursDuration,
        workDaysDuration: formData.workDaysDuration,
      }),
    });

    if (res.ok) {
      setAgreementState("waiting_other");
    } else {
      console.error("Failed to send negotiation offer.");
    }
  };
  
  const handleAcceptOffer = () => {
      if (lastOffer) {
          setFormData({
              tariff: lastOffer.negotiationPrice.toString(),
              workHoursDuration: lastOffer.workHoursDuration.toString(),
              workDaysDuration: lastOffer.workDaysDuration.toString(),
          });
          setAgreementState("initial");
      }
  };

  const handleAgree = async () => {
    if (!selectedChat) return;
    const res = await fetch("/api/negotiation/agree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: selectedChat.id })
    });

    if (res.ok) {
        setAgreementState("user_agreed");
    } else {
        console.error("Failed to agree to negotiation.");
    }
  };

  // --- UI Rendering Logic ---
  const getButtonState = () => {
    if (agreementState === "agreed") return { text: "Telah Disetujui!", disabled: true };
    if (agreementState === 'can_propose') return { text: "Ajukan Nego", onClick: handlePropose, disabled: false };
    if (agreementState === 'waiting_other') return { text: "Sepakat Kerja", onClick: handleAgree, disabled: false };
    if (agreementState === 'can_accept') return { text: "Terima Nego", onClick: handleAcceptOffer, disabled: false };
    if (agreementState === 'user_agreed') {
        const otherParty = selectedChat?.currentUserRole === 'jobprovider' ? 'Pekerja' : 'Client';
        return { text: `Menunggu Persetujuan ${otherParty}`, disabled: true };
    }
    return { text: "Sepakat Kerja", onClick: handleAgree, disabled: false };
  };
  
  const getNotificationStyle = () => {
    if (!notification) return {};
    switch (notification.type) {
      case "success":
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          borderColor: "border-green-200",
        };
      case "error":
        return {
          icon: <XCircle className="w-6 h-6 text-red-500" />,
          borderColor: "border-red-200",
        };
      case "info":
        return {
          icon: <Info className="w-6 h-6 text-blue-500" />,
          borderColor: "border-blue-200",
        };
    }
  };
  
  const buttonState = getButtonState();

  if (!isOpen) return null;

  const renderContent = () => (
    <>
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Last Offer Notification */}
        {lastOffer && lastOffer.senderId !== selectedChat?.currentUserId && agreementState !== 'agreed' && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg text-sm text-center">
            <p className="font-semibold">
              {lastOffer.sender.username} mengusulkan harga: Rp {lastOffer.negotiationPrice.toLocaleString('id-ID')}
            </p>
             <p className="font-semibold">
              Durasi: {lastOffer.workHoursDuration} Jam, {lastOffer.workDaysDuration} Hari
            </p>
          </div>
        )}

        {/* Form Fields */}
        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">Lokasi</label>
          <textarea
            value={negotiationData?.jobDetails?.location || "Loading..."}
            readOnly
            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed resize-none"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">Tanggal</label>
          <div className="relative">
            <input
              type="text"
              value={negotiationData ? new Date(negotiationData.jobDetails.dateTime).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Loading..."}
              readOnly
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
            <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">Durasi Bekerja</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={formData.workHoursDuration}
              onChange={(e) => handleInputChange("workHoursDuration", e.target.value)}
              className="w-20 p-3 border border-gray-300 rounded-lg text-center"
              min="1"
            />
            <span className="text-gray-700 text-base">Jam</span>
            <input
              type="number"
              value={formData.workDaysDuration}
              onChange={(e) => handleInputChange("workDaysDuration", e.target.value)}
              className="w-20 p-3 border border-gray-300 rounded-lg text-center"
              min="1"
            />
            <span className="text-gray-700 text-base">Hari</span>
          </div>
        </div>
        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">Tarif</label>
          <input
            type="number"
            value={formData.tariff}
            onChange={(e) => handleInputChange("tariff", e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg"
            placeholder="50000"
          />
        </div>
      </div>
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={buttonState.onClick}
          disabled={buttonState.disabled}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonState.text}
        </button>
      </div>
    </>
  );

  return (
    <div className={`bg-white border-l border-gray-200 flex flex-col h-full ${isMobile ? "w-full" : "w-80"}`}>
       {/* Notification Popup */}
       {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-500">
          <div
            className={`bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border ${
              getNotificationStyle().borderColor
            }`}
          >
            {getNotificationStyle().icon}
            <p className="font-medium text-gray-800">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-900">Negosiasi</h2>
          <button
            onClick={onToggle}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Chat
          </button>
        </div>
        <p className="text-sm text-gray-600">Lakukan negosiasi dengan mudah!</p>
      </div>
      {renderContent()}
    </div>
  );
}
