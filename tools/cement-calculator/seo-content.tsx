export default function CementCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Cement Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The <strong>Cement Calculator</strong> is a professional tool designed for civil engineers, contractors, architects, and construction workers to accurately estimate cement requirements for concrete, plaster, and mortar work. Get instant, accurate calculations based on industry-standard formulas.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Multiple Calculation Modes:</strong> Concrete, Plaster, and Brick Mortar</li>
          <li><strong>Mix Ratio Presets:</strong> Standard ratios for different applications</li>
          <li><strong>Custom Mix Ratios:</strong> Adjust cement, sand, and aggregate proportions</li>
          <li><strong>Real-Time Calculations:</strong> Instant results as you type</li>
          <li><strong>Material Estimates:</strong> Cement bags, sand, and aggregate volumes</li>
          <li><strong>Unit Support:</strong> Feet and meters</li>
          <li><strong>Calculation History:</strong> Save and review past calculations</li>
          <li><strong>Export Options:</strong> Download results as text files</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>Select calculation type (Concrete, Plaster, or Mortar)</li>
          <li>Choose measurement unit (feet or meters)</li>
          <li>Enter dimensions (length, width, thickness for concrete; area and thickness for plaster)</li>
          <li>Select or customize mix ratio</li>
          <li>View instant cement bags and material requirements</li>
          <li>Save or export your calculation</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Formula</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Volume:</strong> Length × Width × Thickness
          </p>
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Dry Volume:</strong> Wet Volume × 1.54
          </p>
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Cement Volume:</strong> (Cement Parts ÷ Total Parts) × Dry Volume
          </p>
          <p className="text-gray-700 font-mono text-sm">
            <strong>Cement Bags:</strong> Cement Volume ÷ 0.035 m³
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Mix Ratios</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>1:2:4 (Standard Concrete):</strong> General construction, slabs, beams</li>
          <li><strong>1:1.5:3 (High Strength):</strong> Structural elements, columns</li>
          <li><strong>1:3:6 (Lean Mix):</strong> Foundations, mass concrete</li>
          <li><strong>1:3 (Plaster):</strong> Standard cement-sand mortar</li>
          <li><strong>1:4 (Plaster):</strong> Internal walls, lean plaster</li>
          <li><strong>1:6 (Brick Mortar):</strong> Brick masonry work</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <p className="text-gray-700 mb-4">
          Manual cement calculations are complex and error-prone. This calculator uses industry-standard formulas including dry volume factor (1.54) and standard cement bag volume (0.035 m³) to provide accurate estimates. Save time, reduce waste, and ensure you order the right amount of materials for your construction project.
        </p>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
          <p className="text-green-900 font-semibold mb-2">💡 Pro Tip:</p>
          <p className="text-green-800 text-sm">
            Always order 5-10% extra cement beyond the calculated amount to account for spillage, wastage, and variations in actual site conditions. Store cement in a dry place and use within 3 months for best results.
          </p>
        </div>

      </div>
    </div>
  );
}
