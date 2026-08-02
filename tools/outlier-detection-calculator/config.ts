import { siteConfig } from "@/config/site";

export const outlierDetectionCalculatorConfig = {
  slug: "outlier-detection-calculator",
  name: "Outlier Detection Calculator",
  description: "Identify outliers in a dataset using the IQR rule, Z-Score method, Modified Z-Score (MAD), percentile bounds, or a custom threshold — with dot plot, box plot, and histogram visualizations.",
  category: "data-analytics",
  icon: "🔍",
  free: true,
  relatedTools: [
    "standard-deviation-calculator",
    "percentile-calculator",
    "histogram-bin-calculator",
    "mean-calculator",
    "median-calculator",
    "z-score-calculator",
  ],
  seo: {
    title: "Free Outlier Detection Calculator – Identify Statistical Outliers Instantly",
    description: "Analyze datasets online using IQR, Z-Score, and Modified Z-Score methods. Detect statistical outliers instantly with interactive charts, summary statistics, CSV export, and real-time analysis. 100% free and browser-based.",
    keywords: [
      "outlier detection calculator",
      "outlier calculator",
      "IQR calculator",
      "z score calculator",
      "modified z score calculator",
      "statistics calculator",
      "detect outliers online",
      "statistical analysis tool",
      "data analysis calculator",
      "box plot calculator",
      "MAD outlier detection",
      "interquartile range outlier",
      "free outlier detection tool",
      "1.5 IQR rule calculator",
      "anomaly detection calculator",
      "percentile outlier detection",
      "custom threshold outlier calculator",
      "outlier removal calculator",
      "histogram outlier calculator",
      "statistical outlier finder",
    ],
    openGraph: {
      title: "Free Outlier Detection Calculator – Identify Statistical Outliers Instantly",
      description: "Identify outliers instantly using the IQR rule, Z-Score method, or Modified Z-Score with an interactive visualization.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/outlier-detection-calculator`,
    },
    og: {
      title: "Free Outlier Detection Calculator – Identify Statistical Outliers Instantly",
      description: "Identify outliers instantly using the IQR rule, Z-Score method, or Modified Z-Score with an interactive visualization.",
      url: `${siteConfig.url}/tools/data-analytics/outlier-detection-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Dataset",
        text: "Type or paste numbers separated by commas, spaces, or new lines.",
      },
      {
        name: "Choose a Detection Method",
        text: "Select the IQR Rule, Z-Score Method, Modified Z-Score (MAD), Percentile-Based, or Custom Threshold.",
      },
      {
        name: "Adjust the Threshold",
        text: "Fine-tune the sensitivity — the IQR multiplier, Z-score cutoff, percentile bounds, or custom min/max — to control how aggressively outliers are flagged.",
      },
      {
        name: "Review Flagged Outliers",
        text: "See which values are flagged as outliers on the dot plot, box plot, or histogram, and in the results table, along with their scores.",
      },
      {
        name: "Export or Share",
        text: "Copy the result, download a report, or save the calculation to your history.",
      },
    ],
    faq: [
      {
        q: "What is an outlier detection calculator?",
        a: "An outlier detection calculator is a free browser-based tool that identifies unusual values in a dataset that deviate significantly from the rest of the data, using the IQR rule, Z-Score method, Modified Z-Score (MAD), Percentile-Based detection, or a Custom Threshold.",
      },
      {
        q: "How does the IQR rule work?",
        a: "The IQR rule flags a value as an outlier if it falls below Q1 − k×IQR or above Q3 + k×IQR, where IQR = Q3 − Q1 and k is typically 1.5 (or 3.0 for 'extreme' outliers).",
      },
      {
        q: "How does the Z-Score method work?",
        a: "The Z-Score method flags a value as an outlier if its Z-score, (value − mean) ÷ standard deviation, exceeds a threshold in absolute value, commonly 2 or 3.",
      },
      {
        q: "What is Modified Z-Score (MAD)?",
        a: "Modified Z-Score uses the median and Median Absolute Deviation (MAD) instead of mean and standard deviation, making it more robust to the very outliers it's trying to detect. A value is flagged if |0.6745 × (value − median) ÷ MAD| exceeds a threshold, commonly 3.5.",
      },
      {
        q: "How does Percentile-Based detection work?",
        a: "It flags any value falling below your chosen lower percentile (e.g., P1) or above your chosen upper percentile (e.g., P99) — a simple, distribution-free way to trim the tails of your data.",
      },
      {
        q: "How does Custom Threshold detection work?",
        a: "You directly specify a minimum and/or maximum acceptable value, and anything outside that range is flagged as an outlier — useful when you already know valid limits from domain knowledge.",
      },
      {
        q: "Which outlier detection method should I use?",
        a: "Use the IQR rule for skewed or non-normal data since it's based on quartiles, not the mean. Use the Z-Score method for roughly normal data. Use Modified Z-Score when your data may already contain extreme outliers. Use Percentile-Based for simple tail trimming, or Custom Threshold when you know valid limits in advance.",
      },
      {
        q: "What threshold should I use?",
        a: "For IQR, 1.5 is standard ('mild' outliers) and 3.0 flags only 'extreme' outliers. For Z-Score, 2 is more sensitive and 3 is more conservative. For Modified Z-Score, 3.5 is the commonly recommended threshold.",
      },
      {
        q: "Should I always remove detected outliers?",
        a: "Not necessarily. An outlier might be a data entry error worth removing, or it might be a genuine, important extreme value worth investigating further. Always look at flagged points individually before deciding.",
      },
      {
        q: "Can I upload a dataset instead of typing it?",
        a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file directly onto the input box.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator computes outlier scores in a single efficient pass and comfortably handles thousands of values with instant, debounced recalculation.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
