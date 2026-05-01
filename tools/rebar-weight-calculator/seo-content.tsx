export default function RebarWeightCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Rebar Weight Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Rebar Weight Calculator is a professional engineering tool designed for civil engineers, construction professionals, and architects to accurately calculate the weight of reinforcement steel bars (rebar) based on diameter, length, and quantity. This calculator uses the standard industry formula to provide instant, accurate weight calculations.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Accurate rebar weight calculation is essential for material estimation, cost planning, structural design, and construction project management. This tool simplifies the calculation process and eliminates manual errors.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Rebar Weight Calculator</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Select Diameter:</strong> Choose from standard rebar sizes (6mm to 40mm) or enter custom diameter</li>
          <li><strong>Enter Length:</strong> Input the length of each rebar in meters or feet</li>
          <li><strong>Set Quantity:</strong> Specify the number of bars (default is 1)</li>
          <li><strong>Choose Unit System:</strong> Select metric (kg, m) or imperial (lb, ft)</li>
          <li><strong>View Results:</strong> Get instant weight calculations per meter and total weight</li>
          <li><strong>Batch Calculations:</strong> Add multiple entries for comprehensive project estimation</li>
          <li><strong>Export Data:</strong> Download results as CSV or text for documentation</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Rebar Weight Formula</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Weight Calculation Formula:</h3>
          <p className="text-gray-800 font-mono text-sm mb-2">
            Weight per meter (kg/m) = D² / 162
          </p>
          <p className="text-sm text-gray-700 mb-2">
            Where D = diameter in millimeters
          </p>
          <p className="text-gray-800 font-mono text-sm">
            Total Weight = Weight per meter × Length × Quantity
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed">
          This formula is based on the density of steel (7850 kg/m³) and provides accurate weight calculations for standard reinforcement bars. The constant 162 is derived from the mathematical relationship between diameter, cross-sectional area, and steel density.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Rebar Sizes and Weights</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-900">Diameter (mm)</th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-900">Weight per meter (kg/m)</th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-900">Common Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">6 mm</td>
                <td className="px-4 py-2 text-sm text-gray-700">0.222 kg/m</td>
                <td className="px-4 py-2 text-sm text-gray-700">Light reinforcement, stirrups</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">8 mm</td>
                <td className="px-4 py-2 text-sm text-gray-700">0.395 kg/m</td>
                <td className="px-4 py-2 text-sm text-gray-700">Stirrups, light slabs</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">10 mm</td>
                <td className="px-4 py-2 text-sm text-gray-700">0.617 kg/m</td>
                <td className="px-4 py-2 text-sm text-gray-700">Slabs, light beams</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">12 mm</td>
                <td className="px-4 py-2 text-sm text-gray-700">0.888 kg/m</td>
                <td className="px-4 py-2 text-sm text-gray-700">Slabs, beams, columns</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">16 mm</td>
                <td className="px-4 py-2 text-sm text-gray-700">1.578 kg/m</td>
                <td className="px-4 py-2 text-sm text-gray-700">Beams, columns, heavy slabs</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">20 mm</td>
                <td className="px-4 py-2 text-sm text-gray-700">2.469 kg/m</td>
                <td className="px-4 py-2 text-sm text-gray-700">Heavy beams, columns</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">25 mm</td>
                <td className="px-4 py-2 text-sm text-gray-700">3.858 kg/m</td>
                <td className="px-4 py-2 text-sm text-gray-700">Heavy columns, foundations</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700">32 mm</td>
                <td className="px-4 py-2 text-sm text-gray-700">6.321 kg/m</td>
                <td className="px-4 py-2 text-sm text-gray-700">Heavy structural elements</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Real-time Calculations</h3>
            <p className="text-sm text-gray-700">
              Instant weight calculations as you type. No need to click calculate button - results update automatically.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Batch Processing</h3>
            <p className="text-sm text-gray-700">
              Add multiple rebar entries to calculate total project weight. Perfect for comprehensive material estimation.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Unit Conversion</h3>
            <p className="text-sm text-gray-700">
              Seamlessly switch between metric (kg, m) and imperial (lb, ft) units with automatic conversion.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Export Options</h3>
            <p className="text-sm text-gray-700">
              Download calculations as CSV or text files for documentation, reporting, and project records.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Applications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Material quantity estimation for construction projects</li>
          <li>Cost calculation and budget planning</li>
          <li>Structural design and engineering calculations</li>
          <li>Purchase order preparation and procurement</li>
          <li>Construction site material management</li>
          <li>Quality surveying and quantity takeoff</li>
          <li>Project bidding and tender preparation</li>
          <li>Construction education and training</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Rebar</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is Rebar?</h3>
            <p className="text-gray-700">
              Rebar (reinforcement bar) is a steel bar used to reinforce concrete structures. It provides tensile strength to concrete, which is naturally strong in compression but weak in tension. Rebar is essential in construction of buildings, bridges, roads, and other concrete structures.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Why Calculate Rebar Weight?</h3>
            <p className="text-gray-700">
              Accurate rebar weight calculation is crucial for several reasons: material cost estimation, transportation planning, structural load calculations, procurement management, and compliance with building codes. Knowing the exact weight helps in budgeting, logistics, and ensuring structural integrity.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Steel Density</h3>
            <p className="text-gray-700">
              The standard formula uses a steel density of 7850 kg/m³, which is the typical density for reinforcement steel. This density accounts for the material composition and manufacturing standards of construction-grade steel bars.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: Single Bar</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Input:</strong> Diameter = 12 mm, Length = 10 m, Quantity = 1
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> (12² / 162) × 10 × 1 = (144 / 162) × 10 = 0.888 × 10 = 8.88 kg
            </p>
            <p className="text-sm text-gray-700">
              <strong>Result:</strong> Total weight = 8.88 kg
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Multiple Bars</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Input:</strong> Diameter = 16 mm, Length = 6 m, Quantity = 20
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> (16² / 162) × 6 × 20 = (256 / 162) × 6 × 20 = 1.580 × 120 = 189.6 kg
            </p>
            <p className="text-sm text-gray-700">
              <strong>Result:</strong> Total weight = 189.6 kg (≈ 418 lb)
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How accurate is the rebar weight formula?</h3>
            <p className="text-gray-700">
              The formula D² / 162 is the industry-standard calculation and provides highly accurate results for standard reinforcement steel bars. It's based on the theoretical weight derived from steel density and cross-sectional area.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I use this calculator for imperial units?</h3>
            <p className="text-gray-700">
              Yes, the calculator supports both metric and imperial units. Simply select your preferred unit system, and the calculator will handle all conversions automatically.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What if my rebar diameter is not in the preset list?</h3>
            <p className="text-gray-700">
              You can select "Custom" from the diameter dropdown and enter any diameter value. The calculator will compute the weight for any diameter you specify.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How do I calculate weight for multiple different rebar sizes?</h3>
            <p className="text-gray-700">
              Use the batch calculation feature. Calculate each size separately and click "Add to Batch" for each entry. The calculator will maintain a running total and allow you to export all calculations together.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Why is the constant 162 used in the formula?</h3>
            <p className="text-gray-700">
              The constant 162 is derived from the mathematical relationship: (π/4) × (density of steel in kg/m³) / 1000. For steel density of 7850 kg/m³, this simplifies to approximately 162, making the formula easy to use with diameter in millimeters.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Using This Calculator</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Instant calculations with real-time updates</li>
          <li>Eliminates manual calculation errors</li>
          <li>Supports both metric and imperial units</li>
          <li>Batch processing for multiple rebar entries</li>
          <li>Export functionality for documentation</li>
          <li>Calculation history for reference</li>
          <li>Mobile-friendly responsive design</li>
          <li>Free to use with no registration required</li>
          <li>Based on industry-standard formulas</li>
          <li>Perfect for engineers, contractors, and students</li>
        </ul>
      </section>
    </div>
  );
}
