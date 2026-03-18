import React from "react";

const m2ToFt2Reference = [
  { m2: "1", ft2: "10.7639" },
  { m2: "5", ft2: "53.8196" },
  { m2: "10", ft2: "107.6391" },
  { m2: "20", ft2: "215.2782" },
  { m2: "25", ft2: "269.0978" },
  { m2: "50", ft2: "538.1955" },
  { m2: "75", ft2: "807.2933" },
  { m2: "100", ft2: "1076.3910" },
  { m2: "150", ft2: "1614.5866" },
  { m2: "200", ft2: "2152.7821" },
];

const ft2ToM2Reference = [
  { ft2: "100", m2: "9.2903" },
  { ft2: "250", m2: "23.2258" },
  { ft2: "500", m2: "46.4515" },
  { ft2: "750", m2: "69.6773" },
  { ft2: "1000", m2: "92.9030" },
  { ft2: "1500", m2: "139.3546" },
  { ft2: "2000", m2: "185.8061" },
];

const useCases = [
  "Compare apartment listings from different countries (m2 vs ft2 formats)",
  "Estimate flooring and tile coverage before purchasing materials",
  "Convert room sizes when using international furniture plans",
  "Prepare real estate brochures for both local and global buyers",
  "Normalize area data in spreadsheets for market analysis",
  "Cross-check contractor measurements in renovation projects",
];

const mistakes = [
  "Confusing linear units with area units. Converting meters to feet is not the same as converting square meters to square feet.",
  "Rounding too early. For better accuracy, keep more decimals during calculation and round only the final output.",
  "Forgetting to convert in the correct direction (m2 to ft2 vs ft2 to m2).",
  "Mixing gross area and usable area while comparing property listings.",
  "Copying values without the unit label, which can cause reporting errors later.",
];

export default function ToolSEOContent() {
  return (
    <div className="mt-12 space-y-12">
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Square Meter to Square Foot Converter: Detailed Guide
        </h2>
        <div className="prose prose-primary max-w-none text-gray-600 leading-relaxed">
          <p>
            This square meter to square foot converter is designed for fast and reliable area conversion in both
            directions: m2 to ft2 and ft2 to m2. If you work with real estate listings, architecture plans,
            construction estimates, or interior layouts, converting area units correctly is essential.
          </p>
          <p className="mt-3">
            The calculator runs entirely in your browser, supports precision control, includes batch conversion,
            and lets you export conversion results as CSV. No sign-up, no backend processing, and no data upload.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How the Conversion Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm font-semibold text-primary mb-2">m2 to ft2 formula</p>
            <code className="block text-gray-900 font-mono font-bold">ft2 = m2 x 10.7639104</code>
            <p className="text-sm text-gray-600 mt-3">
              Use this when your source value is in square meters and you need square feet.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-700 mb-2">ft2 to m2 formula</p>
            <code className="block text-gray-900 font-mono font-bold">m2 = ft2 x 0.09290304</code>
            <p className="text-sm text-gray-600 mt-3">
              Use this when your source value is in square feet and you need square meters.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Why these constants? Because 1 meter = 3.28084 feet, and area uses squared dimensions.
          So 1 square meter equals 10.7639104 square feet.
        </p>
      </section>

      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Area Converter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">1. Select Direction</h3>
            <p className="text-sm text-gray-600">
              Choose whether you want to convert square meters to square feet or square feet to square meters.
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">2. Enter One Value</h3>
            <p className="text-sm text-gray-600">
              Type the source area value. The result updates instantly with your selected decimal precision.
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-2">3. Copy, Save, or Batch</h3>
            <p className="text-sm text-gray-600">
              Copy one conversion, save to local history, or switch to batch mode for multiple inputs.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {useCases.map((item) => (
            <div key={item} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Reference: m2 to ft2</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Square Meters (m2)</th>
                <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Square Feet (ft2)</th>
              </tr>
            </thead>
            <tbody>
              {m2ToFt2Reference.map((row) => (
                <tr key={row.m2}>
                  <td className="p-3 border border-gray-200 text-gray-700">{row.m2}</td>
                  <td className="p-3 border border-gray-200 text-gray-700">{row.ft2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Reference: ft2 to m2</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Square Feet (ft2)</th>
                <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Square Meters (m2)</th>
              </tr>
            </thead>
            <tbody>
              {ft2ToM2Reference.map((row) => (
                <tr key={row.ft2}>
                  <td className="p-3 border border-gray-200 text-gray-700">{row.ft2}</td>
                  <td className="p-3 border border-gray-200 text-gray-700">{row.m2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Conversion Mistakes to Avoid</h2>
        <div className="space-y-3">
          {mistakes.map((item) => (
            <p key={item} className="text-sm text-gray-700 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5 text-gray-600">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How many square feet is 1 square meter?</h3>
            <p>1 square meter equals 10.7639104 square feet.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How many square feet are in 100 square meters?</h3>
            <p>100 square meters equals 1,076.391 square feet.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I convert square feet back to square meters?</h3>
            <p>Yes. The tool supports reverse conversion with one click via the direction toggle.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What precision should I use for property listings?</h3>
            <p>
              For public listings, 1 to 2 decimal places is usually enough. For technical planning, you can use
              3 to 6 decimals.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Does this converter work for large land areas?</h3>
            <p>
              Yes for raw area conversion. For acre, hectare, or plot-focused workflows, you may want a dedicated
              land area converter as a follow-up step.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I process multiple values at once?</h3>
            <p>Yes. Use batch mode to paste many values and export results as a CSV file.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data uploaded to a server?</h3>
            <p>No. This tool performs conversion directly in your browser.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is conversion history private?</h3>
            <p>Yes. Saved history is stored locally in your browser and not sent anywhere.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to install anything?</h3>
            <p>No installation is needed. Open the page and start converting instantly.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
