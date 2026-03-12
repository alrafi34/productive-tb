// Steganography Logic using LSB (Least Significant Bit)

export interface ImageMetadata {
  width: number;
  height: number;
  size: number;
  format: string;
  capacity: number;
}

export type EncodingStrength = "low" | "balanced" | "high";

// Convert string to binary
function stringToBinary(text: string): string {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}

// Convert binary to string
function binaryToString(binary: string): string {
  const bytes = binary.match(/.{1,8}/g) || [];
  return bytes
    .map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join('');
}

// Simple XOR encryption (for password protection)
function xorEncrypt(text: string, password: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ password.charCodeAt(i % password.length)
    );
  }
  return result;
}

// Calculate image capacity
export function calculateCapacity(width: number, height: number): number {
  const totalPixels = width * height;
  const bitsAvailable = totalPixels * 3; // RGB channels
  const bytesAvailable = Math.floor(bitsAvailable / 8);
  return bytesAvailable - 32; // Reserve 32 bytes for message length
}

// Get image metadata
export function getImageMetadata(img: HTMLImageElement): ImageMetadata {
  return {
    width: img.width,
    height: img.height,
    size: 0, // Will be set from file
    format: 'unknown',
    capacity: calculateCapacity(img.width, img.height)
  };
}

// Encode message into image
export function encodeMessage(
  canvas: HTMLCanvasElement,
  message: string,
  password?: string,
  strength: EncodingStrength = "balanced"
): HTMLCanvasElement {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Encrypt message if password provided
  const finalMessage = password ? xorEncrypt(message, password) : message;
  
  // Add message length header (32 bits)
  const messageLength = finalMessage.length;
  const lengthBinary = messageLength.toString(2).padStart(32, '0');
  
  // Convert message to binary
  const messageBinary = stringToBinary(finalMessage);
  const fullBinary = lengthBinary + messageBinary;

  // Calculate step size based on strength
  let step = 1;
  if (strength === "low") step = 1;
  else if (strength === "balanced") step = 2;
  else if (strength === "high") step = 3;

  // Encode binary into pixels
  let binaryIndex = 0;
  for (let i = 0; i < data.length && binaryIndex < fullBinary.length; i += 4 * step) {
    // Skip alpha channel, only use RGB
    for (let j = 0; j < 3 && binaryIndex < fullBinary.length; j++) {
      const pixelIndex = i + j;
      if (pixelIndex < data.length) {
        // Modify LSB
        const bit = parseInt(fullBinary[binaryIndex]);
        data[pixelIndex] = (data[pixelIndex] & 0xFE) | bit;
        binaryIndex++;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

// Decode message from image
export function decodeMessage(
  canvas: HTMLCanvasElement,
  password?: string,
  strength: EncodingStrength = "balanced"
): string {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Calculate step size based on strength
  let step = 1;
  if (strength === "low") step = 1;
  else if (strength === "balanced") step = 2;
  else if (strength === "high") step = 3;

  // Extract length (first 32 bits)
  let lengthBinary = '';
  let binaryIndex = 0;
  
  for (let i = 0; i < data.length && lengthBinary.length < 32; i += 4 * step) {
    for (let j = 0; j < 3 && lengthBinary.length < 32; j++) {
      const pixelIndex = i + j;
      if (pixelIndex < data.length) {
        lengthBinary += (data[pixelIndex] & 1).toString();
      }
    }
  }

  const messageLength = parseInt(lengthBinary, 2);
  
  if (messageLength <= 0 || messageLength > 1000000) {
    throw new Error('Invalid message length or no hidden message found');
  }

  // Extract message binary
  let messageBinary = '';
  const bitsNeeded = messageLength * 8;
  
  for (let i = 32 * step; i < data.length && messageBinary.length < bitsNeeded; i += 4 * step) {
    for (let j = 0; j < 3 && messageBinary.length < bitsNeeded; j++) {
      const pixelIndex = i + j;
      if (pixelIndex < data.length) {
        messageBinary += (data[pixelIndex] & 1).toString();
      }
    }
  }

  // Convert binary to string
  let message = binaryToString(messageBinary);

  // Decrypt if password provided
  if (password) {
    message = xorEncrypt(message, password);
  }

  return message;
}

// Create difference heatmap
export function createDifferenceMap(
  originalCanvas: HTMLCanvasElement,
  encodedCanvas: HTMLCanvasElement
): HTMLCanvasElement {
  const diffCanvas = document.createElement('canvas');
  diffCanvas.width = originalCanvas.width;
  diffCanvas.height = originalCanvas.height;
  
  const ctx = diffCanvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  const originalData = originalCanvas.getContext('2d')!.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
  const encodedData = encodedCanvas.getContext('2d')!.getImageData(0, 0, encodedCanvas.width, encodedCanvas.height);
  const diffData = ctx.createImageData(diffCanvas.width, diffCanvas.height);

  for (let i = 0; i < originalData.data.length; i += 4) {
    const rDiff = Math.abs(originalData.data[i] - encodedData.data[i]);
    const gDiff = Math.abs(originalData.data[i + 1] - encodedData.data[i + 1]);
    const bDiff = Math.abs(originalData.data[i + 2] - encodedData.data[i + 2]);
    
    const maxDiff = Math.max(rDiff, gDiff, bDiff);
    const intensity = maxDiff * 255; // Amplify differences

    diffData.data[i] = intensity;
    diffData.data[i + 1] = 0;
    diffData.data[i + 2] = 0;
    diffData.data[i + 3] = 255;
  }

  ctx.putImageData(diffData, 0, 0);
  return diffCanvas;
}

// Get binary visualization sample
export function getBinaryVisualization(
  canvas: HTMLCanvasElement,
  sampleSize: number = 5
): { pixel: string; bit: string; modified: string }[] {
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  const samples: { pixel: string; bit: string; modified: string }[] = [];
  
  for (let i = 0; i < Math.min(sampleSize * 3, data.length); i += 3) {
    const pixelValue = data[i];
    const binary = pixelValue.toString(2).padStart(8, '0');
    const lsb = binary[7];
    
    samples.push({
      pixel: binary,
      bit: lsb,
      modified: binary.substring(0, 7) + (lsb === '0' ? '1' : '0')
    });
  }
  
  return samples;
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Load image to canvas
export function loadImageToCanvas(file: File): Promise<{ canvas: HTMLCanvasElement; metadata: ImageMetadata }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        const metadata: ImageMetadata = {
          width: img.width,
          height: img.height,
          size: file.size,
          format: file.type,
          capacity: calculateCapacity(img.width, img.height)
        };
        
        resolve({ canvas, metadata });
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Download canvas as image
export function downloadCanvas(canvas: HTMLCanvasElement, filename: string, format: 'png' | 'webp' = 'png') {
  canvas.toBlob((blob) => {
    if (!blob) return;
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, `image/${format}`);
}
