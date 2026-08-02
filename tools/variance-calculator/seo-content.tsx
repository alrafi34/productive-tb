export default function VarianceCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Variance Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>variance calculator</strong> is a free browser-based tool that computes both <strong>population variance</strong> and <strong>sample variance</strong> of any dataset instantly. Type or paste numbers separated by commas, spaces, or new lines — or upload a CSV or TXT file — and the calculator automatically detects your separators, parses the values, and returns variance, standard deviation, and a full descriptive statistics summary.
          </p>
          <p>
            Beyond variance itself, this calculator also returns mean, sum, count, minimum, maximum, range, and population/sample standard deviation — plus a complete step-by-step breakdown showing every deviation and squared deviation used in the calculation, making it as useful for learning statistics as it is for real analysis.
          </p>
          <p>
            This tool is built for <strong>students, teachers, data analysts, researchers, engineers, scientists, business analysts, financial analysts, and quality assurance professionals</strong>. It handles datasets of 100,000+ numbers efficiently, supports decimals and negative numbers, and never sends your data anywhere — everything runs locally in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Variance Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Paste or type your numbers into the textarea in any format — comma-separated, space-separated, one per line, or a mix of all three. The calculator normalizes your input, discards anything that isn't a valid number, computes the mean, then calculates the deviation and squared deviation of every value from the mean in a single pass before summing them to produce variance.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Mean: μ = Σx ÷ n</p>
              <p>Population Variance: σ² = Σ(x − μ)² ÷ n</p>
              <p>Sample Variance: s² = Σ(x − x̄)² ÷ (n − 1)</p>
              <p>Population Std Dev: σ = √σ²</p>
              <p>Sample Std Dev: s = √s²</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Automatic Separator Detection", "Commas, spaces, new lines, tabs, and mixed combinations are all normalized automatically — no manual configuration needed."],
              ["Population vs. Sample Mode", "Choose Population Variance, Sample Variance, or Both to control which formula is calculated and displayed."],
              ["Step-by-Step Breakdown", "Every value's deviation and squared deviation from the mean is shown in a scrollable table for full transparency."],
              ["File Upload & Drag-and-Drop", "Upload a .csv or .txt file, or drag one directly onto the input box, to instantly load a dataset without manual copy-pasting."],
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
          How to Use the Variance Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Your Numbers", "Type or paste numbers into the textarea using commas, spaces, new lines, or a mix — or click a sample dataset to try it instantly."],
                ["Or Upload a File", "Click Upload CSV/TXT, or drag and drop a file directly onto the input box, to load a dataset automatically."],
                ["Choose a Calculation Mode", "Select Population Variance, Sample Variance, or Both, and set the decimal precision from 0 to 6 places."],
                ["Review the Results", "Check variance, standard deviation, mean, count, sum, minimum, maximum, and range — all updating instantly with a 150ms debounce as you type."],
                ["Inspect the Steps", "Enable Show Steps to see every value's deviation and squared deviation from the mean in a detailed table."],
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
                "Population and sample variance calculated side by side",
                "Population and sample standard deviation included automatically",
                "Full step-by-step breakdown of deviations and squared deviations",
                "CSV and TXT file upload with drag-and-drop support",
                "Instant calculation with a 150ms debounce, even on large datasets",
                "Optional dataset sorting before display",
                "Invalid value detection with a count of ignored entries",
                "Adjustable decimal precision (0–6 places)",
                "Keyboard shortcuts (Ctrl+Enter to calculate, Ctrl+L to clear)",
                "Random dataset generator for quick testing",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past datasets",
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
              title: "Classroom Statistics Exercise",
              scenario: "A teacher enters five test scores — 10, 12, 15, 18, 20 — and instantly sees a mean of 15, a population variance of 13.6, and a sample variance of 17, along with the full step-by-step deviation table for a lesson.",
            },
            {
              title: "Line-Separated Survey Results",
              scenario: "A researcher pastes six survey responses, one per line, and the calculator automatically detects the new-line separators and returns a complete statistical summary without reformatting the data.",
            },
            {
              title: "Grading a Batch of Exams",
              scenario: "A teacher pastes seven exam scores — 95, 88, 91, 87, 90, 92, 89 — and reviews the variance and standard deviation to gauge how consistent the class performance was.",
            },
            {
              title: "Quality Control Measurement Spread",
              scenario: "A QA engineer uploads a CSV of thousands of measurements from a production line and checks the sample variance to determine whether the process is within acceptable tolerance.",
            },
            {
              title: "Financial Return Volatility",
              scenario: "A financial analyst pastes a series of monthly returns and uses the sample variance and standard deviation as an input into a broader risk or volatility analysis.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Population vs Sample ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Population Variance vs. Sample Variance
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            <strong>Population variance</strong> (σ²) is used when your dataset includes every member of the group you care about — for example, the test scores of every student in a single class. It divides the sum of squared deviations by <strong>n</strong>, the total count.
          </p>
          <p>
            <strong>Sample variance</strong> (s²) is used when your dataset is a subset drawn from a larger population — for example, a survey of 200 customers out of a million. It divides by <strong>n − 1</strong> instead of <strong>n</strong>, a correction known as Bessel's correction, which compensates for the tendency of a sample to underestimate the true population variance.
          </p>
          <p>
            <strong>Common mistake:</strong> using population variance on sample data systematically underestimates variability. When in doubt about which to use, sample variance is the safer default for any dataset that doesn't represent the entire population of interest — which is why this calculator computes both by default.
          </p>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example (10, 12, 15, 18, 20)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Mean", "Σx ÷ n", "75 ÷ 5 = 15"],
                ["Population Variance", "Σ(x − μ)² ÷ n", "68 ÷ 5 = 13.6"],
                ["Sample Variance", "Σ(x − x̄)² ÷ (n − 1)", "68 ÷ 4 = 17"],
                ["Population Std Dev", "√σ²", "√13.6 ≈ 3.6878"],
                ["Sample Std Dev", "√s²", "√17 ≈ 4.1231"],
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
              q: "What is variance?",
              a: "Variance measures how spread out a dataset is from its mean. It's calculated by averaging the squared deviations of each value from the mean — a larger variance means the data points are more spread out.",
            },
            {
              q: "What's the difference between population and sample variance?",
              a: "Population variance divides the sum of squared deviations by n (the total count) and is used when your data represents the entire population. Sample variance divides by n − 1 instead, correcting for bias when your data is a sample drawn from a larger population.",
            },
            {
              q: "Why does sample variance divide by n − 1 instead of n?",
              a: "This is called Bessel's correction. Because a sample's mean is calculated from the same data used to measure deviations, dividing by n alone tends to underestimate the true population variance. Dividing by n − 1 corrects for this bias.",
            },
            {
              q: "How is standard deviation related to variance?",
              a: "Standard deviation is simply the square root of variance. It's expressed in the same units as the original data, which often makes it easier to interpret than variance, which is expressed in squared units.",
            },
            {
              q: "What separators does this calculator support?",
              a: "Commas, spaces, new lines, tabs, and any mixed combination of these are all automatically detected and normalized — you don't need to choose a separator format manually.",
            },
            {
              q: "Can this calculator handle negative numbers and decimals?",
              a: "Yes. Both negative numbers and decimal values are fully supported and included in all statistics — mean, variance, standard deviation, minimum, maximum, and range.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "This calculator is optimized to handle datasets of 100,000+ numbers without freezing the browser, using efficient single-pass array processing and debounced recalculation.",
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
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach variance and standard deviation with a full step-by-step breakdown." },
            { icon: "📊", title: "Data Analysts & Researchers", desc: "Get instant variability measures on datasets before deeper statistical analysis." },
            { icon: "🔧", title: "Engineers & Scientists", desc: "Assess measurement spread and consistency in experimental or sensor data." },
            { icon: "💰", title: "Financial Analysts", desc: "Use variance and standard deviation as building blocks for volatility and risk analysis." },
            { icon: "🏢", title: "Business Analysts", desc: "Measure consistency in sales figures, survey responses, or performance metrics." },
            { icon: "✅", title: "Quality Assurance Professionals", desc: "Check whether process measurements fall within an acceptable variance tolerance." },
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
