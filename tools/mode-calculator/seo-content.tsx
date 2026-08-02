export default function ModeCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Mode Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>mode calculator</strong> is a free browser-based tool that finds the most frequently occurring value (or values) in a dataset. Unlike mean or median, the mode works equally well for numbers and text, making it useful for anything from exam scores to survey responses to product color preferences.
          </p>
          <p>
            This calculator automatically detects your separator (comma, space, new line, tab, or a mix) and whether your dataset is numeric or text, counts occurrences using an efficient single-pass frequency map, and returns every value tied for the highest frequency — correctly handling single-mode, multimodal, and no-mode datasets.
          </p>
          <p>
            This tool is built for <strong>students, teachers, researchers, data analysts, statisticians, business analysts, data scientists, and survey creators</strong>. It supports a frequency table, an interactive bar chart, adjustable sorting, calculation history, and export as CSV, JSON, or TXT — entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Mode Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Paste or type your dataset, and the calculator splits it into individual values, counts how often each one appears using a JavaScript Map for efficient single-pass counting, and identifies the value or values with the highest frequency.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Mode = Value(s) with the highest frequency</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Multiple Mode Detection", "If two or more values are tied for the highest frequency, every one of them is returned as a mode — a dataset can be bimodal, trimodal, or have even more modes."],
              ["No-Mode Detection", "If every value in the dataset appears the same number of times, the calculator reports \"No Mode\" rather than incorrectly picking an arbitrary value."],
              ["Auto Value Type Detection", "If every entered value parses as a valid number, the dataset is treated as numeric; otherwise it's treated as text, matched exactly and case-sensitively."],
              ["Sorting Options", "View the frequency table in the order values first appeared, or sorted ascending or descending by value."],
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
          How to Use the Mode Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Dataset", "Type or paste values separated by commas, spaces, or new lines — or click a sample dataset to try it instantly."],
                ["Choose a Separator (Optional)", "Leave on Auto Detect, or force Comma, Space, New Line, or Tab if your data needs a specific split."],
                ["Choose a Value Type (Optional)", "Leave on Auto Detect, or force Numbers or Text if your dataset mixes formats in a way you want handled a specific way."],
                ["Review the Mode and Frequency", "Check the Mode (or Modes), Frequency, Number of Modes, Total Values, and Unique Values — all updating instantly with a 150ms debounce."],
                ["Explore the Frequency Chart and Table", "See a bar chart and sortable table of every value's frequency, with the mode highlighted."],
                ["Copy, Export, or Share", "Copy the full report, download it as CSV, JSON, or TXT, print it, or copy a shareable URL with your dataset encoded."],
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
                "Supports both numbers and text values",
                "Automatic separator detection (comma, space, new line, tab, mixed)",
                "Automatic number/text type detection",
                "Multiple mode (multimodal) detection",
                "No-mode detection when all values occur equally",
                "Efficient single-pass frequency counting using JavaScript Map",
                "Interactive frequency bar chart with the mode highlighted",
                "Sortable frequency table (original, ascending, descending)",
                "Handles datasets with 100,000+ values without freezing",
                "Random dataset generator for quick testing",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, JSON, or TXT",
                "Print-ready formatted report",
                "Copy full report to clipboard in one click",
                "Calculation history — save and reload up to 20 past datasets",
                "No signup required, 100% free, and fully private",
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
              title: "Finding the Most Common Numeric Value",
              scenario: "A teacher enters test scores — 2, 4, 5, 5, 6, 7, 5, 8 — and the calculator returns a mode of 5 with a frequency of 3, showing that score was the most common result in the class.",
            },
            {
              title: "Finding the Most Popular Text Response",
              scenario: "A survey creator enters favorite colors — Red, Blue, Green, Red, Yellow, Red, Blue — and the calculator returns a mode of \"Red\" with a frequency of 3, immediately identifying the most popular choice.",
            },
            {
              title: "Detecting a Multimodal Dataset",
              scenario: "A researcher enters the dataset 1, 2, 2, 3, 3, 4 and the calculator correctly identifies two modes — 2 and 3 — each appearing twice, rather than incorrectly reporting just one.",
            },
            {
              title: "Identifying a No-Mode Dataset",
              scenario: "A statistician enters five unique values that each appear exactly once. The calculator reports \"No Mode — every value appears the same number of times\" instead of arbitrarily picking one, keeping the statistical interpretation accurate.",
            },
            {
              title: "Analyzing Survey Frequency Distribution",
              scenario: "A business analyst pastes hundreds of categorical survey responses and uses the frequency bar chart and sortable table to quickly see not just the mode, but the full distribution of every response category.",
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
                "Use the frequency table alongside the mode — the mode alone doesn't tell you how much more common it is than the next most frequent value.",
                "Check the Number of Modes card before assuming a dataset has a single, clear mode — multimodal datasets are common in real survey and categorical data.",
                "Force Text mode explicitly if your numeric-looking values should be treated as labels (like zip codes or IDs) rather than numbers.",
                "Use sorting by frequency-adjacent value order (ascending/descending) when you want to scan the frequency table for patterns rather than just seeing input order.",
                "For text data, remember matching is case-sensitive — \"Red\" and \"red\" are counted as different values, so normalize case before pasting if that's not the intended behavior.",
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
                "Don't assume every dataset has exactly one mode — some have several tied values (multimodal) and some have none at all.",
                "Don't confuse mode with mean or median — mode identifies the most common value, not a central or average one, and can be very different from either.",
                "Don't ignore the \"No Mode\" result as an error — it's a valid and meaningful statistical outcome when every value occurs equally.",
                "Don't mix numeric and non-numeric tokens and expect Auto Detect to treat them as numbers — a single non-numeric token switches the whole dataset to text mode under auto-detection.",
                "Don't rely on mode alone to summarize a large, mostly-unique dataset — with many unique values, no single mode may be particularly meaningful, and a frequency distribution view is more informative.",
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
          Mode Scenarios Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Dataset</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Result</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Scenario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["2, 4, 5, 5, 6, 7, 5, 8", "Mode = 5 (frequency 3)", "Single mode"],
                ["Red, Blue, Green, Red, Yellow, Red, Blue", "Mode = Red (frequency 3)", "Single mode (text)"],
                ["1, 2, 2, 3, 3, 4", "Modes = 2, 3 (frequency 2)", "Multimodal"],
                ["1, 2, 3, 4, 5", "No Mode", "Every value appears once"],
              ].map(([data, resultLabel, scenario]) => (
                <tr key={data} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{data}</td>
                  <td className="py-2.5 px-4 font-mono text-green-700">{resultLabel}</td>
                  <td className="py-2.5 px-4 text-gray-600">{scenario}</td>
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
              q: "What is the mode in statistics?",
              a: "The mode is the value or values that appear most frequently in a dataset. Unlike mean or median, it can be applied to both numeric and categorical (text) data.",
            },
            {
              q: "Can a dataset have more than one mode?",
              a: "Yes. If two or more values are tied for the highest frequency, the dataset is multimodal and all tied values are reported as modes — for example, 1, 2, 2, 3, 3, 4 has two modes: 2 and 3.",
            },
            {
              q: "What does \"No Mode\" mean?",
              a: "\"No Mode\" is reported when every value in the dataset occurs the same number of times — including when every value is unique. In this case, no single value can be said to occur most frequently.",
            },
            {
              q: "Does this calculator work with text data?",
              a: "Yes. The mode calculator supports both numbers and text. When Auto Detect value type is selected, the calculator uses numeric matching only if every entered value is a valid number; otherwise it treats the entire dataset as text.",
            },
            {
              q: "Is mode calculation case-sensitive for text?",
              a: "Yes. Text values are matched exactly, so \"Red\" and \"red\" are counted as two different values. Normalize casing in your data first if you want them treated as the same value.",
            },
            {
              q: "How is the mode different from the mean and median?",
              a: "Mean is the arithmetic average, median is the middle value in sorted order, and mode is the most frequently occurring value. They can all differ significantly, especially in skewed or categorical datasets — see this site's Mean and Median calculators for those specific measures.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "This calculator is optimized to handle datasets of 100,000+ values without freezing the browser, using a single-pass frequency count with a JavaScript Map and debounced recalculation.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your dataset is never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "🎓", title: "Students & Teachers", desc: "Quickly find the most common test score, survey answer, or classroom data point." },
            { icon: "🔬", title: "Researchers & Statisticians", desc: "Identify the most frequent value in experimental or observational data, including multimodal cases." },
            { icon: "📊", title: "Data Analysts & Data Scientists", desc: "Get a fast frequency distribution view of categorical or numeric data before deeper analysis." },
            { icon: "🏢", title: "Business Analysts", desc: "Find the most common customer response, product choice, or transaction category." },
            { icon: "📋", title: "Survey Creators", desc: "Determine the most popular answer choice across text or numeric survey responses." },
            { icon: "📈", title: "Anyone Working With Data", desc: "A fast, no-signup way to find the mode of any list of numbers or words." },
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
