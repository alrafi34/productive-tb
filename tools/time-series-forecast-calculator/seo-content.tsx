import ToolFaq from "@/components/ToolFaq";
import { timeSeriesForecastCalculatorConfig } from "./config";

export default function TimeSeriesForecastCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = timeSeriesForecastCalculatorConfig.seo;

  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Time Series Forecast Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>time series forecast calculator</strong> is a free browser-based tool that analyzes historical data and predicts future values using proven statistical forecasting techniques. It supports nine methods — <strong>Naive</strong>, <strong>Drift</strong>, <strong>Moving Average</strong>, <strong>Weighted Moving Average</strong>, <strong>Simple Exponential Smoothing</strong>, <strong>Holt&apos;s Linear Trend</strong>, <strong>Linear Trend</strong>, <strong>Polynomial Trend</strong> and <strong>Seasonal Naive</strong> — and ranks them on your own data so you can see which one fits best.
          </p>
          <p>
            This tool accepts manually typed numbers, pasted single-column or two-column Date,Value datasets, or uploaded CSV and TXT files. It instantly fits the selected model to your history, projects future periods with a 95% prediction interval, calculates accuracy metrics like MAE, RMSE and MAPE, and visualizes historical, fitted and forecast values on an interactive chart.
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
              <p>Holt: Forecastₜ₊ₕ = Levelₜ + h × Trendₜ</p>
              <p>Linear Trend: y = a + bx</p>
              <p>Drift: Forecastₕ = Last Value + h × ((Last − First) / (n − 1))</p>
              <p>95% interval ≈ Forecast ± 1.96 × RMSE (wider further ahead)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Naive Forecast", "Simply repeats the last observed value for every future period — the simplest possible baseline."],
              ["Drift Method", "Extends a straight line between the first and last observations, projecting the average historical rate of change forward."],
              ["Moving Average / Weighted Moving Average", "Averages the most recent N observations (equally or with increasing weight on recent data) and holds that value flat for future periods."],
              ["Exponential Smoothing", "Weights recent observations more heavily than older ones using a smoothing factor α between 0.01 and 1.00, and holds the smoothed level flat for future periods."],
              ["Holt's Linear Trend", "Smooths both the level and the trend (α and β), then projects the latest trend forward, adapting when growth speeds up or slows down."],
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
              {howToSteps.map(({ name, text }, i) => (
                <li key={name} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{name}:</strong> {text}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Live forecasting with a 150ms debounced update",
                "Nine forecasting methods in one tool",
                "Compare all methods on your data, ranked by error",
                "95% prediction interval for every forecast period",
                "Single-column or Date,Value CSV parsing, including quoted numbers, semicolons and decimal commas",
                "Adjustable window size, alpha, beta and seasonal period",
                "Adjustable forecast horizon from 1 to 365 periods",
                "Interactive chart with toggleable actual, fitted and forecast lines and the prediction interval",
                "MAE, RMSE, and MAPE accuracy metrics",
                "Drag-and-drop CSV and TXT file upload",
                "Sample datasets and a random dataset generator",
                "Copy forecast, results table, and full report independently",
                "Copy chart to clipboard as an image",
                "Download CSV, Excel-compatible CSV, JSON, and PNG",
                "Print-friendly report generation",
                "Forecast history — save and reload past results",
                "Auto-saves your last session and restores it on return",
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
                "Look at the 95% interval, not just the forecast line: a wide band means the history is too noisy for a precise forecast.",
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
                ["Holt's Linear Trend", "Trending data whose growth rate changes", "Alpha (α), beta (β)"],
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
      <ToolFaq items={faq} />

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
