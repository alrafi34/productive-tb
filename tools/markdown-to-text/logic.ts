import { marked, type Token, type Tokens } from "marked";

export type Bullet = "•" | "-" | "none";
export type Dash = "keep" | "hyphen" | "comma";

export type CleanOptions = {
  bullet: Bullet;
  /* Keep a link's address after its text: "docs (https://…)". */
  keepLinkUrls: boolean;
  dash: Dash;
  straightQuotes: boolean;
  removeEmoji: boolean;
  /* Remove reference markers such as [1] or [12]. */
  removeRefNumbers: boolean;
};

export const DEFAULT_OPTIONS: CleanOptions = {
  bullet: "•",
  keepLinkUrls: false,
  dash: "keep",
  straightQuotes: false,
  removeEmoji: false,
  removeRefNumbers: false,
};

const ENTITIES: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#x27;": "'", "&nbsp;": " " };
const decode = (s: string) => s.replace(/&(?:amp|lt|gt|quot|nbsp|#39|#x27);/g, (m) => ENTITIES[m] ?? m);

function inline(tokens: Token[] | undefined, o: CleanOptions): string {
  if (!tokens) return "";
  return tokens
    .map((t) => {
      switch (t.type) {
        case "strong":
        case "em":
        case "del":
          return inline((t as Tokens.Strong).tokens, o);
        case "codespan":
          return decode((t as Tokens.Codespan).text);
        case "link": {
          const l = t as Tokens.Link;
          const text = inline(l.tokens, o);
          return o.keepLinkUrls && l.href && l.href !== text ? `${text} (${l.href})` : text;
        }
        case "image":
          return (t as Tokens.Image).text;
        case "br":
          return "\n";
        case "html":
          return (t as Tokens.HTML).text.replace(/<[^>]*>/g, "");
        case "text": {
          const x = t as Tokens.Text;
          return x.tokens ? inline(x.tokens, o) : decode(x.text);
        }
        case "escape":
          return decode((t as Tokens.Escape).text);
        default:
          return "raw" in t ? decode(String(t.raw)) : "";
      }
    })
    .join("");
}

function list(l: Tokens.List, o: CleanOptions, depth: number): string {
  const indent = "  ".repeat(depth);
  const start = typeof l.start === "number" ? l.start : 1;
  return l.items
    .map((item, i) => {
      const marker = l.ordered ? `${start + i}. ` : o.bullet === "none" ? "" : `${o.bullet} `;
      const check = item.task ? (item.checked ? "[x] " : "[ ] ") : "";
      const parts: string[] = [];
      let first = true;
      for (const t of item.tokens) {
        if (t.type === "list") parts.push(list(t as Tokens.List, o, depth + 1));
        else if (t.type === "checkbox") continue;
        else {
          const text = block([t], o, depth).trim();
          if (!text) continue;
          parts.push(first ? `${indent}${marker}${check}${text}` : `${indent}  ${text}`);
          first = false;
        }
      }
      if (first) parts.unshift(`${indent}${marker}${check}`.trimEnd());
      return parts.join("\n");
    })
    .join("\n");
}

function block(tokens: Token[], o: CleanOptions, depth = 0): string {
  const out: string[] = [];
  for (const t of tokens) {
    switch (t.type) {
      case "heading":
      case "paragraph":
        out.push(inline((t as Tokens.Paragraph).tokens, o));
        break;
      case "text": {
        const x = t as Tokens.Text;
        out.push(x.tokens ? inline(x.tokens, o) : decode(x.text));
        break;
      }
      case "list":
        out.push(list(t as Tokens.List, o, depth));
        break;
      case "code":
        out.push((t as Tokens.Code).text);
        break;
      case "blockquote":
        out.push(block((t as Tokens.Blockquote).tokens, o, depth));
        break;
      case "table": {
        // Tab-separated, so it pastes into a spreadsheet as columns.
        const tb = t as Tokens.Table;
        const row = (cells: Tokens.TableCell[]) => cells.map((c) => inline(c.tokens, o)).join("\t");
        out.push([row(tb.header), ...tb.rows.map(row)].join("\n"));
        break;
      }
      case "html":
        out.push(decode((t as Tokens.HTML).text.replace(/<[^>]*>/g, "")).trim());
        break;
      case "hr":
      case "space":
      case "def":
        break;
      default:
        if ("raw" in t) out.push(String(t.raw));
    }
  }
  return out.filter((s) => s !== "").join("\n\n");
}

/* Text-level clean-ups that apply to the whole result. */
export function tidy(text: string, o: CleanOptions): string {
  let s = text
    // Citation markers some AI chat apps leave in copied text: 【4†source】 and
    // private-use characters around inline citations.
    .replace(/【[^】]*】/g, "")
    .replace(/[-]/g, "");
  if (o.removeRefNumbers) s = s.replace(/ ?\[\d{1,3}(?:[,–-]\s?\d{1,3})*\]/g, "");
  if (o.dash === "hyphen") s = s.replace(/\s*—\s*/g, " - ");
  else if (o.dash === "comma") s = s.replace(/\s*—\s*/g, ", ");
  if (o.straightQuotes) s = s.replace(/[‘’‚′]/g, "'").replace(/[“”„″]/g, '"');
  if (o.removeEmoji) {
    // ©, ® and ™ count as pictographic in Unicode but are not emoji.
    const emoji = String.raw`(?![©®™])[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}][\u{FE0F}\u{200D}\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}]*`;
    s = s
      .replace(new RegExp(String.raw`^([ \t]*)(?:${emoji})+[ \t]?`, "gmu"), "$1") // "✅ Done" → "Done"
      .replace(new RegExp(String.raw`[ \t]?(?:${emoji})+`, "gu"), ""); // "ok 👍" → "ok"
  }
  return s
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* Markdown (for example an AI chat answer) → plain text for email, Word or a form. */
export function markdownToText(md: string, o: CleanOptions = DEFAULT_OPTIONS): string {
  if (!md.trim()) return "";
  const tokens = marked.lexer(md.replace(/\r\n?/g, "\n"), { gfm: true });
  return tidy(block(tokens, o), o);
}

/* Markdown → HTML for "copy with formatting" (pasting into Word, Google Docs
   or an email keeps bold, headings and lists without the symbols). Run the
   cleanup on the source first so dashes, quotes and emoji match the plain
   text. The caller sanitizes the HTML. */
export function markdownToHtml(md: string, o: CleanOptions = DEFAULT_OPTIONS): string {
  const prepared = tidy(md.replace(/\r\n?/g, "\n"), { ...o }).replace(/\n{2,}/g, "\n\n");
  return marked.parse(prepared, { gfm: true, async: false }) as string;
}

export function countMarkdownSymbols(md: string): number {
  return (md.match(/(\*\*|__|^#{1,6}\s|^\s*[-*+]\s|`{1,3}|^\s*>\s?|\|)/gm) || []).length;
}
