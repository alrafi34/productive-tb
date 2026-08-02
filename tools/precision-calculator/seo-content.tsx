export default function PrecisionCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Precision Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>precision calculator</strong> is a free browser-based tool that computes the Precision metric used to evaluate classification models in machine learning, information retrieval, medical diagnostics, and fraud detection. It answers a core question every model evaluator asks: <em>of everything my model flagged as positive, how much did it actually get right?</em>
          </p>
          <p>
            Precision is easy to define but easy to misinterpret without context — a high precision alone doesn't tell you how many real positives were missed (that's recall's job). This calculator takes your True Positive and False Positive counts and instantly returns the precision score, its percentage, a performance rating, and the full formula substitution.
          </p>
          <p>
            This tool is built for <strong>machine learning engineers, data scientists, AI researchers, students, teachers, software engineers, healthcare analysts, fraud detection teams, and business intelligence analysts</strong>. It supports adjustable decimal precision, decimal/percentage/both output formats, shareable calculation URLs, and CSV/TXT/JSON export — running entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Precision Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator divides your True Positive count by the sum of True Positive and False Positive, then converts the result to a percentage and a plain-language performance rating.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Precision</span> = TP ÷ (TP + FP)</p>
              <p>Precision % = Precision × 100</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["True Positive (TP)", "The number of cases your model correctly predicted as positive — a correctly caught spam email, a correctly flagged fraudulent transaction, a correctly diagnosed condition."],
              ["False Positive (FP)", "The number of cases your model incorrectly predicted as positive — a legitimate email wrongly flagged as spam, a valid transaction wrongly flagged as fraud."],
              ["Division by Zero Handling", "If both TP and FP are zero, the calculator clearly explains that precision can't be computed, since your model made no positive predictions at all."],
              ["Performance Rating", "The percentage result is automatically classified from Needs Improvement to Excellent, giving instant context to the raw number."],
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
          How to Use the Precision Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter True Positive Count", "Type the number of correct positive predictions your model made, based on your confusion matrix or evaluation results."],
                ["Enter False Positive Count", "Type the number of incorrect positive predictions — cases your model flagged as positive that were actually negative."],
                ["Choose an Output Format", "Select Decimal, Percentage, or Both depending on how you need to report the result."],
                ["Adjust Decimal Precision", "Choose how many decimal places to display, from 0 to 5, to match the precision your reporting requires."],
                ["Review the Live Result", "The precision score, percentage, performance rating, and full calculation steps update instantly as you type."],
                ["Copy, Export, or Share", "Copy the full report, download it as CSV, TXT, or JSON, print it, or copy a shareable URL with your inputs encoded."],
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
                "Instant precision calculation with a 150ms debounce as you type",
                "Decimal, percentage, or both output formats",
                "Automatic performance rating from Needs Improvement to Excellent",
                "Full formula breakdown with substituted values",
                "Adjustable decimal precision from 0 to 5 places",
                "Quick example presets for spam filtering, fraud detection, and medical screening",
                "Clear division-by-zero handling with a plain-language explanation",
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
              scenario: "An engineer tests a spam filter that correctly flagged 90 spam emails (TP) but wrongly flagged 10 legitimate emails as spam (FP). Precision = 90 ÷ 100 = 90%, rated Very High, meaning 9 out of 10 flagged emails are truly spam.",
            },
            {
              title: "Assessing a Fraud Detection Model",
              scenario: "A fraud team's model correctly identifies 250 fraudulent transactions (TP) but incorrectly flags 50 legitimate transactions as fraud (FP). Precision = 250 ÷ 300 ≈ 83.33%, rated High — reasonably reliable, but the false positives may still frustrate customers.",
            },
            {
              title: "Medical Screening Test Accuracy",
              scenario: "A healthcare analyst reviews a diagnostic test that correctly identified 15 true cases (TP) with 5 false alarms (FP). Precision = 15 ÷ 20 = 75%, rated Good, prompting a discussion about whether that false alarm rate is acceptable for the condition being screened.",
            },
            {
              title: "Comparing Two Model Versions",
              scenario: "A data scientist compares Model A (TP = 120, FP = 8, precision ≈ 93.75%) against Model B (TP = 135, FP = 25, precision ≈ 84.4%) to decide which version to deploy when minimizing false positives matters most.",
            },
            {
              title: "Search Ranking Relevance Check",
              scenario: "A search engineer evaluates how many of the top 100 results returned as \"relevant\" (TP + FP) were actually relevant (TP = 82, FP = 18), getting a precision of 82% to benchmark against a previous ranking algorithm.",
            },
            {
              title: "Customer Churn Prediction Review",
              scenario: "A business analyst checks a churn prediction model that flagged 60 customers as \"at risk\" (TP = 45, FP = 15), getting 75% precision — informing how much the retention team should trust each flagged customer before spending outreach budget.",
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
                "Always report precision alongside recall — a model can hit 100% precision by making only one very safe positive prediction, which tells you nothing about its overall usefulness.",
                "Use the F1 score when you need a single number balancing both precision and recall, especially when your classes are imbalanced.",
                "Set your decision threshold based on the real-world cost of a false positive versus a false negative for your specific use case, not a default 0.5 cutoff.",
                "Track precision over time as you retrain your model — a sudden drop often signals data drift or a labeling issue in your training set.",
                "When comparing two models, make sure you're evaluating both on the same test set and threshold, since precision is sensitive to both.",
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
                "Don't confuse precision with accuracy — accuracy considers all four confusion matrix cells (TP, TN, FP, FN), while precision only looks at predicted positives.",
                "Don't optimize for precision alone on an imbalanced dataset — a model that rarely predicts positive can achieve high precision while missing most real positive cases (low recall).",
                "Don't forget that precision says nothing about False Negatives — a model can have excellent precision and still miss the majority of true positive cases.",
                "Don't compare precision scores across models evaluated on different test sets or different class distributions — the numbers aren't directly comparable.",
                "Don't treat a single precision number as the full picture — always pair it with recall, and consider the real business cost of each type of error.",
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
          Precision Performance Rating Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Precision Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["95% – 100%", "Excellent"],
                ["90% – 94%", "Very High"],
                ["80% – 89%", "High"],
                ["70% – 79%", "Good"],
                ["60% – 69%", "Moderate"],
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
        <p className="text-xs text-gray-400 mt-3">* These ranges are general guidance. What counts as an acceptable precision score depends heavily on your specific application and the cost of a false positive.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a precision calculator?",
              a: "A precision calculator is a free browser-based tool that computes the Precision metric — the proportion of predicted positive results that are actually correct — from True Positive and False Positive counts, used to evaluate classification models.",
            },
            {
              q: "How is precision calculated?",
              a: "Precision equals True Positive divided by the sum of True Positive and False Positive: Precision = TP ÷ (TP + FP). For example, TP = 90 and FP = 10 gives a precision of 0.90, or 90%.",
            },
            {
              q: "What is a good precision score?",
              a: "95% and above is generally considered excellent, 90–94% very high, 80–89% high, and 70–79% good. What's actually acceptable depends on your application — high-stakes fields like medical diagnosis or fraud detection typically require higher precision.",
            },
            {
              q: "What is the difference between precision and recall?",
              a: "Precision measures how many predicted positives were actually correct (TP ÷ (TP + FP)). Recall measures how many actual positives were successfully found (TP ÷ (TP + FN)). A model can be high in one and low in the other, which is why both are usually reported together.",
            },
            {
              q: "How do I calculate precision using this tool?",
              a: "Enter your True Positive and False Positive counts, and the precision, percentage, and performance rating update instantly — no calculate button required, though one is available for accessibility.",
            },
            {
              q: "What if my TP and FP are both zero?",
              a: "The calculator shows a clear message that precision cannot be calculated, since dividing by TP + FP = 0 is undefined — this happens when your model made no positive predictions at all.",
            },
            {
              q: "Can precision be used outside machine learning?",
              a: "Yes. The same formula applies to search relevance, medical screening tests, quality control inspection, and any scenario evaluating how many flagged/predicted items were actually correct.",
            },
            {
              q: "Why is my precision high but my model still performs poorly overall?",
              a: "High precision alone doesn't guarantee good performance — your model might be missing many true positives (low recall) by only predicting positive when it's very confident. Always evaluate precision together with recall and, ideally, the F1 score.",
            },
            {
              q: "Can I use this calculator for a full confusion matrix breakdown?",
              a: "This calculator focuses specifically on Precision from TP and FP. For a complete evaluation including True Negative, False Negative, recall, F1 score, and accuracy, use the dedicated Confusion Matrix Analyzer or Recall Calculator.",
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
            { icon: "🤖", title: "Machine Learning Engineers", desc: "Evaluate classification model performance during development and after retraining." },
            { icon: "📊", title: "Data Scientists & AI Researchers", desc: "Report standardized precision metrics in experiments and published research." },
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach the precision formula with instant, transparent calculations." },
            { icon: "💻", title: "Software Engineers", desc: "Validate classifier output during QA before shipping a model to production." },
            { icon: "🏥", title: "Healthcare Analysts", desc: "Assess diagnostic test reliability by quantifying false-positive rates." },
            { icon: "🕵️", title: "Fraud Detection Teams", desc: "Balance fraud catch rate against the cost of flagging legitimate transactions." },
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
