// ── Big-O definitions ─────────────────────────────────────────────────────────

export type Complexity = "O(1)" | "O(log n)" | "O(n)" | "O(n log n)" | "O(n²)" | "O(n³)" | "O(2ⁿ)" | "O(n!)";

export interface ComplexityInfo {
  label: Complexity;
  name: string;
  difficulty: "Constant" | "Logarithmic" | "Linear" | "Linearithmic" | "Quadratic" | "Cubic" | "Exponential" | "Factorial";
  rating: "excellent" | "good" | "fair" | "poor" | "terrible" | "catastrophic";
  color: string;
  explanation: string;
  analogy: string;
  examples: string[];
  pseudoCode: string;
}

export const COMPLEXITY_INFO: Record<Complexity, ComplexityInfo> = {
  "O(1)": {
    label: "O(1)", name: "Constant Time", difficulty: "Constant", rating: "excellent", color: "#22c55e",
    explanation: "The algorithm executes in constant time regardless of input size. No matter how large the data, it always takes the same number of operations.",
    analogy: "Like looking up a word at a specific page number — the book size doesn't matter.",
    examples: ["Array access by index", "Hash table lookup", "Stack push/pop", "Math operation"],
    pseudoCode: "return array[0];",
  },
  "O(log n)": {
    label: "O(log n)", name: "Logarithmic Time", difficulty: "Logarithmic", rating: "excellent", color: "#84cc16",
    explanation: "Operations grow logarithmically as input increases. The algorithm repeatedly halves the problem space, making it very efficient for large inputs.",
    analogy: "Like searching a dictionary by opening to the middle and discarding half — you find it in very few steps.",
    examples: ["Binary search", "BST operations", "Balanced tree search", "Exponentiation by squaring"],
    pseudoCode: "while (low <= high) {\n  mid = (low + high) / 2;\n  if (arr[mid] === target) return mid;\n  else if (arr[mid] < target) low = mid + 1;\n  else high = mid - 1;\n}",
  },
  "O(n)": {
    label: "O(n)", name: "Linear Time", difficulty: "Linear", rating: "good", color: "#3b82f6",
    explanation: "Operations grow linearly with input size. If the input doubles, the time doubles. Common and generally acceptable for most problems.",
    analogy: "Like reading every page of a book to find a sentence — more pages means more time.",
    examples: ["Array traversal", "Linear search", "Counting elements", "Finding max/min"],
    pseudoCode: "for (let i = 0; i < n; i++) {\n  process(array[i]);\n}",
  },
  "O(n log n)": {
    label: "O(n log n)", name: "Linearithmic Time", difficulty: "Linearithmic", rating: "good", color: "#f59e0b",
    explanation: "A combination of linear and logarithmic growth. Typical of efficient sorting algorithms that divide and conquer the problem.",
    analogy: "Like organizing a messy deck of cards by repeatedly splitting and merging sorted halves.",
    examples: ["Merge sort", "Quick sort (avg)", "Heap sort", "FFT algorithm"],
    pseudoCode: "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = arr.length / 2;\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}",
  },
  "O(n²)": {
    label: "O(n²)", name: "Quadratic Time", difficulty: "Quadratic", rating: "fair", color: "#f97316",
    explanation: "Operations grow as the square of the input. Caused by nested loops iterating over the same input. Acceptable for small n, problematic for large datasets.",
    analogy: "Like comparing every student in a class with every other student — if the class doubles, comparisons quadruple.",
    examples: ["Bubble sort", "Selection sort", "Insertion sort", "Checking all pairs"],
    pseudoCode: "for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    process(array[i], array[j]);\n  }\n}",
  },
  "O(n³)": {
    label: "O(n³)", name: "Cubic Time", difficulty: "Cubic", rating: "poor", color: "#ef4444",
    explanation: "Operations grow as the cube of input. Three nested loops each iterating n times. Practical only for very small inputs.",
    analogy: "Like checking every combination of three students in a class — even 100 students means 1,000,000 checks.",
    examples: ["Matrix multiplication (naive)", "Floyd-Warshall (all pairs)", "3-nested loop problems"],
    pseudoCode: "for (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++)\n    for (let k = 0; k < n; k++)\n      process(i, j, k);",
  },
  "O(2ⁿ)": {
    label: "O(2ⁿ)", name: "Exponential Time", difficulty: "Exponential", rating: "terrible", color: "#dc2626",
    explanation: "Operations double with each additional element. Even small inputs can cause enormous computation times. Usually requires optimization or dynamic programming.",
    analogy: "Like a virus that doubles every day — after 30 days, it's over a billion.",
    examples: ["Recursive Fibonacci", "Power set generation", "Brute-force subset problems", "Tower of Hanoi"],
    pseudoCode: "function fib(n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}",
  },
  "O(n!)": {
    label: "O(n!)", name: "Factorial Time", difficulty: "Factorial", rating: "catastrophic", color: "#7f1d1d",
    explanation: "Operations grow as the factorial of the input. Completely infeasible for any n > 20. Appears in brute-force permutation problems.",
    analogy: "Like arranging books on a shelf by trying every possible order — 10 books = 3,628,800 arrangements.",
    examples: ["Travelling salesman (brute)", "Permutation generation", "N-queens brute force"],
    pseudoCode: "function permute(arr) {\n  if (arr.length <= 1) return [arr];\n  return arr.flatMap((v, i) =>\n    permute([...arr.slice(0,i), ...arr.slice(i+1)])\n      .map(p => [v, ...p]));\n}",
  },
};

