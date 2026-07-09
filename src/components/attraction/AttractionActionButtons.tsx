"use client";

import { useState } from "react";
import type { TouristAttraction } from "@/types/attraction";
import { Toast } from "@/components/common/Toast";
import { useCourseStore } from "@/hooks/useCourseStore";
import { buttonPrimary, buttonSecondary } from "@/lib/buttonStyles";
import { openMapDirections } from "@/utils/openMapDirections";

type AttractionActionButtonsProps = {
  attraction: TouristAttraction;
};

export function AttractionActionButtons({ attraction }: AttractionActionButtonsProps) {
  const { addAttraction } = useCourseStore();
  const [showToast, setShowToast] = useState(false);

  function handleAddToCourse() {
    addAttraction({
      id: attraction.contentId ?? attraction.id,
      name: attraction.name,
      city: attraction.city,
      image: attraction.image,
      category: attraction.category,
    });
    setShowToast(true);
  }

  function handleOpenDirections() {
    openMapDirections({
      name: attraction.name,
      mapX: attraction.mapX,
      mapY: attraction.mapY,
    });
  }

  return (
    <>
      {showToast && (
        <Toast
          message="도리코스에 추가되었습니다."
          onClose={() => setShowToast(false)}
        />
      )}

      <section className="mt-5 px-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleOpenDirections}
            className={`flex items-center justify-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white py-3.5 text-[14px] font-bold text-[#334155] shadow-[0_2px_12px_rgba(15,23,42,0.04)] ${buttonSecondary}`}
          >
            <span>🗺️</span>
            길찾기
          </button>
          <button
            type="button"
            onClick={handleAddToCourse}
            className={`flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#22C55E] py-3.5 text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(59,130,246,0.25)] ${buttonPrimary}`}
          >
            <span>🥔</span>
            AI 추천 코스에 추가
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-[#94A3B8]">
          {attraction.name}을 도리코스에 담아보세요
        </p>
      </section>
    </>
  );
}
