import { NextResponse } from 'next/server';
import { createUser } from '../../../lib/users';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const user = await createUser(body);
    return NextResponse.json({ id: user.id, email: user.email });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
