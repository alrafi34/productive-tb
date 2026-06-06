export default function F1ScoreCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is the F1 Score?</h2>
        <p>
          The F1 score is the harmonic mean of precision and recall. It provides a single metric that balances
          both concerns — how many of your positive predictions were correct (precision) and how many of the
          actual positives your model found (recall).
        </p>
        <p className="mt-3">
          Unlike accuracy, F1 score is not inflated by a large number of true negatives, making it especially
          useful for imbalanced classification problems where one class dominates.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The F1 Formula</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`F1 = 2 × (Precision × Recall) ÷ (Precision + Recall)

Where:
  Precision = TP ÷ (TP + FP)   — of all predicted positives, how many were correct?
  Recall    = TP ÷ (TP + FN)   — of all actual positives, how many were found?

Example: TP = 80, FP = 20, FN = 10
  Precision = 80 ÷ (80 + 20) = 0.80
  Recall    = 80 ÷ (80 + 10) = 0.8889
  F1        = 2 × (0.80 × 0.8889) ÷ (0.80 + 0.8889) = 0.8421  (84.21%)`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use the Harmonic Mean?</h2>
        <p>
          The harmonic mean penalises extreme imbalances between precision and recall. If a model achieves
          100% precision by making very few predictions but 0% recall by missing all positives, the arithmetic
          mean would be 50% — misleadingly high. The harmonic mean yields 0%, correctly reflecting that the
          model is useless.
        </p>
        <pre className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs">
{`Arithmetic mean of 1.0 and 0.0 = 0.50  ← misleading
Harmonic mean   of 1.0 and 0.0 = 0.00  ← correct`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">F1 Score Rating Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">F1 Score</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Rating</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["≥ 0.90  (90%)", "Excellent", "Production-ready — strong balance of precision and recall"],
                ["0.75 – 0.89", "Good", "Suitable for many real-world applications with minor trade-offs"],
                ["0.50 – 0.74", "Moderate", "Acceptable for some tasks; review false positives/negatives"],
                ["< 0.50", "Poor", "Model struggles significantly — investigate data and features"],
              ].map(([score, rating, note]) => (
                <tr key={score} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-mono font-semibold text-gray-900">{score}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-medium">{rating}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">F1 Score vs Accuracy</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Aspect</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">F1 Score</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Uses TN?", "No", "Yes"],
                ["Best for imbalanced data?", "✓ Yes", "✗ No — inflated by majority class"],
                ["Penalises extreme values?", "✓ Yes (harmonic mean)", "✗ No"],
                ["Single metric?", "✓ Yes", "✓ Yes"],
                ["Intuitive?", "Moderate", "High"],
              ].map(([aspect, f1, acc]) => (
                <tr key={aspect} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-700">{aspect}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-green-700 font-medium">{f1}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-600">{acc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a good F1 score?",
              a: "It depends on the problem. For most production ML systems, an F1 score ≥ 0.85 is considered good. For safety-critical domains (medical diagnosis, fraud detection), you may target ≥ 0.90 or higher. For research baselines, 0.75+ is often acceptable.",
            },
            {
              q: "Can F1 score be calculated without a confusion matrix?",
              a: "Yes. If you already know your model's precision and recall values, you can calculate F1 directly: F1 = 2 × (Precision × Recall) ÷ (Precision + Recall). Use the Precision & Recall mode in this calculator.",
            },
            {
              q: "What is macro vs micro F1 score?",
              a: "For multi-class problems, micro F1 aggregates TP/FP/FN across all classes before computing the metric. Macro F1 computes F1 per class then averages them. Macro F1 gives equal weight to all classes; micro F1 is influenced by larger classes.",
            },
            {
              q: "When should I use F1 score over precision or recall alone?",
              a: "Use F1 when both false positives and false negatives carry meaningful cost. If one type of error is much more costly than the other, optimise directly for precision (if FP is costly) or recall (if FN is costly) instead.",
            },
            {
              q: "What is the F-beta score?",
              a: "F-beta is a generalisation of F1 where you can weight precision or recall more heavily. F1 uses β=1 (equal weight). F0.5 weights precision twice as much; F2 weights recall twice as much. This calculator computes the standard F1 (β=1).",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-gray-800 mb-1">{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
