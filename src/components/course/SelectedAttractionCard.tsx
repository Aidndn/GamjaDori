import type { SavedAttraction } from "@/types/course";
import { FallbackImage } from "@/components/common/FallbackImage";

type SelectedAttractionCardProps = {
  attraction: SavedAttraction;
};

export function SelectedAttractionCard({ attraction }: SelectedAttractionCardProps) {
  return (
    <section className="overflow-hidden rounded-[24px] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.08)] ring-1 ring-[#E0F2FE]">
      <div className="relative h-[120px] overflow-hidden bg-gradient-to-br from-[#3B82F6] to-[#22C55E]">
        <div className="absolute inset-0">
          <FallbackImage
            src={attraction.image}
            alt={attraction.name}
            className="h-full w-full object-cover opacity-80"
            containerClassName="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
            선택한 관광지
          </span>
          <h2 className="mt-1.5 text-[20px] font-bold text-white">{attraction.name}</h2>
          <p className="text-[13px] text-white/85">📍 {attraction.city}</p>
        </div>
      </div>
    </section>
  );
}
