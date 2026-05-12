export default function MotorSpeedCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-sm max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Motor Speed Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Motor Speed Calculator is a professional tool designed to calculate the rotational speed of electric motors based on electrical parameters. 
            This calculator helps engineers, technicians, and students determine both synchronous speed and actual motor speed (accounting for slip) 
            in AC induction motors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Motor Speed Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Enter the supply frequency in Hz (typically 50 Hz or 60 Hz)</li>
            <li>Select the number of poles in the motor (2, 4, 6, 8, 10, or 12)</li>
            <li>Adjust the slip percentage using the slider (0-10%)</li>
            <li>View instant results for synchronous and actual motor speeds</li>
            <li>Switch between RPM and rad/s units as needed</li>
            <li>Export or save your calculations for future reference</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Motor Speed Formulas</h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Synchronous Speed Formula</h3>
              <p className="font-mono text-sm bg-white p-3 rounded border border-gray-200">
                Ns = (120 × f) / P
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Where: Ns = Synchronous speed (RPM), f = Frequency (Hz), P = Number of poles
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Actual Motor Speed Formula</h3>
              <p className="font-mono text-sm bg-white p-3 rounded border border-gray-200">
                N = Ns × (1 - s/100)
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Where: N = Actual speed (RPM), Ns = Synchronous speed (RPM), s = Slip (%)
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Angular Velocity Conversion</h3>
              <p className="font-mono text-sm bg-white p-3 rounded border border-gray-200">
                ω = (2π × N) / 60
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Where: ω = Angular velocity (rad/s), N = Speed (RPM)
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Motor Speed Parameters</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Frequency (f)</h3>
          <p className="text-gray-700 mb-4">
            The frequency of the AC power supply, measured in Hertz (Hz). Common values are 50 Hz (used in most countries) 
            and 60 Hz (used in North America and some other regions). The frequency directly affects the motor's synchronous speed.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Number of Poles (P)</h3>
          <p className="text-gray-700 mb-4">
            The number of magnetic poles in the motor's stator winding. Motors always have an even number of poles (2, 4, 6, 8, etc.). 
            More poles result in lower synchronous speed. A 2-pole motor is the fastest, while motors with more poles run slower.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Slip (s)</h3>
          <p className="text-gray-700 mb-4">
            The difference between synchronous speed and actual rotor speed, expressed as a percentage. Induction motors always 
            operate below synchronous speed due to slip. Typical slip values range from 1-5% for standard motors under load. 
            Zero slip means the motor is running at synchronous speed (theoretical for induction motors).
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Synchronous Speed (Ns)</h3>
          <p className="text-gray-700 mb-4">
            The theoretical speed at which the rotating magnetic field in the stator rotates. This is the maximum speed an 
            induction motor can approach but never reach under normal operating conditions.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Actual Motor Speed (N)</h3>
          <p className="text-gray-700 mb-4">
            The real operating speed of the motor rotor, which is always less than synchronous speed in induction motors. 
            This is the speed at which the motor shaft rotates and delivers mechanical power.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Motor Speed Examples</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poles</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Synchronous Speed</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actual Speed (3% slip)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">50 Hz</td>
                  <td className="px-4 py-3 text-sm text-gray-900">2</td>
                  <td className="px-4 py-3 text-sm text-gray-900">3000 RPM</td>
                  <td className="px-4 py-3 text-sm text-gray-900">2910 RPM</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">50 Hz</td>
                  <td className="px-4 py-3 text-sm text-gray-900">4</td>
                  <td className="px-4 py-3 text-sm text-gray-900">1500 RPM</td>
                  <td className="px-4 py-3 text-sm text-gray-900">1455 RPM</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">50 Hz</td>
                  <td className="px-4 py-3 text-sm text-gray-900">6</td>
                  <td className="px-4 py-3 text-sm text-gray-900">1000 RPM</td>
                  <td className="px-4 py-3 text-sm text-gray-900">970 RPM</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">60 Hz</td>
                  <td className="px-4 py-3 text-sm text-gray-900">2</td>
                  <td className="px-4 py-3 text-sm text-gray-900">3600 RPM</td>
                  <td className="px-4 py-3 text-sm text-gray-900">3492 RPM</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">60 Hz</td>
                  <td className="px-4 py-3 text-sm text-gray-900">4</td>
                  <td className="px-4 py-3 text-sm text-gray-900">1800 RPM</td>
                  <td className="px-4 py-3 text-sm text-gray-900">1746 RPM</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">60 Hz</td>
                  <td className="px-4 py-3 text-sm text-gray-900">6</td>
                  <td className="px-4 py-3 text-sm text-gray-900">1200 RPM</td>
                  <td className="px-4 py-3 text-sm text-gray-900">1164 RPM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications of Motor Speed Calculation</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Motor Selection:</strong> Choose the right motor speed for specific applications</li>
            <li><strong>System Design:</strong> Design mechanical systems with proper gear ratios and coupling</li>
            <li><strong>Performance Analysis:</strong> Evaluate motor performance and efficiency</li>
            <li><strong>Troubleshooting:</strong> Diagnose motor speed issues and slip problems</li>
            <li><strong>Variable Frequency Drives:</strong> Calculate motor speeds at different frequencies</li>
            <li><strong>Load Matching:</strong> Match motor speed to load requirements</li>
            <li><strong>Energy Efficiency:</strong> Optimize motor operation for energy savings</li>
            <li><strong>Educational Purposes:</strong> Learn about AC motor operation and characteristics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Motor Speed and Slip Relationship</h2>
          <p className="text-gray-700 mb-4">
            In AC induction motors, slip is essential for torque production. The rotor must rotate slower than the synchronous 
            speed to induce current in the rotor bars. Key points about slip:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>At no load, slip is very small (0.5-1%)</li>
            <li>At full load, slip typically ranges from 2-5%</li>
            <li>Higher slip indicates higher load or motor issues</li>
            <li>Slip increases with load until breakdown torque is reached</li>
            <li>Zero slip means no torque production (motor won't start)</li>
            <li>Excessive slip indicates overload or motor problems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting Motor Speed</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Supply Frequency:</strong> Higher frequency increases synchronous speed</li>
            <li><strong>Number of Poles:</strong> More poles decrease synchronous speed</li>
            <li><strong>Load:</strong> Increased load increases slip and reduces actual speed</li>
            <li><strong>Voltage:</strong> Low voltage can increase slip under load</li>
            <li><strong>Rotor Resistance:</strong> Higher resistance increases slip</li>
            <li><strong>Temperature:</strong> Heat affects resistance and slip characteristics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Using the Calculator</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Use 50 Hz for European, Asian, and most international applications</li>
            <li>Use 60 Hz for North American applications</li>
            <li>Standard motors typically have 2, 4, or 6 poles</li>
            <li>For synchronous speed only, set slip to 0%</li>
            <li>Typical full-load slip is 3-5% for standard motors</li>
            <li>Use the presets for quick calculations of common motor types</li>
            <li>Switch to rad/s for mechanical engineering calculations</li>
            <li>Save calculations to history for comparison and reference</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is synchronous speed?</h3>
              <p className="text-gray-700">
                Synchronous speed is the speed of the rotating magnetic field in the stator, calculated as (120 × frequency) / poles. 
                It's the theoretical maximum speed an induction motor can approach.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Why do induction motors never reach synchronous speed?</h3>
              <p className="text-gray-700">
                Induction motors require slip to generate torque. If the rotor reached synchronous speed, there would be no relative 
                motion between the rotor and the magnetic field, no induced current, and therefore no torque.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I choose the right number of poles?</h3>
              <p className="text-gray-700">
                Choose based on your speed requirements: 2-pole motors are fastest (3000/3600 RPM), 4-pole motors are standard 
                (1500/1800 RPM), and 6-pole or higher are for low-speed applications. More poles provide higher torque at lower speeds.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is a typical slip value?</h3>
              <p className="text-gray-700">
                For standard induction motors at full load, slip typically ranges from 2-5%. High-efficiency motors may have lower 
                slip (1-3%), while motors under heavy load may show higher slip values.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change motor speed by changing frequency?</h3>
              <p className="text-gray-700">
                Yes, using a Variable Frequency Drive (VFD) allows you to control motor speed by varying the supply frequency. 
                This is a common method for precise speed control in industrial applications.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
