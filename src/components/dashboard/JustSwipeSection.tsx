import { MapPin } from "lucide-react";
import { JSX } from "react";

export default function JustSwipeSection(): JSX.Element {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm p-8 relative overflow-hidden min-h-[600px]">
      {/* Background decoration with profile photos */}
      <div className="absolute inset-0 opacity-20">
        {/* Scattered profile circles */}
        <div className="absolute top-16 left-8 w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
          <img
            src="/placeholder.svg?height=48&width=48"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-32 left-32 w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-8 right-16 w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-32 left-16 w-14 h-14 bg-gray-300 rounded-full overflow-hidden">
          <img
            src="/placeholder.svg?height=56&width=56"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-16 right-32 w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Map pins */}
        <div className="absolute top-20 right-24">
          <MapPin className="w-6 h-6 text-blue-400" />
        </div>
        <div className="absolute bottom-40 right-8">
          <MapPin className="w-8 h-8 text-blue-300" />
        </div>
        <div className="absolute bottom-8 left-40">
          <MapPin className="w-5 h-5 text-blue-400" />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-40 right-12 w-24 h-24 bg-blue-200 rounded-full"></div>
        <div className="absolute bottom-20 left-8 w-32 h-32 bg-blue-100 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-center mb-8">
        <h1
          className="w-full max-w-4xl text-4xl font-bold leading-[120%] text-center bg-gradient-to-r from-[#1D364B] via-[#5B7E9B] to-[#3F75A1] bg-clip-text text-transparent"
          style={{
            textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
            fontFamily:
              "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          Just Swipe! Jelajah Sekitar dan Temukan Kecocokan
        </h1>
        <p
          className="w-full max-w-2xl text-[#3F75A1] text-center text-xl font-semibold leading-[151%]"
          style={{
            fontFamily:
              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          Fitur rekomendasi pekerja di sekitar wilayahmu. Geser untuk
          menjelajah. Beri bintang untuk memasukkan Pekerja pada Daftar
          Favoritmu!
        </p>
      </div>

      {/* Swipe Card Interface */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2.5 w-full max-w-6xl mx-auto rounded-lg bg-[#EBF2F7] shadow-lg p-16">
        {/* Background illustration */}
        <div className="absolute right-0 bottom-0 w-[506px] h-[476px] opacity-30">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bcdf9fcffe21991b4fc84048bb4e249585cdd19?width=1013"
            alt="Background decoration"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative w-full max-w-4xl h-[700px]">
          {/* Layered Background Cards */}
          <div className="absolute inset-0">
            <div className="absolute left-10 top-[75px] w-[722px] h-[586px] bg-[#CBDFEE] rounded-[27px]"></div>
            <div className="absolute left-5 top-[61px] w-[761px] h-[586px] bg-[#B2D1EA] rounded-[27px]"></div>
            <div className="absolute left-0 top-0 w-[804px] h-[633px] bg-[#8CB1D0] rounded-[27px]"></div>
          </div>

          {/* Main Card */}
          <div className="absolute left-0 top-0 w-[775px] h-[620px] flex">
            {/* Image Section */}
            <div className="w-[414px] h-[620px] bg-white rounded-[32px] overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/417703ea76c1990b6a35ebd1907c311f26fce32c?width=830"
                alt="Garden work"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info Section */}
            <div className="flex w-[298px] flex-col items-start gap-8 absolute left-[477px] top-[61px] h-[444px]">
              {/* Header Section */}
              <div className="flex flex-col items-start gap-2">
                {/* Melamar Tag */}
                <div className="flex w-[132px] h-[37px] py-2 px-2 justify-center items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1D364B] via-[#2E526E] to-[#2F587A]">
                  <div
                    className="text-white text-xl font-semibold leading-[200%] tracking-[1.2px]"
                    style={{
                      fontFamily:
                        "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Melamar
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex w-[263px] flex-col items-start gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-[46px] h-[46px] rounded-full bg-gray-300 overflow-hidden">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c46ad341b6e8fbc8357c6a7bda42c4f8be09e81?width=282"
                        alt="Irwan Wirawan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-0">
                      <div
                        className="text-white text-xl font-semibold leading-[200%]"
                        style={{
                          fontFamily:
                            "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        Irwan Wirawan
                      </div>
                      <div
                        className="text-[#EBF2F7] text-xs font-semibold leading-[200%]"
                        style={{
                          fontFamily:
                            "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        27 tahun, Kab. Bogor
                      </div>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="flex flex-col items-start gap-2 w-full">
                    {/* Primary Skill */}
                    <div className="flex py-2 px-2 justify-center items-end gap-2.5 rounded-full border border-white bg-white">
                      <div
                        className="text-[#1D364B] text-xs font-semibold leading-[115%]"
                        style={{
                          fontFamily:
                            "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        Tukang Kebun
                      </div>
                    </div>

                    {/* Additional Skills */}
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div
                        className="text-white text-xs font-semibold leading-[200%]"
                        style={{
                          fontFamily:
                            "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        Tag lainnya:
                      </div>
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex py-2 px-2 justify-center items-end gap-2.5 rounded-full border border-white bg-white">
                          <div
                            className="text-[#1D364B] text-xs font-semibold leading-[115%]"
                            style={{
                              fontFamily:
                                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                            }}
                          >
                            Perawatan Kolam
                          </div>
                        </div>
                        <div className="flex py-2 px-2 justify-center items-end gap-2.5 rounded-full border border-white bg-white">
                          <div
                            className="text-[#1D364B] text-xs font-semibold leading-[115%]"
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
                </div>
              </div>

              {/* Description and Price Section */}
              <div className="flex flex-col items-start w-full">
                {/* Description */}
                <div
                  className="text-white text-base font-normal leading-[150%] mb-8"
                  style={{
                    fontFamily:
                      "Roboto, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Berpengalaman sebagai tukang kebun profesional selama 3 tahun.
                  Mampu menangani berbagai jenis perawatan tanaman hias.
                </div>

                {/* Price Section */}
                <div className="flex flex-col items-start gap-3 w-full">
                  <div className="h-px w-full bg-white"></div>
                  <div className="flex flex-col items-start gap-2">
                    <div
                      className="text-white text-base font-semibold leading-[200%]"
                      style={{
                        fontFamily:
                          "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                      }}
                    >
                      Estimasi Tarif
                    </div>
                    <div
                      className="text-white text-center text-base font-semibold leading-[200%]"
                      style={{
                        fontFamily:
                          "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                      }}
                    >
                      Rp 200.000,00 - 600.000,00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Swipe Controls */}
          <div className="absolute left-[223px] top-[584px] w-[384px] h-[127px] flex justify-center items-center gap-10 drop-shadow-lg">
            {/* Background for buttons */}
            <div className="absolute inset-0 top-4 h-24 bg-white rounded-[51px] shadow-lg"></div>

            {/* Left Arrow Button */}
            <div className="relative w-[77px] h-[77px]">
              <div className="w-full h-full bg-[#3F75A1] rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33.0715 20.4094C33.0715 19.5049 32.3383 18.7717 31.4339 18.7717H8.50673C7.60228 18.7717 6.86908 19.5049 6.86908 20.4094C6.86908 21.3138 7.60228 22.047 8.50673 22.047H31.4339C32.3383 22.047 33.0715 21.3138 33.0715 20.4094Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.1283 7.78776C20.4887 7.14822 19.4518 7.14822 18.8123 7.78776L7.34869 19.2513C6.70914 19.8909 6.70914 20.9278 7.34869 21.5673L18.8123 33.0309C19.4518 33.6704 20.4887 33.6704 21.1283 33.0309C21.7678 32.3914 21.7678 31.3545 21.1283 30.7149L10.8227 20.4093L21.1283 10.1038C21.7678 9.46421 21.7678 8.42731 21.1283 7.78776Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            {/* Star/Like Button */}
            <div className="relative w-[127px] h-[127px]">
              <div className="w-full h-full bg-[#F64D64] rounded-full drop-shadow-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="71"
                  height="71"
                  viewBox="0 0 71 71"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_445_1838)">
                    <path
                      d="M51.7614 62.1757C51.2912 62.1776 50.8275 62.0667 50.409 61.8523L35.416 54.003L20.4229 61.8523C19.9361 62.1083 19.3872 62.2226 18.8386 62.1822C18.29 62.1417 17.7638 61.9482 17.3197 61.6236C16.8757 61.299 16.5316 60.8563 16.3266 60.3458C16.1216 59.8354 16.064 59.2777 16.1602 58.7361L19.1 42.185L6.98797 30.4257C6.61008 30.0486 6.34201 29.5757 6.21253 29.0578C6.08305 28.5399 6.09705 27.9965 6.25302 27.4859C6.42341 26.9634 6.73684 26.4991 7.15775 26.1458C7.57865 25.7924 8.09018 25.5641 8.63427 25.4868L25.3912 23.0468L32.7701 7.96551C33.0109 7.46847 33.3867 7.04929 33.8547 6.75599C34.3226 6.46269 34.8637 6.30713 35.416 6.30713C35.9682 6.30713 36.5093 6.46269 36.9773 6.75599C37.4452 7.04929 37.8211 7.46847 38.0618 7.96551L45.5289 23.0174L62.2859 25.4574C62.83 25.5347 63.3415 25.763 63.7624 26.1164C64.1833 26.4697 64.4968 26.934 64.6671 27.4565C64.8231 27.9671 64.8371 28.5105 64.7076 29.0284C64.5781 29.5463 64.3101 30.0192 63.9322 30.3963L51.8201 42.1556L54.76 58.7067C54.8649 59.2579 54.81 59.8275 54.6016 60.3485C54.3932 60.8694 54.0401 61.3198 53.584 61.6465C53.0517 62.0196 52.4107 62.2057 51.7614 62.1757Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_445_1838">
                      <rect
                        width="70.5555"
                        height="70.5555"
                        fill="white"
                        transform="translate(0.137207 0.439453)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Right Arrow Button */}
            <div className="relative w-[77px] h-[77px]">
              <div className="w-full h-full bg-[#3F75A1] rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.7583 20.4094C6.7583 19.5049 7.4915 18.7717 8.39595 18.7717H31.3231C32.2276 18.7717 32.9608 19.5049 32.9608 20.4094C32.9608 21.3138 32.2276 22.047 31.3231 22.047H8.39595C7.4915 22.047 6.7583 21.3138 6.7583 20.4094Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.7016 7.78776C19.3411 7.14822 20.378 7.14822 21.0176 7.78776L32.4811 19.2513C33.1207 19.8909 33.1207 20.9278 32.4811 21.5673L21.0176 33.0309C20.378 33.6704 19.3411 33.6704 18.7016 33.0309C18.062 32.3914 18.062 31.3545 18.7016 30.7149L29.0072 20.4093L18.7016 10.1038C18.062 9.46421 18.062 8.42731 18.7016 7.78776Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
