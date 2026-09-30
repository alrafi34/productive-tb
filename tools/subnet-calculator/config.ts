import { siteConfig } from "@/config/site";

export const subnetCalculatorConfig = {
  slug: "subnet-calculator",
  name: "Subnet Calculator",
  description: "Calculate subnet mask, network address, broadcast address, usable host range, CIDR notation, and binary representation for any IPv4 address instantly.",
  category: "computer-science",
  icon: "🌐",
  free: true,
  seo: {
    title: "Subnet Calculator – CIDR, Network Address & Hosts",
    description: "Calculate the subnet mask, CIDR notation, network and broadcast addresses, host range and number of usable hosts for any IPv4 subnet.",
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
      title: "Subnet Calculator – CIDR, Network Address & Hosts",
      description: "Calculate the subnet mask, CIDR notation, network and broadcast addresses, host range and number of usable hosts for any IPv4 subnet.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/subnet-calculator`,
    },
  },
};
