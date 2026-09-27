import { APPLIANCE_PRESETS } from "./logic";
import ToolFaq from "@/components/ToolFaq";
import { generatorSizeCalculatorConfig } from "./config";

export default function GeneratorSizeCalculatorSEO() {
  const { howToSteps, faq } = generatorSizeCalculatorConfig.seo;
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Generator Sizing?</h2>
          <p className="text-gray-700 leading-relaxed">
            Generator sizing is the process of calculating the appropriate generator capacity (measured in kVA or kW) 
            required to power your electrical loads safely and efficiently. Proper generator sizing ensures your generator 
            can handle all connected appliances without overloading while avoiding the cost and inefficiency of an 
            oversized unit. Generator capacity must account for total load, safety margin for surge currents, power factor, 
            and future expansion needs. An undersized generator will overload and shut down, while an oversized generator 
            wastes fuel and money.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Generator Sizing Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Step 1: Calculate Total Load</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">Total Load (W) = Σ (Appliance Power × Quantity)</p>
              <p className="text-sm text-blue-700">
                Add up the wattage of all appliances that will run simultaneously. Don't include appliances that won't 
                run at the same time (e.g., water heater and AC).
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Step 2: Apply Safety Margin</h3>
              <p className="text-green-800 font-mono text-lg mb-2">Adjusted Load = Total Load × (1 + Safety Margin)</p>
              <p className="text-sm text-green-700">
                Safety margin accounts for surge currents (motor starting), future expansion, and efficiency losses. 
                Typical values: 20-30% for standard loads, 50% for motor-heavy loads.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Step 3: Convert to kVA</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">kVA = Adjusted Load / (1000 × Power Factor)</p>
              <p className="text-sm text-purple-700">
                Power factor accounts for reactive power in inductive loads (motors, transformers). Typical values: 
                0.8 for mixed loads, 1.0 for resistive loads (heaters, lights).
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Complete Example</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Appliances:</strong> 10 LED bulbs (100W), 4 fans (300W), 1 refrigerator (150W), 1 TV (150W)</p>
                <p><strong>Total Load:</strong> 100 + 300 + 150 + 150 = 700W</p>
                <p><strong>Safety Margin (30%):</strong> 700 × 1.3 = 910W</p>
                <p><strong>Power Factor (0.8):</strong> 910 / (1000 × 0.8) = 1.14 kVA</p>
                <p><strong>Recommended:</strong> 2 kVA generator (next standard size)</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Generator Sizing by Application</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Load</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generator Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appliances</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">Small Home</td>
                  <td className="px-4 py-3 text-sm text-gray-700">500-1000W</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">2-3 kVA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Lights, fans, TV, refrigerator</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">Medium Home</td>
                  <td className="px-4 py-3 text-sm text-gray-700">2000-3000W</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">4-5 kVA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Above + AC, water pump</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">Large Home</td>
                  <td className="px-4 py-3 text-sm text-gray-700">4000-6000W</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">7.5-10 kVA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Full home backup</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">Small Office</td>
                  <td className="px-4 py-3 text-sm text-gray-700">2000-3000W</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">5-6.5 kVA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Computers, AC, lights</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">Workshop</td>
                  <td className="px-4 py-3 text-sm text-gray-700">5000-8000W</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">10-15 kVA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Power tools, welding</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">Commercial</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10000+ W</td>
                  <td className="px-4 py-3 text-sm text-primary font-semibold">20+ kVA</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Full facility backup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding kVA vs kW</h2>
          
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">kVA (Kilovolt-Ampere)</h3>
              <p className="text-sm text-blue-800">
                kVA is apparent power - the total power supplied by the generator. It includes both real power (kW) 
                and reactive power (kVAR). Generators are rated in kVA because they must supply both types of power. 
                Formula: kVA = kW / Power Factor
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">kW (Kilowatt)</h3>
              <p className="text-sm text-green-800">
                kW is real power - the actual power consumed by appliances to do useful work. This is what you pay 
                for on your electricity bill. Formula: kW = kVA × Power Factor. For resistive loads (heaters, lights), 
                kW ≈ kVA.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Power Factor</h3>
              <p className="text-sm text-purple-800">
                Power factor is the ratio of real power (kW) to apparent power (kVA). It ranges from 0 to 1. Resistive 
                loads (heaters, lights) have power factor ≈ 1. Inductive loads (motors, transformers) have power factor 
                0.6-0.8. Mixed loads typically have power factor 0.8.
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Example:</strong> A 5 kVA generator with 0.8 power factor can deliver 4 kW (5 × 0.8) of real power. 
              If your load is 3000W (3 kW) with 0.8 power factor, you need 3.75 kVA (3 / 0.8) generator capacity.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Appliance Power Ratings</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from(new Set(APPLIANCE_PRESETS.map((a) => a.category))).map((category) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                <div className="space-y-2 text-sm">
                  {APPLIANCE_PRESETS.filter((a) => a.category === category).map((a) => (
                    <div key={a.name} className="flex justify-between">
                      <span className="text-gray-700">{a.name}:</span>
                      <span className="font-mono font-semibold">{a.power.toLocaleString("en-US")} W</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Typical running watts; check the label on your own appliances. Motors and compressors (AC, heat pumps,
            fridges, pumps) draw two to three times their running watts for a few seconds when they start.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Margin Guidelines</h2>
          
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">10-20% Margin (Light Loads)</h3>
              <p className="text-sm text-green-800">
                Use for resistive loads only (lights, heaters, electronics). No motors or compressors. Minimal surge 
                current. Example: LED lights, computers, TVs. Provides basic safety buffer for minor variations.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">30% Margin (Recommended)</h3>
              <p className="text-sm text-blue-800">
                Standard recommendation for mixed loads including some motors (fans, refrigerator). Accounts for surge 
                currents, efficiency losses, and minor future expansion. Suitable for most residential applications.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">50% Margin (Heavy Loads)</h3>
              <p className="text-sm text-orange-800">
                Use for motor-heavy loads (AC, water pump, power tools). Motors draw 3-7x rated power during startup. 
                Also recommended for future expansion planning or when exact loads are uncertain. Better safe than sorry.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Generator Sizing Mistakes</h2>
          
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Ignoring Starting Current</h3>
                  <p className="text-sm text-red-800">
                    Motors, compressors, and pumps draw 3-7x rated power during startup. A 500W refrigerator needs 
                    2000-3000W surge capacity. Always check generator surge rating, not just continuous rating.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Adding All Appliances</h3>
                  <p className="text-sm text-red-800">
                    Don't add ratings of appliances that never run together. A 2000W water heater and 1800W AC won't 
                    run simultaneously. Calculate realistic simultaneous load, not total connected load.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Confusing kVA and kW</h3>
                  <p className="text-sm text-red-800">
                    kVA is generator capacity, kW is actual power consumed. A 5 kVA generator with 0.8 power factor 
                    delivers only 4 kW. Always convert your load (kW) to required capacity (kVA) using power factor.
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
                    Sizing generator exactly to load leaves no room for surge, expansion, or efficiency losses. Always 
                    use 20-30% safety margin minimum. A 2000W load needs minimum 2500-2600W generator capacity.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">✗</span>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Oversizing Excessively</h3>
                  <p className="text-sm text-red-800">
                    Oversized generators waste fuel, cost more, and operate inefficiently at low loads. A generator 
                    running at 30% capacity uses almost as much fuel as at 70% capacity. Size appropriately, not excessively.
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
            When sizing generators for homes, prioritize essential loads (lights, fans, refrigerator) and add 
            non-essential loads (AC, water heater) separately. This allows you to choose a smaller, more economical 
            generator for everyday use and manually manage high-power appliances. A 3-5 kVA generator is sufficient 
            for most small-medium homes if you don't run AC and water heater simultaneously. For whole-home backup 
            including AC, budget for 7.5-10 kVA.
          </p>
        </section>

      </div>
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>How to Use the Generator Size Calculator</h2>
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
