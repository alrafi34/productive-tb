"use client";

import type { MouseEvent, ReactNode } from "react";

/* A table value that loads into the converter above. The href (?acres=0.25)
   works as a plain link and can be shared; a normal click fills the input
   in place instead of reloading (the converter keeps the URL in step). */
export default function ValueLink({
  param,
  value,
  onPick,
  children,
}: {
  param: string;
  value: string;
  onPick?: (value: string) => void;
  children: ReactNode;
}) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onPick || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onPick(value);
  };
  return (
    <a
      href={`?${param}=${value}`}
      onClick={handleClick}
      rel="nofollow"
      className="font-mono font-semibold text-primary hover:underline"
    >
      {children}
    </a>
  );
}
