"use client"

import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"
import FileUpload from "../../../components/register/FileUpload" // Ensure this path is correct

// Use the provided UploadedFile interface
interface UploadedFile {
  file: File
  preview: string | ArrayBuffer | null // Data URL for image preview or null
  name: string
  size: number
}

export default function UploadIdPage() {
  // Explicitly type uploadedFile state using the provided interface
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  // Type fileData according to the UploadedFile interface
  const handleFileSelect = (fileData: UploadedFile) => {
    setUploadedFile(fileData)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault()

    if (!uploadedFile) {
      alert("Please upload your ID card first")
      return
    }

    setIsLoading(true)

    // Simulate processing
    setTimeout(() => {
      console.log("ID upload step:", uploadedFile)
      // Store file data in localStorage for next step
      const existingData = JSON.parse(
        localStorage.getItem("registrationData") || "{}"
      )
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...existingData,
          idDocument: {
            name: uploadedFile.name,
            size: uploadedFile.size,
            uploaded: true,
          },
        })
      )
      // Redirect to profile picture step
      router.push("/register/upload-profile")
      setIsLoading(false)
    }, 1000)
  }

  const handleBack = () => {
    router.push("/register/personal-info")
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
          --text-sm-leading-5-font-medium-font-family: "Inter", sans-serif;
          --text-sm-leading-5-font-medium-font-size: 14px;
          --text-sm-leading-5-font-medium-line-height: 20px;
          --text-sm-leading-5-font-medium-font-weight: 500;
          --primary-colorspurple-heart: #45349f; /* Example color */
          --blue: #007bff; /* Example color */
        }
        .upload-id-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 2rem 1rem;
        }
      `}</style>
      <div className="upload-id-container">
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
            <div className="w-8 h-1 bg-[#4581b2] rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>

          <div className="inline-flex flex-col items-center justify-center gap-2.5 px-8 py-2.5 rounded-[15px] border-[1.5px] border-solid border-[#2f587a]">
            <form
              onSubmit={handleContinue}
              className="flex flex-col w-full max-w-2xl items-center gap-[59px] px-0 py-6"
            >
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
                Unggah KTP
              </h2>

              <div className="w-full max-w-[659px]">
                <FileUpload
                  label="Kartu Tanda Penduduk"
                  onFileSelect={handleFileSelect}
                  uploadedFile={uploadedFile}
                  onRemoveFile={handleRemoveFile}
                  acceptedTypes="image/*"
                  maxSize={5 * 1024 * 1024} // 5MB
                  placeholder="Unggah Dokumen Anda Di sini!"
                />
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
                  disabled={isLoading || !uploadedFile}
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
    </>
  )
}
