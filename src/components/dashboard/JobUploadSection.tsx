import { JSX } from "react";

export default function JobUploadSection(): JSX.Element {
  return (
    <div className="flex flex-col items-start gap-10 w-full max-w-screen-xl h-auto">
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
            Unggah Lowongan Pekerjaan
          </h1>
        </div>
        <p
          className="text-[#2F587A] text-xl font-semibold leading-[200%]"
          style={{
            fontFamily:
              "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          Tambahkan lowongan pekerjaan Anda!
        </p>
      </div>

      <div className="flex items-center gap-8 flex-wrap lg:flex-nowrap">
        {/* Add Job Card */}
        <div className="flex h-40 py-2.5 px-8 flex-col justify-center items-center gap-2.5 rounded-2xl border-2 border-dashed border-[#2F587A] cursor-pointer hover:border-[#3F75A1] transition-colors">
          <div className="flex flex-col items-center gap-14">
            <div className="flex w-60 py-6 flex-col items-center gap-6">
              <div className="flex items-center gap-5">
                <div
                  className="text-[#3F75A1] text-[44px] font-bold leading-[120%]"
                  style={{
                    fontFamily:
                      "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  +
                </div>
                <div
                  className="text-[#3F75A1] text-2xl font-bold leading-[120%]"
                  style={{
                    fontFamily:
                      "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Tambah Pekerjaan
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Card 1 */}
        <div className="flex h-40 py-2.5 px-8 flex-col justify-center items-center gap-2.5 rounded-2xl border-2 border-[#2F587A]">
          <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col items-center gap-14">
              <div className="flex w-60 flex-col items-center gap-8">
                <div
                  className="text-[#3F75A1] text-2xl font-bold leading-[120%]"
                  style={{
                    fontFamily:
                      "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Pembersihan Kebun
                </div>
                <div className="flex w-58 items-start gap-3">
                  <div
                    className="text-[#1D364B] text-xl font-semibold leading-[200%]"
                    style={{
                      fontFamily:
                        "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Status :
                  </div>
                  <div className="flex items-start">
                    <div className="flex w-28 py-2 px-2 justify-center items-end gap-2.5 rounded-full bg-[#BCD3E5]">
                      <div
                        className="text-[#1D364B] text-base font-semibold leading-[200%]"
                        style={{
                          fontFamily:
                            "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        Dibuka
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Card 2 */}
        <div className="flex h-40 py-2.5 px-8 flex-col justify-center items-center gap-2.5 rounded-2xl border-2 border-[#2F587A]">
          <div className="flex flex-col items-center gap-14">
            <div className="flex flex-col items-center gap-14">
              <div className="flex w-60 flex-col items-center gap-8">
                <div
                  className="text-[#3F75A1] text-2xl font-bold leading-[120%]"
                  style={{
                    fontFamily:
                      "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Perawatan Kolam Ikan
                </div>
                <div className="flex w-58 items-start gap-3">
                  <div
                    className="text-[#1D364B] text-xl font-semibold leading-[200%]"
                    style={{
                      fontFamily:
                        "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Status :
                  </div>
                  <div className="flex items-start">
                    <div className="flex w-28 py-2 px-2 justify-center items-end gap-2.5 rounded-full bg-[#BCD3E5]">
                      <div
                        className="text-[#1D364B] text-base font-semibold leading-[200%]"
                        style={{
                          fontFamily:
                            "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        Dibuka
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
