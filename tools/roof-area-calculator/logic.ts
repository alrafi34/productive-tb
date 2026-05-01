import { RoofType, Unit, RoofCalculation, CalculationHistory, RoofTypeInfo } from './types';

// Constants
const SQM_TO_SQFT = 10.7639;
const M_TO_FT = 3.28084;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get roof type information
export const getRoofTypeInfo = (): RoofTypeInfo[] => {
  return [
    {
      type: 'flat',
      name: 'Flat Roof',
      description: 'Horizontal or nearly horizontal roof',
      requiresPitch: false,
      formula: 'Area = Length × Width'
    },
    {
      type: 'gable',
      name: 'Gable Roof',
      description: 'Two sloped sides meeting at a ridge',
      requiresPitch: true,
      formula: 'Area = 2 × (Length × (Width/2) / cos(pitch))'
    },
    {
      type: 'hip',
      name: 'Hip Roof',
      description: 'Four sloped sides meeting at a peak',
      requiresPitch: true,
      formula: 'Area ≈ Length × Width × 1.3'
    },
    {
      type: 'shed',
      name: 'Shed Roof',
      description: 'Single sloped surface',
      requiresPitch: true,
      formula: 'Area = Length × (Width / cos(pitch))'
    }
  ];
};

// Calculate flat roof area
const calculateFlatRoof = (length: number, width: number): number => {
  return length * width;
};

// Calculate gable roof area
const calculateGableRoof = (length: number, width: number, pitch: number): number => {
  const pitchRad = pitch * Math.PI / 180;
  return 2 * (length * (width / 2) / Math.cos(pitchRad));
};

// Calculate hip roof area
const calculateHipRoof = (length: number, width: number, pitch: number): number => {
  // Simplified formula using approximation factor
  // More accurate would require ridge length calculation
  const pitchRad = pitch * Math.PI / 180;
  const factor = 1 / Math.cos(pitchRad);
  return length * width * factor * 1.1; // 1.1 accounts for hip geometry
};

// Calculate shed roof area
const calculateShedRoof = (length: number, width: number, pitch: number): number => {
  const pitchRad = pitch * Math.PI / 180;
  return length * (width / Math.cos(pitchRad));
};

