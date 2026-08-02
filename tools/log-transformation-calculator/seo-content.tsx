export default function LogTransformationCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Log Transformation Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>log transformation calculator</strong> is a free browser-based tool that applies a logarithmic transformation to a single value or an entire dataset. It answers a question that comes up constantly in statistics and machine learning: <em>how do I compress a wide-ranging, skewed dataset into a scale that's easier to analyze and visualize?</em>
          </p>
          <p>
            The calculator supports natural log (ln), log base 10, log base 2, and any custom base you specify, applied instantly to a single number or a bulk-pasted dataset. It automatically flags values that can't be transformed — zero and negative numbers, since logarithms are undefined for them — and can skip them automatically so the rest of your dataset still processes.
          </p>
          <p>
            This tool is built for <strong>students, teachers, data analysts, statisticians, researchers, machine learning engineers, data scientists, financial analysts, economists, scientists, and healthcare researchers</strong>. It accepts pasted spreadsheet data with automatic separator detection, shows before/after summary statistics, and exports to CSV, JSON, or TXT — all running entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Log Transformation Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator parses your input, validates that every value is a positive number, and applies the selected logarithmic base to each one.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Natural Log: ln(x)</p>
              <p>Base 10: log₁₀(x)</p>
              <p>Base 2: log₂(x)</p>
              <p>Custom Base: log(x) ÷ log(base)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Single or Bulk Mode", "Transform one number for a quick check, or paste an entire dataset for bulk processing with a full results table and statistics."],
              ["Automatic Separator Detection", "Commas, spaces, new lines, tabs, and semicolons are all detected automatically, so pasted spreadsheet columns work without reformatting."],
              ["Invalid Value Handling", "Zero, negative, and non-numeric entries are automatically flagged; with \"Ignore Invalid Values\" enabled, they're skipped and counted rather than blocking the whole calculation."],
              ["Before/After Statistics", "Every result includes minimum, maximum, mean, median, and standard deviation for both the original and transformed datasets, so you can see exactly how the transformation reshaped your data."],
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
          How to Use the Log Transformation Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose an Input Mode", "Select Single Value to transform one number, or Multiple Values to process an entire dataset at once."],
                ["Enter Your Data", "Type a number, or paste a dataset separated by commas, spaces, new lines, or semicolons — the parser auto-detects the format."],
                ["Select a Log Base", "Choose Natural Log (ln), Base 10, Base 2, or Custom Base with any value greater than 0 and not equal to 1."],
                ["Adjust Decimal Precision", "Choose how many decimal places to round results to, from 0 up to 6 places."],
                ["Review the Live Results", "The transformed value or full results table, plus before/after statistics, update instantly as you type."],
                ["Copy or Export", "Copy the transformed dataset, or download it as CSV, TXT, or JSON for further analysis."],
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
                "Single value and bulk dataset transformation in one tool",
                "Natural log, log10, log2, and custom base support",
                "Live calculation with a 150ms debounced update",
                "Auto-detects commas, spaces, new lines, tabs, and semicolons",
                "Automatic invalid value detection with a toggle to skip them",
                "Before vs. after summary statistics side by side",
                "Adjustable decimal precision from 0 to 6 places",
                "One-click random sample dataset generator",
                "Copy transformed dataset, export as TXT, CSV, or JSON",
                "Calculation history — save and reload past datasets",
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
            {
              title: "Reducing Skew in Income Data",
              scenario: "An economist has household income data ranging from $18,000 to $2,400,000, heavily right-skewed by a few high earners. Applying Natural Log transformation compresses the range and makes the distribution far closer to normal for regression modeling.",
            },
            {
              title: "Converting File Sizes to a Readable Scale",
              scenario: "A data engineer has file sizes of 10, 100, 1000, and 10000 megabytes and wants an intuitive orders-of-magnitude view. Using Base 10, the values transform to 1, 2, 3, and 4 — each step representing a 10x increase.",
            },
            {
              title: "Analyzing Algorithm Doubling Time",
              scenario: "A computer science student measures execution steps of 1, 2, 4, 8, 16, 32, 64 for an algorithm with doubling growth. Using Base 2, the transformed values become exactly 0, 1, 2, 3, 4, 5, 6 — directly revealing the doubling pattern as a linear sequence.",
            },
            {
              title: "Preparing Biological Measurements for Analysis",
              scenario: "A biology researcher has bacterial colony counts spanning several orders of magnitude across samples. Natural Log transformation stabilizes the variance across samples, a standard preprocessing step before running ANOVA or regression on count data.",
            },
            {
              title: "Custom-Base Transformation for a Specific Model",
              scenario: "A machine learning engineer needs a log transform in base 5 to match a specific feature engineering pipeline requirement. Using Custom Base with value 5, the calculator applies log(x) ÷ log(5) to every value in the dataset instantly.",
            },
            {
              title: "Handling Invalid Values in Real Sensor Data",
              scenario: "An engineer imports a CSV of sensor readings that includes a few zero and negative error codes mixed with valid positive measurements. With \"Ignore Invalid Values\" enabled, the calculator transforms the valid readings and reports exactly how many entries were skipped.",
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
                "Use Natural Log by default for statistical modeling — it's the standard choice in regression, ANOVA, and most econometrics work.",
                "Use Base 10 when you want results that are intuitive to read as \"orders of magnitude,\" such as comparing values that span from tens to millions.",
                "Use Base 2 for anything related to computing, doubling processes, or information theory, where each unit increase represents a doubling.",
                "If your dataset contains zeros, consider adding a small constant (like 1) to every value before transforming — a common technique called log1p — since raw zeros are always invalid for a logarithm.",
                "Check the before/after statistics after transforming — a large drop in standard deviation relative to the mean is a good sign the transformation successfully reduced skew.",
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
                "Don't try to log-transform a dataset containing zero or negative values without a plan — the calculator will flag them as invalid rather than silently producing wrong numbers.",
                "Don't confuse the custom base's change-of-base formula with a simple division — log(x) ÷ log(base) uses the natural log of both x and the base, not x divided by the base itself.",
                "Don't forget that a log transformation changes the meaning of your units — differences on the log scale represent ratios on the original scale, not absolute differences.",
                "Don't apply a log transformation just because a dataset looks skewed without checking whether it actually helps your specific analysis — some models handle skew fine without it.",
                "Don't paste header text or column labels into the dataset field — non-numeric tokens are automatically ignored, but it's worth reviewing the invalid-value count to confirm nothing meaningful was dropped.",
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

      {/* ── 6. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Worked Example Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ln(x)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">log₁₀(x)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">log₂(x)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                [1, "0.0000", "0.0000", "0.0000"],
                [10, "2.3026", "1.0000", "3.3219"],
                [100, "4.6052", "2.0000", "6.6439"],
                [1000, "6.9078", "3.0000", "9.9658"],
              ].map(([x, ln, log10, log2]) => (
                <tr key={x as number} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{x}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{ln}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{log10}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{log2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a log transformation calculator?",
              a: "A log transformation calculator is a free browser-based tool that applies a logarithmic transformation — natural log, log10, log2, or a custom base — to a single value or an entire dataset, commonly used to reduce skew and compress large ranges in statistical and machine learning workflows.",
            },
            {
              q: "How is a log transformation calculated?",
              a: "Each value x is replaced with the logarithm of x in the chosen base: ln(x) for natural log, log₁₀(x) for base 10, log₂(x) for base 2, or log(x) ÷ log(base) for any custom base using the change-of-base formula.",
            },
            {
              q: "Why can't zero or negative numbers be log-transformed?",
              a: "Logarithms are only defined for positive real numbers — there's no real exponent you can raise a positive base to that produces zero or a negative result. The calculator flags these values as invalid rather than producing an incorrect output.",
            },
            {
              q: "What is the difference between ln, log10, and log2?",
              a: "They differ only in the base: ln uses base e (≈2.71828) and is standard in statistics and calculus, log10 uses base 10 and is intuitive for magnitude comparisons, and log2 uses base 2 and is common in computing and information theory.",
            },
            {
              q: "How do I transform a whole dataset instead of one value?",
              a: "Switch to Multiple Values mode and paste your data separated by commas, spaces, new lines, or a mix — the calculator processes every value, shows a results table, and displays before/after summary statistics.",
            },
            {
              q: "What does the custom base option do?",
              a: "It applies the change-of-base formula log(x) ÷ log(base) to compute a logarithm in any base you specify, as long as the base is greater than 0 and not equal to 1.",
            },
            {
              q: "What happens to invalid values in bulk mode?",
              a: "With \"Ignore Invalid Values\" enabled, zero, negative, and non-numeric entries are automatically skipped, and the calculator reports how many were excluded. With it disabled, the calculator shows an error instead of a partial result.",
            },
            {
              q: "Why does log transformation help with skewed data?",
              a: "Logarithms compress large values proportionally more than small ones, pulling in extreme high values and spreading out clustered low values — this often makes a right-skewed distribution look much closer to a normal distribution.",
            },
            {
              q: "Can I export the transformed dataset?",
              a: "Yes. Use Copy to copy the transformed values to your clipboard, or download the full original-vs-transformed comparison as a CSV, TXT, or JSON file.",
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

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach logarithm mechanics and transformation effects with live examples." },
            { icon: "📊", title: "Data Analysts & Scientists", desc: "Preprocess skewed features before regression, clustering, or visualization." },
            { icon: "🔬", title: "Researchers & Scientists", desc: "Stabilize variance in measurements spanning several orders of magnitude." },
            { icon: "💰", title: "Financial Analysts & Economists", desc: "Compress income, price, and growth data for cleaner statistical modeling." },
            { icon: "🤖", title: "Machine Learning Engineers", desc: "Apply consistent log-scale feature engineering across training datasets." },
            { icon: "🏥", title: "Healthcare Researchers", desc: "Transform biological measurements and counts before running clinical analyses." },
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
