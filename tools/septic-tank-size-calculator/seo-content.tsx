import ToolFaq from "@/components/ToolFaq";
import { septicTankSizeCalculatorConfig } from "./config";

export default function SepticTankSizeCalculatorSEO() {
  const { howToSteps, faq } = septicTankSizeCalculatorConfig.seo;
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Septic Tank Size Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Septic Tank Size Calculator is a free online tool that helps you determine the required capacity for your septic system based on household size, daily water usage, and retention time. Whether you're a homeowner planning a new septic system, a civil engineer designing wastewater treatment, or a contractor sizing tanks for residential or commercial projects, this calculator provides instant, accurate estimates following industry standards.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Septic Tank Sizing Formula</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator uses a standard formula based on daily wastewater flow and retention requirements:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <code className="text-gray-800">Volume = Users × Water Usage × Retention Time × (1 + Sludge Factor)</code>
          </div>
          <p className="text-gray-700 leading-relaxed">
            This formula ensures adequate capacity for daily wastewater flow, proper settling time, and sludge accumulation. The sludge factor accounts for solid waste buildup between regular pump-outs (typically every 2-3 years).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Water Usage Guidelines</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Liters/Day</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Low Usage</td>
                  <td className="px-4 py-3 text-sm text-gray-700">80-100</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Water-conscious households</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Average Usage</td>
                  <td className="px-4 py-3 text-sm text-gray-700">120-150</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Typical residential use</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">High Usage</td>
                  <td className="px-4 py-3 text-sm text-gray-700">150-200</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Large families, frequent laundry</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Commercial</td>
                  <td className="px-4 py-3 text-sm text-gray-700">60-100</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Offices, light commercial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Retention Time Requirements</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>1 Day:</strong> Minimum for very small systems or pre-treatment tanks. May not meet local codes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>1.5 Days:</strong> Acceptable for some jurisdictions with low flow rates.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>2 Days:</strong> Standard for residential septic systems. Provides adequate settling time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>3 Days:</strong> Extended retention for better treatment or high-strength wastewater.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sludge Accumulation Factors</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Low (20%)</h3>
              <p className="text-sm text-blue-800">
                For systems with frequent pump-outs (annually) or commercial applications with lower solid content.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Medium (30%) - Recommended</h3>
              <p className="text-sm text-green-800">
                Standard for residential systems with pump-outs every 2-3 years. Balances capacity with cost.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-2">High (50%)</h3>
              <p className="text-sm text-yellow-800">
                For systems with infrequent maintenance, high solid loads, or extended pump-out intervals (3-5 years).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tank Design Considerations</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Tank Shape</h3>
              <p className="text-gray-700">Rectangular tanks are most common and efficient. Cylindrical tanks work well for smaller capacities. The calculator suggests rectangular dimensions with a 2:1:1.5 (L:W:D) ratio.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Minimum Depth</h3>
              <p className="text-gray-700">Tanks should be at least 1.2 meters deep to allow proper settling. Deeper tanks (1.5-2m) provide better treatment.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Compartments</h3>
              <p className="text-gray-700">Two-compartment tanks (60:40 or 2:1 ratio) improve treatment efficiency by providing additional settling.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Access Openings</h3>
              <p className="text-gray-700">Include manholes or access ports for inspection and pump-out. Minimum 600mm diameter openings recommended.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Maintenance Requirements</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Regular Pump-Outs:</strong> Schedule professional pump-outs every 2-3 years for residential systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Inspections:</strong> Annual visual inspections to check for leaks, cracks, or structural issues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Sludge Monitoring:</strong> Check sludge levels annually; pump when sludge reaches 1/3 of tank depth</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Avoid Chemicals:</strong> Don't use harsh chemicals or additives that can harm bacterial action</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Water Conservation:</strong> Reduce water usage to extend pump-out intervals and improve treatment</span>
            </li>
          </ul>
        </section>

        <ToolFaq items={faq} />

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculations</h2>
          <p className="text-gray-700 leading-relaxed">
            For complete septic system design, consider using our related calculators: Drainage Flow Calculator for drain field sizing, Excavation Volume Calculator for tank installation planning, and Concrete Volume Calculator for tank construction. These tools work together to support comprehensive wastewater system design.
          </p>
        </section>

      </div>
    </div>
  );
}
