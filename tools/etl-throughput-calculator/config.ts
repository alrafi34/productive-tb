import { siteConfig } from "@/config/site";

export const etlThroughputCalculatorConfig = {
  slug: "etl-throughput-calculator",
  name: "ETL Throughput Calculator",
  description: "Calculate ETL pipeline throughput, records per second, data transfer rates, estimated completion time, and capacity planning instantly. Free browser-based calculator for data engineers and pipeline capacity planning.",
  category: "data-analytics",
  icon: "🔄",
  free: true,
  seo: {
    title: "Free ETL Throughput Calculator – Calculate ETL Pipeline Performance Online",
    description: "Calculate ETL pipeline throughput, records per second, processing speed, execution time, hourly capacity, and data transfer rates instantly with this free online ETL Throughput Calculator.",
    keywords: [
      "etl throughput calculator",
      "pipeline throughput calculator",
      "records per second calculator",
      "etl performance calculator",
      "data engineering calculator",
      "pipeline capacity calculator",
      "batch processing calculator",
      "etl runtime calculator",
      "data pipeline performance",
      "throughput estimator",
    ],
    openGraph: {
      title: "ETL Throughput Calculator – Free Online Pipeline Performance Tool",
      description: "Measure ETL pipeline throughput, processing speed, runtime, and capacity instantly. Free, browser-based, and optimized for data engineers worldwide.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/etl-throughput-calculator`,
    },
  },
};
