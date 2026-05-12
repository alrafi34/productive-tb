export default function PowerFactorCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      {/* Main Content Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Power Factor Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Power Factor Calculator</strong> is a fast, browser-based electrical engineering utility that calculates the power factor (PF) in AC electrical systems using real power (kW) and apparent power (kVA). This free online tool is essential for electrical engineers, power system designers, facility managers, and industrial maintenance teams who need to assess and optimize electrical system efficiency.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Power factor is a critical metric that indicates how efficiently electrical power is being converted into useful work. A low power factor means poor electrical efficiency, resulting in higher energy costs, potential utility penalties, and increased system losses. This calculator provides instant analysis with efficiency ratings and recommendations.
        </p>
      </section>

      {/* How It Works */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How the Power Factor Calculator Works
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Power factor is the ratio of real power (the power that actually does work) to apparent power (the total power supplied to the circuit). The calculator uses the fundamental power factor formula to determine this ratio and provides additional insights including reactive power and phase angle.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Simply enter your real power in kilowatts (kW) and apparent power in kilovolt-amperes (kVA), and the calculator instantly computes the power factor along with efficiency ratings, reactive power requirements, and phase angle information.
        </p>
      </section>

      {/* Formula Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Power Factor Formula
        </h3>
        <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-4">
          Power Factor (PF) = Real Power (P) / Apparent Power (S)
        </div>
        <p className="text-gray-700 text-sm mb-3">
          Where:
        </p>
        <ul className="text-gray-700 text-sm space-y-1">
          <li><strong>PF</strong> = Power Factor (dimensionless, 0 to 1)</li>
          <li><strong>P</strong> = Real Power in kilowatts (kW)</li>
          <li><strong>S</strong> = Apparent Power in kilovolt-amperes (kVA)</li>
          <li><strong>Q</strong> = Reactive Power in kilovolt-amperes reactive (kVAR)</li>
        </ul>
        <div className="mt-4 bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm">
          Reactive Power: Q = √(S² - P²)
        </div>
      </section>

      {/* Examples */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Real-World Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6 not-prose">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 1: Ideal System</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> P = 10 kW, S = 10 kVA</p>
              <p><strong>Output:</strong> PF = 1.0 (100%)</p>
              <p className="text-xs text-gray-600 mt-2">Perfect power factor with no reactive power. All supplied power is used for useful work.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 2: Good Industrial System</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> P = 5 kW, S = 6.25 kVA</p>
              <p><strong>Output:</strong> PF = 0.80 (80%)</p>
              <p className="text-xs text-gray-600 mt-2">Common industrial load with moderate reactive power. Acceptable but could benefit from correction.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 3: Excellent Commercial Building</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> P = 9.5 kW, S = 10 kVA</p>
              <p><strong>Output:</strong> PF = 0.95 (95%)</p>
              <p className="text-xs text-gray-600 mt-2">High efficiency system with minimal reactive power and excellent energy utilization.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 4: Poor Efficiency System</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> P = 3 kW, S = 5 kVA</p>
              <p><strong>Output:</strong> PF = 0.60 (60%)</p>
              <p className="text-xs text-gray-600 mt-2">Low efficiency with high reactive power. Power factor correction strongly recommended.</p>
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
          <li>✓ <strong>Industrial Facilities:</strong> Monitor and optimize power factor to avoid utility penalties</li>
          <li>✓ <strong>Commercial Buildings:</strong> Assess electrical system efficiency and identify improvement opportunities</li>
          <li>✓ <strong>Power System Design:</strong> Calculate required power factor correction capacitor sizes</li>
          <li>✓ <strong>Energy Audits:</strong> Evaluate electrical system performance and energy waste</li>
          <li>✓ <strong>Motor Applications:</strong> Analyze inductive loads and determine correction requirements</li>
          <li>✓ <strong>Utility Billing Analysis:</strong> Understand power factor charges and penalties</li>
          <li>✓ <strong>Equipment Sizing:</strong> Properly size transformers, generators, and distribution equipment</li>
          <li>✓ <strong>Educational Projects:</strong> Learn about AC power systems and electrical efficiency</li>
        </ul>
      </section>

      {/* Important Considerations */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Important Considerations
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Utility Penalties:</strong> Many utilities charge penalties for power factors below 0.90 or 0.95. Low power factor increases current draw, requiring utilities to provide larger infrastructure capacity.</p>
          <p><strong>System Losses:</strong> Low power factor increases I²R losses in cables, transformers, and distribution equipment, wasting energy as heat and reducing system capacity.</p>
          <p><strong>Equipment Capacity:</strong> Poor power factor reduces the effective capacity of electrical equipment. A transformer rated for 100 kVA can only deliver 80 kW of real power at 0.80 power factor.</p>
          <p><strong>Power Factor Correction:</strong> Capacitor banks can be installed to improve power factor by supplying reactive power locally, reducing the reactive power drawn from the utility.</p>
          <p><strong>Leading vs Lagging:</strong> Inductive loads (motors, transformers) cause lagging power factor. Capacitive loads cause leading power factor. Most industrial systems have lagging power factor.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Instant Results:</strong> Get immediate power factor calculations without manual math</li>
          <li>✓ <strong>Efficiency Rating:</strong> Automatic classification as Excellent, Good, Fair, or Poor</li>
          <li>✓ <strong>Reactive Power Analysis:</strong> Calculate reactive power requirements (kVAR)</li>
          <li>✓ <strong>Phase Angle:</strong> Determine the phase angle between voltage and current</li>
          <li>✓ <strong>Visual Indicators:</strong> Color-coded efficiency meter for quick assessment</li>
          <li>✓ <strong>Step-by-Step Explanation:</strong> Understand the calculation process with detailed breakdowns</li>
          <li>✓ <strong>Common Presets:</strong> Quick access to typical system configurations</li>
          <li>✓ <strong>History Tracking:</strong> Save and recall previous calculations</li>
          <li>✓ <strong>Export Reports:</strong> Generate detailed calculation reports for documentation</li>
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
              What is power factor and why is it important?
            </h3>
            <p className="text-gray-700">
              Power factor is the ratio of real power (kW) to apparent power (kVA) in an AC electrical system. It measures how efficiently electrical power is being used. A power factor of 1.0 (100%) means all the power is being used effectively. Lower power factors indicate wasted energy, higher utility bills, and reduced system capacity.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What causes low power factor?
            </h3>
            <p className="text-gray-700">
              Low power factor is primarily caused by inductive loads such as motors, transformers, induction furnaces, and fluorescent lighting. These devices require reactive power to create magnetic fields, which doesn&apos;t perform useful work but still requires current to be supplied by the utility.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is a good power factor?
            </h3>
            <p className="text-gray-700">
              A power factor of 0.95 or higher is considered excellent. Values between 0.85 and 0.95 are good and acceptable for most applications. Power factors below 0.85 indicate inefficiency and may result in utility penalties. Industrial facilities should target 0.95 or higher to optimize costs and system performance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I improve power factor?
            </h3>
            <p className="text-gray-700">
              Power factor can be improved by installing capacitor banks that supply reactive power locally, reducing the reactive power drawn from the utility. Other methods include using synchronous motors, replacing old motors with high-efficiency models, and minimizing operation of idling or lightly loaded motors.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is reactive power (kVAR)?
            </h3>
            <p className="text-gray-700">
              Reactive power (measured in kVAR) is the power required to create and maintain magnetic and electric fields in inductive and capacitive equipment. Unlike real power (kW), reactive power doesn&apos;t perform useful work but is necessary for the operation of AC equipment. It oscillates between the source and load.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can power factor be greater than 1?
            </h3>
            <p className="text-gray-700">
              No, power factor cannot exceed 1.0 in practical systems. A power factor of 1.0 represents perfect efficiency where all supplied power is converted to useful work. If calculations show a power factor greater than 1, it indicates an error in measurement or data entry (real power cannot exceed apparent power).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What are utility power factor penalties?
            </h3>
            <p className="text-gray-700">
              Many utilities charge additional fees when power factor falls below a specified threshold (typically 0.90 or 0.95). These penalties compensate the utility for the extra infrastructure capacity required to deliver the same real power at lower power factors. Penalties can add 10-30% to electricity bills.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is the difference between leading and lagging power factor?
            </h3>
            <p className="text-gray-700">
              Lagging power factor occurs when current lags behind voltage, typical of inductive loads like motors and transformers. Leading power factor occurs when current leads voltage, typical of capacitive loads. Most industrial facilities have lagging power factor due to motor loads. The calculator shows the magnitude regardless of leading or lagging.
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
            <h4 className="font-semibold text-gray-900 mb-2">Power Triangle</h4>
            <p className="text-gray-600">Relationship between real power (P), reactive power (Q), and apparent power (S)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Capacitor Banks</h4>
            <p className="text-gray-600">Equipment used to improve power factor by supplying reactive power</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Phase Angle</h4>
            <p className="text-gray-600">Angular difference between voltage and current waveforms in AC circuits</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Impedance</h4>
            <p className="text-gray-600">Total opposition to current flow in AC circuits including resistance and reactance</p>
          </div>
        </div>
      </section>

    </div>
  );
}
