export default function ScientificCalculatorSEO() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Scientific Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Instructions
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Choose Your Mode:</strong> Toggle between Degrees and Radians mode for trigonometric calculations based on your needs.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Enter Your Expression:</strong> Click buttons or use your keyboard to input numbers, operators, and scientific functions.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Calculate:</strong> Press the equals button or Enter key to get instant results. All calculations happen in your browser.</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Available Functions
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Trigonometric functions (sin, cos, tan, asin, acos, atan)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Logarithmic functions (log base 10, natural log)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Exponential operations (powers, square, e^x, 10^x)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Mathematical constants (π, e) and square roots
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Memory functions (M+, M-, MR, MC) for storing values
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Calculations
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Trigonometry</div>
              <div className="font-mono text-sm text-gray-600">
                <div>sin(30) = 0.5</div>
                <div>cos(60) = 0.5</div>
                <div>tan(45) = 1</div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Logarithms</div>
              <div className="font-mono text-sm text-gray-600">
                <div>log(100) = 2</div>
                <div>ln(e) = 1</div>
                <div>log(1000) = 3</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Powers & Roots</div>
              <div className="font-mono text-sm text-gray-600">
                <div>2^5 = 32</div>
                <div>√(16) = 4</div>
                <div>3^3 = 27</div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Mixed Expressions</div>
              <div className="font-mono text-sm text-gray-600">
                <div>sin(30) + cos(60) = 1</div>
                <div>2^3 × 5 = 40</div>
                <div>√(25) + log(100) = 7</div>
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
              What is the difference between DEG and RAD mode?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              DEG (Degrees) mode is used for angle measurements in degrees (0-360°), while RAD (Radians) mode uses radians (0-2π). For most everyday calculations like sin(30°), use DEG mode. For advanced mathematics and calculus, RAD mode is preferred.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How do I use memory functions?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Memory functions let you store values temporarily. M+ adds the current display to memory, M- subtracts it, MR recalls the stored value, and MC clears the memory. This is useful for complex calculations where you need to reuse intermediate results.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can I use keyboard shortcuts?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes! You can type numbers (0-9), operators (+, -, *, /), parentheses, and decimal points directly. Press Enter or = to calculate, Escape to clear, and Backspace to delete the last character. This makes calculations much faster.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Is my calculation data stored anywhere?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              All calculations are performed entirely in your browser using JavaScript. History is stored locally in your browser's localStorage and never sent to any server. Your data remains completely private and secure on your device.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Scientific Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Lightning Fast</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Instant calculations with no loading time. All processing happens locally in your browser for maximum speed.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Advanced Functions</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Complete set of scientific functions including trigonometry, logarithms, exponentials, and more for complex calculations.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>100% Private</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              No data is sent to any server. All calculations and history are stored locally on your device for complete privacy.
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
              Solve homework problems, verify calculations, and learn mathematical concepts with instant feedback. Perfect for algebra, trigonometry, and calculus courses.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl">👨‍🔬</span> Scientists & Engineers
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Perform quick calculations for experiments, formulas, and technical work. Access advanced functions without installing software.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl">💻</span> Developers
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Verify numeric expressions, test algorithms, and debug mathematical logic in your code with a reliable calculation tool.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl">📊</span> Professionals
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Handle financial calculations, statistical analysis, and data processing with advanced mathematical operations at your fingertips.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
