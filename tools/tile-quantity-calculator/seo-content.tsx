export default function TileQuantityCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Tile Quantity Calculator</h2>
        
        <p className="text-gray-700 mb-4">
          The <strong>Tile Quantity Calculator</strong> is a professional tool designed to help homeowners, contractors, builders, and interior designers accurately calculate the exact number of tiles needed for floor or wall installations. Eliminate guesswork and avoid costly mistakes with precise calculations.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Features</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Two Calculation Modes:</strong> Room dimensions or direct area input</li>
          <li><strong>Multiple Unit Support:</strong> Feet, meters, centimeters, and inches</li>
          <li><strong>Waste Percentage Adjustment:</strong> 0-25% waste factor for accurate estimates</li>
          <li><strong>Tile Size Presets:</strong> Quick selection of common tile sizes</li>
          <li><strong>Real-Time Calculations:</strong> Instant results as you type</li>
          <li><strong>Calculation History:</strong> Save and review past calculations</li>
          <li><strong>Export Options:</strong> Download results as text files</li>
          <li><strong>Mobile Responsive:</strong> Works perfectly on all devices</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How to Use</h3>
        <ol className="list-decimal pl-6 text-gray-700 space-y-2">
          <li>Choose calculation mode (Dimensions or Area)</li>
          <li>Select your measurement units for room and tiles</li>
          <li>Enter room dimensions or total area</li>
          <li>Input tile size or select from presets</li>
          <li>Adjust waste percentage (typically 10-15%)</li>
          <li>View instant tile quantity with and without waste</li>
          <li>Save or export your calculation for reference</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Formula</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Room Area:</strong> Length × Width
          </p>
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Tile Area:</strong> Tile Length × Tile Width
          </p>
          <p className="text-gray-700 font-mono text-sm mb-2">
            <strong>Base Tiles:</strong> Room Area ÷ Tile Area
          </p>
          <p className="text-gray-700 font-mono text-sm">
            <strong>Final Tiles:</strong> Base Tiles × (1 + Waste %)
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Example Calculation</h3>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-gray-700 mb-2"><strong>Scenario:</strong> Bathroom floor 10ft × 12ft with 12" × 12" tiles</p>
          <p className="text-gray-700 mb-1">Room Area = 10 × 12 = 120 sq ft</p>
          <p className="text-gray-700 mb-1">Tile Size = 12" × 12" = 1 sq ft per tile</p>
          <p className="text-gray-700 mb-1">Base Tiles = 120 ÷ 1 = 120 tiles</p>
          <p className="text-gray-700 mb-1">With 10% Waste = 120 × 1.10 = 132 tiles</p>
          <p className="text-gray-700 text-lg font-bold text-primary mt-3">Purchase: 132 tiles</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Tile Sizes</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>12" × 12" (1 sq ft):</strong> Most common floor tile size</li>
          <li><strong>18" × 18":</strong> Large format floor tiles</li>
          <li><strong>24" × 24":</strong> Extra large format tiles</li>
          <li><strong>30cm × 30cm:</strong> Standard metric tile size</li>
          <li><strong>50cm × 50cm:</strong> Large metric tiles</li>
          <li><strong>60cm × 60cm:</strong> Extra large metric tiles</li>
          <li><strong>4" × 4":</strong> Small decorative or wall tiles</li>
          <li><strong>6" × 6":</strong> Medium wall tiles</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Waste Percentage Guidelines</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>5-10%:</strong> Simple rectangular rooms with straight layouts</li>
          <li><strong>10-15%:</strong> Standard rooms with some cuts (recommended)</li>
          <li><strong>15-20%:</strong> Complex layouts, diagonal patterns, or irregular shapes</li>
          <li><strong>20-25%:</strong> Intricate patterns, multiple angles, or high breakage risk</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Tips for Accurate Estimates</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Measure room dimensions carefully at multiple points</li>
          <li>Account for irregular room shapes by breaking into rectangles</li>
          <li>Add appropriate waste percentage based on layout complexity</li>
          <li>Consider tile pattern (straight, diagonal, herringbone) when setting waste</li>
          <li>Order extra tiles for future repairs and replacements</li>
          <li>Check tile availability before finalizing quantity</li>
          <li>Verify tile dimensions with actual product specifications</li>
          <li>Account for grout lines in precise installations</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Bathroom Flooring:</strong> Calculate tiles for bathroom renovations</li>
          <li><strong>Kitchen Backsplash:</strong> Estimate wall tiles for kitchen areas</li>
          <li><strong>Living Room Floors:</strong> Plan large format tile installations</li>
          <li><strong>Commercial Spaces:</strong> Calculate tiles for offices and retail</li>
          <li><strong>Outdoor Patios:</strong> Estimate tiles for exterior applications</li>
          <li><strong>Shower Walls:</strong> Calculate wall tiles for shower enclosures</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Use This Calculator?</h3>
        <p className="text-gray-700 mb-4">
          Manual tile calculations are time-consuming and error-prone, especially when dealing with different units or complex layouts. This calculator provides instant, accurate estimates with proper waste allowance, helping you purchase the right quantity of tiles the first time. Whether you're a professional contractor or a DIY homeowner, this tool saves time, reduces waste, and prevents costly shortages.
        </p>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
          <p className="text-green-900 font-semibold mb-2">💡 Pro Tip:</p>
          <p className="text-green-800 text-sm">
            Always purchase tiles from the same batch to ensure consistent color and pattern. Tiles from different production batches may have slight variations. Order 5-10% extra beyond the calculated amount for future repairs, as the exact tile may be discontinued or unavailable later.
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
          <p className="text-yellow-900 font-semibold mb-2">⚠️ Important Note:</p>
          <p className="text-yellow-800 text-sm">
            This calculator provides estimates based on standard rectangular layouts. For complex patterns (herringbone, chevron, mosaic), diagonal installations, or rooms with many obstacles, consult with a professional installer for more accurate quantities. Always verify tile dimensions with actual product specifications before purchasing.
          </p>
        </div>

      </div>
    </div>
  );
}
