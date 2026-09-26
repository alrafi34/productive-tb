"use client";

import { createContext, useContext } from "react";
import type { ToolNav } from "@/lib/tool-nav";

/* Carries the links ToolLayout computed on the server down to the parts that
   sit inside each tool's client UI (RelatedStrip, RelatedTools). */
const ToolNavContext = createContext<ToolNav | null>(null);

export function ToolNavProvider({ value, children }: { value: ToolNav | null; children: React.ReactNode }) {
  return <ToolNavContext.Provider value={value}>{children}</ToolNavContext.Provider>;
}

export function useToolNav(): ToolNav | null {
  return useContext(ToolNavContext);
}
