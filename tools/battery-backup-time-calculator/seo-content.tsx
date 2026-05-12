export default function BatteryBackupTimeCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Battery Backup Time Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Battery Backup Time Calculator</strong> helps you determine how long a battery will power your devices or appliances. This free online tool calculates runtime based on battery voltage, capacity (Ah), load power (W), and system efficiency. Perfect for UPS systems, inverters, solar installations, and backup power planning.
        </p>
      </section>

      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Battery Backup Time Formula
        </h3>
        <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-4">
          Backup Time (hours) = (Voltage × Capacity × Efficiency%) / Load Power
        </div>
        <p className="text-gray-700 text-sm">
          Where Voltage is in Volts (V), Capacity in Ampere-hours (Ah), Efficiency as percentage, and Load Power in Watts (W).
        </p>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Applications
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>UPS Systems:</strong> Calculate backup time for computers, routers, and network equipment</li>
          <li>✓ <strong>Home Inverters:</strong> Estimate runtime for lights, fans, and appliances during power outages</li>
          <li>✓ <strong>Solar Systems:</strong> Plan battery bank size for off-grid and hybrid solar installations</li>
          <li>✓ <strong>RV & Marine:</strong> Determine how long batteries will last for recreational vehicles and boats</li>
          <li>✓ <strong>Emergency Backup:</strong> Size batteries for emergency lighting and critical equipment</li>
        </ul>
      </section>

      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Efficiency Considerations
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Inverter Efficiency:</strong> Typical inverters operate at 85-95% efficiency. Lower quality inverters may be 70-80%.</p>
          <p><strong>Battery Type:</strong> Lead acid batteries are typically 80% efficient, while lithium batteries can reach 90-95%.</p>
          <p><strong>Depth of Discharge:</strong> Lead acid batteries should only be discharged to 50%, while lithium can safely go to 80-90%.</p>
          <p><strong>Temperature:</strong> Cold temperatures reduce battery capacity and efficiency significantly.</p>
        </div>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use This Calculator
        </h2>
        <ol className="space-y-2 text-gray-700">
          <li><strong>Enter Battery Voltage:</strong> Common values are 12V, 24V, or 48V</li>
          <li><strong>Enter Battery Capacity:</strong> Found on battery label in Ah (Ampere-hours)</li>
          <li><strong>Enter Load Power:</strong> Total wattage of devices you want to power</li>
          <li><strong>Adjust Efficiency:</strong> Use 85% as default, or adjust based on your system</li>
          <li><strong>View Results:</strong> Get instant backup time in hours and minutes</li>
        </ol>
      </section>

      <section className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Example Calculations
        </h3>
        <div className="space-y-4 text-sm">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 1: Router Backup</p>
            <p className="text-gray-700">Battery: 12V 7Ah | Load: 30W | Efficiency: 85%</p>
            <p className="text-green-700 font-semibold mt-1">Result: 2.38 hours (2h 23m)</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 2: Home Inverter</p>
            <p className="text-gray-700">Battery: 12V 100Ah | Load: 150W | Efficiency: 85%</p>
            <p className="text-green-700 font-semibold mt-1">Result: 6.8 hours (6h 48m)</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-gray-900 mb-2">Example 3: Solar System</p>
            <p className="text-gray-700">Battery: 24V 200Ah | Load: 500W | Efficiency: 90%</p>
            <p className="text-green-700 font-semibold mt-1">Result: 8.64 hours (8h 38m)</p>
          </div>
        </div>
      </section>

    </div>
  );
}
