export type TriangleDirection = 'top' | 'bottom' | 'left' | 'right';

export interface TriangleConfig {
  direction: TriangleDirection;
  width: number;
  height: number;
  color: string;
}

export function generateTriangleCSS(config: TriangleConfig): string {
  const { direction, width, height, color } = config;
  
  const baseCSS = `
  width: 0;
  height: 0;
  border-style: solid;`;

  switch (direction) {
    case 'top':
      return `${baseCSS}
  border-left: ${width / 2}px solid transparent;
  border-right: ${width / 2}px solid transparent;
  border-bottom: ${height}px solid ${color};`;
    
    case 'bottom':
      return `${baseCSS}
  border-left: ${width / 2}px solid transparent;
  border-right: ${width / 2}px solid transparent;
  border-top: ${height}px solid ${color};`;
    
    case 'left':
      return `${baseCSS}
  border-top: ${height / 2}px solid transparent;
  border-bottom: ${height / 2}px solid transparent;
  border-right: ${width}px solid ${color};`;
    
    case 'right':
      return `${baseCSS}
  border-top: ${height / 2}px solid transparent;
  border-bottom: ${height / 2}px solid transparent;
  border-left: ${width}px solid ${color};`;
    
    default:
      return baseCSS;
  }
}

export function generateTriangleStyle(config: TriangleConfig): React.CSSProperties {
  const { direction, width, height, color } = config;
  
  const baseStyle: React.CSSProperties = {
    width: 0,
    height: 0,
    borderStyle: 'solid'
  };

  switch (direction) {
    case 'top':
      return {
        ...baseStyle,
        borderLeft: `${width / 2}px solid transparent`,
        borderRight: `${width / 2}px solid transparent`,
        borderBottom: `${height}px solid ${color}`
      };
    
    case 'bottom':
      return {
        ...baseStyle,
        borderLeft: `${width / 2}px solid transparent`,
        borderRight: `${width / 2}px solid transparent`,
        borderTop: `${height}px solid ${color}`
      };
    
    case 'left':
      return {
        ...baseStyle,
        borderTop: `${height / 2}px solid transparent`,
        borderBottom: `${height / 2}px solid transparent`,
        borderRight: `${width}px solid ${color}`
      };
    
    case 'right':
      return {
        ...baseStyle,
        borderTop: `${height / 2}px solid transparent`,
        borderBottom: `${height / 2}px solid transparent`,
        borderLeft: `${width}px solid ${color}`
      };
    
    default:
      return baseStyle;
  }
}

export function generateHTMLSnippet(className: string = 'triangle'): string {
  return `<div class="${className}"></div>`;
}

export function formatCSSForCopy(config: TriangleConfig, className: string = 'triangle'): string {
  const css = generateTriangleCSS(config);
  return `.${className} {${css}
}`;
}

export const TRIANGLE_PRESETS = {
  small: { width: 20, height: 15 },
  medium: { width: 40, height: 30 },
  large: { width: 60, height: 45 },
  tooltip: { width: 16, height: 8 },
  arrow: { width: 24, height: 12 },
  pointer: { width: 32, height: 24 }
};

export const DIRECTION_LABELS = {
  top: 'Top ↑',
  bottom: 'Bottom ↓',
  left: 'Left ←',
  right: 'Right →'
};