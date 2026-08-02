export default function MeanCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Mean Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>mean calculator</strong> is a free browser-based tool that computes the arithmetic mean (average) of any set of numbers instantly. Type or paste numbers separated by commas, spaces, or new lines — or upload a CSV or TXT file — and the calculator automatically detects your separators, parses the values, and returns the mean along with a full statistical summary.
          </p>
          <p>
            Beyond the mean itself, this calculator also returns count, sum, minimum, maximum, and range — the essential descriptive statistics most people reach for alongside an average. It handles very large datasets efficiently, supports decimals and negative numbers, and never sends your data anywhere.
          </p>
          <p>
            This tool is built for <strong>students, teachers, data analysts, researchers, engineers, financial analysts, business professionals, scientists, accountants, and anyone working with numerical data</strong>. It supports file upload with drag-and-drop, calculation history, adjustable decimal precision, and export as CSV, TXT, or JSON — entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Mean Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Paste or type your numbers into the textarea in any format — comma-separated, space-separated, one per line, or a mix of all three. The calculator normalizes your input, splits it into individual values, discards anything that isn't a valid number, and computes the mean along with the rest of the statistical summary in real time.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Mean = (Sum of All Numbers) ÷ (Total Count)</p>
              <p>Mean = Σx ÷ n</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Automatic Separator Detection", "Commas, spaces, new lines, tabs, and mixed combinations are all normalized automatically — no manual configuration needed."],
              ["Invalid Value Handling", "Non-numeric tokens are automatically ignored, and the calculator tells you how many were skipped rather than silently including them or failing the calculation."],
              ["File Upload & Drag-and-Drop", "Upload a .csv or .txt file, or drag one directly onto the input box, to instantly load a dataset without manual copy-pasting."],
              ["Decimal Precision", "Choose from 0 to 10 decimal places to control how precisely the mean and other statistics are displayed."],
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
          How to Use the Mean Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Numbers", "Type or paste numbers into the textarea using commas, spaces, new lines, or a mix — or click a sample dataset to try it instantly."],
                ["Or Upload a File", "Click Upload CSV/TXT, or drag and drop a file directly onto the input box, to load a dataset automatically."],
                ["Adjust Decimal Precision", "Choose how many decimal places to display, from 0 to 10."],
                ["Review the Results", "Check the Mean, Count, Sum, Minimum, Maximum, and Range — all updating instantly with a 150ms debounce as you type."],
                ["Use Keyboard Shortcuts", "Press Ctrl+Enter to recalculate immediately or Ctrl+L to clear the input."],
                ["Copy, Export, or Share", "Copy the full report, download it as CSV, TXT, or JSON, print it, or copy a shareable URL with your dataset encoded."],
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
                "Automatic separator detection (comma, space, new line, tab, mixed)",
                "Handles integers, decimals, and negative numbers",
                "CSV and TXT file upload with drag-and-drop support",
                "Instant calculation with a 150ms debounce, even on large datasets",
                "Full statistical summary: Count, Sum, Mean, Minimum, Maximum, Range",
                "Invalid value detection with a count of ignored entries",
                "Adjustable decimal precision (0–10 places)",
                "Keyboard shortcuts (Ctrl+Enter to calculate, Ctrl+L to clear)",
                "Random dataset generator for quick testing",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, TXT, or JSON",
                "Print-ready formatted report",
                "Copy full report to clipboard in one click",
                "Calculation history — save and reload up to 20 past datasets",
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
              title: "Classroom Grade Average",
              scenario: "A teacher pastes a comma-separated list of test scores — 10, 20, 30, 40, 50 — and instantly sees a mean of 30, along with the minimum and maximum score, without opening a spreadsheet.",
            },
            {
              title: "Line-Separated Lab Measurements",
              scenario: "A researcher pastes four measurements, one per line — 4, 8, 12, 16 — and the calculator automatically detects the new-line separators and returns a mean of 10.",
            },
            {
              title: "Decimal Dataset from a Sensor Log",
              scenario: "An engineer enters four decimal sensor readings — 2.5, 3.75, 4.5, 5.25 — and gets an exact mean of 4, along with the full range of readings for a quick sanity check.",
            },
            {
              title: "Uploading a CSV Export",
              scenario: "A financial analyst exports a column of transaction amounts to a CSV file and drags it directly onto the calculator, instantly getting the average transaction value without manually copying hundreds of rows.",
            },
            {
              title: "Large Dataset Performance Check",
              scenario: "A data analyst pastes a dataset of over 50,000 values. The calculator displays a \"Large dataset detected\" notice and still returns the mean instantly, without freezing the browser.",
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
                "Check the invalid values count after pasting data from a spreadsheet — stray headers, units, or currency symbols in copied cells are common causes of unexpectedly excluded values.",
                "Use the Range alongside the Mean to spot outliers — a large range relative to the mean often signals the dataset has extreme values worth investigating separately.",
                "For very large datasets, use the CSV/TXT upload instead of pasting directly — it avoids potential clipboard size limits in some browsers.",
                "Increase decimal precision when working with small measurement differences, and reduce it back to 2 for reporting to stakeholders who don't need excessive precision.",
                "Save meaningful calculations to History before clearing the input, so you can reload and compare datasets later without re-entering them.",
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
                "Don't assume the mean represents a \"typical\" value when your dataset has outliers — the median is often more representative for skewed data.",
                "Don't ignore the invalid values warning — silently dropped values change your result, and it's worth checking what was excluded and why.",
                "Don't confuse mean with median or mode — they answer different questions about a dataset and can differ significantly for the same data.",
                "Don't paste data with thousands separators (like 1,000) expecting them to be treated as a single number — commas are treated as value separators in this calculator, so use plain digits without separators.",
                "Don't rely on a mean alone to describe variability — always look at the range or, for a deeper view, use a standard deviation calculator alongside it.",
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

      {/* ── Formula Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Formula Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Statistic</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Mean", "Σx ÷ n", "(10+20+30+40+50) ÷ 5 = 30"],
                ["Sum", "Σx", "10+20+30+40+50 = 150"],
                ["Range", "Max − Min", "50 − 10 = 40"],
              ].map(([name, formula, example]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary uppercase text-xs tracking-wide">{name}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{formula}</td>
                  <td className="py-2.5 px-4 font-mono text-green-700">{example}</td>
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
              q: "What is the arithmetic mean?",
              a: "The arithmetic mean, commonly called the average, is the sum of all values in a dataset divided by the number of values: Mean = Σx ÷ n.",
            },
            {
              q: "How do I calculate the mean of a dataset?",
              a: "Add up all the numbers in your dataset, then divide by how many numbers there are. For example, the mean of 10, 20, 30, 40, 50 is (10+20+30+40+50) ÷ 5 = 30.",
            },
            {
              q: "What separators does this calculator support?",
              a: "Commas, spaces, new lines, tabs, and any mixed combination of these are all automatically detected and normalized — you don't need to choose a separator format manually.",
            },
            {
              q: "What happens to invalid or non-numeric values?",
              a: "Non-numeric tokens are automatically ignored and excluded from the calculation. The calculator displays a warning showing how many values were skipped so you're aware of what was excluded.",
            },
            {
              q: "Can this calculator handle negative numbers and decimals?",
              a: "Yes. Both negative numbers and decimal values are fully supported and included in all statistics — mean, sum, minimum, maximum, and range.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "This calculator is optimized to handle datasets of 100,000+ numbers without freezing the browser, using efficient single-pass array processing and debounced recalculation.",
            },
            {
              q: "What's the difference between mean, median, and mode?",
              a: "Mean is the arithmetic average, median is the middle value when data is sorted, and mode is the most frequently occurring value. All three describe \"central tendency\" but can produce very different results on skewed or multimodal data — see this site's Median and Mode calculators for those specific measures.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your numbers are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "🎓", title: "Students & Teachers", desc: "Quickly calculate grade averages, test score means, and homework statistics." },
            { icon: "📊", title: "Data Analysts & Researchers", desc: "Get instant descriptive statistics on datasets before deeper analysis." },
            { icon: "🔧", title: "Engineers & Scientists", desc: "Average sensor readings, measurements, and experimental results on the fly." },
            { icon: "💰", title: "Financial Analysts & Accountants", desc: "Calculate average transaction values, expenses, or revenue figures instantly." },
            { icon: "🏢", title: "Business Professionals", desc: "Summarize survey results, sales figures, or performance metrics without a spreadsheet." },
            { icon: "🔬", title: "Anyone Working With Numerical Data", desc: "A fast, no-signup way to get a mean and basic statistics on any list of numbers." },
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
