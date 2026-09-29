export type EntityMode = 'encode' | 'decode' | 'auto';
export type EntityType = 'named' | 'decimal' | 'hex';

export interface EntityHistory {
  id: string;
  mode: EntityMode;
  entityType: EntityType;
  input: string;
  output: string;
  timestamp: number;
}

/* Named entities: the five that must be escaped in HTML, the whole Latin-1
   range (160–255, from HTML 4) and common typographic and math symbols.
   Decoding also understands every other HTML5 name through the browser. */
const LATIN1 = "nbsp iexcl cent pound curren yen brvbar sect uml copy ordf laquo not shy reg macr deg plusmn sup2 sup3 acute micro para middot cedil sup1 ordm raquo frac14 frac12 frac34 iquest Agrave Aacute Acirc Atilde Auml Aring AElig Ccedil Egrave Eacute Ecirc Euml Igrave Iacute Icirc Iuml ETH Ntilde Ograve Oacute Ocirc Otilde Ouml times Oslash Ugrave Uacute Ucirc Uuml Yacute THORN szlig agrave aacute acirc atilde auml aring aelig ccedil egrave eacute ecirc euml igrave iacute icirc iuml eth ntilde ograve oacute ocirc otilde ouml divide oslash ugrave uacute ucirc uuml yacute thorn yuml".split(" ");
const EXTRA: [string, number][] = [
  ["OElig", 338], ["oelig", 339], ["Scaron", 352], ["scaron", 353], ["Yuml", 376], ["fnof", 402],
  ["circ", 710], ["tilde", 732], ["Delta", 916], ["Omega", 937], ["alpha", 945], ["beta", 946],
  ["gamma", 947], ["delta", 948], ["mu", 956], ["pi", 960], ["sigma", 963],
  ["ensp", 8194], ["emsp", 8195], ["thinsp", 8201], ["ndash", 8211], ["mdash", 8212],
  ["lsquo", 8216], ["rsquo", 8217], ["sbquo", 8218], ["ldquo", 8220], ["rdquo", 8221], ["bdquo", 8222],
  ["dagger", 8224], ["Dagger", 8225], ["bull", 8226], ["hellip", 8230], ["permil", 8240],
  ["prime", 8242], ["Prime", 8243], ["lsaquo", 8249], ["rsaquo", 8250], ["euro", 8364], ["trade", 8482],
  ["larr", 8592], ["uarr", 8593], ["rarr", 8594], ["darr", 8595], ["harr", 8596],
  ["sum", 8721], ["minus", 8722], ["radic", 8730], ["infin", 8734], ["asymp", 8776],
  ["ne", 8800], ["le", 8804], ["ge", 8805], ["spades", 9824], ["clubs", 9827], ["hearts", 9829], ["diams", 9830],
];

export const NAME_TO_CHAR: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
  ...Object.fromEntries(LATIN1.map((n, i) => [n, String.fromCodePoint(160 + i)])),
  ...Object.fromEntries(EXTRA.map(([n, c]) => [n, String.fromCodePoint(c)])),
};

// Encoding uses &#39; for the apostrophe: &apos; is not defined in HTML 4
const CHAR_TO_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(NAME_TO_CHAR).filter(([n]) => n !== "apos").map(([n, ch]) => [ch, n])
);

// Characters that are always escaped: they change the meaning of HTML
const RESERVED = /[&<>"']/;

function entityFor(ch: string, entityType: EntityType): string {
  const cp = ch.codePointAt(0)!;
  if (entityType === "named") {
    if (ch === "'") return "&#39;";
    const name = CHAR_TO_NAME[ch];
    // No name exists for this character: fall back to a numeric reference
    return name ? `&${name};` : `&#${cp};`;
  }
  return entityType === "decimal" ? `&#${cp};` : `&#x${cp.toString(16).toUpperCase()};`;
}

/* Escapes & < > " ' and, when `nonAscii` is set, every character outside
   printable ASCII (é, €, emoji…), for pages or systems that are not UTF-8. */
export function encodeEntities(text: string, entityType: EntityType, nonAscii = false): string {
  let out = "";
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    out += RESERVED.test(ch) || (nonAscii && cp > 126) ? entityFor(ch, entityType) : ch;
  }
  return out;
}

export const encodeToNamedEntities = (text: string, nonAscii = false) => encodeEntities(text, "named", nonAscii);
export const encodeToDecimalEntities = (text: string, nonAscii = false) => encodeEntities(text, "decimal", nonAscii);
export const encodeToHexEntities = (text: string, nonAscii = false) => encodeEntities(text, "hex", nonAscii);

const ENTITY_RE = /&(#[xX][0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g;

/* A name outside the table, decoded by the browser's own HTML parser */
function decodeWithBrowser(entity: string): string | null {
  if (typeof document === "undefined") return null;
  const el = document.createElement("textarea");
  el.innerHTML = entity;
  return el.value !== entity ? el.value : null;
}

/* One pass over the text, so "&amp;lt;" becomes "&lt;" and not "<".
   Unknown names and invalid code points are left untouched. */
export function decodeFromEntities(text: string): string {
  return text.replace(ENTITY_RE, (match, body: string) => {
    if (body[0] === "#") {
      const hex = body[1] === "x" || body[1] === "X";
      const cp = hex ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      if (!Number.isFinite(cp) || cp < 1 || cp > 0x10ffff || (cp >= 0xd800 && cp <= 0xdfff)) return match;
      return String.fromCodePoint(cp);
    }
    return NAME_TO_CHAR[body] ?? decodeWithBrowser(match) ?? match;
  });
}

// Check if text contains entities
export function containsEntities(text: string): boolean {
  return /&(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#[xX][0-9a-fA-F]+);/.test(text);
}

// Check if text contains special HTML characters
export function containsSpecialChars(text: string, nonAscii = false): boolean {
  return RESERVED.test(text) || (nonAscii && /[^\x00-\x7e]/.test(text));
}

// Auto: decode text that already holds entities, otherwise encode it
export function autoDetectAndTransform(text: string, entityType: EntityType, nonAscii = false): { result: string; mode: 'encode' | 'decode' } {
  if (!text) return { result: '', mode: 'encode' };
  if (containsEntities(text)) return { result: decodeFromEntities(text), mode: 'decode' };
  return { result: encodeEntities(text, entityType, nonAscii), mode: 'encode' };
}

// Transform based on mode
export function transformEntity(
  text: string,
  mode: EntityMode,
  entityType: EntityType,
  nonAscii = false
): { result: string; detectedMode?: 'encode' | 'decode' } {
  if (!text) return { result: '' };
  if (mode === 'auto') {
    const { result, mode: detectedMode } = autoDetectAndTransform(text, entityType, nonAscii);
    return { result, detectedMode };
  }
  if (mode === 'encode') return { result: encodeEntities(text, entityType, nonAscii) };
  return { result: decodeFromEntities(text) };
}

// Count entities in text
export function countEntities(text: string): number {
  const matches = text.match(/&(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#[xX][0-9a-fA-F]+);/g);
  return matches ? matches.length : 0;
}

// Local storage helpers
const HISTORY_KEY = 'html-entity-encoder-history';
const MAX_HISTORY = 20;

export function saveToHistory(history: EntityHistory): void {
  if (typeof window === 'undefined') return;
  try {
    const stored = getHistory().filter((h) => h.input !== history.input || h.mode !== history.mode);
    stored.unshift(history);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(stored.slice(0, MAX_HISTORY)));
  } catch {}
}

export function getHistory(): EntityHistory[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// Export functions
export function exportAsText(text: string, filename: string = 'html-entities'): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
