export default function MaterialCostCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Material Cost Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Material Cost Calculator</strong> is a powerful spreadsheet-like tool designed to help construction professionals, architects, engineers, and procurement teams quickly estimate material costs for building projects. With support for multiple materials, wastage calculations, and overhead costs, this calculator eliminates manual errors and provides instant financial insights for accurate budgeting and cost planning.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📦</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Dynamic material rows (add/remove/duplicate)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time cost calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Wastage percentage per material</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>11 unit types (kg, tons, bags, liters, m², etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Overhead cost support</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Use Cases
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Construction material budgeting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Procurement cost estimation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Project cost planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Contractor bidding preparation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Material quantity takeoff costing</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Cost Calculation Formula</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Per Material Cost</h4>
            <p className="text-sm text-blue-800 mb-2">
              Each material's cost is calculated by multiplying quantity by unit price, then adding wastage.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-blue-300 text-xs block mt-2">
              Cost = Quantity × Unit Price
            </code>
            <code className="bg-white px-3 py-1 rounded border border-blue-300 text-xs block mt-2">
              Adjusted Cost = Cost + (Cost × Wastage%)
            </code>
            <div className="text-xs text-blue-700 mt-2">
              Example: 10 bags × $8 + 10% wastage = $80 + $8 = $88
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Total Cost Formula</h4>
            <p className="text-sm text-green-800 mb-2">
              The total cost sums all adjusted material costs and adds any overhead expenses.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-green-300 text-xs block mt-2">
              Total Cost = Σ(Adjusted Cost of all materials) + Overhead
            </code>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Supported Unit Types</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Weight Units</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Kilograms (kg)</li>
              <li>• Tons</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Volume Units</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Liters</li>
              <li>• Cubic meters (m³)</li>
              <li>• Cubic feet (ft³)</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Area & Length</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Meters (m)</li>
              <li>• Square meters (m²)</li>
              <li>• Feet (ft)</li>
              <li>• Square feet (ft²)</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Other Units</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Pieces (pcs) - for countable items like bricks, tiles, fixtures</li>
            <li>• Bags - for cement, sand, aggregates</li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Wastage</h3>
        
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200 mb-6">
          <p className="text-gray-700 mb-4">
            Wastage accounts for material loss during construction due to cutting, breakage, spillage, and handling. Including wastage in your estimates ensures you order sufficient materials and avoid project delays.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">5-10%:</span>
              <span>Standard wastage for most materials (cement, sand, aggregates)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">10-15%:</span>
              <span>Moderate wastage for tiles, bricks, and cut materials</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">15-20%:</span>
              <span>High wastage for complex cuts, irregular shapes, or fragile materials</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">20-30%:</span>
              <span>Very high wastage for specialized applications or difficult installations</span>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Examples</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 1: Basic Material List</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Materials:</strong></p>
              <p>• Cement: 10 bags × $8 = $80</p>
              <p>• Steel: 50 kg × $1.20 = $60</p>
              <p><strong>Overhead:</strong> $0</p>
              <p className="text-primary font-semibold pt-2"><strong>Total Cost:</strong> $140</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 2: With Wastage</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Materials:</strong></p>
              <p>• Cement: 10 bags × $8 + 10% wastage = $88</p>
              <p>• Steel: 50 kg × $1.20 + 5% wastage = $63</p>
              <p><strong>Overhead:</strong> $20</p>
              <p className="text-primary font-semibold pt-2"><strong>Total Cost:</strong> $171</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 3: Complete Project</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Materials:</strong></p>
              <p>• Bricks: 1000 pcs × $0.50 + 15% wastage = $575</p>
              <p>• Sand: 2 tons × $30 + 10% wastage = $66</p>
              <p>• Paint: 20 liters × $5 + 10% wastage = $110</p>
              <p><strong>Overhead:</strong> $50</p>
              <p className="text-primary font-semibold pt-2"><strong>Total Cost:</strong> $801</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Features</h3>
        
        <div className="space-y-3 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Dynamic Material Rows</h4>
            </div>
            <p className="text-sm text-gray-700">
              Add unlimited materials to your calculation. Each row tracks name, quantity, unit type, unit price, and wastage percentage independently.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Material Duplication</h4>
            </div>
            <p className="text-sm text-gray-700">
              Quickly duplicate existing material rows to save time when entering similar items with different quantities or prices.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Quick Add Presets</h4>
            </div>
            <p className="text-sm text-gray-700">
              Use pre-configured material presets for common construction materials like cement, steel, bricks, sand, paint, and tiles.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Calculation History</h4>
            </div>
            <p className="text-sm text-gray-700">
              Save your calculations to browser history and reload them later. Perfect for comparing different material scenarios or tracking project estimates.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Export Options</h4>
            </div>
            <p className="text-sm text-gray-700">
              Export your material cost breakdown to TXT or CSV format for sharing with clients, contractors, or importing into spreadsheet software.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Currency Support</h3>
        
        <div className="grid md:grid-cols-5 gap-3 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
            <div className="text-2xl mb-1">$</div>
            <div className="text-sm font-semibold text-blue-900">USD</div>
            <div className="text-xs text-blue-700">US Dollar</div>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
            <div className="text-2xl mb-1">€</div>
            <div className="text-sm font-semibold text-green-900">EUR</div>
            <div className="text-xs text-green-700">Euro</div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-center">
            <div className="text-2xl mb-1">£</div>
            <div className="text-sm font-semibold text-purple-900">GBP</div>
            <div className="text-xs text-purple-700">British Pound</div>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 text-center">
            <div className="text-2xl mb-1">₹</div>
            <div className="text-sm font-semibold text-orange-900">INR</div>
            <div className="text-xs text-orange-700">Indian Rupee</div>
          </div>
          
          <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center">
            <div className="text-2xl mb-1">৳</div>
            <div className="text-sm font-semibold text-red-900">BDT</div>
            <div className="text-xs text-red-700">Bangladeshi Taka</div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Calculations:</strong> Real-time cost updates as you enter materials</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Spreadsheet-Like Interface:</strong> Familiar table layout for easy data entry</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Wastage Tracking:</strong> Account for material loss and ensure adequate ordering</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Flexible Units:</strong> Support for 11 different unit types</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>No Installation:</strong> Works entirely in your browser, no software needed</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Important Note
          </h4>
          <p className="text-sm text-yellow-800">
            This calculator provides cost estimates based on the quantities and prices you enter. Actual material costs vary by location, supplier, market conditions, bulk discounts, delivery charges, and seasonal factors. Wastage percentages are general guidelines and may differ based on project complexity, site conditions, worker skill level, and material handling practices. Always verify current prices with local suppliers, obtain multiple quotes, and consult with construction professionals for accurate project budgets. Consider adding a contingency buffer for price fluctuations and unexpected material needs.
          </p>
        </div>

      </div>
    </div>
  );
}
