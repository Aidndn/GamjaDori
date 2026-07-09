import type { TouristAttraction } from "@/types/attraction";
import { StarRating } from "./StarRating";

const categoryColors: Record<string, string> = {
  자연: "bg-[#F0FDF4] text-[#16A34A]",
  역사: "bg-[#FEF3C7] text-[#D97706]",
  맛집: "bg-[#FFF1F2] text-[#E11D48]",
  체험: "bg-[#EFF6FF] text-[#3B82F6]",
  액티비티: "bg-[#EDE9FE] text-[#7C3AED]",
  카페: "bg-[#FDF4FF] text-[#A21CAF]",
};

type AttractionHeaderProps = {
  attraction: TouristAttraction;
};

export function AttractionHeader({ attraction }: AttractionHeaderProps) {
  const badgeStyle = categoryColors[attraction.category] ?? "bg-[#F1F5F9] text-[#64748B]";

  return (
    <div className="-mt-6 relative z-10 rounded-t-[28px] bg-white px-5 pt-6">
      <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold ${badgeStyle}`}>
        {attraction.category}
      </span>
      <h1 className="mt-3 text-[26px] font-bold leading-tight tracking-tight text-[#0F172A]">
        {attraction.name}
      </h1>
      <p className="mt-1.5 text-[14px] font-medium text-[#64748B]">
        📍 {attraction.city}
      </p>
      <div className="mt-3">
        <StarRating rating={attraction.rating} />
      </div>
    </div>
  );
}
