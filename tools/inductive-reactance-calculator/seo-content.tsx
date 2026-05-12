export default function InductiveReactanceCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What is Inductive Reactance?
        </h2>
        <p className="mb-4">
          <strong>Inductive Reactance (XL)</strong> is the opposition that an inductor offers to alternating current (AC). Unlike resistance, which opposes both AC and DC equally, inductive reactance varies with frequency. As frequency increases, inductive reactance increases, restricting more AC current flow through the inductor.
        </p>
        <p>
          This calculator helps electrical engineering students, electronics hobbyists, circuit designers, and educators quickly determine inductive reactance using the standard formula.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Inductive Reactance Formula
        </h2>
        <p className="mb-4">
          The formula for calculating inductive reactance is:
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="font-mono text-center text-lg">
            <strong>XL = 2πfL</strong>
          </p>
        </div>
        <p className="mb-4">
          Where:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>XL</strong> is the inductive reactance in Ohms (Ω)</li>
          <li><strong>f</strong> is the frequency in Hertz (Hz)</li>
          <li><strong>L</strong> is the inductance in Henries (H)</li>
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
              <strong>Given:</strong> f = 50 Hz, L = 0.1 H
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Formula:</strong> XL = 2πfL
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> XL = 2 × π × 50 × 0.1 ≈ 31.42 Ω
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 31.42 Ω
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: 60 Hz System</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> f = 60 Hz, L = 0.05 H
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> XL = 2 × π × 60 × 0.05 ≈ 18.85 Ω
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 18.85 Ω
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: Audio Frequency</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Given:</strong> f = 1 kHz, L = 0.01 H
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Calculation:</strong> XL = 2 × π × 1000 × 0.01 ≈ 62.83 Ω
            </p>
            <p className="text-sm font-semibold text-primary">
              <strong>Result:</strong> 62.83 Ω
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding Inductive Reactance
        </h2>
        <p className="mb-4">
          Key characteristics of inductive reactance:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Directly Proportional to Frequency:</strong> As frequency increases, XL increases</li>
          <li><strong>Directly Proportional to Inductance:</strong> Larger inductors have higher reactance</li>
          <li><strong>Measured in Ohms:</strong> Like resistance, but frequency-dependent</li>
          <li><strong>Phase Shift:</strong> Voltage leads current by 90° in a pure inductor</li>
          <li><strong>DC Blocking:</strong> At DC (f = 0), XL equals zero (short circuit)</li>
          <li><strong>High Frequency Blocking:</strong> At high frequencies, XL becomes very large (open circuit)</li>
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
            <h3 className="font-semibold text-gray-900 mb-2">Inductance Units</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">Unit</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Value in H</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">H</td>
                    <td className="border border-gray-300 px-3 py-2">1</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">mH</td>
                    <td className="border border-gray-300 px-3 py-2">10⁻³</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">µH</td>
                    <td className="border border-gray-300 px-3 py-2">10⁻⁶</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">nH</td>
                    <td className="border border-gray-300 px-3 py-2">10⁻⁹</td>
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
          <li><strong>Enter Inductance:</strong> Input the inductor value and select the unit (H, mH, µH, or nH)</li>
          <li><strong>View Results:</strong> The inductive reactance is calculated instantly</li>
          <li><strong>Check Steps:</strong> Review the step-by-step calculation for learning</li>
          <li><strong>Use Presets:</strong> Click common value presets for quick calculations</li>
          <li><strong>Copy or Export:</strong> Save your calculation for future reference</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Applications of Inductive Reactance
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Filter Circuits:</strong> Low-pass and band-pass filters</li>
          <li><strong>Power Factor Correction:</strong> Compensating capacitive loads</li>
          <li><strong>Tuning Circuits:</strong> Radio and RF applications</li>
          <li><strong>Chokes:</strong> Blocking high-frequency AC while passing DC</li>
          <li><strong>Transformers:</strong> AC voltage transformation</li>
          <li><strong>Motor Control:</strong> Inductive loads in AC motors</li>
          <li><strong>Impedance Matching:</strong> RF and antenna circuits</li>
          <li><strong>Energy Storage:</strong> Switching power supplies and converters</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Inductive vs Capacitive Reactance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Aspect</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Inductive (XL)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Capacitive (XC)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Formula</td>
                <td className="border border-gray-300 px-4 py-2">XL = 2πfL</td>
                <td className="border border-gray-300 px-4 py-2">XC = 1/(2πfC)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Frequency Effect</td>
                <td className="border border-gray-300 px-4 py-2">Increases with frequency</td>
                <td className="border border-gray-300 px-4 py-2">Decreases with frequency</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Phase Shift</td>
                <td className="border border-gray-300 px-4 py-2">Voltage leads current by 90°</td>
                <td className="border border-gray-300 px-4 py-2">Current leads voltage by 90°</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">DC Behavior</td>
                <td className="border border-gray-300 px-4 py-2">Short circuit (zero)</td>
                <td className="border border-gray-300 px-4 py-2">Open circuit (infinite)</td>
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
          <li><strong>Instant Results:</strong> Calculate XL in real-time as you type</li>
          <li><strong>Unit Conversion:</strong> Automatic conversion between different units</li>
          <li><strong>Step-by-Step:</strong> See detailed calculation steps for learning</li>
          <li><strong>Common Presets:</strong> Quick access to typical frequency/inductance combinations</li>
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
            <h3 className="font-semibold text-gray-900 mb-2">Why does inductive reactance increase with frequency?</h3>
            <p className="text-gray-700">
              At higher frequencies, the magnetic field in the inductor changes more rapidly, inducing a larger back EMF (electromotive force) that opposes current flow. The formula XL = 2πfL shows that XL is directly proportional to frequency, so as f increases, XL increases.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What happens to an inductor at DC (0 Hz)?</h3>
            <p className="text-gray-700">
              At DC (f = 0), the inductive reactance becomes zero, meaning the inductor acts as a short circuit and allows DC current to flow freely. This is why inductors are used for DC passing and AC blocking (chokes).
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How do I calculate impedance with inductive reactance?</h3>
            <p className="text-gray-700">
              In a circuit with resistance (R) and inductive reactance (XL), the total impedance is Z = √(R² + XL²). The phase angle is θ = arctan(XL/R). Use an impedance calculator for complex circuits.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I use this calculator for transformer design?</h3>
            <p className="text-gray-700">
              Yes! This calculator helps determine the inductive reactance of transformer windings at specific frequencies. Knowing XL is essential for calculating magnetizing current and designing efficient transformers.
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
          <li><strong>Teachers:</strong> Demonstrating inductive reactance concepts</li>
          <li><strong>Researchers:</strong> Quick calculations for experimental setups</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Practical Tips for Working with Inductors
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Core Material:</strong> Iron cores increase inductance but add losses at high frequencies</li>
          <li><strong>Air Core:</strong> Lower inductance but better for high-frequency applications</li>
          <li><strong>Quality Factor (Q):</strong> Higher Q means lower resistance and better performance</li>
          <li><strong>Self-Resonance:</strong> Every inductor has parasitic capacitance causing resonance</li>
          <li><strong>Current Rating:</strong> Ensure the inductor can handle the expected current</li>
          <li><strong>Temperature Effects:</strong> Inductance can vary with temperature</li>
        </ul>
      </section>
    </div>
  );
}
