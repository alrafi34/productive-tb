import { 
  CalculationMode, 
  ThicknessUnit, 
  InsulationCalculation, 
  HistoryEntry, 
  MaterialPreset, 
  ApplicationPreset 
} from "./types";

// Constants
const MM_TO_INCHES = 0.0393701;
const INCHES_TO_MM = 25.4;

// Unit conversion
export function mmToInches(mm: number): number {
  return mm * MM_TO_INCHES;
}

export function inchesToMm(inches: number): number {
  return inches * INCHES_TO_MM;
}

export function convertThickness(value: number, from: ThicknessUnit, to: ThicknessUnit): number {
  if (from === to) return value;
  if (from === "mm" && to === "inches") return mmToInches(value);
  if (from === "inches" && to === "mm") return inchesToMm(value);
  return value;
}

// Core calculation functions
export function calculateThicknessSurfaceTemp(
  thermalConductivity: number,
  fluidTemp: number,
  targetSurfaceTemp: number,
  ambientTemp: number
): number {
  // Simplified formula: thickness ≈ k × (T_hot - T_surface) / (T_surface - T_ambient)
  const numerator = thermalConductivity * (fluidTemp - targetSurfaceTemp);
  const denominator = targetSurfaceTemp - ambientTemp;
  
  if (denominator === 0) return 0;
  
  const thicknessMeters = numerator / denominator;
  return Math.max(0, thicknessMeters * 1000); // Convert to mm
}

export function calculateThicknessHeatLoss(
  thermalConductivity: number,
  fluidTemp: number,
  ambientTemp: number,
  maxHeatLoss: number,
  pipeDiameter: number
): number {
  // Simplified cylindrical conduction
  // q = (2πk(T_hot - T_ambient)) / ln(r2 / r1)
  // Solve for r2: r2 = r1 × exp((2πk(T_hot - T_ambient)) / q)
  
  const r1 = pipeDiameter / 2000; // Convert mm to meters
  const tempDiff = fluidTemp - ambientTemp;
  
  if (maxHeatLoss === 0 || tempDiff === 0) return 0;
  
  const exponent = (2 * Math.PI * thermalConductivity * tempDiff) / maxHeatLoss;
  const r2 = r1 * Math.exp(exponent);
  
  const thicknessMeters = r2 - r1;
  return Math.max(0, thicknessMeters * 1000); // Convert to mm
}

export function calculateThicknessUValue(
  thermalConductivity: number,
  targetUValue: number
): number {
  // U = k / thickness
  // Rearranged: thickness = k / U
  
  if (targetUValue === 0) return 0;
  
  const thicknessMeters = thermalConductivity / targetUValue;
  return Math.max(0, thicknessMeters * 1000); // Convert to mm
}

export function estimateHeatLoss(
  thermalConductivity: number,
  thickness: number,
  fluidTemp: number,
  ambientTemp: number,
  pipeDiameter: number
): number {
  // Estimate heat loss per meter for cylindrical pipe
  // q = (2πk(T_hot - T_ambient)) / ln(r2 / r1)
  
  const r1 = pipeDiameter / 2000; // mm to meters
  const thicknessMeters = thickness / 1000; // mm to meters
  const r2 = r1 + thicknessMeters;
  
  if (r1 === 0 || r2 === r1) return 0;
  
  const tempDiff = fluidTemp - ambientTemp;
  const heatLoss = (2 * Math.PI * thermalConductivity * tempDiff) / Math.log(r2 / r1);
  
  return Math.max(0, heatLoss);
}

export function performInsulationCalculation(
  mode: CalculationMode,
  thicknessUnit: ThicknessUnit,
  ambientTemp: number,
  thermalConductivity: number,
  fluidTemp?: number,
  targetSurfaceTemp?: number,
  pipeDiameter?: number,
  maxHeatLoss?: number,
  targetUValue?: number
): InsulationCalculation {
  let requiredThickness = 0;
  let estimatedHeatLoss: number | undefined;
  
  if (mode === "surface" && fluidTemp !== undefined && targetSurfaceTemp !== undefined) {
    requiredThickness = calculateThicknessSurfaceTemp(
      thermalConductivity,
      fluidTemp,
      targetSurfaceTemp,
      ambientTemp
    );
    
    // Estimate heat loss if pipe diameter is provided
    if (pipeDiameter !== undefined && pipeDiameter > 0) {
      estimatedHeatLoss = estimateHeatLoss(
        thermalConductivity,
        requiredThickness,
        fluidTemp,
        ambientTemp,
        pipeDiameter
      );
    }
  } else if (mode === "heatloss" && fluidTemp !== undefined && maxHeatLoss !== undefined && pipeDiameter !== undefined) {
    requiredThickness = calculateThicknessHeatLoss(
      thermalConductivity,
      fluidTemp,
      ambientTemp,
      maxHeatLoss,
      pipeDiameter
    );
    estimatedHeatLoss = maxHeatLoss;
  } else if (mode === "uvalue" && targetUValue !== undefined) {
    requiredThickness = calculateThicknessUValue(
      thermalConductivity,
      targetUValue
    );
  }
  
  const requiredThicknessInches = mmToInches(requiredThickness);
  
  return {
    mode,
    thicknessUnit,
    ambientTemp,
    thermalConductivity,
    fluidTemp,
    targetSurfaceTemp,
    pipeDiameter,
    maxHeatLoss,
    targetUValue,
    requiredThickness,
    requiredThicknessInches,
    estimatedHeatLoss,
    timestamp: Date.now()
  };
}

