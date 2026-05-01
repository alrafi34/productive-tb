export default function ExcavationVolumeCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Excavation Volume Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Excavation Volume Calculator</strong> is a comprehensive tool designed to help civil engineers, contractors, architects, and construction professionals calculate the volume of earth to be excavated for various construction projects. Whether you're planning a foundation, digging a trench, or creating a circular pit, this calculator provides instant, accurate volume estimates with automatic unit conversion and cost estimation features.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">⛏️</span>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Multiple excavation shapes (rectangular, trench, circular)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Unit conversion (meters ↔ feet)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Automatic cubic yards conversion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Truck load estimation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Cost estimation tools</span>
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
                <span>Foundation excavation planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Utility trench calculations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Basement excavation estimates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Landscaping and grading projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Cost estimation and bidding</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Excavation Volume Formulas</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Rectangular Excavation</h4>
            <p className="text-sm text-blue-800 mb-2">
              For rectangular foundations, basements, or pits, multiply length by width by depth.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-blue-300 text-xs block mt-2">
              Volume = Length × Width × Depth
            </code>
            <div className="text-xs text-blue-700 mt-2">
              Example: 10m × 5m × 2m = 100 m³
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Trench Excavation</h4>
            <p className="text-sm text-green-800 mb-2">
              Trenches use the same formula as rectangular excavations but typically have smaller widths.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-green-300 text-xs block mt-2">
              Volume = Length × Width × Depth
            </code>
            <div className="text-xs text-green-700 mt-2">
              Example: 30m × 0.6m × 1.2m = 21.6 m³
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Circular Pit Excavation</h4>
            <p className="text-sm text-orange-800 mb-2">
              For circular pits, tanks, or wells, use the circular area formula multiplied by depth.
            </p>
            <code className="bg-white px-3 py-1 rounded border border-orange-300 text-xs block mt-2">
              Volume = π × Radius² × Depth
            </code>
            <div className="text-xs text-orange-700 mt-2">
              Example: π × 3² × 2 = 56.55 m³
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Excavation Types</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Rectangular</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Building foundations</li>
              <li>• Basements</li>
              <li>• Swimming pools</li>
              <li>• Storage pits</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Trench</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Utility lines</li>
              <li>• Drainage systems</li>
              <li>• Cable installation</li>
              <li>• Pipe laying</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Circular Pit</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Water tanks</li>
              <li>• Septic systems</li>
              <li>• Wells</li>
              <li>• Inspection pits</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Unit Conversions</h3>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6">
          <p className="text-gray-700 mb-4">
            The calculator automatically converts between different volume units for your convenience:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">Cubic Meters (m³):</span>
              <span>Standard metric unit for excavation volume</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">Cubic Feet (ft³):</span>
              <span>Imperial unit, 1 m³ = 35.315 ft³</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold">Cubic Yards (yd³):</span>
              <span>Common in US construction, 1 m³ = 1.308 yd³</span>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Examples</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 1: House Foundation</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Scenario:</strong> Rectangular foundation for a small house</p>
              <p><strong>Dimensions:</strong> Length 10m, Width 8m, Depth 1.5m</p>
              <p><strong>Calculation:</strong> 10 × 8 × 1.5 = 120 m³</p>
              <p><strong>Truck Loads:</strong> 12 trucks (10m³ capacity)</p>
              <p className="text-primary font-semibold pt-2"><strong>Volume:</strong> 120 cubic meters</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 2: Utility Trench</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Scenario:</strong> Water line installation trench</p>
              <p><strong>Dimensions:</strong> Length 30m, Width 0.6m, Depth 1.2m</p>
              <p><strong>Calculation:</strong> 30 × 0.6 × 1.2 = 21.6 m³</p>
              <p><strong>Truck Loads:</strong> 3 trucks (10m³ capacity)</p>
              <p className="text-primary font-semibold pt-2"><strong>Volume:</strong> 21.6 cubic meters</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Example 3: Circular Water Tank</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Scenario:</strong> Underground water storage tank</p>
              <p><strong>Dimensions:</strong> Radius 3m, Depth 3m</p>
              <p><strong>Calculation:</strong> π × 3² × 3 = 84.82 m³</p>
              <p><strong>Truck Loads:</strong> 9 trucks (10m³ capacity)</p>
              <p className="text-primary font-semibold pt-2"><strong>Volume:</strong> 84.82 cubic meters</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Excavation Cost Factors</h3>
        
        <div className="space-y-3 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Soil Type</h4>
            <p className="text-sm text-gray-700">
              Different soil types require different excavation efforts. Clay is harder to excavate than sandy soil, affecting both time and cost.
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Sand/Gravel: $10-15/m³</li>
              <li>• Loam/Topsoil: $12-18/m³</li>
              <li>• Clay: $15-25/m³</li>
              <li>• Rock: $30-50/m³ (may require blasting)</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Site Access</h4>
            <p className="text-sm text-gray-700">
              Easy access allows larger equipment, reducing costs. Restricted access may require smaller equipment or manual labor, increasing costs by 20-50%.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Disposal Requirements</h4>
            <p className="text-sm text-gray-700">
              Soil disposal or hauling adds $5-15/m³ depending on distance to disposal site and local regulations.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Depth & Shoring</h4>
            <p className="text-sm text-gray-700">
              Excavations deeper than 1.5m typically require shoring or sloping for safety, adding 15-30% to costs.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Soil Weight & Truck Loads</h3>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Typical Soil Weights</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold">Loose Soil:</span>
              <span>1.2-1.4 tons/m³ (freshly excavated)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold">Compact Soil:</span>
              <span>1.6-1.8 tons/m³ (undisturbed)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold">Clay:</span>
              <span>1.8-2.0 tons/m³</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-600 font-bold">Rock:</span>
              <span>2.5-3.0 tons/m³</span>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-white rounded-lg border border-yellow-300">
            <p className="text-sm text-gray-700">
              <strong>Truck Capacity:</strong> Standard dump trucks typically carry 10-15 m³ or 15-20 tons of soil.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Safety Considerations</h3>
        
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 mb-6">
          <h4 className="font-semibold text-red-900 mb-3">Important Safety Requirements</h4>
          <ul className="space-y-2 text-red-800 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-red-600">⚠️</span>
              <span><strong>Utility Location:</strong> Always call 811 or local utility locator before excavating</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600">⚠️</span>
              <span><strong>Shoring Requirements:</strong> Excavations over 1.5m deep require protective systems</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600">⚠️</span>
              <span><strong>Slope Stability:</strong> Maintain proper slope angles (typically 1:1 or flatter)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600">⚠️</span>
              <span><strong>Water Management:</strong> Plan for dewatering if groundwater is present</span>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Calculations:</strong> Get excavation volume estimates in real-time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Multiple Shapes:</strong> Support for rectangular, trench, and circular excavations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Unit Flexibility:</strong> Work in meters or feet with automatic conversion</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Cost Estimation:</strong> Get approximate excavation and disposal costs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>No Software Required:</strong> Works entirely in your browser, no installation needed</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Important Note
          </h4>
          <p className="text-sm text-yellow-800">
            This calculator provides volume estimates based on the dimensions you enter. Actual excavation volumes may vary due to soil expansion (swell factor), compaction, irregular shapes, sloping requirements, and site conditions. Always add 10-20% buffer for soil swell when estimating truck loads and disposal needs. Excavation costs vary significantly by location, soil type, site access, depth, and local market conditions. Consult with licensed excavation contractors and engineers for accurate project estimates and ensure compliance with local building codes and safety regulations.
          </p>
        </div>

      </div>
    </div>
  );
}