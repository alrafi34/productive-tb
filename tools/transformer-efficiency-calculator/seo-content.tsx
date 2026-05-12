export default function TransformerEfficiencyCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      {/* Main Content Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Transformer Efficiency Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Transformer Efficiency Calculator</strong> is a fast, browser-based electrical engineering utility that calculates transformer efficiency based on input power, output power, voltage, current, or losses. This free online tool helps students, engineers, and technicians quickly determine transformer performance and energy losses.
        </p>
        <p className="text-gray-700 leading-relaxed">
          By providing instant calculations with efficiency ratings and step-by-step explanations, this calculator is essential for transformer evaluation, energy audits, system optimization, and educational learning.
        </p>
      </section>

      {/* Formula Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Transformer Efficiency Formula
        </h3>
        <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-4">
          Efficiency (η) = (Output Power / Input Power) × 100%
        </div>
        <p className="text-gray-700 text-sm mb-3">
          Alternative formula using losses:
        </p>
        <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-4">
          Efficiency (η) = Output Power / (Output Power + Losses) × 100%
        </div>
        <p className="text-gray-700 text-sm">
          Where losses include copper losses (I²R) and iron losses (hysteresis and eddy currents).
        </p>
      </section>

      {/* Examples */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Real-World Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6 not-prose">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 1: High Efficiency Transformer</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> Input = 1000W, Output = 980W</p>
              <p><strong>Output:</strong> Efficiency = 98%</p>
              <p><strong>Losses:</strong> 20W</p>
              <p className="text-xs text-gray-600 mt-2">Modern transformer with excellent efficiency.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 2: Standard Transformer</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> Output = 950W, Losses = 50W</p>
              <p><strong>Output:</strong> Efficiency = 95%</p>
              <p><strong>Input Power:</strong> 1000W</p>
              <p className="text-xs text-gray-600 mt-2">Typical power transformer efficiency.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 3: Using Voltage & Current</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 220V, I = 5A, PF = 1, Output = 1000W</p>
              <p><strong>Calculated Input:</strong> 1100W</p>
              <p><strong>Output:</strong> Efficiency ≈ 90.91%</p>
              <p className="text-xs text-gray-600 mt-2">Calculated from electrical parameters.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 4: Old Transformer</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> Input = 1000W, Output = 850W</p>
              <p><strong>Output:</strong> Efficiency = 85%</p>
              <p><strong>Losses:</strong> 150W</p>
              <p className="text-xs text-gray-600 mt-2">Poor efficiency - replacement recommended.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Use Cases
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Transformer Evaluation:</strong> Assess transformer performance and condition</li>
          <li>✓ <strong>Energy Audits:</strong> Calculate energy losses and potential savings</li>
          <li>✓ <strong>System Optimization:</strong> Identify inefficient transformers for replacement</li>
          <li>✓ <strong>Cost Analysis:</strong> Estimate operating costs based on efficiency</li>
          <li>✓ <strong>Maintenance Planning:</strong> Monitor efficiency degradation over time</li>
          <li>✓ <strong>Educational Learning:</strong> Understand transformer losses and efficiency</li>
          <li>✓ <strong>Exam Preparation:</strong> Practice efficiency calculations for tests</li>
          <li>✓ <strong>Equipment Selection:</strong> Compare transformer specifications</li>
          <li>✓ <strong>Compliance Verification:</strong> Ensure transformers meet efficiency standards</li>
        </ul>
      </section>

      {/* Important Considerations */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Understanding Transformer Losses
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Copper Losses (I²R):</strong> Resistive losses in windings that vary with load. Higher current means higher copper losses. These are also called load losses or variable losses.</p>
          <p><strong>Iron Losses:</strong> Core losses including hysteresis (magnetic domain friction) and eddy currents (circulating currents in core). These are constant regardless of load and are also called no-load losses or fixed losses.</p>
          <p><strong>Efficiency vs Load:</strong> Transformer efficiency varies with load. Maximum efficiency typically occurs at 50-70% of rated load where copper losses equal iron losses. Efficiency drops at very light loads (iron losses dominate) and very heavy loads (copper losses dominate).</p>
          <p><strong>Temperature Effects:</strong> Winding resistance increases with temperature, increasing copper losses. Operating temperature affects efficiency, especially at high loads.</p>
          <p><strong>Typical Efficiency Ranges:</strong> Small transformers (100VA-1kVA): 85-95%, Medium transformers (10-100kVA): 95-98%, Large power transformers (&gt;1MVA): 98-99.5%.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Multiple Input Methods:</strong> Calculate using power, voltage/current, or losses</li>
          <li>✓ <strong>Instant Results:</strong> Get immediate efficiency calculations</li>
          <li>✓ <strong>Efficiency Ratings:</strong> Automatic performance classification</li>
          <li>✓ <strong>Power Breakdown:</strong> See input, output, and loss distribution</li>
          <li>✓ <strong>Step-by-Step Calculations:</strong> Understand the math behind results</li>
          <li>✓ <strong>Preset Examples:</strong> Quick access to common transformer types</li>
          <li>✓ <strong>History Tracking:</strong> Save and compare multiple calculations</li>
          <li>✓ <strong>Export Reports:</strong> Generate detailed calculation reports</li>
          <li>✓ <strong>Visual Indicators:</strong> Efficiency bar and color-coded ratings</li>
          <li>✓ <strong>Free & Browser-Based:</strong> No installation required</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is a good transformer efficiency?
            </h3>
            <p className="text-gray-700">
              Modern power transformers typically achieve 95-99% efficiency. Small transformers (under 1kVA) may have 85-95% efficiency. Distribution transformers usually exceed 98%. Anything below 90% for power transformers indicates potential issues or obsolescence.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Why can't transformers be 100% efficient?
            </h3>
            <p className="text-gray-700">
              All transformers have losses due to winding resistance (copper losses) and magnetic core properties (iron losses). Even with the best materials and design, some energy is always converted to heat. The laws of thermodynamics prevent 100% efficiency in any real device.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I measure transformer efficiency?
            </h3>
            <p className="text-gray-700">
              Measure input power (primary side) and output power (secondary side) using wattmeters or power analyzers. Efficiency = (Output Power / Input Power) × 100%. For accurate results, ensure proper load conditions and allow the transformer to reach thermal equilibrium.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What causes transformer efficiency to decrease over time?
            </h3>
            <p className="text-gray-700">
              Aging causes insulation degradation, increased winding resistance, core deterioration, and contaminated cooling oil. These factors increase losses and reduce efficiency. Regular maintenance and monitoring can help identify declining efficiency before failure occurs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              At what load is transformer efficiency maximum?
            </h3>
            <p className="text-gray-700">
              Maximum efficiency occurs when copper losses equal iron losses, typically at 50-70% of rated load. Operating transformers near this point optimizes energy efficiency. However, transformers are designed to operate safely at any load up to their rating.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How much money can high-efficiency transformers save?
            </h3>
            <p className="text-gray-700">
              A 2% efficiency improvement on a 1000kVA transformer running 24/7 can save approximately $3,500-$7,000 annually (depending on electricity rates). Over a 20-year lifespan, this represents significant savings that often justify replacing older, less efficient units.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What are copper and iron losses?
            </h3>
            <p className="text-gray-700">
              Copper losses (I²R losses) occur in windings due to resistance and vary with load current. Iron losses occur in the magnetic core from hysteresis and eddy currents, remaining constant regardless of load. Total losses = copper losses + iron losses.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can transformer efficiency exceed 100%?
            </h3>
            <p className="text-gray-700">
              No, efficiency above 100% violates the law of energy conservation. If calculations show &gt;100%, there&apos;s a measurement error, incorrect power factor consideration, or the output power measurement includes reactive power instead of real power. Always verify measurements and calculations.
            </p>
          </div>
        </div>
      </section>

      {/* Related Topics */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Related Electrical Topics
        </h2>
        <div className="grid md:grid-cols-2 gap-4 not-prose text-sm">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Power Factor</h4>
            <p className="text-gray-600">Relationship between real and apparent power affecting efficiency</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Energy Conservation</h4>
            <p className="text-gray-600">Strategies to reduce transformer losses and improve efficiency</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Load Management</h4>
            <p className="text-gray-600">Optimizing transformer loading for maximum efficiency</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Thermal Management</h4>
            <p className="text-gray-600">Cooling systems and temperature effects on transformer performance</p>
          </div>
        </div>
      </section>

    </div>
  );
}
