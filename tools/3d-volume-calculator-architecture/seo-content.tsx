export default function VolumeCalculatorArchitectureSEO() {
  return (
    <div className="mt-16 space-y-12 max-w-4xl mx-auto">
      
      {/* About Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">About 3D Volume Calculator</h2>
        <p className="text-gray-700 leading-relaxed">
          The 3D Volume Calculator for Architecture is a professional tool designed to calculate the volume of various architectural structures and geometric shapes. Whether you're an architect planning a building, an engineer estimating materials, or a student learning spatial calculations, this calculator provides instant and accurate volumetric measurements.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Support for multiple shapes including rectangular prisms (rooms, buildings), cylinders (columns, tanks), spheres (domes), and cones (roofs) makes this tool versatile for any architectural or construction project.
        </p>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Select Shape Type</h3>
            <p className="text-gray-700 text-sm">
              Choose from rectangular prism, cylinder, sphere, or cone based on your structure.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Enter Dimensions</h3>
            <p className="text-gray-700 text-sm">
              Input the required measurements in meters or feet. The calculator adapts inputs based on the selected shape.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Get Instant Results</h3>
            <p className="text-gray-700 text-sm">
              View the calculated volume in real-time with the formula used for transparency.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Save or Export</h3>
            <p className="text-gray-700 text-sm">
              Save calculations to history or export detailed reports for documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Volume Formulas</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Rectangular Prism (Room/Building)</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Volume = Length × Width × Height
            </code>
            <p className="text-blue-800 text-sm mt-2">
              Used for calculating room volumes, building spaces, and rectangular structures.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Cylinder (Column/Tank)</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Volume = π × r² × h
            </code>
            <p className="text-blue-800 text-sm mt-2">
              Perfect for columns, water tanks, pipes, and cylindrical structures.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Sphere (Dome)</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Volume = (4/3) × π × r³
            </code>
            <p className="text-blue-800 text-sm mt-2">
              Used for domes, spherical structures, and hemispherical designs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Cone (Roof)</h3>
            <code className="block bg-white px-4 py-2 rounded border border-blue-200 text-sm">
              Volume = (1/3) × π × r² × h
            </code>
            <p className="text-blue-800 text-sm mt-2">
              Ideal for conical roofs, pyramidal structures, and tapered designs.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">🏠 Room Volume</h3>
            <p className="text-gray-700 text-sm">
              Calculate air volume for HVAC sizing, ventilation requirements, and climate control systems in residential and commercial spaces.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">🏗️ Concrete Estimation</h3>
            <p className="text-gray-700 text-sm">
              Estimate concrete volume for slabs, foundations, columns, and structural elements to determine material quantities and costs.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">💧 Water Tank Sizing</h3>
            <p className="text-gray-700 text-sm">
              Calculate storage capacity for cylindrical water tanks, reservoirs, and liquid storage systems.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">🏛️ Structural Planning</h3>
            <p className="text-gray-700 text-sm">
              Determine volumes for columns, domes, and other architectural elements for structural analysis and material planning.
            </p>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Calculation Examples</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 1: Standard Room</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Shape: Rectangular Prism</li>
                <li>Length: 10 m</li>
                <li>Width: 8 m</li>
                <li>Height: 3 m</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Calculation:</strong></p>
              <p className="text-gray-600 ml-2">Volume = 10 × 8 × 3 = 240 m³</p>
              <p className="text-gray-700 mt-3"><strong>Use Case:</strong></p>
              <p className="text-gray-600 ml-2">HVAC sizing for a medium-sized room</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 2: Water Tank</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Shape: Cylinder</li>
                <li>Radius: 2 m</li>
                <li>Height: 5 m</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Calculation:</strong></p>
              <p className="text-gray-600 ml-2">Volume = π × 2² × 5 = 62.83 m³</p>
              <p className="text-gray-700 mt-3"><strong>Use Case:</strong></p>
              <p className="text-gray-600 ml-2">Storage capacity for cylindrical water tank (62,830 liters)</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 3: Concrete Slab</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Shape: Rectangular Prism</li>
                <li>Length: 6 m</li>
                <li>Width: 4 m</li>
                <li>Height (Thickness): 0.15 m</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Calculation:</strong></p>
              <p className="text-gray-600 ml-2">Volume = 6 × 4 × 0.15 = 3.6 m³</p>
              <p className="text-gray-700 mt-3"><strong>Use Case:</strong></p>
              <p className="text-gray-600 ml-2">Concrete required for foundation slab</p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Example 4: Dome Structure</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><strong>Input:</strong></p>
              <ul className="list-disc list-inside text-gray-600 ml-2">
                <li>Shape: Sphere</li>
                <li>Radius: 5 m</li>
              </ul>
              <p className="text-gray-700 mt-3"><strong>Calculation:</strong></p>
              <p className="text-gray-600 ml-2">Volume = (4/3) × π × 5³ = 523.60 m³</p>
              <p className="text-gray-700 mt-3"><strong>Use Case:</strong></p>
              <p className="text-gray-600 ml-2">Interior volume of spherical dome structure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Tips & Best Practices</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Use consistent units:</strong> Ensure all measurements are in the same unit system (meters or feet) for accurate results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Add wastage factor:</strong> For material estimation, add 5-10% extra to account for wastage and cutting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Double-check dimensions:</strong> Verify all measurements before calculating to avoid costly errors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Use presets:</strong> Start with built-in templates for common structures to save time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Save calculations:</strong> Use the history feature to track multiple calculations for comparison.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold">•</span>
              <span className="text-gray-700 text-sm">
                <strong>Export reports:</strong> Download calculation reports for project documentation and client presentations.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">How do I calculate room volume for HVAC sizing?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Use the rectangular prism option and enter the room's length, width, and height. The volume in cubic meters or feet will help determine the appropriate HVAC capacity. Generally, you need about 20-25 BTU per square foot for cooling.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">What's the difference between cubic meters and cubic feet?</summary>
            <p className="text-gray-700 text-sm mt-2">
              1 cubic meter (m³) equals approximately 35.31 cubic feet (ft³). The calculator automatically handles conversions when you switch units. Use meters for metric system projects and feet for imperial system projects.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">How much concrete do I need for a slab?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Calculate the slab volume using rectangular prism (length × width × thickness). Add 5-10% for wastage. For example, a 6m × 4m × 0.15m slab needs 3.6 m³ of concrete, plus wastage = approximately 4 m³.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">Can I calculate irregular shapes?</summary>
            <p className="text-gray-700 text-sm mt-2">
              For irregular shapes, break them down into multiple regular shapes (rectangular prisms, cylinders, etc.), calculate each volume separately, and sum them up. Use the history feature to track multiple calculations.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">How do I calculate water tank capacity in liters?</summary>
            <p className="text-gray-700 text-sm mt-2">
              Calculate the cylinder volume in cubic meters, then multiply by 1,000 to convert to liters. For example, a tank with 62.83 m³ volume holds 62,830 liters of water.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
            <summary className="font-semibold text-gray-900">What precision should I use for construction calculations?</summary>
            <p className="text-gray-700 text-sm mt-2">
              For most construction purposes, 2-3 decimal places are sufficient. The calculator provides 3 decimal places by default, which is accurate enough for material estimation and structural planning.
            </p>
          </details>
        </div>
      </section>

      {/* Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Benefits of Using This Calculator</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-700 text-sm">
              Get real-time volume calculations as you type with no delays or waiting.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Accurate Formulas</h3>
            <p className="text-gray-700 text-sm">
              Uses standard geometric formulas ensuring precise calculations for professional use.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Shapes</h3>
            <p className="text-gray-700 text-sm">
              Support for rectangular prisms, cylinders, spheres, and cones covers most architectural needs.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">💾</div>
            <h3 className="font-semibold text-gray-900 mb-2">Save & Export</h3>
            <p className="text-gray-700 text-sm">
              Store calculations in history and export detailed reports for documentation.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📐</div>
            <h3 className="font-semibold text-gray-900 mb-2">Unit Conversion</h3>
            <p className="text-gray-700 text-sm">
              Seamlessly switch between metric and imperial units for international projects.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
            <p className="text-gray-700 text-sm">
              Works perfectly on all devices for on-site calculations and field work.
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Professional Applications</h2>
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Architecture & Design</h3>
            <p className="text-gray-700 text-sm">
              Calculate interior volumes for space planning, acoustic design, and environmental control systems. Essential for residential, commercial, and institutional projects.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Construction & Engineering</h3>
            <p className="text-gray-700 text-sm">
              Estimate concrete, fill material, and excavation volumes. Calculate structural element sizes and material quantities for accurate project costing.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">HVAC & MEP</h3>
            <p className="text-gray-700 text-sm">
              Determine room volumes for heating, cooling, and ventilation system sizing. Calculate air change rates and equipment capacity requirements.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Cost Estimation</h3>
            <p className="text-gray-700 text-sm">
              Accurate volume calculations enable precise material quantity takeoffs and cost estimates for budgeting and bidding purposes.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
