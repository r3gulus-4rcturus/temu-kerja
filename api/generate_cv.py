# File: api/generate_cv.py

from flask import Flask, request, send_file
from flask_cors import CORS
import io
import re
import traceback
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import cm

app = Flask(__name__)
# Mengizinkan koneksi dari mana saja (aman untuk development)
CORS(app)

def ekstrak_informasi(teks):
    # ... (Fungsi ini tidak perlu diubah, biarkan seperti adanya)
    info = {
        'nama': "Tidak disebutkan", 'telepon': "", 'email': "", 'lokasi': "",
        'ringkasan': "", 'keahlian': [], 'pengalaman_kerja': [], 'sertifikasi': []
    }
    
    try:
        header_block, body = teks.split('\n\n', 1)
        header_lines = header_block.split('\n')
        info['nama'] = header_lines[0].strip()
        
        if len(header_lines) > 1:
            contact_line = header_lines[1]
            info['telepon'] = (re.search(r"(\+62|08)[\d\s\-]+", contact_line) or [""])[0].strip()
            info['email'] = (re.search(r"[\w\.\-]+@[\w\.\-]+", contact_line) or [""])[0].strip()
            info['lokasi'] = (re.search(r"\|\s*([^|]+)$", contact_line) or [""])[0].strip()

    except ValueError:
        body = teks
        info['nama'] = body.split('\n')[0].strip()

    body_parts = body.split('\n\n')
    if not re.match(r"Keahlian:|Pengalaman Kerja:|Sertifikasi:", body_parts[0], re.I):
        info['ringkasan'] = body_parts.pop(0).strip()

    body_remaining = "\n\n".join(body_parts)

    keahlian_match = re.search(r"Keahlian:\n(.*?)(?=\n\n\w+|$)", body_remaining, re.S | re.I)
    if keahlian_match:
        info['keahlian'] = [k.strip() for k in re.findall(r"[\-•]\s*(.*)", keahlian_match.group(1))]

    pengalaman_match = re.search(r"Pengalaman Kerja:\n(.*?)(?=\n\nSertifikasi:|$)", body_remaining, re.S | re.I)
    if pengalaman_match:
        jobs = pengalaman_match.group(1).strip().split('\n\n')
        for job_str in jobs:
            job_lines = job_str.split('\n')
            jabatan = job_lines.pop(0).strip().replace("Jabatan: ", "")
            deskripsi = job_lines.pop(0).strip().replace("Deskripsi: ", "") if job_lines and not job_lines[0].strip().startswith('•') else ""
            poin = [line.strip().replace('• ', '').replace('- ', '') for line in job_lines]
            info['pengalaman_kerja'].append({'jabatan': jabatan, 'deskripsi': deskripsi, 'poin': poin})

    sertifikasi_match = re.search(r"Sertifikasi:\n(.*?)(?=\n\n|$)", body_remaining, re.S | re.I)
    if sertifikasi_match:
        info['sertifikasi'] = [s.strip() for s in re.findall(r"[\-•]\s*(.*)", sertifikasi_match.group(1))]

    return info

def buat_cv_pdf_to_stream(info):
    # ... (Fungsi ini tidak perlu diubah, biarkan seperti adanya)
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4
    margin_left, margin_right = 2 * cm, width - (2 * cm)
    y = height - (2 * cm)

    # Menampilkan Nama di tengah
    c.setFont('Helvetica-Bold', 22)
    c.drawCentredString(width / 2, y, info['nama'])
    y -= 0.7 * cm
    
    # Menampilkan info kontak di bawah nama
    c.setFont('Helvetica', 11)
    contact_info_str = f"{info['telepon']} | {info['email']} | {info['lokasi']}"
    c.drawCentredString(width / 2, y, contact_info_str)
    y -= 1.5 * cm
    
    styles = getSampleStyleSheet()
    style_body = styles['BodyText']
    style_body.fontName, style_body.fontSize, style_body.leading = 'Helvetica', 10, 14
    
    def draw_section(title, items, y_pos):
        c.setFont('Helvetica-Bold', 14)
        c.drawString(margin_left, y_pos, title)
        y_pos -= 0.2 * cm
        c.line(margin_left, y_pos, margin_right, y_pos)
        y_pos -= 0.7 * cm
        c.setFont('Helvetica', 10)
        for item in items:
            c.drawString(margin_left + 0.5*cm, y_pos, f"•  {item}")
            y_pos -= 0.6 * cm
        return y_pos - 0.5 * cm
    
    if info['ringkasan']:
        p_ringkasan = Paragraph(info['ringkasan'], style_body)
        w, h = p_ringkasan.wrapOn(c, width - (4 * cm), y)
        p_ringkasan.drawOn(c, margin_left, y - h)
        y -= (h + 1.2 * cm)

    if info['keahlian']:
        y = draw_section('Keahlian:', info['keahlian'], y)
        
    if info['pengalaman_kerja']:
        c.setFont('Helvetica-Bold', 14)
        c.drawString(margin_left, y, 'Pengalaman Kerja:')
        y -= 0.9 * cm
        for exp in info['pengalaman_kerja']:
            c.setFont('Helvetica-Bold', 11)
            c.drawString(margin_left, y, exp['jabatan'])
            y -= 0.6 * cm
            
            c.setFont('Helvetica', 10)
            if exp['deskripsi']:
                p_desc = Paragraph(exp['deskripsi'], style_body)
                w, h = p_desc.wrapOn(c, width - (2*margin_left), y)
                p_desc.drawOn(c, margin_left, y - h)
                y -= (h + 0.2*cm)
                
            for poin in exp['poin']:
                c.drawString(margin_left + 0.5*cm, y, f"•  {poin}")
                y -= 0.6 * cm
            y -= 0.5 * cm

    if info['sertifikasi']:
        y = draw_section('Sertifikasi:', info['sertifikasi'], y)

    c.save()
    buffer.seek(0)
    return buffer


@app.route('/api/generate_cv', methods=['POST'])
def handle_generate_cv():
    try:
        data = request.get_json()
        text_input = data.get('text')
        if not text_input:
            return "Teks tidak boleh kosong", 400
        informasi_cv = ekstrak_informasi(text_input)
        pdf_buffer = buat_cv_pdf_to_stream(informasi_cv)
        return send_file(pdf_buffer, mimetype='application/pdf')
    except Exception:
        traceback.print_exc()
        return "Terjadi error di server", 500