export default function DataNormalizationCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Data Normalization Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>data normalization calculator</strong> is a free browser-based tool that rescales numeric datasets onto a comparable scale using standard normalization techniques. It answers a question every data analyst and machine learning practitioner runs into: <em>how do I make features measured on wildly different scales comparable, without distorting the underlying patterns?</em>
          </p>
          <p>
            Choosing the right normalization method — and computing it correctly across an entire dataset — is easy to get wrong by hand. This calculator supports six standard techniques: Min-Max (0–1 or a custom range), Z-Score standardization, Decimal Scaling, Unit Vector (L2) normalization, Mean Normalization, and Robust Scaling using the median and interquartile range.
          </p>
          <p>
            This tool is built for <strong>data analysts, data scientists, machine learning engineers, students, teachers, researchers, statisticians, financial analysts, and business intelligence professionals</strong>. It accepts pasted or typed data with automatic separator detection, shows a live before/after comparison, and exports to CSV, JSON, or TXT — all running entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Data Normalization Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator parses your dataset, computes the statistics each method requires — minimum, maximum, mean, standard deviation, median, or interquartile range — and applies the selected transformation to every value.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Min-Max: normalized = (x − min) ÷ (max − min)</p>
              <p>Min-Max (Custom): normalized = newMin + ((x − min) × (newMax − newMin)) ÷ (max − min)</p>
              <p>Z-Score: z = (x − mean) ÷ standardDeviation</p>
              <p>Mean Normalization: (x − mean) ÷ (max − min)</p>
              <p>Decimal Scaling: x ÷ 10ʲ</p>
              <p>Unit Vector: x ÷ √(Σx²)</p>
              <p>Robust Scaling: (x − median) ÷ IQR</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Automatic Separator Detection", "The parser detects commas, spaces, new lines, tabs, and semicolons automatically, so pasted spreadsheet columns and typed lists both work without configuration."],
              ["Before/After Comparison", "Every result includes summary statistics for both the original and normalized datasets side by side, so you can immediately see the effect of the transformation."],
              ["Method-Specific Validation", "Each technique is checked for the conditions it needs — a non-zero range for Min-Max, non-zero standard deviation for Z-Score, non-zero IQR for Robust Scaling — with a clear error if the data can't support it."],
              ["Adjustable Precision", "Decimal precision can be set from 0 to 10 places, useful for both quick visual checks and high-precision machine learning pipelines."],
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
          How to Use the Data Normalization Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Dataset", "Type or paste numbers separated by commas, spaces, new lines, or semicolons — the calculator detects the separator automatically and ignores blank lines."],
                ["Choose a Normalization Method", "Select from Min-Max, Min-Max Custom Range, Z-Score, Decimal Scaling, Unit Vector, Mean Normalization, or Robust Scaling based on your use case."],
                ["Set a Custom Range if Needed", "If using Min-Max Custom Range, enter your target minimum and maximum instead of the default 0 to 1."],
                ["Adjust Decimal Precision", "Choose how many decimal places to round results to, from 0 up to 10 places."],
                ["Review the Comparison", "The results table, chart, and before/after statistics panel update instantly as you type or change methods."],
                ["Copy or Export", "Copy the normalized dataset, download it as CSV, TXT, or JSON, or download the comparison chart as a PNG image."],
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
                "Six normalization methods in one tool",
                "Live calculation with a 150ms debounced update",
                "Auto-detects commas, spaces, new lines, tabs, and semicolons",
                "Custom target range for Min-Max normalization",
                "Before vs. after summary statistics side by side",
                "Interactive comparison chart with PNG export",
                "Adjustable decimal precision from 0 to 10 places",
                "One-click random sample dataset generator",
                "Copy normalized dataset, export as TXT, CSV, or JSON",
                "Calculation history — save and reload past datasets",
                "Auto-saves your last session and restores it on return",
                "Clear validation for zero-range and zero-variance edge cases",
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
              title: "Preparing Features for a Machine Learning Model",
              scenario: "A data scientist has a feature ranging from 10 to 50,000 alongside another ranging from 0 to 1. Using Min-Max (0–1) on both features, the calculator rescales them onto the same range so a gradient-descent-based model doesn't overweight the larger-scale feature.",
            },
            {
              title: "Standardizing Exam Scores Across Classes",
              scenario: "A teacher has exam scores from two classes with different means and spreads: 150, 160, 170, 180, 190. Using Z-Score Standardization, each score becomes a standardized value with mean 0 and standard deviation 1, making cross-class comparison fair.",
            },
            {
              title: "Scaling Financial Ratios with Outliers",
              scenario: "A financial analyst has a dataset of company revenue ratios where a handful of high-growth outliers would distort a standard Z-score. Using Robust Scaling, which centers on the median and scales by IQR, the outliers no longer dominate the transformation.",
            },
            {
              title: "Normalizing Sensor Readings for a Custom Range",
              scenario: "An engineer needs sensor readings from -1 to 1 instead of 0 to 1 for a specific control algorithm. Using Min-Max (Custom Range) with newMin = -1 and newMax = 1, the calculator rescales the raw readings directly into that target range.",
            },
            {
              title: "Preparing Text Feature Vectors for Cosine Similarity",
              scenario: "A machine learning engineer has document term-frequency vectors and needs each vector's magnitude to be exactly 1 before computing cosine similarity. Unit Vector (L2) normalization divides each value by the vector's Euclidean magnitude to achieve this.",
            },
            {
              title: "Quick Decimal Scaling for Manual Review",
              scenario: "A business analyst has values like 10, 100, and 1000 and wants a simple, easy-to-read rescale for a slide deck. Decimal Scaling divides every value by 1,000 (10³), producing 0.01, 0.1, and 1 — a transformation that preserves relative proportions while shrinking magnitude.",
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
                "Use Min-Max when you need values bounded to a fixed range for algorithms like neural networks with sigmoid activations, which expect inputs in a known range.",
                "Use Z-Score standardization for algorithms that assume roughly normally distributed input, like linear regression or PCA — it centers data at 0 without forcing a fixed range.",
                "Use Robust Scaling whenever your dataset has outliers you want to keep rather than remove, since the median and IQR aren't distorted by extreme values the way the mean and standard deviation are.",
                "Always normalize your training and evaluation data using statistics computed from the training set only, to avoid data leakage — this calculator computes statistics fresh from whatever dataset you paste in.",
                "Check the before/after statistics panel after normalizing — if the normalized standard deviation isn't close to 1 after Z-Score standardization, double-check your input for typos or extreme outliers.",
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
                "Don't apply Min-Max normalization to a dataset where all values are identical — the range is zero and the calculator will correctly flag this as undefined.",
                "Don't confuse Mean Normalization with Z-Score standardization — Mean Normalization divides by the range (max − min), while Z-Score divides by the standard deviation, producing different scales.",
                "Don't use Z-Score standardization on heavily skewed data with extreme outliers without checking the result first — outliers can dominate the standard deviation and compress the rest of your data into a narrow band.",
                "Don't forget that Decimal Scaling and Unit Vector normalization don't bound values to a fixed range like [0, 1] — they preserve relative magnitude differently than Min-Max.",
                "Don't paste header text or column labels into the dataset field — non-numeric tokens are automatically ignored, but it's worth checking the invalid-value warning to be sure nothing meaningful was dropped.",
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
          Normalization Method Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Output Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Min-Max (0–1)", "(x − min) ÷ (max − min)", "[0, 1]"],
                ["Min-Max (Custom)", "newMin + ((x − min)(newMax − newMin)) ÷ (max − min)", "[newMin, newMax]"],
                ["Z-Score", "(x − mean) ÷ stdDev", "Mean 0, SD 1"],
                ["Decimal Scaling", "x ÷ 10ʲ", "(-1, 1)"],
                ["Unit Vector (L2)", "x ÷ √(Σx²)", "Magnitude 1"],
                ["Mean Normalization", "(x − mean) ÷ (max − min)", "Centered, ≈[-1, 1]"],
                ["Robust Scaling", "(x − median) ÷ IQR", "Median 0, outlier-resistant"],
              ].map(([name, formula, range]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{name}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{formula}</td>
                  <td className="py-2.5 px-4 font-mono text-green-600">{range}</td>
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
              q: "What is a data normalization calculator?",
              a: "A data normalization calculator is a free browser-based tool that rescales numeric datasets onto a comparable scale using standard techniques such as Min-Max, Z-Score, and Robust Scaling, commonly used for machine learning preprocessing and statistical comparison.",
            },
            {
              q: "How is Min-Max normalization calculated?",
              a: "Min-Max normalization subtracts the dataset's minimum value from each value, then divides by the range (maximum minus minimum), producing values between 0 and 1 by default, or between a custom minimum and maximum if you specify one.",
            },
            {
              q: "What is a good normalization method to use?",
              a: "It depends on your data and algorithm: use Min-Max for a fixed bounded range, Z-Score for roughly normal data and algorithms assuming standardized input, and Robust Scaling when your data contains significant outliers.",
            },
            {
              q: "What is the difference between normalization and standardization?",
              a: "Normalization typically refers to rescaling values into a fixed range like [0, 1] (Min-Max), while standardization refers to centering data around a mean of 0 with a standard deviation of 1 (Z-Score) — both are supported by this calculator.",
            },
            {
              q: "How do I normalize my dataset using this tool?",
              a: "Paste or type your numbers into the dataset field, select a normalization method from the dropdown, and the results table, chart, and statistics update instantly — no calculate button required.",
            },
            {
              q: "What happens if my dataset has all identical values?",
              a: "Min-Max, Mean Normalization, and Robust Scaling all require a non-zero range or spread to compute — the calculator detects this and shows a clear error message explaining why normalization can't proceed for that method.",
            },
            {
              q: "How does Decimal Scaling choose the scaling factor?",
              a: "It finds the smallest power of 10 (10ʲ) large enough that every value's absolute magnitude divided by that factor is less than 1. For a maximum absolute value of 917, j = 3, so every value is divided by 1,000.",
            },
            {
              q: "Can outliers affect my normalized results?",
              a: "Yes — Min-Max, Z-Score, Mean Normalization, and Decimal Scaling are all sensitive to outliers since they use the minimum, maximum, mean, or standard deviation directly. Robust Scaling is specifically designed to resist this by using the median and interquartile range instead.",
            },
            {
              q: "Can I paste data directly from a spreadsheet?",
              a: "Yes. The calculator automatically detects commas, tabs, spaces, semicolons, and new lines as separators, so pasting a column directly from Excel or Google Sheets works without any reformatting.",
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
            { icon: "🤖", title: "Data Scientists & ML Engineers", desc: "Preprocess feature sets before training regression, clustering, and neural network models." },
            { icon: "📊", title: "Data Analysts", desc: "Rescale metrics measured on different units for fair side-by-side comparison." },
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach the mechanics of common normalization and standardization formulas." },
            { icon: "🔬", title: "Researchers & Statisticians", desc: "Prepare experimental measurements for statistical models sensitive to feature scale." },
            { icon: "💰", title: "Financial Analysts", desc: "Compare ratios and metrics across companies of very different sizes without scale bias." },
            { icon: "💼", title: "Business Intelligence Professionals", desc: "Normalize KPIs from different sources before building composite scores or dashboards." },
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
