import ToolFaq from "@/components/ToolFaq";
import { concreteVolumeCalculatorConfig } from "./config";

export default function ConcreteVolumeCalculatorSEO() {
  const { howToSteps, faq } = concreteVolumeCalculatorConfig.seo;
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Concrete Volume Calculator</h2>
        <p className="mb-4">
          The Concrete Volume Calculator is a professional construction tool designed to help civil engineers, architects, contractors, and builders calculate the exact volume of concrete required for various construction elements. It covers rectangular, round, triangular and L-shaped slabs as well as columns, beams and footings, and gives the result in cubic yards, cubic feet and m³.
        </p>
        <p>
          Whether you're working on residential construction, commercial projects, or infrastructure development, this calculator helps you avoid material wastage, cost overruns, and calculation errors by giving precise volumes, an optional cost at your own price per cubic yard or m³, and batch totals for projects with several pours.
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Volume Calculation Formulas</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Rectangular Prism (Slab, Beam, Footing)</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Volume = Length × Width × Height (or Thickness/Depth)
            </code>
            <p className="mt-2 text-sm">
              <strong>Example:</strong> Slab 20 ft × 12 ft × 4 in = 20 × 12 × 0.333 = 80 cu ft ≈ 2.96 yd³; in metric, 10 m × 5 m × 15 cm = 7.5 m³
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Round, Triangular and L-Shaped Slabs</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Round: π × r² × t · Triangle: ½ × base × height × t · L-shape: (L1 × W1 + L2 × W2) × t
            </code>
            <p className="mt-2 text-sm">
              <strong>Example:</strong> A 12 ft diameter patio 4 in thick is π × 6² × 0.333 ≈ 37.7 cu ft ≈ 1.4 yd³.
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
              1 m³ = 35.3147 ft³ = 1.308 yd³ · 1 yd³ = 27 ft³
            </code>
            <p className="mt-2 text-sm">
              Slab thickness is entered in inches (feet mode) or centimeters (meter mode) and converted for you.
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
                <td className="px-4 py-3 text-sm">Thickness: 4–6 in (10–15 cm)</td>
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
          {concreteVolumeCalculatorConfig.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>{f}</span>
            </li>
          ))}
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

      <ToolFaq items={faq} />

    </div>
  );
}
