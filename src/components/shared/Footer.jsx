import { MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer({ userRole = "jobseeker" }) {
  // Navigation links based on user role
  const getNavigationLinks = () => {
    if (userRole === "jobseeker") {
      return [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/chat", label: "Chat" },
        { href: "/pelatihan-kerja", label: "Pelatihan Kerja" },
        { href: "/layanan-hukum", label: "Layanan Hukum" },
        { href: "/profile", label: "Profile" },
      ]
    }

    // Provider role (default)
    return [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/chat", label: "Chat" },
      { href: "/profile", label: "Profile" },
    ]
  }

  const navigationLinks = getNavigationLinks()

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          {/* Logo and Copyright */}
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-white text-xl font-semibold">
                temu <span className="text-blue-400">kerja</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">© 2025</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-4 sm:gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-blue-400 transition-colors font-medium text-sm sm:text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
