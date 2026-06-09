import type { Operation, MultisetGroup, CalcResult, HistoryEntry } from "./types";

// ── Safe large-number arithmetic using number[] digit arrays ─────────────────
// We represent integers as arrays of decimal digits (big-endian) for exact
// display, but use JS number (float64) for all arithmetic since Number can
// hold exact integers up to 2^53 ≈ 9 × 10^15 safely.
// For n ≤ 170 factorial fits in float64 (170! ~ 7.3e306).
// For n > 170 we switch to a simple arbitrary-precision string multiply.

// ── Arbitrary-precision multiply (string-based) ───────────────────────────────

function multiplyStrings(a: string, b: string): string {
  const na = a.length, nb = b.length;
  const result = new Array<number>(na + nb).fill(0);
  for (let i = na - 1; i >= 0; i--) {
    for (let j = nb - 1; j >= 0; j--) {
      const mul = parseInt(a[i], 10) * parseInt(b[j], 10);
      const p1 = i + j, p2 = i + j + 1;
      const sum = mul + result[p2];
      result[p2] = sum % 10;
      result[p1] += Math.floor(sum / 10);
    }
  }
  const str = result.join("").replace(/^0+/, "");
  return str || "0";
}

function divideStrings(a: string, b: string): string {
  return divBigStr(a, b);
}

function divBigStr(a: string, b: string): string {
  const bNum = Number(b);
  if (!isNaN(bNum) && bNum <= Number.MAX_SAFE_INTEGER) {
    let rem = 0;
    let q = "";
    for (let i = 0; i < a.length; i++) {
      rem = rem * 10 + parseInt(a[i], 10);
      const digit = Math.floor(rem / bNum);
      rem -= digit * bNum;
      if (q.length > 0 || digit > 0) q += digit;
    }
    return q || "0";
  }
  return "0";
}

// ── Factorial cache (string representation for large, number for small) ───────

const factNumCache: number[] = [1, 1]; // index = n, value = n! as float64
const factStrCache: string[] = ["1", "1"];

const FLOAT_SAFE_N = 170; // 170! is the largest exact float64 factorial

function buildFactCache(upTo: number): void {
  for (let i = factNumCache.length; i <= Math.min(upTo, FLOAT_SAFE_N); i++) {
    factNumCache[i] = factNumCache[i - 1] * i;
  }
  for (let i = factStrCache.length; i <= upTo; i++) {
    factStrCache[i] = multiplyStrings(factStrCache[i - 1], i.toString());
  }
}

export function factorial(n: number): number {
  if (n < 0) throw new Error("Factorial undefined for negative n");
  if (n > FLOAT_SAFE_N) return Infinity;
  buildFactCache(n);
  return factNumCache[n];
}

export function factorialStr(n: number): string {
  if (n < 0) throw new Error("Negative");
  buildFactCache(n);
  return factStrCache[n];
}

// ── Format large numbers ───────────────────────────────────────────────────────

