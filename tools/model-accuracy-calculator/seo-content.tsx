export default function ModelAccuracyCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How the Model Accuracy Calculator Works</h2>
        <p>
          Model accuracy is the simplest and most widely used evaluation metric for classification tasks in machine
          learning. It measures the fraction of predictions that exactly match the actual (true) labels.
          This tool calculates accuracy instantly in your browser — no data is uploaded anywhere.
        </p>
        <p className="mt-3">
          Paste your actual labels and predicted labels as comma-separated values, or upload a two-column CSV file
          with <code className="bg-gray-100 px-1 rounded font-mono text-xs">actual,predicted</code> columns.
          The tool compares them element-by-element and shows the accuracy score, per-class breakdown, and a
          side-by-side comparison table.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Formula</h2>
        <pre className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Accuracy = (Correct Predictions ÷ Total Predictions) × 100

Example:
  Actual:    [1, 1, 0, 1, 0]
  Predicted: [1, 0, 0, 1, 0]
  Matches:    ✓  ✗  ✓  ✓  ✓  → 4 correct out of 5

  Accuracy = (4 ÷ 5) × 100 = 80.00%`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy Performance Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Accuracy</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Rating</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Context</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["≥ 90%", "Excellent", "Production-grade — suitable for most real-world applications"],
                ["75–89%", "Good", "Useful model — may need fine-tuning for critical tasks"],
                ["50–74%", "Moderate", "Better than random for binary, but likely needs improvement"],
                ["< 50%", "Poor", "Worse than random guessing for binary classification"],
              ].map(([acc, rating, ctx]) => (
                <tr key={acc} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-mono font-semibold text-gray-900">{acc}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-medium">{rating}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{ctx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Supported Input Formats</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Format</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Example</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Parsed as</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Comma-separated", "1,0,1,1,0", "[1, 0, 1, 1, 0]"],
                ["Newline-separated", "1\\n0\\n1\\n1", "[1, 0, 1, 1]"],
                ["Tab-separated", "1\\t0\\t1\\t1", "[1, 0, 1, 1]"],
                ["Bare binary run", "10110", "[1, 0, 1, 1, 0]"],
                ["Text labels", "cat,dog,cat,bird", "[cat, dog, cat, bird]"],
                ["CSV upload", "actual,predicted\\n1,1\\n0,1", "Two columns parsed automatically"],
              ].map(([fmt, ex, parsed]) => (
                <tr key={fmt} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-medium text-gray-800">{fmt}</td>
                  <td className="px-4 py-2.5 border border-gray-200 font-mono text-xs">{ex}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{parsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When Accuracy Is Not Enough</h2>
        <p>
          Accuracy is intuitive but can be misleading on imbalanced datasets. If 95% of your data belongs
          to one class, a model that always predicts that class achieves 95% accuracy while being completely
          useless. In such cases, consider:
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li><strong>Precision:</strong> Of all positive predictions, how many were actually positive?</li>
          <li><strong>Recall:</strong> Of all actual positives, how many were correctly identified?</li>
          <li><strong>F1 Score:</strong> Harmonic mean of precision and recall — good for imbalanced data.</li>
          <li><strong>ROC-AUC:</strong> Area under the ROC curve — model-wide performance across thresholds.</li>
          <li><strong>Confusion Matrix:</strong> Full breakdown of TP, TN, FP, FN across all classes.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "What is model accuracy in machine learning?",
              a: "Model accuracy is the percentage of predictions that match the true labels in a test dataset. It is calculated as (correct predictions ÷ total predictions) × 100. It is the most commonly reported metric for classification tasks.",
            },
            {
              q: "What is a good accuracy for a machine learning model?",
              a: "It depends heavily on the problem. For balanced binary classification, 90%+ is typically excellent. For highly imbalanced datasets (e.g. fraud detection where 0.1% are fraudulent), even 99.9% accuracy can be meaningless — the model might just be predicting the majority class.",
            },
            {
              q: "How do I calculate accuracy for multi-class classification?",
              a: "The formula is identical: count how many predictions exactly match the actual label, divide by total, and multiply by 100. This tool automatically handles multi-class labels — just paste your actual and predicted lists with matching length.",
            },
            {
              q: "What is the difference between training accuracy and test accuracy?",
              a: "Training accuracy is measured on the data used to train the model. Test accuracy is measured on held-out data the model has never seen. Test accuracy is the meaningful metric — high training accuracy with low test accuracy indicates overfitting.",
            },
            {
              q: "Does this tool support uploading CSV files?",
              a: "Yes. Switch to CSV mode and upload a .csv or .txt file with two columns named 'actual' and 'predicted'. The tool parses the file locally in your browser — no data is uploaded to any server.",
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
