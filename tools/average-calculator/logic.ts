export function parseNumbers(input: string): number[] {
  if (!input.trim()) return [];
  
  const numbers = input
    .split(/[\s,\n\t]+/)
    .map(s => parseFloat(s.trim()))
    .filter(n => !isNaN(n));
  
  return numbers;
}

export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
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
    'Average,' + formatNumber(average)
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
