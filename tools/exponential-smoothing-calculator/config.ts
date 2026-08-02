import { siteConfig } from "@/config/site";

export const exponentialSmoothingCalculatorConfig = {
  slug: "exponential-smoothing-calculator",
  name: "Exponential Smoothing Calculator",
  description: "Calculate simple, double (Holt), and triple (Holt-Winters) exponential smoothing instantly. Smooth noisy time-series data, generate forecasts, and visualize trends. Free browser-based tool.",
  category: "data-analytics",
  icon: "📉",
  free: true,
  relatedTools: [
    "moving-average-calculator",
    "mean-calculator",
    "standard-deviation-calculator",
    "regression-calculator",
    "correlation-coefficient-calculator",
    "data-growth-calculator",
  ],
  seo: {
    title: "Free Exponential Smoothing Calculator Online – Forecast Time Series Data Instantly",
    description: "Calculate simple, double, and triple exponential smoothing online. Forecast future values, smooth noisy time-series data, visualize trends, and export results instantly using this free browser-based exponential smoothing calculator.",
    keywords: [
      "exponential smoothing calculator",
      "simple exponential smoothing",
      "holt exponential smoothing",
      "holt winters calculator",
      "forecast calculator",
      "time series forecasting",
      "sales forecasting tool",
      "trend analysis calculator",
      "statistics calculator",
      "forecasting tool online",
    ],
    openGraph: {
      title: "Free Exponential Smoothing Calculator Online",
      description: "Calculate simple, double, and triple exponential smoothing instantly with interactive charts, forecasts, and downloadable reports.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/exponential-smoothing-calculator`,
    },
    og: {
      title: "Free Exponential Smoothing Calculator Online",
      description: "Calculate simple, double, and triple exponential smoothing instantly with interactive charts, forecasts, and downloadable reports.",
      url: `${siteConfig.url}/tools/data-analytics/exponential-smoothing-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Time-Series Data",
        text: "Type or paste numbers one per line or comma-separated, or upload a CSV or TXT file.",
      },
      {
        name: "Choose a Smoothing Method",
        text: "Select Simple Exponential Smoothing for level-only data, Holt's method to include a trend, or Holt-Winters to also model seasonality.",
      },
      {
        name: "Adjust Alpha, Beta, and Gamma",
        text: "Use the sliders to control how strongly recent observations, trend, and seasonality are weighted in the smoothing calculation.",
      },
      {
        name: "Set Forecast Periods",
        text: "Choose how many future periods to forecast, from 1 up to 100.",
      },
      {
        name: "Review and Export",
        text: "Check the smoothed values, forecast, error statistics, and trend chart, then export as CSV, Excel-compatible CSV, JSON, PNG, SVG, or a printed report.",
      },
    ],
    faq: [
      {
        q: "What is an exponential smoothing calculator?",
        a: "An exponential smoothing calculator is a free browser-based tool that smooths noisy time-series data and generates forecasts using Simple, Double (Holt), or Triple (Holt-Winters) exponential smoothing, giving more weight to recent observations than older ones.",
      },
      {
        q: "What is the difference between Simple, Holt, and Holt-Winters smoothing?",
        a: "Simple Exponential Smoothing (SES) smooths a level with no trend or seasonality — best for stable data. Holt's method adds a trend component for data with a consistent upward or downward direction. Holt-Winters adds a seasonal component on top of level and trend, for data with repeating seasonal patterns.",
      },
      {
        q: "How is Simple Exponential Smoothing calculated?",
        a: "Sₜ = αXₜ + (1 − α)Sₜ₋₁, where α is the smoothing factor between 0.01 and 1.00. Higher alpha values make the smoothed series react faster to recent changes; lower values produce a smoother, slower-reacting series.",
      },
      {
        q: "What do Alpha, Beta, and Gamma control?",
        a: "Alpha (α) controls the weight given to the level. Beta (β), used in Holt and Holt-Winters, controls the weight given to the trend. Gamma (γ), used only in Holt-Winters, controls the weight given to the seasonal component.",
      },
      {
        q: "How do I choose a seasonal period for Holt-Winters?",
        a: "The seasonal period should match the natural cycle in your data — for example, 12 for monthly data with yearly seasonality, 7 for daily data with weekly seasonality, or 4 for quarterly data. Holt-Winters requires at least two full seasonal cycles of data.",
      },
      {
        q: "What is the difference between additive and multiplicative seasonality?",
        a: "Additive seasonality assumes seasonal fluctuations stay roughly constant in absolute size over time. Multiplicative seasonality assumes fluctuations scale proportionally with the level of the series — use multiplicative when seasonal swings grow as the overall values grow.",
      },
      {
        q: "What do MAE, RMSE, and MAPE mean?",
        a: "MAE (Mean Absolute Error) is the average absolute difference between actual and smoothed values. RMSE (Root Mean Squared Error) penalizes larger errors more heavily. MAPE (Mean Absolute Percentage Error) expresses the average error as a percentage of the actual value, useful for comparing across different scales.",
      },
      {
        q: "Can I upload a dataset instead of typing it?",
        a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file directly onto the input box. The calculator automatically extracts valid numeric values and ignores invalid rows.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator uses efficient O(n) smoothing algorithms and comfortably handles thousands of observations with instant, debounced recalculation.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
