export default function SparkJobTimeCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Spark Job Time Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>Spark job time calculator</strong> is a free browser-based tool that estimates the execution time of an <strong>Apache Spark job</strong> before you run it, based on your dataset size, cluster resources, and job characteristics. It's a quick sanity check for data engineers, platform teams, and Spark learners who want a ballpark estimate before committing compute to an expensive workload.
          </p>
          <p>
            Enter your dataset size and storage format, cluster configuration (executors and cores), and job characteristics like processing complexity and shuffle intensity, and the calculator instantly breaks the estimated runtime into read, processing, shuffle, write, and scheduling overhead phases — flagging the primary bottleneck and suggesting a targeted optimization.
          </p>
          <p>
            Built for <strong>data engineers, data scientists, platform engineers, DevOps teams, cloud architects, and Spark learners</strong>, the calculator runs entirely in your browser with instant results and no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Spark Job Time Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator models a Spark job as five sequential phases and sums their estimated durations.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Total Runtime = Read + Processing + Shuffle + Write + Scheduling Overhead</p>
              <p>Parallelism = Executors × Executor Cores</p>
              <p>Processing Time = (Data Size × Complexity Factor) ÷ Total CPU Capacity</p>
              <p>Shuffle Time = (Data Size × Shuffle Multiplier) ÷ Network Throughput</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Read Time", "Depends on dataset size, storage format, compression, and your entered I/O throughput."],
              ["Processing Time", "Depends on processing complexity and total available CPU capacity (executors × cores)."],
              ["Shuffle Time", "Depends on shuffle intensity and network throughput, reduced significantly when broadcast joins are enabled."],
              ["Write Time", "Depends on output size and effective write throughput to your target storage."],
              ["Scheduling Overhead", "An estimated 5–15% of subtotal runtime, scaling with the number of stages in the job."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 pt-2">This is a simplified estimation model for planning purposes — it is not a substitute for benchmarking your actual job on representative data.</p>
        </div>
      </section>

      {/* ── 3. Step-by-Step + Key Features ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Spark Job Time Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Dataset Information", "Provide the dataset size and unit, and choose a storage type and compression codec."],
                ["Configure Your Cluster", "Enter the number of executors, executor cores, executor memory, and driver memory."],
                ["Set Job Characteristics", "Choose processing complexity, shuffle intensity, stages, partition count, caching, and broadcast joins."],
                ["Review the Runtime Breakdown", "Check the estimated runtime split into read, processing, shuffle, write, and overhead phases."],
                ["Apply Optimization Suggestions", "Review the detected bottleneck and partition recommendation before running your real job."],
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
                "Five-phase execution time breakdown (read, processing, shuffle, write, overhead)",
                "Automatic bottleneck detection with targeted recommendations",
                "Cluster efficiency score and CPU utilization estimate",
                "Partition count recommendation based on cluster parallelism",
                "Storage format and compression codec modeling",
                "Caching and broadcast join impact modeling",
                "Sample presets for development, ETL, and enterprise-scale jobs",
                "Copy result, full report, and shareable link independently",
                "Download CSV, JSON, and print-friendly report",
                "Shareable calculation URL using query parameters",
                "Scenario history — save and reload past estimates",
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
            { title: "Pre-Flight Job Estimation", scenario: "A data engineer estimates runtime before submitting a 2 TB batch job to avoid an unexpectedly long-running cluster." },
            { title: "Cluster Sizing", scenario: "A platform engineer compares executor counts to find the smallest cluster that still meets a job's SLA." },
            { title: "Shuffle Optimization", scenario: "An analytics engineer identifies shuffle as the primary bottleneck and enables broadcast joins to cut runtime significantly." },
            { title: "Cost vs. Speed Tradeoffs", scenario: "A cloud architect compares a smaller, cheaper cluster against a larger one to see the runtime difference before choosing." },
            { title: "Partition Tuning", scenario: "A Spark developer checks whether their partition count is well-matched to cluster parallelism before a production run." },
            { title: "Learning Spark Performance", scenario: "A student experiments with complexity and shuffle intensity settings to build intuition for what drives Spark job runtime." },
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
                "Aim for 2–4 partitions per available core — the calculator's partition recommendation will tell you if you're outside that range.",
                "Enable Broadcast Joins whenever one side of a join is small enough to fit in executor memory — it dramatically cuts shuffle time.",
                "Use a columnar format like Parquet or ORC over CSV or JSON — they read significantly faster in this model and in real Spark.",
                "Check the Primary Bottleneck first — optimizing a phase that isn't the bottleneck won't meaningfully change total runtime.",
                "Compare a few cluster sizes side by side to find the point of diminishing returns before adding more executors.",
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
                "Don't treat this estimate as an exact prediction — real Spark runtime depends on data skew, JVM tuning, and cluster contention this tool can't observe.",
                "Don't select High or Very High shuffle intensity without also considering broadcast joins if applicable — it's the single biggest lever on shuffle time.",
                "Don't add more executors without checking whether shuffle or write time (not processing) is actually your bottleneck — more cores won't help there.",
                "Don't ignore partition count — too few partitions wastes available parallelism, and too many adds unnecessary scheduling overhead.",
                "Don't forget compression trades I/O time for CPU time — heavier codecs like Gzip read less data but cost more to decompress.",
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
          Bottleneck Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Bottleneck</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Common Cause</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Recommended Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Read", "Slow storage format, low I/O throughput, uncompressed data", "Use Parquet/ORC, enable compression, increase I/O throughput"],
                ["Processing", "High complexity transformations, too few cores", "Increase executor cores, optimize UDFs and transformations"],
                ["Shuffle", "Wide transformations, high shuffle intensity, no broadcast joins", "Enable broadcast joins, increase partitions, reduce wide transformations"],
                ["Write", "Slow output storage, uncompressed output, low write throughput", "Use a faster storage format, compress output, increase write throughput"],
              ].map(([b, cause, fix]) => (
                <tr key={b} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{b}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{cause}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{fix}</td>
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
              q: "What is a Spark job time calculator?",
              a: "A Spark job time calculator is a free browser-based tool that estimates Apache Spark job execution time using a simplified model based on dataset size, cluster resources, storage type, compression, shuffle intensity, and processing complexity.",
            },
            {
              q: "How is the estimated runtime calculated?",
              a: "Total Runtime = Read Time + Processing Time + Shuffle Time + Write Time + Scheduling Overhead, where each phase depends on dataset size, cluster parallelism, and the job characteristics you provide.",
            },
            {
              q: "What do the Processing Complexity levels mean?",
              a: "Complexity multiplies the base processing time: Very Low (0.6×), Low (0.8×), Medium (1.0×), High (1.5×), and Very High (2.2×), reflecting how CPU-intensive your transformations are.",
            },
            {
              q: "What is shuffle intensity and why does it matter?",
              a: "Shuffle intensity reflects how much data movement across the network your job triggers, from None to Very High. Wide transformations like groupBy, join, and repartition cause shuffles, often the biggest cost in a Spark job.",
            },
            {
              q: "How does the calculator detect bottlenecks?",
              a: "It compares Read, Processing, Shuffle, and Write time and flags whichever is largest as the Primary Bottleneck, then provides a targeted optimization recommendation.",
            },
            {
              q: "What is the ideal partition count?",
              a: "A common rule of thumb is 2 to 4 partitions per available core (executors × executor cores). Too few underuses parallelism; too many adds scheduling overhead.",
            },
            {
              q: "How do caching and broadcast joins affect the estimate?",
              a: "Caching Used reduces processing time by avoiding repeated reads of intermediate data. Broadcast Joins significantly reduce shuffle time by avoiding a full shuffle for joins against small tables.",
            },
            {
              q: "Is this an exact prediction of my Spark job's runtime?",
              a: "No. This is a simplified estimation model intended for quick planning and comparison before running expensive jobs. Real Spark runtime depends on many factors this browser-only calculator cannot observe.",
            },
            {
              q: "Can I share my calculation with someone else?",
              a: "Yes. Click Share URL to copy a link that encodes your dataset size, executors, cores, complexity, shuffle intensity, and I/O throughput as query parameters.",
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
            { icon: "🛠️", title: "Data Engineers", desc: "Estimate runtime before submitting expensive Spark batch jobs." },
            { icon: "⎈", title: "Platform & DevOps Engineers", desc: "Size Spark clusters and set realistic job SLAs." },
            { icon: "☁️", title: "Cloud Architects", desc: "Compare cluster sizing options for cost and speed tradeoffs." },
            { icon: "🔬", title: "Data Scientists", desc: "Sanity-check pipeline runtime before scaling up experiments." },
            { icon: "🎓", title: "Spark Learners & Students", desc: "Build intuition for what drives Spark job performance." },
            { icon: "🏗️", title: "Solution Architects", desc: "Plan distributed data pipeline capacity and timelines." },
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
