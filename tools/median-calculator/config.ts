import { siteConfig } from "@/config/site";

export const medianCalculatorConfig = {
  slug: "median-calculator",
  name: "Median Calculator",
  description: "Calculate the median of any numerical dataset instantly. Supports comma, space, newline, and CSV/TXT file input with automatic sorting, step-by-step explanations, and downloadable reports. Free browser-based tool.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "mean-calculator",
    "standard-deviation-calculator",
    "data-growth-calculator",
    "etl-throughput-calculator",
    "storage-requirement-calculator",
    "session-duration-calculator",
  ],
  seo: {
    title: "Free Median Calculator Online — Find the Median of Any Dataset Instantly | Productive Toolbox",
    description: "Calculate the median of any dataset instantly with this free online Median Calculator. Supports comma, space, newline, CSV, and TXT inputs with step-by-step explanations, sorted results, and downloadable reports.",
    keywords: [
      "median calculator",
      "find median",
      "statistics calculator",
      "dataset median",
      "online median calculator",
      "statistics tool",
      "math calculator",
      "median formula",
      "median finder",
      "free median calculator",
      "median of a list",
      "even odd median calculator",
      "csv median calculator",
      "sorted dataset calculator",
      "statistics for students",
      "data analysis calculator",
      "middle value calculator",
      "central tendency calculator",
      "median vs mean calculator",
      "free statistics tool",
    ],
    openGraph: {
      title: "Free Median Calculator Online",
      description: "Quickly calculate the median of any numerical dataset with live results, automatic sorting, explanations, CSV support, and downloadable reports.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/median-calculator`,
    },
    og: {
      title: "Free Median Calculator Online",
      description: "Quickly calculate the median of any numerical dataset with live results, automatic sorting, explanations, CSV support, and downloadable reports.",
      url: `${siteConfig.url}/tools/data-analytics/median-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Dataset",
        text: "Type or paste numbers separated by commas, spaces, or new lines, or upload a CSV or TXT file — separators are detected automatically.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to round the result to, from 0 up to 6 places.",
      },
      {
        name: "Read the Live Median",
        text: "The median, sorted dataset, and key statistics update instantly as you type or edit your data.",
      },
      {
        name: "Review the Explanation",
        text: "Check the step-by-step breakdown showing the sorted dataset, middle position, formula, and exact calculation used.",
      },
      {
        name: "Copy or Export",
        text: "Copy the median or sorted dataset, or download a full report as TXT or CSV.",
      },
    ],
    faq: [
      {
        q: "What is a median calculator?",
        a: "A median calculator is a free browser-based tool that instantly finds the middle value of a numerical dataset. It sorts your data automatically, determines whether the count is odd or even, and applies the correct formula to compute the median.",
      },
      {
        q: "How is the median calculated?",
        a: "First, sort the dataset in ascending order. If the count is odd, the median is the single middle value. If the count is even, the median is the average of the two middle values. For example, the median of 10, 20, 30, 40, 50 is 30, while the median of 3, 9, 15, 28 is (9 + 15) / 2 = 12.",
      },
      {
        q: "What is the difference between median and mean?",
        a: "The mean is the sum of all values divided by the count, while the median is the middle value when the data is sorted. The median is less affected by extreme outliers, which makes it a better measure of \"typical\" value for skewed datasets like income or home prices.",
      },
      {
        q: "What separators does the calculator support?",
        a: "You can separate numbers with commas, spaces, new lines, tabs, or semicolons — including mixed combinations — and the calculator automatically detects and parses them correctly.",
      },
      {
        q: "Can I upload a CSV or TXT file instead of typing numbers?",
        a: "Yes. Use the Upload CSV / TXT button or drag and drop a file directly onto the input box. The calculator extracts all valid numeric values and ignores empty cells or non-numeric text automatically.",
      },
      {
        q: "What happens if my dataset contains invalid values?",
        a: "Any non-numeric entries are automatically ignored during calculation and listed in a warning message, so you can see exactly what was excluded without the calculation failing.",
      },
      {
        q: "Does the calculator support negative numbers and decimals?",
        a: "Yes. Integers, decimals, and negative numbers are all fully supported and sorted correctly using standard numeric comparison.",
      },
      {
        q: "How large a dataset can I calculate the median for?",
        a: "The calculator is optimized to handle large datasets efficiently — comfortably processing hundreds to thousands of values instantly using JavaScript's built-in sorting.",
      },
      {
        q: "Can I change how many decimal places the result shows?",
        a: "Yes. Use the Precision selector to choose between 0 and 6 decimal places — useful when your median falls between two values and produces a repeating or long decimal.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you. Calculation history is stored only in your browser's local storage.",
      },
    ],
  },
};
