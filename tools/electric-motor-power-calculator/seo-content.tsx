export default function ElectricMotorPowerCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Electric Motor Power?</h2>
          <p className="text-gray-700 leading-relaxed">
            Electric motor power is the rate at which a motor converts electrical energy into mechanical energy, measured 
            in Watts (W), Kilowatts (kW), or Horsepower (HP). Motor power determines how much work the motor can perform 
            and is calculated from mechanical parameters (torque and speed) or electrical parameters (voltage, current, 
            and efficiency). Understanding motor power is essential for proper motor selection, sizing, and energy 
            consumption estimation in industrial, commercial, and residential applications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Motor Power Calculation Formulas</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Mechanical Power Formula</h3>
              <p className="text-blue-800 font-mono text-lg mb-2">P = (2 × π × N × T) / 60</p>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Where:</strong></p>
                <p>P = Power (Watts)</p>
                <p>N = Speed (RPM - Revolutions Per Minute)</p>
                <p>T = Torque (Nm - Newton-meters)</p>
                <p>π = 3.14159</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Electrical Power Formula</h3>
              <p className="text-green-800 font-mono text-lg mb-2">P = V × I × η</p>
              <div className="text-sm text-green-700 space-y-1">
                <p><strong>Where:</strong></p>
                <p>P = Power (Watts)</p>
                <p>V = Voltage (Volts)</p>
                <p>I = Current (Amperes)</p>
                <p>η = Efficiency (0 to 1)</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Horsepower Conversion</h3>
              <p className="text-purple-800 font-mono text-lg mb-2">P (W) = HP × 746</p>
              <div className="text-sm text-purple-700 space-y-1">
                <p><strong>Where:</strong></p>
                <p>P = Power (Watts)</p>
                <p>HP = Horsepower</p>
                <p>1 HP = 746 Watts = 0.746 kW</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Example Calculation</h3>
              <div className="text-sm text-orange-700 space-y-1">
                <p><strong>Given:</strong> Torque = 10 Nm, Speed = 1500 RPM</p>
                <p><strong>Formula:</strong> P = (2 × π × 1500 × 10) / 60</p>
                <p><strong>Calculation:</strong> P = (2 × 3.14159 × 1500 × 10) / 60</p>
                <p><strong>Result:</strong> P = 1570.8 W ≈ 1.57 kW ≈ 2.1 HP</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Motor Parameters</h2>
          
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Torque (T)</h3>
              <p className="text-sm text-gray-700">
                Torque is the rotational force produced by the motor, measured in Newton-meters (Nm). Higher torque means 
                the motor can handle heavier loads. Torque = Force × Distance from rotation axis. A motor with 10 Nm torque 
                can lift 10 kg at 1 meter radius.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Speed (N)</h3>
              <p className="text-sm text-gray-700">
                Speed is the rotational velocity of the motor shaft, measured in RPM (Revolutions Per Minute). Common motor 
                speeds: 1500 RPM (4-pole, 50Hz), 1800 RPM (4-pole, 60Hz), 3000 RPM (2-pole, 50Hz). Higher speed means more 
                power at the same torque.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Efficiency (η)</h3>
              <p className="text-sm text-gray-700">
                Efficiency is the ratio of mechanical output power to electrical input power, expressed as a decimal (0-1) 
                or percentage (0-100%). Typical motor efficiencies: Small motors (50-80%), Medium motors (80-90%), Large 
                motors (90-95%). Higher efficiency means less energy wasted as heat.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Horsepower (HP)</h3>
              <p className="text-sm text-gray-700">
                Horsepower is a unit of power commonly used in the US and UK. 1 HP = 746 Watts = 0.746 kW. Metric horsepower 
                (PS) is slightly different: 1 PS = 735.5 W. Common motor sizes: 0.5 HP (small pump), 1-3 HP (home workshop), 
                5-10 HP (industrial), 50+ HP (heavy industrial).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Power Conversion Table</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horsepower (HP)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kilowatts (kW)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Watts (W)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Application</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-mono">0.25 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">0.19 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">186 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Small fan, blower</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-mono">0.5 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">0.37 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">373 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Water pump, grinder</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-mono">1 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">0.75 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">746 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Compressor, conveyor</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-mono">2 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">1.49 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">1492 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Workshop tools</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-mono">3 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">2.24 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">2238 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Industrial pump</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-mono">5 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">3.73 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">3730 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Large compressor</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 font-mono">10 HP</td>
                  <td className="px-4 py-3 text-sm text-gray-700 font-mono">7.46 kW</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">7460 W</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Heavy machinery</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Motor Types and Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">AC Induction Motors</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p><strong>Power Range:</strong> 0.5 HP to 500+ HP</p>
                <p><strong>Efficiency:</strong> 85-95%</p>
                <p><strong>Speed:</strong> Fixed (1500, 1800, 3000 RPM)</p>
                <p><strong>Applications:</strong> Pumps, fans, compressors, conveyors, industrial machinery</p>
                <p><strong>Advantages:</strong> Reliable, low maintenance, cost-effective</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">DC Motors</h3>
              <div className="space-y-2 text-sm text-green-800">
                <p><strong>Power Range:</strong> 0.1 HP to 100+ HP</p>
                <p><strong>Efficiency:</strong> 75-90%</p>
                <p><strong>Speed:</strong> Variable (0-5000+ RPM)</p>
                <p><strong>Applications:</strong> Electric vehicles, robotics, precision control, traction</p>
                <p><strong>Advantages:</strong> Excellent speed control, high starting torque</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3">Servo Motors</h3>
              <div className="space-y-2 text-sm text-purple-800">
                <p><strong>Power Range:</strong> 0.1 HP to 10 HP</p>
                <p><strong>Efficiency:</strong> 80-90%</p>
                <p><strong>Speed:</strong> Variable with feedback</p>
                <p><strong>Applications:</strong> CNC machines, robotics, automation, precision positioning</p>
                <p><strong>Advantages:</strong> High precision, fast response, position control</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-3">Stepper Motors</h3>
              <div className="space-y-2 text-sm text-orange-800">
                <p><strong>Power Range:</strong> 0.01 HP to 2 HP</p>
                <p><strong>Efficiency:</strong> 50-80%</p>
                <p><strong>Speed:</strong> Low to medium (0-2000 RPM)</p>
                <p><strong>Applications:</strong> 3D printers, CNC, scanners, precise positioning</p>
                <p><strong>Advantages:</strong> Open-loop control, precise positioning, no feedback needed</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Motor Power Calculations</h2>
          
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 1: Ceiling Fan Motor</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Given:</strong> Torque = 0.5 Nm, Speed = 1400 RPM</p>
                <p><strong>Formula:</strong> P = (2 × π × 1400 × 0.5) / 60</p>
                <p><strong>Calculation:</strong> P = (2 × 3.14159 × 1400 × 0.5) / 60 = 73.3 W</p>
                <p className="text-green-600 font-semibold">Result: 73.3 W ≈ 0.073 kW ≈ 0.1 HP</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 2: Water Pump Motor</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Given:</strong> Voltage = 220V, Current = 2A, Efficiency = 80%</p>
                <p><strong>Formula:</strong> P = 220 × 2 × 0.80</p>
                <p><strong>Calculation:</strong> P = 352 W</p>
                <p className="text-green-600 font-semibold">Result: 352 W ≈ 0.35 kW ≈ 0.47 HP</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Example 3: Industrial Motor</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Given:</strong> 5 HP motor</p>
                <p><strong>Formula:</strong> P = 5 × 746</p>
                <p><strong>Calculation:</strong> P = 3730 W</p>
                <p className="text-green-600 font-semibold">Result: 3730 W = 3.73 kW = 5 HP</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I calculate motor power from torque and RPM?</h3>
              <p className="text-sm text-gray-700">
                Use the formula: P = (2 × π × N × T) / 60, where P is power in Watts, N is speed in RPM, and T is torque 
                in Nm. Example: For 10 Nm torque at 1500 RPM: P = (2 × 3.14159 × 1500 × 10) / 60 = 1570.8 W ≈ 1.57 kW.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is the difference between kW and HP?</h3>
              <p className="text-sm text-gray-700">
                kW (Kilowatt) is the metric unit of power, while HP (Horsepower) is the imperial unit. 1 HP = 0.746 kW 
                or 746 Watts. To convert: kW = HP × 0.746, or HP = kW / 0.746. Example: A 2 HP motor = 1.49 kW.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I calculate motor power from voltage and current?</h3>
              <p className="text-sm text-gray-700">
                Use the formula: P = V × I × η, where V is voltage, I is current, and η is efficiency. Example: For 220V, 
                5A, 90% efficiency: P = 220 × 5 × 0.90 = 990 W ≈ 1 kW. Always include efficiency to get mechanical output power.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What is motor efficiency and why does it matter?</h3>
              <p className="text-sm text-gray-700">
                Motor efficiency is the ratio of mechanical output power to electrical input power. A motor with 85% 
                efficiency converts 85% of electrical energy to mechanical work, with 15% lost as heat. Higher efficiency 
                means lower energy costs and less heat generation. Premium efficiency motors (90-95%) cost more but save 
                energy over time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much power does a 1 HP motor consume?</h3>
              <p className="text-sm text-gray-700">
                A 1 HP motor produces 746 W of mechanical power. Electrical consumption depends on efficiency. At 85% 
                efficiency, it consumes 746 / 0.85 = 877 W. At 90% efficiency, it consumes 746 / 0.90 = 829 W. Higher 
                efficiency motors consume less electricity for the same output power.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What motor size do I need for my application?</h3>
              <p className="text-sm text-gray-700">
                Calculate required power from load torque and speed using P = (2 × π × N × T) / 60. Add 20-30% safety 
                margin for starting torque and overload. Example: For 8 Nm at 1500 RPM: P = 1256 W. With 25% margin: 
                1570 W ≈ 2 HP motor recommended.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">💡 Pro Tip</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            When selecting motors, always add a 20-30% safety margin to calculated power requirements. This accounts for 
            starting torque (motors need 2-3x rated torque to start), efficiency losses, and future load increases. A 
            motor running at 70-80% capacity operates more efficiently and lasts longer than one running at 100% capacity. 
            For variable loads, consider using a Variable Frequency Drive (VFD) to improve efficiency and extend motor life.
          </p>
        </section>

      </div>
    </div>
  );
}
