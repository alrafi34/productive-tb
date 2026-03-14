export default function SalaryCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Salary Calculator</h2>
        <p className="leading-relaxed mb-4">
          The Salary Calculator is a free online tool that instantly converts your annual salary into hourly, daily, weekly, and monthly rates. Whether you're comparing job offers, calculating freelance rates, or planning your budget, this tool provides accurate conversions in real-time.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 leading-relaxed">
          <li>Enter your annual salary in the input field</li>
          <li>Adjust work hours per week (default: 40 hours)</li>
          <li>Adjust work days per week (default: 5 days)</li>
          <li>View instant calculations for all salary periods</li>
          <li>Copy results or save your settings for future use</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 leading-relaxed">
          <li><strong>Real-time Calculations:</strong> Results update instantly as you type</li>
          <li><strong>Customizable Work Schedule:</strong> Adjust hours and days to match your situation</li>
          <li><strong>Multiple Currencies:</strong> Choose from various currency formats</li>
          <li><strong>Copy to Clipboard:</strong> Easily share calculated results</li>
          <li><strong>Local Storage:</strong> Your settings are saved automatically</li>
          <li><strong>Mobile Responsive:</strong> Works perfectly on all devices</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Formula</h2>
        <div className="bg-gray-50 p-6 rounded-lg space-y-3 font-mono text-sm">
          <p><strong>Monthly:</strong> Annual ÷ 12</p>
          <p><strong>Weekly:</strong> Annual ÷ 52</p>
          <p><strong>Daily:</strong> Weekly ÷ Work Days per Week</p>
          <p><strong>Hourly:</strong> Weekly ÷ Work Hours per Week</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 leading-relaxed">
          <li><strong>Job Comparison:</strong> Compare offers with different salary structures</li>
          <li><strong>Freelance Pricing:</strong> Calculate hourly or daily rates for projects</li>
          <li><strong>Budget Planning:</strong> Understand your income across different time periods</li>
          <li><strong>Salary Negotiation:</strong> Know your worth in different rate formats</li>
          <li><strong>Financial Planning:</strong> Plan expenses based on various salary periods</li>
        </ul>
      </section>
    </div>
  );
}
