"use client"

import { MapPin, User, ChevronDown, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Navbar({ userRole = "jobseeker" }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path)
  }

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/chat", label: "Chat" },
    ]

    if (userRole === "jobseeker") {
      return [
        ...baseItems,
        { href: "/pelatihan-kerja", label: "Pelatihan Kerja" },
        { href: "/layanan-hukum", label: "Layanan Hukum" },
        { href: "/profile", label: "Profile" },
      ]
    }

    // Provider role (default)
    return [...baseItems, { href: "/profile", label: "Profile" }]
  }

  const navigationItems = getNavigationItems()
  const userName = userRole === "jobseeker" ? "Mukhlis" : "Kurniawan"

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-blue-600 text-xl font-semibold">temu kerja</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium py-4 px-2 transition-colors ${
                  isActive(item.href) ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop User Info */}
          <div className="hidden md:flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900 font-medium">{userName}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
