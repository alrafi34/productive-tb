export default function SkirtingMaterialCalculatorSEO() {
  return (
    <div className="mt-16 space-y-12 max-w-4xl mx-auto">
      
      {/* About Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">About Skirting Material Calculator</h2>
        <p className="text-gray-700 leading-relaxed">
          The Skirting Material Calculator (also known as Baseboard Calculator) is a professional tool designed to help architects, interior designers, contractors, and homeowners accurately estimate the amount of skirting board material needed for single or multiple rooms. By calculating room perimeters and deducting door openings, this calculator provides precise material requirements and optional cost estimates.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Skirting boards serve both functional and aesthetic purposes, protecting walls from damage while providing a finished look to interior spaces. Accurate calculation ensures you purchase the right amount of material, reducing waste and avoiding costly shortages during installation.
        </p>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Enter Room Dimensions</h3>
            <p className="text-gray-700 text-sm">
              Input the length and width of each room in feet or meters.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Specify Door Openings</h3>
            <p className="text-gray-700 text-sm">
              Enter the number of doors and their width to deduct from the perimeter calculation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Add Multiple Rooms (Optional)</h3>
            <p className="text-gray-700 text-sm">
              Use the "Add Room" button to calculate skirting for multiple rooms simultaneously.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Enable Cost Estimation (Optional)</h3>
            <p className="text-gray-700 text-sm">
              Toggle cost estimation and enter the price per unit to get total project cost.
            </p>
          </div>
        </div>
      </section>

      {/* Formula */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Calculation Formula</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Step 1: Calculate Room Perimeter</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Perimeter = 2 × (Length + Width)
            </code>
            <p className="text-blue-800 text-sm mt-2">
              The perimeter represents the total wall length around the room.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Step 2: Calculate Door Deduction</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Door Deduction = Number of Doors × Door Width
            </code>
            <p className="text-blue-800 text-sm mt-2">
              Skirting is not installed across door openings, so we subtract this length.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Step 3: Calculate Final Skirting Length</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Skirting Length = Perimeter − Door Deduction
            </code>
            <p className="text-blue-800 text-sm mt-2">
              This gives you the exact length of skirting board needed for the room.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Step 4: Calculate Total Cost (Optional)</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Total Cost = Skirting Length × Cost per Unit
            </code>
            <p className="text-blue-800 text-sm mt-2">
              Multiply the total length by your material cost to estimate project expenses.
            </p>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Calculation Examples</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 1: Standard Bedroom</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Length: 10 ft</li>
                <li>Width: 12 ft</li>
                <li>Doors: 1</li>
                <li>Door Width: 3 ft</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Calculation:</strong></p>
              <p className="text-gray-600 ml-2">
                Perimeter = 2 × (10 + 12) = 44 ft<br />
                Door Deduction = 1 × 3 = 3 ft<br />
                Skirting = 44 − 3 = 41 ft
              </p>
              <p className="text-gray-700 mt-3"><strong>Result:</strong> 41 ft of skirting required</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 2: Living Room with Multiple Doors</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Length: 5 m</li>
                <li>Width: 4 m</li>
                <li>Doors: 2</li>
                <li>Door Width: 1 m each</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Calculation:</strong></p>
              <p className="text-gray-600 ml-2">
                Perimeter = 2 × (5 + 4) = 18 m<br />
                Door Deduction = 2 × 1 = 2 m<br />
                Skirting = 18 − 2 = 16 m
              </p>
              <p className="text-gray-700 mt-3"><strong>Result:</strong> 16 m of skirting required</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 3: Multiple Rooms with Cost</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Room 1: 10 ft × 12 ft, 1 door (3 ft) = 41 ft</li>
                <li>Room 2: 8 ft × 10 ft, 1 door (3 ft) = 33 ft</li>
                <li>Cost: $2.50 per ft</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Calculation:</strong></p>
              <p className="text-gray-600 ml-2">
                Total Skirting = 41 + 33 = 74 ft<br />
                Total Cost = 74 × $2.50 = $185.00
              </p>
              <p className="text-gray-700 mt-3"><strong>Result:</strong> 74 ft skirting, $185 total cost</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Tips & Best Practices</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Add 5-10% extra:</strong> Always purchase slightly more material than calculated to account for cutting waste and mistakes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Measure accurately:</strong> Use a tape measure to get precise room dimensions for accurate calculations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Account for corners:</strong> Internal and external corners may require additional material for proper joining.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Check door frames:</strong> Some installations skip skirting behind door frames, while others continue it. Adjust accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Consider built-ins:</strong> Deduct areas where built-in furniture or cabinets extend to the floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Save calculations:</strong> Use the history feature to track multiple rooms and compare different scenarios.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">What is skirting board and why is it needed?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Skirting board (also called baseboard) is a decorative and protective trim installed along the bottom of interior walls. It protects walls from damage, covers the joint between wall and floor, and provides a finished aesthetic appearance to rooms.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">How much extra skirting should I buy?</summary>
            <p className="text-gray-700 text-sm mt-2">
              It's recommended to purchase 5-10% extra skirting material beyond your calculated requirement. This accounts for cutting waste, mistakes during installation, and potential damage. For complex rooms with many corners, consider 10-15% extra.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">Should I deduct window areas from the calculation?</summary>
            <p className="text-gray-700 text-sm mt-2">
              No, windows do not affect skirting calculations as skirting is installed at floor level, not around windows. Only deduct door openings where skirting is not installed.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">What is the standard door width for calculations?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Standard interior door widths are typically 30-36 inches (2.5-3 feet) or 80-90 cm (0.8-0.9 meters). However, measure your actual door openings for accurate calculations, as sizes can vary.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">Can I use this calculator for irregular room shapes?</summary>
            <p className="text-gray-700 text-sm mt-2">
              For irregular rooms, break the space into multiple rectangular sections, calculate each separately using the "Add Room" feature, and sum the results. This approach works well for L-shaped rooms or spaces with alcoves.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">How do I calculate skirting for stairs?</summary>
            <p className="text-gray-700 text-sm mt-2">
              For stairs, measure the total length of the staircase perimeter including risers. This calculator works best for flat rooms. For stairs, consider measuring the actual diagonal length along the staircase and adding it as a separate "room" with custom dimensions.
            </p>
          </details>
        </div>
      </section>

      {/* Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Benefits of Using This Calculator</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-700 text-sm">
              Get real-time calculations as you type with no delays or page refreshes.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Accurate Estimates</h3>
            <p className="text-gray-700 text-sm">
              Precise calculations ensure you order the right amount of material.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🏠</div>
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Rooms</h3>
            <p className="text-gray-700 text-sm">
              Calculate skirting for entire homes or buildings with multi-room support.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900 mb-2">Cost Estimation</h3>
            <p className="text-gray-700 text-sm">
              Optional cost calculator helps budget your skirting installation project.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Export Reports</h3>
            <p className="text-gray-700 text-sm">
              Download CSV or text reports for quotes and project documentation.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
            <p className="text-gray-700 text-sm">
              Works perfectly on all devices for on-site measurements and planning.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Common Use Cases</h2>
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Home Renovations</h3>
            <p className="text-gray-700 text-sm">
              Calculate skirting requirements for room makeovers, flooring replacements, or complete home renovations. Ensure you have enough material before starting your project.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">New Construction</h3>
            <p className="text-gray-700 text-sm">
              Estimate skirting materials for new builds, helping contractors and builders create accurate material lists and cost estimates for client quotes.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Interior Design Projects</h3>
            <p className="text-gray-700 text-sm">
              Interior designers can quickly calculate skirting requirements for client projects, ensuring accurate material specifications and budget planning.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">DIY Home Improvement</h3>
            <p className="text-gray-700 text-sm">
              Homeowners planning DIY skirting installation can calculate exact material needs, avoiding multiple trips to the hardware store and reducing waste.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
