type MyProfileHeaderProps = {
  city?: string;
  favoritesCount?: number;
  recentCount?: number;
};

export function MyProfileHeader({
  city,
  favoritesCount = 0,
  recentCount = 0,
}: MyProfileHeaderProps) {
  const subtitle = city
    ? `${city} 여행을 준비 중이에요.`
    : favoritesCount > 0 || recentCount > 0
      ? "강원도 여행을 준비 중이에요."
      : "강원도 여행을 시작해 보세요.";

  return (
    <section className="rounded-[24px] bg-gradient-to-br from-[#F0F9FF] to-[#F0FDF4] p-6 ring-1 ring-[#E0F2FE]">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#22C55E] text-3xl shadow-[0_6px_20px_rgba(59,130,246,0.28)]">
          🥔
        </div>
        <div>
          <h2 className="text-[18px] font-bold text-[#0F172A]">감자도리 여행자</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-[#64748B]">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
