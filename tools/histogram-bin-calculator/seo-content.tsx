export default function HistogramBinCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Histogram Bin Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>histogram bin calculator</strong> is a free browser-based tool that determines the optimal number of bins for grouping a numeric dataset into a histogram. Choosing too few bins hides structure in your data; choosing too many creates noisy, hard-to-read bars. This calculator applies standard statistical rules — <strong>Sturges', Rice, Square Root, Freedman-Diaconis, and Scott's rule</strong> — to recommend a well-balanced bin count automatically.
          </p>
          <p>
            Enter your dataset and pick a method (or set a manual bin count), and the calculator instantly computes bin width, bin ranges, counts, and percentages, visualized as an interactive bar chart.
          </p>
          <p>
            Built for <strong>students, data analysts, statisticians, researchers, and quality assurance teams</strong>, the calculator runs entirely in your browser with instant results and no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Histogram Bin Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Binning Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Sturges: k = ⌈log₂(n) + 1⌉</p>
              <p>Rice: k = ⌈2 × n^(1/3)⌉</p>
              <p>Square Root: k = ⌈√n⌉</p>
              <p>Freedman-Diaconis: width = 2 × IQR ÷ n^(1/3)</p>
              <p>Scott: width = 3.49 × σ ÷ n^(1/3)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Bin Count vs. Bin Width", "Sturges, Rice, and Square Root directly compute a bin count; Freedman-Diaconis and Scott compute a bin width, from which the bin count is derived."],
              ["Range-Based Methods", "Sturges, Rice, and Square Root only consider dataset size (n), not the spread or shape of the data."],
              ["Robust Methods", "Freedman-Diaconis (IQR-based) and Scott's Rule (standard-deviation-based) account for the actual spread of your data, making them more reliable for skewed distributions."],
              ["Equal-Width Bins", "All methods in this calculator produce equal-width bins spanning from the dataset minimum to maximum."],
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
          How to Use the Histogram Bin Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Dataset", "Type or paste numbers separated by commas, spaces, or new lines, or upload a CSV/TXT file."],
                ["Choose a Binning Method", "Select Sturges', Rice, Square Root, Freedman-Diaconis, Scott's rule, or a manual bin count."],
                ["Review Bin Count and Width", "See the calculated number of bins and bin width for your chosen method."],
                ["Explore the Chart", "View the frequency distribution as an interactive bar chart with counts and percentages."],
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
                "Five statistical binning methods plus manual override",
                "Interactive histogram bar chart with counts and labels",
                "Full bin-by-bin frequency table with percentages",
                "Drag-and-drop CSV and TXT file upload",
                "Sample datasets and a random dataset generator",
                "Copy result and full report independently",
                "Download CSV, JSON, and print-friendly report",
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
            { title: "Exam Score Distribution", scenario: "A teacher visualizes the distribution of exam scores using Sturges' Rule to see how the class performed." },
            { title: "Response Time Analysis", scenario: "A performance engineer uses Freedman-Diaconis to bin skewed latency data without over-smoothing the long tail." },
            { title: "Quality Control Charts", scenario: "A QA analyst bins measurement deviations to visualize whether a process is centered and within tolerance." },
            { title: "Survey Response Analysis", scenario: "A researcher bins age or income data from survey responses to reveal patterns before deeper analysis." },
            { title: "A/B Test Data Exploration", scenario: "A data scientist compares the binned distributions of two test groups to spot shape differences beyond just the mean." },
            { title: "Academic Statistics Coursework", scenario: "A student compares bin counts from different rules on the same dataset to understand how method choice affects a histogram's shape." },
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
                "Try more than one binning method — if they all suggest a similar bin count, you can be more confident in the result.",
                "Use Freedman-Diaconis or Scott's Rule for skewed or outlier-heavy data instead of Sturges' Rule, which assumes a roughly normal shape.",
                "Use manual bin count when you have a domain-specific reason for a particular number of categories (e.g., grade bands, price tiers).",
                "Look at the chart shape, not just the numbers — a histogram that looks too spiky or too flat is a sign to adjust the bin count.",
                "Remember that bin count recommendations are starting points, not hard rules — adjust based on what best communicates your data's story.",
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
                "Don't use Sturges' Rule on large datasets (n > ~1000) — it tends to under-bin and can hide meaningful structure.",
                "Don't use too few bins on small datasets — you'll lose the shape of the distribution entirely.",
                "Don't ignore outliers when choosing a method — Sturges' and Scott's rules can be distorted by extreme values, while Freedman-Diaconis is more robust.",
                "Don't treat the calculated bin count as final — always visually inspect the resulting histogram before drawing conclusions.",
                "Don't compare histograms with different bin widths side by side — normalize the bin width first for a fair visual comparison.",
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
          Binning Method Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Basis</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Sturges' Rule", "Sample size (log-based)", "Small, roughly normal datasets"],
                ["Rice Rule", "Sample size (cube-root-based)", "Simple alternative for larger datasets"],
                ["Square Root Rule", "Sample size (square-root-based)", "Quick default for general use"],
                ["Freedman-Diaconis Rule", "Interquartile range", "Skewed data or datasets with outliers"],
                ["Scott's Rule", "Standard deviation", "Approximately normal data"],
                ["Manual", "User-specified", "Domain-specific bin categories"],
              ].map(([method, basis, best]) => (
                <tr key={method} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{method}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{basis}</td>
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
              q: "What is a histogram bin calculator?",
              a: "A histogram bin calculator is a free browser-based tool that determines the optimal number of bins for grouping a numeric dataset into a histogram, using rules like Sturges', Rice, Square Root, Freedman-Diaconis, and Scott's rule.",
            },
            {
              q: "What is Sturges' Rule?",
              a: "Sturges' Rule calculates bin count as k = ⌈log₂(n) + 1⌉. It works well for normally distributed data of moderate size but can under-bin large or skewed datasets.",
            },
            {
              q: "What is the Freedman-Diaconis Rule?",
              a: "It calculates bin width based on the interquartile range: width = 2 × IQR ÷ n^(1/3), and is more robust to outliers and skewed data than Sturges' Rule.",
            },
            {
              q: "What is Scott's Rule?",
              a: "Scott's Rule calculates bin width using standard deviation: width = 3.49 × σ ÷ n^(1/3), optimal for approximately normal data.",
            },
            {
              q: "Which binning method should I use?",
              a: "Use Sturges' for small, roughly normal datasets, Square Root as a simple default, and Freedman-Diaconis or Scott's Rule for skewed data or data with outliers.",
            },
            {
              q: "Can I set a manual bin count instead of using a formula?",
              a: "Yes. Select Manual Bin Count and enter any number of bins you want.",
            },
            {
              q: "How is bin width calculated from bin count?",
              a: "Bin Width = (Max − Min) ÷ Number of Bins, producing equal-width bins across the data range.",
            },
            {
              q: "Can I upload a dataset instead of typing it?",
              a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file directly onto the input box.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "The calculator bins data in a single efficient pass and comfortably handles thousands of values with instant, debounced recalculation.",
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
            { icon: "📊", title: "Data Analysts & Statisticians", desc: "Choose statistically sound bin counts for distribution analysis." },
            { icon: "🎓", title: "Students & Educators", desc: "Learn and teach histogram binning rules with instant visual feedback." },
            { icon: "🔬", title: "Researchers", desc: "Visualize experimental data distributions before deeper analysis." },
            { icon: "✅", title: "Quality Assurance Teams", desc: "Bin measurement data to visualize process variation." },
            { icon: "⚡", title: "Performance Engineers", desc: "Bin latency and performance metrics to reveal distribution shape." },
            { icon: "📈", title: "Business Analysts", desc: "Explore business metric distributions for reporting and insights." },
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
