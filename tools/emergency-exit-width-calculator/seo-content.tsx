export default function EmergencyExitWidthCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Emergency Exit Width Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Emergency Exit Width Calculator is a professional tool designed to help architects, engineers, and safety 
            professionals determine the minimum required exit width for safe building evacuation. Based on occupant load 
            and building code requirements, this calculator ensures compliance with life safety standards such as NFPA, 
            IBC, and local building codes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Enter Number of Occupants</h3>
              <p className="text-gray-700">
                Input the total number of people who will occupy the space. This is the occupant load calculated based 
                on the building's use and floor area.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Select Width Factor</h3>
              <p className="text-gray-700">
                Choose the appropriate width factor based on the type of egress: 0.3 inches/person for doors and level 
                paths, 0.2 inches/person for stairs, or 0.15 inches/person for sprinklered buildings.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Specify Number of Exits</h3>
              <p className="text-gray-700">
                Enter the number of exits available. The calculator will distribute the required width across all exits 
                to determine the width needed for each exit.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: Review Results</h3>
              <p className="text-gray-700">
                The calculator instantly displays the total required width and width per exit, along with safety 
                assessment and code compliance recommendations.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Exit Width Requirements</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Exit width is calculated using the formula:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="font-mono text-center text-lg">Required Width = Occupant Load × Width Factor</p>
            <p className="text-center text-sm text-gray-600 mt-2">
              Width per exit = Total Required Width ÷ Number of Exits
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The width factor varies based on the type of egress component and building characteristics. Building codes 
            specify these factors to ensure adequate capacity for safe evacuation during emergencies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Width Factor Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">0.3 inches/person</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Doors and Level Egress</strong>
              </p>
              <p className="text-xs text-gray-600">
                Used for exit doors, corridors, and other level egress components. This is the most common factor for 
                horizontal travel.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">0.2 inches/person</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Stairs and Ramps</strong>
              </p>
              <p className="text-xs text-gray-600">
                Applied to stairs and ramps where vertical travel occurs. The reduced factor accounts for slower 
                movement on inclined surfaces.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">0.15 inches/person</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Sprinklered Buildings</strong>
              </p>
              <p className="text-xs text-gray-600">
                Reduced factor for buildings with automatic sprinkler systems. The sprinklers provide additional 
                safety, allowing narrower exits.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Minimum Exit Width Standards</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Exit Doors</h3>
              <p className="text-sm text-gray-700">
                Minimum clear width: 32 inches. Recommended: 36 inches for better flow and accessibility compliance.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Corridors</h3>
              <p className="text-sm text-gray-700">
                Minimum width: 44 inches for occupant loads less than 50. Wider corridors required for higher occupancies.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Stairs</h3>
              <p className="text-sm text-gray-700">
                Minimum width: 44 inches for occupant loads up to 49. Wider stairs required for higher occupancies.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Assembly Occupancies</h3>
              <p className="text-sm text-gray-700">
                Higher capacity requirements. Main exits must accommodate at least 50% of occupant load.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Number of Exits Required</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Occupant Load</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Minimum Exits</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">1-49</td>
                  <td className="px-4 py-2 text-sm text-gray-700">1</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Single exit permitted for small occupancies</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">50-500</td>
                  <td className="px-4 py-2 text-sm text-gray-700">2</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Two exits required, remotely located</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">501-1000</td>
                  <td className="px-4 py-2 text-sm text-gray-700">3</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Three exits minimum</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">1000+</td>
                  <td className="px-4 py-2 text-sm text-gray-700">4</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Four or more exits required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Considerations</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Exit Separation</h3>
              <p className="text-sm text-blue-800">
                Exits must be remotely located from each other. Typically, exits should be separated by at least half 
                the maximum diagonal dimension of the space.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Travel Distance</h3>
              <p className="text-sm text-blue-800">
                Maximum travel distance to an exit varies by occupancy type and sprinkler protection. Typically 200-250 
                feet for sprinklered buildings.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Door Swing Direction</h3>
              <p className="text-sm text-blue-800">
                Exit doors must swing in the direction of egress travel when serving high occupancy loads (typically 50+ 
                occupants).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Accessibility</h3>
              <p className="text-sm text-blue-800">
                At least one exit must be accessible to persons with disabilities. Consider wider exits for better 
                accessibility.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Occupancy Examples</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Office Building (100 occupants)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Width factor: 0.3 in/person<br />
                Required width: 30 inches<br />
                Recommended: 2 exits at 36 inches each
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Classroom (30 students)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Width factor: 0.3 in/person<br />
                Required width: 9 inches<br />
                Minimum: 1 exit at 36 inches (code minimum)
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Theater (300 occupants)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Width factor: 0.2 in/person (stairs)<br />
                Required width: 60 inches<br />
                Recommended: 3 exits at 44 inches each
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Restaurant (100 occupants)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Width factor: 0.3 in/person<br />
                Required width: 30 inches<br />
                Recommended: 2 exits at 36 inches each
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is the minimum exit door width?</h3>
              <p className="text-gray-700">
                The minimum clear width for exit doors is 32 inches according to most building codes. However, 36 inches 
                is recommended for better flow and to meet accessibility requirements. The clear width is measured from 
                the face of the door when open 90 degrees to the stop.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I calculate occupant load?</h3>
              <p className="text-gray-700">
                Occupant load is calculated by dividing the floor area by the occupant load factor for the specific use. 
                For example, offices typically use 100 sq ft per person, while assembly areas use 7-15 sq ft per person 
                depending on the type of seating.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I have just one exit?</h3>
              <p className="text-gray-700">
                Single exits are permitted only for occupant loads of 49 or fewer, and only when travel distance and 
                other code requirements are met. Most buildings require at least two exits for safety redundancy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What if my calculated width is less than the minimum?</h3>
              <p className="text-gray-700">
                Always use the larger of the calculated width or the code minimum. Even if calculations show a smaller 
                width is sufficient, you must meet minimum width requirements (typically 32-36 inches for doors).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Do sprinklers reduce exit width requirements?</h3>
              <p className="text-gray-700">
                Yes, buildings with automatic sprinkler systems can use a reduced width factor (0.15 inches/person 
                instead of 0.3 inches/person for level egress). However, minimum width requirements still apply.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Engineering Best Practices</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Always verify calculations against local building codes and fire marshal requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider peak occupancy scenarios and special events</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Provide wider exits than minimum for better evacuation flow</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Ensure exits are clearly marked with illuminated exit signs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Maintain clear egress paths free from obstructions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider accessibility requirements for all exits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Document all calculations for permit applications and inspections</span>
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
                Real-time calculations with immediate safety assessment
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">📏</div>
              <h3 className="font-semibold text-gray-800 mb-1">Code Compliant</h3>
              <p className="text-sm text-gray-700">
                Based on NFPA and IBC building code requirements
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-1">Professional Tool</h3>
              <p className="text-sm text-gray-700">
                Designed for architects, engineers, and safety professionals
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Building Safety Tool</h2>
          <p className="text-gray-700 leading-relaxed">
            This calculator is designed for architects, civil engineers, safety inspectors, and building professionals 
            who need accurate exit width calculations for life safety compliance. It combines building code requirements 
            with an intuitive interface, making complex egress calculations accessible while maintaining professional-grade 
            accuracy. All calculations run entirely in your browser with no data sent to servers, ensuring privacy and 
            instant performance. Always consult with local authorities having jurisdiction for final approval.
          </p>
        </section>

      </div>
    </div>
  );
}
