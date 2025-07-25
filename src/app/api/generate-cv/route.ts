// src/app/api/generate-cv/route.ts

import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit'; // This will now work correctly
import { Buffer } from 'buffer';

// ... (streamToBuffer and ekstrakInformasi functions remain the same) ...
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

function ekstrakInformasi(teks: string) {
    const info = {
        nama: "Nama Tidak Ditemukan",
        telepon: "",
        email: "",
        lokasi: "",
        ringkasan: "",
        keahlian: [] as string[],
        pengalaman_kerja: [] as { jabatan: string }[],
        sertifikasi: [] as string[],
    };
    let match;
    match = teks.match(/(?:nama saya adalah|nama saya|saya adalah|saya bernama)\s+([\w\s]+?)(?:\s+dengan|\s+umur|\.|\,|$)/i);
    if (match && match[1]) info.nama = match[1].trim();
    match = teks.match(/(\+62|08)[\d\s\-]{8,}/);
    if (match) info.telepon = match[0].trim();
    match = teks.match(/[\w\.\-]+@[\w\.\-]+/);
    if (match) info.email = match[0].trim();
    match = teks.match(/(?:tinggal di|berdomisili di|lokasi di)\s+([\w\s,]+?)(?:\.|$)/i);
    if (match && match[1]) info.lokasi = match[1].trim();
    match = teks.match(/(?:keahlian saya meliputi|saya ahli dalam|saya menguasai)\s+(.*?)(?:\.|$|dan pengalaman)/i);
    if (match && match[1]) {
        info.keahlian = match[1].replace(/\s+dan\s+/g, ',').split(',').map(k => k.trim()).filter(Boolean);
    }
    const pengalamanRegex = /(?:bekerja sebagai|pengalaman saya sebagai)\s+([\w\s]+?)\s+di\s+([\w\s\.,]+?)(?:\.|$)/gi;
    while ((match = pengalamanRegex.exec(teks)) !== null) {
        info.pengalaman_kerja.push({ jabatan: `${match[1].trim()} - ${match[2].trim()}` });
    }
    match = teks.match(/(?:memiliki sertifikasi|sertifikasi saya adalah)\s+(.*?)(?:\.|$)/i);
    if (match && match[1]) {
        info.sertifikasi = match[1].replace(/\s+dan\s+/g, ',').split(',').map(s => s.trim()).filter(Boolean);
    }
    info.ringkasan = teks.split(/[.!?]/)[0] || "";
    return info;
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { description } = body;

        if (!description) {
            return NextResponse.json({ error: 'Deskripsi tidak boleh kosong' }, { status: 400 });
        }
        
        const info = ekstrakInformasi(description);

        // Create the PDF document as normal
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        const stream = doc as unknown as NodeJS.ReadableStream;

        // Use the built-in fonts directly
        doc.font('Helvetica-Bold').fontSize(22).text(info.nama, { align: 'center' });
        doc.moveDown(0.5);
        doc.font('Helvetica').fontSize(11).text(`${info.telepon} | ${info.email} | ${info.lokasi}`, { align: 'center' });
        doc.moveDown(1.5);

        // ... (rest of the PDF generation logic) ...
        if (info.ringkasan) {
            doc.font('Helvetica').fontSize(10).text(info.ringkasan, { align: 'left' });
            doc.moveDown(1.5);
        }
        const drawSection = (title: string, items: string[]) => {
            if (items.length === 0) return;
            doc.font('Helvetica-Bold').fontSize(14).text(title);
            doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
            doc.moveDown(0.5);
            items.forEach(item => {
                doc.font('Helvetica').fontSize(10).text(`• ${item}`, { indent: 20 });
            });
            doc.moveDown(1.5);
        };
        drawSection('Keahlian', info.keahlian);
        if (info.pengalaman_kerja.length > 0) {
             doc.font('Helvetica-Bold').fontSize(14).text('Pengalaman Kerja');
             doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
             doc.moveDown(0.5);
             info.pengalaman_kerja.forEach(exp => {
                 doc.font('Helvetica-Bold').fontSize(11).text(exp.jabatan);
                 doc.moveDown(0.5);
             });
             doc.moveDown(1);
        }
        drawSection('Sertifikasi', info.sertifikasi);


        doc.end();

        const pdfBuffer = await streamToBuffer(stream);
        const fileName = `cv_${info.nama.replace(/\s/g, '_').toLowerCase()}.pdf`;

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${fileName}"`,
            },
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Gagal membuat CV.' }, { status: 500 });
    }
}