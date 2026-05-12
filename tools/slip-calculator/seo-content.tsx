export default function SlipCalculatorSEO() {
  return (
    <div className="mt-12 prose prose-sm max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Slip Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Slip Calculator is an educational engineering tool designed to calculate the slip of induction motors. 
            Slip is a fundamental parameter in AC motor operation that represents the difference between synchronous speed 
            and actual rotor speed. This calculator helps students, engineers, and technicians quickly determine slip values 
            and understand motor performance characteristics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Slip Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Enter the synchronous speed (Ns) in RPM</li>
            <li>Enter the rotor speed (Nr) in RPM</li>
            <li>View instant results for slip (decimal and percentage)</li>
            <li>Optionally use auto-calculate to determine synchronous speed from frequency and poles</li>
            <li>Review the slip analysis and interpretation</li>
            <li>Export or save your calculations for future reference</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Slip Formula</h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Slip (Decimal)</h3>
              <p className="font-mono text-sm bg-white p-3 rounded border border-gray-200">
                s = (Ns - Nr) / Ns
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Where: s = Slip (decimal), Ns = Synchronous speed (RPM), Nr = Rotor speed (RPM)
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Slip Percentage</h3>
              <p className="font-mono text-sm bg-white p-3 rounded border border-gray-200">
                Slip % = ((Ns - Nr) / Ns) × 100
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Slip expressed as a percentage for easier interpretation
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Slip</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">What is Slip?</h3>
          <p className="text-gray-700 mb-4">
            Slip is the difference between the synchronous speed of the rotating magnetic field and the actual speed of the rotor 
            in an induction motor. It is essential for torque production in induction motors. Without slip, there would be no 
            relative motion between the rotor and the magnetic field, resulting in no induced current and no torque.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Does Slip Occur?</h3>
          <p className="text-gray-700 mb-4">
            In an induction motor, the rotor tries to catch up with the rotating magnetic field but never quite reaches it. 
            This "slipping" behind is necessary because:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
            <li>It creates relative motion between the rotor and magnetic field</li>
            <li>Relative motion induces current in the rotor bars</li>
            <li>Induced current creates a magnetic field in the rotor</li>
            <li>Interaction between fields produces torque</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Synchronous Speed (Ns)</h3>
          <p className="text-gray-700 mb-4">
            The speed at which the rotating magnetic field in the stator rotates. It depends on the supply frequency and 
            number of poles: Ns = (120 × f) / P, where f is frequency in Hz and P is the number of poles.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Rotor Speed (Nr)</h3>
          <p className="text-gray-700 mb-4">
            The actual rotational speed of the motor rotor, measured in RPM. This is always less than synchronous speed 
            in induction motors under normal operating conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Typical Slip Values</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slip Range</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">No Load</td>
                  <td className="px-4 py-3 text-sm text-gray-900">0.5% - 1%</td>
                  <td className="px-4 py-3 text-sm text-green-700 font-medium">Very Low</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Light Load</td>
                  <td className="px-4 py-3 text-sm text-gray-900">1% - 3%</td>
                  <td className="px-4 py-3 text-sm text-green-700 font-medium">Low</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Full Load</td>
                  <td className="px-4 py-3 text-sm text-gray-900">3% - 5%</td>
                  <td className="px-4 py-3 text-sm text-green-700 font-medium">Normal</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Heavy Load</td>
                  <td className="px-4 py-3 text-sm text-gray-900">5% - 8%</td>
                  <td className="px-4 py-3 text-sm text-yellow-700 font-medium">Moderate</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Overload</td>
                  <td className="px-4 py-3 text-sm text-gray-900">8% - 15%</td>
                  <td className="px-4 py-3 text-sm text-orange-700 font-medium">High</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Critical</td>
                  <td className="px-4 py-3 text-sm text-gray-900">&gt; 15%</td>
                  <td className="px-4 py-3 text-sm text-red-700 font-medium">Very High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Slip and Motor Performance</h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Relationship with Load</h3>
          <p className="text-gray-700 mb-4">
            Slip increases with motor load. As more mechanical load is applied to the motor shaft, the rotor slows down 
            relative to the synchronous speed, increasing slip. This relationship continues until the motor reaches its 
            breakdown torque point.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Relationship with Torque</h3>
          <p className="text-gray-700 mb-4">
            Torque is directly proportional to slip in the normal operating range. Higher slip means more relative motion, 
            more induced current, and more torque. However, beyond the breakdown torque point, increasing slip leads to 
            decreasing torque.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">Relationship with Efficiency</h3>
          <p className="text-gray-700 mb-4">
            Lower slip generally indicates higher efficiency. High-efficiency motors are designed to operate with minimal 
            slip (1-3%), reducing rotor losses and improving overall performance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications of Slip Calculation</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Motor Performance Analysis:</strong> Evaluate motor operating conditions and efficiency</li>
            <li><strong>Load Assessment:</strong> Determine if motor is operating within rated capacity</li>
            <li><strong>Troubleshooting:</strong> Identify motor problems through abnormal slip values</li>
            <li><strong>Motor Selection:</strong> Choose appropriate motors based on slip characteristics</li>
            <li><strong>Energy Efficiency:</strong> Optimize motor operation for reduced losses</li>
            <li><strong>Predictive Maintenance:</strong> Monitor slip trends to predict motor issues</li>
            <li><strong>Educational Purposes:</strong> Learn about induction motor operation</li>
            <li><strong>System Design:</strong> Design motor control systems with proper slip consideration</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors Affecting Slip</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Load:</strong> Increased mechanical load increases slip</li>
            <li><strong>Rotor Resistance:</strong> Higher resistance increases slip</li>
            <li><strong>Voltage:</strong> Low voltage increases slip under load</li>
            <li><strong>Frequency:</strong> Changes in supply frequency affect slip characteristics</li>
            <li><strong>Temperature:</strong> Heat increases resistance and affects slip</li>
            <li><strong>Motor Design:</strong> Different motor designs have different slip characteristics</li>
            <li><strong>Rotor Condition:</strong> Damaged rotor bars increase slip</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Slip Interpretation Guide</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Normal Slip (1-5%)</h3>
              <p className="text-sm text-green-800">
                Motor is operating within normal parameters. This is typical for motors under light to full load conditions. 
                No action required.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">Moderate Slip (5-8%)</h3>
              <p className="text-sm text-yellow-800">
                Motor is under heavy load. Verify that the load is within motor rating. Consider checking motor condition 
                and ensuring proper cooling.
              </p>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">High Slip (8-15%)</h3>
              <p className="text-sm text-orange-800">
                Motor may be overloaded or have issues. Investigate load conditions, check for mechanical problems, 
                verify voltage supply, and inspect rotor condition.
              </p>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Very High Slip (&gt;15%)</h3>
              <p className="text-sm text-red-800">
                Critical condition! Motor is severely overloaded or damaged. Immediate action required. Stop motor and 
                investigate before continuing operation.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Slip Calculation Examples</h2>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-900">Example 1: Standard 4-Pole Motor at Full Load</p>
              <p className="text-sm text-gray-700 mt-1">
                Ns = 1500 RPM, Nr = 1440 RPM<br/>
                Slip = (1500 - 1440) / 1500 = 0.04 = 4%
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-900">Example 2: High-Efficiency Motor</p>
              <p className="text-sm text-gray-700 mt-1">
                Ns = 1500 RPM, Nr = 1485 RPM<br/>
                Slip = (1500 - 1485) / 1500 = 0.01 = 1%
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-900">Example 3: Overloaded Motor</p>
              <p className="text-sm text-gray-700 mt-1">
                Ns = 1000 RPM, Nr = 900 RPM<br/>
                Slip = (1000 - 900) / 1000 = 0.10 = 10%
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Using the Calculator</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Ensure rotor speed is less than or equal to synchronous speed</li>
            <li>Use the auto-calculate feature to determine synchronous speed from frequency and poles</li>
            <li>Compare your calculated slip with typical values for your motor type</li>
            <li>Monitor slip over time to detect motor degradation</li>
            <li>Use presets for quick calculations of common motor configurations</li>
            <li>Save calculations to history for comparison and trend analysis</li>
            <li>Export results for documentation and reporting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is a normal slip value for an induction motor?</h3>
              <p className="text-gray-700">
                For standard induction motors at full load, slip typically ranges from 3-5%. High-efficiency motors may 
                have lower slip (1-3%), while motors under heavy load may show higher values (5-8%).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can slip be zero?</h3>
              <p className="text-gray-700">
                In theory, slip approaches zero at no load, but it can never be exactly zero in an induction motor. 
                Zero slip would mean no torque production. Synchronous motors, however, operate at zero slip.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What causes high slip?</h3>
              <p className="text-gray-700">
                High slip can be caused by overloading, low voltage supply, high rotor resistance, damaged rotor bars, 
                poor cooling, or mechanical problems. It indicates the motor is working harder than normal.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does slip affect motor efficiency?</h3>
              <p className="text-gray-700">
                Higher slip means more energy is dissipated as heat in the rotor, reducing efficiency. Motors with lower 
                slip are generally more efficient because they have lower rotor losses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the relationship between slip and torque?</h3>
              <p className="text-gray-700">
                In the normal operating range, torque is approximately proportional to slip. As load increases, slip 
                increases, producing more torque. However, beyond the breakdown torque point, this relationship reverses.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
