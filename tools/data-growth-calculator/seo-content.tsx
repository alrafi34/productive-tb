export default function DataGrowthCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Data Growth Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>data growth calculator</strong> is a free browser-based tool that forecasts how much digital data — a database, backup set, or cloud storage bucket — will grow over time, based on an initial size and a recurring growth rate. It answers a question every infrastructure team eventually faces: <em>how much storage will I actually need in 6, 12, or 24 months?</em>
          </p>
          <p>
            Data grows in two common patterns: a fixed amount added every period (like a backup system adding a consistent daily snapshot size), or a percentage that compounds every period (like a database growing faster as more customers and records are added). This calculator supports both models, automatically converts between MB, GB, TB, and PB, and visualizes the projection with an interactive chart and a growth timeline table.
          </p>
          <p>
            This tool is built for <strong>data engineers, database administrators, cloud architects, DevOps engineers, system administrators, software engineers, IT managers, startup founders, and storage infrastructure teams</strong> who need to plan capacity ahead of time. It supports scenario comparison, an optional storage cost estimate, calculation history, and export as CSV, JSON, or a print-ready report — entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Data Growth Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter your initial data size and unit, choose whether growth is a fixed amount or a compounding percentage per period, set how often that growth occurs, and how long you want to project forward. The calculator converts your duration and growth interval into a matching number of periods and applies the correct formula automatically.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Fixed Growth: Final Size = Initial Size + (Growth × Number of Periods)</p>
              <p>Percentage Growth: Final Size = Initial Size × (1 + Growth Rate)^Periods</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Fixed Growth", "Use this when a consistent amount of data is added every period — like a daily backup snapshot of roughly the same size each time."],
              ["Percentage Growth (Compound)", "Use this when data grows proportionally to its current size — like a database that grows faster as more records, users, or transactions accumulate."],
              ["Growth Interval vs. Duration Unit", "These can differ — for example, a daily growth rate projected over a duration measured in years. The calculator converts both to a common period count automatically."],
              ["Unit Auto-Conversion", "All sizes are converted internally using standard binary units (1024 MB = 1 GB, 1024 GB = 1 TB) and displayed in whichever unit best fits the resulting magnitude."],
              ["Storage Cost Estimate", "Optionally enter a cost per GB to see an estimated total storage cost at the final projected size — useful for budgeting cloud storage spend."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Data Growth Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Try an Example (Optional)", "Click Fixed Monthly Backup Growth, Compounding Database Growth, or Daily Backup Accumulation to instantly load realistic sample figures."],
                ["Enter Your Initial Data Size", "Type the starting size and select MB, GB, TB, or PB."],
                ["Choose a Growth Type", "Select Fixed Growth for a consistent amount per period, or Percentage Growth for compounding growth."],
                ["Set the Growth Value and Interval", "Enter the growth amount or rate, and how often it occurs (Daily, Weekly, Monthly, Quarterly, or Yearly). Results update instantly with a 150ms debounce."],
                ["Set Your Projection Duration", "Enter how far forward to project, in days, weeks, months, or years — independent of your growth interval."],
                ["Add Optional Settings", "Expand Optional Inputs to adjust decimal precision or add a cost per GB for a storage cost estimate."],
                ["Review the Chart, Timeline, and Compare", "Check the growth projection chart, timeline table, use Compare as A/B for two scenarios, export as CSV or JSON, or print a formatted report."],
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
                "Fixed and compounding percentage growth models",
                "Automatic MB / GB / TB / PB unit conversion and smart formatting",
                "Independent growth interval and projection duration units",
                "Interactive growth projection chart with PNG download",
                "Growth timeline table with evenly spaced checkpoints",
                "Optional storage cost estimate from a cost-per-GB input",
                "High-growth warning when projections exceed 100 TB within 3 years",
                "Adjustable decimal precision (0, 2, 4, or 6 places)",
                "Compare-as-A/B scenario comparison with overlaid chart",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with full timeline breakdown",
                "Print-ready formatted report",
                "Copy full report to clipboard in one click",
                "Calculation history — save and reload up to 20 past projections",
                "No signup required — 100% free to use",
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
              title: "Backup System Capacity Planning",
              scenario: "A system administrator starts with a 100 GB backup archive that grows by a fixed 10 GB every month. Using Fixed Growth mode over a 24-month projection, the calculator returns a final size of 340 GB — the number used to size the next storage volume purchase.",
            },
            {
              title: "Compounding Database Growth Forecast",
              scenario: "A database administrator starts with a 2 TB production database growing at 15% per month. Using Percentage Growth mode over 12 months, the calculator projects approximately 10.7 TB — a dramatic compounding effect that justifies migrating to a more scalable storage tier well before month 12.",
            },
            {
              title: "Daily Backup Accumulation",
              scenario: "A DevOps engineer tracks a 500 GB backup set growing by a fixed 2 GB every day. Projected over 365 days, the calculator returns approximately 1.20 TB — informing a full-year cloud storage budget request.",
            },
            {
              title: "Comparing Fixed vs. Compounding Assumptions",
              scenario: "A cloud architect uses Compare as A/B to test two assumptions for the same database: Scenario A assumes a conservative fixed monthly addition, while Scenario B assumes a more aggressive compounding percentage. The overlaid chart makes clear how much faster the compounding scenario diverges from the fixed one over time.",
            },
            {
              title: "Estimating Cloud Storage Cost",
              scenario: "An IT manager enters a cost-per-GB figure alongside a 12-month compounding growth projection, instantly seeing an estimated total storage cost at the final projected size — a number included directly in the next budget cycle's infrastructure request.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Best Practices ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Use Fixed Growth for predictable, append-only data like log files or scheduled backups, and Percentage Growth for data tied to a growing user base or transaction volume, like a production database.",
                "Add a safety buffer on top of any projection before provisioning infrastructure — real-world growth rarely follows a perfectly smooth curve.",
                "Recalculate your projection periodically with updated actual growth figures rather than relying on a single estimate made months ago.",
                "Use Compare as A/B to model a conservative and an aggressive growth scenario side by side, then provision for something between the two.",
                "Pay attention to the high-growth warning — a compounding percentage that looks small per period can produce an enormous total within just a few years.",
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
                "Don't apply a percentage growth model to data that actually grows by a fixed amount per period, or vice versa — the two models diverge significantly over long projections.",
                "Don't assume a compounding percentage rate observed over a short window will hold indefinitely — most systems eventually plateau as growth drivers saturate.",
                "Don't forget that growth interval and duration unit are independent — a daily growth rate projected using a duration of \"24\" without specifying months versus days can produce a very different result than intended.",
                "Don't mix binary (1024-based) and decimal (1000-based) unit assumptions when comparing this calculator's output to another tool — always confirm which convention is being used.",
                "Don't ignore compounding effects when planning far into the future — even a modest-looking monthly percentage growth rate can produce dramatically larger totals after several years.",
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

      {/* ── Formula Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Formula Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Model</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Fixed Growth", "Initial + (Growth × Periods)", "100 GB + (10 GB × 24) = 340 GB"],
                ["Percentage Growth", "Initial × (1 + Rate)^Periods", "2 TB × (1.15)^12 ≈ 10.7 TB"],
              ].map(([name, formula, example]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary uppercase text-xs tracking-wide">{name}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{formula}</td>
                  <td className="py-2.5 px-4 font-mono text-green-700">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Unit conversions use the binary standard: 1024 MB = 1 GB, 1024 GB = 1 TB, 1024 TB = 1 PB.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a data growth calculator used for?",
              a: "A data growth calculator estimates how much a dataset, database, or storage system will grow over time, based on an initial size and a recurring growth rate. It's used for capacity planning, budgeting cloud storage costs, and forecasting when infrastructure will need to scale.",
            },
            {
              q: "What's the difference between fixed and percentage growth?",
              a: "Fixed growth adds the same amount of data every period, like a daily backup of a consistent size. Percentage growth compounds — each period's growth is a percentage of the current (already-grown) total, which produces much larger totals over long projections than fixed growth at a comparable starting rate.",
            },
            {
              q: "How do I calculate fixed data growth?",
              a: "Final Size = Initial Size + (Growth × Number of Periods). For example, 100 GB growing by 10 GB per month for 24 months results in 100 + (10 × 24) = 340 GB.",
            },
            {
              q: "How do I calculate compounding data growth?",
              a: "Final Size = Initial Size × (1 + Growth Rate)^Periods. For example, 2 TB growing at 15% per month for 12 months results in 2 × (1.15)^12 ≈ 10.7 TB.",
            },
            {
              q: "How does unit conversion work in this calculator?",
              a: "This calculator uses the binary storage standard, where 1024 MB = 1 GB, 1024 GB = 1 TB, and 1024 TB = 1 PB. All calculations are performed in a common internal unit and then displayed in whichever unit best fits the resulting magnitude.",
            },
            {
              q: "Can I use a different growth interval than my projection duration unit?",
              a: "Yes. For example, you can set a daily growth interval with a projection duration measured in years — the calculator converts both to a common number of periods automatically using standard day-equivalents for each unit.",
            },
            {
              q: "How is the storage cost estimate calculated?",
              a: "If you enter a cost per GB, the calculator multiplies your final projected size (converted to GB) by that cost to produce an estimated total storage cost — a simple planning figure, not a substitute for actual cloud provider pricing tiers.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your storage figures and growth assumptions are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 7 ? "border-b border-gray-100 pb-6" : ""}>
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
            { icon: "🗄️", title: "Data Engineers & DBAs", desc: "Forecast database growth to plan schema, indexing, and hardware scaling ahead of time." },
            { icon: "☁️", title: "Cloud Architects & DevOps Engineers", desc: "Model storage growth across environments to right-size cloud storage tiers and budgets." },
            { icon: "🖥️", title: "System Administrators", desc: "Plan backup and archive storage capacity before running out of allocated disk space." },
            { icon: "💻", title: "Software Engineers", desc: "Estimate how application data and logs will scale as user activity grows." },
            { icon: "🏢", title: "IT Managers & Startup Founders", desc: "Budget for future storage infrastructure costs as part of broader financial planning." },
            { icon: "🎓", title: "Students Learning Data Engineering", desc: "Understand the difference between linear and compounding growth models with a hands-on calculator." },
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
