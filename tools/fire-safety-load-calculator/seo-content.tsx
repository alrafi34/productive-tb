export default function FireSafetyLoadCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Fire Safety Load Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Fire Safety Load Calculator is a professional engineering tool designed to estimate the fire load density 
            of buildings and spaces. Fire load represents the total potential heat energy that can be released during a fire, 
            measured in megajoules per square meter (MJ/m²). This metric is essential for fire safety engineering, building 
            design, risk assessment, and compliance with fire safety codes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Enter Floor Area</h3>
              <p className="text-gray-700">
                Input the total floor area of the space in square meters. This is the area over which the fire load will 
                be distributed.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Select Occupancy Type</h3>
              <p className="text-gray-700">
                Choose the building occupancy type (residential, office, commercial, industrial, or warehouse) to get 
                context-specific recommendations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Add Combustible Materials</h3>
              <p className="text-gray-700">
                Add all combustible materials present in the space. Select from preset materials or enter custom values. 
                Specify the mass (kg) for each material. The calorific value is automatically filled for preset materials.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: Review Results</h3>
              <p className="text-gray-700">
                The calculator instantly displays the total heat energy, fire load density, and risk level classification 
                with detailed recommendations.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Fire Load</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Fire load is calculated using the formula:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="font-mono text-center text-lg">Fire Load (MJ/m²) = Σ(Mass × Calorific Value) / Floor Area</p>
            <p className="text-center text-sm text-gray-600 mt-2">
              Where the sum includes all combustible materials in the space
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The calorific value (also called heat of combustion) represents the amount of energy released when a material 
            burns completely. Different materials have different calorific values, with plastics and fuels typically having 
            higher values than wood or paper.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fire Load Risk Classifications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Low Risk (&lt;400 MJ/m²)</h3>
              <p className="text-sm text-green-800">
                Typical for offices, residential spaces, and areas with minimal combustible materials. Standard fire 
                protection measures are usually sufficient.
              </p>
            </div>
            <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Medium Risk (400-800 MJ/m²)</h3>
              <p className="text-sm text-yellow-800">
                Common in retail spaces, libraries, and light manufacturing. Requires standard fire protection systems 
                including sprinklers and alarms.
              </p>
            </div>
            <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">High Risk (800-1200 MJ/m²)</h3>
              <p className="text-sm text-orange-800">
                Found in warehouses, storage facilities, and some industrial spaces. Enhanced fire protection measures 
                and compartmentation required.
              </p>
            </div>
            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Very High Risk (&gt;1200 MJ/m²)</h3>
              <p className="text-sm text-red-800">
                Typical in chemical storage, fuel depots, and heavy industrial facilities. Special fire suppression 
                systems and strict safety protocols required.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Material Calorific Values</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Material</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Calorific Value (MJ/kg)</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Wood (general)</td>
                  <td className="px-4 py-2 text-sm text-gray-700">17</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Wood & Paper</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Paper</td>
                  <td className="px-4 py-2 text-sm text-gray-700">16</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Wood & Paper</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Plastic (general)</td>
                  <td className="px-4 py-2 text-sm text-gray-700">35</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Plastics</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Polyethylene</td>
                  <td className="px-4 py-2 text-sm text-gray-700">43</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Plastics</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Cotton</td>
                  <td className="px-4 py-2 text-sm text-gray-700">18</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Textiles</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Diesel</td>
                  <td className="px-4 py-2 text-sm text-gray-700">45</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Fuels</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">Rubber</td>
                  <td className="px-4 py-2 text-sm text-gray-700">30</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Other</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Typical Fire Loads by Occupancy</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Residential Buildings</h3>
              <p className="text-sm text-gray-700">
                Typical range: 300-600 MJ/m². Includes furniture, clothing, books, and household items.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Office Spaces</h3>
              <p className="text-sm text-gray-700">
                Typical range: 200-500 MJ/m². Includes desks, chairs, paper documents, and electronic equipment.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Retail/Commercial</h3>
              <p className="text-sm text-gray-700">
                Typical range: 400-800 MJ/m². Varies significantly based on merchandise type and storage density.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Industrial Facilities</h3>
              <p className="text-sm text-gray-700">
                Typical range: 600-1500 MJ/m². Depends on manufacturing processes and raw material storage.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-gray-800">Warehouses</h3>
              <p className="text-sm text-gray-700">
                Typical range: 800-2000+ MJ/m². Highly variable based on stored goods and stacking height.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fire Safety Design Considerations</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Compartmentation</h3>
              <p className="text-sm text-blue-800">
                Divide buildings into fire compartments to limit fire spread. Higher fire loads require smaller compartments 
                or enhanced fire resistance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Fire Suppression Systems</h3>
              <p className="text-sm text-blue-800">
                Automatic sprinkler systems are essential for spaces with medium to high fire loads. Consider foam or gas 
                suppression for special hazards.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Means of Escape</h3>
              <p className="text-sm text-blue-800">
                Higher fire loads require shorter travel distances to exits and additional escape routes. Consider smoke 
                control systems.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Structural Fire Resistance</h3>
              <p className="text-sm text-blue-800">
                Structural elements must maintain integrity for sufficient time based on fire load. Higher loads require 
                longer fire resistance ratings.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What is fire load and why is it important?</h3>
              <p className="text-gray-700">
                Fire load is the total amount of heat energy that can be released by all combustible materials in a space, 
                divided by the floor area. It's crucial for determining fire safety requirements, structural fire resistance, 
                and evacuation time calculations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I determine the mass of materials in a space?</h3>
              <p className="text-gray-700">
                For existing buildings, conduct a physical inventory and weigh representative samples. For design phase, 
                estimate based on typical furniture and equipment for the occupancy type. Include all combustible contents 
                including finishes, furniture, and stored materials.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What materials should I include in the calculation?</h3>
              <p className="text-gray-700">
                Include all combustible materials: furniture, finishes, stored goods, packaging, and equipment. Exclude 
                non-combustible items like concrete, steel, glass, and masonry. Include wall and ceiling finishes if combustible.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How does fire load affect building design?</h3>
              <p className="text-gray-700">
                Higher fire loads require enhanced fire protection measures including longer fire resistance ratings for 
                structural elements, more robust sprinkler systems, better compartmentation, and potentially more exits. 
                This affects construction costs and building layout.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I reduce fire load in an existing building?</h3>
              <p className="text-gray-700">
                Yes, by reducing combustible materials, using fire-resistant furniture and finishes, implementing better 
                storage practices, and removing unnecessary combustible items. Regular housekeeping and material management 
                are essential.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Engineering Best Practices</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Always verify calculations with local fire safety codes and standards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider worst-case scenarios and peak occupancy conditions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Include safety factors in design calculations (typically 1.5-2.0)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Document all assumptions and material inventories</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Review fire load calculations periodically as building use changes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consult with fire safety engineers for complex or high-risk facilities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Consider both permanent and temporary fire loads (construction, renovations)</span>
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
                Real-time calculations with automatic risk assessment
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-800 mb-1">Detailed Breakdown</h3>
              <p className="text-sm text-gray-700">
                Material-by-material analysis with energy contributions
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-1">Professional Tool</h3>
              <p className="text-sm text-gray-700">
                Based on fire safety engineering principles and standards
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Fire Safety Engineering Tool</h2>
          <p className="text-gray-700 leading-relaxed">
            This calculator is designed for architects, civil engineers, fire safety engineers, and building professionals 
            who need accurate fire load calculations for building design and risk assessment. It combines engineering 
            precision with an intuitive interface, making complex fire safety calculations accessible while maintaining 
            professional-grade accuracy. All calculations run entirely in your browser with no data sent to servers, 
            ensuring privacy and instant performance.
          </p>
        </section>

      </div>
    </div>
  );
}
