import { NextResponse } from "next/server";
import {
  getTourDetail,
  getTourIntro,
  searchTourByKeyword,
} from "@/api/tourApi";
import type { NormalizedTourPlace } from "@/types/tour";

async function resolveContentId(
  contentId: string | null,
  keyword: string | null,
): Promise<string | null> {
  if (contentId) return contentId;

  if (!keyword) return null;

  const results = await searchTourByKeyword(keyword);
  return results[0]?.contentId ?? null;
}

async function enrichWithIntro(detail: NormalizedTourPlace): Promise<NormalizedTourPlace> {
  try {
    const intro = await getTourIntro(detail.contentId, detail.contentTypeId);
    if (!intro) return detail;

    const usetime = intro.usetime?.trim() ?? "";
    const restdate = intro.restdate?.trim() ?? "";
    const openingHours = [usetime, restdate].filter(Boolean).join(" · ");

    return {
      ...detail,
      openingHours: openingHours || detail.openingHours,
      phone: detail.phone || intro.infocenter?.trim() || detail.phone,
    };
  } catch {
    return detail;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contentIdParam = searchParams.get("contentId");
  const keyword = searchParams.get("keyword");

  try {
    const resolvedContentId = await resolveContentId(contentIdParam, keyword);

    if (!resolvedContentId) {
      return NextResponse.json({
        success: false,
        error: keyword
          ? `"${keyword}" 검색 결과가 없습니다.`
          : "contentId 또는 keyword가 필요합니다.",
      });
    }

    const detail = await getTourDetail(resolvedContentId);

    if (!detail) {
      return NextResponse.json({
        success: false,
        error: "관광지 상세 정보를 찾을 수 없습니다.",
      });
    }

    const enriched = await enrichWithIntro(detail);

    return NextResponse.json({
      success: true,
      data: enriched,
      contentId: resolvedContentId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "TourAPI 상세 조회 실패";
    console.error("Tour API detail error:", message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
