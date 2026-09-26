"use client";

import { useEffect, useMemo, useState } from "react";
import {
  EmojiData,
  EmojiRow,
  SKIN_TONES,
  withSkinTone,
  searchEmoji,
  codePoints,
  htmlEntity,
  shortcode,
  loadRecent,
  saveRecent,
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import RelatedStrip from "@/components/RelatedStrip";

const GROUP_ICONS = ["😀", "👋", "🐶", "🍕", "✈️", "⚽", "💡", "❤️", "🏁"];

export default function EmojiSearchCopyUI() {
  const [data, setData] = useState<EmojiData | null>(null);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<number | null>(null);
  const [tone, setTone] = useState(0);
  const [selected, setSelected] = useState<EmojiRow | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  // The emoji list (≈48 KB gzipped) loads with the page's JavaScript, not the HTML
  useEffect(() => {
    let alive = true;
    import("./emoji-data.json").then((mod) => {
      if (alive) setData(mod.default as unknown as EmojiData);
    });
    const frame = window.requestAnimationFrame(() => setRecent(loadRecent()));
    return () => {
      alive = false;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const results = useMemo(() => (data ? searchEmoji(data, query, group) : []), [data, query, group]);
  const modifier = SKIN_TONES[tone].modifier;
  const display = (row: EmojiRow) => (row[4] ? withSkinTone(row[0], modifier) : row[0]);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setToast(`Copied ${label}`);
    setTimeout(() => setToast(""), 1500);
  };

  const pick = (row: EmojiRow) => {
    const e = display(row);
    setSelected(row);
    copy(e, e);
    const next = [e, ...recent.filter((r) => r !== e)].slice(0, 24);
    setRecent(next);
    saveRecent(next);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search emoji: heart, laugh, pizza, flag…"
            aria-label="Search emoji"
            className="flex-1 px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white text-base"
            autoFocus
          />
          <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Skin tone">
            {SKIN_TONES.map((t, i) => (
              <button
                key={t.label}
                role="radio"
                aria-checked={tone === i}
                aria-label={`${t.label} skin tone`}
                title={`${t.label} skin tone`}
                onClick={() => setTone(i)}
                className={`w-7 h-7 rounded-full border-2 ${tone === i ? "border-gray-900 scale-110" : "border-white shadow"}`}
                style={{ background: t.swatch }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Emoji categories">
          <button
            role="tab"
            aria-selected={group === null}
            onClick={() => setGroup(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap ${group === null ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            All
          </button>
          {data?.groups.map((g, i) => (
            <button
              key={g}
              role="tab"
              aria-selected={group === i}
              onClick={() => setGroup(i)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap ${group === i ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {GROUP_ICONS[i] ?? ""} {g}
            </button>
          ))}
        </div>

        {recent.length > 0 && !query && group === null && (
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Recently copied</p>
            <div className="flex flex-wrap gap-1">
              {recent.map((e) => (
                <button key={e} onClick={() => copy(e, e)} className="text-2xl w-10 h-10 rounded-lg hover:bg-gray-100" aria-label={`Copy ${e}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500">
          {data ? `${results.length.toLocaleString()} emoji` : "Loading emoji…"} · click an emoji to copy it
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(2.75rem,1fr))] gap-1 max-h-[28rem] overflow-y-auto">
          {results.map((row) => (
            <button
              key={row[0]}
              onClick={() => pick(row)}
              title={row[1]}
              aria-label={`Copy ${row[1]}`}
              className={`text-3xl h-11 rounded-lg hover:bg-gray-100 transition-colors ${selected?.[0] === row[0] ? "bg-primary/10 ring-2 ring-primary/40" : ""}`}
            >
              {display(row)}
            </button>
          ))}
          {data && results.length === 0 && (
            <p className="col-span-full text-sm text-gray-500 py-6 text-center">No emoji match “{query}”. Try a simpler word such as “cat” or “smile”.</p>
          )}
        </div>

        {selected && (
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-6xl" aria-hidden="true">{display(selected)}</span>
            <div className="flex-1 space-y-2 min-w-0">
              <p className="font-semibold text-gray-900 capitalize">{selected[1]}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {([
                  ["Emoji", display(selected)],
                  ["Shortcode", shortcode(selected[1])],
                  ["Unicode", codePoints(display(selected))],
                  ["HTML", htmlEntity(display(selected))],
                ] as [string, string][]).map(([label, value]) => (
                  <button
                    key={label}
                    onClick={() => copy(value, label.toLowerCase())}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-primary font-mono text-gray-700 max-w-full truncate"
                    title={`Copy ${label}`}
                  >
                    <span className="font-sans font-semibold text-gray-500 mr-1">{label}:</span>{value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-gray-900 text-white text-sm shadow-lg">
          ✅ {toast}
        </div>
      )}

      <RelatedStrip />
      <ToolSEOContent />
      <div className="mt-12">
        <RelatedTools />
      </div>
    </div>
  );
}
