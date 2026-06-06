import { FenceInputs, FenceResult, FenceType, HistoryEntry, Unit } from "./types";

export const FENCE_TYPE_LABELS: Record<FenceType, string> = {
  wood: "Wood Fence",
  vinyl: "Vinyl Fence",
  "chain-link": "Chain Link Fence",
  metal: "Metal Fence",
  privacy: "Privacy Fence",
};

export const FENCE_DEFAULTS: Record<FenceType, { panelWidth: number; railsPerPanel: number; concretePerPost: number }> = {
  wood:         { panelWidth: 8,  railsPerPanel: 2, concretePerPost: 2 },
  vinyl:        { panelWidth: 8,  railsPerPanel: 3, concretePerPost: 2 },
  "chain-link": { panelWidth: 10, railsPerPanel: 1, concretePerPost: 1 },
  metal:        { panelWidth: 6,  railsPerPanel: 2, concretePerPost: 2 },
  privacy:      { panelWidth: 8,  railsPerPanel: 3, concretePerPost: 2 },
};

export const FENCE_HEIGHTS = ["3", "4", "5", "6", "8"];

export const UNIT_LABEL: Record<Unit, string> = { ft: "Feet (ft)", m: "Meters (m)" };
export const UNIT_SHORT: Record<Unit, string> = { ft: "ft", m: "m" };

export function calculate(inputs: FenceInputs): FenceResult | null {
  const panelWidth = parseFloat(inputs.panelWidth);
  if (!panelWidth || panelWidth <= 0) return null;

  let totalLength = 0;

  if (inputs.propertyMode === "perimeter") {
    const w = parseFloat(inputs.propertyWidth);
    const l = parseFloat(inputs.propertyLength);
    if (!w || !l || w <= 0 || l <= 0) return null;
    totalLength = 2 * (w + l);
  } else {
    const fl = parseFloat(inputs.fenceLength);
    if (!fl || fl <= 0) return null;
    totalLength = fl;
  }

  const gateWidth = inputs.includeGate ? (parseFloat(inputs.gateWidth) || 0) : 0;
  const fencedLength = Math.max(0, totalLength - gateWidth);

  const defaults = FENCE_DEFAULTS[inputs.fenceType];
  const panels = Math.ceil(fencedLength / panelWidth);
  const panelsWithWaste = Math.ceil(panels * (1 + inputs.wastePercent / 100));
  const posts = panels + 1 + (inputs.includeGate ? 2 : 0);
  const concreteBags = posts * defaults.concretePerPost;
  const rails = panels * defaults.railsPerPanel;
  const gatePostsExtra = inputs.includeGate ? 2 : 0;

  return {
    totalLength,
    panels,
    panelsWithWaste,
    posts,
    concreteBags,
    rails,
    gatePostsExtra,
    unit: inputs.unit,
  };
}

export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "fence-material-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: FenceInputs, result: FenceResult): void {
  try {
    const h = getHistory();
    h.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (h.length > MAX_HISTORY) h.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const s = localStorage.getItem(HISTORY_KEY);
    return s ? JSON.parse(s) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

export function exportToText(inputs: FenceInputs, result: FenceResult): string {
  return [
    "Fence Material Estimate",
    "=".repeat(40),
    "",
    `Fence Type    : ${FENCE_TYPE_LABELS[inputs.fenceType]}`,
    `Total Length  : ${formatNumber(result.totalLength, 1)} ${UNIT_SHORT[inputs.unit]}`,
    `Panel Width   : ${inputs.panelWidth} ${UNIT_SHORT[inputs.unit]}`,
    `Fence Height  : ${inputs.fenceHeight} ${UNIT_SHORT[inputs.unit]}`,
    `Waste         : ${inputs.wastePercent}%`,
    "",
    `Panels Needed : ${result.panels} (${result.panelsWithWaste} with waste)`,
    `Posts Needed  : ${result.posts}`,
    `Concrete Bags : ${result.concreteBags}`,
    `Rails Needed  : ${result.rails}`,
    inputs.includeGate ? `Gate Posts    : ${result.gatePostsExtra} extra` : "",
    "",
    "=".repeat(40),
    `Generated: ${new Date().toLocaleString()}`,
  ].filter(Boolean).join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}
