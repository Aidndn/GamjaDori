"use client";

import Link from "next/link";
import { useState } from "react";

const regions = ["강릉", "속초", "춘천", "평창", "정선", "영월"];
const travelTimes = ["반나절", "하루", "1박 2일"];
const companions = ["혼자", "친구", "연인", "가족"];
const travelStyles = ["계획형 J", "자유형 P"];
const interests = ["맛집", "자연", "역사", "체험", "액티비티", "카페"];

const mockTimeline = [
  { time: "09:30", place: "안목해변" },
  { time: "11:00", place: "강릉 커피거리" },
  { time: "12:30", place: "초당순두부 점심" },
  { time: "14:00", place: "경포호 산책" },
  { time: "16:00", place: "강문해변 일몰" },
];

const navItems = [
  { label: "홈", active: false, icon: "home", href: "/" },
  { label: "코스", active: true, icon: "course", href: "/dori" },
  { label: "지도", active: false, icon: "map", href: "/map" },
  { label: "찜", active: false, icon: "heart", href: "#" },
  { label: "마이", active: false, icon: "user", href: "#" },
];

function NavIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? "text-[#3B82F6]" : "text-[#94A3B8]";

  if (type === "home") {
    return (
      <svg className={color} width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "course") {
    return (
      <svg className={color} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "map") {
    return (
      <svg className={color} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6" strokeLinejoin="round" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    );
  }
  if (type === "heart") {
    return (
      <svg className={color} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={color} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SelectSection({
  title,
  options,
  selected,
  onSelect,
  multi = false,
}: {
  title: string;
  options: string[];
  selected: string | string[];
  onSelect: (value: string) => void;
  multi?: boolean;
}) {
  const isSelected = (option: string) =>
    multi ? (selected as string[]).includes(option) : selected === option;

  return (
    <section className="rounded-[22px] bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.05)] ring-1 ring-[#F1F5F9]">
      <h3 className="mb-3 text-[15px] font-bold text-[#0F172A]">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all ${
              isSelected(option)
                ? "bg-gradient-to-r from-[#3B82F6] to-[#22C55E] text-white shadow-[0_4px_14px_rgba(59,130,246,0.25)]"
                : "bg-[#F8FAFC] text-[#64748B] ring-1 ring-[#E2E8F0] hover:bg-[#EFF6FF] hover:text-[#3B82F6]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}

export default function DoriPage() {
  const [region, setRegion] = useState("강릉");
  const [travelTime, setTravelTime] = useState("하루");
  const [companion, setCompanion] = useState("연인");
  const [travelStyle, setTravelStyle] = useState("계획형 J");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["맛집", "카페"]);
  const [showResult, setShowResult] = useState(true);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest],
    );
  };

  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-white font-sans text-[#0F172A]">
      <header className="sticky top-0 z-20 bg-white/80 px-5 pb-4 pt-12 backdrop-blur-xl">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-[13px] font-medium text-[#64748B] transition-colors hover:text-[#3B82F6]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          홈으로
        </Link>
        <h1 className="text-[24px] font-bold tracking-tight">
          <span className="mr-1.5">🥔</span>
          도리코스 생성
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">
          여행 스타일과 취향을 선택하면 감자도리가 강원도 여행길을 추천해드려요.
        </p>
      </header>

      <main className="space-y-4 px-5 pb-32 pt-2">
        <SelectSection title="지역 선택" options={regions} selected={region} onSelect={setRegion} />
        <SelectSection title="여행 시간" options={travelTimes} selected={travelTime} onSelect={setTravelTime} />
        <SelectSection title="동행 유형" options={companions} selected={companion} onSelect={setCompanion} />
        <SelectSection title="여행 스타일" options={travelStyles} selected={travelStyle} onSelect={setTravelStyle} />
        <SelectSection
          title="관심 테마"
          options={interests}
          selected={selectedInterests}
          onSelect={toggleInterest}
          multi
        />

        <button
          type="button"
          onClick={() => setShowResult(true)}
          className="w-full rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#22C55E] py-4 text-[16px] font-bold text-white shadow-[0_8px_28px_rgba(59,130,246,0.3)] transition-transform active:scale-[0.98]"
        >
          🥔 도리코스 생성하기
        </button>

        {showResult && (
          <section className="mt-6 overflow-hidden rounded-[24px] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.1)] ring-1 ring-[#E0F2FE]">
            <div className="bg-gradient-to-r from-[#EFF6FF] to-[#F0FDF4] px-5 py-4">
              <span className="inline-block rounded-full bg-[#3B82F6] px-2.5 py-0.5 text-[11px] font-bold text-white">
                AI 추천
              </span>
              <h2 className="mt-2 text-[18px] font-bold leading-snug">
                감자도리가 추천한 {region} {travelTime} 코스
              </h2>
            </div>

            <div className="space-y-0 px-5 py-4">
              {mockTimeline.map((item, index) => (
                <div key={item.place} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-3 w-3 shrink-0 rounded-full ${
                        index === 0
                          ? "bg-[#3B82F6]"
                          : index === mockTimeline.length - 1
                            ? "bg-[#22C55E]"
                            : "bg-[#93C5FD]"
                      }`}
                    />
                    {index < mockTimeline.length - 1 && (
                      <div className="my-1 w-0.5 flex-1 min-h-[36px] bg-gradient-to-b from-[#93C5FD] to-[#86EFAC]" />
                    )}
                  </div>
                  <div className={`pb-5 ${index === mockTimeline.length - 1 ? "pb-0" : ""}`}>
                    <p className="text-[12px] font-semibold text-[#3B82F6]">{item.time}</p>
                    <p className="mt-0.5 text-[15px] font-bold text-[#0F172A]">{item.place}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-[#F1F5F9] bg-[#F8FAFC] px-5 py-4">
              <p className="text-[13px] text-[#475569]">
                <span className="font-semibold text-[#0F172A]">예상 소요시간:</span> 7시간
              </p>
              <p className="text-[13px] text-[#475569]">
                <span className="font-semibold text-[#0F172A]">추천 스타일:</span> {travelStyle}
              </p>
              <p className="text-[13px] leading-relaxed text-[#475569]">
                <span className="font-semibold text-[#0F172A]">추천 이유:</span> 바다, 카페, 맛집을
                균형 있게 즐길 수 있어요.
              </p>
            </div>
          </section>
        )}
      </main>

      <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-[#F1F5F9] bg-white/90 px-2 pb-7 pt-2.5 backdrop-blur-xl">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="relative flex flex-col items-center gap-1 px-3 py-1">
                {item.active && (
                  <span className="absolute -top-1 h-1 w-5 rounded-full bg-[#3B82F6]" />
                )}
                <NavIcon type={item.icon} active={item.active} />
                <span
                  className={`text-[11px] font-semibold ${
                    item.active ? "text-[#3B82F6]" : "text-[#94A3B8]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
