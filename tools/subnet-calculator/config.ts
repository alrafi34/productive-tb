import { siteConfig } from "@/config/site";

export const subnetCalculatorConfig = {
  slug: "subnet-calculator",
  name: "Subnet Calculator",
  description: "Calculate subnet mask, network address, broadcast address, usable host range, CIDR notation, and binary representation for any IPv4 address instantly.",
  category: "computer-science",
  icon: "🌐",
  free: true,
  seo: {
    title: "Free Subnet Calculator – Calculate CIDR, Network Address & Hosts Online",
    description: "Calculate subnet masks, CIDR notation, broadcast address, network range, and usable hosts instantly. Free online subnet calculator for IT professionals, students, and network engineers.",
    keywords: [
      "subnet calculator",
      "CIDR calculator",
      "IP subnet calculator",
      "network address calculator",
      "broadcast address calculator",
      "IPv4 subnet tool",
      "subnet mask calculator",
      "free subnet calculator",
      "online subnet calculator",
      "network range calculator",
      "usable hosts calculator",
      "wildcard mask calculator",
    ],
    openGraph: {
      title: "Free Subnet Calculator – Calculate CIDR, Network Address & Hosts Online",
      description: "Calculate subnet masks, CIDR notation, broadcast address, network range, and usable hosts instantly.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/subnet-calculator`,
    },
  },
};
