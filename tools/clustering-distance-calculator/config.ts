import { siteConfig } from "@/config/site";

export const clusteringDistanceCalculatorConfig = {
  slug: "clustering-distance-calculator",
  name: "Clustering Distance Calculator",
  description: "Calculate Euclidean, Manhattan, Minkowski, Chebyshev, Cosine, Hamming, Canberra, Bray-Curtis, Pearson, and Jaccard distances between two vectors instantly, with step-by-step breakdowns and visualizations. Free and browser-based.",
  category: "data-analytics",
  icon: "📊",
  free: true,
  relatedTools: [
    "correlation-coefficient-calculator",
    "standard-deviation-calculator",
    "roc-auc-calculator",
    "confusion-matrix-analyzer",
    "regression-calculator",
    "outlier-detection-calculator",
  ],
  seo: {
    title: "Clustering Distance Calculator – Euclidean, Manhattan, Cosine & More",
    description: "Calculate Euclidean, Manhattan, Cosine, Minkowski, Chebyshev, Hamming, Canberra, Bray-Curtis, Pearson, and Jaccard distances online. Compare vectors instantly with real-time calculations, visualizations, and export options.",
    keywords: [
      "clustering distance calculator",
      "euclidean distance calculator",
      "cosine similarity calculator",
      "manhattan distance calculator",
      "minkowski distance calculator",
      "cluster distance tool",
      "machine learning calculator",
      "vector distance calculator",
      "data engineering calculator",
      "ai clustering tool",
      "chebyshev distance calculator",
      "hamming distance calculator",
      "jaccard distance calculator",
      "pearson correlation distance",
      "bray curtis distance calculator",
    ],
    openGraph: {
      title: "Free Clustering Distance Calculator Online",
      description: "Calculate Euclidean, Manhattan, Cosine, Minkowski, and seven other distance metrics between two vectors instantly, all in your browser.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/clustering-distance-calculator`,
    },
    og: {
      title: "Free Clustering Distance Calculator Online",
      description: "Calculate Euclidean, Manhattan, Cosine, Minkowski, and seven other distance metrics between two vectors instantly, all in your browser.",
      url: `${siteConfig.url}/tools/data-analytics/clustering-distance-calculator`,
    },
    howToSteps: [
      {
        name: "Choose a Distance Metric",
        text: "Select from Euclidean, Manhattan, Minkowski, Chebyshev, Cosine, Hamming, Canberra, Bray-Curtis, Pearson, or Jaccard.",
      },
      {
        name: "Enter Vector A and Vector B",
        text: "Type or paste comma, space, or newline-separated numbers — both vectors need the same number of values.",
      },
      {
        name: "Set the Minkowski Parameter",
        text: "If you selected Minkowski distance, choose the order p — 1 for Manhattan-like behavior, 2 for Euclidean-like behavior, or higher for Chebyshev-like behavior.",
      },
      {
        name: "Adjust Decimal Precision",
        text: "Choose how many decimal places to display, from 2 up to 8.",
      },
      {
        name: "Read the Live Result",
        text: "The distance or similarity score, calculation steps, coordinate table, and visualization update instantly as you type.",
      },
      {
        name: "Export or Save",
        text: "Copy the result, download it as CSV, TXT, or JSON, or save it to your calculation history.",
      },
    ],
    faq: [
      {
        q: "What is a clustering distance calculator?",
        a: "A clustering distance calculator is a free browser-based tool that measures how far apart or how similar two numeric vectors are, using distance and similarity metrics commonly used in clustering algorithms, machine learning, and data analysis.",
      },
      {
        q: "Which distance metric should I use for clustering?",
        a: "Euclidean distance is the most common default for continuous, similarly-scaled data. Manhattan distance is often preferred for high-dimensional or outlier-heavy data. Cosine similarity is standard for text embeddings and direction-based comparisons where magnitude doesn't matter.",
      },
      {
        q: "What is the difference between Euclidean and Manhattan distance?",
        a: "Euclidean distance measures the straight-line distance between two points, calculated as the square root of the sum of squared differences. Manhattan distance measures the sum of absolute differences along each dimension, like navigating a city grid, and is generally less sensitive to outliers than Euclidean.",
      },
      {
        q: "What does Minkowski distance's parameter p control?",
        a: "The parameter p controls how the distance generalizes: p equals 1 makes Minkowski distance identical to Manhattan distance, p equals 2 makes it identical to Euclidean distance, and as p approaches infinity, it approaches Chebyshev distance.",
      },
      {
        q: "Is cosine similarity the same as cosine distance?",
        a: "No. Cosine similarity ranges from -1 to 1, where 1 means the vectors point in exactly the same direction. Cosine distance is typically defined as 1 minus cosine similarity, converting it into a true distance measure where 0 means identical direction.",
      },
      {
        q: "Why do my vectors need to be the same length?",
        a: "Every distance metric in this calculator compares corresponding positions between the two vectors. Vectors of different lengths have no meaningful position-by-position comparison, so the calculator requires equal dimensions.",
      },
      {
        q: "What happens if my vectors contain invalid values?",
        a: "The calculator checks every entered value and shows a clear error message if any token can't be parsed as a number, so you can quickly locate and fix the issue.",
      },
      {
        q: "Can I use this calculator for very high-dimensional vectors?",
        a: "Yes, the underlying calculations work efficiently at any dimensionality. The coordinate table and difference chart are optimized for readability up to 30 dimensions, but the numeric result itself is calculated correctly regardless of vector size.",
      },
      {
        q: "What's the difference between Bray-Curtis and Jaccard distance here?",
        a: "Bray-Curtis distance divides the sum of absolute differences by the sum of the vectors, commonly used in ecology for composition data. Jaccard distance, as implemented here for continuous non-negative vectors, is based on the ratio of the sum of minimums to the sum of maximums between the two vectors.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your vectors are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
