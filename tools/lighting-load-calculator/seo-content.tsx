export default function LightingLoadCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Lighting Load Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Lighting Load Calculator</strong> is a professional tool designed for architects, electrical engineers, interior designers, and contractors to estimate lighting power requirements for rooms and buildings. It helps calculate total wattage, energy consumption, and optimize lighting design for energy efficiency and cost savings.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time lighting load calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Support for LED, CFL, and Incandescent</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Room type presets with recommended lux</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Monthly energy consumption estimation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Fixture count suggestions</span>
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
                <span>Electrical system design and planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Energy efficiency optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Construction cost estimation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Circuit breaker sizing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Lighting retrofit planning</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How to Use the Calculator</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span><strong>Enter Room Area:</strong> Input the area in square feet or square meters</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span><strong>Select Room Type:</strong> Choose from presets (living room, office, kitchen, etc.) or custom</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Choose Lighting Type:</strong> Select LED, CFL, or Incandescent based on your fixtures</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>Adjust Settings:</strong> Optionally modify efficiency factor and electricity rate</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>View Results:</strong> See total wattage, monthly consumption, and cost estimates</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Formula</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 1: Calculate Total Lumens</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Total Lumens = Area (m²) × Lux Level
              </code>
              <p className="text-sm mt-2">Lumens represent the total amount of light needed for the space.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 2: Convert to Watts</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Watts = Total Lumens / Lumens per Watt
              </code>
              <p className="text-sm mt-2">Different lighting types have different efficiency ratings (lumens per watt).</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 3: Apply Efficiency Factor</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Adjusted Watts = Watts / Efficiency Factor
              </code>
              <p className="text-sm mt-2">Accounts for real-world losses like fixture efficiency and light distribution.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Example Calculation</h4>
              <div className="bg-white p-4 rounded border border-gray-200 text-sm space-y-2">
                <p><strong>Room:</strong> 200 sq ft (18.6 m²)</p>
                <p><strong>Lux:</strong> 150 (living room)</p>
                <p><strong>Type:</strong> LED (100 lm/W)</p>
                <p><strong>Lumens:</strong> 18.6 × 150 = 2,790 lumens</p>
                <p><strong>Watts:</strong> 2,790 / 100 = 27.9 W</p>
                <p><strong>Adjusted:</strong> 27.9 / 0.8 = 34.9 W</p>
                <p className="pt-2 border-t border-gray-300"><strong>Result:</strong> ~35 watts total lighting load</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Lux Levels by Room Type</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Living Room</h4>
                <p className="text-sm mt-1">Comfortable ambient lighting for relaxation</p>
              </div>
              <span className="text-2xl font-bold text-primary">150 lux</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Bedroom</h4>
                <p className="text-sm mt-1">Soft, relaxing lighting for rest</p>
              </div>
              <span className="text-2xl font-bold text-primary">100 lux</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Office</h4>
                <p className="text-sm mt-1">Bright task lighting for productivity</p>
              </div>
              <span className="text-2xl font-bold text-primary">300 lux</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Kitchen</h4>
                <p className="text-sm mt-1">Bright work area lighting</p>
              </div>
              <span className="text-2xl font-bold text-primary">250 lux</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Bathroom</h4>
                <p className="text-sm mt-1">Clear, functional lighting</p>
              </div>
              <span className="text-2xl font-bold text-primary">200 lux</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Hallway</h4>
                <p className="text-sm mt-1">Basic navigation lighting</p>
              </div>
              <span className="text-2xl font-bold text-primary">100 lux</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Lighting Type Efficiency Comparison</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">LED</h4>
            <p className="text-sm text-green-800 mb-2">High Efficiency</p>
            <div className="text-2xl font-bold text-green-600">100 lm/W</div>
            <p className="text-xs text-green-700 mt-2">Most energy-efficient, longest lifespan</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">CFL</h4>
            <p className="text-sm text-blue-800 mb-2">Medium Efficiency</p>
            <div className="text-2xl font-bold text-blue-600">60 lm/W</div>
            <p className="text-xs text-blue-700 mt-2">Moderate efficiency, good lifespan</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Incandescent</h4>
            <p className="text-sm text-orange-800 mb-2">Low Efficiency</p>
            <div className="text-2xl font-bold text-orange-600">15 lm/W</div>
            <p className="text-xs text-orange-700 mt-2">Least efficient, shortest lifespan</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Applications</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Electrical Planning</h4>
            <p className="text-sm text-green-800">
              Calculate total lighting load to properly size circuit breakers, wiring, and electrical panels for safe and efficient operation.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Energy Efficiency</h4>
            <p className="text-sm text-blue-800">
              Compare different lighting types to optimize energy consumption and reduce electricity costs while maintaining adequate illumination.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Cost Estimation</h4>
            <p className="text-sm text-purple-800">
              Estimate monthly and annual electricity costs for lighting to budget accurately and evaluate return on investment for upgrades.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Retrofit Planning</h4>
            <p className="text-sm text-orange-800">
              Plan lighting upgrades by comparing current load with efficient alternatives to maximize energy savings and payback period.
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
              <span><strong>Room Presets:</strong> Quick access to recommended lux levels for different spaces</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Energy Estimation:</strong> Calculate monthly consumption and costs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Fixture Suggestions:</strong> Get recommendations for number of light fixtures needed</span>
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
            When designing lighting systems, always consider task-specific requirements. Areas like kitchen counters, reading nooks, or workbenches may need additional task lighting beyond general ambient levels. LED lighting offers the best energy efficiency and longest lifespan, making it the most cost-effective choice for most applications despite higher upfront costs.
          </p>
        </div>

      </div>
    </div>
  );
}
