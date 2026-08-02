export default function ExponentialSmoothingCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Exponential Smoothing Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>exponential smoothing calculator</strong> is a free browser-based tool that smooths noisy time-series data and generates forecasts by giving exponentially decreasing weight to older observations. It supports <strong>Simple Exponential Smoothing</strong>, <strong>Holt&apos;s Double Exponential Smoothing</strong>, and <strong>Holt-Winters Triple Exponential Smoothing</strong> — the three foundational forecasting methods used across finance, operations, and research.
          </p>
          <p>
            This tool accepts manually typed numbers, pasted datasets, or uploaded CSV and TXT files. It instantly computes smoothed values, projects future periods, calculates error statistics like MAE, RMSE, and MAPE, and visualizes the original data, smoothed trend, and forecast on an interactive chart.
          </p>
          <p>
            Built for <strong>business analysts, financial analysts, supply chain managers, inventory planners, sales managers, marketing teams, economists, students, teachers, and researchers</strong>, the calculator runs entirely in your browser with instant results, no signup, and support for large datasets.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Exponential Smoothing Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Each method builds on the last, adding a component to capture more structure in your data.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>SES: Sₜ = αXₜ + (1 − α)Sₜ₋₁</p>
              <p>Holt Level: Lₜ = αYₜ + (1−α)(Lₜ₋₁ + Tₜ₋₁)</p>
              <p>Holt Trend: Tₜ = β(Lₜ − Lₜ₋₁) + (1−β)Tₜ₋₁</p>
              <p>Holt Forecast: Fₜ₊ₘ = Lₜ + mTₜ</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Simple Exponential Smoothing (SES)", "Models only the level of the series — best for data with no clear trend or seasonality, using a single smoothing factor α."],
              ["Holt's Double Exponential Smoothing", "Adds a trend component, so forecasts extend linearly using both the current level and trend direction — ideal for data with a consistent upward or downward movement."],
              ["Holt-Winters Triple Exponential Smoothing", "Adds a seasonal component on top of level and trend, capturing repeating patterns like weekly, monthly, or quarterly cycles using either additive or multiplicative seasonality."],
              ["Alpha, Beta, Gamma", "Smoothing factors between 0.01 and 1.00 that control how quickly the level, trend, and seasonal components adapt to new observations."],
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
          How to Use the Exponential Smoothing Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Dataset", "Type or paste time-series values one per line or comma-separated, or upload a CSV or TXT file."],
                ["Choose a Method", "Select Simple, Holt, or Holt-Winters based on whether your data has a trend and/or seasonality."],
                ["Adjust Alpha, Beta, Gamma", "Use the sliders to control how responsive the level, trend, and seasonal components are to recent data."],
                ["Set Forecast Periods", "Choose how many future periods to forecast, from 1 up to 100."],
                ["Review and Export", "Check smoothed values, error statistics, and the trend chart, then export as CSV, JSON, PNG, SVG, or a printed report."],
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
                "Live calculation with a 200ms debounced update",
                "Simple, Holt, and Holt-Winters smoothing methods",
                "Additive and multiplicative seasonality for Holt-Winters",
                "Adjustable Alpha, Beta, and Gamma sliders",
                "Adjustable forecast horizon from 1 to 100 periods",
                "Interactive chart with toggleable actual, smoothed, and forecast lines",
                "MAE, RMSE, and MAPE error statistics",
                "Drag-and-drop CSV and TXT file upload",
                "Sample datasets and a random dataset generator",
                "Copy results, forecast, and full report independently",
                "Copy chart to clipboard as an image",
                "Download CSV, Excel-compatible CSV, JSON, PNG, and SVG",
                "Print-friendly report generation",
                "Calculation history — save and reload past results",
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
            {
              title: "Sales Forecasting",
              scenario: "A sales manager applies Holt's method to monthly revenue data to project the next quarter, accounting for a steady upward trend.",
            },
            {
              title: "Inventory Demand Planning",
              scenario: "An inventory planner uses Holt-Winters with a 12-month seasonal period to forecast demand for a product with strong holiday-season peaks.",
            },
            {
              title: "Website Traffic Analysis",
              scenario: "A marketing team smooths daily visitor counts with SES to filter out day-to-day noise and monitor the underlying traffic trend.",
            },
            {
              title: "Financial Revenue Projection",
              scenario: "A financial analyst forecasts upcoming quarterly revenue using Holt's trend-adjusted smoothing on historical financial statements.",
            },
            {
              title: "Production Planning",
              scenario: "An operations manager forecasts weekly production needs using Holt-Winters to account for known seasonal demand cycles.",
            },
            {
              title: "Academic Forecasting Education",
              scenario: "A student compares SES, Holt, and Holt-Winters on the same dataset to understand how each method handles trend and seasonality differently.",
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
                "Start with the default Alpha of 0.30 and adjust upward if your data changes quickly, or downward for smoother, more stable results.",
                "Use Holt's method whenever your data has a clear consistent trend that SES's flat forecast would miss.",
                "Only use Holt-Winters when your data has a genuinely repeating seasonal pattern with at least two full cycles of history.",
                "Check MAPE alongside RMSE — MAPE is easier to interpret as a percentage and works well for comparing forecast accuracy across different datasets.",
                "Use multiplicative seasonality when seasonal swings grow proportionally with the overall trend, and additive when they stay roughly constant.",
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
                "Don't use Simple Exponential Smoothing on data with a clear trend — its flat forecast will systematically lag behind rising or falling data.",
                "Don't apply Holt-Winters without at least two full seasonal cycles of data — the seasonal indices won't be reliable with less history.",
                "Don't set Alpha too high on volatile data — it can make the smoothed series nearly track the raw noisy data instead of revealing the trend.",
                "Don't forecast too many periods ahead with a short history — long-range extrapolations from limited data become increasingly unreliable.",
                "Don't ignore residuals — a pattern in the residual errors often signals that a more advanced method (like adding trend or seasonality) is needed.",
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
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Observation</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actual</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Smoothed (SES, α=0.30)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1", "10", "10.00"],
                ["2", "15", "11.50"],
                ["3", "18", "13.45"],
                ["4", "20", "15.42"],
                ["5", "22", "17.39"],
                ["6", "24", "19.37"],
                ["7", "27", "21.66"],
                ["8", "30", "24.16"],
              ].map(([obs, actual, smoothed]) => (
                <tr key={obs} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700 text-xs">{obs}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{actual}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{smoothed}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-3">Flat forecast beyond observation 8 (SES): 24.16 for all future periods, since Simple Exponential Smoothing has no trend component.</p>
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
              q: "What is an exponential smoothing calculator?",
              a: "An exponential smoothing calculator is a free browser-based tool that smooths time-series data and generates forecasts using Simple, Holt's Double, or Holt-Winters Triple exponential smoothing.",
            },
            {
              q: "How is Simple Exponential Smoothing calculated?",
              a: "Sₜ = αXₜ + (1 − α)Sₜ₋₁, seeded with S₁ = X₁. For the dataset 10, 15, 18, 20, 22, 24, 27, 30 with α = 0.30, the smoothed series is 10.00, 11.50, 13.45, 15.42, 17.39, 19.37, 21.66, 24.16.",
            },
            {
              q: "How is Holt's Double Exponential Smoothing calculated?",
              a: "Level: Lₜ = αYₜ + (1−α)(Lₜ₋₁ + Tₜ₋₁). Trend: Tₜ = β(Lₜ − Lₜ₋₁) + (1−β)Tₜ₋₁. Forecast: Fₜ₊ₘ = Lₜ + mTₜ, extending the trend linearly into future periods.",
            },
            {
              q: "What is Holt-Winters seasonality?",
              a: "Holt-Winters adds a seasonal component to level and trend, using either additive (constant seasonal swings) or multiplicative (swings that scale with the level) seasonality, and requires at least two full seasonal cycles of data.",
            },
            {
              q: "What do Alpha, Beta, and Gamma control?",
              a: "Alpha controls how much weight recent observations get in the level. Beta controls how much weight recent changes get in the trend. Gamma controls how much weight recent observations get in the seasonal component.",
            },
            {
              q: "What do MAE, RMSE, and MAPE mean?",
              a: "MAE is the average absolute error between actual and smoothed values. RMSE penalizes larger errors more heavily by squaring them. MAPE expresses the average error as a percentage, useful for comparing accuracy across datasets with different scales.",
            },
            {
              q: "Can I upload a CSV or TXT file instead of typing numbers?",
              a: "Yes. Use the Import CSV button or drag and drop a file directly onto the input box. Valid numeric values are extracted automatically.",
            },
            {
              q: "What happens if I don't have enough data for Holt-Winters?",
              a: "The calculator shows a clear warning that Holt-Winters requires enough observations to identify seasonality — at least two full seasonal periods — and won't calculate until you provide sufficient data or switch methods.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "The calculator uses efficient O(n) smoothing algorithms and comfortably handles thousands of observations with instant, debounced recalculation.",
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
            { icon: "📊", title: "Business & Financial Analysts", desc: "Forecast revenue, sales, and financial trends using trend-aware smoothing methods." },
            { icon: "📦", title: "Supply Chain & Inventory Planners", desc: "Forecast seasonal demand using Holt-Winters to optimize stock levels." },
            { icon: "📈", title: "Sales & Marketing Teams", desc: "Track and project sales or campaign performance trends over time." },
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach exponential smoothing with a clear, interactive, step-by-step tool." },
            { icon: "🔬", title: "Researchers & Data Analysts", desc: "Smooth noisy time-series data and evaluate forecast accuracy with built-in error metrics." },
            { icon: "🌍", title: "Economists", desc: "Analyze and forecast economic indicators with trend and seasonal adjustment." },
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
