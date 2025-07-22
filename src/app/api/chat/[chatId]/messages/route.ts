import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

/**
 * Fetches the message history for a specific chat.
 *
 * This endpoint retrieves all messages for a given chatId after verifying
 * that the current user is a participant in that chat.
 *
 * @param {NextRequest} req - The incoming request object.
 * @param {{ params: { chatId: string } }} context - The context containing dynamic route parameters.
 * @returns {NextResponse} A response containing the list of messages or an error.
 */
export async function GET(
  req: NextRequest,
  context: { params: { chatId: string } }
) {
  try {
    // 1. Authenticate the user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chatId } = context.params;
    if (!chatId) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    }

    // 2. Verify that the user is a participant of the chat
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participants: {
          some: {
            id: currentUser.id,
          },
        },
      },
    });

    if (!chat) {
      return NextResponse.json(
        { error: "Forbidden: You are not a member of this chat." },
        { status: 403 }
      );
    }

    // 3. Fetch all messages for the chat, including sender details
    const messages = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
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
        sentAt: "asc", // Order messages from oldest to newest
      },
    });

    // 4. Return the messages
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
