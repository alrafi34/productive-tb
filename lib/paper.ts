/* Paper sizes in PDF points (1 pt = 1/72 in). North America and a few Latin
   American countries and the Philippines use US Letter; almost everywhere
   else uses ISO A4. The default is guessed and always stays editable. */
export const PAPER_SIZES = {
  a4: { label: "A4 (210 × 297 mm)", width: 595.28, height: 841.89 },
  letter: { label: "US Letter (8.5 × 11 in)", width: 612, height: 792 },
  legal: { label: "US Legal (8.5 × 14 in)", width: 612, height: 1008 },
  a5: { label: "A5 (148 × 210 mm)", width: 419.53, height: 595.28 },
  a3: { label: "A3 (297 × 420 mm)", width: 841.89, height: 1190.55 },
} as const;

export type PaperSize = keyof typeof PAPER_SIZES;

const LETTER_REGIONS = new Set(["US", "CA", "MX", "PH", "CL", "CO", "VE", "CR", "GT", "PR", "DO", "PA", "SV", "NI"]);
const LETTER_ZONES = /^(America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Juneau|Boise|Detroit|Indiana\/.+|Kentucky\/.+|North_Dakota\/.+|Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|St_Johns|Mexico_City|Monterrey|Tijuana|Santiago|Bogota|Caracas|Puerto_Rico|Costa_Rica|Guatemala)|Pacific\/Honolulu|Asia\/Manila)$/;

export function guessPaperSize(timeZone?: string, language?: string): "a4" | "letter" {
  try {
    const lang = language ?? (typeof navigator !== "undefined" ? navigator.language : "");
    const region = /[-_]([A-Za-z]{2})\b/.exec(lang || "")?.[1]?.toUpperCase();
    const zone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (LETTER_ZONES.test(zone)) return "letter";
    if (zone.startsWith("Europe/")) return "a4";
    if (region) return LETTER_REGIONS.has(region) ? "letter" : "a4";
  } catch {
    // fall through
  }
  return "a4";
}
