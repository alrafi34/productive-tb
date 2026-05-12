export default function SolarPanelCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Solar Panel Requirements</h2>
          <p className="text-gray-700 leading-relaxed">
            Calculating solar panel requirements involves determining how much electricity your home or business uses, understanding 
            your location's solar potential (sun hours), and sizing a system that meets your energy needs. This calculator uses 
            industry-standard formulas to estimate the number of solar panels, system size in kilowatts (kW), energy production, 
            and environmental impact of your solar installation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Solar Panel Calculation Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Step 1: Daily Energy Consumption</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">Daily Usage (kWh) = Monthly Usage / 30</p>
              <p className="text-sm text-blue-700">
                Convert monthly electricity consumption to daily average.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Step 2: Required System Size</h3>
              <p className="text-green-800 font-mono text-lg mb-2">System Size (kW) = Daily Usage / (Sun Hours × Efficiency)</p>
              <p className="text-sm text-green-700">
                Calculate the solar system capacity needed. Efficiency typically ranges from 75-85% (0.75-0.85).
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Step 3: Number of Panels</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">Panels = (System Size × 1000) / Panel Wattage</p>
              <p className="text-sm text-purple-700">
                Divide total system watts by individual panel wattage to get panel count.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Example Calculation</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Given:</strong> 600 kWh/month, 5 sun hours/day, 400W panels, 80% efficiency</p>
                <p><strong>Daily Usage:</strong> 600 / 30 = 20 kWh/day</p>
                <p><strong>System Size:</strong> 20 / (5 × 0.80) = 5 kW</p>
                <p><strong>Panels:</strong> (5 × 1000) / 400 = 12.5 → 13 panels</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Average Sun Hours by Location</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sun Hours/Day</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solar Potential</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Arizona, Nevada</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">6-7 hours</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">Excellent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">California, Texas, Florida</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">5-6 hours</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">Very Good</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Colorado, New Mexico</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">5-5.5 hours</td>
                  <td className="px-4 py-3 text-sm text-blue-600 font-semibold">Good</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">New York, Illinois</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">4-4.5 hours</td>
                  <td className="px-4 py-3 text-sm text-blue-600 font-semibold">Moderate</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Washington, Oregon</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">3.5-4 hours</td>
                  <td className="px-4 py-3 text-sm text-yellow-600 font-semibold">Fair</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Alaska</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">2.5-3 hours</td>
                  <td className="px-4 py-3 text-sm text-orange-600 font-semibold">Limited</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">Note: Sun hours vary by season. These are annual averages.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Solar Panel Wattage Options</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Standard Panels (250-350W)</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">250W Panel</span>
                  <span className="font-mono text-gray-900">Older technology</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">300W Panel</span>
                  <span className="font-mono text-gray-900">Common residential</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">350W Panel</span>
                  <span className="font-mono text-gray-900">Modern standard</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">High-Efficiency Panels (400-500W)</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">400W Panel</span>
                  <span className="font-mono text-gray-900">High efficiency</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">450W Panel</span>
                  <span className="font-mono text-gray-900">Premium residential</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">500W Panel</span>
                  <span className="font-mono text-gray-900">Commercial grade</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-3">
            Higher wattage panels cost more but require fewer panels and less roof space for the same system size.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Efficiency Factors</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Inverter Efficiency (95-98%):</strong> Inverters convert DC power from panels to AC power for home use, 
                with 2-5% loss.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Temperature Losses (5-10%):</strong> Solar panels lose efficiency in high temperatures. Each degree above 
                25°C reduces output by 0.4-0.5%.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Shading Losses (0-20%):</strong> Even partial shading can significantly reduce output. Trees, chimneys, 
                and nearby buildings cause shading.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Wiring Losses (1-3%):</strong> Resistance in cables causes power loss, especially over long distances.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Soiling Losses (2-5%):</strong> Dust, dirt, bird droppings, and pollen reduce panel efficiency. Regular 
                cleaning helps maintain output.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Age Degradation (0.5-1% per year):</strong> Solar panels gradually lose efficiency over time. Most panels 
                retain 80-85% efficiency after 25 years.
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Overall System Efficiency:</strong> Combining all factors, typical solar systems operate at 75-85% efficiency. 
              This calculator uses 80% as the default, which is a realistic average for well-designed residential systems.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Roof Space Requirements</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">System Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Panels (400W)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roof Space</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Home Size</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">3 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">8 panels</td>
                  <td className="px-4 py-3 text-sm text-gray-600">16 m² (172 sq ft)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Small home</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">5 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">13 panels</td>
                  <td className="px-4 py-3 text-sm text-gray-600">26 m² (280 sq ft)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Medium home</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">7 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">18 panels</td>
                  <td className="px-4 py-3 text-sm text-gray-600">36 m² (388 sq ft)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Large home</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">10 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">25 panels</td>
                  <td className="px-4 py-3 text-sm text-gray-600">50 m² (538 sq ft)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Very large home</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">Based on 2 m² per panel. Add 20-30% for spacing and access.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Environmental Impact of Solar Energy</h2>
          
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">🌍</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">CO2 Emissions Reduction</h3>
                  <p className="text-sm text-green-800">
                    Solar energy produces zero emissions during operation. A typical 5 kW residential system prevents approximately 
                    4,600 kg of CO2 emissions annually, equivalent to planting 220 trees or taking a car off the road for 11,000 miles.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">💧</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Water Conservation</h3>
                  <p className="text-sm text-green-800">
                    Unlike fossil fuel and nuclear power plants that require massive amounts of water for cooling, solar panels 
                    use virtually no water during operation, conserving this precious resource.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">🏭</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Reduced Air Pollution</h3>
                  <p className="text-sm text-green-800">
                    Solar energy eliminates harmful pollutants like sulfur dioxide, nitrogen oxides, and particulate matter that 
                    cause respiratory problems and acid rain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Solar Panel System Costs (2024)</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">System Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Average Cost</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">After Tax Credit*</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payback Period</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">3 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$7,500 - $9,000</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$5,250 - $6,300</td>
                  <td className="px-4 py-3 text-sm text-gray-600">6-8 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">5 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$12,500 - $15,000</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$8,750 - $10,500</td>
                  <td className="px-4 py-3 text-sm text-gray-600">6-8 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">7 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$17,500 - $21,000</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$12,250 - $14,700</td>
                  <td className="px-4 py-3 text-sm text-gray-600">6-9 years</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">10 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$25,000 - $30,000</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$17,500 - $21,000</td>
                  <td className="px-4 py-3 text-sm text-gray-600">7-10 years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">*30% Federal Solar Tax Credit (ITC). State incentives may apply.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How many solar panels do I need for a 2000 sq ft home?</h3>
              <p className="text-sm text-gray-700">
                A 2000 sq ft home typically uses 800-1200 kWh/month. With 5 sun hours/day and 400W panels, you'd need 13-20 panels 
                (5-8 kW system). Actual requirements depend on your specific electricity usage, location, and energy efficiency.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between kW and kWh?</h3>
              <p className="text-sm text-gray-700">
                kW (kilowatt) measures power capacity - the size of your solar system. kWh (kilowatt-hour) measures energy production 
                or consumption over time. A 5 kW system producing power for 5 hours generates 25 kWh of energy.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How long do solar panels last?</h3>
              <p className="text-sm text-gray-700">
                Solar panels typically last 25-30 years with minimal maintenance. Most manufacturers offer 25-year performance warranties 
                guaranteeing 80-85% efficiency after 25 years. Inverters usually need replacement after 10-15 years.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do solar panels work on cloudy days?</h3>
              <p className="text-sm text-gray-700">
                Yes, but at reduced efficiency. Solar panels produce 10-25% of their rated capacity on cloudy days. This is why system 
                sizing uses average sun hours, which account for cloudy days, seasonal variations, and weather patterns.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is net metering?</h3>
              <p className="text-sm text-gray-700">
                Net metering allows you to send excess solar energy to the grid in exchange for credits. When your panels produce more 
                than you use, the excess goes to the grid. At night or on cloudy days, you draw from the grid using your credits. This 
                effectively uses the grid as a battery.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I add battery storage to my solar system?</h3>
              <p className="text-sm text-gray-700">
                Battery storage (like Tesla Powerwall) provides backup power during outages and stores excess solar energy for nighttime 
                use. It's beneficial if you have frequent outages, time-of-use electricity rates, or want energy independence. However, 
                batteries add $8,000-$15,000 to system cost.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Important Note</h2>
          <p className="text-sm text-yellow-800 leading-relaxed">
            This calculator provides estimates based on standard formulas and average conditions. Actual solar system requirements 
            vary based on roof orientation, tilt angle, shading, local climate, and specific energy usage patterns. For accurate 
            system design and installation, consult with certified solar installers who can perform detailed site assessments and 
            provide customized proposals.
          </p>
        </section>

      </div>
    </div>
  );
}
