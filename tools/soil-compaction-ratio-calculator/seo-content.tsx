export default function SoilCompactionRatioCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About the Soil Compaction Ratio Calculator
        </h2>
        <p className="mb-4">
          The Soil Compaction Ratio Calculator is a professional browser-based engineering utility that calculates <strong>relative compaction</strong> (compaction ratio) by comparing field dry density against maximum dry density from laboratory Proctor testing. It is designed for civil engineers, geotechnical engineers, site supervisors, contractors, and engineering students working on earthwork, road construction, embankments, foundations, and quality control.
        </p>
        <p>
          The tool operates entirely in the browser with instant calculations, supports multiple density unit systems, and provides engineering-grade outputs including step-by-step breakdowns, pass/fail indicators, and export-ready reports.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use This Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Select your density unit (g/cm³, kg/m³, or lb/ft³)</li>
          <li>Choose the required compaction standard (90%, 92%, 95%, 98%, or 100%)</li>
          <li>Enter the field dry density measured on site</li>
          <li>Enter the maximum dry density from the Proctor test</li>
          <li>View the instant compaction ratio and pass/fail status</li>
          <li>Use soil type presets for quick reference values</li>
          <li>Review the step-by-step calculation breakdown</li>
          <li>Save, copy, or export the result for documentation</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          The Compaction Ratio Formula
        </h2>
        <p className="mb-4">
          Relative compaction (compaction ratio) is calculated using the following formula:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 font-mono text-sm">
          Compaction Ratio (%) = (Field Dry Density ÷ Maximum Dry Density) × 100
        </div>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Field Dry Density</strong> — density measured at the construction site</li>
          <li><strong>Maximum Dry Density (MDD)</strong> — peak density from Standard or Modified Proctor test</li>
          <li><strong>Compaction Ratio</strong> — percentage indicating how well the field compaction compares to lab maximum</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Compaction Standards Explained
        </h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900">90% — Light Duty</h3>
            <p className="text-sm">Suitable for landscaping, light traffic areas, and non-critical fill. Minimum for residential walkways and driveways.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">92% — Subgrade</h3>
            <p className="text-sm">Common for road subgrade layers and general earthwork fill where moderate stability is required.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">95% — Standard</h3>
            <p className="text-sm">The most widely specified requirement for building foundations, parking lots, and residential roads. Default for most construction projects.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">98% — Heavy Duty</h3>
            <p className="text-sm">Required for highways, airport runways, heavy industrial floors, and critical structural foundations.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">100% — Maximum</h3>
            <p className="text-sm">Theoretical maximum from laboratory testing. Rarely required in field conditions; used for special high-load applications.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Typical Soil Density Values
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">Soil Type</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Max Dry Density (g/cm³)</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Optimum Moisture (%)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Sandy Soil",  "1.80 – 1.90", "10 – 15"],
                ["Clay Soil",   "1.60 – 1.80", "15 – 25"],
                ["Silty Soil",  "1.65 – 1.75", "12 – 20"],
                ["Gravel",      "1.95 – 2.10", "8 – 12"],
                ["Mixed Fill",  "1.75 – 1.95", "10 – 18"],
              ].map(([type, density, moisture]) => (
                <tr key={type}>
                  <td className="border border-gray-200 px-4 py-2">{type}</td>
                  <td className="border border-gray-200 px-4 py-2">{density}</td>
                  <td className="border border-gray-200 px-4 py-2">{moisture}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Proctor Test Methods
        </h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900">Standard Proctor Test (ASTM D698)</h3>
            <p className="text-sm">Uses a 5.5 lb hammer dropped from 12 inches. Suitable for fine-grained soils and general construction. Provides MDD and optimum moisture content.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Modified Proctor Test (ASTM D1557)</h3>
            <p className="text-sm">Uses a 10 lb hammer dropped from 18 inches. Higher compaction energy simulates heavy equipment. Required for highway and airfield construction.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Applications
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Road and highway subgrade quality control</li>
          <li>Building foundation preparation verification</li>
          <li>Embankment and dam construction</li>
          <li>Trench backfill compaction testing</li>
          <li>Parking lot and pavement base preparation</li>
          <li>Airport runway and taxiway construction</li>
          <li>Earthwork quantity and quality documentation</li>
          <li>Landfill liner construction</li>
          <li>Athletic field and sports ground preparation</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">What is relative compaction?</h3>
            <p className="text-sm">Relative compaction (compaction ratio) is the ratio of field dry density to maximum dry density expressed as a percentage. It indicates how well the soil has been compacted compared to the laboratory maximum.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Why is 95% the most common standard?</h3>
            <p className="text-sm">95% compaction provides a practical balance between achievable field conditions and adequate soil performance for most construction applications. It ensures sufficient stability while remaining realistic to achieve with standard equipment.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">What if field density exceeds maximum dry density?</h3>
            <p className="text-sm">This typically indicates a measurement error or that the field soil differs from the Proctor test sample. Verify your measurements and ensure the lab test was performed on representative soil.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">What units does this calculator support?</h3>
            <p className="text-sm">The calculator supports g/cm³ (grams per cubic centimeter), kg/m³ (kilograms per cubic meter), and lb/ft³ (pounds per cubic foot) — the three most common density units used in geotechnical engineering.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
