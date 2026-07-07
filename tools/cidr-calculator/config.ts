import { siteConfig } from "@/config/site";

export const cidrCalculatorConfig = {
  slug: "cidr-calculator",
  name: "CIDR Calculator",
  description: "Calculate CIDR notation details including network address, broadcast, subnet mask, wildcard mask, usable hosts, IP range, and binary representation for any IPv4 address instantly.",
  category: "computer-science",
  icon: "🌐",
  free: true,
  seo: {
    title: "Free CIDR Calculator Online – IP Subnet Calculator & CIDR Tool",
    description: "Calculate CIDR notation, subnet masks, IP ranges, broadcast addresses, and usable hosts instantly. Free online CIDR calculator for networking, DevOps, cloud, and cybersecurity.",
    keywords: [
      "CIDR calculator",
      "subnet calculator",
      "IP subnet calculator",
      "CIDR notation calculator",
      "IP range calculator",
      "subnet mask calculator",
      "network calculator",
      "IPv4 CIDR tool",
      "broadcast address calculator",
      "wildcard mask calculator",
      "network address calculator",
      "usable hosts calculator",
      "free CIDR tool",
      "online subnet tool",
    ],
    openGraph: {
      title: "Free CIDR Calculator Online – IP Subnet Calculator & CIDR Tool",
      description: "Calculate CIDR notation, subnet masks, IP ranges, broadcast addresses, and usable hosts instantly. Free online CIDR calculator for networking, DevOps, cloud, and cybersecurity.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/cidr-calculator`,
    },
  },
};
