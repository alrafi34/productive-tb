export default function ConfusionMatrixCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a Confusion Matrix?</h2>
        <p>
          A confusion matrix is a table that summarises the performance of a classification model by comparing
          actual labels against predicted labels. For binary classification, it contains four values: True
          Positives (TP), True Negatives (TN), False Positives (FP), and False Negatives (FN).
        </p>
        <p className="mt-3">
          From these four numbers you can derive every standard classification metric — accuracy, precision,
          recall, F1 score, specificity, MCC, and more — giving you a complete picture of how well a model
          performs across both positive and negative classes.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Confusion Matrix Layout</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`                  Predicted Positive    Predicted Negative
Actual Positive        TP (True+)            FN (False-)
Actual Negative        FP (False+)           TN (True-)

TP = Correctly predicted positive
TN = Correctly predicted negative
FP = Incorrectly predicted positive (Type I error)
FN = Incorrectly predicted negative (Type II error)`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Metric Formulas</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Accuracy          = (TP + TN) / (TP + FP + FN + TN)
Precision         = TP / (TP + FP)
Recall            = TP / (TP + FN)
Specificity       = TN / (TN + FP)
F1 Score          = 2 × (Precision × Recall) / (Precision + Recall)
False Positive Rate (FPR) = FP / (FP + TN)
False Negative Rate (FNR) = FN / (FN + TP)
NPV               = TN / (TN + FN)
Balanced Accuracy = (Recall + Specificity) / 2
MCC               = (TP×TN − FP×FN) / √((TP+FP)(TP+FN)(TN+FP)(TN+FN))

Example: TP=90, TN=80, FP=10, FN=20
  Accuracy   = (90 + 80) / 200 = 85.00%
  Precision  = 90 / 100        = 90.00%
  Recall     = 90 / 110        = 81.82%
  F1 Score   = 2×(0.90×0.818)/(0.90+0.818) = 85.71%`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Metric Reference Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Metric</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Formula</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Accuracy",           "(TP+TN)/Total",            "Balanced datasets"],
                ["Precision",          "TP/(TP+FP)",               "When FP is costly (e.g. spam)"],
                ["Recall",             "TP/(TP+FN)",               "When FN is costly (e.g. medical)"],
                ["Specificity",        "TN/(TN+FP)",               "Negative class performance"],
                ["F1 Score",           "2×P×R/(P+R)",              "Imbalanced datasets"],
                ["FPR",                "FP/(FP+TN)",               "ROC curve analysis"],
                ["FNR",                "FN/(FN+TP)",               "Miss rate analysis"],
                ["NPV",                "TN/(TN+FN)",               "Negative prediction reliability"],
                ["Balanced Accuracy",  "(Recall+Specificity)/2",   "Class-imbalanced evaluation"],
                ["MCC",                "(TP×TN−FP×FN)/√(…)",       "Overall quality (−1 to +1)"],
              ].map(([metric, formula, use]) => (
                <tr key={metric} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-semibold text-gray-800">{metric}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-mono text-xs text-gray-600">{formula}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use Each Metric</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Use Accuracy when…</h3>
            <p>Your dataset is balanced (roughly equal class sizes) and all misclassification types carry equal cost.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Use Precision when…</h3>
            <p>False positives are expensive. In spam detection, flagging a legitimate email as spam (FP) damages user trust more than missing a spam email.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Use Recall when…</h3>
            <p>False negatives are dangerous. In cancer screening, missing a true positive (FN) has far greater consequences than a false alarm.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Use F1 Score when…</h3>
            <p>Your dataset is imbalanced and you need a single metric that balances precision and recall equally.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Use MCC when…</h3>
            <p>You want a single comprehensive metric that accounts for all four quadrants of the confusion matrix, especially for heavily imbalanced datasets.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "What does a confusion matrix tell you?",
              a: "It breaks down all prediction outcomes into four categories — TP, TN, FP, FN — letting you see exactly where your model succeeds and where it fails. From these you can calculate every classification metric without needing the raw predictions.",
            },
            {
              q: "What is a good accuracy for a classification model?",
              a: "It depends heavily on the dataset. For balanced datasets, 90%+ is typically good. For heavily imbalanced datasets, accuracy can be misleading — a model predicting the majority class 100% of the time could score 99% accuracy while being completely useless.",
            },
            {
              q: "What is the difference between sensitivity and specificity?",
              a: "Sensitivity (recall) measures how well the model finds actual positives. Specificity measures how well it correctly identifies actual negatives. A good diagnostic test aims for high values of both.",
            },
            {
              q: "Why is MCC considered a better metric than F1?",
              a: "MCC (Matthews Correlation Coefficient) uses all four values of the confusion matrix and is not inflated by class imbalance. F1 ignores true negatives entirely. For datasets where TN is large (common in fraud detection), MCC gives a more balanced assessment.",
            },
            {
              q: "Can I upload predictions directly?",
              a: "Yes. Use the CSV Upload mode and provide a two-column CSV with columns 'actual' and 'predicted'. The calculator parses binary values (1/0) or string labels (positive/negative, yes/no) and builds the confusion matrix automatically.",
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
