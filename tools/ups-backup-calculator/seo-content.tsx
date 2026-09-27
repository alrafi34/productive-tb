import ToolFaq from "@/components/ToolFaq";
import { upsBackupCalculatorConfig } from "./config";

export default function UPSBackupCalculatorSEO() {
  const { howToSteps, faq } = upsBackupCalculatorConfig.seo;
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About UPS Backup Calculator
        </h2>
        <p className="mb-4">
          The UPS Backup Calculator is a professional tool designed to help you estimate how long your UPS (Uninterruptible Power Supply) will run during a power outage. By entering your battery specifications and connected load, you can instantly calculate the expected backup time with high accuracy.
        </p>
        <p>
          This calculator is essential for home users, IT professionals, office managers, and anyone who relies on continuous power supply for critical equipment. Get instant, reliable estimates to plan your backup power needs effectively.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the UPS Backup Calculator
        </h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding UPS Backup Calculations
        </h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
          Basic Formula
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <p className="mb-2"><strong>Energy (Wh) = Voltage × Ampere-hour</strong></p>
          <p className="mb-2"><strong>Usable Energy = Energy × Efficiency × Power Factor</strong></p>
          <p><strong>Backup Time (hours) = Usable Energy / Load (Watts)</strong></p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
          Key Parameters Explained
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Battery Voltage (V)</h4>
            <p className="text-gray-700">
              The nominal voltage of your UPS battery. Common values are 12V, 24V, or 48V. Most home UPS systems use 12V batteries.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Battery Capacity (Ah)</h4>
            <p className="text-gray-700">
              Ampere-hour rating indicates how much current the battery can deliver over time. A 40Ah battery can theoretically deliver 40 amps for 1 hour, or 1 amp for 40 hours.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Efficiency (%)</h4>
            <p className="text-gray-700">
              UPS systems lose energy during conversion. Typical efficiency ranges from 85-95%. Lower quality or older UPS units may have lower efficiency.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">VA Rating</h4>
            <p className="text-gray-700">
              The most power the UPS can deliver (watts = VA × power factor), not the energy in its battery. It decides whether the UPS can carry your load; the battery decides how long.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Safety Buffer (%)</h4>
            <p className="text-gray-700">
              A reserve percentage to account for battery aging, temperature effects, and unexpected load increases. Recommended: 20-30%.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Real-World Examples
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Home Office Setup</h3>
            <p className="text-sm text-blue-800 mb-2">
              <strong>Load:</strong> 300W (PC + Monitor + Router)
            </p>
            <p className="text-sm text-blue-800 mb-2">
              <strong>Battery:</strong> 12V 40Ah
            </p>
            <p className="text-sm text-blue-700">
              <strong>Result:</strong> ~1.1 hours (66 minutes)
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Router Only</h3>
            <p className="text-sm text-green-800 mb-2">
              <strong>Load:</strong> 15W (Router)
            </p>
            <p className="text-sm text-green-800 mb-2">
              <strong>Battery:</strong> 12V 7Ah
            </p>
            <p className="text-sm text-green-700">
              <strong>Result:</strong> ~4 hours
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">Server Room</h3>
            <p className="text-sm text-purple-800 mb-2">
              <strong>Load:</strong> 600W (Server + Storage)
            </p>
            <p className="text-sm text-purple-800 mb-2">
              <strong>Battery:</strong> 12V 100Ah
            </p>
            <p className="text-sm text-purple-700">
              <strong>Result:</strong> ~1.4 hours (84 minutes)
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-2">Gaming PC</h3>
            <p className="text-sm text-orange-800 mb-2">
              <strong>Load:</strong> 500W (Gaming PC + Monitors)
            </p>
            <p className="text-sm text-orange-800 mb-2">
              <strong>Battery:</strong> 24V 40Ah
            </p>
            <p className="text-sm text-orange-700">
              <strong>Result:</strong> ~1.3 hours (78 minutes)
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Device Power Consumption
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Device</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Typical Power (W)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">Router</td>
                <td className="px-4 py-3 text-sm font-mono">10-20W</td>
                <td className="px-4 py-3 text-sm text-gray-600">Home/small office</td>
              </tr>
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
                <td className="px-4 py-3 text-sm">Server</td>
                <td className="px-4 py-3 text-sm font-mono">300-800W</td>
                <td className="px-4 py-3 text-sm text-gray-600">Varies by configuration</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">NAS Storage</td>
                <td className="px-4 py-3 text-sm font-mono">30-100W</td>
                <td className="px-4 py-3 text-sm text-gray-600">Depends on drive count</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tips for Maximizing UPS Backup Time
        </h2>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">✓ Best Practices</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Reduce load by disconnecting non-essential devices during outage</li>
              <li>• Keep UPS batteries well-maintained and replace every 3-5 years</li>
              <li>• Ensure proper ventilation around UPS to prevent overheating</li>
              <li>• Test UPS regularly to verify actual backup time</li>
              <li>• Use energy-efficient equipment to reduce overall load</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Considerations</h3>
            <ul className="text-sm text-yellow-800 space-y-2">
              <li>• Battery capacity decreases with age and temperature</li>
              <li>• Actual backup time may be 10-20% less than calculated</li>
              <li>• High loads reduce battery life and backup time</li>
              <li>• Cold temperatures reduce battery performance</li>
              <li>• Frequent deep discharges shorten battery lifespan</li>
            </ul>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Related Calculations
        </h2>
        <p className="mb-4">
          For comprehensive power planning, consider using these related calculators:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>UPS Load Calculator:</strong> Determine required UPS capacity for your devices</li>
          <li><strong>Battery Capacity Calculator:</strong> Calculate battery specifications needed</li>
          <li><strong>Energy Consumption Calculator:</strong> Estimate total power usage and costs</li>
          <li><strong>Power Loss Calculator:</strong> Analyze efficiency losses in your system</li>
        </ul>
      </section>
    </div>
  );
}
