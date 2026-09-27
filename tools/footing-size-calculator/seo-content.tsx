import ToolFaq from "@/components/ToolFaq";
import { footingSizeCalculatorConfig } from "./config";

export default function FootingSizeCalculatorSEO() {
  const { howToSteps, faq } = footingSizeCalculatorConfig.seo;
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Footing Size Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Footing Size Calculator is a professional engineering tool designed to help structural engineers, civil engineers, and construction professionals calculate the required dimensions of foundation footings based on structural loads and soil bearing capacity. This calculator provides instant, accurate results for both square and rectangular footings.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Using established structural engineering principles, this tool calculates the minimum footing area required to safely distribute building loads to the soil, taking into account safety factors and soil conditions. It's an essential tool for preliminary foundation design and structural planning.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Footing Size Calculator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Footing Design</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is a Footing?</h3>
            <p className="text-gray-700">
              A footing is a structural element that transfers loads from columns or walls to the soil. It spreads the concentrated load over a larger area to ensure the soil can safely support the structure without excessive settlement or failure.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Calculation Formula</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-800 font-mono text-sm mb-2">
                Required Area = (Load × Factor of Safety) / Soil Bearing Capacity
              </p>
              <p className="text-sm text-gray-700 mt-2">
                For square footings: Side = √Area<br />
                For rectangular footings: Width = √(Area / Ratio), Length = Width × Ratio
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Parameters Explained</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Total Load</h3>
            <p className="text-gray-700">
              The total load includes dead load (permanent weight of structure) plus live load (occupancy and movable loads). This is the total force that the footing must support and transfer to the soil.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Safe Bearing Capacity (SBC)</h3>
            <p className="text-gray-700">
              The maximum pressure that soil can safely support without risk of shear failure or excessive settlement. This value is determined through soil testing and varies by soil type:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 ml-4">
              <li>Clay: 75-150 kN/m²</li>
              <li>Sand: 150-300 kN/m²</li>
              <li>Gravel: 300-600 kN/m²</li>
              <li>Rock: 1000+ kN/m²</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Factor of Safety</h3>
            <p className="text-gray-700">
              A multiplier applied to account for uncertainties in load estimation, soil properties, and construction quality. Standard values:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 ml-4">
              <li>1.5: Minimum for well-known conditions</li>
              <li>2.0: Standard for most buildings</li>
              <li>2.5-3.0: For critical structures or uncertain conditions</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Footing Types</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Square Footing</h3>
            <p className="text-sm text-gray-700">
              Most common type where length equals width. Provides uniform load distribution in all directions. Ideal for isolated columns with equal loading in both directions. Easier to construct and more economical for most applications.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Rectangular Footing</h3>
            <p className="text-sm text-gray-700">
              Used when space constraints exist or when loads are unequal in different directions. The length/width ratio is typically between 1.5 and 3.0. Useful near property lines or when footings must fit between existing structures.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Applications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Residential building foundation design</li>
          <li>Commercial structure column footings</li>
          <li>Industrial facility foundation planning</li>
          <li>Preliminary structural design estimates</li>
          <li>Foundation cost estimation</li>
          <li>Structural engineering education</li>
          <li>Building permit applications</li>
          <li>Foundation repair and retrofitting</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Considerations</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Minimum Dimensions</h3>
            <p className="text-gray-700">
              Practical minimum footing dimensions are typically 0.5m (1.64ft) to ensure adequate concrete cover and reinforcement placement. Very small footings may be difficult to construct and may not provide adequate stability.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Maximum Dimensions</h3>
            <p className="text-gray-700">
              Footings larger than 5m (16.4ft) in any dimension may require special consideration. Very large footings may need to be divided into multiple smaller footings or a raft foundation may be more appropriate.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Depth Requirements</h3>
            <p className="text-gray-700">
              Footing depth must be sufficient to reach below frost line, avoid weak surface soils, and provide adequate embedment. Typical depths range from 0.6m to 2.0m depending on local conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Load Scenarios</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <ul className="space-y-2 text-gray-700">
            <li><strong>Light Residential (100 kN):</strong> Single-story homes, small structures</li>
            <li><strong>Medium Residential (200 kN):</strong> Two-story homes, typical residential buildings</li>
            <li><strong>Heavy Residential (300 kN):</strong> Multi-story residential, heavy construction</li>
            <li><strong>Light Commercial (500 kN):</strong> Small commercial buildings, retail spaces</li>
            <li><strong>Heavy Commercial (1000 kN):</strong> Large commercial buildings, warehouses</li>
            <li><strong>Industrial (1500+ kN):</strong> Industrial facilities, heavy equipment support</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Considerations</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-gray-800 font-semibold mb-2">⚠️ Professional Design Required</p>
          <p className="text-sm text-gray-700">
            This calculator provides preliminary estimates for planning purposes. Actual footing design must be performed by licensed structural engineers who can account for site-specific conditions, local building codes, seismic requirements, and detailed structural analysis. Soil testing and geotechnical investigation are essential for accurate bearing capacity determination.
          </p>
        </div>
      </section>

      <ToolFaq items={faq} />

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Using This Calculator</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Instant footing size calculations with real-time updates</li>
          <li>Support for both square and rectangular footings</li>
          <li>Metric and imperial unit systems</li>
          <li>Visual footing diagram for better understanding</li>
          <li>Design warnings for practical considerations</li>
          <li>Common load scenario presets for quick estimates</li>
          <li>Export results for documentation and reporting</li>
          <li>Calculation history for project tracking</li>
          <li>Free to use with no registration required</li>
        </ul>
      </section>
    </div>
  );
}
