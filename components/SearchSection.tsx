"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { tools } from "@/config/tools";

const TAGS = ["Word Counter", "QR Generator", "Image Compressor", "Case Converter", "Color Picker", "Reading Time"];

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? tools.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function handleSelect(slug: string) {
    setQuery("");
    router.push(`/tools/${slug}`);
  }

  return (
    <section id="search-section" className="bg-gradient-to-br from-primary to-primary-hover py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>Find the Right Tool</h2>
        <p className="text-white/70 mb-8 text-sm">Search from 100+ tools instantly — no browsing required.</p>

        <div className="relative max-w-xl mx-auto mb-6">
          <div className="flex bg-white rounded-xl overflow-hidden shadow-lg">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for a tool..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 px-5 py-4 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            <button className="bg-primary hover:bg-primary-hover px-5 text-white transition-colors" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </div>

          {query.trim() && (
            <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl overflow-hidden z-50 max-h-72 overflow-y-auto">
              {results.length > 0 ? results.map(t => (
                <li key={t.slug}>
                  <button onClick={() => handleSelect(t.slug)}
                    className="flex items-center gap-3 w-full px-5 py-3 text-left hover:bg-violet-50 transition-colors">
                    <span className="text-xl">{t.icon}</span>
                    <span>
                      <span className="block text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>{t.name}</span>
                      <span className="block text-xs text-gray-400">{t.description}</span>
                    </span>
                  </button>
                </li>
              )) : (
                <li className="px-5 py-4 text-sm text-gray-400 text-center">No tools found for &quot;{query}&quot;</li>
              )}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {TAGS.map(tag => (
            <button key={tag} onClick={() => { setQuery(tag); inputRef.current?.focus(); }}
              className="text-xs font-medium text-white border border-white/30 bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
