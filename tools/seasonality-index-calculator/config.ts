import { siteConfig } from "@/config/site";

export const seasonalityIndexCalculatorConfig = {
  slug: "seasonality-index-calculator",
  name: "Seasonality Index Calculator",
  description: "Calculate seasonality indexes from monthly, quarterly, weekly, or daily data instantly. Free online seasonality calculator with CSV import, interactive charts, and multiple calculation methods.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "time-series-forecast-calculator",
    "user-growth-rate-calculator",
    "data-growth-calculator",
    "correlation-coefficient-calculator",
    "session-duration-calculator",
    "sample-size-calculator",
  ],
  seo: {
    title: "Free Seasonality Index Calculator – Analyze Monthly & Quarterly Seasonal Trends Online",
    description: "Calculate seasonality indexes instantly using historical sales, revenue, traffic, or business data. Upload CSV, visualize trends, export reports, and analyze recurring seasonal patterns with this free browser-based Seasonality Index Calculator.",
    keywords: [
      "seasonality index calculator",
      "seasonality calculator",
      "seasonal analysis tool",
      "sales seasonality calculator",
      "monthly seasonality index",
      "quarterly seasonality analysis",
      "business seasonality calculator",
      "historical trend analysis",
      "seasonal demand calculator",
      "seasonality forecasting tool",
    ],
    openGraph: {
      title: "Free Seasonality Index Calculator",
      description: "Instantly calculate seasonality indexes, identify peak and low periods, and visualize seasonal trends using this fast, browser-based calculator.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/seasonality-index-calculator`,
    },
    og: {
      title: "Free Seasonality Index Calculator",
      description: "Instantly calculate seasonality indexes, identify peak and low periods, and visualize seasonal trends using this fast, browser-based calculator.",
      url: `${siteConfig.url}/tools/data-analytics/seasonality-index-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Data",
        text: "Add rows manually, paste data copied from Excel or Google Sheets, or upload a CSV file with Period and Value columns.",
      },
      {
        name: "Choose a Season Type",
        text: "Select Monthly, Quarterly, Weekly, Daily, or Custom to match how your data repeats.",
      },
      {
        name: "Pick a Calculation Method",
        text: "Choose Simple Average, Ratio-to-Moving-Average, Deseasonalized, or Custom Seasonal Average.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to display, from 0 to 4.",
      },
      {
        name: "Review the Results",
        text: "The seasonality index table, chart, and smart insights update instantly as you edit your data.",
      },
      {
        name: "Export or Share",
        text: "Copy the report, download a CSV or JSON file, or print a formatted results page.",
      },
    ],
    faq: [
      {
        q: "What is a seasonality index calculator?",
        a: "A seasonality index calculator is a free browser-based tool that measures how much a repeating period, like a month or quarter, deviates from the overall average across a historical dataset. It groups your data by period and returns an index for each one.",
      },
      {
        q: "How is the seasonality index calculated?",
        a: "The seasonality index equals (Season Average ÷ Overall Average) × 100. For example, if January averages 110 across three years and the overall average across all months is 97.5, January's index is (110 ÷ 97.5) × 100 = 112.82.",
      },
      {
        q: "What does an index above or below 100 mean?",
        a: "An index of 100 means that period performs exactly at the overall average. An index above 100 means the period performs above average, and an index below 100 means it performs below average.",
      },
      {
        q: "What's the difference between the four calculation methods?",
        a: "Simple Average directly compares each period's average to the overall average. Ratio-to-Moving-Average removes an underlying trend before computing seasonal ratios. Deseasonalized uses the seasonal indices to strip seasonality out of the original series. Custom Seasonal Average weights more recent cycles more heavily.",
      },
      {
        q: "How much data do I need for a reliable seasonality index?",
        a: "At least two full cycles (for example, two years of monthly data) are recommended, and three or more cycles produce more reliable results.",
      },
      {
        q: "Can I paste data directly from Excel or Google Sheets?",
        a: "Yes. Click 'Paste Data,' then paste your copied spreadsheet rows directly into the text box — the calculator automatically detects tab or comma-separated values and an optional header row.",
      },
      {
        q: "Why does the calculator flag duplicate rows?",
        a: "Identical period-and-value pairs appearing more than once often indicate an accidental copy-paste duplication. The calculator flags this as a warning without blocking your calculation.",
      },
      {
        q: "What does the 'Low,' 'Moderate,' and 'Strong Seasonality' classification mean?",
        a: "It's based on the spread between your highest and lowest seasonality index. A small spread means consistent performance across periods, while a large spread indicates a strong, predictable seasonal pattern.",
      },
      {
        q: "Is my dataset saved anywhere?",
        a: "Your dataset is automatically saved to your browser's local storage so you don't lose your work on refresh, but it is never transmitted to any server.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations, parsing, and file reading happen entirely in your browser using JavaScript. Your dataset is never uploaded to any server.",
      },
    ],
  },
};
