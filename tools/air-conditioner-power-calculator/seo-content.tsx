export default function AirConditionerPowerCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Air Conditioner Power Consumption?</h2>
          <p className="text-gray-700 leading-relaxed">
            Air conditioner power consumption refers to the amount of electrical energy an AC unit uses over time, measured in 
            kilowatt-hours (kWh). Understanding your AC's power consumption is crucial for estimating electricity costs, managing 
            energy usage, and making informed decisions about AC selection and usage patterns. AC units are typically one of the 
            highest energy-consuming appliances in homes and offices, often accounting for 40-60% of summer electricity bills.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AC Power Consumption Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Ton to Watts Conversion</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">Power (W) = Capacity (Ton) × 3517</p>
              <p className="text-sm text-blue-700">
                1 Ton of cooling capacity equals approximately 3517 watts of power consumption.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Energy Consumption Formula</h3>
              <p className="text-green-800 font-mono text-lg mb-2">Energy (kWh) = (Power × Hours × Days) / 1000</p>
              <p className="text-sm text-green-700">
                Power is in watts, hours is daily usage, and dividing by 1000 converts watt-hours to kilowatt-hours.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Example Calculation</h3>
              <div className="text-sm text-purple-700 space-y-1">
                <p><strong>Given:</strong> 1.5 Ton AC, 8 hours/day, 30 days, $0.12/kWh</p>
                <p><strong>Power:</strong> 1.5 × 3517 = 5275.5 W</p>
                <p><strong>Energy:</strong> (5275.5 × 8 × 30) / 1000 = 1266.12 kWh</p>
                <p><strong>Cost:</strong> 1266.12 × 0.12 = $151.93/month</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AC Power Consumption by Capacity</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">AC Capacity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Power (Watts)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">8h/day Usage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly Cost*</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">0.75 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">2638 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">633 kWh/month</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$75.96</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">1 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">3517 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">844 kWh/month</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$101.28</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">1.5 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">5276 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1266 kWh/month</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$151.92</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">2 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">7034 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1688 kWh/month</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$202.56</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">2.5 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">8793 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">2110 kWh/month</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$253.20</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">3 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">10551 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">2532 kWh/month</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$303.84</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">*Based on $0.12/kWh electricity rate and 30 days/month</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting AC Power Consumption</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>AC Capacity:</strong> Larger capacity ACs consume more power. A 2-ton AC uses nearly double the 
                electricity of a 1-ton unit.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Energy Efficiency Rating (EER/SEER):</strong> Higher-rated ACs (5-star) use 30-40% less power than 
                lower-rated units (2-3 star) for the same cooling capacity.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Temperature Setting:</strong> Each degree lower increases power consumption by 6-8%. Setting AC at 
                24°C instead of 18°C can save 30-40% on electricity.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Room Size and Insulation:</strong> Poorly insulated rooms or oversized spaces force the AC to work 
                harder, increasing power consumption.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Ambient Temperature:</strong> Higher outdoor temperatures make the AC work harder. Power consumption 
                increases by 5-10% for every 5°C rise in outdoor temperature.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Maintenance:</strong> Dirty filters, low refrigerant, and blocked coils can increase power consumption 
                by 15-30%.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Inverter vs Non-Inverter:</strong> Inverter ACs adjust compressor speed and use 30-50% less power 
                than fixed-speed non-inverter ACs.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Reduce AC Power Consumption</h2>
          
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Set Temperature to 24-26°C</h3>
                  <p className="text-sm text-green-800">
                    Setting your AC to 24°C instead of 18°C can reduce power consumption by 30-40%, saving $40-60 per month 
                    on a 1.5-ton AC.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Use Inverter AC</h3>
                  <p className="text-sm text-green-800">
                    Inverter ACs adjust compressor speed based on cooling needs, using 30-50% less power than non-inverter ACs. 
                    They save $45-75 per month.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Clean Filters Regularly</h3>
                  <p className="text-sm text-green-800">
                    Clean AC filters every 2-3 weeks. Dirty filters reduce airflow, forcing the AC to work harder and increasing 
                    power consumption by 15-20%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Improve Room Insulation</h3>
                  <p className="text-sm text-green-800">
                    Seal gaps around doors and windows, use curtains or blinds to block sunlight, and insulate walls to reduce 
                    cooling load by 20-30%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Use Timer and Sleep Mode</h3>
                  <p className="text-sm text-green-800">
                    Set timers to turn off AC after you fall asleep. Sleep mode gradually increases temperature, reducing power 
                    consumption by 10-15%.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Choose Right Capacity</h3>
                  <p className="text-sm text-green-800">
                    Use the correct AC size for your room. Oversized ACs cycle on/off frequently, wasting energy. Undersized ACs 
                    run continuously, also wasting power.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AC Capacity Selection Guide</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area (sq ft)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommended Capacity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room Type</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Small</td>
                  <td className="px-4 py-3 text-sm text-gray-700">80-120 sq ft</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">0.75 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Small bedroom</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Medium</td>
                  <td className="px-4 py-3 text-sm text-gray-700">120-180 sq ft</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">1 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Medium bedroom</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Large</td>
                  <td className="px-4 py-3 text-sm text-gray-700">180-250 sq ft</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">1.5 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Large bedroom, small living room</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Extra Large</td>
                  <td className="px-4 py-3 text-sm text-gray-700">250-350 sq ft</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">2 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Large living room, office</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Very Large</td>
                  <td className="px-4 py-3 text-sm text-gray-700">350-450 sq ft</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">2.5 Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Hall, multiple rooms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Commercial</td>
                  <td className="px-4 py-3 text-sm text-gray-700">450+ sq ft</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">3+ Ton</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Large hall, commercial space</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inverter vs Non-Inverter AC: Cost Comparison</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">Non-Inverter AC (1.5 Ton)</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Power:</span>
                  <span className="font-mono font-semibold">5276 W</span>
                </div>
                <div className="flex justify-between">
                  <span>8 hours/day:</span>
                  <span className="font-mono font-semibold">42.2 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly (30 days):</span>
                  <span className="font-mono font-semibold">1266 kWh</span>
                </div>
                <div className="flex justify-between border-t border-blue-300 pt-2 mt-2">
                  <span className="font-semibold">Monthly Cost:</span>
                  <span className="font-mono font-bold text-lg">$151.92</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">Inverter AC (1.5 Ton)</h3>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex justify-between">
                  <span>Power:</span>
                  <span className="font-mono font-semibold">3700 W (avg)</span>
                </div>
                <div className="flex justify-between">
                  <span>8 hours/day:</span>
                  <span className="font-mono font-semibold">29.6 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly (30 days):</span>
                  <span className="font-mono font-semibold">888 kWh</span>
                </div>
                <div className="flex justify-between border-t border-green-300 pt-2 mt-2">
                  <span className="font-semibold">Monthly Cost:</span>
                  <span className="font-mono font-bold text-lg">$106.56</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Savings:</strong> Inverter AC saves approximately $45.36 per month (30% reduction) compared to non-inverter AC. 
              Annual savings: $544.32. The higher upfront cost of inverter ACs is typically recovered within 2-3 years.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much electricity does a 1.5-ton AC use per hour?</h3>
              <p className="text-sm text-gray-700">
                A 1.5-ton AC uses approximately 5.3 kWh per hour (5276 watts). At $0.12/kWh, this costs about $0.63 per hour. 
                Running it 8 hours daily costs $5.06/day or $151.92/month. Inverter ACs use 30-40% less.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between ton and watt for AC?</h3>
              <p className="text-sm text-gray-700">
                Ton measures cooling capacity (how much heat the AC can remove), while watt measures power consumption (electricity used). 
                1 ton of cooling capacity requires approximately 3517 watts of electrical power. A 1.5-ton AC has 1.5 tons of cooling 
                capacity and consumes about 5276 watts.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is it cheaper to run AC all day or turn it on/off?</h3>
              <p className="text-sm text-gray-700">
                For inverter ACs, running continuously at a moderate temperature (24-26°C) is more efficient than frequent on/off cycles. 
                For non-inverter ACs, turning off when not needed saves more. Use timers to turn off AC 1-2 hours before waking or leaving.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much does it cost to run an AC for 24 hours?</h3>
              <p className="text-sm text-gray-700">
                A 1.5-ton AC running 24 hours consumes about 126.6 kWh, costing $15.19 per day at $0.12/kWh. This equals $455.76 per month. 
                Running AC 24/7 is extremely expensive and usually unnecessary. Use timers and temperature controls to optimize usage.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Does setting AC to 18°C cool faster than 24°C?</h3>
              <p className="text-sm text-gray-700">
                No. AC cools at the same rate regardless of temperature setting. Setting to 18°C doesn't cool faster; it just runs longer 
                to reach a lower temperature, consuming 30-40% more power. Set to 24°C for optimal comfort and efficiency.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How can I reduce my AC electricity bill?</h3>
              <p className="text-sm text-gray-700">
                Key strategies: (1) Set temperature to 24-26°C, (2) Use inverter AC, (3) Clean filters every 2-3 weeks, (4) Improve room 
                insulation, (5) Use ceiling fans with AC to circulate air, (6) Service AC annually, (7) Use timer/sleep mode, (8) Close 
                doors and windows while AC is running. These can reduce bills by 30-50%.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            Combine your AC with ceiling fans to improve air circulation. This allows you to set the AC temperature 2-3°C higher while 
            maintaining the same comfort level, reducing power consumption by 12-18% and saving $18-27 per month on a 1.5-ton AC. The fan 
            uses only 75W compared to the AC's 5276W, making this combination highly cost-effective.
          </p>
        </section>

      </div>
    </div>
  );
}
