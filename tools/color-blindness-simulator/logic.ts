import { ColorBlindnessType, AccessibilityTip } from './types';

export const colorBlindnessTypes: ColorBlindnessType[] = [
  {
    id: 'normal',
    name: 'Normal Vision',
    description: 'No color vision deficiency',
    prevalence: '~92% of population',
    matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
  },
  {
    id: 'protanopia',
    name: 'Protanopia',
    description: 'Red-blind (missing L-cones)',
    prevalence: '~1% of males',
    matrix: [0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0]
  },
  {
    id: 'protanomaly',
    name: 'Protanomaly',
    description: 'Red-weak (anomalous L-cones)',
    prevalence: '~1% of males',
    matrix: [0.817, 0.183, 0, 0, 0, 0.333, 0.667, 0, 0, 0, 0, 0.125, 0.875, 0, 0, 0, 0, 0, 1, 0]
  },
  {
    id: 'deuteranopia',
    name: 'Deuteranopia',
    description: 'Green-blind (missing M-cones)',
    prevalence: '~1% of males',
    matrix: [0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0]
  },
  {
    id: 'deuteranomaly',
    name: 'Deuteranomaly',
    description: 'Green-weak (anomalous M-cones)',
    prevalence: '~5% of males',
    matrix: [0.8, 0.2, 0, 0, 0, 0.258, 0.742, 0, 0, 0, 0, 0.142, 0.858, 0, 0, 0, 0, 0, 1, 0]
  },
  {
    id: 'tritanopia',
    name: 'Tritanopia',
    description: 'Blue-blind (missing S-cones)',
    prevalence: '~0.003% of population',
    matrix: [0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0]
  },
  {
    id: 'tritanomaly',
    name: 'Tritanomaly',
    description: 'Blue-weak (anomalous S-cones)',
    prevalence: '~0.01% of population',
    matrix: [0.967, 0.033, 0, 0, 0, 0, 0.733, 0.267, 0, 0, 0, 0.183, 0.817, 0, 0, 0, 0, 0, 1, 0]
  },
  {
    id: 'achromatopsia',
    name: 'Achromatopsia',
    description: 'Complete color blindness (monochromacy)',
    prevalence: '~0.003% of population',
    matrix: [0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0]
  },
  {
    id: 'achromatomaly',
    name: 'Achromatomaly',
    description: 'Partial color blindness (blue cone monochromacy)',
    prevalence: '~0.001% of population',
    matrix: [0.618, 0.320, 0.062, 0, 0, 0.163, 0.775, 0.062, 0, 0, 0.163, 0.320, 0.516, 0, 0, 0, 0, 0, 1, 0]
  }
];

export const accessibilityTips: Record<string, AccessibilityTip[]> = {
  protanopia: [
    {
      type: 'protanopia',
      message: 'Red and green colors may appear similar. Use patterns, shapes, or labels in addition to color.',
      severity: 'warning'
    },
    {
      type: 'protanopia',
      message: 'Red text on green backgrounds (or vice versa) may be invisible.',
      severity: 'error'
    }
  ],
  deuteranopia: [
    {
      type: 'deuteranopia',
      message: 'This is the most common form of color blindness. Green and red appear similar.',
      severity: 'info'
    },
    {
      type: 'deuteranopia',
      message: 'Avoid using red and green as the only way to distinguish important information.',
      severity: 'warning'
    }
  ],
  tritanopia: [
    {
      type: 'tritanopia',
      message: 'Blue and yellow colors may be difficult to distinguish.',
      severity: 'warning'
    },
    {
      type: 'tritanopia',
      message: 'Blue text on yellow backgrounds may have poor visibility.',
      severity: 'error'
    }
  ],
  achromatopsia: [
    {
      type: 'achromatopsia',
      message: 'All colors appear as shades of gray. Rely on contrast, not color.',
      severity: 'error'
    },
    {
      type: 'achromatopsia',
      message: 'Ensure sufficient brightness contrast between elements.',
      severity: 'warning'
    }
  ]
};

export const generateSVGFilter = (type: ColorBlindnessType, intensity: number = 1): string => {
  if (type.id === 'normal') return '';
  
  // Interpolate between normal vision and full simulation based on intensity
  const normalMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
  const simulationMatrix = type.matrix;
  
  const interpolatedMatrix = normalMatrix.map((normal, index) => {
    const simulated = simulationMatrix[index];
    return normal + (simulated - normal) * intensity;
  });
  
  return `
    <filter id="${type.id}" x="0%" y="0%" width="100%" height="100%">
      <feColorMatrix type="matrix" values="${interpolatedMatrix.join(' ')}" />
    </filter>
  `;
};

export const generateAllSVGFilters = (intensity: number = 1): string => {
  return `
    <svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
      <defs>
        ${colorBlindnessTypes.map(type => generateSVGFilter(type, intensity)).join('')}
      </defs>
    </svg>
  `;
};

export const loadImageFromFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
};

export const captureElementAsCanvas = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  const rect = element.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  // This is a simplified implementation
  // In a real app, you'd use html2canvas or similar library
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  return canvas;
};

export const sampleImages = [
  {
    name: 'Color Chart',
    url: '/api/placeholder/400/300?text=Color+Chart',
    description: 'Test with various colors'
  },
  {
    name: 'UI Dashboard',
    url: '/api/placeholder/600/400?text=Dashboard+UI',
    description: 'Sample dashboard interface'
  },
  {
    name: 'Data Visualization',
    url: '/api/placeholder/500/350?text=Chart+Data',
    description: 'Charts and graphs'
  }
];