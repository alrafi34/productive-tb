export default function AcreToSquareFeetConverterSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Acre to Square Feet Converter</h2>
          <p className="text-gray-700 leading-relaxed">
            The Acre to Square Feet Converter is a fast, browser-based utility that instantly converts any acre value into square feet using the standard conversion factor of 1 acre = 43,560 square feet. Whether you are evaluating a property listing, planning a construction project, or working on agricultural land, this tool gives you accurate results in real time.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            The tool runs entirely in your browser — no server, no signup, no data sent anywhere. Just enter your acre value and get the result instantly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Real-time Conversion:</strong> Results update instantly as you type with debounced input handling.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Precision Control:</strong> Choose 0, 2, 4, or 6 decimal places for your output.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Quick Presets:</strong> One-click preset values for common acre amounts (0.25, 0.5, 1, 5, 10 acres).</span>
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
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Keyboard Shortcuts:</strong> Press Enter to convert, Escape to reset.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion Formula</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Acres to Square Feet</h3>
            <code className="text-sm text-gray-700">Square Feet = Acres × 43,560</code>
            <p className="text-sm text-gray-600 mt-2">
              The conversion factor 43,560 is the exact number of square feet in one international acre. This is a fixed, universally accepted value used in real estate, surveying, and land measurement worldwide.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Conversions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acres</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Square Feet</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Common Use</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  ["0.25", "10,890", "Quarter acre residential lot"],
                  ["0.5", "21,780", "Half acre suburban plot"],
                  ["1", "43,560", "Standard acre"],
                  ["2", "87,120", "Small farm parcel"],
                  ["5", "217,800", "Medium agricultural plot"],
                  ["10", "435,600", "Large land parcel"],
                  ["100", "4,356,000", "Commercial or farm land"],
                ].map(([acres, sqft, use]) => (
                  <tr key={acres}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{acres} acre{parseFloat(acres) !== 1 ? "s" : ""}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{sqft} sq ft</td>
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
              <span><strong>Enter Acres:</strong> Type your acre value in the input field. Decimals are supported.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>View Result:</strong> The square feet result updates instantly as you type.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Adjust Precision:</strong> Use the precision selector to control decimal places in the output.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Use Presets:</strong> Click a preset button (0.25, 0.5, 1, 5, 10 acres) for quick conversions.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>Copy or Export:</strong> Copy the result to clipboard or download a text report.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>Save to History:</strong> Click "Save" to store the conversion for later reference.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How many square feet are in 1 acre?</h3>
              <p className="text-gray-700">1 acre equals exactly 43,560 square feet. This is the standard international definition used in real estate, agriculture, and land surveying.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I convert decimal acre values?</h3>
              <p className="text-gray-700">Yes. The converter fully supports decimal values. For example, 0.5 acres = 21,780 square feet, and 2.75 acres = 119,790 square feet.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is this converter accurate?</h3>
              <p className="text-gray-700">Yes. The tool uses the exact conversion factor of 43,560 square feet per acre, which is the legally defined value in the United States and internationally.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is an acre used for?</h3>
              <p className="text-gray-700">Acres are commonly used to measure land area in real estate listings, agricultural land, national parks, and large property developments, particularly in the United States, United Kingdom, and other countries using imperial measurements.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How big is 1 acre visually?</h3>
              <p className="text-gray-700">One acre is approximately the size of a standard American football field (without the end zones), or roughly 208.7 feet × 208.7 feet if it were a perfect square.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
