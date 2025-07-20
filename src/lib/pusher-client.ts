import PusherClient from "pusher-js";

// ---
// Pusher Client-Side Instance
// ---

// Validate that all necessary public environment variables are set.
if (!process.env.NEXT_PUBLIC_PUSHER_KEY || !process.env.NEXT_PUBLIC_PUSHER_CLUSTER) {
  throw new Error("Pusher client-side environment variables are not set correctly.");
}

/**
 * Singleton instance of the Pusher client.
 *
 * This instance is configured for the browser, using public keys. It handles
 * subscribing to channels and binding to events. The `authEndpoint` tells
 * pusher-js where to send its authentication request for private channels.
 */
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: "/api/pusher/auth", // Points to the auth route we created
    authTransport: "ajax",
  }
);
