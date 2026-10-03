import type { CarryOverLink } from "@/components/CarryOverLinks";

/* Link builders for tools that receive carried-over values. Each returns
   null when the target tool cannot take the values as they are (a voltage or
   currency it does not offer), so callers never send a half-filled form
   whose result would be wrong. Keep these lists in step with the targets. */

/* Supply voltages the circuit breaker calculator offers */
const BREAKER_VOLTAGES = [120, 230, 240, 400, 415];
/* Supply voltages the wire size calculator offers */
const WIRE_SIZE_VOLTAGES = [110, 120, 220, 230, 240, 380, 400, 415];
/* Currencies the electric bill calculator offers */
const BILL_CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"];

type Phase = "single" | "three";

const clean = (n: number) => String(parseFloat(n.toPrecision(10)));

/* Circuit breaker: load in W at a supply voltage. The breaker works out the
   current from load, voltage and power factor, so the voltage must match. */
export function breakerLink(loadW: number, voltage: number, phase: Phase, pf: number): CarryOverLink | null {
  if (!(loadW > 0) || !BREAKER_VOLTAGES.includes(voltage) || !(pf > 0 && pf <= 1)) return null;
  const q = new URLSearchParams({ load: clean(loadW), voltage: String(voltage), phase, pf: clean(pf) });
  return { label: "Size the breaker", href: `/tools/electrical/circuit-breaker-calculator?${q}` };
}

/* Wire size: load current at a supply voltage (the voltage sets the
   allowed drop in volts, so it must match too) */
export function wireSizeLink(currentA: number, voltage: number, phase: Phase): CarryOverLink | null {
  if (!(currentA > 0) || !WIRE_SIZE_VOLTAGES.includes(voltage)) return null;
  const q = new URLSearchParams({ current: clean(currentA), voltage: String(voltage), phase });
  return { label: "Find the wire size", href: `/tools/electrical/wire-size-calculator?${q}` };
}

/* Electric bill: monthly kWh at a flat price per kWh. The price is in the
   sender's currency, so the bill must offer that currency too. */
export function billLink(monthlyKwh: number, rate: number, currency: string): CarryOverLink | null {
  if (!(monthlyKwh > 0) || !(rate > 0) || !BILL_CURRENCIES.includes(currency)) return null;
  const q = new URLSearchParams({ kwh: clean(monthlyKwh), rate: String(rate), currency });
  return { label: "Add it to your electric bill", href: `/tools/electrical/electric-bill-calculator?${q}` };
}

/* Drops the links that could not be built */
export const presentLinks = (links: (CarryOverLink | null)[]): CarryOverLink[] =>
  links.filter((l): l is CarryOverLink => l !== null);
