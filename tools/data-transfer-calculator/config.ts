import { siteConfig } from "@/config/site";

export const dataTransferCalculatorConfig = {
  slug: "data-transfer-calculator",
  name: "Data Transfer Calculator",
  description: "Calculate how long it will take to transfer data based on file size and network speed. Supports downloads, uploads, backups, cloud migrations, and enterprise data transfers with real-time results.",
  category: "computer-science",
  icon: "⏱️",
  free: true,
  seo: {
    title: "Data Transfer Calculator – Calculate Upload & Download Time Online",
    description: "Calculate transfer time instantly based on file size and internet speed. Estimate upload, download, backup, or network transfer duration using Mbps, Gbps, MB/s, GB, TB, and more.",
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
      title: "Data Transfer Calculator – Calculate Upload & Download Time Online",
      description: "Calculate transfer time instantly based on file size and internet speed. Estimate upload, download, backup, or network transfer duration using Mbps, Gbps, MB/s, GB, TB, and more.",
      type: "website",
      url: `${siteConfig.url}/tools/computer-science/data-transfer-calculator`,
    },
  },
};
