import type { TravelSummary } from "@/utils/travelSummary";
import { formatKrw } from "@/utils/courseCost";

type TravelSummaryCardProps = {
  summary: TravelSummary;
};

type SummaryRow = {
  label: string;
  value: string;
};

export function TravelSummaryCard({ summary }: TravelSummaryCardProps) {
  const rows: SummaryRow[] = [
    { label: "여행 도시", value: summary.city },
    {
      label: "여행 스타일",
      value: `${summary.travelStyleEmoji} ${summary.travelStyleLabel}`,
    },
    { label: "코스 일정", value: `${summary.courseItemCount}개` },
    { label: "예상 비용", value: formatKrw(summary.estimatedCost) },
    { label: "예상 소요 시간", value: summary.estimatedDuration },
    { label: "즐겨찾기", value: `${summary.favoritesCount}곳` },
  ];

  return (
    <section className="rounded-[24px] bg-gradient-to-br from-[#F0F9FF] to-[#F0FDF4] p-5 ring-1 ring-[#E0F2FE]">
      <h3 className="text-[17px] font-bold text-[#0F172A]">여행 요약</h3>
      <p className="mt-1 text-[12px] text-[#64748B]">현재 여행 정보를 한눈에 확인해요</p>

      <ul className="mt-4 space-y-3">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-[#E0F2FE]"
          >
            <span className="text-[13px] font-medium text-[#64748B]">{row.label}</span>
            <span className="text-[14px] font-bold text-[#0F172A]">{row.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
