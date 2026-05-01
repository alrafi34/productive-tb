export default function HVACLoadCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the HVAC Load Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>HVAC Load Calculator</strong> is a professional tool designed for architects, HVAC engineers, contractors, and building designers to estimate heating and cooling load requirements for rooms and buildings. It helps calculate BTU/hr, kW, and AC tonnage based on room dimensions, insulation quality, occupancy, climate, and environmental factors.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">❄️</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time cooling load calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Multiple unit support (BTU, kW, Tons)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Room presets for quick calculations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Detailed load breakdown view</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>AC tonnage recommendations</span>
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
                <span>AC unit selection and installation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Building energy analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Construction planning and budgeting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Retrofit and upgrade planning</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How to Use the Calculator</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span><strong>Enter Room Dimensions:</strong> Input length, width, and height in feet or meters</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span><strong>Set Environmental Factors:</strong> Choose insulation quality, number of occupants, windows, sun exposure, and equipment load</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Select Climate Zone:</strong> Choose cool, moderate, or hot climate</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>View Results:</strong> See total cooling load in BTU/hr, kW, and recommended AC tonnage</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>Review Breakdown:</strong> Check detailed load breakdown to understand contributing factors</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Formula</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 1: Calculate Base Load</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Base Load = Room Area (sq ft) × 20 BTU/sq ft
              </code>
              <p className="text-sm mt-2">The base load represents the fundamental cooling requirement for the space.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 2: Add Occupant Load</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Occupant Load = Number of People × 600 BTU/person
              </code>
              <p className="text-sm mt-2">Each person generates approximately 600 BTU/hr of heat.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 3: Add Window Load</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Window Load = Few (1,000 BTU) or Many (2,000 BTU)
              </code>
              <p className="text-sm mt-2">Windows allow heat gain from solar radiation and outdoor temperature.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 4: Add Equipment Load</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Equipment Load = Moderate (1,000 BTU) or High (2,500 BTU)
              </code>
              <p className="text-sm mt-2">Electronic devices and appliances generate heat during operation.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 5: Apply Adjustment Factors</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Total Load = (Base + Occupant + Window + Equipment) × Insulation Factor × Climate Factor
              </code>
              <p className="text-sm mt-2">Insulation and climate factors adjust the total load based on building characteristics.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Example Calculation</h4>
              <div className="bg-white p-4 rounded border border-gray-200 text-sm space-y-2">
                <p><strong>Room:</strong> 12 ft × 10 ft = 120 sq ft</p>
                <p><strong>Occupants:</strong> 2 people</p>
                <p><strong>Windows:</strong> Few (1-2)</p>
                <p><strong>Equipment:</strong> Moderate</p>
                <p><strong>Base Load:</strong> 120 × 20 = 2,400 BTU</p>
                <p><strong>Occupant Load:</strong> 2 × 600 = 1,200 BTU</p>
                <p><strong>Window Load:</strong> 1,000 BTU</p>
                <p><strong>Equipment Load:</strong> 1,000 BTU</p>
                <p><strong>Subtotal:</strong> 5,600 BTU</p>
                <p><strong>After Adjustments:</strong> ~6,000-7,000 BTU/hr</p>
                <p className="pt-2 border-t border-gray-300"><strong>Recommended AC:</strong> 0.5 Ton (6,000 BTU/hr)</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Insulation Quality Impact</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Poor Insulation</h4>
                <p className="text-sm mt-1">Old buildings, minimal insulation</p>
              </div>
              <span className="text-2xl font-bold text-red-600">+20%</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Average Insulation</h4>
                <p className="text-sm mt-1">Standard construction, moderate insulation</p>
              </div>
              <span className="text-2xl font-bold text-orange-600">+10%</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Good Insulation</h4>
                <p className="text-sm mt-1">Modern construction, excellent insulation</p>
              </div>
              <span className="text-2xl font-bold text-green-600">0%</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Climate Zone Factors</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Cool Climate</h4>
            <p className="text-sm text-blue-800 mb-2">Mild temperatures, less cooling needed</p>
            <div className="text-2xl font-bold text-blue-600">+0%</div>
            <p className="text-xs text-blue-700 mt-2">Northern regions, moderate summers</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Moderate Climate</h4>
            <p className="text-sm text-orange-800 mb-2">Average temperatures, standard cooling</p>
            <div className="text-2xl font-bold text-orange-600">+10%</div>
            <p className="text-xs text-orange-700 mt-2">Temperate zones, warm summers</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">Hot Climate</h4>
            <p className="text-sm text-red-800 mb-2">High temperatures, maximum cooling</p>
            <div className="text-2xl font-bold text-red-600">+20%</div>
            <p className="text-xs text-red-700 mt-2">Tropical regions, hot summers</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">AC Tonnage Guide</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold">1 Ton AC</span>
              <span className="text-sm">= 12,000 BTU/hr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold">1.5 Ton AC</span>
              <span className="text-sm">= 18,000 BTU/hr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold">2 Ton AC</span>
              <span className="text-sm">= 24,000 BTU/hr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold">2.5 Ton AC</span>
              <span className="text-sm">= 30,000 BTU/hr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold">3 Ton AC</span>
              <span className="text-sm">= 36,000 BTU/hr</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Applications</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">HVAC System Design</h4>
            <p className="text-sm text-green-800">
              Calculate accurate cooling loads to properly size HVAC systems, ensuring optimal comfort and energy efficiency without oversizing or undersizing equipment.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">AC Unit Selection</h4>
            <p className="text-sm text-blue-800">
              Determine the right AC tonnage for residential and commercial spaces to avoid inefficient operation, high energy costs, and inadequate cooling performance.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Energy Analysis</h4>
            <p className="text-sm text-purple-800">
              Estimate cooling requirements for energy modeling and building performance analysis to optimize system efficiency and reduce operational costs.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Construction Planning</h4>
            <p className="text-sm text-orange-800">
              Plan HVAC installations during construction or renovation projects with accurate load calculations for proper equipment procurement and budgeting.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Results:</strong> Real-time calculation as you adjust parameters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Room Presets:</strong> Quick access to common room configurations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Detailed Breakdown:</strong> Understand how each factor contributes to total load</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>AC Recommendations:</strong> Get specific tonnage suggestions for your space</span>
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
            When sizing HVAC systems, avoid oversizing as it leads to short cycling, poor humidity control, and increased energy costs. A properly sized system runs longer cycles, maintains better comfort, and operates more efficiently. Consider factors like ceiling height, window orientation, and local climate conditions for the most accurate results. For critical applications, always consult with a licensed HVAC professional to verify calculations and ensure compliance with local building codes.
          </p>
        </div>

      </div>
    </div>
  );
}
