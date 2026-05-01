export default function StructuralLoadCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Structural Load Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The Structural Load Calculator is a free online civil engineering tool designed for calculating structural loads on beams and slabs. Perfect for civil engineers, architects, construction professionals, and students who need quick and accurate load estimations for structural design and analysis.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Calculate area loads for floors and slabs</li>
          <li>Calculate beam loads with uniform distribution</li>
          <li>Real-time calculations with instant results</li>
          <li>Unit conversion between metric and imperial</li>
          <li>Load breakdown visualization for area loads</li>
          <li>Load presets for different building types</li>
          <li>Export results to text and CSV formats</li>
          <li>Calculation history with localStorage</li>
          <li>Mobile-responsive design</li>
          <li>Formula display for educational purposes</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">For Area Load (Floor/Slab)</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Select "Area Load (Floor/Slab)" as calculation type</li>
          <li>Enter the area in square meters or square feet</li>
          <li>Input dead load (self-weight of structure)</li>
          <li>Input live load (occupancy and movable items)</li>
          <li>Add any additional loads (optional)</li>
          <li>View instant results with load breakdown</li>
          <li>Export calculations or save to history</li>
        </ol>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">For Beam Load (Linear)</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Select "Beam Load (Linear)" as calculation type</li>
          <li>Enter beam length in meters or feet</li>
          <li>Input uniform load per unit length</li>
          <li>View instant total load calculation</li>
          <li>Export or save results as needed</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Load Types Explained</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Dead Load</h4>
        <p className="text-gray-700 mb-3">
          Dead load is the permanent load from the self-weight of structural elements including slabs, beams, columns, walls, finishes, and fixed equipment. This load remains constant throughout the structure's life.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Live Load</h4>
        <p className="text-gray-700 mb-3">
          Live load is the variable load from occupancy, furniture, equipment, and movable items. It varies based on building usage:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li><strong>Residential:</strong> 1.5-2 kN/m² (30-40 psf)</li>
          <li><strong>Office/Commercial:</strong> 3-4 kN/m² (60-80 psf)</li>
          <li><strong>Retail/Assembly:</strong> 4-5 kN/m² (80-100 psf)</li>
          <li><strong>Storage/Warehouse:</strong> 6-10 kN/m² (120-200 psf)</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Additional Load</h4>
        <p className="text-gray-700 mb-4">
          Additional loads include partitions, ceiling systems, MEP installations, and other superimposed loads not included in dead or live loads. Typical values: 0.5-2 kN/m².
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Formulas</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Area Load Formula</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 font-mono">
            Total Load = Area × (Dead Load + Live Load + Additional Load)
          </p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Beam Load Formula</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 font-mono">
            Total Load = Length × Uniform Load
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example Calculations</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 1: Residential Floor</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Area: 100 m²</li>
            <li>Dead Load: 3 kN/m²</li>
            <li>Live Load: 2 kN/m²</li>
            <li>Additional Load: 0.5 kN/m²</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700 mb-2">Total Load = 100 × (3 + 2 + 0.5) = 550 kN</p>
          <p className="text-gray-700 mb-2"><strong>Breakdown:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Dead Load Contribution: 300 kN</li>
            <li>Live Load Contribution: 200 kN</li>
            <li>Additional Load Contribution: 50 kN</li>
          </ul>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 2: Simply Supported Beam</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Length: 5 m</li>
            <li>Uniform Load: 2 kN/m</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700">Total Load = 5 × 2 = 10 kN</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Load Presets</h3>
        <p className="text-gray-700 mb-2">
          The calculator includes presets for common building types:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Residential Floor:</strong> Dead: 3 kN/m², Live: 2 kN/m², Additional: 0.5 kN/m²</li>
          <li><strong>Office Space:</strong> Dead: 4 kN/m², Live: 3 kN/m², Additional: 1 kN/m²</li>
          <li><strong>Retail/Assembly:</strong> Dead: 4 kN/m², Live: 5 kN/m², Additional: 1 kN/m²</li>
          <li><strong>Storage/Warehouse:</strong> Dead: 5 kN/m², Live: 8 kN/m², Additional: 2 kN/m²</li>
          <li><strong>Light Residential:</strong> Dead: 2.5 kN/m², Live: 1.5 kN/m², Additional: 0 kN/m²</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Applications</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Preliminary structural design and analysis</li>
          <li>Load estimation for construction planning</li>
          <li>Educational tool for engineering students</li>
          <li>Quick verification of structural loads</li>
          <li>Comparison of different load scenarios</li>
          <li>Foundation design load calculations</li>
          <li>Beam and slab sizing estimations</li>
          <li>Construction cost estimation</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>100% free with no registration required</li>
          <li>Instant results with real-time calculations</li>
          <li>Works entirely in your browser - no installation needed</li>
          <li>Mobile-friendly responsive design</li>
          <li>Export capabilities for documentation</li>
          <li>Load presets for quick calculations</li>
          <li>Visual load breakdown for better understanding</li>
          <li>Based on standard engineering formulas</li>
          <li>Supports both metric and imperial units</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Unit Conversions</h3>
        <p className="text-gray-700 mb-2">
          The calculator supports both metric and imperial units:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Area:</strong> square meters (m²) ↔ square feet (sq ft)</li>
          <li><strong>Load Intensity:</strong> kilonewtons per square meter (kN/m²) ↔ pounds per square foot (psf)</li>
          <li><strong>Total Load:</strong> kilonewtons (kN) ↔ pounds (lb)</li>
          <li><strong>Length:</strong> meters (m) ↔ feet (ft)</li>
          <li><strong>Linear Load:</strong> kN/m ↔ lb/ft</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Load Combinations</h3>
        <p className="text-gray-700 mb-2">
          For actual structural design, loads must be combined according to building codes:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Service Load:</strong> Dead Load + Live Load</li>
          <li><strong>Ultimate Load (LRFD):</strong> 1.2 × Dead Load + 1.6 × Live Load</li>
          <li><strong>Working Stress:</strong> Dead Load + Live Load (with safety factors in material strength)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Important Notes</h3>
        <p className="text-gray-700 mb-2">
          This calculator provides preliminary load estimations. For actual structural design:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Always verify results with detailed structural analysis</li>
          <li>Consider load combinations as per building codes</li>
          <li>Account for dynamic loads, impact factors, and safety factors</li>
          <li>Follow local building codes and standards (IS, ACI, Eurocode, etc.)</li>
          <li>Consult with a licensed structural engineer for critical applications</li>
          <li>This tool is for educational and preliminary design purposes only</li>
          <li>Actual design requires consideration of bending moments, shear, and deflection</li>
          <li>Wind loads, seismic loads, and other special loads are not included</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Building Code References</h3>
        <p className="text-gray-700 mb-2">
          Load values should comply with local building codes:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>IS 875 (India):</strong> Part 1 (Dead Loads), Part 2 (Imposed Loads)</li>
          <li><strong>ASCE 7 (USA):</strong> Minimum Design Loads for Buildings</li>
          <li><strong>Eurocode 1 (Europe):</strong> Actions on Structures</li>
          <li><strong>BS 6399 (UK):</strong> Loading for Buildings</li>
          <li><strong>NBC (Canada):</strong> National Building Code of Canada</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Related Calculators</h3>
        <p className="text-gray-700 mb-2">
          For comprehensive structural analysis, also check out:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Beam Load Calculator:</strong> Calculate reactions, moments, and shear forces</li>
          <li><strong>Slab Load Calculator:</strong> Detailed slab load analysis with thickness</li>
          <li><strong>Column Load Calculator:</strong> Column capacity and slenderness analysis</li>
          <li><strong>Steel Quantity Calculator:</strong> Estimate reinforcement requirements</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>Pro Tip:</strong> Use load presets for quick calculations, then adjust values based on your specific project requirements. The load breakdown visualization helps understand how different loads contribute to the total structural load.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-yellow-900">
            <strong>Disclaimer:</strong> This calculator provides preliminary load estimations for planning purposes. Actual structural design must consider load combinations, safety factors, deflection limits, and must comply with applicable building codes. Always consult a licensed structural engineer for final design and approval.
          </p>
        </div>

      </div>
    </div>
  );
}
