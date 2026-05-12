import { BillingType, Currency, Slab, BillCalculation, SlabBreakdown, HistoryEntry, Preset } from "./types";

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

    const slabRange = slab.max === Infinity ? Infinity : slab.max - slab.min + 1;
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

// Format number with currency
export function formatCurrency(value: number, currency: Currency, decimals: number = 2): string {
  return `${value.toFixed(decimals)} ${currency}`;
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

// Presets
export function getPresets(): Preset[] {
  return [
    {
      name: "Bangladesh Residential",
      description: "Standard residential tariff",
      billingType: "tiered",
      currency: "BDT",
      slabs: [
        { id: generateId(), min: 0, max: 75, rate: 4.0 },
        { id: generateId(), min: 76, max: 200, rate: 5.3 },
        { id: generateId(), min: 201, max: 300, rate: 5.8 },
        { id: generateId(), min: 301, max: 400, rate: 6.0 },
        { id: generateId(), min: 401, max: 600, rate: 9.5 },
        { id: generateId(), min: 601, max: Infinity, rate: 11.0 }
      ]
    },
    {
      name: "India Residential",
      description: "Typical Indian tariff",
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
      name: "USA Flat Rate",
      description: "Simple flat rate billing",
      billingType: "flat",
      currency: "USD",
      flatRate: 0.12
    },
    {
      name: "UK Standard",
      description: "UK residential rate",
      billingType: "flat",
      currency: "GBP",
      flatRate: 0.28
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
    return stored ? JSON.parse(stored) : [];
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
