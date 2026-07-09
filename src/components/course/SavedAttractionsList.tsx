import type { SavedAttraction } from "@/types/course";
import { buttonGhost } from "@/lib/buttonStyles";

type SavedAttractionsListProps = {
  attractions: SavedAttraction[];
  onRemove: (id: string) => void;
};

export function SavedAttractionsList({ attractions, onRemove }: SavedAttractionsListProps) {
  if (attractions.length === 0) {
    return (
      <div className="rounded-[20px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-5 text-center">
        <p className="text-[13px] text-[#64748B]">
          관광지 상세에서 <span className="font-semibold text-[#3B82F6]">AI 추천 코스에 추가</span>를
          눌러보세요
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {attractions.map((attraction) => (
        <span
          key={attraction.id}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1.5 text-[13px] font-semibold text-[#1D4ED8] ring-1 ring-[#BFDBFE]"
        >
          📍 {attraction.name}
          <button
            type="button"
            aria-label={`${attraction.name} 제거`}
            onClick={() => onRemove(attraction.id)}
            className={`text-[#94A3B8] hover:text-[#EF4444] ${buttonGhost}`}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}
