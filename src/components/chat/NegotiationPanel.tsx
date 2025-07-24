"use client";

import { Calendar, ArrowLeft, CheckCircle, XCircle, Info } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { pusherClient } from "../../lib/pusher-client";
import { Channel } from "pusher-js";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";

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
        setNegotiationData(prev => prev ? { ...prev, messages: [newOffer, ...prev.messages] } : null);
        updateFullState({ ...negotiationData!, messages: [newOffer] });
      });

      channel.bind("status-updated", (data: { updatedStatus: NegotiationData }) => {
        setNegotiationData(prev => prev ? { ...prev, ...data.updatedStatus } : null);
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
    <div
      className={`flex flex-col w-[326px] h-[727px] items-start gap-4 pl-5 pr-[19px] pt-0 pb-6 relative bg-[#fdfdff] rounded-[20px] overflow-hidden border border-solid border-[#ebf2f7]`}
    >
      <div className="relative w-0.5 h-0.5 bg-[#d9d9d9] rounded-[1px]" />

      <div className="relative w-[250px] h-[61px]">
        <div className="absolute top-0 left-0 font-heading-h4 font-[number:var(--heading-h4-font-weight)] text-theme-colordark text-[length:var(--heading-h4-font-size)] tracking-[var(--heading-h4-letter-spacing)] leading-[var(--heading-h4-line-height)] whitespace-nowrap [font-style:var(--heading-h4-font-style)]">
          Negosiasi
        </div>

        <p className="absolute top-[29px] left-0 font-sub-heading-s5 font-[number:var(--sub-heading-s5-font-weight)] text-[#2f587a] text-[length:var(--sub-heading-s5-font-size)] tracking-[var(--sub-heading-s5-letter-spacing)] leading-[var(--sub-heading-s5-line-height)] whitespace-nowrap [font-style:var(--sub-heading-s5-font-style)]">
          Lakukan negosiasi dengan mudah!
        </p>
      </div>

      <div className="flex-col w-72 items-start gap-6 mr-[-0.69px] flex relative flex-[0_0_auto]">
        <div className="self-stretch w-full flex-[0_0_auto] flex flex-col items-start gap-1 relative">
          <Label
            className="!self-stretch !flex-[0_0_auto] !w-full"
            divClassName="!tracking-[var(--body-b2-letter-spacing)] !text-[length:var(--body-b2-font-size)] ![font-style:var(--body-b2-font-style)] !font-[number:var(--body-b2-font-weight)] !font-body-b2 !leading-[var(--body-b2-line-height)]"
            label="Lokasi"
            showAsterisk={false}
            size="lg"
          />
          <div className="flex items-start px-3 py-2 relative self-stretch w-full flex-[0_0_auto] rounded-lg border border-solid border-zinc-200">
            <p className="relative flex-1 mt-[-1.00px] font-body-b3 font-[number:var(--body-b3-font-weight)] text-[#1d364b] text-[length:var(--body-b3-font-size)] tracking-[var(--body-b3-letter-spacing)] leading-[var(--body-b3-line-height)] [font-style:var(--body-b3-font-style)]">
              {negotiationData?.jobDetails?.location || "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
          <Label
            className="!self-stretch !flex-[0_0_auto] !w-full"
            divClassName="!tracking-[var(--body-b2-letter-spacing)] !text-[length:var(--body-b2-font-size)] ![font-style:var(--body-b2-font-style)] !font-[number:var(--body-b2-font-weight)] !font-body-b2 !leading-[var(--body-b2-line-height)]"
            label="Tanggal"
            showAsterisk={false}
            size="lg"
          />
          <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="px-4 py-2.5 self-stretch w-full flex-[0_0_auto] shadow-shadows-sm flex min-h-9 items-center gap-2 relative bg-white rounded-md border border-solid border-zinc-200">
                <Icon
                  className="!h-[unset] !flex-[0_0_auto] !z-[1] !inline-flex !w-[unset]"
                  icon={<Calendar className="!relative !w-5 !h-5" />}
                  size="md"
                />
                <div className="flex gap-2 flex-1 grow z-0 items-center relative">
                  <div className="inline-flex gap-2 flex-[0_0_auto] items-center relative">
                    <div className="font-body-b2 text-zinc-500 leading-[var(--body-b2-line-height)] relative w-fit mt-[-1.00px] font-[number:var(--body-b2-font-weight)] text-[length:var(--body-b2-font-size)] tracking-[var(--body-b2-letter-spacing)] whitespace-nowrap [font-style:var(--body-b2-font-style)]">
                      {negotiationData ? new Date(negotiationData.jobDetails.dateTime).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Loading..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="items-center gap-[18px] self-stretch w-full flex relative flex-[0_0_auto]">
          <div className="flex-1 grow flex flex-col items-start gap-1 relative">
            <Label
              className="!self-stretch !flex-[0_0_auto] !w-full"
              divClassName="!tracking-[var(--body-b2-letter-spacing)] !text-[length:var(--body-b2-font-size)] ![font-style:var(--body-b2-font-style)] !font-[number:var(--body-b2-font-weight)] !font-body-b2 !leading-[var(--body-b2-line-height)]"
              label="Durasi Bekerja"
              showAsterisk={false}
              size="lg"
            />
            <div className="flex items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-row w-full gap-4">
                <div className="w-1/2 flex items-center">
                  <div className="px-3 py-2.5 w-full overflow-hidden flex min-h-9 items-center gap-2 bg-white rounded-md border border-solid border-zinc-200">
                    <div className="flex justify-between w-full items-center">
                      <input
                        type="number"
                        value={formData.workHoursDuration}
                        onChange={(e) => handleInputChange('workHoursDuration', e.target.value)}
                        className="[font-family:'Inter-Regular',Helvetica] text-[#414d5f] leading-7 w-full mt-[-1.00px] font-normal text-base tracking-[0] whitespace-nowrap"
                        min="1"
                      />
                      <div className="[font-family:'Inter-Regular',Helvetica] text-[#414d5f] leading-7 w-fit mt-[-1.00px] font-normal text-base tracking-[0] whitespace-nowrap">
                        Jam
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 flex items-center">
                  <div className="px-3 py-2.5 w-full overflow-hidden flex min-h-9 items-center gap-2 bg-white rounded-md border border-solid border-zinc-200">
                    <div className="flex justify-between w-full items-center">
                      <input
                        type="number"
                        value={formData.workDaysDuration}
                        onChange={(e) => handleInputChange('workDaysDuration', e.target.value)}
                        className="[font-family:'Inter-Regular',Helvetica] text-[#414d5f] leading-7 w-full mt-[-1.00px] font-normal text-base tracking-[0] whitespace-nowrap"
                        min="1"
                      />
                      <div className="[font-family:'Inter-Regular',Helvetica] text-[#414d5f] leading-7 w-fit mt-[-1.00px] font-normal text-base tracking-[0] whitespace-nowrap">
                        Hari
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[18px] relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex-1 grow flex flex-col items-start gap-1 relative">
            <Label
              className="!self-stretch !flex-[0_0_auto] !w-full"
              divClassName="!tracking-[var(--body-b2-letter-spacing)] !text-[length:var(--body-b2-font-size)] ![font-style:var(--body-b2-font-style)] !font-[number:var(--body-b2-font-weight)] !font-body-b2 !leading-[var(--body-b2-line-height)]"
              label="Tarif"
              showAsterisk={false}
              size="lg"
            />
            <div className="self-stretch w-full flex-[0_0_auto] flex items-center gap-[17px] relative">
              <div className="px-3 py-2.5 flex-1 grow overflow-hidden flex min-h-9 items-center gap-2 relative bg-white rounded-md border border-solid border-zinc-200">
                <div className="flex gap-0.5 flex-1 self-stretch grow items-center relative">
                  <input
                    type="number"
                    value={formData.tariff}
                    onChange={(e) => handleInputChange("tariff", e.target.value)}
                    className="[font-family:'Inter-Regular',Helvetica] text-[#414d5f] leading-7 relative w-fit mt-[-1.00px] font-normal text-base tracking-[0] whitespace-nowrap"
                    placeholder="50000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
        <Button
          onClick={buttonState.onClick}
          disabled={buttonState.disabled}
          variant="default"
          size="lg"
          className="w-full"
        >
          {buttonState.text}
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`bg-white  flex flex-col h-full ${isMobile ? "w-full" : "w-80"}`}>
      {/* Notification Popup */}
      {notification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-500">
          <div
            className={`bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border ${getNotificationStyle().borderColor
              }`}
          >
            {getNotificationStyle().icon}
            <p className="font-medium text-gray-800">{notification.message}</p>
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
}