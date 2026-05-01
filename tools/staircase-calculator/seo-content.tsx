export default function StaircaseCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Staircase Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Staircase Calculator</strong> is a precision tool designed for architects, engineers, construction professionals, and DIY builders to calculate optimal staircase dimensions. It computes the number of steps, riser height, tread depth, total run, and stair angle while ensuring compliance with ergonomic standards and building regulations.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📐</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time calculation of riser height and tread depth</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Automatic comfort formula validation (2R + T ≈ 600-650mm)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Visual staircase diagram with step visualization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Support for multiple units (mm, cm, inches)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Calculation history and export options</span>
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
                <span>Residential staircase design and planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Commercial building stair specifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Building code compliance verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Construction material estimation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>DIY home renovation projects</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How to Use the Staircase Calculator</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span><strong>Enter Total Height:</strong> Input the vertical distance from floor to floor (e.g., 3000mm)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span><strong>Set Max Riser Height:</strong> Specify the maximum height for each step (typically 150-180mm)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Define Tread Depth:</strong> Enter the desired depth of each step (typically 240-300mm)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>Review Results:</strong> Check the calculated number of steps, actual dimensions, and comfort status</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>Verify Comfort:</strong> Ensure the 2R + T formula falls within the 600-650mm comfortable range</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Staircase Formulas</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Number of Risers</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Number of Risers = ceil(Total Height / Max Riser Height)
              </code>
              <p className="text-sm mt-2">Determines how many steps are needed based on the total height and maximum riser height.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Actual Riser Height</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Actual Riser = Total Height / Number of Risers
              </code>
              <p className="text-sm mt-2">Calculates the precise height of each step for uniform dimensions.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Comfort Formula</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                2 × Riser Height + Tread Depth ≈ 600-650 mm
              </code>
              <p className="text-sm mt-2">Ergonomic rule ensuring comfortable and safe staircase design.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Stair Angle</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Angle = arctan(Riser / Tread) × (180 / π)
              </code>
              <p className="text-sm mt-2">Calculates the slope angle of the staircase in degrees.</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Building Code Guidelines</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Residential Standards</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Max Riser: 180-200mm</li>
              <li>• Min Tread: 240-250mm</li>
              <li>• Min Width: 900mm</li>
              <li>• Headroom: 2000mm min</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Commercial Standards</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Max Riser: 175mm</li>
              <li>• Min Tread: 280mm</li>
              <li>• Min Width: 1100mm</li>
              <li>• Headroom: 2100mm min</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Staircase Types</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Standard Residential</h4>
            <p className="text-sm mt-1">Typical home staircase with comfortable dimensions for daily use.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Commercial Building</h4>
            <p className="text-sm mt-1">Designed for high traffic with wider treads and lower risers.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Steep Staircase</h4>
            <p className="text-sm mt-1">Space-saving design with steeper angle, suitable for limited spaces.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Comfortable Staircase</h4>
            <p className="text-sm mt-1">Easy-to-climb design with lower risers and deeper treads.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Results:</strong> Get accurate calculations in real-time as you adjust parameters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Code Compliance:</strong> Ensures your design meets ergonomic and safety standards</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Visual Feedback:</strong> See a diagram of your staircase design instantly</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Professional Tool:</strong> Used by architects, engineers, and construction professionals</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Free & Accessible:</strong> No registration required, works entirely in your browser</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            Important Note
          </h4>
          <p className="text-sm text-yellow-800">
            This calculator provides estimates based on standard formulas and ergonomic guidelines. Always consult local building codes and regulations, and work with licensed professionals for final staircase design and construction. Building codes vary by location and building type.
          </p>
        </div>

      </div>
    </div>
  );
}
