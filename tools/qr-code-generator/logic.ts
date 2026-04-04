import QRCodeLib from 'qrcode';
import { QROptions, QRHistory, WiFiConfig } from "./types";

// Generate QR code and render to canvas using the qrcode library
export async function generateQRCode(options: QROptions, canvas: HTMLCanvasElement): Promise<void> {
  const { text, size, errorCorrectionLevel, foregroundColor, backgroundColor } = options;
  
  if (!text.trim()) return;
  
  try {
    // Generate QR code to canvas
    await QRCodeLib.toCanvas(canvas, text, {
      width: size,
      margin: 1,
      errorCorrectionLevel: errorCorrectionLevel,
      color: {
        dark: foregroundColor,
        light: backgroundColor
      }
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
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
export function generateWiFiString(config: WiFiConfig): string {
  const { ssid, password, security, hidden } = config;
  return `WIFI:T:${security};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
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
