export interface BarData {
  label: string;
  value: number;
  color: string;
}

export interface ChartConfig {
  title: string;
  showValues: boolean;
  showLabels: boolean;
  showGrid: boolean;
  animate: boolean;
  mode: "svg" | "canvas";
}

export const DEFAULT_COLORS = [
  "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6",
  "#EC4899", "#06B6D4", "#F97316", "#6366F1", "#14B8A6",
];

export function calculateBarHeight(value: number, maxValue: number, chartHeight: number): number {
  if (maxValue === 0) return 0;
  return (value / maxValue) * chartHeight;
}

export function getMaxValue(data: BarData[]): number {
  if (data.length === 0) return 0;
  return Math.max(...data.map(d => d.value));
}

export function generateRandomData(count: number = 5): BarData[] {
  const labels = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"];
  const data: BarData[] = [];
  for (let i = 0; i < Math.min(count, labels.length); i++) {
    data.push({
      label: labels[i],
      value: Math.floor(Math.random() * 100) + 10,
      color: DEFAULT_COLORS[i % DEFAULT_COLORS.length],
    });
  }
  return data;
}

export function parseCSVData(csv: string): BarData[] {
  const lines = csv.trim().split("\n");
  const data: BarData[] = [];
  
  lines.forEach((line, index) => {
    const parts = line.split(",").map(p => p.trim());
    if (parts.length >= 2) {
      const label = parts[0];
      const value = parseFloat(parts[1]);
      if (!isNaN(value) && value >= 0) {
        data.push({
          label,
          value,
          color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        });
      }
    }
  });
  
  return data;
}

export function exportToCSV(data: BarData[]): string {
  return data.map(d => `${d.label},${d.value}`).join("\n");
}

export function generateSVG(
  data: BarData[],
  config: ChartConfig,
  width: number = 800,
  height: number = 400
): string {
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / data.length * 0.8;
  const barSpacing = chartWidth / data.length;
  const maxValue = getMaxValue(data);

  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="white"/>`;

  if (config.showGrid) {
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i;
      svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
    }
  }

  data.forEach((bar, index) => {
    const barHeight = calculateBarHeight(bar.value, maxValue, chartHeight);
    const x = padding + index * barSpacing + (barSpacing - barWidth) / 2;
    const y = height - padding - barHeight;

    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${bar.color}" stroke="#333" stroke-width="1"/>`;

    if (config.showValues) {
      svg += `<text x="${x + barWidth / 2}" y="${y - 5}" text-anchor="middle" font-size="12" font-weight="bold">${bar.value}</text>`;
    }

    if (config.showLabels) {
      svg += `<text x="${x + barWidth / 2}" y="${height - padding + 20}" text-anchor="middle" font-size="12">${bar.label}</text>`;
    }
  });

  if (config.title) {
    svg += `<text x="${width / 2}" y="30" text-anchor="middle" font-size="18" font-weight="bold">${config.title}</text>`;
  }

  svg += `</svg>`;
  return svg;
}

export function renderCanvasChart(
  canvas: HTMLCanvasElement,
  data: BarData[],
  config: ChartConfig
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / data.length * 0.8;
  const barSpacing = chartWidth / data.length;
  const maxValue = getMaxValue(data);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  if (config.showGrid) {
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
  }

  data.forEach((bar, index) => {
    const barHeight = calculateBarHeight(bar.value, maxValue, chartHeight);
    const x = padding + index * barSpacing + (barSpacing - barWidth) / 2;
    const y = height - padding - barHeight;

    ctx.fillStyle = bar.color;
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, barWidth, barHeight);

    if (config.showValues) {
      ctx.fillStyle = "#000";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(bar.value.toString(), x + barWidth / 2, y - 5);
    }

    if (config.showLabels) {
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(bar.label, x + barWidth / 2, height - padding + 20);
    }
  });

  if (config.title) {
    ctx.fillStyle = "#000";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(config.title, width / 2, 30);
  }
}
