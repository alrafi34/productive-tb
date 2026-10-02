import ToolFaq from "@/components/ToolFaq";
import { sandCalculatorConfig } from "./config";

export default function SandCalculatorSEO() {
  const { howToSteps, faq } = sandCalculatorConfig.seo;
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Sand Calculator</h2>
        <p className="mb-4">
          The Sand Calculator is a professional construction tool designed to help civil engineers, contractors, architects, and DIY builders estimate the exact amount of sand required for various construction projects. Whether you're working on concrete mixing, plastering, or filling areas, this calculator provides instant, accurate results to optimize material usage and reduce waste.
        </p>
        <p>
          This browser-based utility eliminates manual calculation errors and provides real-time estimates based on industry-standard formulas, making it an essential tool for construction planning and budgeting.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Sand Calculator</h2>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sand Calculation Formulas</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Area Mode Formula</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Volume = Length × Width × Depth
            </code>
            <p className="mt-2 text-sm">
              Direct calculation of sand volume based on area dimensions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Concrete Mix Formula</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Dry Volume = Wet Volume × 1.54<br />
              Sand = (Sand Ratio / Total Ratio) × Dry Volume
            </code>
            <p className="mt-2 text-sm">
              For a 1:2:4 mix, total ratio = 7, so sand = (2/7) × dry volume.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Plaster Formula</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Volume = Area × (Thickness in feet)<br />
              Sand = Volume × 1.27 × 4/5
            </code>
            <p className="mt-2 text-sm">
              Thickness is converted from inches to feet before calculation. The wet plaster volume is
              raised 27% for the dry materials, and sand is 4 of the 5 parts of a 1:4 cement:sand mortar.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Multiple calculation modes (Area, Concrete, Plaster)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Real-time calculation updates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Unit conversion (feet ↔ meters)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Mix ratio presets for concrete</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Calculation history with localStorage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Export results to text file</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Copy results to clipboard</span>
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
            <h3 className="font-semibold text-blue-900 mb-1">Foundation Work</h3>
            <p className="text-sm text-blue-800">
              Calculate sand for foundation filling and leveling before concrete pouring.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-1">Concrete Mixing</h3>
            <p className="text-sm text-green-800">
              Determine exact sand quantity for concrete mix ratios in construction projects.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-1">Wall Plastering</h3>
            <p className="text-sm text-purple-800">
              Estimate sand needed for interior and exterior wall plastering work.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-1">Brickwork Mortar</h3>
            <p className="text-sm text-orange-800">
              Calculate sand requirements for brick masonry mortar preparation.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Mix Ratios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Mix Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Ratio</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Standard Concrete</td>
                <td className="px-4 py-3 text-sm font-mono">1:2:4</td>
                <td className="px-4 py-3 text-sm">General construction work</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">High Strength Concrete</td>
                <td className="px-4 py-3 text-sm font-mono">1:1.5:3</td>
                <td className="px-4 py-3 text-sm">Structural elements</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Lean Mix Concrete</td>
                <td className="px-4 py-3 text-sm font-mono">1:3:6</td>
                <td className="px-4 py-3 text-sm">Foundations and mass concrete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Accurate Calculations</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Always add 5-10% extra sand to account for wastage and spillage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use consistent units throughout your calculations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>For concrete work, remember that dry volume is 1.54 times wet volume</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Check sand quality - clean, sharp sand is best for construction</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Store calculations in history for future reference and project planning</span>
          </li>
        </ul>
      </section>

      <ToolFaq items={faq} />

    </div>
  );
}
