import { siteConfig } from "@/config/site";

export const percentileCalculatorConfig = {
  slug: "percentile-calculator",
  name: "Percentile Calculator",
  description: "Find any percentile value, calculate the percentile rank of a value, or compute multiple percentiles at once. Choose from 4 statistical methods, with full descriptive statistics, quartiles, IQR, and interactive visualization.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "median-calculator",
    "mean-calculator",
    "standard-deviation-calculator",
    "variance-calculator",
    "z-score-calculator",
    "outlier-detection-calculator",
  ],
  seo: {
    title: "Free Percentile Calculator Online – Calculate Percentiles, Percentile Rank & Statistics",
    description: "Calculate percentiles, percentile rank, quartiles, and statistical values instantly. Supports large datasets, CSV import, multiple percentile calculations, charts, and downloadable reports. Free, accurate, and works entirely in your browser.",
    keywords: [
      "percentile calculator",
      "percentile rank calculator",
      "statistics calculator",
      "find percentile",
      "calculate percentile",
      "percentile formula",
      "quartile calculator",
      "statistics tool",
      "data analysis calculator",
      "online percentile calculator",
      "IQR calculator",
      "P90 calculator",
      "P95 calculator",
      "linear interpolation percentile",
      "response time percentile calculator",
    ],
    openGraph: {
      title: "Free Percentile Calculator Online",
      description: "Find a percentile value, calculate a percentile rank, or compute multiple percentiles at once — with quartiles, IQR, and an interactive visualization.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/percentile-calculator`,
    },
    og: {
      title: "Free Percentile Calculator Online",
      description: "Find a percentile value, calculate a percentile rank, or compute multiple percentiles at once — with quartiles, IQR, and an interactive visualization.",
      url: `${siteConfig.url}/tools/data-analytics/percentile-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Dataset",
        text: "Type or paste numbers separated by commas, spaces, new lines, tabs, or semicolons, or upload a CSV file.",
      },
      {
        name: "Choose a Calculation Mode",
        text: "Select Find Percentile Value, Find Percentile Rank, or Calculate Multiple Percentiles.",
      },
      {
        name: "Set Your Inputs",
        text: "Enter a target percentile, a value to rank, or a comma-separated list of percentiles depending on the mode.",
      },
      {
        name: "Review the Result",
        text: "See the calculated result along with full descriptive statistics, quartiles, and IQR.",
      },
      {
        name: "Adjust the Method (Optional)",
        text: "Open Advanced Settings to switch between Linear Interpolation, Inclusive, Exclusive, or Nearest Rank methods.",
      },
      {
        name: "Export or Share",
        text: "Copy the result, download a CSV or JSON report, print it, or share a link with your dataset and settings pre-filled.",
      },
    ],
    faq: [
      {
        q: "What is a percentile calculator?",
        a: "A percentile calculator is a free browser-based tool that finds the value below which a given percentage of a dataset falls. For example, the 90th percentile (P90) is the value below which 90% of the data lies.",
      },
      {
        q: "How is percentile calculated?",
        a: "This calculator uses linear interpolation between closest ranks (the same method as Excel's PERCENTILE.INC): sort the data, find the interpolated rank position for your target percentile, and interpolate between the two nearest values.",
      },
      {
        q: "What is the difference between a percentile and a quartile?",
        a: "Quartiles are specific percentiles that divide data into four equal parts: Q1 = P25, Q2 (median) = P50, and Q3 = P75. Percentiles allow any cutoff from 0 to 100, not just those four points.",
      },
      {
        q: "What is IQR?",
        a: "IQR (Interquartile Range) is Q3 − Q1, representing the spread of the middle 50% of the data. It's commonly used to detect outliers using the 1.5×IQR rule.",
      },
      {
        q: "What is percentile rank, and how is it calculated?",
        a: "Percentile rank is the reverse of a percentile lookup — it tells you what percentage of the dataset falls at or below a given value. It's calculated as (count of values ≤ your value ÷ total count) × 100. For example, in the dataset 50, 60, 70, 80, 90, the value 70 has a percentile rank of 60%, since 3 of the 5 values (50, 60, 70) are at or below it.",
      },
      {
        q: "Can I calculate several percentiles at once?",
        a: "Yes. Switch to 'Calculate Multiple Percentiles' mode and enter a comma-separated list like 10,25,50,75,90,95,99 to see all of those percentile values calculated together.",
      },
      {
        q: "Why do different tools sometimes give slightly different percentile values?",
        a: "There are several accepted percentile calculation methods. This calculator supports four: Linear Interpolation (the default, matching Excel's PERCENTILE.INC), Inclusive, Exclusive (matching Excel's PERCENTILE.EXC), and Nearest Rank. Switch methods in the Advanced Settings panel to match the convention your organization uses.",
      },
      {
        q: "What's the difference between the Linear Interpolation and Nearest Rank methods?",
        a: "Linear Interpolation calculates a value between two data points when the percentile falls between ranks, producing a smoother, more precise result. Nearest Rank simply selects the actual data point closest to the target rank without interpolating, which is simpler but less precise for small datasets.",
      },
      {
        q: "What are P90 and P95 commonly used for?",
        a: "P90 and P95 are widely used in performance monitoring — for example, 'P95 response time' means 95% of requests completed faster than that value, making it a common SLA metric.",
      },
      {
        q: "Can I calculate multiple percentiles at once?",
        a: "Yes. The common percentiles table automatically shows P1, P5, P10, P25, P50, P75, P90, P95, and P99 for your dataset alongside your custom target percentile.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator sorts and interpolates efficiently, comfortably handling thousands of values with instant, debounced recalculation.",
      },
      {
        q: "Can I share my calculation with someone else?",
        a: "Yes. Click Share URL to copy a link that encodes your dataset and target percentile as query parameters.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
