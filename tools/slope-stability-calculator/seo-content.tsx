export default function SlopeStabilityCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Slope Stability Calculator
        </h2>
        <p className="mb-4">
          The Slope Stability Calculator is a professional geotechnical engineering tool designed to analyze the stability of soil slopes using simplified infinite slope methods. By calculating the Factor of Safety (FoS), this tool helps civil engineers, geotechnical professionals, and students quickly assess whether a slope is stable, marginally stable, or at risk of failure.
        </p>
        <p>
          This calculator uses established geotechnical principles to estimate slope stability based on soil properties (cohesion, friction angle, unit weight), slope geometry (angle and height), and water conditions (pore water pressure). While providing valuable preliminary estimates, always consult a licensed geotechnical engineer for critical slope designs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Slope Stability Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Select your unit system (metric or imperial)</li>
          <li>Enter slope geometry: angle (0-90°) and height</li>
          <li>Input soil properties: cohesion, friction angle, and unit weight</li>
          <li>Set water conditions using pore water pressure ratio (0-1)</li>
          <li>View instant Factor of Safety calculation</li>
          <li>Check stability status (stable/marginal/unstable)</li>
          <li>Review engineering notes and recommendations</li>
          <li>Use soil type presets for common materials</li>
          <li>Save calculations to history or export results</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Factor of Safety
        </h2>
        <p className="mb-4">
          The Factor of Safety (FoS) is the ratio of resisting forces to driving forces in a slope. It indicates how stable a slope is:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>FoS &gt; 1.3</strong> - Stable slope with adequate safety margin</li>
          <li><strong>FoS 1.0-1.3</strong> - Marginally stable, consider improvements</li>
          <li><strong>FoS &lt; 1.0</strong> - Unstable slope, failure likely</li>
        </ul>
        <p>
          The calculator uses a simplified infinite slope model with the formula: FoS = (c + γ×z×cos²θ×tanφ×(1-ru)) / (γ×z×sinθ×cosθ)
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Soil Properties Explained
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cohesion (c)</h3>
            <p>
              Shear strength of soil independent of normal stress. Clay soils: 10-50 kPa. Sandy soils: 0-5 kPa. Higher cohesion increases stability.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Friction Angle (φ)</h3>
            <p>
              Internal friction of soil particles. Clay: 10-20°. Sand: 28-40°. Gravel: 35-45°. Higher friction angle improves stability.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unit Weight (γ)</h3>
            <p>
              Density of soil. Typical range: 16-20 kN/m³ (100-125 pcf). Heavier soils increase driving forces on slopes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pore Water Pressure Ratio (ru)</h3>
            <p>
              Ratio of pore water pressure to total stress. 0 = dry, 0.5 = partially saturated, 1 = fully saturated. Water significantly reduces stability.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Slope Failure Mechanisms
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Rotational Failure</strong> - Circular slip surface, common in cohesive soils</li>
          <li><strong>Translational Failure</strong> - Planar slip surface, typical in layered soils</li>
          <li><strong>Wedge Failure</strong> - Failure along intersecting planes</li>
          <li><strong>Flow Failure</strong> - Liquefaction in saturated loose sands</li>
          <li><strong>Toppling Failure</strong> - Overturning of rock or soil blocks</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Factors Affecting Slope Stability
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Slope angle - steeper slopes are less stable</li>
          <li>Soil strength - cohesion and friction angle</li>
          <li>Water content - increases weight and reduces strength</li>
          <li>Vegetation - roots provide reinforcement</li>
          <li>Seismic activity - earthquakes reduce stability</li>
          <li>Weathering - degrades soil strength over time</li>
          <li>Loading - additional weight at slope crest</li>
          <li>Excavation - removal of support at slope toe</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Slope Stabilization Methods
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Drainage Improvement</h3>
            <p>
              Install surface drains, subsurface drains, or horizontal drains to reduce pore water pressure. Most cost-effective method.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Slope Flattening</h3>
            <p>
              Reduce slope angle by excavating at crest or adding fill at toe. Effective but requires space and earthwork.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Retaining Structures</h3>
            <p>
              Install retaining walls, soil nails, or anchors to provide external support. Suitable for space-constrained sites.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Soil Reinforcement</h3>
            <p>
              Use geosynthetics, soil nailing, or micropiles to improve soil strength. Modern and effective solution.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vegetation</h3>
            <p>
              Plant deep-rooted vegetation to provide root reinforcement and reduce infiltration. Environmentally friendly option.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Applications
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Highway and railway embankment design</li>
          <li>Natural slope stability assessment</li>
          <li>Cut slope design for excavations</li>
          <li>Dam and levee stability analysis</li>
          <li>Landslide risk evaluation</li>
          <li>Mine slope design</li>
          <li>Coastal cliff stability</li>
          <li>Foundation excavation planning</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Limitations of Simplified Analysis
        </h2>
        <p className="mb-4">
          This calculator uses simplified infinite slope method suitable for preliminary analysis. It has limitations:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Assumes homogeneous soil conditions</li>
          <li>Does not account for soil layering</li>
          <li>Simplified failure surface geometry</li>
          <li>Does not consider seismic effects</li>
          <li>Ignores tension cracks and progressive failure</li>
          <li>Assumes steady-state water conditions</li>
        </ul>
        <p className="mt-4">
          For critical slopes, use advanced methods like limit equilibrium analysis (Bishop, Spencer) or finite element analysis.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          When to Hire a Professional
        </h2>
        <p className="mb-4">
          Always consult a licensed geotechnical engineer for:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Slopes higher than 3m (10 ft)</li>
          <li>Slopes supporting structures or infrastructure</li>
          <li>Sites with history of slope instability</li>
          <li>Slopes in seismic zones</li>
          <li>Complex soil conditions or layering</li>
          <li>Slopes with groundwater issues</li>
          <li>Commercial or public projects</li>
          <li>Any slope requiring building permit</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Real-time Factor of Safety calculation</li>
          <li>Simplified infinite slope model</li>
          <li>Interactive sliders for angle inputs</li>
          <li>Six soil type presets (clay, sand, silt, gravel)</li>
          <li>Pore water pressure consideration</li>
          <li>Unit conversion (metric ↔ imperial)</li>
          <li>Status indicators (stable/marginal/unstable)</li>
          <li>Visual FoS progress indicator</li>
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
              What is a safe Factor of Safety for slopes?
            </h3>
            <p>
              Minimum FoS of 1.3-1.5 is typical for permanent slopes. Temporary slopes may use 1.2-1.3. Critical infrastructure requires FoS of 1.5 or higher.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How does water affect slope stability?
            </h3>
            <p>
              Water increases soil weight and reduces effective stress, significantly decreasing stability. A fully saturated slope can have 50% lower FoS than dry conditions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What slope angle is considered safe?
            </h3>
            <p>
              Depends on soil type. Clay: 20-30°. Sand: 30-35°. Rock: 45-60°. Flatter slopes are generally more stable but require more space.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I use this for final design?
            </h3>
            <p>
              No, this tool provides preliminary estimates only. Final design requires detailed site investigation, laboratory testing, and analysis by licensed geotechnical engineer.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Related Tools
        </h2>
        <p>
          Enhance your geotechnical analysis with these complementary calculators:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Soil Bearing Capacity Calculator - Determine foundation bearing capacity</li>
          <li>Retaining Wall Calculator - Design retaining structures</li>
          <li>Foundation Depth Calculator - Calculate required foundation depth</li>
          <li>Soil Compaction Calculator - Verify compaction quality</li>
        </ul>
      </section>
    </div>
  );
}
