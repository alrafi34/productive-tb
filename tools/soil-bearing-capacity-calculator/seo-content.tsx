export default function SoilBearingCapacityCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Soil Bearing Capacity Calculator
        </h2>
        <p className="mb-4">
          The Soil Bearing Capacity Calculator is a professional engineering tool that helps civil engineers, architects, and construction professionals estimate the maximum load that soil can safely support for foundation design. Using Terzaghi's bearing capacity equation, this calculator provides instant, accurate estimates for shallow foundations.
        </p>
        <p>
          This tool is essential for preliminary foundation design, helping you determine whether the soil at your construction site can support the planned structure. It calculates both ultimate and safe bearing capacity, taking into account soil properties, foundation dimensions, water table position, and safety factors.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Soil Bearing Capacity Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Select your measurement unit (meters or feet)</li>
          <li>Choose a soil type preset or enter custom soil parameters</li>
          <li>Enter foundation width (B) and depth (Df)</li>
          <li>Input soil properties: unit weight (γ), cohesion (c), and friction angle (φ)</li>
          <li>Set the factor of safety (typically 2.5-3.0)</li>
          <li>Select water table position relative to foundation</li>
          <li>View instant results including safe bearing capacity and bearing capacity factors</li>
          <li>Review engineering notes and recommendations</li>
          <li>Export results as text or CSV for documentation</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Terzaghi's Bearing Capacity Formula
        </h2>
        <p className="mb-4">
          The calculator uses Terzaghi's bearing capacity equation for shallow foundations:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <p className="font-mono text-sm">
            q_ult = c × Nc + γ × Df × Nq + 0.5 × γ × B × Nγ
          </p>
        </div>
        <p className="mb-4">Where:</p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li><strong>q_ult</strong> = Ultimate bearing capacity (kN/m²)</li>
          <li><strong>c</strong> = Cohesion of soil (kPa)</li>
          <li><strong>γ</strong> = Unit weight of soil (kN/m³)</li>
          <li><strong>Df</strong> = Depth of foundation (m)</li>
          <li><strong>B</strong> = Width of foundation (m)</li>
          <li><strong>Nc, Nq, Nγ</strong> = Bearing capacity factors (depend on friction angle φ)</li>
        </ul>
        <p>
          The safe bearing capacity is calculated by dividing the ultimate bearing capacity by the factor of safety, with adjustments for water table position.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Soil Types and Properties
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clay Soils</h3>
            <p>
              Cohesive soils with friction angle (φ) typically 0°. Bearing capacity depends primarily on cohesion (c). Soft clay: 25 kPa, Medium clay: 50 kPa, Stiff clay: 100 kPa.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sandy Soils</h3>
            <p>
              Granular soils with zero cohesion. Bearing capacity depends on friction angle (φ). Loose sand: 28°, Medium sand: 32°, Dense sand: 38°.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Silt</h3>
            <p>
              Fine-grained soil with moderate cohesion (15 kPa) and friction angle (28°). Intermediate properties between clay and sand.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gravel</h3>
            <p>
              Coarse granular soil with high friction angle (35°) and zero cohesion. Excellent bearing capacity for shallow foundations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rock</h3>
            <p>
              Very high strength material with high cohesion (500 kPa) and friction angle (45°). Provides excellent foundation support.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Bearing Capacity Factors
        </h2>
        <p className="mb-4">
          Bearing capacity factors (Nc, Nq, Nγ) are dimensionless coefficients that depend on the soil's angle of internal friction (φ). These factors are calculated using:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Nq</strong> = e^(π × tan φ) × tan²(45° + φ/2)</li>
          <li><strong>Nc</strong> = (Nq - 1) / tan φ</li>
          <li><strong>Nγ</strong> = 2 × (Nq + 1) × tan φ</li>
        </ul>
        <p className="mt-4">
          For pure clay (φ = 0°), the factors are: Nc = 5.7, Nq = 1.0, Nγ = 0.0
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Factor of Safety
        </h2>
        <p className="mb-4">
          The factor of safety (FOS) is applied to account for uncertainties in soil properties, loading conditions, and construction quality. Typical values:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>1.5</strong> - Low risk structures with good soil data</li>
          <li><strong>2.0</strong> - Standard residential and commercial buildings</li>
          <li><strong>2.5</strong> - Important structures or uncertain soil conditions</li>
          <li><strong>3.0</strong> - Critical structures or poor soil data</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Water Table Effects
        </h2>
        <p className="mb-4">
          The position of the groundwater table significantly affects bearing capacity:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Below Foundation</strong> - No reduction in bearing capacity</li>
          <li><strong>At Foundation Level</strong> - 10% reduction due to buoyancy effects</li>
          <li><strong>Above Foundation</strong> - 20% reduction, consider dewatering or deep foundations</li>
        </ul>
        <p className="mt-4">
          High water tables reduce effective stress and can cause settlement issues. Consider drainage systems or foundation depth adjustments.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Applications
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Preliminary foundation design for buildings</li>
          <li>Shallow foundation sizing (strip footings, spread footings)</li>
          <li>Feasibility studies for construction projects</li>
          <li>Comparison of different foundation options</li>
          <li>Educational purposes for civil engineering students</li>
          <li>Quick estimates during site visits</li>
          <li>Verification of geotechnical reports</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Important Considerations
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>These calculations provide preliminary estimates only</li>
          <li>Always conduct detailed soil investigation for final design</li>
          <li>Consider settlement analysis in addition to bearing capacity</li>
          <li>Account for eccentric loading and moment effects</li>
          <li>Verify local building codes and requirements</li>
          <li>Consider seasonal variations in water table</li>
          <li>Consult a licensed geotechnical engineer for critical structures</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Real-time calculation using Terzaghi's formula</li>
          <li>Multiple soil type presets with typical properties</li>
          <li>Automatic bearing capacity factor calculation</li>
          <li>Water table position adjustment</li>
          <li>Customizable factor of safety</li>
          <li>Unit conversion (meters/feet)</li>
          <li>Engineering notes and recommendations</li>
          <li>Calculation history with localStorage</li>
          <li>Export results to text or CSV</li>
          <li>Copy results to clipboard</li>
          <li>Status indicators (safe/moderate/unsafe)</li>
          <li>Mobile-responsive design</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is bearing capacity?
            </h3>
            <p>
              Bearing capacity is the maximum load per unit area that soil can support without shear failure or excessive settlement. It's a critical parameter for foundation design.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What's the difference between ultimate and safe bearing capacity?
            </h3>
            <p>
              Ultimate bearing capacity is the maximum load soil can theoretically support before failure. Safe bearing capacity is the ultimate capacity divided by a factor of safety, providing a margin for uncertainties.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              When should I use this calculator?
            </h3>
            <p>
              Use this calculator for preliminary estimates, feasibility studies, and educational purposes. Always conduct detailed soil testing and consult a geotechnical engineer for final foundation design.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What if I don't know the soil properties?
            </h3>
            <p>
              Use the soil type presets which provide typical values for common soil types. However, for actual construction, you must obtain soil properties through laboratory testing of site samples.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Is this calculator suitable for deep foundations?
            </h3>
            <p>
              No, this calculator uses Terzaghi's equation which is specifically for shallow foundations (depth less than width). Deep foundations like piles require different analysis methods.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Related Tools
        </h2>
        <p>
          Enhance your foundation design workflow with these complementary calculators:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Foundation Depth Calculator - Determine required foundation depth</li>
          <li>Footing Size Calculator - Calculate footing dimensions</li>
          <li>Structural Load Calculator - Estimate loads on foundations</li>
          <li>Concrete Volume Calculator - Calculate concrete requirements</li>
          <li>Excavation Volume Calculator - Estimate earthwork quantities</li>
        </ul>
      </section>
    </div>
  );
}
