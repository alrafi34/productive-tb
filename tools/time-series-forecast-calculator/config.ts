import { siteConfig } from "@/config/site";

export const timeSeriesForecastCalculatorConfig = {
  slug: "time-series-forecast-calculator",
  name: "Time Series Forecast Calculator",
  description: "Forecast future values from historical data using Moving Average, Weighted Moving Average, Exponential Smoothing, Linear Trend, Polynomial Trend, Seasonal Naive, Naive, and Drift methods. Free browser-based tool.",
  category: "data-analytics",
  icon: "📈",
  free: true,
  relatedTools: [
    "moving-average-calculator",
    "exponential-smoothing-calculator",
    "regression-calculator",
    "seasonality-index-calculator",
    "correlation-coefficient-calculator",
    "data-growth-calculator",
  ],
  seo: {
    title: "Time Series Forecast Calculator – Free Online Forecasting Tool",
    description: "Predict future values instantly using moving average, exponential smoothing, linear trend, and more. Free online time series forecast calculator with interactive charts, CSV import, and export features.",
    keywords: [
      "time series forecast calculator",
      "forecast calculator",
      "sales forecast tool",
      "demand forecast calculator",
      "moving average calculator",
      "exponential smoothing forecast",
      "trend forecast calculator",
      "business forecast tool",
      "data forecast online",
      "forecast chart generator",
      "linear trend regression",
      "seasonal naive forecast",
      "drift method forecast",
      "revenue forecast calculator",
      "inventory forecast tool",
      "statistics forecasting tool",
      "free forecasting calculator",
      "online forecast generator",
      "weighted moving average calculator",
      "polynomial trend forecast",
    ],
    openGraph: {
      title: "Time Series Forecast Calculator – Free Online Forecasting Tool",
      description: "Predict future values instantly using moving average, exponential smoothing, and trend analysis with interactive charts and export features.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/time-series-forecast-calculator`,
    },
    og: {
      title: "Time Series Forecast Calculator – Free Online Forecasting Tool",
      description: "Predict future values instantly using moving average, exponential smoothing, and trend analysis with interactive charts and export features.",
      url: `${siteConfig.url}/tools/data-analytics/time-series-forecast-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Historical Data",
        text: "Type or paste numbers one per line or comma-separated, use Date,Value CSV format, or upload a CSV or TXT file.",
      },
      {
        name: "Choose a Forecasting Method",
        text: "Select Moving Average, Weighted Moving Average, Exponential Smoothing, Linear Trend, Polynomial Trend, Seasonal Naive, Naive, or Drift based on your data's pattern.",
      },
      {
        name: "Adjust Method Parameters",
        text: "Set the moving average window, smoothing alpha, or seasonal period depending on the selected method.",
      },
      {
        name: "Set the Forecast Period",
        text: "Choose how many future periods to forecast, from 1 up to 365.",
      },
      {
        name: "Review the Chart and Table",
        text: "Check the historical, fitted, and forecast lines on the chart along with MAE, RMSE, and MAPE accuracy metrics.",
      },
      {
        name: "Export Your Results",
        text: "Copy the forecast, or download it as CSV, Excel-compatible CSV, JSON, PNG chart, or a printed report.",
      },
    ],
    faq: [
      {
        q: "What is a time series forecast calculator?",
        a: "A time series forecast calculator is a free browser-based tool that analyzes historical data and predicts future values using statistical forecasting methods such as moving average, exponential smoothing, linear trend regression, and seasonal naive forecasting.",
      },
      {
        q: "Which forecasting method should I use?",
        a: "Use Naive or Drift for a quick baseline, Moving Average or Weighted Moving Average to smooth short-term noise, Exponential Smoothing when recent observations should matter more, Linear or Polynomial Trend for data with a consistent directional trend, and Seasonal Naive for data with a clear repeating cycle.",
      },
      {
        q: "How is the Moving Average forecast calculated?",
        a: "The forecast equals the average of the last N values, where N is the window size. For example, with a window of 3 and the last three values 260, 280, 300, the forecast is (260 + 280 + 300) / 3 = 280.",
      },
      {
        q: "How does the Drift Method work?",
        a: "The Drift Method extends a straight line between the first and last observed values. The forecast for h periods ahead equals the last value plus h times the average change per period, calculated as (last value − first value) / (n − 1).",
      },
      {
        q: "What is the difference between Linear and Polynomial Trend?",
        a: "Linear Trend fits a straight line (y = a + bx) using least squares regression, best for data with a constant rate of change. Polynomial Trend fits a curve (y = a + bx + cx²), better suited to data whose growth rate is itself increasing or decreasing over time.",
      },
      {
        q: "When should I use Seasonal Naive forecasting?",
        a: "Use Seasonal Naive when your data repeats a pattern at a fixed interval, such as monthly sales with yearly seasonality (period 12) or daily traffic with weekly seasonality (period 7). It requires at least two full seasonal cycles of historical data.",
      },
      {
        q: "What do MAE, RMSE, and MAPE mean?",
        a: "MAE (Mean Absolute Error) is the average absolute difference between actual and fitted values. RMSE (Root Mean Squared Error) penalizes larger errors more heavily. MAPE (Mean Absolute Percentage Error) expresses the average error as a percentage, useful for comparing accuracy across different scales.",
      },
      {
        q: "Can I upload a CSV file instead of typing data?",
        a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file onto the input box. The calculator supports a single column of numbers or two-column Date,Value CSV format, and automatically ignores header rows and invalid entries.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator uses efficient algorithms and comfortably handles thousands of observations with instant, debounced recalculation and smooth chart rendering.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
