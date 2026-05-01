export default function BrickCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Brick Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The <strong>Brick Calculator</strong> is a professional tool designed to help civil engineers, architects, contractors, and home builders accurately estimate the number of bricks required for wall construction. Eliminate manual calculation errors and reduce material waste with precise, instant calculations.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Real-Time Calculations:</strong> Instant results as you type</li>
          <li><strong>Multiple Unit Support:</strong> Feet and meters</li>
          <li><strong>Brick Size Presets:</strong> Standard, Modular, Queen, King, and Utility</li>
          <li><strong>Wall Thickness Options:</strong> Half brick (4.5") or full brick (9")</li>
          <li><strong>Mortar Thickness Adjustment:</strong> Customizable mortar joint thickness</li>
          <li><strong>Openings Deduction:</strong> Subtract doors and windows area</li>
          <li><strong>Wastage Factor:</strong> 0-20% adjustable wastage percentage</li>
          <li><strong>Calculation History:</strong> Save and review past calculations</li>
          <li><strong>Export Options:</strong> Download results as text files</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>Select your measurement unit (feet or meters)</li>
          <li>Choose wall thickness (half brick or full brick)</li>
          <li>Enter wall length and height</li>
          <li>Input brick dimensions or select from presets</li>
          <li>Set mortar thickness (typically 0.5 inches)</li>
          <li>Adjust wastage percentage (typically 5-10%)</li>
          <li>Optionally subtract openings (doors/windows)</li>
          <li>View instant brick quantity with and without wastage</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Formula</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Wall Volume:</strong> Length × Height × Thickness
          </p>
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Brick Volume:</strong> (Length + Mortar) × (Width + Mortar) × (Height + Mortar)
          </p>
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Base Bricks:</strong> Wall Volume ÷ Brick Volume
          </p>
          <p className="text-gray-700 font-mono text-sm">
            <strong>Final Bricks:</strong> (Base Bricks - Openings) × (1 + Wastage %)
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example Calculation</h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-gray-700 mb-2"><strong>Scenario:</strong> Wall 10ft × 8ft with standard bricks (9"×4.5"×3")</p>
          <p className="text-gray-700 mb-1">Wall Volume = 10 × 8 × 0.75 = 60 cubic feet</p>
          <p className="text-gray-700 mb-1">Brick with Mortar = (9.5" × 5" × 3.5") ≈ 0.0964 cubic feet</p>
          <p className="text-gray-700 mb-1">Base Bricks = 60 ÷ 0.0964 ≈ 622 bricks</p>
          <p className="text-gray-700 mb-1">With 5% Wastage = 622 × 1.05 ≈ 653 bricks</p>
          <p className="text-gray-700 text-lg font-bold text-primary mt-3">Purchase: 653 bricks</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Standard Brick Sizes</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Standard:</strong> 9" × 4.5" × 3" (most common in US)</li>
          <li><strong>Modular:</strong> 7.6" × 3.6" × 2.3"</li>
          <li><strong>Queen:</strong> 9.6" × 2.8" × 2.8"</li>
          <li><strong>King:</strong> 9.6" × 2.8" × 3.2"</li>
          <li><strong>Utility:</strong> 11.6" × 3.6" × 3.6"</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Wall Thickness Guide</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Half Brick (4.5"):</strong> Single wythe wall, non-load bearing partitions</li>
          <li><strong>Full Brick (9"):</strong> Double wythe wall, load-bearing structures</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Mortar Joint Thickness</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Standard:</strong> 0.5 inches (most common)</li>
          <li><strong>Thin Joint:</strong> 0.25 inches (precision masonry)</li>
          <li><strong>Thick Joint:</strong> 0.75 inches (rustic appearance)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Wastage Guidelines</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>5%:</strong> Experienced masons, simple walls</li>
          <li><strong>10%:</strong> Standard projects (recommended)</li>
          <li><strong>15%:</strong> Complex designs, inexperienced workers</li>
          <li><strong>20%:</strong> Intricate patterns, high breakage risk</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Tips for Accurate Estimates</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Measure wall dimensions carefully and accurately</li>
          <li>Verify actual brick dimensions with supplier specifications</li>
          <li>Account for all openings (doors, windows, vents)</li>
          <li>Add appropriate wastage based on project complexity</li>
          <li>Consider ordering extra bricks for future repairs</li>
          <li>Check mortar joint thickness with your mason</li>
          <li>Account for corners and special features</li>
          <li>Verify brick availability before finalizing quantity</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Residential Construction:</strong> House walls and partitions</li>
          <li><strong>Garden Walls:</strong> Boundary and retaining walls</li>
          <li><strong>Commercial Buildings:</strong> Office and retail structures</li>
          <li><strong>Renovation Projects:</strong> Wall extensions and repairs</li>
          <li><strong>Landscaping:</strong> Decorative brick features</li>
          <li><strong>Fireplace Construction:</strong> Indoor and outdoor fireplaces</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <p className="text-gray-700 mb-4">
          Manual brick calculations are complex and error-prone, especially when accounting for mortar joints, wall thickness, and openings. This calculator provides instant, accurate estimates based on industry-standard formulas, helping you purchase the right quantity of bricks the first time. Whether you're a professional contractor or a DIY builder, this tool saves time, reduces waste, and prevents costly shortages or excess inventory.
        </p>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
          <p className="text-green-900 font-semibold mb-2">💡 Pro Tip:</p>
          <p className="text-green-800 text-sm">
            Always purchase bricks from the same batch to ensure consistent color, texture, and dimensions. Bricks from different production runs may have slight variations. Order 5-10% extra beyond the calculated amount for future repairs and replacements, as the exact brick may be discontinued later.
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
          <p className="text-yellow-900 font-semibold mb-2">⚠️ Important Note:</p>
          <p className="text-yellow-800 text-sm">
            This calculator provides estimates based on standard rectangular brick layouts. For complex patterns (herringbone, basket weave), curved walls, or structures with many architectural features, consult with a professional mason for more accurate quantities. Always verify brick dimensions and mortar specifications with your supplier before purchasing.
          </p>
        </div>

      </div>
    </div>
  );
}
