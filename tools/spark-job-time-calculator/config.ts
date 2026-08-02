import { siteConfig } from "@/config/site";

export const sparkJobTimeCalculatorConfig = {
  slug: "spark-job-time-calculator",
  name: "Spark Job Time Calculator",
  description: "Estimate Apache Spark job execution time from dataset size, cluster resources, shuffle intensity, and processing complexity — with a runtime breakdown, bottleneck detection, and optimization tips.",
  category: "data-analytics",
  icon: "⚡",
  free: true,
  relatedTools: [
    "big-data-throughput-calculator",
    "cluster-utilization-calculator",
    "data-compression-ratio-calculator",
    "encoding-efficiency-calculator",
    "data-partition-calculator",
    "time-series-forecast-calculator",
  ],
  seo: {
    title: "Spark Job Time Calculator – Estimate Apache Spark Runtime Online Free",
    description: "Estimate Apache Spark job execution time using dataset size, executors, cores, partitions, shuffle intensity, and processing complexity. Free browser-based Spark runtime calculator with optimization insights.",
    keywords: [
      "spark job calculator",
      "spark runtime estimator",
      "apache spark calculator",
      "spark execution time",
      "spark performance calculator",
      "spark cluster estimator",
      "spark job duration calculator",
      "spark optimization tool",
      "big data calculator",
      "data engineering calculator",
      "spark shuffle calculator",
      "spark partition calculator",
      "spark executor calculator",
      "databricks runtime calculator",
      "EMR spark calculator",
      "spark bottleneck detector",
      "free spark calculator",
      "spark job estimator online",
      "spark cluster sizing tool",
      "distributed computing calculator",
    ],
    openGraph: {
      title: "Spark Job Time Calculator – Estimate Apache Spark Runtime Online Free",
      description: "Estimate Apache Spark execution time from dataset size, cluster resources, and job characteristics with a runtime breakdown and bottleneck detection.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/spark-job-time-calculator`,
    },
    og: {
      title: "Spark Job Time Calculator – Estimate Apache Spark Runtime Online Free",
      description: "Estimate Apache Spark execution time from dataset size, cluster resources, and job characteristics with a runtime breakdown and bottleneck detection.",
      url: `${siteConfig.url}/tools/data-analytics/spark-job-time-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Dataset Information",
        text: "Provide the dataset size and unit, and choose a storage type and compression codec.",
      },
      {
        name: "Configure Your Cluster",
        text: "Enter the number of executors, executor cores, executor memory, and driver memory.",
      },
      {
        name: "Set Job Characteristics",
        text: "Choose processing complexity, shuffle intensity, number of stages, partition count, and caching or broadcast join settings.",
      },
      {
        name: "Review the Runtime Breakdown",
        text: "Check the estimated runtime split into read, processing, shuffle, write, and scheduling overhead phases.",
      },
      {
        name: "Apply Optimization Suggestions",
        text: "Review the detected bottleneck, cluster efficiency score, and partition recommendation to tune your job before running it.",
      },
    ],
    faq: [
      {
        q: "What is a Spark job time calculator?",
        a: "A Spark job time calculator is a free browser-based tool that estimates Apache Spark job execution time using a simplified model based on dataset size, cluster resources (executors and cores), storage type, compression, shuffle intensity, and processing complexity.",
      },
      {
        q: "How is the estimated runtime calculated?",
        a: "Total Runtime = Read Time + Processing Time + Shuffle Time + Write Time + Scheduling Overhead. Read Time depends on dataset size and I/O throughput, Processing Time depends on complexity and total CPU capacity (executors × cores), Shuffle Time depends on shuffle intensity and network throughput, and Write Time depends on output size and write throughput.",
      },
      {
        q: "What do the Processing Complexity levels mean?",
        a: "Complexity multiplies the base processing time: Very Low (0.6×) for simple filters and projections, Low (0.8×), Medium (1.0×) for typical transformations, High (1.5×) for complex joins and aggregations, and Very High (2.2×) for heavy UDFs or iterative algorithms.",
      },
      {
        q: "What is shuffle intensity and why does it matter?",
        a: "Shuffle intensity reflects how much data movement across the network your job triggers — from None (0×) to Very High (1.8×). Wide transformations like groupBy, join, and repartition cause shuffles, which are often the single biggest runtime cost in a Spark job.",
      },
      {
        q: "How does the calculator detect bottlenecks?",
        a: "It compares the four execution phases — Read, Processing, Shuffle, and Write — and flags whichever takes the longest as the Primary Bottleneck, then provides a targeted optimization recommendation for that phase.",
      },
      {
        q: "What is the ideal partition count?",
        a: "A common rule of thumb is 2 to 4 partitions per available core (executors × executor cores). Too few partitions underuses your cluster's parallelism; too many creates excessive scheduling overhead from very small tasks.",
      },
      {
        q: "How do caching and broadcast joins affect the estimate?",
        a: "Enabling Caching Used reduces processing time by avoiding repeated reads of intermediate data. Enabling Broadcast Joins significantly reduces shuffle time by avoiding a full shuffle for joins against small tables.",
      },
      {
        q: "Is this an exact prediction of my Spark job's runtime?",
        a: "No. This is a simplified estimation model intended for quick planning and comparison before running expensive jobs. Real Spark runtime depends on cluster configuration, data skew, JVM tuning, and many other factors this browser-only calculator cannot observe.",
      },
      {
        q: "Can I share my calculation with someone else?",
        a: "Yes. Click Share URL to copy a link that encodes your dataset size, executors, cores, complexity, shuffle intensity, and I/O throughput as query parameters.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
