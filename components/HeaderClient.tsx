"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import SearchDialog from "@/components/SearchDialog";

export type HeaderCategory = { slug: string; name: string; icon: string; count: number };

const NAV = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SearchIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function HeaderClient({ categories, totalTools }: { categories: HeaderCategory[]; totalTools: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  /* Close every panel on navigation. Done during render rather than in an
     effect, so the stale panel never paints on the new page. */
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setCategoriesOpen(false);
    setSearchOpen(false);
  }

  /* Ctrl/⌘+K opens search anywhere. "/" does too, except on the homepage,
     where the hero search already owns that shortcut. */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement ||
        el instanceof HTMLSelectElement || (el as HTMLElement | null)?.isContentEditable;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "/" && !typing && !isHomePage) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setCategoriesOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isHomePage]);

  /* Click outside closes the categories panel. */
  useEffect(() => {
    if (!categoriesOpen) return;
    function onClick(e: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) setCategoriesOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [categoriesOpen]);

  function openSearch() {
    setMenuOpen(false);
    setSearchOpen(true);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 md:px-0 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary" style={{ fontFamily: "var(--font-heading)" }}>
          <img src="/favicon.svg" alt="" className="w-7 h-7" />
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.slice(0, 2).map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
              {label}
            </Link>
          ))}

          <div className="relative" ref={categoriesRef}>
            <button
              onClick={() => setCategoriesOpen(o => !o)}
              aria-expanded={categoriesOpen}
              aria-controls="header-categories"
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Categories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                className={`transition-transform ${categoriesOpen ? "rotate-180" : ""}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {categoriesOpen && (
              <div
                id="header-categories"
                className="absolute right-0 top-full mt-3 w-[36rem] bg-white border border-gray-100 rounded-2xl shadow-xl shadow-slate-900/10 p-3 grid grid-cols-2 gap-0.5 animate-fade-in-up"
              >
                {categories.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/tools/${cat.slug}`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-violet-50 hover:text-primary transition-colors"
                  >
                    <span className="text-base leading-none" aria-hidden="true">{cat.icon}</span>
                    <span className="flex-1 min-w-0 leading-snug">{cat.name}</span>
                    <span className="text-[11px] font-semibold text-gray-400 tabular-nums">{cat.count}</span>
                  </Link>
                ))}
                <Link href="/tools" className="col-span-2 mt-1 px-3 py-2 text-xs font-semibold text-primary hover:underline border-t border-gray-100">
                  Browse all {totalTools} tools →
                </Link>
              </div>
            )}
          </div>

          {NAV.slice(2).map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
              {label}
            </Link>
          ))}

          <button
            onClick={openSearch}
            className="flex items-center gap-2 text-gray-500 hover:text-primary hover:bg-violet-50 border border-gray-200 pl-2.5 pr-1.5 py-1.5 rounded-lg transition-colors"
            aria-label="Search tools"
          >
            <SearchIcon size={16} />
            <span className="text-xs font-medium">Search</span>
            <kbd className="text-[10px] font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">
              {isHomePage ? "Ctrl K" : "/"}
            </kbd>
          </button>
        </nav>

        {/* Mobile: search + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <button className="text-gray-700 p-2" onClick={openSearch} aria-label="Search tools">
            <SearchIcon size={20} />
          </button>
          <button className="text-gray-700 p-1" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg animate-fade-in-up max-h-[calc(100vh-4rem)] overflow-y-auto">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              className="flex items-center px-6 py-3.5 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-primary transition-colors border-b border-gray-50"
              style={{ fontFamily: "var(--font-heading)" }}>
              {label}
            </Link>
          ))}
          <p className="px-6 pt-4 pb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">Categories</p>
          <div className="grid grid-cols-2 px-3 pb-4">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/tools/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-violet-50 hover:text-primary transition-colors"
              >
                <span aria-hidden="true">{cat.icon}</span>
                <span className="min-w-0 leading-snug">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} totalTools={totalTools} />
    </header>
  );
}
