/* °F = °C × 9/5 + 32 and °C = (°F − 32) × 5/9; K = °C + 273.15 */
export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function celsiusToKelvin(c: number): number {
  return c + 273.15;
}

/* Up to `decimals` places, trailing zeros dropped, and never "-0". */
export function formatTemp(value: number, decimals = 2): string {
  if (!isFinite(value)) return "";
  const rounded = Number(value.toFixed(decimals));
  return String(Object.is(rounded, -0) ? 0 : rounded);
}

/* Below absolute zero (−273.15 °C / −459.67 °F) no temperature exists. */
export function isBelowAbsoluteZero(celsius: number): boolean {
  return celsius < -273.15 - 1e-9;
}

export interface ReferencePoint {
  label: string;
  celsius: number;
}

export const REFERENCE_POINTS: ReferencePoint[] = [
  { label: "Absolute zero", celsius: -273.15 },
  { label: "Celsius and Fahrenheit meet", celsius: -40 },
  { label: "Freezer", celsius: -18 },
  { label: "Water freezes", celsius: 0 },
  { label: "Refrigerator", celsius: 4 },
  { label: "Room temperature", celsius: 20 },
  { label: "Hot summer day", celsius: 35 },
  { label: "Body temperature", celsius: 37 },
  { label: "Fever", celsius: 38 },
  { label: "Water boils (sea level)", celsius: 100 },
  { label: "Moderate oven", celsius: 180 },
  { label: "Hot oven", celsius: 220 },
];

/* Conversion chart rows from `from` to `to` in `step` increments. */
export function chartRows(from: number, to: number, step: number): { celsius: number; fahrenheit: number }[] {
  const rows: { celsius: number; fahrenheit: number }[] = [];
  for (let c = from; c <= to + 1e-9; c += step) {
    rows.push({ celsius: c, fahrenheit: celsiusToFahrenheit(c) });
  }
  return rows;
}
