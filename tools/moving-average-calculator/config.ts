import { siteConfig } from "@/config/site";

export const movingAverageCalculatorConfig = {
  slug: "moving-average-calculator",
  name: "Moving Average Calculator",
  description: "Calculate Simple, Weighted, and Exponential Moving Averages instantly. Analyze trends, smooth fluctuations, and visualize time-series data with an interactive chart. Free browser-based tool.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "mean-calculator",
    "median-calculator",
    "standard-deviation-calculator",
    "regression-calculator",
    "correlation-coefficient-calculator",
    "data-growth-calculator",
  ],
  seo: {
    title: "Free Moving Average Calculator Online – SMA, EMA & WMA Calculator",
    description: "Calculate Simple, Exponential, and Weighted Moving Averages instantly online. Analyze trends, visualize data with interactive charts, and export results as CSV or JSON. Free, fast, and 100% browser-based.",
    keywords: [
      "moving average calculator",
      "simple moving average calculator",
      "SMA calculator",
      "EMA calculator",
      "weighted moving average calculator",
      "moving average online",
      "trend analysis calculator",
      "statistics calculator",
      "time series calculator",
      "financial moving average tool",
    ],
    openGraph: {
      title: "Free Moving Average Calculator Online",
      description: "Calculate Simple, Weighted, and Exponential Moving Averages instantly with an interactive trend chart, summary statistics, and downloadable reports.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/moving-average-calculator`,
    },
    og: {
      title: "Free Moving Average Calculator Online",
      description: "Calculate Simple, Weighted, and Exponential Moving Averages instantly with an interactive trend chart, summary statistics, and downloadable reports.",
      url: `${siteConfig.url}/tools/data-analytics/moving-average-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Dataset",
        text: "Type or paste numbers separated by commas, spaces, or new lines, or upload a CSV or TXT file — separators are detected automatically.",
      },
      {
        name: "Choose a Moving Average Type",
        text: "Select Simple Moving Average (SMA), Weighted Moving Average (WMA), or Exponential Moving Average (EMA) based on how much recent values should be weighted.",
      },
      {
        name: "Set the Window Size",
        text: "Choose how many consecutive values are averaged together, from 2 up to 1,000.",
      },
      {
        name: "Read the Live Results",
        text: "The moving average values, summary statistics, and trend chart update instantly as you edit the dataset or settings.",
      },
      {
        name: "Visualize and Export",
        text: "Toggle the original data and moving average line on the chart, download it as PNG or SVG, and export the full results as CSV or JSON.",
      },
    ],
    faq: [
      {
        q: "What is a moving average calculator?",
        a: "A moving average calculator is a free browser-based tool that smooths out fluctuations in a dataset by averaging consecutive groups of values. It supports Simple, Weighted, and Exponential Moving Average methods, commonly used to identify trends in financial, business, and time-series data.",
      },
      {
        q: "What is the difference between SMA, WMA, and EMA?",
        a: "Simple Moving Average (SMA) gives every value in the window equal weight. Weighted Moving Average (WMA) assigns increasing weight to more recent values within the window. Exponential Moving Average (EMA) applies exponentially decreasing weight to older values, making it more responsive to recent changes.",
      },
      {
        q: "How is the Simple Moving Average calculated?",
        a: "SMA = (x₁ + x₂ + ... + xₙ) / n, where n is the window size. For the dataset 10, 20, 30, 40, 50 with a window of 3, the SMA values are 20, 30, and 40.",
      },
      {
        q: "How is the Exponential Moving Average calculated?",
        a: "EMA uses a multiplier of 2 / (window + 1). The first EMA value is seeded using the simple average of the first window, then each subsequent value is calculated as (Current × Multiplier) + (Previous EMA × (1 − Multiplier)).",
      },
      {
        q: "What window size should I use?",
        a: "Smaller windows react faster to recent changes but are noisier, while larger windows produce smoother trends but lag behind sudden changes. Common choices include 3–7 for short-term trends and 20–200 for longer-term financial analysis.",
      },
      {
        q: "Can I upload a dataset instead of typing it?",
        a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file directly onto the input box. The calculator automatically extracts valid numeric values and ignores invalid rows.",
      },
      {
        q: "What happens if my window size is larger than my dataset?",
        a: "The calculator displays a friendly warning — 'Window size cannot exceed dataset length' — and won't calculate until you either reduce the window size or add more data.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator uses an efficient sliding-window algorithm for SMA and O(n) calculations for WMA and EMA, comfortably handling tens of thousands of values with instant, debounced recalculation.",
      },
      {
        q: "Can I see both the original data and the moving average on the same chart?",
        a: "Yes. The trend chart lets you toggle the original data line and the moving average line independently, so you can compare raw fluctuations against the smoothed trend.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
