"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

/* next/link prefetches every link as it scrolls into view. A tool page has
   ~45 links (related tools, menus, footer), and each prefetch is several
   requests, so one visit cost ~190 requests against the Vercel ISR-read and
   CDN-request quotas. This link prefetches only when the visitor points at
   it or touches it, which is still before the click, so navigation stays
   quick. The rendered <a href> is unchanged, so crawlers see the same links. */
export default function SiteLink({ prefetch, onMouseEnter, onTouchStart, onFocus, ...props }: ComponentProps<typeof NextLink>) {
  const router = useRouter();
  const warm = () => {
    if (prefetch === false || typeof props.href !== "string" || !props.href.startsWith("/")) return;
    router.prefetch(props.href);
  };
  return (
    <NextLink
      {...props}
      prefetch={false}
      onMouseEnter={(e) => { warm(); onMouseEnter?.(e); }}
      onTouchStart={(e) => { warm(); onTouchStart?.(e); }}
      onFocus={(e) => { warm(); onFocus?.(e); }}
    />
  );
}
