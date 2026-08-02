export default function ROCAUCCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a ROC AUC Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>ROC AUC calculator</strong> is a free browser-based tool that computes the <strong>Receiver Operating Characteristic (ROC) curve</strong> and its <strong>Area Under the Curve (AUC)</strong> from binary classification results. AUC is one of the most widely used metrics for evaluating how well a classifier separates positive cases from negative ones, across every possible decision threshold at once.
          </p>
          <p>
            Paste in your actual labels and predicted probabilities — or upload a CSV — and the calculator sorts your data, computes the true positive rate and false positive rate at every threshold, plots the ROC curve, and integrates the area beneath it using the trapezoidal rule.
          </p>
          <p>
            This tool is built for <strong>machine learning engineers, data scientists, AI researchers, students, teachers, Kaggle competitors, software engineers, and business analysts</strong> who need to evaluate a binary classifier without spinning up Python. It runs entirely in your browser, handles large datasets smoothly, and never sends your data to a server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the ROC AUC Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator sorts every sample by predicted probability from highest to lowest, then sweeps the classification threshold from the highest score down to the lowest. At each distinct score, it records the true positive rate (TPR) and false positive rate (FPR) reached so far, tracing out the full ROC curve from (0, 0) to (1, 1).
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p>TPR (Sensitivity) = TP ÷ (TP + FN)</p>
              <p>FPR = FP ÷ (FP + TN)</p>
              <p>AUC = Σ (FPRᵢ − FPRᵢ₋₁) × (TPRᵢ + TPRᵢ₋₁) ÷ 2</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["ROC Curve", "A plot of true positive rate against false positive rate at every possible threshold, showing the full trade-off between catching positives and raising false alarms."],
              ["AUC (Area Under the Curve)", "A single number from 0 to 1 summarizing the entire ROC curve — equivalent to the probability a randomly chosen positive example scores higher than a randomly chosen negative one."],
              ["Diagonal Reference Line", "Represents a random classifier with no discriminative power (AUC = 0.5) — a useful curve should bow well above this line."],
              ["Threshold Explorer", "Lets you pick any specific decision threshold and instantly see the resulting confusion matrix, accuracy, precision, recall, specificity, and F1 score."],
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
          How to Use the ROC AUC Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Add Your Dataset", "Paste rows of actual label (0 or 1) and predicted probability (0–1), or drag and drop a CSV file with those two columns."],
                ["Review Dataset Stats", "Check the total sample count and the positive/negative split shown automatically below the input."],
                ["Read the AUC Score", "The AUC score, rating, and full ROC curve update instantly as you edit your data."],
                ["Explore the Curve", "Hover anywhere on the ROC curve to see the exact threshold, TPR, and FPR at that point."],
                ["Pick a Threshold", "Drag the Threshold Explorer slider to see the confusion matrix and derived metrics at any specific cutoff."],
                ["Export or Copy", "Copy the AUC score or full metrics report, or download the ROC curve data as CSV, TXT, or JSON."],
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
                "Interactive ROC curve with hover tooltips showing threshold, TPR, and FPR",
                "Diagonal random-classifier reference line for visual context",
                "AUC computed via the exact trapezoidal rule, not an approximation",
                "Threshold Explorer with live confusion matrix and derived metrics",
                "Accuracy, precision, recall, specificity, and F1 at any threshold",
                "CSV upload, drag-and-drop, and direct paste support",
                "Automatic header row detection and invalid row reporting",
                "Handles large datasets with chart downsampling for smooth rendering",
                "Random sample dataset generator for quick experimentation",
                "Instant calculation with a 150ms debounce as you type",
                "Export ROC curve data as CSV, TXT, or JSON",
                "Copy the AUC score or the full metrics report to your clipboard",
                "Calculation history — save and review up to 20 past evaluations",
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
              title: "Comparing Two Model Versions",
              scenario: "A machine learning engineer trains two versions of a churn prediction model and pastes each model's predicted probabilities into the calculator separately, comparing their AUC scores to decide which version generalizes better before deployment.",
            },
            {
              title: "Kaggle Competition Model Evaluation",
              scenario: "A Kaggle competitor exports validation-set predictions from a notebook and pastes them into the calculator to get an instant AUC score and ROC curve, without needing to re-run a Python evaluation script for a quick sanity check.",
            },
            {
              title: "Choosing an Operating Threshold",
              scenario: "A data scientist uses the Threshold Explorer to find the specific probability cutoff that balances precision and recall for a fraud detection model, since the default 0.5 threshold rarely matches the actual business cost of false positives versus false negatives.",
            },
            {
              title: "Teaching Classification Metrics",
              scenario: "A machine learning instructor loads a small sample dataset to visually demonstrate how the ROC curve bows away from the diagonal as a classifier improves, making the abstract AUC concept concrete for students.",
            },
            {
              title: "Medical Diagnostic Test Evaluation",
              scenario: "A researcher evaluates how well a diagnostic test's continuous biomarker score distinguishes disease-positive from disease-negative patients, using AUC as a single summary number independent of any single cutoff.",
            },
            {
              title: "Auditing a Third-Party Model's Claims",
              scenario: "A business analyst receives a vendor's classifier output as a CSV of predictions and independently verifies the claimed AUC score using the calculator before trusting the model in production.",
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
                "Use predicted probabilities, not hard 0/1 predictions — ROC AUC needs a continuous score to sweep across thresholds meaningfully.",
                "Check the ROC curve shape, not just the AUC number — two curves can share the same AUC while having very different shapes and practical trade-offs.",
                "On heavily imbalanced datasets, consider a Precision-Recall curve alongside AUC, since ROC AUC can look optimistic when negatives vastly outnumber positives.",
                "Use the Threshold Explorer to pick an operating point that matches your real-world cost of false positives versus false negatives — 0.5 is rarely optimal.",
                "Evaluate AUC on a held-out validation or test set, never on the same data the model was trained on, or the score will be overly optimistic.",
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
                "Don't confuse AUC with accuracy — a model can have high AUC and still perform poorly at a poorly chosen threshold.",
                "Don't compare AUC scores computed on different test sets — the metric depends on the specific data distribution it was measured on.",
                "Don't forget your dataset needs at least one positive and one negative example — AUC is undefined with only one class present.",
                "Don't treat an AUC near 0.5 as 'no signal at all' without checking the curve — sometimes it means the score is inverted, and 1 minus the probability would perform well instead.",
                "Don't rely on AUC alone for imbalanced classification problems — pair it with precision, recall, and F1 score at your chosen threshold.",
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
          AUC Score Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">AUC Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["0.90 – 1.00", "Excellent Classifier", "Strong separation between positive and negative classes"],
                ["0.80 – 0.90", "Good Classifier", "Solid discrimination, suitable for most production use"],
                ["0.70 – 0.80", "Fair Classifier", "Usable but with meaningful overlap between classes"],
                ["0.60 – 0.70", "Poor Classifier", "Weak discrimination, close to random guessing"],
                ["≤ 0.60", "Fails to Discriminate", "Little to no better than random chance (AUC = 0.5)"],
              ].map(([range, rating, interp]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary">{rating}</td>
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
              q: "What is a ROC AUC calculator?",
              a: "A ROC AUC calculator is a free browser-based tool that computes the Receiver Operating Characteristic curve and its Area Under the Curve from binary classification results — your actual labels and predicted probabilities — evaluating how well a model separates positive from negative cases across every threshold.",
            },
            {
              q: "How is ROC AUC calculated?",
              a: "The calculator sorts all samples by predicted probability, sweeps the decision threshold from highest to lowest score, computes the true positive rate and false positive rate at each threshold, and integrates the area under the resulting curve using the trapezoidal rule.",
            },
            {
              q: "What is a good AUC score?",
              a: "0.90 and above is generally considered excellent, 0.80–0.90 good, 0.70–0.80 fair, 0.60–0.70 poor, and 0.50 represents a classifier with no better performance than random guessing. What counts as 'good enough' still depends heavily on your specific application.",
            },
            {
              q: "What is the difference between ROC AUC and accuracy?",
              a: "Accuracy measures performance at a single fixed threshold, usually 0.5, and can be misleading on imbalanced datasets. ROC AUC evaluates performance across every possible threshold at once, making it threshold-independent and generally more informative for comparing classifiers.",
            },
            {
              q: "What does an AUC of exactly 0.5 mean?",
              a: "An AUC of 0.5 means the model performs no better than random guessing — its ROC curve sits directly on the diagonal reference line, with no ability to distinguish positive from negative cases.",
            },
            {
              q: "Can AUC be below 0.5?",
              a: "Yes, though it's uncommon. An AUC below 0.5 usually means the model's predictions are inversely related to the actual outcome — in that case, using 1 minus the predicted probability as your score would produce an AUC above 0.5.",
            },
            {
              q: "What does the Threshold Explorer do?",
              a: "It lets you drag a slider across every possible probability cutoff and instantly see the resulting confusion matrix — true positives, false positives, true negatives, false negatives — along with accuracy, precision, recall, specificity, and F1 score at that specific threshold.",
            },
            {
              q: "How large a dataset can this calculator handle?",
              a: "The calculator computes the exact ROC curve and AUC on your full dataset using an efficient single sorted pass, comfortably handling tens of thousands of rows. The chart automatically downsamples to around 400 points for smooth rendering without affecting the calculated AUC value.",
            },
            {
              q: "Do I need equal numbers of positive and negative examples?",
              a: "No. ROC AUC works with any class balance and only requires at least one positive and one negative example in your dataset to be defined. That said, be aware that ROC curves can look overly optimistic on very imbalanced datasets.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your labels and predicted probabilities are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "🤖", title: "Machine Learning Engineers", desc: "Evaluate and compare binary classifiers during model development and tuning." },
            { icon: "🔬", title: "Data Scientists & AI Researchers", desc: "Report AUC alongside other metrics in model evaluation summaries and papers." },
            { icon: "🏆", title: "Kaggle Competitors", desc: "Quickly cross-check validation predictions without re-running notebook code." },
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach ROC curves and AUC with instant, visual, verifiable results." },
            { icon: "💻", title: "Software Engineers", desc: "Sanity-check classifier performance reported by ML pipelines or third-party APIs." },
            { icon: "📊", title: "Business Analysts", desc: "Interpret and validate model performance claims without needing to write code." },
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
