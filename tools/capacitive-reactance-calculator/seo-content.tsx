export default function CapacitiveReactanceCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is Capacitive Reactance?
        </h2>
        <p className="mb-4">
          <strong>Capacitive Reactance (XC)</strong> is the opposition that a capacitor offers to alternating current (AC). Unlike resistance, which opposes both AC and DC equally, capacitive reactance varies with frequency. As frequency increases, capacitive reactance decreases, allowing more AC current to flow through the capacitor.
        </p>
        <p>
          This calculator helps electrical engineering students, electronics hobbyists, circuit designers, and educators quickly determine capacitive reactance using the standard formula.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Capacitive Reactance Formula
        </h2>
        <p className="mb-4">
          The formula for calculating capacitive reactance is:
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="font-mono text-center text-lg">
            <strong>XC = 1 / (2πfC)</strong>
          </p>
        </div>
        <p className="mb-4">
          Where:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>XC</strong> is the capacitive reactance in Ohms (Ω)</li>
          <li><strong>f</strong> is the frequency in Hertz (Hz)</li>
          <li><strong>C</strong> is the capacitance in Farads (F)</li>
          <li><strong>π</strong> (pi) is approximately 3.14159</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: Power Line Frequency</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> f = 50 Hz, C = 10 µF
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Formula:</strong> XC = 1 / (2πfC)
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> XC = 1 / (2 × π × 50 × 0.00001) ≈ 318.31 Ω
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 318.31 Ω
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Audio Frequency</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> f = 1 kHz, C = 100 nF
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> XC = 1 / (2 × π × 1000 × 0.0000001) ≈ 1591.55 Ω
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 1591.55 Ω
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: 60 Hz System</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> f = 60 Hz, C = 1 µF
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> XC = 1 / (2 × π × 60 × 0.000001) ≈ 2652.58 Ω
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 2652.58 Ω
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Capacitive Reactance
        </h2>
        <p className="mb-4">
          Key characteristics of capacitive reactance:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Inversely Proportional to Frequency:</strong> As frequency increases, XC decreases</li>
          <li><strong>Inversely Proportional to Capacitance:</strong> Larger capacitors have lower reactance</li>
          <li><strong>Measured in Ohms:</strong> Like resistance, but frequency-dependent</li>
          <li><strong>Phase Shift:</strong> Current leads voltage by 90° in a pure capacitor</li>
          <li><strong>DC Blocking:</strong> At DC (f = 0), XC approaches infinity (open circuit)</li>
          <li><strong>AC Coupling:</strong> At high frequencies, XC approaches zero (short circuit)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Unit Conversions
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Frequency Units</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">Unit</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Value in Hz</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Hz</td>
                    <td className="border border-gray-300 px-3 py-2">1</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">kHz</td>
                    <td className="border border-gray-300 px-3 py-2">1,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">MHz</td>
                    <td className="border border-gray-300 px-3 py-2">1,000,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Capacitance Units</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">Unit</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Value in F</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">F</td>
                    <td className="border border-gray-300 px-3 py-2">1</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">mF</td>
                    <td className="border border-gray-300 px-3 py-2">10⁻³</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">µF</td>
                    <td className="border border-gray-300 px-3 py-2">10⁻⁶</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">nF</td>
                    <td className="border border-gray-300 px-3 py-2">10⁻⁹</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">pF</td>
                    <td className="border border-gray-300 px-3 py-2">10⁻¹²</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use This Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Enter Frequency:</strong> Input the AC frequency value and select the unit (Hz, kHz, or MHz)</li>
          <li><strong>Enter Capacitance:</strong> Input the capacitor value and select the unit (F, mF, µF, nF, or pF)</li>
          <li><strong>View Results:</strong> The capacitive reactance is calculated instantly</li>
          <li><strong>Check Steps:</strong> Review the step-by-step calculation for learning</li>
          <li><strong>Use Presets:</strong> Click common value presets for quick calculations</li>
          <li><strong>Copy or Export:</strong> Save your calculation for future reference</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Applications of Capacitive Reactance
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>AC Coupling:</strong> Blocking DC while passing AC signals</li>
          <li><strong>Filter Circuits:</strong> High-pass and band-pass filters</li>
          <li><strong>Power Factor Correction:</strong> Compensating inductive loads</li>
          <li><strong>Tuning Circuits:</strong> Radio and RF applications</li>
          <li><strong>Motor Starting:</strong> Phase shift in AC motors</li>
          <li><strong>Signal Processing:</strong> Audio crossovers and equalizers</li>
          <li><strong>Impedance Matching:</strong> RF and antenna circuits</li>
          <li><strong>Timing Circuits:</strong> RC oscillators and timers</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Capacitive vs Inductive Reactance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Aspect</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Capacitive (XC)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Inductive (XL)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Formula</td>
                <td className="border border-gray-300 px-4 py-2">XC = 1/(2πfC)</td>
                <td className="border border-gray-300 px-4 py-2">XL = 2πfL</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Frequency Effect</td>
                <td className="border border-gray-300 px-4 py-2">Decreases with frequency</td>
                <td className="border border-gray-300 px-4 py-2">Increases with frequency</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Phase Shift</td>
                <td className="border border-gray-300 px-4 py-2">Current leads voltage by 90°</td>
                <td className="border border-gray-300 px-4 py-2">Voltage leads current by 90°</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">DC Behavior</td>
                <td className="border border-gray-300 px-4 py-2">Open circuit (infinite)</td>
                <td className="border border-gray-300 px-4 py-2">Short circuit (zero)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Instant Results:</strong> Calculate XC in real-time as you type</li>
          <li><strong>Unit Conversion:</strong> Automatic conversion between different units</li>
          <li><strong>Step-by-Step:</strong> See detailed calculation steps for learning</li>
          <li><strong>Common Presets:</strong> Quick access to typical frequency/capacitance combinations</li>
          <li><strong>Educational:</strong> Perfect for students learning AC circuit theory</li>
          <li><strong>Professional:</strong> Quick calculations for circuit design</li>
          <li><strong>No Installation:</strong> Works entirely in your browser</li>
          <li><strong>History Tracking:</strong> Save and review past calculations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is the difference between resistance and reactance?</h3>
            <p className="text-gray-700">
              Resistance opposes both AC and DC current equally and dissipates energy as heat. Reactance only opposes AC current and stores energy temporarily in electric (capacitive) or magnetic (inductive) fields. Reactance varies with frequency, while resistance does not.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Why does capacitive reactance decrease with frequency?</h3>
            <p className="text-gray-700">
              At higher frequencies, the capacitor charges and discharges more rapidly, allowing more current to flow. The formula XC = 1/(2πfC) shows that XC is inversely proportional to frequency, so as f increases, XC decreases.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What happens to a capacitor at DC (0 Hz)?</h3>
            <p className="text-gray-700">
              At DC (f = 0), the capacitive reactance becomes infinite, meaning the capacitor acts as an open circuit and blocks DC current. This is why capacitors are used for AC coupling and DC blocking.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How do I calculate impedance with capacitive reactance?</h3>
            <p className="text-gray-700">
              In a circuit with resistance (R) and capacitive reactance (XC), the total impedance is Z = √(R² + XC²). The phase angle is θ = arctan(-XC/R). Use an impedance calculator for complex circuits.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I use this calculator for power factor correction?</h3>
            <p className="text-gray-700">
              Yes! This calculator helps determine the capacitive reactance needed for power factor correction. By knowing the required XC at your system frequency, you can select the appropriate capacitor value.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Who Should Use This Calculator?
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Students:</strong> Learning AC circuit theory and electronics</li>
          <li><strong>Engineers:</strong> Designing filters, power supplies, and RF circuits</li>
          <li><strong>Hobbyists:</strong> Building audio equipment and radio projects</li>
          <li><strong>Technicians:</strong> Troubleshooting AC circuits and equipment</li>
          <li><strong>Teachers:</strong> Demonstrating capacitive reactance concepts</li>
          <li><strong>Researchers:</strong> Quick calculations for experimental setups</li>
        </ul>
      </section>
    </div>
  );
}
