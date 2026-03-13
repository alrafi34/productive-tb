export interface ChartData {
  label: string;
  value: number;
  color: string;
}

export interface ChartConfig {
  title: string;
  showPercentages: boolean;
  showLabels: boolean;
  showLegend: boolean;
  animateSlices: boolean;
  darkMode: boolean;
}

export interface SavedChart {
  id: string;
  timestamp: string;
  title: string;
  data: ChartData[];
  config: ChartConfig;
}

const DEFAULT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#A8E6CF',
  '#FFD3B6', '#FFAAA5', '#FF8B94', '#A8D8EA', '#AA96DA',
  '#FCBAD3', '#A1D82F', '#FF6B9D', '#C44569', '#F8B500',
];

export function generateRandomData(count: number = 5): ChartData[] {
  const labels = ['Category A', 'Category B', 'Category C', 'Category D', 'Category E', 'Category F'];
  const data: ChartData[] = [];
  
  for (let i = 0; i < Math.min(count, labels.length); i++) {
    data.push({
      label: labels[i],
      value: Math.floor(Math.random() * 100) + 10,
      color: DEFAULT_COLORS[i % DEFAULT_COLORS.length],
    });
  }
  
  return data;
}

export function calculatePercentages(data: ChartData[]): number[] {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return data.map(() => 0);
  return data.map(item => (item.value / total) * 100);
}

export function calculateAngles(data: ChartData[]): number[] {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return data.map(() => 0);
  return data.map(item => (item.value / total) * 360);
}

export function generateSVGPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY + radius * Math.sin(startRad);
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY + radius * Math.sin(endRad);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

export function generateSVGChart(
  data: ChartData[],
  config: ChartConfig,
  width: number = 500,
  height: number = 500
): string {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 60;

  const angles = calculateAngles(data);
  const percentages = calculatePercentages(data);

  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Background
  svg += `<rect width="${width}" height="${height}" fill="${config.darkMode ? '#1f2937' : '#ffffff'}"/>`;

  // Title
  if (config.title) {
    svg += `<text x="${centerX}" y="30" text-anchor="middle" font-size="24" font-weight="bold" fill="${config.darkMode ? '#ffffff' : '#000000'}">${config.title}</text>`;
  }

  let currentAngle = 0;

  // Draw slices
  data.forEach((item, index) => {
    const sliceAngle = angles[index];
    const endAngle = currentAngle + sliceAngle;

    const path = generateSVGPath(centerX, centerY, radius, currentAngle, endAngle);
    svg += `<path d="${path}" fill="${item.color}" stroke="${config.darkMode ? '#374151' : '#ffffff'}" stroke-width="2"/>`;

    // Label and percentage
    if (config.showLabels || config.showPercentages) {
      const midAngle = currentAngle + sliceAngle / 2;
      const midRad = (midAngle - 90) * (Math.PI / 180);
      const labelRadius = radius * 0.65;
      const labelX = centerX + labelRadius * Math.cos(midRad);
      const labelY = centerY + labelRadius * Math.sin(midRad);

      let labelText = '';
      if (config.showLabels && config.showPercentages) {
        labelText = `${item.label} (${percentages[index].toFixed(1)}%)`;
      } else if (config.showPercentages) {
        labelText = `${percentages[index].toFixed(1)}%`;
      } else if (config.showLabels) {
        labelText = item.label;
      }

      if (labelText) {
        svg += `<text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="12" fill="${config.darkMode ? '#ffffff' : '#000000'}" font-weight="bold">${labelText}</text>`;
      }
    }

    currentAngle = endAngle;
  });

  // Legend
  if (config.showLegend) {
    const legendX = 20;
    let legendY = height - 20 - data.length * 25;

    data.forEach((item, index) => {
      svg += `<rect x="${legendX}" y="${legendY + index * 25}" width="15" height="15" fill="${item.color}"/>`;
      svg += `<text x="${legendX + 25}" y="${legendY + index * 25 + 12}" font-size="12" fill="${config.darkMode ? '#ffffff' : '#000000'}">${item.label}</text>`;
    });
  }

  svg += '</svg>';
  return svg;
}

export function exportChartAsImage(svgString: string, filename: string = 'chart.png'): Promise<void> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    const img = new Image();
    const svg = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svg);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      canvas.toBlob(blob => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = filename;
          link.click();
          resolve();
        } else {
          reject(new Error('Could not create blob'));
        }
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not load image'));
    };

    img.src = url;
  });
}

export function exportChartAsSVG(svgString: string, filename: string = 'chart.svg'): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportAsCSV(data: ChartData[], filename: string = 'chart-data.csv'): void {
  let csv = 'Label,Value\n';
  data.forEach(item => {
    csv += `"${item.label}",${item.value}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function parseCSV(csvText: string): ChartData[] {
  const lines = csvText.trim().split('\n');
  const data: ChartData[] = [];

  lines.forEach((line, index) => {
    if (index === 0 || !line.trim()) return; // Skip header and empty lines

    const [label, value] = line.split(',').map(s => s.trim().replace(/"/g, ''));
    const numValue = parseFloat(value);

    if (label && !isNaN(numValue) && numValue > 0) {
      data.push({
        label,
        value: numValue,
        color: DEFAULT_COLORS[data.length % DEFAULT_COLORS.length],
      });
    }
  });

  return data;
}
