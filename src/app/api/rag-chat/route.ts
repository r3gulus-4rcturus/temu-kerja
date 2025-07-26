import { NextRequest, NextResponse } from 'next/server';
import { processQuery } from '../../../lib/rag-chatbot';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userQuery = body.query;

    if (!userQuery) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Panggil fungsi inti RAG dari lib
    const response = await processQuery(userQuery);

    return NextResponse.json(response);

  } catch (error: any) {
    console.error("Error di API route:", error);
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}