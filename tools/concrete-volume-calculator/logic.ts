import { Unit, ShapeType, ConcreteCalculation, CalculationHistory, MixRatio, MaterialBreakdown } from './types';

// Constants
const CUBIC_FEET_TO_CUBIC_METER = 35.3147;
const DRY_VOLUME_FACTOR = 1.54;
const CEMENT_DENSITY = 1440; // kg/m³
const CEMENT_BAG_SIZE = 50; // kg

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Convert to cubic meters
export const convertToCubicMeters = (value: number, unit: Unit): number => {
  if (unit === 'ft') {
    return value / CUBIC_FEET_TO_CUBIC_METER;
  }
  return value;
};

// Convert to cubic feet
export const convertToCubicFeet = (valueM3: number): number => {
  return valueM3 * CUBIC_FEET_TO_CUBIC_METER;
};

// Calculate volume for slab/beam/footing (rectangular prism)
export const calculateRectangularVolume = (
  length: number,
  width: number,
  height: number,
  unit: Unit
): number => {
  // Convert to meters if needed
  const lengthM = unit === 'ft' ? length * 0.3048 : length;
  const widthM = unit === 'ft' ? width * 0.3048 : width;
  const heightM = unit === 'ft' ? height * 0.3048 : height;
  
  return lengthM * widthM * heightM;
};

// Calculate volume for column (cylinder)
export const calculateCylindricalVolume = (
  radius: number,
  height: number,
  unit: Unit
): number => {
  // Convert to meters if needed
  const radiusM = unit === 'ft' ? radius * 0.3048 : radius;
  const heightM = unit === 'ft' ? height * 0.3048 : height;
  
  return Math.PI * Math.pow(radiusM, 2) * heightM;
};

// Calculate material breakdown from concrete volume
export const calculateMaterialBreakdown = (
  volumeM3: number,
  mixRatio: MixRatio
): MaterialBreakdown => {
  // Calculate dry volume
  const dryVolume = volumeM3 * DRY_VOLUME_FACTOR;
  
  // Calculate total parts
  const totalParts = mixRatio.cement + mixRatio.sand + mixRatio.aggregate;
  
  // Calculate individual volumes
  const cementVolume = (mixRatio.cement / totalParts) * dryVolume;
  const sandVolume = (mixRatio.sand / totalParts) * dryVolume;
  const aggregateVolume = (mixRatio.aggregate / totalParts) * dryVolume;
  
  // Calculate cement weight and bags
  const cementWeight = cementVolume * CEMENT_DENSITY;
  const cementBags = cementWeight / CEMENT_BAG_SIZE;
  
  return {
    cementBags: Math.ceil(cementBags),
    cementWeight,
    cementVolume,
    sandVolume,
    aggregateVolume
  };
};

// Calculate concrete volume based on shape
export const calculateConcreteVolume = (
  shape: ShapeType,
  dimensions: any,
  quantity: number,
  unit: Unit,
  mixRatio?: MixRatio
): ConcreteCalculation | null => {
  let volumeM3 = 0;
  let dimensionsStr = '';
  
  if (shape === 'slab' || shape === 'footing') {
    const length = parseFloat(dimensions.length);
    const width = parseFloat(dimensions.width);
    const thickness = parseFloat(dimensions.thickness || dimensions.depth);
    
    if (isNaN(length) || isNaN(width) || isNaN(thickness) || 
        length <= 0 || width <= 0 || thickness <= 0) {
      return null;
    }
    
    volumeM3 = calculateRectangularVolume(length, width, thickness, unit);
    dimensionsStr = `${length} × ${width} × ${thickness} ${unit}`;
  } else if (shape === 'beam') {
    const length = parseFloat(dimensions.length);
    const width = parseFloat(dimensions.width);
    const height = parseFloat(dimensions.height);
    
    if (isNaN(length) || isNaN(width) || isNaN(height) || 
        length <= 0 || width <= 0 || height <= 0) {
      return null;
    }
    
    volumeM3 = calculateRectangularVolume(length, width, height, unit);
    dimensionsStr = `${length} × ${width} × ${height} ${unit}`;
  } else if (shape === 'column' || shape === 'cylinder') {
    const radius = parseFloat(dimensions.radius);
    const height = parseFloat(dimensions.height);
    
    if (isNaN(radius) || isNaN(height) || radius <= 0 || height <= 0) {
      return null;
    }
    
    volumeM3 = calculateCylindricalVolume(radius, height, unit);
    dimensionsStr = `r=${radius} ${unit}, h=${height} ${unit}`;
  }
  
  const totalVolume = volumeM3 * quantity;
  
  // Calculate materials if mix ratio is provided
  let materials: MaterialBreakdown | undefined;
  if (mixRatio) {
    materials = calculateMaterialBreakdown(totalVolume, mixRatio);
  }
  
  return {
    id: generateId(),
    shape,
    volume: volumeM3,
    volumeM3,
    quantity,
    totalVolume,
    unit,
    dimensions: dimensionsStr,
    materials,
    mixRatio
  };
};

// Format number
export const formatNumber = (num: number, decimals: number = 3): string => {
  return num.toFixed(decimals);
};

