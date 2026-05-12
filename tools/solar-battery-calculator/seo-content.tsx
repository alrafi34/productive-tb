export default function SolarBatteryCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Solar Battery Sizing?</h2>
          <p className="text-gray-700 leading-relaxed">
            Solar battery sizing is the process of calculating the required battery storage capacity for a solar power system 
            based on energy consumption, backup duration, and system specifications. Proper battery sizing ensures your solar 
            system can store enough energy to power your loads during nighttime, cloudy days, or grid outages. Battery capacity 
            is measured in Ampere-hours (Ah) and determines how long your system can run without solar input. Incorrect sizing 
            leads to either insufficient backup power (undersized) or wasted investment (oversized).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Solar Battery Sizing Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Step 1: Calculate Total Energy Required</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">Total Energy (Wh) = Daily Load (kWh) × 1000 × Backup Days</p>
              <p className="text-sm text-blue-700">
                Multiply your daily energy consumption by the number of backup days needed and convert to watt-hours.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Step 2: Adjust for Battery Efficiency</h3>
              <p className="text-green-800 font-mono text-lg mb-2">Adjusted Energy = Total Energy / Efficiency</p>
              <p className="text-sm text-green-700">
                Account for energy losses during charging and discharging. Lithium batteries: 90-95%, Lead-acid: 70-85%.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Step 3: Adjust for Depth of Discharge (DoD)</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">Usable Energy = Adjusted Energy / DoD</p>
              <p className="text-sm text-purple-700">
                Batteries shouldn't be fully discharged. DoD determines usable capacity. Lithium: 80-90%, Lead-acid: 50-70%.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Step 4: Convert to Battery Capacity (Ah)</h3>
              <p className="text-orange-800 font-mono text-lg mb-2">Capacity (Ah) = Usable Energy (Wh) / System Voltage (V)</p>
              <p className="text-sm text-orange-700">
                Divide by system voltage (12V, 24V, or 48V) to get battery capacity in Ampere-hours.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Complete Formula</h3>
              <p className="text-red-800 font-mono text-base mb-2">
                Capacity (Ah) = (Daily Load × 1000 × Backup Days) / (Voltage × Efficiency × DoD)
              </p>
              <div className="text-sm text-red-700 space-y-1 mt-3">
                <p><strong>Example:</strong> 5 kWh/day, 2 days backup, 24V system, 85% efficiency, 80% DoD</p>
                <p><strong>Calculation:</strong> (5 × 1000 × 2) / (24 × 0.85 × 0.80) = 10000 / 16.32 = 613 Ah</p>
                <p><strong>Result:</strong> You need a 613 Ah battery bank at 24V</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Depth of Discharge (DoD)</h2>
          
          <p className="text-gray-700 mb-4">
            Depth of Discharge (DoD) is the percentage of battery capacity that has been discharged relative to total capacity. 
            It's one of the most critical factors affecting battery lifespan and performance.
          </p>

          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Lithium Batteries (80-90% DoD)</h3>
                  <p className="text-sm text-green-800">
                    Lithium batteries can safely discharge 80-90% of their capacity. A 100Ah lithium battery provides 80-90Ah 
                    usable capacity. They maintain performance even at high DoD and last 3000-5000 cycles at 80% DoD.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 text-xl">⚠</span>
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Lead-Acid Batteries (50-70% DoD)</h3>
                  <p className="text-sm text-yellow-800">
                    Lead-acid batteries should only discharge 50-70% to maximize lifespan. A 100Ah lead-acid battery provides 
                    only 50-70Ah usable capacity. Deeper discharge significantly reduces cycle life. They last 500-1000 cycles 
                    at 50% DoD.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 text-xl">ℹ</span>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">DoD Impact on Battery Life</h3>
                  <p className="text-sm text-blue-800">
                    Lower DoD extends battery life but requires larger capacity. At 50% DoD, lead-acid batteries last 1000 cycles. 
                    At 80% DoD, they last only 300-400 cycles. Balance between usable capacity and lifespan based on your needs 
                    and budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Battery Efficiency Factors</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Battery Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommended DoD</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cycle Life</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost/kWh</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">Lithium-Ion</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-mono">90-95%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">80-90%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">3000-5000</td>
                  <td className="px-4 py-3 text-sm text-gray-600">$400-600</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">LiFePO4</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-mono">92-96%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">80-90%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">4000-6000</td>
                  <td className="px-4 py-3 text-sm text-gray-600">$500-700</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">AGM</td>
                  <td className="px-4 py-3 text-sm text-yellow-600 font-mono">80-85%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">60-70%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">500-800</td>
                  <td className="px-4 py-3 text-sm text-gray-600">$200-300</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">Gel</td>
                  <td className="px-4 py-3 text-sm text-yellow-600 font-mono">75-85%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">60-70%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">600-1000</td>
                  <td className="px-4 py-3 text-sm text-gray-600">$250-350</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">Flooded Lead-Acid</td>
                  <td className="px-4 py-3 text-sm text-orange-600 font-mono">70-80%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">50-60%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">300-700</td>
                  <td className="px-4 py-3 text-sm text-gray-600">$150-250</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Voltage Selection Guide</h2>
          
          <p className="text-gray-700 mb-4">
            Choosing the right system voltage is crucial for efficiency, safety, and cost-effectiveness. Higher voltages reduce 
            current, which means thinner cables, lower losses, and better efficiency.
          </p>

          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 text-xl font-bold">12V</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">12V Systems (Small Applications)</h3>
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Best for:</strong> RVs, boats, small cabins, mobile applications
                  </p>
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Daily Load:</strong> Up to 3 kWh/day (250W average)
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>Pros:</strong> Simple, widely available components, easy to find 12V appliances<br/>
                    <strong>Cons:</strong> High current requires thick cables, higher losses, limited scalability
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl font-bold">24V</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 mb-1">24V Systems (Medium Applications)</h3>
                  <p className="text-sm text-green-800 mb-2">
                    <strong>Best for:</strong> Small to medium homes, off-grid cabins, backup systems
                  </p>
                  <p className="text-sm text-green-800 mb-2">
                    <strong>Daily Load:</strong> 3-8 kWh/day (125-330W average)
                  </p>
                  <p className="text-sm text-green-800">
                    <strong>Pros:</strong> Good balance of efficiency and cost, moderate cable sizes, scalable<br/>
                    <strong>Cons:</strong> Fewer 24V appliances available compared to 12V
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-purple-600 text-xl font-bold">48V</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-1">48V Systems (Large Applications)</h3>
                  <p className="text-sm text-purple-800 mb-2">
                    <strong>Best for:</strong> Large homes, commercial systems, high-power applications
                  </p>
                  <p className="text-sm text-purple-800 mb-2">
                    <strong>Daily Load:</strong> 8+ kWh/day (330W+ average)
                  </p>
                  <p className="text-sm text-purple-800">
                    <strong>Pros:</strong> Highest efficiency, lowest current, thinnest cables, best for large systems<br/>
                    <strong>Cons:</strong> More expensive components, requires more batteries in series
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Current Comparison:</strong> For 5 kWh daily load, 12V system draws 417A, 24V draws 208A, and 48V draws 
              only 104A. Lower current means smaller cables, less heat, and higher efficiency. Cable cost savings alone can 
              justify higher voltage systems.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Battery Bank Configuration Examples</h2>
          
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Example 1: Small Off-Grid Cabin (12V System)</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Requirements:</strong> 2 kWh/day, 2 days backup</p>
                <p><strong>Calculation:</strong> (2 × 1000 × 2) / (12 × 0.80 × 0.50) = 833 Ah</p>
                <p><strong>Configuration:</strong> 4 × 200Ah 12V batteries in parallel</p>
                <p className="text-green-600 font-semibold">Total Capacity: 800 Ah at 12V (9.6 kWh stored)</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Example 2: Medium Home Backup (24V System)</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Requirements:</strong> 5 kWh/day, 2 days backup</p>
                <p><strong>Calculation:</strong> (5 × 1000 × 2) / (24 × 0.85 × 0.80) = 613 Ah</p>
                <p><strong>Configuration:</strong> 2 strings of 2 × 12V 300Ah batteries (series-parallel)</p>
                <p className="text-green-600 font-semibold">Total Capacity: 600 Ah at 24V (14.4 kWh stored)</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Example 3: Large Off-Grid Home (48V System)</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Requirements:</strong> 10 kWh/day, 3 days backup</p>
                <p><strong>Calculation:</strong> (10 × 1000 × 3) / (48 × 0.90 × 0.80) = 868 Ah</p>
                <p><strong>Configuration:</strong> 2 strings of 4 × 12V 200Ah batteries (series-parallel)</p>
                <p className="text-green-600 font-semibold">Total Capacity: 400 Ah at 48V (19.2 kWh stored) × 2 strings = 800 Ah</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Battery Sizing Mistakes</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Ignoring Efficiency and DoD</h3>
                  <p className="text-sm text-red-800">
                    Many people calculate battery size using only daily load and backup days, forgetting efficiency losses and 
                    DoD limits. This results in undersized systems that can't deliver required power. Always account for 
                    efficiency (70-95%) and DoD (50-90%).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Using Wrong System Voltage</h3>
                  <p className="text-sm text-red-800">
                    Using 12V for high-power systems (&gt;3 kWh/day) leads to excessive current, thick expensive cables, and 
                    significant voltage drop. Use 24V for 3-8 kWh/day and 48V for &gt;8 kWh/day systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Mixing Battery Types or Ages</h3>
                  <p className="text-sm text-red-800">
                    Never mix different battery types (lithium with lead-acid) or batteries of different ages in the same bank. 
                    This causes imbalanced charging/discharging, reducing performance and lifespan. Use identical batteries 
                    purchased together.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Undersizing for Peak Loads</h3>
                  <p className="text-sm text-red-800">
                    Sizing based only on average daily consumption ignores peak power demands. If your inverter is 3000W but 
                    batteries can only deliver 1500W, the system will fail during high loads. Ensure battery C-rating supports 
                    peak loads.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Not Planning for Future Expansion</h3>
                  <p className="text-sm text-red-800">
                    Sizing batteries exactly to current needs leaves no room for growth. Adding batteries later is difficult 
                    due to age mismatch. Plan for 20-30% future expansion or use modular systems that allow easy scaling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How many batteries do I need for a 5kW solar system?</h3>
              <p className="text-sm text-gray-700">
                Battery count depends on daily consumption and backup days, not solar panel capacity. For 5 kWh/day with 2 days 
                backup on a 24V system (85% efficiency, 80% DoD), you need 613 Ah. This equals about 3 × 200Ah batteries. A 5kW 
                solar array can charge this bank in 3-4 hours of good sunlight.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What size battery for 3000W inverter?</h3>
              <p className="text-sm text-gray-700">
                For a 3000W inverter on 24V system, minimum battery capacity is 250 Ah (to deliver 3000W continuously). For 
                12V system, you need 500 Ah. However, size batteries based on energy storage needs (kWh), not just inverter 
                power. A 3000W inverter running 4 hours needs 500 Ah at 24V (12 kWh stored).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use car batteries for solar systems?</h3>
              <p className="text-sm text-gray-700">
                Not recommended. Car batteries (starting batteries) are designed for short high-current bursts, not deep cycling. 
                They fail quickly in solar applications (6-12 months). Use deep-cycle batteries (AGM, gel, or lithium) designed 
                for solar systems. They last 3-10 years depending on type and usage.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How long do solar batteries last?</h3>
              <p className="text-sm text-gray-700">
                Lithium batteries: 10-15 years (3000-6000 cycles), AGM/Gel: 4-7 years (500-1000 cycles), Flooded lead-acid: 
                3-5 years (300-700 cycles). Lifespan depends on DoD, temperature, maintenance, and charge/discharge rates. 
                Keeping batteries at 50% DoD doubles lifespan compared to 80% DoD.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I choose 12V, 24V, or 48V system?</h3>
              <p className="text-sm text-gray-700">
                Choose based on daily consumption: 12V for &lt;3 kWh/day (RVs, small cabins), 24V for 3-8 kWh/day (small-medium 
                homes), 48V for &gt;8 kWh/day (large homes, commercial). Higher voltage = lower current = thinner cables + higher 
                efficiency. 48V systems are 15-20% more efficient than 12V for the same power.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between Ah and kWh?</h3>
              <p className="text-sm text-gray-700">
                Ah (Ampere-hours) measures battery capacity at a specific voltage. kWh (kilowatt-hours) measures total energy 
                stored. Formula: kWh = (Ah × Voltage) / 1000. Example: 200 Ah at 12V = 2.4 kWh, but 200 Ah at 48V = 9.6 kWh. 
                Always specify voltage when stating Ah capacity.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I calculate battery backup time?</h3>
              <p className="text-sm text-gray-700">
                Backup time (hours) = (Battery Capacity Ah × Voltage × DoD × Efficiency) / Load (W). Example: 400 Ah at 24V, 
                80% DoD, 85% efficiency, 500W load = (400 × 24 × 0.80 × 0.85) / 500 = 13 hours backup. This assumes constant 
                load; actual time varies with usage patterns.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            When sizing batteries, add 20-30% extra capacity beyond calculated requirements. This accounts for: (1) Battery 
            aging (capacity decreases 2-3% per year), (2) Temperature effects (cold reduces capacity by 20-40%), (3) Future 
            load growth, (4) Occasional cloudy periods requiring extra backup. This buffer ensures reliable performance 
            throughout battery lifespan and prevents premature replacement.
          </p>
        </section>

      </div>
    </div>
  );
}
