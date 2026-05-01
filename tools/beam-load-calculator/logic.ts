import { BeamType, LoadType, Unit, BeamCalculation, CalculationHistory, DiagramPoint, BeamPreset } from './types';

// Constants
const M_TO_FT = 3.28084;
const KN_TO_LB = 224.809;

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get beam type display name
export const getBeamTypeDisplayName = (type: BeamType): string => {
  const names: Record<BeamType, string> = {
    'simply-supported': 'Simply Supported Beam',
    'cantilever': 'Cantilever Beam'
  };
  return names[type];
};

// Get load type display name
export const getLoadTypeDisplayName = (type: LoadType): string => {
  const names: Record<LoadType, string> = {
    'point': 'Point Load',
    'udl': 'Uniformly Distributed Load (UDL)'
  };
  return names[type];
};

// Calculate beam reactions and moments
export const calculateBeam = (
  beamType: BeamType,
  loadType: LoadType,
  length: number,
  load: number,
  position: number | undefined,
  unit: Unit
): BeamCalculation | null => {
  
  if (isNaN(length) || isNaN(load) || length <= 0 || load <= 0) {
    return null;
  }

  // Convert to meters for calculation
  const L = unit === 'ft' ? length / M_TO_FT : length;
  const P = load; // kN or kN/m
  const a = position !== undefined ? (unit === 'ft' ? position / M_TO_FT : position) : 0;

  let reaction1 = 0;
  let reaction2 = 0;
  let maxBendingMoment = 0;
  let totalLoad = 0;
  let maxShearForce = 0;
  let shearForceData: DiagramPoint[] = [];
  let bendingMomentData: DiagramPoint[] = [];

  // Simply Supported Beam with Point Load
  if (beamType === 'simply-supported' && loadType === 'point') {
    if (position === undefined || a > L || a < 0) {
      return null;
    }
    
    reaction1 = (P * (L - a)) / L;
    reaction2 = (P * a) / L;
    maxBendingMoment = (P * a * (L - a)) / L;
    totalLoad = P;
    maxShearForce = Math.max(reaction1, reaction2);

    // Shear Force Diagram
    shearForceData = [
      { x: 0, y: reaction1 },
      { x: a - 0.001, y: reaction1 },
      { x: a, y: -reaction2 },
      { x: L, y: -reaction2 }
    ];

    // Bending Moment Diagram
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * L;
      let M = 0;
      if (x <= a) {
        M = reaction1 * x;
      } else {
        M = reaction1 * x - P * (x - a);
      }
      bendingMomentData.push({ x, y: M });
    }
  }

  // Simply Supported Beam with UDL
  else if (beamType === 'simply-supported' && loadType === 'udl') {
    const w = P; // kN/m
    totalLoad = w * L;
    reaction1 = totalLoad / 2;
    reaction2 = totalLoad / 2;
    maxBendingMoment = (w * L * L) / 8;
    maxShearForce = totalLoad / 2;

    // Shear Force Diagram
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * L;
      const V = reaction1 - w * x;
      shearForceData.push({ x, y: V });
    }

    // Bending Moment Diagram
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * L;
      const M = reaction1 * x - (w * x * x) / 2;
      bendingMomentData.push({ x, y: M });
    }
  }

  // Cantilever Beam with Point Load at End
  else if (beamType === 'cantilever' && loadType === 'point') {
    reaction1 = P;
    maxBendingMoment = P * L;
    totalLoad = P;
    maxShearForce = P;

    // Shear Force Diagram
    shearForceData = [
      { x: 0, y: -P },
      { x: L, y: -P }
    ];

    // Bending Moment Diagram
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * L;
      const M = -P * (L - x);
      bendingMomentData.push({ x, y: M });
    }
  }

  // Cantilever Beam with UDL
  else if (beamType === 'cantilever' && loadType === 'udl') {
    const w = P; // kN/m
    totalLoad = w * L;
    reaction1 = totalLoad;
    maxBendingMoment = (w * L * L) / 2;
    maxShearForce = totalLoad;

    // Shear Force Diagram
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * L;
      const V = -w * (L - x);
      shearForceData.push({ x, y: V });
    }

    // Bending Moment Diagram
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * L;
      const M = -(w * (L - x) * (L - x)) / 2;
      bendingMomentData.push({ x, y: M });
    }
  }

  return {
    id: generateId(),
    beamType,
    loadType,
    length,
    load,
    position,
    unit,
    reaction1,
    reaction2: beamType === 'simply-supported' ? reaction2 : undefined,
    maxBendingMoment,
    totalLoad,
    maxShearForce,
    shearForceData,
    bendingMomentData,
    timestamp: Date.now()
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Convert units
export const convertLength = (value: number, from: Unit, to: Unit): number => {
  if (from === to) return value;
  if (from === 'm' && to === 'ft') return value * M_TO_FT;
  if (from === 'ft' && to === 'm') return value / M_TO_FT;
  return value;
};

// Get beam presets
export const getBeamPresets = (): BeamPreset[] => {
  return [
    {
      name: 'Simple Beam - Center Load',
      description: '6m beam with 10kN at center',
      beamType: 'simply-supported',
      loadType: 'point',
      length: 6,
      load: 10,
      position: 3
    },
    {
      name: 'Simple Beam - UDL',
      description: '4m beam with 2kN/m UDL',
      beamType: 'simply-supported',
      loadType: 'udl',
      length: 4,
      load: 2
    },
    {
      name: 'Cantilever - End Load',
      description: '3m cantilever with 5kN at end',
      beamType: 'cantilever',
      loadType: 'point',
      length: 3,
      load: 5
    },
    {
      name: 'Cantilever - UDL',
      description: '2m cantilever with 3kN/m UDL',
      beamType: 'cantilever',
      loadType: 'udl',
      length: 2,
      load: 3
    }
  ];
};

// Save to history
export const saveToHistory = (calculation: BeamCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('beam-load-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('beam-load-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('beam-load-calculator-history');
};

// Export to CSV
export const exportToCSV = (calculation: BeamCalculation): string => {
  let csv = 'Parameter,Value,Unit\n';
  csv += `Beam Type,${getBeamTypeDisplayName(calculation.beamType)},-\n`;
  csv += `Load Type,${getLoadTypeDisplayName(calculation.loadType)},-\n`;
  csv += `Length,${formatNumber(calculation.length)},${calculation.unit}\n`;
  csv += `Load,${formatNumber(calculation.load)},${calculation.loadType === 'point' ? 'kN' : 'kN/m'}\n`;
  
  if (calculation.position !== undefined) {
    csv += `Load Position,${formatNumber(calculation.position)},${calculation.unit}\n`;
  }
  
  csv += `\nResults,Value,Unit\n`;
  csv += `Reaction 1,${formatNumber(calculation.reaction1)},kN\n`;
  
  if (calculation.reaction2 !== undefined) {
    csv += `Reaction 2,${formatNumber(calculation.reaction2)},kN\n`;
  }
  
  csv += `Max Bending Moment,${formatNumber(calculation.maxBendingMoment)},kNm\n`;
  csv += `Max Shear Force,${formatNumber(calculation.maxShearForce)},kN\n`;
  csv += `Total Load,${formatNumber(calculation.totalLoad)},kN\n`;
  
  return csv;
};

// Export to text
export const exportToText = (calculation: BeamCalculation): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   BEAM LOAD CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'BEAM CONFIGURATION:\n';
  text += '───────────────────────────────────────\n';
  text += `Type:             ${getBeamTypeDisplayName(calculation.beamType)}\n`;
  text += `Load Type:        ${getLoadTypeDisplayName(calculation.loadType)}\n`;
  text += `Length:           ${formatNumber(calculation.length)} ${calculation.unit}\n`;
  text += `Load:             ${formatNumber(calculation.load)} ${calculation.loadType === 'point' ? 'kN' : 'kN/m'}\n`;
  
  if (calculation.position !== undefined) {
    text += `Load Position:    ${formatNumber(calculation.position)} ${calculation.unit}\n`;
  }
  
  text += '\nCALCULATION RESULTS:\n';
  text += '═══════════════════════════════════════\n';
  text += `Reaction 1:       ${formatNumber(calculation.reaction1)} kN\n`;
  
  if (calculation.reaction2 !== undefined) {
    text += `Reaction 2:       ${formatNumber(calculation.reaction2)} kN\n`;
  }
  
  text += `Max Bending Moment: ${formatNumber(calculation.maxBendingMoment)} kNm\n`;
  text += `Max Shear Force:  ${formatNumber(calculation.maxShearForce)} kN\n`;
  text += `Total Load:       ${formatNumber(calculation.totalLoad)} kN\n`;
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
