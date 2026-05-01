import { InputMode, Unit, RoofPitchCalculation, CalculationHistory, PitchPreset } from './types';

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get pitch presets
export const getPitchPresets = (): PitchPreset[] => {
  return [
    {
      name: '3:12',
      description: 'Low slope',
      rise: 3,
      run: 12,
      angle: 14.04,
      commonUse: 'Minimum for shingles'
    },
    {
      name: '4:12',
      description: 'Low pitch',
      rise: 4,
      run: 12,
      angle: 18.43,
      commonUse: 'Modern homes'
    },
    {
      name: '6:12',
      description: 'Standard pitch',
      rise: 6,
      run: 12,
      angle: 26.57,
      commonUse: 'Most common residential'
    },
    {
      name: '8:12',
      description: 'Steep pitch',
      rise: 8,
      run: 12,
      angle: 33.69,
      commonUse: 'Traditional homes'
    },
    {
      name: '9:12',
      description: 'Very steep',
      rise: 9,
      run: 12,
      angle: 36.87,
      commonUse: 'Tudor, Gothic styles'
    },
    {
      name: '12:12',
      description: 'Extremely steep',
      rise: 12,
      run: 12,
      angle: 45,
      commonUse: 'A-frame, specialty'
    }
  ];
};

// Calculate from rise and run
const calculateFromRiseRun = (rise: number, run: number): {
  angle: number;
  pitch: string;
  slopePercentage: number;
  normalizedPitch: number;
} => {
  const angle = Math.atan(rise / run) * (180 / Math.PI);
  const normalizedPitch = (rise / run) * 12;
  const slopePercentage = (rise / run) * 100;
  const pitch = `${normalizedPitch.toFixed(2)}:12`;
  
  return {
    angle,
    pitch,
    slopePercentage,
    normalizedPitch
  };
};

// Calculate from pitch ratio
const calculateFromPitchRatio = (pitchRise: number, pitchRun: number): {
  angle: number;
  pitch: string;
  slopePercentage: number;
  normalizedPitch: number;
} => {
  return calculateFromRiseRun(pitchRise, pitchRun);
};

// Calculate from angle
const calculateFromAngle = (angle: number): {
  angle: number;
  pitch: string;
  slopePercentage: number;
  normalizedPitch: number;
} => {
  const angleRad = angle * (Math.PI / 180);
  const rise = Math.tan(angleRad);
  const normalizedPitch = rise * 12;
  const slopePercentage = rise * 100;
  const pitch = `${normalizedPitch.toFixed(2)}:12`;
  
  return {
    angle,
    pitch,
    slopePercentage,
    normalizedPitch
  };
};

// Main calculation function
export const calculateRoofPitch = (
  inputMode: InputMode,
  unit: Unit,
  rise?: number,
  run?: number,
  pitchRise?: number,
  pitchRun?: number,
  angle?: number
): RoofPitchCalculation | null => {
  
  let result: {
    angle: number;
    pitch: string;
    slopePercentage: number;
    normalizedPitch: number;
  } | null = null;

  // Calculate based on input mode
  switch (inputMode) {
    case 'rise-run':
      if (rise === undefined || run === undefined || isNaN(rise) || isNaN(run) || 
          rise < 0 || run <= 0) {
        return null;
      }
      result = calculateFromRiseRun(rise, run);
      break;
    
    case 'pitch-ratio':
      if (pitchRise === undefined || pitchRun === undefined || 
          isNaN(pitchRise) || isNaN(pitchRun) || 
          pitchRise < 0 || pitchRun <= 0) {
        return null;
      }
      result = calculateFromPitchRatio(pitchRise, pitchRun);
      rise = pitchRise;
      run = pitchRun;
      break;
    
    case 'angle':
      if (angle === undefined || isNaN(angle) || angle < 0 || angle >= 90) {
        return null;
      }
      result = calculateFromAngle(angle);
      // Calculate rise and run for display
      const angleRad = angle * (Math.PI / 180);
      rise = Math.tan(angleRad) * 12;
      run = 12;
      break;
    
    default:
      return null;
  }

  if (!result) return null;

  return {
    id: generateId(),
    inputMode,
    rise,
    run,
    pitchRise,
    pitchRun,
    angle: inputMode === 'angle' ? angle : undefined,
    unit,
    calculatedAngle: result.angle,
    calculatedPitch: result.pitch,
    slopePercentage: result.slopePercentage,
    normalizedPitch: result.normalizedPitch,
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
    'rise-run': 'Rise & Run',
    'pitch-ratio': 'Pitch Ratio',
    'angle': 'Angle (Degrees)'
  };
  return names[mode];
};

