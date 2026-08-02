export default function SeasonalityIndexCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Seasonality Index Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>seasonality index calculator</strong> is a free browser-based tool that identifies and measures recurring seasonal patterns in historical data — monthly sales, quarterly revenue, weekly traffic, or any repeating time period. It answers a question every analyst eventually asks: <em>which periods consistently outperform or underperform the overall average, and by how much?</em>
          </p>
          <p>
            Enter your data manually, paste it directly from Excel or Google Sheets, or upload a CSV file, and the calculator instantly groups your values by period, computes a seasonality index for each one, and highlights your strongest and weakest seasons.
          </p>
          <p>
            This tool is built for <strong>business analysts, data analysts, financial analysts, sales teams, marketing teams, inventory managers, retail and e-commerce businesses, students, and researchers</strong>. It runs entirely in your browser — no dataset is ever uploaded to a server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Seasonality Index Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator groups your dataset by repeating period (like every "January" across multiple years), computes the average for each period, and compares it to the overall average across all data points. A value above 100 means that period outperforms the average; a value below 100 means it underperforms.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula (Simple Average Method)</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Overall Average = Sum of All Values ÷ Number of Observations</p>
              <p>Season Average = Average of Each Repeating Period</p>
              <p>Seasonality Index = (Season Average ÷ Overall Average) × 100</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Simple Average Method", "Groups values by period and compares each period's average directly to the overall average — the fastest and most intuitive method."],
              ["Ratio-to-Moving-Average", "Detrends the data using a centered moving average before computing seasonal ratios, giving more accurate results when your data has an underlying upward or downward trend."],
              ["Deseasonalized Method", "Uses the simple seasonal indices to strip seasonality out of the original series, revealing the underlying trend without seasonal noise."],
              ["Custom Seasonal Average", "Weights more recent occurrences of each period more heavily, so recent cycles influence the index more than older ones."],
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
          How to Use the Seasonality Index Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Data", "Add rows manually, paste data copied from Excel or Google Sheets, or upload a CSV file with Period and Value columns."],
                ["Choose a Season Type", "Select Monthly, Quarterly, Weekly, Daily, or Custom to match how your data repeats."],
                ["Pick a Calculation Method", "Choose Simple Average, Ratio-to-Moving-Average, Deseasonalized, or Custom Seasonal Average."],
                ["Adjust Decimal Precision", "Choose how many decimal places to display, from 0 to 4."],
                ["Review the Results", "The seasonality index table, chart, and smart insights update instantly as you edit your data."],
                ["Export or Share", "Copy the report, download a CSV or JSON file, or print a formatted results page."],
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
                "Manual editable table, Excel/Sheets paste, and CSV file upload",
                "Four calculation methods including trend-adjusted moving average",
                "Automatic season detection for months, quarters, weekdays, and weeks",
                "Color-coded bar chart — green above average, gray average, red below average",
                "Chronological line chart showing the underlying value trend",
                "Automatic seasonality strength classification (Low, Moderate, Strong)",
                "Smart insights identifying your strongest and weakest periods",
                "Deseasonalized data view for trend-only analysis",
                "Duplicate row and invalid data detection with clear warnings",
                "Built-in sample datasets for monthly, weekly, and quarterly data",
                "Automatic session recovery — your dataset is saved locally as you work",
                "Export report as CSV or JSON, plus a printable layout",
                "All processing runs locally — no dataset is ever uploaded",
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
              title: "Retail Holiday Demand Planning",
              scenario: "A retail analyst uploads three years of monthly sales and finds November and December consistently index above 130 — confirming holiday season demand and informing inventory pre-ordering timelines.",
            },
            {
              title: "Marketing Campaign Timing",
              scenario: "A marketing team analyzes quarterly campaign performance and discovers Q4 consistently outperforms Q2, shifting more of next year's ad budget toward the stronger quarter.",
            },
            {
              title: "Website Traffic Staffing",
              scenario: "A support team analyzes weekly traffic patterns and finds certain weeks index well above average, helping them schedule additional support staff during predictable high-traffic periods.",
            },
            {
              title: "Inventory Reorder Planning",
              scenario: "An inventory manager uses the seasonality index to identify which months consistently see below-average sales, avoiding overstocking slow-moving periods.",
            },
            {
              title: "Financial Forecasting",
              scenario: "A financial analyst uses the Ratio-to-Moving-Average method to separate seasonal effects from an underlying growth trend before building next year's revenue forecast.",
            },
            {
              title: "Academic Time Series Study",
              scenario: "A student studying time series decomposition uses the calculator to verify manually computed seasonal indices and explore how deseasonalizing data reveals the true underlying trend.",
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
                "Include at least two or three full cycles of data (like two or three years of monthly figures) for a more reliable seasonality index.",
                "If your data has a strong upward or downward trend, use Ratio-to-Moving-Average instead of Simple Average to avoid overstating recent seasons.",
                "A seasonality index of exactly 100 means that period performs right at the overall average — not a special or unusual result.",
                "Use the Deseasonalized method when you want to compare period-over-period growth without seasonal noise distorting the picture.",
                "Load a sample dataset first to see the expected data format before pasting or uploading your own.",
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
                "Don't calculate a seasonality index from a single cycle of data — at least two repeating cycles are needed to distinguish seasonality from a one-time event.",
                "Don't mix period labels inconsistently, like using both 'Jan' and 'January' — the calculator normalizes common abbreviations, but consistent labeling avoids ambiguity.",
                "Don't confuse a seasonality index with a growth rate — an index compares a period to the overall average, not to the prior period.",
                "Don't ignore duplicate row warnings — they often indicate a copy-paste error that would otherwise skew results.",
                "Don't assume every dataset has meaningful seasonality — a Low Seasonality classification is a valid and useful result, not an error.",
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
          Seasonality Index Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Period</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Average</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Overall Average</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Index</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["January", "110", "97.5", "112.82", "Above Average"],
                ["February", "85", "97.5", "87.18", "Below Average"],
                ["Q4", "421,000", "329,000", "128.0", "Above Average"],
                ["Q2", "312,000", "329,000", "94.8", "Below Average"],
                ["Any Period", "97.5", "97.5", "100.00", "Average"],
              ].map(([period, avg, overall, index, interp]) => (
                <tr key={period + avg} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{period}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{avg}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{overall}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{index}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{interp}</td>
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
              q: "What is a seasonality index calculator?",
              a: "A seasonality index calculator is a free browser-based tool that measures how much a repeating period, like a month or quarter, deviates from the overall average across a historical dataset. It groups your data by period and returns an index for each one.",
            },
            {
              q: "How is the seasonality index calculated?",
              a: "The seasonality index equals (Season Average ÷ Overall Average) × 100. For example, if January averages 110 across three years and the overall average across all months is 97.5, January's index is (110 ÷ 97.5) × 100 = 112.82.",
            },
            {
              q: "What does an index above or below 100 mean?",
              a: "An index of 100 means that period performs exactly at the overall average. An index above 100 means the period performs above average, and an index below 100 means it performs below average — for example, an index of 87.18 means that period performs about 12.8% below the overall average.",
            },
            {
              q: "What's the difference between the four calculation methods?",
              a: "Simple Average directly compares each period's average to the overall average. Ratio-to-Moving-Average removes an underlying trend before computing seasonal ratios, which is more accurate for trending data. Deseasonalized uses the seasonal indices to strip seasonality out of the original series. Custom Seasonal Average weights more recent cycles more heavily.",
            },
            {
              q: "How much data do I need for a reliable seasonality index?",
              a: "At least two full cycles (for example, two years of monthly data) are recommended, and three or more cycles produce more reliable results, since a single cycle can't distinguish a genuine seasonal pattern from a one-time event.",
            },
            {
              q: "Can I paste data directly from Excel or Google Sheets?",
              a: "Yes. Click 'Paste Data,' then paste your copied spreadsheet rows directly into the text box — the calculator automatically detects tab or comma-separated values and an optional header row.",
            },
            {
              q: "Why does the calculator flag duplicate rows?",
              a: "Identical period-and-value pairs appearing more than once often indicate an accidental copy-paste duplication. The calculator flags this as a warning without blocking your calculation, since some datasets do legitimately contain repeated values.",
            },
            {
              q: "What does the 'Low,' 'Moderate,' and 'Strong Seasonality' classification mean?",
              a: "It's based on the spread between your highest and lowest seasonality index. A small spread means performance is fairly consistent across periods, while a large spread indicates a strong, predictable seasonal pattern worth planning around.",
            },
            {
              q: "Is my dataset saved anywhere?",
              a: "Your dataset is automatically saved to your browser's local storage so you don't lose your work on refresh, but it is never transmitted to any server. Clearing your browser data will remove it.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations, parsing, and file reading happen entirely in your browser using JavaScript. Your dataset is never uploaded to any server.",
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
            { icon: "📊", title: "Business & Data Analysts", desc: "Identify recurring seasonal patterns across sales, revenue, and operational data." },
            { icon: "💰", title: "Financial Analysts", desc: "Separate seasonal effects from underlying growth trends before forecasting." },
            { icon: "📈", title: "Marketing Teams", desc: "Time campaigns around historically strong and weak seasonal periods." },
            { icon: "🛒", title: "Retail & E-commerce", desc: "Plan inventory and staffing around predictable seasonal demand shifts." },
            { icon: "📦", title: "Inventory Managers", desc: "Avoid overstocking during consistently below-average periods." },
            { icon: "🎓", title: "Students & Researchers", desc: "Learn and verify seasonal index and time series decomposition calculations." },
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
