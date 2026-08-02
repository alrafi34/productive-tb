import { siteConfig } from "@/config/site";

export const regressionCalculatorConfig = {
  slug: "regression-calculator",
  name: "Regression Calculator",
  description: "Perform simple linear regression instantly. Calculate the regression equation, slope, intercept, R², RMSE, MAE, and predictions with an interactive scatter plot and residual analysis. Free browser-based tool.",
  category: "data-analytics",
  icon: "📈",
  free: true,
  relatedTools: [
    "correlation-coefficient-calculator",
    "mean-calculator",
    "median-calculator",
    "standard-deviation-calculator",
    "data-growth-calculator",
    "session-duration-calculator",
  ],
  seo: {
    title: "Free Regression Calculator Online – Linear Regression, R², Scatter Plot & Prediction",
    description: "Perform linear regression instantly online. Calculate regression equations, slope, intercept, R², correlation coefficient, predictions, residuals, and interactive scatter plots for free using your browser.",
    keywords: [
      "regression calculator",
      "linear regression calculator",
      "least squares calculator",
      "regression equation calculator",
      "r squared calculator",
      "correlation calculator",
      "scatter plot generator",
      "prediction calculator",
      "statistics calculator",
      "data analysis tool",
      "online regression tool",
    ],
    openGraph: {
      title: "Free Regression Calculator Online",
      description: "Perform simple linear regression instantly with slope, intercept, R², RMSE, MAE, prediction tools, and an interactive scatter plot with residual analysis.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/regression-calculator`,
    },
    og: {
      title: "Free Regression Calculator Online",
      description: "Perform simple linear regression instantly with slope, intercept, R², RMSE, MAE, prediction tools, and an interactive scatter plot with residual analysis.",
      url: `${siteConfig.url}/tools/data-analytics/regression-calculator`,
    },
    howToSteps: [
      {
        name: "Enter Your Dataset",
        text: "Add X, Y pairs using the editable table, paste comma or tab-separated data, or upload a CSV file and select two numeric columns.",
      },
      {
        name: "Review the Regression Equation",
        text: "The best-fit line Y = a + bX updates instantly, along with slope, intercept, R², and correlation coefficient.",
      },
      {
        name: "Predict a New Value",
        text: "Enter any X value in the Predict panel to instantly see its predicted Y value based on the regression line.",
      },
      {
        name: "Analyze Fit Quality",
        text: "Review RMSE, MAE, MSE, and standard error, and switch to the residual plot to check for patterns or outliers.",
      },
      {
        name: "Export Your Results",
        text: "Download the full report as CSV or JSON, export the chart as PNG or SVG, or print a formatted report.",
      },
    ],
    faq: [
      {
        q: "What is a regression calculator?",
        a: "A regression calculator is a free browser-based tool that performs simple linear regression on paired X, Y data. It finds the best-fit line using the least squares method and calculates the regression equation, R², prediction values, and residuals.",
      },
      {
        q: "How is simple linear regression calculated?",
        a: "The slope is calculated as b = (nΣXY − ΣXΣY) / (nΣX² − (ΣX)²), and the intercept as a = (ΣY − bΣX) / n. The regression equation is Y = a + bX, which minimizes the sum of squared residuals across all data points.",
      },
      {
        q: "What does R² mean in regression?",
        a: "R² (the coefficient of determination) represents the proportion of variance in Y that is explained by X. An R² of 0.60 means 60% of the variation in Y is explained by the regression line, with the remaining 40% due to other factors or noise.",
      },
      {
        q: "What is the difference between RMSE, MAE, and MSE?",
        a: "MSE (Mean Squared Error) is the average of squared residuals. RMSE (Root Mean Squared Error) is the square root of MSE, expressed in the same units as Y. MAE (Mean Absolute Error) is the average of absolute residuals — it's less sensitive to large outliers than RMSE.",
      },
      {
        q: "What is a residual?",
        a: "A residual is the difference between an actual Y value and its predicted value from the regression line (Residual = Actual − Predicted). Residuals close to zero and randomly scattered indicate a good linear fit.",
      },
      {
        q: "How do I predict a new value?",
        a: "Enter any X value into the Predict panel. The calculator instantly applies the regression equation (Ŷ = a + bX) to compute the predicted Y value.",
      },
      {
        q: "Can I upload a CSV file instead of typing values?",
        a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file directly onto the input box. The calculator automatically detects numeric columns and lets you choose which two to use as X and Y.",
      },
      {
        q: "How does the calculator detect outliers?",
        a: "Outliers are identified using standardized residuals — any point whose residual deviates more than two standard deviations from the mean residual is flagged and highlighted in red on both the scatter plot and residual plot.",
      },
      {
        q: "How large a dataset can this calculator handle?",
        a: "The calculator uses efficient O(n) least-squares calculations and comfortably handles thousands of data points with instant, debounced recalculation.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
