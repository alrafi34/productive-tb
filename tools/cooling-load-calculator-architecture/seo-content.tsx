export default function CoolingLoadCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Cooling Load Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Cooling Load Calculator</strong> is a professional tool designed for architects, HVAC engineers, contractors, and building designers to estimate cooling capacity requirements for rooms and buildings. It helps calculate BTU/hr and AC tonnage based on room dimensions, occupancy, sun exposure, insulation quality, and equipment loads.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🧊</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time cooling load calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>BTU/hr and AC tonnage conversion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Room presets for quick calculations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Detailed load breakdown analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>AC unit recommendations</span>
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
                <span>Air conditioning unit selection</span>
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
                <span>Home renovation projects</span>
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
              <span><strong>Set Occupancy:</strong> Enter the number of people who will use the space</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Configure Environment:</strong> Select sun exposure, insulation quality, and equipment load</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>Add Windows:</strong> Specify the number of windows in the room</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>View Results:</strong> See cooling load in BTU/hr, tonnage, and AC recommendations</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Calculation</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 1: Base Cooling Load</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Base Load = Room Area (sq ft) × 20 BTU/sq ft
              </code>
              <p className="text-sm mt-2">The fundamental cooling requirement based on room size.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 2: Occupancy Load</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Occupancy Load = (People - 1) × 600 BTU/person
              </code>
              <p className="text-sm mt-2">Additional load for each person beyond the first (included in base load).</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 3: Equipment and Window Load</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Additional Load = Equipment BTU + (Windows × 500 BTU)
              </code>
              <p className="text-sm mt-2">Heat generated by electronics and solar gain through windows.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 4: Environmental Adjustments</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Final Load = Subtotal × Sunlight Factor × Insulation Factor
              </code>
              <p className="text-sm mt-2">Adjustments based on sun exposure and building insulation quality.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Example Calculation</h4>
              <div className="bg-white p-4 rounded border border-gray-200 text-sm space-y-2">
                <p><strong>Room:</strong> 12 ft × 10 ft = 120 sq ft</p>
                <p><strong>Occupants:</strong> 2 people</p>
                <p><strong>Windows:</strong> 1</p>
                <p><strong>Equipment:</strong> Low (TV)</p>
                <p><strong>Base Load:</strong> 120 × 20 = 2,400 BTU</p>
                <p><strong>Occupancy:</strong> (2-1) × 600 = 600 BTU</p>
                <p><strong>Equipment:</strong> 500 BTU</p>
                <p><strong>Windows:</strong> 1 × 500 = 500 BTU</p>
                <p><strong>Subtotal:</strong> 4,000 BTU</p>
                <p><strong>Sun (Medium):</strong> 4,000 × 1.20 = 4,800 BTU</p>
                <p><strong>Insulation (Average):</strong> 4,800 × 1.00 = 4,800 BTU</p>
                <p className="pt-2 border-t border-gray-300"><strong>Final Load:</strong> 4,800 BTU/hr (0.4 Tons)</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Sun Exposure Impact</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Low (Shaded)</h4>
                <p className="text-sm mt-1">North-facing, trees, overhangs</p>
              </div>
              <span className="text-2xl font-bold text-green-600">+10%</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Medium</h4>
                <p className="text-sm mt-1">East/West facing, partial shade</p>
              </div>
              <span className="text-2xl font-bold text-orange-600">+20%</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">High (Direct Sunlight)</h4>
                <p className="text-sm mt-1">South-facing, no shade, large windows</p>
              </div>
              <span className="text-2xl font-bold text-red-600">+30%</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Insulation Quality Effects</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">Poor Insulation</h4>
            <p className="text-sm text-red-800 mb-2">Old buildings, minimal insulation</p>
            <div className="text-2xl font-bold text-red-600">+15%</div>
            <p className="text-xs text-red-700 mt-2">Higher cooling load required</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Average Insulation</h4>
            <p className="text-sm text-gray-800 mb-2">Standard construction</p>
            <div className="text-2xl font-bold text-gray-600">0%</div>
            <p className="text-xs text-gray-700 mt-2">Baseline cooling load</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Good Insulation</h4>
            <p className="text-sm text-green-800 mb-2">Modern, well-insulated</p>
            <div className="text-2xl font-bold text-green-600">-10%</div>
            <p className="text-xs text-green-700 mt-2">Reduced cooling load</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Equipment Load Categories</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">None</h4>
                <p className="text-sm mt-1">No electronic devices</p>
              </div>
              <span className="text-lg font-bold text-gray-600">0 BTU</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Low</h4>
                <p className="text-sm mt-1">TV, small devices, minimal electronics</p>
              </div>
              <span className="text-lg font-bold text-blue-600">+500 BTU</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">Medium</h4>
                <p className="text-sm mt-1">Multiple electronics, gaming systems</p>
              </div>
              <span className="text-lg font-bold text-orange-600">+1,000 BTU</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">High</h4>
                <p className="text-sm mt-1">Office equipment, servers, heavy electronics</p>
              </div>
              <span className="text-lg font-bold text-red-600">+2,000 BTU</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">AC Tonnage Reference</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold">0.5 Ton AC</span>
              <span className="text-sm">6,000 BTU/hr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold">1 Ton AC</span>
              <span className="text-sm">12,000 BTU/hr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold">1.5 Ton AC</span>
              <span className="text-sm">18,000 BTU/hr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold">2 Ton AC</span>
              <span className="text-sm">24,000 BTU/hr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <span className="font-semibold">3 Ton AC</span>
              <span className="text-sm">36,000 BTU/hr</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Load Intensity Levels</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Low Load (&lt; 6,000 BTU)</h4>
            <p className="text-sm text-green-800">
              Small rooms, minimal occupancy, good insulation. Window AC units are typically sufficient.
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">Medium Load (6,000-12,000 BTU)</h4>
            <p className="text-sm text-yellow-800">
              Standard residential rooms, moderate occupancy. Split AC systems work well.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">High Load (12,000-24,000 BTU)</h4>
            <p className="text-sm text-orange-800">
              Large rooms, high occupancy, or poor insulation. Central AC or multiple units needed.
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">Very High Load (&gt; 24,000 BTU)</h4>
            <p className="text-sm text-red-800">
              Commercial spaces, server rooms, or large areas. Commercial-grade systems required.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Applications</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">HVAC System Design</h4>
            <p className="text-sm text-green-800">
              Calculate accurate cooling loads for proper HVAC system sizing, ensuring optimal comfort and energy efficiency.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">AC Unit Selection</h4>
            <p className="text-sm text-blue-800">
              Choose the right air conditioning unit size to avoid oversizing (inefficient) or undersizing (inadequate cooling).
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Energy Analysis</h4>
            <p className="text-sm text-purple-800">
              Estimate cooling requirements for building energy modeling and performance optimization.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Construction Planning</h4>
            <p className="text-sm text-orange-800">
              Plan HVAC installations during construction with accurate load calculations for equipment procurement.
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
              <span><strong>Detailed Breakdown:</strong> Understand how each factor affects cooling load</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>AC Recommendations:</strong> Get specific unit suggestions for your space</span>
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
            When selecting AC units, avoid oversizing as it leads to short cycling, poor humidity control, and higher energy costs. A properly sized system runs longer cycles and maintains better comfort. Consider factors like ceiling height, window orientation, and local climate conditions. For critical applications, always consult with licensed HVAC professionals to verify calculations and ensure compliance with local building codes.
          </p>
        </div>

      </div>
    </div>
  );
}