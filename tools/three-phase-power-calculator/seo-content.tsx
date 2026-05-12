export default function ThreePhasePowerCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      {/* Main Content Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Three Phase Power Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Three Phase Power Calculator</strong> is a fast, browser-based electrical engineering utility that calculates power parameters in 3-phase AC systems. This free online tool helps engineers, electricians, students, and technicians compute real power (kW), apparent power (kVA), reactive power (kVAR), current, and voltage based on standard three-phase electrical formulas.
        </p>
        <p className="text-gray-700 leading-relaxed">
          By providing instant calculations with step-by-step explanations, this calculator is essential for electrical system design, industrial load estimation, generator sizing, motor power calculations, and academic learning.
        </p>
      </section>

      {/* How It Works */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How the Three Phase Power Calculator Works
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Three-phase power systems are the backbone of industrial and commercial electrical distribution. This calculator implements standard three-phase power formulas to determine electrical parameters based on your input values. It supports three calculation modes to solve for different unknowns.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Simply select your calculation mode, enter the known parameters (voltage, current, power factor), and the calculator instantly computes all power values including real, apparent, and reactive power.
        </p>
      </section>

      {/* Formula Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Three Phase Power Formulas
        </h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="font-semibold text-gray-900 mb-2">Real Power (kW)</div>
            <div className="font-mono text-sm">P = √3 × V × I × PF / 1000</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="font-semibold text-gray-900 mb-2">Apparent Power (kVA)</div>
            <div className="font-mono text-sm">S = √3 × V × I / 1000</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="font-semibold text-gray-900 mb-2">Reactive Power (kVAR)</div>
            <div className="font-mono text-sm">Q = √(S² - P²)</div>
          </div>
        </div>
        <p className="text-gray-700 text-sm mt-4 mb-3">
          Where:
        </p>
        <ul className="text-gray-700 text-sm space-y-1">
          <li><strong>P</strong> = Real Power (kW)</li>
          <li><strong>S</strong> = Apparent Power (kVA)</li>
          <li><strong>Q</strong> = Reactive Power (kVAR)</li>
          <li><strong>V</strong> = Line Voltage (V)</li>
          <li><strong>I</strong> = Line Current (A)</li>
          <li><strong>PF</strong> = Power Factor (0 to 1)</li>
          <li><strong>√3</strong> = 1.732 (square root of 3)</li>
        </ul>
      </section>

      {/* Examples */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Real-World Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6 not-prose">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 1: Small Industrial Motor</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 415V, I = 10A, PF = 0.8</p>
              <p><strong>Output:</strong></p>
              <p>Real Power ≈ 5.76 kW</p>
              <p>Apparent Power ≈ 7.19 kVA</p>
              <p>Reactive Power ≈ 4.32 kVAR</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 2: Medium Industrial Load</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 400V, I = 20A, PF = 0.9</p>
              <p><strong>Output:</strong></p>
              <p>Real Power ≈ 12.47 kW</p>
              <p>Apparent Power ≈ 13.86 kVA</p>
              <p>Reactive Power ≈ 6.05 kVAR</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 3: Current Calculation</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> P = 10kW, V = 415V, PF = 0.85</p>
              <p><strong>Output:</strong></p>
              <p>Estimated Current ≈ 16.4A</p>
              <p>Apparent Power ≈ 11.76 kVA</p>
              <p>Reactive Power ≈ 6.20 kVAR</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 4: Generator Sizing</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> V = 415V, I = 100A, PF = 0.8</p>
              <p><strong>Output:</strong></p>
              <p>Real Power ≈ 57.6 kW</p>
              <p>Apparent Power ≈ 71.9 kVA</p>
              <p>Reactive Power ≈ 43.2 kVAR</p>
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
          <li>✓ <strong>Electrical System Design:</strong> Calculate power requirements for industrial and commercial installations</li>
          <li>✓ <strong>Motor Power Calculations:</strong> Determine power consumption of three-phase motors</li>
          <li>✓ <strong>Generator Sizing:</strong> Select appropriate generator capacity for load requirements</li>
          <li>✓ <strong>Load Estimation:</strong> Estimate total electrical load in industrial facilities</li>
          <li>✓ <strong>Power Factor Analysis:</strong> Analyze system efficiency and reactive power requirements</li>
          <li>✓ <strong>Cable Sizing:</strong> Calculate current for proper wire gauge selection</li>
          <li>✓ <strong>Transformer Selection:</strong> Determine transformer kVA rating needed</li>
          <li>✓ <strong>Energy Audits:</strong> Assess power consumption in three-phase systems</li>
          <li>✓ <strong>Educational Projects:</strong> Learn three-phase power concepts and calculations</li>
        </ul>
      </section>

      {/* Important Considerations */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Important Design Considerations
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Balanced Load Assumption:</strong> These formulas assume a balanced three-phase load where all three phases carry equal current. Unbalanced loads require more complex analysis.</p>
          <p><strong>Line vs Phase Values:</strong> The calculator uses line-to-line voltage and line current, which are standard measurements in three-phase systems. Phase voltage is line voltage divided by √3.</p>
          <p><strong>Power Factor Impact:</strong> Low power factor increases current draw and apparent power, requiring larger cables, transformers, and generators. Most utilities charge penalties for power factor below 0.85.</p>
          <p><strong>Voltage Standards:</strong> Common three-phase voltages include 400V/415V (50Hz systems in EU/Asia), 480V (60Hz in US), and 690V (industrial applications).</p>
          <p><strong>Safety Margins:</strong> When sizing equipment, add 20-25% safety margin to calculated values to account for starting currents, future expansion, and derating factors.</p>
          <p><strong>Harmonics:</strong> Non-linear loads (VFDs, rectifiers) introduce harmonics that can affect power measurements. True RMS meters are required for accurate readings.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Instant Results:</strong> Get immediate calculations without manual math or spreadsheets</li>
          <li>✓ <strong>Multiple Calculation Modes:</strong> Solve for power, current, or voltage based on available data</li>
          <li>✓ <strong>Step-by-Step Explanation:</strong> Understand the calculation process with detailed breakdowns</li>
          <li>✓ <strong>Power Triangle Analysis:</strong> Visualize relationship between real, reactive, and apparent power</li>
          <li>✓ <strong>Preset Configurations:</strong> Quick access to common industrial system examples</li>
          <li>✓ <strong>History Tracking:</strong> Save and recall previous calculations for comparison</li>
          <li>✓ <strong>Export Options:</strong> Generate detailed reports in text or CSV format</li>
          <li>✓ <strong>Mobile Friendly:</strong> Use on any device with responsive design</li>
          <li>✓ <strong>Free & Browser-Based:</strong> No installation, registration, or subscription required</li>
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
              What is three-phase power?
            </h3>
            <p className="text-gray-700">
              Three-phase power is a method of electrical power transmission using three alternating currents that are offset by 120 degrees. It is more efficient than single-phase power and is used in industrial and commercial applications for motors, large equipment, and power distribution.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Why is √3 (1.732) used in three-phase calculations?
            </h3>
            <p className="text-gray-700">
              The factor √3 appears because three-phase systems have three conductors with voltages 120° apart. When calculating power using line-to-line voltage and line current, the geometric relationship between phases introduces this factor. It accounts for the phase difference in balanced three-phase systems.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is the difference between kW, kVA, and kVAR?
            </h3>
            <p className="text-gray-700">
              kW (kilowatts) is real power that does actual work. kVA (kilovolt-amperes) is apparent power, the total power supplied. kVAR (kilovolt-amperes reactive) is reactive power that oscillates between source and load. The relationship is: kVA² = kW² + kVAR². Power factor = kW / kVA.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is a good power factor for industrial systems?
            </h3>
            <p className="text-gray-700">
              A power factor of 0.85 to 0.95 is typical for industrial systems. Values above 0.95 are excellent. Below 0.85, power factor correction (capacitor banks) is usually recommended to avoid utility penalties and reduce energy costs. Motors and inductive loads typically have power factors between 0.7 and 0.9.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I measure three-phase power in real systems?
            </h3>
            <p className="text-gray-700">
              Use a three-phase power meter or power analyzer that measures voltage, current, and power factor on all three phases. For balanced loads, you can measure one phase and multiply by 3, but for accurate results, especially with unbalanced loads, measure all three phases and sum the power readings.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I use this calculator for single-phase systems?
            </h3>
            <p className="text-gray-700">
              No, this calculator is specifically for three-phase systems. For single-phase calculations, use P = V × I × PF (without the √3 factor). Single-phase power is simpler and doesn't require the three-phase correction factor.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What voltage should I use - line or phase voltage?
            </h3>
            <p className="text-gray-700">
              Use line-to-line voltage (the voltage between any two phases), which is what you typically measure with a voltmeter. Common values are 400V, 415V, or 480V. Phase voltage (line-to-neutral) is line voltage divided by √3, but the calculator expects line voltage.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I size a generator for three-phase loads?
            </h3>
            <p className="text-gray-700">
              Calculate the total kVA required using this calculator, then add 20-25% safety margin for motor starting currents and future expansion. Select a generator with kVA rating equal to or greater than your calculated value. Consider power factor when sizing - generators are rated in kVA, not kW.
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
            <h4 className="font-semibold text-gray-900 mb-2">Power Factor Correction</h4>
            <p className="text-gray-600">Using capacitor banks to improve power factor and reduce reactive power</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Motor Starting Current</h4>
            <p className="text-gray-600">Three-phase motors draw 5-7x rated current during startup</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Transformer Sizing</h4>
            <p className="text-gray-600">Selecting transformer kVA rating based on load requirements</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Cable Sizing</h4>
            <p className="text-gray-600">Determining proper wire gauge based on current and voltage drop</p>
          </div>
        </div>
      </section>

    </div>
  );
}
