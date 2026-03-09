import { DuotoneOptions, ProcessedImage, DuotonePreset } from "./types";

export const DUOTONE_PRESETS: DuotonePreset[] = [
  { name: "Teal & Orange", darkColor: "#008080", lightColor: "#FFA500" },
  { name: "Purple & Yellow", darkColor: "#800080", lightColor: "#FFD700" },
  { name: "Pink & Blue", darkColor: "#FF1493", lightColor: "#00BFFF" },
  { name: "Red & Cyan", darkColor: "#DC143C", lightColor: "#00FFFF" },
  { name: "Green & Magenta", darkColor: "#228B22", lightColor: "#FF00FF" },
  { name: "Navy & Peach", darkColor: "#000080", lightColor: "#FFDAB9" },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function applyDuotone(
  imageData: ImageData,
  options: DuotoneOptions
): ImageData {
  const { darkColor, lightColor, intensity, invert } = options;
  const data = imageData.data;

  const dark = hexToRgb(darkColor);
  const light = hexToRgb(lightColor);

  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const normalizedGray = gray / 255;
    const t = invert ? 1 - normalizedGray : normalizedGray;
    const blendFactor = intensity / 100;

    const duotoneR = dark.r + (light.r - dark.r) * t;
    const duotoneG = dark.g + (light.g - dark.g) * t;
    const duotoneB = dark.b + (light.b - dark.b) * t;

    data[i] = data[i] * (1 - blendFactor) + duotoneR * blendFactor;
    data[i + 1] = data[i + 1] * (1 - blendFactor) + duotoneG * blendFactor;
    data[i + 2] = data[i + 2] * (1 - blendFactor) + duotoneB * blendFactor;
  }

  return imageData;
}

export async function processImage(
  file: File,
  options: DuotoneOptions
): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (options.maxWidth && width > options.maxWidth) {
          height = (height * options.maxWidth) / width;
          width = options.maxWidth;
        }
        if (options.maxHeight && height > options.maxHeight) {
          width = (width * options.maxHeight) / height;
          height = options.maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const processed = applyDuotone(imageData, options);
        ctx.putImageData(processed, 0, 0);

        resolve({
          url: canvas.toDataURL("image/png"),
          name: file.name,
          width,
          height,
        });
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export async function processBatch(
  files: File[],
  options: DuotoneOptions
): Promise<ProcessedImage[]> {
  return Promise.all(files.map((file) => processImage(file, options)));
}
