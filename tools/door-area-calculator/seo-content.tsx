export default function DoorAreaCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Door Area Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Door Area Calculator</strong> is a professional tool designed for architects, engineers, contractors, and homeowners to calculate door opening areas quickly and accurately. It's essential for material estimation, cost calculation, and construction planning in residential and commercial projects.
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
                <span>Real-time area calculation as you type</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Support for 4 different units (ft, m, cm, inches)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Optional frame margin calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Standard door size presets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Automatic unit conversion display</span>
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
                <span>Material estimation for doors and frames</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Construction cost calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Paint and coating quantity estimation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Architectural planning and design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Building code compliance verification</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How to Use the Calculator</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span><strong>Select Unit:</strong> Choose your preferred measurement unit (feet, meters, centimeters, or inches)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span><strong>Enter Height:</strong> Input the vertical measurement of the door</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Enter Width:</strong> Input the horizontal measurement of the door</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>Optional Frame:</strong> Check "Include Frame Margin" and enter frame thickness if needed</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>View Results:</strong> See the calculated area instantly with unit conversions</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Formula</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Basic Door Area Formula</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Area = Height × Width
              </code>
              <p className="text-sm mt-2">The area of a rectangular door opening is calculated by multiplying its height by its width.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">With Frame Margin</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Area = (Height + 2×Frame) × (Width + 2×Frame)
              </code>
              <p className="text-sm mt-2">When including frame thickness, add twice the frame thickness to both height and width (for both sides).</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Example Calculation</h4>
              <div className="bg-white p-4 rounded border border-gray-200 text-sm space-y-2">
                <p><strong>Door:</strong> 7 ft height × 3 ft width</p>
                <p><strong>Calculation:</strong> 7 × 3 = 21 ft²</p>
                <p className="pt-2 border-t border-gray-300"><strong>Result:</strong> 21 square feet</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Standard Door Sizes</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Standard Interior Door</h4>
            <p className="text-sm mt-1">6.67 ft × 2.67 ft (80 in × 32 in) - Common for bedrooms and bathrooms</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Standard Exterior Door</h4>
            <p className="text-sm mt-1">7 ft × 3 ft (84 in × 36 in) - Main entry door for homes</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Double Door</h4>
            <p className="text-sm mt-1">7 ft × 6 ft (84 in × 72 in) - Wide entry or patio doors</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Closet Door</h4>
            <p className="text-sm mt-1">6.67 ft × 2 ft (80 in × 24 in) - Standard closet opening</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Commercial Door</h4>
            <p className="text-sm mt-1">7 ft × 3.5 ft (84 in × 42 in) - Office or retail entrance</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Garage Door (Single)</h4>
            <p className="text-sm mt-1">7 ft × 9 ft (84 in × 108 in) - Single car garage</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Supported Units</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Linear Units</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Feet (ft)</li>
              <li>• Meters (m)</li>
              <li>• Centimeters (cm)</li>
              <li>• Inches (in)</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Area Units</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Square feet (ft²)</li>
              <li>• Square meters (m²)</li>
              <li>• Square centimeters (cm²)</li>
              <li>• Square inches (in²)</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Applications</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Material Estimation</h4>
            <p className="text-sm text-green-800">
              Calculate the exact amount of wood, glass, or other materials needed for door construction or replacement projects.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Cost Calculation</h4>
            <p className="text-sm text-blue-800">
              Multiply door area by material cost per square unit to get accurate project estimates for budgeting and quotes.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Paint Estimation</h4>
            <p className="text-sm text-purple-800">
              Determine how much paint or coating is needed for door surfaces. Multiply area by coverage rate per gallon.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Building Codes</h4>
            <p className="text-sm text-orange-800">
              Verify door dimensions meet minimum requirements for accessibility, egress, and fire safety regulations.
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
              <span><strong>Multiple Units:</strong> Work with your preferred measurement system</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Frame Support:</strong> Include frame margins for complete calculations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Standard Presets:</strong> Quick access to common door sizes</span>
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
            When ordering materials, always add 10-15% extra to account for waste, cuts, and mistakes. For custom doors or non-standard shapes, break down the design into rectangular sections and calculate each separately.
          </p>
        </div>

      </div>
    </div>
  );
}
