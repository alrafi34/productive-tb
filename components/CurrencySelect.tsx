"use client";

import { CURRENCIES, type CurrencyCode } from "@/lib/currency";

/* A compact currency picker for tools whose only money input is a price or
   rate the visitor types in (see lib/currency.ts). */
export default function CurrencySelect({
  value,
  onChange,
  className = "",
}: {
  value: CurrencyCode;
  onChange: (code: CurrencyCode) => void;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as CurrencyCode)}
      aria-label="Currency"
      className={`px-2 py-1 border border-gray-200 rounded-md text-sm font-medium bg-white focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
    >
      {CURRENCIES.map((c) => (
        <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
      ))}
    </select>
  );
}
