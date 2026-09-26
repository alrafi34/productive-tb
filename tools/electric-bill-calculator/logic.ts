import { Appliance, BillingType, Currency, Slab, BillCalculation, SlabBreakdown, HistoryEntry, Preset } from "./types";

const HISTORY_KEY = "electric-bill-calculator-history";
const MAX_HISTORY = 10;

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Calculate flat rate bill
export function calculateFlatRate(
  units: number,
  rate: number,
  serviceCharge: number,
  meterCharge: number,
  taxPercent: number
): number {
  const energyCost = units * rate;
  const subtotal = energyCost + serviceCharge + meterCharge;
  const tax = (subtotal * taxPercent) / 100;
  return subtotal + tax;
}

// Calculate tiered rate bill
export function calculateTieredRate(
  units: number,
  slabs: Slab[],
  serviceCharge: number,
  meterCharge: number,
  taxPercent: number
): { total: number; breakdown: SlabBreakdown[] } {
  let remaining = units;
  let energyCost = 0;
  const breakdown: SlabBreakdown[] = [];

  // Sort slabs by min value
  const sortedSlabs = [...slabs].sort((a, b) => a.min - b.min);

  for (const slab of sortedSlabs) {
    if (remaining <= 0) break;

    // Slabs are inclusive ranges of whole units ("0–75", "76–200"), so a slab
    // holds max − (min − 1) units; a first slab written from 0 or 1 holds max.
    const slabRange = slab.max === Infinity ? Infinity : slab.max - Math.max(slab.min - 1, 0);
    const unitsInSlab = Math.min(remaining, slabRange);
    const cost = unitsInSlab * slab.rate;

    energyCost += cost;
    breakdown.push({
      range: slab.max === Infinity ? `${slab.min}+` : `${slab.min}-${slab.max}`,
      units: unitsInSlab,
      rate: slab.rate,
      cost
    });

    remaining -= unitsInSlab;
  }

  const subtotal = energyCost + serviceCharge + meterCharge;
  const tax = (subtotal * taxPercent) / 100;
  const total = subtotal + tax;

  return { total, breakdown };
}

// Perform full calculation
export function performCalculation(
  units: number,
  billingType: BillingType,
  currency: Currency,
  flatRate: number,
  slabs: Slab[],
  serviceCharge: number,
  meterCharge: number,
  taxPercent: number
): BillCalculation {
  let subtotal = 0;
  let breakdown: SlabBreakdown[] = [];

  if (billingType === "flat") {
    const energyCost = units * flatRate;
    subtotal = energyCost + serviceCharge + meterCharge;
    breakdown = [{
      range: "All units",
      units,
      rate: flatRate,
      cost: energyCost
    }];
  } else {
    const result = calculateTieredRate(units, slabs, serviceCharge, meterCharge, taxPercent);
    subtotal = result.total - (result.total * taxPercent) / (100 + taxPercent);
    breakdown = result.breakdown;
  }

  const totalTax = (subtotal * taxPercent) / 100;
  const totalBill = subtotal + totalTax;

  return {
    units,
    billingType,
    currency,
    flatRate: billingType === "flat" ? flatRate : undefined,
    slabs: billingType === "tiered" ? slabs : undefined,
    serviceCharge,
    meterCharge,
    taxPercent,
    subtotal,
    totalTax,
    totalBill,
    breakdown,
    timestamp: Date.now()
  };
}

export const CURRENCIES: { code: Currency; label: string }[] = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "CAD", label: "CAD (CA$)" },
  { code: "AUD", label: "AUD (A$)" },
  { code: "INR", label: "INR (₹)" },
  { code: "BDT", label: "BDT (৳)" },
];

/* A starting price per kWh for each currency, replaced by the visitor's own.
   USD: EIA 2026 U.S. residential average; EUR: Eurostat EU household average,
   2nd half of 2025; GBP: Ofgem price cap, Oct–Dec 2026. */
export const TYPICAL_RATE: Record<Currency, number> = {
  USD: 0.18,
  EUR: 0.29,
  GBP: 0.2632,
  CAD: 0.18,
  AUD: 0.33,
  INR: 7,
  BDT: 8.5,
};

const CURRENCY_BY_TIMEZONE: Record<string, Currency> = {
  "Europe/London": "GBP",
  "Asia/Kolkata": "INR",
  "Asia/Calcutta": "INR",
  "Asia/Dhaka": "BDT",
};

const CURRENCY_BY_REGION: Record<string, Currency> = {
  US: "USD", GB: "GBP", CA: "CAD", AU: "AUD", IN: "INR", BD: "BDT",
  DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", BE: "EUR", AT: "EUR",
  IE: "EUR", PT: "EUR", FI: "EUR", GR: "EUR", SK: "EUR", SI: "EUR", LT: "EUR",
  LV: "EUR", EE: "EUR", LU: "EUR", MT: "EUR", CY: "EUR", HR: "EUR",
};

