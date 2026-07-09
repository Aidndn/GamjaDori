import type { TravelStyle } from "@/data/travelStyles";

type TravelStyleCardProps = {
  style: TravelStyle;
  selected: boolean;
  onSelect: () => void;
};

export function TravelStyleCard({ style, selected, onSelect }: TravelStyleCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-[20px] border p-4 text-left transition-all active:scale-[0.98] ${
        selected
          ? "border-[#3B82F6] bg-gradient-to-br from-[#EFF6FF] to-[#F0FDF4] shadow-[0_6px_24px_rgba(59,130,246,0.15)] ring-2 ring-[#3B82F6]"
          : "border-[#E2E8F0] bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:border-[#93C5FD]"
      }`}
    >
      <span className="text-2xl">{style.emoji}</span>
      <p className="mt-2 text-[15px] font-bold text-[#0F172A]">{style.label}</p>
      <p className="mt-1 text-[12px] leading-relaxed text-[#64748B]">{style.description}</p>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {style.highlights.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              selected ? "bg-[#3B82F6] text-white" : "bg-[#F1F5F9] text-[#64748B]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
