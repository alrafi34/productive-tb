/** [emoji, Unicode name, group index, search keywords, supports skin tones (1/0)] */
export type EmojiRow = [string, string, number, string, number];

export interface EmojiData {
  groups: string[];
  emoji: EmojiRow[];
}

/* Fitzpatrick skin tone modifiers, light to dark ("" = default yellow). */
export const SKIN_TONES: { label: string; modifier: string; swatch: string }[] = [
  { label: "Default", modifier: "", swatch: "#FFCC4D" },
  { label: "Light", modifier: "\u{1F3FB}", swatch: "#F7DECE" },
  { label: "Medium-light", modifier: "\u{1F3FC}", swatch: "#F3D2A2" },
  { label: "Medium", modifier: "\u{1F3FD}", swatch: "#D5AB88" },
  { label: "Medium-dark", modifier: "\u{1F3FE}", swatch: "#AF7E57" },
  { label: "Dark", modifier: "\u{1F3FF}", swatch: "#7C533E" },
];

/* The emoji with a skin tone: the modifier goes after the first code point
   (dropping a variation selector), so 👍 → 👍🏽 and 🧑‍💻 → 🧑🏽‍💻. */
export function withSkinTone(emoji: string, modifier: string): string {
  if (!modifier) return emoji;
  const points = [...emoji];
  const rest = points.slice(1);
  if (rest[0] === "️") rest.shift();
  return points[0] + modifier + rest.join("");
}

/* Every word of the query must appear in the name, keywords or group. */
export function searchEmoji(data: EmojiData, query: string, group: number | null): EmojiRow[] {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return data.emoji.filter((row) => {
    if (group !== null && row[2] !== group) return false;
    if (!words.length) return true;
    const haystack = `${row[1]} ${row[3]} ${data.groups[row[2]]}`.toLowerCase();
    return words.every((w) => haystack.includes(w));
  });
}

/* "U+1F44D U+1F3FD" */
export function codePoints(emoji: string): string {
  return [...emoji].map((c) => "U+" + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")).join(" ");
}

/* "&#x1F44D;&#x1F3FD;" */
export function htmlEntity(emoji: string): string {
  return [...emoji].map((c) => `&#x${c.codePointAt(0)!.toString(16).toUpperCase()};`).join("");
}

/* ":thumbs_up:" style shortcode from the Unicode name. */
export function shortcode(name: string): string {
  return ":" + name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") + ":";
}

const RECENT_KEY = "emoji-search-recent";

export function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]).slice(0, 24) : [];
  } catch {
    return [];
  }
}

export function saveRecent(list: string[]): void {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 24)));
  } catch {
    // storage unavailable
  }
}
