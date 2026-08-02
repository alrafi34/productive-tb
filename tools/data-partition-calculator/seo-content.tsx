export default function DataPartitionCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Data Partition Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>data partition calculator</strong> is a free browser-based tool that helps you plan the optimal partitioning strategy for datasets, files, databases, and distributed computing workloads. It calculates partition size, the number of partitions needed, records per partition, total storage, and balanced record distribution.
          </p>
          <p>
            Choose a calculation mode, enter your dataset size or record count, and the calculator instantly returns the results — including an interactive distribution chart and partition size guidance based on common big data performance benchmarks.
          </p>
          <p>
            This tool is built for <strong>data engineers, database administrators, cloud engineers, software developers, data analysts, students, DevOps engineers, and system architects</strong>. It runs entirely in your browser — no dataset details are ever transmitted anywhere.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Data Partition Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator supports five calculation modes, each solving for a different unknown in a partitioning problem.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Partition Size = Total Data Size ÷ Number of Partitions</p>
              <p>Required Partitions = Ceiling(Total Data Size ÷ Desired Partition Size)</p>
              <p>Records Per Partition = Total Records ÷ Number of Partitions</p>
              <p>Total Storage = Partition Size × Number of Partitions</p>
              <p>Balanced Distribution: base = ⌊Records ÷ Partitions⌋, remainder distributed one-per-partition</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Partition Size Mode", "Splits a known total data size evenly across a fixed number of partitions."],
              ["Number of Partitions Mode", "Works backward from a target partition size to determine how many partitions you need, rounding up so no partition exceeds your target."],
              ["Records Per Partition Mode", "Divides a record count evenly across partitions — ideal for database sharding and distributed table planning."],
              ["Balanced Distribution Mode", "Handles datasets that don't divide evenly, distributing the remainder one extra record at a time to the first partitions so every partition differs by at most one record."],
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
          How to Use the Data Partition Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Mode", "Select Partition Size, Number of Partitions, Records Per Partition, Total Storage, or Balanced Distribution."],
                ["Enter Your Data", "Type your total data size, desired partition size, record count, or number of partitions depending on the mode."],
                ["Pick a Size Unit", "Select KB, MB, GB, TB, or PB for size-based calculations."],
                ["Adjust Decimal Precision", "Choose how many decimal places to display, from 0 to 5."],
                ["Review the Results", "Partition size, partition count, and distribution details update instantly as you type."],
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
                "Five calculation modes covering every common partitioning scenario",
                "Partition size guidance gauge based on the commonly recommended 10 MB – 1 GB range",
                "Balanced distribution table and chart for datasets that don't divide evenly",
                "Human-readable large number formatting for record counts (e.g., 6.25M)",
                "Support for KB, MB, GB, TB, and PB with automatic readable formatting",
                "Adjustable decimal precision (0–5 places)",
                "Quick example presets matching common real-world partitioning scenarios",
                "Instant calculation with a 150ms debounce as you type",
                "Export report as CSV or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past results",
                "Clear validation for zero, negative, and out-of-range partition counts",
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
              title: "Splitting a Dataset Evenly",
              scenario: "A data engineer splits a 500 GB dataset into 10 equal partitions of 50 GB each before loading it into a distributed processing pipeline.",
            },
            {
              title: "Sizing Partitions for a Target File Size",
              scenario: "A cloud engineer needs partitions no larger than 200 GB for a 2 TB dataset and uses the calculator to confirm 11 partitions are required to stay under that limit.",
            },
            {
              title: "Database Sharding Planning",
              scenario: "A database administrator distributes 50 million records across 8 shards, confirming each shard holds 6.25 million records before configuring the sharding key.",
            },
            {
              title: "Handling Uneven Record Counts",
              scenario: "A backend developer partitions 1,000,003 records across 8 partitions using Balanced Distribution mode, seeing exactly 3 partitions receive one extra record while the rest stay perfectly even.",
            },
            {
              title: "Big Data Performance Tuning",
              scenario: "A Spark developer checks whether their computed partition size falls within the recommended 10 MB–1 GB range, using the size gauge to decide whether to repartition a job that's running slowly.",
            },
            {
              title: "Cloud Storage Capacity Planning",
              scenario: "A system architect calculates total storage required for 500 partitions of 2 GB each before provisioning object storage buckets.",
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
                "Aim for partition sizes between 10 MB and 1 GB for most big data frameworks — the size gauge flags when you're outside this range.",
                "Use Number of Partitions mode when you have a hard limit (like a 200 GB file size cap), and Partition Size mode when you already know your partition count.",
                "Use Balanced Distribution mode instead of simple division whenever your record count doesn't divide evenly across partitions.",
                "Very small partitions increase file-open and metadata overhead; very large partitions reduce parallelism — both hurt performance.",
                "Load an example preset first to see the expected input format for your chosen mode.",
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
                "Don't assume records divide evenly across partitions — use Balanced Distribution mode to see exactly which partitions get an extra record.",
                "Don't confuse 'Number of Partitions' mode's rounding — it always rounds up, so your actual average partition size may be smaller than your desired target.",
                "Don't set an unreasonably high partition count — extremely high counts can create excessive small-file overhead in distributed storage systems.",
                "Don't mix units between total data size and desired partition size — both must be entered in the same selected unit.",
                "Don't ignore the partition size gauge — both undersized and oversized partitions carry real performance costs at scale.",
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
          Data Partition Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Mode</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Input</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Partition Size", "500 GB ÷ 10 partitions", "50 GB per partition"],
                ["Number of Partitions", "2 TB dataset, 200 GB target", "11 partitions"],
                ["Records Per Partition", "50M records ÷ 8 partitions", "6.25M records per partition"],
                ["Number of Partitions", "850 GB dataset, 128 GB target", "7 partitions, 121.43 GB average"],
                ["Balanced Distribution", "1,000,003 records ÷ 8 partitions", "3 partitions get 125,001; 5 get 125,000"],
              ].map(([mode, input, res]) => (
                <tr key={mode + input} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{mode}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{input}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{res}</td>
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
              q: "What is a data partition calculator?",
              a: "A data partition calculator is a free browser-based tool that helps you plan how to divide a dataset, file, or table into partitions — calculating partition size, partition count, records per partition, and total storage.",
            },
            {
              q: "How is partition size calculated?",
              a: "Partition Size = Total Data Size ÷ Number of Partitions. For example, a 500 GB dataset split into 10 partitions results in 50 GB per partition.",
            },
            {
              q: "How is the required number of partitions calculated?",
              a: "Required Partitions = Ceiling(Total Data Size ÷ Desired Partition Size), always rounding up. A 2 TB dataset with a 200 GB target partition size requires 11 partitions, since 2048 ÷ 200 = 10.24, rounded up to 11.",
            },
            {
              q: "What is balanced distribution?",
              a: "Balanced distribution evenly spreads records across partitions when the total doesn't divide evenly. The base count per partition is the floor of the division, and the remainder is distributed one extra record at a time to the first partitions, so no partition differs from another by more than one record.",
            },
            {
              q: "What is a good partition size for big data processing?",
              a: "Most distributed processing frameworks perform best with partition sizes between roughly 10 MB and 1 GB. Partitions smaller than 10 MB add file-handling overhead, while partitions larger than 1 GB can reduce parallelism.",
            },
            {
              q: "Why does the distribution table only show some partitions for very large counts?",
              a: "For datasets with a very large number of partitions, the calculator displays the first 100 partitions and summarizes the rest, since the pattern is fully determined by the base record count and remainder — this keeps the tool fast and responsive.",
            },
            {
              q: "Can I use this for database sharding?",
              a: "Yes — Records Per Partition and Balanced Distribution modes work well for planning how many records each database shard or table partition should hold.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. No dataset sizes, record counts, or storage details are ever transmitted to any server.",
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
            { icon: "🗄️", title: "Data Engineers", desc: "Plan optimal partition sizes for distributed processing pipelines." },
            { icon: "🗃️", title: "Database Administrators", desc: "Distribute records evenly across shards and table partitions." },
            { icon: "☁️", title: "Cloud Engineers", desc: "Size object storage partitions to meet platform-specific limits." },
            { icon: "💻", title: "Software Developers", desc: "Plan batch processing splits for large datasets." },
            { icon: "🏗️", title: "System Architects", desc: "Balance parallelism against overhead when designing storage layouts." },
            { icon: "🎓", title: "Students & Analysts", desc: "Learn and verify partitioning formulas for distributed systems coursework." },
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
