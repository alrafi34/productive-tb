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
    faq: [
      { q: "What is a subnet calculator?", a: "A subnet calculator is a tool that takes an IPv4 address and CIDR prefix and computes the network address, broadcast address, usable host range, subnet mask, wildcard mask, and number of hosts. It eliminates manual bitwise calculations for network engineers and students." },
      { q: "What is CIDR notation?", a: "CIDR (Classless Inter-Domain Routing) notation represents an IP address and its associated network prefix. For example, 192.168.1.0/24 means the first 24 bits are the network portion, leaving 8 bits for host addresses (256 total, 254 usable)." },
      { q: "How is the network address calculated?", a: "The network address is computed by performing a bitwise AND between the IP address and the subnet mask. For 192.168.1.100 with mask 255.255.255.0, the result is 192.168.1.0." },
      { q: "How many usable hosts are in a /24 subnet?", a: "A /24 subnet has 256 total addresses (2^8). Subtracting the network address and broadcast address gives 254 usable hosts." },
      { q: "What is a wildcard mask?", a: "A wildcard mask is the inverse of the subnet mask. It's used in access control lists (ACLs) and routing protocols. For a /24 subnet mask of 255.255.255.0, the wildcard mask is 0.0.0.255." },
      { q: "Who should use this tool?", a: "Network engineers, system administrators, DevOps engineers, cloud engineers, cybersecurity professionals, and students studying for CCNA, Network+, AWS, or Azure certifications." },
    ],
  },
};
