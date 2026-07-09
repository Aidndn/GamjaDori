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
  const suggestAbortRef = useRef<AbortController | null>(null);
  const resultsAbortRef = useRef<AbortController | null>(null);
  const { hydrated, recentSearches, addRecentSearch, removeRecentSearch } = useRecentSearches();

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState<NormalizedTourPlace[]>([]);
  const [results, setResults] = useState<NormalizedTourPlace[]>([]);
  const [suggestChecked, setSuggestChecked] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const fetchSearch = useCallback(async (keyword: string, limit: number, signal?: AbortSignal) => {
    const response = await fetch(
      `/api/tour/search?keyword=${encodeURIComponent(keyword)}&limit=${limit}`,
      { signal },
    );
    const json = (await response.json()) as SearchResponse;
    if (!json.success) {
      throw new Error(json.error ?? "검색에 실패했습니다.");
    }
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
      setSearchError(null);
    },
    [addRecentSearch, router],
  );

  const runSuggest = useCallback(
    async (keyword: string) => {
      suggestAbortRef.current?.abort();
      const controller = new AbortController();
      suggestAbortRef.current = controller;

      setSuggestLoading(true);
      setSearchError(null);
      try {
        const items = await fetchSearch(keyword, SUGGEST_LIMIT, controller.signal);
        if (controller.signal.aborted) return;
        setSuggestions(items);
        setSuggestChecked(true);
      } catch (error) {
        if (controller.signal.aborted) return;
        setSuggestions([]);
        setSuggestChecked(true);
        setSearchError(error instanceof Error ? error.message : "검색에 실패했습니다.");
      } finally {
        if (!controller.signal.aborted) setSuggestLoading(false);
      }
    },
    [fetchSearch],
  );

  const runSubmitSearch = useCallback(
    async (keyword: string) => {
      resultsAbortRef.current?.abort();
      const controller = new AbortController();
      resultsAbortRef.current = controller;

      setResultsLoading(true);
      setSubmitted(true);
      setFocused(false);
      setSearchError(null);
      addRecentSearch(keyword);

      try {
        const items = await fetchSearch(keyword, RESULT_LIMIT, controller.signal);
        if (controller.signal.aborted) return;
        setResults(items);
      } catch (error) {
        if (controller.signal.aborted) return;
        setResults([]);
        setSearchError(error instanceof Error ? error.message : "검색에 실패했습니다.");
      } finally {
        if (!controller.signal.aborted) setResultsLoading(false);
      }
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
      setSearchError(null);
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

  useEffect(() => {
    return () => {
      suggestAbortRef.current?.abort();
      resultsAbortRef.current?.abort();
    };
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
    showSuggestPanel &&
    suggestChecked &&
    !suggestLoading &&
    suggestions.length === 0 &&
    !searchError;

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
            setSearchError(null);
          }}
          onFocus={() => setFocused(true)}
          placeholder="어디로 여행 가고 싶나요?"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none"
          autoComplete="off"
          aria-label="여행지 검색"
        />
        {query.trim() && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => {
              setQuery("");
              setSubmitted(false);
              setResults([]);
              setSuggestions([]);
              setSearchError(null);
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[12px] font-bold text-[#64748B] transition-colors hover:bg-[#E2E8F0]"
          >
            ✕
          </button>
        )}
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

          {showSuggestPanel && searchError && !suggestLoading && (
            <p className="px-4 py-6 text-center text-[13px] font-medium text-[#DC2626]">
              {searchError}
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

          {!resultsLoading && searchError && (
            <p className="rounded-2xl bg-[#FEF2F2] py-6 text-center text-[13px] font-medium text-[#DC2626] ring-1 ring-[#FECACA]">
              {searchError}
            </p>
          )}

          {!resultsLoading && !searchError && results.length === 0 && (
            <p className="rounded-2xl bg-[#F8FAFC] py-6 text-center text-[13px] font-medium text-[#64748B] ring-1 ring-[#F1F5F9]">
              검색 결과가 없어요.
            </p>
          )}

          {!resultsLoading && !searchError && results.length > 0 && (
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
