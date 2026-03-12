import { GoldenRatioResult, TypographyScale, SpacingScale, LayoutSplit, CSSOutput, SpiralPoint } from './types';

// Golden Ratio constant
export const PHI = 1.618033988749895;

// Calculate golden ratio split
export function calculateGoldenRatio(total: number): GoldenRatioResult {
  const largePart = total / PHI;
  const smallPart = total - largePart;
  
  return {
    total,
    largePart: Math.round(largePart * 100) / 100,
    smallPart: Math.round(smallPart * 100) / 100,
    largePercentage: 61.8,
    smallPercentage: 38.2,
    phi: PHI
  };
}

// Reverse calculation from small part
export function calculateFromSmallPart(smallPart: number): GoldenRatioResult {
  const total = smallPart * PHI / (PHI - 1);
  return calculateGoldenRatio(total);
}

// Reverse calculation from large part
export function calculateFromLargePart(largePart: number): GoldenRatioResult {
  const total = largePart * PHI;
  return calculateGoldenRatio(total);
}

// Parse input value (handles px, %, numbers)
export function parseInputValue(input: string): { value: number; unit: string } {
  const cleaned = input.trim();
  
  // Check for px
  if (cleaned.endsWith('px')) {
    return {
      value: parseFloat(cleaned.replace('px', '')),
      unit: 'px'
    };
  }
  
  // Check for %
  if (cleaned.endsWith('%')) {
    return {
      value: parseFloat(cleaned.replace('%', '')),
      unit: '%'
    };
  }
  
  // Plain number
  return {
    value: parseFloat(cleaned),
    unit: ''
  };
}

// Generate typography scale
export function generateTypographyScale(baseSize: number, steps: number = 5): TypographyScale {
  const sizes: number[] = [];
  let currentSize = baseSize;
  
  for (let i = 0; i < steps; i++) {
    sizes.push(Math.round(currentSize));
    currentSize *= PHI;
  }
  
  return {
    baseSize,
    sizes,
    unit: 'px'
  };
}

// Generate spacing scale
export function generateSpacingScale(baseSpacing: number, steps: number = 6): SpacingScale {
  const values: number[] = [];
  let currentValue = baseSpacing;
  
  for (let i = 0; i < steps; i++) {
    values.push(Math.round(currentValue));
    currentValue *= PHI;
  }
  
  return {
    baseSpacing,
    values,
    unit: 'px'
  };
}

// Calculate layout split
export function calculateLayoutSplit(totalWidth: number): LayoutSplit {
  const mainWidth = totalWidth / PHI;
  const sidebarWidth = totalWidth - mainWidth;
  
  return {
    totalWidth,
    mainWidth: Math.round(mainWidth),
    sidebarWidth: Math.round(sidebarWidth),
    mainPercentage: 61.8,
    sidebarPercentage: 38.2
  };
}

// Generate CSS code
export function generateCSS(largePart: number, smallPart: number, unit: string = 'px'): CSSOutput {
  const largeValue = unit ? `${largePart}${unit}` : largePart;
  const smallValue = unit ? `${smallPart}${unit}` : smallPart;
  
  return {
    grid: `.container {
  display: grid;
  grid-template-columns: 1.618fr 1fr;
  gap: 20px;
}`,
    flexbox: `.container {
  display: flex;
  gap: 20px;
}

.main {
  flex: 1.618;
}

.sidebar {
  flex: 1;
}`,
    percentage: `.main {
  width: 61.8%;
}

.sidebar {
  width: 38.2%;
}`,
    pixels: `.main {
  width: ${largeValue};
}

.sidebar {
  width: ${smallValue};
}`
  };
}

// Generate golden spiral points
export function generateSpiralPoints(width: number, height: number, turns: number = 3): SpiralPoint[] {
  const points: SpiralPoint[] = [];
  const steps = 100 * turns;
  
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * turns * 2 * Math.PI;
    const radius = (width / 4) * Math.pow(PHI, angle / (2 * Math.PI));
    
    const x = width / 2 + radius * Math.cos(angle);
    const y = height / 2 + radius * Math.sin(angle);
    
    points.push({ x, y });
  }
  
  return points;
}

// Generate golden rectangles for visualization
export function generateGoldenRectangles(width: number, height: number, depth: number = 5): Array<{x: number, y: number, width: number, height: number}> {
  const rectangles: Array<{x: number, y: number, width: number, height: number}> = [];
  
  let currentX = 0;
  let currentY = 0;
  let currentWidth = width;
  let currentHeight = height;
  
  for (let i = 0; i < depth; i++) {
    rectangles.push({
      x: currentX,
      y: currentY,
      width: currentWidth,
      height: currentHeight
    });
    
    // Calculate next rectangle
    if (i % 4 === 0) {
      // Right side
      const newWidth = currentHeight / PHI;
      currentX += currentWidth - newWidth;
      currentWidth = newWidth;
    } else if (i % 4 === 1) {
      // Bottom
      const newHeight = currentWidth / PHI;
      currentY += currentHeight - newHeight;
      currentHeight = newHeight;
    } else if (i % 4 === 2) {
      // Left side
      const newWidth = currentHeight / PHI;
      currentWidth = newWidth;
    } else {
      // Top
      const newHeight = currentWidth / PHI;
      currentHeight = newHeight;
    }
  }
  
  return rectangles;
}

// Export functions
export function exportAsJSON(data: any): void {
  const content = JSON.stringify(data, null, 2);
  downloadFile(content, `golden-ratio-${Date.now()}.json`, 'application/json');
}

export function exportAsText(data: GoldenRatioResult): void {
  const content = `Golden Ratio Calculation
Total: ${data.total}
Large Part (61.8%): ${data.largePart}
Small Part (38.2%): ${data.smallPart}
Phi (φ): ${data.phi}`;
  
  downloadFile(content, `golden-ratio-${Date.now()}.txt`, 'text/plain');
}

function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Common use cases
export const COMMON_VALUES = [
  { label: 'Mobile Width', value: 375 },
  { label: 'Tablet Width', value: 768 },
  { label: 'Desktop Width', value: 1440 },
  { label: 'Full HD Width', value: 1920 },
  { label: 'Base Font', value: 16 },
  { label: 'Base Spacing', value: 8 }
];
