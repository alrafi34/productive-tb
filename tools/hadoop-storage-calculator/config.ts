import { siteConfig } from "@/config/site";

export const hadoopStorageCalculatorConfig = {
  slug: "hadoop-storage-calculator",
  name: "Hadoop Storage Calculator",
  description: "Estimate HDFS storage requirements from raw data size, replication factor, compression ratio, and reserved space, with multi-year growth forecasting. Free online Hadoop storage calculator.",
  category: "data-analytics",
  icon: "💾",
  free: true,
  relatedTools: [
    "storage-requirement-calculator",
    "data-transfer-cost-calculator",
    "cluster-utilization-calculator",
    "big-data-throughput-calculator",
    "data-partition-calculator",
    "data-pipeline-latency-calculator",
  ],
  seo: {
    title: "Hadoop Storage Calculator – Estimate HDFS Storage Requirements Online",
    description: "Calculate Hadoop HDFS storage requirements instantly using replication factor, compression ratio, reserved capacity, and future growth forecasting. Free online Hadoop storage calculator.",
    keywords: [
      "hadoop storage calculator",
      "hdfs storage calculator",
      "hadoop capacity planner",
      "big data storage calculator",
      "hdfs replication calculator",
      "hadoop cluster planning",
      "storage capacity calculator",
      "data engineering calculator",
      "big data infrastructure tool",
      "hadoop disk space estimator",
    ],
    openGraph: {
      title: "Free Hadoop Storage Calculator",
      description: "Instantly estimate HDFS storage requirements using replication factor, compression ratio, reserved capacity, and growth forecasting with this fast, browser-based calculator.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/hadoop-storage-calculator`,
    },
    og: {
      title: "Free Hadoop Storage Calculator",
      description: "Instantly estimate HDFS storage requirements using replication factor, compression ratio, reserved capacity, and growth forecasting with this fast, browser-based calculator.",
      url: `${siteConfig.url}/tools/data-analytics/hadoop-storage-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Raw Data Size",
        text: "Type your dataset size and choose MB, GB, TB, or PB.",
      },
      {
        name: "Set Replication Factor",
        text: "Choose how many copies of each block HDFS should store — 3 is standard.",
      },
      {
        name: "Set Compression Ratio",
        text: "Enter a value from 0.1 to 1.0, where 1.0 means no compression.",
      },
      {
        name: "Adjust Reserved Space & Overhead",
        text: "Set the safety buffer percentage and any metadata or snapshot overhead.",
      },
      {
        name: "Set Growth Rate & Planning Period",
        text: "Enter your expected annual data growth and choose a 1–10 year planning window.",
      },
      {
        name: "Read the Live Result",
        text: "Replicated storage, total required storage, and a multi-year forecast update instantly as you type.",
      },
      {
        name: "Export or Share",
        text: "Copy the report, download a CSV or JSON file, or print a formatted results page.",
      },
    ],
    faq: [
      {
        q: "What is a Hadoop storage calculator?",
        a: "A Hadoop storage calculator is a free browser-based tool that estimates the physical disk capacity an HDFS cluster needs, based on raw data size, replication factor, compression ratio, and reserved free space.",
      },
      {
        q: "How is required HDFS storage calculated?",
        a: "Effective Data = Raw Data × Compression Ratio, then Replicated Storage = Effective Data × Replication Factor. For example, 5 TB of raw data with no compression and a replication factor of 3 requires 15 TB of replicated storage.",
      },
      {
        q: "Why does HDFS need a replication factor?",
        a: "HDFS stores multiple copies of every data block across different nodes so that data survives individual disk or node failures. The default replication factor of 3 is the standard for production Hadoop clusters.",
      },
      {
        q: "What's the difference between Replicated Storage and Total Required Storage?",
        a: "Replicated Storage is your effective data multiplied by the replication factor. Total Required Storage adds reserved free space and any storage overhead on top of that.",
      },
      {
        q: "Why should I reserve free space on a Hadoop cluster?",
        a: "HDFS and the underlying operating system need headroom for temporary files, block reports, and write buffering — 15–20% reserved space is a common safe default.",
      },
      {
        q: "How is future storage growth calculated?",
        a: "Future Data = Raw Data × (1 + Growth Rate)^Years, using compound annual growth. For example, 100 TB growing at 30% annually reaches about 219.7 TB after 3 years.",
      },
      {
        q: "What compression ratio should I use?",
        a: "A compression ratio of 1.0 means no compression. A ratio of 0.5 means your data compresses to half its original size before replication. Actual ratios vary by data type.",
      },
      {
        q: "Is my cluster configuration data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. No cluster sizing information is ever transmitted to any server.",
      },
    ],
  },
};
