export default function WireSizeCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Wire Size Calculator
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Wire Size Calculator is a professional electrical tool designed to help electricians, engineers, and 
            DIY enthusiasts determine the correct wire gauge for any electrical installation. It calculates the 
            appropriate wire size based on current load, voltage, distance, material type, and voltage drop constraints, 
            ensuring safe and efficient electrical systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Wire Size Matters
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Selecting the correct wire size is critical for electrical safety and system performance. Undersized wires 
            can lead to overheating, energy loss, voltage drops, equipment damage, and fire hazards. Oversized wires, 
            while safe, increase installation costs unnecessarily.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Proper wire sizing considers both the current-carrying capacity (ampacity) and voltage drop over distance. 
            This calculator helps you find the optimal wire size that meets both requirements while complying with 
            electrical codes and safety standards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How Wire Sizing Works
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Ampacity Requirement
              </h3>
              <p className="text-blue-800 text-sm">
                The wire must be able to safely carry the required current without overheating. Each wire size has a 
                maximum ampacity rating that depends on the conductor material, insulation type, and installation method.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Voltage Drop Calculation
              </h3>
              <p className="text-green-800 text-sm mb-2">
                <strong>Single Phase:</strong> VD = 2 × L × I × R / 1000
              </p>
              <p className="text-green-800 text-sm mb-2">
                <strong>Three Phase:</strong> VD = √3 × L × I × R / 1000
              </p>
              <p className="text-green-800 text-sm">
                Where L = length (m), I = current (A), R = resistance (Ω/km). The calculator ensures voltage drop 
                stays within acceptable limits (typically 3% for branch circuits, 5% total).
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Material Selection
              </h3>
              <p className="text-purple-800 text-sm">
                Copper has better conductivity and higher ampacity than aluminum but costs more. Aluminum is lighter 
                and more economical for large installations but requires larger wire sizes for the same current capacity.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Wire Size Standards
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wire sizes are specified using two main systems:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Metric (mm²)</h3>
              <p className="text-sm text-gray-700">
                Used in most countries worldwide. Specifies the cross-sectional area of the conductor in square 
                millimeters. Common sizes: 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50 mm².
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">AWG (American Wire Gauge)</h3>
              <p className="text-sm text-gray-700">
                Used primarily in North America. Smaller numbers indicate larger wires. Common sizes: 18, 16, 14, 12, 
                10, 8, 6, 4, 2, 1, 1/0, 2/0, 3/0, 4/0 AWG.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Voltage Drop Guidelines
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Application</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Max Voltage Drop</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">Branch Circuits</td>
                  <td className="px-4 py-3 text-gray-700">3%</td>
                  <td className="px-4 py-3 text-gray-700">From panel to outlet</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Feeder Circuits</td>
                  <td className="px-4 py-3 text-gray-700">2%</td>
                  <td className="px-4 py-3 text-gray-700">From service to panel</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Total System</td>
                  <td className="px-4 py-3 text-gray-700">5%</td>
                  <td className="px-4 py-3 text-gray-700">Combined feeder + branch</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Motor Circuits</td>
                  <td className="px-4 py-3 text-gray-700">3-5%</td>
                  <td className="px-4 py-3 text-gray-700">At full load</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Sensitive Equipment</td>
                  <td className="px-4 py-3 text-gray-700">1-2%</td>
                  <td className="px-4 py-3 text-gray-700">Computers, medical devices</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Common Applications
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Residential Wiring:</strong> Lighting circuits, outlets, kitchen appliances, HVAC systems</li>
            <li><strong>Commercial Buildings:</strong> Office equipment, lighting, elevators, HVAC, data centers</li>
            <li><strong>Industrial Applications:</strong> Motors, machinery, welding equipment, heavy loads</li>
            <li><strong>Solar Installations:</strong> PV array wiring, inverter connections, battery banks</li>
            <li><strong>Automotive:</strong> Battery cables, alternator wiring, accessory circuits</li>
            <li><strong>Marine:</strong> Boat electrical systems, shore power connections</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Typical Wire Sizes for Common Loads
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Application</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Current</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Typical Wire (Copper)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">Lighting Circuit</td>
                  <td className="px-4 py-3 text-gray-700">10A</td>
                  <td className="px-4 py-3 text-gray-700">1.5 mm² (16 AWG)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">General Outlets</td>
                  <td className="px-4 py-3 text-gray-700">16A</td>
                  <td className="px-4 py-3 text-gray-700">2.5 mm² (14 AWG)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Kitchen Appliances</td>
                  <td className="px-4 py-3 text-gray-700">20A</td>
                  <td className="px-4 py-3 text-gray-700">2.5-4 mm² (14-12 AWG)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Air Conditioner</td>
                  <td className="px-4 py-3 text-gray-700">15-25A</td>
                  <td className="px-4 py-3 text-gray-700">4-6 mm² (12-10 AWG)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Electric Range</td>
                  <td className="px-4 py-3 text-gray-700">40-50A</td>
                  <td className="px-4 py-3 text-gray-700">10-16 mm² (8-6 AWG)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Main Service Panel</td>
                  <td className="px-4 py-3 text-gray-700">100-200A</td>
                  <td className="px-4 py-3 text-gray-700">35-95 mm² (2-2/0 AWG)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Use This Calculator
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Enter the load current in Amperes</li>
            <li>Select the system voltage (110V, 220V, 380V, etc.)</li>
            <li>Enter the cable length (one-way distance in meters)</li>
            <li>Choose the conductor material (Copper or Aluminum)</li>
            <li>Select single-phase or three-phase system</li>
            <li>Set the maximum allowable voltage drop percentage</li>
            <li>View instant results with recommended wire size</li>
            <li>Review voltage drop analysis and safety warnings</li>
            <li>Check alternative wire sizes if needed</li>
            <li>Save calculations to history or export as text file</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Ampacity-based wire selection</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Voltage drop calculations</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Copper and aluminum support</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Single and three-phase systems</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Metric (mm²) and AWG units</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Power loss calculation</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Safety warnings and recommendations</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Alternative wire size suggestions</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Step-by-step calculation breakdown</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Common application presets</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Calculation history</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Export to text file</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Safety Considerations
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-red-900 text-sm">
              <li>Always consult local electrical codes and regulations</li>
              <li>Consider ambient temperature and installation conditions</li>
              <li>Account for derating factors (conduit fill, bundling, temperature)</li>
              <li>Use appropriate insulation type for the application</li>
              <li>Ensure proper termination and connection methods</li>
              <li>Consider future load growth when sizing wires</li>
              <li>Hire a licensed electrician for installation</li>
              <li>Never exceed the rated ampacity of conductors</li>
              <li>Protect circuits with appropriately sized breakers or fuses</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's the difference between wire size and wire gauge?
              </h3>
              <p className="text-gray-700">
                Wire size refers to the cross-sectional area of the conductor (mm² or kcmil), while wire gauge (AWG) 
                is a standardized numbering system. In AWG, smaller numbers indicate larger wires (e.g., 10 AWG is 
                larger than 14 AWG).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Should I use copper or aluminum wire?
              </h3>
              <p className="text-gray-700">
                Copper is preferred for most applications due to better conductivity, higher ampacity, and easier 
                termination. Aluminum is more economical for large installations and long runs but requires larger 
                sizes and special connectors to prevent oxidation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I measure cable length for the calculator?
              </h3>
              <p className="text-gray-700">
                Measure the one-way distance from the power source to the load. The calculator automatically accounts 
                for the return path in single-phase systems (factor of 2) and the phase relationship in three-phase 
                systems (factor of √3).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if the recommended wire size seems too large?
              </h3>
              <p className="text-gray-700">
                Large wire sizes are often required for long cable runs to minimize voltage drop. Consider reducing 
                the distance, increasing the voltage, using three-phase power, or accepting a higher voltage drop 
                percentage if appropriate for your application.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Does this calculator account for temperature derating?
              </h3>
              <p className="text-gray-700">
                This calculator uses standard ampacity values for typical installation conditions (30°C ambient, 
                limited bundling). For high-temperature environments, conduit fill, or multiple cables in close 
                proximity, apply appropriate derating factors from electrical codes.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Always size wires for the maximum expected load, not average load</li>
            <li>Consider future expansion when selecting wire sizes</li>
            <li>Use continuous-duty ratings for loads that run for extended periods</li>
            <li>Verify wire compatibility with circuit breaker or fuse ratings</li>
            <li>Label all circuits clearly at both ends</li>
            <li>Use color coding to identify phases and neutral conductors</li>
            <li>Protect wires from physical damage with appropriate conduit or cable trays</li>
            <li>Ensure proper grounding and bonding of all electrical systems</li>
            <li>Keep detailed records of wire sizes and circuit layouts</li>
            <li>Perform regular inspections and maintenance of electrical installations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Disclaimer
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This calculator provides estimates based on standard electrical formulas and typical installation conditions. 
            Results should be verified by a licensed electrician and must comply with local electrical codes, regulations, 
            and standards. The calculator is for informational purposes only and should not replace professional electrical 
            design and installation services. Always consider specific installation conditions, ambient temperature, 
            derating factors, and safety margins when selecting wire sizes.
          </p>
        </section>

      </div>
    </div>
  );
}
