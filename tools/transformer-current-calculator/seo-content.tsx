export default function TransformerCurrentCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      {/* Main Content Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Transformer Current Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Transformer Current Calculator</strong> is a fast, browser-based electrical utility that calculates primary and secondary current values for transformers in both single-phase and three-phase systems. This free online tool helps electrical engineers, students, and technicians quickly determine current requirements based on power, voltage, and power factor.
        </p>
        <p className="text-gray-700 leading-relaxed">
          By providing instant calculations with step-by-step explanations, this calculator is essential for transformer sizing, load analysis, circuit design, and educational learning.
        </p>
      </section>

      {/* Formula Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Current Calculation Formulas
        </h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="font-semibold text-gray-900 mb-2">Single Phase</div>
            <div className="font-mono text-sm">I = P / (V × PF)</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="font-semibold text-gray-900 mb-2">Three Phase</div>
            <div className="font-mono text-sm">I = P / (√3 × V × PF)</div>
          </div>
        </div>
        <p className="text-gray-700 text-sm mt-4 mb-3">
          Where:
        </p>
        <ul className="text-gray-700 text-sm space-y-1">
          <li><strong>I</strong> = Current (Amperes)</li>
          <li><strong>P</strong> = Power (Watts)</li>
          <li><strong>V</strong> = Voltage (Volts)</li>
          <li><strong>PF</strong> = Power Factor (0 to 1)</li>
          <li><strong>√3</strong> = 1.732 (for three-phase systems)</li>
        </ul>
      </section>

      {/* Examples */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Real-World Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6 not-prose">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 1: Residential Single Phase</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> P = 5000W, V = 230V, PF = 0.9</p>
              <p><strong>Calculation:</strong> I = 5000 / (230 × 0.9)</p>
              <p><strong>Output:</strong> Current ≈ 24.15 A</p>
              <p className="text-xs text-gray-600 mt-2">Typical household load calculation.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 2: Industrial Three Phase</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> P = 10000W, V = 400V, PF = 0.85</p>
              <p><strong>Calculation:</strong> I = 10000 / (1.732 × 400 × 0.85)</p>
              <p><strong>Output:</strong> Current ≈ 16.99 A</p>
              <p className="text-xs text-gray-600 mt-2">Industrial motor load.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 3: US Residential</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> P = 2000W, V = 120V, PF = 0.9</p>
              <p><strong>Calculation:</strong> I = 2000 / (120 × 0.9)</p>
              <p><strong>Output:</strong> Current ≈ 18.52 A</p>
              <p className="text-xs text-gray-600 mt-2">US 120V household circuit.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 4: Large Industrial Load</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> P = 50000W, V = 415V, PF = 0.85</p>
              <p><strong>Calculation:</strong> I = 50000 / (1.732 × 415 × 0.85)</p>
              <p><strong>Output:</strong> Current ≈ 81.76 A</p>
              <p className="text-xs text-gray-600 mt-2">Heavy industrial equipment.</p>
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
          <li>✓ <strong>Transformer Sizing:</strong> Determine current requirements for transformer selection</li>
          <li>✓ <strong>Cable Sizing:</strong> Calculate current to select appropriate wire gauge</li>
          <li>✓ <strong>Circuit Breaker Selection:</strong> Size protective devices based on load current</li>
          <li>✓ <strong>Load Analysis:</strong> Assess current draw for electrical system design</li>
          <li>✓ <strong>Motor Calculations:</strong> Determine motor current for three-phase systems</li>
          <li>✓ <strong>Power Distribution:</strong> Calculate current in distribution systems</li>
          <li>✓ <strong>Educational Learning:</strong> Understand current calculations in AC systems</li>
          <li>✓ <strong>Exam Preparation:</strong> Practice electrical engineering calculations</li>
          <li>✓ <strong>Field Verification:</strong> Quick current estimation for troubleshooting</li>
        </ul>
      </section>

      {/* Important Considerations */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Important Design Considerations
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Power Factor Impact:</strong> Power factor significantly affects current draw. A lower power factor means higher current for the same real power, requiring larger cables and transformers. Most industrial loads have power factors between 0.7 and 0.95.</p>
          <p><strong>Starting Current:</strong> Motors and inductive loads draw 5-7 times rated current during startup. Size circuit breakers and cables to handle starting current, not just running current.</p>
          <p><strong>Voltage Drop:</strong> Long cable runs cause voltage drop, which increases current draw. Account for voltage drop when sizing cables and transformers for distant loads.</p>
          <p><strong>Harmonic Distortion:</strong> Non-linear loads (VFDs, rectifiers, LED drivers) introduce harmonics that increase RMS current beyond what simple formulas predict. Use true RMS meters for accurate measurements.</p>
          <p><strong>Temperature Derating:</strong> Cable ampacity decreases with temperature. Apply derating factors for ambient temperature, bundling, and installation method when sizing cables.</p>
          <p><strong>Safety Margins:</strong> Always add 20-25% safety margin to calculated current when sizing equipment. This accounts for future expansion, transient loads, and ensures equipment operates within safe limits.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Instant Results:</strong> Get immediate current calculations</li>
          <li>✓ <strong>Single & Three Phase:</strong> Support for both system types</li>
          <li>✓ <strong>Power Factor Adjustment:</strong> Interactive slider for easy PF changes</li>
          <li>✓ <strong>Voltage Suggestions:</strong> Quick access to common voltage values</li>
          <li>✓ <strong>Step-by-Step Calculations:</strong> Understand the math behind results</li>
          <li>✓ <strong>Preset Examples:</strong> Common system configurations for quick testing</li>
          <li>✓ <strong>History Tracking:</strong> Save and compare multiple calculations</li>
          <li>✓ <strong>Export Options:</strong> Generate text and JSON reports</li>
          <li>✓ <strong>Real-Time Updates:</strong> Live calculation as you type</li>
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
              What is the difference between single-phase and three-phase current?
            </h3>
            <p className="text-gray-700">
              Single-phase systems use one alternating current, while three-phase systems use three currents offset by 120 degrees. Three-phase systems are more efficient for high-power applications and use the √3 factor in calculations. For the same power, three-phase systems draw less current per conductor.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Why is power factor important in current calculations?
            </h3>
            <p className="text-gray-700">
              Power factor represents the ratio of real power to apparent power. A lower power factor means more current is needed to deliver the same real power, increasing losses and requiring larger cables and transformers. Improving power factor reduces current draw and energy costs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I measure actual transformer current?
            </h3>
            <p className="text-gray-700">
              Use a clamp meter or current transformer (CT) to measure current on the primary or secondary conductors. For three-phase systems, measure all three phases as they may be unbalanced. Always use proper safety equipment and follow electrical safety procedures.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What current should I use for cable sizing?
            </h3>
            <p className="text-gray-700">
              Use the calculated continuous current plus a 25% safety margin. For motors, use 125% of full-load current. Consider starting current, ambient temperature, cable bundling, and installation method. Consult electrical codes (NEC, IEC) for specific requirements.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Why is three-phase current lower than single-phase for the same power?
            </h3>
            <p className="text-gray-700">
              Three-phase systems distribute power across three conductors more efficiently. The √3 factor (1.732) in the denominator reduces current per conductor. This is why industrial facilities use three-phase power - it requires smaller cables and transformers for the same power delivery.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is a typical power factor for different loads?
            </h3>
            <p className="text-gray-700">
              Resistive loads (heaters): 1.0, Inductive motors: 0.7-0.9, Fluorescent lights: 0.5-0.95 (with/without correction), LED drivers: 0.5-0.95, Computers/electronics: 0.6-0.9, Welders: 0.5-0.7. Power factor correction capacitors can improve these values to 0.95 or higher.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I use this calculator for DC systems?
            </h3>
            <p className="text-gray-700">
              For DC systems, use the single-phase formula with power factor = 1.0, which simplifies to I = P / V. DC systems don&apos;t have power factor or phase considerations, making calculations simpler than AC systems.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What safety margins should I add to calculated current?
            </h3>
            <p className="text-gray-700">
              Add 20-25% for general loads, 25-30% for motor circuits (to handle starting current), and 30-40% for future expansion. Electrical codes often require 125% of continuous load current for conductor sizing. Always consult local electrical codes for specific requirements.
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
            <h4 className="font-semibold text-gray-900 mb-2">Cable Ampacity</h4>
            <p className="text-gray-600">Current-carrying capacity of conductors based on size and installation</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Circuit Protection</h4>
            <p className="text-gray-600">Sizing breakers and fuses based on load current</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Power Factor Correction</h4>
            <p className="text-gray-600">Using capacitors to improve power factor and reduce current</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Motor Starting</h4>
            <p className="text-gray-600">Understanding inrush current and starting methods</p>
          </div>
        </div>
      </section>

    </div>
  );
}
