export default function FractionCalculatorSEO() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Fraction Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Instructions
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Enter Your Fractions:</strong> Input the numerator and denominator for both Fraction A and Fraction B using the number fields.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Choose Operation:</strong> Select whether you want to add, subtract, multiply, or divide the fractions.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>View Results:</strong> The calculator automatically shows the simplified result, mixed number, and decimal equivalent instantly.</span>
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
                Add and subtract fractions with different denominators
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Multiply and divide fractions instantly
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Automatic simplification using GCD algorithm
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Convert improper fractions to mixed numbers
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                See step-by-step calculation process
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Visual bar representation of fraction values
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Fraction Operation Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Addition</div>
              <div className="font-mono text-sm text-gray-600 space-y-1">
                <div>1/2 + 3/4 = 5/4 = 1 1/4</div>
                <div>2/5 + 1/3 = 11/15</div>
                <div>3/8 + 5/8 = 1</div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Subtraction</div>
              <div className="font-mono text-sm text-gray-600 space-y-1">
                <div>7/8 − 1/4 = 5/8</div>
                <div>5/6 − 2/3 = 1/6</div>
                <div>3/4 − 1/2 = 1/4</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Multiplication</div>
              <div className="font-mono text-sm text-gray-600 space-y-1">
                <div>2/3 × 5/6 = 5/9</div>
                <div>3/4 × 4/5 = 3/5</div>
                <div>1/2 × 2/3 = 1/3</div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Division</div>
              <div className="font-mono text-sm text-gray-600 space-y-1">
                <div>3/4 ÷ 2/5 = 15/8 = 1 7/8</div>
                <div>5/6 ÷ 1/3 = 5/2 = 2 1/2</div>
                <div>2/3 ÷ 4/5 = 5/6</div>
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
              How do you add fractions with different denominators?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              To add fractions with different denominators, you need to find a common denominator. Our calculator automatically multiplies the denominators together and adjusts the numerators accordingly. For example, 1/2 + 3/4 becomes (1×4 + 2×3)/(2×4) = 10/8, which simplifies to 5/4.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What is a mixed number?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              A mixed number combines a whole number with a proper fraction. For example, 5/4 can be written as 1 1/4 (one and one-quarter). Our calculator automatically converts improper fractions (where the numerator is larger than the denominator) into mixed numbers for easier understanding.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How does fraction simplification work?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Simplification uses the Greatest Common Divisor (GCD) algorithm to reduce fractions to their lowest terms. For example, 10/18 simplifies to 5/9 because both numbers can be divided by 2. The calculator automatically finds the GCD and divides both the numerator and denominator by it.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can I see the calculation steps?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes! Enable the "Show Steps" option to see a detailed breakdown of how the calculation was performed. This is especially helpful for students learning fraction arithmetic or anyone who wants to verify the calculation process.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Fraction Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Instant Results</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Get immediate answers as you type. No waiting, no page reloads. All calculations happen instantly in your browser.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Auto Simplification</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Fractions are automatically reduced to their simplest form using the GCD algorithm, saving you time and effort.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Visual Learning</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              See visual bar representations of fractions and step-by-step calculations to better understand the math.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Perfect For
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl">🎓</span> Students
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Learn fraction arithmetic with step-by-step explanations. Perfect for homework, test preparation, and understanding fraction concepts.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl">👨‍🏫</span> Teachers
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Create examples and verify answers quickly. Use the random fraction generator to create practice problems for students.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl">👨‍🔧</span> Engineers & Professionals
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Perform quick calculations with ratios and fractional measurements. Convert between fractions and decimals effortlessly.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl">👨‍🍳</span> Cooking & Baking
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Scale recipes up or down by multiplying or dividing ingredient fractions. Perfect for adjusting serving sizes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