// Get shape display name
export const getShapeDisplayName = (shape: ShapeType): string => {
  const names: Record<ShapeType, string> = {
    slab: 'Slab',
    column: 'Column',
    beam: 'Beam',
    footing: 'Footing',
    cylinder: 'Cylinder'
  };
  return names[shape] || shape;
};

// Save to history
export const saveToHistory = (calculation: ConcreteCalculation): void => {
  const history = getHistory();
  const entry: CalculationHistory = {
    id: generateId(),
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  
  // Keep only last 20 entries
  const trimmed = history.slice(0, 20);
  localStorage.setItem('concrete-volume-calculator-history', JSON.stringify(trimmed));
};

// Get history
export const getHistory = (): CalculationHistory[] => {
  try {
    const saved = localStorage.getItem('concrete-volume-calculator-history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem('concrete-volume-calculator-history');
};

// Get mix ratio presets
export const getMixRatioPresets = (): Array<{ name: string; ratio: MixRatio; description: string }> => {
  return [
    {
      name: 'M15 (1:2:4)',
      ratio: { cement: 1, sand: 2, aggregate: 4 },
      description: 'Standard concrete for general use'
    },
    {
      name: 'M20 (1:1.5:3)',
      ratio: { cement: 1, sand: 1.5, aggregate: 3 },
      description: 'Structural concrete'
    },
    {
      name: 'M25 (1:1:2)',
      ratio: { cement: 1, sand: 1, aggregate: 2 },
      description: 'High strength concrete'
    }
  ];
};

// Export batch to CSV
export const exportBatchToCSV = (batch: ConcreteCalculation[], includeMaterials: boolean = false): string => {
  let csv = includeMaterials 
    ? 'Shape,Dimensions,Quantity,Unit Volume (m³),Total Volume (m³),Cement (bags),Sand (m³),Aggregate (m³)\n'
    : 'Shape,Dimensions,Quantity,Unit Volume (m³),Total Volume (m³)\n';
  
  batch.forEach(calc => {
    csv += `${getShapeDisplayName(calc.shape)},`;
    csv += `"${calc.dimensions}",`;
    csv += `${calc.quantity},`;
    csv += `${formatNumber(calc.volumeM3)},`;
    csv += `${formatNumber(calc.totalVolume)}`;
    
    if (includeMaterials && calc.materials) {
      csv += `,${calc.materials.cementBags}`;
      csv += `,${formatNumber(calc.materials.sandVolume)}`;
      csv += `,${formatNumber(calc.materials.aggregateVolume)}`;
    }
    csv += '\n';
  });
  
  const totalVolume = batch.reduce((sum, calc) => sum + calc.totalVolume, 0);
  const totalCement = batch.reduce((sum, calc) => sum + (calc.materials?.cementBags || 0), 0);
  const totalSand = batch.reduce((sum, calc) => sum + (calc.materials?.sandVolume || 0), 0);
  const totalAggregate = batch.reduce((sum, calc) => sum + (calc.materials?.aggregateVolume || 0), 0);
  
  if (includeMaterials) {
    csv += `\nTotal,,,,${formatNumber(totalVolume)},${totalCement},${formatNumber(totalSand)},${formatNumber(totalAggregate)}\n`;
  } else {
    csv += `\nTotal,,,,${formatNumber(totalVolume)}\n`;
  }
  
  return csv;
};

// Export to text
export const exportToText = (batch: ConcreteCalculation[]): string => {
  let text = '═══════════════════════════════════════\n';
  text += '   CONCRETE VOLUME CALCULATION\n';
  text += '═══════════════════════════════════════\n\n';
  
  batch.forEach((calc, index) => {
    text += `${index + 1}. ${getShapeDisplayName(calc.shape)}\n`;
    text += `   Dimensions: ${calc.dimensions}\n`;
    text += `   Quantity: ${calc.quantity}\n`;
    text += `   Unit Volume: ${formatNumber(calc.volumeM3)} m³\n`;
    text += `   Total Volume: ${formatNumber(calc.totalVolume)} m³\n`;
    
    if (calc.materials) {
      text += `   Cement: ${calc.materials.cementBags} bags (${formatNumber(calc.materials.cementWeight)} kg)\n`;
      text += `   Sand: ${formatNumber(calc.materials.sandVolume)} m³\n`;
      text += `   Aggregate: ${formatNumber(calc.materials.aggregateVolume)} m³\n`;
    }
    text += '\n';
  });
  
  const totalVolume = batch.reduce((sum, calc) => sum + calc.totalVolume, 0);
  const totalCement = batch.reduce((sum, calc) => sum + (calc.materials?.cementBags || 0), 0);
  const totalSand = batch.reduce((sum, calc) => sum + (calc.materials?.sandVolume || 0), 0);
  const totalAggregate = batch.reduce((sum, calc) => sum + (calc.materials?.aggregateVolume || 0), 0);
  
  text += '═══════════════════════════════════════\n';
  text += `TOTAL CONCRETE: ${formatNumber(totalVolume)} m³\n`;
  
  if (totalCement > 0) {
    text += `TOTAL CEMENT: ${totalCement} bags\n`;
    text += `TOTAL SAND: ${formatNumber(totalSand)} m³\n`;
    text += `TOTAL AGGREGATE: ${formatNumber(totalAggregate)} m³\n`;
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
