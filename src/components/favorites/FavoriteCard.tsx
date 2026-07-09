import Link from "next/link";
import type { FavoriteAttraction } from "@/types/favorite";
import { FallbackImage } from "@/components/common/FallbackImage";
import { truncateDescription, buildAttractionHref } from "@/utils/favorites";
import { buttonPrimary } from "@/lib/buttonStyles";

type FavoriteCardProps = {
  favorite: FavoriteAttraction;
};

export function FavoriteCard({ favorite }: FavoriteCardProps) {
  const detailHref = buildAttractionHref(favorite.id, favorite.city);

  return (
    <article className="overflow-hidden rounded-[24px] bg-white shadow-[0_4px_24px_rgba(59,130,246,0.08)] ring-1 ring-[#E0F2FE]">
      <div className="relative h-[160px]">
        <FallbackImage
          src={favorite.image}
          alt={favorite.name}
          className="h-full w-full object-cover"
          containerClassName="h-full w-full"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#3B82F6] backdrop-blur-sm">
          {favorite.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-[18px] font-bold leading-tight text-[#0F172A]">{favorite.name}</h3>
        <p className="mt-1.5 text-[13px] font-medium text-[#64748B]">
          📍 {favorite.city}
          {favorite.address ? ` · ${favorite.address}` : ""}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[#64748B]">
          {truncateDescription(favorite.description)}
        </p>
        <Link
          href={detailHref}
          className={`mt-4 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#3B82F6] to-[#22C55E] py-3.5 text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(59,130,246,0.25)] ${buttonPrimary}`}
        >
          상세보기
        </Link>
      </div>
    </article>
  );
}
