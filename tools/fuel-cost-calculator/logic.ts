export interface FuelCalculation {
  distance: number;
  efficiency: number;
  fuelPrice: number;
  fuelNeeded: number;
  tripCost: number;
  costPerDistance: number;
  distanceUnit: 'miles' | 'km';
  efficiencyUnit: 'mpg' | 'kml';
  currency: string;
}

export interface ComparisonResult {
  vehicle1: FuelCalculation;
  vehicle2: FuelCalculation;
  costDifference: number;
  savingsPercentage: number;
}

export interface RangeEstimate {
  maxDistance: number;
  maxDistanceUnit: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: FuelCalculation;
}

const STORAGE_KEY = 'fuel_calculator_history';
const MAX_HISTORY = 10;

export function calculateFuelCost(
  distance: number,
  efficiency: number,
  fuelPrice: number,
  distanceUnit: 'miles' | 'km',
  efficiencyUnit: 'mpg' | 'kml',
  currency: string = 'USD'
): FuelCalculation {
  if (distance <= 0 || efficiency <= 0 || fuelPrice < 0) {
    return {
      distance,
      efficiency,
      fuelPrice,
      fuelNeeded: 0,
      tripCost: 0,
      costPerDistance: 0,
      distanceUnit,
      efficiencyUnit,
      currency
    };
  }

  const fuelNeeded = distance / efficiency;
  const tripCost = fuelNeeded * fuelPrice;
  const costPerDistance = distance > 0 ? tripCost / distance : 0;

  return {
    distance,
    efficiency,
    fuelPrice,
    fuelNeeded,
    tripCost,
    costPerDistance,
    distanceUnit,
    efficiencyUnit,
    currency
  };
}

export function compareVehicles(
  calc1: FuelCalculation,
  calc2: FuelCalculation
): ComparisonResult {
  const costDifference = Math.abs(calc1.tripCost - calc2.tripCost);
  const higherCost = Math.max(calc1.tripCost, calc2.tripCost);
  const savingsPercentage = higherCost > 0 ? (costDifference / higherCost) * 100 : 0;

  return {
    vehicle1: calc1,
    vehicle2: calc2,
    costDifference,
    savingsPercentage
  };
}

export function estimateRange(
  efficiency: number,
  tankSize: number,
  efficiencyUnit: 'mpg' | 'kml'
): RangeEstimate {
  const maxDistance = efficiency * tankSize;
  const maxDistanceUnit = efficiencyUnit === 'mpg' ? 'miles' : 'km';

  return {
    maxDistance,
    maxDistanceUnit
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    BDT: '৳'
  };

  const symbol = currencySymbols[currency] || '$';
  return `${symbol}${amount.toFixed(2)}`;
}

export function getHistoryFromStorage(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(calculation: FuelCalculation): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistoryFromStorage();
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      calculation
    };
    history.unshift(newEntry);
    if (history.length > MAX_HISTORY) {
      history.pop();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}

export function deleteHistoryEntry(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistoryFromStorage();
    const filtered = history.filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // Silently fail
  }
}

export function exportToCSV(calculations: FuelCalculation[]): string {
  let csv = 'Distance,Efficiency,Fuel Price,Fuel Needed,Trip Cost,Cost Per Distance\n';
  calculations.forEach(calc => {
    const distUnit = calc.distanceUnit === 'miles' ? 'mi' : 'km';
    const effUnit = calc.efficiencyUnit === 'mpg' ? 'MPG' : 'km/L';
    csv += `${calc.distance} ${distUnit},${calc.efficiency} ${effUnit},${calc.fuelPrice},${calc.fuelNeeded.toFixed(2)},${calc.tripCost.toFixed(2)},${calc.costPerDistance.toFixed(4)}\n`;
  });
  return csv;
}

export function exportToJSON(calculations: FuelCalculation[]): string {
  return JSON.stringify(calculations, null, 2);
}

export function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getCalculationSummary(calc: FuelCalculation): string {
  const distUnit = calc.distanceUnit === 'miles' ? 'miles' : 'km';
  const effUnit = calc.efficiencyUnit === 'mpg' ? 'MPG' : 'km/L';
  const fuelUnit = calc.efficiencyUnit === 'mpg' ? 'gallons' : 'liters';
  
  return `Trip Distance: ${calc.distance} ${distUnit}
Fuel Efficiency: ${calc.efficiency} ${effUnit}
Fuel Price: ${formatCurrency(calc.fuelPrice)}/${fuelUnit}
Fuel Needed: ${calc.fuelNeeded.toFixed(2)} ${fuelUnit}
Estimated Cost: ${formatCurrency(calc.tripCost)}
Cost per ${distUnit === 'miles' ? 'mile' : 'km'}: ${formatCurrency(calc.costPerDistance)}`;
}
