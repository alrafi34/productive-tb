export default function PrecisionRecallCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How the Precision Recall Calculator Works</h2>
        <p>
          This tool computes the core classification evaluation metrics used in machine learning and AI:
          precision, recall, F1 score, accuracy, and specificity — directly from the four values of a binary
          confusion matrix (TP, FP, FN, TN). All calculations run instantly in your browser with no data uploaded.
        </p>
        <p className="mt-3">
          Enter your confusion matrix values and every metric updates in real time. Toggle the formula panel
          to see the step-by-step calculation for each metric.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Confusion Matrix</h2>
        <div className="overflow-x-auto">
          <table className="text-sm border-collapse mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-3 border border-gray-200 bg-gray-50"></th>
                <th className="px-4 py-3 border border-gray-200 bg-gray-50 font-semibold text-gray-700">Predicted Positive</th>
                <th className="px-4 py-3 border border-gray-200 bg-gray-50 font-semibold text-gray-700">Predicted Negative</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 border border-gray-200 bg-gray-50 font-semibold text-gray-700">Actual Positive</td>
                <td className="px-4 py-3 border border-gray-200 text-center font-bold text-green-700 bg-green-50">TP<br/><span className="font-normal text-xs">True Positive</span></td>
                <td className="px-4 py-3 border border-gray-200 text-center font-bold text-red-600 bg-red-50">FN<br/><span className="font-normal text-xs">False Negative</span></td>
              </tr>
              <tr>
                <td className="px-4 py-3 border border-gray-200 bg-gray-50 font-semibold text-gray-700">Actual Negative</td>
                <td className="px-4 py-3 border border-gray-200 text-center font-bold text-orange-600 bg-orange-50">FP<br/><span className="font-normal text-xs">False Positive</span></td>
                <td className="px-4 py-3 border border-gray-200 text-center font-bold text-green-700 bg-green-50">TN<br/><span className="font-normal text-xs">True Negative</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="mt-4 space-y-1 list-disc list-inside">
          <li><strong>TP (True Positive):</strong> Model correctly predicted Positive</li>
          <li><strong>FP (False Positive):</strong> Model predicted Positive, but actual was Negative (Type I error)</li>
          <li><strong>FN (False Negative):</strong> Model predicted Negative, but actual was Positive (Type II error)</li>
          <li><strong>TN (True Negative):</strong> Model correctly predicted Negative</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Formulas</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Precision    = TP ÷ (TP + FP)
Recall       = TP ÷ (TP + FN)        [also called Sensitivity]
F1 Score     = 2 × (Precision × Recall) ÷ (Precision + Recall)
Accuracy     = (TP + TN) ÷ (TP + FP + FN + TN)
Specificity  = TN ÷ (TN + FP)        [also called True Negative Rate]
NPV          = TN ÷ (TN + FN)        [Negative Predictive Value]
FPR          = FP ÷ (FP + TN)        [False Positive Rate = 1 - Specificity]
FNR          = FN ÷ (FN + TP)        [False Negative Rate = 1 - Recall]
MCC          = (TP×TN − FP×FN) ÷ √((TP+FP)(TP+FN)(TN+FP)(TN+FN))`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Metric Reference Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Metric</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Answers</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Best used when</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Precision", "Of all positive predictions, how many were correct?", "False positives are costly (e.g. spam filter)"],
                ["Recall", "Of all actual positives, how many were found?", "False negatives are costly (e.g. cancer screening)"],
                ["F1 Score", "Balanced trade-off between precision and recall", "Imbalanced datasets where both FP and FN matter"],
                ["Accuracy", "Of all predictions, how many were correct?", "Balanced datasets with equal class distribution"],
                ["Specificity", "Of all actual negatives, how many were correctly identified?", "Minimising false alarms"],
                ["MCC", "Overall quality of binary classifier, range -1 to +1", "Imbalanced datasets — more informative than accuracy"],
              ].map(([m, a, u]) => (
                <tr key={m} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-semibold text-gray-800">{m}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-600">{a}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Precision vs Recall Trade-off</h2>
        <p>
          Precision and recall are inversely related in most classifiers. Increasing the decision threshold
          raises precision (fewer false positives) but lowers recall (more false negatives). The optimal
          balance depends on your application:
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li><strong>Medical diagnosis:</strong> maximise recall — missing a disease is far worse than a false alarm.</li>
          <li><strong>Spam detection:</strong> maximise precision — blocking legitimate email is more disruptive than missing spam.</li>
          <li><strong>Search ranking:</strong> precision@k matters more than overall recall for top results.</li>
          <li><strong>Fraud detection:</strong> recall is critical — missing fraud is expensive; false alerts are manageable.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "What is the difference between precision and recall?",
              a: "Precision answers: of all predictions labeled positive, how many were correct? Recall answers: of all actual positives in the dataset, how many did the model identify? A model can have high precision with low recall (conservative) or high recall with low precision (aggressive).",
            },
            {
              q: "When should I use F1 score instead of accuracy?",
              a: "Use F1 when your dataset is imbalanced. If 95% of samples are class 0, a model predicting class 0 always achieves 95% accuracy but is completely useless. F1 balances precision and recall and is not inflated by a dominant class.",
            },
            {
              q: "What is MCC (Matthews Correlation Coefficient)?",
              a: "MCC is a correlation coefficient between actual and predicted binary classifications. It ranges from -1 (inverse prediction) to +1 (perfect prediction), with 0 representing random prediction. It is considered the most informative single metric for binary classification on imbalanced data.",
            },
            {
              q: "What does a False Positive mean?",
              a: "A False Positive (Type I error) occurs when the model predicts Positive but the true label is Negative. In spam detection: a legitimate email flagged as spam. In medical testing: a healthy patient testing positive for a disease.",
            },
            {
              q: "Can this calculator handle multi-class classification?",
              a: "This tool is designed for binary classification (one positive class vs one negative class). For multi-class problems, compute per-class TP/FP/FN/TN using a one-vs-rest approach and then macro/micro average the metrics.",
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
