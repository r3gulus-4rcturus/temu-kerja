import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { pusherServer } from "../../../../lib/pusher";

/**
 * Creates and broadcasts a new negotiation message.
 *
 * @param {NextRequest} req - The incoming request.
 * @returns {NextResponse} The newly created message or an error.
 */
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      negotiationChatId,
      negotiationPrice,
      workHoursDuration,
      workDaysDuration,
    } = await req.json();

    if (!negotiationChatId || negotiationPrice == null || workHoursDuration == null || workDaysDuration == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify user is a participant of the negotiation chat
    const negotiationChat = await prisma.negotiationChat.findFirst({
      where: {
        id: negotiationChatId,
        participants: {
          some: {
            id: currentUser.id
          }
        }
      }
    });

    if (!negotiationChat) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const newMessage = await prisma.negotiationMessage.create({
      data: {
        negotiationChatId,
        senderId: currentUser.id,
        negotiationPrice: parseInt(negotiationPrice, 10),
        workHoursDuration: parseInt(workHoursDuration, 10),
        workDaysDuration: parseInt(workDaysDuration, 10),
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    // Trigger Pusher event
    const channelName = `private-negotiation-${negotiationChatId}`;
    await pusherServer.trigger(channelName, "new-offer", newMessage);

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Failed to send negotiation message:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
