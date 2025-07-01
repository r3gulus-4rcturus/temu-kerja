import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="relative w-full h-[1000px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-[url('/landing-page-background.png')] bg-cover bg-center bg-no-repeat"
        role="presentation"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="relative left-5 z-10 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center gap-2">
          <Image
            src="/temu-kerja-logo-white.png"
            alt="Temu Kerja Logo"
            width={40}
            height={60}
            className="object-contain h-20 w-20"
            priority
          />
          <span
            style={{
              color: "#cee9ff",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: "31.25px",
            }}
          >
            temu
          </span>{" "}
          <span
            style={{
              color: "#6ebfff",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: "31.25px",
            }}
          >
            kerja
          </span>
        </div>

        <div className="flex gap-10">
          <Link
            href="/login"
            className="px-9 py-4 rounded-lg font-medium transition-colors"
            style={{
              color: "#2F587A",
              background: "#EBF2F7",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="text-white px-9 py-4 rounded-lg font-medium transition-colors"
            style={{
              background: " #4581B2",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            Daftar
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="absolute right-15 top-15 z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        {/* Hashtag */}
        <div className="mb-4 lg:block text-white">
          <span
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 600,
              fontSize: "20.4px"
            }}
          >
            #AyoBekerja
          </span>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1
            className="text-left"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "65.41px",
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            Cari Kerja Jadi Lebih
            <br />
            Mudah dan Cepat
          </h1>

          <p
            className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontWeight: 600,
              fontSize: "20.4px",
            }}
          >
            menjembatani individu yang mencari penghasilan dengan orang-orang yang butuh bantuan. Mulai dari jasa bersih-bersih hingga proyek profesional—semuanya ada di sini.
          </p>

          <div className="pt-4">
            <Link
              href="/dashboard"
              className="px-9 py-4 rounded-lg font-medium transition-colors inline-block"
              style={{
                color: "#2F587A",
                background: "#EBF2F7",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
              }}
            >
              Coba Sekarang
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
