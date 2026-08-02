export default function ClusteringDistanceCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Clustering Distance Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>clustering distance calculator</strong> is a free browser-based tool that measures how far apart — or how similar — two numeric vectors are, using ten of the most common distance and similarity metrics from data science and machine learning: Euclidean, Manhattan, Minkowski, Chebyshev, Cosine, Hamming, Canberra, Bray-Curtis, Pearson Correlation, and Jaccard.
          </p>
          <p>
            Enter two vectors of equal length, choose a metric, and the calculator instantly returns the distance (or similarity) score, a full step-by-step formula breakdown, a coordinate table, and a visualization — a 2D scatter plot for two-dimensional vectors, or a per-dimension difference chart for higher-dimensional data.
          </p>
          <p>
            This tool is built for <strong>data scientists, machine learning engineers, data analysts, students, researchers, AI engineers, business intelligence professionals, and educators</strong> working with clustering algorithms like k-means and k-nearest neighbors, recommendation systems, and pattern recognition. It runs entirely in your browser — no data is ever sent to a server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Clustering Distance Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter Vector A and Vector B as comma, space, or newline-separated numbers, choose a distance metric, and the calculator validates that both vectors have the same number of dimensions before applying the selected formula.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formulas</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Euclidean</span> = √Σ(xᵢ − yᵢ)²</p>
              <p><span className="font-semibold">Manhattan</span> = Σ|xᵢ − yᵢ|</p>
              <p><span className="font-semibold">Cosine Similarity</span> = (A · B) ÷ (‖A‖ × ‖B‖)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Distance vs. Similarity", "Most metrics here measure distance (0 = identical, larger = more different). Cosine returns a similarity score instead (1 = identical direction, -1 = opposite)."],
              ["Minkowski Generalization", "Minkowski distance with p=1 equals Manhattan distance, and p=2 equals Euclidean distance — it's a tunable generalization of both."],
              ["Equal-Length Requirement", "Every supported metric requires both vectors to have the same number of dimensions, since each metric compares corresponding positions."],
              ["Undefined Cases", "Some metrics are mathematically undefined for certain inputs — for example, cosine similarity for a zero vector, or Pearson correlation for a constant vector — and the calculator explains these cases clearly instead of returning NaN."],
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
          How to Use the Clustering Distance Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Distance Metric", "Select from Euclidean, Manhattan, Minkowski, Chebyshev, Cosine, Hamming, Canberra, Bray-Curtis, Pearson, or Jaccard."],
                ["Enter Vector A and Vector B", "Type or paste comma, space, or newline-separated numbers — both vectors need the same number of values."],
                ["Set the Minkowski Parameter", "If you selected Minkowski distance, choose the order p — 1 for Manhattan-like behavior, 2 for Euclidean-like behavior, or higher for Chebyshev-like behavior."],
                ["Adjust Decimal Precision", "Choose how many decimal places to display, from 2 up to 8."],
                ["Read the Live Result", "The distance or similarity score, calculation steps, coordinate table, and visualization update instantly as you type."],
                ["Export or Save", "Copy the result, download it as CSV, TXT, or JSON, or save it to your calculation history."],
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
                "Ten distance and similarity metrics in one tool",
                "Auto-detects comma, space, and newline separators",
                "Full step-by-step calculation breakdown for every metric",
                "Coordinate table comparing each dimension of A and B",
                "2D scatter plot with a connecting distance line for two-dimensional vectors",
                "Per-dimension difference bar chart for higher-dimensional vectors",
                "Adjustable decimal precision (2–8 places)",
                "Swap Vectors, Clear, and Reset one-click actions",
                "Quick example presets for common scenarios",
                "Instant calculation with a 150ms debounce as you type",
                "Live processing time display",
                "Export report as CSV, TXT, or JSON",
                "Calculation history — save and reload up to 20 past results",
                "Clear validation for mismatched dimensions and invalid values",
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
              title: "K-Means Clustering by Hand",
              scenario: "A data science student manually verifies which cluster centroid a data point is closest to by computing the Euclidean distance from the point to each candidate centroid, confirming their k-means implementation assigns points correctly.",
            },
            {
              title: "Document Similarity with Cosine",
              scenario: "An engineer compares two document embedding vectors — [0.12, 0.45, 0.81] and [0.15, 0.48, 0.75] — using Cosine Similarity, getting a score of 0.997, confirming the two documents are nearly identical in meaning despite different exact wording.",
            },
            {
              title: "Recommendation System Feature Comparison",
              scenario: "A machine learning engineer compares user preference vectors using Manhattan distance to find the most similar users for a collaborative filtering recommendation engine, since Manhattan distance is less sensitive to outliers than Euclidean in high dimensions.",
            },
            {
              title: "Choosing Between K-Nearest Neighbor Distance Metrics",
              scenario: "A researcher experiments with Euclidean, Manhattan, and Minkowski distance (with different p values) on the same dataset to see which metric produces the most sensible nearest-neighbor groupings for their specific feature space.",
            },
            {
              title: "Ecological Species Composition Comparison",
              scenario: "A researcher uses Bray-Curtis distance to compare species abundance vectors between two sampling sites, a standard metric in ecology for measuring compositional dissimilarity between communities.",
            },
            {
              title: "Time Series Correlation Analysis",
              scenario: "A data analyst uses Pearson Correlation Distance to determine how closely two time series move together, converting a correlation coefficient into a distance metric suitable for clustering algorithms.",
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
                "Use Cosine Similarity instead of Euclidean when direction matters more than magnitude, such as comparing text embeddings or user preference vectors of different scales.",
                "Normalize or standardize your features before computing Euclidean or Manhattan distance — features with larger raw ranges otherwise dominate the result.",
                "Use Manhattan distance instead of Euclidean when your data is high-dimensional or contains outliers, since it's generally more robust in those situations.",
                "Try several metrics on the same data before committing to one for a clustering algorithm — different metrics can produce meaningfully different cluster assignments.",
                "Remember that Cosine returns a similarity score (higher = more similar), while every other metric here returns a distance (lower = more similar) — don't mix up the direction when interpreting results.",
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
                "Don't compare vectors of different lengths — every metric here requires both vectors to have the same number of dimensions.",
                "Don't use Hamming distance on continuous numeric data without a clear reason — it's designed for categorical or binary data where exact equality is meaningful.",
                "Don't apply Jaccard or Canberra distance to vectors containing negative values without first checking whether the formula still makes sense for your use case.",
                "Don't forget that Minkowski distance with p=1 is identical to Manhattan, and p=2 is identical to Euclidean — there's no need to pick Minkowski unless you specifically want a different p.",
                "Don't assume a low distance always means 'similar' in a business sense — always sanity-check results against domain knowledge of what the vectors represent.",
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
          Distance Metric Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Metric</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Euclidean", "√Σ(xᵢ − yᵢ)²", "Straight-line distance; k-means, k-NN"],
                ["Manhattan", "Σ|xᵢ − yᵢ|", "Grid-like distance; high-dimensional, outlier-robust"],
                ["Minkowski", "(Σ|xᵢ − yᵢ|ᵖ)^(1/p)", "Generalized distance; tunable via p"],
                ["Chebyshev", "max(|xᵢ − yᵢ|)", "Maximum single-axis deviation; chess-move distance"],
                ["Cosine Similarity", "(A·B) ÷ (‖A‖‖B‖)", "Text embeddings, direction-based similarity"],
                ["Hamming", "count(xᵢ ≠ yᵢ) ÷ n", "Categorical or binary data comparison"],
                ["Canberra", "Σ|xᵢ−yᵢ| ÷ (|xᵢ|+|yᵢ|)", "Sensitive to values near zero"],
                ["Bray-Curtis", "Σ|xᵢ−yᵢ| ÷ Σ|xᵢ+yᵢ|", "Ecological composition comparison"],
                ["Pearson Correlation Distance", "1 − Pearson(X,Y)", "Time series and trend similarity"],
                ["Jaccard Distance", "1 − (Σmin ÷ Σmax)", "Non-negative vector overlap comparison"],
              ].map(([name, formula, use]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{name}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700 text-xs">{formula}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{use}</td>
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
              q: "What is a clustering distance calculator?",
              a: "A clustering distance calculator is a free browser-based tool that measures how far apart or how similar two numeric vectors are, using distance and similarity metrics commonly used in clustering algorithms, machine learning, and data analysis.",
            },
            {
              q: "Which distance metric should I use for clustering?",
              a: "Euclidean distance is the most common default for continuous, similarly-scaled data. Manhattan distance is often preferred for high-dimensional or outlier-heavy data. Cosine similarity is standard for text embeddings and direction-based comparisons where magnitude doesn't matter.",
            },
            {
              q: "What is the difference between Euclidean and Manhattan distance?",
              a: "Euclidean distance measures the straight-line distance between two points, calculated as the square root of the sum of squared differences. Manhattan distance measures the sum of absolute differences along each dimension, like navigating a city grid — it's generally less sensitive to outliers than Euclidean.",
            },
            {
              q: "What does Minkowski distance's parameter p control?",
              a: "The parameter p controls how the distance generalizes: p=1 makes Minkowski distance identical to Manhattan distance, p=2 makes it identical to Euclidean distance, and as p approaches infinity, it approaches Chebyshev distance.",
            },
            {
              q: "Is cosine similarity the same as cosine distance?",
              a: "No. Cosine similarity ranges from -1 to 1, where 1 means the vectors point in exactly the same direction. Cosine distance is typically defined as 1 minus cosine similarity, converting it into a true distance measure where 0 means identical direction.",
            },
            {
              q: "Why do my vectors need to be the same length?",
              a: "Every distance metric in this calculator compares corresponding positions between the two vectors — the first value of A against the first value of B, and so on. Vectors of different lengths have no meaningful position-by-position comparison, so the calculator requires equal dimensions.",
            },
            {
              q: "What happens if my vectors contain invalid values?",
              a: "The calculator checks every entered value and shows a clear error message, such as 'Vector A contains invalid numeric values,' if any token can't be parsed as a number, so you can quickly locate and fix the issue.",
            },
            {
              q: "Can I use this calculator for very high-dimensional vectors?",
              a: "Yes, the underlying calculations work efficiently at any dimensionality. The coordinate table and difference chart are optimized for readability up to 30 dimensions, but the numeric result itself is calculated correctly regardless of vector size.",
            },
            {
              q: "What's the difference between Bray-Curtis and Jaccard distance here?",
              a: "Bray-Curtis distance divides the sum of absolute differences by the sum of the vectors, commonly used in ecology for composition data. Jaccard distance, as implemented here for continuous non-negative vectors, is based on the ratio of the sum of minimums to the sum of maximums between the two vectors.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your vectors are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "🤖", title: "Data Scientists & ML Engineers", desc: "Choose and verify distance metrics for clustering, k-NN, and recommendation algorithms." },
            { icon: "📊", title: "Data Analysts & BI Professionals", desc: "Compare feature vectors and metric outputs without writing custom analysis code." },
            { icon: "🎓", title: "Students & Researchers", desc: "Learn and manually verify distance and similarity formulas used across data science." },
            { icon: "🧠", title: "AI Engineers", desc: "Sanity-check embedding similarity scores used in search, retrieval, and recommendation systems." },
            { icon: "🔬", title: "Ecological & Scientific Researchers", desc: "Apply Bray-Curtis and Canberra distance for compositional and ecological data comparison." },
            { icon: "👩‍🏫", title: "Educators", desc: "Demonstrate how different distance metrics behave on the same pair of vectors." },
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
