import { siteConfig } from "@/config/site";

export const queryOptimizationCalculatorConfig = {
  slug: "query-optimization-calculator",
  name: "Query Optimization Calculator",
  description: "Estimate SQL query performance improvement from execution time, rows scanned, and query frequency — with before/after comparison, savings projections, and export.",
  category: "data-analytics",
  icon: "⚡",
  free: true,
  relatedTools: [
    "big-data-throughput-calculator",
    "cluster-utilization-calculator",
    "spark-job-time-calculator",
    "data-compression-ratio-calculator",
    "index-size-calculator",
    "data-partition-calculator",
  ],
  seo: {
    title: "Query Optimization Calculator – Estimate SQL Query Performance Improvement Online",
    description: "Estimate SQL query optimization improvements instantly. Compare execution times, calculate speed increases, estimate daily and yearly time savings, visualize before vs after performance, and optimize database efficiency using this free online Query Optimization Calculator.",
    keywords: [
      "query optimization calculator",
      "SQL optimization calculator",
      "database performance calculator",
      "query performance estimator",
      "execution time calculator",
      "SQL query improvement",
      "database optimization tool",
      "performance improvement calculator",
      "query execution analyzer",
      "database speed calculator",
      "query efficiency estimator",
      "SQL performance tool",
      "database tuning calculator",
      "backend optimization calculator",
      "free SQL calculator",
      "query speed comparison tool",
      "index performance calculator",
      "database query benchmark tool",
      "SQL execution time comparison",
      "query rewrite calculator",
    ],
    openGraph: {
      title: "Query Optimization Calculator – Estimate SQL Query Performance Improvement",
      description: "Compare execution times, calculate speed increases, and estimate time savings from SQL query optimizations with instant browser-based calculations.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/query-optimization-calculator`,
    },
    og: {
      title: "Query Optimization Calculator – Estimate SQL Query Performance Improvement",
      description: "Compare execution times, calculate speed increases, and estimate time savings from SQL query optimizations with instant browser-based calculations.",
      url: `${siteConfig.url}/tools/data-analytics/query-optimization-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Original and Optimized Execution Time",
        text: "Type your query's execution time in milliseconds before and after optimization.",
      },
      {
        name: "Add Rows Scanned (Optional)",
        text: "Enter rows scanned before and after optimization to calculate rows reduction percentage.",
      },
      {
        name: "Add Daily Executions (Optional)",
        text: "Enter how many times the query runs per day to estimate daily, monthly, and yearly time savings.",
      },
      {
        name: "Select Optimization Type and Engine",
        text: "Choose the optimization technique used and your database engine for a more descriptive report.",
      },
      {
        name: "Review and Export",
        text: "Check the performance improvement, speed multiplier, rating, and savings, then copy, download, or share your results.",
      },
    ],
    faq: [
      {
        q: "What is a query optimization calculator?",
        a: "A query optimization calculator is a free browser-based tool that estimates how much a database query's performance improved after optimization, based on execution time, rows scanned, and query frequency. It does not execute SQL — it calculates improvement metrics from numbers you provide.",
      },
      {
        q: "How is performance improvement calculated?",
        a: "Performance Improvement % = ((Original Time − Optimized Time) ÷ Original Time) × 100. For example, going from 2500 ms to 450 ms gives an 82% improvement.",
      },
      {
        q: "What is the Speed Multiplier?",
        a: "Speed Multiplier = Original Time ÷ Optimized Time. A query that went from 2500 ms to 450 ms is 5.56× faster.",
      },
      {
        q: "How is Rows Reduction calculated?",
        a: "Rows Reduction % = ((Rows Before − Rows After) ÷ Rows Before) × 100. Reducing rows scanned from 2,500,000 to 75,000 is a 97% reduction — a strong sign an index is being used effectively.",
      },
      {
        q: "How are Daily, Monthly, and Yearly savings calculated?",
        a: "Daily Time Saved = Time Saved Per Query × Daily Executions. Monthly Time Saved multiplies that by 30, and Yearly Time Saved multiplies it by 365 — useful for estimating the cumulative impact of optimizing a frequently-run query.",
      },
      {
        q: "What do the optimization ratings mean?",
        a: "Poor is under 10% improvement, Fair is 10–39%, Good is 40–69%, Excellent is 70–89%, and Outstanding is 90% or higher.",
      },
      {
        q: "Can the optimized time be worse than the original?",
        a: "Yes, the calculator allows this for comparison purposes and will show a negative improvement, flagging that the change made the query slower rather than faster.",
      },
      {
        q: "Does this calculator work for MySQL, PostgreSQL, MongoDB, or other databases?",
        a: "Yes. The calculation is engine-agnostic — it works with execution time and row count metrics from any database engine, including MySQL, PostgreSQL, SQL Server, Oracle, SQLite, MariaDB, MongoDB, and Redis.",
      },
      {
        q: "Can I share my calculation with someone else?",
        a: "Yes. Click Share URL to copy a link that encodes your execution times, row counts, and daily executions as query parameters.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
