import { Search, ChevronDown, ChevronRight } from "lucide-react";

// ---
// Interface for Worker Data
// ---

interface Worker {
  id: number | string; // id can be number (from initial array) or string (from recommendedWorkers)
  category: string;
  name: string;
  age: number;
  location: string;
  description: string;
  priceRange: string;
  image?: string; // Optional if some workers might not have an image
}

// ---
// WorkerCard Component
// ---

// Define the props for WorkerCard
interface WorkerCardProps {
  worker: Worker;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    {/* Worker Image */}
    <div className="h-48 overflow-hidden">
      <img
        src={worker.image || "/placeholder.svg"}
        alt={`${worker.name} - ${worker.category}`}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Worker Info */}
    <div className="p-6">
      {/* Category */}
      <h4 className="text-xl font-bold text-gray-900 mb-2">
        {worker.category}
      </h4>

      {/* Name and Details */}
      <p className="text-gray-600 mb-3">
        {worker.name}, {worker.age} tahun, {worker.location}
      </p>

      {/* Description */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
        {worker.description}
      </p>

      {/* Price */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Estimasi Tarif</p>
        <p className="font-semibold text-gray-900">{worker.priceRange}</p>
      </div>

      {/* Action Button */}
      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Lihat Detail
      </button>
    </div>
  </div>
);

// ---
// FindWorkerSection Component
// ---

export default function FindWorkerSection() {
  const workers: Worker[] = [
    // Explicitly type the workers array
    {
      id: 1,
      category: "Montir",
      name: "Suwadi",
      age: 32,
      location: "Kab. Bogor",
      description:
        "Berpengalaman sebagai montir profesional selama 8 tahun. Mampu menangani kendaraan bermotor, khususnya mobil.",
      priceRange: "Rp 100,000.00 - 400,000.00",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c3a754b1dd5582adaa1196ac2cc6c9cf51a36a88?width=820",
    },
    {
      id: 2,
      category: "Jasa Bersih-Bersih Rumah",
      name: "Maria Husna",
      age: 40,
      location: "Kab. Bogor",
      description:
        "Telaten dan cekatan dalam melakukan pekerjaan rumah. Menerima bersih-bersih besar.",
      priceRange: "Rp 200,000.00 - 600,000.00",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d9c29d52182ed25e5d32a9d48db166d1878ddae6?width=820",
    },
    {
      id: 3,
      category: "Tukang Kebun",
      name: "Irwan Wirawan",
      age: 27,
      location: "Kab. Bogor",
      description:
        "Berpengalaman sebagai tukang kebun profesional selama 3 tahun. Mampu menangani berbagai jenis perawatan tanaman hias.",
      priceRange: "Rp 200,000.00 - 600,000.00",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/13662c902cc05082d1f3d64b7013c9934477bab6?width=820",
    },
  ];

  // Duplicate workers for recommendation section (6 total cards)
  const recommendedWorkers: Worker[] = [...workers, ...workers].map(
    (worker, index) => ({
      ...worker,
      id: `rec-${index + 1}`, // Ensure unique IDs for the duplicated workers
    }),
  );

  return (
    <div className="flex flex-col items-start gap-14 w-full max-w-screen-xl">
      {/* Header Section */}
      <div className="flex flex-col items-start gap-10 w-full">
        <div className="flex flex-col items-start gap-1 w-full">
          <h1
            className="w-full text-4xl font-bold leading-[120%] bg-gradient-to-r from-[#1D364B] via-[#5B7E9B] to-[#3F75A1] bg-clip-text text-transparent"
            style={{
              textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
              fontFamily:
                "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Temukan Pekerja Terbaikmu!
          </h1>
          <p
            className="text-[#2F587A] text-xl font-semibold leading-[200%]"
            style={{
              fontFamily:
                "Urbanist, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Temukan pekerja terbaik dengan fitur rekomendasi yang telah
            dipersonalisasi menggunakan AI!
          </p>
        </div>

        {/* Search Bar */}
        <div className="h-14 w-full relative">
          <div className="w-full h-14 rounded-lg border border-[#1D364B] bg-[#FDFDFD] absolute inset-0"></div>
          <div className="w-full h-7 absolute left-10 top-4">
            <div className="absolute right-10 top-0 w-7 h-7">
              <svg
                width="28"
                height="27"
                viewBox="0 0 28 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3368 2.24951C6.36922 2.24951 2.34229 6.27683 2.34229 11.2441C2.34229 16.2113 6.36922 20.2386 11.3368 20.2386C13.4018 20.2386 15.3591 19.5292 16.8772 18.3599L21.7717 23.2957C22.2108 23.7341 22.9488 23.7341 23.388 23.2957C23.827 22.856 23.827 22.1185 23.388 21.6789L18.4596 16.7768C19.6298 15.259 20.3312 13.3094 20.3312 11.2441C20.3312 6.27683 16.3043 2.24951 11.3368 2.24951ZM11.3368 4.49815C15.0624 4.49815 18.0826 7.51807 18.0826 11.2441C18.0826 14.9701 15.0624 17.99 11.3368 17.99C7.61113 17.99 4.5909 14.9701 4.5909 11.2441C4.5909 7.51807 7.61113 4.49815 11.3368 4.49815Z"
                  fill="#1D364B"
                />
              </svg>
            </div>
            <div
              className="absolute left-0 top-0.5 h-6 text-[#969BA0] text-base font-normal leading-[150%]"
              style={{
                fontFamily:
                  "Roboto, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Search here
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="flex flex-col items-start gap-6 w-full">
        <div className="flex items-center gap-6 w-full">
          <div className="flex items-center gap-2.5 flex-1">
            <h3
              className="text-[#1D364B] text-[28px] font-bold leading-[120%]"
              style={{
                textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
                fontFamily:
                  "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Daftar Favoritmu
            </h3>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9889 16.4717C11.7579 16.4697 11.5367 16.378 11.3719 16.216L2.64464 7.48875C2.48567 7.32415 2.3977 7.1037 2.39969 6.87487C2.40168 6.64605 2.49346 6.42716 2.65527 6.26535C2.81708 6.10353 3.03598 6.01175 3.2648 6.00976C3.49363 6.00777 3.71408 6.09574 3.87868 6.25471L11.9889 14.365L20.0992 6.25471C20.1797 6.17136 20.276 6.10487 20.3825 6.05914C20.4889 6.0134 20.6035 5.98932 20.7193 5.98831C20.8352 5.98731 20.9501 6.00939 21.0574 6.05327C21.1647 6.09715 21.2621 6.16195 21.344 6.2439C21.426 6.32584 21.4908 6.42328 21.5347 6.53054C21.5786 6.63779 21.6006 6.75271 21.5996 6.86859C21.5986 6.98447 21.5745 7.09899 21.5288 7.20547C21.4831 7.31194 21.4166 7.40824 21.3332 7.48875L12.606 16.216C12.4412 16.378 12.22 16.4697 11.9889 16.4717Z"
              fill="#B9BBBD"
            />
          </svg>
        </div>

        <div className="flex flex-col items-start gap-10 w-full">
          <div className="relative flex justify-center items-center gap-4 w-full">
            {workers.map((worker) => (
              <img
                key={worker.id}
                src={worker.image}
                alt={worker.category}
                className="flex w-[410px] flex-col items-start rounded-xl shadow-lg"
              />
            ))}

            {/* Navigation Arrow for Favorites */}
            <div className="absolute -right-7 top-[272px] w-15 h-15 drop-shadow-lg">
              <div className="w-15 h-15 bg-[#558EBD] rounded-full absolute inset-0"></div>
              <div className="absolute left-3.5 top-3.5 w-8 h-8 flex items-center justify-center">
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.14893 15.6413C5.14893 14.9363 5.72048 14.3647 6.42552 14.3647H24.2979C25.0029 14.3647 25.5745 14.9363 25.5745 15.6413C25.5745 16.3464 25.0029 16.9179 24.2979 16.9179H6.42552C5.72048 16.9179 5.14893 16.3464 5.14893 15.6413Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.4589 5.80262C14.9574 5.30408 15.7657 5.30408 16.2642 5.80262L25.2004 14.7388C25.699 15.2373 25.699 16.0456 25.2004 16.5442L16.2642 25.4803C15.7657 25.9789 14.9574 25.9789 14.4589 25.4803C13.9603 24.9818 13.9603 24.1735 14.4589 23.675L22.4923 15.6415L14.4589 7.608C13.9603 7.10945 13.9603 6.30116 14.4589 5.80262Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="flex flex-col items-start gap-6 w-full">
        <h3
          className="w-full text-[#1D364B] text-[28px] font-bold leading-[120%]"
          style={{
            textShadow: "0px 4px 4px rgba(255, 255, 255, 0.25)",
            fontFamily:
              "'Plus Jakarta Sans', -apple-system, Roboto, Helvetica, sans-serif",
          }}
        >
          Rekomendasi
        </h3>

        <div className="flex flex-col items-start gap-10 w-full">
          {/* First Row */}
          <div className="flex justify-center items-center gap-4 w-full">
            {workers.map((worker) => (
              <img
                key={worker.id}
                src={worker.image}
                alt={worker.category}
                className="flex w-[410px] flex-col items-start rounded-xl shadow-lg"
              />
            ))}
          </div>

          {/* Second Row */}
          <div className="flex justify-between items-center w-full">
            {workers.map((worker, index) => (
              <img
                key={`second-${index}`}
                src={worker.image}
                alt={worker.category}
                className="flex w-[410px] flex-col items-start rounded-xl shadow-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
