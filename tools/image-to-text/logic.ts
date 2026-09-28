/* OCR languages offered, as Tesseract traineddata codes. */
export const OCR_LANGUAGES: { code: string; label: string; iso: string }[] = [
  { code: "eng", label: "English", iso: "en" },
  { code: "spa", label: "Spanish", iso: "es" },
  { code: "fra", label: "French", iso: "fr" },
  { code: "deu", label: "German", iso: "de" },
  { code: "ita", label: "Italian", iso: "it" },
  { code: "por", label: "Portuguese", iso: "pt" },
  { code: "nld", label: "Dutch", iso: "nl" },
  { code: "pol", label: "Polish", iso: "pl" },
  { code: "swe", label: "Swedish", iso: "sv" },
  { code: "dan", label: "Danish", iso: "da" },
  { code: "nor", label: "Norwegian", iso: "no" },
  { code: "fin", label: "Finnish", iso: "fi" },
  { code: "ces", label: "Czech", iso: "cs" },
  { code: "ron", label: "Romanian", iso: "ro" },
  { code: "hun", label: "Hungarian", iso: "hu" },
  { code: "ell", label: "Greek", iso: "el" },
  { code: "tur", label: "Turkish", iso: "tr" },
  { code: "rus", label: "Russian", iso: "ru" },
  { code: "ukr", label: "Ukrainian", iso: "uk" },
  { code: "ara", label: "Arabic", iso: "ar" },
  { code: "chi_sim", label: "Chinese (Simplified)", iso: "zh" },
  { code: "jpn", label: "Japanese", iso: "ja" },
  { code: "kor", label: "Korean", iso: "ko" },
];

/* The OCR language matching the browser language; English otherwise. */
export function guessOcrLanguage(language?: string): string {
  const lang = (language ?? (typeof navigator !== "undefined" ? navigator.language : "") ?? "").toLowerCase();
  const iso = lang.split(/[-_]/)[0];
  const alias: Record<string, string> = { nb: "no", nn: "no" };
  return OCR_LANGUAGES.find((l) => l.iso === (alias[iso] ?? iso))?.code ?? "eng";
}

/* "eng", or "deu+eng" when English is added to another language. */
export function languageSpec(code: string, withEnglish: boolean): string {
  return withEnglish && code !== "eng" ? `${code}+eng` : code;
}

/* Tidies Tesseract output: trims trailing spaces and collapses runs of
   blank lines, keeping paragraph breaks. */
export function cleanOcrText(text: string): string {
  return text
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function wordCount(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}
