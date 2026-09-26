/* Shared by the JSON validator and the JSON formatter. */

export interface JsonError {
  message: string;
  position: number;
  line: number;
  column: number;
}

/*
 * The first syntax error in `input`, found with a small strict parser, so
 * every browser reports the same message and exact line and column
 * (current V8 no longer puts a position in JSON.parse errors). null = valid.
 */
export function findJsonError(input: string): JsonError | null {
  let i = 0;
  const fail = (message: string, at = i): never => {
    throw { message, at };
  };
  const ws = () => {
    while (i < input.length && (input[i] === " " || input[i] === "\t" || input[i] === "\n" || input[i] === "\r")) i++;
  };
  const describe = (ch: string | undefined) =>
    ch === undefined ? "the end of the input" : ch === "\n" ? "a line break" : `"${ch}"`;
  const value = (): void => {
    ws();
    const c = input[i];
    if (c === "{") return object();
    if (c === "[") return array();
    if (c === '"') return string();
    if (c === "-" || (c >= "0" && c <= "9")) return number();
    for (const lit of ["true", "false", "null"]) {
      if (input.startsWith(lit, i)) {
        i += lit.length;
        return;
      }
    }
    if (c === "'") fail("Strings must use double quotes, not single quotes");
    if (c === undefined) fail("Unexpected end of input: a value is missing");
    if (/[A-Za-z_$]/.test(c)) {
      const word = /^[\w$]+/.exec(input.slice(i))![0];
      if (word === "True" || word === "False" || word === "None") fail(`${word} is Python; JSON uses true, false and null`);
      if (word === "undefined" || word === "NaN" || word === "Infinity") fail(`${word} is not valid JSON; use null`);
      fail(`Unexpected word "${word}": text values must be in double quotes`);
    }
    fail(`Unexpected ${describe(c)}: expected a value`);
  };
  const object = () => {
    i++;
    ws();
    if (input[i] === "}") {
      i++;
      return;
    }
    for (;;) {
      ws();
      if (input[i] === "}") fail("Trailing comma before }");
      if (input[i] !== '"') {
        if (input[i] === "'") fail("Property names must use double quotes, not single quotes");
        if (input[i] !== undefined && /[A-Za-z_$]/.test(input[i])) fail("Property names must be in double quotes");
        fail(`Unexpected ${describe(input[i])}: expected a property name in double quotes`);
      }
      string();
      ws();
      if (input[i] !== ":") fail(`Unexpected ${describe(input[i])}: expected ":" after the property name`);
      i++;
      value();
      ws();
      if (input[i] === ",") {
        i++;
        continue;
      }
      if (input[i] === "}") {
        i++;
        return;
      }
      fail(input[i] === undefined ? "Unexpected end of input: missing }" : `Unexpected ${describe(input[i])}: expected "," or "}"`);
    }
  };
  const array = () => {
    i++;
    ws();
    if (input[i] === "]") {
      i++;
      return;
    }
    for (;;) {
      ws();
      if (input[i] === "]") fail("Trailing comma before ]");
      value();
      ws();
      if (input[i] === ",") {
        i++;
        continue;
      }
      if (input[i] === "]") {
        i++;
        return;
      }
      fail(input[i] === undefined ? "Unexpected end of input: missing ]" : `Unexpected ${describe(input[i])}: expected "," or "]"`);
    }
  };
  const string = () => {
    const start = i;
    i++;
    while (i < input.length && input[i] !== '"') {
      const ch = input[i];
      if (ch === "\n" || ch === "\r") fail("Line break inside a string: use \\n");
      if (ch < " ") fail("Control character inside a string");
      if (ch === "\\") {
        const e = input[i + 1];
        if (e === "u") {
          if (!/^[0-9a-fA-F]{4}$/.test(input.slice(i + 2, i + 6))) fail("Invalid \\u escape: expected 4 hex digits");
          i += 6;
          continue;
        }
        if (e === undefined || !'"\\/bfnrt'.includes(e)) fail(`Invalid escape "\\${e ?? ""}"`);
        i += 2;
        continue;
      }
      i++;
    }
    if (i >= input.length) fail("Unterminated string: missing closing \"", start);
    i++;
  };
  const number = () => {
    const m = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/.exec(input.slice(i));
    if (!m) fail("Invalid number");
    const after = input[i + m![0].length];
    if (after !== undefined && /[\d.xXeE]/.test(after)) fail("Invalid number (leading zeros, hex and trailing dots are not allowed)");
    i += m![0].length;
  };

  try {
    ws();
    if (i >= input.length) return { message: "JSON input is empty", position: 0, line: 1, column: 1 };
    value();
    ws();
    if (i < input.length) fail(`Unexpected ${describe(input[i])} after the end of the JSON value`);
    return null;
  } catch (e) {
    const { message, at } = e as { message: string; at: number };
    const before = input.slice(0, at).split("\n");
    return { message, position: at, line: before.length, column: before[before.length - 1].length + 1 };
  }
}

/** Where JSON.parse failed, from the engine's message (V8, SpiderMonkey, JSC). */
export function locateJsonError(input: string, message: string): { position: number; line: number; column: number } | null {
  let position: number | null = null;
  const pos = /position (\d+)/.exec(message);
  const lineCol = /line (\d+) column (\d+)/.exec(message);
  if (pos) {
    position = Number(pos[1]);
  } else if (lineCol) {
    const lines = input.split("\n");
    const line = Math.min(Number(lineCol[1]), lines.length);
    position = lines.slice(0, line - 1).reduce((n, l) => n + l.length + 1, 0) + Number(lineCol[2]) - 1;
  } else if (/unexpected end/i.test(message)) {
    position = input.length;
  }
  if (position === null) return null;
  position = Math.max(0, Math.min(position, input.length));
  const before = input.slice(0, position).split("\n");
  return { position, line: before.length, column: before[before.length - 1].length + 1 };
}

