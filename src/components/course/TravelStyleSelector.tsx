import { TRAVEL_STYLES } from "@/data/travelStyles";
import type { TravelStyleId } from "@/types/course";
import { TravelStyleCard } from "./TravelStyleCard";

type TravelStyleSelectorProps = {
  selectedStyle: TravelStyleId | null;
  onSelect: (style: TravelStyleId) => void;
  onConfirm: () => void;
  disabled?: boolean;
};

export function TravelStyleSelector({
  selectedStyle,
  onSelect,
  onConfirm,
  disabled,
}: TravelStyleSelectorProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-[19px] font-bold">여행 스타일 선택</h2>
        <p className="mt-1 text-[13px] text-[#64748B]">
          스타일에 맞는 하루 코스를 추천해드려요
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TRAVEL_STYLES.map((style) => (
          <TravelStyleCard
            key={style.id}
            style={style}
            selected={selectedStyle === style.id}
            onSelect={() => onSelect(style.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onConfirm}
        disabled={!selectedStyle || disabled}
        className="w-full rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#22C55E] py-4 text-[15px] font-bold text-white shadow-[0_6px_20px_rgba(59,130,246,0.28)] transition-transform active:scale-[0.98] disabled:opacity-50"
      >
        🥔 이 스타일로 코스 생성하기
      </button>
    </section>
  );
}
