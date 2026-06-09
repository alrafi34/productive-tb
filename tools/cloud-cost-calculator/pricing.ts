import type { Provider, DatabaseType, Currency } from "./types";

// ── Provider pricing models (USD/month unless noted) ─────────────────────────
// All values are approximate mid-2025 on-demand pricing.

export interface ProviderPricing {
  label: string;
  cpuPerVcpu: number;        // USD/vCPU/month
  ramPerGB: number;          // USD/GB RAM/month
  blockStoragePerGB: number; // USD/GB SSD/month
  objectStoragePerGB: number;// USD/GB object storage/month
  bandwidthPerGB: number;    // USD/GB egress
  serverlessPerMillion: number; // USD per 1M executions
  cdnPer10Million: number;   // USD per 10M requests
  dbPricing: Record<DatabaseType, number>; // USD/month base
}

export const PROVIDERS: Record<Provider, ProviderPricing> = {
  generic: {
    label: "Generic / Self-Hosted",
    cpuPerVcpu: 8,
    ramPerGB: 4,
    blockStoragePerGB: 0.08,
    objectStoragePerGB: 0.02,
    bandwidthPerGB: 0.05,
    serverlessPerMillion: 0.20,
    cdnPer10Million: 0.75,
    dbPricing: { none: 0, postgres: 25, mysql: 25, mongodb: 35, redis: 20, managed: 50 },
  },
  aws: {
    label: "Amazon Web Services",
    cpuPerVcpu: 14,
    ramPerGB: 7,
    blockStoragePerGB: 0.10,
    objectStoragePerGB: 0.023,
    bandwidthPerGB: 0.09,
    serverlessPerMillion: 0.20,
    cdnPer10Million: 0.85,
    dbPricing: { none: 0, postgres: 50, mysql: 50, mongodb: 60, redis: 35, managed: 75 },
  },
  gcp: {
    label: "Google Cloud",
    cpuPerVcpu: 12,
    ramPerGB: 6,
    blockStoragePerGB: 0.10,
    objectStoragePerGB: 0.020,
    bandwidthPerGB: 0.08,
    serverlessPerMillion: 0.40,
    cdnPer10Million: 0.75,
    dbPricing: { none: 0, postgres: 45, mysql: 45, mongodb: 55, redis: 30, managed: 70 },
  },
  azure: {
    label: "Microsoft Azure",
    cpuPerVcpu: 13,
    ramPerGB: 6.5,
    blockStoragePerGB: 0.10,
    objectStoragePerGB: 0.018,
    bandwidthPerGB: 0.087,
    serverlessPerMillion: 0.20,
    cdnPer10Million: 0.81,
    dbPricing: { none: 0, postgres: 48, mysql: 48, mongodb: 58, redis: 32, managed: 72 },
  },
  digitalocean: {
    label: "DigitalOcean",
    cpuPerVcpu: 6,
    ramPerGB: 3,
    blockStoragePerGB: 0.10,
    objectStoragePerGB: 0.020,
    bandwidthPerGB: 0.01,
    serverlessPerMillion: 0.99,
    cdnPer10Million: 0,
    dbPricing: { none: 0, postgres: 15, mysql: 15, mongodb: 0, redis: 15, managed: 25 },
  },
  cloudflare: {
    label: "Cloudflare",
    cpuPerVcpu: 0,
    ramPerGB: 0,
    blockStoragePerGB: 0.015,
    objectStoragePerGB: 0.015,
    bandwidthPerGB: 0,
    serverlessPerMillion: 0.30,
    cdnPer10Million: 0,
    dbPricing: { none: 0, postgres: 0, mysql: 0, mongodb: 0, redis: 0, managed: 5 },
  },
  vercel: {
    label: "Vercel",
    cpuPerVcpu: 0,
    ramPerGB: 0,
    blockStoragePerGB: 0,
    objectStoragePerGB: 0.023,
    bandwidthPerGB: 0.40,
    serverlessPerMillion: 0.60,
    cdnPer10Million: 0,
    dbPricing: { none: 0, postgres: 20, mysql: 0, mongodb: 0, redis: 0, managed: 20 },
  },
  railway: {
    label: "Railway",
    cpuPerVcpu: 5,
    ramPerGB: 2.5,
    blockStoragePerGB: 0.25,
    objectStoragePerGB: 0,
    bandwidthPerGB: 0.10,
    serverlessPerMillion: 0,
    cdnPer10Million: 0,
    dbPricing: { none: 0, postgres: 5, mysql: 5, mongodb: 0, redis: 5, managed: 10 },
  },
  flyio: {
    label: "Fly.io",
    cpuPerVcpu: 5,
    ramPerGB: 2.5,
    blockStoragePerGB: 0.15,
    objectStoragePerGB: 0,
    bandwidthPerGB: 0.02,
    serverlessPerMillion: 0,
    cdnPer10Million: 0,
    dbPricing: { none: 0, postgres: 5, mysql: 0, mongodb: 0, redis: 5, managed: 15 },
  },
  render: {
    label: "Render",
    cpuPerVcpu: 7,
    ramPerGB: 3.5,
    blockStoragePerGB: 0.25,
    objectStoragePerGB: 0,
    bandwidthPerGB: 0.10,
    serverlessPerMillion: 0,
    cdnPer10Million: 0,
    dbPricing: { none: 0, postgres: 7, mysql: 0, mongodb: 0, redis: 10, managed: 20 },
  },
};

// ── Region multipliers ────────────────────────────────────────────────────────

export const REGION_MULTIPLIERS: Record<string, number> = {
  "us-east":      1.00,
  "us-west":      1.05,
  "europe":       1.10,
  "asia-pacific": 1.15,
  "global":       1.08,
};

export const REGION_LABELS: Record<string, string> = {
  "us-east":      "US East",
  "us-west":      "US West",
  "europe":       "Europe",
  "asia-pacific": "Asia Pacific",
  "global":       "Global Average",
};

// ── Currency exchange rates (relative to USD) ─────────────────────────────────

export const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.79,
  INR: 83.5,
  BDT: 110,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  BDT: "৳",
};

// ── Runtime hours per month ───────────────────────────────────────────────────

export const RUNTIME_HOURS: Record<string, number> = {
  "24-7":    730,
  "business": 176, // 22 days × 8 hrs
  "custom":  0,    // overridden by customHours
};
