"use client"

import Navbar from "../../components/shared/Navbar"
import Footer from "../../components/shared/Footer"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar - Pass user role */}
      <Navbar userRole="jobseeker" />

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
          <p className="text-gray-600">Profile page content will be implemented here.</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