export const ALL_COMPLEXITIES = Object.keys(COMPLEXITY_INFO) as Complexity[];

// ── Growth functions ──────────────────────────────────────────────────────────

export function growthValue(complexity: Complexity, n: number): number {
  switch (complexity) {
    case "O(1)": return 1;
    case "O(log n)": return Math.max(1, Math.log2(n));
    case "O(n)": return n;
    case "O(n log n)": return n * Math.max(1, Math.log2(n));
    case "O(n²)": return n * n;
    case "O(n³)": return n * n * n;
    case "O(2ⁿ)": return Math.min(Math.pow(2, n), 1e15);
    case "O(n!)": {
      let f = 1;
      for (let i = 2; i <= Math.min(n, 18); i++) f *= i;
      return Math.min(f, 1e15);
    }
    default: return n;
  }
}

// ── Pattern detection ─────────────────────────────────────────────────────────

interface PatternRule {
  keywords: string[];
  complexity: Complexity;
}

const RULES: PatternRule[] = [
  { keywords: ["triple nested", "three nested", "3 nested", "triple loop", "3 loops nested"], complexity: "O(n³)" },
  { keywords: ["nested loop", "nested for", "double loop", "two nested", "2 nested", "n squared", "bubble sort", "selection sort", "insertion sort", "all pairs"], complexity: "O(n²)" },
  { keywords: ["merge sort", "heap sort", "n log n", "linearithmic", "divide and merge", "split and merge", "timsort"], complexity: "O(n log n)" },
  { keywords: ["binary search", "bisect", "log n", "halving", "divide and conquer search", "balanced tree", "bst", "binary tree search"], complexity: "O(log n)" },
  { keywords: ["fibonacci recursive", "recursive fibonacci", "fib(n-1)", "exponential recursive", "power set", "subset sum brute", "2^n"], complexity: "O(2ⁿ)" },
  { keywords: ["permutation", "factorial", "n!", "travelling salesman brute", "all orderings"], complexity: "O(n!)" },
  { keywords: ["single loop", "one loop", "linear search", "array traversal", "for loop over array", "for each", "traverse", "iterate", "scan", "count elements", "find max", "find min", "sum array"], complexity: "O(n)" },
  { keywords: ["constant", "hash lookup", "array access", "index access", "push", "pop", "return first", "o(1)", "hash map get", "hash map set", "dictionary lookup"], complexity: "O(1)" },
  { keywords: ["quick sort", "randomized sort", "average case sort"], complexity: "O(n log n)" },
];

export interface DetectionResult {
  complexity: Complexity;
  confidence: "high" | "medium" | "low";
  matchedKeyword: string;
}

export function detectComplexity(input: string): DetectionResult | null {
  const lower = input.toLowerCase().trim();
  if (!lower) return null;

  for (const rule of RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        return { complexity: rule.complexity, confidence: "high", matchedKeyword: kw };
      }
    }
  }

  // Fuzzy fallback
  if (lower.includes("nested") || lower.includes("matrix")) return { complexity: "O(n²)", confidence: "medium", matchedKeyword: "nested" };
  if (lower.includes("sort")) return { complexity: "O(n log n)", confidence: "medium", matchedKeyword: "sort" };
  if (lower.includes("search") || lower.includes("binary")) return { complexity: "O(log n)", confidence: "medium", matchedKeyword: "search" };
  if (lower.includes("loop") || lower.includes("for") || lower.includes("while") || lower.includes("each")) return { complexity: "O(n)", confidence: "medium", matchedKeyword: "loop" };
  if (lower.includes("recur")) return { complexity: "O(2ⁿ)", confidence: "low", matchedKeyword: "recursion" };

  return null;
}

// ── Loop/recursion builder ────────────────────────────────────────────────────

export function complexityFromLoops(loops: number, recursion: string): Complexity {
  if (recursion === "multiple") return "O(2ⁿ)";
  if (recursion === "divide") return loops > 1 ? "O(n log n)" : "O(log n)";
  if (recursion === "single") return "O(n)";
  if (loops === 1) return "O(n)";
  if (loops === 2) return "O(n²)";
  if (loops === 3) return "O(n³)";
  return "O(1)";
}

// ── Chart data builder ────────────────────────────────────────────────────────

export function buildChartData(complexities: Complexity[], maxN: number, steps = 50): { n: number; values: Record<Complexity, number> }[] {
  const points: { n: number; values: Record<Complexity, number> }[] = [];
  for (let i = 1; i <= steps; i++) {
    const n = Math.max(1, Math.round((i / steps) * maxN));
    const values = {} as Record<Complexity, number>;
    for (const c of complexities) values[c] = growthValue(c, n);
    points.push({ n, values });
  }
  return points;
}

// ── History ───────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  input: string;
  complexity: Complexity;
  timestamp: number;
}

const HISTORY_KEY = "time-complexity-calc-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const h = getHistory();
  h.unshift({ ...entry, id: Date.now().toString(36), timestamp: Date.now() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 20)));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}
