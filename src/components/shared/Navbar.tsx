"use client"

import { MapPin, User, ChevronDown, Menu, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
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
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [userMenuRef])

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        // Hard refresh to ensure all state is cleared
        window.location.href = '/login';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  // =================================================================
  // Version 1: Navbar for Login and Register pages
  // =================================================================
  if (pathname === "/login" || pathname === "/register" || pathname.startsWith('/login/') || pathname.startsWith('/register/')) {
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
          </div>
        </div>
      </nav>
    )
  }

  // =================================================================
  // Version 2: Navbar for the Landing Page
  // =================================================================
  if (pathname === "/") {
    return null;  // navbar for the landing page is on the landing page component
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

          {/* Desktop User Info & Dropdown */}
          <div className="hidden md:flex items-center ml-auto relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 font-medium">{userName}</span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isUserMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
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
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive(item.href)
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
              <div className="flex items-center px-5 mb-3">
                <User className="w-5 h-5 text-gray-600" />
                <span className="ml-2 text-gray-900 font-medium">{userName}</span>
              </div>
              <div className="px-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
