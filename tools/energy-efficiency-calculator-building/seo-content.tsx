export default function EnergyEfficiencyCalculatorBuildingSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Energy Efficiency Calculator
        </h2>
        <p className="mb-4">
          The Energy Efficiency Calculator for Buildings is a powerful tool designed to help architects, engineers, property owners, and sustainability professionals assess building energy performance. By calculating Energy Use Intensity (EUI), you can quickly evaluate how efficiently a building uses energy and identify opportunities for improvement.
        </p>
        <p>
          This calculator provides instant analysis based on building area, annual energy consumption, occupancy, building type, and climate zone. Get comprehensive ratings, recommendations, and actionable insights to improve energy efficiency and reduce costs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Enter Building Area:</strong> Input the total floor area in square feet or square meters</li>
          <li><strong>Input Annual Energy Use:</strong> Enter total energy consumption in kWh per year</li>
          <li><strong>Add Occupancy:</strong> Optionally specify the number of building occupants</li>
          <li><strong>Select Building Type:</strong> Choose residential, commercial, or industrial</li>
          <li><strong>Choose Climate Zone:</strong> Select cold, moderate, or hot climate</li>
          <li><strong>View Results:</strong> See EUI, efficiency rating, and personalized recommendations</li>
          <li><strong>Export Data:</strong> Download reports as text or CSV files</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Energy Use Intensity (EUI)
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
          <h3 className="font-semibold text-blue-900 mb-2">EUI Formula</h3>
          <p className="text-blue-800 font-mono text-sm mb-2">
            EUI = Annual Energy Consumption (kWh) ÷ Building Area (sq ft)
          </p>
          <p className="text-blue-800 text-sm">
            Result is expressed in kWh per square foot per year (kWh/sq ft/year)
          </p>
        </div>
        <p className="mb-4">
          Energy Use Intensity (EUI) is the standard metric for measuring building energy performance. It represents the energy consumed per square foot of floor area annually. Lower EUI values indicate better energy efficiency.
        </p>
        <div className="space-y-3">
          <div>
            <strong>Excellent (EUI &lt; 8-12):</strong> Highly efficient building with optimal energy management
          </div>
          <div>
            <strong>Good (EUI 8-20):</strong> Above-average efficiency with room for minor improvements
          </div>
          <div>
            <strong>Fair (EUI 20-30):</strong> Average efficiency requiring attention to key systems
          </div>
          <div>
            <strong>Poor (EUI &gt; 30):</strong> Below-average efficiency needing significant upgrades
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Instant EUI Calculation:</strong> Real-time energy use intensity analysis</li>
          <li><strong>Efficiency Rating:</strong> Automatic classification from Excellent to Poor</li>
          <li><strong>Visual Efficiency Meter:</strong> Color-coded performance indicator</li>
          <li><strong>Building Type Adjustment:</strong> Customized thresholds for residential, commercial, and industrial</li>
          <li><strong>Climate Zone Consideration:</strong> Adjusted ratings based on local climate</li>
          <li><strong>Per-Person Analysis:</strong> Energy consumption per occupant calculation</li>
          <li><strong>Smart Recommendations:</strong> Tailored suggestions for improvement</li>
          <li><strong>Building Presets:</strong> Quick-start templates for common building types</li>
          <li><strong>Export Options:</strong> Download reports as text or CSV</li>
          <li><strong>Calculation History:</strong> Save and compare multiple buildings</li>
          <li><strong>Unit Conversion:</strong> Work in square feet or square meters</li>
          <li><strong>Real-time Updates:</strong> Instant recalculation as you type</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          EUI Benchmarks by Building Type
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b text-left">Building Type</th>
                <th className="px-4 py-2 border-b text-left">Excellent</th>
                <th className="px-4 py-2 border-b text-left">Good</th>
                <th className="px-4 py-2 border-b text-left">Fair</th>
                <th className="px-4 py-2 border-b text-left">Poor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">Residential</td>
                <td className="px-4 py-2 border-b">&lt; 8</td>
                <td className="px-4 py-2 border-b">8-15</td>
                <td className="px-4 py-2 border-b">15-22.5</td>
                <td className="px-4 py-2 border-b">&gt; 22.5</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">Commercial</td>
                <td className="px-4 py-2 border-b">&lt; 12</td>
                <td className="px-4 py-2 border-b">12-20</td>
                <td className="px-4 py-2 border-b">20-30</td>
                <td className="px-4 py-2 border-b">&gt; 30</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">Industrial</td>
                <td className="px-4 py-2 border-b">&lt; 15</td>
                <td className="px-4 py-2 border-b">15-25</td>
                <td className="px-4 py-2 border-b">25-37.5</td>
                <td className="px-4 py-2 border-b">&gt; 37.5</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Note: Thresholds are adjusted based on climate zone. Cold climates have slightly higher acceptable EUI values.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Improving Energy Efficiency
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">HVAC Systems</h3>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li>Upgrade to high-efficiency heating and cooling systems</li>
              <li>Install programmable or smart thermostats</li>
              <li>Regular maintenance and filter replacement</li>
              <li>Seal ductwork to prevent energy loss</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Building Envelope</h3>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li>Add insulation to walls, attic, and basement</li>
              <li>Upgrade to energy-efficient windows and doors</li>
              <li>Seal air leaks around openings</li>
              <li>Install reflective roofing materials</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Lighting</h3>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li>Replace with LED bulbs throughout</li>
              <li>Install occupancy sensors and dimmers</li>
              <li>Maximize natural daylight usage</li>
              <li>Use task lighting instead of overhead lighting</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Renewable Energy</h3>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li>Install solar panels for electricity generation</li>
              <li>Consider solar water heating systems</li>
              <li>Explore geothermal heating and cooling</li>
              <li>Investigate wind power options if applicable</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What is a good EUI for my building?
            </h3>
            <p className="text-sm">
              It depends on building type and climate. For residential buildings in moderate climates, aim for EUI below 15. Commercial buildings should target below 20, and industrial facilities below 25.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How do I find my annual energy consumption?
            </h3>
            <p className="text-sm">
              Check your utility bills for the past 12 months and add up all kWh usage. Most utilities also provide annual summaries online or upon request.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Why does climate zone matter?
            </h3>
            <p className="text-sm">
              Climate significantly affects energy use. Cold climates require more heating, hot climates need more cooling. The calculator adjusts efficiency thresholds accordingly for fair comparison.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I compare different buildings?
            </h3>
            <p className="text-sm">
              Yes! Use the history feature to save multiple calculations and compare EUI values across different buildings or track improvements over time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What's the difference between EUI and total energy use?
            </h3>
            <p className="text-sm">
              Total energy use is the absolute amount consumed. EUI normalizes this by building size, allowing fair comparison between buildings of different sizes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How often should I calculate EUI?
            </h3>
            <p className="text-sm">
              Calculate annually to track performance trends. Also recalculate after major upgrades or changes to verify improvements.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Energy Efficiency
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Cost Savings:</strong> Lower utility bills through reduced energy consumption</li>
          <li><strong>Environmental Impact:</strong> Reduce carbon footprint and greenhouse gas emissions</li>
          <li><strong>Property Value:</strong> Energy-efficient buildings command higher market values</li>
          <li><strong>Comfort:</strong> Better temperature control and indoor air quality</li>
          <li><strong>Compliance:</strong> Meet building codes and green certification requirements</li>
          <li><strong>Reliability:</strong> Modern efficient systems have fewer breakdowns</li>
          <li><strong>Incentives:</strong> Qualify for tax credits and utility rebates</li>
          <li><strong>Reputation:</strong> Demonstrate commitment to sustainability</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Professional Applications
        </h2>
        <div className="space-y-3">
          <div>
            <strong>Architects:</strong> Evaluate design options and set energy performance targets
          </div>
          <div>
            <strong>Engineers:</strong> Assess system efficiency and recommend improvements
          </div>
          <div>
            <strong>Property Managers:</strong> Monitor building performance and identify issues
          </div>
          <div>
            <strong>Energy Auditors:</strong> Benchmark buildings and prioritize upgrades
          </div>
          <div>
            <strong>Sustainability Consultants:</strong> Track progress toward green building goals
          </div>
          <div>
            <strong>Real Estate Professionals:</strong> Provide energy performance data to buyers
          </div>
          <div>
            <strong>Facility Managers:</strong> Optimize operations and reduce costs
          </div>
        </div>
      </section>

      <section className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Calculate Your Building's Energy Efficiency Now
        </h2>
        <p className="text-gray-700">
          Use our free Energy Efficiency Calculator to assess your building's performance. Get instant EUI calculations, efficiency ratings, and personalized recommendations. Start optimizing energy use and reducing costs today!
        </p>
      </section>
    </div>
  );
}
