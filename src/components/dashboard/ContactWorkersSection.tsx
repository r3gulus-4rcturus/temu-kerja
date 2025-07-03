// ContactWorkersSection.tsx
import { JSX } from "react";

export default function ContactWorkersSection(): JSX.Element {
  return (
    <div className="relative w-full max-w-screen-xl">
      {/* Background illustration */}
      <div className="absolute right-0 top-0 w-[506px] h-[476px] opacity-20">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dee5f658d4580300ea80bd89cc52a07bf913e25c?width=1013"
          alt="Background illustration"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col items-start gap-10 w-full max-w-screen-xl h-auto pt-16">
        {/* Header */}
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-center gap-1 w-full">
            <h1
              className="text-4xl font-bold leading-[120%] bg-gradient-to-r from-[#1D364B] via-[#5B7E9B] to-[#3F75A1] bg-clip-text text-transparent"
              style={{
                textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
                fontFamily:
                  "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Hubungi Pekerja yang Anda Inginkan!
            </h1>
          </div>
          <p
            className="text-[#2F587A] text-xl font-semibold leading-[200%]"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Pilih pekerja pada Daftar Pelamar atau Daftar Favorit.
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 w-full relative">
          {/* Tab Navigation */}
          <div className="flex justify-center items-center w-full rounded-lg border border-[#D9D9D9] bg-white relative">
            {/* Selected Tab - Daftar Pelamar */}
            <div className="flex h-11 flex-col justify-center items-center flex-1 relative">
              <div className="absolute top-0 left-0 w-full h-1 rounded-full bg-gradient-to-r from-[#386DB1] to-[#BDD6F6]"></div>
              <div className="flex h-11 justify-center items-center gap-1.5 w-full">
                <div
                  className="text-[#3F75A1] text-base font-bold leading-[120%]"
                  style={{
                    fontFamily:
                      "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Daftar Pelamar
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#F4F4F4] to-transparent opacity-40"></div>
                <div className="absolute inset-0 bg-[#386DB1] opacity-40"></div>
              </div>
            </div>

            {/* Unselected Tab - Daftar Favorit */}
            <div className="flex h-11 py-2.5 px-6 justify-center items-center gap-1.5 flex-1 rounded-lg">
              <div
                className="text-[#1D364B] text-base font-bold leading-[120%]"
                style={{
                  fontFamily:
                    "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Daftar Favorit Anda
              </div>
            </div>
          </div>

          {/* Worker Cards */}
          <div className="flex flex-col gap-6 w-full">
            {/* Worker Card 1 */}
            <div className="flex h-47 items-start w-full rounded-xl bg-white shadow-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c46ad341b6e8fbc8357c6a7bda42c4f8be09e81?width=282"
                alt="Arfan Khoirul"
                className="w-35 h-47 object-cover rounded-l-xl"
              />
              <div className="flex w-full h-47 py-4 px-6 justify-between items-center">
                <div className="flex flex-col items-start gap-3">
                  <div className="flex flex-col items-start gap-0">
                    <div
                      className="text-[#4581B2] text-xl font-semibold leading-[200%]"
                      style={{
                        fontFamily:
                          "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                      }}
                    >
                      Arfan Khoirul
                    </div>
                    <div className="flex flex-col items-start gap-0">
                      <div
                        className="text-[#2F587A] text-2xl font-semibold leading-[200%]"
                        style={{
                          fontFamily:
                            "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        Lokasi: Jl. Kukusan Barat, Depok Raya
                      </div>
                    </div>
                  </div>
                  <div className="flex w-66 items-start gap-3">
                    <div
                      className="text-[#1D364B] text-xl font-semibold leading-[200%]"
                      style={{
                        fontFamily:
                          "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                      }}
                    >
                      Tag :
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex py-2 px-2 justify-center items-end gap-2.5 rounded-full border border-[#EBF2F7] bg-[#EBF2F7]">
                        <div
                          className="text-[#1D364B] text-base font-semibold leading-[200%]"
                          style={{
                            fontFamily:
                              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                          }}
                        >
                          Tukang Kebun
                        </div>
                      </div>
                      <div className="flex py-2 px-2 justify-center items-end gap-2.5 rounded-full border border-[#EBF2F7] bg-[#EBF2F7]">
                        <div
                          className="text-[#1D364B] text-base font-semibold leading-[200%]"
                          style={{
                            fontFamily:
                              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                          }}
                        >
                          Perawatan Tanaman Hias
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <div className="flex w-42 items-center gap-8">
                  <div
                    className="text-[#4581B2] text-xl font-semibold"
                    style={{
                      fontFamily:
                        "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Hubungi
                  </div>
                  <div className="w-13 h-13 bg-[#3F75A1] rounded-full flex items-center justify-center">
                    <svg
                      width="27"
                      height="24"
                      viewBox="0 0 27 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.334 2C6.003 2 0 7.33374 0 14C0 16.1636 0.645 18.2592 1.833 20.0815C2.023 20.3735 2.188 21.0333 2.083 21.6652C1.976 22.3184 1.635 22.957 0.959 23.3316C0.748 23.4489 0.007 23.7742 0 24.6647C-0.007 25.5552 0.761 25.9938 1.333 25.9978C2.687 26.0084 11.004 25.9978 13.334 25.9978C20.664 25.9978 26.667 20.6641 26.667 14C26.667 7.33589 20.664 2 13.334 2ZM13.334 4.66635C19.258 4.66635 24 8.88153 24 14C24 19.1185 19.258 23.3337 13.334 23.3337C11.563 23.3337 7.499 23.3337 4.333 23.3337C4.945 22.0633 4.9 20.0463 4.041 18.6266C3.18 17.2002 2.667 15.6404 2.667 14C2.667 8.88374 7.409 4.66635 13.334 4.66635ZM8 12.6667C7.264 12.6667 6.667 13.264 6.667 14C6.667 14.736 7.264 15.3333 8 15.3333C8.736 15.3333 9.333 14.736 9.333 14C9.333 13.264 8.736 12.6667 8 12.6667ZM13.334 12.6667C12.598 12.6667 12 13.264 12 14C12 14.736 12.598 15.3333 13.334 15.3333C14.07 15.3333 14.667 14.736 14.667 14C14.667 13.264 14.07 12.6667 13.334 12.6667ZM18.667 12.6667C17.931 12.6667 17.334 13.264 17.334 14C17.334 14.736 17.931 15.3333 18.667 15.3333C19.403 15.3333 20 14.736 20 14C20 13.264 19.403 12.6667 18.667 12.6667Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Worker Card 2 */}
            <div className="flex h-47 items-start w-full rounded-xl bg-white shadow-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c46ad341b6e8fbc8357c6a7bda42c4f8be09e81?width=282"
                alt="Arfan Khoirul"
                className="w-35 h-47 object-cover rounded-l-xl"
              />
              <div className="flex w-full h-47 py-4 px-6 justify-between items-center">
                <div className="flex flex-col items-start gap-3">
                  <div className="flex flex-col items-start gap-0">
                    <div
                      className="text-[#4581B2] text-xl font-semibold leading-[200%]"
                      style={{
                        fontFamily:
                          "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                      }}
                    >
                      Arfan Khoirul
                    </div>
                    <div className="flex flex-col items-start gap-0">
                      <div
                        className="text-[#2F587A] text-2xl font-semibold leading-[200%]"
                        style={{
                          fontFamily:
                            "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        Lokasi: Jl. Kukusan Barat, Depok Raya
                      </div>
                    </div>
                  </div>
                  <div className="flex w-66 items-start gap-3">
                    <div
                      className="text-[#1D364B] text-xl font-semibold leading-[200%]"
                      style={{
                        fontFamily:
                          "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                      }}
                    >
                      Tag :
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex py-2 px-2 justify-center items-end gap-2.5 rounded-full border border-[#EBF2F7] bg-[#EBF2F7]">
                        <div
                          className="text-[#1D364B] text-base font-semibold leading-[200%]"
                          style={{
                            fontFamily:
                              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                          }}
                        >
                          Tukang Kebun
                        </div>
                      </div>
                      <div className="flex py-2 px-2 justify-center items-end gap-2.5 rounded-full border border-[#EBF2F7] bg-[#EBF2F7]">
                        <div
                          className="text-[#1D364B] text-base font-semibold leading-[200%]"
                          style={{
                            fontFamily:
                              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                          }}
                        >
                          Perawatan Tanaman Hias
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <div className="flex w-42 items-center gap-8">
                  <div
                    className="text-[#4581B2] text-xl font-semibold"
                    style={{
                      fontFamily:
                        "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Hubungi
                  </div>
                  <div className="w-13 h-13 bg-[#3F75A1] rounded-full flex items-center justify-center">
                    <svg
                      width="27"
                      height="24"
                      viewBox="0 0 27 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.334 2C6.003 2 0 7.33374 0 14C0 16.1636 0.645 18.2592 1.833 20.0815C2.023 20.3735 2.188 21.0333 2.083 21.6652C1.976 22.3184 1.635 22.957 0.959 23.3316C0.748 23.4489 0.007 23.7742 0 24.6647C-0.007 25.5552 0.761 25.9938 1.333 25.9978C2.687 26.0084 11.004 25.9978 13.334 25.9978C20.664 25.9978 26.667 20.6641 26.667 14C26.667 7.33589 20.664 2 13.334 2ZM13.334 4.66635C19.258 4.66635 24 8.88153 24 14C24 19.1185 19.258 23.3337 13.334 23.3337C11.563 23.3337 7.499 23.3337 4.333 23.3337C4.945 22.0633 4.9 20.0463 4.041 18.6266C3.18 17.2002 2.667 15.6404 2.667 14C2.667 8.88374 7.409 4.66635 13.334 4.66635ZM8 12.6667C7.264 12.6667 6.667 13.264 6.667 14C6.667 14.736 7.264 15.3333 8 15.3333C8.736 15.3333 9.333 14.736 9.333 14C9.333 13.264 8.736 12.6667 8 12.6667ZM13.334 12.6667C12.598 12.6667 12 13.264 12 14C12 14.736 12.598 15.3333 13.334 15.3333C14.07 15.3333 14.667 14.736 14.667 14C14.667 13.264 14.07 12.6667 13.334 12.6667ZM18.667 12.6667C17.931 12.6667 17.334 13.264 17.334 14C17.334 14.736 17.931 15.3333 18.667 15.3333C19.403 15.3333 20 14.736 20 14C20 13.264 19.403 12.6667 18.667 12.6667Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Scrollbar */}
          <div className="absolute right-0 top-33 w-1.5 h-99 bg-[#EBF2F7] rounded-full">
            <div className="h-48 bg-[#1D364B] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
