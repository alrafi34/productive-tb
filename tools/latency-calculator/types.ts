export type CalcMode =
  | "basic"
  | "propagation"
  | "transmission"
  | "rtt"
  | "gaming"
  | "advanced";

export type DistanceUnit = "km" | "mi";
export type BandwidthUnit = "Mbps" | "Gbps";
export type PacketUnit = "bytes" | "KB" | "MB";
export type Medium = "fiber" | "copper" | "satellite" | "wireless" | "cellular";

export interface LatencyInputs {
  mode: CalcMode;
  distance: number;
  distanceUnit: DistanceUnit;
  medium: Medium;
  bandwidth: number;
  bandwidthUnit: BandwidthUnit;
  packetSize: number;
  packetUnit: PacketUnit;
  routingOverhead: number; // 0–100 %
}

export interface LatencyResult {
  propagationMs: number;
  transmissionMs: number;
  routingMs: number;
  totalMs: number;
  rttMs: number;
  gamingPingMin: number;
  gamingPingMax: number;
  tier: "excellent" | "good" | "moderate" | "poor" | "very-high";
  tierLabel: string;
  explanation: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: LatencyInputs;
  result: LatencyResult;
}