export interface RepairResult {
  output: string;
  /** Human-readable list of what was changed, in the order first seen. */
  fixes: string[];
}

const PYTHON_LITERALS: Record<string, string> = { True: "true", False: "false", None: "null" };
const JS_ONLY: Record<string, string> = { undefined: "null", NaN: "null", Infinity: "null" };

/*
 * Fixes the mistakes people most often paste as "JSON": JavaScript object
 * literals and Python dicts. Strings are copied through untouched except
 * for their quotes and raw line breaks.
 *   - // and /* *\/ comments                 - trailing commas
 *   - 'single-quoted' and “smart-quoted” strings
 *   - unquoted keys ({ name: 1 })            - True / False / None
 *   - undefined, NaN, Infinity → null        - raw line breaks inside strings
 */
export function repairJson(input: string): RepairResult {
  const fixes = new Set<string>();
  let out = "";
  let i = 0;
  const src = input.replace(/^﻿/, "");
  if (src !== input) fixes.add("Removed a byte-order mark");

  // Last non-space character written, to tell keys from values
  const lastSignificant = () => {
    for (let k = out.length - 1; k >= 0; k--) if (!/\s/.test(out[k])) return out[k];
    return "";
  };
  const nextSignificant = (from: number) => {
    let k = from;
    while (k < src.length && /\s/.test(src[k])) k++;
    return src[k] ?? "";
  };

  while (i < src.length) {
    const c = src[i];

    // Strings: "…", '…', “…” / ‘…’
    if (c === '"' || c === "'" || c === "“" || c === "”" || c === "‘" || c === "’") {
      const smartDouble = c === "“" || c === "”";
      const smartSingle = c === "‘" || c === "’";
      if (c === "'") fixes.add("Replaced single quotes with double quotes");
      if (smartDouble || smartSingle) fixes.add("Replaced curly “smart” quotes with straight quotes");
      const closes = (ch: string) =>
        smartDouble ? ch === "”" || ch === "“" : smartSingle ? ch === "’" || ch === "‘" : ch === c;
      out += '"';
      i++;
      while (i < src.length && !closes(src[i])) {
        const ch = src[i];
        if (ch === "\\") {
          const next = src[i + 1] ?? "";
          // \' is not a JSON escape; a bare apostrophe is fine inside "…"
          out += next === "'" ? "'" : ch + next;
          i += 2;
          continue;
        }
        if (ch === '"' && c !== '"') {
          out += '\\"';
        } else if (ch === "\n") {
          out += "\\n";
          fixes.add("Escaped line breaks inside strings");
        } else if (ch === "\r") {
          fixes.add("Escaped line breaks inside strings");
        } else if (ch === "\t") {
          out += "\\t";
          fixes.add("Escaped tabs inside strings");
        } else {
          out += ch;
        }
        i++;
      }
      out += '"';
      i++;
      continue;
    }

    // Comments
    if (c === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      fixes.add("Removed comments");
      continue;
    }
    if (c === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      i = end === -1 ? src.length : end + 2;
      fixes.add("Removed comments");
      continue;
    }

    // Trailing commas: , followed by } or ]
    if (c === ",") {
      const next = nextSignificant(i + 1);
      if (next === "}" || next === "]") {
        fixes.add("Removed trailing commas");
        i++;
        continue;
      }
    }

    // Bare words: unquoted keys, Python and JavaScript literals
    if (/[A-Za-z_$]/.test(c)) {
      let j = i;
      while (j < src.length && /[\w$]/.test(src[j])) j++;
      const word = src.slice(i, j);
      const prev = lastSignificant();
      if (nextSignificant(j) === ":" && (prev === "{" || prev === ",")) {
        out += `"${word}"`;
        fixes.add("Added quotes around property names");
      } else if (PYTHON_LITERALS[word]) {
        out += PYTHON_LITERALS[word];
        fixes.add("Converted Python True / False / None");
      } else if (JS_ONLY[word]) {
        out += JS_ONLY[word];
        fixes.add("Replaced undefined / NaN / Infinity with null");
      } else {
        out += word;
      }
      i = j;
      continue;
    }

    out += c;
    i++;
  }

  return { output: out, fixes: [...fixes] };
}

/** Recursively sorts object keys A–Z; arrays keep their order. */
export function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value as Record<string, unknown>)
        .sort((a, b) => a.localeCompare(b))
        .map((k) => [k, sortKeysDeep((value as Record<string, unknown>)[k])])
    );
  }
  return value;
}

/* Hands JSON from one tool page to the other (validator ⇄ formatter). */
const HANDOFF_KEY = "pt:json-handoff";

export function sendJsonTo(url: string, json: string): void {
  try {
    sessionStorage.setItem(HANDOFF_KEY, json);
  } catch {
    // storage unavailable: the other page just opens empty
  }
  window.location.href = url;
}

export function takeHandedOffJson(): string | null {
  try {
    const json = sessionStorage.getItem(HANDOFF_KEY);
    if (json !== null) sessionStorage.removeItem(HANDOFF_KEY);
    return json;
  } catch {
    return null;
  }
}
