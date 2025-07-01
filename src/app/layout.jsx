import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Temu Kerja - Cari Kerja Jadi Lebih Mudah dan Cepat",
  description:
    "Platform yang menghubungkan individu yang mencari penghasilan dengan orang-orang yang butuh bantuan. Mulai dari jasa bersih-bersih hingga proyek profesional.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
