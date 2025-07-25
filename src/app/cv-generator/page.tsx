"use client"

import { useState, useRef, useEffect, JSX } from "react"
import { useRouter } from "next/navigation"
import { Mic, MicOff, Upload, Sparkles } from "lucide-react"

// --- Perbaikan: Definisi Tipe untuk Web Speech API ---
interface SpeechRecognitionEvent extends Event {
  // Properti yang hilang telah ditambahkan di sini
  resultIndex: number; 
  results: {
    isFinal: boolean;
    [key: number]: {
      transcript: string;
    };
  }[];
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}
// --- Akhir dari Perbaikan Definisi Tipe ---


interface FormData {
  description: string
  certificationFile: File | null
  workDocumentationFile: File | null
}
type FileUploadType = "certificationFile" | "workDocumentationFile"

export default function CVGeneratorPage(): JSX.Element {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
      description: "",
      certificationFile: null,
      workDocumentationFile: null,
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const recognitionRef = useRef<SpeechRecognition | null>(null)

    const handleSubmit = async (): Promise<void> => {
        if (!formData.description.trim()) {
            alert("Silakan deskripsikan pengalaman kerja Anda terlebih dahulu")
            return
        }

        setIsLoading(true);
        setShowPopup(true);

        try {
            const response = await fetch('/api/generate-cv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: formData.description }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Gagal membuat PDF.');
            }

            const disposition = response.headers.get('content-disposition');
            let fileName = 'cv-hasil-ai.pdf';
            if (disposition && disposition.indexOf('attachment') !== -1) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    fileName = matches[1].replace(/['"]/g, '');
                }
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();

            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);

            setTimeout(() => {
                router.push("/add-job/upload-cv");
            }, 3000);

        } catch (error) {
            console.error("Error generating CV:", error);
            alert(error instanceof Error ? error.message : 'Terjadi kesalahan.');
            setShowPopup(false);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleBack = (): void => {
      router.push("/add-job/upload-cv")
    }

    const toggleRecording = () => {
      if (isRecording) {
        recognitionRef.current?.stop();
      } else {
        startRecording();
      }
    };
  
    const startRecording = () => {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
        alert("Browser Anda tidak mendukung Speech Recognition API. Coba gunakan Google Chrome.");
        return;
      }
  
      recognitionRef.current = new SpeechRecognitionAPI();
      const recognition = recognitionRef.current;
  
      recognition.lang = 'id-ID';
      recognition.continuous = true;
      recognition.interimResults = true;
  
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
  
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        setFormData(prev => ({
          ...prev,
          description: prev.description + finalTranscript
        }));
      };
  
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };
  
      recognition.onend = () => {
        setIsRecording(false);
      };
  
      recognition.start();
      setIsRecording(true);
    };

    const handleFileUpload = (file: File, type: FileUploadType): void => {
      setFormData((prev) => ({
        ...prev,
        [type]: file,
      }))
    }
  
    const handleRemoveFile = (type: FileUploadType): void => {
      setFormData((prev) => ({
        ...prev,
        [type]: null,
      }))
    }
  
    const formatFileSize = (bytes?: number): string => {
      if (!bytes || bytes === 0) return "File uploaded"
      const k = 1024
      const sizes = ["Bytes", "KB", "MB", "GB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return (
        Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
      )
    }
  
    const handleTextareaChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
      setFormData((prev) => ({ ...prev, description: e.target.value }))
    }
  
    const handleFileInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      type: FileUploadType
    ): void => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileUpload(file, type)
      }
    }
  
    return (
      <div className="min-h-screen bg-gray-50 relative">
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-auto transform transition-all scale-100 opacity-100">
              <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-5 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                CV Sedang Dibuat!
              </h3>
              <p className="text-gray-600 text-lg">
                Download akan dimulai secara otomatis...
              </p>
            </div>
          </div>
        )}
  
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 rounded-lg"
          >
            Kembali
          </button>
  
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-500" />
              Buat CV Anda dengan AI!
              <Sparkles className="w-8 h-8 text-purple-500" />
            </h1>
            <p className="text-gray-600">
              Deskripsikan tentang pekerjaan dan pengalaman Anda dengan lengkap!
            </p>
          </div>
  
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <textarea
              value={formData.description}
              onChange={handleTextareaChange}
              placeholder="Deskripsikan tentang pekerjaan Anda dan pengalaman kerja Anda dengan detail!"
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
  
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={toggleRecording}
              className={`p-4 rounded-full transition-colors ${isRecording
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
            >
              {isRecording ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>
            <p className="text-blue-600 font-medium">
              {isRecording
                ? "Sedang merekam... Klik untuk berhenti"
                : "Klik mikrofon dan mulai berbicara untuk mendeskripsikan!"}
            </p>
          </div>
  
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Upload Dokumen Pendukung
            </h2>
  
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-blue-600 font-medium mb-4">
                  Unggah Sertifikasi (Jika ada)
                </h3>
  
                {!formData.certificationFile ? (
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        handleFileInputChange(e, "certificationFile")
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <p className="text-blue-600 font-medium">
                      Unggah Dokumen Anda Di sini!
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {formData.certificationFile.name}
                        </p>
                        <p className="text-xs text-green-600">
                          {formatFileSize(formData.certificationFile.size)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFile("certificationFile")}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                )}
              </div>
  
              <div>
                <h3 className="text-blue-600 font-medium mb-4">
                  Unggah Dokumentasi Hasil Pekerjaan (Jika ada)
                </h3>
  
                {!formData.workDocumentationFile ? (
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        handleFileInputChange(e, "workDocumentationFile")
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <p className="text-blue-600 font-medium">
                      Unggah Dokumen Anda Di sini!
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {formData.workDocumentationFile.name}
                        </p>
                        <p className="text-xs text-green-600">
                          {formatFileSize(formData.workDocumentationFile.size)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFile("workDocumentationFile")}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
  
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? 'Membuat CV...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    )
}