export default function ShortCircuitCurrentCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Short Circuit Current Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Short Circuit Current Calculator is a professional electrical engineering tool designed to estimate fault current levels in electrical systems. This calculator helps engineers, technicians, and power system designers quickly determine the maximum current that would flow during a short circuit event, which is critical for proper system protection and safety design.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Short circuit analysis is fundamental to electrical system design, affecting circuit breaker selection, protective relay coordination, cable sizing, and overall system safety. This tool provides instant calculations with real-time updates, making it ideal for preliminary analysis and educational purposes.
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
              <span><strong>Multiple System Types:</strong> Support for single-phase and three-phase electrical systems</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation Modes:</strong> Basic (V/Z) and advanced (three-phase) calculation methods</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Fault Level Classification:</strong> Automatic categorization of fault current levels (low, moderate, high, critical)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Safety Warnings:</strong> Built-in alerts for high fault current levels requiring immediate attention</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Smart Unit Conversion:</strong> Automatic formatting to A, kA, or MA based on magnitude</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Common Presets:</strong> Quick calculations for typical electrical system configurations</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Step-by-step Solutions:</strong> Detailed calculation process with formulas and intermediate steps</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export Options:</strong> Download results as text files for documentation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation History:</strong> Save and review previous calculations</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Short Circuit Current Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Basic Formula (Single-Phase or Simplified)</h3>
              <code className="text-sm text-gray-700">I<sub>sc</sub> = V / Z</code>
              <p className="text-sm text-gray-600 mt-2">
                Where I<sub>sc</sub> is the short circuit current in Amperes, V is the system voltage in Volts, and Z is the total system impedance in Ohms. This is the fundamental relationship based on Ohm's law.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Three-Phase System Formula</h3>
              <code className="text-sm text-gray-700">I<sub>sc</sub> = V / (√3 × Z)</code>
              <p className="text-sm text-gray-600 mt-2">
                For three-phase systems, the line-to-line voltage is divided by √3 times the impedance. This accounts for the phase relationships in balanced three-phase systems and provides the line current during a three-phase fault.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">System Impedance Components</h3>
              <code className="text-sm text-gray-700">Z<sub>total</sub> = Z<sub>source</sub> + Z<sub>transformer</sub> + Z<sub>cable</sub></code>
              <p className="text-sm text-gray-600 mt-2">
                Total system impedance includes source impedance, transformer impedance, and cable impedance. Each component contributes to limiting the fault current.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Example 1: Industrial 400V System</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>Given:</strong> V = 400V, Z = 0.2Ω, Three-phase system</p>
                <p><strong>Formula:</strong> I<sub>sc</sub> = V / (√3 × Z)</p>
                <p><strong>Calculation:</strong></p>
                <p>I<sub>sc</sub> = 400 / (1.732 × 0.2)</p>
                <p>I<sub>sc</sub> = 400 / 0.3464</p>
                <p>I<sub>sc</sub> = 1,155 A = 1.16 kA</p>
                <p><strong>Result:</strong> High fault current requiring robust circuit protection</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">Example 2: Residential 230V System</h3>
              <div className="text-sm text-green-800 space-y-2">
                <p><strong>Given:</strong> V = 230V, Z = 0.5Ω, Single-phase system</p>
                <p><strong>Formula:</strong> I<sub>sc</sub> = V / Z</p>
                <p><strong>Calculation:</strong></p>
                <p>I<sub>sc</sub> = 230 / 0.5</p>
                <p>I<sub>sc</sub> = 460 A</p>
                <p><strong>Result:</strong> Moderate fault current typical for residential applications</p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">Example 3: Distribution 11kV System</h3>
              <div className="text-sm text-purple-800 space-y-2">
                <p><strong>Given:</strong> V = 11,000V, Z = 2.0Ω, Three-phase system</p>
                <p><strong>Formula:</strong> I<sub>sc</sub> = V / (√3 × Z)</p>
                <p><strong>Calculation:</strong></p>
                <p>I<sub>sc</sub> = 11,000 / (1.732 × 2.0)</p>
                <p>I<sub>sc</sub> = 11,000 / 3.464</p>
                <p>I<sub>sc</sub> = 3,175 A = 3.18 kA</p>
                <p><strong>Result:</strong> High fault current requiring specialized protection equipment</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fault Current Classification</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Range</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Applications</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Considerations</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">Low</td>
                  <td className="px-4 py-3 text-sm text-gray-700">&lt; 100 A</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Small residential circuits, control circuits</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Standard protection adequate</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-yellow-600">Moderate</td>
                  <td className="px-4 py-3 text-sm text-gray-700">100 - 1,000 A</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Residential mains, small commercial</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Verify circuit breaker ratings</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-orange-600">High</td>
                  <td className="px-4 py-3 text-sm text-gray-700">1 - 10 kA</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Industrial systems, commercial buildings</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High-capacity protection required</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">Critical</td>
                  <td className="px-4 py-3 text-sm text-gray-700">&gt; 10 kA</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Utility systems, large industrial plants</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Specialized equipment and safety measures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Circuit Breaker Selection</h3>
              <p className="text-sm text-blue-800">
                Determine the minimum interrupting capacity required for circuit breakers. Breakers must be rated to safely interrupt the maximum fault current.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Protective Relay Settings</h3>
              <p className="text-sm text-green-800">
                Calculate pickup settings for overcurrent relays and ensure proper coordination between protection devices in the system.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Cable and Equipment Sizing</h3>
              <p className="text-sm text-purple-800">
                Verify that cables and electrical equipment can withstand the thermal and mechanical stresses of fault currents.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Arc Flash Analysis</h3>
              <p className="text-sm text-orange-800">
                Provide input data for arc flash hazard calculations and determine appropriate personal protective equipment (PPE) requirements.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">System Design Verification</h3>
              <p className="text-sm text-red-800">
                Validate electrical system designs and ensure compliance with safety standards and electrical codes.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Fault Analysis Studies</h3>
              <p className="text-sm text-yellow-800">
                Perform preliminary fault studies for power system analysis and identify potential problem areas in electrical networks.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Enter System Voltage:</strong> Input the nominal system voltage in Volts (e.g., 230V, 400V, 11kV).</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>Input System Impedance:</strong> Enter the total system impedance in Ohms, including source, transformer, and cable impedances.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Select System Type:</strong> Choose between single-phase or three-phase system configuration.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Choose Calculation Mode:</strong> Select basic (V/Z) or advanced (three-phase formula) calculation method.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>Set Precision:</strong> Choose the number of decimal places for results (2-4 decimal places).</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>View Results:</strong> The calculator instantly shows fault current, classification, and safety warnings.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">7.</span>
              <span><strong>Review Steps:</strong> See detailed calculation steps with formulas and intermediate values.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">8.</span>
              <span><strong>Use Presets:</strong> Click on common examples for quick calculations of typical system configurations.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">9.</span>
              <span><strong>Export or Save:</strong> Download results as text files or save to history for future reference.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Considerations</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-red-900">⚠️ Important Safety Notes:</h3>
            <div className="text-sm text-red-900 space-y-2">
              <p><strong>Circuit Protection:</strong> Ensure all circuit breakers and fuses are rated for the calculated fault current. Undersized protection devices can fail catastrophically.</p>
              <p><strong>Arc Flash Hazard:</strong> High fault currents create severe arc flash hazards. Conduct proper arc flash analysis and use appropriate PPE when working on energized equipment.</p>
              <p><strong>Equipment Ratings:</strong> Verify that all electrical equipment (switchgear, transformers, cables) can withstand the calculated fault current without damage.</p>
              <p><strong>Professional Review:</strong> This calculator provides estimates for preliminary analysis. Always consult qualified electrical engineers for critical applications and final designs.</p>
              <p><strong>Code Compliance:</strong> Ensure all calculations and equipment selections comply with applicable electrical codes and standards (NEC, IEC, etc.).</p>
              <p><strong>Regular Updates:</strong> Recalculate fault currents when system modifications are made, as changes can significantly affect fault levels.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding System Impedance</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-yellow-900">Impedance Components:</h3>
            <div className="text-sm text-yellow-900 space-y-2">
              <p><strong>Source Impedance:</strong> Impedance of the utility supply or generator, typically provided by the utility company or calculated from short circuit MVA.</p>
              <p><strong>Transformer Impedance:</strong> Based on transformer impedance percentage (%Z) and ratings. Calculate as Z = (%Z/100) × (kV²/MVA).</p>
              <p><strong>Cable Impedance:</strong> Resistance and reactance of cables, calculated from cable parameters and length. Use R + jX for AC analysis.</p>
              <p><strong>Motor Contribution:</strong> Induction motors contribute to fault current during the first few cycles. Consider motor impedance for accurate analysis.</p>
              <p><strong>Series vs Parallel:</strong> Add impedances in series directly. For parallel paths, use 1/Z<sub>total</sub> = 1/Z<sub>1</sub> + 1/Z<sub>2</sub> + ...</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is short circuit current?</h3>
              <p className="text-gray-700">
                Short circuit current is the maximum current that flows when a fault occurs in an electrical system, creating a low-impedance path. It's limited only by the system impedance and can be many times higher than normal operating current.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is short circuit analysis important?</h3>
              <p className="text-gray-700">
                Short circuit analysis is crucial for selecting proper protection equipment, ensuring safety, and preventing equipment damage. It helps determine circuit breaker ratings, relay settings, and arc flash hazard levels.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's the difference between single-phase and three-phase calculations?</h3>
              <p className="text-gray-700">
                Single-phase calculations use I = V/Z directly. Three-phase calculations account for the √3 relationship between line and phase quantities, using I = V/(√3×Z) for line-to-line faults in balanced systems.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How accurate are these calculations?</h3>
              <p className="text-gray-700">
                The calculations provide good estimates for preliminary analysis. Actual fault currents depend on many factors including system configuration, load conditions, and fault type. Professional software should be used for detailed studies.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What if I don't know the system impedance?</h3>
              <p className="text-gray-700">
                System impedance can be calculated from utility fault MVA data, transformer impedance percentages, and cable parameters. Consult utility companies for source impedance data and use manufacturer specifications for equipment impedances.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">When should I use basic vs advanced calculation mode?</h3>
              <p className="text-gray-700">
                Use basic mode for simplified analysis or single-phase systems. Use advanced mode for three-phase systems where you want to account for the √3 factor in the calculation for more accurate results.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}