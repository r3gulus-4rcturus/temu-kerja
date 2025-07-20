import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "../../../../lib/pusher";
import { getCurrentUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

/**
 * Authenticates a user's subscription to a private Pusher channel.
 *
 * This endpoint is called by the pusher-js client when a user attempts to subscribe
 * to a channel with the 'private-' prefix. It verifies that the currently authenticated
 * user is a participant in the chat corresponding to the channel name.
 *
 * @param {NextRequest} req - The incoming request from the client.
 * @returns {NextResponse} A response containing the authentication signature if authorized,
 * or an error response if unauthorized.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Get the current user from the session/token
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse the form data sent by the pusher-js client
    const data = await req.formData();
    const socketId = data.get("socket_id") as string;
    const channel = data.get("channel_name") as string;

    // 3. Extract the chatId from the channel name (e.g., "private-chat-someId" -> "someId")
    const chatId = channel.replace("private-chat-", "");

    // 4. Verify that the user is a participant of the chat
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

    // 5. If the user is not a participant, deny access
    if (!chat) {
      return NextResponse.json(
        { error: "Forbidden: User is not a participant of this chat." },
        { status: 403 }
      );
    }

    // 6. If the user is a valid participant, authorize them
    // The `userData` will be available to other clients on the channel
    // via presence events, which is useful for "who's online" features.
    const userData = {
      user_id: currentUser.id,
      user_info: {
        username: currentUser.username,
      },
    };

    const authResponse = pusherServer.authorizeChannel(
      socketId,
      channel,
      userData
    );

    // 7. Return the authentication response to the client
    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Pusher auth error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
