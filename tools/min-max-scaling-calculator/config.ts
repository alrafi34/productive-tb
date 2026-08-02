import { siteConfig } from "@/config/site";

export const minMaxScalingCalculatorConfig = {
  slug: "min-max-scaling-calculator",
  name: "Min-Max Scaling Calculator",
  description: "Normalize datasets instantly using min-max scaling. Scale numbers to any range including 0–1, -1–1, or a custom range. Free, fast, and browser-based — perfect for machine learning, statistics, and data analysis.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "data-normalization-calculator",
    "log-transformation-calculator",
    "standard-deviation-calculator",
    "z-score-calculator",
    "mean-calculator",
    "outlier-detection-calculator",
  ],
  seo: {
    title: "Free Min-Max Scaling Calculator (Normalization Calculator) Online",
    description: "Normalize datasets instantly using the min-max scaling calculator. Scale numbers to any range including 0–1, -1–1, or custom ranges. Free, fast, browser-based, and perfect for machine learning and data analysis.",
    keywords: [
      "min max scaling calculator",
      "normalization calculator",
      "data normalization",
      "feature scaling",
      "machine learning normalization",
      "min max normalization",
      "statistics calculator",
      "normalize data online",
      "feature scaling calculator",
      "machine learning calculator",
      "rescale data calculator",
      "data scaling tool",
      "free normalization calculator",
    ],
    openGraph: {
      title: "Free Min-Max Scaling Calculator Online",
      description: "Normalize datasets instantly using min-max scaling — scale numbers to any custom range, all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/min-max-scaling-calculator`,
    },
    og: {
      title: "Free Min-Max Scaling Calculator Online",
      description: "Normalize datasets instantly using min-max scaling — scale numbers to any custom range, all in your browser.",
      url: `${siteConfig.url}/tools/data-analytics/min-max-scaling-calculator`,
    },
    howToSteps: [
      {
        name: "Add Your Dataset",
        text: "Paste or type your numbers — one per line, comma-separated, or space-separated — or drag and drop a CSV or TXT file.",
      },
      {
        name: "Set Your Target Range",
        text: "Enter the target minimum and maximum you want your values scaled into, such as 0 to 1 or -1 to 1.",
      },
      {
        name: "Choose Decimal Places",
        text: "Select how many decimal places to display in the scaled output, from 0 to 6.",
      },
      {
        name: "Read the Live Results",
        text: "The scaled dataset, original range, and target range update instantly as you edit your data.",
      },
      {
        name: "Copy or Export",
        text: "Copy the scaled values directly, or download them as CSV, JSON, or TXT.",
      },
    ],
    faq: [
      {
        q: "What is a min-max scaling calculator?",
        a: "A min-max scaling calculator is a free browser-based tool that rescales a list of numbers into a custom target range using min-max normalization. It finds the minimum and maximum of your dataset and proportionally maps every value onto your chosen output range.",
      },
      {
        q: "How is min-max scaling calculated?",
        a: "Each value is transformed using the formula: Scaled equals the original value minus the minimum, divided by the maximum minus the minimum, times the target range, plus the target minimum.",
      },
      {
        q: "What is a good target range for min-max scaling?",
        a: "It depends on your use case. 0 to 1 is the most common choice for machine learning features. Minus 1 to 1 is often used when a zero-centered range benefits your model. 0 to 100 is useful when you want a percentage-like scale for reporting or visualization.",
      },
      {
        q: "What is the difference between min-max scaling and standardization?",
        a: "Min-max scaling compresses values into a fixed, bounded range, such as 0 to 1, based on the dataset's minimum and maximum. Standardization, also called Z-score normalization, instead centers data around a mean of 0 with a standard deviation of 1, and is not bounded to a fixed range.",
      },
      {
        q: "Why does my dataset show 'all values are identical'?",
        a: "Min-max scaling divides by the range of your dataset, meaning the maximum minus the minimum. If every value is the same, that range is zero, which makes the formula undefined, so the calculator detects this and explains it instead of returning a misleading result.",
      },
      {
        q: "Is min-max scaling sensitive to outliers?",
        a: "Yes. Because the formula depends directly on the dataset's minimum and maximum, a single extreme outlier stretches the range and compresses the rest of your values into a narrow sub-interval. Consider removing or capping outliers first if this is a concern.",
      },
      {
        q: "Can I paste data directly from Excel?",
        a: "Yes. The calculator automatically detects comma, tab, space, and newline-separated values, so pasting a column or row directly from Excel or Google Sheets works without any reformatting.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator computes the minimum, maximum, and scaled values in a single efficient pass and comfortably handles very large datasets. The results table displays the first 200 rows for readability, while exports include your complete dataset.",
      },
      {
        q: "What happens to invalid values in my dataset?",
        a: "Any entry that isn't a valid number is skipped and reported with its line number, so you can quickly spot and fix typos or non-numeric entries without losing the rest of your valid data.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
