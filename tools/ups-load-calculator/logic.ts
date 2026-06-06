import { Device, UPSInputs, UPSResult, HistoryEntry } from "./types";

// Re-export types for UI component
export type { HistoryEntry } from "./types";

// Format number with precision
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Debounce function
export function debounce(fn: () => void, delay: number) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

// Validate inputs
export function validateInputs(inputs: UPSInputs): string | null {
  if (inputs.devices.length === 0) {
    return "Please add at least one device";
  }

  for (const device of inputs.devices) {
    if (!device.name.trim()) {
      return "Device name cannot be empty";
    }
    if (device.watts <= 0) {
      return "Device wattage must be greater than 0";
    }
    if (device.quantity <= 0) {
      return "Device quantity must be at least 1";
    }
  }

  if (inputs.safetyMargin < 0 || inputs.safetyMargin > 100) {
    return "Safety margin must be between 0% and 100%";
  }

  if (inputs.powerFactor <= 0 || inputs.powerFactor > 1) {
    return "Power factor must be between 0 and 1";
  }

  return null;
}

// Round to standard UPS sizes
function roundToStandardUPS(va: number): number {
  const standardSizes = [
    300, 500, 600, 650, 750, 800, 1000, 1200, 1500, 2000, 2200, 3000, 5000, 6000, 8000, 10000
  ];

  for (const size of standardSizes) {
    if (va <= size) {
      return size;
    }
  }

  // Round up to nearest 1000 for very large values
  return Math.ceil(va / 1000) * 1000;
}

// Calculate UPS load
export function calculateUPSLoad(inputs: UPSInputs): UPSResult {
  const { devices, safetyMargin, powerFactor, batteryEfficiency } = inputs;

  // Step 1: Calculate total load
  let totalLoad = 0;
  devices.forEach(device => {
    totalLoad += device.watts * device.quantity;
  });

  // Step 2: Apply safety margin
  const adjustedLoad = totalLoad * (1 + safetyMargin / 100);

  // Step 3: Convert to VA
  const requiredVA = adjustedLoad / powerFactor;

  // Step 4: Recommend standard UPS size
  const recommendedUPS = roundToStandardUPS(requiredVA);

  // Generate calculation steps
  const steps = generateSteps(devices, totalLoad, adjustedLoad, requiredVA, recommendedUPS, safetyMargin, powerFactor);

  return {
    totalLoad,
    adjustedLoad,
    requiredVA,
    recommendedUPS,
    powerFactor,
    safetyMargin,
    deviceCount: devices.length,
    steps,
  };
}

function generateSteps(
  devices: Device[],
  totalLoad: number,
  adjustedLoad: number,
  requiredVA: number,
  recommendedUPS: number,
  safetyMargin: number,
  powerFactor: number
): string[] {
  const steps: string[] = [];

  steps.push("UPS Load Calculation", "");
  steps.push("Step 1: Calculate Total Load");
  devices.forEach(device => {
    steps.push(`  ${device.name}: ${device.watts}W × ${device.quantity} = ${device.watts * device.quantity}W`);
  });
  steps.push(`  Total Load = ${formatNumber(totalLoad, 2)} W`);
  steps.push("");

  steps.push("Step 2: Apply Safety Margin");
  steps.push(`  Safety Margin = ${safetyMargin}%`);
  steps.push(`  Adjusted Load = ${formatNumber(totalLoad, 2)} × ${1 + safetyMargin / 100}`);
  steps.push(`  Adjusted Load = ${formatNumber(adjustedLoad, 2)} W`);
  steps.push("");

  steps.push("Step 3: Convert Watts to VA");
  steps.push(`  Power Factor = ${powerFactor}`);
  steps.push(`  Required VA = ${formatNumber(adjustedLoad, 2)} ÷ ${powerFactor}`);
  steps.push(`  Required VA = ${formatNumber(requiredVA, 2)} VA`);
  steps.push("");

  steps.push("Step 4: Recommend Standard UPS Size");
  steps.push(`  Recommended UPS = ${recommendedUPS} VA`);
  steps.push("");

  return steps;
}

