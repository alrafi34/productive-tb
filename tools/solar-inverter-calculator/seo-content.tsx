import ToolFaq from "@/components/ToolFaq";
import { solarInverterCalculatorConfig } from "./config";

export default function SolarInverterCalculatorSEO() {
  const { howToSteps, faq } = solarInverterCalculatorConfig.seo;
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Solar Inverter?</h2>
          <p className="text-gray-700 leading-relaxed">
            A solar inverter is a critical component of solar power systems that converts DC (Direct Current) electricity 
            from solar panels or batteries into AC (Alternating Current) electricity used by household appliances. Proper 
            inverter sizing ensures your system can handle all connected loads safely and efficiently. An undersized inverter 
            will overload and shut down, while an oversized inverter wastes money and operates inefficiently. The inverter 
            capacity is measured in VA (Volt-Amperes) or kW (Kilowatts), with VA being the apparent power and kW being the 
            real power.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Solar Inverter Sizing Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Step 1: Apply Safety Factor</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">Adjusted Load = Total Load × Safety Factor</p>
              <p className="text-sm text-blue-700">
                Safety factor accounts for surge loads, motor starting currents, and future expansion. Typical values: 
                1.2x (standard), 1.5x (heavy loads), 2.0x (future expansion).
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Step 2: Battery Current</h3>
              <p className="text-green-800 font-mono text-lg mb-2">DC Current (A) = Load / (Battery Voltage × Efficiency)</p>
              <p className="text-sm text-green-700">
                An inverter&apos;s rating is its AC output, so efficiency does not change the size you need; it raises the
                power drawn from the battery. Pure sine wave inverters are typically 90-95% efficient.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Step 3: Convert to Kilowatts</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">Power (kW) = VA / 1000</p>
              <p className="text-sm text-purple-700">
                Convert VA to kW for easier comparison with appliance ratings. For resistive loads (heaters, lights), 
                VA ≈ W. For inductive loads (motors, compressors), VA &gt; W.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Complete Example</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Given:</strong> 1000W load, 24V system, 90% efficiency, 1.2x safety factor</p>
                <p><strong>Step 1:</strong> Adjusted Load = 1000 × 1.2 = 1200W</p>
                <p><strong>Step 2:</strong> Battery current = 1000 / (24 × 0.90) = 46.3 A</p>
                <p><strong>Step 3:</strong> Power = 1200 / 1000 = 1.2 kW</p>
                <p><strong>Recommended:</strong> 1200 VA standard inverter (or 1500 VA for more headroom)</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inverter Sizing by Load</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Load (W)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">System Voltage</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inverter Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Use</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">300W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">12V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">500 VA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Laptop, lights, phone charger</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">500W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">12V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">800 VA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">TV, fans, small appliances</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">1000W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">24V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">1500 VA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Small home backup</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">2000W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">24V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">3000 VA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Medium home backup</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">3000W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">48V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">4000 VA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Large home, off-grid</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">5000W</td>
                  <td className="px-4 py-3 text-sm text-gray-700">48V</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">6000 VA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Full home, commercial</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">*Based on 90% efficiency and 1.2x safety factor</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting Inverter Size</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Total Connected Load:</strong> Sum of all appliances that may run simultaneously. Don't add 
                appliances that never run together. A 1000W load needs minimum 1200-1500 VA inverter.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Surge/Starting Current:</strong> Motors, compressors, and pumps draw 3-7x rated power during 
                startup. A 500W refrigerator may need 2000W surge capacity. Use 1.5-2.0x safety factor for motor loads.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Inverter Efficiency:</strong> Pure sine wave inverters (90-95% efficient) are more efficient than 
                modified sine wave (80-85%). Higher efficiency means smaller inverter size and lower battery drain.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>System Voltage:</strong> Higher voltage (48V) is more efficient than lower voltage (12V) for the 
                same power. 48V systems have lower current, thinner cables, and less voltage drop.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Load Type:</strong> Resistive loads (heaters, lights) have power factor ≈ 1. Inductive loads 
                (motors, transformers) have power factor 0.6-0.8, requiring larger inverters.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Future Expansion:</strong> Plan for 20-30% future load growth. It's cheaper to buy a slightly 
                larger inverter now than replace it later. Use 1.5-2.0x safety factor for expansion.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Voltage Selection Guide</h2>
          
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 text-xl font-bold">12V</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">12V Systems (Small Loads)</h3>
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Best for:</strong> RVs, boats, small cabins, mobile applications, loads &lt;800W
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>Pros:</strong> Simple, widely available, easy to find 12V appliances<br/>
                    <strong>Cons:</strong> High current (83A for 1000W), thick cables required, limited scalability
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-green-600 text-xl font-bold">24V</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 mb-1">24V Systems (Medium Loads)</h3>
                  <p className="text-sm text-green-800 mb-2">
                    <strong>Best for:</strong> Small-medium homes, backup systems, loads 800-2500W
                  </p>
                  <p className="text-sm text-green-800">
                    <strong>Pros:</strong> Good efficiency, moderate cable sizes, scalable, lower current (42A for 1000W)<br/>
                    <strong>Cons:</strong> Fewer 24V appliances than 12V, requires 2 batteries in series
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-purple-600 text-xl font-bold">48V</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-1">48V Systems (Large Loads)</h3>
                  <p className="text-sm text-purple-800 mb-2">
                    <strong>Best for:</strong> Large homes, commercial systems, off-grid, loads &gt;2500W
                  </p>
                  <p className="text-sm text-purple-800">
                    <strong>Pros:</strong> Highest efficiency, lowest current (21A for 1000W), thinnest cables, best for large systems<br/>
                    <strong>Cons:</strong> More expensive components, requires 4 batteries in series
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pure Sine Wave vs Modified Sine Wave</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">Pure Sine Wave Inverter</h3>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Efficiency: 90-95%</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Clean power like grid electricity</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Works with all appliances</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>No humming noise in motors</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Safe for sensitive electronics</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Longer appliance lifespan</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Higher cost (2-3x more)</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-3">Modified Sine Wave Inverter</h3>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Efficiency: 80-85%</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Lower cost</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Works with basic appliances</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Humming noise in motors/fans</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>May damage sensitive electronics</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Reduced appliance efficiency</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Not suitable for medical equipment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Recommendation:</strong> Always choose pure sine wave inverters for home use. The higher upfront 
              cost is offset by better efficiency, longer appliance life, and compatibility with all devices. Modified 
              sine wave is only suitable for basic resistive loads like heaters and incandescent lights.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Inverter Sizing Mistakes</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Ignoring Surge Current</h3>
                  <p className="text-sm text-red-800">
                    Motors, compressors, and pumps draw 3-7x rated power during startup. A 500W refrigerator needs 
                    2000-3000W surge capacity. Always check inverter surge rating, not just continuous rating.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Adding All Appliance Ratings</h3>
                  <p className="text-sm text-red-800">
                    Don't add ratings of appliances that never run together. A 2000W water heater and 1500W AC won't 
                    run simultaneously. Calculate realistic simultaneous load, not total connected load.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Using 12V for High Loads</h3>
                  <p className="text-sm text-red-800">
                    12V systems are inefficient for loads &gt;800W. A 2000W load draws 167A at 12V, requiring very thick 
                    cables and causing significant voltage drop. Use 24V or 48V for loads above 800W.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Choosing Modified Sine Wave</h3>
                  <p className="text-sm text-red-800">
                    Modified sine wave inverters damage sensitive electronics, reduce appliance efficiency by 10-20%, 
                    and cause humming in motors. The cost savings aren't worth the problems. Always use pure sine wave.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">No Safety Margin</h3>
                  <p className="text-sm text-red-800">
                    Sizing inverter exactly to load leaves no room for surge, expansion, or efficiency losses. Always 
                    use 1.2-1.5x safety factor. A 1000W load needs minimum 1200-1500W inverter capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ToolFaq items={faq} />

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            When sizing inverters for solar systems, consider both continuous load and surge requirements. A 1500W 
            inverter with 3000W surge rating can handle a 500W refrigerator (which needs 2000W surge) plus 1000W of 
            other loads. Always check the inverter's surge rating and duration (typically 5-10 seconds). For critical 
            applications, size the inverter for 60-70% utilization at maximum load to ensure long life and reliable 
            operation.
          </p>
        </section>

      </div>
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>How to Use the Solar Inverter Calculator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
