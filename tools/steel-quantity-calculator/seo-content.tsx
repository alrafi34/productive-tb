export default function SteelQuantityCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Steel Quantity Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Steel Quantity Calculator is a professional tool designed for civil engineers, architects, contractors, and construction professionals to quickly estimate the amount of steel required for various structural elements including slabs, beams, columns, and footings.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Accurate steel quantity estimation is essential for material procurement, cost estimation, project planning, and budget management. This calculator provides instant results using standard engineering formulas and typical steel factors.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Select Element Type:</strong> Choose from Slab, Beam, Column, or Footing</li>
          <li><strong>Choose Unit System:</strong> Select Metric or Imperial units</li>
          <li><strong>Enter Parameters:</strong> Input dimensions and steel factors</li>
          <li><strong>View Results:</strong> Get instant steel quantity in kg and tons</li>
          <li><strong>Export Data:</strong> Download results as text or CSV</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Formulas</h2>
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Slab:</h3>
            <p className="text-sm text-gray-700">Total Steel = Area × Steel Factor</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Beam:</h3>
            <p className="text-sm text-gray-700">Total Steel = Length × Steel per Length</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Column:</h3>
            <p className="text-sm text-gray-700">Total Steel = Number of Columns × Steel per Column</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Footing:</h3>
            <p className="text-sm text-gray-700">Total Steel = Number of Footings × Steel per Footing</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Typical Steel Factors</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-900">Element</th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-900">Steel Factor</th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-900">Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">Light Slab</td>
                <td className="px-4 py-2 text-sm text-gray-700">3 kg/sq ft</td>
                <td className="px-4 py-2 text-sm text-gray-700">Residential light load</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">Medium Slab</td>
                <td className="px-4 py-2 text-sm text-gray-700">4 kg/sq ft</td>
                <td className="px-4 py-2 text-sm text-gray-700">Standard residential</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">Heavy Slab</td>
                <td className="px-4 py-2 text-sm text-gray-700">5 kg/sq ft</td>
                <td className="px-4 py-2 text-sm text-gray-700">Commercial/heavy load</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">Light Beam</td>
                <td className="px-4 py-2 text-sm text-gray-700">2 kg/ft</td>
                <td className="px-4 py-2 text-sm text-gray-700">Small span beams</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">Medium Beam</td>
                <td className="px-4 py-2 text-sm text-gray-700">2.5 kg/ft</td>
                <td className="px-4 py-2 text-sm text-gray-700">Standard beams</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">Heavy Beam</td>
                <td className="px-4 py-2 text-sm text-gray-700">4 kg/ft</td>
                <td className="px-4 py-2 text-sm text-gray-700">Large span beams</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Multiple calculation modes for different structural elements</li>
          <li>Real-time calculations with instant updates</li>
          <li>Unit conversion between metric and imperial</li>
          <li>Typical steel factor presets for quick estimation</li>
          <li>Calculation history with localStorage</li>
          <li>Export results as text or CSV</li>
          <li>Mobile-responsive design</li>
          <li>Free to use with no registration</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Applications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Material quantity estimation for construction projects</li>
          <li>Cost calculation and budget planning</li>
          <li>Purchase order preparation</li>
          <li>Project bidding and tender preparation</li>
          <li>Construction site material management</li>
          <li>Preliminary structural design</li>
          <li>Construction education and training</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Eliminates manual calculation errors</li>
          <li>Saves time in material estimation</li>
          <li>Provides quick preliminary estimates</li>
          <li>Supports multiple structural elements</li>
          <li>Works entirely in browser - no installation needed</li>
          <li>Instant results for better decision making</li>
        </ul>
      </section>
    </div>
  );
}
