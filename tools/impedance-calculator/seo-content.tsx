export default function ImpedanceCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      
      {/* What is Impedance */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Impedance?</h2>
        <p className="mb-4">
          Impedance (Z) is the total opposition to alternating current (AC) in an electrical circuit. 
          It combines both resistance (R) and reactance (X) into a single complex value measured in ohms (Ω).
        </p>
        <p className="mb-4">
          Unlike resistance, which opposes both AC and DC equally, impedance varies with frequency and 
          includes the effects of inductors and capacitors in the circuit.
        </p>
      </section>

      {/* Formula */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Impedance Formula</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-center text-xl font-mono font-semibold text-gray-900 mb-4">
            Z = √(R² + (XL - XC)²)
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>Where:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Z</strong> = Impedance (Ohms)</li>
              <li><strong>R</strong> = Resistance (Ohms)</li>
              <li><strong>XL</strong> = Inductive Reactance (Ohms)</li>
              <li><strong>XC</strong> = Capacitive Reactance (Ohms)</li>
              <li><strong>X</strong> = Net Reactance = XL - XC (Ohms)</li>
            </ul>
          </div>
        </div>
        <p>
          The phase angle (θ) between voltage and current is calculated as: <strong>θ = arctan(X/R)</strong>
        </p>
      </section>

      {/* How to Calculate */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Impedance</h2>
        <ol className="list-decimal list-inside space-y-3">
          <li>
            <strong>Identify the circuit components:</strong> Determine the resistance (R), 
            inductive reactance (XL), and capacitive reactance (XC) values.
          </li>
          <li>
            <strong>Calculate net reactance:</strong> Subtract capacitive reactance from inductive reactance: X = XL - XC
          </li>
          <li>
            <strong>Apply the impedance formula:</strong> Z = √(R² + X²)
          </li>
          <li>
            <strong>Calculate phase angle (optional):</strong> θ = arctan(X/R)
          </li>
        </ol>
      </section>

      {/* Example Calculation */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Example Calculation</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="font-semibold mb-3">Example: Calculate impedance for a series RLC circuit</p>
          <div className="space-y-2 font-mono text-sm">
            <p><strong>Given:</strong></p>
            <p>R = 10 Ω</p>
            <p>XL = 5 Ω</p>
            <p>XC = 2 Ω</p>
            <p className="mt-3"><strong>Solution:</strong></p>
            <p>Step 1: X = XL - XC = 5 - 2 = 3 Ω</p>
            <p>Step 2: Z = √(R² + X²)</p>
            <p>Step 3: Z = √(10² + 3²)</p>
            <p>Step 4: Z = √(100 + 9)</p>
            <p>Step 5: Z = √109</p>
            <p className="font-bold text-primary">Result: Z = 10.44 Ω</p>
          </div>
        </div>
      </section>

      {/* Circuit Types */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of AC Circuits</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Inductive Circuit</h3>
            <p className="text-sm">
              When XL &gt; XC, the circuit is inductive. Current lags voltage by the phase angle. 
              Common in motors and transformers.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Capacitive Circuit</h3>
            <p className="text-sm">
              When XC &gt; XL, the circuit is capacitive. Current leads voltage by the phase angle. 
              Common in power factor correction.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Resistive Circuit</h3>
            <p className="text-sm">
              When XL = XC = 0, the circuit is purely resistive. Voltage and current are in phase. 
              Impedance equals resistance.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Resonant Circuit</h3>
            <p className="text-sm">
              When XL = XC, the circuit is at resonance. Reactances cancel out, and impedance is minimum (equals R). 
              Used in tuning circuits.
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Applications</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <div>
              <strong>Power Systems:</strong> Calculating impedance helps in power transmission, 
              fault analysis, and protection system design.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <div>
              <strong>Audio Equipment:</strong> Speaker impedance matching ensures optimal power transfer 
              and prevents amplifier damage.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <div>
              <strong>RF Circuits:</strong> Impedance matching in radio frequency circuits maximizes 
              signal transmission and minimizes reflections.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <div>
              <strong>Filter Design:</strong> Understanding impedance is crucial for designing 
              low-pass, high-pass, and band-pass filters.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <div>
              <strong>Motor Control:</strong> Impedance calculations help in selecting proper 
              motor starters and protection devices.
            </div>
          </li>
        </ul>
      </section>

      {/* Key Concepts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Concepts</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Phase Angle</h3>
            <p className="text-sm">
              The phase angle (θ) represents the phase difference between voltage and current. 
              Positive angles indicate inductive circuits (current lags), while negative angles 
              indicate capacitive circuits (current leads).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Impedance Triangle</h3>
            <p className="text-sm">
              Impedance can be visualized as a right triangle where resistance is the adjacent side, 
              reactance is the opposite side, and impedance is the hypotenuse.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Complex Impedance</h3>
            <p className="text-sm">
              In complex notation, impedance is expressed as Z = R + jX, where j is the imaginary unit. 
              The magnitude is |Z| = √(R² + X²).
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculation Tips</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">💡</span>
              <span>Always ensure all values are in the same unit (Ohms) before calculating</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">💡</span>
              <span>At resonance (XL = XC), impedance is minimum and equals resistance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">💡</span>
              <span>Higher impedance means lower current for a given voltage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">💡</span>
              <span>Impedance varies with frequency in circuits containing inductors or capacitors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">💡</span>
              <span>Use this calculator for series circuits; parallel circuits require different formulas</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is the difference between impedance and resistance?</h3>
            <p className="text-sm text-gray-600">
              Resistance opposes current flow in both AC and DC circuits and is frequency-independent. 
              Impedance is the total opposition in AC circuits, combining resistance and reactance, 
              and varies with frequency.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Why is impedance important in AC circuits?</h3>
            <p className="text-sm text-gray-600">
              Impedance determines current flow, power consumption, and voltage drops in AC circuits. 
              It&apos;s essential for circuit design, component selection, and system optimization.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can impedance be negative?</h3>
            <p className="text-sm text-gray-600">
              The magnitude of impedance is always positive. However, the reactance component can be 
              negative (capacitive) or positive (inductive), affecting the phase angle.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How does frequency affect impedance?</h3>
            <p className="text-sm text-gray-600">
              Inductive reactance (XL) increases with frequency, while capacitive reactance (XC) decreases. 
              This causes impedance to vary with frequency, which is fundamental to filter design.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
