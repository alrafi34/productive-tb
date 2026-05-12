export default function CircuitBreakerCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Circuit Breaker Calculator
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Circuit Breaker Calculator is a professional electrical tool designed to help electricians, engineers, 
            and DIY enthusiasts determine the correct circuit breaker size for any electrical load. It calculates the 
            required current, applies safety factors, and recommends standard breaker sizes following electrical codes 
            and best practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What is a Circuit Breaker?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A circuit breaker is an automatic electrical safety device designed to protect electrical circuits from 
            damage caused by excess current from an overload or short circuit. Unlike fuses, circuit breakers can be 
            reset after they trip, making them reusable and more convenient for modern electrical systems.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Proper circuit breaker sizing is critical for electrical safety. An undersized breaker may trip frequently, 
            while an oversized breaker may fail to protect the circuit, potentially leading to wire overheating and 
            fire hazards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How Circuit Breaker Sizing Works
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Single Phase Calculation
              </h3>
              <p className="text-blue-800 text-sm mb-2">
                <strong>Formula:</strong> Current (A) = Power (W) / (Voltage × Power Factor)
              </p>
              <p className="text-blue-800 text-sm">
                Used for residential and light commercial applications with single-phase power supply.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Three Phase Calculation
              </h3>
              <p className="text-green-800 text-sm mb-2">
                <strong>Formula:</strong> Current (A) = Power (W) / (√3 × Voltage × Power Factor)
              </p>
              <p className="text-green-800 text-sm">
                Used for industrial applications and heavy machinery with three-phase power supply.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Continuous Load Factor (125% Rule)
              </h3>
              <p className="text-yellow-800 text-sm mb-2">
                <strong>Adjustment:</strong> Adjusted Current = Current × 1.25
              </p>
              <p className="text-yellow-800 text-sm">
                For loads that run continuously for 3 hours or more, the NEC requires a 125% safety factor.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Standard Breaker Sizes
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Circuit breakers come in standard amperage ratings. The calculator automatically selects the next available 
            standard size above the calculated current requirement.
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">Common Standard Sizes (Amperes):</p>
            <p className="text-sm text-gray-700">
              6A, 10A, 13A, 16A, 20A, 25A, 32A, 40A, 50A, 63A, 80A, 100A, 125A, 160A, 200A, 250A, 315A, 400A
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Key Terms
          </h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Power Factor</h3>
              <p className="text-gray-700 text-sm">
                The ratio of real power to apparent power. Resistive loads (heaters, incandescent lights) have a 
                power factor of 1.0, while inductive loads (motors, transformers) typically range from 0.7 to 0.9.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Continuous Load</h3>
              <p className="text-gray-700 text-sm">
                A load where the maximum current is expected to continue for 3 hours or more. Examples include 
                lighting systems, HVAC equipment, and refrigeration units.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Non-Continuous Load</h3>
              <p className="text-gray-700 text-sm">
                A load that operates intermittently or for short periods. Examples include power tools, kitchen 
                appliances, and temporary equipment.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Safety Margin</h3>
              <p className="text-gray-700 text-sm">
                The difference between the breaker rating and the actual load current, expressed as a percentage. 
                A higher safety margin provides better protection and allows for future load additions.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Common Applications
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Residential Circuits:</strong> Lighting, outlets, kitchen appliances, air conditioners</li>
            <li><strong>Commercial Buildings:</strong> Office equipment, HVAC systems, elevators, lighting</li>
            <li><strong>Industrial Applications:</strong> Motors, machinery, welding equipment, compressors</li>
            <li><strong>Solar Systems:</strong> Inverter protection, battery charging circuits</li>
            <li><strong>EV Charging:</strong> Electric vehicle charging station circuits</li>
            <li><strong>Data Centers:</strong> Server racks, UPS systems, cooling equipment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Typical Load Examples
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Appliance/Load</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Typical Power</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Recommended Breaker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">LED Lighting Circuit</td>
                  <td className="px-4 py-3 text-gray-700">1000-1500W</td>
                  <td className="px-4 py-3 text-gray-700">10A</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Window AC (1.5 Ton)</td>
                  <td className="px-4 py-3 text-gray-700">1800-2200W</td>
                  <td className="px-4 py-3 text-gray-700">16A</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Electric Water Heater</td>
                  <td className="px-4 py-3 text-gray-700">3000-4500W</td>
                  <td className="px-4 py-3 text-gray-700">25-32A</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Kitchen Range/Oven</td>
                  <td className="px-4 py-3 text-gray-700">8000-12000W</td>
                  <td className="px-4 py-3 text-gray-700">40-50A</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">EV Charger (Level 2)</td>
                  <td className="px-4 py-3 text-gray-700">7000-11000W</td>
                  <td className="px-4 py-3 text-gray-700">40-50A</td>
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
            <li>Enter the total electrical load in Watts or kilowatts</li>
            <li>Select the voltage of your electrical system (120V, 230V, 240V, etc.)</li>
            <li>Choose between single-phase or three-phase system</li>
            <li>Specify if the load is continuous or non-continuous</li>
            <li>Enter the power factor (use 1.0 for resistive loads, 0.8-0.9 for motors)</li>
            <li>View instant results showing calculated current and recommended breaker size</li>
            <li>Review safety warnings and wire gauge recommendations</li>
            <li>Save calculations to history or export as a text file</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Single and three-phase calculations</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Continuous load factor (125% rule)</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Power factor adjustment</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Standard breaker size selection</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Safety margin calculation</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Wire gauge recommendations</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Step-by-step calculation breakdown</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Common appliance presets</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Calculation history with local storage</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Export results to text files</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Real-time validation and warnings</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Mobile-responsive design</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Safety Guidelines
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2 text-red-900 text-sm">
              <li>Always consult local electrical codes and regulations</li>
              <li>Hire a licensed electrician for installation and modifications</li>
              <li>Never exceed the rated capacity of circuit breakers</li>
              <li>Ensure proper wire gauge matches the breaker size</li>
              <li>Consider voltage drop for long cable runs</li>
              <li>Account for starting currents in motor loads</li>
              <li>Use appropriate breaker types (MCB, MCCB, RCCB) for the application</li>
              <li>Regular inspection and maintenance of electrical systems is essential</li>
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
                Why is the 125% factor applied to continuous loads?
              </h3>
              <p className="text-gray-700">
                The National Electrical Code (NEC) requires circuit breakers to be sized at 125% of continuous loads 
                to prevent nuisance tripping and ensure the breaker operates within its thermal limits. This safety 
                margin accounts for heat buildup during prolonged operation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I use a larger breaker than recommended?
              </h3>
              <p className="text-gray-700">
                No. Using an oversized breaker is dangerous because it may not trip when the wire overheats, potentially 
                causing a fire. The breaker must be sized to protect the wire, not just the load. Always match the 
                breaker size to the wire gauge and load requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What power factor should I use?
              </h3>
              <p className="text-gray-700">
                Use 1.0 for resistive loads (heaters, incandescent lights, electric stoves). Use 0.8-0.9 for inductive 
                loads (motors, transformers, fluorescent lights). Check the equipment nameplate for the actual power 
                factor if available.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                When should I use three-phase calculation?
              </h3>
              <p className="text-gray-700">
                Use three-phase calculations for industrial equipment, large motors (typically above 5 HP), commercial 
                HVAC systems, and any equipment specifically designed for three-phase power. Residential applications 
                typically use single-phase power.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Does this calculator account for voltage drop?
              </h3>
              <p className="text-gray-700">
                This calculator focuses on breaker sizing based on load current. For long cable runs, you should also 
                calculate voltage drop separately and may need to increase wire size accordingly. Use our Voltage Drop 
                Calculator for this purpose.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Always size breakers based on the wire ampacity, not just the load</li>
            <li>Account for all loads on the circuit, including future additions</li>
            <li>Use dedicated circuits for high-power appliances</li>
            <li>Consider ambient temperature when sizing breakers and wires</li>
            <li>Label all circuit breakers clearly in the panel</li>
            <li>Keep a record of all circuit calculations for future reference</li>
            <li>Review and update calculations when adding new loads</li>
            <li>Use appropriate breaker types (standard, GFCI, AFCI) based on application</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Disclaimer
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This calculator provides estimates based on standard electrical formulas and common practices. Results 
            should be verified by a licensed electrician and must comply with local electrical codes and regulations. 
            The calculator is for informational purposes only and should not replace professional electrical design 
            and installation services.
          </p>
        </section>

      </div>
    </div>
  );
}
