import { ClampConfig, ClampResult, TypographyScale, BreakpointPreset, PropertyPreset, ParsedClamp } from './types';

export const defaultClampConfig: ClampConfig = {
  minValue: 16,
  maxValue: 32,
  minViewport: 320,
  maxViewport: 1280,
  unit: 'px',
  property: 'font-size',
  rootFontSize: 16
};

export const breakpointPresets: BreakpointPreset[] = [
  { name: 'Mobile', minViewport: 320, maxViewport: 768, description: 'Mobile to tablet' },
  { name: 'Tablet', minViewport: 768, maxViewport: 1024, description: 'Tablet to laptop' },
  { name: 'Desktop', minViewport: 1024, maxViewport: 1440, description: 'Laptop to desktop' },
  { name: 'Large', minViewport: 1440, maxViewport: 1920, description: 'Desktop to large screen' },
  { name: 'Full Range', minViewport: 320, maxViewport: 1920, description: 'Mobile to large screen' }
];

export const propertyPresets: PropertyPreset[] = [
  { name: 'Font Size', property: 'font-size', defaultMin: 16, defaultMax: 32, unit: 'px', description: 'Text size scaling' },
  { name: 'Padding', property: 'padding', defaultMin: 12, defaultMax: 48, unit: 'px', description: 'Element padding' },
  { name: 'Margin', property: 'margin', defaultMin: 8, defaultMax: 32, unit: 'px', description: 'Element margin' },
  { name: 'Gap', property: 'gap', defaultMin: 16, defaultMax: 64, unit: 'px', description: 'Flexbox/Grid gap' },
  { name: 'Width', property: 'width', defaultMin: 200, defaultMax: 800, unit: 'px', description: 'Element width' },
  { name: 'Height', property: 'height', defaultMin: 40, defaultMax: 80, unit: 'px', description: 'Element height' },
  { name: 'Border Radius', property: 'border-radius', defaultMin: 4, defaultMax: 24, unit: 'px', description: 'Corner rounding' },
  { name: 'Letter Spacing', property: 'letter-spacing', defaultMin: 0, defaultMax: 2, unit: 'px', description: 'Character spacing' },
  { name: 'Line Height', property: 'line-height', defaultMin: 1.2, defaultMax: 1.8, unit: 'em', description: 'Line spacing' }
];

// Core clamp calculation
export const calculateClamp = (config: ClampConfig): ClampResult => {
  const { minValue, maxValue, minViewport, maxViewport, unit, rootFontSize } = config;
  
  // Calculate slope and intercept for linear interpolation
  const slope = (maxValue - minValue) / (maxViewport - minViewport);
  const intercept = minValue - slope * minViewport;
  
  // Convert to viewport units (vw)
  const slopeVw = slope * 100; // Convert to vw
  const interceptConverted = convertUnit(intercept, 'px', unit, rootFontSize);
  
  // Format preferred value
  const preferredValue = `${slopeVw.toFixed(3)}vw + ${interceptConverted.toFixed(3)}${unit}`;
  
  // Format min and max values
  const minFormatted = `${convertUnit(minValue, 'px', unit, rootFontSize).toFixed(3)}${unit}`;
  const maxFormatted = `${convertUnit(maxValue, 'px', unit, rootFontSize).toFixed(3)}${unit}`;
  
  // Generate CSS
  const css = `clamp(${minFormatted}, ${preferredValue}, ${maxFormatted})`;
  
  return {
    css,
    minFormatted,
    maxFormatted,
    preferredValue,
    slope: slopeVw,
    intercept: interceptConverted
  };
};

// Unit conversion
export const convertUnit = (value: number, fromUnit: string, toUnit: string, rootFontSize: number = 16): number => {
  if (fromUnit === toUnit) return value;
  
  // Convert to px first
  let pxValue = value;
  if (fromUnit === 'rem') pxValue = value * rootFontSize;
  if (fromUnit === 'em') pxValue = value * rootFontSize;
  
  // Convert from px to target unit
  if (toUnit === 'rem') return pxValue / rootFontSize;
  if (toUnit === 'em') return pxValue / rootFontSize;
  return pxValue;
};

// Calculate value at specific viewport
export const calculateValueAtViewport = (config: ClampConfig, viewport: number): number => {
  const { minValue, maxValue, minViewport, maxViewport } = config;
  
  if (viewport <= minViewport) return minValue;
  if (viewport >= maxViewport) return maxValue;
  
  const slope = (maxValue - minValue) / (maxViewport - minViewport);
  return minValue + slope * (viewport - minViewport);
};

