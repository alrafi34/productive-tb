/* Unicode "fonts": letters and digits from the Mathematical Alphanumeric
   Symbols block and other symbol blocks that look like styled text. They are
   characters, not fonts, so they paste anywhere plain text is accepted. */

type Style = { id: string; name: string; convert: (text: string) => string };

/* Holes in the math alphabets: these letters were encoded earlier in the
   Letterlike Symbols block and must be taken from there. */
const HOLES: Record<string, Record<string, number>> = {
  italic: { h: 0x210e },
  script: { B: 0x212c, E: 0x2130, F: 0x2131, H: 0x210b, I: 0x2110, L: 0x2112, M: 0x2133, R: 0x211b, e: 0x212f, g: 0x210a, o: 0x2134 },
  fraktur: { C: 0x212d, H: 0x210c, I: 0x2111, R: 0x211c, Z: 0x2128 },
  doubleStruck: { C: 0x2102, H: 0x210d, N: 0x2115, P: 0x2119, Q: 0x211a, R: 0x211d, Z: 0x2124 },
};

function alphabet(upper: number, lower: number | null, digits: number | null, holes: Record<string, number> = {}) {
  return (text: string) =>
    Array.from(text)
      .map((ch) => {
        if (holes[ch]) return String.fromCodePoint(holes[ch]);
        const c = ch.codePointAt(0)!;
        if (c >= 65 && c <= 90) return String.fromCodePoint(upper + c - 65);
        if (c >= 97 && c <= 122) return lower === null ? String.fromCodePoint(upper + c - 97) : String.fromCodePoint(lower + c - 97);
        if (digits !== null && c >= 48 && c <= 57) return String.fromCodePoint(digits + c - 48);
        return ch;
      })
      .join("");
}

function charMap(map: Record<string, string>, fallbackUpper = false) {
  return (text: string) =>
    Array.from(text)
      .map((ch) => map[ch] ?? (fallbackUpper ? map[ch.toLowerCase()] ?? map[ch.toUpperCase()] : undefined) ?? ch)
      .join("");
}

function combining(mark: string) {
  return (text: string) =>
    Array.from(text)
      .map((ch) => (ch === " " || ch === "\n" ? ch : ch + mark))
      .join("");
}

const zip = (from: string, to: string): Record<string, string> => {
  const a = Array.from(from);
  const b = Array.from(to);
  return Object.fromEntries(a.map((ch, i) => [ch, b[i]]));
};

const SMALL_CAPS = zip("abcdefghijklmnopqrstuvwxyz", "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ");
const SUPERSCRIPT = zip(
  "abcdefghijklmnoprstuvwxyzABDEGHIJKLMNOPRTUVW0123456789+-=()",
  "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻᴬᴮᴰᴱᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᴿᵀᵁⱽᵂ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾",
);
const SUBSCRIPT = zip("aehijklmnoprstuvx0123456789+-=()", "ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎");

const CIRCLED: Record<string, string> = { "0": "⓪" };
for (let i = 0; i < 26; i++) {
  CIRCLED[String.fromCharCode(65 + i)] = String.fromCodePoint(0x24b6 + i);
  CIRCLED[String.fromCharCode(97 + i)] = String.fromCodePoint(0x24d0 + i);
}
for (let i = 1; i <= 9; i++) CIRCLED[String(i)] = String.fromCodePoint(0x2460 + i - 1);

const NEG_CIRCLED_DIGITS: Record<string, string> = { "0": "⓿" };
for (let i = 1; i <= 9; i++) NEG_CIRCLED_DIGITS[String(i)] = String.fromCodePoint(0x2776 + i - 1);

const PARENTHESIZED: Record<string, string> = {};
for (let i = 0; i < 26; i++) PARENTHESIZED[String.fromCharCode(97 + i)] = String.fromCodePoint(0x249c + i);
for (let i = 1; i <= 9; i++) PARENTHESIZED[String(i)] = String.fromCodePoint(0x2474 + i - 1);

function fullwidth(text: string) {
  return Array.from(text)
    .map((ch) => {
      const c = ch.codePointAt(0)!;
      if (c === 32) return "　";
      return c >= 0x21 && c <= 0x7e ? String.fromCodePoint(c + 0xfee0) : ch;
    })
    .join("");
}

const letters = (upper: number, digits: Record<string, string> = {}) => (text: string) =>
  alphabet(upper, null, null)(Array.from(text).map((ch) => digits[ch] ?? ch).join("").toUpperCase());

export const STYLES: Style[] = [
  { id: "bold", name: "Bold", convert: alphabet(0x1d400, 0x1d41a, 0x1d7ce) },
  { id: "italic", name: "Italic", convert: alphabet(0x1d434, 0x1d44e, null, HOLES.italic) },
  { id: "boldItalic", name: "Bold italic", convert: alphabet(0x1d468, 0x1d482, null) },
  { id: "sansBold", name: "Sans bold", convert: alphabet(0x1d5d4, 0x1d5ee, 0x1d7ec) },
  { id: "sansItalic", name: "Sans italic", convert: alphabet(0x1d608, 0x1d622, null) },
  { id: "sansBoldItalic", name: "Sans bold italic", convert: alphabet(0x1d63c, 0x1d656, null) },
  { id: "sans", name: "Sans", convert: alphabet(0x1d5a0, 0x1d5ba, 0x1d7e2) },
  { id: "script", name: "Script", convert: alphabet(0x1d49c, 0x1d4b6, null, HOLES.script) },
  { id: "boldScript", name: "Bold script", convert: alphabet(0x1d4d0, 0x1d4ea, null) },
  { id: "fraktur", name: "Fraktur (Gothic)", convert: alphabet(0x1d504, 0x1d51e, null, HOLES.fraktur) },
  { id: "boldFraktur", name: "Bold Fraktur", convert: alphabet(0x1d56c, 0x1d586, null) },
  { id: "doubleStruck", name: "Double-struck", convert: alphabet(0x1d538, 0x1d552, 0x1d7d8, HOLES.doubleStruck) },
  { id: "monospace", name: "Monospace", convert: alphabet(0x1d670, 0x1d68a, 0x1d7f6) },
  { id: "fullwidth", name: "Fullwidth (vaporwave)", convert: fullwidth },
  { id: "smallCaps", name: "Small caps", convert: (t) => charMap(SMALL_CAPS)(t.toLowerCase()) },
  { id: "circled", name: "Circled", convert: charMap(CIRCLED) },
  { id: "negativeCircled", name: "Black circled", convert: letters(0x1f150, NEG_CIRCLED_DIGITS) },
  { id: "squared", name: "Squared", convert: letters(0x1f130) },
  { id: "negativeSquared", name: "Black squared", convert: letters(0x1f170) },
  { id: "parenthesized", name: "Parenthesized", convert: (t) => charMap(PARENTHESIZED)(t.toLowerCase()) },
  { id: "superscript", name: "Superscript", convert: charMap(SUPERSCRIPT) },
  { id: "subscript", name: "Subscript", convert: (t) => charMap(SUBSCRIPT)(t.toLowerCase()) },
  { id: "strikethrough", name: "Strikethrough", convert: combining("̶") },
  { id: "underline", name: "Underline", convert: combining("̲") },
  { id: "doubleUnderline", name: "Double underline", convert: combining("̳") },
  { id: "slashed", name: "Slashed", convert: combining("̸") },
];
