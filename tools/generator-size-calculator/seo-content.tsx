export default function GeneratorSizeCalculatorSEO() {
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
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Lighting & Fans</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">LED Bulb:</span>
                  <span className="font-mono font-semibold">10-15W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">CFL Bulb:</span>
                  <span className="font-mono font-semibold">15-20W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Tube Light:</span>
                  <span className="font-mono font-semibold">40W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Ceiling Fan:</span>
                  <span className="font-mono font-semibold">75W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Exhaust Fan:</span>
                  <span className="font-mono font-semibold">35W</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Kitchen Appliances</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Refrigerator:</span>
                  <span className="font-mono font-semibold">150-200W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Microwave:</span>
                  <span className="font-mono font-semibold">1200W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Electric Kettle:</span>
                  <span className="font-mono font-semibold">1500W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Mixer Grinder:</span>
                  <span className="font-mono font-semibold">500W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Induction Cooktop:</span>
                  <span className="font-mono font-semibold">2000W</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Cooling & Heating</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Window AC (1 Ton):</span>
                  <span className="font-mono font-semibold">1200W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Split AC (1.5 Ton):</span>
                  <span className="font-mono font-semibold">1800W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Water Heater:</span>
                  <span className="font-mono font-semibold">2000W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Room Heater:</span>
                  <span className="font-mono font-semibold">1500W</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Electronics & Others</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">LED TV (32"):</span>
                  <span className="font-mono font-semibold">60W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Desktop Computer:</span>
                  <span className="font-mono font-semibold">300W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Laptop:</span>
                  <span className="font-mono font-semibold">65W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Water Pump (0.5 HP):</span>
                  <span className="font-mono font-semibold">370W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Washing Machine:</span>
                  <span className="font-mono font-semibold">500W</span>
                </div>
              </div>
            </div>
          </div>
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

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What size generator do I need for a 2000W load?</h3>
              <p className="text-sm text-gray-700">
                For a 2000W continuous load with 30% safety margin and 0.8 power factor, you need approximately 3.25 kVA 
                (2000 × 1.3 / 0.8 / 1000). Choose a 3.5-4 kVA generator. If the load includes motors, use 50% safety 
                margin and select a 5 kVA generator.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I convert kVA to kW?</h3>
              <p className="text-sm text-gray-700">
                Formula: kW = kVA × Power Factor. Example: A 5 kVA generator with 0.8 power factor delivers 4 kW 
                (5 × 0.8). For resistive loads (power factor = 1), kVA = kW. For inductive loads (motors), kVA &gt; kW.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is power factor and why does it matter?</h3>
              <p className="text-sm text-gray-700">
                Power factor is the ratio of real power (kW) to apparent power (kVA). It accounts for reactive power 
                in inductive loads like motors. Typical values: 1.0 for resistive loads (heaters, lights), 0.8 for 
                mixed loads, 0.6-0.7 for motor-heavy loads. Lower power factor means larger generator needed.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I run an AC on a 3 kVA generator?</h3>
              <p className="text-sm text-gray-700">
                A 1.5 ton AC consumes 1800W and needs 3000-4000W surge capacity for compressor starting. A 3 kVA 
                generator (2.4 kW at 0.8 PF) is too small. You need minimum 5 kVA generator for 1.5 ton AC plus some 
                lights and fans. For AC alone, 4 kVA is minimum.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between continuous and surge rating?</h3>
              <p className="text-sm text-gray-700">
                Continuous rating is the power a generator can deliver indefinitely. Surge (or peak) rating is the 
                maximum power it can deliver for a few seconds during motor startup. A good generator has surge rating 
                1.5-2x continuous rating. Example: 5 kVA continuous, 7.5-10 kVA surge.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much safety margin should I use?</h3>
              <p className="text-sm text-gray-700">
                Use 20-30% for standard residential loads (lights, fans, TV, refrigerator). Use 50% for motor-heavy 
                loads (AC, water pump, power tools) or when planning future expansion. Never size generator exactly 
                to load - always include safety margin for surge currents and efficiency losses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What happens if generator is undersized?</h3>
              <p className="text-sm text-gray-700">
                An undersized generator will overload, overheat, and shut down when load exceeds capacity. Repeated 
                overloading damages the generator, shortens lifespan, and can damage connected appliances. Symptoms 
                include voltage drop, frequent shutdowns, and inability to start motor loads. Always size with adequate 
                safety margin.
              </p>
            </div>
          </div>
        </section>

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
    </div>
  );
}
