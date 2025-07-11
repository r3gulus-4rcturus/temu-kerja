"use client"

import Link from "next/link"
import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// ---
// Interface for Form Data
// ---
interface FormData {
  username: string
  password: string
}

// ---
// LoginPage Component
// ---
export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null) // State for handling errors
  const router = useRouter()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrUsername: formData.username,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Login failed")
        setIsLoading(false)
        return
      }

      // Conditional redirect based on role
      if (data.role === "jobprovider") {
        window.location.href = "/dashboard" // hard navigation, force reload
      } else if (data.role === "jobseeker") {
        window.location.href = "/seeker-dashboard" // hard navigation, force reload
      } else {
        setError("Unrecognized role") // Handle unrecognized roles
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Something went wrong during login.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --colors-primary-100: #ebf2f7;
          --colors-primary-200: #bcd3e5;
          --colors-primary-300: #84aecf;
          --colors-primary-400: #558ebd;
          --colors-primary-500: #4581b2;
          --colors-primary-600: #3f75a1;
          --colors-primary-700: #2f587a;
          --colors-primary-800: #1d364b;
          --colors-neutral-100: #ffffff;
          --foreground-default: #09090b;
          --border-default: #e4e4e7;
          --background-default: #ffffff;
          --foreground-muted: #71717a;
          --theme-colordark: #464255;

          --heading-h3-font-family: "Plus Jakarta Sans", sans-serif;
          --heading-h3-font-size: 32px;
          --heading-h3-line-height: 120%;
          --heading-h3-font-weight: 700;

          --heading-h5-font-family: "Plus Jakarta Sans", sans-serif;
          --heading-h5-font-size: 20px;
          --heading-h5-line-height: 120%;
          --heading-h5-font-weight: 700;

          --sub-heading-s5-font-family: "Urbanist", sans-serif;
          --sub-heading-s5-font-size: 16px;
          --sub-heading-s5-line-height: 200%;
          --sub-heading-s5-font-weight: 600;

          --text-lg-medium-font-family: "Inter", sans-serif;
          --text-lg-medium-font-size: 18px;
          --text-lg-medium-line-height: 28px;
          --text-lg-medium-font-weight: 500;

          --text-lg-regular-font-family: "Inter", sans-serif;
          --text-lg-regular-font-size: 18px;
          --text-lg-regular-line-height: 28px;
          --text-lg-regular-font-weight: 400;
        }

        .login-page-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 1rem;
        }

        .login-form-wrapper {
          border-radius: 15px;
          border: 1.5px solid var(--colors-primary-700);
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 59px;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 654px;
          background-color: var(--colors-neutral-100);
        }

        .title-dashboard {
          display: flex;
          flex-direction: column;
          gap: 11px;
          align-items: flex-start;
          text-align: center;
          width: 100%;
        }

        .title-dashboard h1 {
          color: var(--theme-colordark);
          font-family: var(--heading-h3-font-family);
          font-size: var(--heading-h3-font-size);
          line-height: var(--heading-h3-line-height);
          font-weight: var(--heading-h3-font-weight);
          align-self: stretch;
        }

        .title-dashboard p {
          color: var(--colors-primary-700);
          font-family: var(--sub-heading-s5-font-family);
          font-size: var(--sub-heading-s5-font-size);
          line-height: var(--sub-heading-s5-line-height);
          font-weight: var(--sub-heading-s5-font-weight);
          margin: 0 auto;
        }

        .form-fields-container {
          display: flex;
          flex-direction: column;
          gap: 0;
          align-items: flex-end;
          width: 100%;
          max-width: 440px;
        }
        
        .input-group {
            width: 100%;
            margin-bottom: 1rem;
        }

        .input-group label {
          color: var(--foreground-default);
          font-family: var(--text-lg-medium-font-family);
          font-size: var(--text-lg-medium-font-size);
          line-height: var(--text-lg-medium-line-height);
          font-weight: var(--text-lg-medium-font-weight);
          margin-bottom: 4px;
          display: block;
        }

        .input-field {
          background: var(--background-default);
          border-radius: 6px;
          border: 1px solid var(--border-default);
          padding: 10px 12px;
          width: 100%;
          font-family: var(--text-lg-regular-font-family);
          font-size: var(--text-lg-regular-font-size);
          color: var(--foreground-muted);
        }
        
        .input-field:focus {
            outline: none;
            border-color: var(--colors-primary-500);
            box-shadow: 0 0 0 2px rgba(69, 129, 178, 0.5);
        }

        .login-button {
          background: var(--colors-primary-500);
          border-radius: 10px;
          border: 2px solid transparent;
          padding: 0 36px;
          height: 64px;
          color: white;
          font-family: var(--heading-h5-font-family);
          font-size: var(--heading-h5-font-size);
          line-height: var(--heading-h5-line-height);
          font-weight: var(--heading-h5-font-weight);
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
          margin-top: 1rem;
        }
        
        .login-button:hover {
            background-color: var(--colors-primary-600);
        }

        .login-button:disabled {
            background-color: var(--colors-primary-300);
            cursor: not-allowed;
        }

        .divider-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: center;
          width: 100%;
          max-width: 481px;
        }

        .divider {
          display: flex;
          flex-direction: row;
          gap: 20px;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .divider-line {
          border-top: 1px solid #000;
          flex: 1;
        }

        .divider-text {
          color: var(--colors-primary-700);
          font-family: var(--sub-heading-s5-font-family);
          font-size: var(--sub-heading-s5-font-size);
          line-height: var(--sub-heading-s5-line-height);
          font-weight: var(--sub-heading-s5-font-weight);
          white-space: nowrap;
        }

        .create-account-button {
          background: var(--colors-primary-100);
          border-radius: 10px;
          border: 2px solid var(--colors-primary-500);
          padding: 0 36px;
          height: 64px;
          color: var(--colors-primary-700);
          font-family: var(--heading-h5-font-family);
          font-size: var(--heading-h5-font-size);
          line-height: var(--heading-h5-line-height);
          font-weight: var(--heading-h5-font-weight);
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        
        .create-account-button:hover {
            background-color: var(--colors-primary-200);
        }
      `}</style>
      <div className="login-page-container">
        <div className="login-form-wrapper">
          <div className="title-dashboard">
            <h1>Log in</h1>
            <p>Masuk jika kamu telah memiliki akun!</p>
          </div>

          <form onSubmit={handleLogin} className="w-full max-w-[440px] flex flex-col items-center">
            <div className="form-fields-container">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center text-sm w-full mb-4">
                  <p>{error}</p>
                </div>
              )}
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  placeholder="Mukhlis"
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="*********"
                  className="input-field"
                  required
                />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="login-button">
              {isLoading ? "Masuk..." : "Masuk"}
            </button>
          </form>

          <div className="divider-container">
            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">Belum memiliki akun sebelumnya?</div>
              <div className="divider-line"></div>
            </div>
            <Link href="/register" className="create-account-button">
              Buat Akun
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
