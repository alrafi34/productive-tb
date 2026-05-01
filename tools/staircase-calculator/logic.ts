import { StaircaseCalculation, HistoryEntry, StaircasePreset, Unit } from "./types";

const HISTORY_KEY = "staircase-calculator-history";
const MAX_HISTORY = 10;

export function calculateStaircase(
  totalHeight: number,
  maxRiserHeight: number,
  desiredTreadDepth: number,
  unit: Unit,
  stairWidth?: number
): StaircaseCalculation {
  // Step 1: Calculate number of risers
  const numberOfRisers = Math.ceil(totalHeight / maxRiserHeight);
  
  // Step 2: Calculate actual riser height
  const actualRiserHeight = totalHeight / numberOfRisers;
  
  // Step 3: Calculate number of treads
  const numberOfTreads = numberOfRisers - 1;
  
  // Step 4: Calculate total run
  const totalRun = numberOfTreads * desiredTreadDepth;
  
  // Step 5: Calculate stair angle
  const stairAngle = Math.atan(actualRiserHeight / desiredTreadDepth) * (180 / Math.PI);
  
  // Step 6: Validate comfort formula (2 × riser + tread ≈ 600–650 mm)
  // Convert to mm for comfort formula
  let riserInMm = actualRiserHeight;
  let treadInMm = desiredTreadDepth;
  
  if (unit === "cm") {
    riserInMm = actualRiserHeight * 10;
    treadInMm = desiredTreadDepth * 10;
  } else if (unit === "inches") {
    riserInMm = actualRiserHeight * 25.4;
    treadInMm = desiredTreadDepth * 25.4;
  }
  
  const comfortFormula = 2 * riserInMm + treadInMm;
  const isComfortable = comfortFormula >= 600 && comfortFormula <= 650;
  
  return {
    totalHeight,
    maxRiserHeight,
    desiredTreadDepth,
    stairWidth,
    unit,
    numberOfRisers,
    actualRiserHeight,
    numberOfTreads,
    totalRun,
    stairAngle,
    comfortFormula,
    isComfortable,
    timestamp: Date.now()
  };
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getStaircasePresets(): StaircasePreset[] {
  return [
    {
      name: "Standard Residential",
      description: "Typical home staircase",
      totalHeight: 3000,
      maxRiserHeight: 180,
      desiredTreadDepth: 250,
      unit: "mm"
    },
    {
      name: "Commercial Building",
      description: "Office or public building",
      totalHeight: 3200,
      maxRiserHeight: 175,
      desiredTreadDepth: 280,
      unit: "mm"
    },
    {
      name: "Steep Staircase",
      description: "Space-saving design",
      totalHeight: 2800,
      maxRiserHeight: 200,
      desiredTreadDepth: 220,
      unit: "mm"
    },
    {
      name: "Comfortable Staircase",
      description: "Easy to climb",
      totalHeight: 3000,
      maxRiserHeight: 160,
      desiredTreadDepth: 300,
      unit: "mm"
    }
  ];
}

export function generateStaircaseDiagram(
  numberOfRisers: number,
  riserHeight: number,
  treadDepth: number
): string {
  const maxSteps = Math.min(numberOfRisers, 8); // Show max 8 steps for visualization
  const stepWidth = 60;
  const stepHeight = 40;
  const startX = 50;
  const startY = 350;
  
  let svg = `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">`;
  
  // Draw steps
  for (let i = 0; i < maxSteps; i++) {
    const x = startX + i * stepWidth;
    const y = startY - i * stepHeight;
    
    // Tread (horizontal)
    svg += `<line x1="${x}" y1="${y}" x2="${x + stepWidth}" y2="${y}" stroke="#374151" stroke-width="3" />`;
    
    // Riser (vertical)
    svg += `<line x1="${x + stepWidth}" y1="${y}" x2="${x + stepWidth}" y2="${y - stepHeight}" stroke="#374151" stroke-width="3" />`;
    
    // Fill step
    svg += `<rect x="${x}" y="${y}" width="${stepWidth}" height="${stepHeight}" fill="#E5E7EB" opacity="0.5" />`;
  }
  
  // Ground line
  svg += `<line x1="20" y1="${startY + 10}" x2="${startX + maxSteps * stepWidth + 20}" y2="${startY + 10}" stroke="#6B7280" stroke-width="2" stroke-dasharray="5,5" />`;
  
  // Height arrow
  const arrowX = startX - 30;
  svg += `<line x1="${arrowX}" y1="${startY}" x2="${arrowX}" y2="${startY - maxSteps * stepHeight}" stroke="#EF4444" stroke-width="2" marker-start="url(#arrowhead-start)" marker-end="url(#arrowhead-end)" />`;
  svg += `<text x="${arrowX - 10}" y="${startY - (maxSteps * stepHeight) / 2}" fill="#EF4444" font-size="12" font-weight="bold" text-anchor="end">Height</text>`;
  
  // Run arrow
  const arrowY = startY + 40;
  svg += `<line x1="${startX}" y1="${arrowY}" x2="${startX + maxSteps * stepWidth}" y2="${arrowY}" stroke="#3B82F6" stroke-width="2" marker-start="url(#arrowhead-start-blue)" marker-end="url(#arrowhead-end-blue)" />`;
  svg += `<text x="${startX + (maxSteps * stepWidth) / 2}" y="${arrowY + 20}" fill="#3B82F6" font-size="12" font-weight="bold" text-anchor="middle">Run</text>`;
  
  // Arrow markers
  svg += `
    <defs>
      <marker id="arrowhead-start" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
        <polygon points="10 0, 10 10, 0 5" fill="#EF4444" />
      </marker>
      <marker id="arrowhead-end" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
        <polygon points="0 0, 10 5, 0 10" fill="#EF4444" />
      </marker>
      <marker id="arrowhead-start-blue" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
        <polygon points="10 0, 10 10, 0 5" fill="#3B82F6" />
      </marker>
      <marker id="arrowhead-end-blue" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
        <polygon points="0 0, 10 5, 0 10" fill="#3B82F6" />
      </marker>
    </defs>
  `;
  
  svg += `</svg>`;
  return svg;
}

// History management
export function saveToHistory(calculation: StaircaseCalculation): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    calculation,
    timestamp: Date.now()
  };
  
  history.unshift(entry);
  
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  
  if (typeof window !== "undefined") {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(HISTORY_KEY);
  }
}

