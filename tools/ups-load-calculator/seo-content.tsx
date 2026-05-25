export default function UPSLoadCalculatorSEO() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About UPS Load Calculator
        </h2>
        <p className="mb-4">
          The UPS Load Calculator is a professional tool designed to help you determine the correct UPS (Uninterruptible Power Supply) capacity needed for your electrical equipment. Whether you're setting up a home office, small business, server room, or data center, this calculator provides accurate UPS sizing recommendations based on your connected devices.
        </p>
        <p>
          By calculating total power consumption, applying safety margins, and converting watts to VA (Volt-Amperes), you can ensure your UPS system has adequate capacity to protect your equipment during power outages and provide sufficient backup time.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the UPS Load Calculator
        </h2>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Add Your Devices:</strong> Enter each device name, power consumption (watts), and quantity</li>
          <li><strong>Set Safety Margin:</strong> Choose 20-30% safety margin for future expansion</li>
          <li><strong>Adjust Settings:</strong> Optionally modify power factor and battery efficiency</li>
          <li><strong>View Results:</strong> Get instant UPS capacity recommendations in VA</li>
          <li><strong>Export Report:</strong> Download calculation details as TXT or CSV</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding UPS Calculations
        </h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
          Watts vs VA (Volt-Amperes)
        </h3>
        <p className="mb-4">
          UPS capacity is rated in VA (Volt-Amperes), while devices consume power in Watts. The relationship between them depends on the power factor:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <code className="text-sm">VA = Watts ÷ Power Factor</code>
        </div>
        <p className="mb-4">
          Most UPS systems have a power factor of 0.8, meaning a 1000VA UPS can deliver approximately 800W of real power.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
          Safety Margin Importance
        </h3>
        <p className="mb-4">
          Adding a safety margin (typically 20-30%) ensures:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
          <li>Room for future equipment additions</li>
          <li>Protection against power spikes</li>
          <li>Optimal UPS efficiency and battery life</li>
          <li>Prevents overloading the UPS system</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
          Calculation Formula
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
          <p><strong>Step 1:</strong> Total Load = Σ (Device Watts × Quantity)</p>
          <p><strong>Step 2:</strong> Adjusted Load = Total Load × (1 + Safety Margin%)</p>
          <p><strong>Step 3:</strong> Required VA = Adjusted Load ÷ Power Factor</p>
          <p><strong>Step 4:</strong> Round up to standard UPS size</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common UPS Applications
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Home Office</h3>
            <p className="text-sm text-blue-800 mb-2">
              Typical Load: 350-500W
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Desktop PC or Laptop</li>
              <li>• Monitor(s)</li>
              <li>• Router/Modem</li>
              <li>• Recommended: 600-750VA UPS</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Small Business</h3>
            <p className="text-sm text-green-800 mb-2">
              Typical Load: 700-1200W
            </p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Multiple PCs</li>
              <li>• Network Equipment</li>
              <li>• Printer</li>
              <li>• Recommended: 1200-1500VA UPS</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">Server Room</h3>
            <p className="text-sm text-purple-800 mb-2">
              Typical Load: 1500-3000W
            </p>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Servers</li>
              <li>• Storage Systems</li>
              <li>• Network Switches</li>
              <li>• Recommended: 2200-5000VA UPS</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-2">Gaming Setup</h3>
            <p className="text-sm text-orange-800 mb-2">
              Typical Load: 600-800W
            </p>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Gaming PC</li>
              <li>• Multiple Monitors</li>
              <li>• Peripherals</li>
              <li>• Recommended: 1000-1200VA UPS</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Device Power Consumption Guide
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Device Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Typical Power (W)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Desktop PC</td>
                <td className="px-4 py-3 text-sm font-mono">200-400W</td>
                <td className="px-4 py-3 text-sm text-gray-600">Gaming PCs: 400-600W</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Laptop</td>
                <td className="px-4 py-3 text-sm font-mono">45-90W</td>
                <td className="px-4 py-3 text-sm text-gray-600">Gaming laptops: 120-180W</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">LED Monitor</td>
                <td className="px-4 py-3 text-sm font-mono">20-40W</td>
                <td className="px-4 py-3 text-sm text-gray-600">24-27 inch typical</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Router</td>
                <td className="px-4 py-3 text-sm font-mono">10-25W</td>
                <td className="px-4 py-3 text-sm text-gray-600">Home/small business</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Network Switch</td>
                <td className="px-4 py-3 text-sm font-mono">15-50W</td>
                <td className="px-4 py-3 text-sm text-gray-600">Depends on port count</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Server</td>
                <td className="px-4 py-3 text-sm font-mono">300-800W</td>
                <td className="px-4 py-3 text-sm text-gray-600">Varies by configuration</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">NAS Storage</td>
                <td className="px-4 py-3 text-sm font-mono">50-200W</td>
                <td className="px-4 py-3 text-sm text-gray-600">Depends on drive count</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Printer</td>
                <td className="px-4 py-3 text-sm font-mono">50-150W</td>
                <td className="px-4 py-3 text-sm text-gray-600">Laser printers higher</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          UPS Selection Tips
        </h2>
        <div className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Considerations</h3>
            <ul className="text-sm text-yellow-800 space-y-2">
              <li>• Never run a UPS at 100% capacity - aim for 60-80% utilization</li>
              <li>• Consider startup surge current for devices with motors</li>
              <li>• Factor in future equipment additions</li>
              <li>• Check UPS runtime specifications at your load level</li>
              <li>• Ensure UPS has enough outlets for all devices</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">✓ Best Practices</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Use line-interactive or online UPS for critical equipment</li>
              <li>• Install UPS management software for monitoring</li>
              <li>• Test UPS regularly to ensure battery health</li>
              <li>• Replace batteries every 3-5 years</li>
              <li>• Keep UPS in well-ventilated area</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What's the difference between Watts and VA?
            </h3>
            <p className="text-gray-700">
              Watts (W) measure real power consumed by devices, while VA (Volt-Amperes) measure apparent power. UPS systems are rated in VA because they must handle both real and reactive power. The power factor (typically 0.8) relates the two: Watts = VA × Power Factor.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How much safety margin should I add?
            </h3>
            <p className="text-gray-700">
              A 20-30% safety margin is recommended. This accounts for future equipment additions, power spikes, and ensures optimal UPS efficiency. Running a UPS near maximum capacity reduces battery life and runtime.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I connect a laser printer to a UPS?
            </h3>
            <p className="text-gray-700">
              Laser printers draw high surge current during startup and printing, which can overload a UPS. It's generally not recommended unless you have a high-capacity UPS specifically rated for such loads. Inkjet printers are safer alternatives.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How long will my UPS provide backup power?
            </h3>
            <p className="text-gray-700">
              Runtime depends on UPS battery capacity and your load. A 1000VA UPS with 500W load typically provides 10-15 minutes of backup. Check manufacturer specifications for runtime curves at different load levels.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              What power factor should I use?
            </h3>
            <p className="text-gray-700">
              Most modern UPS systems have a power factor of 0.8 (80%). Some newer models offer 0.9 or even 1.0. Check your UPS specifications or use 0.8 as a safe default value.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Related Calculations
        </h2>
        <p className="mb-4">
          For comprehensive power planning, consider using these related calculators:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Battery Backup Time Calculator:</strong> Estimate how long your UPS will run</li>
          <li><strong>Power Consumption Calculator:</strong> Calculate total energy usage and costs</li>
          <li><strong>Generator Size Calculator:</strong> Size backup generators for your facility</li>
          <li><strong>Energy Consumption Calculator:</strong> Track and optimize power usage</li>
        </ul>
      </section>
    </div>
  );
}
