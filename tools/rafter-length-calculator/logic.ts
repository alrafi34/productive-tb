import { InputMode, Unit, RafterCalculation, CalculationHistory, PitchPreset } from './types';

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get pitch presets
export const getPitchPresets = (): PitchPreset[] => {
  return [
    { name: '3:12', rise: 3, run: 12, description: 'Low slope' },
    { name: '4:12', rise: 4, run: 12, description: 'Minimum standard' },
    { name: '5:12', rise: 5, run: 12, description: 'Common residential' },
    { name: '6:12', rise: 6, run: 12, description: 'Standard pitch' },
    { name: '7:12', rise: 7, run: 12, description: 'Steep residential' },
    { name: '8:12', rise: 8, run: 12, description: 'Very steep' },
    { name: '9:12', rise: 9, run: 12, description: 'Traditional' },
    { name: '12:12', rise: 12, run: 12, description: 'Extremely steep' }
  ];
};

// Calculate rafter length using Pythagorean theorem
const calculateRafterFromRunRise = (run: number, rise: number): number => {
  return Math.sqrt((run * run) + (rise * rise));
};

// Calculate rise from pitch ratio
const calculateRiseFromPitch = (run: number, pitchRise: number, pitchRun: number): number => {
  return (pitchRise / pitchRun) * run;
};

