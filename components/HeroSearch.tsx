"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Tool } from "@/config/tools";
import { searchTools } from "@/lib/search-tools";
import { loadCatalogue, type Catalogue } from "@/lib/tool-catalogue";

/* The five tools with the most search clicks (GSC, six months to 2026-09-21).
   The previous picks were guesses — torque-calculator had no impressions at
   all and is now noindexed — so revisit this list from data, not intuition. */
const QUICK_LINKS = [
  { slug: "plot-division-calculator", category: "land", label: "Plot Division" },
  { slug: "escalation-cost-calculator", category: "architecture", label: "Escalation Cost" },
  { slug: "parking-space-calculator", category: "architecture", label: "Parking Space" },
  { slug: "shadow-length-calculator", category: "architecture", label: "Shadow Length" },
  { slug: "decimal-land-calculator", category: "land", label: "Decimal Land" },
];

const MAX_RESULTS = 8;

export default function HeroSearch({ totalTools }: { totalTools: number }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);

  /* The tool list is fetched when the search is about to be used (hover,
     touch or focus), not with the page, so visitors who never search do
     not download and run it. */
  function prepare() {
    if (!catalogue) loadCatalogue().then(setCatalogue);
  }

  const { results, matchCount } = useMemo(
    () => (catalogue ? searchTools(catalogue.tools, query, MAX_RESULTS) : { results: [], matchCount: 0 }),
    [catalogue, query]
  );

  /* "/" focuses search from anywhere on the page */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Click outside closes the result panel */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function go(tool: Tool) {
    setOpen(false);
    setQuery("");
    router.push(`/tools/${tool.category}/${tool.slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(i => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(i => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === "Escape") {
      setQuery("");
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  const showPanel = open && query.trim().length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto" ref={wrapRef}>
      <div className="relative" onPointerEnter={prepare} onTouchStart={prepare}>
        <div
          className={`flex items-center gap-3 bg-white border-2 rounded-2xl pl-5 pr-2 py-2 transition-all duration-200 ${
            showPanel
              ? "border-primary shadow-lg shadow-primary/10"
              : "border-slate-200 shadow-sm hover:border-slate-300"
          }`}
        >
          <svg
            className="w-5 h-5 text-slate-400 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={showPanel}
            aria-controls="hero-search-results"
            aria-label={`Search ${totalTools} tools`}
            placeholder="Search voltage drop, beam load, word counter…"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setActive(0);
              setOpen(true);
            }}
            onFocus={() => {
              prepare();
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
            className="flex-1 min-w-0 py-2.5 text-[15px] text-slate-900 bg-transparent outline-none placeholder:text-slate-400"
          />

          {query ? (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="shrink-0 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : (
            <kbd className="hidden sm:flex shrink-0 items-center justify-center w-7 h-7 mr-1 text-[11px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
              /
            </kbd>
          )}
        </div>

        {/* Results */}
        {showPanel && (
          <div
            id="hero-search-results"
            role="listbox"
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-900/10 overflow-hidden z-50 text-left"
          >
            {!catalogue ? (
              <p className="px-5 py-8 text-center text-sm text-slate-500">Loading tools…</p>
            ) : results.length > 0 ? (
              <>
                <ul className="max-h-[22rem] overflow-y-auto py-1.5">
                  {results.map((tool, i) => (
                    <li key={tool.slug}>
                      <button
                        role="option"
                        aria-selected={i === active}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(tool)}
                        className={`flex items-center gap-3.5 w-full px-4 py-2.5 text-left transition-colors ${
                          i === active ? "bg-primary/5" : ""
                        }`}
                      >
                        <span className="w-9 h-9 shrink-0 flex items-center justify-center text-lg bg-slate-50 border border-slate-100 rounded-lg">
                          {tool.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-slate-900 truncate" style={{ fontFamily: "var(--font-heading)" }}>
                            {tool.name}
                          </span>
                          <span className="block text-xs text-slate-500 truncate">{tool.description}</span>
                        </span>
                        <span className="hidden sm:block shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {catalogue.categoryName.get(tool.category) ?? tool.category}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                {matchCount > results.length && (
                  <div className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500">
                    Showing {results.length} of <strong className="text-slate-700">{matchCount}</strong> matches — keep typing to narrow down
                  </div>
                )}
              </>
            ) : (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-slate-600">
                  No tool matches <strong className="text-slate-900">&ldquo;{query}&rdquo;</strong>
                </p>
                <Link href="/tools" className="inline-block mt-2 text-sm font-semibold text-primary hover:underline">
                  Browse all {totalTools} tools →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
        <span className="text-xs text-slate-500 mr-1">Popular:</span>
        {QUICK_LINKS.map(q => (
          <Link
            key={q.slug}
            href={`/tools/${q.category}/${q.slug}`}
            className="text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:border-primary hover:text-primary px-3 py-1.5 rounded-full transition-colors"
          >
            {q.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
