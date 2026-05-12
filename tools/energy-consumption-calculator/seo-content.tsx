export default function EnergyConsumptionCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is an Energy Consumption Calculator?
        </h2>
        <p className="mb-4">
          An <strong>Energy Consumption Calculator</strong> is a powerful tool that helps you calculate the electricity usage of your appliances in kilowatt-hours (kWh) and estimate the associated costs. By entering the power rating (in watts), usage duration, and electricity rate, you can instantly determine how much energy your devices consume and what it costs you.
        </p>
        <p>
          This calculator is essential for homeowners, renters, students, engineers, and businesses who want to track their electricity consumption, reduce energy bills, and make informed decisions about appliance usage.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Calculate Energy Consumption
        </h2>
        <p className="mb-4">
          Energy consumption is calculated using a simple formula:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="font-mono text-center text-lg">
            <strong>Energy (kWh) = (Power in Watts × Time in Hours) ÷ 1000</strong>
          </p>
        </div>
        <p className="mb-4">
          <strong>Step-by-step calculation:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>Find the power rating of your appliance (usually on a label in watts)</li>
          <li>Determine how many hours and minutes you use it per day</li>
          <li>Convert total time to hours (e.g., 5 hours 30 minutes = 5.5 hours)</li>
          <li>Multiply power × time</li>
          <li>Divide by 1000 to convert to kilowatt-hours (kWh)</li>
          <li>Multiply by quantity if you have multiple devices</li>
          <li>Multiply by your electricity rate to get the cost</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h2>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Example 1: LED Bulb</h3>
            <p className="text-sm text-blue-800">
              <strong>Input:</strong> Power = 10W, Time = 5 hours<br />
              <strong>Calculation:</strong> (10 × 5) ÷ 1000 = 0.05 kWh<br />
              <strong>Cost:</strong> 0.05 kWh × $0.12 = $0.006 per day
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Example 2: Air Conditioner</h3>
            <p className="text-sm text-green-800">
              <strong>Input:</strong> Power = 1500W, Time = 8 hours<br />
              <strong>Calculation:</strong> (1500 × 8) ÷ 1000 = 12 kWh<br />
              <strong>Cost:</strong> 12 kWh × $0.12 = $1.44 per day
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Example 3: Refrigerator</h3>
            <p className="text-sm text-purple-800">
              <strong>Input:</strong> Power = 150W, Time = 24 hours<br />
              <strong>Calculation:</strong> (150 × 24) ÷ 1000 = 3.6 kWh<br />
              <strong>Cost:</strong> 3.6 kWh × $0.12 = $0.432 per day
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Appliance Power Ratings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Appliance</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Power (Watts)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Typical Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">LED Bulb</td>
                <td className="border border-gray-300 px-4 py-2">10W</td>
                <td className="border border-gray-300 px-4 py-2">5 hours/day</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Ceiling Fan</td>
                <td className="border border-gray-300 px-4 py-2">75W</td>
                <td className="border border-gray-300 px-4 py-2">8 hours/day</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Refrigerator</td>
                <td className="border border-gray-300 px-4 py-2">150W</td>
                <td className="border border-gray-300 px-4 py-2">24 hours/day</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Laptop</td>
                <td className="border border-gray-300 px-4 py-2">60W</td>
                <td className="border border-gray-300 px-4 py-2">8 hours/day</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Microwave</td>
                <td className="border border-gray-300 px-4 py-2">1200W</td>
                <td className="border border-gray-300 px-4 py-2">30 minutes/day</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Air Conditioner (1.5 Ton)</td>
                <td className="border border-gray-300 px-4 py-2">1800W</td>
                <td className="border border-gray-300 px-4 py-2">8 hours/day</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Washing Machine</td>
                <td className="border border-gray-300 px-4 py-2">500W</td>
                <td className="border border-gray-300 px-4 py-2">1 hour/day</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Electric Kettle</td>
                <td className="border border-gray-300 px-4 py-2">1500W</td>
                <td className="border border-gray-300 px-4 py-2">30 minutes/day</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Instant Results:</strong> Calculate energy consumption in real-time as you type</li>
          <li><strong>Multiple Appliances:</strong> Add and track multiple devices simultaneously</li>
          <li><strong>Cost Estimation:</strong> See exactly how much each appliance costs to run</li>
          <li><strong>Daily, Monthly, Yearly Projections:</strong> Plan your electricity budget effectively</li>
          <li><strong>Appliance Presets:</strong> Quick-fill common appliances with standard power ratings</li>
          <li><strong>Export Options:</strong> Download results as CSV or text files</li>
          <li><strong>History Tracking:</strong> Save and review past calculations</li>
          <li><strong>No Installation Required:</strong> Works entirely in your browser</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tips to Reduce Energy Consumption
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Replace incandescent bulbs with LED bulbs (use 80% less energy)</li>
          <li>Unplug devices when not in use to avoid phantom power drain</li>
          <li>Use energy-efficient appliances with high star ratings</li>
          <li>Set air conditioners to 24-26°C instead of lower temperatures</li>
          <li>Use natural light during the day to reduce lighting needs</li>
          <li>Run washing machines and dishwashers with full loads</li>
          <li>Regular maintenance of appliances improves efficiency</li>
          <li>Use timers and smart plugs to control usage automatically</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding kWh and Electricity Bills
        </h2>
        <p className="mb-4">
          <strong>What is a kilowatt-hour (kWh)?</strong><br />
          A kilowatt-hour is a unit of energy equal to using 1000 watts for one hour. For example, a 100W bulb running for 10 hours consumes 1 kWh of energy.
        </p>
        <p className="mb-4">
          <strong>How electricity bills are calculated:</strong><br />
          Your electricity provider charges you based on the total kWh consumed during a billing period. The rate varies by location but typically ranges from $0.10 to $0.30 per kWh.
        </p>
        <p>
          <strong>Formula:</strong> Total Bill = Total kWh × Rate per kWh + Fixed Charges
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How do I find the power rating of my appliance?</h3>
            <p className="text-gray-700">
              Check the label or nameplate on your appliance. It usually shows the power rating in watts (W) or kilowatts (kW). You can also check the user manual or manufacturer's website.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What if my appliance shows power in kW instead of watts?</h3>
            <p className="text-gray-700">
              Simply multiply by 1000 to convert kilowatts to watts. For example, 1.5 kW = 1500 watts.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How accurate is this calculator?</h3>
            <p className="text-gray-700">
              This calculator provides accurate estimates based on the formula Energy = Power × Time. However, actual consumption may vary due to factors like appliance efficiency, voltage fluctuations, and usage patterns.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I calculate energy for multiple appliances at once?</h3>
            <p className="text-gray-700">
              Yes! This calculator supports multiple appliances. Simply add as many devices as you need and see the combined energy consumption and cost.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is the typical electricity rate?</h3>
            <p className="text-gray-700">
              Electricity rates vary by location and provider. In the US, the average is around $0.12-$0.15 per kWh. Check your electricity bill for your exact rate.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Who Should Use This Calculator?
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Homeowners:</strong> Track household electricity usage and reduce bills</li>
          <li><strong>Renters:</strong> Estimate monthly electricity costs before moving in</li>
          <li><strong>Students:</strong> Learn electrical concepts and energy calculations</li>
          <li><strong>Engineers & Technicians:</strong> Quick energy consumption estimates for projects</li>
          <li><strong>Businesses:</strong> Monitor appliance consumption in offices and facilities</li>
          <li><strong>Energy Auditors:</strong> Assess energy efficiency and recommend improvements</li>
          <li><strong>Environmentalists:</strong> Calculate carbon footprint from electricity usage</li>
        </ul>
      </section>
    </div>
  );
}
