import { siteConfig } from "@/config/site";

export const correlationCoefficientCalculatorConfig = {
  slug: "correlation-coefficient-calculator",
  name: "Correlation Coefficient Calculator",
  description: "Calculate Pearson, Spearman, and Kendall correlation coefficients instantly. Visualize relationships with a scatter plot and regression line, detect outliers, and export detailed reports. Free browser-based tool.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "mean-calculator",
    "median-calculator",
    "standard-deviation-calculator",
    "regression-calculator",
    "data-growth-calculator",
    "session-duration-calculator",
  ],
  seo: {
    title: "Free Correlation Coefficient Calculator Online | Pearson, Spearman & Kendall Correlation",
    description: "Calculate Pearson, Spearman, and Kendall correlation coefficients instantly. Analyze relationships between variables, visualize scatter plots, import CSV files, export reports, and perform statistical analysis entirely in your browser.",
    keywords: [
      "correlation coefficient calculator",
      "pearson correlation calculator",
      "spearman correlation calculator",
      "kendall tau calculator",
      "statistics calculator",
      "data analysis tool",
      "scatter plot calculator",
      "correlation analysis",
      "correlation formula",
      "online correlation calculator",
      "free statistics calculator",
      "relationship between variables",
    ],
    openGraph: {
      title: "Free Correlation Coefficient Calculator Online",
      description: "Calculate Pearson, Spearman, and Kendall correlation coefficients instantly with scatter plot visualization, regression line, outlier detection, and downloadable reports.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/correlation-coefficient-calculator`,
    },
    og: {
      title: "Free Correlation Coefficient Calculator Online",
      description: "Calculate Pearson, Spearman, and Kendall correlation coefficients instantly with scatter plot visualization, regression line, outlier detection, and downloadable reports.",
      url: `${siteConfig.url}/tools/data-analytics/correlation-coefficient-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Paired Data",
        text: "Type or paste numbers into the Variable X and Variable Y boxes, one value per line, or upload a CSV file and select two numeric columns.",
      },
      {
        name: "Choose a Correlation Method",
        text: "Select Pearson (default) for linear relationships, Spearman for ranked/monotonic relationships, or Kendall Tau for a rank-based concordance measure.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places the coefficient and statistics are rounded to.",
      },
      {
        name: "Read the Live Results",
        text: "The correlation coefficient, R², interpretation, and regression equation update instantly as you edit either variable.",
      },
      {
        name: "Visualize and Export",
        text: "Review the scatter plot with the regression trend line and highlighted outliers, then export your results as CSV, JSON, PNG, SVG, or a printable report.",
      },
    ],
    faq: [
      {
        q: "What is a correlation coefficient calculator?",
        a: "A correlation coefficient calculator is a free browser-based tool that measures the statistical relationship between two variables. It computes Pearson, Spearman, or Kendall correlation coefficients, visualizes the relationship on a scatter plot, and explains the strength and direction of the relationship.",
      },
      {
        q: "What is the difference between Pearson, Spearman, and Kendall correlation?",
        a: "Pearson correlation measures the strength of a linear relationship between two continuous variables. Spearman correlation measures the strength of a monotonic relationship using ranked values, making it more robust to outliers and non-linear trends. Kendall Tau measures the ordinal association between variables based on concordant and discordant pairs, and is often preferred for smaller datasets.",
      },
      {
        q: "How is the Pearson correlation coefficient calculated?",
        a: "It is calculated as the covariance of the two variables divided by the product of their standard deviations: r = Σ((xi − x̄)(yi − ȳ)) / √(Σ(xi − x̄)² × Σ(yi − ȳ)²). The result ranges from −1 (perfect negative correlation) to +1 (perfect positive correlation).",
      },
      {
        q: "What does an R² value mean?",
        a: "R² (the coefficient of determination) is the square of the correlation coefficient. It represents the proportion of variance in one variable that can be explained by the other. An R² of 0.60 means 60% of the variation in Y is explained by X.",
      },
      {
        q: "How do I interpret the correlation strength?",
        a: "Values of 0.90–0.99 indicate a very strong relationship, 0.70–0.89 a strong relationship, 0.40–0.69 a moderate relationship, 0.10–0.39 a weak relationship, and near 0 indicates no meaningful linear relationship. The sign indicates direction — positive means both variables increase together, negative means one increases as the other decreases.",
      },
      {
        q: "What does the scatter plot and regression line show?",
        a: "The scatter plot shows each (X, Y) pair as a point, with a blue regression line representing the best linear fit. Points highlighted in red are statistical outliers — data points whose residual from the regression line deviates more than two standard deviations from the mean residual.",
      },
      {
        q: "Can I upload a CSV file instead of typing values?",
        a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file onto the input box. The tool automatically detects numeric columns and lets you choose which columns map to Variable X and Variable Y.",
      },
      {
        q: "Do X and Y need the same number of values?",
        a: "Yes. Correlation requires paired observations, so Variable X and Variable Y must contain the same number of values. If they don't match, the calculator warns you and uses only the paired rows available.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "Pearson and Spearman correlation use efficient O(n log n) calculations and comfortably handle tens of thousands of data points. Kendall Tau uses pairwise comparison and is capped at 3,000 points for performance on very large datasets.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
