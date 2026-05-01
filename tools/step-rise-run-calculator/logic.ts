import { StepCalculation, HistoryEntry, StepPreset, Unit, CalculationMode } from "./types";

const HISTORY_KEY = "step-rise-run-calculator-history";
const MAX_HISTORY = 10;

// Comfort formula constant: 2R + T ≈ 63 cm (or 24-25 inches)
const COMFORT_FORMULA_CM = 63;
const COMFORT_FORMULA_INCHES = 25;

export function calculateSteps(
  totalHeight: number,
  unit: Unit,
  mode: CalculationMode,
  totalRun?: number,
  desiredRise?: number,
  desiredRun?: number,
  maxRise?: number
): StepCalculation {
  let numberOfSteps: number;
  let actualRise: number;
  let actualRun: number;
  let calculatedTotalRun: number;
  
  const comfortConstant = unit === "cm" ? COMFORT_FORMULA_CM : COMFORT_FORMULA_INCHES;
  
  if (mode === "auto") {
    // Auto calculate based on desired rise or max rise
    const riseToUse = desiredRise || maxRise || (unit === "cm" ? 17 : 7);
    numberOfSteps = Math.round(totalHeight / riseToUse);
    numberOfSteps = Math.max(2, numberOfSteps); // Minimum 2 steps
    
    actualRise = totalHeight / numberOfSteps;
    actualRun = comfortConstant - (2 * actualRise);
    calculatedTotalRun = actualRun * (numberOfSteps - 1);
    
  } else if (mode === "fix-rise") {
    // Fixed rise, calculate run
    const riseToUse = desiredRise || (unit === "cm" ? 17 : 7);
    numberOfSteps = Math.round(totalHeight / riseToUse);
    numberOfSteps = Math.max(2, numberOfSteps);
    
    actualRise = totalHeight / numberOfSteps;
    
    if (totalRun) {
      actualRun = totalRun / (numberOfSteps - 1);
      calculatedTotalRun = totalRun;
    } else {
      actualRun = comfortConstant - (2 * actualRise);
      calculatedTotalRun = actualRun * (numberOfSteps - 1);
    }
    
  } else { // fix-run
    // Fixed run, calculate rise
    if (totalRun && desiredRun) {
      numberOfSteps = Math.round(totalRun / desiredRun) + 1;
      numberOfSteps = Math.max(2, numberOfSteps);
      
      actualRise = totalHeight / numberOfSteps;
      actualRun = totalRun / (numberOfSteps - 1);
      calculatedTotalRun = totalRun;
    } else {
      const runToUse = desiredRun || (unit === "cm" ? 28 : 11);
      // Estimate steps based on comfort formula
      // 2R + T = comfort, R = H/n, T = runToUse
      // 2(H/n) + T = comfort
      // n = 2H / (comfort - T)
      numberOfSteps = Math.round((2 * totalHeight) / (comfortConstant - runToUse));
      numberOfSteps = Math.max(2, numberOfSteps);
      
      actualRise = totalHeight / numberOfSteps;
      actualRun = runToUse;
      calculatedTotalRun = actualRun * (numberOfSteps - 1);
    }
  }
  
  // Calculate stair angle
  const stairAngle = Math.atan(actualRise / actualRun) * (180 / Math.PI);
  
  // Calculate comfort formula
  const comfortFormula = 2 * actualRise + actualRun;
  
  // Check if comfortable (within ±2 of ideal)
  const isComfortable = Math.abs(comfortFormula - comfortConstant) <= 2;
  
  return {
    totalHeight,
    totalRun,
    desiredRise,
    desiredRun,
    maxRise,
    unit,
    mode,
    numberOfSteps,
    actualRise,
    actualRun,
    calculatedTotalRun,
    stairAngle,
    comfortFormula,
    isComfortable,
    timestamp: Date.now()
  };
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getStepPresets(): StepPreset[] {
  return [
    {
      name: "Standard Residential",
      description: "Typical home staircase",
      totalHeight: 300,
      desiredRise: 17,
      unit: "cm"
    },
    {
      name: "Commercial Building",
      description: "Office or public space",
      totalHeight: 320,
      desiredRise: 16,
      unit: "cm"
    },
    {
      name: "Steep Staircase",
      description: "Space-saving design",
      totalHeight: 280,
      desiredRise: 18,
      unit: "cm"
    },
    {
      name: "Comfortable Staircase",
      description: "Easy to climb",
      totalHeight: 300,
      desiredRise: 15,
      unit: "cm"
    }
  ];
}

export function generateStepDiagram(
  numberOfSteps: number,
  rise: number,
  run: number
): string {
  const maxSteps = Math.min(numberOfSteps, 10); // Show max 10 steps
  const stepWidth = 50;
  const stepHeight = 35;
  const startX = 50;
  const startY = 400;
  
  let svg = `<svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">`;
  
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
  
  // Rise arrow (vertical)
  const arrowX = startX - 30;
  svg += `<line x1="${arrowX}" y1="${startY}" x2="${arrowX}" y2="${startY - maxSteps * stepHeight}" stroke="#EF4444" stroke-width="2" marker-start="url(#arrowhead-start)" marker-end="url(#arrowhead-end)" />`;
  svg += `<text x="${arrowX - 15}" y="${startY - (maxSteps * stepHeight) / 2}" fill="#EF4444" font-size="12" font-weight="bold" text-anchor="end" transform="rotate(-90 ${arrowX - 15} ${startY - (maxSteps * stepHeight) / 2})">Rise</text>`;
  
  // Run arrow (horizontal)
  const arrowY = startY + 40;
  svg += `<line x1="${startX}" y1="${arrowY}" x2="${startX + maxSteps * stepWidth}" y2="${arrowY}" stroke="#3B82F6" stroke-width="2" marker-start="url(#arrowhead-start-blue)" marker-end="url(#arrowhead-end-blue)" />`;
  svg += `<text x="${startX + (maxSteps * stepWidth) / 2}" y="${arrowY + 20}" fill="#3B82F6" font-size="12" font-weight="bold" text-anchor="middle">Run</text>`;
  
  // Angle arc
  const arcRadius = 40;
  const arcX = startX + stepWidth;
  const arcY = startY;
  const angle = Math.atan(stepHeight / stepWidth) * (180 / Math.PI);
  svg += `<path d="M ${arcX + arcRadius} ${arcY} A ${arcRadius} ${arcRadius} 0 0 0 ${arcX + arcRadius * Math.cos(angle * Math.PI / 180)} ${arcY - arcRadius * Math.sin(angle * Math.PI / 180)}" stroke="#10B981" stroke-width="2" fill="none" />`;
  svg += `<text x="${arcX + arcRadius + 10}" y="${arcY - 10}" fill="#10B981" font-size="11" font-weight="bold">${formatNumber(angle, 1)}°</text>`;
  
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
export function saveToHistory(calculation: StepCalculation): void {
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
export function exportToText(calculation: StepCalculation): string {
  return `Step Rise and Run Calculation Results
====================================

Input Parameters:
- Total Height: ${formatNumber(calculation.totalHeight)} ${calculation.unit}
${calculation.totalRun ? `- Total Run: ${formatNumber(calculation.totalRun)} ${calculation.unit}` : ''}
${calculation.desiredRise ? `- Desired Rise: ${formatNumber(calculation.desiredRise)} ${calculation.unit}` : ''}
${calculation.desiredRun ? `- Desired Run: ${formatNumber(calculation.desiredRun)} ${calculation.unit}` : ''}
- Calculation Mode: ${calculation.mode}

Calculated Results:
- Number of Steps: ${calculation.numberOfSteps}
- Actual Rise per Step: ${formatNumber(calculation.actualRise)} ${calculation.unit}
- Actual Run per Step: ${formatNumber(calculation.actualRun)} ${calculation.unit}
- Total Run Length: ${formatNumber(calculation.calculatedTotalRun)} ${calculation.unit}
- Stair Angle: ${formatNumber(calculation.stairAngle)}°
- Comfort Formula (2R + T): ${formatNumber(calculation.comfortFormula)} ${calculation.unit}
- Comfort Status: ${calculation.isComfortable ? 'Comfortable ✓' : 'Not Optimal ⚠'}

Generated: ${new Date().toLocaleString()}
`;
}

export function exportToCSV(calculation: StepCalculation): string {
  return `Parameter,Value,Unit
Total Height,${calculation.totalHeight},${calculation.unit}
${calculation.totalRun ? `Total Run,${calculation.totalRun},${calculation.unit}\n` : ''}Number of Steps,${calculation.numberOfSteps},steps
Actual Rise,${calculation.actualRise},${calculation.unit}
Actual Run,${calculation.actualRun},${calculation.unit}
Total Run Length,${calculation.calculatedTotalRun},${calculation.unit}
Stair Angle,${calculation.stairAngle},degrees
Comfort Formula,${calculation.comfortFormula},${calculation.unit}
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

export function getModeDisplayName(mode: CalculationMode): string {
  switch (mode) {
    case "auto": return "Auto Calculate";
    case "fix-rise": return "Fixed Rise";
    case "fix-run": return "Fixed Run";
    default: return mode;
  }
}
