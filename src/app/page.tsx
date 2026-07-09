import Link from "next/link";
import { HomePopularCourses, HomeSearchBar, HomeWeatherStrip } from "@/components/home";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

const travelStyles = [
  {
    title: "계획형",
    type: "J",
    description: "시간표·동선·예약까지 완벽하게 짜는 여행",
    accent: "from-[#EFF6FF] to-[#DBEAFE]",
    border: "border-[#BFDBFE]",
    badge: "bg-[#3B82F6]",
    shadow: "shadow-[0_8px_30px_rgba(59,130,246,0.15)]",
    illustration: "planner",
  },
  {
    title: "자유형",
    type: "P",
    description: "발길 닿는 대로, 즉흥적으로 떠나는 여행",
    accent: "from-[#F0FDF4] to-[#DCFCE7]",
    border: "border-[#BBF7D0]",
    badge: "bg-[#22C55E]",
    shadow: "shadow-[0_8px_30px_rgba(34,197,94,0.15)]",
    illustration: "free",
  },
];

function IconBell() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function StyleIllustration({ type }: { type: string }) {
  if (type === "planner") {
    return (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
        <rect x="14" y="10" width="44" height="52" rx="6" fill="#DBEAFE" />
        <rect x="20" y="18" width="32" height="4" rx="2" fill="#3B82F6" />
        <rect x="20" y="28" width="24" height="3" rx="1.5" fill="#93C5FD" />
        <rect x="20" y="36" width="28" height="3" rx="1.5" fill="#93C5FD" />
        <rect x="20" y="44" width="20" height="3" rx="1.5" fill="#93C5FD" />
        <rect x="46" y="48" width="16" height="20" rx="4" fill="#3B82F6" />
        <path d="M50 54h8M50 58h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
      <path d="M28 18c0-6 8-10 14-6 4 3 4 10 0 13l-8 6v8h8" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="18" y="44" width="36" height="18" rx="5" fill="#DCFCE7" />
      <path d="M24 52h24M24 56h16" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round" />
      <circle cx="52" cy="22" r="6" fill="#BBF7D0" />
      <path d="M50 22l2 2 4-4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
  href,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h3 className="text-[19px] font-bold tracking-tight text-[#0F172A]">{title}</h3>
        {subtitle && <p className="mt-1 text-[13px] text-[#64748B]">{subtitle}</p>}
      </div>
      {action && href && (
        <Link href={href} className="text-[13px] font-semibold text-[#3B82F6]">
          {action}
        </Link>
      )}
      {action && !href && (
        <span className="text-[13px] font-semibold text-[#3B82F6]">{action}</span>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-white font-sans text-[#0F172A]">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white/80 px-5 pb-4 pt-12 backdrop-blur-xl">
        <h1 className="text-[23px] font-bold tracking-tight">
          <span className="mr-1.5">🥔</span>
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#22C55E] bg-clip-text text-transparent">
            감자도리
          </span>
        </h1>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="알림"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8FAFC] text-[#64748B] ring-1 ring-[#F1F5F9] transition-colors hover:bg-[#EFF6FF] hover:text-[#3B82F6]"
          >
            <IconBell />
          </button>
          <Link
            href="/mypage"
            aria-label="프로필"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#DCFCE7] text-[#3B82F6] ring-1 ring-white transition-opacity hover:opacity-85"
          >
            <IconUser />
          </Link>
        </div>
      </header>

      <main className="space-y-9 px-5 pb-32">
        {/* Search */}
        <section>
          <HomeSearchBar />
        </section>

        {/* Hero */}
        <section>
          <div className="relative h-[220px] overflow-hidden rounded-[28px] shadow-[0_16px_48px_rgba(15,23,42,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop&q=80"
              alt="강원 바다와 산"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#22C55E]/10" />
            <div className="relative flex h-full flex-col justify-end p-6">
              <span className="mb-2.5 inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 backdrop-blur-md ring-1 ring-white/20">
                GANGWON DO
              </span>
              <h2 className="text-[28px] font-bold leading-[1.15] tracking-tight text-white">
                오늘의 강원 여행
              </h2>
              <p className="mt-2 max-w-[280px] text-[14px] leading-relaxed text-white/80">
                AI가 오늘 가장 잘 어울리는 여행을 추천합니다.
              </p>
              <Link
                href="/course"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-bold text-[#1E40AF] shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-transform active:scale-[0.97]"
              >
                <span>🥔</span>
                AI 여행 추천받기
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Courses */}
        <section>
          <SectionHeader title="인기 코스" subtitle="지금 가장 많이 찾는 여행" href="/map" action="전체보기" />
          <HomePopularCourses />
        </section>

        {/* Today's Random Trip */}
        <section>
          <SectionHeader title="오늘의 랜덤 여행" subtitle="새로운 여행지를 발견해보세요" />
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#F0F9FF] via-white to-[#F0FDF4] p-5 shadow-[0_4px_24px_rgba(59,130,246,0.08)] ring-1 ring-[#E0F2FE]">
            <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#3B82F6]/5 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-4 h-28 w-28 rounded-full bg-[#22C55E]/5 blur-2xl" />
            <div className="relative">
              <p className="text-[20px] font-bold tracking-tight">
                <span className="mr-1.5">🎲</span>
                오늘 어디 갈까?
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#64748B]">
                AI가 오늘의 여행지를 골라드립니다.
              </p>
              <Link
                href="/map"
                className="mt-4 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#22C55E] py-3.5 text-[15px] font-bold text-white shadow-[0_6px_20px_rgba(59,130,246,0.3)] transition-transform active:scale-[0.98]"
              >
                랜덤 추천받기
              </Link>
            </div>
          </div>
        </section>

        {/* Weather */}
        <section>
          <SectionHeader title="강원 날씨" subtitle="여행 전 날씨를 확인하세요" />
          <HomeWeatherStrip />
        </section>

        {/* AI Assistant */}
        <section>
          <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#15803D] p-6 shadow-[0_12px_40px_rgba(30,64,175,0.25)]">
            <div className="pointer-events-none absolute" />
            <p className="text-[22px] font-bold text-white">
              <span className="mr-1.5">🥔</span>
              감자도리 AI
            </p>
            <p className="mt-3 text-[14px] leading-[1.7] text-white/80">
              여행 스타일, 동행, 일정만 입력하면
              <br />
              AI가 코스를 만들어드립니다.
            </p>
            <Link
              href="/course"
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-white py-4 text-[16px] font-bold text-[#1D4ED8] shadow-[0_6px_24px_rgba(0,0,0,0.15)] transition-transform active:scale-[0.98]"
            >
              AI 여행 시작하기
            </Link>
          </div>
        </section>

        {/* Travel Style */}
        <section>
          <SectionHeader title="AI 여행 스타일" subtitle="나에게 맞는 여행 유형을 선택하세요" />
          <div className="grid grid-cols-2 gap-3.5">
            {travelStyles.map((style) => (
              <Link
                key={style.type}
                href="/course"
                className={`rounded-[22px] border bg-gradient-to-b p-4 text-left transition-transform active:scale-[0.98] ${style.accent} ${style.border} ${style.shadow}`}
              >
                <StyleIllustration type={style.illustration} />
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[15px] font-bold text-[#0F172A]">{style.title}</span>
                  <span
                    className={`rounded-lg px-2 py-0.5 text-[11px] font-bold text-white ${style.badge}`}
                  >
                    {style.type}
                  </span>
                </div>
                <p className="mt-2 text-[12px] leading-[1.6] text-[#64748B]">
                  {style.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation activeTab="home" />
    </div>
  );
}
