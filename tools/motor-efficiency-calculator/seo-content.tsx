export default function MotorEfficiencyCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Motor Efficiency?</h2>
          <p className="text-gray-700 leading-relaxed">
            Motor efficiency is the ratio of mechanical power output to electrical power input, expressed as a percentage. 
            It measures how effectively an electric motor converts electrical energy into useful mechanical work. A motor 
            with 85% efficiency converts 85% of input electrical energy into mechanical output, while the remaining 15% 
            is lost as heat, friction, and other losses. Higher efficiency means lower energy consumption, reduced operating 
            costs, and less heat generation. Motor efficiency is critical for industrial applications, energy audits, and 
            equipment selection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Motor Efficiency Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Basic Formula</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">Efficiency (%) = (Output Power / Input Power) × 100</p>
              <p className="text-sm text-blue-700">
                Where output power is the mechanical power delivered by the motor shaft, and input power is the 
                electrical power consumed from the supply. Both must be in the same units (Watts or Kilowatts).
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Power Loss Calculation</h3>
              <p className="text-green-800 font-mono text-lg mb-2">Power Losses (W) = Input Power - Output Power</p>
              <p className="text-sm text-green-700">
                Power losses represent energy wasted as heat, friction, windage, and core losses. These losses reduce 
                efficiency and increase operating temperature. Lower losses mean better efficiency and cooler operation.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Loss Percentage</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">Loss % = (Losses / Input Power) × 100</p>
              <p className="text-sm text-purple-700">
                Loss percentage shows what fraction of input energy is wasted. For an 85% efficient motor, loss 
                percentage is 15%. Efficiency % + Loss % always equals 100%.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Complete Example</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Given:</strong> Input Power = 1000W, Output Power = 850W</p>
                <p><strong>Step 1:</strong> Efficiency = (850 / 1000) × 100 = 85%</p>
                <p><strong>Step 2:</strong> Losses = 1000 - 850 = 150W</p>
                <p><strong>Step 3:</strong> Loss % = (150 / 1000) × 100 = 15%</p>
                <p><strong>Rating:</strong> Good efficiency (80-89% range)</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Motor Efficiency Ratings</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency Range</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classification</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Application</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">95-98%</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">Excellent</td>
                  <td className="px-4 py-3 text-sm text-gray-700">IE4 Super Premium</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Large industrial motors, continuous duty</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">90-94%</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">Excellent</td>
                  <td className="px-4 py-3 text-sm text-gray-700">IE3 Premium</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Industrial motors, pumps, fans</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">85-89%</td>
                  <td className="px-4 py-3 text-sm text-blue-600 font-semibold">Good</td>
                  <td className="px-4 py-3 text-sm text-gray-700">IE2 High Efficiency</td>
                  <td className="px-4 py-3 text-sm text-gray-600">General purpose industrial motors</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">80-84%</td>
                  <td className="px-4 py-3 text-sm text-blue-600 font-semibold">Good</td>
                  <td className="px-4 py-3 text-sm text-gray-700">IE1 Standard</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Light industrial, commercial</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">70-79%</td>
                  <td className="px-4 py-3 text-sm text-yellow-600 font-semibold">Fair</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Standard Efficiency</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Older motors, light duty</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">&lt;70%</td>
                  <td className="px-4 py-3 text-sm text-red-600 font-semibold">Poor</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Low Efficiency</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Worn motors, needs replacement</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">*IE = International Efficiency classification standard</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Motor Losses</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Copper Losses (I²R Losses):</strong> Caused by resistance in stator and rotor windings. 
                Accounts for 50-60% of total losses. Increases with load and current. Reduced by using thicker 
                conductors and better cooling. Proportional to square of current.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Core Losses (Iron Losses):</strong> Caused by hysteresis and eddy currents in magnetic core. 
                Accounts for 20-25% of total losses. Constant regardless of load. Reduced by using high-grade 
                laminated steel. Increases with frequency and flux density.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Mechanical Losses:</strong> Friction in bearings and windage from cooling fan. Accounts for 
                5-10% of total losses. Constant at constant speed. Reduced by proper lubrication and bearing 
                maintenance. Increases with speed.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Stray Load Losses:</strong> Caused by leakage flux, harmonics, and non-uniform current 
                distribution. Accounts for 5-10% of total losses. Difficult to measure directly. Varies with load 
                and design quality.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting Motor Efficiency</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Motor Size and Rating:</strong> Larger motors (above 10 HP) are generally more efficient than 
                smaller motors. A 100 HP motor may have 95% efficiency, while a 1 HP motor may have 80% efficiency. 
                This is due to better surface-to-volume ratio and lower relative losses.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Load Factor:</strong> Motors operate most efficiently at 75-100% of rated load. Efficiency 
                drops significantly below 50% load. A motor running at 25% load may lose 10-15% efficiency. Always 
                size motors close to actual load requirements.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Motor Design and Quality:</strong> Premium efficiency motors (IE3, IE4) use better materials, 
                thicker conductors, and optimized magnetic design. They cost 15-30% more but save energy over their 
                lifetime. ROI is typically 2-4 years for continuous operation.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Operating Conditions:</strong> High ambient temperature reduces efficiency by 1-2% per 10°C 
                above rated temperature. Poor ventilation, dust accumulation, and voltage imbalance also reduce 
                efficiency. Maintain clean, cool operating environment.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Motor Age and Maintenance:</strong> Motor efficiency degrades 1-3% over 10-15 years due to 
                bearing wear, insulation degradation, and contamination. Regular maintenance (lubrication, cleaning, 
                alignment) maintains efficiency. Rewinding reduces efficiency by 1-2%.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Voltage and Frequency:</strong> Operating at ±10% of rated voltage reduces efficiency by 2-5%. 
                Voltage imbalance above 2% causes significant losses and overheating. Use voltage stabilizers for 
                critical applications. Frequency variation also affects efficiency.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Measure Motor Efficiency</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Method 1: Direct Measurement (Most Accurate)</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>Input Power:</strong> Measure voltage (V), current (I), and power factor (PF) using a power 
                meter. For 3-phase: P_in = √3 × V × I × PF. For single-phase: P_in = V × I × PF.</p>
                <p><strong>Output Power:</strong> Measure torque (T) and speed (N) using a dynamometer. 
                P_out = (2 × π × N × T) / 60. Requires specialized equipment.</p>
                <p><strong>Efficiency:</strong> η = (P_out / P_in) × 100. Most accurate but requires expensive equipment.</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Method 2: Nameplate Method (Quick Estimate)</h3>
              <div className="text-sm text-green-800 space-y-2">
                <p><strong>Input Power:</strong> Measure actual input power using a power meter or clamp meter.</p>
                <p><strong>Output Power:</strong> Use nameplate rated power (HP or kW) multiplied by load factor. 
                Estimate load factor from current: Load Factor ≈ (Actual Current / Rated Current).</p>
                <p><strong>Efficiency:</strong> Calculate using formula. Less accurate but practical for field testing.</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Method 3: Slip Method (Induction Motors)</h3>
              <div className="text-sm text-purple-800 space-y-2">
                <p><strong>Measure Slip:</strong> Slip = (Synchronous Speed - Actual Speed) / Synchronous Speed. 
                Lower slip indicates higher efficiency and lighter load.</p>
                <p><strong>Estimate Load:</strong> Load % ≈ (Slip / Full Load Slip) × 100. Full load slip is typically 
                2-5% for standard motors.</p>
                <p><strong>Efficiency:</strong> Use manufacturer's efficiency curve at estimated load. Approximate method.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Energy Savings from High-Efficiency Motors</h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-green-900 mb-3">Example: 10 HP Motor Running 8000 Hours/Year</h3>
            <div className="space-y-2 text-sm text-green-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-1">Standard Motor (85% efficiency):</p>
                  <p>Input Power = 10 HP / 0.85 = 11.76 HP = 8.77 kW</p>
                  <p>Annual Energy = 8.77 kW × 8000 hrs = 70,160 kWh</p>
                  <p>Annual Cost @ $0.12/kWh = $8,419</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Premium Motor (92% efficiency):</p>
                  <p>Input Power = 10 HP / 0.92 = 10.87 HP = 8.10 kW</p>
                  <p>Annual Energy = 8.10 kW × 8000 hrs = 64,800 kWh</p>
                  <p>Annual Cost @ $0.12/kWh = $7,776</p>
                </div>
              </div>
              <div className="pt-3 border-t border-green-300 mt-3">
                <p className="font-bold">Annual Savings: 5,360 kWh = $643</p>
                <p className="font-bold">Payback Period: If premium motor costs $300 more, payback = 300/643 = 5.6 months</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motor Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Standard (85%)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium (92%)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Annual Savings*</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">5 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$4,210</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$3,888</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$322</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">10 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$8,419</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$7,776</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$643</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">25 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$21,048</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$19,440</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$1,608</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">50 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$42,096</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$38,880</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$3,216</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">100 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$84,192</td>
                  <td className="px-4 py-3 text-sm text-gray-700">$77,760</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">$6,432</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">*Based on 8000 hours/year operation at $0.12/kWh</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Replace Low-Efficiency Motors</h2>
          
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Replace Immediately If:</h3>
                  <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                    <li>Motor efficiency is below 70% (poor rating)</li>
                    <li>Motor runs continuously (more than 4000 hours/year)</li>
                    <li>Motor is oversized by more than 50% (runs at low load)</li>
                    <li>Motor is more than 20 years old</li>
                    <li>Motor has been rewound multiple times</li>
                    <li>Energy cost savings justify replacement within 2-3 years</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 text-xl">⚠</span>
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Consider Replacement If:</h3>
                  <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                    <li>Motor efficiency is 70-80% (fair rating)</li>
                    <li>Motor runs 2000-4000 hours/year</li>
                    <li>Motor requires frequent maintenance</li>
                    <li>Motor is 10-20 years old</li>
                    <li>Payback period is 3-5 years</li>
                    <li>Motor will be rewound (consider new premium motor instead)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 text-xl">ℹ</span>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Keep Existing Motor If:</h3>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Motor efficiency is above 85% (good or excellent rating)</li>
                    <li>Motor runs less than 2000 hours/year (intermittent duty)</li>
                    <li>Motor is less than 10 years old and well-maintained</li>
                    <li>Motor is properly sized for the load</li>
                    <li>Payback period exceeds 5 years</li>
                    <li>Motor is a backup or standby unit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is a good efficiency for an electric motor?</h3>
              <p className="text-sm text-gray-700">
                For industrial motors, 85-95% is considered good to excellent efficiency. Small motors (below 1 HP) 
                typically have 70-85% efficiency, medium motors (1-10 HP) have 80-90% efficiency, and large motors 
                (above 10 HP) can achieve 90-96% efficiency. Premium efficiency motors (IE3, IE4) offer the highest 
                efficiency ratings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I calculate motor efficiency without a dynamometer?</h3>
              <p className="text-sm text-gray-700">
                Measure input power using a power meter (voltage, current, power factor). Estimate output power from 
                nameplate rating multiplied by load factor. Load factor can be estimated from current: Load Factor ≈ 
                (Actual Current / Rated Current). Then calculate efficiency = (Output / Input) × 100. This method is 
                less accurate but practical for field testing.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is my motor efficiency lower than nameplate rating?</h3>
              <p className="text-sm text-gray-700">
                Motors operate at nameplate efficiency only at 75-100% of rated load. At lower loads, efficiency drops 
                significantly. Other causes include high ambient temperature, poor ventilation, voltage imbalance, 
                bearing wear, misalignment, and age. A motor running at 25% load may lose 10-15% efficiency compared 
                to full load operation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What causes power losses in electric motors?</h3>
              <p className="text-sm text-gray-700">
                Main losses are: (1) Copper losses (50-60%) from winding resistance, (2) Core losses (20-25%) from 
                hysteresis and eddy currents, (3) Mechanical losses (5-10%) from friction and windage, and (4) Stray 
                losses (5-10%) from leakage flux and harmonics. Total losses typically range from 5-20% of input power 
                depending on motor size and efficiency class.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is it worth upgrading to a premium efficiency motor?</h3>
              <p className="text-sm text-gray-700">
                Yes, for motors running continuously (more than 4000 hours/year). A premium motor costs 15-30% more 
                but saves 3-8% energy. For a 10 HP motor running 8000 hours/year, annual savings are $600-800, giving 
                payback in 6-18 months. For intermittent duty (less than 2000 hours/year), payback may exceed 5 years, 
                making it less attractive.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does motor size affect efficiency?</h3>
              <p className="text-sm text-gray-700">
                Larger motors are generally more efficient. A 1 HP motor may have 80% efficiency, a 10 HP motor 88%, 
                and a 100 HP motor 95%. This is because larger motors have better surface-to-volume ratio, lower 
                relative losses, and can justify better materials and design. However, an oversized motor running at 
                low load will have poor efficiency regardless of size.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I rewind or replace a failed motor?</h3>
              <p className="text-sm text-gray-700">
                For motors below 50 HP, replacement with a premium efficiency motor is usually more cost-effective than 
                rewinding. Rewinding costs 40-60% of new motor price but reduces efficiency by 1-2% and doesn't address 
                bearing wear or mechanical issues. For large motors (above 50 HP) or special motors, rewinding by a 
                certified shop may be justified. Always compare lifecycle costs, not just initial cost.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            Motor efficiency is highest at 75-100% of rated load. If your motor consistently runs below 50% load, 
            consider replacing it with a smaller, properly-sized motor. An oversized 10 HP motor running at 30% load 
            (3 HP) may have only 75% efficiency, while a properly-sized 5 HP motor running at 60% load would have 85% 
            efficiency. This simple change can save 10-15% energy and pay for itself in 1-2 years for continuous 
            operation. Use a power meter to measure actual load before making sizing decisions.
          </p>
        </section>

      </div>
    </div>
  );
}
