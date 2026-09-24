import type { UnitSystem, SoilClass, SoilPreset, FoundationInputs, FoundationResult, CalculationHistory } from './types';

/* Rebuilt around the IRC rules a footing is actually sized by. The previous
   version reported (load ÷ bearing capacity) × safety factor as a depth in
   metres — the units cancel, bearing capacity sizes a footing's width rather
   than its depth, and its presumptive values are already allowable, so a
   further safety factor double-counts. */

// ── Unit conversions (exact definitions) ────────────────────────────
export const IN_TO_MM = 25.4;
export const PSF_TO_KPA = 0.047880259;
export const LBF_TO_KN = 0.0044482216;
export const PLF_TO_KN_PER_M = 0.014593903;

// ── IRC limits ──────────────────────────────────────────────────────
/** R403.1.4: exterior footings at least 12 in below undisturbed ground. */
const MIN_DEPTH_IN = 12;
/** R403.1.1: footings at least 12 in wide. */
const MIN_WIDTH_IN = 12;

/** IRC Table R401.4.1 — presumptive load-bearing values (psf), used when no soils report exists. */
export const SOIL_PRESETS: SoilPreset[] = [
  { soil: 'bedrock', name: 'Crystalline bedrock', uscs: '—', psf: 12000 },
  { soil: 'sedimentary-rock', name: 'Sedimentary and foliated rock', uscs: '—', psf: 4000 },
  { soil: 'gravel', name: 'Sandy gravel and/or gravel', uscs: 'GW, GP', psf: 3000 },
  { soil: 'sand', name: 'Sand, silty sand, clayey sand, silty gravel, clayey gravel', uscs: 'SW, SP, SM, SC, GM, GC', psf: 2000 },
  { soil: 'clay', name: 'Clay, sandy clay, silty clay, clayey silt, silt, sandy silt', uscs: 'CL, ML, MH, CH', psf: 1500 },
];

export const presetFor = (soil: SoilClass) => SOIL_PRESETS.find((p) => p.soil === soil);

/** Allowable bearing in the system's unit (psf | kPa), or null if a custom value is missing. */
export const bearingFor = (system: UnitSystem, soil: SoilClass, custom?: number): number | null => {
  if (soil === 'custom') return custom && custom > 0 ? custom : null;
  const psf = presetFor(soil)!.psf;
  return system === 'imperial' ? psf : psf * PSF_TO_KPA;
};

export const calculateFoundation = (inputs: FoundationInputs): FoundationResult | null => {
  const { system, kind, soil, frostDepth, load, customBearing } = inputs;
  if (!(frostDepth >= 0)) return null;
  const bearing = bearingFor(system, soil, customBearing);
  if (bearing === null) return null;

  const imperial = system === 'imperial';
  const minDepthCode = imperial ? MIN_DEPTH_IN : MIN_DEPTH_IN * IN_TO_MM;
  const minWidthCode = imperial ? MIN_WIDTH_IN : MIN_WIDTH_IN * IN_TO_MM;

  const depthGovernedBy = frostDepth > minDepthCode ? 'frost' : 'code-minimum';
  const minDepth = Math.max(frostDepth, minDepthCode);

  const notes: string[] = [];
  let width: number | undefined;
  let widthGovernedBy: FoundationResult['widthGovernedBy'];
  let area: number | undefined;

  if (load !== undefined && load > 0) {
    if (kind === 'wall') {
      // width = w / q  →  ft (plf / psf) or m (kN/m ÷ kPa); report in in | mm
      const loadWidth = imperial ? (load / bearing) * 12 : (load / bearing) * 1000;
      widthGovernedBy = loadWidth > minWidthCode ? 'load' : 'code-minimum';
      width = Math.max(loadWidth, minWidthCode);
    } else {
      // square footing: A = P / q, side = √A  →  ft² (lb / psf) or m² (kN ÷ kPa)
      area = load / bearing;
      const side = Math.sqrt(area) * (imperial ? 12 : 1000);
      widthGovernedBy = side > minWidthCode ? 'load' : 'code-minimum';
      width = Math.max(side, minWidthCode);
    }
  }

  if (depthGovernedBy === 'frost') {
    notes.push('Depth is set by the frost line: the bottom of the footing must sit below it (IRC R403.1.4.1).');
  } else {
    notes.push('Depth is set by the 12 in code minimum below undisturbed ground (IRC R403.1.4), not by frost.');
  }
  if (widthGovernedBy === 'code-minimum') {
    notes.push('Width is set by the 12 in minimum footing width (IRC R403.1.1); the load alone would allow narrower.');
  }
  if (soil === 'clay') {
    notes.push('Clay and silt may be expansive. IRC R403.1.8 requires special design where the plasticity index is 15 or more — get a soils report.');
  }
  if (soil === 'custom') {
    notes.push('Using the allowable bearing from your soils report instead of the IRC presumptive table.');
  } else {
    notes.push('Presumptive bearing values are allowable pressures — do not divide them by a further safety factor.');
  }
  notes.push('Frost depth is set locally: confirm it with your building department (IRC Table R301.2(1)).');

  return { system, kind, soil, minDepth, depthGovernedBy, bearing, width, widthGovernedBy, area, notes };
};

