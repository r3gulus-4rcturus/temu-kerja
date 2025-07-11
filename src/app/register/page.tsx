"use client"

import Link from "next/link"
import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"

// ---
// Interface for Form Data
// ---
interface FormData {
  username: string
  password: string
  confirmPassword: string
}

// ---
// RegisterPage Component
// ---
export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!")
      setIsLoading(false)
      return
    }

    // Simulate registration process
    setTimeout(() => {
      console.log("Registration step 1:", formData)
      // Store form data in localStorage for next step
      localStorage.setItem("registrationData", JSON.stringify(formData))
      // Redirect to role selection
      router.push("/register/role")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --colors-primary-100: #ebf2f7;
          --colors-primary-200: #bcd3e5;
          --colors-primary-500: #4581b2;
          --colors-primary-700: #2f587a;
          --theme-colordark: #464255;
          --foreground-default: #09090b;
          --border-default: #e4e4e7;
          --background-default: #ffffff;
          --foreground-muted: #71717a;

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
        .register-page-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 2rem 1rem;
        }
        .input-field {
          background: var(--background-default);
          border-radius: 6px;
          border: 1px solid var(--border-default);
          padding: 12px;
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
      `}</style>
      <div className="register-page-container">
        <div className="flex flex-col w-full max-w-[654px] items-center gap-6">
          <div className="inline-flex flex-col items-center gap-[11px]">
            <h1
              className="mt-[-1.00px] text-center"
              style={{
                fontFamily: "var(--heading-h3-font-family)",
                fontWeight: "var(--heading-h3-font-weight)",
                fontSize: "var(--heading-h3-font-size)",
                color: "var(--theme-colordark)",
                lineHeight: "var(--heading-h3-line-height)",
              }}
            >
              Daftar Akun
            </h1>
            <p
              className="w-fit whitespace-nowrap"
              style={{
                fontFamily: "var(--sub-heading-s5-font-family)",
                fontWeight: "var(--sub-heading-s5-font-weight)",
                fontSize: "var(--sub-heading-s5-font-size)",
                color: "var(--colors-primary-700)",
                lineHeight: "var(--sub-heading-s5-line-height)",
              }}
            >
              Buat akun baru, lengkapi informasi dirimu!
            </p>
          </div>

          <div className="flex w-full min-h-[667px] items-start gap-2.5 p-2.5 rounded-[15px] border-[1.5px] border-solid border-[#2f587a]">
            <div className="flex flex-col items-center justify-center gap-[59px] flex-1 self-stretch">
              <form
                onSubmit={handleRegister}
                className="flex flex-col w-full max-w-[440px] items-end"
              >
                <div className="flex flex-col items-start self-stretch w-full">
                  <div className="self-stretch w-full mb-4">
                    <label
                      htmlFor="username"
                      className="block mb-1"
                      style={{
                        fontFamily: "var(--text-lg-medium-font-family)",
                        fontSize: "var(--text-lg-medium-font-size)",
                        fontWeight: "var(--text-lg-medium-font-weight)",
                        color: "var(--foreground-default)",
                      }}
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      placeholder="Mukhlis"
                      required
                      className="input-field"
                    />
                  </div>

                  <div className="self-stretch w-full mb-4">
                    <label
                      htmlFor="password"
                      className="block mb-1"
                      style={{
                        fontFamily: "var(--text-lg-medium-font-family)",
                        fontSize: "var(--text-lg-medium-font-size)",
                        fontWeight: "var(--text-lg-medium-font-weight)",
                        color: "var(--foreground-default)",
                      }}
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="**********"
                      required
                      className="input-field"
                    />
                  </div>

                  <div className="self-stretch w-full mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-1"
                      style={{
                        fontFamily: "var(--text-lg-medium-font-family)",
                        fontSize: "var(--text-lg-medium-font-size)",
                        fontWeight: "var(--text-lg-medium-font-weight)",
                        color: "var(--foreground-default)",
                      }}
                    >
                      Konfirmasi Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="**********"
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="self-stretch flex w-full h-[64px] items-center justify-center bg-[#4581b2] rounded-[10px] text-white hover:bg-[#3f75a1] transition-colors disabled:opacity-50"
                  style={{
                    fontFamily: "var(--heading-h5-font-family)",
                    fontSize: "var(--heading-h5-font-size)",
                    fontWeight: "var(--heading-h5-font-weight)",
                  }}
                >
                  {isLoading ? "Lanjut..." : "Lanjut"}
                </button>
              </form>

              <div className="flex flex-col w-full max-w-[481px] items-center gap-6">
                <div className="flex items-center justify-center gap-5 self-stretch w-full">
                  <div className="w-[98px] h-px bg-black" />
                  <div
                    className="w-fit whitespace-nowrap"
                    style={{
                      fontFamily: "var(--sub-heading-s5-font-family)",
                      fontWeight: "var(--sub-heading-s5-font-weight)",
                      fontSize: "var(--sub-heading-s5-font-size)",
                      color: "var(--colors-primary-700)",
                      lineHeight: "var(--sub-heading-s5-line-height)",
                    }}
                  >
                    Sudah memiliki akun sebelumnya?
                  </div>
                  <div className="w-[98px] h-px bg-black" />
                </div>

                <Link
                  href="/login"
                  className="flex w-full h-[64px] items-center justify-center bg-[#ebf2f7] rounded-[10px] border-2 border-solid border-[#4581b2] hover:bg-[#dbe6f0] transition-colors"
                  style={{
                    fontFamily: "var(--heading-h5-font-family)",
                    fontSize: "var(--heading-h5-font-size)",
                    fontWeight: "var(--heading-h5-font-weight)",
                    color: "var(--colors-primary-700)",
                    textDecoration: "none",
                  }}
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
