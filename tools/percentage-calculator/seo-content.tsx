export default function PercentageCalculatorSEO() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Calculate Percentages Instantly
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Instructions
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Select a Calculation Mode:</strong> Choose between Normal Percentages, Reverse Calculations, Multi-Step Changes, or Batch Modes depending on your math problem.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Enter Your Values:</strong> Input your data using the interactive text fields or quickly adjust the percentages via the touch-friendly slider.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Review Instant Results:</strong> As soon as you type or adjust a slider, the tool will update your answers instantly without reloading the page.</span>
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
                Determine the percentage of any number (e.g. 25% of 120)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Find percentage increases or decreases with visual bars
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Discover original values using reverse percentage logic
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Apply sequential tax/discount layers via Multi-Step functions
              </li>
            </ul>
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
              How do I find a percentage of a number?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              The formula is straightforward. Use our standard mode and input the percentage alongside the target number. Mathematically, it works by dividing the percentage by 100, then multiplying that answer by your target number.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What is a reverse percentage?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              A reverse percentage calculation is useful when you only know a final value and the percentage by which it shifted to get there. By inputting the final number and selecting if it was an increase or decrease, the tool works backwards to find the exact starting number.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Do I need an internet connection to use this after loading?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Once you load our website, all scripts are cached within your active browser tab. This utility processes equations using pure JavaScript entirely on your device, making it 100% off-the-grid friendly until you close the window.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Is it capable of handling large batch processing lists?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes. The Batch processing mode allows users to copy and paste entire spreadsheets of column data and apply uniform percentage shifts instantly for large-scale data modifications. It also includes an export to CSV feature to continue your workflow spreadsheet seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Online Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🛠️</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Comprehensive Toolbox</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>We included four diverse logic panels under one unified program to prevent you from ever having to click off the page.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🖼️</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Visual References</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Quickly glance at color-coordinated graphs and bars to get an overarching sense of how much financial weight a percentage change actively holds.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Totally Private</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>By using 100% Client-Side JS logic, calculations bypass the need for server interactions. None of your math questions are collected or spied on.</p>
          </div>
        </div>
      </section>
    </>
  );
}
