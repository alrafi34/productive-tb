import { AsciiConfig, AsciiHistory, CHARACTER_SETS, STYLES } from "./types";

const HISTORY_KEY = "ascii-art-history";
const MAX_HISTORY = 10;

export function brightnessToChar(brightness: number, charset: string): string {
  const index = Math.floor((brightness / 255) * (charset.length - 1));
  return charset[Math.max(0, Math.min(index, charset.length - 1))];
}

export function getGrayscale(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function textToAscii(text: string, width: number, charset: string): string {
  if (!text.trim()) return "";

  const lines = text.split("\n");
  const result: string[] = [];

  for (const line of lines) {
    if (line.length === 0) {
      result.push("");
      continue;
    }

    const charWidth = Math.max(1, Math.floor(width / line.length));
    let asciiLine = "";

    for (const char of line) {
      const charCode = char.charCodeAt(0);
      const brightness = (charCode % 256);
      asciiLine += brightnessToChar(brightness, charset);
    }

    result.push(asciiLine);
  }

  return result.join("\n");
}

export function imageToAscii(
  imageData: ImageData,
  width: number,
  charset: string
): string {
  const { data, width: imgWidth, height: imgHeight } = imageData;
  const aspectRatio = 0.55;
  const newHeight = Math.floor(width * (imgHeight / imgWidth) * aspectRatio);

  const result: string[] = [];

  for (let y = 0; y < newHeight; y++) {
    let line = "";
    for (let x = 0; x < width; x++) {
      const srcX = Math.floor((x / width) * imgWidth);
      const srcY = Math.floor((y / newHeight) * imgHeight);
      const pixelIndex = (srcY * imgWidth + srcX) * 4;

      const r = data[pixelIndex];
      const g = data[pixelIndex + 1];
      const b = data[pixelIndex + 2];

      const brightness = getGrayscale(r, g, b);
      line += brightnessToChar(brightness, charset);
    }
    result.push(line);
  }

  return result.join("\n");
}

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function getImageData(img: HTMLImageElement, maxWidth: number): ImageData {
  const canvas = document.createElement("canvas");
  const aspectRatio = img.height / img.width;
  canvas.width = maxWidth;
  canvas.height = Math.floor(maxWidth * aspectRatio);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

export function saveToHistory(config: AsciiConfig, output: string): void {
  const history = getHistory();
  const newItem: AsciiHistory = {
    id: Date.now(),
    config,
    output,
    timestamp: Date.now(),
  };

  history.unshift(newItem);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): AsciiHistory[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function downloadAsText(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadAsPNG(content: string, filename: string): void {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const fontSize = 10;
  const lineHeight = fontSize + 2;
  const lines = content.split("\n");
  const maxWidth = Math.max(...lines.map((l) => l.length));

  canvas.width = maxWidth * (fontSize * 0.6);
  canvas.height = lines.length * lineHeight;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff00";
  ctx.font = `${fontSize}px 'Courier New', monospace`;

  lines.forEach((line, i) => {
    ctx.fillText(line, 5, (i + 1) * lineHeight - 2);
  });

  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
