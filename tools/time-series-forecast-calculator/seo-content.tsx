export default function TimeSeriesForecastCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Time Series Forecast Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>time series forecast calculator</strong> is a free browser-based tool that analyzes historical data and predicts future values using proven statistical forecasting techniques. It supports eight methods — <strong>Naive</strong>, <strong>Drift</strong>, <strong>Moving Average</strong>, <strong>Weighted Moving Average</strong>, <strong>Simple Exponential Smoothing</strong>, <strong>Linear Trend Regression</strong>, <strong>Polynomial Trend</strong>, and <strong>Seasonal Naive</strong> — covering everything from a quick baseline forecast to trend-aware and seasonal projections.
          </p>
          <p>
            This tool accepts manually typed numbers, pasted single-column or two-column Date,Value datasets, or uploaded CSV and TXT files. It instantly fits the selected model to your history, projects future periods, calculates accuracy metrics like MAE, RMSE, and MAPE, and visualizes historical, fitted, and forecast values on an interactive chart.
          </p>
          <p>
            Built for <strong>business analysts, financial analysts, sales teams, inventory managers, supply chain professionals, small business owners, students, and researchers</strong>, the calculator runs entirely in your browser with instant results, no signup, and support for large datasets.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Time Series Forecast Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Each forecasting method uses a different formula to project future values from your historical data.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Moving Average: Forecast = Σ(last N values) / N</p>
              <p>Weighted Moving Average: Forecast = Σ(Value × Weight) / ΣWeights</p>
              <p>Exponential Smoothing: Fₜ = αAₜ₋₁ + (1 − α)Fₜ₋₁</p>
              <p>Linear Trend: y = a + bx</p>
              <p>Drift: Forecastₕ = Last Value + h × ((Last − First) / (n − 1))</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Naive Forecast", "Simply repeats the last observed value for every future period — the simplest possible baseline."],
              ["Drift Method", "Extends a straight line between the first and last observations, projecting the average historical rate of change forward."],
              ["Moving Average / Weighted Moving Average", "Averages the most recent N observations (equally or with increasing weight on recent data) and holds that value flat for future periods."],
              ["Exponential Smoothing", "Weights recent observations more heavily than older ones using a smoothing factor α between 0.01 and 1.00."],
              ["Linear / Polynomial Trend", "Fits a straight line or curve to the entire history using least-squares regression, then extrapolates it into future periods."],
              ["Seasonal Naive", "Repeats the value from the same point in the previous seasonal cycle — ideal for data with a clear repeating pattern."],
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
          How to Use the Time Series Forecast Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Historical Data", "Type or paste values one per line or comma-separated, use Date,Value CSV format, or upload a CSV or TXT file."],
                ["Choose a Forecasting Method", "Select from Naive, Drift, Moving Average, Weighted Moving Average, Exponential Smoothing, Linear Trend, Polynomial Trend, or Seasonal Naive."],
                ["Adjust Method Parameters", "Set the window size, smoothing alpha, or seasonal period depending on the method chosen."],
                ["Set the Forecast Period", "Choose how many future periods to forecast, from 1 up to 365."],
                ["Review the Chart and Table", "Check the historical, fitted, and forecast lines along with MAE, RMSE, and MAPE accuracy metrics."],
                ["Export Your Results", "Copy the forecast or download it as CSV, Excel-compatible CSV, JSON, PNG chart, or a printed report."],
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
                "Live forecasting with a 150ms debounced update",
                "Eight forecasting methods in one tool",
                "Single-column or two-column Date,Value CSV parsing",
                "Adjustable window size, alpha, and seasonal period",
                "Adjustable forecast horizon from 1 to 365 periods",
                "Interactive chart with toggleable actual, fitted, forecast, and confidence lines",
                "MAE, RMSE, and MAPE accuracy metrics",
                "Drag-and-drop CSV and TXT file upload",
                "Sample datasets and a random dataset generator",
                "Copy forecast, results table, and full report independently",
                "Copy chart to clipboard as an image",
                "Download CSV, Excel-compatible CSV, JSON, and PNG",
                "Print-friendly report generation",
                "Forecast history — save and reload past results",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcuts — Esc to reset, Ctrl+L for a random dataset",
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
            { title: "Sales Forecasting", scenario: "A sales manager applies Linear Trend to six months of revenue data to project next quarter's targets and set realistic goals." },
            { title: "Inventory Demand Planning", scenario: "An inventory planner uses Seasonal Naive with a 12-month period to forecast holiday-season stock needs from three years of order history." },
            { title: "Website Traffic Analysis", scenario: "A marketing analyst smooths daily visitor counts with Exponential Smoothing (α = 0.3) to filter noise and track the underlying trend." },
            { title: "Financial Revenue Projection", scenario: "A financial analyst forecasts upcoming quarterly revenue using the Drift Method on five years of historical financial statements." },
            { title: "Production Planning", scenario: "An operations manager forecasts weekly production needs using a 4-week Moving Average to smooth short-term demand fluctuations." },
            { title: "Academic Forecasting Education", scenario: "A student compares Naive, Moving Average, and Linear Trend forecasts on the same dataset to understand how each method differs in accuracy." },
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
                "Start with Naive or Moving Average as a baseline, then compare MAE and RMSE against more advanced methods to see if the added complexity actually helps.",
                "Use Linear or Polynomial Trend only when your data shows a genuinely consistent directional pattern, not random fluctuation.",
                "Only use Seasonal Naive when you have at least two full seasonal cycles of history — one cycle isn't enough to validate the pattern.",
                "Check MAPE alongside RMSE — MAPE is easier to interpret as a percentage and works well for comparing accuracy across different datasets.",
                "Enable the confidence area on the chart to get a visual sense of forecast uncertainty based on historical fit error.",
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
                "Don't use Linear Trend on data with a clear seasonal pattern — it will systematically miss the recurring peaks and troughs.",
                "Don't apply Seasonal Naive without enough historical cycles — the forecast will just repeat a single, possibly unrepresentative, season.",
                "Don't forecast too many periods ahead from a short history — long-range extrapolations from limited data become increasingly unreliable.",
                "Don't ignore the accuracy metrics — a method with a much higher MAE or RMSE than another is a weaker fit for your specific dataset.",
                "Don't set the Moving Average window larger than roughly a third of your dataset — it removes too much signal along with the noise.",
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
          Forecasting Method Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Best For</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Key Parameter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Naive Forecast", "Quick baseline, stable data", "None"],
                ["Drift Method", "Data with steady overall change", "None"],
                ["Moving Average", "Smoothing short-term noise", "Window size"],
                ["Weighted Moving Average", "Emphasizing recent observations", "Window size"],
                ["Exponential Smoothing", "Reactive short-term forecasting", "Alpha (α)"],
                ["Linear Trend Regression", "Consistent linear growth or decline", "None"],
                ["Polynomial Trend", "Accelerating or decelerating growth", "None"],
                ["Seasonal Naive", "Data with a repeating seasonal cycle", "Seasonal period"],
              ].map(([method, best, param]) => (
                <tr key={method} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{method}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{best}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{param}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
              a: "MAE is the average absolute error between actual and fitted values. RMSE penalizes larger errors more heavily by squaring them. MAPE expresses the average error as a percentage, useful for comparing accuracy across datasets with different scales.",
            },
            {
              q: "Can I upload a CSV or TXT file instead of typing numbers?",
              a: "Yes. Use the Import CSV button or drag and drop a file directly onto the input box. The calculator supports a single column of numbers or two-column Date,Value CSV format, and automatically ignores header rows and invalid entries.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "The calculator uses efficient algorithms and comfortably handles thousands of observations with instant, debounced recalculation and smooth chart rendering.",
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
            { icon: "📊", title: "Business & Financial Analysts", desc: "Forecast revenue, sales, and financial trends using trend-aware methods." },
            { icon: "📦", title: "Supply Chain & Inventory Managers", desc: "Forecast seasonal demand using Seasonal Naive to optimize stock levels." },
            { icon: "📈", title: "Sales Teams", desc: "Track and project sales performance trends over upcoming periods." },
            { icon: "🏪", title: "Small Business Owners", desc: "Predict revenue and demand without needing Excel or specialized software." },
            { icon: "🎓", title: "Students & Researchers", desc: "Learn and compare forecasting methods with a clear, interactive tool." },
            { icon: "🔬", title: "Data Scientists", desc: "Quickly benchmark simple forecasting baselines before building complex models." },
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