// Main calculation function
export const calculateRoofArea = (
  roofType: RoofType,
  length: number,
  width: number,
  unit: Unit,
  pitch?: number
): RoofCalculation | null => {
  
  // Validate inputs
  if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
    return null;
  }

  const roofInfo = getRoofTypeInfo().find(r => r.type === roofType);
  
  // Check if pitch is required
  if (roofInfo?.requiresPitch && (pitch === undefined || isNaN(pitch) || pitch < 0 || pitch > 89)) {
    return null;
  }

  let area = 0;

  // Calculate based on roof type
  switch (roofType) {
    case 'flat':
      area = calculateFlatRoof(length, width);
      break;
    case 'gable':
      area = calculateGableRoof(length, width, pitch!);
      break;
    case 'hip':
      area = calculateHipRoof(length, width, pitch!);
      break;
    case 'shed':
      area = calculateShedRoof(length, width, pitch!);
      break;
    default:
      return null;
  }

  // Convert to imperial if needed
  const areaImperial = unit === 'metric' ? area * SQM_TO_SQFT : area;

  return {
    id: generateId(),
    roofType,
    length,
    width,
    pitch,
    unit,
    area,
    areaImperial,
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Get roof type display name
export const getRoofTypeDisplayName = (type: RoofType): string => {
  const info = getRoofTypeInfo().find(r => r.type === type);
  return info?.name || type;
};

// Get roof type description
export const getRoofTypeDescription = (type: RoofType): string => {
  const info = getRoofTypeInfo().find(r => r.type === type);
  return info?.description || '';
};

// Get roof type formula
export const getRoofTypeFormula = (type: RoofType): string => {
  const info = getRoofTypeInfo().find(r => r.type === type);
  return info?.formula || '';
};

// Check if pitch is required
export const requiresPitch = (type: RoofType): boolean => {
  const info = getRoofTypeInfo().find(r => r.type === type);
  return info?.requiresPitch || false;
};

// Save to history
export const saveToHistory = (calculation: RoofCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('roof-area-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('roof-area-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('roof-area-calculator-history');
};

// Export to CSV
export const exportToCSV = (calculation: RoofCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Roof Type,${getRoofTypeDisplayName(calculation.roofType)},-\n`;
  csv += `Length,${formatNumber(calculation.length)},${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
  csv += `Width,${formatNumber(calculation.width)},${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
  
  if (calculation.pitch !== undefined) {
    csv += `Pitch,${formatNumber(calculation.pitch)},degrees\n`;
  }
  
  csv += `\nResults,Value,Unit\n`;
  csv += `Roof Area,${formatNumber(calculation.area)},${calculation.unit === 'metric' ? 'm²' : 'sq ft'}\n`;
  
  if (calculation.unit === 'metric' && calculation.areaImperial) {
    csv += `\nImperial Equivalent,Value,Unit\n`;
    csv += `Roof Area,${formatNumber(calculation.areaImperial)},sq ft\n`;
  }
  
  return csv;
};

// Export to text
export const exportToText = (calculation: RoofCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   ROOF AREA CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'ROOF CONFIGURATION:\n';
  text += '───────────────────────────────────────\n';
  text += `Type:             ${getRoofTypeDisplayName(calculation.roofType)}\n`;
  text += `Description:      ${getRoofTypeDescription(calculation.roofType)}\n`;
  text += `Length:           ${formatNumber(calculation.length)} ${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
  text += `Width:            ${formatNumber(calculation.width)} ${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
  
  if (calculation.pitch !== undefined) {
    text += `Pitch:            ${formatNumber(calculation.pitch)}°\n`;
  }
  
  text += '\nFORMULA:\n';
  text += '───────────────────────────────────────\n';
  text += `${getRoofTypeFormula(calculation.roofType)}\n`;
  
  text += '\nCALCULATION RESULT:\n';
  text += '═══════════════════════════════════════\n';
  text += `Roof Area:        ${formatNumber(calculation.area)} ${calculation.unit === 'metric' ? 'm²' : 'sq ft'}\n`;
  
  if (calculation.unit === 'metric' && calculation.areaImperial) {
    text += '\nIMPERIAL EQUIVALENT:\n';
    text += '───────────────────────────────────────\n';
    text += `Roof Area:        ${formatNumber(calculation.areaImperial)} sq ft\n`;
  }
  
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

// Generate SVG diagram for roof type
export const generateRoofDiagram = (roofType: RoofType): string => {
  const width = 200;
  const height = 150;
  
  switch (roofType) {
    case 'flat':
      return `
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="70" width="140" height="10" fill="#8B4513" stroke="#654321" stroke-width="2"/>
          <rect x="20" y="80" width="160" height="40" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
          <line x1="20" y1="80" x2="180" y2="80" stroke="#654321" stroke-width="1"/>
        </svg>
      `;
    
    case 'gable':
      return `
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <polygon points="100,30 30,80 170,80" fill="#8B4513" stroke="#654321" stroke-width="2"/>
          <rect x="20" y="80" width="160" height="40" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
          <line x1="100" y1="30" x2="100" y2="80" stroke="#654321" stroke-width="1" stroke-dasharray="3,3"/>
        </svg>
      `;
    
    case 'hip':
      return `
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <polygon points="100,30 30,70 30,90 170,90 170,70" fill="#8B4513" stroke="#654321" stroke-width="2"/>
          <polygon points="100,30 170,70 170,90 100,60" fill="#A0522D" stroke="#654321" stroke-width="2"/>
          <rect x="20" y="90" width="160" height="30" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
        </svg>
      `;
    
    case 'shed':
      return `
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <polygon points="30,50 170,80 170,90 30,90" fill="#8B4513" stroke="#654321" stroke-width="2"/>
          <rect x="20" y="90" width="160" height="30" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
          <line x1="30" y1="50" x2="30" y2="90" stroke="#654321" stroke-width="1" stroke-dasharray="3,3"/>
        </svg>
      `;
    
    default:
      return '';
  }
};
