export default function ConcreteMixRatioCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Concrete Mix Ratio Calculator</h2>
        <p className="mb-4">
          The Concrete Mix Ratio Calculator is a professional construction tool designed to help civil engineers, architects, contractors, and builders calculate the exact proportions of cement, sand, and aggregate required for concrete production. This browser-based utility eliminates manual calculation errors and provides instant, accurate results based on industry-standard formulas.
        </p>
        <p>
          Whether you're working on residential construction, commercial projects, or infrastructure development, this calculator ensures you get the right material quantities for your concrete mix, helping you optimize costs and reduce waste.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Enter Total Volume</h3>
            <p className="text-sm">
              Input the total volume of concrete you need. You can choose between cubic meters (m³) or cubic feet (ft³) depending on your preference. The calculator automatically handles unit conversions.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Example:</strong> For a slab measuring 10m × 5m × 0.15m, enter 7.5 m³
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Select Mix Ratio</h3>
            <p className="text-sm">
              Enter your desired mix ratio in the format Cement:Sand:Aggregate (e.g., 1:2:4). You can also use the preset buttons for standard concrete grades like M15, M20, or M25.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Example:</strong> For general construction, use 1:2:4 (M15 grade)
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Choose Cement Bag Size</h3>
            <p className="text-sm">
              Select your cement bag size (40kg or 50kg). The calculator will automatically compute the number of bags needed based on your selection.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: View Results</h3>
            <p className="text-sm">
              The calculator instantly displays the required quantities of cement (in bags and kg), sand (in m³), and aggregate (in m³). You can copy, save, or export these results for your records.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Concrete Mix Calculation Formula</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Step 1: Calculate Dry Volume</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Dry Volume = Wet Volume × 1.54
            </code>
            <p className="mt-2 text-sm">
              The factor 1.54 accounts for voids between particles in dry materials.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Step 2: Calculate Total Parts</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Total Parts = Cement + Sand + Aggregate
            </code>
            <p className="mt-2 text-sm">
              For ratio 1:2:4, total parts = 1 + 2 + 4 = 7
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Step 3: Calculate Individual Volumes</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Cement Volume = (Cement Ratio / Total Parts) × Dry Volume<br />
              Sand Volume = (Sand Ratio / Total Parts) × Dry Volume<br />
              Aggregate Volume = (Aggregate Ratio / Total Parts) × Dry Volume
            </code>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Step 4: Calculate Cement Weight</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Cement Weight (kg) = Cement Volume × 1440 kg/m³<br />
              Number of Bags = Cement Weight / Bag Size
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Concrete Grades</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Grade</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Mix Ratio</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">M5</td>
                <td className="px-4 py-3 text-sm font-mono">1:5:10</td>
                <td className="px-4 py-3 text-sm">Lean concrete for leveling</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">M10</td>
                <td className="px-4 py-3 text-sm font-mono">1:3:6</td>
                <td className="px-4 py-3 text-sm">Non-structural concrete</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">M15</td>
                <td className="px-4 py-3 text-sm font-mono">1:2:4</td>
                <td className="px-4 py-3 text-sm">Standard concrete for general use</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">M20</td>
                <td className="px-4 py-3 text-sm font-mono">1:1.5:3</td>
                <td className="px-4 py-3 text-sm">Structural concrete for beams and columns</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">M25</td>
                <td className="px-4 py-3 text-sm font-mono">1:1:2</td>
                <td className="px-4 py-3 text-sm">High strength structural concrete</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">M30</td>
                <td className="px-4 py-3 text-sm font-mono">1:0.75:1.5</td>
                <td className="px-4 py-3 text-sm">Very high strength concrete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Real-time calculation updates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Multiple mix ratio presets (M5-M30)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Unit conversion (m³ ↔ ft³)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Adjustable dry volume factor</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Cement bag size options (40kg/50kg)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Calculation history with localStorage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Export to CSV and text formats</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Mobile-responsive design</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-1">Residential Construction</h3>
            <p className="text-sm text-blue-800">
              Calculate concrete for house foundations, slabs, columns, and beams.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-1">Commercial Projects</h3>
            <p className="text-sm text-green-800">
              Estimate materials for large-scale construction projects and high-rise buildings.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-1">Infrastructure Development</h3>
            <p className="text-sm text-purple-800">
              Plan concrete requirements for roads, bridges, and public works.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-1">DIY Projects</h3>
            <p className="text-sm text-orange-800">
              Calculate materials for home improvement projects like patios and driveways.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Accurate Calculations</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Always add 5-10% extra material to account for wastage and spillage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use the appropriate concrete grade for your specific application</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Ensure consistent units throughout your calculations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>The dry volume factor (1.54) is standard but can be adjusted if needed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Save your calculations to history for future reference</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Verify material quality - use clean, graded aggregates and fresh cement</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What is the dry volume factor?</h3>
            <p className="text-sm">
              The dry volume factor (typically 1.54) accounts for the voids between particles in dry materials. When cement, sand, and aggregate are mixed with water, they occupy less space than their individual dry volumes combined.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Which concrete grade should I use?</h3>
            <p className="text-sm">
              M15 (1:2:4) is suitable for general construction. M20 (1:1.5:3) is recommended for structural elements like beams and columns. M25 and above are used for high-strength applications. Consult a structural engineer for specific requirements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How many cement bags do I need for 1 cubic meter?</h3>
            <p className="text-sm">
              For M15 grade (1:2:4) concrete, you'll need approximately 6.3 bags of 50kg cement per cubic meter. This varies based on the mix ratio and bag size.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Can I use this calculator for ready-mix concrete?</h3>
            <p className="text-sm">
              This calculator is designed for site-mixed concrete. Ready-mix concrete is typically ordered by volume (cubic meters or cubic yards) directly from suppliers who handle the proportioning.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
