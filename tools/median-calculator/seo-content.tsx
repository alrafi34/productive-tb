export default function MedianCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Median Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>median calculator</strong> is a free browser-based tool that instantly finds the middle value of a numerical dataset — the point where half the values fall above and half fall below. Unlike the mean, the median isn&apos;t skewed by extreme outliers, which makes it one of the most useful statistics for understanding a dataset&apos;s true center.
          </p>
          <p>
            This tool accepts manually typed numbers, pasted spreadsheet data, or uploaded CSV and TXT files. It automatically detects separators — commas, spaces, new lines, tabs, or semicolons — sorts your dataset, and shows exactly how the median was derived with a full step-by-step explanation.
          </p>
          <p>
            Built for <strong>students, teachers, data analysts, researchers, business professionals, financial analysts, scientists, and engineers</strong>, the calculator runs entirely in your browser with instant results, no signup, and support for datasets ranging from a handful of numbers to thousands of values.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Median Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator sorts your dataset in ascending order, then applies one of two formulas depending on whether the dataset has an odd or even number of values.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Odd Count → Median = Middle Value</p>
              <p>Even Count → Median = (Middle 1 + Middle 2) / 2</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Sorting", "All values are sorted numerically (not alphabetically) before the middle position is located."],
              ["Odd Datasets", "The single value at the exact center of the sorted list is the median — for example, 30 in the set 10, 20, 30, 40, 50."],
              ["Even Datasets", "The two values closest to the center are averaged — for example, (9 + 15) / 2 = 12 in the set 3, 9, 15, 28."],
              ["Invalid Value Handling", "Non-numeric entries are automatically filtered out and listed separately, so a stray letter or symbol never breaks the calculation."],
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
          How to Use the Median Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Dataset", "Type or paste numbers separated by commas, spaces, or new lines, or upload a CSV or TXT file."],
                ["Adjust Decimal Precision", "Choose how many decimal places to round the result to, from 0 up to 6 places."],
                ["Read the Live Median", "The median, sorted dataset, and key statistics update instantly as you type."],
                ["Review the Explanation", "Check the step-by-step breakdown showing the sorted dataset, middle position, and formula used."],
                ["Copy or Export", "Copy the median or sorted dataset, or download a full report as TXT or CSV."],
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
                "Auto-detects commas, spaces, new lines, tabs, and semicolons",
                "Drag-and-drop CSV and TXT file upload",
                "Automatic dataset sorting shown in the results",
                "Step-by-step formula and calculation breakdown",
                "Odd vs. even dataset detection with the correct formula applied",
                "Invalid value detection with a clear inline warning",
                "Statistics panel — count, minimum, maximum, and mean",
                "Adjustable decimal precision from 0 to 6 places",
                "One-click random sample dataset generator",
                "Copy result and copy sorted dataset independently",
                "Download report as TXT or CSV with full calculation steps",
                "Calculation history — save and reload past results",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcut — Esc to clear",
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
              title: "Analyzing Home Prices in a Neighborhood",
              scenario: "A real estate analyst enters a list of recent sale prices and uses the median instead of the average, since one unusually expensive mansion would otherwise skew a simple mean upward.",
            },
            {
              title: "Grading a Class of Exam Scores",
              scenario: "A teacher pastes 30 exam scores and instantly sees the median score, giving a clearer picture of \"typical\" performance than the mean when a few students scored exceptionally low or high.",
            },
            {
              title: "Summarizing Survey Response Times",
              scenario: "A researcher uploads a CSV of response times in seconds and uses the median to report a more representative \"typical\" response time, since a handful of very slow responses would distort the average.",
            },
            {
              title: "Financial Analysis of Transaction Amounts",
              scenario: "A financial analyst pastes a column of transaction values copied from a spreadsheet and finds the median transaction size to better understand typical customer spend.",
            },
            {
              title: "Quality Control Measurements",
              scenario: "An engineer enters a batch of measured part dimensions and checks the median against a tolerance specification, using it alongside the mean to catch skewed manufacturing defects.",
            },
            {
              title: "Teaching Statistics Fundamentals",
              scenario: "A student uses the step-by-step explanation panel to understand exactly how the median differs between odd and even datasets before an exam.",
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
                "Use the median instead of the mean whenever your dataset likely contains outliers, such as income, home prices, or response times.",
                "Paste data directly from a spreadsheet column — the calculator automatically detects new-line separators without any reformatting needed.",
                "Check the invalid values warning after uploading a file — it's a quick way to catch a header row or stray text that shouldn't be included.",
                "Increase decimal precision when your dataset produces a fractional median from averaging two middle values, to avoid misleading rounding.",
                "Save frequently-used datasets to history so you can quickly reload and compare median values across different data pulls.",
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
                "Don't confuse the median with the mode — the median is the middle value when sorted, while the mode is the most frequently occurring value.",
                "Don't forget that the median ignores the actual magnitude of extreme values — two datasets with very different spreads can share the same median.",
                "Don't sort your data manually before pasting it — the calculator sorts automatically, and manual pre-sorting can introduce copy errors.",
                "Don't assume a CSV header row will be excluded automatically if it contains a number — only genuinely non-numeric text is filtered out.",
                "Don't rely on the median alone for skewed decision-making — pairing it with the mean and range gives a fuller picture of your data's shape.",
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
          Worked Examples Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Dataset</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sorted</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Median</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10, 20, 30, 40, 50", "10, 20, 30, 40, 50", "30 (odd — middle value)"],
                ["15, 3, 28, 9", "3, 9, 15, 28", "12 — (9 + 15) / 2"],
                ["90, 72, 81, 77, 85, 91", "72, 77, 81, 85, 90, 91", "83 — (81 + 85) / 2"],
              ].map(([dataset, sorted, median]) => (
                <tr key={dataset} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700 text-xs">{dataset}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{sorted}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{median}</td>
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
              q: "What is a median calculator?",
              a: "A median calculator is a free browser-based tool that instantly finds the middle value of a numerical dataset, sorting your data automatically and applying the correct formula for odd or even counts.",
            },
            {
              q: "How is the median calculated?",
              a: "Sort the dataset ascending. If the count is odd, the median is the single middle value. If even, it's the average of the two middle values. For example, the median of 10, 20, 30, 40, 50 is 30.",
            },
            {
              q: "What is the difference between median and mean?",
              a: "The mean is the sum of values divided by count, while the median is the middle value when sorted. The median is less affected by extreme outliers.",
            },
            {
              q: "What separators does the calculator support?",
              a: "Commas, spaces, new lines, tabs, or semicolons — including mixed combinations — are all automatically detected and parsed correctly.",
            },
            {
              q: "Can I upload a CSV or TXT file instead of typing numbers?",
              a: "Yes. Use the Upload button or drag and drop a file directly onto the input box. Valid numeric values are extracted automatically.",
            },
            {
              q: "What happens if my dataset contains invalid values?",
              a: "Non-numeric entries are automatically ignored during calculation and listed in a warning message, so the calculation doesn't fail.",
            },
            {
              q: "Does the calculator support negative numbers and decimals?",
              a: "Yes. Integers, decimals, and negative numbers are all fully supported and sorted correctly.",
            },
            {
              q: "How large a dataset can I calculate the median for?",
              a: "The calculator is optimized to handle large datasets efficiently, comfortably processing thousands of values instantly.",
            },
            {
              q: "Can I change how many decimal places the result shows?",
              a: "Yes. Use the Precision selector to choose between 0 and 6 decimal places.",
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
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach the median formula with a clear, step-by-step visual breakdown." },
            { icon: "📊", title: "Data Analysts & Researchers", desc: "Quickly find the median of survey data, measurements, or exported datasets." },
            { icon: "💼", title: "Business Professionals", desc: "Summarize typical values in sales, pricing, or performance data without spreadsheet formulas." },
            { icon: "💰", title: "Financial Analysts", desc: "Analyze transaction amounts and pricing data resistant to outlier distortion." },
            { icon: "🔬", title: "Scientists & Engineers", desc: "Process experimental measurements and quality control data with instant statistics." },
            { icon: "📈", title: "Anyone Working with Data", desc: "Get a fast, accurate median for any numerical list without opening a spreadsheet." },
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