// Generate typography scale
export const generateTypographyScale = (baseConfig: ClampConfig): TypographyScale => {
  const scales = {
    h1: { min: baseConfig.minValue * 2, max: baseConfig.maxValue * 2 },
    h2: { min: baseConfig.minValue * 1.75, max: baseConfig.maxValue * 1.75 },
    h3: { min: baseConfig.minValue * 1.5, max: baseConfig.maxValue * 1.5 },
    h4: { min: baseConfig.minValue * 1.25, max: baseConfig.maxValue * 1.25 },
    h5: { min: baseConfig.minValue * 1.125, max: baseConfig.maxValue * 1.125 },
    h6: { min: baseConfig.minValue * 1, max: baseConfig.maxValue * 1 },
    body: { min: baseConfig.minValue, max: baseConfig.maxValue },
    small: { min: baseConfig.minValue * 0.875, max: baseConfig.maxValue * 0.875 }
  };
  
  const result: any = {};
  
  Object.entries(scales).forEach(([key, scale]) => {
    const config = {
      ...baseConfig,
      minValue: scale.min,
      maxValue: scale.max
    };
    result[key] = calculateClamp(config);
  });
  
  return result as TypographyScale;
};

// Parse existing clamp value
export const parseClampValue = (clampString: string): ParsedClamp => {
  const clampRegex = /clamp\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+)\s*\)/i;
  const match = clampString.match(clampRegex);
  
  if (!match) {
    return { minValue: 0, preferredValue: '', maxValue: 0, unit: 'px', isValid: false };
  }
  
  const [, minStr, preferredStr, maxStr] = match;
  
  // Extract numeric values and units
  const minMatch = minStr.trim().match(/^([\d.]+)(\w+)$/);
  const maxMatch = maxStr.trim().match(/^([\d.]+)(\w+)$/);
  
  if (!minMatch || !maxMatch) {
    return { minValue: 0, preferredValue: '', maxValue: 0, unit: 'px', isValid: false };
  }
  
  return {
    minValue: parseFloat(minMatch[1]),
    preferredValue: preferredStr.trim(),
    maxValue: parseFloat(maxMatch[1]),
    unit: minMatch[2],
    isValid: true
  };
};

// Generate code in different formats
export const generateCodeFormats = (result: ClampResult, property: string) => {
  return {
    css: `${property}: ${result.css};`,
    cssVariable: `--fluid-${property.replace('-', '')}: ${result.css};`,
    scssVariable: `$fluid-${property.replace('-', '')}: ${result.css};`,
    tailwind: `${property === 'font-size' ? 'text' : property}-[${result.css}]`
  };
};

// Local storage utilities
export const saveConfigToStorage = (config: ClampConfig) => {
  try {
    const saved = JSON.parse(localStorage.getItem('clamp-generator-configs') || '[]');
    const updated = [config, ...saved.filter((c: ClampConfig) => 
      !(c.property === config.property && 
        c.minValue === config.minValue && 
        c.maxValue === config.maxValue)
    )].slice(0, 10); // Keep last 10
    localStorage.setItem('clamp-generator-configs', JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save config:', error);
  }
};

export const loadConfigsFromStorage = (): ClampConfig[] => {
  try {
    return JSON.parse(localStorage.getItem('clamp-generator-configs') || '[]');
  } catch (error) {
    console.error('Failed to load configs:', error);
    return [];
  }
};

export const saveLastConfig = (config: ClampConfig) => {
  try {
    localStorage.setItem('clamp-generator-last', JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save last config:', error);
  }
};

export const loadLastConfig = (): ClampConfig | null => {
  try {
    const saved = localStorage.getItem('clamp-generator-last');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load last config:', error);
    return null;
  }
};

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};

// Download file
export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Generate CSS file content
export const generateCSSFile = (configs: ClampConfig[]): string => {
  let css = '/* Generated CSS Clamp Values */\n\n';
  
  configs.forEach((config, index) => {
    const result = calculateClamp(config);
    const formats = generateCodeFormats(result, config.property);
    
    css += `/* ${config.property} - ${config.minValue}${config.unit} to ${config.maxValue}${config.unit} */\n`;
    css += `${formats.cssVariable}\n`;
    css += `.fluid-${config.property.replace('-', '')} {\n  ${formats.css}\n}\n\n`;
  });
  
  return css;
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Validate accessibility
export const validateAccessibility = (config: ClampConfig): string[] => {
  const warnings: string[] = [];
  
  if (config.property === 'font-size') {
    if (config.minValue < 14) {
      warnings.push('Minimum font size below 14px may not be accessible');
    }
    if (config.maxValue > 72) {
      warnings.push('Maximum font size above 72px may be too large');
    }
  }
  
  if (config.minValue >= config.maxValue) {
    warnings.push('Minimum value should be less than maximum value');
  }
  
  if (config.minViewport >= config.maxViewport) {
    warnings.push('Minimum viewport should be less than maximum viewport');
  }
  
  return warnings;
};