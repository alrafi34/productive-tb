import { BuildingType, Unit, LiveLoadCalculation, CalculationHistory, LoadPreset } from './types';

// Constants
const KN_TO_PSF = 20.885;
const SQM_TO_SQFT = 10.7639;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Load reference table based on standard building codes
export const getLoadPresets = (): LoadPreset[] => {
  return [
    {
      type: 'residential',
      name: 'Residential',
      description: 'Dwelling units, apartments, houses',
      loadMetric: 2.0,
      loadImperial: 40,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'office',
      name: 'Office',
      description: 'Office buildings, workspaces',
      loadMetric: 3.0,
      loadImperial: 50,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'commercial',
      name: 'Commercial',
      description: 'Retail stores, shops',
      loadMetric: 4.0,
      loadImperial: 75,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'assembly',
      name: 'Assembly Hall',
      description: 'Auditoriums, theaters, halls',
      loadMetric: 5.0,
      loadImperial: 100,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'corridor',
      name: 'Corridor',
      description: 'Hallways, passages',
      loadMetric: 4.0,
      loadImperial: 80,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'stairs',
      name: 'Stairs',
      description: 'Staircases, landings',
      loadMetric: 4.5,
      loadImperial: 100,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'library',
      name: 'Library',
      description: 'Reading rooms, book storage',
      loadMetric: 6.0,
      loadImperial: 150,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'storage',
      name: 'Storage/Warehouse',
      description: 'Storage areas, warehouses',
      loadMetric: 7.5,
      loadImperial: 125,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'parking',
      name: 'Parking',
      description: 'Vehicle parking areas',
      loadMetric: 2.5,
      loadImperial: 50,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'roof',
      name: 'Roof (Accessible)',
      description: 'Accessible flat roofs',
      loadMetric: 1.5,
      loadImperial: 30,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'balcony',
      name: 'Balcony',
      description: 'Balconies, terraces',
      loadMetric: 3.0,
      loadImperial: 60,
      codeReference: 'IS 875, ASCE 7'
    },
    {
      type: 'classroom',
      name: 'Classroom',
      description: 'Educational spaces',
      loadMetric: 3.0,
      loadImperial: 40,
      codeReference: 'IS 875, ASCE 7'
    }
  ];
};

// Get load per unit for building type
export const getLoadPerUnit = (buildingType: BuildingType, unit: Unit): number => {
  const preset = getLoadPresets().find(p => p.type === buildingType);
  if (!preset) return 0;
  
  return unit === 'metric' ? preset.loadMetric : preset.loadImperial;
};

// Calculate live load
export const calculateLiveLoad = (
  buildingType: BuildingType,
  area: number,
  unit: Unit
): LiveLoadCalculation | null => {
  
  // Validate inputs
  if (isNaN(area) || area <= 0) {
    return null;
  }

  const loadPerUnit = getLoadPerUnit(buildingType, unit);
  const totalLoad = area * loadPerUnit;
  
  // Calculate imperial equivalents if metric
  let loadPerUnitImperial: number | undefined;
  let totalLoadImperial: number | undefined;
  
  if (unit === 'metric') {
    loadPerUnitImperial = loadPerUnit * KN_TO_PSF;
    totalLoadImperial = totalLoad * KN_TO_PSF;
  }

  return {
    id: generateId(),
    buildingType,
    area,
    unit,
    loadPerUnit,
    totalLoad,
    loadPerUnitImperial,
    totalLoadImperial,
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Get building type display name
export const getBuildingTypeDisplayName = (type: BuildingType): string => {
  const preset = getLoadPresets().find(p => p.type === type);
  return preset?.name || type;
};

// Get building type description
export const getBuildingTypeDescription = (type: BuildingType): string => {
  const preset = getLoadPresets().find(p => p.type === type);
  return preset?.description || '';
};

// Save to history
export const saveToHistory = (calculation: LiveLoadCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('live-load-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('live-load-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('live-load-calculator-history');
};

// Export to CSV
export const exportToCSV = (calculation: LiveLoadCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Building Type,${getBuildingTypeDisplayName(calculation.buildingType)},-\n`;
  csv += `Area,${formatNumber(calculation.area)},${calculation.unit === 'metric' ? 'm²' : 'sq ft'}\n`;
  csv += `Load per Unit,${formatNumber(calculation.loadPerUnit)},${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
  csv += `\nResults,Value,Unit\n`;
  csv += `Total Live Load,${formatNumber(calculation.totalLoad)},${calculation.unit === 'metric' ? 'kN' : 'lbs'}\n`;
  
  if (calculation.unit === 'metric' && calculation.loadPerUnitImperial) {
    csv += `\nImperial Equivalents,Value,Unit\n`;
    csv += `Load per Unit,${formatNumber(calculation.loadPerUnitImperial)},psf\n`;
    csv += `Total Load,${formatNumber(calculation.totalLoadImperial!)},lbs\n`;
  }
  
  return csv;
};

// Export to text
export const exportToText = (calculation: LiveLoadCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   LIVE LOAD CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'BUILDING INFORMATION:\n';
  text += '───────────────────────────────────────\n';
  text += `Type:             ${getBuildingTypeDisplayName(calculation.buildingType)}\n`;
  text += `Description:      ${getBuildingTypeDescription(calculation.buildingType)}\n`;
  text += `Area:             ${formatNumber(calculation.area)} ${calculation.unit === 'metric' ? 'm²' : 'sq ft'}\n`;
  text += `Load per Unit:    ${formatNumber(calculation.loadPerUnit)} ${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
  
  text += '\nCALCULATION RESULT:\n';
  text += '═══════════════════════════════════════\n';
  text += `Total Live Load:  ${formatNumber(calculation.totalLoad)} ${calculation.unit === 'metric' ? 'kN' : 'lbs'}\n`;
  
  if (calculation.unit === 'metric' && calculation.loadPerUnitImperial) {
    text += '\nIMPERIAL EQUIVALENTS:\n';
    text += '───────────────────────────────────────\n';
    text += `Load per Unit:    ${formatNumber(calculation.loadPerUnitImperial)} psf\n`;
    text += `Total Load:       ${formatNumber(calculation.totalLoadImperial!)} lbs\n`;
  }
  
  text += '═══════════════════════════════════════\n';
  text += '\nFORMULA:\n';
  text += 'Total Live Load = Area × Load per Unit Area\n';
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

// Batch calculation for multiple rooms
export interface BatchRoom {
  id: string;
  name: string;
  buildingType: BuildingType;
  area: number;
}

export const calculateBatchLoad = (
  rooms: BatchRoom[],
  unit: Unit
): { rooms: (BatchRoom & { totalLoad: number })[], grandTotal: number } => {
  const calculatedRooms = rooms.map(room => {
    const loadPerUnit = getLoadPerUnit(room.buildingType, unit);
    const totalLoad = room.area * loadPerUnit;
    return { ...room, totalLoad };
  });
  
  const grandTotal = calculatedRooms.reduce((sum, room) => sum + room.totalLoad, 0);
  
  return { rooms: calculatedRooms, grandTotal };
};
