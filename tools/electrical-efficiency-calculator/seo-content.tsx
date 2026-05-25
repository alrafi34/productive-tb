export default function ElectricalEfficiencyCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Electrical Efficiency Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Electrical Efficiency Calculator is a professional engineering tool designed to calculate the efficiency of electrical systems by comparing output power to input power. This calculator helps engineers, technicians, and students quickly determine how effectively electrical systems convert input energy into useful output energy.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Efficiency analysis is fundamental to electrical system design and optimization, affecting energy costs, environmental impact, and system performance. This tool provides instant calculations with real-time updates, making it ideal for system analysis, energy audits, and educational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Real-time Calculations:</strong> Instant results as you type with debounced input handling</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Multiple Power Units:</strong> Support for Watts, Kilowatts, and Megawatts with automatic conversion</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Efficiency Classification:</strong> Automatic categorization (excellent, good, fair, poor) with visual indicators</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Power Loss Analysis:</strong> Calculate and display power losses with percentage breakdown</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Visual Efficiency Gauge:</strong> Interactive efficiency bar with color-coded performance levels</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Power Flow Diagram:</strong> Visual representation of input power, losses, and output power</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Smart Warnings:</strong> Alerts for unusual efficiency values or potential measurement errors</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Common Presets:</strong> Quick calculations for typical electrical systems and devices</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Step-by-step Solutions:</strong> Detailed calculation process with formulas and intermediate steps</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export Options:</strong> Download results as TXT or CSV files for documentation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation History:</strong> Save and review previous efficiency calculations</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Efficiency Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Basic Efficiency Formula</h3>
              <code className="text-sm text-gray-700">Efficiency (%) = (Output Power / Input Power) × 100</code>
              <p className="text-sm text-gray-600 mt-2">
                Where efficiency is expressed as a percentage, output power is the useful power delivered by the system, and input power is the total power consumed by the system.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Power Loss Calculation</h3>
              <code className="text-sm text-gray-700">Power Loss = Input Power - Output Power</code>
              <p className="text-sm text-gray-600 mt-2">
                Power loss represents the energy converted to heat, noise, or other non-useful forms. Lower power loss indicates higher efficiency.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Loss Percentage</h3>
              <code className="text-sm text-gray-700">Loss (%) = (Power Loss / Input Power) × 100</code>
              <p className="text-sm text-gray-600 mt-2">
                Loss percentage shows what fraction of input power is wasted. Note that Efficiency (%) + Loss (%) = 100%.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Example 1: Electric Motor</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>Given:</strong> Input Power = 10 kW, Output Power = 9.2 kW</p>
                <p><strong>Calculation:</strong></p>
                <p>Efficiency = (9.2 / 10) × 100 = 92%</p>
                <p>Power Loss = 10 - 9.2 = 0.8 kW</p>
                <p>Loss Percentage = (0.8 / 10) × 100 = 8%</p>
                <p><strong>Result:</strong> Good efficiency typical for industrial motors</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">Example 2: LED Light</h3>
              <div className="text-sm text-green-800 space-y-2">
                <p><strong>Given:</strong> Input Power = 100 W, Output Power = 95 W</p>
                <p><strong>Calculation:</strong></p>
                <p>Efficiency = (95 / 100) × 100 = 95%</p>
                <p>Power Loss = 100 - 95 = 5 W</p>
                <p>Loss Percentage = (5 / 100) × 100 = 5%</p>
                <p><strong>Result:</strong> Excellent efficiency for LED lighting</p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">Example 3: Power Supply</h3>
              <div className="text-sm text-purple-800 space-y-2">
                <p><strong>Given:</strong> Input Power = 500 W, Output Power = 450 W</p>
                <p><strong>Calculation:</strong></p>
                <p>Efficiency = (450 / 500) × 100 = 90%</p>
                <p>Power Loss = 500 - 450 = 50 W</p>
                <p>Loss Percentage = (50 / 500) × 100 = 10%</p>
                <p><strong>Result:</strong> Good efficiency for switching power supply</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Efficiency Classification</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency Range</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Applications</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Characteristics</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">Excellent</td>
                  <td className="px-4 py-3 text-sm text-gray-700">≥ 95%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">LED lights, modern transformers, high-end power supplies</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Minimal losses, optimal design</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">Good</td>
                  <td className="px-4 py-3 text-sm text-gray-700">85 - 94%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Electric motors, inverters, modern appliances</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Well-designed systems</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-yellow-600">Fair</td>
                  <td className="px-4 py-3 text-sm text-gray-700">70 - 84%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Older motors, basic power supplies, heating elements</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Acceptable for many applications</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">Poor</td>
                  <td className="px-4 py-3 text-sm text-gray-700">&lt; 70%</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Incandescent bulbs, old equipment, resistive heating</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High losses, needs improvement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Motor Analysis</h3>
              <p className="text-sm text-blue-800">
                Evaluate electric motor performance, compare different motor types, and identify opportunities for energy savings through motor upgrades.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Power Supply Design</h3>
              <p className="text-sm text-green-800">
                Assess power supply efficiency, calculate heat dissipation requirements, and optimize converter designs for better performance.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Solar System Evaluation</h3>
              <p className="text-sm text-purple-800">
                Analyze solar inverter efficiency, calculate system losses, and optimize photovoltaic system performance for maximum energy yield.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Energy Audits</h3>
              <p className="text-sm text-orange-800">
                Conduct industrial energy audits, identify inefficient equipment, and quantify potential energy savings from system improvements.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Lighting Systems</h3>
              <p className="text-sm text-red-800">
                Compare lighting technologies (LED vs fluorescent vs incandescent), calculate energy consumption, and plan lighting upgrades.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Transformer Analysis</h3>
              <p className="text-sm text-yellow-800">
                Evaluate transformer efficiency, calculate no-load and load losses, and assess transformer performance under different loading conditions.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Enter Input Power:</strong> Input the total power consumed by the system in Watts, Kilowatts, or Megawatts.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>Enter Output Power:</strong> Input the useful power delivered by the system in the same units.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Select Power Unit:</strong> Choose the appropriate power unit (W, kW, MW) for your application.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Set Precision:</strong> Choose the number of decimal places for results (1-4 decimal places).</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>View Results:</strong> The calculator instantly shows efficiency percentage, classification, and power loss analysis.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>Analyze Efficiency:</strong> Review the efficiency gauge and power flow diagram for visual analysis.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">7.</span>
              <span><strong>Review Steps:</strong> See detailed calculation steps with formulas and intermediate values.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">8.</span>
              <span><strong>Use Presets:</strong> Click on common examples for quick calculations of typical electrical systems.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">9.</span>
              <span><strong>Export or Save:</strong> Download results as TXT/CSV files or save to history for future reference.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Improving Electrical Efficiency</h2>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-green-900">Efficiency Improvement Strategies:</h3>
            <div className="text-sm text-green-900 space-y-2">
              <p><strong>Equipment Upgrades:</strong> Replace old, inefficient equipment with modern, high-efficiency alternatives (motors, lighting, transformers).</p>
              <p><strong>Power Factor Correction:</strong> Install capacitors to improve power factor, reducing reactive power and improving overall system efficiency.</p>
              <p><strong>Variable Speed Drives:</strong> Use VFDs on motors to match speed to load requirements, significantly improving part-load efficiency.</p>
              <p><strong>Right-sizing Equipment:</strong> Ensure equipment is properly sized for the application - oversized equipment often operates inefficiently.</p>
              <p><strong>Regular Maintenance:</strong> Keep equipment clean and well-maintained to prevent efficiency degradation over time.</p>
              <p><strong>Load Management:</strong> Optimize operating schedules and load distribution to maximize efficiency during peak and off-peak periods.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Power Losses</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-yellow-900">Common Sources of Power Loss:</h3>
            <div className="text-sm text-yellow-900 space-y-2">
              <p><strong>Resistive Losses (I²R):</strong> Heat generated by current flowing through resistance in conductors, windings, and connections.</p>
              <p><strong>Core Losses:</strong> Hysteresis and eddy current losses in magnetic materials (transformers, motors).</p>
              <p><strong>Switching Losses:</strong> Energy lost during switching transitions in power electronic devices.</p>
              <p><strong>Mechanical Losses:</strong> Friction and windage losses in rotating machinery.</p>
              <p><strong>Leakage Losses:</strong> Stray magnetic fields and current leakage paths.</p>
              <p><strong>Conversion Losses:</strong> Energy lost during power conversion processes (AC/DC, voltage transformation).</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is electrical efficiency?</h3>
              <p className="text-gray-700">
                Electrical efficiency is the ratio of useful output power to total input power, expressed as a percentage. It measures how effectively an electrical system converts input energy into useful work, with higher percentages indicating better performance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is efficiency important?</h3>
              <p className="text-gray-700">
                High efficiency reduces energy costs, minimizes environmental impact, decreases heat generation, and improves system reliability. In industrial applications, even small efficiency improvements can result in significant cost savings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can efficiency exceed 100%?</h3>
              <p className="text-gray-700">
                In practical electrical systems, efficiency cannot exceed 100% due to the conservation of energy. If calculations show &gt;100% efficiency, check measurement accuracy, ensure proper power measurement techniques, or verify that all losses are accounted for.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I measure input and output power?</h3>
              <p className="text-gray-700">
                Use calibrated power meters or multimeters to measure voltage and current. For AC systems, ensure you measure true RMS values and account for power factor. Input power is measured at the system input, output power at the useful load.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's considered good efficiency for different devices?</h3>
              <p className="text-gray-700">
                LED lights: &gt;90%, modern electric motors: 85-95%, power supplies: 80-95%, transformers: 95-99%, solar inverters: 95-98%. Efficiency standards vary by application and technology generation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does efficiency change with load?</h3>
              <p className="text-gray-700">
                Most electrical equipment has peak efficiency at a specific load point (typically 75-100% of rated load). Efficiency usually decreases at very light loads and may also decrease at overload conditions. Variable speed drives help maintain high efficiency across different load levels.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}