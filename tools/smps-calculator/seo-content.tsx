export default function SMPSCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About SMPS Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The SMPS (Switch Mode Power Supply) Calculator is a professional electrical engineering tool designed to analyze and calculate key parameters of switching power supplies. This calculator helps engineers, students, and technicians quickly determine output power, input power requirements, efficiency ratings, and power losses in SMPS designs.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Switch mode power supplies are widely used in modern electronics due to their high efficiency, compact size, and excellent regulation. This tool provides instant calculations for design verification, performance analysis, and troubleshooting of SMPS circuits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Real-time Calculations:</strong> Instant SMPS parameter calculations with live updates as you modify inputs</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Efficiency Analysis:</strong> Comprehensive efficiency rating and power loss analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Input Current Calculation:</strong> Automatic input current estimation when input voltage is provided</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Load Type Support:</strong> Analysis for resistive, inductive, and mixed load types</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Design Warnings:</strong> Intelligent warnings for efficiency, thermal, and safety considerations</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Common Presets:</strong> Pre-configured examples for typical SMPS applications</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Interactive Efficiency Slider:</strong> Visual efficiency adjustment with real-time feedback</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export Options:</strong> Download calculations as TXT or CSV files for documentation</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">SMPS Calculation Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Output Power</h3>
              <code className="text-sm text-gray-700">Pout = Vout × Iout</code>
              <p className="text-sm text-gray-600 mt-2">
                Where Pout is output power in Watts, Vout is output voltage in Volts, and Iout is output current in Amperes.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Input Power</h3>
              <code className="text-sm text-gray-700">Pin = Pout / η</code>
              <p className="text-sm text-gray-600 mt-2">
                Where Pin is input power in Watts, Pout is output power in Watts, and η (eta) is efficiency as a decimal (e.g., 0.85 for 85%).
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Input Current</h3>
              <code className="text-sm text-gray-700">Iin = Pin / Vin</code>
              <p className="text-sm text-gray-600 mt-2">
                Where Iin is input current in Amperes, Pin is input power in Watts, and Vin is input voltage in Volts.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Power Loss</h3>
              <code className="text-sm text-gray-700">Ploss = Pin - Pout = Pout × ((1/η) - 1)</code>
              <p className="text-sm text-gray-600 mt-2">
                Power loss represents the energy converted to heat in the switching power supply due to component losses and switching inefficiencies.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Efficiency Ratings</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency Range</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">95-100%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">Excellent</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High-end power supplies, server PSUs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">90-95%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">Very Good</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Quality switching adapters, LED drivers</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">85-90%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-yellow-600">Good</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Standard consumer electronics</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">80-85%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-yellow-600">Fair</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Basic power adapters, older designs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">70-80%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-orange-600">Poor</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Low-cost supplies, needs improvement</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">&lt;70%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">Very Poor</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Unacceptable for most applications</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Load Types</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Resistive Load</h3>
              <p className="text-sm text-blue-800">
                Pure resistive loads like heaters, incandescent bulbs, and resistors. Current and voltage are in phase with constant power factor of 1.0.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Inductive Load</h3>
              <p className="text-sm text-green-800">
                Motors, transformers, and inductors. Current lags voltage, creating reactive power and potentially affecting SMPS performance.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Mixed Load</h3>
              <p className="text-sm text-purple-800">
                Combination of resistive and reactive components. Common in real-world applications with multiple load types.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Consumer Electronics</h3>
              <p className="text-sm text-blue-800">
                Laptop adapters, phone chargers, TV power supplies, and gaming console PSUs. Typically 65-90W with 85-92% efficiency.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">LED Lighting</h3>
              <p className="text-sm text-green-800">
                LED drivers for strips, bulbs, and fixtures. Range from 5W to 300W with efficiency targets of 90%+ for energy savings.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Industrial Automation</h3>
              <p className="text-sm text-purple-800">
                Control systems, PLCs, and motor drives. Require high reliability and efficiency, typically 24V or 48V outputs.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Telecommunications</h3>
              <p className="text-sm text-orange-800">
                Network equipment, base stations, and data centers. High power density with 48V distribution and 95%+ efficiency.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Automotive Electronics</h3>
              <p className="text-sm text-red-800">
                DC-DC converters for infotainment, lighting, and control systems. Wide input range with high efficiency requirements.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Medical Devices</h3>
              <p className="text-sm text-yellow-800">
                Patient monitoring, diagnostic equipment, and portable devices. Strict safety and efficiency requirements.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Enter Output Voltage:</strong> Input the desired DC output voltage of your SMPS in volts.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>Set Output Current:</strong> Specify the maximum output current your SMPS needs to provide in amperes.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Adjust Efficiency:</strong> Use the slider or input field to set the expected efficiency percentage (50-100%).</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Optional - Input Voltage:</strong> Enter the AC input voltage to calculate input current requirements.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>Select Load Type:</strong> Choose between resistive, inductive, or mixed load characteristics.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>Review Results:</strong> Analyze output power, input power, losses, and efficiency rating.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">7.</span>
              <span><strong>Check Warnings:</strong> Review any design considerations or recommendations provided.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">8.</span>
              <span><strong>Use Presets:</strong> Try common SMPS configurations for quick analysis and comparison.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Considerations</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-yellow-900">
              <strong>Thermal Management:</strong> Higher power losses generate more heat. Ensure adequate cooling for efficiency below 90%.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Component Selection:</strong> Use high-quality switching devices, inductors, and capacitors for better efficiency.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Switching Frequency:</strong> Higher frequencies allow smaller components but may reduce efficiency due to switching losses.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Load Regulation:</strong> SMPS should maintain stable output voltage across the full load range.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Safety Standards:</strong> Comply with relevant safety standards (IEC 60950, UL 60950) for your application.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>EMI Considerations:</strong> Switching power supplies generate electromagnetic interference requiring proper filtering.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is a good efficiency for an SMPS?</h3>
              <p className="text-gray-700">
                Modern SMPS designs typically achieve 85-95% efficiency. High-end supplies can reach 96-98%. Efficiency below 80% is generally considered poor for switching power supplies.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does load type affect SMPS performance?</h3>
              <p className="text-gray-700">
                Resistive loads are easiest for SMPS to handle with stable performance. Inductive loads can cause current spikes and may require larger input capacitors. Mixed loads are most common in real applications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is input current calculation important?</h3>
              <p className="text-gray-700">
                Input current determines the required wire gauge, fuse rating, and input connector specifications. It's also needed for power factor correction and EMI filter design.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What causes power losses in SMPS?</h3>
              <p className="text-gray-700">
                Main loss sources include switching losses in MOSFETs/diodes, conduction losses in resistive elements, core losses in transformers/inductors, and control circuit consumption.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How accurate are these calculations?</h3>
              <p className="text-gray-700">
                These calculations provide good estimates for design planning. Actual performance may vary by ±5-10% depending on component tolerances, temperature, and load conditions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">When should I use SMPS vs linear power supply?</h3>
              <p className="text-gray-700">
                Use SMPS for higher power (&gt;10W), better efficiency, and smaller size. Linear supplies are better for low noise, simplicity, and very low power applications.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}