export function validateInputs(
  mode: CalculationMode,
  ambientTemp: number,
  thermalConductivity: number,
  fluidTemp?: number,
  targetSurfaceTemp?: number,
  pipeDiameter?: number,
  maxHeatLoss?: number,
  targetUValue?: number
): string | null {
  if (isNaN(ambientTemp)) return "Ambient temperature is required";
  if (isNaN(thermalConductivity) || thermalConductivity <= 0) return "Thermal conductivity must be greater than 0";
  
  if (mode === "surface") {
    if (fluidTemp === undefined || isNaN(fluidTemp)) return "Fluid temperature is required";
    if (targetSurfaceTemp === undefined || isNaN(targetSurfaceTemp)) return "Target surface temperature is required";
    if (fluidTemp <= ambientTemp) return "Fluid temperature must be higher than ambient temperature";
    if (targetSurfaceTemp <= ambientTemp) return "Target surface temperature must be higher than ambient temperature";
    if (targetSurfaceTemp >= fluidTemp) return "Target surface temperature must be lower than fluid temperature";
    if (pipeDiameter !== undefined && pipeDiameter <= 0) return "Pipe diameter must be greater than 0";
  } else if (mode === "heatloss") {
    if (fluidTemp === undefined || isNaN(fluidTemp)) return "Fluid temperature is required";
    if (maxHeatLoss === undefined || isNaN(maxHeatLoss) || maxHeatLoss <= 0) return "Maximum heat loss must be greater than 0";
    if (pipeDiameter === undefined || isNaN(pipeDiameter) || pipeDiameter <= 0) return "Pipe diameter is required and must be greater than 0";
    if (fluidTemp <= ambientTemp) return "Fluid temperature must be higher than ambient temperature";
  } else if (mode === "uvalue") {
    if (targetUValue === undefined || isNaN(targetUValue) || targetUValue <= 0) return "Target U-value must be greater than 0";
  }
  
  return null;
}

