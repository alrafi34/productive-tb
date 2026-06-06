export type FileSizeUnit = "KB" | "MB" | "GB" | "TB";
export type SpeedUnit = "Kbps" | "Mbps" | "Gbps";

export interface DownloadInputs {
  fileSize: number;
  fileSizeUnit: FileSizeUnit;
  speed: number;
  speedUnit: SpeedUnit;
  efficiency: number; // 0.70 – 1.00
}

export interface DownloadResult {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  formatted: string;          // e.g. "13 minutes 39 seconds"
  fileSizeBits: number;
  effectiveSpeedBps: number;  // bits per second after efficiency
  speedLabel: string;         // e.g. "90 Mbps"
  fileSizeLabel: string;      // e.g. "5 GB"
  completionTime: string;     // estimated clock time e.g. "9:20 PM"
  speedTier: "fast" | "moderate" | "slow";
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: DownloadInputs;
  result: DownloadResult;
}
