export default function BeamLoadCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Beam Load Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The Beam Load Calculator is a free online structural analysis tool designed for civil engineers, structural engineers, architecture students, and construction professionals. Calculate beam reactions, shear force, and bending moment instantly with visual diagrams for both simply supported and cantilever beams.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Calculate reactions for simply supported and cantilever beams</li>
          <li>Support for point loads and uniformly distributed loads (UDL)</li>
          <li>Instant calculation of maximum bending moment and shear force</li>
          <li>Visual beam diagrams with load representation</li>
          <li>Real-time calculations as you type</li>
          <li>Unit conversion between meters and feet</li>
          <li>Export results to text and CSV formats</li>
          <li>Calculation history with localStorage</li>
          <li>Example scenarios for quick testing</li>
          <li>Formula display for educational purposes</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Select your beam type (Simply Supported or Cantilever)</li>
          <li>Choose the load type (Point Load or UDL)</li>
          <li>Enter the beam length in meters or feet</li>
          <li>Input the load value in kN or kN/m</li>
          <li>For point loads on simply supported beams, specify the load position</li>
          <li>View instant results including reactions, bending moment, and shear force</li>
          <li>Export your calculations or save to history for future reference</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Beam Types Supported</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Simply Supported Beam</h4>
        <p className="text-gray-700 mb-3">
          A beam supported at both ends, free to rotate but not translate. Common in bridges, floor systems, and roof structures. The calculator computes reactions at both supports and maximum bending moment at the point of maximum deflection.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Cantilever Beam</h4>
        <p className="text-gray-700 mb-4">
          A beam fixed at one end and free at the other. Common in balconies, overhangs, and cantilevered structures. The calculator determines the reaction force and moment at the fixed support.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Load Types</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Point Load</h4>
        <p className="text-gray-700 mb-3">
          A concentrated load applied at a specific point on the beam. Measured in kilonewtons (kN). Common examples include column loads, equipment loads, or concentrated weights.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Uniformly Distributed Load (UDL)</h4>
        <p className="text-gray-700 mb-4">
          A load spread evenly across the entire beam length. Measured in kilonewtons per meter (kN/m). Common examples include self-weight, floor loads, or snow loads.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Formulas</h3>
        
        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Simply Supported Beam - Point Load</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li>Reaction 1: R₁ = P × (L - a) / L</li>
          <li>Reaction 2: R₂ = P × a / L</li>
          <li>Maximum Bending Moment: M_max = P × a × (L - a) / L</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Simply Supported Beam - UDL</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li>Reactions: R₁ = R₂ = w × L / 2</li>
          <li>Maximum Bending Moment: M_max = w × L² / 8</li>
          <li>Total Load: W = w × L</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Cantilever Beam - Point Load at End</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
          <li>Reaction Force: R = P</li>
          <li>Maximum Bending Moment: M_max = P × L</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Cantilever Beam - UDL</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>Reaction Force: R = w × L</li>
          <li>Maximum Bending Moment: M_max = w × L² / 2</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Applications</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Structural design and analysis of beams</li>
          <li>Educational tool for engineering students</li>
          <li>Quick verification of hand calculations</li>
          <li>Preliminary design of structural members</li>
          <li>Understanding beam behavior under different loading conditions</li>
          <li>Comparison of different beam configurations</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>100% free with no registration required</li>
          <li>Instant results with real-time calculations</li>
          <li>Visual diagrams for better understanding</li>
          <li>Works entirely in your browser - no installation needed</li>
          <li>Mobile-friendly responsive design</li>
          <li>Export capabilities for documentation</li>
          <li>Educational formulas displayed for learning</li>
          <li>Accurate engineering calculations based on standard formulas</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Important Notes</h3>
        <p className="text-gray-700 mb-2">
          This calculator provides preliminary analysis results based on simplified beam theory. For actual structural design:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Always verify results with detailed structural analysis</li>
          <li>Consider deflection limits and serviceability requirements</li>
          <li>Account for load combinations and safety factors</li>
          <li>Follow local building codes and standards</li>
          <li>Consult with a licensed structural engineer for critical applications</li>
          <li>This tool is for educational and preliminary design purposes only</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-blue-900">
            <strong>Pro Tip:</strong> Use the example scenarios to quickly understand how different beam types and loading conditions affect structural behavior. The visual diagrams help visualize load distribution and support reactions.
          </p>
        </div>

      </div>
    </div>
  );
}
