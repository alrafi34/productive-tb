export default function ColumnLoadCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Column Load Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The Column Load Calculator is a free online structural engineering tool designed for civil engineers, architects, construction professionals, and students. Calculate the axial load-bearing capacity of reinforced concrete and steel columns instantly with safety factor analysis and slenderness ratio evaluation.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Calculate load capacity for concrete and steel columns</li>
          <li>Real-time calculations with instant results</li>
          <li>Safety factor analysis for design verification</li>
          <li>Slenderness ratio calculation and status indication</li>
          <li>Support for different end conditions (pinned, fixed, free)</li>
          <li>Material property presets (M20, M25, M30, Steel grades)</li>
          <li>Unit conversion between millimeters and inches</li>
          <li>Export results to text and CSV formats</li>
          <li>Calculation history with localStorage</li>
          <li>Visual status indicators for slenderness</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Select your column type (Reinforced Concrete or Steel)</li>
          <li>Enter column dimensions (width, depth, height)</li>
          <li>Input material properties (concrete strength or steel yield strength)</li>
          <li>Set safety factor (typically 1.5 to 2.0)</li>
          <li>Choose end condition based on support type</li>
          <li>View instant results including load capacity and safety status</li>
          <li>Export calculations or save to history for future reference</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Column Types</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Reinforced Concrete Column</h4>
        <p className="text-gray-700 mb-3">
          Concrete columns reinforced with steel bars. The calculator uses simplified formulas based on concrete strength (fck) and steel reinforcement percentage. Common in buildings, bridges, and infrastructure projects.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Steel Column</h4>
        <p className="text-gray-700 mb-4">
          Structural steel columns made from rolled sections or built-up members. The calculator determines capacity based on yield strength and cross-sectional area. Common in industrial buildings and high-rise structures.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Formulas</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Reinforced Concrete Column</h4>
        <p className="text-gray-700 mb-2">
          Ultimate Load Capacity (Simplified):
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li>Pu = 0.4 × fck × Ac + 0.67 × fy × Asc</li>
          <li>Where: Ac = concrete area, Asc = steel area</li>
          <li>fck = concrete strength (MPa), fy = steel strength (MPa)</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Steel Column</h4>
        <p className="text-gray-700 mb-2">
          Axial Load Capacity:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li>P = fy × A</li>
          <li>Where: fy = yield strength (MPa), A = cross-sectional area (mm²)</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Slenderness Ratio</h4>
        <p className="text-gray-700 mb-2">
          λ = Effective Length / Least Lateral Dimension
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>Safe: λ &lt; 12 (No reduction)</li>
          <li>Warning: 12 ≤ λ &lt; 20 (10-20% reduction)</li>
          <li>Critical: λ ≥ 20 (20-40% reduction)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">End Conditions</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Pinned-Pinned (K = 1.0):</strong> Both ends free to rotate but not translate</li>
          <li><strong>Fixed-Fixed (K = 0.5):</strong> Both ends restrained against rotation and translation</li>
          <li><strong>Fixed-Free (K = 2.0):</strong> One end fixed, other end completely free (cantilever)</li>
          <li><strong>Fixed-Pinned (K = 0.7):</strong> One end fixed, other end pinned</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Material Properties</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Concrete Grades</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li>M20: 20 MPa (Standard grade for general construction)</li>
          <li>M25: 25 MPa (Common structural grade)</li>
          <li>M30: 30 MPa (High strength for important structures)</li>
          <li>M35: 35 MPa (Very high strength for special applications)</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Steel Grades</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>Grade 250: 250 MPa (Mild steel)</li>
          <li>Grade 350: 350 MPa (High tensile steel)</li>
          <li>Grade 415: 415 MPa (Fe 415 - Common reinforcement steel)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Safety Factor</h3>
        <p className="text-gray-700 mb-2">
          The safety factor accounts for uncertainties in material properties, construction quality, and loading conditions:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>1.5:</strong> Minimum for well-controlled conditions</li>
          <li><strong>2.0:</strong> Standard for most structural applications</li>
          <li><strong>2.5:</strong> Conservative for critical or uncertain conditions</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Applications</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Preliminary structural design of columns</li>
          <li>Quick verification of column capacity</li>
          <li>Educational tool for engineering students</li>
          <li>Comparison of different column configurations</li>
          <li>Early-stage design validation</li>
          <li>Field estimation for construction planning</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>100% free with no registration required</li>
          <li>Instant results with real-time calculations</li>
          <li>Works entirely in your browser - no installation needed</li>
          <li>Mobile-friendly responsive design</li>
          <li>Export capabilities for documentation</li>
          <li>Material presets for quick calculations</li>
          <li>Slenderness analysis included</li>
          <li>Based on standard engineering formulas</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Important Notes</h3>
        <p className="text-gray-700 mb-2">
          This calculator provides preliminary analysis results based on simplified formulas. For actual structural design:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Always verify results with detailed structural analysis</li>
          <li>Consider buckling effects for slender columns</li>
          <li>Account for load combinations and eccentricity</li>
          <li>Follow local building codes and standards (IS, ACI, Eurocode)</li>
          <li>Consult with a licensed structural engineer for critical applications</li>
          <li>This tool is for educational and preliminary design purposes only</li>
          <li>Actual column design requires consideration of moments, shear, and other factors</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Typical Column Dimensions</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Residential Buildings:</strong> 230mm × 230mm to 300mm × 300mm</li>
          <li><strong>Commercial Buildings:</strong> 300mm × 300mm to 450mm × 450mm</li>
          <li><strong>Industrial Structures:</strong> 400mm × 400mm to 600mm × 600mm</li>
          <li><strong>High-Rise Buildings:</strong> 500mm × 500mm to 900mm × 900mm</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>Pro Tip:</strong> Use material presets for quick calculations, then adjust values based on your specific project requirements. Always check slenderness status - columns with high slenderness ratios may require larger dimensions or different support conditions.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-yellow-900">
            <strong>Disclaimer:</strong> This calculator uses simplified formulas for preliminary estimation. Actual structural design must consider additional factors including moments, shear forces, load combinations, construction tolerances, and must comply with applicable building codes. Always consult a licensed structural engineer for final design.
          </p>
        </div>

      </div>
    </div>
  );
}
