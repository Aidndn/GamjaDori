"use client";

import Link from "next/link";
import { LoadingState } from "@/components/common/LoadingState";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { FavoriteCard, FavoritesEmptyState } from "@/components/favorites";
import { useFavoritesStore } from "@/hooks/useFavoritesStore";
import { buttonSecondary } from "@/lib/buttonStyles";

export default function FavoritesPage() {
  const { hydrated, favorites } = useFavoritesStore();

  if (!hydrated) {
    return <LoadingState fullScreen message="즐겨찾기를 불러오는 중..." />;
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white pb-32 font-sans text-[#0F172A]">
      <header className="px-5 pb-4 pt-12">
        <p className="text-[12px] font-semibold tracking-wide text-[#3B82F6]">FAVORITES</p>
        <h1 className="mt-1 text-[26px] font-bold tracking-tight">
          <span className="mr-1.5">❤️</span>
          즐겨찾기
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">
          저장한 여행지를 모아볼 수 있어요.
        </p>
      </header>

      <main className="space-y-5 px-5">
        {favorites.length === 0 ? (
          <>
            <FavoritesEmptyState />
            <Link
              href="/map"
              className={`flex w-full items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white py-3.5 text-[14px] font-bold text-[#334155] shadow-sm ${buttonSecondary}`}
            >
              여행지 둘러보기
            </Link>
          </>
        ) : (
          <>
            <p className="text-[13px] font-semibold text-[#64748B]">{favorites.length}곳 저장됨</p>
            {favorites.map((favorite) => (
              <FavoriteCard key={favorite.id} favorite={favorite} />
            ))}
          </>
        )}
      </main>

      <BottomNavigation activeTab="heart" />
    </div>
  );
}
