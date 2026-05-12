export default function RealPowerCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      {/* Main Content Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Real Power Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Real Power Calculator</strong> is a high-performance, browser-based electrical engineering utility that calculates real (active) power in AC circuits using fundamental electrical formulas. This free online tool is essential for electrical engineering students, electricians, power system engineers, and electronics enthusiasts who need quick and accurate power calculations.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Real power represents the actual usable power consumed by electrical devices, measured in watts (W). By providing voltage, current, and power factor, this calculator instantly computes real power along with apparent power and reactive power, helping you understand the complete power characteristics of your AC circuit.
        </p>
      </section>

      {/* How It Works */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How the Real Power Calculator Works
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Real power (also called active power or true power) is the portion of electrical power that performs actual work in an AC circuit. Unlike apparent power, which is the total power supplied, real power accounts for the phase difference between voltage and current caused by reactive components.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Simply enter your voltage (V), current (A), and power factor (0 to 1), and the calculator instantly computes the real power along with additional useful information like apparent power and reactive power, providing a complete picture of your circuit&apos;s power characteristics.
        </p>
      </section>

      {/* Formula Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Real Power Formula
        </h3>
        <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-4">
          P = V × I × PF
        </div>
        <p className="text-gray-700 text-sm mb-3">
          Where:
        </p>
        <ul className="text-gray-700 text-sm space-y-1">
          <li><strong>P</strong> = Real Power (Watts)</li>
          <li><strong>V</strong> = Voltage (Volts)</li>
          <li><strong>I</strong> = Current (Amperes)</li>
          <li><strong>PF</strong> = Power Factor (0 to 1)</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-gray-700 text-sm mb-2"><strong>Additional Formulas:</strong></p>
          <ul className="text-gray-700 text-sm space-y-1">
            <li><strong>Apparent Power:</strong> S = V × I (VA)</li>
            <li><strong>Reactive Power:</strong> Q = √(S² - P²) (VAR)</li>
            <li><strong>Power Factor:</strong> PF = P / S = cos(φ)</li>
          </ul>
        </div>
      </section>

      {/* Examples */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Real-World Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6 not-prose">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 1: Residential Load</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 230V, I = 5A, PF = 0.8</p>
              <p><strong>Output:</strong> P = 920W</p>
              <p className="text-xs text-gray-600 mt-2">Typical home electrical load with inductive components like motors.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 2: Pure Resistive Load</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 120V, I = 10A, PF = 1</p>
              <p><strong>Output:</strong> P = 1200W</p>
              <p className="text-xs text-gray-600 mt-2">Electric heater or incandescent lighting with unity power factor.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 3: Industrial Motor</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 400V, I = 3A, PF = 0.6</p>
              <p><strong>Output:</strong> P = 720W</p>
              <p className="text-xs text-gray-600 mt-2">Low power factor motor load requiring power factor correction.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 4: Air Conditioner</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 230V, I = 8A, PF = 0.75</p>
              <p><strong>Output:</strong> P = 1380W</p>
              <p className="text-xs text-gray-600 mt-2">Residential AC unit with compressor motor.</p>
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
          <li>✓ <strong>Energy Consumption Analysis:</strong> Calculate actual power consumption for billing and energy management</li>
          <li>✓ <strong>Motor Load Calculations:</strong> Determine real power draw of electric motors and pumps</li>
          <li>✓ <strong>Power Factor Correction:</strong> Assess the need for capacitor banks to improve power factor</li>
          <li>✓ <strong>Circuit Design:</strong> Size conductors and protection devices based on real power requirements</li>
          <li>✓ <strong>Electrical Audits:</strong> Evaluate system efficiency and identify improvement opportunities</li>
          <li>✓ <strong>Generator Sizing:</strong> Determine appropriate generator capacity for loads</li>
          <li>✓ <strong>Educational Projects:</strong> Learn and demonstrate AC power concepts</li>
          <li>✓ <strong>Troubleshooting:</strong> Diagnose power quality issues in electrical systems</li>
        </ul>
      </section>

      {/* Power Factor Explanation */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Understanding Power Factor
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>What is Power Factor?</strong> Power factor (PF) is the ratio of real power to apparent power, ranging from 0 to 1. It represents how effectively electrical power is being converted into useful work.</p>
          <p><strong>Unity Power Factor (PF = 1):</strong> Pure resistive loads like heaters and incandescent bulbs have a power factor of 1, meaning all supplied power is converted to useful work.</p>
          <p><strong>Lagging Power Factor (PF &lt; 1):</strong> Inductive loads like motors, transformers, and fluorescent lights have power factors less than 1, meaning some power is reactive and doesn&apos;t perform useful work.</p>
          <p><strong>Why It Matters:</strong> Low power factor increases current draw, causes voltage drops, reduces system capacity, and may result in utility penalties. Most utilities require industrial customers to maintain power factor above 0.85-0.95.</p>
          <p><strong>Improvement Methods:</strong> Power factor can be improved by adding capacitor banks, using synchronous motors, or installing active power factor correction equipment.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Instant Results:</strong> Get immediate calculations without manual math</li>
          <li>✓ <strong>Complete Power Analysis:</strong> See real, apparent, and reactive power simultaneously</li>
          <li>✓ <strong>Efficiency Rating:</strong> Automatic assessment of power factor quality</li>
          <li>✓ <strong>Step-by-Step Explanation:</strong> Understand the calculation process with detailed breakdowns</li>
          <li>✓ <strong>Common Load Presets:</strong> Quick access to typical electrical load configurations</li>
          <li>✓ <strong>History Tracking:</strong> Save and recall previous calculations</li>
          <li>✓ <strong>Export Reports:</strong> Generate detailed calculation reports for documentation</li>
          <li>✓ <strong>Real-Time Updates:</strong> See results change instantly as you adjust inputs</li>
          <li>✓ <strong>Free & Browser-Based:</strong> No installation or registration required</li>
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
              What is the difference between real power and apparent power?
            </h3>
            <p className="text-gray-700">
              Real power (P) is the actual power consumed by the load and converted to useful work, measured in watts (W). Apparent power (S) is the total power supplied to the circuit, measured in volt-amperes (VA). The difference is due to reactive components that store and release energy without consuming it.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Why is power factor important?
            </h3>
            <p className="text-gray-700">
              Power factor indicates how efficiently electrical power is being used. A low power factor means more current is required to deliver the same real power, leading to increased losses, larger conductor sizes, and potential utility penalties. Improving power factor reduces energy costs and improves system capacity.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What causes low power factor?
            </h3>
            <p className="text-gray-700">
              Low power factor is primarily caused by inductive loads such as motors, transformers, welding equipment, and fluorescent lighting. These devices draw reactive current that doesn&apos;t perform useful work but is necessary for their operation. Underloaded motors and old equipment typically have lower power factors.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How can I improve power factor?
            </h3>
            <p className="text-gray-700">
              Power factor can be improved by installing capacitor banks to offset inductive reactance, replacing old motors with high-efficiency models, avoiding motor operation at low loads, using synchronous motors, or installing active power factor correction equipment. The most common method is adding capacitors.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is reactive power?
            </h3>
            <p className="text-gray-700">
              Reactive power (Q) is the power that oscillates between the source and reactive components (inductors and capacitors) without being consumed. It&apos;s measured in volt-amperes reactive (VAR). While it doesn&apos;t perform useful work, it&apos;s necessary for creating magnetic fields in motors and transformers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is a good power factor?
            </h3>
            <p className="text-gray-700">
              A power factor of 0.95 or higher is considered excellent. Values between 0.85 and 0.94 are acceptable for most industrial applications. Below 0.85 is considered poor and typically requires correction. Utilities often penalize customers with power factors below 0.85-0.90.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can power factor be greater than 1?
            </h3>
            <p className="text-gray-700">
              No, power factor cannot exceed 1 in practical circuits. A power factor of 1 (unity) represents a purely resistive load where all supplied power is converted to useful work. Values approaching 1 indicate efficient power usage, while values closer to 0 indicate poor efficiency.
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
            <h4 className="font-semibold text-gray-900 mb-2">Apparent Power</h4>
            <p className="text-gray-600">Total power supplied to a circuit, combining real and reactive power</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Reactive Power</h4>
            <p className="text-gray-600">Power that oscillates between source and load without being consumed</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Power Triangle</h4>
            <p className="text-gray-600">Graphical representation of the relationship between real, reactive, and apparent power</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Three-Phase Power</h4>
            <p className="text-gray-600">Power calculations for three-phase AC systems used in industrial applications</p>
          </div>
        </div>
      </section>

    </div>
  );
}