export function formatBigStr(s: string, sciMode: boolean): string {
  if (s.length <= 15) {
    return Number(s).toLocaleString("en-US");
  }
  if (!sciMode) {
    // Still show with commas but truncate for display
    if (s.length <= 21) {
      // break into groups of 3
      return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  // Scientific notation
  const exp = s.length - 1;
  const mantissa = s[0] + (s.length > 1 ? "." + s.slice(1, 7) : "");
  return `${mantissa} \u00d7 10^${exp}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

// Exact string division for combinations: divides factorialStr(n) by factorialStr(r)*factorialStr(n-r)
// We use the multiplicative formula to avoid giant string divisions:
// C(n,r) = product of (n-r+1..n) / product of (1..r)
function combExact(n: number, r: number): string {
  // Use the smaller of r and n-r
  const k = Math.min(r, n - r);
  // numerator = (n-k+1) * (n-k+2) * ... * n  (k terms)
  // denominator = k!
  // We multiply numerator and divide by denominator step by step
  // C(n,k) = product_{i=1}^{k} (n-k+i) / i
  // This is always an integer at each step
  let result = "1";
  for (let i = 1; i <= k; i++) {
    result = multiplyStrings(result, (n - k + i).toString());
    result = divBigStr(result, i.toString());
  }
  return result;
}

function permExact(n: number, r: number): string {
  // n! / (n-r)! = n * (n-1) * ... * (n-r+1)
  let result = "1";
  for (let i = 0; i < r; i++) {
    result = multiplyStrings(result, (n - i).toString());
  }
  return result;
}

function powStr(base: number, exp: number): string {
  let result = "1";
  for (let i = 0; i < exp; i++) {
    result = multiplyStrings(result, base.toString());
  }
  return result;
}

// ── Core calculations ──────────────────────────────────────────────────────────

export function calcFactorial(n: number, sciMode: boolean): CalcResult {
  const str = factorialStr(n);
  const valStr = formatBigStr(str, sciMode);

  const steps: string[] = [];
  if (n <= 12) {
    const terms = Array.from({ length: n }, (_, i) => n - i);
    steps.push(`${n}! = ${terms.join(" \u00d7 ")}`);
    steps.push(`${n}! = ${valStr}`);
  } else {
    steps.push(`${n}! = ${n} \u00d7 ${n - 1} \u00d7 \u2026 \u00d7 2 \u00d7 1`);
    steps.push(`${n}! = ${valStr}`);
  }

  return {
    value: factorial(n),
    valueStr: valStr,
    formula: `${n}!`,
    steps,
    explanation: `The factorial of ${n} is the product of all positive integers from 1 to ${n}. It counts the number of ways to arrange ${n} distinct objects in a sequence.`,
    notation: `${n}!`,
    overflow: false,
  };
}

export function calcPermutation(n: number, r: number, sciMode: boolean): CalcResult {
  if (r > n) return errResult(`${n}P${r}`, "r cannot be greater than n");

  const str = permExact(n, r);
  const valStr = formatBigStr(str, sciMode);

  const fn = formatBigStr(factorialStr(n), sciMode);
  const fnr = formatBigStr(factorialStr(n - r), sciMode);

  const steps = [
    `nPr = n! \u00f7 (n \u2212 r)!`,
    `    = ${n}! \u00f7 (${n} \u2212 ${r})!`,
    `    = ${n}! \u00f7 ${n - r}!`,
    `    = ${fn} \u00f7 ${fnr}`,
    `    = ${valStr}`,
  ];

  return {
    value: factorial(n) / factorial(n - r),
    valueStr: valStr,
    formula: `${n}! \u00f7 (${n} \u2212 ${r})!`,
    steps,
    explanation: `Permutation counts ordered arrangements of ${r} items chosen from ${n} distinct items. Order matters \u2014 ABC and BAC are counted as different.`,
    notation: `${n}P${r}`,
    overflow: false,
  };
}

export function calcCombination(n: number, r: number, sciMode: boolean): CalcResult {
  if (r > n) return errResult(`${n}C${r}`, "r cannot be greater than n");

  const str = combExact(n, r);
  const valStr = formatBigStr(str, sciMode);

  const fn  = formatBigStr(factorialStr(n), sciMode);
  const fr  = formatBigStr(factorialStr(r), sciMode);
  const fnr = formatBigStr(factorialStr(n - r), sciMode);

  const steps = [
    `nCr = n! \u00f7 (r! \u00d7 (n \u2212 r)!)`,
    `    = ${n}! \u00f7 (${r}! \u00d7 ${n - r}!)`,
    `    = ${fn} \u00f7 (${fr} \u00d7 ${fnr})`,
    `    = ${valStr}`,
  ];

  return {
    value: factorial(n) / (factorial(r) * factorial(n - r)),
    valueStr: valStr,
    formula: `${n}! \u00f7 (${r}! \u00d7 ${n - r}!)`,
    steps,
    explanation: `Combination counts unordered selections of ${r} items from ${n} distinct items. Order does not matter \u2014 ABC and BAC are the same selection.`,
    notation: `${n}C${r}`,
    overflow: false,
  };
}

export function calcPermRepetition(n: number, r: number, sciMode: boolean): CalcResult {
  const str = powStr(n, r);
  const valStr = formatBigStr(str, sciMode);

  const steps = [
    `Formula: n\u02b3`,
    `       = ${n}^${r}`,
    `       = ${valStr}`,
  ];

  return {
    value: Math.pow(n, r),
    valueStr: valStr,
    formula: `${n}^${r}`,
    steps,
    explanation: `Permutation with repetition allows each of the ${r} positions to hold any of the ${n} items. Total arrangements = ${n}^${r}.`,
    notation: `${n}^${r}`,
    overflow: false,
  };
}

export function calcCombRepetition(n: number, r: number, sciMode: boolean): CalcResult {
  // C(n+r-1, r)
  const newN = n + r - 1;
  if (newN > MAX_N) return overflowResult(`C(${newN}, ${r})`);

  const str = combExact(newN, r);
  const valStr = formatBigStr(str, sciMode);

  const fn  = formatBigStr(factorialStr(newN), sciMode);
  const fr  = formatBigStr(factorialStr(r), sciMode);
  const fn1 = formatBigStr(factorialStr(n - 1), sciMode);

  const steps = [
    `Formula: (n + r \u2212 1)! \u00f7 (r! \u00d7 (n \u2212 1)!)`,
    `       = (${n} + ${r} \u2212 1)! \u00f7 (${r}! \u00d7 ${n - 1}!)`,
    `       = ${newN}! \u00f7 (${r}! \u00d7 ${n - 1}!)`,
    `       = ${fn} \u00f7 (${fr} \u00d7 ${fn1})`,
    `       = ${valStr}`,
  ];

  return {
    value: factorial(newN) / (factorial(r) * factorial(n - 1)),
    valueStr: valStr,
    formula: `${newN}! \u00f7 (${r}! \u00d7 ${n - 1}!)`,
    steps,
    explanation: `Combination with repetition counts the ways to choose ${r} items from ${n} types when repetition is allowed and order does not matter.`,
    notation: `C(${newN}, ${r})`,
    overflow: false,
  };
}

export function calcCircular(n: number, sciMode: boolean): CalcResult {
  if (n < 1) return errResult(`(${n}\u22121)!`, "n must be at least 1");

  const str = factorialStr(n - 1);
  const valStr = formatBigStr(str, sciMode);

  const steps = [
    `Formula: (n \u2212 1)!`,
    `       = (${n} \u2212 1)!`,
    `       = ${n - 1}!`,
    `       = ${valStr}`,
  ];

  return {
    value: factorial(n - 1),
    valueStr: valStr,
    formula: `(${n} \u2212 1)!`,
    steps,
    explanation: `Circular permutation counts distinct arrangements of ${n} objects around a circle. One position is fixed to eliminate rotational duplicates, giving (n\u22121)!`,
    notation: `(${n}\u22121)!`,
    overflow: false,
  };
}

export function calcMultiset(n: number, groups: MultisetGroup[], sciMode: boolean): CalcResult {
  const counts = groups.map((g) => g.count).filter((c) => c > 0);
  const total = counts.reduce((a, b) => a + b, 0);

  if (total !== n) {
    return errResult(`${n}! \u00f7 (\u2026)`, `Group counts must sum to n (${n}). Currently sum to ${total}.`);
  }

  // result = n! / (a! * b! * c! * ...)
  // Use incremental division to keep numbers manageable
  let result = factorialStr(n);
  for (const c of counts) {
    const d = factorialStr(c);
    result = divBigStr(result, d);
  }

  const valStr = formatBigStr(result, sciMode);
  const denomStr = counts.map((c) => `${c}!`).join(" \u00d7 ");
  const fn = formatBigStr(factorialStr(n), sciMode);
  const denomVals = counts.map((c) => formatBigStr(factorialStr(c), sciMode)).join(" \u00d7 ");

  const steps = [
    `Formula: n! \u00f7 (a! \u00d7 b! \u00d7 c! \u00d7 \u2026)`,
    `       = ${n}! \u00f7 (${denomStr})`,
    `       = ${fn} \u00f7 (${denomVals})`,
    `       = ${valStr}`,
  ];

  return {
    value: NaN, // too complex for float64 — use string result
    valueStr: valStr,
    formula: `${n}! \u00f7 (${denomStr})`,
    steps,
    explanation: `Multiset permutation counts distinct arrangements of ${n} objects where items within each group are identical. The denominator removes duplicate arrangements.`,
    notation: `${n}! \u00f7 (${denomStr})`,
    overflow: false,
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const MAX_N = 500;

function errResult(notation: string, msg: string): CalcResult {
  return {
    value: null, valueStr: "\u2014",
    formula: "", steps: [],
    explanation: msg,
    notation,
    overflow: false,
  };
}

function overflowResult(notation: string): CalcResult {
  return {
    value: null, valueStr: "Number too large",
    formula: "", steps: ["Result exceeds display limit. Enable scientific notation or reduce n."],
    explanation: "The result is astronomically large. Enable scientific notation to see an approximation.",
    notation,
    overflow: true,
  };
}

// ── Dispatch ───────────────────────────────────────────────────────────────────

export function compute(
  op: Operation,
  n: number,
  r: number,
  groups: MultisetGroup[],
  sciMode: boolean
): CalcResult {
  if (!Number.isInteger(n) || n < 0) return errResult("?", "n must be a non-negative integer");

  switch (op) {
    case "factorial":        return calcFactorial(n, sciMode);
    case "permutation":
      if (!Number.isInteger(r) || r < 0) return errResult("?", "r must be a non-negative integer");
      return calcPermutation(n, r, sciMode);
    case "combination":
      if (!Number.isInteger(r) || r < 0) return errResult("?", "r must be a non-negative integer");
      return calcCombination(n, r, sciMode);
    case "perm-repetition":
      if (!Number.isInteger(r) || r < 0) return errResult("?", "r must be a non-negative integer");
      return calcPermRepetition(n, r, sciMode);
    case "comb-repetition":
      if (!Number.isInteger(r) || r < 0) return errResult("?", "r must be a non-negative integer");
      return calcCombRepetition(n, r, sciMode);
    case "circular":         return calcCircular(n, sciMode);
    case "multiset":         return calcMultiset(n, groups, sciMode);
    default:                 return errResult("?", "Unknown operation");
  }
}

// ── Validation ─────────────────────────────────────────────────────────────────

export function validateInputs(
  op: Operation,
  n: number,
  r: number,
  groups: MultisetGroup[]
): string | null {
  if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n)) return "n must be a non-negative integer.";
  if (n > MAX_N) return `n must be \u2264 ${MAX_N} for reliable computation.`;

  const needsR = ["permutation", "combination", "perm-repetition", "comb-repetition"].includes(op);
  if (needsR) {
    if (!Number.isFinite(r) || r < 0 || !Number.isInteger(r)) return "r must be a non-negative integer.";
    if (op !== "perm-repetition" && r > n) return "r cannot be greater than n.";
    if (r > MAX_N) return `r must be \u2264 ${MAX_N}.`;
  }

  if (op === "multiset") {
    const sum = groups.reduce((a, g) => a + g.count, 0);
    if (sum !== n) return `Group counts must sum to n (${n}), but currently sum to ${sum}.`;
  }
  return null;
}

// ── Presets ────────────────────────────────────────────────────────────────────

export const PRESETS: { label: string; op: Operation; n: number; r: number; hint: string }[] = [
  { label: "6! Factorial",   op: "factorial",       n: 6,  r: 0, hint: "Arrange 6 books on a shelf" },
  { label: "5P2",            op: "permutation",     n: 5,  r: 2, hint: "Ordered selection from 5 items" },
  { label: "10C3",           op: "combination",     n: 10, r: 3, hint: "Choose 3 from 10 items" },
  { label: "3^4 Perm Rep",   op: "perm-repetition", n: 3,  r: 4, hint: "4-digit codes from 3 symbols" },
  { label: "Comb w/ Rep",    op: "comb-repetition", n: 5,  r: 3, hint: "Choose 3 from 5 with repeats" },
  { label: "6 Circular",     op: "circular",        n: 6,  r: 0, hint: "6 people around a table" },
];

// ── Operation metadata ─────────────────────────────────────────────────────────

export const OP_META: Record<Operation, { label: string; needsR: boolean; hint: string }> = {
  "factorial":       { label: "Factorial (n!)",              needsR: false, hint: "Product of all integers from 1 to n" },
  "permutation":     { label: "Permutation (nPr)",           needsR: true,  hint: "Ordered arrangements \u2014 order matters" },
  "combination":     { label: "Combination (nCr)",           needsR: true,  hint: "Unordered selections \u2014 order does not matter" },
  "perm-repetition": { label: "Permutation with Repetition", needsR: true,  hint: "Arrangements allowing repeated items" },
  "comb-repetition": { label: "Combination with Repetition", needsR: true,  hint: "Selections allowing repeated items" },
  "circular":        { label: "Circular Permutation",        needsR: false, hint: "Arrangements in a circle \u2014 rotations are identical" },
  "multiset":        { label: "Multiset Permutation",        needsR: false, hint: "Arrangements of objects with identical groups" },
};

// ── Debounce ───────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ── Export helpers ─────────────────────────────────────────────────────────────

export function buildExportText(
  op: Operation, n: number, r: number, result: CalcResult
): string {
  return [
    "Combinatorics Report",
    "====================",
    `Operation:   ${OP_META[op].label}`,
    `n = ${n}${OP_META[op].needsR ? `  r = ${r}` : ""}`,
    `Notation:    ${result.notation}`,
    `Result:      ${result.valueStr}`,
    `Formula:     ${result.formula}`,
    "",
    "Steps:",
    ...result.steps.map((s) => `  ${s}`),
    "",
    `Explanation: ${result.explanation}`,
    "",
    `Generated: ${new Date().toLocaleString("en-US")}`,
  ].join("\n");
}

export function downloadFile(content: string, filename: string, mime = "text/plain"): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── LocalStorage history ───────────────────────────────────────────────────────

const HISTORY_KEY = "combinatorics-history";
const MAX_HISTORY = 10;

export function saveHistory(
  op: Operation, n: number, r: number,
  groups: MultisetGroup[], result: CalcResult
): void {
  try {
    const prev = getHistory();
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      timestamp: Date.now(),
      operation: op, n, r, multiset: groups, result,
    };
    localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...prev].slice(0, MAX_HISTORY)));
  } catch { /* noop */ }
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* noop */ }
}
