export default function SquareFeetToAcreConverterSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Square Feet to Acre Converter</h2>
          <p className="text-gray-700 leading-relaxed">
            The Square Feet to Acre Converter is a fast, browser-based utility that instantly converts square feet into acres using the standard conversion factor of 43,560 square feet per acre. Whether you are evaluating a property listing, planning agricultural land, or working on a construction project, this tool gives you accurate results in real time.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            The tool runs entirely in your browser — no server, no signup, no data sent anywhere. Enter your square feet value and get the acre equivalent instantly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Real-time Conversion:</strong> Results update instantly as you type with 100ms debounced input handling.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Precision Control:</strong> Choose 0, 2, 4, or 6 decimal places for your output.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Quick Presets:</strong> One-click preset values for common land sizes (quarter acre, half acre, 1 acre, 2 acres).</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Reverse Conversion:</strong> Quickly switch to Acre → Square Feet mode with one click.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation History:</strong> Saves your last 10 conversions locally for quick reference.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Copy & Export:</strong> Copy the result to clipboard or download a text report.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Comma Formatting:</strong> Large numbers are automatically formatted with commas for readability.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion Formula</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Square Feet to Acres</h3>
            <code className="text-sm text-gray-700">Acres = Square Feet ÷ 43,560</code>
            <p className="text-sm text-gray-600 mt-2">
              The divisor 43,560 is the exact number of square feet in one international acre. This is the legally defined and universally accepted conversion factor used in real estate, surveying, and land measurement.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Conversions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Square Feet</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acres</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Common Use</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  ["10,890", "0.25", "Quarter acre residential lot"],
                  ["21,780", "0.5", "Half acre suburban plot"],
                  ["43,560", "1.0", "Standard one acre"],
                  ["87,120", "2.0", "Small farm parcel"],
                  ["217,800", "5.0", "Medium agricultural plot"],
                  ["435,600", "10.0", "Large land parcel"],
                  ["4,356,000", "100.0", "Commercial or farm land"],
                ].map(([sqft, acres, use]) => (
                  <tr key={sqft}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{sqft} sq ft</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{acres} acres</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Enter Square Feet:</strong> Type your square feet value in the input field. Decimals are supported.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>View Result:</strong> The acre result updates instantly as you type.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Adjust Precision:</strong> Use the precision selector to control decimal places in the output.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Use Presets:</strong> Click a preset button for common land sizes.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>Reverse:</strong> Use the swap button to switch to Acre → Square Feet conversion.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>Copy or Export:</strong> Copy the result to clipboard or download a text report.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How many acres is 43,560 square feet?</h3>
              <p className="text-gray-700">43,560 square feet equals exactly 1 acre. This is the standard definition of an acre used in the United States and internationally.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I convert decimal square feet values?</h3>
              <p className="text-gray-700">Yes. The converter fully supports decimal values. For example, 21,780.5 square feet = 0.5001 acres.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is this converter accurate?</h3>
              <p className="text-gray-700">Yes. The tool uses the exact conversion factor of 43,560 square feet per acre, which is the legally defined value used in real estate and land surveying.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How many square feet is a quarter acre?</h3>
              <p className="text-gray-700">A quarter acre (0.25 acres) equals 10,890 square feet. This is a common residential lot size in many suburban areas.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between square feet and acres?</h3>
              <p className="text-gray-700">Square feet is a smaller unit used for individual rooms, homes, and small plots. Acres are used for larger land areas like farms, parks, and large properties. One acre contains 43,560 square feet.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
