import PusherServer from "pusher";

// ---
// Pusher Server-Side Instance
// ---

// Validate that all necessary environment variables are set.
// This prevents the application from running with an incomplete configuration.
if (
  !process.env.PUSHER_APP_ID ||
  !process.env.PUSHER_KEY ||
  !process.env.PUSHER_SECRET ||
  !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
) {
  throw new Error("Pusher environment variables are not set correctly.");
}

/**
 * Singleton instance of the Pusher server client.
 *
 * This instance is configured using environment variables and is intended for use
 * in server-side logic (e.g., Next.js API routes) to trigger events.
 *
 * @property {string} appId - The application ID from your Pusher dashboard.
 * @property {string} key - The application key from your Pusher dashboard.
 * @property {string} secret - The application secret from your Pusher dashboard.
 * @property {string} cluster - The cluster your Pusher app is hosted on.
 * @property {boolean} useTLS - Enforces encrypted connections.
 */
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true, // Always use TLS for security
});
