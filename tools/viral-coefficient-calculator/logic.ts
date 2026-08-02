// ── Viral Coefficient (K-Factor) Calculator Logic ──

export type TierKey = "none" | "sub-viral" | "stable" | "viral" | "strong-viral" | "exceptional-viral";

export interface Tier {
  key: TierKey;
  label: string;
  color: string;
  bg: string;
  text: string;
  dot: string;
  explanation: string;
  recommendation: string;
}

export const TIERS: Tier[] = [
  {
    key: "none", label: "No Growth", color: "#9ca3af", bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400",
    explanation: "Referrals aren't generating any new users at all.",
    recommendation: "Start by adding a simple invitation or sharing feature — even a small conversion rate is better than none.",
  },
  {
    key: "sub-viral", label: "Sub-Viral Growth", color: "#ef4444", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500",
    explanation: "Product is not growing virally. Every generation becomes smaller, so referrals alone will shrink over time.",
    recommendation: "Increase invitation volume and improve referral incentives — additional acquisition channels are required to sustain growth.",
  },
  {
    key: "stable", label: "Stable Growth", color: "#eab308", bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500",
    explanation: "Growth is stable. Each user roughly replaces themselves through referrals, so the user base holds steady from virality alone.",
    recommendation: "Simplify sharing and improve your referral messaging to push the coefficient above 1 and start compounding.",
  },
  {
    key: "viral", label: "Viral Growth", color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500",
    explanation: "Product experiences viral growth. Each generation of referred users is larger than the last.",
    recommendation: "Increase invitation volume to maximize growth — you're past the tipping point, so more invites compound faster.",
  },
  {
    key: "strong-viral", label: "Strong Viral Growth", color: "#058554", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500",
    explanation: "Strong viral growth — referrals alone are compounding your user base significantly with each generation.",
    recommendation: "Keep optimizing onboarding so new users convert into active sharers before the referral momentum fades.",
  },
  {
    key: "exceptional-viral", label: "Exceptional Viral Growth", color: "#069D63", bg: "bg-green-50", text: "text-green-800", dot: "bg-green-600",
    explanation: "Exceptional viral growth — this level of K-factor is rare and typically only seen during breakout viral campaigns.",
    recommendation: "Make sure infrastructure and support can scale with this growth rate — exceptional K-factors are often short-lived.",
  },
];

export function getTier(k: number): Tier {
  if (k <= 0) return TIERS[0];
  if (k < 1) return TIERS[1];
  if (k < 1.05) return TIERS[2];
  if (k < 2) return TIERS[3];
  if (k < 5) return TIERS[4];
  return TIERS[5];
}

export type GrowthDirection = "declining" | "stable" | "growing";

export function getGrowthDirection(k: number): GrowthDirection {
  if (k < 1) return "declining";
  if (k < 1.05) return "stable";
  return "growing";
}

export interface EffectivenessTier {
  label: string;
  color: string;
  bg: string;
  text: string;
}