// Device presets
export function getDevicePresets() {
  return [
    { name: "Desktop PC", watts: 300 },
    { name: "Laptop", watts: 65 },
    { name: "Monitor (LED)", watts: 30 },
    { name: "Monitor (LCD)", watts: 50 },
    { name: "Router", watts: 20 },
    { name: "Modem", watts: 15 },
    { name: "Network Switch", watts: 25 },
    { name: "External HDD", watts: 10 },
    { name: "Printer", watts: 100 },
    { name: "Server", watts: 500 },
    { name: "NAS Storage", watts: 200 },
    { name: "IP Camera", watts: 10 },
    { name: "LED Light", watts: 15 },
    { name: "Fan", watts: 75 },
    { name: "Phone Charger", watts: 10 },
  ];
}

// System presets
export function getSystemPresets() {
  return [
    {
      name: "Home Office",
      description: "PC + Monitor + Router",
      devices: [
        { name: "Desktop PC", watts: 300, quantity: 1 },
        { name: "Monitor", watts: 30, quantity: 1 },
        { name: "Router", watts: 20, quantity: 1 },
      ],
    },
    {
      name: "Small Business",
      description: "2 PCs + Printer + Network",
      devices: [
        { name: "Desktop PC", watts: 300, quantity: 2 },
        { name: "Monitor", watts: 30, quantity: 2 },
        { name: "Printer", watts: 100, quantity: 1 },
        { name: "Router", watts: 20, quantity: 1 },
      ],
    },
    {
      name: "Server Room",
      description: "Server + Storage + Network",
      devices: [
        { name: "Server", watts: 500, quantity: 1 },
        { name: "NAS Storage", watts: 200, quantity: 1 },
        { name: "Network Switch", watts: 25, quantity: 1 },
      ],
    },
    {
      name: "Gaming Setup",
      description: "Gaming PC + Dual Monitors",
      devices: [
        { name: "Gaming PC", watts: 500, quantity: 1 },
        { name: "Monitor", watts: 50, quantity: 2 },
        { name: "Router", watts: 20, quantity: 1 },
      ],
    },
  ];
}

// History management
const HISTORY_KEY = 'ups-load-calculator-history';
const MAX_HISTORY = 10;

export function saveToHistory(inputs: UPSInputs, result: UPSResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) {
      history.pop();
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

// Export to text
export function exportToText(inputs: UPSInputs, result: UPSResult): string {
  const lines = [
    "UPS Load Calculator - Calculation Report",
    "=".repeat(60),
    "",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "DEVICE LIST:",
    "-".repeat(60),
  ];

  inputs.devices.forEach(device => {
    lines.push(`${device.name}: ${device.watts}W × ${device.quantity} = ${device.watts * device.quantity}W`);
  });

  lines.push(
    "",
    "CALCULATION PARAMETERS:",
    "-".repeat(60),
    `Safety Margin: ${inputs.safetyMargin}%`,
    `Power Factor: ${inputs.powerFactor}`,
    `Battery Efficiency: ${inputs.batteryEfficiency}%`,
    "",
    "RESULTS:",
    "-".repeat(60),
    `Total Load: ${formatNumber(result.totalLoad, 2)} W`,
    `Adjusted Load (with safety margin): ${formatNumber(result.adjustedLoad, 2)} W`,
    `Required UPS Capacity: ${formatNumber(result.requiredVA, 2)} VA`,
    `Recommended UPS Size: ${result.recommendedUPS} VA`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(60)
  );

  lines.push(...result.steps);

  lines.push(
    "",
    "=".repeat(60),
    "Generated by UPS Load Calculator"
  );

  return lines.join("\n");
}

// Export to CSV
export function exportToCSV(inputs: UPSInputs, result: UPSResult): string {
  const lines = [
    "Device Name,Watts,Quantity,Total Watts",
  ];

  inputs.devices.forEach(device => {
    lines.push(`"${device.name}",${device.watts},${device.quantity},${device.watts * device.quantity}`);
  });

  lines.push(
    "",
    "Summary",
    `"Total Load",${formatNumber(result.totalLoad, 2)},"W"`,
    `"Adjusted Load",${formatNumber(result.adjustedLoad, 2)},"W"`,
    `"Required VA",${formatNumber(result.requiredVA, 2)},"VA"`,
    `"Recommended UPS",${result.recommendedUPS},"VA"`,
    `"Safety Margin",${result.safetyMargin},"%"`,
    `"Power Factor",${result.powerFactor},""`,
  );

  return lines.join("\n");
}

// Download file
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
