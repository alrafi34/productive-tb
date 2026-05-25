import { PowerSupplyInputs, PowerSupplyResult, ComponentBreakdown, HistoryEntry, CoolingType } from "./types";

// Component power database
const CPU_POWER: Record<string, number> = {
  // Intel
  'Intel i3-12100F': 58,
  'Intel i3-13100F': 60,
  'Intel i5-12400F': 65,
  'Intel i5-13400F': 65,
  'Intel i5-12600K': 125,
  'Intel i5-13600K': 125,
  'Intel i7-12700K': 125,
  'Intel i7-13700K': 125,
  'Intel i9-12900K': 125,
  'Intel i9-13900K': 125,
  'Intel i9-14900K': 125,
  
  // AMD
  'AMD Ryzen 3 4300G': 65,
  'AMD Ryzen 5 5600G': 65,
  'AMD Ryzen 5 5600X': 65,
  'AMD Ryzen 5 7600X': 105,
  'AMD Ryzen 7 5700X': 65,
  'AMD Ryzen 7 5800X': 105,
  'AMD Ryzen 7 7700X': 105,
  'AMD Ryzen 9 5900X': 105,
  'AMD Ryzen 9 5950X': 105,
  'AMD Ryzen 9 7900X': 170,
  'AMD Ryzen 9 7950X': 170,
};

const GPU_POWER: Record<string, number> = {
  // NVIDIA RTX 40 Series
  'RTX 4060': 115,
  'RTX 4060 Ti': 165,
  'RTX 4070': 200,
  'RTX 4070 Super': 220,
  'RTX 4070 Ti': 285,
  'RTX 4080': 320,
  'RTX 4090': 450,
  
  // NVIDIA RTX 30 Series
  'RTX 3050': 130,
  'RTX 3060': 170,
  'RTX 3060 Ti': 200,
  'RTX 3070': 220,
  'RTX 3070 Ti': 290,
  'RTX 3080': 320,
  'RTX 3080 Ti': 350,
  'RTX 3090': 350,
  'RTX 3090 Ti': 450,
  
  // AMD RX 7000 Series
  'RX 7600': 165,
  'RX 7700 XT': 245,
  'RX 7800 XT': 263,
  'RX 7900 GRE': 260,
  'RX 7900 XT': 315,
  'RX 7900 XTX': 355,
  
  // AMD RX 6000 Series
  'RX 6500 XT': 107,
  'RX 6600': 132,
  'RX 6600 XT': 160,
  'RX 6700 XT': 230,
  'RX 6750 XT': 250,
  'RX 6800': 250,
  'RX 6800 XT': 300,
  'RX 6900 XT': 300,
  'RX 6950 XT': 335,
  
  // Integrated Graphics
  'Integrated Graphics': 15,
  'No GPU': 0,
};

const RAM_POWER_PER_GB = 0.5; // Watts per GB
const MOTHERBOARD_BASE_POWER = 50; // Base motherboard power

const STORAGE_POWER = {
  ssd: 3,
  hdd: 8,
  nvme: 5,
};

const COOLING_POWER: Record<CoolingType, number> = {
  stock: 5,
  air: 10,
  'liquid-aio': 20,
  'custom-loop': 35,
};

const PERIPHERAL_POWER = {
  'keyboard-mouse': 5,
  'rgb-basic': 15,
  'rgb-advanced': 30,
  monitor: 0, // External power
  speakers: 10,
};

// Standard PSU sizes
const STANDARD_PSU_SIZES = [450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 1000, 1200, 1300, 1500, 1600];