/* The visitor's likely currency, from the timezone first (it says where
   they are; many browsers are set to en-US anywhere): London → £, other
   European zones → €, Canadian and Australian zones → their dollar. Then
   the browser language's region, and US dollars otherwise. */
export function guessCurrency(timeZone?: string, language?: string): Currency {
  try {
    const zone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const lang = language ?? (typeof navigator !== "undefined" ? navigator.language : "");
    const region = /[-_]([A-Za-z]{2})\b/.exec(lang || "")?.[1]?.toUpperCase();
    if (CURRENCY_BY_TIMEZONE[zone]) return CURRENCY_BY_TIMEZONE[zone];
    if (zone.startsWith("Australia/")) return "AUD";
    if (/^America\/(Toronto|Vancouver|Montreal|Edmonton|Winnipeg|Halifax|Regina|St_Johns)$/.test(zone)) return "CAD";
    if (zone.startsWith("Europe/")) return "EUR";
    if (region && CURRENCY_BY_REGION[region]) return CURRENCY_BY_REGION[region];
  } catch {
    // fall through
  }
  return "USD";
}

const currencyFormatters = new Map<string, Intl.NumberFormat>();

// Format number with currency ("$27.00", "€8.70", "৳1,912.00")
export function formatCurrency(value: number, currency: Currency, decimals: number = 2): string {
  const key = `${currency}-${decimals}`;
  let formatter = currencyFormatters.get(key);
  if (!formatter) {
    try {
      formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        currencyDisplay: currency === "CAD" || currency === "AUD" ? "symbol" : "narrowSymbol",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    } catch {
      return `${value.toFixed(decimals)} ${currency}`;
    }
    currencyFormatters.set(key, formatter);
  }
  return formatter.format(value);
}

// Energy used by appliances: watts × quantity × hours a day × days ÷ 1000 = kWh
export function applianceKwh(appliance: Appliance, days: number): number {
  const w = Math.max(0, appliance.watts || 0);
  const q = Math.max(0, appliance.quantity || 0);
  const h = Math.min(24, Math.max(0, appliance.hoursPerDay || 0));
  return (w * q * h * Math.max(0, days || 0)) / 1000;
}

export function totalApplianceKwh(appliances: Appliance[], days: number): number {
  return appliances.reduce((sum, a) => sum + applianceKwh(a, days), 0);
}

/* Typical power draw, for quick adding; the visitor edits the watts. */
export const COMMON_APPLIANCES: { name: string; watts: number; hoursPerDay: number }[] = [
  { name: "LED bulb", watts: 10, hoursPerDay: 5 },
  { name: "Ceiling fan", watts: 75, hoursPerDay: 8 },
  // A fridge's compressor cycles on and off, so its average draw is far below its rating
  { name: "Refrigerator (average)", watts: 60, hoursPerDay: 24 },
  { name: "Television", watts: 100, hoursPerDay: 4 },
  { name: "Laptop", watts: 60, hoursPerDay: 6 },
  { name: "Desktop PC", watts: 250, hoursPerDay: 4 },
  { name: "Washing machine", watts: 500, hoursPerDay: 1 },
  { name: "Microwave", watts: 1100, hoursPerDay: 0.3 },
  { name: "Electric kettle", watts: 2000, hoursPerDay: 0.25 },
  { name: "Air conditioner", watts: 1500, hoursPerDay: 6 },
  { name: "Space heater", watts: 1500, hoursPerDay: 4 },
  { name: "Clothes dryer", watts: 3000, hoursPerDay: 1 },
  { name: "Water heater (tank)", watts: 4500, hoursPerDay: 3 },
  { name: "EV charger (Level 2)", watts: 7200, hoursPerDay: 1 },
];

export function createDefaultAppliances(): Appliance[] {
  return [
    { id: generateId(), name: "Refrigerator (average)", watts: 60, quantity: 1, hoursPerDay: 24 },
    { id: generateId(), name: "LED bulb", watts: 10, quantity: 6, hoursPerDay: 5 },
    { id: generateId(), name: "Television", watts: 100, quantity: 1, hoursPerDay: 4 },
  ];
}

// Format number
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Validate inputs
export function validateInputs(
  units: number,
  billingType: BillingType,
  flatRate: number,
  slabs: Slab[]
): string | null {
  if (isNaN(units) || units < 0) {
    return "Please enter valid electricity usage (0 or greater)";
  }

  if (billingType === "flat") {
    if (isNaN(flatRate) || flatRate < 0) {
      return "Please enter valid rate per unit";
    }
  } else {
    if (slabs.length === 0) {
      return "Please add at least one slab";
    }

    // Validate slabs
    for (const slab of slabs) {
      if (isNaN(slab.rate) || slab.rate < 0) {
        return "All slab rates must be valid positive numbers";
      }
      if (slab.min < 0 || (slab.max !== Infinity && slab.max < slab.min)) {
        return "Invalid slab range";
      }
    }
  }

  return null;
}

