import Link from "next/link";
import { buttonPrimary, buttonSecondary } from "@/lib/buttonStyles";

type CourseActionBarProps = {
  onRegenerate: () => void;
  city?: string;
};

export function CourseActionBar({ onRegenerate, city }: CourseActionBarProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onRegenerate}
        className={`col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#22C55E] py-3.5 text-[14px] font-bold text-white shadow-[0_6px_20px_rgba(59,130,246,0.28)] ${buttonPrimary}`}
      >
        <span>🔄</span>
        코스 다시 만들기
      </button>
      <Link
        href="/map"
        className={`col-span-2 flex items-center justify-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white py-3.5 text-[14px] font-bold text-[#334155] shadow-[0_2px_12px_rgba(15,23,42,0.04)] ${buttonSecondary}`}
      >
        <span>🗺️</span>
        지도에서 보기
        {city ? ` · ${city}` : ""}
      </Link>
    </div>
  );
}
