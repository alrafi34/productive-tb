export interface DeviceMetrics {
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  orientation: string;
  colorDepth: number;
  windowOuterWidth: number;
  windowOuterHeight: number;
  availableScreenWidth: number;
  availableScreenHeight: number;
  aspectRatio: string;
  isRetina: boolean;
  timestamp: number;
}

export interface MetricsHistory {
  id: string;
  metrics: DeviceMetrics;
  timestamp: number;
}

export function getDeviceMetrics(): DeviceMetrics {
  const dpr = window.devicePixelRatio || 1;
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(screenWidth, screenHeight);
  const aspectRatio = `${screenWidth / divisor}:${screenHeight / divisor}`;

  return {
    screenWidth,
    screenHeight,
    viewportWidth,
    viewportHeight,
    devicePixelRatio: Math.round(dpr * 100) / 100,
    orientation: screen.orientation?.type || "unknown",
    colorDepth: screen.colorDepth || 24,
    windowOuterWidth: window.outerWidth,
    windowOuterHeight: window.outerHeight,
    availableScreenWidth: screen.availWidth,
    availableScreenHeight: screen.availHeight,
    aspectRatio,
    isRetina: dpr >= 2,
    timestamp: Date.now()
  };
}

export function formatMetrics(metrics: DeviceMetrics): Record<string, string> {
  return {
    "Screen Resolution": `${metrics.screenWidth} × ${metrics.screenHeight}`,
    "Viewport Size": `${metrics.viewportWidth} × ${metrics.viewportHeight}`,
    "Device Pixel Ratio": `${metrics.devicePixelRatio}`,
    "Orientation": metrics.orientation.charAt(0).toUpperCase() + metrics.orientation.slice(1),
    "Color Depth": `${metrics.colorDepth}-bit`,
    "Browser Window": `${metrics.windowOuterWidth} × ${metrics.windowOuterHeight}`,
    "Available Screen": `${metrics.availableScreenWidth} × ${metrics.availableScreenHeight}`,
    "Aspect Ratio": metrics.aspectRatio,
    "Display Type": metrics.isRetina ? "Retina (High-DPI)" : "Standard"
  };
}

export function exportAsJSON(metrics: DeviceMetrics): void {
  const blob = new Blob([JSON.stringify(metrics, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `screen-metrics-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportAsBugReport(metrics: DeviceMetrics): string {
  const formatted = formatMetrics(metrics);
  const lines = [
    "=== Device & Screen Metrics ===",
    "",
    ...Object.entries(formatted).map(([key, value]) => `${key}: ${value}`),
    "",
    `Timestamp: ${new Date(metrics.timestamp).toLocaleString()}`,
    `User Agent: ${navigator.userAgent}`
  ];
  return lines.join("\n");
}

export function saveToHistory(metrics: DeviceMetrics): void {
  const history = getHistory();
  const newItem: MetricsHistory = {
    id: crypto.randomUUID(),
    metrics,
    timestamp: Date.now()
  };
  
  const updated = [newItem, ...history].slice(0, 20);
  localStorage.setItem("screen-metrics-history", JSON.stringify(updated));
}

export function getHistory(): MetricsHistory[] {
  try {
    const stored = localStorage.getItem("screen-metrics-history");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem("screen-metrics-history");
}
