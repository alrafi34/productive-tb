export default function MovingAverageCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Moving Average Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>moving average calculator</strong> is a free browser-based tool that smooths out short-term fluctuations in a dataset to reveal underlying trends. It supports <strong>Simple Moving Average (SMA)</strong>, <strong>Weighted Moving Average (WMA)</strong>, and <strong>Exponential Moving Average (EMA)</strong> — the three most widely used methods in finance, statistics, and time-series analysis.
          </p>
          <p>
            This tool accepts manually typed numbers, pasted datasets, or uploaded CSV and TXT files. It automatically detects separators — commas, spaces, new lines, or tabs — computes the selected moving average across an adjustable window size, and visualizes the original data alongside the smoothed trend line.
          </p>
          <p>
            Built for <strong>financial analysts, stock traders, cryptocurrency investors, students, teachers, researchers, business analysts, data analysts, economists, and engineers</strong>, the calculator runs entirely in your browser with instant results, no signup, and support for large datasets.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Moving Average Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator slides a window of a fixed size across your dataset, computing an average at each position using the method you select.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>SMA = (x₁ + x₂ + ... + xₙ) / n</p>
              <p>WMA = Σ(xᵢ × weightᵢ) / Σ(weightᵢ), weights increasing toward the most recent value</p>
              <p>EMA(today) = (Current × Multiplier) + (Previous EMA × (1 − Multiplier)), Multiplier = 2 / (n + 1)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Simple Moving Average", "Gives every value in the window equal weight — straightforward and easy to interpret, but slower to react to recent changes."],
              ["Weighted Moving Average", "Assigns linearly increasing weight to more recent values in the window, making it more responsive than SMA while still considering the full window."],
              ["Exponential Moving Average", "Applies exponentially decreasing weight to older values, reacting fastest to recent price or data changes — widely used in financial trend analysis."],
              ["Window Size", "Controls how many consecutive values are averaged together — smaller windows react faster but are noisier, larger windows produce smoother but more lagging trends."],
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
          How to Use the Moving Average Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Dataset", "Type or paste numbers separated by commas, spaces, or new lines, or upload a CSV or TXT file."],
                ["Choose a Method", "Select Simple, Weighted, or Exponential Moving Average based on how responsive you want the trend to be."],
                ["Set the Window Size", "Choose how many consecutive values are averaged together, from 2 up to 1,000."],
                ["Read the Live Results", "The moving average values, summary statistics, and trend chart update instantly as you type."],
                ["Visualize and Export", "Toggle the original and moving average lines on the chart, then export as CSV, JSON, PNG, or SVG."],
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
                "Simple, Weighted, and Exponential Moving Average methods",
                "Auto-detects commas, spaces, new lines, and tabs",
                "Drag-and-drop CSV and TXT file upload",
                "Interactive line chart with toggleable original and MA lines",
                "Adjustable window size from 2 to 1,000",
                "Adjustable decimal precision from 0 to 5 places",
                "Automatic trend summary describing direction and change",
                "Calculation performance indicator",
                "Invalid value and window size validation with clear warnings",
                "Sample datasets and a random dataset generator",
                "Copy results, download CSV, JSON, PNG, and SVG",
                "Print-friendly report generation",
                "Calculation history — save and reload past results",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcuts — Esc to clear, Ctrl+L for a random dataset",
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
              title: "Stock Price Trend Analysis",
              scenario: "A stock trader enters daily closing prices and applies a 20-day SMA or EMA to identify whether a stock is in an upward or downward trend before making a trade decision.",
            },
            {
              title: "Cryptocurrency Volatility Smoothing",
              scenario: "A crypto investor uses an EMA with a short window to react quickly to recent price momentum while filtering out minute-to-minute noise.",
            },
            {
              title: "Website Traffic Trend Monitoring",
              scenario: "A business analyst uploads daily visitor counts and applies a 7-day moving average to see the underlying weekly trend beneath day-to-day spikes.",
            },
            {
              title: "Sales Forecasting",
              scenario: "A business uses a moving average of monthly sales figures to smooth seasonal fluctuations and better estimate underlying growth.",
            },
            {
              title: "Sensor Data Smoothing",
              scenario: "An engineer applies a moving average to noisy sensor readings to filter out measurement noise and reveal the true underlying signal.",
            },
            {
              title: "Academic Time-Series Education",
              scenario: "A student or teacher compares SMA, WMA, and EMA on the same dataset to understand how each method responds differently to recent changes.",
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
                "Use EMA instead of SMA when you want the trend to react faster to the most recent data points.",
                "Try a few different window sizes side-by-side — a shorter window highlights short-term momentum while a longer window reveals the overall direction.",
                "Toggle the original data line on and off to see exactly how much noise the moving average is smoothing out.",
                "Use WMA as a middle ground between SMA and EMA when you want more weight on recent values without full exponential decay.",
                "Save frequently-used datasets to history so you can quickly reload and compare trend results across different data pulls.",
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
                "Don't use a window size larger than your dataset — the calculator requires at least as many values as the window size to produce a result.",
                "Don't confuse the moving average count with the original dataset count — the output has fewer values than the input, since each MA point needs a full window.",
                "Don't rely on a single window size for all decisions — short and long windows tell very different stories about the same data.",
                "Don't assume EMA and SMA will produce similar results on volatile data — EMA can diverge significantly since it weights recent values much more heavily.",
                "Don't forget that a moving average lags behind sudden changes — it shows historical smoothing, not a real-time prediction.",
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
          Worked Examples Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Dataset</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Window</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Moving Average Values</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10, 20, 30, 40, 50", "3", "SMA", "20, 30, 40"],
                ["150, 160, 170, 180, 175, 190, 200", "5", "SMA", "167, 175, 183"],
                ["1200, 1180, 1220, 1300, 1280, 1350, 1400", "3", "SMA", "1200, 1233.33, 1266.67, 1310, 1343.33"],
              ].map(([dataset, win, type, ma]) => (
                <tr key={dataset} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700 text-xs">{dataset}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{win}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{type}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold text-xs">{ma}</td>
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
              q: "What is a moving average calculator?",
              a: "A moving average calculator is a free browser-based tool that smooths a dataset by averaging consecutive groups of values, supporting Simple, Weighted, and Exponential Moving Average methods.",
            },
            {
              q: "What is the difference between SMA, WMA, and EMA?",
              a: "SMA weights every value in the window equally. WMA applies linearly increasing weight to more recent values. EMA applies exponentially decreasing weight to older values, reacting fastest to recent changes.",
            },
            {
              q: "How is the Simple Moving Average calculated?",
              a: "SMA = (x₁ + x₂ + ... + xₙ) / n. For example, the dataset 10, 20, 30, 40, 50 with a window of 3 produces SMA values of 20, 30, and 40.",
            },
            {
              q: "How is the Exponential Moving Average calculated?",
              a: "EMA uses a multiplier of 2 / (window + 1). The first EMA value is seeded from the simple average of the first window, then each subsequent EMA is (Current × Multiplier) + (Previous EMA × (1 − Multiplier)).",
            },
            {
              q: "What separators does the calculator support?",
              a: "Commas, spaces, new lines, tabs, or semicolons — including mixed combinations — are all automatically detected and parsed correctly.",
            },
            {
              q: "Can I upload a CSV or TXT file instead of typing numbers?",
              a: "Yes. Use the Import CSV button or drag and drop a file directly onto the input box. Valid numeric values are extracted automatically.",
            },
            {
              q: "What happens if my window size is larger than my dataset?",
              a: "The calculator shows a friendly warning that the window size cannot exceed the dataset length, and waits until you adjust the window or add more data.",
            },
            {
              q: "Can I compare the original data against the moving average visually?",
              a: "Yes. The trend chart lets you independently toggle the original data line and the moving average line to compare raw values against the smoothed trend.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "The calculator uses an efficient sliding-window algorithm for SMA and O(n) calculations for WMA and EMA, comfortably handling tens of thousands of values instantly.",
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
            { icon: "📈", title: "Financial Analysts & Traders", desc: "Identify price trends and momentum using SMA, WMA, and EMA across daily, weekly, or custom periods." },
            { icon: "₿", title: "Cryptocurrency Investors", desc: "Smooth volatile price data to spot underlying trends before making trading decisions." },
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach time-series smoothing techniques with a clear, visual comparison of methods." },
            { icon: "🔬", title: "Researchers & Data Analysts", desc: "Smooth noisy experimental or survey data to reveal underlying patterns." },
            { icon: "💼", title: "Business & Economic Analysts", desc: "Track sales, traffic, or economic indicator trends beneath short-term fluctuations." },
            { icon: "⚙️", title: "Engineers", desc: "Filter noisy sensor or measurement data to reveal the true underlying signal." },
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
