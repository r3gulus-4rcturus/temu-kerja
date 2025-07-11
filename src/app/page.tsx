import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="relative w-full h-[1000px]">
      <header className="relative left-7 z-10 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center gap-2">
          <Image
            src="/temu-kerja-logo-white.png"
            alt="Temu Kerja Logo"
            width={40}
            height={60}
            className="object-contain h-15 w-15"
            style={{ marginTop: "15px", marginRight: "-5px" }}
            priority
          />
          <span
            className="font-plusjakarta"
            style={{
              color: "#cee9ff",
              fontWeight: 700,
              fontSize: "31.25px",
            }}
          >
            temu
          </span>{" "}
          <span
            className="font-plusjakarta"
            style={{
              color: "#6ebfff",
              fontWeight: 700,
              fontSize: "31.25px",
            }}
          >
            kerja
          </span>
        </div>

        <div className="flex gap-10">
          <Link
            href="/login"
            className="px-9 py-4 rounded-lg font-plusjakarta font-bold text-[20px] transition-colors bg-[#EBF2F7] hover:bg-[#6ebfff]"
            style={{
              color: "#2F587A",
            }}
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="text-white mr-14 px-9 py-4 rounded-lg font-plusjakarta font-bold text-[20px] transition-colors bg-[#4581B2] hover:bg-[#6ebfff]"
          >
            Daftar
          </Link>
        </div>
      </header>

      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-[url('/landing-page-background.png')] bg-cover bg-center bg-no-repeat"
        role="presentation"
        aria-hidden="true"
      />

      {/* Main Content */}
      <main className="absolute right-15 top-15 z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        {/* Hashtag */}
        <div className="mb-4 lg:block text-white">
          <span
            className="font-roboto font-semibold text-[20.4px]"
          >
            #AyoBekerja
          </span>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1
            className="text-left font-plusjakarta font-extrabold text-[65.41px]"
            style={{
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            Cari Kerja Jadi Lebih
            <br />
            Mudah dan Cepat
          </h1>

          <p
            className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-urbanist font-semibold text-[20.4px]"
          >
            menjembatani individu yang mencari penghasilan dengan orang-orang yang butuh bantuan. Mulai dari jasa bersih-bersih hingga proyek profesional—semuanya ada di sini.
          </p>

          <div className="pt-4">
            <Link
              href="/dashboard"
              className="px-9 py-4 rounded-lg font-plusjakarta font-bold text-[20px] transition-colors inline-block bg-[#EBF2F7] hover:bg-[#6ebfff]"
              style={{
                color: "#2F587A",
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