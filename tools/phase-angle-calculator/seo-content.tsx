export default function PhaseAngleCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      {/* Main Content Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Phase Angle Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Phase Angle Calculator</strong> is a professional electrical engineering tool that calculates the phase angle (φ) between voltage and current in AC circuits. This free online calculator supports multiple calculation methods including power-based, impedance-based, and power factor-based calculations, making it essential for electrical engineers, power system analysts, and electronics students.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Phase angle is a critical parameter in AC circuit analysis that determines power factor, circuit efficiency, and reactive behavior. Understanding phase relationships is fundamental for power system design, motor control, and energy efficiency optimization.
        </p>
      </section>

      {/* How It Works */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How the Phase Angle Calculator Works
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Phase angle represents the time difference between voltage and current waveforms in AC circuits. When voltage and current are perfectly in phase (0°), the circuit is purely resistive. When they are 90° out of phase, the circuit is purely reactive (inductive or capacitive).
        </p>
        <p className="text-gray-700 leading-relaxed">
          This calculator provides three different methods to determine phase angle based on the information you have available: real and apparent power values, resistance and reactance values, or direct power factor input. Each method uses standard electrical engineering formulas to provide accurate results instantly.
        </p>
      </section>

      {/* Formula Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Phase Angle Formulas
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Method 1: Using Power</h4>
            <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-2">
              φ = arccos(P / S)
            </div>
            <p className="text-gray-700 text-sm">
              Where P is real power (Watts) and S is apparent power (VA)
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Method 2: Using Impedance</h4>
            <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-2">
              φ = arctan(X / R)
            </div>
            <p className="text-gray-700 text-sm">
              Where X is reactance (Ω) and R is resistance (Ω)
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Method 3: Using Power Factor</h4>
            <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-2">
              φ = arccos(PF)
            </div>
            <p className="text-gray-700 text-sm">
              Where PF is power factor (dimensionless, 0 to 1)
            </p>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Real-World Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6 not-prose">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 1: Industrial Motor Load</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> P = 1000W, S = 1250VA</p>
              <p><strong>Calculation:</strong> cos(φ) = 1000/1250 = 0.8</p>
              <p><strong>Output:</strong> φ ≈ 36.87°</p>
              <p className="text-xs text-gray-600 mt-2">Typical inductive motor load with 0.8 power factor.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 2: Balanced R-X Circuit</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> R = 10Ω, X = 10Ω</p>
              <p><strong>Calculation:</strong> tan(φ) = 10/10 = 1</p>
              <p><strong>Output:</strong> φ = 45°</p>
              <p className="text-xs text-gray-600 mt-2">Equal resistance and reactance produce 45° phase angle.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 3: Unity Power Factor</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> PF = 1.0</p>
              <p><strong>Calculation:</strong> φ = arccos(1.0)</p>
              <p><strong>Output:</strong> φ = 0°</p>
              <p className="text-xs text-gray-600 mt-2">Purely resistive load with no reactive component.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 4: Poor Power Factor</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> PF = 0.6</p>
              <p><strong>Calculation:</strong> φ = arccos(0.6)</p>
              <p><strong>Output:</strong> φ ≈ 53.13°</p>
              <p className="text-xs text-gray-600 mt-2">Poor power factor requiring correction for efficiency.</p>
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
          <li>✓ <strong>Power Factor Analysis:</strong> Determine power factor from phase angle measurements</li>
          <li>✓ <strong>Motor Performance:</strong> Analyze induction motor efficiency and reactive power requirements</li>
          <li>✓ <strong>Power System Design:</strong> Calculate reactive power compensation needs</li>
          <li>✓ <strong>Capacitor Bank Sizing:</strong> Determine capacitor requirements for power factor correction</li>
          <li>✓ <strong>Transformer Loading:</strong> Assess transformer capacity utilization with reactive loads</li>
          <li>✓ <strong>Energy Efficiency:</strong> Identify opportunities for reducing reactive power consumption</li>
          <li>✓ <strong>Circuit Analysis:</strong> Understand impedance characteristics in AC circuits</li>
          <li>✓ <strong>Electrical Testing:</strong> Verify measured values against theoretical calculations</li>
        </ul>
      </section>

      {/* Understanding Phase Angle */}
      <section className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Understanding Phase Angle
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Leading vs Lagging:</strong> Positive phase angles indicate inductive (lagging) loads where current lags voltage. Negative phase angles indicate capacitive (leading) loads where current leads voltage.</p>
          <p><strong>Power Factor Relationship:</strong> Power factor equals cos(φ). A phase angle of 0° gives PF = 1.0 (ideal), while 90° gives PF = 0 (purely reactive).</p>
          <p><strong>Reactive Power:</strong> Phase angle determines the amount of reactive power (VAR) in the system. Larger phase angles mean more reactive power and lower efficiency.</p>
          <p><strong>Practical Range:</strong> Most industrial loads have phase angles between 20° and 40°, corresponding to power factors of 0.77 to 0.94.</p>
        </div>
      </section>

      {/* Important Considerations */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Important Design Considerations
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Power Factor Penalties:</strong> Many utilities charge penalties for power factors below 0.9 (phase angles above ~25°). Monitor and correct poor power factor to avoid extra charges.</p>
          <p><strong>Equipment Sizing:</strong> Reactive power increases apparent power (VA), requiring larger transformers, cables, and switchgear even though it doesn't perform useful work.</p>
          <p><strong>Voltage Drop:</strong> Large phase angles increase voltage drop in distribution systems, potentially causing equipment malfunction.</p>
          <p><strong>Harmonic Effects:</strong> Non-linear loads can distort phase relationships. This calculator assumes sinusoidal waveforms.</p>
          <p><strong>Measurement Accuracy:</strong> Accurate phase angle measurement requires synchronized voltage and current measurements with quality instruments.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Multiple Calculation Methods:</strong> Choose from power, impedance, or power factor inputs</li>
          <li>✓ <strong>Instant Results:</strong> Get immediate calculations in both degrees and radians</li>
          <li>✓ <strong>Step-by-Step Solutions:</strong> Understand the calculation process with detailed breakdowns</li>
          <li>✓ <strong>Power Factor Display:</strong> Automatically calculate power factor from phase angle</li>
          <li>✓ <strong>Impedance Analysis:</strong> Calculate total impedance from R and X values</li>
          <li>✓ <strong>Common Presets:</strong> Quick access to typical load configurations</li>
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
              What is phase angle in AC circuits?
            </h3>
            <p className="text-gray-700">
              Phase angle is the angular difference between voltage and current waveforms in AC circuits, measured in degrees or radians. It indicates how much the current leads or lags the voltage, which determines the circuit's reactive behavior and power factor.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Why is phase angle important?
            </h3>
            <p className="text-gray-700">
              Phase angle directly affects power factor and system efficiency. Large phase angles mean more reactive power, which increases current flow without doing useful work. This leads to higher losses, larger equipment requirements, and potential utility penalties.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What causes phase angle in circuits?
            </h3>
            <p className="text-gray-700">
              Phase angle is caused by reactive components (inductors and capacitors). Inductors cause current to lag voltage (positive phase angle), while capacitors cause current to lead voltage (negative phase angle). Pure resistances have zero phase angle.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I improve poor power factor?
            </h3>
            <p className="text-gray-700">
              Install capacitor banks to compensate for inductive loads, use synchronous motors that can provide leading power factor, or replace inefficient motors with high-efficiency models. The goal is to reduce phase angle closer to 0° (power factor closer to 1.0).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is a good power factor?
            </h3>
            <p className="text-gray-700">
              Most utilities require power factor above 0.9 (phase angle below ~25°). Industrial facilities typically target 0.95 or higher (phase angle below ~18°) to avoid penalties and maximize efficiency. Unity power factor (1.0, 0° phase angle) is ideal but rarely achieved in practice.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can phase angle be negative?
            </h3>
            <p className="text-gray-700">
              Yes, negative phase angles indicate capacitive loads where current leads voltage. This is less common than positive (inductive) phase angles but occurs with capacitor banks, synchronous motors in leading mode, and capacitive power factor correction equipment.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I measure phase angle?
            </h3>
            <p className="text-gray-700">
              Use a power quality analyzer or oscilloscope to measure voltage and current waveforms simultaneously. The time difference between zero crossings, converted to degrees, gives the phase angle. Modern power meters can display phase angle directly.
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
            <p className="text-gray-600">Ratio of real power to apparent power, equals cos(φ)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Reactive Power</h4>
            <p className="text-gray-600">Power that oscillates between source and load, measured in VAR</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Impedance</h4>
            <p className="text-gray-600">Total opposition to AC current, combining resistance and reactance</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Power Triangle</h4>
            <p className="text-gray-600">Graphical representation of real, reactive, and apparent power relationships</p>
          </div>
        </div>
      </section>

    </div>
  );
}
