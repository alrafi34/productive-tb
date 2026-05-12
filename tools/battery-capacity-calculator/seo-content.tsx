export default function BatteryCapacityCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Battery Capacity Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Battery Capacity Calculator</strong> helps you determine the required battery size in Ampere-hours (Ah) and Watt-hours (Wh) for backup power systems, solar installations, inverters, and electronics. This free online tool accounts for system efficiency and battery type to provide accurate capacity estimates.
        </p>
      </section>

      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Battery Capacity Formula
        </h3>
        <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-4">
          Capacity (Ah) = (Power × Time) / (Voltage × Efficiency)
        </div>
        <p className="text-gray-700 text-sm">
          Where Power is in Watts, Time in hours, Voltage in Volts, and Efficiency as a decimal (0.8 = 80%).
        </p>
      </section>

      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Use Cases
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Solar Power Systems:</strong> Size battery banks for off-grid solar installations</li>
          <li>✓ <strong>Backup Power:</strong> Calculate UPS and inverter battery requirements</li>
          <li>✓ <strong>RV & Marine:</strong> Determine battery capacity for recreational vehicles and boats</li>
          <li>✓ <strong>Emergency Systems:</strong> Size batteries for emergency lighting and equipment</li>
          <li>✓ <strong>DIY Electronics:</strong> Calculate battery needs for portable projects</li>
        </ul>
      </section>

      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Battery Type Considerations
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Lead Acid (80% efficiency):</strong> Most affordable, heavy, requires maintenance, 50% depth of discharge recommended.</p>
          <p><strong>Lithium-ion (90% efficiency):</strong> Lighter, longer lifespan, 80% depth of discharge, higher cost.</p>
          <p><strong>LiFePO4 (95% efficiency):</strong> Best efficiency, safest lithium chemistry, longest lifespan, 90% depth of discharge.</p>
        </div>
      </section>

    </div>
  );
}
