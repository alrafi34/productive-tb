export default function PowerDensityCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Power Density Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Power Density Calculator is a professional engineering tool designed to calculate power density (W/m²) by dividing electrical power by surface area. This calculator helps engineers, designers, and technicians quickly determine how much power is distributed across a given area, which is critical for thermal management, safety analysis, and system design.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Power density analysis is fundamental to electrical and thermal engineering, affecting component selection, cooling system design, and safety considerations. This tool provides instant calculations with real-time updates, making it ideal for design verification, thermal analysis, and educational purposes.
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
              <span><strong>Multiple Units:</strong> Support for various power units (W, kW, MW) and area units (m², cm², mm²)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Density Classification:</strong> Automatic categorization (low, moderate, high, very high) with safety warnings</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Visual Analysis:</strong> Interactive density level indicator with color-coded performance bars</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Smart Unit Conversion:</strong> Automatic conversion between different power and area units</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Safety Warnings:</strong> Alerts for high power densities requiring cooling or safety measures</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Common Presets:</strong> Quick calculations for typical applications (LED panels, heaters, solar panels)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Step-by-step Solutions:</strong> Detailed calculation process with unit conversions and formulas</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export Options:</strong> Download results as text files for documentation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Calculation History:</strong> Save and review previous power density calculations</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Power Density Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Basic Power Density Formula</h3>
              <code className="text-sm text-gray-700">Power Density = Power / Area</code>
              <p className="text-sm text-gray-600 mt-2">
                Where power density is expressed in Watts per square meter (W/m²), power is the total electrical power in Watts, and area is the surface area in square meters over which the power is distributed.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Unit Conversions</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Power Units:</strong> 1 kW = 1,000 W | 1 MW = 1,000,000 W</p>
                <p><strong>Area Units:</strong> 1 m² = 10,000 cm² = 1,000,000 mm²</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Alternative Units</h3>
              <code className="text-sm text-gray-700">Power Density can also be expressed as kW/m² or MW/m² for high-power applications</code>
              <p className="text-sm text-gray-600 mt-2">
                The calculator automatically formats results using the most appropriate unit based on the magnitude of the calculated power density.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Examples</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Example 1: LED Panel</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p><strong>Given:</strong> Power = 40 W, Area = 0.36 m² (60cm × 60cm panel)</p>
                <p><strong>Calculation:</strong></p>
                <p>Power Density = 40 W / 0.36 m²</p>
                <p>Power Density = 111.11 W/m²</p>
                <p><strong>Result:</strong> High density requiring adequate heat dissipation</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">Example 2: Solar Panel</h3>
              <div className="text-sm text-green-800 space-y-2">
                <p><strong>Given:</strong> Power = 300 W, Area = 2 m² (standard residential panel)</p>
                <p><strong>Calculation:</strong></p>
                <p>Power Density = 300 W / 2 m²</p>
                <p>Power Density = 150 W/m²</p>
                <p><strong>Result:</strong> High density typical for modern solar panels</p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">Example 3: Electric Heater</h3>
              <div className="text-sm text-purple-800 space-y-2">
                <p><strong>Given:</strong> Power = 1500 W, Area = 0.5 m² (heater surface)</p>
                <p><strong>Calculation:</strong></p>
                <p>Power Density = 1500 W / 0.5 m²</p>
                <p>Power Density = 3000 W/m²</p>
                <p><strong>Result:</strong> Very high density requiring safety precautions</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Power Density Classification</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Range (W/m²)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Applications</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Considerations</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">Low</td>
                  <td className="px-4 py-3 text-sm text-gray-700">&lt; 10 W/m²</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Low-power electronics, sensors, displays</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Minimal cooling required</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">Moderate</td>
                  <td className="px-4 py-3 text-sm text-gray-700">10 - 100 W/m²</td>
                  <td className="px-4 py-3 text-sm text-gray-700">LED lighting, computer components</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Natural convection cooling</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-orange-600">High</td>
                  <td className="px-4 py-3 text-sm text-gray-700">100 - 1,000 W/m²</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Power electronics, solar panels, heaters</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Active cooling recommended</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">Very High</td>
                  <td className="px-4 py-3 text-sm text-gray-700">&gt; 1,000 W/m²</td>
                  <td className="px-4 py-3 text-sm text-gray-700">High-power heaters, industrial equipment</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Critical cooling and safety measures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Thermal Management</h3>
              <p className="text-sm text-blue-800">
                Calculate heat dissipation requirements for electronic components, design heat sinks, and determine cooling system specifications.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Solar Panel Analysis</h3>
              <p className="text-sm text-green-800">
                Evaluate solar panel efficiency, compare different panel technologies, and optimize installation layouts for maximum power density.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">LED Lighting Design</h3>
              <p className="text-sm text-purple-800">
                Design LED fixtures, calculate thermal requirements, and ensure safe operating temperatures for lighting applications.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Power Electronics</h3>
              <p className="text-sm text-orange-800">
                Analyze power converter designs, calculate component stress levels, and design appropriate cooling solutions.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Safety Analysis</h3>
              <p className="text-sm text-red-800">
                Assess surface temperature risks, determine safe touch temperatures, and evaluate fire hazard potential in electrical systems.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Material Selection</h3>
              <p className="text-sm text-yellow-800">
                Choose appropriate materials for high power density applications, evaluate thermal conductivity requirements, and select insulation materials.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">1.</span>
              <span><strong>Enter Power:</strong> Input the total electrical power in Watts, Kilowatts, or Megawatts.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">2.</span>
              <span><strong>Enter Area:</strong> Input the surface area in square meters, square centimeters, or square millimeters.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">3.</span>
              <span><strong>Select Units:</strong> Choose appropriate power and area units for your application.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">4.</span>
              <span><strong>Set Precision:</strong> Choose the number of decimal places for results (1-4 decimal places).</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">5.</span>
              <span><strong>View Results:</strong> The calculator instantly shows power density, classification, and safety warnings.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">6.</span>
              <span><strong>Analyze Density:</strong> Review the density level indicator and safety recommendations.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">7.</span>
              <span><strong>Review Steps:</strong> See detailed calculation steps with unit conversions and formulas.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">8.</span>
              <span><strong>Use Presets:</strong> Click on common examples for quick calculations of typical applications.</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-primary mr-2">9.</span>
              <span><strong>Export or Save:</strong> Download results as text files or save to history for future reference.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thermal Considerations</h2>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-orange-900">Heat Dissipation Guidelines:</h3>
            <div className="text-sm text-orange-900 space-y-2">
              <p><strong>Natural Convection (&lt;100 W/m²):</strong> Air cooling sufficient for most applications. Ensure adequate ventilation.</p>
              <p><strong>Forced Convection (100-500 W/m²):</strong> Fans or blowers required. Design for proper airflow patterns.</p>
              <p><strong>Liquid Cooling (500-2000 W/m²):</strong> Water or specialized coolants needed. Consider pump requirements and leak protection.</p>
              <p><strong>Advanced Cooling (&gt;2000 W/m²):</strong> Heat pipes, vapor chambers, or immersion cooling may be required.</p>
              <p><strong>Surface Temperature:</strong> High power densities can create dangerous surface temperatures. Consider touch safety limits (60°C for accessible surfaces).</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Considerations</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-red-900">⚠️ Important Safety Notes:</h3>
            <div className="text-sm text-red-900 space-y-2">
              <p><strong>High Power Densities (&gt;1000 W/m²):</strong> Can create fire hazards and dangerous surface temperatures. Implement appropriate safety measures.</p>
              <p><strong>Material Limits:</strong> Ensure all materials can withstand the thermal stress from high power densities. Consider thermal expansion and material degradation.</p>
              <p><strong>Electrical Safety:</strong> High power densities often correlate with high electrical power. Follow electrical safety codes and standards.</p>
              <p><strong>Ventilation:</strong> Adequate ventilation is critical to prevent overheating and maintain safe operating conditions.</p>
              <p><strong>Monitoring:</strong> Consider temperature monitoring and automatic shutdown systems for high power density applications.</p>
              <p><strong>Professional Review:</strong> For critical applications, consult qualified thermal and electrical engineers for design verification.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Power Distribution</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-blue-900">Key Concepts:</h3>
            <div className="text-sm text-blue-900 space-y-2">
              <p><strong>Uniform Distribution:</strong> Power density assumes uniform power distribution across the surface area. Actual hot spots may have higher local densities.</p>
              <p><strong>Peak vs Average:</strong> Consider both peak and average power densities, especially for pulsed or variable power applications.</p>
              <p><strong>Thermal Resistance:</strong> Power density affects thermal resistance calculations. Higher densities require lower thermal resistance paths.</p>
              <p><strong>Scaling Effects:</strong> Power density helps predict thermal behavior when scaling designs up or down in size.</p>
              <p><strong>Efficiency Impact:</strong> Higher power densities can reduce efficiency due to increased thermal losses and component stress.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is power density?</h3>
              <p className="text-gray-700">
                Power density is the amount of electrical power distributed over a given surface area, expressed in Watts per square meter (W/m²). It's a key parameter for thermal management and safety analysis in electrical systems.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is power density important?</h3>
              <p className="text-gray-700">
                Power density determines heat generation rates, cooling requirements, and safety considerations. Higher power densities require more sophisticated thermal management and can create safety hazards if not properly managed.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's considered a high power density?</h3>
              <p className="text-gray-700">
                Power densities above 100 W/m² are considered high and typically require active cooling. Above 1000 W/m² is very high and requires specialized cooling solutions and safety measures.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I reduce power density?</h3>
              <p className="text-gray-700">
                Reduce power density by increasing the surface area (larger heat sinks, distributed components) or reducing power consumption (more efficient components, lower operating power).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What cooling methods work for different power densities?</h3>
              <p className="text-gray-700">
                Low densities (&lt;100 W/m²): Natural convection. Moderate (100-500 W/m²): Forced air cooling. High (500-2000 W/m²): Liquid cooling. Very high (&gt;2000 W/m²): Advanced cooling like heat pipes or immersion cooling.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does power density relate to temperature?</h3>
              <p className="text-gray-700">
                Higher power densities generally result in higher temperatures, but the exact relationship depends on thermal resistance, cooling methods, and ambient conditions. Thermal analysis is needed for precise temperature predictions.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}