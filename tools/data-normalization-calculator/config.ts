import { siteConfig } from "@/config/site";

export const dataNormalizationCalculatorConfig = {
  slug: "data-normalization-calculator",
  name: "Data Normalization Calculator",
  description: "Normalize numeric datasets using Min-Max, Z-Score, Decimal Scaling, Unit Vector, Mean Normalization, or Robust Scaling instantly, with before/after comparison and CSV/JSON export. Free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "min-max-scaling-calculator",
    "log-transformation-calculator",
    "standard-deviation-calculator",
    "z-score-calculator",
    "mean-calculator",
    "variance-calculator",
  ],
  seo: {
    title: "Data Normalization Calculator — Free Min-Max, Z-Score & More",
    description: "Normalize datasets instantly using Min-Max, Z-Score, Mean Normalization, Decimal Scaling, Unit Vector, and Robust Scaling. Free online calculator with charts and CSV/JSON export.",
    keywords: [
      "data normalization calculator",
      "normalize dataset",
      "min max normalization",
      "z score normalization calculator",
      "mean normalization",
      "decimal scaling",
      "robust scaling calculator",
      "unit vector normalization",
      "machine learning preprocessing",
      "statistics calculator",
      "dataset normalization online",
      "feature scaling calculator",
      "data preprocessing tool",
      "normalize numbers online",
      "min max scaling calculator",
      "standardize dataset",
      "free data normalization tool",
      "csv normalization tool",
      "online statistics calculator",
      "data science preprocessing tool",
    ],
    openGraph: {
      title: "Free Data Normalization Calculator Online",
      description: "Normalize datasets instantly using six standard techniques — Min-Max, Z-Score, Decimal Scaling, Unit Vector, Mean Normalization, and Robust Scaling — with before/after comparison.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/data-normalization-calculator`,
    },
    og: {
      title: "Free Data Normalization Calculator Online",
      description: "Normalize datasets instantly using six standard techniques — Min-Max, Z-Score, Decimal Scaling, Unit Vector, Mean Normalization, and Robust Scaling — with before/after comparison.",
      url: `${siteConfig.url}/tools/data-analytics/data-normalization-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Dataset",
        text: "Type or paste numbers separated by commas, spaces, new lines, or semicolons — separators are detected automatically.",
      },
      {
        name: "Choose a Normalization Method",
        text: "Select Min-Max, Min-Max Custom Range, Z-Score, Decimal Scaling, Unit Vector, Mean Normalization, or Robust Scaling depending on your use case.",
      },
      {
        name: "Set a Custom Range (Optional)",
        text: "If using Min-Max Custom Range, enter your target minimum and maximum values instead of the default 0 to 1.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to round the normalized values to, from 0 up to 10 places.",
      },
      {
        name: "Review the Comparison",
        text: "See the before-and-after table and chart update instantly, along with summary statistics for both the original and normalized data.",
      },
      {
        name: "Export Your Results",
        text: "Copy the normalized dataset, download it as CSV, TXT, or JSON, or download the comparison chart as PNG.",
      },
    ],
    faq: [
      {
        q: "What is a data normalization calculator?",
        a: "A data normalization calculator is a free browser-based tool that transforms numeric datasets onto a comparable scale using standard techniques like Min-Max, Z-Score, and Robust Scaling. It's commonly used to prepare data for machine learning models, statistical comparison, and visualization.",
      },
      {
        q: "What is the difference between Min-Max and Z-Score normalization?",
        a: "Min-Max normalization rescales values into a fixed range, typically 0 to 1, using the dataset's minimum and maximum. Z-Score standardization instead centers values around a mean of 0 with a standard deviation of 1, which is less sensitive to a fixed range but more sensitive to outliers than Min-Max.",
      },
      {
        q: "When should I use Robust Scaling instead of Min-Max or Z-Score?",
        a: "Use Robust Scaling when your dataset contains significant outliers, since it centers on the median and scales by the interquartile range (IQR) rather than the mean and standard deviation — both of which are heavily influenced by extreme values.",
      },
      {
        q: "How does Decimal Scaling work?",
        a: "Decimal Scaling divides every value by a power of 10 large enough that the largest absolute value in the result is less than 1. For example, a dataset with a maximum absolute value of 917 would be divided by 1,000 (10³), moving the decimal point three places.",
      },
      {
        q: "What is Unit Vector (L2) normalization used for?",
        a: "Unit Vector normalization divides each value by the L2 norm (Euclidean magnitude) of the whole dataset, producing a vector with a magnitude of exactly 1 — it's commonly used in machine learning when the direction of a feature vector matters more than its absolute magnitude.",
      },
      {
        q: "Why would min-max normalization fail on my dataset?",
        a: "Min-Max normalization requires a non-zero range between the minimum and maximum values. If every value in your dataset is identical, the range is zero and normalization is undefined — the calculator will show a clear error message in that case.",
      },
      {
        q: "Can I use a custom range for Min-Max normalization?",
        a: "Yes. Select Min-Max (Custom Range) and enter your own target minimum and maximum, such as -1 to 1, instead of the default 0 to 1. This is useful for algorithms that expect input features centered around zero.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator uses efficient, single-pass statistical calculations and comfortably handles datasets with tens of thousands of values with instant, debounced recalculation directly in your browser.",
      },
      {
        q: "Can I upload a dataset instead of typing it?",
        a: "Yes. Paste your data directly into the input box — commas, spaces, new lines, tabs, and semicolons are all detected automatically as separators, so you can paste directly from a spreadsheet.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
