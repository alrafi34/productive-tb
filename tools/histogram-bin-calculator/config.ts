import { siteConfig } from "@/config/site";

export const histogramBinCalculatorConfig = {
  slug: "histogram-bin-calculator",
  name: "Histogram Bin Calculator",
  description: "Determine the optimal number of histogram bins using Sturges', Rice, Square Root, Scott's, Freedman-Diaconis, or Doane's formula — or compare all methods at once with descriptive statistics and an interactive bar chart.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "standard-deviation-calculator",
    "percentile-calculator",
    "mean-calculator",
    "median-calculator",
    "outlier-detection-calculator",
    "data-normalization-calculator",
  ],
  seo: {
    title: "Free Histogram Bin Calculator – Determine Optimal Histogram Bins Online",
    description: "Calculate the optimal number of histogram bins using Sturges, Rice, Scott, Freedman–Diaconis, Square Root, and Doane formulas. Generate histograms, compare methods, visualize frequency distributions, and export results instantly.",
    keywords: [
      "histogram bin calculator",
      "histogram bins",
      "optimal histogram bins",
      "sturges rule calculator",
      "rice rule calculator",
      "scott rule calculator",
      "freedman diaconis calculator",
      "doane formula calculator",
      "statistics calculator",
      "frequency distribution calculator",
      "histogram generator",
      "data analysis tool",
      "bin count calculator",
      "histogram bar chart generator",
      "optimal bin width calculator",
    ],
    openGraph: {
      title: "Free Histogram Bin Calculator",
      description: "Determine the optimal number of histogram bins with Sturges', Rice, Square Root, Scott's, Freedman-Diaconis, or Doane's formula — or compare all methods at once.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/histogram-bin-calculator`,
    },
    og: {
      title: "Free Histogram Bin Calculator",
      description: "Determine the optimal number of histogram bins with Sturges', Rice, Square Root, Scott's, Freedman-Diaconis, or Doane's formula — or compare all methods at once.",
      url: `${siteConfig.url}/tools/data-analytics/histogram-bin-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Dataset",
        text: "Type or paste numbers separated by commas, spaces, or new lines, or upload a CSV/TXT file.",
      },
      {
        name: "Choose a Binning Method",
        text: "Select Auto to compare every method at once, or pick Sturges', Rice, Square Root, Scott's, Freedman-Diaconis, Doane's, or a manual bin count.",
      },
      {
        name: "Review the Statistics and Bin Count",
        text: "See sample size, mean, median, standard deviation, IQR, skewness, and the calculated bin count and width.",
      },
      {
        name: "Compare Methods",
        text: "Open the Formula Comparison panel to see every method's bin count side-by-side and the recommended median value.",
      },
      {
        name: "Explore the Histogram Chart",
        text: "View the frequency distribution as an interactive bar chart with counts and percentages per bin, adjustable from 300px to 1000px wide.",
      },
      {
        name: "Export or Share",
        text: "Copy the full report, download a CSV, JSON, or PNG chart, or print a formatted results page.",
      },
    ],
    faq: [
      {
        q: "What is a histogram bin calculator?",
        a: "A histogram bin calculator is a free browser-based tool that determines the optimal number of bins (or bin width) for grouping a numeric dataset into a histogram, using standard statistical rules like Sturges', Rice, Square Root, Freedman-Diaconis, and Scott's rule.",
      },
      {
        q: "What is Sturges' Rule?",
        a: "Sturges' Rule calculates bin count as k = ⌈log₂(n) + 1⌉, where n is the number of data points. It works well for normally distributed data of moderate size but can under-bin large or skewed datasets.",
      },
      {
        q: "What is the Freedman-Diaconis Rule?",
        a: "The Freedman-Diaconis Rule calculates bin width based on the interquartile range: width = 2 × IQR ÷ n^(1/3). It's more robust to outliers and skewed data than Sturges' Rule since it uses IQR instead of range.",
      },
      {
        q: "What is Scott's Rule?",
        a: "Scott's Rule calculates bin width using the standard deviation: width = 3.49 × σ ÷ n^(1/3). It's optimal for data that is approximately normally distributed.",
      },
      {
        q: "What is Doane's Formula?",
        a: "Doane's Formula extends Sturges' Rule by adjusting for the skewness of your dataset: k = 1 + log₂(n) + log₂(1 + |g₁|/σ_g₁), where g₁ is the sample skewness. It performs noticeably better than Sturges' Rule on skewed, non-normal data.",
      },
      {
        q: "What does Auto (Compare All) mode do?",
        a: "Auto mode calculates the bin count from every supported method — Square Root, Sturges', Rice, Scott's, Freedman-Diaconis, and Doane's — and uses the median of those results as the recommended bin count, while displaying the full comparison so you can see how each method differs.",
      },
      {
        q: "Which binning method should I use?",
        a: "Use Auto mode if you're unsure — it gives you a balanced, median-based recommendation. Use Sturges' Rule for small, roughly normal datasets. Use Freedman-Diaconis or Scott's Rule when your data may be skewed or contain outliers. Use Doane's Formula specifically when your data has noticeable skewness.",
      },
      {
        q: "Can I set a manual bin count instead of using a formula?",
        a: "Yes. Select Manual Bin Count and enter any number of bins you want, overriding the automatic formula-based calculation.",
      },
      {
        q: "How is bin width calculated from bin count?",
        a: "Bin Width = (Max − Min) ÷ Number of Bins. Each bin covers an equal-width range of the data except the final bin, which is inclusive of the maximum value.",
      },
      {
        q: "Can I upload a dataset instead of typing it?",
        a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file directly onto the input box.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator bins data in a single efficient pass and comfortably handles thousands of values with instant, debounced recalculation.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
