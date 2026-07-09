import { notFound } from "next/navigation";
import { AttractionDetailContainer } from "@/components/attraction/AttractionDetailContainer";
import {
  getAttractionById,
  getFeaturedAttraction,
  getNearbyAttractions,
} from "@/data/attractions";
import { createApiFallback } from "@/utils/apiFallback";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    fallback?: string;
    city?: string;
    title?: string;
    contentTypeId?: string;
  }>;
};

function isApiContentId(id: string): boolean {
  return /^\d+$/.test(id);
}

export default async function AttractionPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const {
    fallback: fallbackParam,
    city: cityParam,
    title: titleParam,
  } = await searchParams;

  let fallback = getAttractionById(id);

  if (!fallback && fallbackParam) {
    fallback = getAttractionById(fallbackParam);
  }

  if (!fallback && isApiContentId(id) && cityParam) {
    fallback = getFeaturedAttraction(cityParam);
  }

  if (!fallback && isApiContentId(id)) {
    fallback = createApiFallback(id, { title: titleParam, cityId: cityParam });
  }

  if (!fallback) {
    notFound();
  }

  const nearby = getNearbyAttractions(fallback);
  const contentId = isApiContentId(id) ? id : null;
  const searchKeyword = titleParam ?? fallback.name;

  return (
    <AttractionDetailContainer
      contentId={contentId}
      searchKeyword={searchKeyword}
      fallback={fallback}
      nearby={nearby}
    />
  );
}
