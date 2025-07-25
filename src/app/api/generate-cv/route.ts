// src/app/api/generate-cv/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';
import path from 'path';
import fs from 'fs'; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description } = body;

    if (!description) {
      return NextResponse.json({ error: 'Deskripsi tidak boleh kosong' }, { status: 400 });
    }

    const pythonScriptPath = path.resolve(process.cwd(), 'text_to_cv.py');
    
    const options = {
      mode: 'text' as const,
      pythonPath: 'python',
      pythonOptions: ['-u'], 
      scriptPath: path.dirname(pythonScriptPath),
      args: [description]
    };

    const results = await PythonShell.run(path.basename(pythonScriptPath), options);

    if (!results || results.length === 0) {
      throw new Error('Skrip Python tidak menghasilkan path file.');
    }
      
    const fileSystemPath = results[0].trim();

  
    if (!fs.existsSync(fileSystemPath) || fs.statSync(fileSystemPath).size === 0) {
        throw new Error(`Skrip Python gagal membuat file PDF yang valid.`);
    }

    const pdfBuffer = fs.readFileSync(fileSystemPath);
    const fileName = path.basename(fileSystemPath);

   
    fs.unlinkSync(fileSystemPath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error 
      ? `Gagal membuat CV: ${error.message}` 
      : 'Terjadi kesalahan internal saat membuat CV.';
      
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}