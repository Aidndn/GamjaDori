"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TouristAttraction } from "@/types/attraction";
import { FallbackImage } from "@/components/common/FallbackImage";
import { linkCard } from "@/lib/buttonStyles";
import { StarRating } from "./StarRating";

type NearbyAttractionsProps = {
  attractions: TouristAttraction[];
};

export function NearbyAttractions({ attractions }: NearbyAttractionsProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = window.setTimeout(() => setVisible(true), 100);
    return () => window.clearTimeout(timer);
  }, [attractions]);

  if (attractions.length === 0) return null;

  return (
    <section
      className={`mt-6 px-5 transition-all duration-400 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <h2 className="text-[17px] font-bold text-[#0F172A]">주변 명소</h2>
      <p className="mt-1 text-[13px] text-[#64748B]">함께 방문하면 좋은 곳</p>

      <div className="mt-3 space-y-3">
        {attractions.map((item) => (
          <Link
            key={item.id}
            href={`/attraction/${item.contentId ?? item.id}?city=${item.cityId}`}
            className={`flex items-center gap-3.5 overflow-hidden rounded-[20px] bg-white p-3 shadow-[0_4px_20px_rgba(15,23,42,0.06)] ring-1 ring-[#F1F5F9] ${linkCard}`}
          >
            <FallbackImage
              src={item.image}
              alt={item.name}
              className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover"
              containerClassName="h-[72px] w-[72px] shrink-0 rounded-2xl"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold text-[#0F172A]">{item.name}</p>
              <p className="mt-0.5 text-[12px] text-[#64748B]">{item.city} · {item.category}</p>
              <div className="mt-1">
                <StarRating rating={item.rating} />
              </div>
            </div>
            <svg className="shrink-0 text-[#CBD5E1]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