// Main calculation function
export const calculateRafterLength = (
  inputMode: InputMode,
  run: number,
  unit: Unit,
  rise?: number,
  pitchRise?: number,
  pitchRun?: number
): RafterCalculation | null => {
  
  // Validate run
  if (isNaN(run) || run <= 0) {
    return null;
  }

  let calculatedRise: number;
  let rafterLength: number;

  if (inputMode === 'run-rise') {
    // Validate rise
    if (rise === undefined || isNaN(rise) || rise < 0) {
      return null;
    }
    
    calculatedRise = rise;
    rafterLength = calculateRafterFromRunRise(run, rise);
    
  } else if (inputMode === 'run-pitch') {
    // Validate pitch
    if (pitchRise === undefined || pitchRun === undefined || 
        isNaN(pitchRise) || isNaN(pitchRun) || 
        pitchRise < 0 || pitchRun <= 0) {
      return null;
    }
    
    calculatedRise = calculateRiseFromPitch(run, pitchRise, pitchRun);
    rafterLength = calculateRafterFromRunRise(run, calculatedRise);
    
  } else {
    return null;
  }

  return {
    id: generateId(),
    inputMode,
    run,
    rise,
    pitchRise,
    pitchRun,
    unit,
    rafterLength,
    calculatedRise,
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Get input mode display name
export const getInputModeDisplayName = (mode: InputMode): string => {
  const names: Record<InputMode, string> = {
    'run-rise': 'Run & Rise',
    'run-pitch': 'Run & Pitch'
  };
  return names[mode];
};

// Parse pitch string (e.g., "6/12" or "6:12")
export const parsePitch = (pitchStr: string): { rise: number; run: number } | null => {
  const cleaned = pitchStr.trim();
  const parts = cleaned.split(/[/:]/);
  
  if (parts.length !== 2) return null;
  
  const rise = parseFloat(parts[0]);
  const run = parseFloat(parts[1]);
  
  if (isNaN(rise) || isNaN(run) || rise < 0 || run <= 0) {
    return null;
  }
  
  return { rise, run };
};

// Format pitch as string
export const formatPitch = (rise: number, run: number): string => {
  return `${formatNumber(rise, 0)}:${formatNumber(run, 0)}`;
};

// Save to history
export const saveToHistory = (calculation: RafterCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('rafter-length-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('rafter-length-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('rafter-length-calculator-history');
};

// Export to CSV
export const exportToCSV = (calculation: RafterCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Input Mode,${getInputModeDisplayName(calculation.inputMode)},-\n`;
  csv += `Run,${formatNumber(calculation.run)},${calculation.unit}\n`;
  
  if (calculation.inputMode === 'run-rise') {
    csv += `Rise,${formatNumber(calculation.rise!)},${calculation.unit}\n`;
  } else if (calculation.inputMode === 'run-pitch') {
    csv += `Pitch,${formatPitch(calculation.pitchRise!, calculation.pitchRun!)},-\n`;
    csv += `Calculated Rise,${formatNumber(calculation.calculatedRise!)},${calculation.unit}\n`;
  }
  
  csv += `\nResults,Value,Unit\n`;
  csv += `Rafter Length,${formatNumber(calculation.rafterLength)},${calculation.unit}\n`;
  
  return csv;
};

// Export to text
export const exportToText = (calculation: RafterCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   RAFTER LENGTH CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'INPUT PARAMETERS:\n';
  text += '───────────────────────────────────────\n';
  text += `Mode:             ${getInputModeDisplayName(calculation.inputMode)}\n`;
  text += `Run:              ${formatNumber(calculation.run)} ${calculation.unit}\n`;
  
  if (calculation.inputMode === 'run-rise') {
    text += `Rise:             ${formatNumber(calculation.rise!)} ${calculation.unit}\n`;
  } else if (calculation.inputMode === 'run-pitch') {
    text += `Pitch:            ${formatPitch(calculation.pitchRise!, calculation.pitchRun!)}\n`;
    text += `Calculated Rise:  ${formatNumber(calculation.calculatedRise!)} ${calculation.unit}\n`;
  }
  
  text += '\nCALCULATION RESULT:\n';
  text += '═══════════════════════════════════════\n';
  text += `Rafter Length:    ${formatNumber(calculation.rafterLength)} ${calculation.unit}\n`;
  text += '═══════════════════════════════════════\n';
  
  text += '\nFORMULA:\n';
  text += 'Rafter Length = √(Run² + Rise²)\n';
  
  if (calculation.inputMode === 'run-pitch') {
    text += `Rise = (${calculation.pitchRise} / ${calculation.pitchRun}) × Run\n`;
  }
  
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

// Generate SVG diagram for rafter
export const generateRafterDiagram = (run: number, rise: number): string => {
  const scale = Math.min(200 / Math.max(run, rise), 15);
  const baseX = 50;
  const baseY = 220;
  const runScaled = run * scale;
  const riseScaled = rise * scale;
  
  const width = 300;
  const height = 280;
  
  return `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Base (run) -->
      <line x1="${baseX}" y1="${baseY}" x2="${baseX + runScaled}" y2="${baseY}" 
        stroke="#333" stroke-width="2"/>
      
      <!-- Rise (vertical) -->
      <line x1="${baseX + runScaled}" y1="${baseY}" x2="${baseX + runScaled}" y2="${baseY - riseScaled}" 
        stroke="#333" stroke-width="2"/>
      
      <!-- Rafter (hypotenuse) -->
      <line x1="${baseX}" y1="${baseY}" x2="${baseX + runScaled}" y2="${baseY - riseScaled}" 
        stroke="#058554" stroke-width="3"/>
      
      <!-- Run label -->
      <text x="${baseX + runScaled / 2}" y="${baseY + 20}" 
        text-anchor="middle" font-size="14" fill="#333" font-weight="bold">
        Run: ${formatNumber(run, 1)}
      </text>
      
      <!-- Rise label -->
      <text x="${baseX + runScaled + 30}" y="${baseY - riseScaled / 2}" 
        text-anchor="start" font-size="14" fill="#333" font-weight="bold">
        Rise: ${formatNumber(rise, 1)}
      </text>
      
      <!-- Rafter label -->
      <text x="${baseX + runScaled / 2 - 20}" y="${baseY - riseScaled / 2 - 10}" 
        text-anchor="middle" font-size="14" fill="#058554" font-weight="bold">
        Rafter: ${formatNumber(Math.sqrt(run * run + rise * rise), 2)}
      </text>
      
      <!-- Right angle indicator -->
      <rect x="${baseX + runScaled - 10}" y="${baseY - 10}" width="10" height="10" 
        fill="none" stroke="#333" stroke-width="1"/>
      
      <!-- Ground/base line -->
      <line x1="${baseX - 10}" y1="${baseY}" x2="${baseX + runScaled + 10}" y2="${baseY}" 
        stroke="#8B4513" stroke-width="4"/>
      
      <!-- Wall/vertical support -->
      <line x1="${baseX + runScaled}" y1="${baseY}" x2="${baseX + runScaled}" y2="${baseY + 20}" 
        stroke="#8B4513" stroke-width="4"/>
    </svg>
  `;
};
