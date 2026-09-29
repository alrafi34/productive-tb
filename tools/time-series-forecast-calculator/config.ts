import { siteConfig } from "@/config/site";

export const timeSeriesForecastCalculatorConfig = {
  slug: "time-series-forecast-calculator",
  name: "Time Series Forecast Calculator",
  description: "Forecast future values from historical data with nine methods, including moving average, exponential smoothing, Holt's trend and seasonal naive, with 95% prediction intervals.",
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
    title: "Time Series Forecast Calculator – Free Forecasting Tool",
    description: "Forecast sales, demand or traffic from your data with moving average, exponential smoothing, Holt's trend and more. Compare methods and see 95% ranges.",
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
      "holt linear trend forecast",
      "double exponential smoothing calculator",
      "forecast prediction interval",
    ],
    openGraph: {
      title: "Time Series Forecast Calculator – Free Forecasting Tool",
      description: "Forecast sales, demand or traffic from your data with moving average, exponential smoothing, Holt's trend and more. Compare methods and see 95% ranges.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/time-series-forecast-calculator`,
    },
    og: {
      title: "Time Series Forecast Calculator – Free Forecasting Tool",
      description: "Forecast sales, demand or traffic from your data with moving average, exponential smoothing, Holt's trend and more. Compare methods and see 95% ranges.",
      url: `${siteConfig.url}/tools/data-analytics/time-series-forecast-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Historical Data",
        text: "Type or paste numbers one per line or comma-separated, paste Date,Value rows from a spreadsheet, or upload a CSV or TXT file.",
      },
      {
        name: "Choose a Forecasting Method",
        text: "Select Naive, Drift, Moving Average, Weighted Moving Average, Exponential Smoothing, Holt's Linear Trend, Linear Trend, Polynomial Trend or Seasonal Naive, or pick the method with the lowest error in the comparison table.",
      },
      {
        name: "Adjust Method Parameters",
        text: "Set the moving average window, the smoothing factors alpha and beta, or the seasonal period, depending on the selected method.",
      },
      {
        name: "Set the Forecast Period",
        text: "Choose how many future periods to forecast, from 1 up to 365.",
      },
      {
        name: "Review the Chart and Table",
        text: "Check the actual, fitted and forecast lines and the 95% prediction interval on the chart, along with the MAE, RMSE and MAPE accuracy metrics.",
      },
      {
        name: "Export Your Results",
        text: "Copy the forecast, or download it as CSV, Excel-compatible CSV, JSON, PNG chart, or a printed report.",
      },
    ],
    faq: [
      {
        q: "What is a time series forecast calculator?",
        a: "A time series forecast calculator is a free browser-based tool that analyzes historical data and predicts future values using statistical forecasting methods such as moving average, exponential smoothing, Holt's linear trend, linear trend regression and seasonal naive forecasting.",
      },
      {
        q: "Which forecasting method should I use?",
        a: "Use Naive or Drift for a quick baseline, Moving Average or Weighted Moving Average to smooth short-term noise, Exponential Smoothing when recent observations should matter more, Holt's Linear Trend or Linear Trend for data that keeps rising or falling, Polynomial Trend for growth that speeds up or slows down, and Seasonal Naive for data with a clear repeating cycle. The comparison table ranks every method on your data by its error, so you can start from the most accurate one.",
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
        q: "What is Holt's Linear Trend method?",
        a: "Holt's method, also called double exponential smoothing, tracks both a level and a trend. Each period, the level moves toward the new value by a share alpha (α) and the trend moves toward the latest change in level by a share beta (β); the forecast h periods ahead is level + h × trend. Unlike a straight regression line, it adapts when the trend changes.",
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
        a: "They measure how far the method's forecasts were from what actually happened. MAE (Mean Absolute Error) is the average absolute error. RMSE (Root Mean Squared Error) penalizes larger errors more heavily. MAPE (Mean Absolute Percentage Error) expresses the average error as a percentage, useful for comparing accuracy across different scales. For the smoothing, moving average and naive methods, each error is a genuine one-step-ahead forecast error; for the trend regressions it is the gap between the data and the fitted line.",
      },
      {
        q: "What does the 95% prediction interval mean?",
        a: "It is the range the next values are likely to fall in about 95% of the time, if future errors behave like past ones: forecast ± 1.96 × RMSE, widened for periods further ahead. For 210, 240, 235, 260, 280 and 300 with the Naive method, the next forecast is 300 with a range of about 258 to 342. The range is approximate, and for trend lines it does not include the uncertainty of the line itself.",
      },
      {
        q: "Can I upload a CSV file instead of typing data?",
        a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file onto the input box. The calculator reads a single column of numbers, Date,Value rows separated by commas, semicolons or tabs, and numbers written as 1,200, \"$1,350\" or 120,5. A header row is skipped, and other rows it cannot read are listed as ignored.",
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
