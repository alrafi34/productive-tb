export default function LaborCostCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Labor Cost Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Labor Cost Calculator</strong> is a comprehensive tool designed to help construction managers, contractors, project planners, and business owners calculate total labor costs for workforce planning. With support for both hourly and daily wage structures, overtime calculations, and multiple workers, this calculator provides accurate cost estimates for construction projects, freelance work, and team-based operations.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">👷</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Hourly and daily wage calculations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Multiple workers support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Overtime rates with custom multipliers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Additional costs (transport, meals, equipment)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Multi-currency support</span>
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
                <span>Contractor cost estimation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Freelance project pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Workforce planning and payroll</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Project bidding preparation</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Labor Cost Calculation Formula</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Base Cost Calculation</h4>
            <p className="text-sm text-blue-800 mb-2">
              The foundation of labor cost calculation multiplies wage rate by time and number of workers.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-blue-300 text-xs block mt-2">
              Base Cost = Wage Rate × Time × Number of Workers
            </code>
            <div className="text-xs text-blue-700 mt-2">
              Example: $15/hour × 8 hours × 5 workers = $600
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Overtime Cost Formula</h4>
            <p className="text-sm text-orange-800 mb-2">
              Overtime is calculated separately with a multiplier (typically 1.5x for time-and-a-half).
            </p>
            <code className="bg-white px-3 py-1 rounded border border-orange-300 text-xs block mt-2">
              Overtime Cost = Overtime Hours × Wage Rate × Multiplier × Workers
            </code>
            <div className="text-xs text-orange-700 mt-2">
              Example: 2 hours × $15 × 1.5 × 5 workers = $225
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Total Cost Formula</h4>
            <p className="text-sm text-green-800 mb-2">
              The final cost combines base labor, overtime, and any additional expenses.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-green-300 text-xs block mt-2">
              Total Cost = Base Cost + Overtime Cost + Additional Expenses
            </code>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Wage Types Explained</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Hourly Wage</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Payment per hour worked</li>
              <li>• Common for skilled trades</li>
              <li>• Flexible scheduling</li>
              <li>• Easy overtime calculation</li>
            </ul>
            <div className="mt-2 text-xs text-blue-700">
              <strong>Best for:</strong> Electrical work, plumbing, carpentry, consulting
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Daily Wage</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Fixed payment per day</li>
              <li>• Common for general labor</li>
              <li>• Predictable daily costs</li>
              <li>• Simplified payroll</li>
            </ul>
            <div className="mt-2 text-xs text-green-700">
              <strong>Best for:</strong> General construction, landscaping, moving, cleanup
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Overtime</h3>
        
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200 mb-6">
          <p className="text-gray-700 mb-4">
            Overtime compensation varies by location and industry. Understanding common overtime structures helps ensure accurate cost estimation and legal compliance.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">1.5x:</span>
              <span>Time and a half - most common overtime rate (after 8 hours/day or 40 hours/week)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">2.0x:</span>
              <span>Double time - weekends, holidays, or after 12 hours in some jurisdictions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-600 font-bold">2.5x:</span>
              <span>Premium overtime - emergency work, hazardous conditions, or union contracts</span>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Wage Ranges by Role</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">General Labor</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Hourly: $12-18</li>
              <li>• Daily: $80-120</li>
              <li>• Entry level positions</li>
              <li>• Basic construction tasks</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Skilled Trades</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Hourly: $20-35</li>
              <li>• Daily: $150-250</li>
              <li>• Specialized skills</li>
              <li>• Licensed professionals</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Supervisors</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Hourly: $30-50</li>
              <li>• Daily: $200-350</li>
              <li>• Team management</li>
              <li>• Project oversight</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Examples</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 1: Small Renovation Team</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Setup:</strong> 3 workers, $20/hour, 8 hours</p>
              <p><strong>Calculation:</strong> $20 × 8 × 3 = $480</p>
              <p className="text-primary font-semibold"><strong>Total Cost:</strong> $480</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 2: With Overtime</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Setup:</strong> 5 workers, $15/hour, 8 hours + 2 overtime hours (1.5x)</p>
              <p><strong>Base Cost:</strong> $15 × 8 × 5 = $600</p>
              <p><strong>Overtime Cost:</strong> 2 × $15 × 1.5 × 5 = $225</p>
              <p className="text-primary font-semibold"><strong>Total Cost:</strong> $825</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 3: Daily Wage Project</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Setup:</strong> 8 workers, $100/day, 15 days, $200 additional costs</p>
              <p><strong>Base Cost:</strong> $100 × 15 × 8 = $12,000</p>
              <p><strong>Additional:</strong> $200</p>
              <p className="text-primary font-semibold"><strong>Total Cost:</strong> $12,200</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Cost Considerations</h3>
        
        <div className="space-y-3 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Transportation</h4>
              <span className="text-sm text-gray-600">$10-50 per worker</span>
            </div>
            <p className="text-sm text-gray-700">
              Travel allowances, fuel costs, or transportation provided by employer.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Meals & Accommodation</h4>
              <span className="text-sm text-gray-600">$20-100 per day</span>
            </div>
            <p className="text-sm text-gray-700">
              Food allowances, catered meals, or lodging for remote projects.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Equipment & Tools</h4>
              <span className="text-sm text-gray-600">$5-30 per day</span>
            </div>
            <p className="text-sm text-gray-700">
              Tool rental, safety equipment, or specialized gear provided to workers.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Bonuses & Incentives</h4>
              <span className="text-sm text-gray-600">5-15% of base</span>
            </div>
            <p className="text-sm text-gray-700">
              Performance bonuses, completion incentives, or hazard pay premiums.
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

        <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Features</h3>
        
        <div className="space-y-3 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Real-time Calculations</h4>
            </div>
            <p className="text-sm text-gray-700">
              Instant cost updates as you modify wage rates, worker count, or time parameters.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Wage & Project Presets</h4>
            </div>
            <p className="text-sm text-gray-700">
              Quick-apply common wage rates and project templates for faster calculations.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Detailed Cost Breakdown</h4>
            </div>
            <p className="text-sm text-gray-700">
              View base costs, overtime, additional expenses, and per-worker calculations.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Calculation History</h4>
            </div>
            <p className="text-sm text-gray-700">
              Save and reload previous calculations for comparison or project tracking.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Export Options</h4>
            </div>
            <p className="text-sm text-gray-700">
              Export detailed reports to TXT or CSV format for documentation and record-keeping.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Calculations:</strong> Real-time cost updates as you enter data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Flexible Wage Types:</strong> Support for both hourly and daily wage structures</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Overtime Support:</strong> Accurate overtime calculations with custom multipliers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Multiple Workers:</strong> Scale calculations for teams of any size</span>
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
            This calculator provides cost estimates based on the wage rates and parameters you enter. Actual labor costs may vary due to local wage laws, union requirements, benefits, taxes, insurance, and other employment-related expenses. Overtime regulations vary by jurisdiction and may have different thresholds and rates. Always consult with HR professionals, labor law experts, and local regulations to ensure compliance with employment standards. Consider additional costs such as workers' compensation, payroll taxes, benefits, and administrative overhead when budgeting for labor expenses.
          </p>
        </div>

      </div>
    </div>
  );
}