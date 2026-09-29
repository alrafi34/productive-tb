import { CPI_FIRST_YEAR, CPI_LAST, CPI_MONTHLY } from "./cpi-data";

/* CPI for a year (annual average of the published months) or a month (1–12).
   null when the month was not published or is out of range. */
export function cpiFor(year: number, month?: number): number | null {
  const row = CPI_MONTHLY[year - CPI_FIRST_YEAR];
  if (!row) return null;
  if (month) return row[month - 1] ?? null;
  const values = row.filter((v): v is number => v !== null);
  if (!values.length) return null;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

export const YEARS = Array.from({ length: CPI_LAST.year - CPI_FIRST_YEAR + 1 }, (_, i) => CPI_FIRST_YEAR + i);

export type InflationResult = {
  fromCpi: number;
  toCpi: number;
  value: number;
  /* Total change in prices between the two dates, % */
  cumulativePct: number;
  /* Compound average per year, % */
  averagePct: number;
  years: number;
};

export function adjustForInflation(
  amount: number,
  from: { year: number; month?: number },
  to: { year: number; month?: number },
): InflationResult | null {
  const fromCpi = cpiFor(from.year, from.month);
  const toCpi = cpiFor(to.year, to.month);
  if (fromCpi === null || toCpi === null) return null;
  const ratio = toCpi / fromCpi;
  const years = to.year + ((to.month ?? 6.5) - 1) / 12 - (from.year + ((from.month ?? 6.5) - 1) / 12);
  const averagePct = years !== 0 ? (Math.pow(ratio, 1 / years) - 1) * 100 : 0;
  return { fromCpi, toCpi, value: amount * ratio, cumulativePct: (ratio - 1) * 100, averagePct, years };
}

/* Year-over-year change in the annual average CPI, % */
export function annualInflation(year: number): number | null {
  const a = cpiFor(year - 1);
  const b = cpiFor(year);
  return a && b ? (b / a - 1) * 100 : null;
}