export function getEffectiveness(conversionRatePct: number): EffectivenessTier {
  if (conversionRatePct < 10) return { label: "Low", color: "#ef4444", bg: "bg-red-50", text: "text-red-700" };
  if (conversionRatePct < 25) return { label: "Moderate", color: "#eab308", bg: "bg-yellow-50", text: "text-yellow-700" };
  if (conversionRatePct < 50) return { label: "High", color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700" };
  return { label: "Very High", color: "#058554", bg: "bg-green-50", text: "text-green-700" };
}

// ── Presets ────────────────────────────────────────────────────────────────────

export interface Preset {
  label: string;
  icon: string;
  invitations: number;
  conversionRate: number;
}

export const PRESETS: Preset[] = [
  { label: "Self-Sustaining (K=1.0)", icon: "⚖️", invitations: 5, conversionRate: 20 },
  { label: "Strong Viral (K=2.8)", icon: "🚀", invitations: 8, conversionRate: 35 },
  { label: "Sub-Viral (K=0.3)", icon: "📉", invitations: 3, conversionRate: 10 },
];

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface ViralInputs {
  invitations: number;
  conversionRate: number;
  existingUsers: number;
  referralCycles: number;
  decimalPrecision: number;
}

export interface GenerationRow {
  generation: number;
  users: number;
  cumulative: number;
}

export interface ViralResult {
  k: number;
  tier: Tier;
  growthDirection: GrowthDirection;
  effectiveness: EffectivenessTier;
  projectedNewUsers: number;
  totalUsersAfterOneCycle: number;
  generations: GenerationRow[];
  formula: string;
  breakdown: string;
  warning: string | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ViralInputs;
  result: ViralResult;
}

// ── Validation ─────────────────────────────────────────────────────────────────

export function getWarning(inputs: ViralInputs): string | null {
  if (inputs.invitations < 0) return "Invitation count cannot be negative.";
  if (inputs.conversionRate < 0 || inputs.conversionRate > 100) return "Conversion rate must be between 0 and 100.";
  if (inputs.existingUsers < 0) return "Existing users cannot be negative.";
  return null;
}

// ── Main calculation ────────────────────────────────────────────────────────────

export function calculateViral(inputs: ViralInputs): ViralResult {
  const warning = getWarning(inputs);
  const invitations = Math.max(0, inputs.invitations);
  const conversionRate = Math.min(100, Math.max(0, inputs.conversionRate));
  const existingUsers = Math.max(0, inputs.existingUsers);
  const cycles = Math.min(20, Math.max(1, Math.round(inputs.referralCycles)));

  const k = invitations * (conversionRate / 100);
  const tier = getTier(k);
  const growthDirection = getGrowthDirection(k);
  const effectiveness = getEffectiveness(conversionRate);

  const projectedNewUsers = existingUsers * k;
  const totalUsersAfterOneCycle = existingUsers + projectedNewUsers;

  const generations: GenerationRow[] = [];
  let cumulative = existingUsers;
  for (let i = 1; i <= cycles; i++) {
    const users = existingUsers * Math.pow(k, i);
    cumulative += users;
    generations.push({ generation: i, users, cumulative });
  }

  const formula = "K = Average Invitations × (Conversion Rate ÷ 100)";
  const breakdown = `${invitations} × (${conversionRate}% ÷ 100) = ${k.toFixed(4)}`;

  return {
    k, tier, growthDirection, effectiveness,
    projectedNewUsers, totalUsersAfterOneCycle, generations,
    formula, breakdown, warning,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNum(n: number, precision: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: ViralInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("invitations", String(inputs.invitations));
  url.searchParams.set("conversionRate", String(inputs.conversionRate));
  url.searchParams.set("existingUsers", String(inputs.existingUsers));
  url.searchParams.set("cycles", String(inputs.referralCycles));
  url.searchParams.set("precision", String(inputs.decimalPrecision));
  return url.toString();
}

export function parseShareParams(): Partial<ViralInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const invitations = p.get("invitations");
  if (!invitations) return null;
  const num = (key: string, fallback: number) => parseFloat(p.get(key) ?? String(fallback)) || fallback;
  return {
    invitations: num("invitations", 5),
    conversionRate: num("conversionRate", 20),
    existingUsers: num("existingUsers", 1000),
    referralCycles: num("cycles", 5),
    decimalPrecision: num("precision", 2),
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "viral-coefficient-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: ViralResult, inputs: ViralInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const p = inputs.decimalPrecision;
  const lines = [
    "Viral Coefficient Report",
    "=========================",
    `Generated: ${ts}`,
    "",
    `Average Invitations Per User: ${formatNum(inputs.invitations, 2)}`,
    `Invitation Conversion Rate: ${formatNum(inputs.conversionRate, 2)}%`,
    `Viral Coefficient (K): ${formatNum(result.k, p)}`,
    `Growth Status: ${result.tier.label}`,
    `Projected New Users: ${formatNum(result.projectedNewUsers, p)}`,
    `Referral Effectiveness: ${result.effectiveness.label}`,
    "",
    `Recommendation: ${result.tier.recommendation}`,
    "",
    `Formula: ${result.formula}`,
    `Calculation: ${result.breakdown}`,
    "",
    "Generated by Productive Toolbox — https://productivetoolbox.com",
  ];
  return lines.join("\n");
}

export function buildCSVReport(result: ViralResult, inputs: ViralInputs): string {
  const rows: (string | number)[][] = [
    ["Viral Coefficient Calculator Report", new Date().toISOString()],
    [],
    ["Metric", "Value"],
    ["Average Invitations Per User", inputs.invitations],
    ["Conversion Rate (%)", inputs.conversionRate],
    ["Viral Coefficient (K)", result.k.toFixed(4)],
    ["Growth Status", result.tier.label],
    ["Projected New Users", result.projectedNewUsers.toFixed(2)],
    ["Referral Effectiveness", result.effectiveness.label],
    [],
    ["Generation", "New Users", "Cumulative Users"],
    ...result.generations.map((g) => [g.generation, g.users.toFixed(2), g.cumulative.toFixed(2)]),
  ];
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function buildJSONReport(result: ViralResult, inputs: ViralInputs): string {
  return JSON.stringify(
    {
      inputs: {
        invitations: inputs.invitations,
        conversionRate: inputs.conversionRate,
        existingUsers: inputs.existingUsers,
        referralCycles: inputs.referralCycles,
      },
      results: {
        k: parseFloat(result.k.toFixed(4)),
        growthStatus: result.tier.label,
        projectedNewUsers: parseFloat(result.projectedNewUsers.toFixed(2)),
        referralEffectiveness: result.effectiveness.label,
        generations: result.generations.map((g) => ({
          generation: g.generation,
          users: parseFloat(g.users.toFixed(2)),
          cumulative: parseFloat(g.cumulative.toFixed(2)),
        })),
      },
      formula: result.formula,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: ViralResult, inputs: ViralInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const p = inputs.decimalPrecision;
  const rows = result.generations
    .map((g) => `<tr><td>Generation ${g.generation}</td><td>${formatNum(g.users, p)}</td><td>${formatNum(g.cumulative, p)}</td></tr>`)
    .join("");
  return `<!DOCTYPE html><html><head><title>Viral Coefficient Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>Viral Coefficient Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Result Summary</h2>
    <table>
      <tr><td>Viral Coefficient (K)</td><td><strong>${formatNum(result.k, p)}</strong></td></tr>
      <tr><td>Growth Status</td><td>${result.tier.label}</td></tr>
      <tr><td>Projected New Users</td><td>${formatNum(result.projectedNewUsers, p)}</td></tr>
      <tr><td>Referral Effectiveness</td><td>${result.effectiveness.label}</td></tr>
    </table>
    <h2>Compound Referral Projection</h2>
    <table>
      <tr><td><strong>Generation</strong></td><td><strong>New Users</strong></td><td><strong>Cumulative</strong></td></tr>
      ${rows}
    </table>
    <h2>Formula</h2>
    <table>
      <tr><td>Formula</td><td>${result.formula}</td></tr>
      <tr><td>Calculation</td><td>${result.breakdown}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: ViralInputs = {
  invitations: 5,
  conversionRate: 20,
  existingUsers: 1000,
  referralCycles: 5,
  decimalPrecision: 2,
};
