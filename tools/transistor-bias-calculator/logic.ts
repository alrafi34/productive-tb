import {
  BiasType,
  OperatingRegion,
  TransistorBiasInputs,
  TransistorBiasResult,
  BiasPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "transistor-bias-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate transistor bias parameters
 */
export function calculateTransistorBias(inputs: TransistorBiasInputs): TransistorBiasResult {
  const { biasType } = inputs;
  
  switch (biasType) {
    case 'voltage-divider':
      return calculateVoltageDividerBias(inputs);
    case 'fixed':
      return calculateFixedBias(inputs);
    case 'emitter':
      return calculateEmitterBias(inputs);
    default:
      throw new Error('Invalid bias type');
  }
}

/**
 * Calculate voltage divider bias
 */
function calculateVoltageDividerBias(inputs: TransistorBiasInputs): TransistorBiasResult {
  const { vcc, r1, r2, rc, re, beta, vbe } = inputs;
  
  if (!r1 || !r2) {
    throw new Error('R1 and R2 are required for voltage divider bias');
  }
  
  const steps: string[] = [];
  
  steps.push(`Bias Configuration: Voltage Divider Bias`);
  steps.push(`Given Values:`);
  steps.push(`Vcc = ${vcc} V`);
  steps.push(`R1 = ${formatResistance(r1)}`);
  steps.push(`R2 = ${formatResistance(r2)}`);
  steps.push(`Rc = ${formatResistance(rc)}`);
  steps.push(`Re = ${formatResistance(re)}`);
  steps.push(`β (Beta) = ${beta}`);
  steps.push(`Vbe = ${vbe} V`);
  steps.push(``);
  
  // Step 1: Calculate base voltage using voltage divider
  const vb = vcc * (r2 / (r1 + r2));
  steps.push(`Step 1: Calculate Base Voltage (Voltage Divider)`);
  steps.push(`Vb = Vcc × (R2 / (R1 + R2))`);
  steps.push(`Vb = ${vcc} × (${r2} / ${r1 + r2})`);
  steps.push(`Vb = ${formatNumber(vb, 3)} V`);
  steps.push(``);
  
  // Step 2: Calculate emitter voltage
  const ve = vb - vbe;
  steps.push(`Step 2: Calculate Emitter Voltage`);
  steps.push(`Ve = Vb - Vbe`);
  steps.push(`Ve = ${formatNumber(vb, 3)} - ${vbe}`);
  steps.push(`Ve = ${formatNumber(ve, 3)} V`);
  steps.push(``);
  
  // Step 3: Calculate emitter current
  const ieA = ve / re;
  const ieMA = ieA * 1000;
  steps.push(`Step 3: Calculate Emitter Current`);
  steps.push(`Ie = Ve / Re`);
  steps.push(`Ie = ${formatNumber(ve, 3)} / ${re}`);
  steps.push(`Ie = ${formatNumber(ieA, 6)} A`);
  steps.push(`Ie = ${formatNumber(ieMA, 3)} mA`);
  steps.push(``);
  
  // Step 4: Calculate collector current (Ic ≈ Ie)
  const icA = ieA;
  const icMA = ieMA;
  steps.push(`Step 4: Calculate Collector Current`);
  steps.push(`Ic ≈ Ie (for β >> 1)`);
  steps.push(`Ic = ${formatNumber(icMA, 3)} mA`);
  steps.push(``);
  
  // Step 5: Calculate base current
  const ibA = icA / beta;
  const ibMA = ibA * 1000;
  const ibUA = ibA * 1000000;
  steps.push(`Step 5: Calculate Base Current`);
  steps.push(`Ib = Ic / β`);
  steps.push(`Ib = ${formatNumber(icA, 6)} / ${beta}`);
  steps.push(`Ib = ${formatNumber(ibA, 9)} A`);
  steps.push(`Ib = ${formatNumber(ibUA, 3)} µA`);
  steps.push(``);
  
  // Step 6: Calculate collector voltage
  const vc = vcc - (icA * rc);
  steps.push(`Step 6: Calculate Collector Voltage`);
  steps.push(`Vc = Vcc - (Ic × Rc)`);
  steps.push(`Vc = ${vcc} - (${formatNumber(icA, 6)} × ${rc})`);
  steps.push(`Vc = ${formatNumber(vc, 3)} V`);
  steps.push(``);
  
  // Step 7: Calculate Vce
  const vce = vc - ve;
  steps.push(`Step 7: Calculate Collector-Emitter Voltage`);
  steps.push(`Vce = Vc - Ve`);
  steps.push(`Vce = ${formatNumber(vc, 3)} - ${formatNumber(ve, 3)}`);
  steps.push(`Vce = ${formatNumber(vce, 3)} V`);
  steps.push(``);
  
  // Determine operating region
  const operatingRegion = determineOperatingRegion(vce, vbe, icMA);
  steps.push(`Step 8: Determine Operating Region`);
  steps.push(`Vce = ${formatNumber(vce, 3)} V`);
  if (operatingRegion === 'active') {
    steps.push(`✓ Vce > Vbe (${formatNumber(vce, 3)} > ${vbe})`);
    steps.push(`Operating Region: Active (Normal amplification)`);
  } else if (operatingRegion === 'saturation') {
    steps.push(`⚠️ Vce < Vbe (${formatNumber(vce, 3)} < ${vbe})`);
    steps.push(`Operating Region: Saturation (Switch ON)`);
  } else {
    steps.push(`⚠️ Ic ≈ 0`);
    steps.push(`Operating Region: Cutoff (Switch OFF)`);
  }
  
  return {
    vb,
    ve,
    vc,
    vce,
    ib: ibMA,
    ic: icMA,
    ie: ieMA,
    operatingRegion,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Calculate fixed bias
 */
function calculateFixedBias(inputs: TransistorBiasInputs): TransistorBiasResult {
  const { vcc, rb, rc, beta, vbe } = inputs;
  
  if (!rb) {
    throw new Error('Rb is required for fixed bias');
  }
  
  const steps: string[] = [];
  
  steps.push(`Bias Configuration: Fixed Bias`);
  steps.push(`Given Values:`);
  steps.push(`Vcc = ${vcc} V`);
  steps.push(`Rb = ${formatResistance(rb)}`);
  steps.push(`Rc = ${formatResistance(rc)}`);
  steps.push(`β (Beta) = ${beta}`);
  steps.push(`Vbe = ${vbe} V`);
  steps.push(``);
  
  // Calculate base current
  const ibA = (vcc - vbe) / rb;
  const ibMA = ibA * 1000;
  const ibUA = ibA * 1000000;
  steps.push(`Step 1: Calculate Base Current`);
  steps.push(`Ib = (Vcc - Vbe) / Rb`);
  steps.push(`Ib = (${vcc} - ${vbe}) / ${rb}`);
  steps.push(`Ib = ${formatNumber(ibUA, 3)} µA`);
  steps.push(``);
  
  // Calculate collector current
  const icA = beta * ibA;
  const icMA = icA * 1000;
  steps.push(`Step 2: Calculate Collector Current`);
  steps.push(`Ic = β × Ib`);
  steps.push(`Ic = ${beta} × ${formatNumber(ibA, 9)}`);
  steps.push(`Ic = ${formatNumber(icMA, 3)} mA`);
  steps.push(``);
  
  // Calculate collector voltage
  const vc = vcc - (icA * rc);
  steps.push(`Step 3: Calculate Collector Voltage`);
  steps.push(`Vc = Vcc - (Ic × Rc)`);
  steps.push(`Vc = ${vcc} - (${formatNumber(icA, 6)} × ${rc})`);
  steps.push(`Vc = ${formatNumber(vc, 3)} V`);
  steps.push(``);
  
  // Vce = Vc (since Ve = 0 in fixed bias)
  const vce = vc;
  const ve = 0;
  const vb = vbe;
  const ieMA = icMA;
  
  steps.push(`Step 4: Calculate Vce`);
  steps.push(`Vce = Vc (Ve = 0 in fixed bias)`);
  steps.push(`Vce = ${formatNumber(vce, 3)} V`);
  steps.push(``);
  
  const operatingRegion = determineOperatingRegion(vce, vbe, icMA);
  steps.push(`Step 5: Determine Operating Region`);
  if (operatingRegion === 'active') {
    steps.push(`✓ Operating Region: Active`);
  } else if (operatingRegion === 'saturation') {
    steps.push(`⚠️ Operating Region: Saturation`);
  } else {
    steps.push(`⚠️ Operating Region: Cutoff`);
  }
  
  return {
    vb,
    ve,
    vc,
    vce,
    ib: ibMA,
    ic: icMA,
    ie: ieMA,
    operatingRegion,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Calculate emitter bias
 */
function calculateEmitterBias(inputs: TransistorBiasInputs): TransistorBiasResult {
  const { vcc, rb, rc, re, beta, vbe } = inputs;
  
  if (!rb) {
    throw new Error('Rb is required for emitter bias');
  }
  
  const steps: string[] = [];
  
  steps.push(`Bias Configuration: Emitter Bias`);
  steps.push(`Given Values:`);
  steps.push(`Vcc = ${vcc} V`);
  steps.push(`Rb = ${formatResistance(rb)}`);
  steps.push(`Rc = ${formatResistance(rc)}`);
  steps.push(`Re = ${formatResistance(re)}`);
  steps.push(`β (Beta) = ${beta}`);
  steps.push(`Vbe = ${vbe} V`);
  steps.push(``);
  
  // Using Thevenin equivalent approach
  const ibA = (vcc - vbe) / (rb + (beta + 1) * re);
  const ibMA = ibA * 1000;
  const ibUA = ibA * 1000000;
  
  steps.push(`Step 1: Calculate Base Current`);
  steps.push(`Ib = (Vcc - Vbe) / (Rb + (β + 1) × Re)`);
  steps.push(`Ib = (${vcc} - ${vbe}) / (${rb} + ${beta + 1} × ${re})`);
  steps.push(`Ib = ${formatNumber(ibUA, 3)} µA`);
  steps.push(``);
  
  const icA = beta * ibA;
  const icMA = icA * 1000;
  const ieA = (beta + 1) * ibA;
  const ieMA = ieA * 1000;
  
  steps.push(`Step 2: Calculate Collector and Emitter Currents`);
  steps.push(`Ic = β × Ib = ${formatNumber(icMA, 3)} mA`);
  steps.push(`Ie = (β + 1) × Ib = ${formatNumber(ieMA, 3)} mA`);
  steps.push(``);
  
  const ve = ieA * re;
  const vb = ve + vbe;
  const vc = vcc - (icA * rc);
  const vce = vc - ve;
  
  steps.push(`Step 3: Calculate Voltages`);
  steps.push(`Ve = Ie × Re = ${formatNumber(ve, 3)} V`);
  steps.push(`Vb = Ve + Vbe = ${formatNumber(vb, 3)} V`);
  steps.push(`Vc = Vcc - (Ic × Rc) = ${formatNumber(vc, 3)} V`);
  steps.push(`Vce = Vc - Ve = ${formatNumber(vce, 3)} V`);
  steps.push(``);
  
  const operatingRegion = determineOperatingRegion(vce, vbe, icMA);
  steps.push(`Step 4: Determine Operating Region`);
  if (operatingRegion === 'active') {
    steps.push(`✓ Operating Region: Active`);
  } else if (operatingRegion === 'saturation') {
    steps.push(`⚠️ Operating Region: Saturation`);
  } else {
    steps.push(`⚠️ Operating Region: Cutoff`);
  }
  
  return {
    vb,
    ve,
    vc,
    vce,
    ib: ibMA,
    ic: icMA,
    ie: ieMA,
    operatingRegion,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Determine operating region
 */
function determineOperatingRegion(vce: number, vbe: number, ic: number): OperatingRegion {
  if (ic < 0.01) {
    return 'cutoff';
  } else if (vce < vbe) {
    return 'saturation';
  } else {
    return 'active';
  }
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: TransistorBiasInputs): string | null {
  const { biasType, vcc, rc, re, beta, vbe } = inputs;
  
  if (isNaN(vcc) || vcc <= 0) {
    return 'Supply voltage (Vcc) must be greater than 0';
  }
  
  if (isNaN(rc) || rc <= 0) {
    return 'Collector resistor (Rc) must be greater than 0';
  }
  
  if (isNaN(beta) || beta <= 0) {
    return 'Beta (β) must be greater than 0';
  }
  
  if (isNaN(vbe) || vbe < 0) {
    return 'Vbe must be 0 or greater';
  }
  
  if (biasType === 'voltage-divider') {
    if (!inputs.r1 || isNaN(inputs.r1) || inputs.r1 <= 0) {
      return 'R1 must be greater than 0 for voltage divider bias';
    }
    if (!inputs.r2 || isNaN(inputs.r2) || inputs.r2 <= 0) {
      return 'R2 must be greater than 0 for voltage divider bias';
    }
    if (isNaN(re) || re <= 0) {
      return 'Emitter resistor (Re) must be greater than 0';
    }
  }
  
  if (biasType === 'fixed' || biasType === 'emitter') {
    if (!inputs.rb || isNaN(inputs.rb) || inputs.rb <= 0) {
      return 'Base resistor (Rb) must be greater than 0';
    }
  }
  
  if (biasType === 'emitter') {
    if (isNaN(re) || re <= 0) {
      return 'Emitter resistor (Re) must be greater than 0';
    }
  }
  
  return null;
}

/**
 * Get bias presets
 */
export function getBiasPresets(): BiasPreset[] {
  return [
    {
      name: 'Voltage Divider - Standard',
      description: '12V supply with stable biasing',
      biasType: 'voltage-divider',
      vcc: 12,
      r1: 10000,
      r2: 5000,
      rc: 1000,
      re: 500,
      beta: 100
    },
    {
      name: 'Voltage Divider - Low Power',
      description: '9V supply for battery operation',
      biasType: 'voltage-divider',
      vcc: 9,
      r1: 22000,
      r2: 10000,
      rc: 2200,
      re: 1000,
      beta: 150
    },
    {
      name: 'Fixed Bias - Simple',
      description: 'Basic fixed bias configuration',
      biasType: 'fixed',
      vcc: 12,
      rb: 470000,
      rc: 2200,
      re: 0,
      beta: 100
    },
    {
      name: 'Emitter Bias - Stable',
      description: 'Temperature stable configuration',
      biasType: 'emitter',
      vcc: 12,
      rb: 100000,
      rc: 1000,
      re: 500,
      beta: 100
    }
  ];
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/**
 * Format resistance with appropriate unit
 */
export function formatResistance(resistance: number): string {
  if (resistance >= 1000000) {
    return `${formatNumber(resistance / 1000000, 2)} MΩ`;
  } else if (resistance >= 1000) {
    return `${formatNumber(resistance / 1000, 2)} kΩ`;
  }
  return `${formatNumber(resistance, 0)} Ω`;
}

/**
 * Get region color
 */
export function getRegionColor(region: OperatingRegion): string {
  switch (region) {
    case 'active':
      return 'green';
    case 'saturation':
      return 'yellow';
    case 'cutoff':
      return 'red';
    default:
      return 'gray';
  }
}

/**
 * Get region label
 */
export function getRegionLabel(region: OperatingRegion): string {
  switch (region) {
    case 'active':
      return 'Active Region';
    case 'saturation':
      return 'Saturation';
    case 'cutoff':
      return 'Cutoff';
    default:
      return 'Unknown';
  }
}

// History management
export function saveToHistory(inputs: TransistorBiasInputs, result: TransistorBiasResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    inputs,
    result
  };
  
  history.unshift(entry);
  const trimmed = history.slice(0, MAX_HISTORY);
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}

// Export functions
export function exportToText(inputs: TransistorBiasInputs, result: TransistorBiasResult): string {
  const lines = [
    "TRANSISTOR BIAS CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Bias Type: ${getBiasTypeLabel(inputs.biasType)}`,
    `Vcc: ${inputs.vcc} V`,
    inputs.r1 ? `R1: ${formatResistance(inputs.r1)}` : '',
    inputs.r2 ? `R2: ${formatResistance(inputs.r2)}` : '',
    inputs.rb ? `Rb: ${formatResistance(inputs.rb)}` : '',
    `Rc: ${formatResistance(inputs.rc)}`,
    `Re: ${formatResistance(inputs.re)}`,
    `β (Beta): ${inputs.beta}`,
    `Vbe: ${inputs.vbe} V`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Base Voltage (Vb): ${formatNumber(result.vb, 3)} V`,
    `Emitter Voltage (Ve): ${formatNumber(result.ve, 3)} V`,
    `Collector Voltage (Vc): ${formatNumber(result.vc, 3)} V`,
    `Vce: ${formatNumber(result.vce, 3)} V`,
    `Base Current (Ib): ${formatNumber(result.ib, 3)} mA`,
    `Collector Current (Ic): ${formatNumber(result.ic, 3)} mA`,
    `Emitter Current (Ie): ${formatNumber(result.ie, 3)} mA`,
    `Operating Region: ${getRegionLabel(result.operatingRegion)}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ].filter(line => line !== '');
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Transistor Bias Calculator");
  
  return lines.join("\n");
}

function getBiasTypeLabel(type: BiasType): string {
  switch (type) {
    case 'voltage-divider':
      return 'Voltage Divider Bias';
    case 'fixed':
      return 'Fixed Bias';
    case 'emitter':
      return 'Emitter Bias';
    default:
      return 'Unknown';
  }
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
