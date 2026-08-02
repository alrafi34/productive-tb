import { siteConfig } from "@/config/site";

export const clusterUtilizationCalculatorConfig = {
  slug: "cluster-utilization-calculator",
  name: "Cluster Utilization Calculator",
  description: "Calculate CPU, memory, storage, GPU, and network cluster utilization, remaining capacity, headroom, and overcommit ratio with live gauges. Free browser-based tool.",
  category: "data-analytics",
  icon: "🖥️",
  free: true,
  relatedTools: [
    "big-data-throughput-calculator",
    "spark-job-time-calculator",
    "data-compression-ratio-calculator",
    "encoding-efficiency-calculator",
    "data-partition-calculator",
    "time-series-forecast-calculator",
  ],
  seo: {
    title: "Cluster Utilization Calculator – Free CPU, Memory & Storage Capacity Calculator",
    description: "Calculate CPU, memory, storage, GPU, and cluster resource utilization instantly. Analyze capacity, remaining resources, headroom, efficiency, and infrastructure usage with this free online Cluster Utilization Calculator.",
    keywords: [
      "cluster utilization calculator",
      "CPU utilization calculator",
      "memory utilization calculator",
      "resource utilization calculator",
      "cluster capacity calculator",
      "Kubernetes resource calculator",
      "DevOps calculator",
      "cloud infrastructure calculator",
      "capacity planning calculator",
      "data engineering calculator",
      "storage utilization calculator",
      "GPU utilization calculator",
      "infrastructure capacity calculator",
      "resource headroom calculator",
      "overcommit ratio calculator",
      "free utilization calculator",
      "cluster capacity planning tool",
      "compute resource calculator",
      "node utilization calculator",
      "server utilization calculator",
    ],
    openGraph: {
      title: "Cluster Utilization Calculator – Free CPU, Memory & Storage Capacity Calculator",
      description: "Calculate cluster resource utilization, remaining capacity, and headroom instantly with interactive gauges and export features.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/cluster-utilization-calculator`,
    },
    og: {
      title: "Cluster Utilization Calculator – Free CPU, Memory & Storage Capacity Calculator",
      description: "Calculate cluster resource utilization, remaining capacity, and headroom instantly with interactive gauges and export features.",
      url: `${siteConfig.url}/tools/data-analytics/cluster-utilization-calculator`,
    },
    howToSteps: [
      {
        name: "Select a Resource Type",
        text: "Choose CPU, Memory, Storage, GPU, Network, or Custom, and pick a matching unit.",
      },
      {
        name: "Enter Total Capacity and Used Resources",
        text: "Type the total cluster capacity and how much is currently used.",
      },
      {
        name: "Enter Reserved Resources (Optional)",
        text: "Add any resources reserved but not yet actively used to get an accurate available capacity.",
      },
      {
        name: "Set Warning and Critical Thresholds",
        text: "Adjust the warning (50–100%) and critical (60–100%) utilization thresholds to match your team's alerting policy.",
      },
      {
        name: "Review the Gauge and Export",
        text: "Check the utilization gauge, status badge, and headroom, then copy, download, or share your results.",
      },
    ],
    faq: [
      {
        q: "What is a cluster utilization calculator?",
        a: "A cluster utilization calculator is a free browser-based tool that calculates how efficiently CPU, memory, storage, GPU, or any custom resource is being used across a computing cluster, showing utilization percentage, remaining capacity, and headroom.",
      },
      {
        q: "How is utilization calculated?",
        a: "Utilization = (Used ÷ Total) × 100. For example, 48 used cores out of 64 total cores gives a utilization of 75%.",
      },
      {
        q: "What is the difference between Remaining and Available capacity?",
        a: "Remaining is Total minus Used. Available additionally subtracts Reserved resources (capacity set aside but not actively in use), giving a more accurate picture of what can actually be allocated: Available = Total − Used − Reserved.",
      },
      {
        q: "What is headroom?",
        a: "Headroom is the percentage of available capacity relative to total capacity: Headroom = (Available ÷ Total) × 100. It tells you how much room you have to grow before hitting reserved or used capacity.",
      },
      {
        q: "What do the Warning and Critical thresholds do?",
        a: "They define the utilization percentages at which the status badge switches from Healthy (green) to Warning (yellow/orange) and then Critical (red), helping you visually spot clusters approaching capacity limits.",
      },
      {
        q: "What is the Overcommit Ratio?",
        a: "The Overcommit Ratio is (Used + Reserved) ÷ Total Capacity. A ratio near or above 1.0 means the cluster is fully committed or overcommitted relative to its physical capacity.",
      },
      {
        q: "Does this work for Kubernetes, AWS, Azure, or on-premise clusters?",
        a: "Yes. The calculator is platform-agnostic and works for any cluster or resource pool measured in a consistent unit — Kubernetes nodes, Docker Swarm, AWS/Azure/GCP instances, VMware, HPC clusters, or private cloud environments.",
      },
      {
        q: "Can I track multiple resources at once?",
        a: "Yes. The Resource Dashboard panel lets you add multiple resource rows (CPU, Memory, Storage, GPU, etc.) and see each one's utilization and status side by side.",
      },
      {
        q: "Can I share my calculation with someone else?",
        a: "Yes. Click Share URL to copy a link that encodes your resource type, capacity, used, reserved, and threshold settings as query parameters.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
