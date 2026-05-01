export default function ElectricalLoadCalculatorBuildingSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Electrical Load Calculator</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          The <strong>Electrical Load Calculator (Building)</strong> is a professional tool designed for electrical engineers, architects, contractors, and builders to estimate total electrical load for residential and commercial buildings. It calculates power consumption, current requirements, recommended breaker sizes, and cable specifications based on connected appliances and equipment.
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
                <span>Dynamic appliance table with unlimited rows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Pre-built appliance templates for quick entry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time load calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Breaker and cable size recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Export to TXT and CSV formats</span>
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
                <span>Circuit breaker sizing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Cable specification selection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Building permit applications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Energy consumption estimation</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">How to Use the Calculator</h3>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6">
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span><strong>Configure Settings:</strong> Select voltage (110V or 220V), load type, and demand factor</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span><strong>Add Appliances:</strong> Enter appliance details or use quick templates</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span><strong>Input Details:</strong> Specify quantity, power rating, and category for each appliance</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span><strong>Review Results:</strong> See total load, current, breaker size, and cable recommendations</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
              <span><strong>Export Data:</strong> Download results as TXT or CSV for documentation</span>
            </li>
          </ol>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding the Calculations</h3>
        
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 1: Calculate Total Connected Load</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Total Load (W) = Σ (Quantity × Power Rating)
              </code>
              <p className="text-sm mt-2">Sum the power consumption of all appliances considering their quantities.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 2: Apply Demand Factor</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Demand Load (kW) = Total Load × Demand Factor
              </code>
              <p className="text-sm mt-2">Apply diversity factor since not all appliances run simultaneously.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 3: Calculate Current</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Current (A) = (Demand Load × 1000) / (Voltage × Power Factor)
              </code>
              <p className="text-sm mt-2">Calculate the current draw based on voltage and power factor.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Step 4: Size Breaker</h4>
              <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                Breaker Size = Current × 1.25 (rounded up to standard size)
              </code>
              <p className="text-sm mt-2">Add 25% safety margin and round to nearest standard breaker rating.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Example Calculation</h4>
              <div className="bg-white p-4 rounded border border-gray-200 text-sm space-y-2">
                <p><strong>Appliances:</strong></p>
                <p>• 3 Fans @ 75W = 225W</p>
                <p>• 5 Lights @ 15W = 75W</p>
                <p>• 1 AC @ 1500W = 1500W</p>
                <p className="pt-2 border-t border-gray-300"><strong>Total:</strong> 1800W = 1.8 kW</p>
                <p><strong>Demand (80%):</strong> 1.44 kW</p>
                <p><strong>Current:</strong> (1440W) / (220V × 0.8) = 8.18 A</p>
                <p><strong>Breaker:</strong> 8.18 × 1.25 = 10.23 A → 16A breaker</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Demand Factor Guidelines</h3>
        
        <div className="space-y-3 text-gray-700 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">100% - No Diversity</h4>
                <p className="text-sm mt-1">All loads running simultaneously (worst case)</p>
              </div>
              <span className="text-2xl font-bold text-red-500">100%</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">90% - Low Diversity</h4>
                <p className="text-sm mt-1">Critical facilities, data centers</p>
              </div>
              <span className="text-2xl font-bold text-orange-500">90%</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">80% - Recommended</h4>
                <p className="text-sm mt-1">Typical residential and commercial buildings</p>
              </div>
              <span className="text-2xl font-bold text-primary">80%</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">70% - High Diversity</h4>
                <p className="text-sm mt-1">Large buildings with varied usage patterns</p>
              </div>
              <span className="text-2xl font-bold text-green-500">70%</span>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Standard Breaker Sizes</h3>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700 mb-2"><strong>Common Breaker Ratings (Amps):</strong></p>
          <div className="flex flex-wrap gap-2">
            {[6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200].map(size => (
              <span key={size} className="px-3 py-1 bg-white border border-gray-200 rounded text-sm font-semibold">
                {size}A
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Cable Size Reference</h3>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200">Current (A)</th>
                <th className="text-left p-3 border border-gray-200">Cable Size (mm²)</th>
                <th className="text-left p-3 border border-gray-200">Typical Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200">Up to 6A</td>
                <td className="p-3 border border-gray-200">1.5 mm²</td>
                <td className="p-3 border border-gray-200">Lighting circuits</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Up to 10A</td>
                <td className="p-3 border border-gray-200">2.5 mm²</td>
                <td className="p-3 border border-gray-200">Power outlets</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Up to 16A</td>
                <td className="p-3 border border-gray-200">4 mm²</td>
                <td className="p-3 border border-gray-200">Heavy appliances</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Up to 20A</td>
                <td className="p-3 border border-gray-200">6 mm²</td>
                <td className="p-3 border border-gray-200">Air conditioners</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200">Up to 32A</td>
                <td className="p-3 border border-gray-200">16 mm²</td>
                <td className="p-3 border border-gray-200">Main distribution</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Applications</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">New Construction</h4>
            <p className="text-sm text-green-800">
              Calculate total electrical load during design phase to properly size main service panel, feeders, and branch circuits.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Renovations</h4>
            <p className="text-sm text-blue-800">
              Assess existing capacity and determine if service upgrade is needed when adding new appliances or equipment.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Safety Planning</h4>
            <p className="text-sm text-purple-800">
              Prevent circuit overload by ensuring breakers and cables are properly sized for the connected load.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Cost Estimation</h4>
            <p className="text-sm text-orange-800">
              Estimate material costs for electrical installation by determining required breaker and cable specifications.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h3>
        
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Instant Results:</strong> Real-time calculation as you add appliances</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Quick Templates:</strong> Pre-built appliance library for fast data entry</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Professional Output:</strong> Export detailed reports in TXT or CSV format</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl flex-shrink-0">✓</span>
              <span><strong>Safety Recommendations:</strong> Automatic breaker and cable sizing with safety margins</span>
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
            Important Safety Note
          </h4>
          <p className="text-sm text-yellow-800">
            This calculator provides estimates for planning purposes. Always consult with a licensed electrician and follow local electrical codes and regulations. Electrical work should only be performed by qualified professionals. The recommendations provided are general guidelines and may need adjustment based on specific installation conditions, cable routing, ambient temperature, and local code requirements.
          </p>
        </div>

      </div>
    </div>
  );
}
