import type {
  CloudConfig,
  CostBreakdown,
  CostResult,
  ProviderComparison,
  Provider,
  SavedEstimate,
} from "./types";
import {
  PROVIDERS,
  REGION_MULTIPLIERS,
  EXCHANGE_RATES,
  CURRENCY_SYMBOLS,
  RUNTIME_HOURS,
} from "./pricing";

// ── Formatting ────────────────────────────────────────────────────────────────

export function formatCurrency(amount: number, currency: string, symbol: string): string {
  if (amount === 0) return `${symbol}0.00`;
  if (amount < 0.01) return `${symbol}< 0.01`;
  return `${symbol}${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] ?? "$";
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

// ── Core calculation ──────────────────────────────────────────────────────────

export function calculateCost(config: CloudConfig): CostResult {
  const pricing = PROVIDERS[config.provider];
  const regionMul = REGION_MULTIPLIERS[config.region] ?? 1;
  const exchangeRate = EXCHANGE_RATES[config.currency] ?? 1;

  // Runtime hours this month
  const hours =
    config.runtimeHours === "custom"
      ? Math.max(0, Math.min(730, config.customHours))
      : RUNTIME_HOURS[config.runtimeHours] ?? 730;

  // Fraction of full month (730h)
  const timeFraction = hours / 730;

  // Compute cost (per server × time fraction)
  const computeUSD =
    (config.cpu * pricing.cpuPerVcpu + config.ram * pricing.ramPerGB) *
    config.serverCount *
    timeFraction *
    regionMul;

  // Block/SSD storage
  const storageUSD =
    config.blockStorage * pricing.blockStoragePerGB * config.serverCount * regionMul;

  // Object storage
  const objectStorageUSD =
    config.objectStorage * pricing.objectStoragePerGB * regionMul;

  // Database
  const databaseUSD = pricing.dbPricing[config.database] * regionMul;

  // Bandwidth
  const bandwidthUSD =
    config.bandwidth * pricing.bandwidthPerGB * regionMul;

  // Serverless (per 1M executions)
  const serverlessUSD =
    (config.serverlessExecutions / 1_000_000) * pricing.serverlessPerMillion;

  // CDN (per 10M requests)
  const cdnUSD =
    (config.cdnRequests / 10_000_000) * pricing.cdnPer10Million;

  const totalUSD =
    computeUSD +
    storageUSD +
    objectStorageUSD +
    databaseUSD +
    bandwidthUSD +
    serverlessUSD +
    cdnUSD;

  const toLocal = (v: number) => v * exchangeRate;

  const monthly: CostBreakdown = {
    compute:       toLocal(computeUSD),
    storage:       toLocal(storageUSD),
    objectStorage: toLocal(objectStorageUSD),
    database:      toLocal(databaseUSD),
    bandwidth:     toLocal(bandwidthUSD),
    serverless:    toLocal(serverlessUSD),
    cdn:           toLocal(cdnUSD),
    total:         toLocal(totalUSD),
  };

  return {
    monthly,
    yearly:       monthly.total * 12,
    hourly:       monthly.total / (hours > 0 ? hours : 730),
    provider:     config.provider,
    currency:     config.currency,
    exchangeRate,
  };
}

// ── Provider comparison ───────────────────────────────────────────────────────

export function compareProviders(config: CloudConfig): ProviderComparison[] {
  const providers: Provider[] = [
    "aws", "gcp", "azure", "digitalocean", "railway", "flyio", "render",
  ];

  return providers.map((p) => {
    const result = calculateCost({ ...config, provider: p });
    return {
      provider: p,
      label: PROVIDERS[p].label,
      monthly: result.monthly.total,
      currency: config.currency,
    };
  }).sort((a, b) => a.monthly - b.monthly);
}

// ── Recommendation ────────────────────────────────────────────────────────────

export interface Recommendation {
  text: string;
  color: string;
}

export function getRecommendation(
  monthly: number,
  provider: Provider,
  currency: string,
  symbol: string
): Recommendation {
  const usd = monthly / (EXCHANGE_RATES[currency as keyof typeof EXCHANGE_RATES] ?? 1);

  if (usd < 10) {
    return {
      text: "Very low cost — suitable for personal projects, hobby sites, and prototypes. Vercel, Railway, or Fly.io free tiers may cover this entirely.",
      color: "text-green-700 bg-green-50 border-green-200",
    };
  }
  if (usd < 50) {
    return {
      text: "Typical cost for a small production app. DigitalOcean, Render, or Fly.io often provide better value than AWS/GCP/Azure at this scale.",
      color: "text-green-700 bg-green-50 border-green-200",
    };
  }
  if (usd < 200) {
    return {
      text: "Mid-range infrastructure. Consider reserved instances on AWS/GCP/Azure (up to 40% savings) or moving to DigitalOcean for cost efficiency.",
      color: "text-blue-700 bg-blue-50 border-blue-200",
    };
  }
  if (usd < 1000) {
    return {
      text: `At ${symbol}${Math.round(monthly).toLocaleString()}/month, negotiating reserved or committed-use pricing is recommended. Spot/preemptible instances can cut compute costs by 60–90% for fault-tolerant workloads.`,
      color: "text-yellow-700 bg-yellow-50 border-yellow-200",
    };
  }
  return {
    text: "Enterprise-scale spend. Engage a cloud cost optimization specialist and explore savings plans, right-sizing, and multi-cloud strategies.",
    color: "text-orange-700 bg-orange-50 border-orange-200",
  };
}

// ── Scaling projection ────────────────────────────────────────────────────────

export function projectScaling(monthlyBase: number): { x2: number; x5: number; x10: number } {
  return {
    x2:  monthlyBase * 2,
    x5:  monthlyBase * 5,
    x10: monthlyBase * 10,
  };
}

// ── Presets ───────────────────────────────────────────────────────────────────

export const PRESETS: Record<string, Partial<CloudConfig> & { label: string; description: string }> = {
  blog: {
    label: "Small Blog",
    description: "1 server, minimal traffic",
    cpu: 1, ram: 2, serverCount: 1, runtimeHours: "24-7",
    blockStorage: 20, objectStorage: 5, database: "none",
    bandwidth: 50, serverlessExecutions: 0, cdnRequests: 1_000_000,
  },
  startup: {
    label: "Startup SaaS",
    description: "2 app servers + managed DB",
    cpu: 2, ram: 4, serverCount: 2, runtimeHours: "24-7",
    blockStorage: 50, objectStorage: 100, database: "managed",
    bandwidth: 500, serverlessExecutions: 500_000, cdnRequests: 10_000_000,
  },
  ecommerce: {
    label: "E-Commerce",
    description: "Multi-server + DB + CDN",
    cpu: 4, ram: 8, serverCount: 3, runtimeHours: "24-7",
    blockStorage: 100, objectStorage: 250, database: "mysql",
    bandwidth: 2000, serverlessExecutions: 2_000_000, cdnRequests: 50_000_000,
  },
  api: {
    label: "API Backend",
    description: "High-throughput API service",
    cpu: 4, ram: 8, serverCount: 2, runtimeHours: "24-7",
    blockStorage: 30, objectStorage: 50, database: "redis",
    bandwidth: 300, serverlessExecutions: 5_000_000, cdnRequests: 5_000_000,
  },
  ai: {
    label: "AI Application",
    description: "GPU-heavy + high storage",
    cpu: 8, ram: 32, serverCount: 1, runtimeHours: "business",
    blockStorage: 200, objectStorage: 1000, database: "postgres",
    bandwidth: 5000, serverlessExecutions: 10_000_000, cdnRequests: 20_000_000,
  },
};

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildExportText(config: CloudConfig, result: CostResult): string {
  const sym = getCurrencySymbol(config.currency);
  const fmt = (v: number) => formatCurrency(v, config.currency, sym);
  const p = PROVIDERS[config.provider];

  return [
    "Cloud Cost Estimate",
    "===================",
    `Provider:     ${p.label}`,
    `Region:       ${config.region}`,
    `Currency:     ${config.currency}`,
    "",
    "Infrastructure:",
    `  Compute:    ${config.cpu} vCPU × ${config.ram}GB RAM × ${config.serverCount} server(s)`,
    `  Storage:    ${config.blockStorage}GB SSD + ${config.objectStorage}GB Object`,
    `  Database:   ${config.database}`,
    `  Bandwidth:  ${config.bandwidth}GB/month`,
    `  Serverless: ${formatNumber(config.serverlessExecutions)} executions/month`,
    `  CDN:        ${formatNumber(config.cdnRequests)} requests/month`,
    "",
    "Monthly Cost Breakdown:",
    `  Compute:        ${fmt(result.monthly.compute)}`,
    `  Block Storage:  ${fmt(result.monthly.storage)}`,
    `  Object Storage: ${fmt(result.monthly.objectStorage)}`,
    `  Database:       ${fmt(result.monthly.database)}`,
    `  Bandwidth:      ${fmt(result.monthly.bandwidth)}`,
    `  Serverless:     ${fmt(result.monthly.serverless)}`,
    `  CDN:            ${fmt(result.monthly.cdn)}`,
    `  ─────────────────────────`,
    `  Monthly Total:  ${fmt(result.monthly.total)}`,
    `  Yearly Total:   ${fmt(result.yearly)}`,
    `  Hourly Rate:    ${fmt(result.hourly)}`,
    "",
    `Generated: ${new Date().toLocaleString("en-US")}`,
  ].join("\n");
}

export function buildExportCSV(result: CostResult, currency: string): string {
  const sym = getCurrencySymbol(currency);
  const fmt = (v: number) => v.toFixed(2);
  return [
    `Category,Amount (${currency})`,
    `Compute,${fmt(result.monthly.compute)}`,
    `Block Storage,${fmt(result.monthly.storage)}`,
    `Object Storage,${fmt(result.monthly.objectStorage)}`,
    `Database,${fmt(result.monthly.database)}`,
    `Bandwidth,${fmt(result.monthly.bandwidth)}`,
    `Serverless,${fmt(result.monthly.serverless)}`,
    `CDN,${fmt(result.monthly.cdn)}`,
    `Monthly Total,${fmt(result.monthly.total)}`,
    `Yearly Total,${fmt(result.yearly)}`,
  ].join("\n");
}

export function downloadFile(
  content: string,
  filename: string,
  mimeType = "text/plain"
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── LocalStorage ──────────────────────────────────────────────────────────────

const STORAGE_KEY = "cloud-cost-estimates";
const MAX_SAVED = 8;

export function saveEstimate(config: CloudConfig, result: CostResult): void {
  try {
    const existing = getSavedEstimates();
    const sym = getCurrencySymbol(config.currency);
    const entry: SavedEstimate = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now(),
      label: `${PROVIDERS[config.provider].label} — ${sym}${result.monthly.total.toFixed(2)}/mo`,
      config,
      result,
    };
    const updated = [entry, ...existing].slice(0, MAX_SAVED);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // noop
  }
}

export function getSavedEstimates(): SavedEstimate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedEstimate[]) : [];
  } catch {
    return [];
  }
}

export function clearSavedEstimates(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ── Default config ────────────────────────────────────────────────────────────

export const DEFAULT_CONFIG: CloudConfig = {
  provider: "generic",
  region: "us-east",
  currency: "USD",
  cpu: 1,
  ram: 2,
  serverCount: 1,
  runtimeHours: "24-7",
  customHours: 730,
  blockStorage: 20,
  objectStorage: 100,
  database: "none",
  bandwidth: 100,
  serverlessExecutions: 0,
  cdnRequests: 0,
};
