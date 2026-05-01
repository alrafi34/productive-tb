import { Wall, Opening, CalculatedWall, CalculatedOpening, Unit, CalculationSummary } from './types';

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Calculate single wall area
export const calculateWallArea = (width: string, height: string): number => {
  const w = parseFloat(width);
  const h = parseFloat(height);
  
  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    return 0;
  }
  
  return w * h;
};

// Calculate all walls
export const calculateAllWalls = (walls: Wall[]): CalculatedWall[] => {
  return walls.map(wall => ({
    ...wall,
    area: calculateWallArea(wall.width, wall.height)
  }));
};

// Calculate all openings
export const calculateAllOpenings = (openings: Opening[]): CalculatedOpening[] => {
  return openings.map(opening => ({
    ...opening,
    area: calculateWallArea(opening.width, opening.height)
  }));
};

// Calculate total wall area
export const calculateTotalWallArea = (calculatedWalls: CalculatedWall[]): number => {
  return calculatedWalls.reduce((sum, wall) => sum + wall.area, 0);
};

// Calculate total opening area
export const calculateTotalOpeningArea = (calculatedOpenings: CalculatedOpening[]): number => {
  return calculatedOpenings.reduce((sum, opening) => sum + opening.area, 0);
};

// Calculate net area
export const calculateNetArea = (totalWallArea: number, totalOpeningArea: number): number => {
  const net = totalWallArea - totalOpeningArea;
  return Math.max(0, net); // Prevent negative results
};

// Format area with unit
export const formatArea = (area: number, unit: Unit): string => {
  return `${area.toFixed(2)} ${unit}²`;
};

// Get unit name
export const getUnitName = (unit: Unit): string => {
  return unit === 'm' ? 'Square Meters' : 'Square Feet';
};

// Convert between units
export const convertArea = (area: number, fromUnit: Unit, toUnit: Unit): number => {
  if (fromUnit === toUnit) return area;
  
  if (fromUnit === 'm' && toUnit === 'ft') {
    return area * 10.7639; // m² to ft²
  } else if (fromUnit === 'ft' && toUnit === 'm') {
    return area / 10.7639; // ft² to m²
  }
  
  return area;
};

// Export to CSV
export const exportToCSV = (
  walls: CalculatedWall[],
  openings: CalculatedOpening[],
  summary: CalculationSummary
): string => {
  let csv = 'Wall Area Calculation Report\n\n';
  
  csv += 'WALLS\n';
  csv += 'Name,Width,Height,Unit,Area\n';
  walls.forEach(wall => {
    csv += `${wall.name},${wall.width},${wall.height},${wall.unit},${wall.area.toFixed(2)}\n`;
  });
  
  csv += '\nOPENINGS (Doors & Windows)\n';
  csv += 'Type,Width,Height,Unit,Area\n';
  openings.forEach(opening => {
    csv += `${opening.type},${opening.width},${opening.height},${opening.unit},${opening.area.toFixed(2)}\n`;
  });
  
  csv += '\nSUMMARY\n';
  csv += `Total Wall Area,${summary.totalWallArea.toFixed(2)} ${summary.unit}²\n`;
  csv += `Total Openings Area,${summary.totalOpeningArea.toFixed(2)} ${summary.unit}²\n`;
  csv += `Net Paintable Area,${summary.netArea.toFixed(2)} ${summary.unit}²\n`;
  
  return csv;
};

// Export to text
export const exportToText = (
  walls: CalculatedWall[],
  openings: CalculatedOpening[],
  summary: CalculationSummary
): string => {
  let text = '═══════════════════════════════════════\n';
  text += '     WALL AREA CALCULATION REPORT\n';
  text += '═══════════════════════════════════════\n\n';
  
  text += 'WALLS:\n';
  text += '───────────────────────────────────────\n';
  walls.forEach((wall, index) => {
    text += `${index + 1}. ${wall.name}\n`;
    text += `   ${wall.width} × ${wall.height} ${wall.unit} = ${wall.area.toFixed(2)} ${wall.unit}²\n\n`;
  });
  
  if (openings.length > 0) {
    text += '\nOPENINGS (Doors & Windows):\n';
    text += '───────────────────────────────────────\n';
    openings.forEach((opening, index) => {
      text += `${index + 1}. ${opening.type.charAt(0).toUpperCase() + opening.type.slice(1)}\n`;
      text += `   ${opening.width} × ${opening.height} ${opening.unit} = ${opening.area.toFixed(2)} ${opening.unit}²\n\n`;
    });
  }
  
  text += '\nSUMMARY:\n';
  text += '═══════════════════════════════════════\n';
  text += `Total Wall Area:      ${summary.totalWallArea.toFixed(2)} ${summary.unit}²\n`;
  text += `Total Openings Area:  ${summary.totalOpeningArea.toFixed(2)} ${summary.unit}²\n`;
  text += `Net Paintable Area:   ${summary.netArea.toFixed(2)} ${summary.unit}²\n`;
  text += '═══════════════════════════════════════\n';
  
  return text;
};

// Download file
export const downloadFile = (content: string, filename: string, type: string = 'text/csv'): void => {
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

// Find largest wall
export const findLargestWall = (walls: CalculatedWall[]): CalculatedWall | null => {
  if (walls.length === 0) return null;
  return walls.reduce((largest, wall) => 
    wall.area > largest.area ? wall : largest
  );
};
