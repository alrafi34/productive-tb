import { siteConfig } from "@/config/site";

export const dataPartitionCalculatorConfig = {
  slug: "data-partition-calculator",
  name: "Data Partition Calculator",
  description: "Calculate partition size, required partitions, records per partition, and balanced data distribution instantly. Free online data partition calculator for developers and data engineers.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "hadoop-storage-calculator",
    "storage-requirement-calculator",
    "cluster-utilization-calculator",
    "big-data-throughput-calculator",
    "data-pipeline-latency-calculator",
    "etl-throughput-calculator",
  ],
  seo: {
    title: "Data Partition Calculator – Calculate Partition Size, Records & Storage Online",
    description: "Free online Data Partition Calculator. Calculate partition size, required partitions, records per partition, balanced data distribution, and storage allocation instantly using your browser.",
    keywords: [
      "data partition calculator",
      "partition size calculator",
      "storage partition calculator",
      "database partition calculator",
      "big data partition calculator",
      "partition planning tool",
      "records per partition calculator",
      "data engineering calculator",
      "distributed storage calculator",
      "cloud partition calculator",
    ],
    openGraph: {
      title: "Free Data Partition Calculator",
      description: "Instantly calculate partition size, required partitions, records per partition, and balanced data distribution using this fast, browser-based calculator.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/data-partition-calculator`,
    },
    og: {
      title: "Free Data Partition Calculator",
      description: "Instantly calculate partition size, required partitions, records per partition, and balanced data distribution using this fast, browser-based calculator.",
      url: `${siteConfig.url}/tools/data-analytics/data-partition-calculator`,
    },
    howToSteps: [
      {
        name: "Choose a Calculation Mode",
        text: "Select Partition Size, Number of Partitions, Records Per Partition, Total Storage, or Balanced Distribution.",
      },
      {
        name: "Enter Your Data",
        text: "Type your total data size, desired partition size, record count, or number of partitions depending on the mode.",
      },
      {
        name: "Pick a Size Unit",
        text: "Select KB, MB, GB, TB, or PB for size-based calculations.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to display, from 0 to 5.",
      },
      {
        name: "Review the Results",
        text: "Partition size, partition count, and distribution details update instantly as you type.",
      },
      {
        name: "Export or Share",
        text: "Copy the report, download a CSV or JSON file, or print a formatted results page.",
      },
    ],
    faq: [
      {
        q: "What is a data partition calculator?",
        a: "A data partition calculator is a free browser-based tool that helps you plan how to divide a dataset, file, or table into partitions — calculating partition size, partition count, records per partition, and total storage.",
      },
      {
        q: "How is partition size calculated?",
        a: "Partition Size = Total Data Size ÷ Number of Partitions. For example, a 500 GB dataset split into 10 partitions results in 50 GB per partition.",
      },
      {
        q: "How is the required number of partitions calculated?",
        a: "Required Partitions = Ceiling(Total Data Size ÷ Desired Partition Size), always rounding up. A 2 TB dataset with a 200 GB target partition size requires 11 partitions.",
      },
      {
        q: "What is balanced distribution?",
        a: "Balanced distribution evenly spreads records across partitions when the total doesn't divide evenly, distributing the remainder one extra record at a time to the first partitions.",
      },
      {
        q: "What is a good partition size for big data processing?",
        a: "Most distributed processing frameworks perform best with partition sizes between roughly 10 MB and 1 GB.",
      },
      {
        q: "Why does the distribution table only show some partitions for very large counts?",
        a: "For datasets with a very large number of partitions, the calculator displays the first 100 partitions and summarizes the rest, since the pattern is fully determined by the base record count and remainder.",
      },
      {
        q: "Can I use this for database sharding?",
        a: "Yes — Records Per Partition and Balanced Distribution modes work well for planning how many records each database shard or table partition should hold.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. No dataset sizes, record counts, or storage details are ever transmitted to any server.",
      },
    ],
  },
};
