import { CalculationType, Unit, SteelCalculation, CalculationHistory, SteelFactorPreset } from './types';

// Constants
const KG_TO_TONS = 0.001;
const SQ_FT_TO_SQ_M = 0.092903;
const FT_TO_M = 0.3048;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get steel factor presets
export const getSteelFactorPresets = (): SteelFactorPreset[] => {
  return [
    {
      type: 'slab',
      name: 'Light Slab',
      value: 3,
      description: '3 kg/sq ft - Residential light load'
    },
    {
      type: 'slab',
      name: 'Medium Slab',
      value: 4,
      description: '4 kg/sq ft - Standard residential'
    },
    {
      type: 'slab',
      name: 'Heavy Slab',
      value: 5,
      description: '5 kg/sq ft - Commercial/heavy load'
    },
    {
      type: 'beam',
      name: 'Light Beam',
      value: 2,
      description: '2 kg/ft - Small span beams'
    },
    {
      type: 'beam',
      name: 'Medium Beam',
      value: 2.5,
      description: '2.5 kg/ft - Standard beams'
    },
    {
      type: 'beam',
      name: 'Heavy Beam',
      value: 4,
      description: '4 kg/ft - Large span beams'
    }
  ];
};

// Calculate steel for slab
export const calculateSlabSteel = (
  area: number,
  steelFactor: number,
  unit: Unit
): SteelCalculation | null => {
  
  if (isNaN(area) || isNaN(steelFactor) || area <= 0 || steelFactor <= 0) {
    return null;
  }

  // Convert to metric if imperial
  let areaM2 = area;
  let factorKgPerM2 = steelFactor;
  
  if (unit === 'imperial') {
    // Convert sq ft to sq m and adjust factor
    areaM2 = area * SQ_FT_TO_SQ_M;
    // Factor is in kg/sq ft, convert to kg/sq m
    factorKgPerM2 = steelFactor / SQ_FT_TO_SQ_M;
  }

  const totalSteel = areaM2 * factorKgPerM2;
  const totalSteelTons = totalSteel * KG_TO_TONS;

  return {
    id: generateId(),
    type: 'slab',
    totalSteel,
    totalSteelTons,
    unit,
    inputs: { area, steelFactor },
    timestamp: Date.now()
  };
};

// Calculate steel for beam
export const calculateBeamSteel = (
  length: number,
  steelPerLength: number,
  unit: Unit
): SteelCalculation | null => {
  
  if (isNaN(length) || isNaN(steelPerLength) || length <= 0 || steelPerLength <= 0) {
    return null;
  }

  // Convert to metric if imperial
  let lengthM = length;
  let steelKgPerM = steelPerLength;
  
  if (unit === 'imperial') {
    lengthM = length * FT_TO_M;
    steelKgPerM = steelPerLength / FT_TO_M;
  }

  const totalSteel = lengthM * steelKgPerM;
  const totalSteelTons = totalSteel * KG_TO_TONS;

  return {
    id: generateId(),
    type: 'beam',
    totalSteel,
    totalSteelTons,
    unit,
    inputs: { length, steelPerLength },
    timestamp: Date.now()
  };
};

// Calculate steel for columns
export const calculateColumnSteel = (
  numberOfColumns: number,
  steelPerColumn: number,
  unit: Unit
): SteelCalculation | null => {
  
  if (isNaN(numberOfColumns) || isNaN(steelPerColumn) || 
      numberOfColumns <= 0 || steelPerColumn <= 0) {
    return null;
  }

  const totalSteel = numberOfColumns * steelPerColumn;
  const totalSteelTons = totalSteel * KG_TO_TONS;

  return {
    id: generateId(),
    type: 'column',
    totalSteel,
    totalSteelTons,
    unit,
    inputs: { numberOfColumns, steelPerColumn },
    timestamp: Date.now()
  };
};

