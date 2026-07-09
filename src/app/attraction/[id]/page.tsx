import { notFound } from "next/navigation";
import { AttractionDetailContainer } from "@/components/attraction/AttractionDetailContainer";
import {
  getAttractionById,
  getFeaturedAttraction,
  getNearbyAttractions,
} from "@/data/attractions";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ fallback?: string; city?: string }>;
};

function isApiContentId(id: string): boolean {
  return /^\d+$/.test(id);
}

export default async function AttractionPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { fallback: fallbackParam, city: cityParam } = await searchParams;

  let fallback = getAttractionById(id);

  if (!fallback && fallbackParam) {
    fallback = getAttractionById(fallbackParam);
  }

  if (!fallback && isApiContentId(id) && cityParam) {
    fallback = getFeaturedAttraction(cityParam);
  }

  if (!fallback) {
    notFound();
  }

  const nearby = getNearbyAttractions(fallback);
  const contentId = isApiContentId(id) ? id : null;

  return (
    <AttractionDetailContainer
      contentId={contentId}
      searchKeyword={fallback.name}
      fallback={fallback}
      nearby={nearby}
    />
  );
}
