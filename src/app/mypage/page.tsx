"use client";

import { LoadingState } from "@/components/common/LoadingState";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TravelSummaryCard } from "@/components/travel";
import {
  MyPageMenuList,
  MyProfileHeader,
  MySummaryCards,
  type MyPageMenuItemData,
} from "@/components/mypage";
import { RecentViewsList } from "@/components/recent";
import { useCourseStore } from "@/hooks/useCourseStore";
import { useFavoritesStore } from "@/hooks/useFavoritesStore";
import { useRecentViewsStore } from "@/hooks/useRecentViewsStore";
import { buildTravelSummary } from "@/utils/travelSummary";
import { resolveCourseCity } from "@/utils/weather";

const DEFAULT_STYLE = "nature" as const;

const menuItems: MyPageMenuItemData[] = [
  {
    icon: "❤️",
    title: "즐겨찾기",
    description: "저장한 여행지를 모아보세요",
    href: "/favorites",
  },
  {
    icon: "🥔",
    title: "AI 여행 코스",
    description: "나만의 하루 여행 일정을 확인해요",
    href: "/course",
  },
  {
    icon: "👀",
    title: "최근 본 여행지",
    description: "최근에 둘러본 여행지를 확인해요",
  },
  {
    icon: "⚙️",
    title: "설정",
    description: "앱 설정을 변경해요",
  },
];

export default function MyPage() {
  const { hydrated: favoritesHydrated, favorites } = useFavoritesStore();
  const { hydrated: courseHydrated, savedAttractions, course, travelStyle } = useCourseStore();
  const { hydrated: recentHydrated, recentViews } = useRecentViewsStore();

  const hydrated = favoritesHydrated && courseHydrated && recentHydrated;

  if (!hydrated) {
    return <LoadingState fullScreen message="마이페이지를 불러오는 중..." />;
  }

  const courseCount = savedAttractions.length;
  const displayCity = resolveCourseCity(
    course?.city,
    savedAttractions[0]?.city,
    recentViews[0]?.city,
    favorites[0]?.city,
  );

  const travelSummary = buildTravelSummary({
    city: resolveCourseCity(course?.city, savedAttractions[0]?.city),
    travelStyle: travelStyle ?? course?.travelStyle ?? DEFAULT_STYLE,
    courseItems: course?.items ?? [],
    favoritesCount: favorites.length,
  });

  const summaryItems = [
    { label: "저장한 여행지", count: favorites.length, emoji: "❤️" },
    { label: "담은 관광지", count: courseCount, emoji: "🥔" },
    { label: "최근 본 여행지", count: recentViews.length, emoji: "👀" },
  ];

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white pb-32 font-sans text-[#0F172A]">
      <header className="px-5 pb-4 pt-12">
        <p className="text-[12px] font-semibold tracking-wide text-[#3B82F6]">MY PAGE</p>
        <h1 className="mt-1 text-[26px] font-bold tracking-tight">
          <span className="mr-1.5">👤</span>
          마이페이지
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">
          나의 여행 정보를 한곳에서 확인해요.
        </p>
      </header>

      <main className="space-y-6 px-5">
        <MyProfileHeader
          city={displayCity}
          favoritesCount={favorites.length}
          recentCount={recentViews.length}
        />
        <TravelSummaryCard summary={travelSummary} />
        <MySummaryCards items={summaryItems} />
        <RecentViewsList views={recentViews} />
        <MyPageMenuList items={menuItems} />
      </main>

      <BottomNavigation activeTab="user" />
    </div>
  );
}
