import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers" // Import cookies
import "server-only" // Best practice for server-side utilities
import { prisma } from "./prisma"

const secret = process.env.JWT_SECRET

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not set")
}

const SECRET_KEY = new TextEncoder().encode(secret)

export async function signToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d") // token valid for 7 days
    .sign(SECRET_KEY)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload
  } catch (err) {
    console.error("Token verification failed:", err)
    return null
  }
}

export async function getCurrentUser() {
  // 1. Read the token from the cookie
  const token = (await cookies()).get("token")?.value

  if (!token) {
    return null
  }

  // 2. Verify the token using your existing function
  const payload = await verifyToken(token)
  if (!payload || typeof payload.userId !== "string") {
    return null
  }

  // 3. Use the userId from the token to fetch the user from the database
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        username: true,
        role: true,
        city: true,
        province: true,
      },
    })

    return user
  } catch (error) {
    console.error("Database query failed:", error)
    return null
  }
}