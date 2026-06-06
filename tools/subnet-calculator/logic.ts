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
    // must be contiguous 1s
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
  return parts.every((p) => {
    const n = Number(p);
    return /^\d+$/.test(p) && n >= 0 && n <= 255;
  });
}

export function toBinary(ip: string): string {
  return ip
    .split(".")
    .map((o) => parseInt(o, 10).toString(2).padStart(8, "0"))
    .join(".");
}

export function detectIpType(ipInt: number): string {
  // Loopback: 127.0.0.0/8
  if ((ipInt & 0xff000000) >>> 0 === 0x7f000000) return "Loopback";
  // Link-local: 169.254.0.0/16
  if ((ipInt & 0xffff0000) >>> 0 === 0xa9fe0000) return "Link-Local";
  // Multicast: 224.0.0.0/4
  if ((ipInt & 0xf0000000) >>> 0 === 0xe0000000) return "Multicast";
  // Private: 10.0.0.0/8
  if ((ipInt & 0xff000000) >>> 0 === 0x0a000000) return "Private (Class A)";
  // Private: 172.16.0.0/12
  if ((ipInt & 0xfff00000) >>> 0 === 0xac100000) return "Private (Class B)";
  // Private: 192.168.0.0/16
  if ((ipInt & 0xffff0000) >>> 0 === 0xc0a80000) return "Private (Class C)";
  // Classful detection for public
  const first = ipInt >>> 24;
  if (first <= 127) return "Public (Class A)";
  if (first <= 191) return "Public (Class B)";
  if (first <= 223) return "Public (Class C)";
  return "Special";
}

export interface SubnetResult {
  ip: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  totalAddresses: number;
  usableHosts: number;
  binaryIp: string;
  binaryMask: string;
  binaryNetwork: string;
  ipType: string;
}

export function calculate(ip: string, cidr: number): SubnetResult {
  const ipInt = ipToInt(ip);
  const maskInt = subnetMaskFromCidr(cidr);
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const totalAddresses = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : totalAddresses - 2;
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
    totalAddresses,
    usableHosts,
    binaryIp: toBinary(ip),
    binaryMask: toBinary(intToIp(maskInt)),
    binaryNetwork: toBinary(intToIp(networkInt)),
    ipType: detectIpType(ipInt),
  };
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
  result: SubnetResult;
  timestamp: number;
}

const HISTORY_KEY = "subnet-calc-history";

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
