export default function EscalationCostCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Escalation Cost Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Escalation Cost Calculator</strong> is a professional tool designed to estimate how construction or project costs increase over time due to inflation, material price changes, and escalation rates. This calculator helps architects, engineers, contractors, and project managers make accurate budget projections for long-term projects by calculating future costs using both compound and simple escalation methods.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📈</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Compound and simple escalation modes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Multiple currency support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Year-by-year cost breakdown</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Quick rate presets (5-15%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Export to TXT and CSV</span>
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
                <span>Construction project budgeting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Long-term cost estimation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Infrastructure planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real estate development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Contract price adjustments</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Escalation Calculation Methods</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Compound Escalation (Recommended)</h4>
            <p className="text-sm text-blue-800 mb-2">
              Compound escalation applies the rate to the accumulated cost each year, similar to compound interest. This method is more accurate for long-term projects as it accounts for escalation on previously escalated amounts.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-blue-300 text-xs block mt-2">
              Future Cost = Base Cost × (1 + rate)^years
            </code>
            <div className="text-xs text-blue-700 mt-2">
              Example: $1,000,000 at 10% for 2 years = $1,000,000 × (1.10)² = $1,210,000
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Simple Escalation</h4>
            <p className="text-sm text-green-800 mb-2">
              Simple escalation applies the rate only to the base cost, regardless of duration. This method is simpler but less accurate for multi-year projects.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-green-300 text-xs block mt-2">
              Future Cost = Base Cost × (1 + rate × years)
            </code>
            <div className="text-xs text-green-700 mt-2">
              Example: $1,000,000 at 10% for 2 years = $1,000,000 × (1 + 0.10 × 2) = $1,200,000
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Typical Escalation Rates</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Low Inflation (3-5%)</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Stable economies</li>
              <li>• Short-term projects</li>
              <li>• Minimal material volatility</li>
              <li>• Standard construction</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">Moderate Inflation (6-10%)</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Typical construction projects</li>
              <li>• Medium-term duration</li>
              <li>• Normal market conditions</li>
              <li>• Standard materials</li>
            </ul>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">High Inflation (11-15%+)</h4>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Volatile markets</li>
              <li>• Specialized materials</li>
              <li>• Long-term projects</li>
              <li>• Supply chain issues</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Examples</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 1: Residential Building</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Base Cost:</strong> $1,000,000</p>
              <p><strong>Duration:</strong> 2 years</p>
              <p><strong>Escalation Rate:</strong> 10% per year (compound)</p>
              <p><strong>Calculation:</strong> $1,000,000 × (1.10)² = $1,210,000</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> Total increase of $210,000 (21%)</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 2: Commercial Complex</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Base Cost:</strong> $5,000,000</p>
              <p><strong>Duration:</strong> 3 years</p>
              <p><strong>Escalation Rate:</strong> 8% per year (compound)</p>
              <p><strong>Calculation:</strong> $5,000,000 × (1.08)³ = $6,298,560</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> Total increase of $1,298,560 (26%)</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 3: Infrastructure Project</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Base Cost:</strong> $10,000,000</p>
              <p><strong>Duration:</strong> 5 years</p>
              <p><strong>Escalation Rate:</strong> 6% per year (compound)</p>
              <p><strong>Calculation:</strong> $10,000,000 × (1.06)⁵ = $13,382,256</p>
              <p className="text-primary font-semibold"><strong>Result:</strong> Total increase of $3,382,256 (34%)</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Factors Affecting Escalation</h3>
        
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200 mb-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-orange-600 text-xl flex-shrink-0">•</span>
              <span><strong>Material Costs:</strong> Steel, cement, lumber prices fluctuate based on supply and demand</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 text-xl flex-shrink-0">•</span>
              <span><strong>Labor Costs:</strong> Wage increases and labor shortages drive up construction costs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 text-xl flex-shrink-0">•</span>
              <span><strong>Economic Conditions:</strong> Inflation, interest rates, and economic growth affect prices</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 text-xl flex-shrink-0">•</span>
              <span><strong>Supply Chain:</strong> Transportation costs and material availability impact pricing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 text-xl flex-shrink-0">•</span>
              <span><strong>Project Complexity:</strong> Specialized work and custom materials escalate faster</span>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Accurate Budgeting:</strong> Plan for future costs with realistic escalation projections</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Multiple Methods:</strong> Choose between compound and simple escalation calculations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Detailed Breakdown:</strong> See year-by-year cost progression</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Quick Presets:</strong> Use common escalation rates and project templates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Free & Accessible:</strong> No registration required, works entirely in your browser</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Important Note
          </h4>
          <p className="text-sm text-yellow-800">
            This calculator provides estimates based on standard escalation formulas. Actual project costs may vary due to market conditions, material availability, labor rates, project complexity, location, and unforeseen circumstances. Historical escalation rates don't guarantee future performance. For critical projects, consult with cost estimators, quantity surveyors, or financial advisors. Consider adding contingency buffers (typically 10-20%) to account for uncertainties. Regular cost reviews and updates are recommended for long-term projects.
          </p>
        </div>

      </div>
    </div>
  );
}
