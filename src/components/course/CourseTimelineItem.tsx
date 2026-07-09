import type { CourseScheduleItem } from "@/types/course";
import { buttonGhost } from "@/lib/buttonStyles";

type CourseTimelineItemProps = {
  item: CourseScheduleItem;
  isFirst: boolean;
  isLast: boolean;
  onRemove: (id: string) => void;
  travelMinutes?: number;
};

export function CourseTimelineItem({
  item,
  isFirst,
  isLast,
  onRemove,
  travelMinutes,
}: CourseTimelineItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        {!isFirst && travelMinutes !== undefined && travelMinutes > 0 && (
          <p className="mb-1 text-[10px] font-semibold text-[#94A3B8]">🚗 {travelMinutes}분</p>
        )}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg shadow-sm ${
            isFirst
              ? "bg-gradient-to-br from-[#3B82F6] to-[#22C55E] text-white"
              : "bg-white ring-2 ring-[#E0F2FE]"
          }`}
        >
          {item.icon}
        </div>
        {!isLast && (
          <div className="my-1 w-0.5 flex-1 min-h-[48px] bg-gradient-to-b from-[#93C5FD] to-[#86EFAC]" />
        )}
      </div>

      <article className={`min-w-0 flex-1 ${isLast ? "" : "pb-4"}`}>
        <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.06)] ring-1 ring-[#F1F5F9]">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-[#3B82F6]">{item.time}</p>
              <h3 className="mt-0.5 text-[16px] font-bold text-[#0F172A]">{item.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#64748B]">
                {item.description}
              </p>
            </div>
            <button
              type="button"
              aria-label={`${item.title} 삭제`}
              onClick={() => onRemove(item.id)}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F8FAFC] text-[#94A3B8] hover:bg-[#FEF2F2] hover:text-[#EF4444] ${buttonGhost}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
