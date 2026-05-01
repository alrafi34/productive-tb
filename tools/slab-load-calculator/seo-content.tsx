export default function SlabLoadCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Slab Load Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The Slab Load Calculator is a free online civil engineering tool designed for calculating dead load, live load, and total load capacity of concrete slabs. Perfect for civil engineers, architects, construction professionals, and students who need quick and accurate slab load estimations.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Calculate slab dead load (self-weight) automatically</li>
          <li>Input live load and additional loads</li>
          <li>Real-time calculations with instant results</li>
          <li>Unit conversion between metric and imperial</li>
          <li>Slab type presets (residential, commercial, industrial)</li>
          <li>Warning system for extreme values</li>
          <li>Export results to text and CSV formats</li>
          <li>Calculation history with localStorage</li>
          <li>Mobile-responsive design</li>
          <li>Formula display for educational purposes</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Enter slab dimensions (length, width, thickness)</li>
          <li>Input concrete density (default: 25 kN/m³)</li>
          <li>Specify live load based on usage (residential: 2 kN/m², commercial: 4-6 kN/m²)</li>
          <li>Add any additional loads (finishes, partitions, etc.)</li>
          <li>View instant results including dead load, total load per m², and total slab load</li>
          <li>Export calculations or save to history for future reference</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Load Types Explained</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Dead Load</h4>
        <p className="text-gray-700 mb-3">
          Dead load is the self-weight of the slab, calculated as thickness × concrete density. This is a permanent load that doesn't change over time. Standard concrete density is 25 kN/m³ (2,500 kg/m³ or 150 pcf).
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Live Load</h4>
        <p className="text-gray-700 mb-3">
          Live load is the variable load from occupancy, furniture, equipment, and movable items. It varies based on building usage:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li><strong>Residential:</strong> 1.5-2 kN/m² (30-40 psf)</li>
          <li><strong>Office/Commercial:</strong> 3-4 kN/m² (60-80 psf)</li>
          <li><strong>Retail/Assembly:</strong> 4-5 kN/m² (80-100 psf)</li>
          <li><strong>Storage/Industrial:</strong> 6-10 kN/m² (120-200 psf)</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Additional Load</h4>
        <p className="text-gray-700 mb-4">
          Additional loads include finishes (tiles, flooring), partitions, ceiling systems, and MEP (mechanical, electrical, plumbing) installations. Typical values: 0.5-2 kN/m².
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Formulas</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Step-by-Step Calculation</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Area:</strong> Area = Length × Width (m²)</li>
          <li><strong>Dead Load:</strong> Dead Load = Thickness × Density (kN/m²)</li>
          <li><strong>Total Load per m²:</strong> Total = Dead Load + Live Load + Additional Load (kN/m²)</li>
          <li><strong>Total Slab Load:</strong> Total Load = Total per m² × Area (kN)</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example Calculation</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Length: 5 m</li>
            <li>Width: 4 m</li>
            <li>Thickness: 0.15 m</li>
            <li>Concrete Density: 25 kN/m³</li>
            <li>Live Load: 2 kN/m²</li>
            <li>Additional Load: 0 kN/m²</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Area = 5 × 4 = 20 m²</li>
            <li>Dead Load = 0.15 × 25 = 3.75 kN/m²</li>
            <li>Total Load/m² = 3.75 + 2 + 0 = 5.75 kN/m²</li>
            <li>Total Slab Load = 5.75 × 20 = 115 kN</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Typical Slab Thicknesses</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Residential Slabs:</strong> 100-150mm (4-6 inches)</li>
          <li><strong>Commercial Slabs:</strong> 150-200mm (6-8 inches)</li>
          <li><strong>Industrial Slabs:</strong> 200-300mm (8-12 inches)</li>
          <li><strong>Heavy Duty:</strong> 300mm+ (12+ inches)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Slab Type Presets</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Residential Slab:</strong> 150mm thick, 2 kN/m² live load</li>
          <li><strong>Commercial Slab:</strong> 200mm thick, 4 kN/m² live load</li>
          <li><strong>Industrial Slab:</strong> 250mm thick, 6 kN/m² live load</li>
          <li><strong>Light Residential:</strong> 125mm thick, 1.5 kN/m² live load</li>
          <li><strong>Heavy Duty:</strong> 300mm thick, 8 kN/m² live load</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Applications</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Preliminary structural design of floor slabs</li>
          <li>Load estimation for construction planning</li>
          <li>Educational tool for engineering students</li>
          <li>Quick verification of slab loads</li>
          <li>Comparison of different slab configurations</li>
          <li>Material quantity estimation</li>
          <li>Cost estimation for construction projects</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>100% free with no registration required</li>
          <li>Instant results with real-time calculations</li>
          <li>Works entirely in your browser - no installation needed</li>
          <li>Mobile-friendly responsive design</li>
          <li>Export capabilities for documentation</li>
          <li>Slab type presets for quick calculations</li>
          <li>Warning system for unusual values</li>
          <li>Based on standard engineering formulas</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Unit Conversions</h3>
        <p className="text-gray-700 mb-2">
          The calculator supports both metric and imperial units:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Length:</strong> meters (m) ↔ feet (ft)</li>
          <li><strong>Area:</strong> square meters (m²) ↔ square feet (sq ft)</li>
          <li><strong>Load:</strong> kilonewtons per square meter (kN/m²) ↔ pounds per square foot (psf)</li>
          <li><strong>Total Load:</strong> kilonewtons (kN) ↔ pounds (lb)</li>
          <li><strong>Density:</strong> kN/m³ ↔ pounds per cubic foot (pcf)</li>
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
          <li>Actual slab design requires consideration of bending moments, shear, and deflection</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Building Code References</h3>
        <p className="text-gray-700 mb-2">
          Live load values should comply with local building codes:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>IS 875 (India):</strong> Part 2 - Imposed Loads</li>
          <li><strong>ASCE 7 (USA):</strong> Minimum Design Loads for Buildings</li>
          <li><strong>Eurocode 1 (Europe):</strong> Actions on Structures</li>
          <li><strong>BS 6399 (UK):</strong> Loading for Buildings</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>Pro Tip:</strong> Use slab type presets for quick calculations, then adjust values based on your specific project requirements. Always check warnings for unusual values that may indicate input errors or special design considerations.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-yellow-900">
            <strong>Disclaimer:</strong> This calculator provides preliminary load estimations for planning purposes. Actual structural design must consider additional factors including load combinations, safety factors, deflection limits, and must comply with applicable building codes. Always consult a licensed structural engineer for final design and approval.
          </p>
        </div>

      </div>
    </div>
  );
}