// Save to history
export const saveToHistory = (calculation: RoofPitchCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('roof-pitch-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('roof-pitch-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('roof-pitch-calculator-history');
};

// Export to CSV
export const exportToCSV = (calculation: RoofPitchCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Input Mode,${getInputModeDisplayName(calculation.inputMode)},-\n`;
  
  if (calculation.inputMode === 'rise-run') {
    csv += `Rise,${formatNumber(calculation.rise!)},${calculation.unit}\n`;
    csv += `Run,${formatNumber(calculation.run!)},${calculation.unit}\n`;
  } else if (calculation.inputMode === 'pitch-ratio') {
    csv += `Pitch Rise,${formatNumber(calculation.pitchRise!)},-\n`;
    csv += `Pitch Run,${formatNumber(calculation.pitchRun!)},-\n`;
  } else if (calculation.inputMode === 'angle') {
    csv += `Angle,${formatNumber(calculation.angle!)},degrees\n`;
  }
  
  csv += `\nResults,Value,Unit\n`;
  csv += `Roof Angle,${formatNumber(calculation.calculatedAngle)},degrees\n`;
  csv += `Pitch Ratio,${calculation.calculatedPitch},-\n`;
  csv += `Slope Percentage,${formatNumber(calculation.slopePercentage)},%\n`;
  csv += `Normalized Pitch,${formatNumber(calculation.normalizedPitch)}:12,-\n`;
  
  return csv;
};

// Export to text
export const exportToText = (calculation: RoofPitchCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   ROOF PITCH CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'INPUT PARAMETERS:\n';
  text += '───────────────────────────────────────\n';
  text += `Mode:             ${getInputModeDisplayName(calculation.inputMode)}\n`;
  
  if (calculation.inputMode === 'rise-run') {
    text += `Rise:             ${formatNumber(calculation.rise!)} ${calculation.unit}\n`;
    text += `Run:              ${formatNumber(calculation.run!)} ${calculation.unit}\n`;
  } else if (calculation.inputMode === 'pitch-ratio') {
    text += `Pitch:            ${formatNumber(calculation.pitchRise!)}:${formatNumber(calculation.pitchRun!)}\n`;
  } else if (calculation.inputMode === 'angle') {
    text += `Angle:            ${formatNumber(calculation.angle!)}°\n`;
  }
  
  text += '\nCALCULATION RESULTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Roof Angle:       ${formatNumber(calculation.calculatedAngle)}°\n`;
  text += `Pitch Ratio:      ${calculation.calculatedPitch}\n`;
  text += `Slope:            ${formatNumber(calculation.slopePercentage)}%\n`;
  text += `Normalized:       ${formatNumber(calculation.normalizedPitch)}:12\n`;
  text += '═══════════════════════════════════════\n';
  
  text += '\nFORMULA:\n';
  text += 'Angle = arctan(rise / run) × (180 / π)\n';
  text += 'Pitch = (rise / run) × 12\n';
  text += 'Slope% = (rise / run) × 100\n';
  
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

// Generate SVG diagram for roof pitch
export const generatePitchDiagram = (rise: number, run: number): string => {
  const scale = 10;
  const baseX = 50;
  const baseY = 200;
  const runScaled = run * scale;
  const riseScaled = rise * scale;
  
  const width = 300;
  const height = 250;
  
  return `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Base line -->
      <line x1="${baseX}" y1="${baseY}" x2="${baseX + runScaled}" y2="${baseY}" 
        stroke="#333" stroke-width="2"/>
      
      <!-- Rise line -->
      <line x1="${baseX + runScaled}" y1="${baseY}" x2="${baseX + runScaled}" y2="${baseY - riseScaled}" 
        stroke="#333" stroke-width="2"/>
      
      <!-- Slope line -->
      <line x1="${baseX}" y1="${baseY}" x2="${baseX + runScaled}" y2="${baseY - riseScaled}" 
        stroke="#058554" stroke-width="3"/>
      
      <!-- Run label -->
      <text x="${baseX + runScaled / 2}" y="${baseY + 20}" 
        text-anchor="middle" font-size="14" fill="#333">
        Run: ${formatNumber(run, 1)}
      </text>
      
      <!-- Rise label -->
      <text x="${baseX + runScaled + 25}" y="${baseY - riseScaled / 2}" 
        text-anchor="start" font-size="14" fill="#333">
        Rise: ${formatNumber(rise, 1)}
      </text>
      
      <!-- Angle arc -->
      <path d="M ${baseX + 30} ${baseY} A 30 30 0 0 0 ${baseX + 30 * Math.cos(Math.atan(rise / run))} ${baseY - 30 * Math.sin(Math.atan(rise / run))}" 
        stroke="#058554" stroke-width="1.5" fill="none"/>
      
      <!-- Angle label -->
      <text x="${baseX + 45}" y="${baseY - 10}" 
        font-size="12" fill="#058554" font-weight="bold">
        ${formatNumber(Math.atan(rise / run) * (180 / Math.PI), 1)}°
      </text>
      
      <!-- Ground -->
      <line x1="${baseX - 10}" y1="${baseY}" x2="${baseX + runScaled + 10}" y2="${baseY}" 
        stroke="#8B4513" stroke-width="4"/>
    </svg>
  `;
};
