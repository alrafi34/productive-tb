import { Unit, SlabCalculation, CalculationHistory, SlabPreset } from './types';

// Constants
const KN_TO_LB = 224.809;
const M_TO_FT = 3.28084;
const KN_M2_TO_PSF = 20.8854;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get slab presets
export const getSlabPresets = (): SlabPreset[] => {
  return [
    {
      name: 'Residential Slab',
      description: '150mm thick, 2 kN/m² live load',
      thickness: 0.15,
      liveLoad: 2,
      additionalLoad: 0
    },
    {
      name: 'Commercial Slab',
      description: '200mm thick, 4 kN/m² live load',
      thickness: 0.20,
      liveLoad: 4,
      additionalLoad: 1
    },
    {
      name: 'Industrial Slab',
      description: '250mm thick, 6 kN/m² live load',
      thickness: 0.25,
      liveLoad: 6,
      additionalLoad: 2
    },
    {
      name: 'Light Residential',
      description: '125mm thick, 1.5 kN/m² live load',
      thickness: 0.125,
      liveLoad: 1.5,
      additionalLoad: 0
    },
    {
      name: 'Heavy Duty',
      description: '300mm thick, 8 kN/m² live load',
      thickness: 0.30,
      liveLoad: 8,
      additionalLoad: 3
    }
  ];
};

