"use client";

import { useRouter } from "next/navigation";
import type { TouristAttraction } from "@/types/attraction";
import { useCourseStore } from "@/hooks/useCourseStore";
import { buttonPrimary } from "@/lib/buttonStyles";

type StartTripButtonProps = {
  attraction: TouristAttraction;
};

export function StartTripButton({ attraction }: StartTripButtonProps) {
  const router = useRouter();
  const { addAttraction } = useCourseStore();

  function handleStart() {
    const id = attraction.contentId ?? attraction.id;
    addAttraction(
      {
        id,
        name: attraction.name,
        city: attraction.city,
        image: attraction.image,
        category: attraction.category,
      },
      true,
    );

    router.push("/course?generate=1");
  }

  return (
    <button
      type="button"
      onClick={handleStart}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#22C55E] py-4 text-[16px] font-bold text-white shadow-[0_8px_28px_rgba(59,130,246,0.3)] ${buttonPrimary}`}
    >
      <span>🥔</span>
      여행 시작하기
    </button>
  );
}
