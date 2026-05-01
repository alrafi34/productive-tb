export default function RoofAreaCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Roof Area Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The Roof Area Calculator is a free online construction tool designed for calculating roof surface area based on different roof types and dimensions. Perfect for contractors, architects, civil engineers, homeowners, and DIY builders who need accurate roof measurements for material estimation and cost calculation.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Calculate area for 4 roof types (flat, gable, hip, shed)</li>
          <li>Real-time calculations with instant results</li>
          <li>Unit conversion between metric and imperial</li>
          <li>Visual roof type diagrams</li>
          <li>Pitch angle support for sloped roofs</li>
          <li>Export results to text and CSV formats</li>
          <li>Calculation history with localStorage</li>
          <li>Mobile-responsive design</li>
          <li>Formula display for educational purposes</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Select your roof type from the dropdown</li>
          <li>Enter roof length and width</li>
          <li>If applicable, enter roof pitch angle</li>
          <li>Choose unit system (metric or imperial)</li>
          <li>View instant results with area calculation</li>
          <li>Export calculations or save to history</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Supported Roof Types</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Flat Roof</h4>
        <p className="text-gray-700 mb-2">
          A horizontal or nearly horizontal roof surface. Simplest calculation as it's just length × width.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
          <p className="text-sm font-mono text-gray-700">Formula: Area = Length × Width</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Gable Roof</h4>
        <p className="text-gray-700 mb-2">
          Two sloped sides meeting at a central ridge. Most common residential roof type. Requires pitch angle for accurate calculation.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
          <p className="text-sm font-mono text-gray-700">Formula: Area = 2 × (Length × (Width/2) / cos(pitch))</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Hip Roof</h4>
        <p className="text-gray-700 mb-2">
          Four sloped sides meeting at a peak or ridge. More complex than gable, provides better wind resistance.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
          <p className="text-sm font-mono text-gray-700">Formula: Area ≈ Length × Width × factor (based on pitch)</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Shed Roof</h4>
        <p className="text-gray-700 mb-4">
          Single sloped surface, often used for additions, porches, or modern designs. Simple calculation with pitch adjustment.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
          <p className="text-sm font-mono text-gray-700">Formula: Area = Length × (Width / cos(pitch))</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example Calculations</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 1: Flat Roof</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Roof Type: Flat</li>
            <li>Length: 20 m</li>
            <li>Width: 10 m</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700">Area = 20 × 10 = 200 m²</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 2: Gable Roof</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Roof Type: Gable</li>
            <li>Length: 10 m</li>
            <li>Width: 8 m</li>
            <li>Pitch: 30°</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700">Area = 2 × (10 × (8/2) / cos(30°)) ≈ 92.4 m²</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 3: Shed Roof</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Roof Type: Shed</li>
            <li>Length: 12 m</li>
            <li>Width: 6 m</li>
            <li>Pitch: 20°</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700">Area = 12 × (6 / cos(20°)) ≈ 76.6 m²</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Understanding Roof Pitch</h3>
        <p className="text-gray-700 mb-4">
          Roof pitch is the angle of the roof slope, measured in degrees from horizontal. Common residential roof pitches range from 15° to 45°:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Low Pitch (10-20°):</strong> Minimal slope, often for modern designs</li>
          <li><strong>Medium Pitch (20-35°):</strong> Standard residential roofs</li>
          <li><strong>Steep Pitch (35-45°):</strong> Traditional or snow-prone areas</li>
          <li><strong>Very Steep (45°+):</strong> Gothic or specialized designs</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Applications</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Roofing material estimation (shingles, tiles, metal sheets)</li>
          <li>Construction cost calculation</li>
          <li>Insulation material requirements</li>
          <li>Waterproofing membrane sizing</li>
          <li>Solar panel installation planning</li>
          <li>Roof replacement projects</li>
          <li>Building permit applications</li>
          <li>Real estate property assessments</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Material Estimation Tips</h3>
        <p className="text-gray-700 mb-2">
          Once you have the roof area, add waste factors for material ordering:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Shingles:</strong> Add 10-15% for waste and cuts</li>
          <li><strong>Metal Roofing:</strong> Add 5-10% for overlaps</li>
          <li><strong>Tiles:</strong> Add 15-20% for breakage and cuts</li>
          <li><strong>Underlayment:</strong> Add 10% for overlaps</li>
          <li><strong>Complex Roofs:</strong> Add 20-25% for valleys and hips</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>100% free with no registration required</li>
          <li>Instant results with real-time calculations</li>
          <li>Works entirely in your browser - no installation needed</li>
          <li>Mobile-friendly responsive design</li>
          <li>Supports multiple roof types</li>
          <li>Export capabilities for documentation</li>
          <li>Visual diagrams for better understanding</li>
          <li>Accurate formulas based on geometry</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Unit Conversions</h3>
        <p className="text-gray-700 mb-2">
          The calculator supports both metric and imperial units:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Length:</strong> meters (m) ↔ feet (ft)</li>
          <li><strong>Area:</strong> square meters (m²) ↔ square feet (sq ft)</li>
          <li><strong>Conversion Factor:</strong> 1 m² = 10.764 sq ft</li>
          <li><strong>Pitch:</strong> Always in degrees (0-89°)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Measurement Tips</h3>
        <p className="text-gray-700 mb-2">
          For accurate roof area calculations:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Measure length along the ridge or eave</li>
          <li>Measure width from eave to eave (perpendicular to length)</li>
          <li>For pitch, use a level and measuring tape or digital angle finder</li>
          <li>Account for overhangs in your measurements</li>
          <li>For complex roofs, break into sections and calculate separately</li>
          <li>Always verify measurements before ordering materials</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Roof Pitches</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-2">Pitch (degrees)</th>
                <th className="text-left py-2">Rise/Run</th>
                <th className="text-left py-2">Common Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2">14°</td>
                <td className="py-2">3:12</td>
                <td className="py-2">Low slope, modern</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">18.4°</td>
                <td className="py-2">4:12</td>
                <td className="py-2">Minimum for shingles</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">26.6°</td>
                <td className="py-2">6:12</td>
                <td className="py-2">Standard residential</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">33.7°</td>
                <td className="py-2">8:12</td>
                <td className="py-2">Steep residential</td>
              </tr>
              <tr>
                <td className="py-2">45°</td>
                <td className="py-2">12:12</td>
                <td className="py-2">Very steep, Gothic</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Important Notes</h3>
        <p className="text-gray-700 mb-2">
          This calculator provides roof surface area estimates:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Results are approximations for planning purposes</li>
          <li>Complex roofs with dormers, valleys, or multiple sections require separate calculations</li>
          <li>Always add waste factors when ordering materials</li>
          <li>Verify measurements on-site before purchasing</li>
          <li>Consult with roofing professionals for complex projects</li>
          <li>Local building codes may have specific requirements</li>
          <li>This tool is for estimation only, not structural design</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Related Calculators</h3>
        <p className="text-gray-700 mb-2">
          For comprehensive construction planning, also check out:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Floor Area Calculator:</strong> Calculate building floor area</li>
          <li><strong>Wall Area Calculator:</strong> Estimate wall surface area</li>
          <li><strong>Paint Required Calculator:</strong> Calculate paint needed</li>
          <li><strong>Tile Quantity Calculator:</strong> Estimate roofing tiles</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>Pro Tip:</strong> For complex roofs with multiple sections, calculate each section separately and add them together. Use the visual diagrams to understand how different roof types affect the total area calculation.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-yellow-900">
            <strong>Disclaimer:</strong> This calculator provides roof area estimates for material planning purposes. Actual material requirements may vary based on roof complexity, waste factors, and installation methods. Always verify measurements and consult with roofing professionals for accurate material estimates and structural considerations.
          </p>
        </div>

      </div>
    </div>
  );
}
