export default function SignalAttenuationCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Signal Attenuation Calculator
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Signal Attenuation Calculator is a professional engineering tool designed to calculate signal loss (attenuation) 
            in electrical and communication systems. It supports three calculation modes: power-based, voltage-based, and 
            distance-based attenuation, making it versatile for various applications including RF engineering, telecommunications, 
            audio systems, and circuit design.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What is Signal Attenuation?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Signal attenuation refers to the reduction in signal strength as it travels through a medium or component. 
            It is typically measured in decibels (dB) and is a critical parameter in designing and troubleshooting 
            communication systems, transmission lines, cables, and electronic circuits.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Attenuation can occur due to various factors including resistance in conductors, impedance mismatches, 
            absorption in dielectric materials, and distance traveled. Understanding and calculating attenuation is 
            essential for ensuring signal integrity and system performance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Calculation Methods
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Power-Based Attenuation
              </h3>
              <p className="text-blue-800 text-sm mb-2">
                <strong>Formula:</strong> Attenuation (dB) = 10 × log₁₀(P₁ / P₂)
              </p>
              <p className="text-blue-800 text-sm">
                Used when you know the input and output power levels. Common in RF systems, amplifiers, and power measurements.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Voltage-Based Attenuation
              </h3>
              <p className="text-green-800 text-sm mb-2">
                <strong>Formula:</strong> Attenuation (dB) = 20 × log₁₀(V₁ / V₂)
              </p>
              <p className="text-green-800 text-sm">
                Used when measuring voltage levels. Common in audio systems, signal processing, and voltage divider circuits.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Distance-Based Attenuation
              </h3>
              <p className="text-purple-800 text-sm mb-2">
                <strong>Formula:</strong> Total Loss (dB) = Loss per unit × Distance
              </p>
              <p className="text-purple-800 text-sm">
                Used for calculating loss over cable length or transmission distance. Common in fiber optics, coaxial cables, and network design.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Common Applications
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>RF Engineering:</strong> Calculating signal loss in antennas, transmission lines, and RF circuits</li>
            <li><strong>Telecommunications:</strong> Analyzing signal degradation in fiber optic and copper cables</li>
            <li><strong>Audio Systems:</strong> Measuring signal loss in audio cables and equipment</li>
            <li><strong>Network Design:</strong> Planning cable runs and estimating signal strength in Ethernet networks</li>
            <li><strong>Circuit Design:</strong> Analyzing voltage drops and power losses in electronic circuits</li>
            <li><strong>Broadcast Systems:</strong> Calculating signal loss in TV and radio transmission systems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Decibels (dB)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The decibel (dB) is a logarithmic unit used to express the ratio between two values. In signal attenuation:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>3 dB loss:</strong> Signal power is reduced to half (50%)</li>
            <li><strong>6 dB loss:</strong> Signal power is reduced to one-quarter (25%)</li>
            <li><strong>10 dB loss:</strong> Signal power is reduced to one-tenth (10%)</li>
            <li><strong>20 dB loss:</strong> Signal power is reduced to one-hundredth (1%)</li>
            <li><strong>Negative dB:</strong> Indicates gain rather than loss</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Typical Cable Attenuation Values
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Cable Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Typical Loss</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">RG-58 Coaxial</td>
                  <td className="px-4 py-3 text-gray-700">0.2 dB/m @ 100 MHz</td>
                  <td className="px-4 py-3 text-gray-700">RF, Amateur Radio</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Cat6 Ethernet</td>
                  <td className="px-4 py-3 text-gray-700">0.05 dB/m @ 100 MHz</td>
                  <td className="px-4 py-3 text-gray-700">Networking</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Fiber Optic (Single-mode)</td>
                  <td className="px-4 py-3 text-gray-700">0.2-0.3 dB/km</td>
                  <td className="px-4 py-3 text-gray-700">Long-distance Telecom</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">RG-6 Coaxial</td>
                  <td className="px-4 py-3 text-gray-700">0.1 dB/m @ 100 MHz</td>
                  <td className="px-4 py-3 text-gray-700">Cable TV, Satellite</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Use This Calculator
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Select your calculation mode (Power, Voltage, or Distance)</li>
            <li>Enter the required input values with appropriate units</li>
            <li>View instant results showing attenuation in dB</li>
            <li>Review step-by-step calculations to understand the process</li>
            <li>Use presets for common scenarios or save your calculations to history</li>
            <li>Export results as text files for documentation</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Three calculation modes (Power, Voltage, Distance)</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Real-time calculation updates</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Multiple unit support (W, mW, dBm, V, mV, m, km, ft)</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Step-by-step calculation breakdown</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Common presets for quick calculations</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Calculation history with local storage</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Export results to text files</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Automatic gain detection</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the difference between attenuation and gain?
              </h3>
              <p className="text-gray-700">
                Attenuation is signal loss (positive dB value), while gain is signal amplification (negative dB value in loss calculations). 
                If the output is greater than the input, the calculator will indicate gain instead of attenuation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why use 10 for power and 20 for voltage in dB calculations?
              </h3>
              <p className="text-gray-700">
                Power is proportional to voltage squared (P ∝ V²). When converting voltage ratios to dB, we use 20 instead of 10 
                to account for this squared relationship, ensuring consistency between power and voltage measurements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is distance-based attenuation calculation?
              </h3>
              <p className="text-gray-700">
                Distance-based calculations provide estimates based on the specified loss per unit distance. Actual attenuation 
                may vary due to factors like frequency, temperature, cable quality, connectors, and environmental conditions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I use this calculator for fiber optic systems?
              </h3>
              <p className="text-gray-700">
                Yes! Use the distance-based mode with typical fiber optic loss values (0.2-0.5 dB/km for single-mode fiber, 
                2-3 dB/km for multimode fiber). Remember to account for connector losses and splices separately.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Always use consistent units when comparing measurements</li>
            <li>Account for connector losses in addition to cable attenuation</li>
            <li>Consider frequency-dependent losses in RF applications</li>
            <li>Add safety margins (typically 3-6 dB) in system design</li>
            <li>Verify calculations with actual measurements when possible</li>
            <li>Document attenuation values for troubleshooting and maintenance</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
