export default function CurtainWallCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Curtain Wall Calculator</h2>
        <p className="mb-4">
          The <strong>Curtain Wall Calculator</strong> is a professional tool designed to help architects, engineers, contractors, 
          and students estimate the size, panel count, and material breakdown of curtain wall systems for building facades. 
          A curtain wall is a non-structural outer covering of a building, typically made of glass, aluminum, or composite panels.
        </p>
        <p>
          This calculator simplifies early-stage planning by providing quick area calculations, panel estimations, and material 
          distribution insights, helping you make informed decisions about facade design and budgeting.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Curtain Wall Calculator</h2>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Enter Dimensions:</strong> Input the width and height of your curtain wall facade.</li>
          <li><strong>Configure Panels:</strong> Specify panel width and height for your curtain wall system.</li>
          <li><strong>Set Glass Ratio:</strong> Adjust the slider to set the percentage of glass vs frame (typically 70-90%).</li>
          <li><strong>Add Frame Details:</strong> Optionally enter frame thickness in millimeters.</li>
          <li><strong>View Results:</strong> The calculator instantly displays total area, panel count, and material breakdown.</li>
          <li><strong>Use Presets:</strong> Apply building type presets for quick calculations.</li>
          <li><strong>Export Data:</strong> Download calculations as CSV or text for documentation.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Curtain Wall Calculation Formulas</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Total Area Formula</h3>
            <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm">
              Total Area = Width × Height
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Panel Area Formula</h3>
            <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm">
              Panel Area = Panel Width × Panel Height
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Panel Count Formula</h3>
            <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm">
              Panel Count = ⌈Total Area ÷ Panel Area⌉ (rounded up)
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Material Distribution</h3>
            <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm space-y-1">
              <div>Glass Area = Total Area × (Glass Ratio ÷ 100)</div>
              <div>Frame Area = Total Area − Glass Area</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="font-semibold text-blue-900 mb-3">Example 1: Small Commercial Building</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Input:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Width: 20 m</li>
                <li>Height: 10 m</li>
                <li>Panel: 1.5 m × 1.5 m</li>
                <li>Glass Ratio: 80%</li>
              </ul>
              <p className="mt-3"><strong>Calculation:</strong></p>
              <p className="ml-4">Total Area = 20 × 10 = 200 m²</p>
              <p className="ml-4">Panel Area = 1.5 × 1.5 = 2.25 m²</p>
              <p className="ml-4">Panel Count = ⌈200 ÷ 2.25⌉ = 89 panels</p>
              <p className="ml-4">Glass Area = 200 × 0.80 = 160 m²</p>
              <p className="ml-4">Frame Area = 200 − 160 = 40 m²</p>
              <p className="mt-3"><strong>Result:</strong> <span className="font-bold text-blue-900">89 panels, 160 m² glass, 40 m² frame</span></p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h3 className="font-semibold text-green-900 mb-3">Example 2: High-Rise Tower</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Input:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Width: 30 m</li>
                <li>Height: 40 m</li>
                <li>Panel: 1.5 m × 2.0 m</li>
                <li>Glass Ratio: 90%</li>
              </ul>
              <p className="mt-3"><strong>Calculation:</strong></p>
              <p className="ml-4">Total Area = 30 × 40 = 1200 m²</p>
              <p className="ml-4">Panel Area = 1.5 × 2.0 = 3.0 m²</p>
              <p className="ml-4">Panel Count = ⌈1200 ÷ 3.0⌉ = 400 panels</p>
              <p className="ml-4">Glass Area = 1200 × 0.90 = 1080 m²</p>
              <p className="ml-4">Frame Area = 1200 − 1080 = 120 m²</p>
              <p className="mt-3"><strong>Result:</strong> <span className="font-bold text-green-900">400 panels, 1080 m² glass, 120 m² frame</span></p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <h3 className="font-semibold text-purple-900 mb-3">Example 3: Retail Storefront</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Input:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Width: 15 m</li>
                <li>Height: 4 m</li>
                <li>Panel: 2.0 m × 2.0 m</li>
                <li>Glass Ratio: 95%</li>
              </ul>
              <p className="mt-3"><strong>Calculation:</strong></p>
              <p className="ml-4">Total Area = 15 × 4 = 60 m²</p>
              <p className="ml-4">Panel Area = 2.0 × 2.0 = 4.0 m²</p>
              <p className="ml-4">Panel Count = ⌈60 ÷ 4.0⌉ = 15 panels</p>
              <p className="ml-4">Glass Area = 60 × 0.95 = 57 m²</p>
              <p className="ml-4">Frame Area = 60 − 57 = 3 m²</p>
              <p className="mt-3"><strong>Result:</strong> <span className="font-bold text-purple-900">15 panels, 57 m² glass, 3 m² frame</span></p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Panel Sizes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Application</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Panel Size</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Glass Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Office Building</td>
                <td className="px-4 py-3 text-sm font-mono">1.2m × 1.8m</td>
                <td className="px-4 py-3 text-sm">80-85%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">High-Rise Tower</td>
                <td className="px-4 py-3 text-sm font-mono">1.5m × 2.0m</td>
                <td className="px-4 py-3 text-sm">85-90%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Retail Storefront</td>
                <td className="px-4 py-3 text-sm font-mono">2.0m × 2.5m</td>
                <td className="px-4 py-3 text-sm">90-95%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Residential</td>
                <td className="px-4 py-3 text-sm font-mono">1.2m × 1.5m</td>
                <td className="px-4 py-3 text-sm">70-80%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Atrium/Interior</td>
                <td className="px-4 py-3 text-sm font-mono">1.5m × 2.5m</td>
                <td className="px-4 py-3 text-sm">95-100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏢 Office Buildings</h3>
            <p className="text-sm">Calculate curtain wall systems for commercial office facades.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏙️ High-Rise Towers</h3>
            <p className="text-sm">Estimate facade materials for skyscrapers and tall buildings.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏬 Retail Spaces</h3>
            <p className="text-sm">Plan storefront curtain walls with high glass ratios.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏠 Residential Buildings</h3>
            <p className="text-sm">Design curtain wall systems for apartment and condo buildings.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏛️ Institutional</h3>
            <p className="text-sm">Calculate facades for schools, hospitals, and public buildings.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏨 Hotels</h3>
            <p className="text-sm">Estimate curtain wall materials for hospitality projects.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Consider Building Codes</h3>
              <p className="text-sm">Check local building codes for minimum glass ratios, fire ratings, and structural requirements.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Account for Thermal Performance</h3>
              <p className="text-sm">Higher glass ratios may require better insulation and low-E coatings for energy efficiency.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Plan for Maintenance</h3>
              <p className="text-sm">Consider access for cleaning and maintenance when designing curtain wall systems.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Use Standard Panel Sizes</h3>
              <p className="text-sm">Standard sizes reduce costs and lead times. Custom sizes increase fabrication complexity.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Add Wastage Factor</h3>
              <p className="text-sm">Add 5-10% to panel counts for breakage, cutting waste, and future repairs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <div>
              <h3 className="font-semibold text-gray-900">Coordinate with Structure</h3>
              <p className="text-sm">Ensure curtain wall design coordinates with building structure and floor heights.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Curtain Wall Types</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Stick System</h3>
            <p className="text-sm text-blue-900">Assembled piece by piece on site. More flexible but labor-intensive.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Unitized System</h3>
            <p className="text-sm text-blue-900">Pre-fabricated panels installed as complete units. Faster installation.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Point-Supported</h3>
            <p className="text-sm text-blue-900">Glass held by discrete point fixings. Minimal frame visibility.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Structural Glazing</h3>
            <p className="text-sm text-blue-900">Glass bonded to frame with structural silicone. Seamless appearance.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">What is a curtain wall?</h3>
            <p className="text-sm text-gray-700">
              A curtain wall is a non-structural, lightweight exterior wall system that hangs from the building structure 
              like a curtain. It typically consists of glass panels held by aluminum or steel frames and doesn't carry 
              any structural load except its own weight and wind loads.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">What is a typical glass ratio for curtain walls?</h3>
            <p className="text-sm text-gray-700">
              Most commercial curtain walls have 70-90% glass ratio. Office buildings typically use 80-85%, high-end 
              commercial buildings 85-90%, and retail storefronts often exceed 90%. Lower ratios (60-75%) are common 
              in residential applications for better thermal performance.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">How do I choose panel size?</h3>
            <p className="text-sm text-gray-700">
              Panel size depends on building height, wind loads, glass weight, and aesthetic preferences. Standard sizes 
              range from 1.2m × 1.5m to 2.0m × 2.5m. Larger panels reduce frame lines but increase weight and handling 
              complexity. Consult with curtain wall manufacturers for specific recommendations.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Does this calculator include structural calculations?</h3>
            <p className="text-sm text-gray-700">
              No, this calculator provides area and material estimates only. Structural calculations for wind loads, 
              seismic forces, and thermal movements must be performed by qualified structural engineers. This tool is 
              for preliminary planning and budgeting purposes.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">How accurate is the panel count?</h3>
            <p className="text-sm text-gray-700">
              The calculator provides an estimate based on total area divided by panel area. Actual panel count may vary 
              due to building geometry, floor heights, corner conditions, and design details. Add 5-10% for waste and 
              future repairs. Always verify with detailed shop drawings.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">What about doors and operable windows?</h3>
            <p className="text-sm text-gray-700">
              This calculator assumes a continuous curtain wall. For facades with doors and operable windows, calculate 
              those areas separately and subtract from the total. Operable elements typically require different framing 
              and should be coordinated with curtain wall manufacturers.
            </p>
          </div>

        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Curtain Wall Calculator?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-gray-900">Instant Calculations</h3>
              <p className="text-sm">Real-time results as you type with 120ms debouncing for smooth performance.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-semibold text-gray-900">Accurate Estimates</h3>
              <p className="text-sm">Precise calculations using industry-standard formulas and panel configurations.</p>
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
              <span className="text-sm"><strong>Start with presets:</strong> Use building type presets as starting points and adjust based on specific requirements.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">2.</span>
              <span className="text-sm"><strong>Coordinate early:</strong> Involve curtain wall manufacturers early in design for system selection and detailing.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">3.</span>
              <span className="text-sm"><strong>Consider orientation:</strong> Different facades may require different glass types based on solar exposure.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">4.</span>
              <span className="text-sm"><strong>Plan for mockups:</strong> Full-scale mockups are essential for testing performance and appearance.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">5.</span>
              <span className="text-sm"><strong>Verify with professionals:</strong> This tool provides estimates. Always consult with curtain wall specialists for final design.</span>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
