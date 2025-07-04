import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in .env');
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { emailOrUsername, password } = body;

  if (!emailOrUsername || !password) {
    return NextResponse.json(
      { error: 'Email/Username and password are required.' },
      { status: 400 }
    );
  }

  // Find user by email OR username
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: emailOrUsername },
        { username: emailOrUsername },
      ],
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'User not found.' },
      { status: 404 }
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json(
      { error: 'Incorrect password.' },
      { status: 401 }
    );
  }

  // Sign JWT token
  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(JWT_SECRET));

  // Set cookie
  const response = NextResponse.json({
    message: 'Login successful',
    role: user.role, // Send role to client
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
    sameSite: 'lax',
  });

  return response;
}
