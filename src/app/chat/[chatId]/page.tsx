import { notFound } from "next/navigation";
import { getCurrentUser } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import ChatClientPage from "./ChatClientPage";

// ---
// Server-Side Data Fetching
// ---

async function getChatData(chatId: string, userId: string) {
  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      participants: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      participants: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      messages: {
        include: {
          sender: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          sentAt: "asc",
        },
      },
    },
  });

  return chat;
}

// ---
// Page Component
// ---

export default async function ChatIdPage({
  params,
}: {
  params: { chatId: string };
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    // This should be handled by middleware, but as a safeguard:
    notFound();
  }

  const chatData = await getChatData(params.chatId, currentUser.id);

  if (!chatData) {
    // If the chat doesn't exist or the user is not a participant
    notFound();
  }

  // Determine the other participant for the chat header
  const otherParticipant = chatData.participants.find(
    (p) => p.id !== currentUser.id
  );

  const selectedChatInfo = {
    id: chatData.id,
    name: otherParticipant?.username || "Chat",
    avatar: otherParticipant?.avatar || "/placeholder.svg",
    currentUserId: currentUser.id,
  };

  return (
    <ChatClientPage
      selectedChat={selectedChatInfo}
      initialMessages={chatData.messages}
    />
  );
}
