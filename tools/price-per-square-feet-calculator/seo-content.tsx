export default function PricePerSquareFeetCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Price per Square Feet Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Price per Square Feet Calculator is a practical real estate and land valuation tool that
            instantly calculates the price per square foot of any land or property. Simply enter the total
            land price and the land area — the calculator handles all unit conversions automatically and
            delivers an accurate result in real time.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Because land is measured in many different units across regions — square feet, decimal, acre,
            katha, bigha, square meter, and hectare — this tool eliminates manual conversion errors and
            gives you a reliable price-per-sqft figure regardless of the unit used.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            {[
              ["Real-time Calculation", "Results update instantly as you type — no button press needed."],
              ["Multi-unit Support", "Supports sq ft, sq m, Decimal, Acre, Katha, Bigha, and Hectare."],
              ["Automatic Conversion", "Area is automatically converted to sq ft before calculation."],
              ["Multi-currency", "Supports BDT (৳), USD ($), INR (₹), and EUR (€)."],
              ["Price Breakdown Table", "See price at 0.25×, 0.5×, 1×, 2×, 5×, and 10× the entered area."],
              ["Calculation History", "Save and reload previous calculations from browser storage."],
              ["Export to TXT", "Download a formatted summary of your calculation."],
              ["Quick Presets", "One-click common land size examples to get started fast."],
            ].map(([title, desc]) => (
              <li key={title} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>{title}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Formula</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <code className="text-sm text-gray-700">Price per sq ft = Total Price ÷ Total Area (in sq ft)</code>
            <p className="text-sm text-gray-600 mt-3">
              If the area is entered in a unit other than square feet, it is first converted using the
              standard conversion factor. For example, 3 Decimal = 3 × 435.6 = 1,306.8 sq ft. The total
              price is then divided by this converted area to give the price per square foot.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unit Conversion Reference</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Square Feet</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  ["1 Square Foot",   "1",           "Base unit"],
                  ["1 Square Meter",  "10.7639",     "International standard"],
                  ["1 Decimal",       "435.6",       "Used in Bangladesh, India"],
                  ["1 Katha",         "720",         "Bangladesh / West Bengal standard"],
                  ["1 Bigha",         "14,400",      "Bangladesh / West Bengal standard"],
                  ["1 Acre",          "43,560",      "Universal standard"],
                  ["1 Hectare",       "107,639",     "International standard"],
                ].map(([unit, sqft, note]) => (
                  <tr key={unit}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{unit}</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-700">{sqft}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Example Calculations</h2>
          <div className="space-y-4">
            {[
              {
                title: "Example 1 – Square Feet",
                bg: "bg-blue-50 border-blue-200",
                lines: [
                  "Total Price: ৳5,000,000",
                  "Area: 2,500 sq ft",
                  "Price per sq ft = 5,000,000 ÷ 2,500 = ৳2,000",
                ],
              },
              {
                title: "Example 2 – Decimal",
                bg: "bg-green-50 border-green-200",
                lines: [
                  "Total Price: ৳1,200,000",
                  "Area: 3 Decimal → 3 × 435.6 = 1,306.8 sq ft",
                  "Price per sq ft = 1,200,000 ÷ 1,306.8 = ৳918.13",
                ],
              },
              {
                title: "Example 3 – Acre",
                bg: "bg-purple-50 border-purple-200",
                lines: [
                  "Total Price: ৳25,000,000",
                  "Area: 0.5 Acre → 0.5 × 43,560 = 21,780 sq ft",
                  "Price per sq ft = 25,000,000 ÷ 21,780 = ৳1,147.84",
                ],
              },
            ].map(({ title, bg, lines }) => (
              <div key={title} className={`rounded-lg p-4 border ${bg}`}>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <div className="space-y-1 text-sm text-gray-700 font-mono">
                  {lines.map((l, i) => <div key={i}>{l}</div>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          <ol className="space-y-3 text-gray-700">
            {[
              ["Enter Total Land Price", "Type the full purchase price of the land in the price field."],
              ["Enter Land Area", "Type the land size (e.g. 2500, 3, 0.5)."],
              ["Select Area Unit", "Choose the unit that matches your land measurement (sq ft, Decimal, Acre, etc.)."],
              ["Select Currency", "Pick your preferred currency from the settings panel."],
              ["View Result", "The price per square foot is calculated and displayed instantly."],
              ["Use the Breakdown Table", "See how the price scales at different area multiples."],
              ["Save or Export", "Save to history or download a TXT summary of your calculation."],
            ].map(([title, desc], i) => (
              <li key={i} className="flex items-start">
                <span className="font-semibold text-primary mr-2">{i + 1}.</span>
                <span><strong>{title}:</strong> {desc}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What is price per square foot?",
                a: "Price per square foot is the cost of one square foot of land. It is calculated by dividing the total land price by the total area in square feet. It is a standard metric used in real estate to compare property values.",
              },
              {
                q: "How do I convert Decimal to square feet?",
                a: "1 Decimal = 435.6 square feet. Multiply the number of Decimals by 435.6 to get the area in square feet. This calculator does this conversion automatically.",
              },
              {
                q: "How many square feet is 1 Katha?",
                a: "In Bangladesh and West Bengal, 1 Katha = 720 square feet. This is the standard used in this calculator.",
              },
              {
                q: "Can I use this for any currency?",
                a: "Yes. The calculator supports BDT (৳), USD ($), INR (₹), and EUR (€). The currency symbol is applied to the result display only — the calculation logic is the same regardless of currency.",
              },
              {
                q: "Why does the price breakdown table show different areas?",
                a: "The breakdown table shows the total price at 0.25×, 0.5×, 1×, 2×, 5×, and 10× the entered area. This helps you quickly estimate costs for different land sizes at the same rate.",
              },
            ].map(({ q, a }, i) => (
              <div key={i}>
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-700">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
