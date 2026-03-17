"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./PageLoader";

export default function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  // Simplified - removed searchParams dependency and complex event listeners
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't show loading if Ctrl+click, Cmd+click, or middle click (opens in new tab)
      if (e.ctrlKey || e.metaKey || e.button === 1) {
        return;
      }
      
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link?.href && !link.target && link.href.startsWith(window.location.origin)) {
        const url = new URL(link.href);
        if (url.pathname !== pathname) {
          setLoading(true);
        }
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return (
    <>
      {loading && <PageLoader />}
      {children}
    </>
  );
}
