import { MapPin } from 'lucide-react';

// Define the structure for a single job offer
export interface JobOffer {
  id: number;
  providerName: string;
  providerAvatar: string;
  jobTitle: string;
  location: string;
  schedule: string;
  price: number;
  image: string;
}

interface JobOfferCardProps {
  offer: JobOffer;
}

export default function JobOfferCard({ offer }: JobOfferCardProps) {
  return (
    <div className="absolute left-0 top-0 w-full h-[620px] flex flex-col md:flex-row shadow-2xl rounded-[32px] bg-[#8CB1D0]">
      {/* Image Section */}
      <div className="w-full md:w-[414px] h-[250px] md:h-full flex-shrink-0">
        <img
          src={offer.image}
          alt={offer.jobTitle}
          className="w-full h-full object-cover rounded-t-[32px] md:rounded-l-[32px] md:rounded-r-none"
        />
      </div>

      {/* Job Info Section */}
      <div className="flex flex-col items-start gap-4 p-6 md:p-8 text-white w-full">
        {/* Status Tag */}
        <div className="flex py-2 px-4 justify-center items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1D364B] via-[#3C6B90] to-[#1D364B]">
          <div className="text-white text-sm md:text-base font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
            Ingin mempekerjakan Anda
          </div>
        </div>

        {/* Provider Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden border-2 border-white">
            <img
              src={offer.providerAvatar}
              alt={offer.providerName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-white text-xl font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
            {offer.providerName}
          </div>
        </div>

        {/* Job Title */}
        <div className="text-white text-2xl md:text-3xl font-bold" style={{ fontFamily: "Urbanist, sans-serif" }}>
          {offer.jobTitle}
        </div>

        {/* Job Details */}
        <div className="flex flex-col items-start gap-2 w-full" style={{ fontFamily: "Roboto, sans-serif" }}>
          <p className="text-sm font-semibold flex items-center gap-1"><MapPin size={16} /> Lokasi:</p>
          <p className="pl-5">{offer.location}</p>
          <p className="text-sm font-semibold mt-2">Jadwal:</p>
          <p className="pl-5">{offer.schedule}</p>
        </div>

        {/* Divider and Price */}
        <div className="w-full mt-auto pt-4">
          <div className="h-px w-full bg-white my-3 opacity-50"></div>
          <div className="text-white text-base font-semibold" style={{ fontFamily: "Urbanist, sans-serif" }}>
            Tarif yang ditawarkan
          </div>
          <div className="text-white text-2xl font-bold" style={{ fontFamily: "Urbanist, sans-serif" }}>
            Rp {offer.price.toLocaleString('id-ID')}
          </div>
        </div>
      </div>
    </div>
  );
}
