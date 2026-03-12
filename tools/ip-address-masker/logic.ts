export interface IPCalculation {
  ip: string;
  cidr: number;
  subnetMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  wildcardMask: string;
  binarySubnetMask: string;
  ipClass: string;
}

// Validate IPv4 address
export function isValidIPv4(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  return parts.every(part => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
  });
}

// Convert IP to 32-bit integer
export function ipToInt(ip: string): number {
  const parts = ip.split('.').map(Number);
  return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
}

// Convert 32-bit integer to IP
export function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255
  ].join('.');
}

// Convert CIDR to subnet mask
export function cidrToMask(cidr: number): string {
  const mask = ~((1 << (32 - cidr)) - 1);
  return intToIp(mask >>> 0);
}

// Convert subnet mask to CIDR
export function maskToCidr(mask: string): number {
  const maskInt = ipToInt(mask);
  return 32 - Math.log2((~maskInt >>> 0) + 1);
}

// Get IP class
export function getIPClass(ip: string): string {
  const firstOctet = parseInt(ip.split('.')[0], 10);
  if (firstOctet >= 1 && firstOctet <= 126) return 'A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
  if (firstOctet >= 240 && firstOctet <= 255) return 'E (Reserved)';
  return 'Unknown';
}

// Convert IP to binary
export function ipToBinary(ip: string): string {
  return ip.split('.')
    .map(octet => parseInt(octet, 10).toString(2).padStart(8, '0'))
    .join('.');
}

// Calculate wildcard mask
export function getWildcardMask(subnetMask: string): string {
  const maskInt = ipToInt(subnetMask);
  const wildcardInt = ~maskInt >>> 0;
  return intToIp(wildcardInt);
}

// Calculate all IP information
export function calculateIPInfo(ip: string, cidr: number): IPCalculation {
  const ipInt = ipToInt(ip);
  const subnetMask = cidrToMask(cidr);
  const maskInt = ipToInt(subnetMask);
  
  const networkInt = ipInt & maskInt;
  const broadcastInt = networkInt | (~maskInt >>> 0);
  
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr === 32 ? 1 : (cidr === 31 ? 2 : totalHosts - 2);
  
  const firstHostInt = cidr === 32 ? networkInt : (cidr === 31 ? networkInt : networkInt + 1);
  const lastHostInt = cidr === 32 ? networkInt : (cidr === 31 ? broadcastInt : broadcastInt - 1);
  
  return {
    ip,
    cidr,
    subnetMask,
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    firstHost: intToIp(firstHostInt),
    lastHost: intToIp(lastHostInt),
    totalHosts,
    usableHosts,
    wildcardMask: getWildcardMask(subnetMask),
    binarySubnetMask: ipToBinary(subnetMask),
    ipClass: getIPClass(ip)
  };
}

// Calculate required CIDR for number of hosts
export function calculateCIDRForHosts(hosts: number): number {
  const totalNeeded = hosts + 2; // Add network and broadcast
  const bits = Math.ceil(Math.log2(totalNeeded));
  return 32 - bits;
}

// Generate list of IPs in range (for small subnets only)
export function generateIPList(networkAddress: string, cidr: number): string[] {
  const maxIPs = 256; // Limit to prevent browser freeze
  const totalHosts = Math.pow(2, 32 - cidr);
  
  if (totalHosts > maxIPs) {
    return [];
  }
  
  const networkInt = ipToInt(networkAddress);
  const ips: string[] = [];
  
  for (let i = 0; i < totalHosts; i++) {
    ips.push(intToIp(networkInt + i));
  }
  
  return ips;
}

// Generate random IP for practice
export function generateRandomIP(): string {
  return [
    Math.floor(Math.random() * 223) + 1, // Avoid class D and E
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    0
  ].join('.');
}

// Generate random CIDR
export function generateRandomCIDR(): number {
  const commonCIDRs = [8, 16, 24, 25, 26, 27, 28, 29, 30];
  return commonCIDRs[Math.floor(Math.random() * commonCIDRs.length)];
}

// Parse CIDR notation
export function parseCIDR(cidrNotation: string): { ip: string; cidr: number } | null {
  const parts = cidrNotation.split('/');
  if (parts.length !== 2) return null;
  
  const ip = parts[0].trim();
  const cidr = parseInt(parts[1].trim(), 10);
  
  if (!isValidIPv4(ip) || isNaN(cidr) || cidr < 0 || cidr > 32) {
    return null;
  }
  
  return { ip, cidr };
}

// Validate subnet mask
export function isValidSubnetMask(mask: string): boolean {
  if (!isValidIPv4(mask)) return false;
  
  const maskInt = ipToInt(mask);
  const binary = maskInt.toString(2).padStart(32, '0');
  
  // Valid subnet mask has all 1s followed by all 0s
  const match = binary.match(/^(1*)(0*)$/);
  return match !== null;
}
