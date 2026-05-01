export default function RebarSpacingCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Rebar Spacing Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Rebar Spacing Calculator is a professional engineering tool designed for civil engineers, structural engineers, and construction professionals to accurately calculate the spacing between reinforcement bars or determine the number of bars needed for a given width.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Proper rebar spacing is critical for structural integrity, load distribution, crack control, and compliance with building codes. This calculator ensures accurate, instant calculations using standard engineering formulas.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Select Mode:</strong> Choose "Calculate Spacing" or "Calculate Number of Bars"</li>
          <li><strong>Enter Width:</strong> Input total width of the structural element</li>
          <li><strong>Specify Parameters:</strong> Enter bar diameter and clear cover</li>
          <li><strong>Mode-Specific Input:</strong> Enter number of bars OR desired spacing</li>
          <li><strong>View Results:</strong> Get instant calculations with visual diagram</li>
          <li><strong>Check Validity:</strong> Review warnings for spacing requirements</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Formulas</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Calculate Spacing:</h3>
          <p className="text-sm text-gray-700 mb-2">Effective Width = Total Width - (2 × Clear Cover)</p>
          <p className="text-sm text-gray-700 mb-2">Center-to-Center Spacing = Effective Width / (Number of Bars - 1)</p>
          <p className="text-sm text-gray-700">Clear Spacing = Spacing - Bar Diameter</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Calculate Number of Bars:</h3>
          <p className="text-sm text-gray-700 mb-2">Effective Width = Total Width - (2 × Clear Cover)</p>
          <p className="text-sm text-gray-700">Number of Bars = floor(Effective Width / Desired Spacing) + 1</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Real-time calculations with instant updates</li>
          <li>Two calculation modes: spacing or bar count</li>
          <li>Visual diagram showing rebar layout</li>
          <li>Spacing validity checks and warnings</li>
          <li>Unit conversion (mm ↔ inches)</li>
          <li>Calculation history with localStorage</li>
          <li>Export results as text file</li>
          <li>Mobile-responsive design</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Spacing Requirements</h2>
        <p className="text-gray-700 mb-4">
          Minimum clear spacing between bars should typically be at least 1 times the bar diameter to allow proper concrete flow and consolidation. The calculator provides warnings when spacing is too tight.
        </p>
        <p className="text-gray-700">
          Building codes may specify additional requirements based on aggregate size, concrete placement methods, and structural requirements. Always verify calculations with local building codes and engineering standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Applications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Structural beam and slab design</li>
          <li>Column reinforcement layout</li>
          <li>Foundation rebar spacing</li>
          <li>Retaining wall reinforcement</li>
          <li>Construction drawings and specifications</li>
          <li>Material quantity estimation</li>
          <li>Building code compliance verification</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Eliminates manual calculation errors</li>
          <li>Saves time in structural design</li>
          <li>Ensures proper rebar distribution</li>
          <li>Visual feedback for better understanding</li>
          <li>Free to use with no registration</li>
          <li>Works entirely in browser</li>
        </ul>
      </section>
    </div>
  );
}
