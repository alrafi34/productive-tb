export default function DatasetSplitCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a Dataset Split?</h2>
        <p>
          A dataset split divides your labeled data into separate subsets before training a machine learning
          model. The training set teaches the model, the validation set guides tuning, and the test set
          provides an unbiased final evaluation. Keeping these subsets separate prevents data leakage and
          ensures that reported metrics reflect real-world performance.
        </p>
        <p className="mt-3">
          The most common split strategies are a simple train/test two-way split and a train/validation/test
          three-way split. The right choice depends on your dataset size, the type of model, and how much
          hyperparameter tuning is involved.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Split Formulas</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Training Count    = round(dataset_size × train_pct / 100)
Validation Count  = round(dataset_size × val_pct   / 100)
Testing Count     = dataset_size − Training Count − Validation Count

Example: dataset = 12,345 · split = 75 / 10 / 15
  Train = round(12345 × 75 / 100) = round(9258.75) = 9259
  Val   = round(12345 × 10 / 100) = round(1234.5)  = 1235
  Test  = 12345 − 9259 − 1235                      = 1851
  Total = 9259 + 1235 + 1851 = 12,345 ✓`}
        </pre>
        <p className="mt-3">
          The test set absorbs any rounding remainder, which guarantees the three counts always sum exactly
          to the original dataset size without losing or duplicating a single sample.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ratio to Percentage Conversion</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Ratio "8:2"
  Total parts  = 8 + 2 = 10
  Train %      = 8 / 10 × 100 = 80%
  Test  %      = 2 / 10 × 100 = 20%

Ratio "7:1.5:1.5"
  Total parts  = 7 + 1.5 + 1.5 = 10
  Train %      = 7   / 10 × 100 = 70%
  Val   %      = 1.5 / 10 × 100 = 15%
  Test  %      = 1.5 / 10 × 100 = 15%`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Split Strategies</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Split</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Type</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["80/20", "2-way", "Standard baseline — most tutorials and benchmarks"],
                ["70/30", "2-way", "Smaller datasets where more test data improves confidence"],
                ["90/10", "2-way", "Very large datasets with millions of samples"],
                ["70/15/15", "3-way", "Deep learning with active hyperparameter search"],
                ["80/10/10", "3-way", "Large datasets with moderate tuning needs"],
                ["60/20/20", "3-way", "Small to medium datasets needing robust validation"],
              ].map(([split, type, use]) => (
                <tr key={split} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-mono font-semibold text-gray-800">{split}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{type}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-500">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choosing the Right Split</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Small datasets (under 1,000 samples)</h3>
            <p>
              Fixed splits are unreliable at small sample counts. Use k-fold cross-validation instead.
              If a fixed split is required, keep training data at 80% or higher and be aware that
              test-set metrics will have wide confidence intervals.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Medium datasets (1K – 100K samples)</h3>
            <p>
              The 70/15/15 and 80/10/10 three-way splits work well here. With at least 1,000 test samples
              you can compute meaningful accuracy, F1 score, and AUC-ROC values.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Large datasets (100K+ samples)</h3>
            <p>
              You can safely use 90/5/5 or even 95/5 splits because even 5% of 1 million rows is 50,000
              samples — more than enough for statistically sound evaluation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Do you need a validation set?</h3>
            <p>
              You need a separate validation set whenever you perform any hyperparameter tuning, early
              stopping, or model selection. If you train a single model with fixed hyperparameters, a
              simple train/test split is sufficient.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "What is the difference between validation and test sets?",
              a: "The validation set is used during model development — it helps you tune hyperparameters, select architectures, and stop training early. The test set is held out completely until after all tuning is done and provides a final, unbiased performance estimate.",
            },
            {
              q: "Why doesn't the split always add up exactly?",
              a: "When the dataset size isn't perfectly divisible by the percentages, rounding produces fractional samples that must be truncated. This calculator uses the largest-remainder method: it rounds training and validation counts to the nearest integer, then assigns any remaining samples to the test set, so totals always match exactly.",
            },
            {
              q: "What is stratified splitting?",
              a: "Stratified splitting preserves the original class distribution in each subset. If your dataset is 70% negative and 30% positive, each split will maintain that same ratio. This is especially important for imbalanced classification datasets and is available in scikit-learn via StratifiedShuffleSplit.",
            },
            {
              q: "When should I use k-fold cross-validation instead?",
              a: "Use k-fold cross-validation when your dataset is small (under ~5,000 samples) and a single fixed split would produce highly variable results depending on which samples end up in each set. K-fold uses all samples for training and evaluation, giving a more stable estimate at the cost of extra training time.",
            },
            {
              q: "Does the order of splitting matter?",
              a: "Yes. For time-series data, always split chronologically — use the earliest data for training and the most recent data for testing. Random splitting on time-series causes data leakage because the model effectively sees future data during training.",
            },
            {
              q: "What random seed should I use?",
              a: "Any fixed integer works (42, 0, 1337 are popular). The exact value doesn't matter as long as you document it and use it consistently, so experiments are reproducible. Always set a random seed in your code with numpy.random.seed() or sklearn's random_state parameter.",
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
