export default function VoltageDropCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Voltage Drop?</h2>
          <p className="text-gray-700 leading-relaxed">
            Voltage drop is the reduction in electrical potential (voltage) that occurs when current flows through a conductor 
            with resistance. Every wire has inherent resistance that causes energy loss in the form of heat. Excessive voltage 
            drop can lead to inefficient operation, equipment malfunction, overheating, and safety hazards. Understanding and 
            calculating voltage drop is essential for proper electrical system design.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Voltage Drop Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Single Phase & DC Systems</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">VD = 2 × I × R × L</p>
              <p className="text-sm text-blue-700">
                The factor of 2 accounts for both the supply and return conductors (round trip).
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Three Phase Systems</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">VD = √3 × I × R × L</p>
              <p className="text-sm text-purple-700">
                The factor √3 (≈1.732) accounts for the phase relationship in three-phase systems.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Variables</h3>
              <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                <li><strong>VD</strong> = Voltage Drop (Volts)</li>
                <li><strong>I</strong> = Current (Amperes)</li>
                <li><strong>R</strong> = Resistance per meter (Ω/m)</li>
                <li><strong>L</strong> = Cable length (meters)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Voltage Drop Limits</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Maximum Drop</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Lighting Circuits</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3%</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">Recommended</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Power Circuits</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5%</td>
                  <td className="px-4 py-3 text-sm text-yellow-600 font-semibold">Acceptable</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Combined (Feeder + Branch)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5%</td>
                  <td className="px-4 py-3 text-sm text-yellow-600 font-semibold">Maximum</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Sensitive Equipment</td>
                  <td className="px-4 py-3 text-sm text-gray-700">2%</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">Strict</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Solar/Battery Systems (12V/24V)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">3%</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">Critical</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wire Resistance Values</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Copper Wire (Ω/km at 20°C)</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">1.5 mm²</span>
                  <span className="font-mono text-gray-900">12.1 Ω/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">2.5 mm²</span>
                  <span className="font-mono text-gray-900">7.41 Ω/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">4 mm²</span>
                  <span className="font-mono text-gray-900">4.61 Ω/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">6 mm²</span>
                  <span className="font-mono text-gray-900">3.08 Ω/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">10 mm²</span>
                  <span className="font-mono text-gray-900">1.83 Ω/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">16 mm²</span>
                  <span className="font-mono text-gray-900">1.15 Ω/km</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Aluminum Wire (Ω/km at 20°C)</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">1.5 mm²</span>
                  <span className="font-mono text-gray-900">19.7 Ω/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">2.5 mm²</span>
                  <span className="font-mono text-gray-900">12.1 Ω/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">4 mm²</span>
                  <span className="font-mono text-gray-900">7.51 Ω/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">6 mm²</span>
                  <span className="font-mono text-gray-900">5.02 Ω/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">10 mm²</span>
                  <span className="font-mono text-gray-900">2.98 Ω/km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">16 mm²</span>
                  <span className="font-mono text-gray-900">1.87 Ω/km</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-3">
            Note: Aluminum has approximately 1.63 times the resistance of copper for the same cross-sectional area.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting Voltage Drop</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Current (I):</strong> Higher current increases voltage drop proportionally. Doubling the current doubles the voltage drop.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Cable Length (L):</strong> Longer cables have more resistance. Voltage drop increases linearly with length.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Wire Size:</strong> Larger cross-sectional area reduces resistance. Using 4mm² instead of 2.5mm² reduces drop by ~38%.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Material:</strong> Copper has lower resistance than aluminum. Copper is preferred for most applications.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Temperature:</strong> Resistance increases with temperature. Higher ambient temperatures increase voltage drop.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>System Type:</strong> Three-phase systems have lower voltage drop than single-phase for the same power.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 1: Home Lighting Circuit</h3>
              <p className="text-sm text-gray-700 mb-2">
                230V single-phase, 10A load, 20m cable run, 2.5mm² copper wire
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>Resistance: 7.41 Ω/km = 0.00741 Ω/m</div>
                <div>VD = 2 × 10A × 0.00741 Ω/m × 20m</div>
                <div>VD = 2.964V</div>
                <div>Drop % = (2.964 / 230) × 100 = 1.29%</div>
                <div className="text-green-600 font-bold">Status: Good ✓</div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 2: Three-Phase Motor</h3>
              <p className="text-sm text-gray-700 mb-2">
                400V three-phase, 25A load, 50m cable run, 6mm² copper wire
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>Resistance: 3.08 Ω/km = 0.00308 Ω/m</div>
                <div>VD = √3 × 25A × 0.00308 Ω/m × 50m</div>
                <div>VD = 1.732 × 25 × 0.00308 × 50</div>
                <div>VD = 6.67V</div>
                <div>Drop % = (6.67 / 400) × 100 = 1.67%</div>
                <div className="text-green-600 font-bold">Status: Good ✓</div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 3: Solar System (12V DC)</h3>
              <p className="text-sm text-gray-700 mb-2">
                12V DC, 20A load, 10m cable run, 6mm² copper wire
              </p>
              <div className="text-sm font-mono bg-gray-50 p-3 rounded space-y-1">
                <div>Resistance: 3.08 Ω/km = 0.00308 Ω/m</div>
                <div>VD = 2 × 20A × 0.00308 Ω/m × 10m</div>
                <div>VD = 1.232V</div>
                <div>Drop % = (1.232 / 12) × 100 = 10.27%</div>
                <div className="text-red-600 font-bold">Status: Too High! Use larger wire ⚠️</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Effects of Excessive Voltage Drop</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Equipment Malfunction</h3>
                  <p className="text-sm text-red-800">
                    Motors may fail to start, lights may dim, and electronic devices may not operate correctly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Overheating</h3>
                  <p className="text-sm text-red-800">
                    Excessive current draw to compensate for voltage drop can cause wires to overheat, creating fire hazards.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Energy Waste</h3>
                  <p className="text-sm text-red-800">
                    Power lost as heat in conductors increases electricity costs and reduces system efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Reduced Equipment Lifespan</h3>
                  <p className="text-sm text-red-800">
                    Operating equipment at reduced voltage can cause premature failure and increased maintenance costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Reduce Voltage Drop</h2>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Increase Wire Size:</strong> Use larger cross-sectional area conductors to reduce resistance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Reduce Cable Length:</strong> Position power sources closer to loads when possible.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Use Copper Instead of Aluminum:</strong> Copper has 38% lower resistance than aluminum.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Increase System Voltage:</strong> Higher voltage systems have lower percentage drops for the same power.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Use Three-Phase Power:</strong> Three-phase systems are more efficient than single-phase for high-power loads.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Parallel Conductors:</strong> Running multiple cables in parallel reduces total resistance.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is voltage drop important in low-voltage DC systems?</h3>
              <p className="text-sm text-gray-700">
                In 12V or 24V DC systems (like solar, automotive, or marine), even small voltage drops represent a large 
                percentage of the total voltage. A 1V drop in a 12V system is 8.3%, which can prevent equipment from operating 
                correctly. Always use larger wire sizes for low-voltage DC applications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Should I calculate voltage drop for one-way or round-trip distance?</h3>
              <p className="text-sm text-gray-700">
                The formulas in this calculator already account for the round-trip (supply and return conductors). 
                Enter the one-way distance from source to load. The calculator multiplies by 2 for single-phase/DC 
                or √3 for three-phase automatically.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does temperature affect voltage drop?</h3>
              <p className="text-sm text-gray-700">
                Conductor resistance increases with temperature at approximately 0.393% per °C for copper. Cables operating 
                at higher temperatures (due to ambient conditions or current load) will have higher resistance and greater 
                voltage drop. This calculator adjusts for temperature automatically.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use this calculator for aluminum wire?</h3>
              <p className="text-sm text-gray-700">
                Yes! Select "Aluminum" from the material dropdown. The calculator automatically adjusts resistance values. 
                Aluminum has about 63% higher resistance than copper, so you'll need larger wire sizes to achieve the same 
                voltage drop performance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What if my voltage drop exceeds 5%?</h3>
              <p className="text-sm text-gray-700">
                Voltage drops exceeding 5% are generally unacceptable and can cause equipment problems. The calculator will 
                suggest using a larger wire size. If that's not practical, consider reducing cable length, increasing system 
                voltage, or using multiple parallel cables.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Important Note</h2>
          <p className="text-sm text-yellow-800 leading-relaxed">
            This calculator provides voltage drop calculations based on standard formulas and resistance values. 
            Always consult local electrical codes and regulations, which may have specific requirements for maximum 
            voltage drop. For critical installations, consult a qualified electrician or electrical engineer. 
            Proper wire sizing is essential for safety, efficiency, and code compliance.
          </p>
        </section>

      </div>
    </div>
  );
}
