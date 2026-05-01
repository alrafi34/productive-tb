export default function RetainingWallCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Retaining Wall Calculator
        </h2>
        <p className="mb-4">
          The Retaining Wall Calculator is a professional engineering tool designed to help civil engineers, architects, and construction professionals estimate key dimensions and material requirements for retaining wall construction. Using established geotechnical principles and Rankine's earth pressure theory, this calculator provides instant estimates for wall design and planning.
        </p>
        <p>
          This tool calculates lateral earth pressure, recommended base width, concrete volume, and provides stability indicators to help you make informed decisions during the preliminary design phase. While these calculations provide valuable estimates, always consult a licensed structural engineer for final design approval.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Retaining Wall Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Select your unit system (metric or imperial)</li>
          <li>Enter wall dimensions: height, length, and thickness</li>
          <li>Input soil properties: density, friction angle, and backfill slope</li>
          <li>Set the safety factor (typically 1.5-2.0)</li>
          <li>View instant calculations for lateral force and pressure</li>
          <li>Review recommended base width and material volumes</li>
          <li>Check engineering notes and stability status</li>
          <li>Use presets for common wall types</li>
          <li>Save calculations to history or export results</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Lateral Earth Pressure
        </h2>
        <p className="mb-4">
          Lateral earth pressure is the horizontal force exerted by soil against a retaining wall. This calculator uses Rankine's active earth pressure theory to estimate these forces:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <p className="font-mono text-sm mb-2">
            Ka = tan²(45° - φ/2)
          </p>
          <p className="font-mono text-sm">
            P = 0.5 × Ka × γ × H²
          </p>
        </div>
        <p className="mb-4">Where:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Ka</strong> = Active earth pressure coefficient</li>
          <li><strong>φ</strong> = Angle of internal friction (degrees)</li>
          <li><strong>γ</strong> = Unit weight of soil (kN/m³ or pcf)</li>
          <li><strong>H</strong> = Height of wall (m or ft)</li>
          <li><strong>P</strong> = Lateral force per unit length (kN/m or lb/ft)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Wall Design Considerations
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Base Width</h3>
            <p>
              The base width of a retaining wall typically ranges from 0.5 to 0.7 times the wall height. Taller walls and higher safety factors require wider bases for stability. The calculator provides recommendations based on wall height and safety factor.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Wall Thickness</h3>
            <p>
              Wall thickness depends on height, materials, and reinforcement. Typical concrete retaining walls range from 200mm (8") for low walls to 500mm (20") or more for tall walls. Always verify with structural calculations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Factor</h3>
            <p>
              A safety factor of 1.5 to 2.0 is typical for retaining walls. Higher factors provide greater margin against failure but increase construction costs. Critical structures or uncertain soil conditions warrant higher safety factors.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Soil Properties
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Soil Density (Unit Weight)</h3>
            <p>
              Typical values: 16-20 kN/m³ (100-125 pcf). Sandy soils: 18-20 kN/m³. Clay soils: 16-18 kN/m³. Higher density increases lateral pressure on the wall.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Angle of Internal Friction (φ)</h3>
            <p>
              Represents soil shear strength. Sandy soils: 30-40°. Clay soils: 0-20°. Gravel: 35-45°. Higher friction angles reduce lateral pressure. Obtain from soil testing for accurate design.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Backfill Slope (β)</h3>
            <p>
              Angle of ground surface behind wall. Horizontal backfill: 0°. Sloped backfill significantly increases lateral pressure. Limit slopes to 15-20° when possible or use terracing.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Types of Retaining Walls
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Gravity Walls</strong> - Rely on mass for stability, typically masonry or concrete</li>
          <li><strong>Cantilever Walls</strong> - Reinforced concrete with base slab, most common type</li>
          <li><strong>Counterfort Walls</strong> - Cantilever with vertical ribs for tall walls</li>
          <li><strong>Buttress Walls</strong> - Similar to counterfort but ribs on visible side</li>
          <li><strong>Anchored Walls</strong> - Use cables or rods anchored into soil or rock</li>
          <li><strong>Mechanically Stabilized Earth (MSE)</strong> - Modular blocks with soil reinforcement</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Failure Modes
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Overturning</h3>
            <p>
              Wall rotates about toe due to excessive lateral pressure. Prevented by adequate base width and proper weight distribution. Safety factor against overturning should exceed 2.0.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sliding</h3>
            <p>
              Wall moves horizontally along base. Prevented by friction between base and soil, or shear key. Safety factor against sliding should exceed 1.5.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bearing Capacity Failure</h3>
            <p>
              Soil beneath wall fails due to excessive pressure. Prevented by adequate base width and good bearing soil. Check with soil bearing capacity calculator.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Structural Failure</h3>
            <p>
              Wall itself cracks or breaks. Prevented by proper reinforcement and adequate thickness. Requires detailed structural design by engineer.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Drainage Considerations
        </h2>
        <p className="mb-4">
          Proper drainage is critical for retaining wall performance. Water buildup behind walls dramatically increases lateral pressure and can lead to failure.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Install weep holes at regular intervals (typically 1.5-3m spacing)</li>
          <li>Use gravel backfill for drainage (minimum 300mm thick)</li>
          <li>Install perforated drain pipe at base of wall</li>
          <li>Slope ground away from wall top</li>
          <li>Use geotextile fabric to prevent soil clogging</li>
          <li>Consider surface water management and gutters</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Construction Best Practices
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Excavate to stable bearing soil or use engineered fill</li>
          <li>Compact foundation soil to specified density</li>
          <li>Use proper concrete mix design (minimum 25 MPa / 3500 psi)</li>
          <li>Install reinforcement as per structural drawings</li>
          <li>Backfill in layers with proper compaction</li>
          <li>Install drainage system before backfilling</li>
          <li>Allow concrete to cure properly before backfilling</li>
          <li>Protect wall during construction from impact damage</li>
          <li>Monitor for settlement or movement during construction</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          When to Hire a Professional
        </h2>
        <p className="mb-4">
          Always consult a licensed structural or geotechnical engineer for:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Walls over 1.2m (4 ft) in height</li>
          <li>Walls supporting structures or heavy loads</li>
          <li>Walls on slopes or unstable ground</li>
          <li>Walls with poor soil conditions</li>
          <li>Walls in seismic zones</li>
          <li>Walls near property lines or utilities</li>
          <li>Commercial or public projects</li>
          <li>Any wall requiring building permit</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Material Requirements
        </h2>
        <p className="mb-4">
          The calculator estimates material volumes for planning purposes:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Concrete Volume</h3>
            <p>
              Calculated as wall height × length × thickness. Add 10-15% for waste and spillage. Consider ready-mix delivery for volumes over 2 cubic meters.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Backfill Volume</h3>
            <p>
              Estimated volume of soil or gravel needed behind wall. Use free-draining granular material for better drainage. Compact in 150-200mm lifts.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reinforcement</h3>
            <p>
              Not calculated by this tool. Requires structural engineering design based on loads, moments, and shear forces. Typically uses rebar in both vertical and horizontal directions.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Real-time calculation using Rankine earth pressure theory</li>
          <li>Multiple wall type presets for quick estimates</li>
          <li>Unit conversion (metric ↔ imperial)</li>
          <li>Lateral force and pressure calculations</li>
          <li>Recommended base width estimation</li>
          <li>Concrete and backfill volume calculations</li>
          <li>Earth pressure coefficient (Ka) calculation</li>
          <li>Adjustable safety factor</li>
          <li>Backfill slope consideration</li>
          <li>Status indicators (safe/caution/unsafe)</li>
          <li>Engineering notes and recommendations</li>
          <li>Calculation history with localStorage</li>
          <li>Export to text or CSV</li>
          <li>Copy results to clipboard</li>
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
              What is the maximum height for a retaining wall?
            </h3>
            <p>
              There's no absolute maximum, but walls over 6m (20 ft) require specialized engineering. Most residential walls are 1-3m (3-10 ft). Taller walls may need counterfort or anchored designs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How deep should the foundation be?
            </h3>
            <p>
              Foundation depth typically equals 10-15% of wall height, with minimum 300mm (12") below grade. Must be below frost line in cold climates and on stable bearing soil.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Do I need a building permit?
            </h3>
            <p>
              Most jurisdictions require permits for walls over 1.2m (4 ft) or walls supporting structures. Check local building codes. Permits typically require engineered drawings.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What causes retaining walls to fail?
            </h3>
            <p>
              Common causes: inadequate drainage, poor soil conditions, insufficient base width, lack of reinforcement, frost heave, and improper construction. Most failures are preventable with proper design and drainage.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I use this calculator for final design?
            </h3>
            <p>
              No, this tool provides preliminary estimates only. Final design requires detailed structural engineering analysis, soil testing, and consideration of local codes and site-specific conditions.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Related Tools
        </h2>
        <p>
          Enhance your retaining wall design with these complementary calculators:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Concrete Volume Calculator - Calculate exact concrete requirements</li>
          <li>Soil Bearing Capacity Calculator - Verify foundation bearing capacity</li>
          <li>Foundation Depth Calculator - Determine required foundation depth</li>
          <li>Excavation Volume Calculator - Estimate earthwork quantities</li>
        </ul>
      </section>
    </div>
  );
}
