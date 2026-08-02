export default function PercentileCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Percentile Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>percentile calculator</strong> is a free browser-based statistical tool that finds the value below which a given percentage of a dataset falls. Enter your data and a target percentile — like P90 or P95 — and the calculator instantly returns the corresponding value using linear interpolation between closest ranks.
          </p>
          <p>
            Alongside your target percentile, the calculator shows quartiles (Q1, median, Q3), the interquartile range (IQR), and a full table of common percentiles (P1 through P99), all visualized on an interactive chart.
          </p>
          <p>
            Built for <strong>students, data analysts, statisticians, researchers, performance engineers, and business analysts</strong>, the calculator runs entirely in your browser with instant results and no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Percentile Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula (Linear Interpolation)</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Rank = (P ÷ 100) × (n − 1)</p>
              <p>Value = Sorted[⌊Rank⌋] + frac × (Sorted[⌈Rank⌉] − Sorted[⌊Rank⌋])</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Sort the Data", "All values are sorted from smallest to largest before any percentile calculation."],
              ["Find the Rank Position", "The target percentile maps to a (possibly fractional) position in the sorted list."],
              ["Interpolate", "If the rank falls between two values, linearly interpolate between them for a precise result."],
              ["Quartiles", "Q1, Median, and Q3 are simply the 25th, 50th, and 75th percentiles, calculated the same way."],
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
          How to Use the Percentile Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Dataset", "Type or paste numbers separated by commas, spaces, or new lines."],
                ["Set Target Percentile", "Choose any percentile from 0 to 100 using the slider or number field."],
                ["Review the Result", "See the calculated value at your target percentile, quartiles, and IQR."],
                ["Check Common Percentiles", "Review the full table of P1 through P99."],
                ["Export or Share", "Copy the result, download a report, or share a link."],
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
                "Linear interpolation percentile method (Excel-compatible)",
                "Full common percentiles table (P1–P99)",
                "Quartiles and IQR calculation",
                "Interactive distribution chart with target percentile marker",
                "Sample datasets and a random dataset generator",
                "Copy result and full report independently",
                "Download CSV, JSON, and print-friendly report",
                "Shareable calculation URL using query parameters",
                "Calculation history — save and reload past results",
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
            { title: "API Performance Monitoring", scenario: "A performance engineer calculates P95 and P99 response times to set realistic SLA targets from real production data." },
            { title: "Standardized Test Scoring", scenario: "A teacher calculates a student's percentile rank within a class of test scores to communicate relative performance." },
            { title: "Salary Benchmarking", scenario: "An HR analyst finds the P75 salary for a role to set a competitive compensation band." },
            { title: "Growth Chart Analysis", scenario: "A researcher calculates percentiles from a measurement dataset to compare against standard growth curves." },
            { title: "Quality Control Thresholds", scenario: "A QA engineer sets an upper control limit at the P99 of historical defect rate data." },
            { title: "Academic Statistics Coursework", scenario: "A student verifies manual percentile and quartile calculations against the calculator's interpolated results." },
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
                "Use P95 or P99 instead of averages for latency and performance metrics — averages hide the tail-end experience that matters most.",
                "Check the common percentiles table to see the full distribution shape at a glance, not just your one target value.",
                "Remember quartiles are just percentiles in disguise: Q1 = P25, Median = P50, and Q3 = P75.",
                "For small datasets (under ~10 values), interpret percentiles cautiously — the interpolation can be sensitive to a single value.",
                "Use the IQR alongside percentiles to understand spread, not just the cutoff value itself.",
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
                "Don't confuse percentile with percentage — the 90th percentile doesn't mean '90% correct,' it means 90% of the data falls below that value.",
                "Don't mix percentile methods when comparing results across tools — nearest-rank and linear interpolation can give slightly different answers.",
                "Don't assume percentiles are symmetric — P10 and P90 aren't necessarily equidistant from the median in a skewed dataset.",
                "Don't calculate percentiles on unsorted assumptions manually — always verify against a tool, since off-by-one errors are common.",
                "Don't apply percentile-based outlier rules (like below P1 or above P99) without checking whether your data is actually skewed first.",
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
          Common Percentile Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Percentile</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Also Known As</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Common Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["P25", "Q1 (First Quartile)", "Lower bound of the middle 50% of data"],
                ["P50", "Median / Q2", "Central tendency, robust to outliers"],
                ["P75", "Q3 (Third Quartile)", "Upper bound of the middle 50% of data"],
                ["P90", "—", "Common capacity planning threshold"],
                ["P95", "—", "Common SLA and latency threshold"],
                ["P99", "—", "Tail-end / worst-case performance threshold"],
              ].map(([p, aka, use]) => (
                <tr key={p} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{p}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{aka}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{use}</td>
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
              q: "What is a percentile calculator?",
              a: "A percentile calculator is a free browser-based tool that finds the value below which a given percentage of a dataset falls, using linear interpolation between closest ranks.",
            },
            {
              q: "How is percentile calculated?",
              a: "Sort the data, compute the interpolated rank position for your target percentile (Rank = (P÷100) × (n−1)), then interpolate between the two nearest sorted values.",
            },
            {
              q: "What is the difference between a percentile and a quartile?",
              a: "Quartiles divide data into four equal parts: Q1 = P25, Median = P50, and Q3 = P75. Percentiles allow any cutoff from 0 to 100.",
            },
            {
              q: "What is IQR?",
              a: "IQR (Interquartile Range) is Q3 − Q1, representing the spread of the middle 50% of the data, commonly used for outlier detection.",
            },
            {
              q: "Why do different tools sometimes give slightly different percentile values?",
              a: "There are several accepted methods. This calculator uses linear interpolation between closest ranks, matching Excel's PERCENTILE.INC and NumPy's default method.",
            },
            {
              q: "What are P90 and P95 commonly used for?",
              a: "They're widely used in performance monitoring — 'P95 response time' means 95% of requests completed faster than that value, a common SLA metric.",
            },
            {
              q: "Can I calculate multiple percentiles at once?",
              a: "Yes. The common percentiles table automatically shows P1, P5, P10, P25, P50, P75, P90, P95, and P99 alongside your custom target.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "The calculator sorts and interpolates efficiently, comfortably handling thousands of values with instant, debounced recalculation.",
            },
            {
              q: "Can I share my calculation with someone else?",
              a: "Yes. Click Share URL to copy a link that encodes your dataset and target percentile as query parameters.",
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
            { icon: "📊", title: "Data Analysts & Statisticians", desc: "Compute percentiles and quartiles for distribution analysis." },
            { icon: "⚡", title: "Performance Engineers", desc: "Track P95/P99 latency for SLAs and capacity planning." },
            { icon: "🎓", title: "Students & Educators", desc: "Learn and teach percentile and quartile calculations." },
            { icon: "💼", title: "HR & Business Analysts", desc: "Benchmark salaries and business metrics by percentile." },
            { icon: "🔬", title: "Researchers", desc: "Compare individual measurements against percentile norms." },
            { icon: "✅", title: "Quality Assurance Teams", desc: "Set control limits based on historical percentile data." },
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
