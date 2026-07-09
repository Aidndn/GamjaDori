"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { gangwonCities } from "@/data/gangwonCities";
import { getFeaturedAttractionId } from "@/data/attractions";
import { FallbackImage } from "@/components/common/FallbackImage";

type PopularCourse = {
  id: string;
  title: string;
  location: string;
  duration: string;
  image: string;
  href: string;
};

function IconStar() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function HomePopularCourses() {
  const [courses, setCourses] = useState<PopularCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const featured = gangwonCities.slice(0, 4);
      const loaded: PopularCourse[] = [];

      for (const city of featured) {
        try {
          const response = await fetch(
            `/api/tour/search?keyword=${encodeURIComponent(city.attractions[0])}`,
          );
          const json = (await response.json()) as {
            success: boolean;
            data?: { contentId: string; title: string; image: string; city: string };
          };

          const fallbackId = getFeaturedAttractionId(city.id);
          const href =
            json.success && json.data?.contentId
              ? `/attraction/${json.data.contentId}?fallback=${fallbackId}&city=${city.id}`
              : `/attraction/${fallbackId}?city=${city.id}`;

          loaded.push({
            id: city.id,
            title: json.data?.title ?? city.attractions[0],
            location: json.data?.city || city.name,
            duration: "1일",
            image: json.data?.image ?? "",
            href,
          });
        } catch {
          const fallbackId = getFeaturedAttractionId(city.id);
          loaded.push({
            id: city.id,
            title: city.attractions[0],
            location: city.name,
            duration: "1일",
            image: "",
            href: `/attraction/${fallbackId}?city=${city.id}`,
          });
        }
      }

      if (!cancelled) {
        setCourses(loaded);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="-mx-5 flex gap-3.5 overflow-x-auto px-5 pb-2">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="h-[180px] w-[172px] shrink-0 animate-pulse rounded-[20px] bg-[#E2E8F0]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="-mx-5 flex gap-3.5 overflow-x-auto px-5 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
      {courses.map((course) => (
        <Link
          key={course.id}
          href={course.href}
          className="w-[172px] shrink-0 overflow-hidden rounded-[20px] bg-white shadow-[0_6px_28px_rgba(15,23,42,0.1)] ring-1 ring-[#F1F5F9]"
        >
          <div className="relative h-[108px]">
            {course.image ? (
              <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3B82F6] to-[#22C55E] text-3xl">
                🏞️
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 backdrop-blur-sm">
              <IconStar />
              <span className="text-[11px] font-bold text-[#0F172A]">TourAPI</span>
            </div>
          </div>
          <div className="space-y-1 p-3.5">
            <h4 className="truncate text-[14px] font-bold leading-snug">{course.title}</h4>
            <p className="text-[12px] text-[#64748B]">{course.location}</p>
            <p className="text-[11px] font-medium text-[#3B82F6]">{course.duration}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
