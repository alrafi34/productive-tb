export type VoltageUnit = 'mV' | 'V' | 'kV';
export type CurrentUnit = 'uA' | 'mA' | 'A';
export type ResistanceUnit = 'Ω' | 'kΩ' | 'MΩ';

export interface OhmsValues {
  voltage: string;
  voltageUnit: VoltageUnit;
  current: string;
  currentUnit: CurrentUnit;
  resistance: string;
  resistanceUnit: ResistanceUnit;
}

export type CalculatedField = 'Voltage' | 'Current' | 'Resistance';

export interface CalculationResult {
  type: CalculatedField;
  value: number;
  unit: string;
  formattedValue: string;
}

export interface OhmsHistoryEntry {
  id: string;
  timestamp: number;
  inputs: {
    voltage: { value: string; unit: VoltageUnit } | null;
    current: { value: string; unit: CurrentUnit } | null;
    resistance: { value: string; unit: ResistanceUnit } | null;
  };
  result: CalculationResult;
}

export const VOLTAGE_MULTIPLIERS: Record<VoltageUnit, number> = {
  'mV': 1e-3,
  'V': 1,
  'kV': 1e3
};

export const CURRENT_MULTIPLIERS: Record<CurrentUnit, number> = {
  'uA': 1e-6,
  'mA': 1e-3,
  'A': 1
};

export const RESISTANCE_MULTIPLIERS: Record<ResistanceUnit, number> = {
  'Ω': 1,
  'kΩ': 1e3,
  'MΩ': 1e6
};

export function formatResult(val: number): string {
  if (Math.abs(val) < 1e-6 && val !== 0) {
    return val.toExponential(4);
  }
  return Number(val.toFixed(4)).toString();
}

export function calculateOhmsLaw(values: OhmsValues): { result: CalculationResult | null, error: string | null } {
  const v = parseFloat(values.voltage);
  const i = parseFloat(values.current);
  const r = parseFloat(values.resistance);

  const hasV = !isNaN(v) && values.voltage.trim() !== "";
  const hasI = !isNaN(i) && values.current.trim() !== "";
  const hasR = !isNaN(r) && values.resistance.trim() !== "";

  const countInputs = (hasV ? 1 : 0) + (hasI ? 1 : 0) + (hasR ? 1 : 0);

  if (countInputs < 2) {
    return { result: null, error: null }; // Need at least two
  }

  if (countInputs === 3) {
    return { result: null, error: "Please clear one field to calculate it." };
  }

  try {
    if (hasI && hasR && !hasV) {
      const iStd = i * CURRENT_MULTIPLIERS[values.currentUnit];
      const rStd = r * RESISTANCE_MULTIPLIERS[values.resistanceUnit];
      const vStd = iStd * rStd;
      const cv = vStd / VOLTAGE_MULTIPLIERS[values.voltageUnit];
      
      return {
        result: {
          type: 'Voltage',
          value: cv,
          unit: values.voltageUnit,
          formattedValue: formatResult(cv)
        },
        error: null
      };
    }

    if (hasV && hasR && !hasI) {
      const vStd = v * VOLTAGE_MULTIPLIERS[values.voltageUnit];
      const rStd = r * RESISTANCE_MULTIPLIERS[values.resistanceUnit];
      
      if (rStd === 0) {
        return { result: null, error: "Resistance cannot be zero." };
      }
      
      const iStd = vStd / rStd;
      const ci = iStd / CURRENT_MULTIPLIERS[values.currentUnit];

      return {
        result: {
          type: 'Current',
          value: ci,
          unit: values.currentUnit,
          formattedValue: formatResult(ci)
        },
        error: null
      };
    }

    if (hasV && hasI && !hasR) {
      const vStd = v * VOLTAGE_MULTIPLIERS[values.voltageUnit];
      const iStd = i * CURRENT_MULTIPLIERS[values.currentUnit];
      
      if (iStd === 0) {
        return { result: null, error: "Current cannot be zero." };
      }
      
      const rStd = vStd / iStd;
      const cr = rStd / RESISTANCE_MULTIPLIERS[values.resistanceUnit];

      return {
        result: {
          type: 'Resistance',
          value: cr,
          unit: values.resistanceUnit,
          formattedValue: formatResult(cr)
        },
        error: null
      };
    }
  } catch {
    return { result: null, error: "An unexpected calculation error occurred." };
  }
  
  return { result: null, error: null };
}

const STORAGE_KEY = 'ohms_law_calculator_history';

export function getHistory(): OhmsHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: OhmsHistoryEntry) {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const updated = [entry, ...history].slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}

export function clearHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function deleteHistoryEntry(id: string) {
    if (typeof window === 'undefined') return;
    try {
        const history = getHistory();
        const updated = history.filter(h => h.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
        // Ignore
    }
}
