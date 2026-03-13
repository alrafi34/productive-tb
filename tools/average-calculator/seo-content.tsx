export default function AverageCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Calculate Average Instantly
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Instructions
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Enter Your Numbers:</strong> Type or paste numbers separated by commas, spaces, or newlines into the input field.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>View Instant Results:</strong> The average is calculated automatically as you type, with no need to click any button.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Copy or Export:</strong> Click the copy button to save the result to your clipboard, or export all data as CSV.</span>
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
                Calculate arithmetic mean of any set of numbers
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Paste data directly from Excel or spreadsheets
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                View count, sum, min, and max values instantly
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Export results with all numbers to CSV format
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How do I calculate the average of numbers?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              The average (arithmetic mean) is calculated by adding all numbers together and dividing by the count of numbers. For example, the average of 10, 20, 30, 40 is (10+20+30+40)/4 = 25. Our calculator does this instantly as you type.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can I paste numbers from Excel?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes! Simply copy a column or row of numbers from Excel, Google Sheets, or any spreadsheet application and paste them directly into the input field. The calculator automatically detects and parses the numbers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Is my data stored or sent to a server?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              No. All calculations happen entirely in your browser using JavaScript. Your data never leaves your device, ensuring complete privacy and security. No internet connection is required after the page loads.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What formats can I use to enter numbers?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              You can enter numbers separated by commas (10, 20, 30), spaces (10 20 30), or newlines (one number per line). The calculator intelligently parses all common formats and ignores any non-numeric characters.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Average Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Instant Results</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Real-time calculation as you type with no delays or page reloads required.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Extra Statistics</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>View count, sum, minimum, and maximum values alongside the average.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>100% Private</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>All calculations run in your browser. Your data stays on your device.</p>
          </div>
        </div>
      </section>
    </>
  );
}
