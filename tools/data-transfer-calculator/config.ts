import { siteConfig } from "@/config/site";

export const dataTransferCalculatorConfig = {
  slug: "data-transfer-calculator",
  name: "Data Transfer Calculator",
  description: "Calculate how long it will take to transfer data based on file size and network speed. Supports downloads, uploads, backups, cloud migrations, and enterprise data transfers with real-time results.",
  category: "computer-science",
  icon: "⏱️",
  free: true,
  seo: {
    title: "Data Transfer Calculator – Upload & Download Time",
    description: "Estimate how long an upload, download or backup takes from file size and connection speed, in Mbps, Gbps or MB/s and GB or TB.",
    keywords: [
      "data transfer calculator",
      "download time calculator",
      "upload speed calculator",
      "file transfer time calculator",
      "internet speed calculator",
      "transfer duration calculator",
      "GB to Mbps calculator",
      "bandwidth calculator",
      "network transfer time",
      "cloud upload time calculator",
      "backup duration calculator",
      "transfer speed estimator",
    ],
    openGraph: {
      title: "Data Transfer Calculator – Upload & Download Time",
      description: "Estimate how long an upload, download or backup takes from file size and connection speed, in Mbps, Gbps or MB/s and GB or TB.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/data-transfer-calculator`,
    },
    faq: [
      { q: "How is transfer time calculated?", a: "Transfer Time = Data Size (bits) ÷ Effective Speed (bps). The effective speed is your stated speed reduced by the efficiency loss percentage to simulate real-world conditions like TCP overhead, retransmissions, and network congestion." },
      { q: "What is efficiency loss and why does it matter?", a: "Theoretical speed is rarely achieved in practice. Protocol overhead (TCP/IP headers), packet retransmissions, network congestion, server throttling, and hardware limitations typically reduce real throughput by 5–20%. The default 10% loss gives a realistic estimate." },
      { q: "Why is Mbps different from MB/s?", a: "Mbps means megabits per second; MB/s means megabytes per second. Since 1 byte = 8 bits, a 100 Mbps connection transfers at approximately 12.5 MB/s. ISPs advertise in Mbps; file sizes are measured in MB/GB. This calculator converts everything automatically." },
      { q: "What is the difference between KB and Kbps?", a: "KB (kilobytes) is a storage unit for file sizes using binary multiples (1 KB = 1,024 bytes). Kbps (kilobits per second) is a network speed unit using decimal multiples (1 Kbps = 1,000 bits/s). The calculator handles both correctly." },
      { q: "Can I use this for cloud backup time estimates?", a: "Yes. Select 'Cloud Backup' as the transfer type, enter your backup size (e.g. 2 TB), and set your upload speed (typically much slower than download). Increase the efficiency loss to 15–25% to account for cloud storage API overhead." },
      { q: "Why does the URL update automatically?", a: "The calculator encodes your inputs into the browser URL so you can bookmark or share a specific calculation. Anyone opening the link will see the same pre-filled values." },
    ],
  },
};
