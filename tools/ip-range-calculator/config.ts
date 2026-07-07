import { siteConfig } from "@/config/site";

export const ipRangeCalculatorConfig = {
  slug: "ip-range-calculator",
  name: "IP Range Calculator",
  description: "Calculate usable IP range, network address, broadcast address, subnet mask, CIDR notation, total hosts, usable hosts, wildcard mask, and IP class from any IPv4 address and subnet.",
  category: "computer-science",
  icon: "🌐",
  free: true,
  seo: {
    title: "Free IP Range Calculator – Calculate Subnet, CIDR & Host Range Online",
    description: "Calculate IP ranges instantly using CIDR or subnet mask. Find network address, broadcast address, host range, usable IPs, wildcard mask, and subnet details online for free.",
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
      title: "Free IP Range Calculator – Calculate Subnet, CIDR & Host Range Online",
      description: "Calculate IP ranges instantly using CIDR or subnet mask. Find network address, broadcast address, host range, usable IPs, wildcard mask, and subnet details online for free.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/ip-range-calculator`,
    },
  },
};
