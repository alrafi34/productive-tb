import { siteConfig } from "@/config/site";

export const standardDeviationCalculatorConfig = {
  slug: "standard-deviation-calculator",
  name: "Standard Deviation Calculator",
  description: "Calculate sample and population standard deviation instantly. Analyze datasets with variance, mean, median, mode, quartiles, IQR, and coefficient of variation, with histogram and box plot visualization. Free browser-based tool.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "mean-calculator",
    "median-calculator",
    "data-growth-calculator",
    "etl-throughput-calculator",
    "storage-requirement-calculator",
    "session-duration-calculator",
  ],
  seo: {
    title: "Free Standard Deviation Calculator Online | Sample & Population Statistics | Productive Toolbox",
    description: "Calculate sample and population standard deviation instantly. Analyze datasets with variance, mean, median, range, quartiles, histograms, and downloadable reports using this free online Standard Deviation Calculator.",
    keywords: [
      "standard deviation calculator",
      "sample standard deviation calculator",
      "population standard deviation calculator",
      "statistics calculator",
      "variance calculator",
      "mean calculator",
      "data analysis tool",
      "statistics online",
      "free statistics calculator",
      "standard deviation formula",
      "dataset calculator",
      "statistics tool",
      "quartile calculator",
      "interquartile range calculator",
      "coefficient of variation calculator",
      "standard error calculator",
      "histogram generator",
      "box plot calculator",
      "csv statistics calculator",
      "online statistics tool",
    ],
    openGraph: {
      title: "Free Standard Deviation Calculator Online",
      description: "Calculate sample and population standard deviation instantly with variance, quartiles, histogram and box plot visualization, and downloadable reports.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/standard-deviation-calculator`,
    },
    og: {
      title: "Free Standard Deviation Calculator Online",
      description: "Calculate sample and population standard deviation instantly with variance, quartiles, histogram and box plot visualization, and downloadable reports.",
      url: `${siteConfig.url}/tools/data-analytics/standard-deviation-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Dataset",
        text: "Type or paste numbers separated by commas, spaces, or new lines, or upload a CSV or TXT file — separators are detected automatically.",
      },
      {
        name: "Choose Population or Sample",
        text: "Select Population Standard Deviation if your data represents the entire group, or Sample Standard Deviation if it represents a subset.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to round results to, from 0 up to 10 places for high-precision needs.",
      },
      {
        name: "Read the Live Statistics",
        text: "The standard deviation, variance, mean, median, mode, quartiles, and more update instantly as you type.",
      },
      {
        name: "Visualize and Export",
        text: "Switch between a histogram and box plot visualization, download the chart as PNG, and export your full report as TXT, CSV, or JSON.",
      },
    ],
    faq: [
      {
        q: "What is a standard deviation calculator?",
        a: "A standard deviation calculator is a free browser-based tool that measures how spread out a dataset is from its average (mean). It computes both population and sample standard deviation, along with variance, median, mode, quartiles, and other statistical measures.",
      },
      {
        q: "What is the difference between population and sample standard deviation?",
        a: "Population standard deviation (σ) divides the sum of squared differences by N (the full count) and is used when your data represents an entire group. Sample standard deviation (s) divides by N − 1 and is used when your data represents a subset of a larger population — this correction (Bessel's correction) accounts for the extra uncertainty in estimating from a sample.",
      },
      {
        q: "How is standard deviation calculated?",
        a: "First calculate the mean, then find the squared difference between each value and the mean, sum those squared differences, divide by N (population) or N − 1 (sample), and take the square root. For the dataset 10, 20, 30, 40, 50, the sample standard deviation is 15.81 and the population standard deviation is 14.14.",
      },
      {
        q: "What do Q1, Q3, and IQR mean?",
        a: "Q1 (first quartile) is the median of the lower half of your sorted dataset, and Q3 (third quartile) is the median of the upper half. The Interquartile Range (IQR = Q3 − Q1) measures the spread of the middle 50% of your data, and is less sensitive to outliers than the full range.",
      },
      {
        q: "What is the coefficient of variation?",
        a: "The coefficient of variation (CV) expresses standard deviation as a percentage of the mean: CV = (SD ÷ Mean) × 100. It's useful for comparing variability between datasets with different units or vastly different scales.",
      },
      {
        q: "What does the histogram show?",
        a: "The histogram groups your dataset into bins and displays how many values fall into each range, with dashed lines marking the mean and median, and a shaded band showing the range within one standard deviation of the mean.",
      },
      {
        q: "What does the box plot show?",
        a: "The box plot displays the five-number summary — minimum, Q1, median, Q3, and maximum — as a box and whiskers, with a marker showing where the mean falls relative to the median.",
      },
      {
        q: "Can I upload a dataset instead of typing it?",
        a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file directly onto the input box. The calculator automatically extracts valid numeric values and ignores invalid rows.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator is optimized to handle large datasets efficiently using O(n) statistical calculations, comfortably processing thousands of values with instant, debounced recalculation.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
