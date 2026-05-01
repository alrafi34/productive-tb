import { Unit, ShapeType, ShapeInputs, VolumeCalculation, HistoryEntry, PresetTemplate, RectangularInputs, CylinderInputs, SphereInputs, ConeInputs } from "./types";

const CUBIC_FEET_TO_CUBIC_METERS = 0.0283168;
const CUBIC_METERS_TO_CUBIC_FEET = 35.3147;

export function calculateVolume(
  shape: ShapeType,
  inputs: ShapeInputs,
  unit: Unit
): VolumeCalculation {
  let volume = 0;
  let formula = "";

  switch (shape) {
    case "rectangular": {
      const rect = inputs as RectangularInputs;
      volume = rect.length * rect.width * rect.height;
      formula = `Volume = Length × Width × Height = ${rect.length} × ${rect.width} × ${rect.height}`;
      break;
    }
    case "cylinder": {
      const cyl = inputs as CylinderInputs;
      volume = Math.PI * Math.pow(cyl.radius, 2) * cyl.height;
      formula = `Volume = π × r² × h = π × ${cyl.radius}² × ${cyl.height}`;
      break;
    }
    case "sphere": {
      const sph = inputs as SphereInputs;
      volume = (4 / 3) * Math.PI * Math.pow(sph.radius, 3);
      formula = `Volume = (4/3) × π × r³ = (4/3) × π × ${sph.radius}³`;
      break;
    }
    case "cone": {
      const cone = inputs as ConeInputs;
      volume = (1 / 3) * Math.PI * Math.pow(cone.radius, 2) * cone.height;
      formula = `Volume = (1/3) × π × r² × h = (1/3) × π × ${cone.radius}² × ${cone.height}`;
      break;
    }
  }

  return {
    shape,
    volume,
    unit,
    inputs,
    formula,
    timestamp: Date.now()
  };
}

export function convertVolume(volume: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return volume;
  
  if (fromUnit === "meters" && toUnit === "feet") {
    return volume * CUBIC_METERS_TO_CUBIC_FEET;
  } else {
    return volume * CUBIC_FEET_TO_CUBIC_METERS;
  }
}

export function validateRectangularInputs(inputs: RectangularInputs): string | null {
  if (inputs.length <= 0) return "Length must be greater than 0";
  if (inputs.width <= 0) return "Width must be greater than 0";
  if (inputs.height <= 0) return "Height must be greater than 0";
  return null;
}

export function validateCylinderInputs(inputs: CylinderInputs): string | null {
  if (inputs.radius <= 0) return "Radius must be greater than 0";
  if (inputs.height <= 0) return "Height must be greater than 0";
  return null;
}

export function validateSphereInputs(inputs: SphereInputs): string | null {
  if (inputs.radius <= 0) return "Radius must be greater than 0";
  return null;
}

export function validateConeInputs(inputs: ConeInputs): string | null {
  if (inputs.radius <= 0) return "Radius must be greater than 0";
  if (inputs.height <= 0) return "Height must be greater than 0";
  return null;
}

export function validateInputs(shape: ShapeType, inputs: ShapeInputs): string | null {
  switch (shape) {
    case "rectangular":
      return validateRectangularInputs(inputs as RectangularInputs);
    case "cylinder":
      return validateCylinderInputs(inputs as CylinderInputs);
    case "sphere":
      return validateSphereInputs(inputs as SphereInputs);
    case "cone":
      return validateConeInputs(inputs as ConeInputs);
    default:
      return "Invalid shape type";
  }
}

export function getShapeLabel(shape: ShapeType): string {
  const labels: Record<ShapeType, string> = {
    rectangular: "Rectangular Prism (Room/Building)",
    cylinder: "Cylinder (Column/Tank)",
    sphere: "Sphere (Dome)",
    cone: "Cone (Roof)"
  };
  return labels[shape];
}

export function getUnitLabel(unit: Unit): string {
  return unit === "meters" ? "m³" : "ft³";
}

export function getLinearUnitLabel(unit: Unit): string {
  return unit === "meters" ? "m" : "ft";
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getPresetTemplates(): PresetTemplate[] {
  return [
    {
      name: "Standard Room",
      description: "Typical residential room",
      shape: "rectangular",
      inputs: { length: 5, width: 4, height: 3 } as RectangularInputs,
      category: "Residential"
    },
    {
      name: "Large Hall",
      description: "Commercial hall space",
      shape: "rectangular",
      inputs: { length: 20, width: 15, height: 5 } as RectangularInputs,
      category: "Commercial"
    },
    {
      name: "Concrete Slab",
      description: "Foundation slab",
      shape: "rectangular",
      inputs: { length: 10, width: 8, height: 0.2 } as RectangularInputs,
      category: "Construction"
    },
    {
      name: "Water Tank",
      description: "Cylindrical storage tank",
      shape: "cylinder",
      inputs: { radius: 2, height: 5 } as CylinderInputs,
      category: "Storage"
    },
    {
      name: "Column",
      description: "Structural column",
      shape: "cylinder",
      inputs: { radius: 0.3, height: 4 } as CylinderInputs,
      category: "Structure"
    },
    {
      name: "Dome",
      description: "Hemispherical dome",
      shape: "sphere",
      inputs: { radius: 5 } as SphereInputs,
      category: "Architecture"
    }
  ];
}

// History Management
const HISTORY_KEY = "3d-volume-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(calculation: VolumeCalculation): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `calc-${Date.now()}`,
    timestamp: Date.now(),
    calculation
  };
  history.unshift(entry);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

// Export Functions
export function exportToText(calculation: VolumeCalculation): string {
  const unit = getUnitLabel(calculation.unit);
  const linearUnit = getLinearUnitLabel(calculation.unit);
  const shapeLabel = getShapeLabel(calculation.shape);
  
  let inputsText = "";
  switch (calculation.shape) {
    case "rectangular": {
      const rect = calculation.inputs as RectangularInputs;
      inputsText = `Length: ${rect.length} ${linearUnit}\nWidth: ${rect.width} ${linearUnit}\nHeight: ${rect.height} ${linearUnit}`;
      break;
    }
    case "cylinder": {
      const cyl = calculation.inputs as CylinderInputs;
      inputsText = `Radius: ${cyl.radius} ${linearUnit}\nHeight: ${cyl.height} ${linearUnit}`;
      break;
    }
    case "sphere": {
      const sph = calculation.inputs as SphereInputs;
      inputsText = `Radius: ${sph.radius} ${linearUnit}`;
      break;
    }
    case "cone": {
      const cone = calculation.inputs as ConeInputs;
      inputsText = `Radius: ${cone.radius} ${linearUnit}\nHeight: ${cone.height} ${linearUnit}`;
      break;
    }
  }

  return `3D VOLUME CALCULATION
=====================

Shape: ${shapeLabel}

Dimensions:
${inputsText}

Formula:
${calculation.formula}

Result:
Volume: ${formatNumber(calculation.volume, 3)} ${unit}

Generated: ${new Date(calculation.timestamp).toLocaleString()}
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
