export const toolConfig = {
  slug: "ip-address-masker",
  name: "IP Address Masker & CIDR Calculator",
  description: "Convert IP addresses to CIDR notation, calculate subnet masks, and practice subnetting with interactive exercises",
  category: "developer",
  icon: "🌐",
  free: true,
  backend: false,
  seo: {
    title: "IP Address Masker & CIDR Calculator – Subnet Practice",
    description: "Convert IP addresses to CIDR notation, work out network ranges and practice subnetting exercises. Useful for networking students and IT staff.",
    keywords: [
      "ip address masker",
      "cidr calculator",
      "subnet calculator",
      "ip to cidr converter",
      "network range calculator",
      "subnet mask calculator",
      "cidr practice tool",
      "subnetting exercises",
      "ip address calculator",
      "network calculator",
      "cidr notation converter",
      "subnet practice",
      "ip range calculator",
      "broadcast address calculator",
      "network address calculator"
    ],
    openGraph: {
      title: "IP Address Masker & CIDR Calculator – Subnet Practice",
      description: "Convert IP addresses to CIDR notation, work out network ranges and practice subnetting exercises. Useful for networking students and IT staff.",
      type: "website",
      url: "/ip-address-masker"
    },
    faq: [
      { q: "What is CIDR notation?", a: "CIDR (Classless Inter-Domain Routing) notation is a compact representation of an IP address and its associated network mask. For example, 192.168.1.0/24 means the IP address 192.168.1.0 with a subnet mask of 255.255.255.0, providing 256 total addresses." },
      { q: "How do I calculate the number of hosts in a subnet?", a: "The number of usable hosts in a subnet is calculated as 2^(32-CIDR) - 2. We subtract 2 because the network address and broadcast address cannot be assigned to hosts. For example, a /24 network has 2^8 - 2 = 254 usable hosts." },
      { q: "What is the difference between network address and broadcast address?", a: "The network address is the first IP in a subnet and identifies the network itself. The broadcast address is the last IP and is used to send data to all hosts in the network. Neither can be assigned to individual devices. All IPs between these are usable host addresses." },
      { q: "How does the practice mode help me learn subnetting?", a: "Practice mode generates random IP addresses and subnet masks, then asks you to convert them to CIDR notation. You get instant feedback on your answers with explanations, helping you master subnet calculations through repetition and immediate correction." },
      { q: "Can I process multiple IP addresses at once?", a: "Yes! The batch processing mode allows you to enter multiple IP addresses with CIDR notation (one per line) and calculate all network information simultaneously. You can then copy all results at once for documentation or network planning." },
      { q: "What is a wildcard mask and how is it used?", a: "A wildcard mask is the inverse of a subnet mask and is commonly used in access control lists (ACLs) and routing protocols. For example, if the subnet mask is 255.255.255.0, the wildcard mask is 0.0.0.255. It indicates which bits should be ignored when matching addresses." },
    ],
  },
  features: [
    "IP to CIDR conversion",
    "Subnet mask calculator",
    "Network range calculation",
    "Interactive practice mode",
    "Batch IP processing",
    "Visual IP range display"
  ]
};
