export default function HadoopStorageCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Hadoop Storage Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>Hadoop storage calculator</strong> is a free browser-based tool that estimates the total storage required for a Hadoop Distributed File System (HDFS) cluster based on raw data size, replication factor, compression ratio, reserved free space, and future growth.
          </p>
          <p>
            Enter your raw dataset size, replication factor, and compression ratio, and the calculator instantly returns the effective data size, replicated storage, reserved capacity, and total required storage — plus a multi-year growth forecast so you can plan cluster capacity ahead of time.
          </p>
          <p>
            This tool is built for <strong>data engineers, cloud architects, DevOps engineers, big data professionals, students, IT administrators, solution architects, and enterprises</strong> planning Hadoop clusters. It runs entirely in your browser — no infrastructure details are ever transmitted anywhere.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Hadoop Storage Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator applies compression, then replication, then reserved space and overhead — mirroring how HDFS actually consumes physical disk capacity across a cluster.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Effective Data = Raw Data × Compression Ratio</p>
              <p>Replicated Storage = Effective Data × Replication Factor</p>
              <p>Reserved = Replicated Storage × (Reserved % ÷ 100)</p>
              <p>Total Required Storage = Replicated Storage + Reserved + Overhead</p>
              <p>Future Data = Raw Data × (1 + Growth Rate)^Years</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Replication Factor", "The number of copies HDFS stores of every data block for fault tolerance — 3 is the standard default for production clusters."],
              ["Compression Ratio", "A multiplier between 0.1 and 1.0 representing how much smaller your data becomes after compression before replication is applied."],
              ["Reserved Free Space", "A safety buffer of unused capacity kept available on each node to avoid performance degradation as disks approach full."],
              ["Growth Forecast", "Projects future raw data and required cluster storage using compound annual growth, so you can plan hardware purchases ahead of need."],
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
          How to Use the Hadoop Storage Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Raw Data Size", "Type your dataset size and choose MB, GB, TB, or PB."],
                ["Set Replication Factor", "Choose how many copies of each block HDFS should store — 3 is standard."],
                ["Set Compression Ratio", "Enter a value from 0.1 to 1.0, where 1.0 means no compression."],
                ["Adjust Reserved Space & Overhead", "Set the safety buffer percentage and any metadata/snapshot overhead."],
                ["Set Growth Rate & Planning Period", "Enter your expected annual data growth and choose a 1–10 year planning window."],
                ["Read the Live Result", "Replicated storage, total required storage, and a multi-year forecast update instantly as you type."],
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
                "Effective data, replicated storage, reserved capacity, and total required storage in one view",
                "Visual storage breakdown chart showing effective data, replication, reserved space, and overhead",
                "Multi-year growth forecast chart across Year 1, 2, 3, 5, and 10",
                "Replication factor comparison table (RF 1 through 5)",
                "Automatic cluster recommendation based on your configuration",
                "Support for MB, GB, TB, and PB with auto-formatted readable output",
                "Adjustable decimal precision (0–3 places)",
                "Quick example presets for common cluster sizing scenarios",
                "Instant calculation with a 150ms debounce as you type",
                "Export report as CSV or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past results",
                "Clear validation for invalid replication, compression, and reserved values",
                "All processing runs locally — no cluster details are ever uploaded",
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
              title: "New Cluster Capacity Planning",
              scenario: "A data engineer planning a new Hadoop cluster for 5 TB of raw data with the standard replication factor of 3 uses the calculator to confirm 15 TB of physical storage is required before ordering hardware.",
            },
            {
              title: "Compression Strategy Evaluation",
              scenario: "A cloud architect compares required storage at different compression ratios for a 25 TB dataset, finding that 50% compression cuts replicated storage nearly in half — informing a decision to enable compression cluster-wide.",
            },
            {
              title: "Multi-Year Growth Forecasting",
              scenario: "An enterprise IT team forecasts that 100 TB of current data will grow to nearly 220 TB within three years at a 30% annual growth rate, and provisions storage for a 659 TB replicated footprint ahead of time.",
            },
            {
              title: "Reserved Space Safety Audit",
              scenario: "A DevOps engineer reviews a cluster configured with only 5% reserved space and uses the calculator's recommendation to raise it to a safer 15–20% buffer before disks approach capacity.",
            },
            {
              title: "Replication Factor Trade-off Analysis",
              scenario: "A solution architect compares replication factors 2 through 5 side by side to balance fault tolerance against storage cost for a non-critical development cluster.",
            },
            {
              title: "Academic Big Data Coursework",
              scenario: "A student learning HDFS fundamentals uses the calculator to verify manually computed replication and reserved-space formulas from their distributed systems coursework.",
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
                "Stick with the default replication factor of 3 for production data — it's the Hadoop community standard for balancing fault tolerance and storage cost.",
                "Always budget reserved free space of at least 15–20% — HDFS performance degrades noticeably as disks approach full capacity.",
                "Use the growth forecast early in planning — under-provisioning storage is far more disruptive than over-provisioning by a small margin.",
                "Compression ratio matters more at scale — even modest compression can save enormous amounts of replicated storage across a large cluster.",
                "Use the replication comparison table when deciding between cost savings and fault tolerance for non-critical or dev/test clusters.",
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
                "Don't forget that replication multiplies storage — a replication factor of 3 always means 3× the effective data size, not 3× the raw data before compression.",
                "Don't set reserved free space to 0% for production clusters — this removes the safety buffer needed to avoid disk-full failures.",
                "Don't confuse 'Replicated Storage' with 'Total Required Storage' — the total also includes reserved space and overhead on top of replication.",
                "Don't ignore growth forecasting — a cluster sized only for today's data often requires disruptive re-provisioning within a year or two.",
                "Don't apply an unrealistically aggressive compression ratio — actual compression varies significantly by data type and format.",
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
          Hadoop Storage Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Raw Data</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Replication</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Compression</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Replicated Storage</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total (15% Reserved)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["5 TB", "3", "1.0", "15 TB", "17.25 TB"],
                ["25 TB", "3", "0.5", "37.5 TB", "43.13 TB"],
                ["100 TB", "3", "0.5", "150 TB", "172.5 TB"],
                ["100 TB", "3", "1.0", "300 TB", "345 TB"],
                ["2 TB", "2", "1.0", "4 TB", "4.6 TB"],
              ].map(([raw, rf, comp, repl, total]) => (
                <tr key={raw + rf + comp} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{raw}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{rf}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{comp}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{repl}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{total}</td>
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
              q: "What is a Hadoop storage calculator?",
              a: "A Hadoop storage calculator is a free browser-based tool that estimates the physical disk capacity an HDFS cluster needs, based on raw data size, replication factor, compression ratio, and reserved free space.",
            },
            {
              q: "How is required HDFS storage calculated?",
              a: "Effective Data = Raw Data × Compression Ratio, then Replicated Storage = Effective Data × Replication Factor. For example, 5 TB of raw data with no compression and a replication factor of 3 requires 15 TB of replicated storage.",
            },
            {
              q: "Why does HDFS need a replication factor?",
              a: "HDFS stores multiple copies of every data block across different nodes so that data survives individual disk or node failures. The default replication factor of 3 is the standard for production Hadoop clusters.",
            },
            {
              q: "What's the difference between Replicated Storage and Total Required Storage?",
              a: "Replicated Storage is your effective data multiplied by the replication factor. Total Required Storage adds reserved free space and any storage overhead on top of that, representing the full physical capacity you should actually provision.",
            },
            {
              q: "Why should I reserve free space on a Hadoop cluster?",
              a: "HDFS and the underlying operating system need headroom for temporary files, block reports, and write buffering. Running disks near 100% full degrades cluster performance and increases the risk of write failures — 15–20% reserved space is a common safe default.",
            },
            {
              q: "How is future storage growth calculated?",
              a: "Future Data = Raw Data × (1 + Growth Rate)^Years, using compound annual growth. For example, 100 TB growing at 30% annually reaches about 219.7 TB after 3 years.",
            },
            {
              q: "What compression ratio should I use?",
              a: "A compression ratio of 1.0 means no compression. A ratio of 0.5 means your data compresses to half its original size before replication. Actual ratios vary by data type — text and logs often compress well, while already-compressed formats may see little benefit.",
            },
            {
              q: "Is my cluster configuration data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. No cluster sizing information, data volumes, or configuration details are ever transmitted to any server.",
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
            { icon: "🗄️", title: "Data Engineers", desc: "Plan HDFS cluster capacity before provisioning hardware." },
            { icon: "☁️", title: "Cloud Architects", desc: "Estimate storage footprint for cloud-hosted Hadoop deployments." },
            { icon: "⚙️", title: "DevOps Engineers", desc: "Validate reserved space and replication settings before scaling a cluster." },
            { icon: "🏢", title: "Enterprises", desc: "Forecast multi-year storage growth for budget and infrastructure planning." },
            { icon: "🖥️", title: "Solution Architects", desc: "Compare replication and compression trade-offs across cluster designs." },
            { icon: "🎓", title: "Students & IT Admins", desc: "Learn and verify HDFS replication and capacity formulas." },
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
