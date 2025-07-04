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

  const {
    username,
    password,
    role,
    personalInfo: { fullName, email, phoneNumber, address, province, city },
  } = body;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'Email is already in use.' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
      fullname: fullName,
      email,
      phonenumber: phoneNumber,
      address,
      province,
      city,
    },
  });

  // Generate JWT
  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(JWT_SECRET));

  // Set JWT in httpOnly cookie
  const response = NextResponse.json({
    message: 'Registration successful',
    role: user.role,
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
  });

  return response;
}
