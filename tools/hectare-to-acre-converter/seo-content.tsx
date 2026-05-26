export default function HectareToAcreConverterSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Hectare to Acre Converter</h2>
          <p className="text-gray-700 leading-relaxed">
            The Hectare to Acre Converter is a fast, browser-based utility that instantly converts any hectare value into acres using the standard conversion factor of 1 hectare = 2.47105 acres. Whether you are comparing international land listings, planning agricultural projects, or working with survey data, this tool gives you accurate results in real time.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Hectares are the standard metric unit for large land areas used across most of the world, while acres are commonly used in the United States, United Kingdom, and other countries. This converter bridges the gap between both systems instantly.
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
              <span><strong>Precision Control:</strong> Choose 2, 4, 6, or 8 decimal places for your output.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Swap Direction:</strong> Toggle between Hectare → Acre and Acre → Hectare conversion instantly.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Quick Presets:</strong> One-click preset values for common land sizes (1, 5, 10, 50, 100 ha).</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Land Size Comparison:</strong> Contextual descriptions help you understand the scale of the land area.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation History:</strong> Saves your last 10 conversions locally for quick reference.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Copy & Export:</strong> Copy the result to clipboard or download a text report.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion Formula</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Hectares to Acres</h3>
              <code className="text-sm text-gray-700">Acres = Hectares × 2.47105</code>
              <p className="text-sm text-gray-600 mt-2">
                The conversion factor 2.47105 is derived from the exact definition: 1 hectare = 10,000 m² and 1 acre = 4,046.856 m², giving 10,000 ÷ 4,046.856 = 2.47105 acres per hectare.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Acres to Hectares (Reverse)</h3>
              <code className="text-sm text-gray-700">Hectares = Acres ÷ 2.47105</code>
              <p className="text-sm text-gray-600 mt-2">
                Use the swap button to reverse the conversion direction instantly.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Conversions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hectares</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acres</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Common Use</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  ["0.5", "1.2355", "Small residential plot"],
                  ["1", "2.4711", "Standard hectare"],
                  ["5", "12.3553", "Small farm"],
                  ["10", "24.7105", "Medium farm parcel"],
                  ["50", "123.553", "Large agricultural land"],
                  ["100", "247.105", "Commercial farm"],
                  ["1000", "2471.05", "Large estate or ranch"],
                ].map(([ha, ac, use]) => (
                  <tr key={ha}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{ha} ha</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{ac} acres</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hectare vs Acre</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Hectare (ha)</h3>
              <p className="text-sm text-blue-800">A metric unit equal to 10,000 square meters (100m × 100m). Used internationally in agriculture, forestry, and land planning. Standard in most countries outside the US.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Acre (ac)</h3>
              <p className="text-sm text-green-800">An imperial unit equal to 43,560 square feet or 4,046.86 square meters. Commonly used in the United States, United Kingdom, Canada, and other countries for real estate and agriculture.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Enter Hectares:</strong> Type your hectare value in the input field. Decimals are supported.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>View Result:</strong> The acre result updates instantly as you type.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Adjust Precision:</strong> Use the precision selector to control decimal places.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Use Presets:</strong> Click a preset button for common land sizes.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>Swap Direction:</strong> Use the swap button to convert acres back to hectares.</span>
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
              <h3 className="font-semibold text-gray-900 mb-2">How many acres is 1 hectare?</h3>
              <p className="text-gray-700">1 hectare equals 2.47105 acres. This is the standard internationally accepted conversion factor.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How many hectares is 1 acre?</h3>
              <p className="text-gray-700">1 acre equals approximately 0.404686 hectares. Use the swap button in this tool to convert acres to hectares.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Which is bigger, a hectare or an acre?</h3>
              <p className="text-gray-700">A hectare is larger. 1 hectare = 2.47105 acres, so a hectare is about 2.47 times the size of an acre.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Where are hectares used?</h3>
              <p className="text-gray-700">Hectares are the standard land measurement unit in most countries that use the metric system, including most of Europe, Asia, Africa, and South America. They are widely used in agriculture, forestry, and urban planning.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I convert decimal hectare values?</h3>
              <p className="text-gray-700">Yes. The converter fully supports decimal values. For example, 2.5 hectares = 6.17763 acres.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
