"use client";

import { useEffect, useState } from "react";
import { guessCurrency, isCurrencyCode, type CurrencyCode } from "@/lib/currency";

/* The visitor's currency: their last choice for this tool, else a guess from
   the timezone and browser language (lib/currency.ts). Applied after
   hydration, so the server render (USD) and the first client render match. */
export function useCurrency(storageKey: string): [CurrencyCode, (code: CurrencyCode) => void] {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(storageKey);
      } catch {
        // storage unavailable
      }
      setCurrency(isCurrencyCode(saved) ? saved : guessCurrency());
    });
    return () => window.cancelAnimationFrame(frame);
  }, [storageKey]);

  const choose = (code: CurrencyCode) => {
    setCurrency(code);
    try {
      localStorage.setItem(storageKey, code);
    } catch {
      // storage unavailable
    }
  };

  return [currency, choose];
}
