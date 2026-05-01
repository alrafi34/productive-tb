export default function AirChangeRateCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Air Change Rate Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Air Change Rate Calculator</strong> is a professional HVAC tool designed for engineers, architects, and facility managers to calculate air changes per hour (ACH). ACH is a critical metric for ventilation design, indoor air quality management, and building code compliance. This calculator provides instant, accurate results with support for multiple unit systems.
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
                <span>Two input modes: dimensions or direct volume</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time ACH calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Support for metric and imperial units</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Visual ACH level indicator</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>ACH reference guide for different spaces</span>
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
                <span>HVAC system design and verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Indoor air quality assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Building code compliance checking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Ventilation system optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Energy efficiency analysis</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How to Use the Calculator</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
          <h4 className="font-semibold text-blue-900 mb-3">Method 1: Calculate from Dimensions</h4>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span><strong>Select Mode:</strong> Choose "Calculate from Dimensions"</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span><strong>Enter Dimensions:</strong> Input room length, width, and height</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Enter Airflow:</strong> Input the airflow rate</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>Select Units:</strong> Choose appropriate units for dimensions and airflow</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>View Results:</strong> See ACH value instantly with ventilation level</span>
            </li>
          </ol>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6">
          <h4 className="font-semibold text-green-900 mb-3">Method 2: Calculate from Volume</h4>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-green-600 flex-shrink-0">1.</span>
              <span><strong>Select Mode:</strong> Choose "Calculate from Volume"</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-green-600 flex-shrink-0">2.</span>
              <span><strong>Enter Volume:</strong> Input the room volume directly</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-green-600 flex-shrink-0">3.</span>
              <span><strong>Enter Airflow:</strong> Input the airflow rate</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-green-600 flex-shrink-0">4.</span>
              <span><strong>View Results:</strong> See ACH value with ventilation assessment</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Formula</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">ACH Formula</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                ACH = Airflow Rate (m³/h) / Room Volume (m³)
              </code>
              <p className="text-sm mt-2">Air Changes per Hour represents how many times the entire volume of air in a space is replaced in one hour.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Volume Calculation</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Volume = Length × Width × Height
              </code>
              <p className="text-sm mt-2">When using dimensions mode, the calculator first computes the room volume.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Example Calculation</h4>
              <div className="bg-white p-4 rounded border border-gray-200 text-sm space-y-2">
                <p><strong>Room:</strong> 10m × 5m × 3m = 150 m³</p>
                <p><strong>Airflow:</strong> 300 m³/h</p>
                <p><strong>Calculation:</strong> 300 ÷ 150 = 2 ACH</p>
                <p className="pt-2 border-t border-gray-300"><strong>Result:</strong> 2 air changes per hour (Low - Residential)</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">ACH Requirements by Space Type</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Residential Spaces</h4>
                <p className="text-sm mt-1">Living rooms, bedrooms, general areas</p>
              </div>
              <span className="text-2xl font-bold text-orange-500">0.5-2 ACH</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Offices & Classrooms</h4>
                <p className="text-sm mt-1">Commercial offices, educational spaces</p>
              </div>
              <span className="text-2xl font-bold text-green-500">2-6 ACH</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Hospitals & Laboratories</h4>
                <p className="text-sm mt-1">Medical facilities, research labs, commercial kitchens</p>
              </div>
              <span className="text-2xl font-bold text-blue-500">6-15 ACH</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Cleanrooms & Industrial</h4>
                <p className="text-sm mt-1">Controlled environments, manufacturing</p>
              </div>
              <span className="text-2xl font-bold text-purple-500">15+ ACH</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Supported Units</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Dimensions</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Meters (m)</li>
              <li>• Feet (ft)</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Volume</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Cubic meters (m³)</li>
              <li>• Cubic feet (ft³)</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Airflow</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• m³/h (Cubic meters/hour)</li>
              <li>• CFM (Cubic feet/minute)</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Conversion Factors</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 1 CFM = 1.699 m³/h</li>
            <li>• 1 ft³ = 0.0283168 m³</li>
            <li>• 1 ft = 0.3048 m</li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Applications</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">HVAC Design</h4>
            <p className="text-sm text-green-800">
              Calculate required ventilation rates for new HVAC installations or verify existing system performance against design specifications.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Code Compliance</h4>
            <p className="text-sm text-blue-800">
              Ensure ventilation systems meet minimum building code requirements for health, safety, and occupant comfort.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Air Quality Management</h4>
            <p className="text-sm text-purple-800">
              Assess and optimize indoor air quality by ensuring adequate air exchange rates to remove pollutants and maintain fresh air.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Energy Optimization</h4>
            <p className="text-sm text-orange-800">
              Balance ventilation requirements with energy efficiency by calculating optimal ACH rates for different space types.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Results:</strong> Real-time ACH calculation as you enter values</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Flexible Input:</strong> Choose between dimensions or direct volume entry</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Unit Conversion:</strong> Automatic conversion between metric and imperial units</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Visual Feedback:</strong> Color-coded ACH levels and reference guide</span>
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
            When designing ventilation systems, always consider local building codes and specific requirements for your space type. For critical environments like hospitals, laboratories, or cleanrooms, consult with HVAC professionals to ensure compliance with industry standards and regulations. ACH requirements can vary significantly based on occupancy, activities, and local climate conditions.
          </p>
        </div>

      </div>
    </div>
  );
}
