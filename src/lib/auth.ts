import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET environment variable is not set');
}

const SECRET_KEY = new TextEncoder().encode(secret);

export async function signToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d') // token valid for 7 days
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}
