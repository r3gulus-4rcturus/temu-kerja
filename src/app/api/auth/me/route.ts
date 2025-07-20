import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";

/**
 * Fetches the details of the currently authenticated user.
 *
 * This endpoint is a secure way for the client-side to retrieve user
 * information without exposing sensitive session details.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} A response containing the user object or an error.
 */
export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(currentUser);
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
