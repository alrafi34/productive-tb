export default function ChiSquareCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Chi-Square Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>chi-square calculator</strong> is a free browser-based statistical tool that performs the two most common <strong>chi-square (χ²) hypothesis tests</strong>: the <strong>Goodness of Fit test</strong>, which checks whether observed category counts match an expected distribution, and the <strong>Test of Independence</strong>, which checks whether two categorical variables in a contingency table are related.
          </p>
          <p>
            Enter your observed frequencies — a simple category list for goodness of fit, or a full contingency table for independence — and the calculator instantly computes the chi-square statistic, degrees of freedom, p-value, effect size, and a plain-language decision, along with every intermediate step so you can verify the math yourself.
          </p>
          <p>
            This tool is built for <strong>students, teachers, researchers, business analysts, data analysts, healthcare professionals, scientists, university professors, and statisticians</strong>. It runs entirely in your browser — no data is ever sent to a server, and results update instantly as you edit the table.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Chi-Square Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            For a <strong>Goodness of Fit</strong> test, you provide an observed and expected count for each category. For a <strong>Test of Independence</strong>, you provide a contingency table of observed counts, and the calculator derives expected counts from the row and column totals under the assumption that the two variables are unrelated.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>χ² = Σ ((Observed − Expected)² ÷ Expected)</p>
              <p>Expected (independence) = (Row Total × Column Total) ÷ Grand Total</p>
              <p>df = categories − 1 &nbsp;|&nbsp; df = (rows − 1) × (columns − 1)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Chi-Square Statistic", "The sum of squared, normalized deviations between observed and expected counts — larger values indicate a bigger mismatch."],
              ["P-value", "Computed from the chi-square distribution using the regularized incomplete gamma function — the probability of seeing a statistic this extreme if the null hypothesis were true."],
              ["Cramér's V", "An effect size for the Test of Independence, showing how strong the association between variables is, independent of sample size."],
              ["Standardized Residuals", "Show which specific cells in a contingency table contribute most to the chi-square statistic and in which direction."],
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
          How to Use the Chi-Square Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose Your Test Type", "Select Goodness of Fit to compare one set of categories against expected values, or Test of Independence to analyze a contingency table."],
                ["Build Your Table", "Add or remove categories (goodness of fit) or rows and columns (independence) to match your dataset, then type in your observed counts."],
                ["Set Expected Values", "For goodness of fit, enter your expected count per category. For independence, expected counts are calculated automatically from your table."],
                ["Choose a Significance Level", "Select 0.10, 0.05, or 0.01, or enter a custom alpha value."],
                ["Read the Live Results", "The chi-square statistic, degrees of freedom, p-value, and decision update instantly as you edit the table."],
                ["Review the Heatmap and Residuals", "Spot which categories or cells contribute most to the result using the color-coded contribution heatmap and, for independence tests, the standardized residuals."],
                ["Export or Share", "Copy the report, or download it as CSV, TXT, or JSON, and print a formatted version."],
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
                "Goodness of Fit and Test of Independence in one tool",
                "Dynamic table builder — add or remove categories, rows, and columns",
                "Automatic expected frequency calculation for contingency tables",
                "Chi-square statistic, degrees of freedom, and p-value computed from the exact chi-square distribution",
                "Cramér's V effect size for contingency tables",
                "Color-coded contribution heatmap highlighting the biggest deviations",
                "Standardized residuals showing direction and size of each cell's deviation",
                "Low expected frequency warning (values under 5) per standard statistical guidance",
                "0.10, 0.05, 0.01, or custom significance level",
                "Random Example generator for quickly exploring the tool",
                "Instant calculation with a 150ms debounce as you type",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
                "Calculation history — save and review up to 20 past tests",
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
              title: "Testing a Fair Die",
              scenario: "A student rolls a six-sided die 120 times and records the frequency of each face, expecting 20 rolls per face if the die is fair. A Goodness of Fit test compares the observed counts to the expected 20-per-face distribution to check whether the die is biased.",
            },
            {
              title: "Gender and Product Preference",
              scenario: "A market researcher surveys 100 customers on whether they like or dislike a product, broken down by gender (40 male / like, 30 female / like, 20 male / dislike, 10 female / dislike). A Test of Independence checks whether preference depends on gender.",
            },
            {
              title: "Treatment Outcomes Across Hospitals",
              scenario: "A medical researcher records recovery outcomes for patients treated at three different hospitals. The Test of Independence determines whether treatment outcome is associated with hospital location, informing whether care quality varies by site.",
            },
            {
              title: "Website Traffic Source vs. Conversion",
              scenario: "A marketing analyst builds a contingency table of traffic source (organic, paid, social) against conversion outcome (converted, did not convert) to test whether conversion behavior differs meaningfully by acquisition channel.",
            },
            {
              title: "Survey Response Distribution Check",
              scenario: "A researcher checks whether Likert-scale survey responses (strongly disagree through strongly agree) follow an expected uniform or theoretical distribution using the Goodness of Fit test before proceeding with further analysis.",
            },
            {
              title: "Genetics: Observed vs. Expected Ratios",
              scenario: "A biology student compares observed offspring phenotype counts against the Mendelian 3:1 expected ratio using a Goodness of Fit test to evaluate whether the cross follows classical inheritance patterns.",
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
                "Watch the low expected frequency warning — if any expected cell is under 5, consider combining categories or using Fisher's exact test instead.",
                "Use standardized residuals to pinpoint exactly which cells drive a significant Test of Independence result, not just whether the overall test is significant.",
                "Report Cramér's V alongside the p-value — statistical significance alone doesn't tell you whether an association is practically meaningful, especially with large samples.",
                "Keep categories mutually exclusive and exhaustive — every observation should fall into exactly one cell of your table.",
                "For a Goodness of Fit test, make sure your expected counts sum to the same total as your observed counts before interpreting the result.",
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
                "Don't apply a chi-square test to continuous data without first binning it into categories — chi-square tests require categorical counts, not raw measurements.",
                "Don't use chi-square on percentages or proportions directly — always convert back to raw counts first.",
                "Don't ignore small expected frequencies — chi-square p-values become unreliable when too many cells have expected counts under 5.",
                "Don't confuse a significant Test of Independence with causation — an association between two variables doesn't mean one causes the other.",
                "Don't forget that chi-square tests require independent observations — repeated measurements from the same subject violate this assumption.",
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
          Cramér's V Effect Size Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Cramér's V</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Association Strength</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["< 0.10", "Negligible"],
                ["0.10 – 0.19", "Weak"],
                ["0.20 – 0.39", "Moderate"],
                ["0.40 – 0.59", "Relatively Strong"],
                ["0.60 – 0.79", "Strong"],
                ["≥ 0.80", "Very Strong"],
              ].map(([range, label]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary">{label}</td>
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
              q: "What is a chi-square calculator?",
              a: "A chi-square calculator is a free browser-based tool that performs chi-square hypothesis tests. It supports the Goodness of Fit test, which checks whether observed category counts match expected values, and the Test of Independence, which checks whether two categorical variables in a table are associated.",
            },
            {
              q: "How is the chi-square statistic calculated?",
              a: "The chi-square statistic sums, across every category or cell, the squared difference between observed and expected counts divided by the expected count: χ² = Σ ((Observed − Expected)² ÷ Expected). Larger values indicate a bigger mismatch between what was observed and what was expected.",
            },
            {
              q: "What is a good p-value for a chi-square test?",
              a: "There's no universally 'good' p-value — it depends on your chosen significance level (commonly 0.05). If the p-value is below your significance level, you reject the null hypothesis; otherwise you fail to reject it. A very small p-value (like 0.001) indicates especially strong evidence against the null hypothesis.",
            },
            {
              q: "What is the difference between Goodness of Fit and Test of Independence?",
              a: "Goodness of Fit compares one categorical variable's observed distribution against a specific expected distribution, such as testing whether a die is fair. Test of Independence examines two categorical variables at once, using a contingency table, to determine whether they're related to each other.",
            },
            {
              q: "How do I calculate degrees of freedom for a chi-square test?",
              a: "For Goodness of Fit, degrees of freedom equals the number of categories minus 1. For Test of Independence, degrees of freedom equals (number of rows minus 1) times (number of columns minus 1).",
            },
            {
              q: "What does it mean if my expected frequency is below 5?",
              a: "The chi-square approximation becomes less reliable when expected cell counts are too small, commonly cited as below 5. The calculator flags this automatically — consider combining sparse categories or using an exact test like Fisher's exact test instead.",
            },
            {
              q: "What is Cramér's V and why does it matter?",
              a: "Cramér's V is an effect size measure for the Test of Independence, ranging from 0 (no association) to 1 (perfect association), and it's not affected by sample size the way the chi-square statistic and p-value are. A statistically significant result with a very small Cramér's V may not be practically meaningful.",
            },
            {
              q: "Can chi-square tests be used on continuous data?",
              a: "Not directly. Chi-square tests require categorical count data, so continuous measurements must first be grouped into bins or categories before applying either chi-square test.",
            },
            {
              q: "What do the standardized residuals tell me?",
              a: "Standardized residuals show, cell by cell, how far the observed count deviates from the expected count in units of standard error. Residuals beyond roughly ±2 highlight the specific cells driving a significant Test of Independence result.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your data is never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach hypothesis testing with instant, verifiable step-by-step calculations." },
            { icon: "🔬", title: "Researchers & Scientists", desc: "Test observed data against expected distributions or check associations between categorical variables." },
            { icon: "📊", title: "Business & Data Analysts", desc: "Analyze categorical relationships in survey, marketing, and operational data." },
            { icon: "🏥", title: "Healthcare Professionals", desc: "Compare treatment outcomes and patient categories across groups or facilities." },
            { icon: "🎓", title: "University Professors & Statisticians", desc: "Verify manual calculations or generate quick examples for coursework and publications." },
            { icon: "📈", title: "Product & Marketing Teams", desc: "Test whether user segments behave differently across categorical outcomes." },
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
