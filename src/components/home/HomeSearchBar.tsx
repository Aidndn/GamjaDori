"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FallbackImage } from "@/components/common/FallbackImage";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { linkCard } from "@/lib/buttonStyles";
import type { NormalizedTourPlace } from "@/types/tour";
import { buildAttractionHref } from "@/utils/favorites";

const DEBOUNCE_MS = 350;
const SUGGEST_LIMIT = 5;
const RESULT_LIMIT = 10;

type SearchResponse = {
  success: boolean;
  results?: NormalizedTourPlace[];
  error?: string;
};

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function SearchResultItem({
  place,
  onSelect,
}: {
  place: NormalizedTourPlace;
  onSelect: (place: NormalizedTourPlace) => void;
}) {
  const location = place.city
    ? `${place.city}${place.address ? ` · ${place.address}` : ""}`
    : place.address;

  return (
    <button
      type="button"
      onClick={() => onSelect(place)}
      className={`flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-[0_2px_12px_rgba(15,23,42,0.04)] ring-1 ring-[#F1F5F9] ${linkCard}`}
    >
      <FallbackImage
        src={place.image}
        alt={place.title}
        className="h-14 w-14 shrink-0 rounded-2xl object-cover"
        containerClassName="h-14 w-14 shrink-0 rounded-2xl"
        fallbackEmoji="🏞️"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-bold text-[#0F172A]">{place.title}</p>
        <p className="mt-0.5 truncate text-[12px] text-[#64748B]">{location}</p>
        <span className="mt-1.5 inline-block rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#3B82F6]">
          {place.category}
        </span>
      </div>
      <span className="shrink-0 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#22C55E] px-3 py-1.5 text-[11px] font-bold text-white">
        상세
      </span>
    </button>
  );
}

export function HomeSearchBar() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { hydrated, recentSearches, addRecentSearch, removeRecentSearch } = useRecentSearches();

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState<NormalizedTourPlace[]>([]);
  const [results, setResults] = useState<NormalizedTourPlace[]>([]);
  const [suggestChecked, setSuggestChecked] = useState(false);

  const fetchSearch = useCallback(async (keyword: string, limit: number) => {
    const response = await fetch(
      `/api/tour/search?keyword=${encodeURIComponent(keyword)}&limit=${limit}`,
    );
    const json = (await response.json()) as SearchResponse;
    if (!json.success) return [];
    return json.results ?? [];
  }, []);

  const navigateToPlace = useCallback(
    (place: NormalizedTourPlace) => {
      addRecentSearch(place.title);
      const href = buildAttractionHref(
        place.contentId,
        place.city,
        place.contentTypeId,
        place.title,
      );
      router.push(href);
      setFocused(false);
      setSubmitted(false);
      setSuggestions([]);
      setResults([]);
    },
    [addRecentSearch, router],
  );

  const runSuggest = useCallback(
    async (keyword: string) => {
      setSuggestLoading(true);
      const items = await fetchSearch(keyword, SUGGEST_LIMIT);
      setSuggestions(items);
      setSuggestChecked(true);
      setSuggestLoading(false);
    },
    [fetchSearch],
  );

  const runSubmitSearch = useCallback(
    async (keyword: string) => {
      setResultsLoading(true);
      setSubmitted(true);
      setFocused(false);
      addRecentSearch(keyword);

      const items = await fetchSearch(keyword, RESULT_LIMIT);
      setResults(items);
      setResultsLoading(false);
    },
    [addRecentSearch, fetchSearch],
  );

  useEffect(() => {
    if (!focused || submitted) return;

    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setSuggestChecked(false);
      setSuggestLoading(false);
      return;
    }

    setSuggestChecked(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      runSuggest(trimmed);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, focused, submitted, runSuggest]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!sectionRef.current?.contains(event.target as Node)) {
        setFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setSuggestions([]);
    runSubmitSearch(trimmed);
  }

  function handleRecentSelect(keyword: string) {
    setQuery(keyword);
    runSubmitSearch(keyword);
  }

  const showDropdown = focused && !submitted;
  const showRecent = showDropdown && hydrated && !query.trim() && recentSearches.length > 0;
  const showSuggestPanel = showDropdown && !!query.trim();
  const showSuggestEmpty =
    showSuggestPanel && suggestChecked && !suggestLoading && suggestions.length === 0;

  return (
    <section ref={sectionRef} className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 rounded-2xl border border-[#E8EDF3] bg-[#F8FAFC] px-4 py-4 shadow-[0_2px_16px_rgba(15,23,42,0.04)] transition-all focus-within:border-[#93C5FD] focus-within:bg-white focus-within:shadow-[0_4px_24px_rgba(59,130,246,0.1)]"
      >
        <span className="shrink-0 text-[#94A3B8]">
          <IconSearch />
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSubmitted(false);
            setResults([]);
          }}
          onFocus={() => setFocused(true)}
          placeholder="어디로 여행 가고 싶나요?"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none"
          autoComplete="off"
          aria-label="여행지 검색"
        />
        <button
          type="button"
          aria-label="음성 검색"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#3B82F6] transition-colors hover:bg-[#DBEAFE]"
        >
          <IconMic />
        </button>
      </form>

      {showDropdown && (showRecent || showSuggestPanel) && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-[#E0F2FE] bg-white shadow-[0_12px_40px_rgba(59,130,246,0.15)] ring-1 ring-[#F1F5F9]">
          {showRecent && (
            <div className="p-3">
              <p className="px-1 text-[11px] font-bold tracking-wide text-[#94A3B8]">최근 검색</p>
              <ul className="mt-2 space-y-1">
                {recentSearches.map((keyword) => (
                  <li key={keyword} className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleRecentSelect(keyword)}
                      className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium text-[#334155] transition-colors hover:bg-[#F8FAFC]"
                    >
                      <span className="text-[#94A3B8]">
                        <IconClock />
                      </span>
                      <span className="truncate">{keyword}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeRecentSearch(keyword)}
                      aria-label={`${keyword} 삭제`}
                      className="shrink-0 rounded-lg px-2 py-1 text-[11px] text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#64748B]"
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showSuggestPanel && suggestLoading && (
            <p className="px-4 py-6 text-center text-[13px] font-medium text-[#64748B]">
              검색 중...
            </p>
          )}

          {showSuggestEmpty && (
            <p className="px-4 py-6 text-center text-[13px] font-medium text-[#64748B]">
              검색 결과가 없어요.
            </p>
          )}

          {showSuggestPanel && !suggestLoading && suggestions.length > 0 && (
            <div className="max-h-[280px] overflow-y-auto p-3">
              <p className="px-1 pb-2 text-[11px] font-bold tracking-wide text-[#94A3B8]">
                추천 검색
              </p>
              <ul className="space-y-2">
                {suggestions.map((place) => (
                  <li key={`suggest-${place.contentId}`}>
                    <SearchResultItem place={place} onSelect={navigateToPlace} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {submitted && (
        <div className="mt-3 space-y-2">
          {resultsLoading && (
            <p className="py-4 text-center text-[13px] font-medium text-[#64748B]">
              검색 중...
            </p>
          )}

          {!resultsLoading && results.length === 0 && (
            <p className="rounded-2xl bg-[#F8FAFC] py-6 text-center text-[13px] font-medium text-[#64748B] ring-1 ring-[#F1F5F9]">
              검색 결과가 없어요.
            </p>
          )}

          {!resultsLoading && results.length > 0 && (
            <>
              <p className="text-[12px] font-semibold text-[#64748B]">
                &quot;{query.trim()}&quot; 검색 결과 {results.length}건
              </p>
              <ul className="space-y-2">
                {results.map((place) => (
                  <li key={`result-${place.contentId}`}>
                    <SearchResultItem place={place} onSelect={navigateToPlace} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
}
