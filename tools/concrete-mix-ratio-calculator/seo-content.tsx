import ToolFaq from "@/components/ToolFaq";
import { concreteMixRatioCalculatorConfig } from "./config";

// Materials for 1 m³ and 1 yd³ of concrete, using the calculator's own method:
// dry volume = 1.54 × wet volume, cement at 1,440 kg/m³
const MIXES: [string, number, number, number][] = [
  ["1:3:6", 1, 3, 6],
  ["1:2:4", 1, 2, 4],
  ["1:1.5:3", 1, 1.5, 3],
  ["1:1:2", 1, 1, 2],
];
const DRY = 1.54;
const CEMENT_DENSITY = 1440;
const YD3_M3 = 0.764555;
const US_BAG_KG = 42.6377; // 94 lb

export default function ConcreteMixRatioCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = concreteMixRatioCalculatorConfig.seo;
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Concrete Mix Ratio Calculator</h2>
        <p className="mb-4">
          The Concrete Mix Ratio Calculator is a professional construction tool designed to help civil engineers, architects, contractors, and builders calculate the exact proportions of cement, sand, and aggregate required for concrete production. This online utility eliminates manual calculation errors and provides instant, accurate results based on industry-standard formulas.
        </p>
        <p>
          Whether you're working on residential construction, commercial projects, or infrastructure development, this calculator ensures you get the right material quantities for your concrete mix, helping you optimize costs and reduce waste.
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Concrete Mix Calculation Formula</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Step 1: Calculate Dry Volume</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Dry Volume = Wet Volume × 1.54
            </code>
            <p className="mt-2 text-sm">
              The factor 1.54 accounts for voids between particles in dry materials.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Step 2: Calculate Total Parts</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Total Parts = Cement + Sand + Aggregate
            </code>
            <p className="mt-2 text-sm">
              For ratio 1:2:4, total parts = 1 + 2 + 4 = 7
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Step 3: Calculate Individual Volumes</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Cement Volume = (Cement Ratio / Total Parts) × Dry Volume<br />
              Sand Volume = (Sand Ratio / Total Parts) × Dry Volume<br />
              Aggregate Volume = (Aggregate Ratio / Total Parts) × Dry Volume
            </code>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Step 4: Calculate Cement Weight</h3>
            <code className="block bg-white p-3 rounded border border-gray-300 text-sm">
              Cement Weight (kg) = Cement Volume × 1440 kg/m³<br />
              Number of Bags = Cement Weight / Bag Size
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Nominal Mixes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Mix (cement:sand:gravel)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Typical use</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Typical strength</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-mono font-semibold">1:5:10</td>
                <td className="px-4 py-3 text-sm">Blinding and leveling under footings</td>
                <td className="px-4 py-3 text-sm">≈ 5 MPa (700 psi)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono font-semibold">1:3:6</td>
                <td className="px-4 py-3 text-sm">Mass fill, non-structural work</td>
                <td className="px-4 py-3 text-sm">≈ 10 MPa (1,450 psi)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono font-semibold">1:2:4</td>
                <td className="px-4 py-3 text-sm">Slabs on grade, footings, paths</td>
                <td className="px-4 py-3 text-sm">≈ 15 MPa (2,200 psi)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono font-semibold">1:1.5:3</td>
                <td className="px-4 py-3 text-sm">Beams, columns, suspended slabs</td>
                <td className="px-4 py-3 text-sm">≈ 20 MPa (2,900 psi)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono font-semibold">1:1:2</td>
                <td className="px-4 py-3 text-sm">Heavily loaded members</td>
                <td className="px-4 py-3 text-sm">≈ 25 MPa (3,600 psi)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-mono font-semibold">1:0.75:1.5</td>
                <td className="px-4 py-3 text-sm">High strength; usually a designed mix</td>
                <td className="px-4 py-3 text-sm">≈ 30 MPa (4,350 psi)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Strengths are typical for well-made site-batched concrete, not guaranteed. Structural concrete is specified by
          strength class (ACI 318 in the US, EN 206 in Europe), so follow the engineer&apos;s specification where there is one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Materials per Cubic Meter and Cubic Yard</h2>
        <p className="mb-4">Cement, sand and gravel for one cubic meter (and one cubic yard) of finished concrete, using the 1.54 dry volume factor. Sand and gravel are loose volumes; buy 5–10% extra for waste.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Mix</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Cement per m³</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Sand per m³</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Gravel per m³</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">94 lb bags per yd³</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MIXES.map(([name, c, sa, g]) => {
                const parts = c + sa + g;
                const cementKg = (DRY * c / parts) * CEMENT_DENSITY;
                return (
                  <tr key={name}>
                    <td className="px-4 py-3 text-sm font-mono font-semibold">{name}</td>
                    <td className="px-4 py-3 text-sm font-mono">{Math.round(cementKg)} kg ({(cementKg / 50).toFixed(1)} × 50 kg, {(cementKg / 25).toFixed(1)} × 25 kg)</td>
                    <td className="px-4 py-3 text-sm font-mono">{(DRY * sa / parts).toFixed(2)} m³</td>
                    <td className="px-4 py-3 text-sm font-mono">{(DRY * g / parts).toFixed(2)} m³</td>
                    <td className="px-4 py-3 text-sm font-mono">{((cementKg * YD3_M3) / US_BAG_KG).toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Real-time calculation updates</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Presets from 1:5:10 lean mix to 1:0.75:1.5</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Volume in m³, ft³ or yd³, or from slab length, width and thickness</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Bagged premix count for 40, 60 and 80 lb bags</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Adjustable dry volume factor</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">✓</span>
            <span>Cement bags of 94 lb, 25 kg, 40 kg or 50 kg</span>
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
            <h3 className="font-semibold text-blue-900 mb-1">Residential Construction</h3>
            <p className="text-sm text-blue-800">
              Calculate concrete for house foundations, slabs, columns, and beams.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-1">Commercial Projects</h3>
            <p className="text-sm text-green-800">
              Estimate materials for large-scale construction projects and high-rise buildings.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-1">Infrastructure Development</h3>
            <p className="text-sm text-purple-800">
              Plan concrete requirements for roads, bridges, and public works.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-1">DIY Projects</h3>
            <p className="text-sm text-orange-800">
              Calculate materials for home improvement projects like patios and driveways.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Accurate Calculations</h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Always add 5-10% extra material to account for wastage and spillage</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use the appropriate concrete grade for your specific application</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Ensure consistent units throughout your calculations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>The dry volume factor (1.54) is standard but can be adjusted if needed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Save your calculations to history for future reference</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Verify material quality - use clean, graded aggregates and fresh cement</span>
          </li>
        </ul>
      </section>

      <ToolFaq items={faq} />

    </div>
  );
}
