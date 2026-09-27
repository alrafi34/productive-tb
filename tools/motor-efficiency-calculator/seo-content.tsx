import ToolFaq from "@/components/ToolFaq";
import { motorEfficiencyCalculatorConfig } from "./config";

export default function MotorEfficiencyCalculatorSEO() {
  const { howToSteps, faq } = motorEfficiencyCalculatorConfig.seo;
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
          <ol className="space-y-3 text-gray-600 leading-relaxed">
            {howToSteps.map(({ name, text }, i) => (
              <li key={name} className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                <span><strong>{name}:</strong> {text}</span>
              </li>
            ))}
          </ol>
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

        <ToolFaq items={faq} />

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
