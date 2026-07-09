import type { CourseScheduleItem } from "@/types/course";
import { CourseTimelineItem } from "./CourseTimelineItem";

type CourseTimelineProps = {
  items: CourseScheduleItem[];
  onRemoveItem: (id: string) => void;
};

export function CourseTimeline({ items, onRemoveItem }: CourseTimelineProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-[24px] bg-[#F8FAFC] px-5 py-10 text-center ring-1 ring-[#E2E8F0]">
        <p className="text-4xl">🥔</p>
        <p className="mt-3 text-[15px] font-bold text-[#334155]">아직 일정이 없어요</p>
        <p className="mt-1 text-[13px] text-[#64748B]">코스를 생성해 보세요</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <CourseTimelineItem
          key={item.id}
          item={item}
          isFirst={index === 0}
          isLast={index === items.length - 1}
          onRemove={onRemoveItem}
          travelMinutes={item.travelMinutes}
        />
      ))}
    </div>
  );
}
