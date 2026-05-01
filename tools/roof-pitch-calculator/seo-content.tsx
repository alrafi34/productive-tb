export default function RoofPitchCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Roof Pitch Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The Roof Pitch Calculator is a free online construction tool designed for calculating roof slope, angle, and pitch ratio using rise and run measurements. Perfect for architects, civil engineers, contractors, builders, and DIY homeowners who need accurate roof pitch calculations for construction planning and material estimation.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Calculate pitch from rise and run measurements</li>
          <li>Calculate from pitch ratio or angle</li>
          <li>Real-time calculations with instant results</li>
          <li>Visual pitch diagram with angle display</li>
          <li>Common pitch presets (3:12 to 12:12)</li>
          <li>Multiple unit support (inches, feet, meters)</li>
          <li>Export results to text and CSV formats</li>
          <li>Calculation history with localStorage</li>
          <li>Mobile-responsive design</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Select input mode (Rise & Run, Pitch Ratio, or Angle)</li>
          <li>Enter your measurements</li>
          <li>Choose measurement unit (inches, feet, or meters)</li>
          <li>View instant results with pitch, angle, and slope</li>
          <li>Use visual diagram to understand the pitch</li>
          <li>Export calculations or save to history</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Understanding Roof Pitch</h3>
        <p className="text-gray-700 mb-4">
          Roof pitch is the steepness or slope of a roof, typically expressed as a ratio of vertical rise to horizontal run. The standard format is X:12, meaning X inches of rise for every 12 inches of horizontal run. Roof pitch affects drainage, material selection, structural design, and aesthetics.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Methods</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Method 1: Rise & Run</h4>
        <p className="text-gray-700 mb-2">
          The most common method using vertical rise and horizontal run measurements.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
          <p className="text-sm font-mono text-gray-700">Angle = arctan(rise / run) × (180 / π)</p>
          <p className="text-sm font-mono text-gray-700">Pitch = (rise / run) × 12</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Method 2: Pitch Ratio</h4>
        <p className="text-gray-700 mb-2">
          Enter pitch directly as a ratio (e.g., 6:12).
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Method 3: Angle</h4>
        <p className="text-gray-700 mb-4">
          Calculate pitch from roof angle in degrees.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example Calculations</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 1: Standard Residential Roof</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Rise: 6 inches</li>
            <li>Run: 12 inches</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Results:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Pitch: 6:12</li>
            <li>Angle: 26.57°</li>
            <li>Slope: 50%</li>
          </ul>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 2: Low Slope Roof</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Rise: 4 feet</li>
            <li>Run: 12 feet</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Results:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Pitch: 4:12</li>
            <li>Angle: 18.43°</li>
            <li>Slope: 33.33%</li>
          </ul>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 3: From Angle</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Angle: 30°</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Results:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Pitch: 6.93:12</li>
            <li>Slope: 57.74%</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Roof Pitches</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-2">Pitch</th>
                <th className="text-left py-2">Angle</th>
                <th className="text-left py-2">Slope %</th>
                <th className="text-left py-2">Common Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2">3:12</td>
                <td className="py-2">14.04°</td>
                <td className="py-2">25%</td>
                <td className="py-2">Minimum for shingles</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">4:12</td>
                <td className="py-2">18.43°</td>
                <td className="py-2">33.33%</td>
                <td className="py-2">Modern homes</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">6:12</td>
                <td className="py-2">26.57°</td>
                <td className="py-2">50%</td>
                <td className="py-2">Standard residential</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">8:12</td>
                <td className="py-2">33.69°</td>
                <td className="py-2">66.67%</td>
                <td className="py-2">Traditional homes</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">9:12</td>
                <td className="py-2">36.87°</td>
                <td className="py-2">75%</td>
                <td className="py-2">Tudor, Gothic</td>
              </tr>
              <tr>
                <td className="py-2">12:12</td>
                <td className="py-2">45°</td>
                <td className="py-2">100%</td>
                <td className="py-2">A-frame, specialty</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Pitch Categories</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Flat (0-2:12):</strong> Nearly horizontal, requires special waterproofing</li>
          <li><strong>Low Slope (2:12-4:12):</strong> Minimal pitch, modern designs</li>
          <li><strong>Conventional (4:12-9:12):</strong> Standard residential roofs</li>
          <li><strong>High Slope (9:12-12:12):</strong> Steep roofs, traditional styles</li>
          <li><strong>Steep (12:12+):</strong> Very steep, specialty applications</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Roof Pitch Matters</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Water Drainage:</strong> Steeper pitches shed water faster</li>
          <li><strong>Snow Load:</strong> Higher pitches prevent snow accumulation</li>
          <li><strong>Material Selection:</strong> Different materials require minimum pitches</li>
          <li><strong>Attic Space:</strong> Steeper roofs provide more usable attic space</li>
          <li><strong>Aesthetics:</strong> Pitch affects architectural style</li>
          <li><strong>Cost:</strong> Steeper roofs require more materials and labor</li>
          <li><strong>Ventilation:</strong> Pitch affects attic ventilation design</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Minimum Pitch Requirements</h3>
        <p className="text-gray-700 mb-2">
          Different roofing materials have minimum pitch requirements:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Asphalt Shingles:</strong> 2:12 minimum (4:12 recommended)</li>
          <li><strong>Metal Roofing:</strong> 1:12 to 3:12 depending on type</li>
          <li><strong>Clay/Concrete Tiles:</strong> 3:12 minimum</li>
          <li><strong>Slate:</strong> 4:12 minimum</li>
          <li><strong>Wood Shakes:</strong> 3:12 minimum</li>
          <li><strong>Built-up Roofing:</strong> 0.25:12 minimum</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Applications</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>New construction roof design</li>
          <li>Roof replacement planning</li>
          <li>Material selection and estimation</li>
          <li>Building permit applications</li>
          <li>Architectural drawings and specifications</li>
          <li>Structural load calculations</li>
          <li>Drainage system design</li>
          <li>Solar panel installation planning</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Measuring Roof Pitch</h3>
        <p className="text-gray-700 mb-2">
          To measure existing roof pitch:
        </p>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Place a level horizontally on the roof</li>
          <li>Measure 12 inches along the level from the roof surface</li>
          <li>Measure vertically from the 12-inch mark to the roof surface</li>
          <li>This vertical measurement is your rise (for 12 inches run)</li>
          <li>Express as rise:12 (e.g., 6:12)</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>100% free with no registration required</li>
          <li>Instant results with real-time calculations</li>
          <li>Works entirely in your browser - no installation needed</li>
          <li>Mobile-friendly responsive design</li>
          <li>Multiple input methods for flexibility</li>
          <li>Visual diagrams for better understanding</li>
          <li>Export capabilities for documentation</li>
          <li>Accurate trigonometric calculations</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Important Notes</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>This calculator provides pitch calculations for planning purposes</li>
          <li>Always verify measurements on-site before construction</li>
          <li>Check local building codes for minimum pitch requirements</li>
          <li>Consider climate and weather conditions in pitch selection</li>
          <li>Consult with roofing professionals for complex projects</li>
          <li>Steeper pitches require additional safety measures during construction</li>
          <li>This tool is for estimation only, not structural design</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Related Calculators</h3>
        <p className="text-gray-700 mb-2">
          For comprehensive roofing calculations, also check out:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Roof Area Calculator:</strong> Calculate total roof surface area</li>
          <li><strong>Floor Area Calculator:</strong> Calculate building floor area</li>
          <li><strong>Wall Area Calculator:</strong> Estimate wall surface area</li>
          <li><strong>Paint Required Calculator:</strong> Calculate paint needed</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>Pro Tip:</strong> Use the common pitch presets to quickly see standard roof pitches and their angles. The visual diagram helps you understand how different pitches look in practice. Remember that steeper pitches (higher numbers) mean steeper roofs.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-yellow-900">
            <strong>Disclaimer:</strong> This calculator provides roof pitch estimates for planning purposes. Actual roof design must consider structural loads, local building codes, material requirements, and climate conditions. Always consult with licensed architects and roofing professionals for final design and construction decisions.
          </p>
        </div>

      </div>
    </div>
  );
}
