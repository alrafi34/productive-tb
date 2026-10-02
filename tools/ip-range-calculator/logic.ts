export function ipToInt(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

export function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

export function subnetMaskFromCidr(cidr: number): number {
  return cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
}

export function cidrFromMask(mask: string): number | null {
  try {
    const n = ipToInt(mask);
    const bin = n.toString(2).padStart(32, "0");
    if (!/^1*0*$/.test(bin)) return null;
    return bin.split("").filter((b) => b === "1").length;
  } catch {
    return null;
  }
}

export function isValidIp(ip: string): boolean {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => /^\d+$/.test(p) && Number(p) >= 0 && Number(p) <= 255);
}

export function toBinary(ip: string): string {
  return ip
    .split(".")
    .map((o) => parseInt(o, 10).toString(2).padStart(8, "0"))
    .join(".");
}

export function detectIpType(ipInt: number): string {
  if ((ipInt & 0xff000000) >>> 0 === 0x7f000000) return "Loopback";
  if ((ipInt & 0xffff0000) >>> 0 === 0xa9fe0000) return "Link-Local";
  if ((ipInt & 0xf0000000) >>> 0 === 0xe0000000) return "Multicast";
  if ((ipInt & 0xff000000) >>> 0 === 0x0a000000) return "Private (Class A)";
  if ((ipInt & 0xfff00000) >>> 0 === 0xac100000) return "Private (Class B)";
  if ((ipInt & 0xffff0000) >>> 0 === 0xc0a80000) return "Private (Class C)";
  const first = ipInt >>> 24;
  if (first <= 127) return "Public (Class A)";
  if (first <= 191) return "Public (Class B)";
  if (first <= 223) return "Public (Class C)";
  return "Special / Reserved";
}

export function detectIpClass(ipInt: number): string {
  const first = ipInt >>> 24;
  if (first <= 127) return "Class A";
  if (first <= 191) return "Class B";
  if (first <= 223) return "Class C";
  if (first <= 239) return "Class D (Multicast)";
  return "Class E (Reserved)";
}

export interface IpRangeResult {
  ip: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  binaryIp: string;
  binaryMask: string;
  binaryNetwork: string;
  ipType: string;
  ipClass: string;
}

export function calculate(ip: string, cidr: number): IpRangeResult {
  const ipInt = ipToInt(ip);
  const maskInt = subnetMaskFromCidr(cidr);
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : totalHosts - 2;
  const firstHostInt = cidr >= 31 ? networkInt : networkInt + 1;
  const lastHostInt = cidr >= 31 ? broadcastInt : broadcastInt - 1;

  return {
    ip,
    cidr,
    subnetMask: intToIp(maskInt),
    wildcardMask: intToIp(~maskInt >>> 0),
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    firstHost: intToIp(firstHostInt),
    lastHost: intToIp(lastHostInt),
    totalHosts,
    usableHosts,
    binaryIp: toBinary(ip),
    binaryMask: toBinary(intToIp(maskInt)),
    binaryNetwork: toBinary(intToIp(networkInt)),
    ipType: detectIpType(ipInt),
    ipClass: detectIpClass(ipInt),
  };
}

/* Smallest set of CIDR blocks that exactly covers start…end (inclusive):
   take the largest aligned block that starts at the current address and
   does not run past the end, then move on. */
export function rangeToCidrs(startIp: string, endIp: string): string[] {
  let start = ipToInt(startIp);
  const end = ipToInt(endIp);
  if (start > end) return [];
  const blocks: string[] = [];
  while (start <= end) {
    let size = 32;
    while (size > 0) {
      const bigger = size - 1;
      const blockSize = 2 ** (32 - bigger);
      if (start % blockSize !== 0 || start + blockSize - 1 > end) break;
      size = bigger;
    }
    blocks.push(`${intToIp(start)}/${size}`);
    start += 2 ** (32 - size);
  }
  return blocks;
}

export interface Subnet {
  network: string;
  firstHost: string;
  lastHost: string;
  broadcast: string;
  cidr: number;
}

/* Split the network containing ip/cidr into equal subnets of newCidr. */
export function splitNetwork(ip: string, cidr: number, newCidr: number, limit = 256): Subnet[] {
  if (newCidr < cidr || newCidr > 32) return [];
  const network = (ipToInt(ip) & subnetMaskFromCidr(cidr)) >>> 0;
  const size = 2 ** (32 - newCidr);
  const count = Math.min(2 ** (newCidr - cidr), limit);
  return Array.from({ length: count }, (_, i) => {
    const start = network + i * size;
    const end = start + size - 1;
    const tiny = newCidr >= 31;
    return {
      network: intToIp(start),
      firstHost: intToIp(tiny ? start : start + 1),
      lastHost: intToIp(tiny ? end : end - 1),
      broadcast: intToIp(end),
      cidr: newCidr,
    };
  });
}

export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export interface HistoryEntry {
  id: string;
  ip: string;
  cidr: number;
  result: IpRangeResult;
  timestamp: number;
}

const HISTORY_KEY = "ip-range-calc-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Date.now().toString(36), timestamp: Date.now() };
  history.unshift(newEntry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
