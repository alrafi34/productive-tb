export default function OutlierDetectionCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Outlier Detection Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>outlier detection calculator</strong> is a free browser-based statistical tool that identifies values in a dataset that deviate significantly from the rest of the data. It supports five methods — the <strong>IQR Rule</strong>, the <strong>Z-Score Method</strong>, the <strong>Modified Z-Score (MAD)</strong> method, <strong>Percentile-Based</strong> detection, and a <strong>Custom Threshold</strong> — each with adjustable sensitivity.
          </p>
          <p>
            Enter your dataset and pick a method, and the calculator instantly flags each outlier, shows its deviation score, and visualizes the full dataset as a dot plot, box plot, or histogram with outliers highlighted in red.
          </p>
          <p>
            Built for <strong>data analysts, statisticians, researchers, quality assurance teams, and students</strong>, the calculator runs entirely in your browser with instant results and no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Outlier Detection Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Detection Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>IQR: Outlier if value &lt; Q1 − k×IQR or value &gt; Q3 + k×IQR</p>
              <p>Z-Score: Outlier if |(value − mean) ÷ stdDev| &gt; threshold</p>
              <p>Modified Z-Score: Outlier if |0.6745 × (value − median) ÷ MAD| &gt; threshold</p>
              <p>Percentile: Outlier if value falls outside your chosen percentile bounds</p>
              <p>Custom: Outlier if value falls outside your specified min/max</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["IQR Rule", "Uses quartiles rather than the mean, making it robust to skewed distributions. The default multiplier is 1.5 for standard outliers, or 3.0 for 'extreme' outliers."],
              ["Z-Score Method", "Measures how many standard deviations a value is from the mean — intuitive, but sensitive to the very outliers it's trying to detect since they inflate the standard deviation."],
              ["Modified Z-Score (MAD)", "Uses the median and Median Absolute Deviation instead of mean and standard deviation, making it far more resistant to distortion from extreme values."],
              ["Percentile-Based", "Flags any value outside a chosen percentile range (e.g., below the 1st or above the 99th percentile) — a simple, distribution-free way to trim the tails."],
              ["Custom Threshold", "Lets you specify your own acceptable minimum and/or maximum value directly, useful when you have domain knowledge of valid ranges."],
              ["Adjustable Threshold", "Every method's sensitivity can be tuned — a lower threshold flags more points as outliers; a higher threshold is more conservative."],
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
          How to Use the Outlier Detection Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Dataset", "Type or paste numbers separated by commas, spaces, or new lines, or upload a CSV/TXT file."],
                ["Choose a Detection Method", "Select the IQR Rule, Z-Score Method, or Modified Z-Score (MAD)."],
                ["Adjust the Threshold", "Fine-tune sensitivity — a lower threshold flags more points as outliers."],
                ["Review Flagged Outliers", "See flagged outliers on the chart and results table, with deviation scores."],
                ["Export or Share", "Copy the result, download a report, or save to your calculation history."],
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
                "Three outlier detection methods with adjustable thresholds",
                "Interactive dot plot chart with outliers highlighted in red",
                "Lower/upper bound visualization for the IQR method",
                "Full results table with per-point deviation scores",
                "Drag-and-drop CSV and TXT file upload",
                "Sample datasets and a random dataset generator (with injected outliers)",
                "Copy full report and download CSV, JSON, or print-friendly report",
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
            { title: "Data Cleaning Before Analysis", scenario: "A data analyst uses the IQR rule to flag likely data entry errors before running a regression analysis." },
            { title: "Server Performance Monitoring", scenario: "A DevOps engineer uses the Z-Score method to flag response time spikes that indicate an infrastructure issue." },
            { title: "Sensor Data Validation", scenario: "An IoT engineer uses Modified Z-Score to catch faulty sensor readings without being thrown off by other genuine extreme readings." },
            { title: "Financial Fraud Screening", scenario: "An analyst flags unusually large transactions in a dataset for manual review using the IQR rule." },
            { title: "Quality Control Inspection", scenario: "A QA engineer identifies measurement outliers that may indicate a manufacturing defect." },
            { title: "Academic Statistics Coursework", scenario: "A student compares how IQR, Z-Score, and Modified Z-Score methods flag different points on the same dataset." },
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
                "Try more than one method — if IQR, Z-Score, and Modified Z-Score all agree on a point, you can be more confident it's a genuine outlier.",
                "Use Modified Z-Score when you suspect your dataset already contains multiple extreme values, since it resists distortion better than the standard Z-Score.",
                "Investigate flagged outliers before removing them — they might reveal a real phenomenon, not just noise or error.",
                "Use a stricter threshold (IQR k=3.0, Z-score=3) when you only want to catch truly extreme values, not just unusual ones.",
                "Document your chosen method and threshold when reporting results — different reasonable choices can flag different points.",
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
                "Don't use the standard Z-Score method on small or already outlier-heavy datasets — extreme values distort the mean and standard deviation it relies on.",
                "Don't automatically delete every flagged outlier — some are legitimate and important, especially in fraud detection or safety monitoring.",
                "Don't use a one-size-fits-all threshold — the right sensitivity depends on your domain and how costly false positives or false negatives are.",
                "Don't apply outlier detection to categorical or non-numeric data — these methods are designed for continuous numeric distributions.",
                "Don't ignore the shape of your data — the IQR rule is generally safer than Z-Score for skewed, non-normal distributions.",
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
          Outlier Method Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Based On</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Threshold</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["IQR Rule", "Quartiles (Q1, Q3)", "k = 1.5 (mild), k = 3.0 (extreme)", "Skewed or non-normal data"],
                ["Z-Score", "Mean & standard deviation", "|z| > 2 or 3", "Roughly normal data, no existing extremes"],
                ["Modified Z-Score", "Median & MAD", "|Mz| > 3.5", "Data with existing extreme values"],
                ["Percentile-Based", "Sorted rank position", "e.g., below P1 or above P99", "Simple, distribution-free tail trimming"],
                ["Custom Threshold", "User-defined min/max", "Domain-specific", "Known valid value ranges"],
              ].map(([method, basis, threshold, best]) => (
                <tr key={method} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{method}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{basis}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{threshold}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{best}</td>
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
              q: "What is an outlier detection calculator?",
              a: "An outlier detection calculator is a free browser-based tool that identifies values in a dataset that deviate significantly from the rest of the data, using the IQR rule, Z-Score method, Modified Z-Score (MAD), Percentile-Based detection, or a Custom Threshold.",
            },
            {
              q: "How does the IQR rule work?",
              a: "It flags a value as an outlier if it falls below Q1 − k×IQR or above Q3 + k×IQR, where IQR = Q3 − Q1 and k is typically 1.5 or 3.0.",
            },
            {
              q: "How does the Z-Score method work?",
              a: "It flags a value if its Z-score, (value − mean) ÷ standard deviation, exceeds a threshold in absolute value, commonly 2 or 3.",
            },
            {
              q: "What is Modified Z-Score (MAD)?",
              a: "It uses the median and Median Absolute Deviation instead of mean and standard deviation, making it more robust to the outliers it's detecting. A value is flagged if |0.6745 × (value − median) ÷ MAD| exceeds a threshold, commonly 3.5.",
            },
            {
              q: "How does Percentile-Based detection work?",
              a: "It flags any value falling below your chosen lower percentile (e.g., P1) or above your chosen upper percentile (e.g., P99). It's simple, distribution-free, and doesn't rely on any assumption about the shape of your data.",
            },
            {
              q: "How does Custom Threshold detection work?",
              a: "You directly specify a minimum and/or maximum acceptable value, and anything outside that range is flagged as an outlier — useful when you already know valid limits from domain knowledge (e.g., a sensor's physical operating range).",
            },
            {
              q: "Which outlier detection method should I use?",
              a: "Use IQR for skewed data, Z-Score for roughly normal data, Modified Z-Score when your data may already contain extreme values, Percentile-Based for simple tail trimming, and Custom Threshold when you know valid limits in advance.",
            },
            {
              q: "What threshold should I use?",
              a: "For IQR, 1.5 is standard and 3.0 flags only extreme outliers. For Z-Score, 2 is more sensitive and 3 is more conservative. For Modified Z-Score, 3.5 is commonly recommended.",
            },
            {
              q: "Should I always remove detected outliers?",
              a: "Not necessarily. An outlier might be an error worth removing, or a genuine important value worth investigating further.",
            },
            {
              q: "Can I upload a dataset instead of typing it?",
              a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file directly onto the input box.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "The calculator computes outlier scores in a single efficient pass and comfortably handles thousands of values with instant, debounced recalculation.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
            },
          ].map(({ q, a }, i, arr) => (
            <div key={i} className={i < arr.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
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
            { icon: "📊", title: "Data Analysts & Statisticians", desc: "Clean datasets and flag anomalies before deeper analysis." },
            { icon: "🛠️", title: "DevOps & Site Reliability Engineers", desc: "Detect performance anomalies in monitoring data." },
            { icon: "✅", title: "Quality Assurance Teams", desc: "Identify measurement outliers that may indicate defects." },
            { icon: "💰", title: "Financial Analysts", desc: "Screen transactions for unusual amounts worth reviewing." },
            { icon: "🔬", title: "Researchers", desc: "Detect and investigate anomalous experimental results." },
            { icon: "🎓", title: "Students & Educators", desc: "Learn and compare outlier detection methods hands-on." },
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
