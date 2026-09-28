import QRCodeLib from 'qrcode';
import { QROptions, QRHistory, WiFiConfig } from "./types";

// Generate QR code and render to canvas using the qrcode library
/* Draws the QR code; returns an error message when it cannot be drawn
   (text too long for the chosen error correction level, unreadable colors). */
export async function generateQRCode(options: QROptions, canvas: HTMLCanvasElement): Promise<string | null> {
  const { text, size, errorCorrectionLevel, foregroundColor, backgroundColor } = options;
  
  if (!text.trim()) return null;
  if (contrastRatio(foregroundColor, backgroundColor) < 3) {
    return 'The colors are too similar for scanners to read. Use a dark code on a light background.';
  }
  
  try {
    await QRCodeLib.toCanvas(canvas, text, {
      width: size,
      // ISO/IEC 18004 asks for a quiet zone of 4 modules around the code
      margin: 4,
      errorCorrectionLevel: errorCorrectionLevel,
      color: {
        dark: foregroundColor,
        light: backgroundColor
      }
    });
    return null;
  } catch {
    return 'This text is too long for a QR code at this error correction level. Shorten it or choose a lower level (L holds the most).';
  }
}

/* WCAG contrast ratio of two #rrggbb colors (1 to 21). */
export function contrastRatio(a: string, b: string): number {
  const lum = (hex: string) => {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
    if (!m) return 0.5;
    const n = parseInt(m[1], 16);
    const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Download QR code as PNG
export function downloadQRCode(canvas: HTMLCanvasElement, filename: string = 'qr-code'): void {
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Copy QR code image to clipboard
export async function copyQRCodeToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/png');
    });
    
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
    
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// Detect input type
export function detectInputType(text: string): string {
  const trimmed = text.trim().toLowerCase();
  
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return 'url';
  }
  if (trimmed.startsWith('mailto:')) {
    return 'email';
  }
  if (trimmed.startsWith('tel:') || /^\+?[\d\s\-\(\)]+$/.test(trimmed)) {
    return 'phone';
  }
  if (trimmed.startsWith('wifi:')) {
    return 'wifi';
  }
  if (trimmed.includes('@') && trimmed.includes('.')) {
    return 'email';
  }
  
  return 'text';
}

// Generate WiFi QR code string
// \ ; , : and " have a special meaning in the WIFI: payload and must be escaped
const escapeWifi = (value: string) => value.replace(/([\\;,:"])/g, '\\$1');

export function generateWiFiString(config: WiFiConfig): string {
  const { ssid, password, security, hidden } = config;
  return `WIFI:T:${security};S:${escapeWifi(ssid)};P:${escapeWifi(password)};H:${hidden ? 'true' : 'false'};;`;
}

// Parse WiFi QR code string
export function parseWiFiString(wifiString: string): WiFiConfig | null {
  const match = wifiString.match(/WIFI:T:([^;]*);S:([^;]*);P:([^;]*);H:([^;]*);/);
  if (!match) return null;
  
  return {
    security: match[1] as 'WPA' | 'WEP' | 'nopass',
    ssid: match[2],
    password: match[3],
    hidden: match[4] === 'true'
  };
}

// Validate input
export function validateInput(text: string): { valid: boolean; message?: string } {
  if (!text.trim()) {
    return { valid: false, message: 'Please enter text or a URL to generate a QR code.' };
  }
  
  if (text.length > 2000) {
    return { valid: false, message: 'Text is too long. Maximum 2000 characters.' };
  }
  
  return { valid: true };
}

// Local storage helpers
const HISTORY_KEY = 'qr-generator-history';
const MAX_HISTORY = 10;

export function saveToHistory(options: QROptions): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const newItem: QRHistory = {
    id: crypto.randomUUID(),
    text: options.text,
    timestamp: Date.now(),
    options
  };
  
  // Remove duplicates
  const filtered = history.filter(item => item.text !== options.text);
  filtered.unshift(newItem);
  
  // Keep only last MAX_HISTORY items
  const trimmed = filtered.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): QRHistory[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Get example text for presets
export function getPresetExample(preset: string): string {
  switch (preset) {
    case 'url':
      return 'https://example.com';
    case 'email':
      return 'mailto:contact@example.com';
    case 'phone':
      return 'tel:+1234567890';
    case 'sms':
      return 'sms:+1234567890?body=Hello';
    case 'wifi':
      return 'WIFI:T:WPA;S:MyWiFi;P:password123;H:false;;';
    default:
      return 'Hello from Productive Toolbox!';
  }
}
