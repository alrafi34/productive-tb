export default function HeatsinkCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Heatsink Calculator</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Calculate heatsink thermal resistance and cooling requirements for electronic components instantly. 
            Our free online heatsink calculator helps engineers estimate required heatsink size and verify thermal 
            design for CPUs, MOSFETs, power electronics, and other heat-generating components.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Calculate required thermal resistance (θ = ΔT / P)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Verify junction temperature with existing heatsinks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Safety status analysis (Safe, Warning, Critical)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Cooling type recommendations (Passive, Active, Liquid)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Component-specific presets (CPU, MOSFET, LED, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Step-by-step thermal calculations</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Applications</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>CPU and processor cooling design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Power MOSFET thermal management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>LED driver and lighting thermal design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Voltage regulator cooling requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Power amplifier thermal analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>PCB thermal design and component placement</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Thermal Resistance Formulas</h3>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Required Thermal Resistance</h4>
              <p className="text-gray-700 text-sm mb-2">
                <strong>θ = ΔT / P</strong> where θ is thermal resistance (°C/W), ΔT is temperature difference (°C), and P is power dissipation (W)
              </p>
              <p className="text-gray-600 text-sm">
                Use this formula to determine what thermal resistance your heatsink needs to achieve to keep the component within safe operating temperatures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Junction Temperature Calculation</h4>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Tj = Ta + (P × θ)</strong> where Tj is junction temperature, Ta is ambient temperature, P is power, and θ is thermal resistance
              </p>
              <p className="text-gray-600 text-sm">
                Use this formula to verify if an existing heatsink will keep your component within safe temperature limits.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Cooling Type Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">🌡️ Passive Cooling</h4>
              <p className="text-blue-700 text-sm mb-2">Power &lt; 50W, θ &gt; 2°C/W</p>
              <p className="text-blue-600 text-sm">Natural convection heatsinks, no fans required. Suitable for low-power applications.</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🌀 Active Cooling</h4>
              <p className="text-green-700 text-sm mb-2">Power 50-100W, θ 0.5-2°C/W</p>
              <p className="text-green-600 text-sm">Fan-assisted heatsinks for better heat dissipation. Common for CPUs and power electronics.</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">💧 Liquid Cooling</h4>
              <p className="text-purple-700 text-sm mb-2">Power &gt; 100W, θ &lt; 0.5°C/W</p>
              <p className="text-purple-600 text-sm">Water or liquid cooling systems for high-power applications requiring maximum heat removal.</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Status Indicators</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl">✅</div>
              <div>
                <div className="font-semibold text-green-900 text-sm">Safe Operation</div>
                <div className="text-xs text-green-700">Junction temperature is well below maximum rating with adequate safety margin</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl">⚠️</div>
              <div>
                <div className="font-semibold text-yellow-900 text-sm">Warning Zone</div>
                <div className="text-xs text-yellow-700">Junction temperature is close to maximum. Consider improved cooling solution</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl">🚨</div>
              <div>
                <div className="font-semibold text-red-900 text-sm">Critical Overheating</div>
                <div className="text-xs text-red-700">Junction temperature exceeds maximum rating. Immediate cooling improvement required</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Use Cases</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800">CPU Thermal Design</h4>
              <p className="text-gray-700 text-sm">
                Calculate heatsink requirements for processors and microcontrollers. Typical desktop CPUs 
                dissipate 65-150W and require junction temperatures below 85°C.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-800">Power Electronics</h4>
              <p className="text-gray-700 text-sm">
                Design cooling solutions for MOSFETs, IGBTs, and power modules. High-power switching 
                devices often require active cooling or liquid cooling systems.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-800">LED Thermal Management</h4>
              <p className="text-gray-700 text-sm">
                Ensure proper thermal design for high-power LEDs and LED drivers to maintain 
                light output and extend component lifespan.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Thermal Design Best Practices</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1 font-bold">1.</span>
                <span><strong>Safety Margin:</strong> Always design with at least 10-20°C safety margin below maximum junction temperature</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1 font-bold">2.</span>
                <span><strong>Thermal Interface:</strong> Use thermal paste or pads between component and heatsink for optimal heat transfer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1 font-bold">3.</span>
                <span><strong>Airflow:</strong> Ensure adequate airflow around heatsinks, especially in enclosed systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1 font-bold">4.</span>
                <span><strong>Mounting:</strong> Proper heatsink mounting pressure is critical for thermal performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1 font-bold">5.</span>
                <span><strong>Environment:</strong> Consider worst-case ambient temperatures in your thermal design</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Use Our Heatsink Calculator?</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800 leading-relaxed">
              Our heatsink calculator provides instant, accurate thermal analysis for electronic components. 
              Whether you're designing cooling solutions for CPUs, power electronics, or LED systems, this tool 
              offers the precision and convenience you need. With safety status indicators, cooling type recommendations, 
              and comprehensive thermal calculations, it's the perfect companion for engineers, students, and hardware designers 
              working on thermal management solutions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}