// Calculate steel for footings
export const calculateFootingSteel = (
  numberOfFootings: number,
  steelPerFooting: number,
  unit: Unit
): SteelCalculation | null => {
  
  if (isNaN(numberOfFootings) || isNaN(steelPerFooting) || 
      numberOfFootings <= 0 || steelPerFooting <= 0) {
    return null;
  }

  const totalSteel = numberOfFootings * steelPerFooting;
  const totalSteelTons = totalSteel * KG_TO_TONS;

  return {
    id: generateId(),
    type: 'footing',
    totalSteel,
    totalSteelTons,
    unit,
    inputs: { numberOfFootings, steelPerFooting },
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Get type display name
export const getTypeDisplayName = (type: CalculationType): string => {
  const names: Record<CalculationType, string> = {
    slab: 'Slab',
    beam: 'Beam',
    column: 'Column',
    footing: 'Footing'
  };
  return names[type];
};

// Save to history
export const saveToHistory = (calculation: SteelCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('steel-quantity-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('steel-quantity-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('steel-quantity-calculator-history');
};

// Export to CSV
export const exportToCSV = (calculation: SteelCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Type,${getTypeDisplayName(calculation.type)},-\n`;
  
  if (calculation.type === 'slab') {
    csv += `Area,${formatNumber(calculation.inputs.area)},${calculation.unit === 'metric' ? 'sq m' : 'sq ft'}\n`;
    csv += `Steel Factor,${formatNumber(calculation.inputs.steelFactor)},kg per unit\n`;
  } else if (calculation.type === 'beam') {
    csv += `Length,${formatNumber(calculation.inputs.length)},${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
    csv += `Steel per Length,${formatNumber(calculation.inputs.steelPerLength)},kg per unit\n`;
  } else if (calculation.type === 'column') {
    csv += `Number of Columns,${calculation.inputs.numberOfColumns},-\n`;
    csv += `Steel per Column,${formatNumber(calculation.inputs.steelPerColumn)},kg\n`;
  } else if (calculation.type === 'footing') {
    csv += `Number of Footings,${calculation.inputs.numberOfFootings},-\n`;
    csv += `Steel per Footing,${formatNumber(calculation.inputs.steelPerFooting)},kg\n`;
  }
  
  csv += `Total Steel,${formatNumber(calculation.totalSteel)},kg\n`;
  csv += `Total Steel,${formatNumber(calculation.totalSteelTons, 3)},tons\n`;
  
  return csv;
};

// Export to text
export const exportToText = (calculation: SteelCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   STEEL QUANTITY CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'CALCULATION TYPE:\n';
  text += '───────────────────────────────────────\n';
  text += `Type:             ${getTypeDisplayName(calculation.type)}\n\n`;
  
  text += 'INPUT PARAMETERS:\n';
  text += '───────────────────────────────────────\n';
  
  if (calculation.type === 'slab') {
    text += `Area:             ${formatNumber(calculation.inputs.area)} ${calculation.unit === 'metric' ? 'sq m' : 'sq ft'}\n`;
    text += `Steel Factor:     ${formatNumber(calculation.inputs.steelFactor)} kg per unit\n`;
  } else if (calculation.type === 'beam') {
    text += `Length:           ${formatNumber(calculation.inputs.length)} ${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
    text += `Steel per Length: ${formatNumber(calculation.inputs.steelPerLength)} kg per unit\n`;
  } else if (calculation.type === 'column') {
    text += `Number of Columns: ${calculation.inputs.numberOfColumns}\n`;
    text += `Steel per Column:  ${formatNumber(calculation.inputs.steelPerColumn)} kg\n`;
  } else if (calculation.type === 'footing') {
    text += `Number of Footings: ${calculation.inputs.numberOfFootings}\n`;
    text += `Steel per Footing:  ${formatNumber(calculation.inputs.steelPerFooting)} kg\n`;
  }
  
  text += '\nCALCULATION RESULTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Total Steel:      ${formatNumber(calculation.totalSteel)} kg\n`;
  text += `                  (${formatNumber(calculation.totalSteelTons, 3)} tons)\n`;
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
