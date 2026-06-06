import type {
  LatencyInputs,
  LatencyResult,
  HistoryEntry,
  Medium,
  DistanceUnit,
  BandwidthUnit,
  PacketUnit,
  CalcMode,
} from "./types";

// ── Signal speeds (km/s) ──────────────────────────────────────────────────────
export const MEDIUM_SPEED_KMS: Record<Medium, number> = {
  fiber: 200_000,     // ~200,000 km/s (2/3 speed of light in glass)
  copper: 180_000,    // ~180,000 km/s
  satellite: 120_000, // effective accounting for orbital altitude
  wireless: 160_000,  // variable — conservative estimate
  cellular: 140_000,  // 4G/5G, includes tower hops
};

export const MEDIUM_LABELS: Record<Medium, string> = {
  fiber: "Fiber Optic",
  copper: "Copper Cable",
  satellite: "Satellite",
  wireless: "Wireless / WiFi",
  cellular: "Cellular (4G/5G)",
};

export const MODE_LABELS: Record<CalcMode, string> = {
  basic: "Basic Latency Estimate",
  propagation: "Propagation Delay",
  transmission: "Transmission Delay",
  rtt: "Round Trip Time (RTT)",
  gaming: "Gaming Ping Estimate",
  advanced: "Advanced Total Latency",
};

// ── Unit conversions ──────────────────────────────────────────────────────────
function toKm(distance: number, unit: DistanceUnit): number {
  return unit === "mi" ? distance * 1.60934 : distance;
}

function toBitsPerSecond(bandwidth: number, unit: BandwidthUnit): number {
  return unit === "Gbps" ? bandwidth * 1_000_000_000 : bandwidth * 1_000_000;
}

function toBytes(size: number, unit: PacketUnit): number {
  if (unit === "KB") return size * 1024;
  if (unit === "MB") return size * 1024 * 1024;
  return size;
}

// ── Core calculation ──────────────────────────────────────────────────────────
export function calculateLatency(inputs: LatencyInputs): LatencyResult | null {
  const { distance, distanceUnit, medium, bandwidth, bandwidthUnit, packetSize, packetUnit, routingOverhead } = inputs;

  if (!distance || distance <= 0) return null;
  if (!bandwidth || bandwidth <= 0) return null;
  if (!packetSize || packetSize <= 0) return null;

  const distKm = toKm(distance, distanceUnit);
  const speedKms = MEDIUM_SPEED_KMS[medium];
  const bps = toBitsPerSecond(bandwidth, bandwidthUnit);
  const bytes = toBytes(packetSize, packetUnit);
  const bits = bytes * 8;

  // Propagation delay (ms)
  const propagationMs = (distKm / speedKms) * 1000;

  // Transmission delay (ms)
  const transmissionMs = (bits / bps) * 1000;

  // Routing overhead (ms) — percentage of propagation delay
  const routingMs = propagationMs * (routingOverhead / 100);

  // Total one-way latency
  const totalMs = propagationMs + transmissionMs + routingMs;

  // RTT
  const rttMs = totalMs * 2;

  // Gaming ping estimate (adds jitter & extra protocol hops)
  const gamingBase = totalMs * 1.1;
  const gamingPingMin = Math.round(gamingBase * 0.9);
  const gamingPingMax = Math.round(gamingBase * 1.4);

  // Performance tier
  let tier: LatencyResult["tier"];
  let tierLabel: string;
  if (totalMs < 20) { tier = "excellent"; tierLabel = "Excellent"; }
  else if (totalMs < 50) { tier = "good"; tierLabel = "Good"; }
  else if (totalMs < 100) { tier = "moderate"; tierLabel = "Moderate"; }
  else if (totalMs < 200) { tier = "poor"; tierLabel = "Poor"; }
  else { tier = "very-high"; tierLabel = "Very High"; }

  // Human explanation
  let explanation = "";
  if (distKm > 8000) {
    explanation = `The long distance (${formatNumber(distKm, 0)} km) dominates your latency. Fiber helps, but physics limits the minimum to ~${formatNumber(propagationMs, 1)} ms one-way.`;
  } else if (medium === "satellite") {
    explanation = "Satellite links add significant propagation delay due to orbital altitude (~35,000 km). Geostationary satellites introduce 500–700 ms RTT by default.";
  } else if (tier === "excellent") {
    explanation = "Your estimated latency is excellent. Short distances on high-bandwidth fiber produce near-ideal network conditions.";
  } else if (tier === "good") {
    explanation = "Your estimated latency is good — suitable for real-time applications like video calls and cloud gaming.";
  } else if (tier === "moderate") {
    explanation = `Your latency is moderate. The ${formatNumber(distKm, 0)} km distance on ${MEDIUM_LABELS[medium]} contributes to a one-way delay of ${formatNumber(propagationMs, 1)} ms.`;
  } else {
    explanation = "High latency detected. Consider a connection closer to your target server, or use a CDN edge node to reduce round-trip time.";
  }

  // Calculation steps
  const steps = [
    `Distance:            ${formatNumber(distKm, 1)} km`,
    `Signal speed:        ${formatNumber(speedKms, 0)} km/s (${MEDIUM_LABELS[medium]})`,
    `Propagation delay:   ${formatNumber(distKm, 1)} ÷ ${formatNumber(speedKms, 0)} × 1000 = ${formatNumber(propagationMs, 3)} ms`,
    ``,
    `Packet size:         ${formatNumber(bytes, 0)} bytes = ${formatNumber(bits, 0)} bits`,
    `Bandwidth:           ${formatNumber(bps / 1_000_000, 2)} Mbps`,
    `Transmission delay:  ${formatNumber(bits, 0)} ÷ ${formatNumber(bps, 0)} × 1000 = ${formatNumber(transmissionMs, 4)} ms`,
    ``,
    `Routing overhead:    ${routingOverhead}% of propagation = ${formatNumber(routingMs, 3)} ms`,
    ``,
    `Total one-way:       ${formatNumber(propagationMs, 3)} + ${formatNumber(transmissionMs, 4)} + ${formatNumber(routingMs, 3)} = ${formatNumber(totalMs, 3)} ms`,
    `RTT (round-trip):    ${formatNumber(totalMs, 3)} × 2 = ${formatNumber(rttMs, 3)} ms`,
  ];

  return {
    propagationMs,
    transmissionMs,
    routingMs,
    totalMs,
    rttMs,
    gamingPingMin,
    gamingPingMax,
    tier,
    tierLabel,
    explanation,
    steps,
  };
}

