export default function FoundationDepthCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Foundation Depth Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Foundation Depth Calculator is a professional engineering tool designed to help civil engineers, architects, and construction professionals determine the required depth of building foundations based on multiple critical factors including soil type, load conditions, frost depth, groundwater level, and safety requirements.
        </p>
        <p className="text-gray-700 leading-relaxed">
          This calculator uses established geotechnical engineering principles to provide accurate foundation depth estimates, taking into account soil bearing capacity, environmental conditions, and structural safety factors. It's an essential tool for preliminary foundation design and planning.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Foundation Depth Calculator</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Select Soil Type:</strong> Choose from clay, sand, silt, gravel, or rock based on your site conditions</li>
          <li><strong>Enter Load:</strong> Input the expected load on the foundation in kN/m²</li>
          <li><strong>Set Frost Depth:</strong> Enter the local frost penetration depth in meters or feet</li>
          <li><strong>Choose Groundwater Level:</strong> Select low, medium, or high based on site conditions</li>
          <li><strong>Select Safety Factor:</strong> Choose appropriate safety factor (1.5, 2.0, or 2.5)</li>
          <li><strong>Pick Foundation Type:</strong> Select from shallow, strip, raft, or pile foundation</li>
          <li><strong>Review Results:</strong> Get instant calculation with safety status and engineering notes</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Soil Bearing Capacity</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Default Bearing Capacities:</h3>
          <ul className="space-y-1 text-gray-700">
            <li><strong>Clay:</strong> 75 kN/m² - Soft to medium clay soil</li>
            <li><strong>Sand:</strong> 150 kN/m² - Compact sand with good drainage</li>
            <li><strong>Silt:</strong> 100 kN/m² - Fine-grained soil</li>
            <li><strong>Gravel:</strong> 300 kN/m² - Coarse gravel with excellent bearing</li>
            <li><strong>Rock:</strong> 1000 kN/m² - Solid rock with highest capacity</li>
          </ul>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Soil bearing capacity is the ability of soil to support loads from structures. The calculator uses standard values but also allows you to input custom bearing capacity values for more accurate site-specific calculations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Factors in Foundation Depth</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Soil Type and Bearing Capacity</h3>
            <p className="text-gray-700">
              Different soil types have varying load-bearing capacities. Weaker soils like clay require deeper foundations to distribute loads effectively, while rock can support structures with shallower foundations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Frost Depth</h3>
            <p className="text-gray-700">
              Foundations must extend below the frost line to prevent heaving and structural damage from freeze-thaw cycles. The calculator ensures the foundation depth meets or exceeds local frost penetration requirements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Groundwater Level</h3>
            <p className="text-gray-700">
              High groundwater levels reduce soil bearing capacity and require deeper foundations. The calculator applies appropriate adjustments (10-15%) based on water table conditions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Safety Factor</h3>
            <p className="text-gray-700">
              Safety factors account for uncertainties in soil properties and loading conditions. Higher safety factors (2.5) are recommended for critical structures, while standard buildings typically use 2.0.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Foundation Types</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Shallow Foundation</h3>
            <p className="text-sm text-gray-700">
              Used when soil has adequate bearing capacity near the surface. Includes spread footings and mat foundations. Most economical option for stable soil conditions.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Strip Footing</h3>
            <p className="text-sm text-gray-700">
              Continuous foundation supporting load-bearing walls. Distributes loads along the length of walls. Common in residential construction.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Raft Foundation</h3>
            <p className="text-sm text-gray-700">
              Large concrete slab covering entire building area. Distributes loads over maximum area. Ideal for weak soils or heavy structures.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Pile Foundation</h3>
            <p className="text-sm text-gray-700">
              Deep foundation transferring loads to stronger soil layers or bedrock. Used when surface soil is inadequate. Requires specialized equipment.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Formula</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-800 font-mono text-sm mb-2">
            Depth = max(Frost Depth, (Load / Bearing Capacity) × Safety Factor) × Adjustments
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Where adjustments include water level factors (1.0-1.15) and foundation type factors (0.95-1.2)
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Applications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Residential building foundation design</li>
          <li>Commercial structure preliminary planning</li>
          <li>Foundation cost estimation</li>
          <li>Site feasibility studies</li>
          <li>Geotechnical engineering assessments</li>
          <li>Construction project planning</li>
          <li>Building permit applications</li>
          <li>Foundation repair and retrofitting</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Considerations</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-gray-800 font-semibold mb-2">⚠️ Professional Consultation Required</p>
          <p className="text-sm text-gray-700">
            This calculator provides preliminary estimates based on simplified engineering principles. Actual foundation design must be performed by licensed structural engineers and geotechnical professionals who can conduct site-specific soil testing and analysis. Local building codes and regulations must be followed.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is the minimum foundation depth?</h3>
            <p className="text-gray-700">
              Minimum foundation depth is typically determined by local frost depth requirements, usually ranging from 0.6m to 1.5m (2-5 feet) depending on climate zone. The calculator ensures foundations meet or exceed this minimum.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How does soil type affect foundation depth?</h3>
            <p className="text-gray-700">
              Weaker soils like clay require deeper foundations to distribute loads over a larger area, while stronger soils like rock can support structures with shallower foundations. The calculator automatically adjusts depth based on soil bearing capacity.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What safety factor should I use?</h3>
            <p className="text-gray-700">
              Standard buildings typically use a safety factor of 2.0. Use 1.5 for temporary structures or when soil properties are well-known. Use 2.5 for critical structures like hospitals or when soil conditions are uncertain.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I use this for all foundation types?</h3>
            <p className="text-gray-700">
              The calculator supports shallow foundations, strip footings, raft foundations, and pile foundations. Each type has different depth requirements and load distribution characteristics that are factored into the calculations.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Using This Calculator</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Instant foundation depth calculations with real-time updates</li>
          <li>Considers multiple critical factors (soil, load, frost, water)</li>
          <li>Provides safety status assessment (safe, risky, critical)</li>
          <li>Includes engineering notes and recommendations</li>
          <li>Supports both metric and imperial units</li>
          <li>Export results for documentation and reporting</li>
          <li>Save calculation history for project tracking</li>
          <li>Free to use with no registration required</li>
        </ul>
      </section>
    </div>
  );
}
