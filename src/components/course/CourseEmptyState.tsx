import Link from "next/link";
import { buttonSecondary } from "@/lib/buttonStyles";
import { EmptyState } from "@/components/common/EmptyState";

export function CourseEmptyState() {
  return (
    <EmptyState
      emoji="🗺️"
      title="하루 코스를 만들어보세요"
      description="여행 스타일을 선택하거나 아래 버튼으로 코스를 생성해 보세요."
    />
  );
}

export function CourseEmptyStateLink() {
  return (
    <Link
      href="/map"
      className={`flex w-full items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white py-3.5 text-[14px] font-bold text-[#334155] shadow-sm ${buttonSecondary}`}
    >
      관광지 더 담기
    </Link>
  );
}
