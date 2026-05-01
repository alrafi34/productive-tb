export default function SlabConcreteCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Slab Concrete Calculator</h2>
        <p className="mb-4">
          The Advanced Slab Concrete Calculator is a professional construction tool designed to help civil engineers, contractors, architects, and DIY builders accurately estimate the volume of concrete required for slab construction. This browser-based utility provides instant calculations with support for multiple units and optional cost estimation.
        </p>
        <p>
          Whether you're planning a residential driveway, commercial floor slab, or industrial foundation, this calculator eliminates manual calculation errors and helps you order the right amount of concrete, reducing waste and optimizing costs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Select Measurement Unit</h3>
            <p className="text-sm">
              Choose between meters (m) or feet (ft) based on your preference. The calculator will handle all conversions automatically.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Enter Slab Dimensions</h3>
            <p className="text-sm">
              Input the length, width, and thickness of your slab. You can use the thickness presets for common slab sizes (4 inches, 6 inches, 10 cm, 15 cm, etc.).
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Example:</strong> For a 10m × 5m slab with 0.1m thickness, enter: Length=10, Width=5, Thickness=0.1
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Enable Cost Estimation (Optional)</h3>
            <p className="text-sm">
              If you want to estimate the total cost, enable cost estimation and enter the price per cubic meter of concrete in your area.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: View Results</h3>
            <p className="text-sm">
              The calculator instantly displays the concrete volume in multiple units (m³, ft³, yd³), slab area, and optional cost estimate. You can copy, save, or export the results.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Concrete Volume Formula</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Basic Formula</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Volume = Length × Width × Thickness
            </code>
            <p className="mt-2 text-sm">
              <strong>Example:</strong> Slab 10m × 5m × 0.1m = 5 m³
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Unit Conversions</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              1 cubic meter (m³) = 35.3147 cubic feet (ft³)<br />
              1 cubic meter (m³) = 1.30795 cubic yards (yd³)<br />
              1 foot = 0.3048 meters<br />
              1 inch = 0.0254 meters
            </code>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Area Calculation</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Area = Length × Width
            </code>
            <p className="mt-2 text-sm">
              The calculator also shows the total slab area in square meters.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Slab Thickness</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Application</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Thickness (Inches)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Thickness (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Residential Driveway</td>
                <td className="px-4 py-3 text-sm font-mono">4 inches</td>
                <td className="px-4 py-3 text-sm font-mono">10 cm</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Garage Floor</td>
                <td className="px-4 py-3 text-sm font-mono">4-6 inches</td>
                <td className="px-4 py-3 text-sm font-mono">10-15 cm</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Commercial Floor</td>
                <td className="px-4 py-3 text-sm font-mono">6 inches</td>
                <td className="px-4 py-3 text-sm font-mono">15 cm</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Industrial/Warehouse</td>
                <td className="px-4 py-3 text-sm font-mono">8 inches</td>
                <td className="px-4 py-3 text-sm font-mono">20 cm</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Patio/Walkway</td>
                <td className="px-4 py-3 text-sm font-mono">4 inches</td>
                <td className="px-4 py-3 text-sm font-mono">10 cm</td>
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
            <span>Real-time volume calculations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Unit conversion (meters ↔ feet)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Multiple volume units (m³, ft³, yd³)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Cost estimation feature</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Thickness presets for common slabs</span>
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
            <h3 className="font-semibold text-blue-900 mb-1">Residential Driveways</h3>
            <p className="text-sm text-blue-800">
              Calculate concrete for home driveways, typically 4 inches thick for standard vehicles.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-1">Garage Floors</h3>
            <p className="text-sm text-green-800">
              Estimate concrete for garage floors, usually 4-6 inches thick depending on vehicle weight.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-1">Commercial Floors</h3>
            <p className="text-sm text-purple-800">
              Plan concrete for commercial building floors, warehouses, and retail spaces.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-1">Patios & Walkways</h3>
            <p className="text-sm text-orange-800">
              Calculate materials for outdoor patios, walkways, and garden paths.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Accurate Calculations</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Always add 5-10% extra concrete to account for spillage and uneven ground</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Measure dimensions carefully - small errors can lead to significant volume differences</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use consistent units throughout your measurements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Consider the load requirements when choosing slab thickness</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Check local building codes for minimum thickness requirements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Save calculations to history for future reference and project planning</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How much concrete do I need for a 10×10 slab?</h3>
            <p className="text-sm">
              For a 10m × 10m slab with standard 0.1m (4 inch) thickness, you'll need 10 cubic meters of concrete. For a 10ft × 10ft slab with 4 inch thickness, you'll need approximately 1.23 cubic yards.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What thickness should my concrete slab be?</h3>
            <p className="text-sm">
              Standard residential slabs are typically 4 inches (10 cm) thick. For heavier loads like garages, use 6 inches (15 cm). Industrial applications may require 8 inches (20 cm) or more. Always consult local building codes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How do I convert cubic meters to cubic yards?</h3>
            <p className="text-sm">
              Multiply cubic meters by 1.30795 to get cubic yards. The calculator automatically shows results in all common units (m³, ft³, yd³).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Should I order extra concrete?</h3>
            <p className="text-sm">
              Yes, always order 5-10% extra to account for spillage, uneven ground, and measurement variations. It's better to have slightly too much than to run short during pouring.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
