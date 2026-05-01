export default function StepRiseRunCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Step Rise and Run Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Step Rise and Run Calculator</strong> is a professional tool designed for architects, engineers, builders, and DIY enthusiasts to calculate optimal staircase dimensions. It computes the rise (vertical height per step), run (horizontal depth), number of steps, and total stair length while ensuring compliance with ergonomic standards and building codes.
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
                <span>Real-time calculation with instant results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Multiple calculation modes (auto, fixed rise, fixed run)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Automatic comfort formula validation (2R + T ≈ 63cm)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Visual staircase diagram with angle display</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Support for cm and inches units</span>
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
                <span>Residential staircase design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Commercial building planning</span>
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

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How to Use the Calculator</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span><strong>Select Calculation Mode:</strong> Choose auto, fixed rise, or fixed run mode</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span><strong>Enter Total Height:</strong> Input the vertical distance from floor to floor</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Set Parameters:</strong> Enter desired rise, run, or total run as needed</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>Review Results:</strong> Check calculated steps, dimensions, and comfort status</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>Verify Comfort:</strong> Ensure the 2R + T formula is within acceptable range</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Formulas</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Comfort Formula</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                2 × Rise + Run ≈ 63 cm (or 25 inches)
              </code>
              <p className="text-sm mt-2">This ergonomic rule ensures comfortable and safe staircase design. The formula relates the rise and run to create stairs that are easy to climb.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Number of Steps</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Steps = round(Total Height / Desired Rise)
              </code>
              <p className="text-sm mt-2">Calculates how many steps are needed based on the total height and desired rise per step.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Actual Rise</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Actual Rise = Total Height / Number of Steps
              </code>
              <p className="text-sm mt-2">Determines the precise height of each step for uniform dimensions.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Stair Angle</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Angle = arctan(Rise / Run) × (180 / π)
              </code>
              <p className="text-sm mt-2">Calculates the slope angle of the staircase in degrees.</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Calculation Modes</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Auto Calculate</h4>
            <p className="text-sm text-gray-700">
              Automatically determines the optimal number of steps based on total height and desired rise. The calculator adjusts run to meet comfort standards.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Fixed Rise</h4>
            <p className="text-sm text-gray-700">
              Locks the rise per step and calculates the run needed to maintain comfortable proportions. Useful when rise is constrained by design.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Fixed Run</h4>
            <p className="text-sm text-gray-700">
              Locks the run per step and calculates the rise needed. Ideal when horizontal space is limited or predetermined.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Design Guidelines</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Ideal Dimensions</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Rise: 15-18 cm (6-7 inches)</li>
              <li>• Run: 25-30 cm (10-12 inches)</li>
              <li>• Comfort Formula: 63 cm (25 inches)</li>
              <li>• Angle: 30-35 degrees</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">Safety Limits</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Max Rise: 20 cm (8 inches)</li>
              <li>• Min Run: 22 cm (9 inches)</li>
              <li>• Min Steps: 2</li>
              <li>• Max Angle: 42 degrees</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Common Staircase Types</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Standard Residential</h4>
            <p className="text-sm mt-1">Height: 300cm, Rise: 17cm - Typical home staircase with comfortable dimensions for daily use.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Commercial Building</h4>
            <p className="text-sm mt-1">Height: 320cm, Rise: 16cm - Designed for high traffic with gentler slope and wider treads.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Steep Staircase</h4>
            <p className="text-sm mt-1">Height: 280cm, Rise: 18cm - Space-saving design with steeper angle for limited spaces.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900">Comfortable Staircase</h4>
            <p className="text-sm mt-1">Height: 300cm, Rise: 15cm - Easy-to-climb design with lower risers for accessibility.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Calculations:</strong> Get accurate results in real-time as you adjust parameters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Multiple Modes:</strong> Choose the calculation method that fits your design constraints</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Visual Feedback:</strong> See a diagram of your staircase design with angle display</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Ergonomic Validation:</strong> Automatic comfort formula checking ensures safe designs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Professional Tool:</strong> Used by architects, engineers, and construction professionals worldwide</span>
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