// Export functions
export function exportToText(calculation: StaircaseCalculation): string {
  return `Staircase Calculation Results
=============================

Input Parameters:
- Total Height: ${formatNumber(calculation.totalHeight)} ${calculation.unit}
- Max Riser Height: ${formatNumber(calculation.maxRiserHeight)} ${calculation.unit}
- Desired Tread Depth: ${formatNumber(calculation.desiredTreadDepth)} ${calculation.unit}
${calculation.stairWidth ? `- Stair Width: ${formatNumber(calculation.stairWidth)} ${calculation.unit}` : ''}

Calculated Results:
- Number of Risers: ${calculation.numberOfRisers}
- Actual Riser Height: ${formatNumber(calculation.actualRiserHeight)} ${calculation.unit}
- Number of Treads: ${calculation.numberOfTreads}
- Total Run: ${formatNumber(calculation.totalRun)} ${calculation.unit}
- Stair Angle: ${formatNumber(calculation.stairAngle)}°
- Comfort Formula (2R + T): ${formatNumber(calculation.comfortFormula)} mm
- Comfort Status: ${calculation.isComfortable ? 'Comfortable ✓' : 'Not Optimal ⚠'}

Generated: ${new Date().toLocaleString()}
`;
}

export function exportToCSV(calculation: StaircaseCalculation): string {
  return `Parameter,Value,Unit
Total Height,${calculation.totalHeight},${calculation.unit}
Max Riser Height,${calculation.maxRiserHeight},${calculation.unit}
Desired Tread Depth,${calculation.desiredTreadDepth},${calculation.unit}
${calculation.stairWidth ? `Stair Width,${calculation.stairWidth},${calculation.unit}\n` : ''}Number of Risers,${calculation.numberOfRisers},steps
Actual Riser Height,${calculation.actualRiserHeight},${calculation.unit}
Number of Treads,${calculation.numberOfTreads},steps
Total Run,${calculation.totalRun},${calculation.unit}
Stair Angle,${calculation.stairAngle},degrees
Comfort Formula,${calculation.comfortFormula},mm
Comfortable,${calculation.isComfortable ? 'Yes' : 'No'},
`;
}

export function downloadFile(content: string, filename: string, type: string = 'text/plain'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
