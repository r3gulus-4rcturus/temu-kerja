# text_to_cv.py

import re
import os
import sys
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping

def ekstrak_informasi_dari_paragraf(teks):
    """Mengekstrak informasi dari satu paragraf naratif menggunakan regex."""
    info = {
        'nama': "Nama_Tidak_Ditemukan", 'telepon': "", 'email': "", 'lokasi': "",
        'ringkasan': "", 'keahlian': [], 'pengalaman_kerja': [], 'sertifikasi': []
    }
    
    nama_match = re.search(r"(?:nama saya adalah|nama saya|saya adalah|saya bernama)\s+([\w\s]+?)(?:\s+dengan|\s+umur|\.|\,|$)", teks, re.I)
    if nama_match and nama_match.group(1).strip():
        info['nama'] = nama_match.group(1).strip()
    
    info['telepon'] = (re.search(r"(\+62|08)[\d\s\-]{8,}", teks) or [""])[0].strip()
    info['email'] = (re.search(r"[\w\.\-]+@[\w\.\-]+", teks) or [""])[0].strip()
    info['lokasi'] = (re.search(r"(?:tinggal di|berdomisili di|lokasi di)\s+([\w\s,]+?)(?:\.|$)", teks, re.I) or [None, ""])[1].strip()
    keahlian_match = re.search(r"(?:keahlian saya meliputi|saya ahli dalam|saya menguasai)\s+(.*?)(?:\.|$|dan pengalaman)", teks, re.I)
    if keahlian_match:
        keahlian_str = keahlian_match.group(1).replace(" dan ", ", ")
        info['keahlian'] = [k.strip() for k in keahlian_str.split(',') if k.strip()]
    pengalaman_matches = re.findall(r"(?:bekerja sebagai|pengalaman saya sebagai)\s+([\w\s]+?)\s+di\s+([\w\s\.,]+?)(?:\.|$)", teks, re.I)
    for match in pengalaman_matches:
        info['pengalaman_kerja'].append({
            'jabatan': f"{match[0].strip()} - {match[1].strip()}",
            'deskripsi': "",
            'poin': []
        })
    sertifikasi_match = re.search(r"(?:memiliki sertifikasi|sertifikasi saya adalah)\s+(.*?)(?:\.|$)", teks, re.I)
    if sertifikasi_match:
        sertifikasi_str = sertifikasi_match.group(1).replace(" dan ", ", ")
        info['sertifikasi'] = [s.strip() for s in sertifikasi_str.split(',') if s.strip()]
    kalimat = re.split(r'(?<=[.!?])\s+', teks)
    if kalimat:
      info['ringkasan'] = kalimat[0]
    return info

def buat_cv_pdf(info):
    """Membuat PDF menggunakan font built-in Helvetica yang andal."""
    
    font_name = 'Helvetica'
    font_name_bold = 'Helvetica-Bold'

    safe_name = re.sub(r'[^\w\s-]', '', info.get('nama', 'cv')).strip().replace(' ', '_')
    nama_file_dasar = f"cv_{safe_name}.pdf"
    
    direktori_simpan = os.path.join('public', 'generated_cvs')
    if not os.path.exists(direktori_simpan):
        os.makedirs(direktori_simpan)
        
    path_file_lengkap = os.path.join(direktori_simpan, nama_file_dasar)
    
    c = canvas.Canvas(path_file_lengkap, pagesize=A4)
    width, height = A4
    margin_left, margin_right = 2 * cm, width - (2 * cm)
    y = height - (2 * cm)

    c.setFont(font_name_bold, 22)
    c.drawCentredString(width / 2, y, info['nama'])
    y -= 0.7 * cm

    c.setFont(font_name, 11)
    contact_info_str = f"{info['telepon']} | {info['email']} | {info['lokasi']}"
    c.drawCentredString(width / 2, y, contact_info_str)
    y -= 1.5 * cm
    
    styles = getSampleStyleSheet()
    style_body = styles['BodyText']
    style_body.fontName = font_name
    style_body.fontSize = 10
    style_body.leading = 14
    
    def draw_section(title, items, y_pos):
        c.setFont(font_name_bold, 14)
        c.drawString(margin_left, y_pos, title)
        y_pos -= 0.2 * cm
        c.line(margin_left, y_pos, margin_right, y_pos)
        y_pos -= 0.7 * cm
        c.setFont(font_name, 10)
        for item in items:
            c.drawString(margin_left + 0.5*cm, y_pos, f"•  {item}")
            y_pos -= 0.6 * cm
        return y_pos - 0.5 * cm
    
    if info.get('ringkasan'):
        p_ringkasan = Paragraph(info['ringkasan'], style_body)
        w, h = p_ringkasan.wrapOn(c, width - (4 * cm), y)
        p_ringkasan.drawOn(c, margin_left, y - h)
        y -= (h + 1.2 * cm)

    if info.get('keahlian'):
        y = draw_section('Keahlian:', info['keahlian'], y)
        
    if info.get('pengalaman_kerja'):
        c.setFont(font_name_bold, 14)
        c.drawString(margin_left, y, 'Pengalaman Kerja:')
        y -= 0.9 * cm
        for exp in info['pengalaman_kerja']:
            c.setFont(font_name_bold, 11)
            c.drawString(margin_left, y, exp['jabatan'])
            y -= 0.6 * cm
            for poin in exp.get('poin', []):
                c.drawString(margin_left + 0.5*cm, y, f"•  {poin}")
                y -= 0.6 * cm
            y -= 0.5 * cm

    if info.get('sertifikasi'):
        y = draw_section('Sertifikasi:', info['sertifikasi'], y)

    c.save()
    return path_file_lengkap

def main():
    try:
        if len(sys.argv) > 1:
            deskripsi_lengkap = sys.argv[1]
            informasi_cv = ekstrak_informasi_dari_paragraf(deskripsi_lengkap)
            path_lengkap_pdf = buat_cv_pdf(informasi_cv)
            print(path_lengkap_pdf)
        else:
            print("Error: Tidak ada teks input yang diberikan.", file=sys.stderr)
            sys.exit(1)
    except Exception as e:
        print(f"Python script error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()