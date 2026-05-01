export default function FootingSizeCalculatorSEO() {
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
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Select Unit System:</strong> Choose between metric (kN, m) or imperial (lb, ft) units</li>
          <li><strong>Choose Footing Type:</strong> Select square or rectangular footing</li>
          <li><strong>Enter Total Load:</strong> Input the total structural load on the footing</li>
          <li><strong>Enter Bearing Capacity:</strong> Input the safe bearing capacity of the soil</li>
          <li><strong>Set Factor of Safety:</strong> Adjust the safety factor (typically 1.5-2.5)</li>
          <li><strong>For Rectangular:</strong> Set the length/width ratio if using rectangular footing</li>
          <li><strong>Review Results:</strong> Get instant footing dimensions and area calculations</li>
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

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is the difference between square and rectangular footings?</h3>
            <p className="text-gray-700">
              Square footings have equal length and width, providing uniform load distribution. Rectangular footings have different length and width dimensions, useful when space is limited in one direction or when loads are unequal.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How do I determine soil bearing capacity?</h3>
            <p className="text-gray-700">
              Soil bearing capacity must be determined through geotechnical investigation including soil testing, boring, and laboratory analysis. Never assume bearing capacity without proper testing. The calculator provides typical values for reference only.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What factor of safety should I use?</h3>
            <p className="text-gray-700">
              Standard practice uses a factor of safety of 2.0 for most buildings. Use 1.5 for temporary structures with well-known conditions, and 2.5-3.0 for critical structures, uncertain soil conditions, or when required by local codes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I use this for all types of foundations?</h3>
            <p className="text-gray-700">
              This calculator is designed for isolated spread footings under columns or walls. For other foundation types like raft foundations, pile caps, or combined footings, specialized analysis is required.
            </p>
          </div>
        </div>
      </section>

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
