export default function RafterLengthCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Rafter Length Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The Rafter Length Calculator is a free online construction tool designed for calculating roof rafter length using run, rise, or pitch measurements. Perfect for carpenters, builders, architects, civil engineers, and DIY enthusiasts who need accurate rafter calculations for roof framing and construction planning.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Calculate rafter length from run and rise</li>
          <li>Calculate from run and pitch ratio</li>
          <li>Real-time calculations with instant results</li>
          <li>Visual rafter diagram with measurements</li>
          <li>Common pitch presets (3:12 to 12:12)</li>
          <li>Support for feet and meters</li>
          <li>Export results to text and CSV formats</li>
          <li>Calculation history with localStorage</li>
          <li>Mobile-responsive design</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Select input mode (Run & Rise or Run & Pitch)</li>
          <li>Enter run (horizontal distance)</li>
          <li>Enter rise (vertical height) or pitch ratio</li>
          <li>Choose measurement unit (feet or meters)</li>
          <li>View instant rafter length calculation</li>
          <li>Use visual diagram to verify measurements</li>
          <li>Export calculations or save to history</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Understanding Rafter Length</h3>
        <p className="text-gray-700 mb-4">
          Rafter length is the distance from the ridge board to the wall plate along the slope of the roof. It's calculated using the Pythagorean theorem, treating the rafter as the hypotenuse of a right triangle where the run is the base and the rise is the height. Accurate rafter length is essential for proper roof framing, material ordering, and structural integrity.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Methods</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Method 1: Run & Rise</h4>
        <p className="text-gray-700 mb-2">
          Direct calculation using horizontal run and vertical rise measurements.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
          <p className="text-sm font-mono text-gray-700">Rafter Length = √(Run² + Rise²)</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Method 2: Run & Pitch</h4>
        <p className="text-gray-700 mb-2">
          Calculate using run and pitch ratio (e.g., 6:12).
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
          <p className="text-sm font-mono text-gray-700">Rise = (Pitch Rise / Pitch Run) × Run</p>
          <p className="text-sm font-mono text-gray-700">Rafter Length = √(Run² + Rise²)</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example Calculations</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 1: Using Run & Rise</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Run: 10 feet</li>
            <li>Rise: 5 feet</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700 mb-2">Rafter Length = √(10² + 5²) = √(100 + 25) = √125 = 11.18 feet</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 2: Using Run & Pitch</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Run: 12 feet</li>
            <li>Pitch: 6:12</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700 mb-2">Rise = (6 / 12) × 12 = 6 feet</p>
          <p className="text-gray-700 mb-2">Rafter Length = √(12² + 6²) = √(144 + 36) = √180 = 13.42 feet</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 3: Low Slope Roof</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Run: 8 feet</li>
            <li>Rise: 4 feet</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700 mb-2">Rafter Length = √(8² + 4²) = √(64 + 16) = √80 = 8.94 feet</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Rafter Components</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Run:</strong> Horizontal distance from wall plate to ridge centerline</li>
          <li><strong>Rise:</strong> Vertical distance from wall plate to ridge</li>
          <li><strong>Rafter Length:</strong> Actual length of the rafter along the slope</li>
          <li><strong>Pitch:</strong> Roof slope expressed as rise:run ratio</li>
          <li><strong>Overhang:</strong> Additional length beyond the wall (not included in basic calculation)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Roof Pitches</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-2">Pitch</th>
                <th className="text-left py-2">Description</th>
                <th className="text-left py-2">Rafter Factor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2">3:12</td>
                <td className="py-2">Low slope</td>
                <td className="py-2">1.031</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">4:12</td>
                <td className="py-2">Minimum standard</td>
                <td className="py-2">1.054</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">5:12</td>
                <td className="py-2">Common residential</td>
                <td className="py-2">1.083</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">6:12</td>
                <td className="py-2">Standard pitch</td>
                <td className="py-2">1.118</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">8:12</td>
                <td className="py-2">Very steep</td>
                <td className="py-2">1.202</td>
              </tr>
              <tr>
                <td className="py-2">12:12</td>
                <td className="py-2">Extremely steep</td>
                <td className="py-2">1.414</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-600 mt-2">
            Rafter Factor = Rafter Length / Run (multiply run by factor for quick calculation)
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Applications</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Roof framing and construction</li>
          <li>Material estimation and ordering</li>
          <li>Construction cost calculation</li>
          <li>Building permit applications</li>
          <li>Architectural drawings and specifications</li>
          <li>Renovation and addition planning</li>
          <li>DIY shed and garage construction</li>
          <li>Educational purposes for carpentry students</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Additional Considerations</h3>
        <p className="text-gray-700 mb-2">
          When cutting rafters, remember to account for:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Overhang:</strong> Add extra length for eave overhang</li>
          <li><strong>Ridge Cut:</strong> Plumb cut at the ridge (typically half the ridge board thickness)</li>
          <li><strong>Bird's Mouth:</strong> Notch where rafter sits on wall plate</li>
          <li><strong>Tail Cut:</strong> Cut at the eave end</li>
          <li><strong>Rafter Thickness:</strong> Account for actual lumber dimensions</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>100% free with no registration required</li>
          <li>Instant results with real-time calculations</li>
          <li>Works entirely in your browser - no installation needed</li>
          <li>Mobile-friendly responsive design</li>
          <li>Multiple input methods for flexibility</li>
          <li>Visual diagrams for better understanding</li>
          <li>Export capabilities for documentation</li>
          <li>Accurate Pythagorean theorem calculations</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Measuring Tips</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Measure run from outside of wall plate to center of ridge</li>
          <li>Measure rise from top of wall plate to top of ridge</li>
          <li>For existing roofs, use a level and measuring tape</li>
          <li>Double-check measurements before cutting</li>
          <li>Account for actual lumber dimensions (2x6 is actually 1.5" x 5.5")</li>
          <li>Add overhang length to calculated rafter length</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Important Notes</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>This calculator provides basic rafter length for planning purposes</li>
          <li>Actual rafter cutting requires additional measurements (overhang, cuts)</li>
          <li>Always verify calculations before cutting expensive lumber</li>
          <li>Consider local building codes for rafter spacing and sizing</li>
          <li>Consult with professionals for complex roof designs</li>
          <li>This tool calculates common rafters, not hip or valley rafters</li>
          <li>Account for load requirements and span tables</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Related Calculators</h3>
        <p className="text-gray-700 mb-2">
          For comprehensive roof construction planning, also check out:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Roof Pitch Calculator:</strong> Calculate roof slope and angle</li>
          <li><strong>Roof Area Calculator:</strong> Calculate total roof surface area</li>
          <li><strong>Floor Area Calculator:</strong> Calculate building floor area</li>
          <li><strong>Wall Area Calculator:</strong> Estimate wall surface area</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>Pro Tip:</strong> Use the common pitch presets to quickly calculate rafter lengths for standard roof pitches. The visual diagram helps you verify that your measurements make sense before cutting lumber. Remember to add overhang length to the calculated rafter length!
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-yellow-900">
            <strong>Disclaimer:</strong> This calculator provides basic rafter length calculations for planning purposes. Actual roof framing requires consideration of structural loads, building codes, lumber sizing, and proper cutting techniques. Always consult with licensed contractors or structural engineers for construction projects and verify all measurements before cutting materials.
          </p>
        </div>

      </div>
    </div>
  );
}
