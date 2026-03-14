export default function ToolSEOContent() {
  return (
    <div className="mt-16 space-y-12 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">What is ROI (Return on Investment)?</h2>
        <p className="mb-3">
          ROI measures the profitability of an investment as a percentage. It shows how much money you've gained or lost relative to your initial investment. A positive ROI means profit, while negative ROI indicates a loss.
        </p>
        <p>
          The formula is simple: <span className="font-mono bg-gray-100 px-2 py-1 rounded">ROI = (Gain/Loss ÷ Initial Investment) × 100</span>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">How to Use the Investment ROI Calculator</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Enter your initial investment amount</li>
          <li>Enter the current or final value of your investment</li>
          <li>Select your preferred currency symbol</li>
          <li>View instant results showing gain/loss and ROI percentage</li>
          <li>Copy results or download your calculation history</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-900 mb-2">Example 1: Stock Investment Profit</h3>
            <p className="text-sm">Initial: $1,000 | Current: $1,200 | Gain: $200 | ROI: 20%</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-bold text-red-900 mb-2">Example 2: Crypto Investment Loss</h3>
            <p className="text-sm">Initial: $5,000 | Current: $3,500 | Loss: $1,500 | ROI: -30%</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">Example 3: Property Investment</h3>
            <p className="text-sm">Initial: $200,000 | Current: $250,000 | Gain: $50,000 | ROI: 25%</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Key Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Instant real-time calculations as you type</li>
          <li>Support for multiple currencies ($, €, £, ¥)</li>
          <li>Color-coded results for quick visual feedback</li>
          <li>Copy results to clipboard with one click</li>
          <li>Download calculation history as CSV</li>
          <li>Local storage to save your calculations</li>
          <li>Mobile-friendly responsive design</li>
          <li>Keyboard shortcuts for faster workflow</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Who Should Use This Calculator?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Stock market investors tracking portfolio performance</li>
          <li>Cryptocurrency traders monitoring gains and losses</li>
          <li>Real estate investors evaluating property returns</li>
          <li>Business owners analyzing investment decisions</li>
          <li>Students learning finance and investment concepts</li>
          <li>Financial advisors presenting client returns</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Tips for Better Investment Tracking</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Track investments regularly to monitor performance</li>
          <li>Compare ROI across different investments</li>
          <li>Consider time period when evaluating returns</li>
          <li>Account for fees and taxes in your calculations</li>
          <li>Use historical data to identify trends</li>
          <li>Download reports for tax documentation</li>
        </ul>
      </section>
    </div>
  );
}
