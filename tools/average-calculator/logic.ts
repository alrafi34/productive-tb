/* Values may be separated by new lines, tabs, spaces, semicolons or commas.
   A comma inside a number written in thousands groups (1,000 or 12,345.6)
   is read as a thousands separator, so pasted formatted figures work; a
   leading currency sign or trailing % is ignored. */
const THOUSANDS = /^-?\d{1,3}(,\d{3})+(\.\d+)?$/;

export function parseNumbers(input: string): number[] {
  if (!input.trim()) return [];
  const numbers: number[] = [];
  for (const chunk of input.split(/[\s;]+|,\s+/)) {
    const clean = chunk.replace(/^[$€£¥]|%$/g, "");
    if (!clean) continue;
    const parts = THOUSANDS.test(clean) ? [clean.replace(/,/g, "")] : clean.split(",");
    for (const part of parts) {
      const n = Number(part.replace(/^[$€£¥]|%$/g, ""));
      if (part !== "" && Number.isFinite(n)) numbers.push(n);
    }
  }
  return numbers;
}

export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

// Every value that shares the highest count; none when no value repeats
export function modes(numbers: number[]): number[] {
  const counts = new Map<number, number>();
  for (const n of numbers) counts.set(n, (counts.get(n) ?? 0) + 1);
  const top = Math.max(0, ...counts.values());
  if (top < 2) return [];
  return [...counts.entries()].filter(([, c]) => c === top).map(([n]) => n).sort((a, b) => a - b);
}

/* Standard deviation: "sample" divides by n − 1 (data is a sample of a
   larger group), "population" by n (data is the whole group). */
export function standardDeviation(numbers: number[], kind: "sample" | "population"): number {
  const n = numbers.length;
  if (n < (kind === "sample" ? 2 : 1)) return 0;
  const mean = calculateAverage(numbers);
  const squares = numbers.reduce((acc, x) => acc + (x - mean) ** 2, 0);
  return Math.sqrt(squares / (kind === "sample" ? n - 1 : n));
}

/* Σ(value × weight) ÷ Σweight, pairing values and weights in order. */
export function weightedAverage(values: number[], weights: number[]): number | null {
  if (values.length === 0 || values.length !== weights.length) return null;
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return null;
  return values.reduce((acc, v, i) => acc + v * weights[i], 0) / totalWeight;
}

export function formatNumber(num: number): string {
  if (!isFinite(num)) return "0";
  if (Number.isInteger(num)) return num.toString();
  return parseFloat(num.toFixed(4)).toString();
}

export function exportToCSV(numbers: number[], average: number): string {
  const lines = [
    'Number,Value',
    ...numbers.map((n, i) => `${i + 1},${n}`),
    '',
    'Count,' + numbers.length,
    'Sum,' + formatNumber(numbers.reduce((a, b) => a + b, 0)),
    'Average,' + formatNumber(average),
    'Median,' + formatNumber(median(numbers)),
    'Sample standard deviation,' + formatNumber(standardDeviation(numbers, 'sample')),
  ];
  return lines.join('\n');
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
