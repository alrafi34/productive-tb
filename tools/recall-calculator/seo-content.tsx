export default function RecallCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Recall Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>recall calculator</strong> is a free browser-based tool that computes the <strong>Recall</strong> metric (also called <strong>Sensitivity</strong> or the <strong>True Positive Rate</strong>) used to evaluate classification models. Recall answers a specific question: <em>of all the actual positive cases that existed, how many did the model successfully find?</em>
          </p>
          <p>
            Enter your True Positive (TP) and False Negative (FN) counts — or switch to Confusion Matrix mode to enter a full TP / FP / FN / TN breakdown — and the calculator instantly returns the recall score, its percentage, a performance rating, and a complete formula breakdown.
          </p>
          <p>
            This tool is built for <strong>machine learning engineers, data scientists, AI researchers, students, professors, business analysts, data analysts, software engineers, and interview candidates</strong> who need an instant, accurate recall calculation without spinning up Python or a spreadsheet. It runs entirely in your browser — no data is ever sent to a server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Recall Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Recall divides the number of correctly identified positive cases (True Positives) by the total number of actual positive cases — the True Positives that were caught, plus the False Negatives that were missed.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Recall</span> = TP ÷ (TP + FN)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["True Positive Rate", "The same value as Recall — the proportion of actual positives that were correctly identified."],
              ["Confusion Matrix Mode", "Optionally enter False Positive and True Negative counts alongside TP and FN to see the full confusion matrix and bonus precision/accuracy context."],
              ["Performance Rating", "Every result is automatically classified from Poor to Excellent based on standard recall benchmarks."],
              ["Zero-Denominator Guard", "If TP and FN are both zero, recall is undefined — the calculator detects this and explains why instead of showing a misleading number."],
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
          How to Use the Recall Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose an Input Mode", "Use TP / FN for a quick calculation, or switch to Confusion Matrix mode to also enter False Positive and True Negative counts."],
                ["Enter True Positive Count", "Type the number of actual positive cases your model correctly identified."],
                ["Enter False Negative Count", "Type the number of actual positive cases your model missed and predicted as negative."],
                ["Choose an Output Format", "Select Decimal, Percentage, or Both to control how the result is displayed."],
                ["Adjust Decimal Precision", "Choose how many decimal places to round the result to, from 0 up to 5 places."],
                ["Read the Live Result", "Recall, its percentage, the circular progress indicator, rating, and full breakdown update instantly as you type."],
                ["Export or Share", "Copy the result, download it as CSV, TXT, or JSON, print it, or share a URL with your inputs encoded."],
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
                "Simple TP/FN mode and full Confusion Matrix mode in one tool",
                "Circular progress ring and linear progress bar visualization",
                "Automatic performance rating from Poor to Excellent Recall",
                "Bonus precision and accuracy context in Confusion Matrix mode",
                "Decimal, percentage, or combined output formatting",
                "Adjustable decimal precision (0–5 places)",
                "Full calculation breakdown shown for transparency",
                "Quick example presets for common scenarios",
                "Instant calculation with a 150ms debounce as you type",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past results",
                "Validation that blocks a zero TP + FN denominator",
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
              title: "Disease Screening Test",
              scenario: "A medical researcher evaluates a screening test that correctly identified 950 of 1,000 actual disease cases, missing 50. With TP = 950 and FN = 50, the calculator returns a recall of 95%, meaning the test catches the vast majority of true cases — critical when missing a diagnosis carries a high cost.",
            },
            {
              title: "Fraud Detection Model",
              scenario: "A data scientist reviews a fraud model that correctly flagged 12 of 15 actual fraudulent transactions, missing 3. With TP = 12 and FN = 3, recall comes out to 80%, prompting the team to investigate why one in five fraud cases slips through.",
            },
            {
              title: "Spam Filter Evaluation",
              scenario: "An engineer checks a spam filter that correctly caught 80 of 100 actual spam emails, letting 20 through to the inbox. The calculator shows an 80% recall, helping the team decide whether to tighten the filter's sensitivity.",
            },
            {
              title: "Interview Preparation",
              scenario: "A job candidate preparing for a machine learning interview uses the calculator to quickly verify manual recall calculations across several practice confusion matrices, confirming their understanding of the formula.",
            },
            {
              title: "Search Relevance Evaluation",
              scenario: "An engineer measures how many truly relevant documents a search algorithm returned out of all relevant documents that exist in the corpus, using recall to quantify how much relevant content the system is missing.",
            },
            {
              title: "Cybersecurity Threat Detection",
              scenario: "A security analyst evaluates an intrusion detection system, using recall to understand what percentage of actual attacks were successfully flagged versus how many slipped through undetected.",
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
                "Prioritize recall over precision when missing a true positive is costlier than a false alarm — disease screening and fraud detection are classic examples.",
                "Use Confusion Matrix mode when you have the full breakdown — it gives you precision and accuracy as free bonus context alongside recall.",
                "Report recall alongside precision and F1 score, not alone — a model can reach 100% recall by flagging everything as positive, which is rarely useful on its own.",
                "Compare recall across model versions using the same test set — recall calculated on different data isn't directly comparable.",
                "Use the presets to sanity-check your mental math before trusting a manually calculated recall value in a report or interview.",
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
                "Don't confuse recall with precision — recall is about not missing positives (TP ÷ (TP + FN)), precision is about not raising false alarms (TP ÷ (TP + FP)).",
                "Don't optimize for recall alone — a model that predicts positive for every case reaches 100% recall but is practically useless.",
                "Don't forget that False Negative counts actual positives the model missed, not incorrect positive predictions — that's False Positive instead.",
                "Don't compare recall scores across imbalanced datasets without also checking the class distribution — recall alone can be misleading on rare-event problems.",
                "Don't report recall without also stating the sample size — 100% recall on 3 examples means far less than 95% recall on 1,000 examples.",
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
          Recall Performance Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Recall Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["90–100%", "Excellent Recall", "Model catches nearly all actual positive cases"],
                ["75–89%", "Good Recall", "Model catches most positive cases, some missed"],
                ["50–74%", "Moderate Recall", "Model misses a substantial share of positives"],
                ["Below 50%", "Poor Recall", "Model misses more positives than it catches"],
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
              q: "What is a recall calculator?",
              a: "A recall calculator is a free browser-based tool that computes the Recall metric (also called Sensitivity or True Positive Rate) used to evaluate classification models — the proportion of actual positive cases that were correctly identified — from your True Positive and False Negative counts.",
            },
            {
              q: "How is recall calculated?",
              a: "Recall equals True Positive divided by the sum of True Positive and False Negative: Recall = TP ÷ (TP + FN). For example, with TP = 80 and FN = 20, recall is 80 ÷ 100 = 0.80, or 80%.",
            },
            {
              q: "What is a good recall score?",
              a: "It depends on your application: 90% and above is generally considered excellent, 75–89% good, 50–74% moderate, and below 50% poor. High-stakes applications like disease screening or fraud detection typically demand recall above 90%, since missing a true positive is costly.",
            },
            {
              q: "What is the difference between recall and precision?",
              a: "Recall measures how many of the actual positive cases your model successfully found (TP ÷ (TP + FN)), focused on avoiding missed detections. Precision measures how many of your model's positive predictions were actually correct (TP ÷ (TP + FP)), focused on avoiding false alarms. A model can have high recall but low precision, or vice versa.",
            },
            {
              q: "What happens if TP and FN are both zero?",
              a: "The calculator can't divide by zero, so it displays a message explaining that recall cannot be calculated because TP + FN equals zero — this happens when there were no actual positive cases in your evaluation set at all.",
            },
            {
              q: "When should I prioritize recall over precision?",
              a: "Prioritize recall when missing a true positive is the bigger risk — for example, failing to detect a disease, a genuine fraud case, or a security threat. Prioritize precision instead when false positives are costly, such as a spam filter wrongly flagging important emails.",
            },
            {
              q: "What does Confusion Matrix mode add?",
              a: "Confusion Matrix mode lets you enter False Positive and True Negative counts alongside TP and FN, displaying the full 2×2 confusion matrix and adding precision and accuracy as bonus context alongside your recall result.",
            },
            {
              q: "How do I interpret a recall of 0.80 or 80%?",
              a: "A recall of 80% means that out of every 100 actual positive cases, your model correctly identified 80 and missed 20. Whether that's acceptable depends entirely on the cost of a missed positive in your specific application.",
            },
            {
              q: "Can recall be used outside of machine learning?",
              a: "Yes — the same TP ÷ (TP + FN) formula applies anywhere you're evaluating how completely a detection system finds actual positive cases, including medical screening, search relevance, quality control, and information retrieval.",
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

      {/* ── 7. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🤖", title: "Machine Learning Engineers", desc: "Evaluate classification model performance during development and tuning." },
            { icon: "🔬", title: "Data Scientists & AI Researchers", desc: "Report recall alongside precision and F1 score in model evaluation summaries." },
            { icon: "🎓", title: "Students & Professors", desc: "Learn and teach classification metrics with instant, verifiable calculations." },
            { icon: "📊", title: "Business & Data Analysts", desc: "Interpret model performance reports without needing to run code." },
            { icon: "💻", title: "Software Engineers", desc: "Quickly sanity-check recall values reported by ML pipelines or third-party APIs." },
            { icon: "💼", title: "Interview Candidates", desc: "Practice and verify manual recall calculations ahead of technical interviews." },
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
