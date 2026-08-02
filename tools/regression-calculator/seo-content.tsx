export default function RegressionCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Regression Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>regression calculator</strong> is a free browser-based tool that performs <strong>simple linear regression</strong> to identify the relationship between an independent variable (X) and a dependent variable (Y). It calculates the best-fit regression line using the least squares method, predicts new values, and measures how well the line fits your data.
          </p>
          <p>
            This tool accepts data through an editable table, pasted spreadsheet columns, or uploaded CSV files with automatic column detection. It instantly calculates the regression equation, R², RMSE, MAE, and residuals, and visualizes the fit with an interactive scatter plot and residual plot.
          </p>
          <p>
            Built for <strong>students, teachers, data analysts, researchers, business analysts, financial analysts, engineers, and scientists</strong>, the calculator runs entirely in your browser with instant results, no signup, and support for datasets ranging from a few points to thousands of observations.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Regression Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator applies the least squares method to find the line that minimizes the sum of squared differences between actual and predicted Y values.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Slope: b = (nΣXY − ΣXΣY) / (nΣX² − (ΣX)²)</p>
              <p>Intercept: a = (ΣY − bΣX) / n</p>
              <p>Regression Equation: Y = a + bX</p>
              <p>Prediction: Ŷ = a + bX</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Slope (b)", "Represents how much Y changes for every one-unit increase in X — the steepness and direction of the regression line."],
              ["Intercept (a)", "The predicted value of Y when X equals zero — where the regression line crosses the Y-axis."],
              ["R² (Coefficient of Determination)", "The proportion of variance in Y explained by X, ranging from 0 (no fit) to 1 (perfect fit)."],
              ["Residuals", "The difference between each actual Y value and its predicted value — smaller, more random residuals indicate a better linear fit."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step + Key Features ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Regression Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Dataset", "Add rows to the editable table, paste comma or tab-separated X, Y pairs, or upload a CSV file."],
                ["Review the Equation", "The regression equation Y = a + bX, slope, intercept, and R² update instantly as you edit data."],
                ["Predict a Value", "Enter any X value in the Predict panel to see its predicted Y value immediately."],
                ["Check the Fit", "Review RMSE, MAE, and the residual plot to see how well the line fits your data and spot any outliers."],
                ["Export Your Results", "Copy the full report, or download it as CSV, JSON, PNG, SVG, or a printed report."],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Live calculation with a 150ms debounced update",
                "Editable data table with dynamic add/remove rows",
                "Paste support for comma, tab, and space-separated data",
                "CSV upload with automatic numeric column detection",
                "Drag-and-drop file import",
                "Interactive scatter plot with regression trend line",
                "Residual plot to visualize fit quality and detect patterns",
                "Automatic outlier detection and highlighting",
                "Instant value prediction from any X input",
                "Full prediction and residual table",
                "R², RMSE, MAE, MSE, and standard error statistics",
                "Sample datasets and a random dataset generator",
                "Copy full report, download CSV, JSON, PNG, and SVG",
                "Print-friendly report generation",
                "Calculation history — save and reload past results",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcuts — Esc to clear, Ctrl+L for a sample",
                "All processing runs locally — no data leaves your browser",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span><span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Advertising Budget vs. Sales",
              scenario: "A business analyst enters monthly advertising budget and sales figures to build a regression model and predict sales for a proposed new budget level.",
            },
            {
              title: "Study Hours vs. Exam Score",
              scenario: "A teacher analyzes the relationship between study hours and exam scores to predict expected performance and identify a target study time for a goal score.",
            },
            {
              title: "Real Estate Price Prediction",
              scenario: "A real estate analyst regresses home square footage against sale price to estimate a fair market value for a new listing.",
            },
            {
              title: "Financial Forecasting",
              scenario: "A financial analyst uses historical revenue trends as X and Y inputs to build a simple linear forecast for upcoming quarters.",
            },
            {
              title: "Engineering Calibration",
              scenario: "An engineer regresses sensor input against measured output to calibrate a device and quantify measurement error using RMSE.",
            },
            {
              title: "Academic Research and Statistics Education",
              scenario: "A student or researcher uses the residual plot and R² value to evaluate whether a linear model is appropriate for their dataset.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Common Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Always check the residual plot, not just R² — a high R² can still hide a curved pattern that a straight line doesn't capture well.",
                "Use RMSE when large errors matter most, and MAE when you want a metric that's less sensitive to a few big outliers.",
                "Only predict within or close to your observed X range — extrapolating far beyond your data can produce unreliable results.",
                "Use the CSV column picker to quickly regress any two columns from an exported spreadsheet without retyping data.",
                "Save frequently-used datasets to history so you can quickly reload and compare regression results across different data pulls.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't assume a strong regression fit proves causation — a high R² only shows association, not that X causes changes in Y.",
                "Don't apply simple linear regression to data with an obviously curved or non-linear pattern without checking the residual plot first.",
                "Don't ignore outliers — a single extreme point can substantially shift the slope and intercept of the regression line.",
                "Don't forget that R² alone doesn't tell you if the model is accurate in absolute terms — always check RMSE or MAE too.",
                "Don't extrapolate predictions far outside your dataset's X range, since the linear relationship may not hold there.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Worked Example Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">X</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Y (Actual)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Ŷ (Predicted)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Residual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1", "2", "2.80", "-0.80"],
                ["2", "4", "3.40", "0.60"],
                ["3", "5", "4.00", "1.00"],
                ["4", "4", "4.60", "-0.60"],
                ["5", "5", "5.20", "-0.20"],
              ].map(([xv, yv, pred, res]) => (
                <tr key={xv} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700 text-xs">{xv}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{yv}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{pred}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{res}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-3">Regression Equation: Y = 2.20 + 0.60X · R² = 0.60</p>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a regression calculator?",
              a: "A regression calculator is a free browser-based tool that performs simple linear regression on paired X, Y data, finding the best-fit line, R², and prediction values using the least squares method.",
            },
            {
              q: "How is the regression line calculated?",
              a: "Slope b = (nΣXY − ΣXΣY) / (nΣX² − (ΣX)²), and intercept a = (ΣY − bΣX) / n. For the dataset X = 1,2,3,4,5 and Y = 2,4,5,4,5, this produces Y = 2.20 + 0.60X with R² = 0.60.",
            },
            {
              q: "What does R² mean?",
              a: "R² (the coefficient of determination) is the proportion of variance in Y explained by X, ranging from 0 to 1. Higher values mean the regression line fits the data more closely.",
            },
            {
              q: "What is the difference between RMSE, MAE, and MSE?",
              a: "MSE is the average squared residual. RMSE is its square root, in the same units as Y. MAE is the average absolute residual, and is less sensitive to large outliers than RMSE.",
            },
            {
              q: "How do I predict a value with this calculator?",
              a: "Enter an X value in the Predict panel — the calculator instantly applies Ŷ = a + bX using your current regression equation to compute the predicted Y.",
            },
            {
              q: "Can I upload a CSV or paste spreadsheet data?",
              a: "Yes. Use the Paste/CSV tab to paste comma, tab, or space-separated data, or upload a CSV/TXT file and select which columns map to X and Y.",
            },
            {
              q: "What does the residual plot show?",
              a: "The residual plot shows the difference between actual and predicted Y values for each X. Residuals scattered randomly around zero suggest a good linear fit; a visible pattern suggests a non-linear relationship.",
            },
            {
              q: "How does the calculator detect outliers?",
              a: "Outliers are identified using standardized residuals — points whose residual deviates more than two standard deviations from the mean residual are flagged and highlighted in red.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "The calculator uses efficient O(n) least-squares calculations and comfortably handles thousands of data points with instant, debounced recalculation.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach linear regression with a clear, visual, step-by-step breakdown." },
            { icon: "🔬", title: "Researchers & Scientists", desc: "Quantify relationships between experimental variables and evaluate model fit quality." },
            { icon: "📊", title: "Data & Business Analysts", desc: "Build quick predictive models from spreadsheet data without statistical software." },
            { icon: "💰", title: "Financial Analysts", desc: "Forecast trends and evaluate the relationship between financial variables." },
            { icon: "⚙️", title: "Engineers", desc: "Calibrate instruments and model relationships between measured inputs and outputs." },
            { icon: "📈", title: "Marketing & BI Professionals", desc: "Predict outcomes like sales or engagement from spend or activity metrics." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
