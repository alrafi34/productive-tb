export default function PowerLossCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Power Loss Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Power Loss Calculator is a professional electrical engineering tool designed to calculate power dissipation in electrical systems. This calculator helps engineers, technicians, and students quickly estimate energy losses in circuits, transmission lines, and electrical equipment using fundamental electrical formulas.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Power loss is a critical factor in electrical system design, affecting efficiency, heat generation, and overall system performance. This tool provides instant calculations with multiple modes to suit different scenarios and requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Multiple Calculation Modes:</strong> I²R mode, V×I mode, and mixed mode for comprehensive analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Real-time Calculations:</strong> Instant results as you type with debounced input handling</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Efficiency Analysis:</strong> Calculate system efficiency and power loss percentage</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Power Factor Support:</strong> Include power factor for AC circuit calculations</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Loss Level Indicators:</strong> Color-coded warnings for low, moderate, high, and critical losses</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Common Presets:</strong> Quick calculations for typical electrical scenarios</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export Options:</strong> Download results as TXT or CSV files</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation History:</strong> Save and review previous calculations</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Power Loss Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Ohmic Power Loss (I²R)</h3>
              <code className="text-sm text-gray-700">P_loss = I² × R</code>
              <p className="text-sm text-gray-600 mt-2">
                Where P_loss is power loss in Watts, I is current in Amperes, and R is resistance in Ohms. This is the most common formula for calculating resistive power loss in conductors and circuits.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Power Calculation (V×I)</h3>
              <code className="text-sm text-gray-700">P = V × I × PF</code>
              <p className="text-sm text-gray-600 mt-2">
                Where P is power in Watts, V is voltage in Volts, I is current in Amperes, and PF is power factor (1 for DC or resistive AC loads). Used for calculating total power in a circuit.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Efficiency Calculation</h3>
              <code className="text-sm text-gray-700">Efficiency = ((P_input - P_loss) / P_input) × 100%</code>
              <p className="text-sm text-gray-600 mt-2">
                Calculates the percentage of input power that is successfully delivered to the load, with the remainder being lost as heat.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Alternative Forms</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <code>P = V² / R</code> (when voltage and resistance are known)
                <br />
                <code>P = I × R × I = I²R</code> (Ohm's law derivation)
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Modes</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">I²R Mode (Current & Resistance)</h3>
              <p className="text-sm text-blue-800">
                Best for calculating resistive losses in wires, cables, and transmission lines. Input current and resistance to calculate power dissipation. Ideal for wire sizing and conductor loss analysis.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">V×I Mode (Voltage & Current)</h3>
              <p className="text-sm text-green-800">
                Calculate total power consumption or generation. Input voltage and current (with optional power factor) to determine power. Useful for load calculations and power supply sizing.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Mixed Mode (V, I, R)</h3>
              <p className="text-sm text-purple-800">
                Comprehensive analysis with all three parameters. Calculates both power loss (I²R) and input power (V×I) to determine system efficiency. Best for complete system analysis.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loss Level Classification</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criteria</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommendation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">Low</td>
                  <td className="px-4 py-3 text-sm text-gray-700">&lt; 5% of input power or &lt; 10W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Acceptable loss level</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-yellow-600">Moderate</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5-15% of input power or 10-100W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Consider optimization</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-orange-600">High</td>
                  <td className="px-4 py-3 text-sm text-gray-700">15-30% of input power or 100-500W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Optimization recommended</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">Critical</td>
                  <td className="px-4 py-3 text-sm text-gray-700">&gt; 30% of input power or &gt; 500W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Immediate action required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Transmission Lines</h3>
              <p className="text-sm text-blue-800">
                Calculate power losses in electrical transmission and distribution systems. Essential for grid planning and efficiency optimization.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Wire Sizing</h3>
              <p className="text-sm text-green-800">
                Determine appropriate wire gauge by calculating expected power loss. Ensure safe operation and minimize energy waste.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Motor Efficiency</h3>
              <p className="text-sm text-purple-800">
                Analyze power losses in electric motors and drives. Optimize motor selection and operating conditions.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Power Supply Design</h3>
              <p className="text-sm text-orange-800">
                Calculate heat dissipation in power supplies and converters. Size heat sinks and cooling systems appropriately.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Circuit Analysis</h3>
              <p className="text-sm text-red-800">
                Analyze power dissipation in electronic circuits. Design for thermal management and component reliability.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Energy Audits</h3>
              <p className="text-sm text-yellow-800">
                Identify energy losses in electrical systems. Implement efficiency improvements and reduce operating costs.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Select Calculation Mode:</strong> Choose I²R, V×I, or Mixed mode based on your available parameters.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>Enter Parameters:</strong> Input voltage, current, and/or resistance values as required by the selected mode.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Optional - Power Factor:</strong> For AC circuits, enter the power factor (0-1) if known.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Enable Efficiency:</strong> Check the efficiency option to calculate system efficiency percentage.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>View Results:</strong> The calculator instantly shows power loss, efficiency, and loss level classification.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>Review Steps:</strong> See detailed calculation steps with formulas and intermediate values.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">7.</span>
              <span><strong>Use Presets:</strong> Click on common examples for quick calculations of typical scenarios.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">8.</span>
              <span><strong>Export or Save:</strong> Download results as TXT/CSV or save to history for future reference.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reducing Power Loss</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-yellow-900">
              <strong>Increase Wire Size:</strong> Larger conductors have lower resistance, reducing I²R losses. Use appropriate wire gauge for the current load.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Reduce Current:</strong> For the same power delivery, higher voltage and lower current result in lower losses (P_loss = I²R).
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Minimize Distance:</strong> Shorter cable runs reduce total resistance and power loss. Plan efficient routing.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Improve Power Factor:</strong> In AC systems, correct power factor to reduce current for the same real power delivery.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Use Quality Materials:</strong> Copper has lower resistivity than aluminum. Choose appropriate conductor materials.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Maintain Connections:</strong> Poor connections increase resistance. Ensure tight, clean electrical connections.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is power loss in electrical systems?</h3>
              <p className="text-gray-700">
                Power loss is the electrical energy converted to heat due to resistance in conductors and components. It represents wasted energy that doesn't reach the intended load, reducing system efficiency and generating heat.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why does power loss increase with the square of current?</h3>
              <p className="text-gray-700">
                The I²R formula shows that power loss is proportional to the square of current. Doubling the current quadruples the power loss. This is why high-voltage transmission (lower current for same power) is more efficient.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is an acceptable power loss percentage?</h3>
              <p className="text-gray-700">
                Generally, power losses below 5% are considered acceptable for most applications. Transmission systems aim for 2-3% loss, while some high-current applications may tolerate up to 10%. Critical systems require minimal losses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does wire size affect power loss?</h3>
              <p className="text-gray-700">
                Larger wire sizes have lower resistance per unit length. Since power loss equals I²R, reducing resistance by using thicker wire directly reduces power loss. However, larger wire is more expensive and harder to install.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is power factor and how does it affect losses?</h3>
              <p className="text-gray-700">
                Power factor is the ratio of real power to apparent power in AC circuits. Low power factor means higher current for the same real power, increasing I²R losses. Improving power factor reduces current and losses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can power loss be completely eliminated?</h3>
              <p className="text-gray-700">
                No, power loss cannot be completely eliminated in practical systems due to the inherent resistance of conductors. However, it can be minimized through proper design, material selection, and system optimization. Superconductors can eliminate resistance but require extreme cooling.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
