import { siteConfig } from "@/config/site";

export const ipRangeCalculatorConfig = {
  slug: "ip-range-calculator",
  name: "IP Range Calculator",
  description: "Calculate usable IP range, network address, broadcast address, subnet mask, CIDR notation, total hosts, usable hosts, wildcard mask, and IP class from any IPv4 address and subnet.",
  category: "computer-science",
  icon: "🌐",
  free: true,
  seo: {
    title: "IP Range Calculator – Subnet, CIDR & Host Range",
    description: "Find the network and broadcast addresses, host range, usable IPs and wildcard mask from a CIDR block or subnet mask.",
    keywords: [
      "ip range calculator",
      "subnet calculator",
      "cidr calculator",
      "network calculator",
      "ipv4 subnet calculator",
      "ip subnet tool",
      "broadcast calculator",
      "host range calculator",
      "wildcard mask calculator",
      "network address calculator",
      "usable hosts calculator",
      "free ip calculator",
    ],
    openGraph: {
      title: "IP Range Calculator – Subnet, CIDR & Host Range",
      description: "Find the network and broadcast addresses, host range, usable IPs and wildcard mask from a CIDR block or subnet mask.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/ip-range-calculator`,
    },
    howToSteps: [
      { name: "Enter an IPv4 address", text: "Type any IPv4 address, such as 192.168.1.10, or click a preset for a common network." },
      { name: "Set the CIDR prefix or subnet mask", text: "Drag the CIDR slider (/0 to /32) or type a subnet mask such as 255.255.255.0; each updates the other." },
      { name: "Read the results", text: "See the network and broadcast addresses, first and last usable host, number of usable hosts, wildcard mask, IP class and whether the address is private, public, loopback or multicast." },
      { name: "Copy, share or export", text: "Copy the summary, share the URL (it carries the ip and cidr), or export the result as TXT or JSON." },
    ],
    faq: [
      { q: "What is an IP range calculator?", a: "An IP range calculator takes an IPv4 address and CIDR prefix (or subnet mask) and computes the full network information: network address, broadcast address, usable host range, total hosts, subnet mask, wildcard mask, and IP class. It eliminates manual binary math for network engineers and students." },
      { q: "How is the host range calculated?", a: "The network address is the first address in the subnet (IP AND mask), the broadcast is the last (network OR inverted mask). Usable hosts are all addresses between them (first host = network + 1, last host = broadcast - 1). A /24 gives 254 usable hosts out of 256 total." },
      { q: "What is the wildcard mask?", a: "The wildcard mask is the bitwise inverse of the subnet mask. It's used in ACLs and routing protocols. For a /24 subnet (255.255.255.0), the wildcard mask is 0.0.0.255." },
      { q: "What does CIDR mean?", a: "CIDR (Classless Inter-Domain Routing) notation represents an IP address and its associated network prefix. For example, 192.168.1.0/24 means the first 24 bits are network bits, leaving 8 bits for host addresses." },
      { q: "How are /31 and /32 subnets handled?", a: "A /31 subnet has 2 addresses, both usable for point-to-point links (RFC 3021). A /32 is a host route with a single address. This calculator handles both cases correctly." },
      { q: "How does the shareable URL work?", a: "The calculator automatically updates the browser URL with ?ip=x.x.x.x&cidr=xx as you type. You can copy and share this URL to pre-fill the calculator for anyone." },
    ],
  },
};
