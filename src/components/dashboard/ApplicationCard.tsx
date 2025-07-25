import { FullApplication } from "../../lib/actions/fetchPropsForDashboard";

interface ApplicationCardProps {
  application: FullApplication;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const { seeker } = application;

  return (
    <div className="absolute left-0 top-0 w-[775px] h-[620px] flex">
      {/* Image Section */}
      <div className="w-[414px] h-[620px] bg-white rounded-[32px] overflow-hidden shadow-lg">
        <img
          src={seeker.avatar || `https://i.pravatar.cc/414?u=${seeker.id}`}
          alt={seeker.fullname}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info Section */}
      <div className="flex w-[298px] flex-col items-start gap-8 absolute left-[477px] top-[61px] h-auto">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex w-auto h-[37px] py-2 px-4 justify-center items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1D364B] via-[#2E526E] to-[#2F587A]">
            <div className="text-white text-lg font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
              Melamar
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-[46px] h-[46px] rounded-full bg-gray-300 overflow-hidden">
              <img
                src={seeker.avatar || `https://i.pravatar.cc/46?u=${seeker.id}`}
                alt={seeker.fullname}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="text-white text-xl font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
                {seeker.fullname}
              </div>
              <div className="text-[#EBF2F7] text-xs font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
                {seeker.city}
              </div>
            </div>
          </div>
        </div>

        {/* Description and Price Section */}
        <div className="flex flex-col items-start w-full">
          <div className="text-white text-base font-normal leading-[150%] mb-8" style={{ fontFamily: "Roboto, sans-serif" }}>
            {application.description}
          </div>
          <div className="flex flex-col items-start gap-3 w-full">
            <div className="h-px w-full bg-white opacity-50"></div>
            <div className="flex flex-col items-start gap-2">
              <div className="text-white text-base font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
                Estimasi Tarif yang Ditawarkan
              </div>
              <div className="text-white text-center text-base font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
                Rp {application.minRate?.toLocaleString('id-ID') || 'N/A'} - Rp {application.maxRate?.toLocaleString('id-ID') || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
