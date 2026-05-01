export default function RainwaterHarvestingCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Rainwater Harvesting Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Rainwater Harvesting Calculator is a free online tool that helps you estimate how much rainwater you can collect from your roof. Whether you're a homeowner looking to reduce water bills, an architect designing sustainable buildings, or a farmer planning irrigation systems, this calculator provides instant, accurate estimates for rainwater collection potential.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Enter Roof Area</h3>
              <p className="text-gray-700">Input your total roof catchment area in square meters or square feet. This is the horizontal projection of your roof surface that collects rainwater.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Input Annual Rainfall</h3>
              <p className="text-gray-700">Enter the average annual rainfall for your location in millimeters or inches. You can find this data from local weather stations or online climate databases.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Set Runoff Coefficient</h3>
              <p className="text-gray-700">Adjust the runoff coefficient (0.5-1.0) based on your roof material. Smooth surfaces like metal or tile have higher coefficients (0.8-0.9), while rough surfaces have lower values.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: Review Results</h3>
              <p className="text-gray-700">The calculator instantly shows your potential water collection in liters or gallons per year, month, and day, plus recommended tank sizes.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Rainwater Collection Formula</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator uses a simple but accurate formula to estimate rainwater collection:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <code className="text-gray-800">Volume = Roof Area × Rainfall × Runoff Coefficient</code>
          </div>
          <p className="text-gray-700 leading-relaxed">
            In metric units, 1 mm of rainfall on 1 m² of roof area equals 1 liter of water. The runoff coefficient accounts for losses due to evaporation, spillage, and absorption, typically ranging from 0.75 to 0.9 for most residential roofs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Runoff Coefficients by Roof Type</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roof Material</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coefficient</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Metal/Tile</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.85-0.95</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Smooth, minimal absorption</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Asphalt Shingles</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.75-0.85</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Moderate absorption</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Concrete/Clay</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.70-0.80</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Some porosity</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Green Roof</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.50-0.70</td>
                  <td className="px-4 py-3 text-sm text-gray-600">High absorption</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Rainwater Harvesting</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Reduce Water Bills:</strong> Supplement or replace municipal water for non-potable uses like irrigation, toilet flushing, and laundry</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Environmental Sustainability:</strong> Reduce demand on groundwater and surface water sources, helping conserve natural resources</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Stormwater Management:</strong> Reduce runoff and flooding by capturing rainwater at the source</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Emergency Water Supply:</strong> Provide backup water during droughts or water restrictions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Better for Plants:</strong> Rainwater is naturally soft and free of chlorine, making it ideal for gardens</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tank Sizing Guidelines</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Minimum Tank Size</h3>
              <p className="text-sm text-blue-800">
                Store at least 1 month of collection capacity. This provides a buffer for dry periods and ensures you can capture rainfall from typical storm events.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Recommended Tank Size</h3>
              <p className="text-sm text-green-800">
                Store 1-2 months of collection capacity for optimal performance. This balances cost with water security and maximizes rainfall capture efficiency.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-2">Large Systems</h3>
              <p className="text-sm text-yellow-800">
                For agricultural or commercial use, consider 3-6 months storage capacity to handle seasonal variations in rainfall and water demand.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Components</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Catchment Surface</h3>
              <p className="text-gray-700">Your roof acts as the collection surface. Clean, smooth roofs work best. Avoid roofs with toxic materials or heavy pollution.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Gutters and Downspouts</h3>
              <p className="text-gray-700">Channel water from the roof to storage. Keep clean and properly sloped for efficient drainage.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">First-Flush Diverter</h3>
              <p className="text-gray-700">Diverts the first rainfall (which contains most contaminants) away from storage, improving water quality.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Storage Tank</h3>
              <p className="text-gray-700">Stores collected rainwater. Can be above-ground or underground. Must be opaque to prevent algae growth.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Filtration System</h3>
              <p className="text-gray-700">Removes debris and contaminants. Essential for potable water systems, recommended for all applications.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How accurate is the calculator?</h3>
              <p className="text-gray-700">
                The calculator provides estimates based on standard formulas used in civil engineering. Actual collection may vary by ±10-15% due to local conditions, roof design, and system efficiency.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I use rainwater for drinking?</h3>
              <p className="text-gray-700">
                Rainwater can be used for drinking if properly filtered and treated. However, most residential systems are designed for non-potable uses like irrigation, toilet flushing, and laundry.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What runoff coefficient should I use?</h3>
              <p className="text-gray-700">
                Use 0.8-0.9 for metal or tile roofs, 0.75-0.85 for asphalt shingles, and 0.7-0.8 for concrete or clay tiles. When in doubt, use 0.8 as a conservative estimate.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I find my local rainfall data?</h3>
              <p className="text-gray-700">
                Check your local weather station, national meteorological service, or online climate databases. Use average annual rainfall for the most accurate estimates.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Is rainwater harvesting legal?</h3>
              <p className="text-gray-700">
                Rainwater harvesting is legal in most areas and even encouraged through rebates and incentives. However, some regions have restrictions. Check local regulations before installing a system.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculations</h2>
          <p className="text-gray-700 leading-relaxed">
            For complete water management planning, consider using our related calculators: Excavation Volume Calculator for underground tank installation, Drainage Flow Calculator for overflow system design, and Concrete Volume Calculator for tank foundation sizing. These tools work together to support comprehensive rainwater harvesting system design.
          </p>
        </section>

      </div>
    </div>
  );
}
