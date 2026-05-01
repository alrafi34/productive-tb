export default function WindowAreaCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Window Area Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Window Area Calculator</strong> is a professional tool designed for architects, engineers, contractors, and homeowners to calculate the total area of one or multiple windows quickly and accurately. It's essential for material estimation, cost calculation, ventilation planning, and energy efficiency analysis.
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
                <span>Calculate multiple windows simultaneously</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time area calculation as you type</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Support for 5 different units (mm, cm, m, inches, ft)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Dynamic window addition and removal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Export results to text or CSV format</span>
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
                <span>Glass and frame material estimation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Construction cost calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Ventilation and lighting analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>HVAC load calculations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Energy efficiency planning</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How to Use the Calculator</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span><strong>Select Unit:</strong> Choose your preferred measurement unit (mm, cm, m, inches, or feet)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span><strong>Enter Dimensions:</strong> Input the width and height for each window</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Add More Windows:</strong> Click "Add Window" to calculate multiple windows</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>View Results:</strong> See individual and total areas calculated instantly</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>Export Data:</strong> Download results as text or CSV for your records</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Formula</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Window Area Formula</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Area = Width × Height
              </code>
              <p className="text-sm mt-2">The area of a rectangular window is calculated by multiplying its width by its height.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Total Area</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Total Area = Sum of all window areas
              </code>
              <p className="text-sm mt-2">When calculating multiple windows, the total area is the sum of all individual window areas.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Example Calculation</h4>
              <div className="bg-white p-4 rounded border border-gray-200 text-sm space-y-2">
                <p><strong>Window 1:</strong> 4 ft × 3 ft = 12 ft²</p>
                <p><strong>Window 2:</strong> 5 ft × 4 ft = 20 ft²</p>
                <p className="pt-2 border-t border-gray-300"><strong>Total Area:</strong> 12 + 20 = 32 ft²</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Supported Units</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Metric Units</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Millimeters (mm)</li>
              <li>• Centimeters (cm)</li>
              <li>• Meters (m)</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Imperial Units</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Inches (in)</li>
              <li>• Feet (ft)</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Area Units</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• mm², cm², m²</li>
              <li>• in², ft²</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Window Sizes</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Standard Single Window</h4>
            <p className="text-sm mt-1">3 ft × 4 ft (36 in × 48 in) = 12 ft² - Common for bedrooms and living rooms</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Double Window</h4>
            <p className="text-sm mt-1">6 ft × 4 ft (72 in × 48 in) = 24 ft² - Popular for living rooms and dining areas</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Picture Window</h4>
            <p className="text-sm mt-1">8 ft × 5 ft (96 in × 60 in) = 40 ft² - Large windows for maximum light</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Bathroom Window</h4>
            <p className="text-sm mt-1">2 ft × 2 ft (24 in × 24 in) = 4 ft² - Small windows for privacy</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Applications</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Material Estimation</h4>
            <p className="text-sm text-green-800">
              Calculate the exact amount of glass, frames, and sealing materials needed for your project. Helps prevent over-ordering or shortages.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Cost Calculation</h4>
            <p className="text-sm text-blue-800">
              Multiply total window area by material cost per square unit to get accurate project estimates for budgeting and quotes.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Energy Efficiency</h4>
            <p className="text-sm text-purple-800">
              Calculate window-to-wall ratio for building codes and energy efficiency standards. Important for LEED certification.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Ventilation Planning</h4>
            <p className="text-sm text-orange-800">
              Determine if window area meets minimum ventilation requirements for building codes (typically 8-10% of floor area).
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Results:</strong> Get real-time calculations as you enter dimensions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Multiple Windows:</strong> Calculate unlimited windows in a single session</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Flexible Units:</strong> Work with your preferred measurement system</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Export Options:</strong> Download results for documentation and sharing</span>
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
            For irregular or non-rectangular windows, break them down into rectangular sections and calculate each section separately. Add all sections together for the total area. For circular or arched windows, use specialized formulas or consult with a professional.
          </p>
        </div>

      </div>
    </div>
  );
}
