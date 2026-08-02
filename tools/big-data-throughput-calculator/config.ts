import { siteConfig } from "@/config/site";

export const bigDataThroughputCalculatorConfig = {
  slug: "big-data-throughput-calculator",
  name: "Big Data Throughput Calculator",
  description: "Estimate data processing throughput, processing duration, and required throughput for big data pipelines, ETL workflows, and distributed systems. Free browser-based tool.",
  category: "data-analytics",
  icon: "💾",
  free: true,
  relatedTools: [
    "cluster-utilization-calculator",
    "spark-job-time-calculator",
    "data-compression-ratio-calculator",
    "encoding-efficiency-calculator",
    "data-partition-calculator",
    "time-series-forecast-calculator",
  ],
  seo: {
    title: "Big Data Throughput Calculator – Estimate Processing Speed, Data Rate & Job Completion Time",
    description: "Free Big Data Throughput Calculator. Estimate processing throughput, processing time, data transfer rate, ETL performance, distributed system capacity, and parallel processing speed instantly online.",
    keywords: [
      "big data throughput calculator",
      "throughput calculator",
      "processing speed calculator",
      "data processing calculator",
      "ETL throughput calculator",
      "Spark throughput calculator",
      "Hadoop throughput calculator",
      "Kafka throughput calculator",
      "data pipeline calculator",
      "distributed system calculator",
      "processing duration calculator",
      "data transfer rate calculator",
      "batch processing calculator",
      "parallel processing calculator",
      "cloud throughput calculator",
      "data engineering calculator",
      "free throughput calculator",
      "online data rate calculator",
      "streaming throughput calculator",
      "big data performance calculator",
    ],
    openGraph: {
      title: "Big Data Throughput Calculator – Estimate Processing Speed & Job Time",
      description: "Estimate processing throughput, processing time, and required data rate for big data pipelines with instant browser-based calculations.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/big-data-throughput-calculator`,
    },
    og: {
      title: "Big Data Throughput Calculator – Estimate Processing Speed & Job Time",
      description: "Estimate processing throughput, processing time, and required data rate for big data pipelines with instant browser-based calculations.",
      url: `${siteConfig.url}/tools/data-analytics/big-data-throughput-calculator`,
    },
    howToSteps: [
      {
        name: "Choose a Calculation Mode",
        text: "Select whether to calculate required throughput, processing time, dataset size, or compare multiple throughput scenarios.",
      },
      {
        name: "Enter Dataset Size and Unit",
        text: "Type the dataset size and choose a unit from KB, MB, GB, TB, or PB.",
      },
      {
        name: "Enter Throughput or Processing Time",
        text: "Depending on the mode, enter the throughput rate or the target processing time with the appropriate unit.",
      },
      {
        name: "Set Concurrency and Efficiency",
        text: "Enter the number of parallel workers or executors and an efficiency percentage to account for real-world overhead.",
      },
      {
        name: "Review and Export Results",
        text: "Check the required throughput, effective throughput, and processing time, then copy, download, or share your results.",
      },
    ],
    faq: [
      {
        q: "What is a big data throughput calculator?",
        a: "A big data throughput calculator is a free browser-based tool that estimates data processing throughput, processing duration, and required data rates for big data pipelines, ETL workflows, streaming systems, and distributed computing environments like Apache Spark, Hadoop, and Kafka.",
      },
      {
        q: "How is throughput calculated?",
        a: "Throughput is calculated as Dataset Size ÷ Processing Time. For example, a 1 TB dataset processed in 2 hours requires approximately 142.22 MB/s of throughput.",
      },
      {
        q: "How is processing time calculated?",
        a: "Processing Time is calculated as Dataset Size ÷ Throughput. For example, 500 GB at 250 MB/s takes approximately 34.13 minutes to process.",
      },
      {
        q: "What do Concurrency and Efficiency represent?",
        a: "Concurrency is the number of parallel workers, executors, or nodes processing the data simultaneously. Efficiency (10%–100%) accounts for real-world overhead such as coordination, network latency, and resource contention, so the effective throughput is your per-worker throughput multiplied by workers and efficiency.",
      },
      {
        q: "What is the difference between per-worker throughput and effective throughput?",
        a: "Per-worker throughput is the raw processing rate of a single worker or executor. Effective throughput is the total aggregate throughput of the whole cluster after accounting for the number of parallel workers and efficiency losses.",
      },
      {
        q: "How does the Compare Multiple Throughputs mode work?",
        a: "Enter your dataset size once, then a comma-separated list of candidate throughput values. The calculator shows the effective throughput and processing time for each candidate side by side, making it easy to compare infrastructure options.",
      },
      {
        q: "What do the Low, Medium, High, and Very High speed classifications mean?",
        a: "These labels give a quick visual sense of the effective throughput: below 10 MB/s is Low, 10–100 MB/s is Medium, 100 MB/s–1 GB/s is High, and above 1 GB/s is Very High.",
      },
      {
        q: "Does this calculator support Spark, Hadoop, or Kafka specifically?",
        a: "The calculator is technology-agnostic and works for any system measured in bytes processed over time — including Apache Spark, Hadoop, Kafka, Flink, Snowflake, Databricks, BigQuery, and Redshift — since throughput math is the same regardless of platform.",
      },
      {
        q: "Can I share my calculation with someone else?",
        a: "Yes. Click Share URL to copy a link that encodes your dataset size, throughput, time, workers, and efficiency settings as query parameters, so anyone who opens the link sees the same calculation.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
