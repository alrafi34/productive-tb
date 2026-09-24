"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Tool } from "@/config/tools";
import { searchTools } from "@/lib/search-tools";

const MAX_RESULTS = 8;

type Catalogue = { tools: Tool[]; categoryName: Map<string, string> };

/* Loaded on first open, not at page load: the header renders on every page,
   and a static import would ship the full catalogue with each of them.
   Kept at module scope so reopening the dialog does not refetch it. */
let cataloguePromise: Promise<Catalogue> | null = null;
function loadCatalogue(): Promise<Catalogue> {
  cataloguePromise ??= import("@/config/tools").then(({ tools, categories }) => ({
    tools,
    categoryName: new Map(categories.map(c => [c.slug, c.name])),
  }));
  return cataloguePromise;
}

type Props = {
  open: boolean;
  onClose: () => void;
  totalTools: number;
};

export default function SearchDialog({ open, onClose, totalTools }: Props) {
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    let cancelled = false;
    loadCatalogue().then(c => { if (!cancelled) setCatalogue(c); });

    /* Stop the page behind the dialog from scrolling. */
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelled = true;
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const { results, matchCount } = useMemo(
    () => (catalogue ? searchTools(catalogue.tools, query, MAX_RESULTS) : { results: [], matchCount: 0 }),
    [catalogue, query]
  );

  if (!open) return null;

  function close() {
    setQuery("");
    setActive(0);
    onClose();
  }

  function go(tool: Tool) {
    close();
    router.push(`/tools/${tool.category}/${tool.slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
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
    }
  }

  const hasQuery = query.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-900/40 backdrop-blur-sm px-4 pt-[12vh]"
      onMouseDown={e => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search tools"
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 border-b border-slate-100">
          <svg className="w-5 h-5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={hasQuery}
            aria-controls="header-search-results"
            aria-label={`Search ${totalTools} tools`}
            placeholder={`Search ${totalTools} tools…`}
            value={query}
            onChange={e => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onKeyDown}
            className="flex-1 min-w-0 py-4 text-[15px] text-slate-900 bg-transparent outline-none placeholder:text-slate-400"
          />
          <kbd className="hidden sm:flex shrink-0 items-center px-2 h-6 text-[11px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
            Esc
          </kbd>
        </div>

        {hasQuery && (
          <div id="header-search-results" role="listbox">
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
                        className={`flex items-center gap-3.5 w-full px-4 py-2.5 text-left transition-colors ${i === active ? "bg-primary/5" : ""}`}
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
                <Link href="/tools" onClick={close} className="inline-block mt-2 text-sm font-semibold text-primary hover:underline">
                  Browse all {totalTools} tools →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
