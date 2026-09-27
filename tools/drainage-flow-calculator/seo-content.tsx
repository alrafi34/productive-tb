import ToolFaq from "@/components/ToolFaq";
import { drainageFlowCalculatorConfig } from "./config";

export default function DrainageFlowCalculatorSEO() {
  const { howToSteps, faq } = drainageFlowCalculatorConfig.seo;
  return (
    <div className="mt-12 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Drainage Flow Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Drainage Flow Calculator is a professional engineering tool that calculates water flow rates through drainage systems using Manning's equation. This calculator supports both pipe flow (circular cross-sections) and open channel flow (rectangular cross-sections), making it ideal for civil engineers, architects, contractors, and students working on stormwater management, sewer design, and irrigation projects.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Manning's Equation Explained</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Manning's equation is the most widely used formula for calculating open channel and pipe flow in civil engineering. The equation is:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <code className="text-gray-800">Q = (1/n) × A × R^(2/3) × S^(1/2)</code>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Where Q is flow rate (m³/s), n is Manning's roughness coefficient, A is cross-sectional area (m²), R is hydraulic radius (m), and S is slope. The hydraulic radius is calculated as R = A / P, where P is the wetted perimeter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Manning's Roughness Coefficients</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manning's n</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">PVC Pipe</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.009</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Smooth plastic pipes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Concrete Pipe</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.013</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Standard concrete drainage</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Earth Channel</td>
                  <td className="px-4 py-3 text-sm text-gray-700">0.022</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Natural soil channels</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Applications</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Stormwater Drainage:</strong> Design storm sewer systems and calculate capacity for rainfall runoff</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Sanitary Sewers:</strong> Size wastewater collection pipes for residential and commercial developments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Irrigation Channels:</strong> Calculate flow rates for agricultural water distribution systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Roadside Ditches:</strong> Design drainage channels for highway and road projects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Culvert Design:</strong> Determine flow capacity for culverts under roads and embankments</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Guidelines</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Velocity Considerations</h3>
              <p className="text-sm text-blue-800">
                Maintain flow velocity between 0.6 and 3.0 m/s. Lower velocities may cause sediment deposition, while higher velocities can cause erosion and pipe damage.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Slope Requirements</h3>
              <p className="text-sm text-green-800">
                Minimum slope for sewers is typically 0.4% (0.004) to ensure self-cleansing. Maximum slope depends on material and erosion resistance.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-2">Pipe Sizing</h3>
              <p className="text-sm text-yellow-800">
                Always design for peak flow conditions and include a safety factor. Consider future development and increased runoff when sizing drainage systems.
              </p>
            </div>
          </div>
        </section>

        <ToolFaq items={faq} />

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculations</h2>
          <p className="text-gray-700 leading-relaxed">
            For comprehensive drainage design, consider using our related calculators: Excavation Volume Calculator for trench sizing, Concrete Volume Calculator for pipe bedding, and Slope Stability Calculator for channel bank design. These tools work together to provide complete drainage system design support.
          </p>
        </section>

      </div>
    </div>
  );
}
