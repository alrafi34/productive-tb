export default function ConfusionMatrixAnalyzerSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Confusion Matrix Analyzer?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>confusion matrix analyzer</strong> is a free browser-based tool that evaluates classification model performance by comparing actual labels against predicted labels. It answers the question every model builder needs to answer before shipping: <em>exactly where and how often is my model getting it wrong, and does that matter for my use case?</em>
          </p>
          <p>
            The tool supports both binary classification — enter True Positive, False Positive, False Negative, and True Negative counts directly — and multi-class classification, where you paste raw actual and predicted labels and let the calculator build the full confusion matrix, per-class metrics, and macro/weighted averages automatically.
          </p>
          <p>
            This tool is built for <strong>data scientists, machine learning engineers, AI researchers, students, teachers, Kaggle competitors, business analysts, software engineers, and researchers</strong>. It supports CSV import, an interactive matrix heatmap, and CSV/TXT/JSON export — running entirely in your browser with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Confusion Matrix Analyzer Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            In Manual Counts mode, the calculator applies the standard binary classification formulas directly to your TP, FP, FN, and TN values. In Actual vs. Predicted mode, it builds a full confusion matrix from your raw labels, then derives per-class and aggregate metrics from that matrix.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Accuracy = (TP + TN) ÷ (TP + TN + FP + FN)</p>
              <p>Precision = TP ÷ (TP + FP) &nbsp;·&nbsp; Recall = TP ÷ (TP + FN)</p>
              <p>Specificity = TN ÷ (TN + FP) &nbsp;·&nbsp; F1 = 2PR ÷ (P + R)</p>
              <p>MCC = (TP·TN − FP·FN) ÷ √((TP+FP)(TP+FN)(TN+FP)(TN+FN))</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Automatic Class Detection", "In Actual vs. Predicted mode, every unique label across both lists becomes a class in the matrix — no manual class list configuration required."],
              ["Per-Class Metrics", "For multi-class data, precision, recall, and F1 are calculated separately for every class by treating each class as \"positive\" in turn against all others."],
              ["Macro, Weighted, and Micro Averages", "Macro average treats every class equally; weighted average accounts for how many samples each class has; overall accuracy serves as the micro-averaged score for single-label classification."],
              ["Binary-Specific Metrics", "When exactly two classes are detected, the calculator automatically also computes Specificity, NPV, FPR, FNR, Balanced Accuracy, and MCC using the second class as the positive class."],
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
          How to Use the Confusion Matrix Analyzer
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose an Input Mode", "Select Manual Counts for binary classification with known TP/FP/FN/TN totals, or Actual vs. Predicted Lists for multi-class analysis from raw labels."],
                ["Enter or Import Your Data", "Type your confusion matrix counts, paste two label lists (one label per line), or import a CSV file with Actual and Predicted columns."],
                ["Enable Case-Insensitive Matching if Needed", "Toggle this on if your labels might differ only in capitalization, such as \"Cat\" vs. \"cat\"."],
                ["Review the Confusion Matrix Heatmap", "See exactly how many predictions fell into each actual-vs-predicted combination, with darker cells indicating higher counts."],
                ["Check the Metrics Dashboard", "Review accuracy, precision, recall, F1, and — for binary or two-class data — specificity, MCC, and balanced accuracy, plus a full per-class table for multi-class data."],
                ["Copy or Export", "Copy the metrics summary, download the full report as CSV, TXT, or JSON, or print a formatted report."],
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
                "Binary and multi-class classification support",
                "Manual TP/FP/FN/TN entry, or raw label list analysis",
                "CSV drag-and-drop / file import with Actual, Predicted columns",
                "Automatic unique-class detection for multi-class data",
                "Interactive confusion matrix heatmap",
                "Per-class precision, recall, F1, and support table",
                "Macro and weighted average aggregation",
                "Binary-only metrics: specificity, NPV, FPR, FNR, MCC, balanced accuracy",
                "Optional case-insensitive label matching",
                "Row-count mismatch detection with a clear error message",
                "Instant calculation with a 150ms debounce as you type",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
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
              title: "Evaluating a Binary Fraud Detector",
              scenario: "A fraud analyst enters TP = 90, FP = 8, FN = 5, TN = 120 in Manual Counts mode. The calculator returns Accuracy = 94.17%, Precision = 91.84%, Recall = 94.74%, Specificity = 93.75%, and F1 = 93.27%, giving a full performance snapshot in one view.",
            },
            {
              title: "Analyzing a Multi-Class Animal Classifier",
              scenario: "A data scientist pastes actual labels (Cat, Dog, Dog, Cat, Bird) and predicted labels (Cat, Dog, Cat, Cat, Bird) into Actual vs. Predicted mode, instantly seeing which animal classes get confused with each other in the resulting matrix.",
            },
            {
              title: "Importing Model Output from a CSV Export",
              scenario: "A machine learning engineer exports predictions from their notebook as a CSV with Actual and Predicted columns, imports it directly, and gets the full confusion matrix and metrics without writing any evaluation code.",
            },
            {
              title: "Comparing Balanced Accuracy vs. Raw Accuracy",
              scenario: "A researcher working with an imbalanced medical dataset (TP = 15, FP = 2, FN = 8, TN = 300) compares the deceptively high 95.7% accuracy against the more honest 79.4% balanced accuracy, which properly accounts for the rare positive class.",
            },
            {
              title: "Diagnosing Class Confusion in a Kaggle Submission",
              scenario: "A competitor pastes their validation set's actual and predicted labels to see the per-class F1 breakdown, identifying which specific classes are dragging down their overall macro F1 score before their next submission.",
            },
            {
              title: "Reporting MCC for an Imbalanced Binary Problem",
              scenario: "A business analyst evaluating a rare-event churn model (TP = 12, FP = 3, FN = 18, TN = 467) reports the Matthews Correlation Coefficient of 0.42 alongside accuracy, since MCC gives a more trustworthy single number for this heavily imbalanced case.",
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
                "Use MCC instead of accuracy as your headline metric on imbalanced binary datasets — it accounts for all four confusion matrix cells and is much harder to game.",
                "Check the per-class table, not just macro/weighted averages, when working with multi-class data — a strong overall F1 can still hide one class performing terribly.",
                "Use weighted average when your classes are naturally imbalanced and you care about overall performance; use macro average when every class matters equally regardless of size.",
                "Enable case-insensitive matching if your labels come from different sources that might format the same class differently, like \"Positive\" vs. \"positive\".",
                "Always sanity-check row counts before analyzing — a silent row-count mismatch between Actual and Predicted would otherwise silently misalign every comparison.",
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
                "Don't rely on accuracy alone for imbalanced datasets — a model that always predicts the majority class can score deceptively high accuracy while being practically useless.",
                "Don't forget that Specificity, NPV, FPR, FNR, and MCC are only computed for exactly two classes — for three or more classes, use the per-class precision/recall/F1 table instead.",
                "Don't mix up macro and weighted averages when reporting results — they can tell very different stories on imbalanced data, so specify which one you're citing.",
                "Don't paste mismatched Actual and Predicted lists expecting row-by-row alignment to just work — every row must correspond exactly, in the same order, between both lists.",
                "Don't ignore the confusion matrix heatmap itself — aggregate metrics can mask specific, systematic confusions between particular class pairs that the raw matrix reveals immediately.",
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
          Confusion Matrix Metrics Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Metric</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Measures</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Accuracy", "(TP + TN) ÷ Total", "Overall correctness across all predictions"],
                ["Precision", "TP ÷ (TP + FP)", "How trustworthy positive predictions are"],
                ["Recall", "TP ÷ (TP + FN)", "How many actual positives were found"],
                ["Specificity", "TN ÷ (TN + FP)", "How well actual negatives are identified"],
                ["F1 Score", "2PR ÷ (P + R)", "Balance between precision and recall"],
                ["MCC", "See formula above", "Overall quality accounting for all four cells"],
              ].map(([name, formula, meaning]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{name}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{formula}</td>
                  <td className="py-2.5 px-4 text-gray-700">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a confusion matrix analyzer?",
              a: "A confusion matrix analyzer is a free browser-based tool that evaluates classification model performance by comparing actual and predicted labels, computing accuracy, precision, recall, F1, specificity, and MCC for both binary and multi-class problems.",
            },
            {
              q: "What is a confusion matrix?",
              a: "A confusion matrix is a table comparing actual class labels against predicted class labels, showing exactly how many predictions of each type were correct or incorrect. Binary classification has four cells: True Positive, False Positive, False Negative, and True Negative.",
            },
            {
              q: "How is accuracy different from precision, recall, and F1?",
              a: "Accuracy measures overall correctness across all predictions, including True Negatives. Precision and Recall focus specifically on positive predictions, and F1 balances the two — this distinction matters most on imbalanced datasets where accuracy alone can be misleading.",
            },
            {
              q: "What is Matthews Correlation Coefficient (MCC)?",
              a: "MCC is a balanced metric from -1 to +1 that accounts for all four confusion matrix values simultaneously, making it more reliable than accuracy or F1 alone for imbalanced binary classification. +1 means perfect prediction, 0 means no better than random guessing, and -1 means total disagreement.",
            },
            {
              q: "How do I analyze multi-class classification results?",
              a: "Switch to Actual vs. Predicted Lists mode and paste your actual and predicted labels, one per line, matched by row order. The calculator automatically detects every unique class, builds the full confusion matrix, and computes per-class and aggregate metrics.",
            },
            {
              q: "What is the difference between macro and weighted averages?",
              a: "Macro average computes the metric per class and takes the unweighted mean, treating every class equally. Weighted average weights each class by its number of samples (support), better reflecting performance on imbalanced datasets.",
            },
            {
              q: "Can I upload a CSV instead of typing labels?",
              a: "Yes. Import a CSV file with \"Actual\" and \"Predicted\" columns (case-insensitive header matching), and the calculator automatically extracts and loads both label lists.",
            },
            {
              q: "What happens if my Actual and Predicted lists have different lengths?",
              a: "The calculator immediately shows an error stating exactly how many rows each list contains, since a valid confusion matrix requires every prediction to be matched to exactly one actual label in the same order.",
            },
            {
              q: "What do Specificity, NPV, FPR, and FNR mean?",
              a: "Specificity measures how well actual negatives are correctly identified. NPV measures how many negative predictions were actually correct. FPR and FNR are the complements of Specificity and Recall, representing the model's error rates on negatives and positives respectively.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your classification data, whether typed, pasted, or uploaded as a CSV, is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "🤖", title: "Machine Learning Engineers", desc: "Diagnose model errors and validate performance before production deployment." },
            { icon: "📊", title: "Data Scientists & AI Researchers", desc: "Generate standardized classification reports for experiments and publications." },
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach confusion matrix concepts with instant, interactive examples." },
            { icon: "🏆", title: "Kaggle Competitors", desc: "Quickly diagnose which classes are being confused in a multi-class submission." },
            { icon: "💼", title: "Business Analysts", desc: "Translate model output into plain metrics stakeholders can act on." },
            { icon: "💻", title: "Software Engineers", desc: "Validate classifier behavior during QA before shipping to production." },
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
