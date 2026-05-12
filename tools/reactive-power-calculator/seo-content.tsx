export default function ReactivePowerCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      {/* Main Content Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Reactive Power Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Reactive Power Calculator</strong> is a high-performance, browser-based electrical engineering utility that calculates reactive power (VAR) in AC circuits from voltage, current, and phase angle inputs. This free online tool is designed for engineers, students, technicians, and electrical professionals who need quick and accurate calculations without using complex simulation software or backend tools.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Reactive power is a fundamental concept in AC electrical systems, especially in power distribution, motor loads, transformers, and industrial systems. This tool simplifies the formula-driven process into a clean, interactive UI that updates results instantly as users change inputs.
        </p>
      </section>

      {/* How It Works */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How the Reactive Power Calculator Works
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Reactive power represents the portion of electrical power that oscillates between the source and reactive components (inductors and capacitors) without being consumed. It&apos;s measured in volt-amperes reactive (VAR) and is essential for creating magnetic fields in motors and transformers.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Simply enter your voltage (V), current (A), and phase angle (0° to 90°), and the calculator instantly computes the reactive power along with additional useful information like apparent power, real power, and power factor, providing a complete picture of your circuit&apos;s power characteristics.
        </p>
      </section>

      {/* Formula Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Reactive Power Formula
        </h3>
        <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-4">
          Q = V × I × sin(θ)
        </div>
        <p className="text-gray-700 text-sm mb-3">
          Where:
        </p>
        <ul className="text-gray-700 text-sm space-y-1">
          <li><strong>Q</strong> = Reactive Power (VAR)</li>
          <li><strong>V</strong> = Voltage (Volts)</li>
          <li><strong>I</strong> = Current (Amperes)</li>
          <li><strong>θ</strong> = Phase Angle (Degrees)</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-gray-700 text-sm mb-2"><strong>Related Formulas:</strong></p>
          <ul className="text-gray-700 text-sm space-y-1">
            <li><strong>Apparent Power:</strong> S = V × I (VA)</li>
            <li><strong>Real Power:</strong> P = V × I × cos(θ) (W)</li>
            <li><strong>Power Factor:</strong> PF = cos(θ)</li>
            <li><strong>Phase Angle:</strong> θ = arccos(PF)</li>
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
            <h3 className="font-bold text-gray-900 mb-2">Example 1: Standard Load</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 230V, I = 10A, θ = 30°</p>
              <p><strong>Output:</strong> Q = 1150 VAR</p>
              <p className="text-xs text-gray-600 mt-2">Typical residential or commercial load with moderate phase shift.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 2: Industrial Motor</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 400V, I = 5A, θ = 45°</p>
              <p><strong>Output:</strong> Q = 1414 VAR</p>
              <p className="text-xs text-gray-600 mt-2">Three-phase motor with significant inductive reactance.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 3: Heavy Load</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 220V, I = 15A, θ = 60°</p>
              <p><strong>Output:</strong> Q = 2866 VAR</p>
              <p className="text-xs text-gray-600 mt-2">High reactive power load requiring power factor correction.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 4: Low Reactive Load</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 120V, I = 10A, θ = 15°</p>
              <p><strong>Output:</strong> Q = 311 VAR</p>
              <p className="text-xs text-gray-600 mt-2">Efficient load with minimal reactive power component.</p>
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
          <li>✓ <strong>Power Factor Correction:</strong> Calculate reactive power to size capacitor banks for power factor improvement</li>
          <li>✓ <strong>Motor Load Analysis:</strong> Determine reactive power requirements for electric motors and pumps</li>
          <li>✓ <strong>Transformer Sizing:</strong> Assess reactive power demands for proper transformer selection</li>
          <li>✓ <strong>Power System Design:</strong> Calculate reactive power flow in distribution networks</li>
          <li>✓ <strong>Energy Audits:</strong> Evaluate reactive power consumption and identify improvement opportunities</li>
          <li>✓ <strong>Electrical Troubleshooting:</strong> Diagnose power quality issues related to reactive power</li>
          <li>✓ <strong>Educational Projects:</strong> Learn and demonstrate AC power concepts and power triangle relationships</li>
          <li>✓ <strong>Industrial Applications:</strong> Optimize reactive power management in manufacturing facilities</li>
        </ul>
      </section>

      {/* Reactive Power Explanation */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Understanding Reactive Power
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>What is Reactive Power?</strong> Reactive power is the power that oscillates between the source and reactive components (inductors and capacitors) in an AC circuit. Unlike real power, it doesn&apos;t perform useful work but is necessary for creating magnetic and electric fields.</p>
          <p><strong>Why Does It Matter?</strong> While reactive power doesn&apos;t consume energy, it increases current flow in the system, leading to higher losses, larger conductor requirements, and reduced system capacity. Utilities often charge penalties for excessive reactive power consumption.</p>
          <p><strong>Inductive vs Capacitive:</strong> Inductive loads (motors, transformers) consume reactive power (positive VAR), while capacitive loads (capacitor banks) generate reactive power (negative VAR). Balancing these can improve power factor.</p>
          <p><strong>Phase Angle Significance:</strong> The phase angle represents the time difference between voltage and current waveforms. A 0° angle means purely resistive (no reactive power), while 90° means purely reactive (no real power).</p>
          <p><strong>Power Triangle:</strong> Reactive power forms one side of the power triangle, with real power and apparent power forming the other two sides. The relationship is: S² = P² + Q²</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Instant Calculations:</strong> Get immediate results without manual math or complex software</li>
          <li>✓ <strong>Complete Power Analysis:</strong> See reactive, real, and apparent power simultaneously</li>
          <li>✓ <strong>Interactive Slider:</strong> Easily adjust phase angle with visual feedback</li>
          <li>✓ <strong>Unit Conversion:</strong> Switch between VAR and kVAR instantly</li>
          <li>✓ <strong>Step-by-Step Breakdown:</strong> Understand the calculation process with detailed explanations</li>
          <li>✓ <strong>Common Load Presets:</strong> Quick access to typical electrical load configurations</li>
          <li>✓ <strong>History Tracking:</strong> Save and recall previous calculations for comparison</li>
          <li>✓ <strong>Export Reports:</strong> Generate detailed calculation reports for documentation</li>
          <li>✓ <strong>Real-Time Updates:</strong> See results change instantly as you adjust inputs</li>
          <li>✓ <strong>Free & Browser-Based:</strong> No installation, registration, or backend required</li>
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
              What is reactive power and why is it important?
            </h3>
            <p className="text-gray-700">
              Reactive power is the power that flows back and forth between the source and reactive components in an AC circuit. While it doesn&apos;t perform useful work, it&apos;s essential for creating magnetic fields in motors and transformers. Managing reactive power is crucial for system efficiency and avoiding utility penalties.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How does phase angle affect reactive power?
            </h3>
            <p className="text-gray-700">
              Phase angle directly determines the amount of reactive power. At 0°, there&apos;s no reactive power (purely resistive load). As the angle increases toward 90°, reactive power increases while real power decreases. At 90°, all power is reactive with no real power consumption.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What causes reactive power in electrical systems?
            </h3>
            <p className="text-gray-700">
              Reactive power is caused by inductive loads (motors, transformers, inductors) and capacitive loads (capacitors, long transmission lines). Inductive loads consume reactive power, while capacitive loads generate it. Most industrial loads are inductive, requiring reactive power compensation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How can I reduce reactive power consumption?
            </h3>
            <p className="text-gray-700">
              Reactive power can be reduced by installing capacitor banks to offset inductive reactance, using synchronous motors that can generate reactive power, avoiding motor operation at low loads, replacing old equipment with high-efficiency models, or installing active power factor correction systems.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is the difference between VAR and kVAR?
            </h3>
            <p className="text-gray-700">
              VAR (Volt-Ampere Reactive) and kVAR (kilovolt-Ampere Reactive) are units of reactive power. 1 kVAR = 1000 VAR. kVAR is typically used for larger industrial and commercial applications, while VAR is used for smaller loads and calculations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can reactive power be negative?
            </h3>
            <p className="text-gray-700">
              Yes, reactive power can be negative when capacitive reactance exceeds inductive reactance. Negative reactive power indicates that the load is generating reactive power (capacitive), while positive values indicate consumption (inductive). Most industrial loads have positive reactive power.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How does reactive power affect electricity bills?
            </h3>
            <p className="text-gray-700">
              Many utilities charge penalties for low power factor (high reactive power) because it increases current flow and system losses. Industrial customers often face demand charges based on apparent power (kVA) rather than just real power (kW), making reactive power management financially important.
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
            <h4 className="font-semibold text-gray-900 mb-2">Real Power</h4>
            <p className="text-gray-600">Active power that performs useful work, measured in watts (W)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Apparent Power</h4>
            <p className="text-gray-600">Total power supplied to a circuit, combining real and reactive power (VA)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Power Factor</h4>
            <p className="text-gray-600">Ratio of real power to apparent power, indicating system efficiency</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Phase Angle</h4>
            <p className="text-gray-600">Time difference between voltage and current waveforms in AC circuits</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Power Triangle</h4>
            <p className="text-gray-600">Graphical representation showing relationship between power components</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Capacitor Banks</h4>
            <p className="text-gray-600">Equipment used to compensate reactive power and improve power factor</p>
          </div>
        </div>
      </section>

    </div>
  );
}
