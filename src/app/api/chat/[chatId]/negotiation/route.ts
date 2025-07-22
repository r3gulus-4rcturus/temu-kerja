import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

/**
 * Fetches or creates a negotiation chat for a given chat ID.
 *
 * If a negotiation chat already exists, it's returned along with its messages.
 * If not, a new negotiation chat is created with the participants from the parent chat,
 * and then the new chat is returned.
 *
 * @param {NextRequest} req - The incoming request object.
 * @param {{ params: { chatId: string } }} context - Contains the dynamic chatId from the URL.
 * @returns {NextResponse} The negotiation chat data or an error response.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chatId } = params;

    // Verify the user is part of the parent chat
    const parentChat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        participants: { some: { id: currentUser.id } },
      },
      include: {
        participants: true,
        job: true,
      },
    });

    if (!parentChat) {
      return NextResponse.json({ error: "Chat not found or access denied" }, { status: 404 });
    }

    // Find the existing negotiation chat
    let negotiationChat = await prisma.negotiationChat.findUnique({
      where: { chatId },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          include: { sender: true },
        },
      },
    });

    // If no negotiation chat exists, create one
    if (!negotiationChat) {
      negotiationChat = await prisma.negotiationChat.create({
        data: {
          chatId: chatId,
          participants: {
            connect: parentChat.participants.map((p) => ({ id: p.id })),
          },
        },
        include: {
          messages: {
            orderBy: { createdAt: "desc" },
            include: { sender: true },
          }
        },
      });
    }

    // Combine negotiation data with static job data for the panel
    const responsePayload = {
      ...negotiationChat,
      jobDetails: {
        location: parentChat.job.location,
        dateTime: parentChat.job.dateTime,
      },
    };

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error("Failed to get or create negotiation chat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}