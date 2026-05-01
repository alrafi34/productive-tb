export default function BuildingHeightCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Building Height Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Building Height Calculator is a professional planning tool designed to help architects, civil engineers, 
            urban planners, and real estate developers estimate the maximum allowable building height based on zoning 
            regulations, Floor Area Ratio (FAR), plot dimensions, and road width constraints. This calculator provides 
            instant estimates for compliance with local building codes and zoning ordinances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Enter Plot Area</h3>
              <p className="text-gray-700">
                Input the total plot area in square feet or square meters. This is the land area available for 
                construction.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Specify FAR (Floor Area Ratio)</h3>
              <p className="text-gray-700">
                Enter the FAR value as specified by local zoning regulations. FAR determines the total buildable floor 
                area relative to the plot size.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Set Floor Height</h3>
              <p className="text-gray-700">
                Input the average floor-to-floor height (typically 10-12 feet for residential, 12-15 feet for commercial). 
                This affects the total building height.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: Enter Road Width and Setback</h3>
              <p className="text-gray-700">
                Specify the adjacent road width and required setback distance. These parameters may limit building height 
                based on local regulations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 5: Select Calculation Mode</h3>
              <p className="text-gray-700">
                Choose between FAR-based, road width-based, or custom calculation mode. The calculator instantly displays 
                the maximum allowable height with detailed breakdown.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Building Height Calculations</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Building height is calculated using standard architectural formulas:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 space-y-2">
            <p className="font-mono text-center text-lg">Total Buildable Area = Plot Area × FAR</p>
            <p className="font-mono text-center text-lg">Number of Floors = Total Buildable Area ÷ Plot Area</p>
            <p className="font-mono text-center text-lg">Building Height = Number of Floors × Floor Height</p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The FAR (Floor Area Ratio) is a zoning regulation that limits the total floor area that can be built on a 
            plot. For example, a FAR of 2.5 on a 2000 sq ft plot allows 5000 sq ft of total floor area, which could be 
            distributed across multiple floors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Methods</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">FAR-Based Method</h3>
              <p className="text-sm text-gray-700">
                Calculates height based on Floor Area Ratio and plot size. This is the most common method used in urban 
                planning and zoning regulations.
              </p>
            </div>
            <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Road Width Method</h3>
              <p className="text-sm text-gray-700">
                Determines maximum height based on adjacent road width and setback requirements. Common in areas with 
                street-facing height restrictions.
              </p>
            </div>
            <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Custom Method</h3>
              <p className="text-sm text-gray-700">
                Uses the minimum of both FAR-based and road width-based calculations to ensure compliance with all 
                applicable regulations.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Typical FAR Values by Zone Type</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Zone Type</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Typical FAR Range</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Low-Density Residential</td>
                  <td className="px-4 py-2 text-sm text-gray-700">0.5 - 1.0</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Single-family homes, suburban areas</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Medium-Density Residential</td>
                  <td className="px-4 py-2 text-sm text-gray-700">1.0 - 2.0</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Multi-family housing, townhouses</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">High-Density Residential</td>
                  <td className="px-4 py-2 text-sm text-gray-700">2.0 - 3.5</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Apartment buildings, condominiums</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Commercial</td>
                  <td className="px-4 py-2 text-sm text-gray-700">2.5 - 4.0</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Retail, offices, mixed-use</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Urban Core/CBD</td>
                  <td className="px-4 py-2 text-sm text-gray-700">4.0 - 10.0+</td>
                  <td className="px-4 py-2 text-sm text-gray-600">High-rise towers, downtown areas</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Industrial</td>
                  <td className="px-4 py-2 text-sm text-gray-700">0.5 - 1.5</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Warehouses, manufacturing facilities</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Floor Heights</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Residential Buildings</h3>
              <p className="text-sm text-gray-700">
                Typical range: 9-11 feet (2.7-3.4 m). Standard residential floor height is 10 feet, providing adequate 
                ceiling height and space for utilities.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Commercial Buildings</h3>
              <p className="text-sm text-gray-700">
                Typical range: 12-15 feet (3.7-4.6 m). Higher ceilings accommodate HVAC systems, lighting, and create 
                an open feel for retail and office spaces.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Industrial Buildings</h3>
              <p className="text-sm text-gray-700">
                Typical range: 15-25 feet (4.6-7.6 m). Tall ceilings accommodate machinery, storage racks, and material 
                handling equipment.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Luxury/High-End</h3>
              <p className="text-sm text-gray-700">
                Typical range: 11-14 feet (3.4-4.3 m). Premium residential and commercial spaces feature higher ceilings 
                for enhanced aesthetics and comfort.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Building Classification by Height</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Low-Rise (1-2 floors)</h3>
              <p className="text-sm text-blue-800">
                Single-family homes, small commercial buildings. Typically up to 25 feet in height. Simplest construction 
                and lowest regulatory requirements.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Mid-Rise (3-7 floors)</h3>
              <p className="text-sm text-blue-800">
                Apartment buildings, small office buildings. Height range 25-75 feet. May require elevators and enhanced 
                fire safety systems.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">High-Rise (8-25 floors)</h3>
              <p className="text-sm text-blue-800">
                Large residential and commercial towers. Height range 75-300 feet. Requires advanced structural systems, 
                multiple elevators, and comprehensive fire safety.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Super High-Rise (25+ floors)</h3>
              <p className="text-sm text-blue-800">
                Skyscrapers and landmark towers. Over 300 feet tall. Requires specialized engineering, wind analysis, 
                seismic design, and advanced building systems.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Considerations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Setback Requirements</h3>
              <p className="text-sm text-gray-700">
                Setbacks create space between buildings and property lines, ensuring light, air circulation, and fire 
                safety. Typical setbacks range from 5-25 feet depending on zone and building height.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Shadow Analysis</h3>
              <p className="text-sm text-gray-700">
                Tall buildings cast shadows on adjacent properties. Many jurisdictions require shadow studies to ensure 
                neighboring buildings receive adequate sunlight.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Structural Systems</h3>
              <p className="text-sm text-gray-700">
                Building height affects structural design. Low-rise buildings use simple load-bearing walls, while 
                high-rises require steel or reinforced concrete frames.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Vertical Transportation</h3>
              <p className="text-sm text-gray-700">
                Buildings over 3-4 floors typically require elevators. High-rises need multiple elevator banks with 
                sophisticated control systems for efficient vertical movement.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is FAR (Floor Area Ratio)?</h3>
              <p className="text-gray-700">
                FAR is the ratio of total building floor area to the plot area. For example, a FAR of 2.0 on a 1000 sq ft 
                plot allows 2000 sq ft of total floor area, which could be built as a 2-story building with 1000 sq ft per 
                floor, or a 4-story building with 500 sq ft per floor.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How does road width affect building height?</h3>
              <p className="text-gray-700">
                Many building codes limit height based on adjacent road width to ensure adequate light, air, and emergency 
                access. A common rule is that building height should not exceed 1.5 to 2 times the road width, though this 
                varies by jurisdiction.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the typical floor height for residential buildings?</h3>
              <p className="text-gray-700">
                Standard residential floor-to-floor height is 10 feet (3 meters), providing 8-9 feet of ceiling height 
                after accounting for floor structure. Luxury residences may have 11-14 feet floor heights for more spacious 
                interiors.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I exceed the calculated height?</h3>
              <p className="text-gray-700">
                The calculated height represents the maximum allowed under standard regulations. Exceeding this requires 
                special permits, variances, or exemptions from local authorities. Some jurisdictions allow height bonuses 
                for public amenities or sustainable design features.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do setbacks affect buildable area?</h3>
              <p className="text-gray-700">
                Setbacks reduce the buildable footprint of your plot. If you have a 2000 sq ft plot with 5 ft setbacks on 
                all sides, the actual buildable area may be significantly less. However, FAR is typically calculated on the 
                total plot area, not the reduced footprint.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What factors are not included in this calculator?</h3>
              <p className="text-gray-700">
                This calculator provides estimates based on FAR and road width rules. It does not account for height 
                restrictions near airports, heritage zones, view corridors, shadow regulations, or other special zoning 
                overlays. Always verify with local planning authorities.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Planning Best Practices</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Always verify calculations with local zoning ordinances and building codes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consult with local planning department before finalizing building height</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider future zoning changes and neighborhood development plans</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Account for mechanical equipment, rooftop structures, and parapets in total height</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Evaluate structural and economic feasibility of maximum allowable height</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider impact on neighboring properties and community character</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Factor in construction costs, which increase significantly with building height</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Review parking requirements, which may increase with building size</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use This Calculator?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-1">Instant Results</h3>
              <p className="text-sm text-gray-700">
                Real-time calculations with immediate height estimates and compliance checks
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">📐</div>
              <h3 className="font-semibold text-gray-800 mb-1">Multiple Methods</h3>
              <p className="text-sm text-gray-700">
                Compare FAR-based and road width-based calculations for comprehensive analysis
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-1">Professional Tool</h3>
              <p className="text-sm text-gray-700">
                Designed for architects, engineers, and urban planning professionals
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Building Planning Tool</h2>
          <p className="text-gray-700 leading-relaxed">
            This calculator is designed for architects, civil engineers, urban planners, and real estate developers who 
            need quick and accurate building height estimates based on zoning regulations. It combines industry-standard 
            FAR calculations with road width rules, providing instant feedback for preliminary planning and feasibility 
            studies. All calculations run entirely in your browser with no data sent to servers, ensuring privacy and 
            instant performance. Use this tool for initial planning and always verify final designs with local zoning 
            authorities and building departments.
          </p>
        </section>

      </div>
    </div>
  );
}
