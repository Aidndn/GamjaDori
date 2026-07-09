import { TRAVEL_STYLES } from "@/data/travelStyles";
import { buttonChip } from "@/lib/buttonStyles";
import type { TravelStyleId } from "@/types/course";

type TravelStyleChipsProps = {
  selectedStyle: TravelStyleId;
  onSelect: (style: TravelStyleId) => void;
};

export function TravelStyleChips({ selectedStyle, onSelect }: TravelStyleChipsProps) {
  return (
    <section className="rounded-[24px] bg-gradient-to-br from-[#F0F9FF] to-[#F0FDF4] p-5 ring-1 ring-[#E0F2FE]">
      <h2 className="text-[17px] font-bold text-[#0F172A]">어떤 여행을 원하시나요?</h2>
      <p className="mt-1 text-[13px] leading-relaxed text-[#64748B]">
        여행 스타일에 따라 감자도리가 코스를 다르게 추천해드려요.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {TRAVEL_STYLES.map((style) => {
          const selected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelect(style.id)}
              className={`rounded-full px-3.5 py-2 text-[13px] font-semibold ${buttonChip} ${
                selected
                  ? "bg-gradient-to-r from-[#3B82F6] to-[#22C55E] text-white shadow-[0_4px_14px_rgba(59,130,246,0.28)]"
                  : "border border-[#E2E8F0] bg-white text-[#334155] shadow-sm"
              }`}
            >
              {style.emoji} {style.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] text-[#94A3B8]">선택한 스타일에 따라 일정이 달라져요.</p>
    </section>
  );
}