// Presets: published averages to start from; every value stays editable
export function getPresets(): Preset[] {
  return [
    {
      name: "USA Average",
      description: "18¢/kWh – EIA 2026 U.S. residential average",
      billingType: "flat",
      currency: "USD",
      flatRate: 0.18
    },
    {
      name: "UK Price Cap",
      description: "26.32p/kWh + 54.83p/day standing charge (Ofgem, Oct–Dec 2026)",
      billingType: "flat",
      currency: "GBP",
      flatRate: 0.2632,
      // 54.83p a day for a 30-day bill
      serviceCharge: 16.45
    },
    {
      name: "EU Average",
      description: "€0.29/kWh incl. taxes – Eurostat, 2nd half of 2025",
      billingType: "flat",
      currency: "EUR",
      flatRate: 0.29
    },
    {
      name: "India Residential",
      description: "Typical Indian tiered tariff",
      billingType: "tiered",
      currency: "INR",
      slabs: [
        { id: generateId(), min: 0, max: 100, rate: 3.0 },
        { id: generateId(), min: 101, max: 200, rate: 4.5 },
        { id: generateId(), min: 201, max: 500, rate: 6.0 },
        { id: generateId(), min: 501, max: Infinity, rate: 7.0 }
      ]
    },
    {
      name: "Bangladesh Residential",
      description: "BERC tiered tariff (June 2026) + 5% VAT",
      billingType: "tiered",
      currency: "BDT",
      taxPercent: 5,
      slabs: [
        { id: generateId(), min: 0, max: 75, rate: 5.26 },
        { id: generateId(), min: 76, max: 200, rate: 8.5 },
        { id: generateId(), min: 201, max: 300, rate: 9.1 },
        { id: generateId(), min: 301, max: 400, rate: 9.62 },
        { id: generateId(), min: 401, max: 600, rate: 15.01 },
        { id: generateId(), min: 601, max: Infinity, rate: 17.35 }
      ]
    }
  ];
}

// Create default slabs
export function createDefaultSlabs(): Slab[] {
  return [
    { id: generateId(), min: 0, max: 100, rate: 5 },
    { id: generateId(), min: 101, max: 300, rate: 7 },
    { id: generateId(), min: 301, max: Infinity, rate: 10 }
  ];
}

// History management
export function saveToHistory(calculation: BillCalculation): void {
  if (typeof window === "undefined") return;

  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: generateId(),
      calculation,
      timestamp: Date.now()
    };

    history.unshift(entry);
    const trimmed = history.slice(0, MAX_HISTORY);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error("Failed to save history:", error);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    const history: HistoryEntry[] = stored ? JSON.parse(stored) : [];
    // JSON has no Infinity: the open-ended last slab comes back as null
    for (const entry of history) {
      entry.calculation.slabs?.forEach(slab => {
        if ((slab.max as number | null) === null) slab.max = Infinity;
      });
    }
    return history;
  } catch (error) {
    console.error("Failed to load history:", error);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
}

// Export functions
export function exportToCSV(calculation: BillCalculation): string {
  let csv = "Range,Units,Rate,Cost\n";

  calculation.breakdown.forEach(item => {
    csv += `${item.range},${item.units},${item.rate},${formatNumber(item.cost)}\n`;
  });

  csv += `\nService Charge,,${formatNumber(calculation.serviceCharge)}\n`;
  csv += `Meter Charge,,${formatNumber(calculation.meterCharge)}\n`;
  csv += `Tax (${calculation.taxPercent}%),,${formatNumber(calculation.totalTax)}\n`;
  csv += `Total Bill,,${formatNumber(calculation.totalBill)} ${calculation.currency}\n`;

  return csv;
}

export function exportToText(calculation: BillCalculation): string {
  let text = `ELECTRICITY BILL CALCULATION\n`;
  text += `${"=".repeat(50)}\n\n`;
  text += `Generated: ${new Date(calculation.timestamp).toLocaleString()}\n\n`;

  text += `CONSUMPTION:\n`;
  text += `Total Units: ${calculation.units} kWh\n`;
  text += `Billing Type: ${calculation.billingType === "flat" ? "Flat Rate" : "Tiered Rate"}\n\n`;

  text += `BREAKDOWN:\n`;
  text += `${"-".repeat(50)}\n`;

  calculation.breakdown.forEach(item => {
    text += `${item.range} kWh: ${item.units} units × ${item.rate} = ${formatNumber(item.cost)} ${calculation.currency}\n`;
  });

  text += `\nADDITIONAL CHARGES:\n`;
  text += `Service Charge: ${formatNumber(calculation.serviceCharge)} ${calculation.currency}\n`;
  text += `Meter Charge: ${formatNumber(calculation.meterCharge)} ${calculation.currency}\n`;

  text += `\nTAX:\n`;
  text += `Tax (${calculation.taxPercent}%): ${formatNumber(calculation.totalTax)} ${calculation.currency}\n`;

  text += `\n${"=".repeat(50)}\n`;
  text += `TOTAL BILL: ${formatNumber(calculation.totalBill)} ${calculation.currency}\n`;
  text += `${"=".repeat(50)}\n`;

  return text;
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
