export default function ToolSEOContent() {
  return (
    <div className="mt-16 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">What is a Profit Margin Calculator?</h2>
        <p className="leading-relaxed">
          A Profit Margin Calculator is a financial tool that helps you quickly determine how profitable your business is by calculating the percentage of revenue that becomes profit. It computes both gross profit margin (revenue minus cost of goods sold) and net profit margin (revenue minus all expenses).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">How to Use the Profit Margin Calculator</h2>
        <ol className="space-y-3 list-decimal list-inside">
          <li><strong>Enter Revenue:</strong> Input your total sales or revenue amount.</li>
          <li><strong>Enter COGS:</strong> Input your cost of goods sold (direct production costs).</li>
          <li><strong>Enter Expenses (Optional):</strong> Add operating expenses like salaries, rent, utilities.</li>
          <li><strong>View Results:</strong> The calculator instantly shows gross profit, gross margin, net profit, and net margin percentages.</li>
          <li><strong>Copy or Export:</strong> Copy results to clipboard or download as CSV for records.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">Profit Margin Formulas</h2>
        <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Gross Profit Margin</h3>
            <p className="font-mono text-sm bg-white p-3 rounded border border-gray-200">
              Gross Profit = Revenue - COGS<br/>
              Gross Margin (%) = (Gross Profit / Revenue) × 100
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Net Profit Margin</h3>
            <p className="font-mono text-sm bg-white p-3 rounded border border-gray-200">
              Net Profit = Revenue - COGS - Operating Expenses<br/>
              Net Margin (%) = (Net Profit / Revenue) × 100
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">Example Calculations</h2>
        <div className="space-y-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-2">Example 1: Simple Gross Margin</h3>
            <p className="text-sm text-emerald-800">
              <strong>Input:</strong> Revenue = $1,000 | COGS = $600<br/>
              <strong>Output:</strong> Gross Profit = $400 | Gross Margin = 40%
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">Example 2: Net Profit Margin</h3>
            <p className="text-sm text-blue-800">
              <strong>Input:</strong> Revenue = $1,000 | COGS = $600 | Expenses = $200<br/>
              <strong>Output:</strong> Net Profit = $200 | Net Margin = 20%
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">Key Features</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Real-Time Calculations:</strong> Results update instantly as you type.</li>
          <li><strong>Color-Coded Results:</strong> Green for positive margins, red for negative.</li>
          <li><strong>Input Validation:</strong> Warnings for invalid inputs like negative values.</li>
          <li><strong>Precision Control:</strong> Choose 0, 2, or 4 decimal places for accuracy.</li>
          <li><strong>Copy & Export:</strong> Easily copy results or download as CSV.</li>
          <li><strong>Calculation History:</strong> Save and load previous calculations.</li>
          <li><strong>Mobile-Friendly:</strong> Works seamlessly on all devices.</li>
          <li><strong>100% Browser-Based:</strong> No backend required, all calculations happen locally.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">Who Should Use This Calculator?</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Small Business Owners:</strong> Track profitability and pricing strategies.</li>
          <li><strong>Entrepreneurs:</strong> Analyze revenue streams and business viability.</li>
          <li><strong>Accountants:</strong> Perform quick financial calculations and audits.</li>
          <li><strong>Students:</strong> Learn finance and business fundamentals.</li>
          <li><strong>Freelancers:</strong> Estimate project margins and pricing.</li>
          <li><strong>Investors:</strong> Evaluate business profitability metrics.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">Understanding Profit Margins</h2>
        <p className="leading-relaxed mb-4">
          Profit margins are critical indicators of business health. A higher margin means more profit per dollar of sales. Gross margin shows production efficiency, while net margin reveals overall profitability after all expenses.
        </p>
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
          <p className="text-sm"><strong>Healthy Margins by Industry:</strong></p>
          <ul className="text-sm mt-2 space-y-1">
            <li>• Retail: 20-30% gross margin</li>
            <li>• Software: 70-90% gross margin</li>
            <li>• Manufacturing: 30-50% gross margin</li>
            <li>• Services: 40-60% gross margin</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">Tips for Improving Profit Margins</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>Reduce cost of goods sold through better suppliers or production efficiency.</li>
          <li>Increase prices strategically without losing customers.</li>
          <li>Cut unnecessary operating expenses and overhead.</li>
          <li>Improve sales volume to spread fixed costs.</li>
          <li>Focus on high-margin products or services.</li>
          <li>Negotiate better terms with vendors and suppliers.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">What's the difference between gross and net profit margin?</h3>
            <p className="text-sm text-gray-700">Gross margin only considers production costs, while net margin includes all expenses. Net margin is a more complete picture of profitability.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">What is a good profit margin?</h3>
            <p className="text-sm text-gray-700">It varies by industry, but generally 10-20% net margin is considered healthy. Retail might be lower, while software is typically higher.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Can profit margin be negative?</h3>
            <p className="text-sm text-gray-700">Yes, if expenses exceed revenue, you have a negative margin. This indicates a loss.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Is this calculator accurate?</h3>
            <p className="text-sm text-gray-700">Yes, it uses standard accounting formulas. All calculations happen in your browser with no rounding errors.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
