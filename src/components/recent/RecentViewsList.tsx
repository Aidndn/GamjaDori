import type { RecentView } from "@/types/recent";
import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { FallbackImage } from "@/components/common/FallbackImage";
import { buttonSecondary, linkCard } from "@/lib/buttonStyles";
import { buildAttractionHref } from "@/utils/favorites";

type RecentViewsListProps = {
  views: RecentView[];
};

export function RecentViewsEmptyState() {
  return (
    <EmptyState
      emoji="👀"
      title="최근 본 여행지가 없어요"
      description="관광지 상세 페이지를 방문하면 여기에 표시돼요."
    >
      <Link
        href="/map"
        className={`inline-flex w-full items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white py-3.5 text-[14px] font-bold text-[#334155] shadow-sm ${buttonSecondary}`}
      >
        여행지 둘러보기
      </Link>
    </EmptyState>
  );
}

export function RecentViewsList({ views }: RecentViewsListProps) {
  if (views.length === 0) {
    return <RecentViewsEmptyState />;
  }

  return (
    <section className="space-y-3">
      <h3 className="text-[15px] font-bold text-[#0F172A]">최근 본 여행지</h3>
      {views.slice(0, 5).map((view) => (
        <Link
          key={`${view.id}-${view.viewedAt}`}
          href={buildAttractionHref(view.id, view.city)}
          className={`flex items-center gap-3 overflow-hidden rounded-[20px] bg-white p-3 shadow-[0_4px_20px_rgba(15,23,42,0.06)] ring-1 ring-[#F1F5F9] ${linkCard}`}
        >
          <FallbackImage
            src={view.image}
            alt={view.name}
            className="h-14 w-14 shrink-0 rounded-2xl object-cover"
            containerClassName="h-14 w-14 shrink-0 rounded-2xl"
            fallbackEmoji="🏞️"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-bold text-[#0F172A]">{view.name}</p>
            <p className="mt-0.5 text-[12px] text-[#64748B]">📍 {view.city}</p>
          </div>
          <svg className="shrink-0 text-[#CBD5E1]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ))}
    </section>
  );
}
