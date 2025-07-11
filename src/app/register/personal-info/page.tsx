"use client"

import { useRouter } from "next/navigation"
import { useState, ChangeEvent, FormEvent } from "react"

type PersonalInfo = {
  fullName: string
  email: string
  phoneNumber: string
  address: string
  province: string
  city: string
}

export default function PersonalInfoPage() {
  const [formData, setFormData] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    province: "",
    city: "",
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      console.log("Personal info step:", formData)
      const existingData = JSON.parse(
        localStorage.getItem("registrationData") || "{}"
      )
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...existingData,
          personalInfo: formData,
        })
      )
      router.push("/register/upload-id")
      setIsLoading(false)
    }, 1000)
  }

  const handleBack = () => {
    router.push("/register/role")
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --colors-primary-100: #ebf2f7;
          --colors-primary-500: #4581b2;
          --colors-primary-700: #2f587a;
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
          --text-base-regular-font-family: "Inter", sans-serif;
          --text-base-regular-font-size: 16px;
          --text-base-regular-line-height: 24px;
          --text-base-regular-font-weight: 400;
        }
        .personal-info-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 2rem 1rem;
        }
        .input-field {
          background: white;
          border-radius: 6px;
          border: 1px solid #e4e4e7;
          padding: 10px 12px;
          width: 100%;
          font-family: var(--text-lg-regular-font-family);
          font-size: var(--text-lg-regular-font-size);
          color: #71717a;
        }
        .input-field:focus {
          outline: none;
          border-color: var(--colors-primary-500);
          box-shadow: 0 0 0 2px rgba(69, 129, 178, 0.5);
        }
        .label-style {
            font-family: var(--text-lg-medium-font-family);
            font-size: var(--text-lg-medium-font-size);
            font-weight: var(--text-lg-medium-font-weight);
            color: #09090b;
            margin-bottom: 4px;
            display: block;
        }
      `}</style>
      <div className="personal-info-container">
        <div className="inline-flex flex-col items-center gap-6">
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

          <div className="flex justify-center gap-2 mb-2">
            <div className="w-8 h-1 bg-[#4581b2] rounded-full"></div>
            <div className="w-8 h-1 bg-[#4581b2] rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>

          <div className="flex flex-col w-full max-w-3xl items-center justify-center gap-2.5 p-6 rounded-[15px] border-[1.5px] border-solid border-[#2f587a]">
            <div className="flex flex-col w-full items-center gap-[59px] px-0 py-6">
              <h2
                className="self-stretch mt-[-1.00px] text-center"
                style={{
                  fontFamily: "var(--heading-h3-font-family)",
                  fontWeight: "var(--heading-h3-font-weight)",
                  fontSize: "var(--heading-h3-font-size)",
                  color: "var(--theme-colordark)",
                  lineHeight: "var(--heading-h3-line-height)",
                }}
              >
                Lengkapi Data Dirimu!
              </h2>

              <form onSubmit={handleContinue} className="w-full">
                <div className="flex flex-col items-start w-full">
                  <div className="w-full mb-4">
                    <label htmlFor="fullName" className="label-style">
                      Nama Lengkap
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="John Doe"
                      required
                      className="input-field"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 w-full mb-4">
                    <div>
                      <label htmlFor="email" className="label-style">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="johndoe@gmail.com"
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="label-style">
                        Nomor Telepon
                      </label>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-3 h-[48px] text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                          +62
                        </span>
                        <input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          placeholder="812345678"
                          required
                          className="input-field rounded-l-none h-[48px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full mb-4">
                    <label htmlFor="address" className="label-style">
                      Alamat Lengkap
                    </label>
                    <textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      rows={4}
                      placeholder="Tulis alamat lengkap anda ..."
                      required
                      className="input-field resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 w-full mb-6">
                    <div>
                      <label htmlFor="province" className="label-style">
                        Provinsi
                      </label>
                      <input
                        id="province"
                        type="text"
                        value={formData.province}
                        onChange={(e) => handleInputChange("province", e.target.value)}
                        placeholder="Jawa Barat"
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="label-style">
                        Kota
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Depok"
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="h-16 px-9 bg-[#ebf2f7] rounded-[10px] text-[#4581b2] border-2 border-transparent hover:border-[#4581b2] transition-colors"
                    style={{
                      fontFamily: "var(--heading-h5-font-family)",
                      fontWeight: "var(--heading-h5-font-weight)",
                      fontSize: "var(--heading-h5-font-size)",
                    }}
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-16 px-9 bg-[#4581b2] rounded-[10px] text-white hover:bg-[#3f75a1] transition-colors disabled:opacity-50"
                    style={{
                      fontFamily: "var(--heading-h5-font-family)",
                      fontWeight: "var(--heading-h5-font-weight)",
                      fontSize: "var(--heading-h5-font-size)",
                    }}
                  >
                    {isLoading ? "Lanjut..." : "Lanjut"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