// ── Validation ────────────────────────────────────────────────────────────────
export function validateInputs(inputs: LatencyInputs): string | null {
  if (!inputs.distance || inputs.distance <= 0) return "Distance must be greater than 0.";
  if (inputs.distance > 50_000) return "Distance seems too large. Maximum is 50,000 km.";
  if (!inputs.bandwidth || inputs.bandwidth <= 0) return "Bandwidth must be greater than 0.";
  if (!inputs.packetSize || inputs.packetSize <= 0) return "Packet size must be greater than 0.";
  return null;
}

// ── Formatting ────────────────────────────────────────────────────────────────
export function formatNumber(value: number, decimals = 2): string {
  if (!isFinite(value)) return "–";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatMs(ms: number): string {
  if (ms < 0.01) return "< 0.01 ms";
  if (ms >= 1000) return `${formatNumber(ms / 1000, 2)} s`;
  return `${formatNumber(ms, 2)} ms`;
}

// ── Presets ───────────────────────────────────────────────────────────────────
export const REGION_PRESETS = [
  { label: "NY → LA", distance: 4490, distanceUnit: "km" as DistanceUnit, medium: "fiber" as Medium },
  { label: "NY → London", distance: 5570, distanceUnit: "km" as DistanceUnit, medium: "fiber" as Medium },
  { label: "LA → Tokyo", distance: 8815, distanceUnit: "km" as DistanceUnit, medium: "fiber" as Medium },
  { label: "London → Sydney", distance: 16993, distanceUnit: "km" as DistanceUnit, medium: "fiber" as Medium },
  { label: "NYC → Frankfurt", distance: 6200, distanceUnit: "km" as DistanceUnit, medium: "fiber" as Medium },
  { label: "Local (< 100 km)", distance: 50, distanceUnit: "km" as DistanceUnit, medium: "fiber" as Medium },
];

export const CLOUD_PRESETS = [
  { label: "AWS us-east-1 → us-west-2", distance: 4490, distanceUnit: "km" as DistanceUnit, medium: "fiber" as Medium },
  { label: "AWS us-east-1 → eu-west-1", distance: 5570, distanceUnit: "km" as DistanceUnit, medium: "fiber" as Medium },
  { label: "GCP us-central1 → asia-east1", distance: 11000, distanceUnit: "km" as DistanceUnit, medium: "fiber" as Medium },
  { label: "Azure East US → West Europe", distance: 6700, distanceUnit: "km" as DistanceUnit, medium: "fiber" as Medium },
];

export const BANDWIDTH_PRESETS = [
  { label: "DSL (10 Mbps)", bandwidth: 10, bandwidthUnit: "Mbps" as BandwidthUnit },
  { label: "Cable (100 Mbps)", bandwidth: 100, bandwidthUnit: "Mbps" as BandwidthUnit },
  { label: "Fiber (1 Gbps)", bandwidth: 1, bandwidthUnit: "Gbps" as BandwidthUnit },
  { label: "10G Link", bandwidth: 10, bandwidthUnit: "Gbps" as BandwidthUnit },
];

// ── LocalStorage history ──────────────────────────────────────────────────────
const HISTORY_KEY = "latency-calculator-history";
const MAX_HISTORY = 20;

export function saveHistory(inputs: LatencyInputs, result: LatencyResult): void {
  if (typeof window === "undefined") return;
  const existing: HistoryEntry[] = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    inputs,
    result,
  };
  localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...existing].slice(0, MAX_HISTORY)));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// ── Export ────────────────────────────────────────────────────────────────────
export function buildExportText(inputs: LatencyInputs, result: LatencyResult): string {
  return [
    "Latency Calculator",
    "==================",
    `Mode:              ${MODE_LABELS[inputs.mode]}`,
    `Distance:          ${inputs.distance} ${inputs.distanceUnit}`,
    `Medium:            ${MEDIUM_LABELS[inputs.medium]}`,
    `Bandwidth:         ${inputs.bandwidth} ${inputs.bandwidthUnit}`,
    `Packet Size:       ${inputs.packetSize} ${inputs.packetUnit}`,
    `Routing Overhead:  ${inputs.routingOverhead}%`,
    "",
    `Propagation Delay: ${formatMs(result.propagationMs)}`,
    `Transmission Delay:${formatMs(result.transmissionMs)}`,
    `Routing Overhead:  ${formatMs(result.routingMs)}`,
    `Total Latency:     ${formatMs(result.totalMs)}`,
    `RTT:               ${formatMs(result.rttMs)}`,
    `Gaming Ping Est.:  ${result.gamingPingMin}–${result.gamingPingMax} ms`,
    `Performance:       ${result.tierLabel}`,
  ].join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Debounce ──────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}
