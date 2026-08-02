export default function QueryOptimizationCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Query Optimization Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>query optimization calculator</strong> is a free browser-based tool that estimates how much a <strong>database query's performance improved</strong> after optimization. It doesn't execute SQL — instead, you provide execution time, rows scanned, and query frequency before and after a change (like adding an index, rewriting a query, or introducing caching), and the calculator quantifies the impact.
          </p>
          <p>
            Enter your original and optimized execution times to instantly see the performance improvement percentage, speed multiplier, and time saved. Optionally add rows scanned and daily execution counts to see rows reduction and cumulative daily, monthly, and yearly time savings.
          </p>
          <p>
            Built for <strong>database administrators, backend developers, full-stack developers, data engineers, software architects, students learning SQL optimization, and technical interview candidates</strong>, the calculator runs entirely in your browser with instant results and no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Query Optimization Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator applies straightforward before/after comparison formulas to your entered metrics.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Performance Improvement % = ((Original − Optimized) ÷ Original) × 100</p>
              <p>Speed Multiplier = Original ÷ Optimized</p>
              <p>Rows Reduction % = ((Rows Before − Rows After) ÷ Rows Before) × 100</p>
              <p>Daily Time Saved = Time Saved Per Query × Daily Executions</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Performance Improvement", "The percentage reduction in execution time — the headline metric for any optimization."],
              ["Speed Multiplier", "How many times faster the optimized query runs compared to the original."],
              ["Rows Reduction", "How much less data the query now scans — a strong signal that an index or filter is working effectively."],
              ["Cumulative Savings", "Daily, monthly, and yearly time saved when a query runs many times per day, showing the real-world impact of a small per-query improvement at scale."],
              ["Optimization Rating", "A quick Poor-to-Outstanding classification based on the improvement percentage."],
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
          How to Use the Query Optimization Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Execution Times", "Type your query's execution time in milliseconds before and after optimization."],
                ["Add Rows Scanned (Optional)", "Enter rows scanned before and after to calculate rows reduction percentage."],
                ["Add Daily Executions (Optional)", "Enter how often the query runs per day to estimate cumulative savings."],
                ["Select Optimization Type and Engine", "Choose the technique used and your database engine for a descriptive report."],
                ["Review and Export", "Check the improvement, speed multiplier, rating, and savings, then copy, download, or share the result."],
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
                "Animated before/after performance comparison bars",
                "Speed multiplier and rows reduction calculations",
                "Daily, monthly, and yearly cumulative savings projections",
                "Color-coded Poor-to-Outstanding optimization rating",
                "11 optimization types and 9 database engines",
                "Sample presets for common optimization scenarios",
                "Copy result, full report, and shareable link independently",
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
            { title: "Index Impact Reporting", scenario: "A DBA adds a composite index and quantifies the resulting 82% execution time improvement to justify the change in a sprint review." },
            { title: "Caching ROI Estimation", scenario: "A backend developer estimates that caching a hot query saves 16.7 hours of cumulative execution time per month at current traffic." },
            { title: "Query Rewrite Comparison", scenario: "A data engineer compares an old N+1 query pattern against a rewritten JOIN to show the measurable performance gain." },
            { title: "Infrastructure Cost Justification", scenario: "An engineering manager estimates yearly time savings from a proposed optimization to help prioritize it against other backlog items." },
            { title: "Technical Interview Practice", scenario: "A candidate practices explaining query optimization impact in terms of percentage improvement and rows scanned reduction." },
            { title: "Teaching SQL Performance", scenario: "A student compares execution time and rows scanned before and after adding an index to build intuition for how indexes work." },
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
                "Measure execution time under realistic conditions (warm cache, typical load) for both before and after to get a fair comparison.",
                "Add rows scanned data whenever possible — a large rows reduction alongside a modest time improvement often signals more optimization headroom remains.",
                "Use daily execution count for frequently-run queries — a 25ms saving looks small until you see it's 16.7 hours saved per month at scale.",
                "Take multiple measurements and use the median or average execution time rather than a single run, since query timing can vary.",
                "Track optimization type and database engine in your report so the history stays useful when comparing techniques over time.",
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
                "Don't compare a cold-cache run against a warm-cache run — the difference may reflect caching, not the optimization itself.",
                "Don't treat this calculator as a query analyzer — it estimates from numbers you provide and does not execute or analyze SQL.",
                "Don't ignore a high rows-scanned reduction with a low time improvement — it may mean the query is now bottlenecked elsewhere (e.g., network or serialization).",
                "Don't assume optimization gains scale linearly with traffic — always re-measure under realistic production load, not just a dev environment.",
                "Don't forget to account for optimizations that trade write speed for read speed (like adding an index) when evaluating overall impact.",
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
          Optimization Rating Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Improvement Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Below 10%", "Poor", "Optimization had minimal measurable impact — reconsider the approach."],
                ["10% – 39%", "Fair", "Modest improvement — may be worth combining with another technique."],
                ["40% – 69%", "Good", "Solid, meaningful improvement for most production queries."],
                ["70% – 89%", "Excellent", "Strong optimization — likely fixed the primary bottleneck."],
                ["90% and above", "Outstanding", "Major performance transformation, often from fixing a full table scan."],
              ].map(([range, rating, meaning]) => (
                <tr key={rating} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700 text-xs">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{rating}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{meaning}</td>
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
              q: "What is a query optimization calculator?",
              a: "A query optimization calculator is a free browser-based tool that estimates how much a database query's performance improved after optimization, based on execution time, rows scanned, and query frequency you provide. It does not execute SQL.",
            },
            {
              q: "How is performance improvement calculated?",
              a: "Performance Improvement % = ((Original Time − Optimized Time) ÷ Original Time) × 100. For example, going from 2500 ms to 450 ms gives an 82% improvement.",
            },
            {
              q: "What is the Speed Multiplier?",
              a: "Speed Multiplier = Original Time ÷ Optimized Time. A query that went from 2500 ms to 450 ms is 5.56× faster.",
            },
            {
              q: "How is Rows Reduction calculated?",
              a: "Rows Reduction % = ((Rows Before − Rows After) ÷ Rows Before) × 100. Reducing rows scanned from 2,500,000 to 75,000 is a 97% reduction.",
            },
            {
              q: "How are Daily, Monthly, and Yearly savings calculated?",
              a: "Daily Time Saved = Time Saved Per Query × Daily Executions. Monthly multiplies that by 30, and Yearly multiplies it by 365.",
            },
            {
              q: "What do the optimization ratings mean?",
              a: "Poor is under 10% improvement, Fair is 10–39%, Good is 40–69%, Excellent is 70–89%, and Outstanding is 90% or higher.",
            },
            {
              q: "Can the optimized time be worse than the original?",
              a: "Yes, the calculator allows this for comparison purposes and will show a negative improvement, flagging that the change made the query slower.",
            },
            {
              q: "Does this calculator work for MySQL, PostgreSQL, MongoDB, or other databases?",
              a: "Yes. The calculation is engine-agnostic and works with execution time and row count metrics from any database engine.",
            },
            {
              q: "Can I share my calculation with someone else?",
              a: "Yes. Click Share URL to copy a link that encodes your execution times, row counts, and daily executions as query parameters.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "🗄️", title: "Database Administrators", desc: "Quantify and report the impact of indexing and tuning work." },
            { icon: "🛠️", title: "Backend & Full-Stack Developers", desc: "Justify query optimizations with clear before/after metrics." },
            { icon: "🏗️", title: "Software Architects", desc: "Evaluate optimization ROI when prioritizing engineering work." },
            { icon: "📊", title: "Data Engineers", desc: "Measure pipeline query improvements at scale." },
            { icon: "🎓", title: "Students & Interview Candidates", desc: "Practice explaining SQL optimization impact quantitatively." },
            { icon: "💼", title: "Engineering Managers", desc: "Estimate infrastructure and cost savings from proposed optimizations." },
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
