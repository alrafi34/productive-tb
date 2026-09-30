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
  },
};
