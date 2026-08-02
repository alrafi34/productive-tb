export default function F1ScoreCalculatorAnalyticsSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an F1 Score Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>F1 score calculator</strong> is a free browser-based tool that computes the F1 Score — the harmonic mean of Precision and Recall — used to evaluate classification models across machine learning, information retrieval, and AI research. It answers a question neither Precision nor Recall can answer alone: <em>how well does my model balance avoiding false alarms against catching every real positive?</em>
          </p>
          <p>
            The calculator supports two input modes: enter Precision and Recall directly if you already have them, or enter a confusion matrix of True Positive, False Positive, and False Negative counts and let the tool derive Precision and Recall automatically before combining them into the F1 Score.
          </p>
          <p>
            This tool is built for <strong>machine learning engineers, data scientists, AI researchers, students, teachers, data analysts, Kaggle competitors, software engineers, and researchers</strong>. It supports adjustable decimal precision, shareable calculation URLs, and CSV/TXT/JSON export — running entirely in your browser with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the F1 Score Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            In Confusion Matrix mode, the calculator first derives Precision and Recall from your TP, FP, and FN counts, then combines both into the F1 Score using the harmonic mean formula.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Precision = TP ÷ (TP + FP)</p>
              <p>Recall = TP ÷ (TP + FN)</p>
              <p><span className="font-semibold">F1 Score</span> = 2 × (Precision × Recall) ÷ (Precision + Recall)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Two Input Modes", "Switch instantly between entering Precision and Recall directly, or entering a confusion matrix — the calculator handles the intermediate math for you in the latter case."],
              ["Harmonic Mean, Not Average", "F1 uses the harmonic mean rather than a simple average, which penalizes a large imbalance between Precision and Recall far more heavily — a model that's great at one and terrible at the other still gets a low F1 score."],
              ["Division-by-Zero Handling", "If Precision and Recall are both zero, the calculator returns an F1 score of 0 instead of an undefined result."],
              ["Performance Rating", "The F1 percentage is automatically classified from Needs Improvement to Excellent, giving instant context to the raw number."],
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
          How to Use the F1 Score Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose an Input Mode", "Select Precision + Recall if you already computed those metrics, or Confusion Matrix if you have raw True Positive, False Positive, and False Negative counts."],
                ["Enter Your Values", "Type Precision and Recall as decimals between 0 and 1, or type your TP, FP, and FN counts — Precision and Recall are derived automatically in Confusion Matrix mode."],
                ["Adjust Decimal Precision", "Choose how many decimal places to display, from 2 to 6, to match the precision your reporting needs."],
                ["Review the Live Result", "The F1 score, its performance rating, and the full calculation breakdown update instantly as you type."],
                ["Copy, Export, or Share", "Copy the full report, download it as CSV, TXT, or JSON, print it, or copy a shareable URL that encodes all your inputs."],
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
                "Two calculation modes: Precision + Recall, or Confusion Matrix (TP, FP, FN)",
                "Automatic Precision and Recall derivation in Confusion Matrix mode",
                "Instant calculation with a 150ms debounce as you type",
                "Automatic performance rating from Needs Improvement to Excellent",
                "Full formula breakdown with substituted values",
                "Adjustable decimal precision from 2 to 6 places",
                "Quick example presets for spam filtering, fraud detection, and medical screening",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past results",
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
              title: "Evaluating a Spam Filter",
              scenario: "An engineer tests a spam filter with TP = 90, FP = 10, FN = 15. Precision = 0.90, Recall ≈ 0.8571, and F1 ≈ 0.8780 — rated Good, showing the filter balances catching spam against wrongly flagging real emails.",
            },
            {
              title: "Comparing Two Models via Precision and Recall",
              scenario: "A data scientist has two models: one with Precision = 0.82 and Recall = 0.91 (F1 ≈ 0.8627), another with Precision = 0.95 and Recall = 0.70 (F1 ≈ 0.8058). Despite the second model's higher precision, its lower F1 shows the first is more balanced overall.",
            },
            {
              title: "Fraud Detection Model at Scale",
              scenario: "A fraud team evaluates a large-scale model with TP = 450, FP = 40, FN = 70. The calculator returns Precision ≈ 0.9184, Recall ≈ 0.8654, and F1 ≈ 0.8911 — rated Excellent, confirming the model is production-ready.",
            },
            {
              title: "Reporting Results in a Kaggle Competition",
              scenario: "A competitor derives their leaderboard score by entering their submission's confusion matrix counts, instantly getting the exact F1 score their model achieved without writing evaluation code.",
            },
            {
              title: "Medical Screening Reliability Check",
              scenario: "A healthcare analyst evaluates a diagnostic test with TP = 15, FP = 5, FN = 3, getting Precision = 0.75, Recall ≈ 0.833, and F1 ≈ 0.7895 — informing whether the test's balance of false alarms and missed cases meets clinical standards.",
            },
            {
              title: "Tuning a Classification Threshold",
              scenario: "A machine learning engineer recalculates F1 at several decision thresholds, watching Precision rise and Recall fall as the threshold increases, and picks the threshold that maximizes the F1 score for their deployment.",
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
                "Use F1 score when Precision and Recall matter roughly equally to you — if one matters much more, consider the Fβ score or optimize for that metric directly instead.",
                "Report F1 alongside Precision and Recall individually, not instead of them — F1 hides which of the two is dragging the score down.",
                "On imbalanced datasets, F1 is usually a better single-number summary than accuracy, since accuracy can look deceptively high by just predicting the majority class.",
                "When comparing models with the confusion matrix mode, keep test set size and class distribution identical between runs so the comparison is fair.",
                "Track F1 across training epochs or threshold sweeps to visually spot the point where Precision and Recall are best balanced for your use case.",
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
                "Don't average Precision and Recall arithmetically instead of using the harmonic mean — a simple average masks large imbalances that F1 is specifically designed to penalize.",
                "Don't assume a high F1 score means a good model in every context — F1 ignores True Negatives entirely, so it says nothing about how well the model handles the negative class.",
                "Don't compare F1 scores computed on different class distributions or different decision thresholds without noting the difference — F1 shifts as the threshold changes.",
                "Don't forget that Precision and Recall inputs in Precision + Recall mode must be between 0 and 1, not 0 and 100 — enter 0.82, not 82.",
                "Don't rely on F1 alone for multi-class problems without checking whether you need macro, micro, or weighted averaging — a plain F1 score is defined for binary classification.",
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
          F1 Score Performance Rating Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">F1 Score Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["90% – 100%", "Excellent"],
                ["75% – 89%", "Good"],
                ["60% – 74%", "Average"],
                ["Below 60%", "Needs Improvement"],
              ].map(([range, label]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* These ranges are general guidance. Thresholds for what counts as an acceptable F1 score vary by domain and class balance.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is an F1 score calculator?",
              a: "An F1 score calculator is a free browser-based tool that computes the F1 Score — the harmonic mean of Precision and Recall — from either those two metrics directly or a confusion matrix of True Positive, False Positive, and False Negative counts.",
            },
            {
              q: "How is the F1 score calculated?",
              a: "F1 Score = 2 × (Precision × Recall) ÷ (Precision + Recall). If you only have a confusion matrix, first compute Precision = TP ÷ (TP + FP) and Recall = TP ÷ (TP + FN), then combine them with this formula.",
            },
            {
              q: "What is a good F1 score?",
              a: "90% and above is generally considered excellent, 75–89% good, 60–74% average, and below 60% needs improvement — though the right threshold depends on your application and how balanced your data is.",
            },
            {
              q: "What is the difference between F1 score and accuracy?",
              a: "Accuracy uses all four confusion matrix outcomes and can look misleadingly high on imbalanced datasets by favoring the majority class. F1 score only uses Precision and Recall, making it more informative when correctly identifying the positive class matters most.",
            },
            {
              q: "How do I calculate F1 score from a confusion matrix?",
              a: "Switch to Confusion Matrix mode and enter TP, FP, and FN. The calculator derives Precision and Recall automatically, then combines them into the F1 Score — no manual intermediate calculation needed.",
            },
            {
              q: "Why is F1 the harmonic mean instead of a regular average?",
              a: "The harmonic mean punishes a large gap between Precision and Recall much more severely than an arithmetic average. A model with Precision = 1.0 and Recall = 0.01 averages to 0.505 arithmetically, but its F1 score is only about 0.0198 — correctly signaling the model is nearly useless.",
            },
            {
              q: "What happens if Precision and Recall are both zero?",
              a: "The calculator returns an F1 score of 0 rather than an undefined result, since a model that never correctly predicts a positive case has no useful F1 score to report.",
            },
            {
              q: "Can I use F1 score for multi-class classification?",
              a: "This calculator computes the standard binary F1 score. For multi-class problems, F1 is typically calculated per class and then combined using macro, micro, or weighted averaging — use a Confusion Matrix Analyzer for that level of detail.",
            },
            {
              q: "When should I not rely on F1 score alone?",
              a: "F1 score assumes Precision and Recall are equally important and ignores True Negatives entirely. If your application cares much more about one error type than the other, or True Negatives matter to your evaluation, consider a weighted Fβ score or a fuller confusion matrix analysis instead.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your input values are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "🤖", title: "Machine Learning Engineers", desc: "Evaluate and tune classification models during development and after retraining." },
            { icon: "📊", title: "Data Scientists & AI Researchers", desc: "Report standardized F1 scores in experiments and published research." },
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach the F1 score formula with instant, transparent calculations." },
            { icon: "🏆", title: "Kaggle Competitors", desc: "Quickly verify F1-based leaderboard scores from submission confusion matrices." },
            { icon: "💻", title: "Software Engineers", desc: "Validate classifier output during QA before shipping a model to production." },
            { icon: "🔬", title: "Researchers", desc: "Compare balanced model performance across experiments and published baselines." },
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
