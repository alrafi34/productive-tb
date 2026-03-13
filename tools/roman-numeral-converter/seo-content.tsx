export default function RomanNumeralConverterSEO() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Convert Roman Numerals
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Instructions
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Choose Conversion Mode:</strong> Select whether you want to convert a number to Roman numerals or Roman numerals to a number.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Enter Your Input:</strong> Type a number (1-3999) or a valid Roman numeral in the input field.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Get Instant Result:</strong> The conversion appears instantly as you type. Copy the result or save it to your history.</span>
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
                Convert any number from 1 to 3999 to Roman numerals
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Convert Roman numerals back to standard numbers
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Validate Roman numeral format with error detection
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Generate random numbers for testing conversions
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Access interactive reference chart of all Roman symbols
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Save conversion history for quick reference
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roman Numerals Explained */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Understanding Roman Numerals
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Basic Symbols
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">I</span>
                <span>=</span>
                <span>1</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">V</span>
                <span>=</span>
                <span>5</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">X</span>
                <span>=</span>
                <span>10</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">L</span>
                <span>=</span>
                <span>50</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">C</span>
                <span>=</span>
                <span>100</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">D</span>
                <span>=</span>
                <span>500</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">M</span>
                <span>=</span>
                <span>1000</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Subtractive Notation
            </h3>
            <p className="text-gray-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              When a smaller value appears before a larger value, it is subtracted:
            </p>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">IV</span>
                <span>=</span>
                <span>4 (5 - 1)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">IX</span>
                <span>=</span>
                <span>9 (10 - 1)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">XL</span>
                <span>=</span>
                <span>40 (50 - 10)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">XC</span>
                <span>=</span>
                <span>90 (100 - 10)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">CD</span>
                <span>=</span>
                <span>400 (500 - 100)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-semibold">CM</span>
                <span>=</span>
                <span>900 (1000 - 100)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Conversion Examples
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Example 1</h3>
            <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>Convert 49 to Roman:</p>
            <p className="text-lg font-bold text-primary">49 = XLIX</p>
            <p className="text-xs text-gray-500 mt-2">(40 + 9 = XL + IX)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Example 2</h3>
            <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>Convert 1990 to Roman:</p>
            <p className="text-lg font-bold text-primary">1990 = MCMXC</p>
            <p className="text-xs text-gray-500 mt-2">(1000 + 900 + 90 = M + CM + XC)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Example 3</h3>
            <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "var(--font-body)" }}>Convert 2024 to Roman:</p>
            <p className="text-lg font-bold text-primary">2024 = MMXXIV</p>
            <p className="text-xs text-gray-500 mt-2">(2000 + 20 + 4 = MM + XX + IV)</p>
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
              What is the range of numbers this converter supports?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              This converter supports numbers from 1 to 3999. Roman numerals traditionally don't have a symbol for zero, and numbers above 3999 require special notation (vinculum or overline) that isn't commonly used.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Why can't I convert numbers larger than 3999?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              The standard Roman numeral system uses letters I, V, X, L, C, D, and M. To represent numbers above 3999, you would need to use a vinculum (a line over the numeral) to multiply by 1000, which is not part of standard modern usage.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How does the subtractive notation work?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              In Roman numerals, when a smaller value appears before a larger value, you subtract the smaller from the larger. For example, IV means 5 - 1 = 4, and XC means 100 - 10 = 90. This rule only applies to specific combinations to avoid ambiguity.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Is my conversion history saved permanently?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Your conversion history is saved in your browser's local storage and persists between sessions. However, it will be cleared if you delete your browser's cache or use private/incognito mode. You can manually clear the history anytime using the "Clear All" button.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can I use this tool offline?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes! Once the page loads, all conversions happen entirely in your browser using JavaScript. No internet connection is required after the initial page load, making it perfect for offline use.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Roman Numeral Converter?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Instant Conversion</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Get results instantly as you type with real-time validation and error detection.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>100% Private</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>All conversions happen in your browser. Your data is never sent to any server.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Educational</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Learn Roman numerals with our interactive reference chart and detailed examples.</p>
          </div>
        </div>
      </section>
    </>
  );
}
