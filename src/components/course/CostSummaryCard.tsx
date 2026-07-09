import type { CourseScheduleItem } from "@/types/course";
import { calculateCourseCost, formatKrw } from "@/utils/courseCost";

type CostSummaryCardProps = {
  items: CourseScheduleItem[];
};

type CostRow = {
  label: string;
  amount: number;
};

export function CostSummaryCard({ items }: CostSummaryCardProps) {
  const cost = calculateCourseCost(items);

  const rows: CostRow[] = [
    { label: "식사", amount: cost.meals },
    { label: "카페", amount: cost.cafe },
    { label: "입장료", amount: cost.admission },
    { label: "교통비", amount: cost.transportation },
  ].filter((row) => row.amount > 0);

  return (
    <section className="rounded-[24px] bg-gradient-to-br from-[#F0F9FF] to-[#F0FDF4] p-5 ring-1 ring-[#E0F2FE]">
      <h3 className="text-[17px] font-bold text-[#0F172A]">예상 여행 비용</h3>
      <p className="mt-1 text-[12px] text-[#64748B]">1인 기준 · 이동 거리 기반 교통비 포함</p>

      <ul className="mt-4 space-y-2.5">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between text-[14px]">
            <span className="font-medium text-[#334155]">{row.label}</span>
            <span className="font-bold text-[#0F172A]">{formatKrw(row.amount)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-[#E0F2FE]">
        <span className="text-[15px] font-bold text-[#3B82F6]">총</span>
        <span className="text-[18px] font-bold text-[#0F172A]">{formatKrw(cost.total)}</span>
      </div>
    </section>
  );
}
