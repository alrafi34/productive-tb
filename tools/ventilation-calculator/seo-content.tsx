export default function VentilationCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Ventilation Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Ventilation Calculator</strong> is a professional HVAC tool designed for architects, engineers, HVAC technicians, and building planners to calculate required airflow for proper ventilation in enclosed spaces. It supports both ACH-based (Air Changes per Hour) and occupancy-based calculations, making it essential for maintaining air quality, temperature control, and occupant comfort.
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
                <span>Two calculation modes: ACH-based and occupancy-based</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Support for CFM, m³/h, and L/s units</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time airflow calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Room type presets with recommended ACH values</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Automatic unit conversions</span>
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
                <span>HVAC system design and sizing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Building code compliance verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Indoor air quality planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Commercial kitchen ventilation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Laboratory and cleanroom design</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How to Use the Calculator</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
          <h4 className="font-semibold text-blue-900 mb-3">Room Volume Mode (ACH-based)</h4>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span><strong>Select Mode:</strong> Choose "Room Volume (ACH)" calculation mode</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span><strong>Enter Dimensions:</strong> Input room length, width, and height</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Set ACH:</strong> Enter or select air changes per hour (use presets for guidance)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>Choose Units:</strong> Select preferred output unit (CFM, m³/h, or L/s)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>View Results:</strong> See required airflow with automatic conversions</span>
            </li>
          </ol>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6">
          <h4 className="font-semibold text-green-900 mb-3">Occupancy Mode</h4>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-green-600 flex-shrink-0">1.</span>
              <span><strong>Select Mode:</strong> Choose "Occupancy-based" calculation mode</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-green-600 flex-shrink-0">2.</span>
              <span><strong>Enter People:</strong> Input number of occupants</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-green-600 flex-shrink-0">3.</span>
              <span><strong>Set Airflow:</strong> Enter airflow per person (typically 8-10 L/s)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-green-600 flex-shrink-0">4.</span>
              <span><strong>View Results:</strong> See total required airflow instantly</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Formulas</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">ACH-Based Formula</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                CFM = (Room Volume in ft³ × ACH) / 60
              </code>
              <p className="text-sm mt-2">This formula calculates airflow based on how many times the entire room air should be replaced per hour.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Occupancy-Based Formula</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Airflow = Number of People × Airflow per Person
              </code>
              <p className="text-sm mt-2">This formula calculates airflow based on the number of occupants and required fresh air per person.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Example Calculation</h4>
              <div className="bg-white p-4 rounded border border-gray-200 text-sm space-y-2">
                <p><strong>Room:</strong> 10 ft × 12 ft × 8 ft = 960 ft³</p>
                <p><strong>ACH:</strong> 6 (office space)</p>
                <p><strong>Calculation:</strong> (960 × 6) / 60 = 96 CFM</p>
                <p className="pt-2 border-t border-gray-300"><strong>Result:</strong> 96 CFM required airflow</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended ACH Values by Room Type</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Storage Room</h4>
                <p className="text-sm mt-1">Low ventilation needs, minimal occupancy</p>
              </div>
              <span className="text-2xl font-bold text-primary">2 ACH</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Residential Room</h4>
                <p className="text-sm mt-1">Living rooms, bedrooms</p>
              </div>
              <span className="text-2xl font-bold text-primary">4 ACH</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Office Space</h4>
                <p className="text-sm mt-1">Standard office environment</p>
              </div>
              <span className="text-2xl font-bold text-primary">6 ACH</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Kitchen / Bathroom</h4>
                <p className="text-sm mt-1">Residential kitchen or bathroom</p>
              </div>
              <span className="text-2xl font-bold text-primary">8 ACH</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Workshop</h4>
                <p className="text-sm mt-1">Light industrial workspace</p>
              </div>
              <span className="text-2xl font-bold text-primary">10 ACH</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Laboratory</h4>
                <p className="text-sm mt-1">Research or testing facility</p>
              </div>
              <span className="text-2xl font-bold text-primary">12 ACH</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Commercial Kitchen</h4>
                <p className="text-sm mt-1">Restaurant or food service</p>
              </div>
              <span className="text-2xl font-bold text-primary">15 ACH</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Unit Conversions</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">CFM</h4>
            <p className="text-sm text-gray-700">Cubic Feet per Minute</p>
            <p className="text-xs text-gray-500 mt-2">Common in US HVAC systems</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">m³/h</h4>
            <p className="text-sm text-gray-700">Cubic Meters per Hour</p>
            <p className="text-xs text-gray-500 mt-2">Standard metric unit</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">L/s</h4>
            <p className="text-sm text-gray-700">Liters per Second</p>
            <p className="text-xs text-gray-500 mt-2">Used in building codes</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Conversion Factors</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 1 CFM = 1.699 m³/h</li>
            <li>• 1 L/s = 2.118 CFM</li>
            <li>• 1 m³/h = 0.589 CFM</li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Applications</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">HVAC System Design</h4>
            <p className="text-sm text-green-800">
              Calculate required fan capacity and duct sizing for new HVAC installations or system upgrades.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Building Code Compliance</h4>
            <p className="text-sm text-blue-800">
              Verify ventilation meets minimum requirements for health, safety, and building regulations.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Indoor Air Quality</h4>
            <p className="text-sm text-purple-800">
              Ensure adequate fresh air supply to maintain healthy CO2 levels and reduce pollutants.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Energy Efficiency</h4>
            <p className="text-sm text-orange-800">
              Optimize ventilation rates to balance air quality with heating and cooling costs.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Results:</strong> Real-time calculations as you enter values</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Multiple Methods:</strong> Choose between ACH-based or occupancy-based calculations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Unit Flexibility:</strong> Work with CFM, m³/h, or L/s</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Room Presets:</strong> Quick access to recommended ACH values</span>
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
            When designing ventilation systems, always consider local building codes and specific requirements for your space type. For commercial kitchens, laboratories, or industrial spaces, consult with HVAC professionals to ensure compliance with safety regulations and optimal performance.
          </p>
        </div>

      </div>
    </div>
  );
}
