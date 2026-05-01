import { Unit, RebarCalculation, CalculationHistory, DiameterPreset, BatchEntry } from './types';

// Constants
const STEEL_DENSITY = 7850; // kg/m³
const KG_TO_LB = 2.20462;
const METER_TO_FEET = 3.28084;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Standard rebar diameter presets (mm)
export const getDiameterPresets = (): DiameterPreset[] => {
  return [
    { value: 6, label: '6 mm', common: false },
    { value: 8, label: '8 mm', common: true },
    { value: 10, label: '10 mm', common: true },
    { value: 12, label: '12 mm', common: true },
    { value: 16, label: '16 mm', common: true },
    { value: 20, label: '20 mm', common: true },
    { value: 25, label: '25 mm', common: true },
    { value: 32, label: '32 mm', common: false },
    { value: 40, label: '40 mm', common: false }
  ];
};

// Calculate rebar weight using standard formula: Weight per meter = D² / 162
export const calculateRebarWeight = (
  diameter: number,
  length: number,
  quantity: number,
  unit: Unit
): RebarCalculation | null => {
  
  if (isNaN(diameter) || isNaN(length) || isNaN(quantity) || 
      diameter <= 0 || length <= 0 || quantity <= 0) {
    return null;
  }

  // Convert imperial to metric if needed
  let diameterMm = diameter;
  let lengthM = length;
  
  if (unit === 'imperial') {
    // Assuming diameter input is in inches for imperial
    diameterMm = diameter * 25.4; // inches to mm
    lengthM = length / METER_TO_FEET; // feet to meters
  }

  // Calculate weight per meter using standard formula: D² / 162
  const weightPerMeter = (diameterMm * diameterMm) / 162;
  
  // Calculate weight per foot
  const weightPerFoot = weightPerMeter / METER_TO_FEET;
  
  // Calculate total weight in kg
  const totalWeight = weightPerMeter * lengthM * quantity;
  
  // Convert to pounds
  const totalWeightLb = totalWeight * KG_TO_LB;

  return {
    id: generateId(),
    diameter: unit === 'imperial' ? diameter : diameterMm,
    length: unit === 'imperial' ? length : lengthM,
    quantity,
    weightPerMeter,
    weightPerFoot,
    totalWeight,
    totalWeightLb,
    unit,
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 3): string => {
  return num.toFixed(decimals);
};

// Save to history
export const saveToHistory = (calculation: RebarCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('rebar-weight-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('rebar-weight-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('rebar-weight-calculator-history');
};

// Export batch to CSV
export const exportBatchToCSV = (batch: BatchEntry[]): string => {
  let csv = 'Diameter (mm),Length (m),Quantity,Weight per meter (kg/m),Total Weight (kg),Total Weight (lb)\n';
  
  batch.forEach(entry => {
    csv += `${formatNumber(entry.diameter, 1)},`;
    csv += `${formatNumber(entry.length, 2)},`;
    csv += `${entry.quantity},`;
    csv += `${formatNumber(entry.weightPerMeter, 3)},`;
    csv += `${formatNumber(entry.totalWeight, 2)},`;
    csv += `${formatNumber(entry.totalWeightLb, 2)}\n`;
  });
  
  // Add totals
  const totalWeight = batch.reduce((sum, entry) => sum + entry.totalWeight, 0);
  const totalWeightLb = batch.reduce((sum, entry) => sum + entry.totalWeightLb, 0);
  
  csv += `\nTotal,,,,,${formatNumber(totalWeight, 2)},${formatNumber(totalWeightLb, 2)}\n`;
  
  return csv;
};

// Export to text
export const exportToText = (calculation: RebarCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   REBAR WEIGHT CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'INPUT PARAMETERS:\n';
  text += '───────────────────────────────────────\n';
  text += `Diameter:         ${formatNumber(calculation.diameter, 1)} mm\n`;
  text += `Length:           ${formatNumber(calculation.length, 2)} m\n`;
  text += `Quantity:         ${calculation.quantity} bars\n\n`;
  
  text += 'CALCULATION RESULTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Weight per meter: ${formatNumber(calculation.weightPerMeter, 3)} kg/m\n`;
  text += `Weight per foot:  ${formatNumber(calculation.weightPerFoot, 3)} kg/ft\n`;
  text += `Total Weight:     ${formatNumber(calculation.totalWeight, 2)} kg\n`;
  text += `                  (${formatNumber(calculation.totalWeightLb, 2)} lb)\n\n`;
  
  text += 'FORMULA USED:\n';
  text += '───────────────────────────────────────\n';
  text += 'Weight per meter = D² / 162\n';
  text += 'Total Weight = Weight per meter × Length × Quantity\n';
  text += '═══════════════════════════════════════\n';
  
  return text;
};

// Export batch to text
export const exportBatchToText = (batch: BatchEntry[]): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   BATCH REBAR WEIGHT CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  batch.forEach((entry, index) => {
    text += `ENTRY ${index + 1}:\n`;
    text += '───────────────────────────────────────\n';
    text += `Diameter:         ${formatNumber(entry.diameter, 1)} mm\n`;
    text += `Length:           ${formatNumber(entry.length, 2)} m\n`;
    text += `Quantity:         ${entry.quantity} bars\n`;
    text += `Weight per meter: ${formatNumber(entry.weightPerMeter, 3)} kg/m\n`;
    text += `Total Weight:     ${formatNumber(entry.totalWeight, 2)} kg (${formatNumber(entry.totalWeightLb, 2)} lb)\n\n`;
  });
  
  const totalWeight = batch.reduce((sum, entry) => sum + entry.totalWeight, 0);
  const totalWeightLb = batch.reduce((sum, entry) => sum + entry.totalWeightLb, 0);
  
  text += 'BATCH TOTALS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Total Weight:     ${formatNumber(totalWeight, 2)} kg\n`;
  text += `                  (${formatNumber(totalWeightLb, 2)} lb)\n`;
  text += '═══════════════════════════════════════\n';
  
  return text;
};

// Download file
export const downloadFile = (content: string, filename: string, type: string = 'text/plain'): void => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Convert diameter from inches to mm
export const inchesToMm = (inches: number): number => {
  return inches * 25.4;
};

// Convert diameter from mm to inches
export const mmToInches = (mm: number): number => {
  return mm / 25.4;
};
