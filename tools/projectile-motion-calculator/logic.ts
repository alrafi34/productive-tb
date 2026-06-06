import { ProjectileInputs, ProjectileResult, HistoryEntry, VelocityUnit } from "./types";

// ── Unit conversion to m/s ─────────────────────────────────────────────────

export const VELOCITY_TO_MS: Record<VelocityUnit, number> = {
  "m/s":  1,
  "km/h": 1 / 3.6,
  "ft/s": 0.3048,
  "mph":  0.44704,
};

export const VELOCITY_LABELS: Record<VelocityUnit, string> = {
  "m/s":  "Meters per second (m/s)",
  "km/h": "Kilometers per hour (km/h)",
  "ft/s": "Feet per second (ft/s)",
  "mph":  "Miles per hour (mph)",
};

export const VELOCITY_SHORT: Record<VelocityUnit, string> = {
  "m/s":  "m/s",
  "km/h": "km/h",
  "ft/s": "ft/s",
  "mph":  "mph",
};

export const ALL_VELOCITY_UNITS: VelocityUnit[] = ["m/s", "km/h", "ft/s", "mph"];

// ── Gravity presets ────────────────────────────────────────────────────────

export const GRAVITY_PRESETS = [
  { label: "Earth",   value: 9.81  },
  { label: "Moon",    value: 1.62  },
  { label: "Mars",    value: 3.71  },
  { label: "Jupiter", value: 24.79 },
];

// ── Validation ─────────────────────────────────────────────────────────────

export function validateVelocity(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a velocity value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num <= 0) return "Velocity must be greater than zero.";
  if (num > 100000) return "Velocity seems unrealistically high.";
  return null;
}

export function validateGravity(value: number): string | null {
  if (isNaN(value) || value <= 0) return "Gravity must be greater than zero.";
  return null;
}

export function validateAngle(value: number): string | null {
  if (value < 0 || value > 90) return "Launch angle must be between 0° and 90°.";
  return null;
}

export function validateHeight(value: string): string | null {
  if (!value || value.trim() === "") return null; // optional
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num < 0) return "Launch height cannot be negative.";
  return null;
}

// ── Core calculation ───────────────────────────────────────────────────────

export function calculate(inputs: ProjectileInputs): ProjectileResult | null {
  const velErr = validateVelocity(inputs.velocity);
  const gravErr = validateGravity(inputs.gravity);
  const angleErr = validateAngle(inputs.angle);
  if (velErr || gravErr || angleErr) return null;

  const v = parseFloat(inputs.velocity) * VELOCITY_TO_MS[inputs.velocityUnit];
  const theta = (inputs.angle * Math.PI) / 180;
  const g = inputs.gravity;
  const h0 = parseFloat(inputs.launchHeight) || 0;

  const vx = v * Math.cos(theta);
  const vy = v * Math.sin(theta);

  // Time of flight (with initial height)
  // y(t) = h0 + vy*t - 0.5*g*t^2 = 0
  // 0.5*g*t^2 - vy*t - h0 = 0
  let flightTime: number;
  if (h0 === 0) {
    flightTime = (2 * vy) / g;
  } else {
    const discriminant = vy * vy + 2 * g * h0;
    flightTime = (vy + Math.sqrt(discriminant)) / g;
  }

  // Max height
  const peakTime = vy / g;
  const maxHeight = h0 + (vy * vy) / (2 * g);

  // Range
  const range = vx * flightTime;

  // Landing speed
  const vyLanding = vy - g * flightTime;
  const landingSpeed = Math.sqrt(vx * vx + vyLanding * vyLanding);

  // Trajectory points
  const trajectoryPoints: { x: number; y: number }[] = [];
  const steps = 200;
  const dt = flightTime / steps;
  for (let i = 0; i <= steps; i++) {
    const t = i * dt;
    const x = vx * t;
    const y = h0 + vy * t - 0.5 * g * t * t;
    if (y >= 0) {
      trajectoryPoints.push({ x, y });
    }
  }

  return {
    vx,
    vy,
    maxHeight,
    range,
    flightTime,
    peakTime,
    landingSpeed,
    trajectoryPoints,
  };
}

// ── Formatting ─────────────────────────────────────────────────────────────

export function formatNum(value: number, decimals: number): string {
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 0.001 && value !== 0)) {
    return value.toExponential(decimals);
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ── Debounce ───────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────

const HISTORY_KEY = "projectile-motion-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: ProjectileInputs, result: ProjectileResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result: { ...result, trajectoryPoints: [] }, // don't store points
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// ── Export ─────────────────────────────────────────────────────────────────

export function exportToText(inputs: ProjectileInputs, result: ProjectileResult): string {
  const p = inputs.precision;
  return [
    "Projectile Motion Calculator – Result",
    "=".repeat(45),
    "",
    `Initial Velocity : ${inputs.velocity} ${VELOCITY_SHORT[inputs.velocityUnit]} (${formatNum(result.vx / Math.cos(inputs.angle * Math.PI / 180), p)} m/s)`,
    `Launch Angle     : ${inputs.angle}°`,
    `Gravity          : ${inputs.gravity} m/s²`,
    `Launch Height    : ${inputs.launchHeight || "0"} m`,
    "",
    `Horizontal Velocity (vx) : ${formatNum(result.vx, p)} m/s`,
    `Vertical Velocity (vy)   : ${formatNum(result.vy, p)} m/s`,
    `Maximum Height           : ${formatNum(result.maxHeight, p)} m`,
    `Horizontal Range         : ${formatNum(result.range, p)} m`,
    `Time of Flight           : ${formatNum(result.flightTime, p)} s`,
    `Time to Peak             : ${formatNum(result.peakTime, p)} s`,
    `Landing Speed            : ${formatNum(result.landingSpeed, p)} m/s`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
