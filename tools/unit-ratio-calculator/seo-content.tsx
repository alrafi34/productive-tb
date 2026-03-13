export default function UnitRatioCalculatorSEO() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Simplify Ratios Instantly
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Instructions
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Enter Your Ratio:</strong> Type numbers separated by colons (:), commas (,), or spaces. For example: 100:50 or 20,40,60.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>View Instant Results:</strong> The tool automatically simplifies your ratio to its lowest terms and shows the GCD used.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Copy or Export:</strong> Copy the simplified ratio or export equivalent ratios as CSV for further use.</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              What You Can Do
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Simplify ratios with 2-10 values instantly
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Handle decimal ratios automatically
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Generate equivalent ratios (scaled versions)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Visualize ratios with proportional bars
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                View percentage distribution of each part
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Access recent calculation history
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Ratio Simplification Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Ratio
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Input:</span>
                <span className="font-mono font-semibold text-gray-900">100 : 50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">GCD:</span>
                <span className="font-mono font-semibold text-gray-900">50</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Simplified:</span>
                <span className="font-mono font-bold text-primary">2 : 1</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Multi-Value Ratio
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Input:</span>
                <span className="font-mono font-semibold text-gray-900">20 : 40 : 60</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">GCD:</span>
                <span className="font-mono font-semibold text-gray-900">20</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Simplified:</span>
                <span className="font-mono font-bold text-primary">1 : 2 : 3</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Decimal Ratio
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Input:</span>
                <span className="font-mono font-semibold text-gray-900">1.5 : 0.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Normalized:</span>
                <span className="font-mono font-semibold text-gray-900">15 : 5</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Simplified:</span>
                <span className="font-mono font-bold text-primary">3 : 1</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Large Numbers
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Input:</span>
                <span className="font-mono font-semibold text-gray-900">150 : 300</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">GCD:</span>
                <span className="font-mono font-semibold text-gray-900">150</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Simplified:</span>
                <span className="font-mono font-bold text-primary">1 : 2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What is a ratio and how do you simplify it?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              A ratio is a comparison between two or more numbers showing how many times one value contains another. To simplify a ratio, you divide all numbers by their Greatest Common Divisor (GCD). For example, 100:50 simplifies to 2:1 because both numbers can be divided by 50.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can this calculator handle decimal ratios?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes! The calculator automatically converts decimal ratios to whole numbers before simplification. For instance, 1.5:0.5 is converted to 15:5, which then simplifies to 3:1. This ensures accurate results while maintaining the proportional relationship.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How many values can I include in a ratio?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Our calculator supports ratios with 2 to 10 values. This allows you to simplify complex multi-part ratios like 10:20:30:40, which simplifies to 1:2:3:4. The tool works equally well for simple two-part ratios or more complex multi-value comparisons.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What are equivalent ratios and why are they useful?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Equivalent ratios are different ways of expressing the same proportional relationship. For example, 2:1, 4:2, and 6:3 are all equivalent. They're useful in scaling recipes, adjusting measurements, or working with different unit sizes while maintaining the same proportions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Is my data stored or sent to a server?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              No. All calculations happen entirely in your browser using JavaScript. Your ratios are never sent to any server. The only data stored is your recent calculation history, which is saved locally in your browser's storage for your convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Ratio Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Instant Results</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Get simplified ratios immediately as you type. No waiting, no page reloads—just instant calculations.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Visual Representation</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              See your ratios visualized with proportional bars and percentage breakdowns for better understanding.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>100% Private</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              All calculations run in your browser. Your data never leaves your device, ensuring complete privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">📚</span>
              Education & Learning
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Perfect for students learning ratios and proportions. Verify homework answers, understand GCD concepts, and practice with the random ratio generator.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">🔧</span>
              Engineering & Design
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Simplify measurement ratios, scale proportions, and maintain aspect ratios in technical drawings and designs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">💰</span>
              Finance & Business
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Compare financial metrics, simplify investment ratios, and analyze proportional relationships in business data.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">🍳</span>
              Cooking & Recipes
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Scale recipe ingredients while maintaining proper proportions. Convert complex ratios to simpler forms for easier measurement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
