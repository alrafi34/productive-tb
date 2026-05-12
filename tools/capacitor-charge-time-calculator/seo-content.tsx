export default function CapacitorChargeTimeCalculatorSEO() {
  return (
    <div className="mt-16 prose prose-gray max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Capacitor Charge Time Calculator
        </h2>
        
        <p className="text-gray-700 mb-4">
          The Capacitor Charge Time Calculator is a powerful tool for calculating how long it takes 
          a capacitor to charge in an RC (Resistor-Capacitor) circuit. This calculator is essential 
          for electronics engineers, students, hobbyists, and anyone working with timing circuits.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          Understanding RC Circuits
        </h3>
        
        <p className="text-gray-700 mb-4">
          In an RC circuit, a capacitor charges through a resistor when connected to a voltage source. 
          The charging process follows an exponential curve, and the time it takes depends on the 
          resistance (R) and capacitance (C) values.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          Time Constant (τ)
        </h3>
        
        <p className="text-gray-700 mb-4">
          The time constant (τ, pronounced "tau") is the product of resistance and capacitance: 
          <strong> τ = R × C</strong>. It represents the time required for the capacitor to charge 
          to approximately 63.2% of the supply voltage. After 5 time constants (5τ), the capacitor 
          is considered fully charged at about 99.3% of the supply voltage.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          Charging Formula
        </h3>
        
        <p className="text-gray-700 mb-4">
          The voltage across a charging capacitor at any time t is given by:
          <br />
          <strong>V(t) = V₀ × (1 - e^(-t/RC))</strong>
          <br />
          To find the time to reach a specific charge percentage, we use:
          <br />
          <strong>t = -RC × ln(1 - percentage)</strong>
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          Common Applications
        </h3>
        
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>555 Timer Circuits:</strong> Determining timing intervals</li>
          <li><strong>Power Supply Filters:</strong> Calculating smoothing capacitor charge time</li>
          <li><strong>Audio Circuits:</strong> Designing coupling and bypass capacitors</li>
          <li><strong>Timing Circuits:</strong> Creating delays and oscillators</li>
          <li><strong>Signal Processing:</strong> RC filters and integrators</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          Charge Percentages
        </h3>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>1τ (63%):</strong> One time constant - standard reference point</li>
            <li><strong>2τ (86%):</strong> Two time constants</li>
            <li><strong>3τ (95%):</strong> Three time constants - often considered "charged"</li>
            <li><strong>4τ (98%):</strong> Four time constants</li>
            <li><strong>5τ (99.3%):</strong> Five time constants - fully charged</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          How to Use This Calculator
        </h3>
        
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Enter the resistance value and select the appropriate unit (Ω, kΩ, MΩ)</li>
          <li>Enter the capacitance value and select the appropriate unit (F, µF, nF, pF)</li>
          <li>Select the target charge percentage (50%, 63%, 90%, 95%, or 99%)</li>
          <li>View instant results including time constant, charge time, and full charge time</li>
          <li>Review the step-by-step calculation for educational purposes</li>
        </ol>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          Practical Examples
        </h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-900 mb-2">
            <strong>Example 1: 555 Timer Circuit</strong>
          </p>
          <p className="text-sm text-blue-800">
            R = 10kΩ, C = 10µF → τ = 0.1s, Time to 63% ≈ 0.1s
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-900 mb-2">
            <strong>Example 2: Power Supply Filter</strong>
          </p>
          <p className="text-sm text-blue-800">
            R = 100Ω, C = 1000µF → τ = 0.1s, Time to 99% ≈ 0.46s
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          Important Notes
        </h3>
        
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Results are based on ideal components and conditions</li>
          <li>Real-world values may vary due to component tolerances</li>
          <li>Temperature affects both resistance and capacitance values</li>
          <li>ESR (Equivalent Series Resistance) of capacitors can affect charging time</li>
          <li>For precision timing, use components with tight tolerances</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          Features
        </h3>
        
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Real-time calculation with instant results</li>
          <li>Multiple unit support for resistance and capacitance</li>
          <li>Selectable target charge percentages</li>
          <li>Time constant (τ) calculation</li>
          <li>Step-by-step calculation breakdown</li>
          <li>Common preset values for quick calculations</li>
          <li>History tracking for previous calculations</li>
          <li>Export results to text file</li>
          <li>Copy results to clipboard</li>
          <li>Mobile-friendly responsive design</li>
        </ul>

      </div>
    </div>
  );
}
