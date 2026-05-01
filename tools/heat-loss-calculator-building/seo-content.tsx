export default function HeatLossCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Heat Loss Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Heat Loss Calculator</strong> is a professional tool designed for engineers, architects, HVAC technicians, and building professionals to estimate the rate of heat loss from buildings. It calculates heat energy escaping through walls, windows, roofs, and floors using U-values, surface areas, and temperature differences.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🌡️</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time heat loss calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Simple and detailed calculation modes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Material U-value presets library</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Building type presets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Export to TXT and CSV formats</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Use Cases
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>HVAC system sizing and design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Energy efficiency analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Insulation planning and upgrades</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Building design optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Heating cost estimation</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How to Use the Calculator</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span><strong>Select Mode:</strong> Choose Simple mode for quick calculations or Detailed mode for component-by-component analysis</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span><strong>Enter Temperatures:</strong> Input inside and outside temperatures in Celsius or Fahrenheit</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Input Building Data:</strong> Enter areas and U-values for walls, windows, roofs, and floors</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>Use Presets:</strong> Apply building presets or reference U-value library for typical materials</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>View Results:</strong> See total heat loss in Watts and BTU/hr with detailed breakdown</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Formula</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Basic Heat Loss Formula</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Q = U × A × ΔT
              </code>
              <p className="text-sm mt-2">Where:</p>
              <ul className="text-sm mt-2 space-y-1 ml-4">
                <li><strong>Q</strong> = Heat loss (Watts)</li>
                <li><strong>U</strong> = U-value or thermal transmittance (W/m²·K)</li>
                <li><strong>A</strong> = Surface area (m²)</li>
                <li><strong>ΔT</strong> = Temperature difference (°C or K)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Temperature Difference</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                ΔT = Inside Temperature - Outside Temperature
              </code>
              <p className="text-sm mt-2">The temperature difference drives heat flow from warm to cold.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Total Heat Loss (Detailed Mode)</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Q_total = Q_wall + Q_window + Q_roof + Q_floor
              </code>
              <p className="text-sm mt-2">Sum of heat loss through all building components.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Example Calculation</h4>
              <div className="bg-white p-4 rounded border border-gray-200 text-sm space-y-2">
                <p><strong>Given:</strong></p>
                <p>• Wall Area: 80 m²</p>
                <p>• Wall U-Value: 0.35 W/m²·K</p>
                <p>• Inside Temperature: 22°C</p>
                <p>• Outside Temperature: 5°C</p>
                <p className="pt-2 border-t border-gray-300"><strong>Calculation:</strong></p>
                <p>• ΔT = 22 - 5 = 17°C</p>
                <p>• Q = 0.35 × 80 × 17 = 476 W</p>
                <p className="pt-2 border-t border-gray-300"><strong>Result:</strong> 476 Watts of heat loss through walls</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding U-Values</h3>
        
        <p className="text-gray-700 mb-4">
          U-value (thermal transmittance) measures how well a building element conducts heat. Lower U-values indicate better insulation performance.
        </p>

        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Excellent Insulation</h4>
                <p className="text-sm mt-1">Modern, high-performance buildings</p>
              </div>
              <span className="text-2xl font-bold text-green-600">0.15-0.25</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Good Insulation</h4>
                <p className="text-sm mt-1">Well-insulated contemporary buildings</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">0.25-0.40</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Average Insulation</h4>
                <p className="text-sm mt-1">Standard construction, basic insulation</p>
              </div>
              <span className="text-2xl font-bold text-yellow-600">0.40-1.00</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Poor Insulation</h4>
                <p className="text-sm mt-1">Old buildings, minimal insulation</p>
              </div>
              <span className="text-2xl font-bold text-red-600">1.00+</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Typical U-Values by Component</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Walls</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Brick (Insulated): 0.35 W/m²·K</li>
              <li>• Timber Frame (Insulated): 0.25 W/m²·K</li>
              <li>• Brick (Uninsulated): 2.1 W/m²·K</li>
              <li>• Concrete Block: 1.5 W/m²·K</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Windows</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Triple Glazed: 1.2 W/m²·K</li>
              <li>• Double Glazed (Low-E): 1.8 W/m²·K</li>
              <li>• Double Glazed: 2.8 W/m²·K</li>
              <li>• Single Glazed: 5.0 W/m²·K</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Roofs</h4>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Pitched (Insulated): 0.16 W/m²·K</li>
              <li>• Flat (Insulated): 0.25 W/m²·K</li>
              <li>• Flat (Uninsulated): 1.5 W/m²·K</li>
              <li>• Pitched (Uninsulated): 2.3 W/m²·K</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Floors</h4>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Suspended (Insulated): 0.22 W/m²·K</li>
              <li>• Solid (Insulated): 0.25 W/m²·K</li>
              <li>• Solid (Uninsulated): 0.7 W/m²·K</li>
              <li>• Suspended (Uninsulated): 1.0 W/m²·K</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Heat Loss Intensity Levels</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-green-900">Very Low (&lt; 100 W)</h4>
                <p className="text-sm mt-1">Excellent insulation, minimal heat loss</p>
              </div>
              <span className="text-2xl">✓</span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-blue-900">Low (100-300 W)</h4>
                <p className="text-sm mt-1">Good insulation, efficient building</p>
              </div>
              <span className="text-2xl">✓</span>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-yellow-900">Medium (300-600 W)</h4>
                <p className="text-sm mt-1">Average insulation, room for improvement</p>
              </div>
              <span className="text-2xl">⚠</span>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-orange-900">High (600-1000 W)</h4>
                <p className="text-sm mt-1">Poor insulation, significant heat loss</p>
              </div>
              <span className="text-2xl">⚠</span>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-red-900">Very High (&gt; 1000 W)</h4>
                <p className="text-sm mt-1">Very poor insulation, urgent upgrades needed</p>
              </div>
              <span className="text-2xl">✗</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Applications</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">HVAC System Sizing</h4>
            <p className="text-sm text-green-800">
              Calculate accurate heat loss to properly size heating systems, ensuring adequate capacity without oversizing and wasting energy.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Energy Efficiency</h4>
            <p className="text-sm text-blue-800">
              Identify areas of high heat loss to prioritize insulation upgrades and improve overall building energy performance.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Cost Estimation</h4>
            <p className="text-sm text-purple-800">
              Estimate heating costs based on heat loss rates and fuel prices to budget accurately for operational expenses.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Building Design</h4>
            <p className="text-sm text-orange-800">
              Optimize building envelope design by comparing different insulation strategies and material choices.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Results:</strong> Real-time calculation as you enter values</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Two Calculation Modes:</strong> Simple for quick estimates, detailed for comprehensive analysis</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Material Library:</strong> Built-in U-value presets for common building materials</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Building Presets:</strong> Quick-start templates for different building types</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Free & Accessible:</strong> No registration required, works entirely in your browser</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Pro Tip
          </h4>
          <p className="text-sm text-yellow-800">
            Heat loss calculations are estimates based on simplified models. Actual heat loss can vary due to factors like air infiltration, thermal bridging, and occupant behavior. For critical applications like HVAC system design or energy certification, always consult with qualified building professionals who can perform detailed thermal modeling and account for all relevant factors. Regular maintenance of insulation and sealing gaps can significantly reduce heat loss and improve energy efficiency.
          </p>
        </div>

      </div>
    </div>
  );
}