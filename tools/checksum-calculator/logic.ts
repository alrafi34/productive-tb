const makeCRCTable = () => {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  return crcTable;
};

const crcTable = makeCRCTable();

export function crc32(buffer: ArrayBuffer): string {
  const uint8array = new Uint8Array(buffer);
  let crc = 0 ^ (-1);
  for (let i = 0; i < uint8array.byteLength; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ uint8array[i]) & 0xFF];
  }
  return ((crc ^ (-1)) >>> 0).toString(16).padStart(8, '0').toUpperCase();
}

export async function calculateHash(buffer: ArrayBuffer, algorithm: string): Promise<string> {
  if (algorithm === 'CRC32') {
    return crc32(buffer);
  }
  
  let algoName = 'SHA-1';
  if (algorithm === 'SHA-256') algoName = 'SHA-256';

  const hashBuffer = await crypto.subtle.digest(algoName, buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
