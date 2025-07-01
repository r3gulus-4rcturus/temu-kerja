import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/landing-page-background.png" alt="Landing Page Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
            <span style={{ color: "#cee9ff" }}>temu</span>{" "}
            <span style={{ color: "#6ebfff" }}>kerja</span>
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="bg-white/90 text-gray-700 hover:bg-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Daftar
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        {/* Hashtag */}
        <div className="absolute top-8 right-8 hidden lg:block">
          <span className="text-white/80 text-sm font-medium">#AyoBekerja</span>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Cari Kerja Jadi Lebih
            <br />
            Mudah dan Cepat
          </h1>

          <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            menghubungkan individu yang mencari penghasilan dengan orang-orang yang butuh bantuan. Mulai dari jasa
            bersih-bersih hingga proyek profesional—semuanya ada di sini.
          </p>

          <div className="pt-4">
            <Link
              href="/dashboard"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg transition-colors inline-block"
            >
              Coba Sekarang
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Curved Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1200 120" className="w-full h-20 lg:h-32" preserveAspectRatio="none">
          <path d="M0,120 C300,60 900,60 1200,120 L1200,120 L0,120 Z" fill="#4A90E2" />
        </svg>
      </div>
    </div>
  )
}
