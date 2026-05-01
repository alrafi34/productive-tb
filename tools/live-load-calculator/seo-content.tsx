export default function LiveLoadCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Live Load Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The Live Load Calculator is a free online civil engineering tool designed for calculating live loads in buildings based on occupancy type and area. Perfect for civil engineers, structural engineers, architects, and construction professionals who need quick and accurate live load estimations for structural design.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Calculate live loads for 12+ building types</li>
          <li>Real-time calculations with instant results</li>
          <li>Unit conversion between metric (kN/m²) and imperial (psf)</li>
          <li>Building code references (IS 875, ASCE 7)</li>
          <li>Load reference table for quick lookup</li>
          <li>Export results to text and CSV formats</li>
          <li>Calculation history with localStorage</li>
          <li>Mobile-responsive design</li>
          <li>Formula display for educational purposes</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Select building or room type from dropdown</li>
          <li>Enter the floor or room area</li>
          <li>Choose unit system (metric or imperial)</li>
          <li>View instant results with load breakdown</li>
          <li>Export calculations or save to history</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What is Live Load?</h3>
        <p className="text-gray-700 mb-4">
          Live load refers to movable or temporary loads in a building, including people, furniture, equipment, movable partitions, and stored materials. Unlike dead loads (permanent structural weight), live loads vary based on building occupancy and usage patterns. Live loads are critical for structural design and must comply with building codes.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Standard Live Load Values</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Residential Buildings</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li><strong>Dwelling Units:</strong> 2.0 kN/m² (40 psf)</li>
          <li><strong>Balconies:</strong> 3.0 kN/m² (60 psf)</li>
          <li><strong>Accessible Roofs:</strong> 1.5 kN/m² (30 psf)</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Commercial Buildings</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li><strong>Office Spaces:</strong> 3.0 kN/m² (50 psf)</li>
          <li><strong>Retail Stores:</strong> 4.0 kN/m² (75 psf)</li>
          <li><strong>Corridors:</strong> 4.0 kN/m² (80 psf)</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Public Buildings</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li><strong>Assembly Halls:</strong> 5.0 kN/m² (100 psf)</li>
          <li><strong>Classrooms:</strong> 3.0 kN/m² (40 psf)</li>
          <li><strong>Libraries:</strong> 6.0 kN/m² (150 psf)</li>
          <li><strong>Stairs:</strong> 4.5 kN/m² (100 psf)</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Storage & Industrial</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li><strong>Storage/Warehouse:</strong> 7.5 kN/m² (125 psf)</li>
          <li><strong>Parking Areas:</strong> 2.5 kN/m² (50 psf)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Formula</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 font-mono text-lg mb-2">
            Total Live Load = Area × Load per Unit Area
          </p>
          <p className="text-gray-600 text-sm">
            Where load per unit area is determined by building code based on occupancy type
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example Calculations</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 1: Residential Floor</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Building Type: Residential</li>
            <li>Area: 100 m²</li>
            <li>Live Load: 2.0 kN/m²</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700">Total Live Load = 100 × 2.0 = 200 kN</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 2: Office Space</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Building Type: Office</li>
            <li>Area: 50 m²</li>
            <li>Live Load: 3.0 kN/m²</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700">Total Live Load = 50 × 3.0 = 150 kN</p>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Example 3: Assembly Hall</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-gray-700 mb-2"><strong>Given:</strong></p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
            <li>Building Type: Assembly Hall</li>
            <li>Area: 200 m²</li>
            <li>Live Load: 5.0 kN/m²</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Calculation:</strong></p>
          <p className="text-gray-700">Total Live Load = 200 × 5.0 = 1000 kN</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Applications</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Structural design and analysis</li>
          <li>Floor system design</li>
          <li>Beam and column sizing</li>
          <li>Foundation design calculations</li>
          <li>Building permit applications</li>
          <li>Construction planning and estimation</li>
          <li>Educational tool for engineering students</li>
          <li>Quick verification of design loads</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>100% free with no registration required</li>
          <li>Instant results with real-time calculations</li>
          <li>Works entirely in your browser - no installation needed</li>
          <li>Mobile-friendly responsive design</li>
          <li>Based on standard building codes (IS 875, ASCE 7)</li>
          <li>Export capabilities for documentation</li>
          <li>Load reference table for quick lookup</li>
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
          <li><strong>Conversion Factor:</strong> 1 kN/m² = 20.885 psf</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Building Code References</h3>
        <p className="text-gray-700 mb-2">
          Live load values are based on international building codes:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>IS 875 Part 2 (India):</strong> Code of Practice for Design Loads - Imposed Loads</li>
          <li><strong>ASCE 7 (USA):</strong> Minimum Design Loads and Associated Criteria for Buildings</li>
          <li><strong>Eurocode 1 (Europe):</strong> Actions on Structures - Imposed Loads</li>
          <li><strong>BS 6399 (UK):</strong> Loading for Buildings</li>
          <li><strong>NBC (Canada):</strong> National Building Code of Canada</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Load Reduction</h3>
        <p className="text-gray-700 mb-4">
          Building codes allow live load reduction for large tributary areas and multiple floors. This calculator provides basic live load values. For actual design, consult building codes for:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Live load reduction factors for large areas</li>
          <li>Influence area considerations</li>
          <li>Multi-story reduction factors</li>
          <li>Special loading conditions</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Important Notes</h3>
        <p className="text-gray-700 mb-2">
          This calculator provides standard live load values for preliminary design:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Always verify with local building codes and regulations</li>
          <li>Consider special loading conditions (heavy equipment, concentrated loads)</li>
          <li>Account for load combinations as per design codes</li>
          <li>Apply appropriate safety factors in structural design</li>
          <li>Consult with a licensed structural engineer for critical applications</li>
          <li>This tool is for educational and preliminary design purposes only</li>
          <li>Actual design requires detailed structural analysis</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Related Calculators</h3>
        <p className="text-gray-700 mb-2">
          For comprehensive structural analysis, also check out:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Dead Load Calculator:</strong> Calculate permanent structural loads</li>
          <li><strong>Structural Load Calculator:</strong> Combined dead and live load analysis</li>
          <li><strong>Slab Load Calculator:</strong> Detailed slab load calculations</li>
          <li><strong>Beam Load Calculator:</strong> Beam reactions and moments</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>Pro Tip:</strong> Use the load reference table to quickly compare live load values for different building types. Click on any row to instantly switch to that building type and see updated calculations.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-yellow-900">
            <strong>Disclaimer:</strong> This calculator provides standard live load values for preliminary design purposes. Actual structural design must consider load combinations, reduction factors, special loading conditions, and must comply with applicable building codes. Always consult a licensed structural engineer for final design and approval.
          </p>
        </div>

      </div>
    </div>
  );
}
