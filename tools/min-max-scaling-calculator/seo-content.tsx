export default function MinMaxScalingCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Min-Max Scaling Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>min-max scaling calculator</strong> is a free browser-based tool that transforms a list of numbers into a new range using <strong>min-max normalization</strong> — the standard feature-scaling technique used throughout machine learning, data science, statistics, and finance. It answers a question every practitioner runs into before training a model or comparing metrics: <em>how do I put these numbers on a consistent scale?</em>
          </p>
          <p>
            Paste in any dataset — one value per line, comma-separated, space-separated, or pasted directly from Excel — set your target minimum and maximum, and the calculator instantly rescales every value proportionally so the original minimum maps to your target minimum and the original maximum maps to your target maximum.
          </p>
          <p>
            This tool is built for <strong>data scientists, machine learning engineers, students, researchers, statisticians, financial analysts, engineers, business analysts, developers, and teachers</strong>. It runs entirely in your browser, handles large datasets smoothly, and never sends your data to a server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Min-Max Scaling Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator finds the minimum and maximum values in your dataset in a single pass, then applies the min-max normalization formula to every value, mapping the original range proportionally onto your chosen target range.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Scaled Value</span> = ((X − Min) ÷ (Max − Min)) × (NewMax − NewMin) + NewMin</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Original Min / Max", "The smallest and largest values found in your pasted dataset, calculated automatically."],
              ["Target Range", "Your desired output range — common choices are 0 to 1, -1 to 1, or 0 to 100."],
              ["Proportional Mapping", "Every value keeps its relative position — the value that was 25% of the way from min to max stays 25% of the way from your new min to new max."],
              ["Identical Values Guard", "If every value in your dataset is the same, normalization is undefined (division by zero) — the calculator detects this and explains why instead of returning an error."],
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
          How to Use the Min-Max Scaling Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Add Your Dataset", "Paste or type your numbers — one per line, comma-separated, or space-separated — or drag and drop a CSV or TXT file, or upload one directly."],
                ["Set Your Target Range", "Enter the target minimum and maximum you want your values scaled into, such as 0 to 1 or -1 to 1."],
                ["Choose Decimal Places", "Select how many decimal places to display in the scaled output, from 0 to 6."],
                ["Read the Live Results", "The scaled dataset, original range, and target range update instantly as you edit your data."],
                ["Review the Table", "Compare every original value against its scaled counterpart side by side."],
                ["Copy or Export", "Copy the scaled values directly, or download them as CSV, JSON, or TXT."],
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
                "Accepts one-per-line, comma, space, or tab separated values",
                "Paste directly from Excel or Google Sheets",
                "Drag-and-drop or click-to-upload CSV and TXT files",
                "Any custom target range — 0 to 1, -1 to 1, 0 to 100, or your own values",
                "Adjustable decimal precision (0–6 places)",
                "Invalid line detection with line-number reporting",
                "Handles large datasets smoothly with a scrollable results table",
                "Quick sample datasets and a random dataset generator",
                "Instant calculation with a 150ms debounce as you type",
                "Shareable calculation URL using query parameters",
                "Copy scaled values directly to your clipboard",
                "Export as CSV, JSON, or TXT",
                "Calculation history — save and review up to 20 past datasets",
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
              title: "Preparing Features for Machine Learning",
              scenario: "A machine learning engineer has a feature column ranging from 5 to 20,000 alongside other features ranging from 0 to 1. Scaling the feature to a 0–1 range using min-max normalization prevents it from dominating distance-based algorithms like k-nearest neighbors or gradient descent convergence.",
            },
            {
              title: "Normalizing Test Scores for Comparison",
              scenario: "A teacher has exam scores ranging from 55 to 95 across a class and wants to convert them to a 0–1 scale for a weighted grading formula. Min-max scaling the raw scores into the target range preserves the relative ranking while standardizing the scale.",
            },
            {
              title: "Financial Metric Normalization",
              scenario: "A financial analyst normalizes a company's quarterly revenue figures (ranging from $100,000 to $700,000) onto a -1 to 1 scale to compare growth trends against another normalized metric with a naturally different scale.",
            },
            {
              title: "Data Visualization Preprocessing",
              scenario: "A data analyst rescales a dataset onto a 0–100 range before feeding it into a visualization tool that expects percentage-like values, making the chart's axis immediately intuitive to readers.",
            },
            {
              title: "Sensor Data Calibration",
              scenario: "An engineer normalizes raw sensor readings from a device with an unusual native range into a standard 0–1 scale expected by a downstream monitoring dashboard.",
            },
            {
              title: "Comparing Multiple Datasets on the Same Chart",
              scenario: "A researcher scales two datasets with very different native ranges onto the same 0–1 range so both can be plotted meaningfully on a single chart without one dataset visually flattening the other.",
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
                "Use the same min and max from your training dataset when scaling new data in machine learning — recalculating min/max on new data breaks consistency with your trained model.",
                "Min-max scaling is sensitive to outliers — a single extreme value compresses the rest of your dataset into a narrow sub-range. Check for outliers before scaling.",
                "Use 0 to 1 for most machine learning contexts, and -1 to 1 when your downstream algorithm benefits from zero-centered input, such as certain neural network activations.",
                "Increase decimal precision when your target range is narrow (like 0 to 1) so small but meaningful differences between values remain visible.",
                "Paste data directly from Excel or Google Sheets — the calculator automatically detects tab and newline-separated values without any reformatting.",
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
                "Don't confuse min-max scaling with standardization (Z-score normalization) — min-max bounds values to a fixed range, while standardization centers data around a mean of 0 with unit variance.",
                "Don't scale your target/label column the same way as your input features unless your use case specifically calls for it.",
                "Don't set a target minimum greater than or equal to your target maximum — the calculator will flag this as invalid.",
                "Don't scale datasets where every value is identical — the min-max formula divides by zero in that case, which the calculator detects and explains.",
                "Don't forget to re-scale any new or test data using the original training dataset's min and max, not the new data's own min and max.",
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
          Worked Example Reference
        </h2>
        <p className="text-sm text-gray-500 mb-4">Dataset: 5, 10, 15, 20 scaled to a 0–1 target range.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Original Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Calculation</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Scaled Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["5", "(5 − 5) ÷ (20 − 5)", "0.0000"],
                ["10", "(10 − 5) ÷ (20 − 5)", "0.3333"],
                ["15", "(15 − 5) ÷ (20 − 5)", "0.6667"],
                ["20", "(20 − 5) ÷ (20 − 5)", "1.0000"],
              ].map(([orig, calc, scaled]) => (
                <tr key={orig} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{orig}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{calc}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{scaled}</td>
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
              q: "What is a min-max scaling calculator?",
              a: "A min-max scaling calculator is a free browser-based tool that rescales a list of numbers into a custom target range using min-max normalization. It finds the minimum and maximum of your dataset and proportionally maps every value onto your chosen output range.",
            },
            {
              q: "How is min-max scaling calculated?",
              a: "Each value is transformed using the formula: Scaled = ((X − Min) ÷ (Max − Min)) × (NewMax − NewMin) + NewMin, where X is the original value, Min and Max are the dataset's minimum and maximum, and NewMin/NewMax are your target range bounds.",
            },
            {
              q: "What is a good target range for min-max scaling?",
              a: "It depends on your use case. 0 to 1 is the most common choice for machine learning features. -1 to 1 is often used when a zero-centered range benefits your model. 0 to 100 is useful when you want a percentage-like scale for reporting or visualization.",
            },
            {
              q: "What is the difference between min-max scaling and standardization?",
              a: "Min-max scaling compresses values into a fixed, bounded range (like 0 to 1) based on the dataset's minimum and maximum. Standardization (Z-score normalization) instead centers data around a mean of 0 with a standard deviation of 1, and is not bounded to a fixed range.",
            },
            {
              q: "Why does my dataset show 'all values are identical'?",
              a: "Min-max scaling divides by the range (max minus min) of your dataset. If every value is the same, that range is zero, which makes the formula undefined — the calculator detects this and explains it instead of returning an error or misleading result.",
            },
            {
              q: "Is min-max scaling sensitive to outliers?",
              a: "Yes. Because the formula depends directly on the dataset's minimum and maximum, a single extreme outlier stretches the range and compresses the rest of your values into a narrow sub-interval. Consider removing or capping outliers first if this is a concern.",
            },
            {
              q: "Can I paste data directly from Excel?",
              a: "Yes. The calculator automatically detects comma, tab, space, and newline-separated values, so pasting a column or row directly from Excel or Google Sheets works without any reformatting.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "The calculator computes the minimum, maximum, and scaled values in a single efficient pass and comfortably handles very large datasets. The results table displays the first 200 rows for readability, while exports include your complete dataset.",
            },
            {
              q: "What happens to invalid values in my dataset?",
              a: "Any token that isn't a valid number is skipped and reported with its line number, so you can quickly spot and fix typos or non-numeric entries without losing the rest of your valid data.",
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
            { icon: "🤖", title: "Data Scientists & ML Engineers", desc: "Prepare and normalize features before training machine learning models." },
            { icon: "🎓", title: "Students & Researchers", desc: "Learn and apply feature scaling concepts for coursework, theses, and experiments." },
            { icon: "📊", title: "Statisticians & Analysts", desc: "Rescale datasets for comparison, visualization, or downstream statistical analysis." },
            { icon: "💰", title: "Financial Analysts", desc: "Normalize financial metrics with different native scales for direct comparison." },
            { icon: "⚙️", title: "Engineers", desc: "Calibrate sensor or measurement data into a standard scale expected by other systems." },
            { icon: "💻", title: "Developers & Business Analysts", desc: "Quickly normalize data for dashboards, reports, and internal tools without writing code." },
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
