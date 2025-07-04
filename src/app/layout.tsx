import {
  Barlow,
  Hind,
  Inter,
  Plus_Jakarta_Sans,
  Poppins,
  Public_Sans,
  Roboto,
  Source_Code_Pro,
  Ubuntu,
  Urbanist,
} from "next/font/google"
import "./globals.css"
import React from "react"

// --- Authentication Imports ---
import { getCurrentUser } from "../lib/auth"
import Navbar from "../components/shared/Navbar" // Adjust path if necessary

export const metadata = {
  title: "Temu Kerja - Cari Kerja Jadi Lebih Mudah dan Cepat",
  description:
    "Platform yang menghubungkan individu yang mencari penghasilan dengan orang-orang yang butuh bantuan. Mulai dari jasa bersih-bersih hingga proyek profesional.",
}

// --- Font Configs ---
const barlow = Barlow({ weight: ["500"], subsets: ["latin"], variable: "--font-barlow" })
const hind = Hind({ weight: ["400"], subsets: ["latin"], variable: "--font-hind" })
const inter = Inter({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-inter" })
const plusJakarta = Plus_Jakarta_Sans({ weight: ["700", "800"], subsets: ["latin"], variable: "--font-plus-jakarta" })
const poppins = Poppins({ weight: ["500"], subsets: ["latin"], variable: "--font-poppins" })
const publicSans = Public_Sans({ weight: ["400"], subsets: ["latin"], variable: "--font-public-sans" })
const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-roboto" })
const sourceCodePro = Source_Code_Pro({ weight: ["400"], subsets: ["latin"], variable: "--font-source-code-pro" })
const ubuntu = Ubuntu({ weight: ["700"], subsets: ["latin"], variable: "--font-ubuntu" })
const urbanist = Urbanist({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-urbanist" })

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Fetch user data on the server once per request
  const currentUser = await getCurrentUser()

  return (
    <html
      lang="id"
      className={`${barlow.variable} ${hind.variable} ${inter.variable} ${plusJakarta.variable} ${poppins.variable} ${publicSans.variable} ${roboto.variable} ${sourceCodePro.variable} ${ubuntu.variable} ${urbanist.variable}`}
    >
      <body>
        {/* The Navbar component receives user data directly as props */}
        <Navbar
          userRole={currentUser?.role as "jobseeker" | "jobprovider"}
          userName={currentUser?.username}
        />
        <main>{children}</main>
      </body>
    </html>
  )
}
