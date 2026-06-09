export type Provider =
  | "generic"
  | "aws"
  | "gcp"
  | "azure"
  | "digitalocean"
  | "cloudflare"
  | "vercel"
  | "railway"
  | "flyio"
  | "render";

export type DatabaseType = "none" | "postgres" | "mysql" | "mongodb" | "redis" | "managed";

export type RuntimeHours = "24-7" | "business" | "custom";

export type Region =
  | "us-east"
  | "us-west"
  | "europe"
  | "asia-pacific"
  | "global";

export type Currency = "USD" | "EUR" | "GBP" | "INR" | "BDT";

export interface CloudConfig {
  provider: Provider;
  region: Region;
  currency: Currency;
  // Compute
  cpu: number;
  ram: number;
  serverCount: number;
  runtimeHours: RuntimeHours;
  customHours: number;
  // Storage
  blockStorage: number;
  objectStorage: number;
  // Database
  database: DatabaseType;
  // Bandwidth
  bandwidth: number;
  // Serverless
  serverlessExecutions: number;
  // CDN
  cdnRequests: number;
}

export interface CostBreakdown {
  compute: number;
  storage: number;
  objectStorage: number;
  database: number;
  bandwidth: number;
  serverless: number;
  cdn: number;
  total: number;
}

export interface CostResult {
  monthly: CostBreakdown;
  yearly: number;
  hourly: number;
  provider: Provider;
  currency: Currency;
  exchangeRate: number;
}

export interface ProviderComparison {
  provider: Provider;
  label: string;
  monthly: number;
  currency: Currency;
}

export interface SavedEstimate {
  id: string;
  timestamp: number;
  label: string;
  config: CloudConfig;
  result: CostResult;
}

export type PresetKey = "blog" | "startup" | "ecommerce" | "api" | "ai";
