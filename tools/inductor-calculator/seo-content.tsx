export default function InductorCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Inductor Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Inductor Calculator is a comprehensive online tool designed for electrical engineers, 
            students, and electronics enthusiasts to calculate inductance and inductive reactance. 
            This free calculator supports multiple calculation modes including solenoid inductance, 
            air-core coil inductance, and inductive reactance calculations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Calculate inductance for solenoid coils using L = (μ × N² × A) / l</li>
            <li>Calculate inductance for air-core coils using L = (μ₀ × N² × π × r²) / l</li>
            <li>Calculate inductive reactance using XL = 2πfL</li>
            <li>Support for multiple unit conversions (H, mH, µH, nH)</li>
            <li>Real-time calculations with instant results</li>
            <li>Step-by-step solution breakdown</li>
            <li>Multiple core types (air, iron, custom permeability)</li>
            <li>History tracking and export functionality</li>
            <li>Mobile-responsive design</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Inductance</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Inductance is the property of an electrical conductor by which a change in current 
            through it induces an electromotive force (EMF) in both the conductor itself and in 
            any nearby conductors. The unit of inductance is the Henry (H).
          </p>
          <p className="text-gray-700 leading-relaxed">
            Inductors are passive electronic components that store energy in a magnetic field when 
            electric current flows through them. They are commonly used in filters, transformers, 
            energy storage, and RF circuits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Formulas Used</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Solenoid Inductance</h3>
              <p className="font-mono text-blue-800 mb-2">L = (μ × N² × A) / l</p>
              <ul className="text-sm text-blue-900 space-y-1">
                <li>L = Inductance (Henry)</li>
                <li>μ = Permeability of core material (H/m)</li>
                <li>N = Number of turns</li>
                <li>A = Cross-sectional area (m²)</li>
                <li>l = Length of coil (m)</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Air-Core Coil Inductance</h3>
              <p className="font-mono text-green-800 mb-2">L = (μ₀ × N² × π × r²) / l</p>
              <ul className="text-sm text-green-900 space-y-1">
                <li>L = Inductance (Henry)</li>
                <li>μ₀ = Permeability of free space (4π × 10⁻⁷ H/m)</li>
                <li>N = Number of turns</li>
                <li>r = Radius of coil (m)</li>
                <li>l = Length of coil (m)</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Inductive Reactance</h3>
              <p className="font-mono text-purple-800 mb-2">XL = 2πfL</p>
              <ul className="text-sm text-purple-900 space-y-1">
                <li>XL = Inductive reactance (Ohm)</li>
                <li>f = Frequency (Hz)</li>
                <li>L = Inductance (Henry)</li>
                <li>π = Pi (3.14159...)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Select Calculation Mode:</strong> Choose between solenoid inductance, 
              air-core coil inductance, or inductive reactance calculation.
            </li>
            <li>
              <strong>Enter Input Values:</strong> Input the required parameters based on your 
              selected mode (turns, dimensions, frequency, etc.).
            </li>
            <li>
              <strong>Select Units:</strong> Choose appropriate units for each input value 
              (meters, centimeters, Henry, microhenry, etc.).
            </li>
            <li>
              <strong>View Results:</strong> The calculator provides instant results with 
              automatic unit conversions and step-by-step calculations.
            </li>
            <li>
              <strong>Export or Save:</strong> Save calculations to history or export results 
              for documentation purposes.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Applications</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>RF Circuits:</strong> Designing resonant circuits and impedance matching</li>
            <li><strong>Power Electronics:</strong> Buck/boost converters and power supplies</li>
            <li><strong>Filters:</strong> Low-pass, high-pass, and band-pass filter design</li>
            <li><strong>Transformers:</strong> Calculating primary and secondary inductances</li>
            <li><strong>Energy Storage:</strong> Inductive energy storage systems</li>
            <li><strong>Motor Control:</strong> Analyzing motor inductance characteristics</li>
            <li><strong>Signal Processing:</strong> Chokes and EMI suppression</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Examples</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 1: Air-Core Solenoid</h3>
              <p className="text-sm text-gray-700 mb-2">
                Calculate inductance for a coil with 100 turns, 2 cm radius, and 10 cm length:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Turns (N) = 100</li>
                <li>Radius (r) = 2 cm = 0.02 m</li>
                <li>Length (l) = 10 cm = 0.1 m</li>
                <li>Result: L ≈ 25.13 µH</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 2: Inductive Reactance</h3>
              <p className="text-sm text-gray-700 mb-2">
                Calculate reactance for a 10 µH inductor at 1 MHz:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Inductance (L) = 10 µH = 10 × 10⁻⁶ H</li>
                <li>Frequency (f) = 1 MHz = 1,000,000 Hz</li>
                <li>Result: XL ≈ 62.83 Ω</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Accurate Calculations</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Ensure all measurements are accurate, especially coil dimensions</li>
            <li>Use consistent units throughout your calculations</li>
            <li>Consider the core material's permeability for accurate results</li>
            <li>Account for temperature effects in precision applications</li>
            <li>Verify calculated values with actual measurements when possible</li>
            <li>For multi-layer coils, use specialized formulas or simulation tools</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between inductance and inductive reactance?</h3>
              <p className="text-gray-700 text-sm">
                Inductance (L) is a property of the inductor measured in Henries, while inductive 
                reactance (XL) is the opposition to AC current flow, measured in Ohms. Reactance 
                depends on both inductance and frequency: XL = 2πfL.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does core material affect inductance?</h3>
              <p className="text-gray-700 text-sm">
                Core material significantly affects inductance through its permeability (μ). 
                Ferromagnetic materials like iron can increase inductance by hundreds of times 
                compared to air cores due to their higher permeability.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why is my calculated inductance different from measured values?</h3>
              <p className="text-gray-700 text-sm">
                Differences can occur due to: non-ideal core materials, winding imperfections, 
                parasitic capacitance, temperature effects, measurement errors, or deviations 
                from the ideal solenoid geometry assumed in the formulas.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I use this calculator for toroidal inductors?</h3>
              <p className="text-gray-700 text-sm">
                This calculator is optimized for solenoid and air-core coils. Toroidal inductors 
                require different formulas that account for the toroid's geometry (inner radius, 
                outer radius, and height).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h2>
          <p className="text-gray-700">
            Explore our other electrical engineering calculators:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
            <li>Capacitor Calculator - Calculate capacitance and stored energy</li>
            <li>Capacitive Reactance Calculator - Calculate XC for capacitors</li>
            <li>Ohm's Law Calculator - Calculate voltage, current, and resistance</li>
            <li>Voltage Divider Calculator - Design voltage divider circuits</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