// Format number with precision
export function formatNumber(value: number, decimals: number = 0): string {
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
export function validateInputs(inputs: PowerSupplyInputs): string | null {
  if (!inputs.cpu) {
    return "Please select a CPU";
  }
  if (!inputs.gpu) {
    return "Please select a GPU";
  }
  if (inputs.ram <= 0) {
    return "RAM amount must be greater than 0";
  }
  if (inputs.ram > 128) {
    return "RAM amount exceeds typical range (>128GB)";
  }
  if (inputs.safetyMargin < 10 || inputs.safetyMargin > 50) {
    return "Safety margin must be between 10% and 50%";
  }
  return null;
}

// Calculate power supply requirements
export function calculatePowerSupply(inputs: PowerSupplyInputs): PowerSupplyResult {
  const breakdown: ComponentBreakdown = {
    cpu: CPU_POWER[inputs.cpu] || 0,
    gpu: GPU_POWER[inputs.gpu] || 0,
    ram: inputs.ram * RAM_POWER_PER_GB,
    storage: 0,
    cooling: COOLING_POWER[inputs.cooling] || 0,
    peripherals: 0,
    motherboard: MOTHERBOARD_BASE_POWER,
  };

  // Calculate storage power
  inputs.storage.forEach(device => {
    breakdown.storage += STORAGE_POWER[device.type] * device.count;
  });

  // Calculate peripheral power
  inputs.peripherals.forEach(device => {
    breakdown.peripherals += PERIPHERAL_POWER[device.type] * device.count;
  });

  // Calculate total load
  let totalLoad = Object.values(breakdown).reduce((sum, power) => sum + power, 0);

  // Apply overclocking multiplier
  if (inputs.overclocking) {
    breakdown.cpu *= 1.2;
    breakdown.gpu *= 1.15;
    totalLoad = Object.values(breakdown).reduce((sum, power) => sum + power, 0);
  }

  // Apply safety margin
  const safetyMultiplier = 1 + (inputs.safetyMargin / 100);
  const recommendedWattage = totalLoad * safetyMultiplier;

  // Find next standard PSU size
  const recommendedPSU = STANDARD_PSU_SIZES.find(size => size >= recommendedWattage) || 1600;

  // Calculate efficiency and load percentage
  const loadPercentage = (totalLoad / recommendedPSU) * 100;
  const efficiency = getEfficiencyRating(loadPercentage);

  // Generate warnings
  const warnings = generateWarnings(totalLoad, recommendedPSU, loadPercentage, inputs);

  // Generate calculation steps
  const steps = generateSteps(inputs, breakdown, totalLoad, recommendedPSU, safetyMultiplier);

  return {
    totalLoad,
    recommendedPSU,
    efficiency,
    loadPercentage,
    breakdown,
    warnings,
    steps,
  };
}

// Get efficiency rating based on load percentage
function getEfficiencyRating(loadPercentage: number): string {
  if (loadPercentage < 20) return "Low efficiency (under 20% load)";
  if (loadPercentage < 50) return "Good efficiency (20-50% load)";
  if (loadPercentage < 80) return "Optimal efficiency (50-80% load)";
  if (loadPercentage < 90) return "Good efficiency (80-90% load)";
  return "Poor efficiency (over 90% load)";
}

// Generate warnings
function generateWarnings(totalLoad: number, recommendedPSU: number, loadPercentage: number, inputs: PowerSupplyInputs): string[] {
  const warnings: string[] = [];

  if (loadPercentage > 90) {
    warnings.push("PSU will run at very high load. Consider a higher wattage PSU for better efficiency and longevity.");
  }

  if (loadPercentage < 20) {
    warnings.push("PSU may be oversized. Consider a lower wattage PSU for better efficiency and cost savings.");
  }

  if (inputs.overclocking && inputs.safetyMargin < 20) {
    warnings.push("Overclocking with low safety margin may cause instability. Consider increasing safety margin to 25-30%.");
  }

  if (totalLoad > 750 && !inputs.storage.some(s => s.type === 'ssd')) {
    warnings.push("High-power system with HDDs may have higher power spikes during startup.");
  }

  if (GPU_POWER[inputs.gpu] > 300 && recommendedPSU < 750) {
    warnings.push("High-end GPU detected. Ensure PSU has adequate PCIe power connectors.");
  }

  return warnings;
}

// Generate calculation steps
function generateSteps(
  inputs: PowerSupplyInputs,
  breakdown: ComponentBreakdown,
  totalLoad: number,
  recommendedPSU: number,
  safetyMultiplier: number
): string[] {
  const steps = [
    "Power Supply Calculation",
    "",
    "Component Power Breakdown:",
    `  CPU (${inputs.cpu}): ${formatNumber(breakdown.cpu)}W`,
    `  GPU (${inputs.gpu}): ${formatNumber(breakdown.gpu)}W`,
    `  RAM (${inputs.ram}GB): ${formatNumber(breakdown.ram)}W`,
    `  Storage: ${formatNumber(breakdown.storage)}W`,
    `  Cooling (${inputs.cooling}): ${formatNumber(breakdown.cooling)}W`,
    `  Peripherals: ${formatNumber(breakdown.peripherals)}W`,
    `  Motherboard: ${formatNumber(breakdown.motherboard)}W`,
    "",
    inputs.overclocking ? "Overclocking applied: CPU +20%, GPU +15%" : "",
    inputs.overclocking ? "" : "",
    "Step 1: Calculate Total System Load",
    `  Total Load = ${formatNumber(totalLoad)}W`,
    "",
    "Step 2: Apply Safety Margin",
    `  Safety Margin = ${inputs.safetyMargin}%`,
    `  Required Capacity = ${formatNumber(totalLoad)} × ${safetyMultiplier.toFixed(2)}`,
    `  Required Capacity = ${formatNumber(totalLoad * safetyMultiplier)}W`,
    "",
    "Step 3: Select Standard PSU Size",
    `  Recommended PSU = ${recommendedPSU}W`,
    `  Load Percentage = ${formatNumber((totalLoad / recommendedPSU) * 100, 1)}%`,
    "",
    "Results:",
    `  System Load: ${formatNumber(totalLoad)}W`,
    `  Recommended PSU: ${recommendedPSU}W`,
    `  Efficiency Range: ${getEfficiencyRating((totalLoad / recommendedPSU) * 100)}`
  ];

  return steps.filter(step => step !== "");
}

// Get component lists
export function getCPUList(): string[] {
  return Object.keys(CPU_POWER).sort();
}

export function getGPUList(): string[] {
  return Object.keys(GPU_POWER).sort();
}

// Get presets
export function getPresets() {
  return [
    {
      name: "Budget Gaming",
      description: "Entry-level gaming build",
      cpu: "AMD Ryzen 5 5600G",
      gpu: "RTX 3060",
      ram: 16,
      storage: [{ type: 'ssd' as const, count: 1 }],
      cooling: 'air' as const,
      peripherals: [{ type: 'keyboard-mouse' as const, count: 1 }],
    },
    {
      name: "Mid-Range Gaming",
      description: "1440p gaming performance",
      cpu: "AMD Ryzen 5 7600X",
      gpu: "RTX 4070",
      ram: 32,
      storage: [{ type: 'nvme' as const, count: 1 }, { type: 'ssd' as const, count: 1 }],
      cooling: 'liquid-aio' as const,
      peripherals: [{ type: 'keyboard-mouse' as const, count: 1 }, { type: 'rgb-basic' as const, count: 1 }],
    },
    {
      name: "High-End Gaming",
      description: "4K gaming and streaming",
      cpu: "Intel i7-13700K",
      gpu: "RTX 4080",
      ram: 32,
      storage: [{ type: 'nvme' as const, count: 2 }],
      cooling: 'liquid-aio' as const,
      peripherals: [{ type: 'keyboard-mouse' as const, count: 1 }, { type: 'rgb-advanced' as const, count: 1 }],
    },
    {
      name: "Enthusiast Build",
      description: "Top-tier performance",
      cpu: "AMD Ryzen 9 7950X",
      gpu: "RTX 4090",
      ram: 64,
      storage: [{ type: 'nvme' as const, count: 2 }, { type: 'ssd' as const, count: 1 }],
      cooling: 'custom-loop' as const,
      peripherals: [{ type: 'keyboard-mouse' as const, count: 1 }, { type: 'rgb-advanced' as const, count: 1 }],
    },
    {
      name: "Office/Productivity",
      description: "Basic computing tasks",
      cpu: "Intel i3-12100F",
      gpu: "Integrated Graphics",
      ram: 16,
      storage: [{ type: 'ssd' as const, count: 1 }],
      cooling: 'stock' as const,
      peripherals: [{ type: 'keyboard-mouse' as const, count: 1 }],
    },
    {
      name: "Workstation",
      description: "Content creation and rendering",
      cpu: "Intel i9-13900K",
      gpu: "RTX 4070 Ti",
      ram: 64,
      storage: [{ type: 'nvme' as const, count: 2 }, { type: 'hdd' as const, count: 2 }],
      cooling: 'liquid-aio' as const,
      peripherals: [{ type: 'keyboard-mouse' as const, count: 1 }],
    },
  ];
}

// History management
const HISTORY_KEY = 'power-supply-calculator-history';
const MAX_HISTORY = 10;

export function saveToHistory(inputs: PowerSupplyInputs, result: PowerSupplyResult): void {
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
export function exportToText(inputs: PowerSupplyInputs, result: PowerSupplyResult): string {
  const lines = [
    "Power Supply Calculator - PC Build Report",
    "=".repeat(60),
    "",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "COMPONENT CONFIGURATION:",
    "-".repeat(60),
    `CPU: ${inputs.cpu}`,
    `GPU: ${inputs.gpu}`,
    `RAM: ${inputs.ram}GB`,
    `Storage: ${inputs.storage.map(s => `${s.count}x ${s.type.toUpperCase()}`).join(', ')}`,
    `Cooling: ${inputs.cooling}`,
    `Peripherals: ${inputs.peripherals.map(p => `${p.count}x ${p.type}`).join(', ')}`,
    `Overclocking: ${inputs.overclocking ? 'Yes' : 'No'}`,
    `Safety Margin: ${inputs.safetyMargin}%`,
    "",
    "POWER BREAKDOWN:",
    "-".repeat(60),
    `CPU: ${formatNumber(result.breakdown.cpu)}W`,
    `GPU: ${formatNumber(result.breakdown.gpu)}W`,
    `RAM: ${formatNumber(result.breakdown.ram)}W`,
    `Storage: ${formatNumber(result.breakdown.storage)}W`,
    `Cooling: ${formatNumber(result.breakdown.cooling)}W`,
    `Peripherals: ${formatNumber(result.breakdown.peripherals)}W`,
    `Motherboard: ${formatNumber(result.breakdown.motherboard)}W`,
    "",
    "RESULTS:",
    "-".repeat(60),
    `Total System Load: ${formatNumber(result.totalLoad)}W`,
    `Recommended PSU: ${result.recommendedPSU}W`,
    `Load Percentage: ${formatNumber(result.loadPercentage, 1)}%`,
    `Efficiency: ${result.efficiency}`,
  ];

  if (result.warnings.length > 0) {
    lines.push(
      "",
      "WARNINGS:",
      "-".repeat(60)
    );
    result.warnings.forEach(warning => lines.push(`• ${warning}`));
  }

  lines.push(
    "",
    "CALCULATION STEPS:",
    "-".repeat(60)
  );
  lines.push(...result.steps);

  lines.push(
    "",
    "=".repeat(60),
    "Generated by Power Supply Calculator"
  );

  return lines.join("\n");
}

// Export to CSV
export function exportToCSV(inputs: PowerSupplyInputs, result: PowerSupplyResult): string {
  const headers = ["Component", "Power (W)", "Notes"];
  const rows = [
    headers.join(","),
    `"CPU","${formatNumber(result.breakdown.cpu)}","${inputs.cpu}"`,
    `"GPU","${formatNumber(result.breakdown.gpu)}","${inputs.gpu}"`,
    `"RAM","${formatNumber(result.breakdown.ram)}","${inputs.ram}GB"`,
    `"Storage","${formatNumber(result.breakdown.storage)}","${inputs.storage.map(s => `${s.count}x ${s.type}`).join(', ')}"`,
    `"Cooling","${formatNumber(result.breakdown.cooling)}","${inputs.cooling}"`,
    `"Peripherals","${formatNumber(result.breakdown.peripherals)}","${inputs.peripherals.map(p => `${p.count}x ${p.type}`).join(', ')}"`,
    `"Motherboard","${formatNumber(result.breakdown.motherboard)}","Base power"`,
    `"Total Load","${formatNumber(result.totalLoad)}","System total"`,
    `"Recommended PSU","${result.recommendedPSU}","With ${inputs.safetyMargin}% margin"`,
    `"Load Percentage","${formatNumber(result.loadPercentage, 1)}%","Efficiency range"`
  ];

  return rows.join("\n");
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