export function formatNumber(value: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export function getThicknessCategory(thickness: number): { level: string; color: string; description: string } {
  if (thickness < 25) return { level: "Very Thin", color: "red", description: "May be insufficient" };
  if (thickness < 50) return { level: "Thin", color: "orange", description: "Minimal insulation" };
  if (thickness < 100) return { level: "Standard", color: "yellow", description: "Typical insulation" };
  if (thickness < 150) return { level: "Thick", color: "blue", description: "Good insulation" };
  return { level: "Very Thick", color: "green", description: "Excellent insulation" };
}

// Material presets with typical thermal conductivity values
export function getMaterialPresets(): MaterialPreset[] {
  return [
    // Excellent insulators
    { name: "Polyurethane Foam (PU)", category: "Foam", conductivity: 0.023, description: "Excellent insulation, rigid foam" },
    { name: "Polyisocyanurate (PIR)", category: "Foam", conductivity: 0.022, description: "High-performance rigid foam" },
    { name: "Aerogel", category: "Advanced", conductivity: 0.015, description: "Ultra-high performance insulation" },
    
    // Good insulators
    { name: "Expanded Polystyrene (EPS)", category: "Foam", conductivity: 0.035, description: "Common foam insulation" },
    { name: "Extruded Polystyrene (XPS)", category: "Foam", conductivity: 0.030, description: "Rigid foam board" },
    { name: "Glass Wool", category: "Mineral", conductivity: 0.040, description: "Fiberglass insulation" },
    { name: "Rock Wool", category: "Mineral", conductivity: 0.038, description: "Stone wool insulation" },
    { name: "Cellulose", category: "Natural", conductivity: 0.040, description: "Recycled paper insulation" },
    
    // Moderate insulators
    { name: "Cork", category: "Natural", conductivity: 0.045, description: "Natural cork insulation" },
    { name: "Wood Fiber", category: "Natural", conductivity: 0.050, description: "Sustainable wood insulation" },
    { name: "Sheep Wool", category: "Natural", conductivity: 0.038, description: "Natural wool insulation" },
    
    // Building materials (for reference)
    { name: "Concrete", category: "Structural", conductivity: 1.400, description: "Poor insulator" },
    { name: "Brick", category: "Structural", conductivity: 0.700, description: "Poor insulator" },
    { name: "Wood", category: "Structural", conductivity: 0.150, description: "Moderate insulator" }
  ];
}

// Application presets for quick calculations
export function getApplicationPresets(): ApplicationPreset[] {
  return [
    {
      name: "Hot Water Pipe",
      description: "Domestic hot water pipe insulation",
      mode: "surface",
      ambientTemp: 20,
      thermalConductivity: 0.040,
      fluidTemp: 60,
      targetSurfaceTemp: 35,
      pipeDiameter: 50
    },
    {
      name: "Steam Pipe",
      description: "Industrial steam pipe insulation",
      mode: "surface",
      ambientTemp: 25,
      thermalConductivity: 0.035,
      fluidTemp: 150,
      targetSurfaceTemp: 45,
      pipeDiameter: 100
    },
    {
      name: "Chilled Water Pipe",
      description: "HVAC chilled water pipe",
      mode: "surface",
      ambientTemp: 30,
      thermalConductivity: 0.038,
      fluidTemp: 7,
      targetSurfaceTemp: 20,
      pipeDiameter: 80
    },
    {
      name: "Building Wall",
      description: "External wall insulation",
      mode: "uvalue",
      ambientTemp: 20,
      thermalConductivity: 0.035,
      targetUValue: 0.25
    },
    {
      name: "Roof Insulation",
      description: "Pitched roof insulation",
      mode: "uvalue",
      ambientTemp: 20,
      thermalConductivity: 0.040,
      targetUValue: 0.16
    },
    {
      name: "Industrial Process Pipe",
      description: "High temperature process pipe",
      mode: "heatloss",
      ambientTemp: 30,
      thermalConductivity: 0.030,
      fluidTemp: 200,
      maxHeatLoss: 100,
      pipeDiameter: 150
    }
  ];
}

// History management
const HISTORY_KEY = "insulation-thickness-calculator-history";
const MAX_HISTORY_ITEMS = 10;

export function saveToHistory(calculation: InsulationCalculation): void {
  try {
    const history = getHistory();
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      calculation,
      timestamp: Date.now()
    };
    
    history.unshift(newEntry);
    
    // Keep only the latest items
    const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn("Failed to save to history:", error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Failed to load history:", error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn("Failed to clear history:", error);
  }
}

// Export functionality
export function exportToText(calculation: InsulationCalculation): string {
  const category = getThicknessCategory(calculation.requiredThickness);
  
  let content = `INSULATION THICKNESS CALCULATION REPORT
Generated: ${new Date().toLocaleString()}

CALCULATION MODE: ${calculation.mode.toUpperCase()}

MATERIAL PROPERTIES:
- Thermal Conductivity: ${formatNumber(calculation.thermalConductivity, 3)} W/m·K
- Ambient Temperature: ${formatNumber(calculation.ambientTemp)}°C

`;

  if (calculation.mode === "surface") {
    content += `SURFACE TEMPERATURE MODE:
- Fluid Temperature: ${formatNumber(calculation.fluidTemp || 0)}°C
- Target Surface Temperature: ${formatNumber(calculation.targetSurfaceTemp || 0)}°C
${calculation.pipeDiameter ? `- Pipe Diameter: ${formatNumber(calculation.pipeDiameter)} mm\n` : ''}
`;
  } else if (calculation.mode === "heatloss") {
    content += `HEAT LOSS MODE:
- Fluid Temperature: ${formatNumber(calculation.fluidTemp || 0)}°C
- Maximum Heat Loss: ${formatNumber(calculation.maxHeatLoss || 0)} W/m
- Pipe Diameter: ${formatNumber(calculation.pipeDiameter || 0)} mm
`;
  } else if (calculation.mode === "uvalue") {
    content += `U-VALUE MODE:
- Target U-Value: ${formatNumber(calculation.targetUValue || 0, 3)} W/m²·K
`;
  }

  content += `
RESULTS:
- Required Thickness: ${formatNumber(calculation.requiredThickness)} mm
- Required Thickness: ${formatNumber(calculation.requiredThicknessInches, 2)} inches
- Thickness Category: ${category.level}
- Assessment: ${category.description}
${calculation.estimatedHeatLoss ? `- Estimated Heat Loss: ${formatNumber(calculation.estimatedHeatLoss)} W/m\n` : ''}

Note: This is an estimate based on simplified calculations. Consult with insulation professionals for detailed thermal analysis.`;

  return content;
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}