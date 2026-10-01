"use client";

import { useEffect, useRef } from "react";

const NUMBER = /^\d*\.?\d+$/;

/* Tie a converter's input to a URL parameter, e.g. ?acres=0.25, so a value
   can be linked to and shared. The URL is read once after hydration (so the
   server render and the first client render match); after that the address
   bar follows the input without reloading, and an empty input drops it. */
export function useValueParam(param: string, value: string, apply: (value: string) => void) {
  const ready = useRef(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const fromUrl = new URLSearchParams(window.location.search).get(param);
      if (fromUrl && NUMBER.test(fromUrl)) apply(fromUrl);
      ready.current = true;
    });
    return () => window.cancelAnimationFrame(frame);
    // apply is a fresh closure each render; only the first URL read matters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  useEffect(() => {
    if (!ready.current) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get(param) === (value || null)) return;
    if (value) url.searchParams.set(param, value);
    else url.searchParams.delete(param);
    window.history.replaceState(window.history.state, "", url);
  }, [param, value]);
}
