import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { Worker } from "../../lib/actions/worker.actions";

// ---
// Interface for Worker Data
// ---

// Note: The Worker interface is now imported from worker.actions.ts

// ---
// WorkerCard Component
// ---

// Define the props for WorkerCard
interface WorkerCardProps {
  worker: Worker;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full max-w-sm">
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
        {worker.name}, {worker.location}
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

interface FindWorkerSectionProps {
    workers: Worker[];
}

export default function FindWorkerSection({ workers = [] }: FindWorkerSectionProps) {
  // The hardcoded workers array is now removed.
  // The component receives workers via props.

  const favoriteWorkers = workers.slice(0, 3);
  const recommendedWorkers: Worker[] = [...workers, ...workers].slice(0, 6).map(
    (worker, index) => ({
      ...worker,
      id: `rec-${index + 1}`, // Ensure unique IDs for display
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
              <Search className="w-6 h-6 text-gray-500" />
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
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>

        <div className="flex flex-col items-start gap-10 w-full">
          <div className="relative flex justify-center items-center gap-4 w-full">
            {favoriteWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
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
        
        {/* MODIFIED SECTION: Displaying workers in two rows of three */}
        <div className="flex flex-col items-start gap-10 w-full">
            {/* First Row */}
            <div className="flex justify-center items-center gap-4 w-full">
                {recommendedWorkers.slice(0, 3).map((worker) => (
                    <WorkerCard key={worker.id} worker={worker} />
                ))}
            </div>

            {/* Second Row */}
            <div className="flex justify-center items-center gap-4 w-full">
                {recommendedWorkers.slice(3, 6).map((worker) => (
                    <WorkerCard key={worker.id} worker={worker} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
