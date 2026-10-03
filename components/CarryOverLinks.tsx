import Link from "next/link";

export interface CarryOverLink {
  label: string;
  /* Tool path plus the query string the target tool reads on load */
  href: string;
}

/* "Continue with these values": opens the next tool with this result's
   inputs filled in. The query-string URLs are not separate pages (each tool
   page keeps its canonical), so the links are nofollow. */
export default function CarryOverLinks({ links }: { links: CarryOverLink[] }) {
  if (links.length === 0) return null;
  return (
    <div className="pt-4 border-t border-white/20">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/80 mb-2">
        Continue with these values
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            rel="nofollow"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/30 px-3 py-1.5 text-sm font-medium text-white transition-colors"
          >
            {l.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* Reads a tool's carry-over values from the current URL. Call after
   hydration (inside an effect); returns null when there is nothing to read. */
export function readCarryOver(): URLSearchParams | null {
  if (typeof window === "undefined" || !window.location.search) return null;
  return new URLSearchParams(window.location.search);
}

/* A positive finite number from the query string, or undefined */
export function positiveParam(q: URLSearchParams, key: string): number | undefined {
  const v = q.get(key);
  if (v === null || v.trim() === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}
