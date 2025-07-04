"use client"

import { MapPin, User, ChevronDown, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

interface NavbarProps {
  userRole?: "jobseeker" | "jobprovider"
  userName?: string
}

interface NavigationItem {
  href: string
  label: string
}

export default function Navbar({ userRole, userName }: NavbarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // =================================================================
  // Version 1: Navbar for Login and Register pages
  // =================================================================
  if (pathname === "/login" || pathname === "/register") {
    return (
      <header className="bg-white shadow-sm p-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-blue-600 text-xl font-semibold">temu kerja</span>
          </Link>
        </div>
      </header>
    )
  }

  // =================================================================
  // Version 2: Navbar for the Landing Page
  // =================================================================
  if (pathname === "/") {
    return null;  // navbar for the landing page is on the layout
  }

  // =================================================================
  // Version 3: Default Navbar for all other authenticated pages
  // =================================================================
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path)
  }

  const getNavigationItems = (): NavigationItem[] => {
    const baseItemsForJobProvider = [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/chat", label: "Chat" },
    ]
    const baseItemsForJobSeeker = [
      { href: "/seeker-dashboard", label: "Dashboard" },
      { href: "/chat", label: "Chat" },
    ]

    if (userRole === "jobseeker") {
      return [
        ...baseItemsForJobSeeker,
        { href: "/pelatihan-kerja", label: "Pelatihan Kerja" },
        { href: "/layanan-hukum", label: "Layanan Hukum" },
        { href: "/profile", label: "Profile" },
      ]
    }
    return [...baseItemsForJobProvider, { href: "/profile", label: "Profile" }]
  }

  const navigationItems = getNavigationItems()

  return (
    <nav className="shadow-sm border-b border-gray-200 py-4" style={{ background: "#EBF2F7" }}>
      <div className="w-full px-8 sm:px-12 lg:px-16">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-1 mb-2">
            <Image
              src="/temu-kerja-logo-gradient.svg"
              alt="Temu Kerja Logo"
              width={32}
              height={32}
              className="object-contain w-12 h-12"
              priority
              style={{ marginTop: "15px", marginRight: "-5px" }}
            />
            <span
              className="font-plusjakarta"
              style={{
                color: "#3A74A2",
                fontWeight: 700,
                fontSize: "31.25px",
              }}
            >
              temu
            </span>{" "}
            <span
              className="font-plusjakarta"
              style={{
                background: "linear-gradient(90deg,rgb(95, 146, 188) 0%, #4581B2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                fontWeight: 700,
                fontSize: "31.25px",
                display: "inline-block",
              }}
            >
              kerja
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 ml-16">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  `transition-colors font-urbanist font-bold flex items-center ` +
                  (isActive(item.href)
                    ? "text-[20px] text-[#3F75A1]"
                    : "text-[16px] text-[#1D364B] hover:text-[#3F75A1]")
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop User Info */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900 font-medium">{userName}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Open menu"
            type="button"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-gray-900 bg-gray-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <User className="w-5 h-5 text-gray-600" />
                <span className="ml-2 text-gray-900 font-medium">{userName}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}