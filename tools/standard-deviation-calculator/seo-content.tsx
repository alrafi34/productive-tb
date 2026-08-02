export default function StandardDeviationCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Standard Deviation Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>standard deviation calculator</strong> is a free browser-based tool that measures how spread out a dataset is from its average. A low standard deviation means values cluster tightly around the mean; a high standard deviation means they&apos;re spread widely — one of the most fundamental measures in statistics for understanding data variability.
          </p>
          <p>
            This calculator computes both <strong>population standard deviation (σ)</strong> and <strong>sample standard deviation (s)</strong>, alongside a full suite of related statistics — mean, median, mode, variance, quartiles, interquartile range, coefficient of variation, and standard error — plus an interactive histogram and box plot visualization.
          </p>
          <p>
            Built for <strong>students, teachers, statisticians, researchers, data analysts, business professionals, engineers, scientists, and quality assurance teams</strong>, the tool accepts manual entry, pasted spreadsheet data, or uploaded CSV files, and runs entirely in your browser — no signup, no server, and no data ever leaving your device.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Standard Deviation Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator parses your dataset, computes the mean, then measures how far each value deviates from that mean.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Mean: μ = (Σx) ÷ N</p>
              <p>Population Variance: σ² = Σ(x − μ)² ÷ N</p>
              <p>Population Standard Deviation: σ = √σ²</p>
              <p>Sample Variance: s² = Σ(x − x̄)² ÷ (n − 1)</p>
              <p>Sample Standard Deviation: s = √s²</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Population vs. Sample", "Population divides by N (the full dataset); Sample divides by N − 1, correcting for the extra uncertainty when your data is only a subset of a larger group."],
              ["Quartiles & IQR", "Q1 and Q3 split the sorted dataset into quarters; the interquartile range (Q3 − Q1) measures the spread of the middle 50%, resistant to outliers."],
              ["Coefficient of Variation", "Standard deviation expressed as a percentage of the mean, useful for comparing variability across datasets with different scales."],
              ["Standard Error", "Standard deviation divided by the square root of the sample size, estimating how precisely the sample mean represents the true population mean."],
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
          How to Use the Standard Deviation Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Dataset", "Type or paste numbers separated by commas, spaces, or new lines, or upload a CSV or TXT file."],
                ["Choose Population or Sample", "Select the calculation type that matches whether your data is a full population or a sample."],
                ["Adjust Decimal Precision", "Choose how many decimal places to round results to, from 0 up to 10 places."],
                ["Read the Live Statistics", "The standard deviation, variance, mean, median, mode, and quartiles update instantly."],
                ["Visualize and Export", "Switch between histogram and box plot views, download as PNG, and export your report."],
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
                "Population and sample standard deviation calculated together",
                "Live calculation with a 150ms debounced update",
                "Auto-detects commas, spaces, new lines, tabs, and semicolons",
                "Drag-and-drop CSV and TXT file upload",
                "Mean, median, mode, variance, min, max, and range",
                "Quartiles, interquartile range, coefficient of variation, and standard error",
                "Interactive histogram with mean, median, and ±1 SD band",
                "Interactive box plot with five-number summary",
                "Download charts as PNG",
                "Adjustable decimal precision from 0 to 10 places",
                "One-click random sample dataset generator",
                "Copy full report, export as TXT, CSV, or JSON",
                "Calculation history — save and reload past datasets",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcuts — Esc to clear, Ctrl+L for a new example",
                "Invalid value detection with a clear inline warning",
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
              title: "Analyzing Exam Score Variability",
              scenario: "A teacher enters a class's exam scores and uses the sample standard deviation to understand whether performance was tightly clustered or widely spread, informing how to adjust the next lesson plan.",
            },
            {
              title: "Quality Control Measurement Analysis",
              scenario: "A quality assurance engineer measures a batch of manufactured parts and uses the standard deviation and box plot to check whether variation stays within acceptable tolerance bands.",
            },
            {
              title: "Investment Volatility Comparison",
              scenario: "A financial analyst calculates the coefficient of variation for two investments with very different price scales, using it to fairly compare relative risk between them.",
            },
            {
              title: "Survey Response Consistency",
              scenario: "A researcher uploads a CSV of Likert-scale survey responses and reviews the histogram to visually confirm the data's distribution before running further statistical tests.",
            },
            {
              title: "Clinical Trial Data Review",
              scenario: "A healthcare researcher enters patient measurement data and reports both the mean and standard deviation, along with the standard error, to characterize the precision of the trial's results.",
            },
            {
              title: "Business Performance Benchmarking",
              scenario: "A business analyst compares standard deviation across monthly sales figures from different regions to identify which region has the most volatile, unpredictable performance.",
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
                "Use Sample standard deviation by default unless you're certain your dataset represents an entire population — it's the more common and conservative choice.",
                "Check the histogram's ±1 SD band to quickly see what portion of your data falls within one standard deviation of the mean.",
                "Use the coefficient of variation when comparing the spread of two datasets measured in different units or on very different scales.",
                "Pair standard deviation with the interquartile range for a fuller picture — IQR is more resistant to outliers than SD alone.",
                "Increase decimal precision for scientific or engineering work where small differences in variance matter.",
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
                "Don't use population standard deviation on sample data — it slightly underestimates the true variability of the larger population you're trying to describe.",
                "Don't confuse variance with standard deviation — variance is in squared units and much harder to interpret directly; standard deviation returns to the original units.",
                "Don't rely on standard deviation alone for skewed data — pair it with the median and IQR, since SD is sensitive to outliers and assumes a roughly symmetric distribution.",
                "Don't forget that a dataset with only one value has no meaningful sample standard deviation, since dividing by N − 1 = 0 is undefined.",
                "Don't paste header text or labels into the dataset field — non-numeric tokens are ignored automatically, but it's worth checking the invalid-values warning.",
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
          Worked Example Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Statistic</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Dataset: 10, 20, 30, 40, 50</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Mean", "30"],
                ["Sample Variance", "250"],
                ["Sample Standard Deviation", "15.81"],
                ["Population Variance", "200"],
                ["Population Standard Deviation", "14.14"],
                ["Q1 / Q3", "15 / 45"],
                ["Interquartile Range", "30"],
              ].map(([stat, value]) => (
                <tr key={stat} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{stat}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{value}</td>
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
              q: "What is a standard deviation calculator?",
              a: "A standard deviation calculator is a free browser-based tool that measures how spread out a dataset is from its average, computing both population and sample standard deviation along with related statistics.",
            },
            {
              q: "What is the difference between population and sample standard deviation?",
              a: "Population standard deviation divides by N (the full count); sample standard deviation divides by N − 1, correcting for the extra uncertainty when data represents a subset of a larger population.",
            },
            {
              q: "How is standard deviation calculated?",
              a: "Calculate the mean, find the squared difference between each value and the mean, sum those, divide by N or N − 1, and take the square root.",
            },
            {
              q: "What do Q1, Q3, and IQR mean?",
              a: "Q1 is the median of the lower half of the sorted dataset, Q3 is the median of the upper half, and the IQR (Q3 − Q1) measures the spread of the middle 50% of the data.",
            },
            {
              q: "What is the coefficient of variation?",
              a: "The coefficient of variation expresses standard deviation as a percentage of the mean, useful for comparing variability between datasets with different scales.",
            },
            {
              q: "What does the histogram show?",
              a: "The histogram groups your dataset into bins showing value frequency, with lines marking the mean and median and a shaded ±1 standard deviation band.",
            },
            {
              q: "What does the box plot show?",
              a: "The box plot displays the five-number summary — minimum, Q1, median, Q3, and maximum — with a marker showing where the mean falls.",
            },
            {
              q: "Can I upload a dataset instead of typing it?",
              a: "Yes. Use the Import CSV button or drag and drop a CSV or TXT file directly onto the input box.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "The calculator uses O(n) statistical calculations and comfortably processes thousands of values with instant, debounced recalculation.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server or stored in any database.",
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
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach standard deviation with live formulas and interactive visualizations." },
            { icon: "📊", title: "Statisticians & Data Analysts", desc: "Quickly compute a full statistical summary without opening a spreadsheet or stats package." },
            { icon: "🔬", title: "Researchers & Scientists", desc: "Analyze experimental measurements with quartiles, standard error, and distribution charts." },
            { icon: "💼", title: "Business Professionals", desc: "Measure performance variability and benchmark consistency across teams or regions." },
            { icon: "💰", title: "Financial Analysts", desc: "Compare investment volatility using coefficient of variation across different scales." },
            { icon: "🏭", title: "Quality Assurance Teams", desc: "Check manufacturing tolerance bands using standard deviation and box plot analysis." },
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
