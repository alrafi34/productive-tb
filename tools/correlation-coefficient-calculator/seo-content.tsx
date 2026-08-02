export default function CorrelationCoefficientCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Correlation Coefficient Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>correlation coefficient calculator</strong> is a free browser-based tool that measures how strongly two variables are related. It computes the <strong>Pearson correlation coefficient</strong> by default, with optional <strong>Spearman rank</strong> and <strong>Kendall Tau</strong> methods, then visualizes the relationship with an interactive scatter plot and regression trend line.
          </p>
          <p>
            This tool accepts manually typed paired data, pasted spreadsheet columns, or uploaded CSV files with automatic column detection. It instantly calculates the correlation coefficient, R², covariance, and regression equation, and flags statistical outliers directly on the chart.
          </p>
          <p>
            Built for <strong>students, teachers, researchers, statisticians, data analysts, scientists, economists, financial analysts, and business intelligence professionals</strong>, the calculator runs entirely in your browser with instant results, no signup, and support for datasets ranging from a handful of points to tens of thousands.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Correlation Coefficient Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator pairs each X value with its matching Y value, then applies the selected correlation formula to measure the strength and direction of their relationship.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Pearson Correlation Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>r = Σ((xi − x̄)(yi − ȳ)) / √(Σ(xi − x̄)² × Σ(yi − ȳ)²)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Pearson Correlation", "Measures the strength of a linear relationship using the raw values of both variables. Best for continuous data with a roughly linear trend."],
              ["Spearman Rank Correlation", "Converts both variables to ranks before applying the Pearson formula, capturing monotonic (not necessarily linear) relationships and reducing sensitivity to outliers."],
              ["Kendall Tau Correlation", "Compares every pair of observations and counts concordant versus discordant pairs, producing a rank-based measure well suited to smaller datasets."],
              ["Regression Line", "A best-fit line (Y = a + bX) is calculated using least squares and overlaid on the scatter plot to visualize the trend."],
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
          How to Use the Correlation Coefficient Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Paired Data", "Type or paste numbers into Variable X and Variable Y, one value per line, or upload a CSV file."],
                ["Choose a Method", "Select Pearson, Spearman, or Kendall Tau based on your data's shape and outlier sensitivity."],
                ["Adjust Decimal Precision", "Choose how many decimal places results are rounded to, from 2 up to 6 places."],
                ["Read the Live Results", "The correlation coefficient, R², interpretation, and regression equation update instantly."],
                ["Visualize and Export", "Review the scatter plot with outliers highlighted, then export as CSV, JSON, PNG, SVG, or a printed report."],
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
                "Pearson, Spearman rank, and Kendall Tau correlation methods",
                "Interactive scatter plot with regression trend line",
                "Automatic outlier detection and highlighting",
                "CSV upload with automatic numeric column detection",
                "Drag-and-drop file import",
                "Sample datasets and a random dataset generator",
                "Live validation for mismatched or invalid data",
                "Duplicate pair detection",
                "Adjustable decimal precision from 2 to 6 places",
                "Copy full report, download CSV, JSON, PNG, and SVG",
                "Print-friendly report generation",
                "Calculation history — save and reload past results",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcuts — Esc to clear, Ctrl+L for a sample",
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
              title: "Advertising Spend vs. Sales",
              scenario: "A marketing analyst pastes monthly ad spend as Variable X and monthly sales as Variable Y to see how strongly advertising investment correlates with revenue.",
            },
            {
              title: "Study Hours vs. Exam Scores",
              scenario: "A teacher enters students' weekly study hours and their exam scores to demonstrate the strength of the relationship between effort and performance.",
            },
            {
              title: "Customer Satisfaction vs. Retention",
              scenario: "A business analyst uploads a CSV of satisfaction survey scores and retention rates to quantify how closely satisfaction predicts customer loyalty.",
            },
            {
              title: "Temperature vs. Electricity Consumption",
              scenario: "An energy analyst compares daily temperature readings with electricity usage to measure how closely the two variables move together.",
            },
            {
              title: "Validating Machine Learning Features",
              scenario: "A data scientist checks correlation between candidate input features and a target variable to identify predictive signal before model training.",
            },
            {
              title: "Academic Research and Statistics Education",
              scenario: "A researcher or student uses Spearman correlation to analyze ranked survey data that doesn't follow a strictly linear or normally distributed pattern.",
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
                "Use Spearman correlation instead of Pearson when your data has outliers or a non-linear but still monotonic trend.",
                "Check the scatter plot visually — a strong correlation coefficient can still hide a non-linear relationship that a straight regression line misrepresents.",
                "Watch the outlier highlights — a single extreme point can substantially inflate or deflate a Pearson correlation coefficient.",
                "Use the CSV column picker to quickly correlate any two columns from an exported spreadsheet without retyping data.",
                "Remember that correlation does not imply causation — a strong r value only shows association, not that one variable causes the other.",
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
                "Don't assume a high correlation coefficient proves causation — confounding variables can produce a strong r with no direct cause-and-effect relationship.",
                "Don't use Pearson correlation on strongly skewed or outlier-heavy data without also checking Spearman for a more robust comparison.",
                "Don't forget that X and Y must have equal length — mismatched row counts will only use the paired rows available and may misrepresent your dataset.",
                "Don't rely on r alone — always check R² and the scatter plot together to understand both the strength and the shape of the relationship.",
                "Don't apply Kendall Tau to very large datasets expecting instant results — it uses pairwise comparison and is capped at 3,000 points for performance.",
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
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Variable X</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Variable Y</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Correlation (r)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10, 20, 30, 40, 50", "15, 25, 35, 45, 55", "1.0000", "Perfect Positive Correlation"],
                ["1, 2, 3, 4, 5", "10, 8, 6, 4, 2", "-1.0000", "Perfect Negative Correlation"],
                ["120, 140, 150, 180, 200", "12, 14, 15, 18, 20", "≈1.0000", "Very Strong Positive Relationship"],
              ].map(([xVals, yVals, r, interp]) => (
                <tr key={xVals} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700 text-xs">{xVals}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{yVals}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{r}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{interp}</td>
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
              q: "What is a correlation coefficient calculator?",
              a: "A correlation coefficient calculator is a free browser-based tool that measures the statistical relationship between two variables using Pearson, Spearman, or Kendall Tau correlation, with a visual scatter plot and regression line.",
            },
            {
              q: "What is the difference between Pearson, Spearman, and Kendall correlation?",
              a: "Pearson measures linear relationships using raw values. Spearman measures monotonic relationships using ranked values, making it more robust to outliers. Kendall Tau measures ordinal association using concordant and discordant pairs, and works well for smaller datasets.",
            },
            {
              q: "How is the Pearson correlation coefficient calculated?",
              a: "r = Σ((xi − x̄)(yi − ȳ)) / √(Σ(xi − x̄)² × Σ(yi − ȳ)²). The result ranges from -1 to +1, where the sign indicates direction and the magnitude indicates strength.",
            },
            {
              q: "What does R² mean?",
              a: "R² (the coefficient of determination) is the square of the correlation coefficient and represents the proportion of variance in Y explained by X. An R² of 0.60 means 60% of the variation in Y is explained by X.",
            },
            {
              q: "What separators does the calculator support?",
              a: "Each variable is entered one value per line. New lines are automatically detected when pasting from a spreadsheet column, and CSV/TXT files are parsed automatically with delimiter and header detection.",
            },
            {
              q: "Can I upload a CSV or TXT file instead of typing numbers?",
              a: "Yes. Use the Import CSV button or drag and drop a file directly onto the input box. The calculator automatically detects numeric columns and lets you choose which two to use.",
            },
            {
              q: "What happens if X and Y have a different number of values?",
              a: "The calculator warns you that Variable X and Variable Y must contain the same number of values, and uses only the paired rows available for calculation.",
            },
            {
              q: "How does the calculator detect outliers?",
              a: "Outliers are identified using standardized residuals from the regression line — any point whose residual deviates more than two standard deviations from the mean residual is flagged and highlighted in red on the scatter plot.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "Pearson and Spearman correlation handle tens of thousands of paired values smoothly using efficient O(n log n) algorithms. Kendall Tau is capped at 3,000 pairs since it uses pairwise comparison.",
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
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach correlation concepts with a clear, visual scatter plot and instant coefficient calculation." },
            { icon: "🔬", title: "Researchers & Statisticians", desc: "Quickly test relationships between variables in academic or scientific datasets." },
            { icon: "📊", title: "Data Analysts", desc: "Validate relationships in spreadsheets and exported datasets before deeper analysis." },
            { icon: "💰", title: "Financial & Economic Analysts", desc: "Measure relationships between economic indicators, prices, or portfolio variables." },
            { icon: "📈", title: "Marketing & BI Professionals", desc: "Quantify how spend, engagement, or campaign metrics relate to business outcomes." },
            { icon: "🤖", title: "ML & Data Science Practitioners", desc: "Check feature correlation with a target variable before building predictive models." },
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
