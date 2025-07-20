import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { pusherServer } from "../../../../lib/pusher";

/**
 * Handles sending a new chat message.
 *
 * This endpoint receives a message payload, authenticates the user,
 * saves the message to the database, and then triggers a Pusher event
 * to notify other clients in the chat channel about the new message.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} A response indicating success or failure.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate the user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse the request body
    const { chatId, content } = await req.json();
    if (!chatId || !content) {
      return NextResponse.json(
        { error: "Missing chatId or content" },
        { status: 400 }
      );
    }

    // 3. Verify that the user is a participant of the chat
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participants: {
          some: {
            id: currentUser.id,
          }
        },
      },
    });

    if (!chat) {
      return NextResponse.json(
        { error: "Forbidden: You are not a member of this chat." },
        { status: 403 }
      );
    }

    // 4. Create the new message in the database
    const newMessage = await prisma.message.create({
      data: {
        content: content,
        chatId: chatId,
        senderId: currentUser.id,
      },
      include: {
        sender: { // Include sender details to broadcast with the message
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    // 5. Trigger a Pusher event to broadcast the new message
    // The channel name must match the one the client subscribes to.
    const channelName = `private-chat-${chatId}`;
    // The event name is what the client will be listening for.
    const eventName = "new-message";

    await pusherServer.trigger(channelName, eventName, newMessage);

    // 6. Return a success response
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Failed to send message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
