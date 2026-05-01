export default function ConcreteVolumeCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Concrete Volume Calculator</h2>
        <p className="mb-4">
          The Concrete Volume Calculator is a professional construction tool designed to help civil engineers, architects, contractors, and builders calculate the exact volume of concrete required for various construction elements. This browser-based utility supports multiple shapes including slabs, columns, beams, and footings, providing instant and accurate results.
        </p>
        <p>
          Whether you're working on residential construction, commercial projects, or infrastructure development, this calculator helps you avoid material wastage, cost overruns, and calculation errors by providing precise volume outputs with optional unit conversions and batch calculation support.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Select Shape Type</h3>
            <p className="text-sm">
              Choose the construction element you need to calculate: Slab, Column, Beam, or Footing. The input fields will automatically adjust based on your selection.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Enter Dimensions</h3>
            <p className="text-sm">
              Input the dimensions for your selected shape. For slabs and footings, enter length, width, and thickness/depth. For columns, enter radius and height. For beams, enter length, width, and height.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Example:</strong> For a 10m × 5m slab with 0.15m thickness, enter: Length=10, Width=5, Thickness=0.15
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Set Quantity</h3>
            <p className="text-sm">
              If you have multiple identical structures, enter the quantity. The calculator will automatically multiply the unit volume by the quantity to give you the total volume needed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: Add to Batch (Optional)</h3>
            <p className="text-sm">
              For projects with multiple different elements, use the "Add to Batch" feature to combine calculations. The tool will automatically sum up all volumes and allow you to export the complete list.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Volume Calculation Formulas</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Rectangular Prism (Slab, Beam, Footing)</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Volume = Length × Width × Height (or Thickness/Depth)
            </code>
            <p className="mt-2 text-sm">
              <strong>Example:</strong> Slab 10m × 5m × 0.15m = 7.5 m³
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Cylinder (Column)</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Volume = π × r² × h
            </code>
            <p className="mt-2 text-sm">
              <strong>Example:</strong> Column with radius 0.25m and height 3m = π × 0.25² × 3 ≈ 0.589 m³
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Unit Conversion</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              1 cubic meter (m³) = 35.3147 cubic feet (ft³)
            </code>
            <p className="mt-2 text-sm">
              The calculator automatically handles conversions between meters and feet.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Construction Elements</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Element</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Shape</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Typical Dimensions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Floor Slab</td>
                <td className="px-4 py-3 text-sm">Rectangular</td>
                <td className="px-4 py-3 text-sm">Thickness: 0.1-0.15m (4-6 inches)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Column</td>
                <td className="px-4 py-3 text-sm">Cylindrical</td>
                <td className="px-4 py-3 text-sm">Radius: 0.15-0.3m, Height: 3-4m</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Beam</td>
                <td className="px-4 py-3 text-sm">Rectangular</td>
                <td className="px-4 py-3 text-sm">Width: 0.23-0.3m, Height: 0.3-0.6m</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold">Footing</td>
                <td className="px-4 py-3 text-sm">Rectangular</td>
                <td className="px-4 py-3 text-sm">Depth: 0.3-0.6m</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Multiple shape calculations (slab, column, beam, footing)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Real-time volume calculations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Unit conversion (meters ↔ feet)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Batch calculation support</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Quantity multiplier for identical structures</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Calculation history with localStorage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Export to CSV and text formats</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Mobile-responsive design</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-1">Residential Construction</h3>
            <p className="text-sm text-blue-800">
              Calculate concrete for house foundations, floor slabs, columns, and beams in residential buildings.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-1">Commercial Projects</h3>
            <p className="text-sm text-green-800">
              Estimate concrete volumes for large-scale construction projects, office buildings, and shopping centers.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-1">Infrastructure Development</h3>
            <p className="text-sm text-purple-800">
              Plan concrete requirements for bridges, roads, and public infrastructure projects.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-1">DIY Projects</h3>
            <p className="text-sm text-orange-800">
              Calculate materials for home improvement projects like patios, driveways, and garden paths.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Accurate Calculations</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Always add 5-10% extra concrete to account for wastage and spillage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Double-check all measurements before ordering concrete</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use consistent units throughout your calculations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>For complex shapes, break them down into simpler components</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use the batch feature for projects with multiple elements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Save calculations to history for future reference</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How much concrete do I need for a 10×10 slab?</h3>
            <p className="text-sm">
              For a 10m × 10m slab with standard 0.15m (6 inch) thickness, you'll need 15 cubic meters of concrete. Always add 5-10% extra for wastage.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Can I calculate volume in feet?</h3>
            <p className="text-sm">
              Yes! The calculator supports both meters and feet. Simply select your preferred unit, and the tool will handle all conversions automatically.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What is the batch calculation feature?</h3>
            <p className="text-sm">
              The batch feature allows you to add multiple calculations together. This is useful for projects with different elements (slabs, columns, beams) where you need a total concrete volume.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How accurate are these calculations?</h3>
            <p className="text-sm">
              The calculator uses standard geometric formulas and provides accurate results. However, always consult with a structural engineer for critical structural elements and add appropriate safety margins.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
