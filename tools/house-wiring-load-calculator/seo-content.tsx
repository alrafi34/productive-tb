export default function HouseWiringLoadCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is House Wiring Load?</h2>
          <p className="text-gray-700 leading-relaxed">
            House wiring load refers to the total electrical power consumption of all appliances, lighting, and devices 
            in a residential building. Calculating the total load is essential for proper electrical system design, 
            selecting appropriate circuit breakers, determining wire sizes, and ensuring safe operation without overloading 
            circuits. The load is measured in watts (W) or kilowatts (kW) and helps determine the current draw in amperes (A).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Electrical Load</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Step 1: List All Appliances</h3>
              <p className="text-sm text-blue-700">
                Make a comprehensive list of all electrical appliances, lights, and devices in your house including 
                their wattage ratings.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Step 2: Calculate Individual Loads</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">Load = Quantity × Wattage</p>
              <p className="text-sm text-purple-700">
                Multiply the number of each appliance by its wattage to get the total load for that appliance type.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Step 3: Sum Total Load</h3>
              <p className="text-green-800 font-mono text-lg mb-2">Total Load = Sum of all individual loads</p>
              <p className="text-sm text-green-700">
                Add up all individual loads to get the total connected load in watts.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Step 4: Apply Diversity Factor</h3>
              <p className="text-yellow-800 font-mono text-lg mb-2">Adjusted Load = Total Load × Diversity Factor</p>
              <p className="text-sm text-yellow-700">
                Apply a diversity factor (typically 0.7-0.8) to account for not all appliances running simultaneously.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Step 5: Calculate Current</h3>
              <p className="text-red-800 font-mono text-lg mb-2">Current (A) = Adjusted Load (W) / Voltage (V)</p>
              <p className="text-sm text-red-700">
                Divide the adjusted load by your supply voltage to determine the current requirement.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Appliance Wattages</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Lighting</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">LED Bulb</span>
                  <span className="font-mono text-gray-900">10W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">CFL Bulb</span>
                  <span className="font-mono text-gray-900">15W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Incandescent Bulb</span>
                  <span className="font-mono text-gray-900">60W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Tube Light</span>
                  <span className="font-mono text-gray-900">40W</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Fans & Cooling</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Ceiling Fan</span>
                  <span className="font-mono text-gray-900">75W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Table Fan</span>
                  <span className="font-mono text-gray-900">50W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">AC (1 Ton)</span>
                  <span className="font-mono text-gray-900">1200W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">AC (1.5 Ton)</span>
                  <span className="font-mono text-gray-900">1800W</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Kitchen Appliances</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Refrigerator</span>
                  <span className="font-mono text-gray-900">300W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Microwave</span>
                  <span className="font-mono text-gray-900">1000W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Electric Kettle</span>
                  <span className="font-mono text-gray-900">1500W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Induction Cooktop</span>
                  <span className="font-mono text-gray-900">2000W</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Entertainment</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">LED TV (32")</span>
                  <span className="font-mono text-gray-900">60W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">LED TV (55")</span>
                  <span className="font-mono text-gray-900">120W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Home Theater</span>
                  <span className="font-mono text-gray-900">200W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Gaming Console</span>
                  <span className="font-mono text-gray-900">150W</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Diversity Factor</h2>
          
          <p className="text-gray-700 mb-4">
            The diversity factor accounts for the fact that not all electrical appliances in a house operate simultaneously. 
            Using a diversity factor prevents oversizing the electrical system while maintaining safety.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Factor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage Scenario</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommendation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">1.0</td>
                  <td className="px-4 py-3 text-sm text-gray-700">All appliances on simultaneously</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Very conservative, rarely needed</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">0.8-0.9</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High usage periods</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Recommended for safety</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">0.7</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Normal residential usage</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Standard for most homes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">0.5-0.6</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Low simultaneous usage</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Only for specific cases</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Circuit Breaker Selection</h2>
          
          <p className="text-gray-700 mb-4">
            Circuit breakers protect electrical circuits from overload and short circuits. The breaker rating should be 
            125% of the calculated current (safety factor) and match standard breaker sizes.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-900 mb-2">Breaker Sizing Formula</h3>
            <p className="text-blue-800 font-mono text-lg">Breaker Rating = Current × 1.25 (safety factor)</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Load (W)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current @ 220V</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommended Breaker</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">1000W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">4.5A</td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">6A</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">2000W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">9.1A</td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">13A</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">3000W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">13.6A</td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">16A</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">4000W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">18.2A</td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">25A</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">5000W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">22.7A</td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">32A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Example</h2>
          
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example: 3-Bedroom House</h3>
            
            <div className="text-sm bg-gray-50 p-4 rounded-lg space-y-2 mb-4">
              <div className="font-semibold text-gray-900">Appliances:</div>
              <div className="text-gray-700">• 15 LED Bulbs × 10W = 150W</div>
              <div className="text-gray-700">• 5 Ceiling Fans × 75W = 375W</div>
              <div className="text-gray-700">• 2 Air Conditioners × 1800W = 3600W</div>
              <div className="text-gray-700">• 1 Refrigerator × 300W = 300W</div>
              <div className="text-gray-700">• 1 Microwave × 1000W = 1000W</div>
              <div className="text-gray-700">• 2 TVs × 80W = 160W</div>
              <div className="text-gray-700">• 1 Washing Machine × 500W = 500W</div>
              <div className="text-gray-700">• 1 Water Heater × 2000W = 2000W</div>
            </div>

            <div className="text-sm font-mono bg-gray-50 p-4 rounded space-y-1">
              <div className="text-gray-900 font-bold">Calculation:</div>
              <div className="text-gray-700">Total Connected Load = 8085W</div>
              <div className="text-gray-700">Diversity Factor = 0.8</div>
              <div className="text-gray-700">Adjusted Load = 8085 × 0.8 = 6468W</div>
              <div className="text-gray-700">Current @ 220V = 6468 / 220 = 29.4A</div>
              <div className="text-gray-700">Required Breaker = 29.4 × 1.25 = 36.75A</div>
              <div className="text-primary font-bold">Recommended Breaker = 40A</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Considerations</h2>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">⚠️</span>
              <span><strong>Never Overload Circuits:</strong> Exceeding circuit capacity can cause overheating, fire hazards, and equipment damage.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">⚠️</span>
              <span><strong>Use Proper Wire Sizes:</strong> Wire gauge must match the circuit breaker rating and load requirements.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">⚠️</span>
              <span><strong>Consider Future Expansion:</strong> Plan for additional appliances and increased load over time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">⚠️</span>
              <span><strong>Separate High-Load Appliances:</strong> Air conditioners, water heaters, and ovens should have dedicated circuits.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">⚠️</span>
              <span><strong>Regular Inspections:</strong> Have electrical systems inspected periodically by qualified electricians.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Reducing Electrical Load</h2>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Use LED Lighting:</strong> LEDs consume 80-90% less power than incandescent bulbs.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Choose Energy-Efficient Appliances:</strong> Look for high energy star ratings.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Unplug Unused Devices:</strong> Eliminate phantom power consumption.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Use Timers and Smart Controls:</strong> Automate appliance operation to avoid simultaneous usage.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Maintain Appliances:</strong> Regular maintenance ensures efficient operation.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the average electrical load for a house?</h3>
              <p className="text-sm text-gray-700">
                A typical small apartment might have 2-3 kW, a medium house 5-8 kW, and a large house 10-15 kW or more. 
                The actual load depends on the number and type of appliances, climate (heating/cooling needs), and lifestyle.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I find the wattage of my appliances?</h3>
              <p className="text-sm text-gray-700">
                Check the appliance nameplate or label, usually located on the back or bottom. It will show power rating 
                in watts (W) or kilowatts (kW). You can also check the user manual or manufacturer's website.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I use 110V or 220V for calculations?</h3>
              <p className="text-sm text-gray-700">
                Use the voltage of your electrical system. North America typically uses 110-120V, while most other countries 
                use 220-240V. Check your electrical panel or consult local standards.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What happens if I exceed my electrical capacity?</h3>
              <p className="text-sm text-gray-700">
                Exceeding capacity can trip circuit breakers (safety mechanism), cause voltage drops, overheat wiring, 
                damage appliances, or in severe cases, create fire hazards. Always ensure your system can handle the load.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do I need separate circuits for different rooms?</h3>
              <p className="text-sm text-gray-700">
                Yes, it's recommended to have separate circuits for different areas and high-load appliances. Lighting 
                circuits, power outlet circuits, kitchen circuits, and dedicated circuits for AC units, water heaters, 
                and ovens should be separate for safety and convenience.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Professional Consultation Required</h2>
          <p className="text-sm text-yellow-800 leading-relaxed">
            This calculator provides estimates for planning purposes. Actual electrical installations must be designed 
            and installed by licensed electricians following local electrical codes and regulations. Load calculations 
            may vary based on specific conditions, code requirements, and safety factors. Always consult qualified 
            professionals for electrical system design and installation.
          </p>
        </section>

      </div>
    </div>
  );
}
