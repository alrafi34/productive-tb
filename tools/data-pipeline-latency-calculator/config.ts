import { siteConfig } from "@/config/site";

export const dataPipelineLatencyCalculatorConfig = {
  slug: "data-pipeline-latency-calculator",
  name: "Data Pipeline Latency Calculator",
  description: "Estimate end-to-end data pipeline latency by calculating cumulative delay across unlimited stages. Supports sequential and parallel stage grouping, bottleneck detection, unit conversion, and CSV/JSON/TXT export. Free browser-based tool.",
  category: "data-analytics",
  icon: "⏱️",
  free: true,
  relatedTools: [
    "latency-calculator",
    "cloud-cost-calculator",
    "download-time-calculator",
    "session-duration-calculator",
    "storage-requirement-calculator",
    "data-transfer-cost-calculator",
  ],
  seo: {
    title: "Data Pipeline Latency Calculator — Free ETL, Streaming & Processing Delay Estimator",
    description: "Estimate end-to-end data pipeline latency online. Calculate ETL delays, streaming latency, Kafka processing time, warehouse loading time, sequential and parallel execution delays instantly using this free browser-based calculator.",
    keywords: [
      "data pipeline latency calculator",
      "etl latency calculator",
      "pipeline delay calculator",
      "streaming latency calculator",
      "kafka latency calculator",
      "event processing latency",
      "etl performance calculator",
      "warehouse latency",
      "pipeline performance tool",
      "data engineering calculator",
      "sequential parallel latency calculator",
      "pipeline bottleneck calculator",
      "spark processing latency",
      "data pipeline delay estimator",
      "streaming pipeline calculator",
      "free etl calculator",
      "pipeline stage calculator",
      "processing delay calculator",
      "data engineering tool",
      "online latency calculator",
    ],
    openGraph: {
      title: "Data Pipeline Latency Calculator — Free ETL, Streaming & Processing Delay Estimator",
      description: "Estimate end-to-end data pipeline latency with sequential and parallel stage modeling, bottleneck detection, and instant unit conversion. Free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/data-pipeline-latency-calculator`,
    },
    og: {
      title: "Data Pipeline Latency Calculator — Free ETL, Streaming & Processing Delay Estimator",
      description: "Estimate end-to-end data pipeline latency with sequential and parallel stage modeling, bottleneck detection, and instant unit conversion. Free and browser-based.",
      url: `${siteConfig.url}/tools/data-analytics/data-pipeline-latency-calculator`,
    },
    howToSteps: [
      {
        name: "Name Your Pipeline",
        text: "Give your pipeline a name, such as \"Customer Analytics Pipeline\", so exports and history are easy to identify.",
      },
      {
        name: "Add Pipeline Stages",
        text: "Add a stage for each step in your pipeline — name it, enter its latency value and unit, and choose a stage type like Source, Queue, Processing, or Warehouse.",
      },
      {
        name: "Mark Parallel Stages",
        text: "Check \"Include in Parallel Group\" for stages that run simultaneously, and assign them to Group A, B, or C — the calculator uses the group's maximum latency instead of summing them.",
      },
      {
        name: "Read the Live Total",
        text: "The total pipeline latency, sequential delay, parallel delay, and bottleneck stage update instantly on an animated summary card.",
      },
      {
        name: "Reorder, Export, or Save",
        text: "Drag stages to reorder them, then copy the summary, export as CSV, JSON, or TXT, print a report, or save the pipeline to your local history.",
      },
    ],
    faq: [
      {
        q: "What is a Data Pipeline Latency Calculator?",
        a: "A Data Pipeline Latency Calculator is a free browser-based tool that estimates the total end-to-end latency of a data pipeline by summing the delay introduced by each processing stage — from source ingestion through queues, transformations, and final storage or warehouse loading.",
      },
      {
        q: "How is total pipeline latency calculated?",
        a: "Sequential stages are summed directly: Total = Sum(Stage Latencies). Stages marked as parallel within the same group instead contribute their group's maximum latency: Overall Total = Sum of Sequential Stages + Sum of each Parallel Group's Maximum.",
      },
      {
        q: "What is the difference between sequential and parallel stages?",
        a: "Sequential stages run one after another, so their latencies add up. Parallel stages run at the same time within a group — since the pipeline can't proceed until the slowest one finishes, only the maximum latency in that group counts toward the total.",
      },
      {
        q: "How does the calculator detect the bottleneck stage?",
        a: "The bottleneck is automatically identified as the single stage with the highest latency value, regardless of whether it's sequential or part of a parallel group, and is highlighted in the stage table and latency distribution chart.",
      },
      {
        q: "Can I model a Kafka or Spark streaming pipeline?",
        a: "Yes. Add stages for each component — such as a Kafka Consumer, Spark Processing step, and Warehouse Load — using appropriate stage types, and the calculator sums their latencies to estimate end-to-end streaming delay.",
      },
      {
        q: "What units can I use for stage latency?",
        a: "Each stage can independently use milliseconds, seconds, or minutes — the calculator automatically converts everything to a common unit internally before calculating totals, so you never need to convert manually.",
      },
      {
        q: "Can I undo an accidental stage deletion?",
        a: "Yes. Deleting a stage shows an inline \"Undo\" banner (or press Ctrl+Z) that restores the stage to its original position until you take another action.",
      },
      {
        q: "How many pipeline stages can I add?",
        a: "There's no hard limit — the calculator is designed to remain responsive with 100+ stages, using debounced recalculation so typing stays smooth even in large pipelines.",
      },
      {
        q: "Can I import and export my pipeline?",
        a: "Yes. Export your pipeline as JSON to save or share it, then import it back later. You can also export a CSV breakdown, a plain-text summary, or a share-ready Markdown table, and print a formatted report.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your pipeline stages and latency values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
