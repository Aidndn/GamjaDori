import { NextResponse } from "next/server";
import { searchTourByKeyword } from "@/api/tourApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) {
    return NextResponse.json(
      { success: false, error: "keyword 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  try {
    const results = await searchTourByKeyword(keyword);

    if (results.length === 0) {
      return NextResponse.json({
        success: false,
        error: `"${keyword}" 검색 결과가 없습니다.`,
      });
    }

    return NextResponse.json({
      success: true,
      data: results[0],
      results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "TourAPI 검색 실패";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
