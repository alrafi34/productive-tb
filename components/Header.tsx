"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  function scrollToSearch() {
    setOpen(false);
    document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary" style={{ fontFamily: "var(--font-heading)" }}>
          <img src="/favicon.svg" alt="" className="w-7 h-7" />
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
              {label}
            </Link>
          ))}
          {isHomePage && (
            <button onClick={scrollToSearch} className="text-gray-500 hover:text-primary hover:bg-violet-50 p-1.5 rounded-lg transition-colors" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          )}

        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden text-gray-700 p-1" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? (
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

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg animate-fade-in-up">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="flex items-center px-6 py-3.5 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-primary transition-colors border-b border-gray-50"
              style={{ fontFamily: "var(--font-heading)" }}>
              {label}
            </Link>
          ))}
          {isHomePage && (
            <button onClick={scrollToSearch}
              className="flex items-center gap-2 w-full px-6 py-3.5 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-primary transition-colors border-b border-gray-50"
              style={{ fontFamily: "var(--font-heading)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search Tools
            </button>
          )}

        </div>
      )}
    </header>
  );
}
