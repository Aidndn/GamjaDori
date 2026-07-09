import { NextResponse } from "next/server";
import { searchPlacesByKeyword } from "@/api/tourApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword")?.trim();
  const limit = Math.min(Number(searchParams.get("limit") ?? "10") || 10, 20);

  if (!keyword) {
    return NextResponse.json(
      { success: false, error: "keyword 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  try {
    const results = await searchPlacesByKeyword(keyword, String(limit));

    return NextResponse.json({
      success: true,
      data: results[0] ?? null,
      results,
      count: results.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "TourAPI 검색 실패";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
