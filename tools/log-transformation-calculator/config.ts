import { siteConfig } from "@/config/site";

export const logTransformationCalculatorConfig = {
  slug: "log-transformation-calculator",
  name: "Log Transformation Calculator",
  description: "Transform single values or entire datasets using natural log (ln), log10, log2, or a custom base, with summary statistics and CSV/JSON export. Free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "data-normalization-calculator",
    "min-max-scaling-calculator",
    "standard-deviation-calculator",
    "mean-calculator",
    "exponential-smoothing-calculator",
    "variance-calculator",
  ],
  seo: {
    title: "Log Transformation Calculator — Free Natural Log, Log10 & Log2 Tool",
    description: "Transform datasets instantly using natural log (ln), log10, log2, or any custom base. Supports bulk calculations, summary statistics, and CSV/JSON export. Free, browser-based.",
    keywords: [
      "log transformation calculator",
      "natural log calculator",
      "log10 calculator",
      "log2 calculator",
      "logarithm calculator",
      "data transformation tool",
      "statistical calculator",
      "dataset transformation",
      "machine learning data preprocessing",
      "statistics tool",
      "normalize data with log",
      "log transform dataset",
      "research statistics tool",
      "data science calculator",
      "bulk log calculator",
      "csv log transformation",
      "online statistics calculator",
      "ln calculator online",
      "custom base logarithm calculator",
      "log scale calculator",
    ],
    openGraph: {
      title: "Free Log Transformation Calculator Online",
      description: "Transform single values or entire datasets instantly using natural log, log10, log2, or a custom base, with summary statistics and CSV/JSON export.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/log-transformation-calculator`,
    },
    og: {
      title: "Free Log Transformation Calculator Online",
      description: "Transform single values or entire datasets instantly using natural log, log10, log2, or a custom base, with summary statistics and CSV/JSON export.",
      url: `${siteConfig.url}/tools/data-analytics/log-transformation-calculator`,
    },
    howToSteps: [
      {
        name: "Choose an Input Mode",
        text: "Select Single Value for one number, or Multiple Values to transform an entire dataset at once.",
      },
      {
        name: "Enter Your Data",
        text: "Type a single number, or paste a dataset separated by commas, spaces, new lines, or semicolons — separators are detected automatically.",
      },
      {
        name: "Select a Log Base",
        text: "Choose Natural Log (ln), Base 10, Base 2, or enter a Custom Base greater than 0 and not equal to 1.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to round transformed values to, from 0 up to 6 places.",
      },
      {
        name: "Review the Live Results",
        text: "The transformed values, results table, and before/after summary statistics update instantly as you type.",
      },
      {
        name: "Export Your Results",
        text: "Copy the transformed dataset, or download it as CSV, TXT, or JSON.",
      },
    ],
    faq: [
      {
        q: "What is a log transformation calculator?",
        a: "A log transformation calculator is a free browser-based tool that applies a logarithmic transformation to a single value or an entire dataset, using natural log (ln), log base 10, log base 2, or any custom base you choose.",
      },
      {
        q: "Why would I apply a log transformation to my data?",
        a: "Log transformations reduce skewness in right-skewed data, compress large ranges of values into a more manageable scale, stabilize variance, and make multiplicative relationships additive — all of which make datasets easier to visualize and better suited to statistical models that assume normality.",
      },
      {
        q: "What is the difference between ln, log10, and log2?",
        a: "Natural log (ln) uses base e (≈2.71828) and is standard in calculus and many statistical models. Log10 uses base 10 and is intuitive for orders-of-magnitude comparisons. Log2 uses base 2 and is common in computer science and information theory contexts like bits and doubling time.",
      },
      {
        q: "Why can't I take the log of zero or a negative number?",
        a: "Logarithms are only defined for positive real numbers, since no real exponent applied to a positive base can produce zero or a negative result. This calculator flags zero and negative values as invalid and can automatically skip them if you enable \"Ignore Invalid Values.\"",
      },
      {
        q: "How do I transform an entire dataset at once?",
        a: "Switch to Multiple Values mode and paste your numbers separated by commas, spaces, new lines, or a mix — the calculator automatically detects the separator, transforms every valid value, and shows a results table alongside summary statistics for both the original and transformed data.",
      },
      {
        q: "What does the custom base option let me do?",
        a: "It lets you compute a logarithm in any base you need using the change-of-base formula log_b(x) = ln(x) ÷ ln(b) — useful for domain-specific bases beyond the three built-in presets, as long as the base is greater than 0 and not equal to 1.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator uses efficient array processing and comfortably handles datasets with thousands of values, updating the results table and statistics instantly with a 150ms debounce.",
      },
      {
        q: "What happens to invalid values in my dataset?",
        a: "With \"Ignore Invalid Values\" enabled (the default), zero, negative, and non-numeric entries are automatically skipped and reported in a summary count. With it disabled, the calculator shows an error explaining that at least one value can't be transformed.",
      },
      {
        q: "Can I reverse a log transformation?",
        a: "Yes conceptually — applying the inverse operation (exponentiation with the same base) to a transformed value returns the original number, for example 10^log10(x) = x. This calculator focuses on the forward transformation and its summary statistics.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
