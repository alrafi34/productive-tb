export default function FanPowerConsumptionCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Fan Power Consumption?</h2>
          <p className="text-gray-700 leading-relaxed">
            Fan power consumption refers to the amount of electrical energy a fan uses over time, measured in kilowatt-hours (kWh). 
            Understanding your fan's power consumption helps you estimate electricity costs, manage energy usage, and make informed 
            decisions about fan selection and usage patterns. Different fan types consume varying amounts of power based on their 
            size, motor type, and speed settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fan Power Consumption Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Energy Consumption Formula</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">Energy (kWh) = (Power × Hours × Days) / 1000</p>
              <p className="text-sm text-blue-700">
                Power is in watts, hours is daily usage, and dividing by 1000 converts watt-hours to kilowatt-hours.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Cost Calculation Formula</h3>
              <p className="text-green-800 font-mono text-lg mb-2">Cost = Energy (kWh) × Tariff Rate</p>
              <p className="text-sm text-green-700">
                Multiply the energy consumption by your electricity rate per kWh to get the total cost.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Example Calculation</h3>
              <div className="text-sm text-purple-700 space-y-1">
                <p><strong>Given:</strong> 75W fan, 8 hours/day, 30 days, $0.12/kWh</p>
                <p><strong>Energy:</strong> (75 × 8 × 30) / 1000 = 18 kWh</p>
                <p><strong>Cost:</strong> 18 × 0.12 = $2.16/month</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Typical Fan Power Ratings</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fan Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Power Range</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Usage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly Cost*</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Ceiling Fan (Standard)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">60-90W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">8-12 hours/day</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$1.73-$3.89</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Ceiling Fan (BLDC)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">28-50W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">8-12 hours/day</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$0.81-$2.16</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Table Fan</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">40-60W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">6-8 hours/day</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$0.86-$1.73</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Pedestal Fan</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">50-70W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">8-10 hours/day</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$1.44-$2.52</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Tower Fan</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">40-55W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">8-12 hours/day</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$1.15-$2.38</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Exhaust Fan (Bathroom)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">20-40W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">2-4 hours/day</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$0.14-$0.58</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Exhaust Fan (Kitchen)</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">100-200W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">2-4 hours/day</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$0.72-$2.88</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Industrial Fan</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">150-300W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">10-24 hours/day</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$5.40-$25.92</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">*Based on $0.12/kWh electricity rate and 30 days/month</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting Fan Power Consumption</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Motor Type:</strong> BLDC (Brushless DC) motors are 50-60% more efficient than traditional induction motors, 
                consuming significantly less power for the same airflow.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Fan Size:</strong> Larger fans with bigger blades typically consume more power but move more air, 
                potentially allowing you to use fewer fans.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Speed Settings:</strong> Running a fan at lower speeds reduces power consumption. Most fans use 30-50% 
                less power at medium speed compared to high speed.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Usage Duration:</strong> The longer a fan runs, the more energy it consumes. Using timers or smart controls 
                can help optimize usage.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Maintenance:</strong> Dirty blades and worn bearings increase friction, causing the motor to work harder 
                and consume more power.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Age and Efficiency:</strong> Older fans with worn motors are less efficient. Modern energy-efficient 
                fans can save 30-50% on electricity costs.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Energy Saving Tips for Fans</h2>
          
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Upgrade to BLDC Fans</h3>
                  <p className="text-sm text-green-800">
                    BLDC ceiling fans consume 28-35W compared to 70-90W for traditional fans, saving $15-30 annually per fan.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Use Lower Speed Settings</h3>
                  <p className="text-sm text-green-800">
                    Running fans at medium speed instead of high can reduce power consumption by 30-40% while still providing adequate cooling.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Turn Off When Not Needed</h3>
                  <p className="text-sm text-green-800">
                    Fans cool people, not rooms. Turn them off when leaving the room to avoid wasting electricity.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Regular Cleaning and Maintenance</h3>
                  <p className="text-sm text-green-800">
                    Clean fan blades monthly and lubricate bearings annually to maintain efficiency and reduce power consumption.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Use Timers and Smart Controls</h3>
                  <p className="text-sm text-green-800">
                    Install timers or smart switches to automatically turn off fans after a set period, preventing unnecessary usage.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Optimize Fan Placement</h3>
                  <p className="text-sm text-green-800">
                    Proper placement improves air circulation, allowing you to use fewer fans or run them at lower speeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fan vs Air Conditioner: Cost Comparison</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">Ceiling Fan (75W)</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Power:</span>
                  <span className="font-mono font-semibold">75W</span>
                </div>
                <div className="flex justify-between">
                  <span>8 hours/day:</span>
                  <span className="font-mono font-semibold">0.6 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly (30 days):</span>
                  <span className="font-mono font-semibold">18 kWh</span>
                </div>
                <div className="flex justify-between border-t border-blue-300 pt-2 mt-2">
                  <span className="font-semibold">Monthly Cost:</span>
                  <span className="font-mono font-bold text-lg">$2.16</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-3">Air Conditioner (1.5 Ton)</h3>
              <div className="space-y-2 text-sm text-red-800">
                <div className="flex justify-between">
                  <span>Power:</span>
                  <span className="font-mono font-semibold">1800W</span>
                </div>
                <div className="flex justify-between">
                  <span>8 hours/day:</span>
                  <span className="font-mono font-semibold">14.4 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly (30 days):</span>
                  <span className="font-mono font-semibold">432 kWh</span>
                </div>
                <div className="flex justify-between border-t border-red-300 pt-2 mt-2">
                  <span className="font-semibold">Monthly Cost:</span>
                  <span className="font-mono font-bold text-lg">$51.84</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Savings:</strong> Using a ceiling fan instead of an air conditioner can save approximately $49.68 per month 
              (96% reduction). Combining fans with AC at a higher temperature setting can reduce AC costs by 30-40%.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Find Your Fan's Power Rating</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">1.</span>
              <div>
                <strong>Check the Label:</strong> Look for a label or sticker on the fan motor housing or blade assembly. 
                It typically shows wattage, voltage, and current ratings.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">2.</span>
              <div>
                <strong>User Manual:</strong> Refer to the product manual or specification sheet that came with the fan. 
                Power consumption is usually listed in the technical specifications.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">3.</span>
              <div>
                <strong>Manufacturer Website:</strong> Search for your fan model on the manufacturer's website to find 
                detailed specifications including power consumption.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">4.</span>
              <div>
                <strong>Use a Power Meter:</strong> Plug the fan into a power meter (kill-a-watt meter) to measure actual 
                power consumption at different speed settings.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">5.</span>
              <div>
                <strong>Calculate from Current:</strong> If only current (amperes) is listed, calculate power using: 
                Power (W) = Voltage (V) × Current (A). For example, 0.35A at 230V = 80.5W.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much electricity does a ceiling fan use per hour?</h3>
              <p className="text-sm text-gray-700">
                A standard ceiling fan uses 60-90 watts per hour, which equals 0.06-0.09 kWh. At $0.12/kWh, this costs 
                approximately $0.007-$0.011 per hour (less than 1 cent per hour). Energy-efficient BLDC fans use only 
                28-50 watts per hour.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is it cheaper to run a fan or air conditioner?</h3>
              <p className="text-sm text-gray-700">
                Fans are significantly cheaper. A ceiling fan costs about $2-3 per month to run 8 hours daily, while a 
                1.5-ton AC costs $50-60 per month for the same usage. Fans use 95-97% less electricity than air conditioners.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Does fan speed affect power consumption?</h3>
              <p className="text-sm text-gray-700">
                Yes. Running a fan at medium speed typically uses 30-50% less power than high speed. For example, a 75W fan 
                at high speed might use only 40-50W at medium speed, saving $0.50-$1.00 per month per fan.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I leave fans on when I'm not in the room?</h3>
              <p className="text-sm text-gray-700">
                No. Fans cool people by creating a wind-chill effect, not by lowering room temperature. Leaving fans on in 
                empty rooms wastes electricity. Always turn off fans when leaving the room.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much can I save by switching to a BLDC fan?</h3>
              <p className="text-sm text-gray-700">
                BLDC fans use 50-65% less power than traditional fans. Replacing a 75W traditional fan with a 35W BLDC fan 
                saves approximately 14.4 kWh per month (8 hours/day usage), which equals $1.73/month or $20.74/year per fan.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do old fans consume more electricity?</h3>
              <p className="text-sm text-gray-700">
                Yes. Older fans with worn bearings, dirty blades, and aging motors are less efficient and can consume 10-20% 
                more power than when new. Regular maintenance helps, but replacing very old fans with modern energy-efficient 
                models provides significant savings.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Quick Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            To maximize savings, use fans in combination with air conditioning. Set your AC 2-3°C higher and use ceiling fans 
            to circulate cool air. This can reduce AC power consumption by 30-40% while maintaining comfort, saving $15-20 per 
            month on electricity bills.
          </p>
        </section>

      </div>
    </div>
  );
}
