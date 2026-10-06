import ToolFaq from "@/components/ToolFaq";
import { drainageSystemCalculatorConfig } from "./config";

export default function DrainageSystemCalculatorSEO() {
  const { howToSteps, faq } = drainageSystemCalculatorConfig.seo;
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Drainage System Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Drainage System Calculator is a professional online engineering utility for estimating and designing land drainage systems. It uses the Rational Method for peak runoff flow and Manning&apos;s Equation for pipe and channel capacity — the two most widely used formulas in civil and agricultural drainage engineering. The tool is 100% front-end, requires no installation, and delivers instant results for engineers, planners, contractors, and students.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Calculator</h2>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Rational Method</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Rational Method is the standard formula for estimating peak stormwater runoff from small drainage areas (typically under 80 hectares):
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <code className="text-gray-800 font-mono">Q = C × I × A / 360</code>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Where Q is peak flow rate (m³/s), C is the dimensionless runoff coefficient (0.1–1.0), I is rainfall intensity (mm/hr), and A is drainage area (hectares). The divisor 360 converts units to m³/s.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Manning&apos;s Equation for Pipe and Channel Flow</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <code className="text-gray-800 font-mono">Q = (1/n) × A × R^(2/3) × S^(1/2)</code>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Q is flow rate (m³/s), n is Manning&apos;s roughness coefficient, A is cross-sectional flow area (m²), R is hydraulic radius (m), and S is slope (dimensionless). For a full circular pipe, R = D/4 where D is diameter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Runoff Coefficients by Surface Type</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Surface Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">C Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  ["Concrete / Pavement", "0.90", "Impervious — nearly all rain becomes runoff"],
                  ["Asphalt", "0.85", "Roads, parking lots"],
                  ["Commercial Area", "0.70", "Mixed impervious surfaces"],
                  ["Residential Area", "0.50", "Typical suburban lots"],
                  ["Gravel Surface", "0.35", "Driveways, unpaved roads"],
                  ["Clay Soil", "0.40", "Low permeability soil"],
                  ["Grass / Lawn", "0.20", "Well-maintained turf"],
                  ["Sandy Soil", "0.15", "High permeability"],
                  ["Forest / Woodland", "0.10", "Dense vegetation, high infiltration"],
                ].map(([surface, c, note]) => (
                  <tr key={surface}>
                    <td className="px-4 py-3 text-sm text-gray-900">{surface}</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-700">{c}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Applications</h2>
          <ul className="space-y-2 text-gray-700">
            {[
              ["Agricultural Drainage", "Size field drains and lateral pipes for farmland runoff management."],
              ["Stormwater Management", "Design storm sewer systems for residential and commercial developments."],
              ["Road and Highway Drainage", "Calculate roadside ditch and culvert capacity for highway projects."],
              ["Construction Site Drainage", "Estimate temporary drainage requirements during earthwork."],
              ["Garden and Landscape Drainage", "Size French drains and surface channels for residential properties."],
              ["Flood Risk Assessment", "Evaluate overflow risk and recommend mitigation measures."],
            ].map(([title, desc]) => (
              <li key={title} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>{title}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Guidelines</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Minimum Slope</h3>
              <p className="text-sm text-blue-800">Gravity drainage pipes require a minimum slope of 0.4% (1:250) to maintain self-cleansing velocity. Flatter slopes cause sediment buildup and blockages.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Safe Flow Velocity</h3>
              <p className="text-sm text-green-800">Maintain pipe velocity between 0.6 m/s (minimum self-cleansing) and 3.0 m/s (maximum to prevent erosion). Channels should stay below 2.5 m/s for unlined earth.</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-2">Pipe Fill Ratio</h3>
              <p className="text-sm text-yellow-800">Design pipes to run at 60–80% full under peak flow. This provides a safety margin for unexpected rainfall surges and future development.</p>
            </div>
          </div>
        </section>

        <ToolFaq items={faq} />

      </div>
    </div>
  );
}
