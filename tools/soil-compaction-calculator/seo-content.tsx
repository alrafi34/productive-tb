export default function SoilCompactionCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Soil Compaction Calculator
        </h2>
        <p className="mb-4">
          The Soil Compaction Calculator is a professional engineering tool designed for civil engineers, construction supervisors, and geotechnical professionals to quickly determine the degree of soil compaction achieved in the field. By comparing field dry density measurements with maximum dry density from laboratory tests (such as the Standard or Modified Proctor test), this calculator provides instant compaction percentage results.
        </p>
        <p>
          Soil compaction is critical for construction quality control, ensuring that soil meets specified density requirements for stability, load-bearing capacity, and long-term performance. This tool helps verify compliance with project specifications and building codes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Soil Compaction Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Select your density unit (g/cm³ or kN/m³)</li>
          <li>Enter the field dry density measured on site</li>
          <li>Input the maximum dry density from Proctor test results</li>
          <li>Choose the required compaction standard (90%, 95%, 98%, or 100%)</li>
          <li>View instant compaction percentage and pass/fail status</li>
          <li>Review engineering notes and recommendations</li>
          <li>Use soil type presets for quick reference values</li>
          <li>Save calculations to history for record keeping</li>
          <li>Export results as text or CSV for documentation</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Soil Compaction
        </h2>
        <p className="mb-4">
          Soil compaction is the process of mechanically increasing soil density by reducing air voids. The compaction percentage indicates how well the field compaction compares to the maximum achievable density determined in laboratory conditions.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <p className="font-mono text-sm">
            Compaction (%) = (Field Dry Density / Maximum Dry Density) × 100
          </p>
        </div>
        <p className="mb-4">Where:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Field Dry Density</strong> - Density measured on construction site</li>
          <li><strong>Maximum Dry Density</strong> - Maximum density from Proctor test</li>
          <li><strong>Compaction %</strong> - Degree of compaction achieved</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Compaction Standards
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">90% Compaction (Light Duty)</h3>
            <p>
              Suitable for landscaping, light traffic areas, and non-critical applications. Minimum requirement for residential driveways and walkways.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">95% Compaction (Standard)</h3>
            <p>
              Most common requirement for general construction, building foundations, parking lots, and residential roads. Standard specification for most projects.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">98% Compaction (Heavy Duty)</h3>
            <p>
              Required for highways, airport runways, heavy industrial floors, and critical structural foundations. Ensures maximum stability and load-bearing capacity.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Compaction (Maximum)</h3>
            <p>
              Theoretical maximum from laboratory tests. Rarely achieved or required in field conditions. Used for special applications requiring absolute maximum density.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Proctor Test Methods
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard Proctor Test (ASTM D698)</h3>
            <p>
              Uses 5.5 lb (2.5 kg) hammer dropped from 12 inches (305 mm). Suitable for fine-grained soils and general construction applications. Provides maximum dry density and optimum moisture content.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Modified Proctor Test (ASTM D1557)</h3>
            <p>
              Uses 10 lb (4.5 kg) hammer dropped from 18 inches (457 mm). Higher compaction energy simulates heavy construction equipment. Required for highway and airfield construction.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Field Density Testing Methods
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Sand Cone Method</strong> - Traditional method using calibrated sand to measure excavated volume</li>
          <li><strong>Nuclear Density Gauge</strong> - Fast, non-destructive method using radioactive source</li>
          <li><strong>Drive Cylinder Method</strong> - Direct measurement using thin-walled cylinder</li>
          <li><strong>Rubber Balloon Method</strong> - Similar to sand cone but uses water-filled balloon</li>
          <li><strong>Core Cutter Method</strong> - Simple method for cohesive soils</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Typical Soil Densities
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">Soil Type</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Typical Max Density (g/cm³)</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Optimum Moisture (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Sandy Soil</td>
                <td className="border border-gray-200 px-4 py-2">1.80 - 1.90</td>
                <td className="border border-gray-200 px-4 py-2">10 - 15</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Clay Soil</td>
                <td className="border border-gray-200 px-4 py-2">1.60 - 1.80</td>
                <td className="border border-gray-200 px-4 py-2">15 - 25</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Silty Soil</td>
                <td className="border border-gray-200 px-4 py-2">1.65 - 1.75</td>
                <td className="border border-gray-200 px-4 py-2">12 - 20</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Gravel</td>
                <td className="border border-gray-200 px-4 py-2">1.95 - 2.10</td>
                <td className="border border-gray-200 px-4 py-2">8 - 12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Factors Affecting Compaction
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Moisture Content</strong> - Optimum moisture is critical for maximum density</li>
          <li><strong>Soil Type</strong> - Granular soils compact differently than cohesive soils</li>
          <li><strong>Compaction Energy</strong> - More passes or heavier equipment increases density</li>
          <li><strong>Lift Thickness</strong> - Thinner layers compact more effectively</li>
          <li><strong>Soil Gradation</strong> - Well-graded soils achieve higher densities</li>
          <li><strong>Organic Content</strong> - Organic matter reduces maximum achievable density</li>
          <li><strong>Temperature</strong> - Affects moisture evaporation and soil behavior</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Applications
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Quality control for earthwork construction</li>
          <li>Foundation preparation verification</li>
          <li>Road and highway subgrade testing</li>
          <li>Embankment and dam construction</li>
          <li>Parking lot and pavement base preparation</li>
          <li>Building pad certification</li>
          <li>Trench backfill verification</li>
          <li>Airport runway construction</li>
          <li>Landfill liner construction</li>
          <li>Athletic field preparation</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Interpreting Results
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pass (≥ Required %)</h3>
            <p>
              Compaction meets or exceeds specification. Soil is adequately compacted for intended use. Proceed with construction as planned.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Warning (Within 2% of Required)</h3>
            <p>
              Compaction is close but slightly below requirement. Consider additional compaction effort or verify testing procedure. May be acceptable with engineer approval.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fail (&lt; Required %)</h3>
            <p>
              Compaction does not meet specification. Additional compaction required. Check moisture content and adjust if needed. Retest after additional compaction.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Best Practices
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Test at regular intervals and locations as specified</li>
          <li>Ensure moisture content is near optimum before compacting</li>
          <li>Use appropriate compaction equipment for soil type</li>
          <li>Compact in thin lifts (6-8 inches maximum)</li>
          <li>Remove oversized particles before compaction</li>
          <li>Test in areas representative of overall work</li>
          <li>Document all test results with location and date</li>
          <li>Retest after corrective compaction</li>
          <li>Maintain consistent testing procedures</li>
          <li>Calibrate testing equipment regularly</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Real-time compaction percentage calculation</li>
          <li>Multiple compaction standards (90%, 95%, 98%, 100%)</li>
          <li>Unit conversion (g/cm³ ↔ kN/m³)</li>
          <li>Pass/fail status indicators</li>
          <li>Visual progress bars and comparisons</li>
          <li>Soil type presets with typical values</li>
          <li>Engineering notes and recommendations</li>
          <li>Calculation history with localStorage</li>
          <li>Export to text or CSV</li>
          <li>Copy results to clipboard</li>
          <li>Color-coded status indicators</li>
          <li>Mobile-responsive design for field use</li>
          <li>Instant validation and error checking</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is soil compaction?
            </h3>
            <p>
              Soil compaction is the process of mechanically increasing soil density by reducing air voids between soil particles. This improves soil strength, stability, and load-bearing capacity.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Why is 95% compaction commonly required?
            </h3>
            <p>
              95% compaction provides a good balance between achievable field conditions and adequate soil performance for most construction applications. It's practical to achieve while ensuring sufficient stability.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What if field density exceeds maximum dry density?
            </h3>
            <p>
              This usually indicates a measurement error or different soil conditions. Verify your measurements and ensure the Proctor test was performed on representative soil samples.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How often should compaction be tested?
            </h3>
            <p>
              Testing frequency depends on project specifications, but typically every 500-1000 square feet or every lift for critical applications. Check local building codes and project requirements.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I use this calculator for any soil type?
            </h3>
            <p>
              Yes, the calculator works for all soil types. However, you must use the correct maximum dry density from laboratory tests performed on your specific soil.
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
          <li>Soil Bearing Capacity Calculator - Determine foundation load capacity</li>
          <li>Foundation Depth Calculator - Calculate required foundation depth</li>
          <li>Excavation Volume Calculator - Estimate earthwork quantities</li>
          <li>Structural Load Calculator - Calculate loads on foundations</li>
        </ul>
      </section>
    </div>
  );
}
