import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

/**
 * Fetches all chat conversations for the currently authenticated user.
 *
 * For each chat, it determines the other participant and retrieves their details
 * along with the last message sent in the conversation.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} A response containing the list of chats or an error.
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Get the current authenticated user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Find all chats where the current user is a participant
    const chats = await prisma.chat.findMany({
      where: {
        participants: {
          some: {
            id: currentUser.id,
          },
        },
      },
      include: {
        // Include participants to identify the other user
        participants: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        // Include the last message to display in the sidebar
        messages: {
          orderBy: {
            sentAt: "desc",
          },
          take: 1,
        },
      },
    });

    // 3. Format the chat data for the client
    const formattedChats = chats.map((chat) => {
      // Find the other participant in the chat
      const otherParticipant = chat.participants.find(
        (p) => p.id !== currentUser.id
      );
      const lastMessage = chat.messages[0];

      return {
        id: chat.id,
        name: otherParticipant?.username || "Unknown User",
        avatar: otherParticipant?.avatar || "/placeholder.svg",
        lastMessage: lastMessage?.content || "No messages yet",
        time: lastMessage
          ? new Date(lastMessage.sentAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
      };
    });

    return NextResponse.json(formattedChats);
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