// Calculate slab loads
export const calculateSlabLoad = (
  length: number,
  width: number,
  thickness: number,
  density: number,
  liveLoad: number,
  additionalLoad: number,
  unit: Unit
): SlabCalculation | null => {
  
  // Validate inputs
  if (isNaN(length) || isNaN(width) || isNaN(thickness) || 
      isNaN(density) || isNaN(liveLoad) || isNaN(additionalLoad) ||
      length <= 0 || width <= 0 || thickness <= 0 || density <= 0) {
    return null;
  }

  // Convert to metric if imperial
  let lengthM = length;
  let widthM = width;
  let thicknessM = thickness;
  let densityKN = density;
  let liveLoadKN = liveLoad;
  let additionalLoadKN = additionalLoad;

  if (unit === 'imperial') {
    lengthM = length / M_TO_FT;
    widthM = width / M_TO_FT;
    thicknessM = thickness / M_TO_FT;
    densityKN = density / KN_M2_TO_PSF;
    liveLoadKN = liveLoad / KN_M2_TO_PSF;
    additionalLoadKN = additionalLoad / KN_M2_TO_PSF;
  }

  // Calculate area
  const area = lengthM * widthM;

  // Calculate dead load (self-weight)
  const deadLoad = thicknessM * densityKN;

  // Calculate total load per square meter
  const totalLoadPerSqm = deadLoad + liveLoadKN + additionalLoadKN;

  // Calculate total slab load
  const totalLoad = totalLoadPerSqm * area;

  // Imperial conversions
  const areaFt = area * M_TO_FT * M_TO_FT;
  const deadLoadPsf = deadLoad * KN_M2_TO_PSF;
  const totalLoadPerSqft = totalLoadPerSqm * KN_M2_TO_PSF;
  const totalLoadLb = totalLoad * KN_TO_LB;

  return {
    id: generateId(),
    length,
    width,
    thickness,
    density,
    liveLoad,
    additionalLoad,
    unit,
    area,
    deadLoad,
    totalLoadPerSqm,
    totalLoad,
    areaFt,
    deadLoadPsf,
    totalLoadPerSqft,
    totalLoadLb,
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Save to history
export const saveToHistory = (calculation: SlabCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('slab-load-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('slab-load-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('slab-load-calculator-history');
};

// Export to CSV
export const exportToCSV = (calculation: SlabCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Length,${formatNumber(calculation.length)},${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
  csv += `Width,${formatNumber(calculation.width)},${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
  csv += `Thickness,${formatNumber(calculation.thickness)},${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
  csv += `Concrete Density,${formatNumber(calculation.density)},${calculation.unit === 'metric' ? 'kN/m³' : 'psf'}\n`;
  csv += `Live Load,${formatNumber(calculation.liveLoad)},${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
  csv += `Additional Load,${formatNumber(calculation.additionalLoad)},${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
  csv += `\nResults,Value,Unit\n`;
  csv += `Area,${formatNumber(calculation.area)},m²\n`;
  csv += `Area,${formatNumber(calculation.areaFt!)},sq ft\n`;
  csv += `Dead Load,${formatNumber(calculation.deadLoad)},kN/m²\n`;
  csv += `Dead Load,${formatNumber(calculation.deadLoadPsf!)},psf\n`;
  csv += `Total Load per m²,${formatNumber(calculation.totalLoadPerSqm)},kN/m²\n`;
  csv += `Total Load per sq ft,${formatNumber(calculation.totalLoadPerSqft!)},psf\n`;
  csv += `Total Slab Load,${formatNumber(calculation.totalLoad)},kN\n`;
  csv += `Total Slab Load,${formatNumber(calculation.totalLoadLb!)},lb\n`;
  
  return csv;
};

// Export to text
export const exportToText = (calculation: SlabCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   SLAB LOAD CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'SLAB DIMENSIONS:\n';
  text += '───────────────────────────────────────\n';
  text += `Length:           ${formatNumber(calculation.length)} ${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
  text += `Width:            ${formatNumber(calculation.width)} ${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
  text += `Thickness:        ${formatNumber(calculation.thickness)} ${calculation.unit === 'metric' ? 'm' : 'ft'}\n`;
  text += `Area:             ${formatNumber(calculation.area)} m² (${formatNumber(calculation.areaFt!)} sq ft)\n`;
  
  text += '\nLOAD PARAMETERS:\n';
  text += '───────────────────────────────────────\n';
  text += `Concrete Density: ${formatNumber(calculation.density)} ${calculation.unit === 'metric' ? 'kN/m³' : 'psf'}\n`;
  text += `Live Load:        ${formatNumber(calculation.liveLoad)} ${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
  text += `Additional Load:  ${formatNumber(calculation.additionalLoad)} ${calculation.unit === 'metric' ? 'kN/m²' : 'psf'}\n`;
  
  text += '\nCALCULATION RESULTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Dead Load:        ${formatNumber(calculation.deadLoad)} kN/m²\n`;
  text += `                  (${formatNumber(calculation.deadLoadPsf!)} psf)\n`;
  text += `Total Load/m²:    ${formatNumber(calculation.totalLoadPerSqm)} kN/m²\n`;
  text += `                  (${formatNumber(calculation.totalLoadPerSqft!)} psf)\n`;
  text += `Total Slab Load:  ${formatNumber(calculation.totalLoad)} kN\n`;
  text += `                  (${formatNumber(calculation.totalLoadLb!)} lb)\n`;
  text += '═══════════════════════════════════════\n';
  
  text += '\nFORMULAS USED:\n';
  text += '───────────────────────────────────────\n';
  text += 'Area = Length × Width\n';
  text += 'Dead Load = Thickness × Density\n';
  text += 'Total Load/m² = Dead Load + Live Load + Additional Load\n';
  text += 'Total Slab Load = Total Load/m² × Area\n';
  
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

// Get warning for extreme values
export const getWarnings = (calculation: SlabCalculation): string[] => {
  const warnings: string[] = [];
  
  // Check thickness
  if (calculation.thickness < 0.1) {
    warnings.push('⚠️ Slab thickness is very thin. Typical minimum is 100mm (0.1m).');
  }
  if (calculation.thickness > 0.5) {
    warnings.push('⚠️ Slab thickness is very thick. Verify if this is intentional.');
  }
  
  // Check live load
  if (calculation.liveLoad > 10) {
    warnings.push('⚠️ Live load is very high. Typical residential: 2 kN/m², commercial: 4-6 kN/m².');
  }
  
  // Check total load
  if (calculation.totalLoadPerSqm > 15) {
    warnings.push('⚠️ Total load per m² is very high. Verify structural requirements.');
  }
  
  // Check area
  if (calculation.area > 200) {
    warnings.push('ℹ️ Large slab area. Consider expansion joints and support requirements.');
  }
  
  return warnings;
};
