import ToolFaq from "@/components/ToolFaq";
import { slabConcreteCalculatorConfig } from "./config";

export default function SlabConcreteCalculatorSEO() {
  const { howToSteps, faq } = slabConcreteCalculatorConfig.seo;
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Slab Concrete Calculator</h2>
        <p className="mb-4">
          The Advanced Slab Concrete Calculator is a professional construction tool designed to help civil engineers, contractors, architects, and DIY builders accurately estimate the volume of concrete required for slab construction. This online utility provides instant calculations with support for multiple units and optional cost estimation.
        </p>
        <p>
          Whether you're planning a residential driveway, commercial floor slab, or industrial foundation, this calculator eliminates manual calculation errors and helps you order the right amount of concrete, reducing waste and optimizing costs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
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
            <span>Calculation history</span>
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

      <ToolFaq items={faq} />

    </div>
  );
}
