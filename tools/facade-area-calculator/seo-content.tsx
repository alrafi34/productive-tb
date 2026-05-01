export default function FacadeAreaCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Facade Area Calculator</h2>
        <p className="mb-4">
          The <strong>Facade Area Calculator</strong> is a professional tool designed to calculate the total exterior surface area of building facades. 
          This calculator helps architects, engineers, contractors, and quantity surveyors accurately estimate wall areas for materials such as paint, 
          cladding, glass panels, insulation, or exterior finishes.
        </p>
        <p>
          By allowing you to add multiple wall sections and subtract openings like windows and doors, this tool provides precise net facade area 
          calculations essential for material estimation, cost planning, and construction documentation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Facade Area Calculator</h2>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Add Wall Sections:</strong> Click "Add Wall" to create new facade sections. Enter width and height for each wall.</li>
          <li><strong>Add Openings:</strong> Click "Add Opening" to subtract windows, doors, or other openings. Specify dimensions and quantity.</li>
          <li><strong>Select Unit:</strong> Choose between meters (m²) or feet (ft²) for your measurements.</li>
          <li><strong>View Results:</strong> The calculator instantly displays total wall area, openings area, and net facade area.</li>
          <li><strong>Export Data:</strong> Download your calculations as CSV or text format for documentation and reporting.</li>
          <li><strong>Save History:</strong> Store calculations in browser history for future reference and comparison.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Facade Area Calculation Formula</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Basic Wall Area Formula</h3>
            <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm">
              Wall Area = Width × Height
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Total Wall Area</h3>
            <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm">
              Total Wall Area = Σ (Width × Height) for all walls
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Opening Area</h3>
            <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm">
              Opening Area = Width × Height × Quantity
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Net Facade Area</h3>
            <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm">
              Net Area = Total Wall Area − Total Openings Area
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="font-semibold text-blue-900 mb-3">Example 1: Simple Single Wall</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Input:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Wall: 10m × 5m</li>
                <li>No openings</li>
              </ul>
              <p className="mt-3"><strong>Calculation:</strong></p>
              <p className="ml-4">Area = 10 × 5 = 50 m²</p>
              <p className="mt-3"><strong>Result:</strong> <span className="font-bold text-blue-900">50 m²</span></p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h3 className="font-semibold text-green-900 mb-3">Example 2: Wall with Windows</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Input:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Wall: 12m × 6m = 72 m²</li>
                <li>Windows: 2m × 1.5m × 2 units = 6 m²</li>
              </ul>
              <p className="mt-3"><strong>Calculation:</strong></p>
              <p className="ml-4">Net Area = 72 − 6 = 66 m²</p>
              <p className="mt-3"><strong>Result:</strong> <span className="font-bold text-green-900">66 m²</span></p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <h3 className="font-semibold text-purple-900 mb-3">Example 3: Multiple Facade Sections</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Input:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Wall 1: 10m × 5m = 50 m²</li>
                <li>Wall 2: 8m × 4m = 32 m²</li>
                <li>Wall 3: 6m × 3m = 18 m²</li>
                <li>Total Walls = 100 m²</li>
                <li>Openings: 2m × 1.5m × 3 units = 9 m²</li>
              </ul>
              <p className="mt-3"><strong>Calculation:</strong></p>
              <p className="ml-4">Net Area = 100 − 9 = 91 m²</p>
              <p className="mt-3"><strong>Result:</strong> <span className="font-bold text-purple-900">91 m²</span></p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications of Facade Area Calculation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🎨 Paint Estimation</h3>
            <p className="text-sm">Calculate exact paint quantities needed for exterior walls, reducing waste and cost overruns.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏗️ Cladding Materials</h3>
            <p className="text-sm">Estimate cladding panels, siding, or exterior finishes required for building facades.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🪟 Glass & Windows</h3>
            <p className="text-sm">Calculate net wall area after subtracting window and door openings for accurate material orders.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🧱 Insulation Planning</h3>
            <p className="text-sm">Determine insulation material requirements for exterior wall thermal performance.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">💰 Cost Estimation</h3>
            <p className="text-sm">Generate accurate cost estimates for facade work based on precise area calculations.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">📋 Quantity Surveying</h3>
            <p className="text-sm">Prepare bills of quantities and material take-offs for construction projects.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Facade Measurements</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Element Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Typical Dimensions</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Standard Window</td>
                <td className="px-4 py-3 text-sm font-mono">1.2m × 1.5m</td>
                <td className="px-4 py-3 text-sm">Common residential window</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Large Window</td>
                <td className="px-4 py-3 text-sm font-mono">2.0m × 2.0m</td>
                <td className="px-4 py-3 text-sm">Picture or bay window</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Standard Door</td>
                <td className="px-4 py-3 text-sm font-mono">0.9m × 2.1m</td>
                <td className="px-4 py-3 text-sm">Single entry door</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Double Door</td>
                <td className="px-4 py-3 text-sm font-mono">1.8m × 2.1m</td>
                <td className="px-4 py-3 text-sm">Double entry door</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Garage Door</td>
                <td className="px-4 py-3 text-sm font-mono">2.4m × 2.1m</td>
                <td className="px-4 py-3 text-sm">Single car garage</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Floor Height</td>
                <td className="px-4 py-3 text-sm font-mono">3.0m - 3.5m</td>
                <td className="px-4 py-3 text-sm">Typical residential floor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices for Facade Measurement</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Measure Accurately</h3>
              <p className="text-sm">Use precise measurements from architectural drawings or on-site surveys for best results.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Include All Sections</h3>
              <p className="text-sm">Account for all facade sections including projections, recesses, and irregular shapes.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Subtract Openings</h3>
              <p className="text-sm">Always subtract windows, doors, and other openings to get accurate net area for materials.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Add Waste Factor</h3>
              <p className="text-sm">Add 5-10% waste factor to final calculations for material ordering to account for cuts and errors.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Document Calculations</h3>
              <p className="text-sm">Export and save calculations for project documentation and future reference.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Verify Units</h3>
              <p className="text-sm">Ensure all measurements use consistent units (meters or feet) throughout the calculation.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Material Coverage Guidelines</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
          <h3 className="font-semibold text-yellow-900 mb-3">Paint Coverage</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-yellow-900">
            <li><strong>Standard Paint:</strong> 10-12 m² per liter (100-120 sq ft per gallon)</li>
            <li><strong>Primer:</strong> 8-10 m² per liter (80-100 sq ft per gallon)</li>
            <li><strong>Textured Paint:</strong> 6-8 m² per liter (60-80 sq ft per gallon)</li>
            <li><strong>Coats Required:</strong> Typically 2 coats for new surfaces, 1-2 for repainting</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mt-4">
          <h3 className="font-semibold text-blue-900 mb-3">Cladding & Siding</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-900">
            <li><strong>Vinyl Siding:</strong> Add 10% for waste and cuts</li>
            <li><strong>Fiber Cement:</strong> Add 15% for waste and cuts</li>
            <li><strong>Metal Panels:</strong> Add 5-8% for overlaps and waste</li>
            <li><strong>Stone Veneer:</strong> Add 10-15% for irregular shapes</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">How do I calculate facade area for irregular walls?</h3>
            <p className="text-sm text-gray-700">
              Break irregular walls into multiple rectangular sections. Add each section separately in the calculator, 
              then the tool will sum them automatically to give you the total facade area.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Should I include window frames in opening measurements?</h3>
            <p className="text-sm text-gray-700">
              Yes, measure the complete opening including the frame. This gives you the actual wall area that won't need 
              cladding or paint. For precise material estimation, measure the rough opening dimensions.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">How much waste factor should I add for materials?</h3>
            <p className="text-sm text-gray-700">
              Add 5-10% for paint, 10-15% for cladding and siding, and 15-20% for complex patterns or irregular surfaces. 
              This accounts for cuts, overlaps, and installation waste.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Can I use this calculator for interior walls?</h3>
            <p className="text-sm text-gray-700">
              Yes! While designed for facades, this calculator works perfectly for interior walls too. Simply add your 
              wall sections and subtract door and window openings to get net paintable or finishable area.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">What if I have curved or circular walls?</h3>
            <p className="text-sm text-gray-700">
              For curved walls, calculate the developed length (arc length) and multiply by height. You can approximate 
              by breaking the curve into smaller straight sections or use the formula: Area = Arc Length × Height.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">How do I convert between square meters and square feet?</h3>
            <p className="text-sm text-gray-700">
              The calculator handles unit conversion automatically. Simply select your preferred unit (meters or feet) 
              and enter measurements. 1 m² = 10.764 ft², or 1 ft² = 0.0929 m².
            </p>
          </div>

        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Facade Area Calculator?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-gray-900">Instant Calculations</h3>
              <p className="text-sm">Real-time results as you type with 150ms debouncing for smooth performance.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-semibold text-gray-900">Accurate Results</h3>
              <p className="text-sm">Precise calculations using standard architectural formulas and best practices.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <h3 className="font-semibold text-gray-900">Mobile Friendly</h3>
              <p className="text-sm">Responsive design works perfectly on phones, tablets, and desktop computers.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💾</span>
            <div>
              <h3 className="font-semibold text-gray-900">Save & Export</h3>
              <p className="text-sm">Save calculations to history and export as CSV or text for documentation.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-semibold text-gray-900">100% Private</h3>
              <p className="text-sm">All calculations run in your browser. No data sent to servers.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🆓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Completely Free</h3>
              <p className="text-sm">No registration, no limits, no hidden costs. Use as much as you need.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Tips</h2>
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">1.</span>
              <span className="text-sm"><strong>Always verify measurements:</strong> Double-check dimensions from architectural drawings before ordering materials.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">2.</span>
              <span className="text-sm"><strong>Account for texture:</strong> Textured or rough surfaces may require 10-20% more paint than smooth surfaces.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">3.</span>
              <span className="text-sm"><strong>Consider multiple coats:</strong> Multiply facade area by number of coats needed for total coverage calculation.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">4.</span>
              <span className="text-sm"><strong>Document everything:</strong> Save calculations and export reports for project records and client communication.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">5.</span>
              <span className="text-sm"><strong>Use for estimates:</strong> This tool provides accurate estimates, but always consult with professionals for final specifications.</span>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
