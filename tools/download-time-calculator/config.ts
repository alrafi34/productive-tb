import { siteConfig } from "@/config/site";

export const downloadTimeCalculatorConfig = {
  slug: "download-time-calculator",
  name: "Download Time Calculator",
  description: "Estimate how long a file download will take based on file size and internet speed. Supports KB, MB, GB, TB and Kbps, Mbps, Gbps with real-world efficiency presets.",
  category: "computer-science",
  icon: "⏬",
  color: "#058554",
  featured: true,
  keywords: [
    "download time calculator",
    "internet speed download estimator",
    "estimate download time",
    "file download calculator",
    "how long will a download take",
    "download speed estimator",
    "download time estimator",
  ],
  seo: {
    title: "Download Time Calculator – How Long Will It Take?",
    description: "Calculate how long a download takes from the file size and your internet speed, for games, movies, software and other large files.",
    keywords: "download time calculator, internet speed calculator, estimate download time, download speed estimator, file download calculator, how long will a download take",
    og: {
      title: "Download Time Calculator – How Long Will It Take?",
      description: "Calculate how long a download takes from the file size and your internet speed, for games, movies, software and other large files.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/download-time-calculator`,
    },
    faq: [
      { q: "How long does it take to download 50 GB at 100 Mbps?", a: "About 1 hour 20 minutes at 90% efficiency, or 1 hour 12 minutes at the full theoretical 100 Mbps. The calculator counts 1 GB as 1,024 MB, as Windows does; with 1 GB = 1,000 MB the full-speed figure is 1 hour 7 minutes." },
      { q: "Why is my download slower than the calculator predicts?", a: "Several factors reduce real-world speeds: the server you are downloading from may not support your full bandwidth, WiFi introduces overhead, and network congestion at peak hours can halve effective speeds. Use the efficiency slider to model these scenarios." },
      { q: "What is the difference between Mbps and MB/s?", a: "Mbps (megabits per second) is the unit used for internet speed. MB/s (megabytes per second) is used for file transfer rates. Since 1 byte = 8 bits, a 100 Mbps connection transfers at ~12.5 MB/s." },
      { q: "How do I calculate download time for a 100 GB game?", a: "Enter 100 in the File Size field, select GB, then enter your internet speed. At 100 Mbps with 90% efficiency, 100 GB takes roughly 2 hours 39 minutes." },
      { q: "Does the calculator work for upload times too?", a: "Yes. The same formula applies for uploads. Enter the file size and your upstream speed (check with a speed test). Most ISPs provide significantly slower upload speeds than download speeds." },
    ],
  },
  relatedTools: [
    "data-transfer-calculator",
    "bandwidth-calculator",
    "cidr-calculator",
    "subnet-calculator",
  ],
};

export const toolConfig = downloadTimeCalculatorConfig;