// ── Formatting ──────────────────────────────────────────────────────
export const formatNumber = (num: number, decimals: number = 2): string => num.toFixed(decimals);

/** 30 → "30 in (2 ft 6 in)" | 762 → "762 mm (0.76 m)" */
export const formatLength = (value: number, system: UnitSystem): string => {
  if (system === 'metric') return `${Math.round(value)} mm (${formatNumber(value / 1000)} m)`;
  const inches = Math.ceil(value * 4) / 4; // round up to ¼ in — never under-size
  const ft = Math.floor(inches / 12);
  const rem = +(inches - ft * 12).toFixed(2);
  return ft > 0 ? `${inches} in (${ft} ft ${rem} in)` : `${inches} in`;
};

export const bearingUnit = (system: UnitSystem) => (system === 'imperial' ? 'psf' : 'kPa');
export const loadUnit = (system: UnitSystem, kind: 'wall' | 'column') =>
  kind === 'wall' ? (system === 'imperial' ? 'plf' : 'kN/m') : (system === 'imperial' ? 'lb' : 'kN');

// ── History (new key: entries from the old model have a different shape) ──
const HISTORY_KEY = 'foundation-depth-calculator-history-v2';

export const generateId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

export const getHistory = (): CalculationHistory[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveToHistory = (inputs: FoundationInputs, result: FoundationResult): void => {
  const history = getHistory();
  history.unshift({ id: generateId(), timestamp: Date.now(), inputs, result });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};

export const exportToText = (inputs: FoundationInputs, r: FoundationResult): string => {
  const soilName = r.soil === 'custom' ? 'Custom (soils report)' : presetFor(r.soil)!.name;
  const lines = [
    'FOUNDATION DEPTH & FOOTING SIZE',
    '================================',
    `Footing:        ${r.kind === 'wall' ? 'Continuous wall footing' : 'Isolated column footing (square)'}`,
    `Soil:           ${soilName}`,
    `Bearing used:   ${formatNumber(r.bearing, 0)} ${bearingUnit(r.system)}`,
    `Frost depth:    ${formatLength(inputs.frostDepth, r.system)}`,
    inputs.load ? `Load:           ${inputs.load} ${loadUnit(r.system, r.kind)}` : '',
    '',
    `Minimum depth to bottom of footing: ${formatLength(r.minDepth, r.system)}`,
    r.width !== undefined ? `${r.kind === 'wall' ? 'Minimum footing width' : 'Minimum footing side'}: ${formatLength(r.width, r.system)}` : '',
    '',
    'NOTES',
    ...r.notes.map((n) => `- ${n}`),
    '',
    'Based on IRC presumptive values and minimums. Verify with your building department and a licensed engineer.',
  ];
  return lines.filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
};

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
