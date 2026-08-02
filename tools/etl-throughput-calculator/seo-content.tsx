export default function EtlThroughputCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an ETL Throughput Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>ETL throughput calculator</strong> is a free browser-based tool that measures how fast an Extract, Transform, Load pipeline processes data — in records per second, megabytes per second, or as an estimated completion time. It answers the questions every data engineer asks before and after a pipeline run: <em>how fast is this actually running, how long will it take, and is that fast enough?</em>
          </p>
          <p>
            This calculator supports four calculation modes covering the most common ETL performance questions: raw records throughput, data-size throughput for file or byte-based pipelines, estimated completion time from a known processing speed, and capacity planning to check whether a pipeline can meet a target SLA at peak load — including a growth-adjusted projection.
          </p>
          <p>
            This tool is built for <strong>data engineers, data analysts, data architects, BI engineers, database administrators, cloud engineers, DevOps engineers, students learning data engineering, and organizations planning ETL capacity</strong>. It supports Current vs. Optimized scenario comparison, calculation history, and export as CSV, JSON, or a print-ready report — entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the ETL Throughput Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Choose the calculation mode that matches your question, enter your pipeline's figures, and the calculator automatically converts your time and data units into a common basis before applying the matching formula.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Records/sec = Total Records ÷ Execution Time (sec)</p>
              <p>Data Throughput (MB/sec) = Data Size (MB) ÷ Execution Time (sec)</p>
              <p>Completion Time = Total Records ÷ Processing Speed</p>
              <p>Required Throughput = Peak Records ÷ Target SLA (sec)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Records Throughput mode", "Use this when you know a total record count and how long the job took, and want records/sec, /min, /hour, plus daily, weekly, and monthly capacity."],
              ["Data Size Throughput mode", "Use this for byte-based pipelines — file transfers, bulk exports, or replication jobs — measured in MB, GB, or TB."],
              ["Completion Time mode", "Use this when you know your dataset size and processing speed and want to estimate how long a job will take, optionally comparing against a desired target throughput."],
              ["Capacity Planning mode", "Use this to check whether your pipeline's current throughput (from average load and runtime) can meet a target SLA at peak load — and whether it still will after applying an expected growth percentage."],
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
          How to Use the ETL Throughput Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Mode", "Select Records Throughput, Data Size Throughput, Completion Time, or Capacity Planning depending on your question."],
                ["Try an Example (Optional)", "Click Large Batch Job, Fast Ingestion Job, or File Transfer Pipeline to instantly load realistic sample figures."],
                ["Enter Your Pipeline Figures", "Type your records, data size, or processing speed, and select matching time and data units. Results update instantly with a 150ms debounce."],
                ["Use Swap Unit for Quick Conversion", "Click Swap Unit to cycle the time unit between seconds, minutes, and hours without retyping your value."],
                ["Review Throughput and Capacity", "Check records/sec or MB/sec, plus hourly, daily, weekly, and monthly capacity projections."],
                ["Check the Throughput Trend Chart", "See a visual projection of cumulative volume processed across the pipeline's run window."],
                ["Compare, Export, or Share", "Set a Current and an Optimized scenario to compare side by side, export as CSV or JSON, print a formatted report, or copy a shareable URL."],
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
                "4 calculation modes: Records, Data Size, Completion Time, Capacity Planning",
                "Automatic time unit (seconds/minutes/hours) and data unit (MB/GB/TB) conversion",
                "Records/sec, /min, /hour plus daily, weekly, and monthly capacity",
                "Data throughput with hourly, daily, weekly, and monthly capacity",
                "Color-coded performance rating (🔴 Low, 🟡 Good, 🟢 Excellent)",
                "SLA sufficiency check with growth-adjusted capacity projection",
                "Interactive throughput trend chart",
                "Current vs. Optimized scenario comparison",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with full breakdown",
                "Print-ready formatted report",
                "Copy full report to clipboard in one click",
                "Calculation history — save and reload up to 20 past results",
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
              title: "Nightly Batch Job Throughput Check",
              scenario: "A data engineer's nightly batch job processes 5,000,000 records in 20 minutes. Using Records Throughput mode, the calculator returns 4,166.67 records/sec — an Excellent rating — and an hourly capacity of 15,000,000 records, confirming the job comfortably fits within its maintenance window.",
            },
            {
              title: "Streaming Ingestion Rate Validation",
              scenario: "A streaming pipeline processes 800,000 rows in 240 seconds. The calculator returns 3,333.33 rows/sec, landing in the Good performance tier — useful context when comparing against a downstream system's ingestion limits.",
            },
            {
              title: "File Transfer Pipeline Capacity",
              scenario: "A cloud engineer moves a 120 GB dataset in 45 minutes. Using Data Size Throughput mode, the calculator returns 45.51 MB/sec and a 160 GB/hour capacity — the figure used to estimate how long a much larger future migration will take.",
            },
            {
              title: "Estimating Completion Time for a New Job",
              scenario: "A BI engineer knows a new dataset has 1,000,000 records and the pipeline processes at 5,000 records/sec. Completion Time mode returns an estimated 200 seconds (about 3.3 minutes) — set against a 5-minute SLA, comfortably meeting the target.",
            },
            {
              title: "Capacity Planning Before a Growth Event",
              scenario: "A team's pipeline averages 1,000,000 records over a 10-minute runtime (1,666.67 records/sec current throughput) and must handle a 2,000,000-record peak within a 30-minute SLA (1,111.11 records/sec required) — currently sufficient. Adding an expected 20% growth in peak volume raises the requirement to 1,333.33 records/sec, still within capacity, informing the team they don't need to re-architect the pipeline yet.",
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
                "Measure throughput using wall-clock execution time, not just active processing time — idle time waiting on upstream sources or downstream writes is still part of your real pipeline runtime.",
                "Use Capacity Planning mode's growth percentage to stress-test your pipeline before a known traffic event, rather than discovering an SLA breach during it.",
                "Track throughput over multiple runs rather than a single measurement — batch jobs can vary run to run due to source data skew, cluster load, or network conditions.",
                "Use Current vs. Optimized comparison when evaluating a proposed pipeline change — a side-by-side throughput comparison makes the expected improvement concrete before you invest engineering time.",
                "When reporting data throughput, always confirm whether \"GB\" refers to binary (1024-based) or decimal (1000-based) units — this calculator uses the binary standard consistently.",
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
                "Don't compare records/sec across pipelines with very different record sizes — a pipeline moving small clickstream events will naturally show a higher records/sec than one moving large document records, even at similar data throughput.",
                "Don't plan capacity using only average load figures — peak load, not average load, is what determines whether an SLA is met during the busiest periods.",
                "Don't assume completion time scales linearly for every pipeline — some jobs have fixed overhead (connection setup, schema validation) that doesn't shrink proportionally as processing speed improves.",
                "Don't ignore the growth-adjusted capacity check — a pipeline that meets today's SLA can silently become insufficient as data volume grows if capacity isn't re-evaluated periodically.",
                "Don't mix up MB/sec (throughput) with Mb/sec (megabits per second, common in networking) — this calculator consistently uses megabytes.",
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

      {/* ── Formula / Benchmark Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Throughput Performance Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Records/sec</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Below 10,000", "🔴 Low", "Consider parallelization, indexing, or batching improvements."],
                ["10,000 – 100,000", "🟡 Good", "Solid throughput for most batch and streaming ETL workloads."],
                ["Above 100,000", "🟢 Excellent", "High-performance pipeline, typical of well-optimized bulk-load jobs."],
              ].map(([range, rating, meaning]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{range}</td>
                  <td className="py-2.5 px-4 text-gray-700">{rating}</td>
                  <td className="py-2.5 px-4 text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* The same tiering is applied proportionally to data throughput (MB/sec), and thresholds are general guidelines — actual "good" throughput depends heavily on record size, infrastructure, and workload type.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is ETL throughput?",
              a: "ETL throughput is the rate at which an Extract, Transform, Load pipeline processes data, typically measured in records per second or megabytes per second. It's a core metric for understanding pipeline performance and capacity.",
            },
            {
              q: "How do I calculate records per second?",
              a: "Divide total records processed by execution time in seconds: Records/sec = Total Records ÷ Execution Time. For example, 5,000,000 records processed in 20 minutes (1,200 seconds) gives 4,166.67 records/sec.",
            },
            {
              q: "How do I estimate ETL job completion time?",
              a: "Divide the total dataset size by your known processing speed: Completion Time = Total Records ÷ Processing Speed. For example, 1,000,000 records at 5,000 records/sec takes approximately 200 seconds.",
            },
            {
              q: "How do I calculate data throughput in MB/sec?",
              a: "Convert your data size to MB, then divide by execution time in seconds: Throughput = Data Size (MB) ÷ Execution Time (sec). For example, 120 GB (122,880 MB) transferred in 45 minutes (2,700 seconds) gives approximately 45.51 MB/sec.",
            },
            {
              q: "What is a good ETL throughput?",
              a: "This varies significantly by workload and infrastructure, but as general guidelines: above 100,000 records/sec is considered excellent, 10,000–100,000 records/sec is good, and below 10,000 records/sec may indicate room for optimization.",
            },
            {
              q: "How does Capacity Planning mode work?",
              a: "It compares your pipeline's current throughput (calculated from average load and runtime) against the throughput required to process peak load within a target SLA. It also projects a future peak using your expected growth percentage to check whether current capacity will remain sufficient.",
            },
            {
              q: "Why does the calculator distinguish average and peak records?",
              a: "Average load determines your baseline measured throughput, but peak load is what actually determines whether you meet your SLA during the busiest periods — planning capacity around averages alone can leave a pipeline under-provisioned exactly when it matters most.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your pipeline figures are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "🛠️", title: "Data Engineers & Data Architects", desc: "Measure and communicate pipeline performance in concrete, comparable numbers." },
            { icon: "📊", title: "Data Analysts & BI Engineers", desc: "Understand how long a data refresh will take before it lands in a dashboard." },
            { icon: "🗄️", title: "Database Administrators", desc: "Estimate migration and replication windows for large datasets." },
            { icon: "☁️", title: "Cloud Engineers & DevOps Engineers", desc: "Plan pipeline capacity ahead of scaling events and validate SLA compliance." },
            { icon: "🏢", title: "Organizations Planning ETL Capacity", desc: "Make infrastructure sizing decisions backed by concrete throughput math rather than guesswork." },
            { icon: "🎓", title: "Students Learning Data Engineering", desc: "Learn how throughput, completion time, and capacity planning formulas relate in real pipelines." },
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
