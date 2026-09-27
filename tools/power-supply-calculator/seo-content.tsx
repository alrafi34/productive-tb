import ToolFaq from "@/components/ToolFaq";
import { powerSupplyCalculatorConfig } from "./config";

export default function PowerSupplyCalculatorSEO() {
  const { howToSteps, faq } = powerSupplyCalculatorConfig.seo;
  return (
    <div className="mt-12 prose prose-slate max-w-none">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
        
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Power Supply Calculator</h2>
          <p className="text-gray-700 leading-relaxed">
            The Power Supply Calculator is a comprehensive PC building tool designed to help users determine the optimal PSU (Power Supply Unit) wattage for their computer builds. This calculator analyzes all major components including CPU, GPU, RAM, storage devices, cooling systems, and peripherals to provide accurate power consumption estimates and PSU recommendations.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Whether you're building a budget office computer, a high-end gaming rig, or a professional workstation, this tool ensures you select the right PSU size for optimal efficiency, reliability, and future expandability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Comprehensive Component Database:</strong> Extensive database of CPUs, GPUs, and other components with accurate power consumption data</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Real-time Calculations:</strong> Instant PSU recommendations as you modify your build configuration</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Efficiency Analysis:</strong> Load percentage calculation and efficiency rating for optimal PSU selection</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Safety Margins:</strong> Configurable safety margins from 15% to 30% for different use cases</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Overclocking Support:</strong> Additional power calculations for overclocked systems</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Build Presets:</strong> Pre-configured builds for different use cases and budgets</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Power Breakdown:</strong> Detailed component-by-component power consumption analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Export Options:</strong> Download calculations as TXT or CSV files for documentation</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">PSU Calculation Formula</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Total System Power</h3>
              <code className="text-sm text-gray-700">Total Load = CPU + GPU + RAM + Storage + Cooling + Peripherals + Motherboard</code>
              <p className="text-sm text-gray-600 mt-2">
                Sum of all component power consumption including base motherboard power and any additional devices.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Recommended PSU Wattage</h3>
              <code className="text-sm text-gray-700">Recommended PSU = Total Load × (1 + Safety Margin)</code>
              <p className="text-sm text-gray-600 mt-2">
                Apply safety margin (typically 20-30%) to account for power spikes, aging, and future upgrades.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Load Percentage</h3>
              <code className="text-sm text-gray-700">Load % = (Total Load / PSU Wattage) × 100</code>
              <p className="text-sm text-gray-600 mt-2">
                Optimal efficiency typically occurs between 50-80% load. Higher or lower loads reduce efficiency.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Overclocking Adjustment</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <div>CPU Overclocking: +20% power consumption</div>
                <div>GPU Overclocking: +15% power consumption</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Power Consumption</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">CPUs (TDP)</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <div>Budget (i3/Ryzen 3): 60-65W</div>
                <div>Mid-range (i5/Ryzen 5): 65-125W</div>
                <div>High-end (i7/Ryzen 7): 105-125W</div>
                <div>Enthusiast (i9/Ryzen 9): 125-170W</div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">GPUs (TGP)</h3>
              <div className="text-sm text-green-800 space-y-1">
                <div>Entry (RTX 3050/RX 6500): 100-130W</div>
                <div>Mid-range (RTX 4060/RX 7600): 115-170W</div>
                <div>High-end (RTX 4070/RX 7800): 200-260W</div>
                <div>Flagship (RTX 4090/RX 7900): 350-450W</div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Memory & Storage</h3>
              <div className="text-sm text-purple-800 space-y-1">
                <div>RAM: ~0.5W per GB</div>
                <div>SSD: 3-5W each</div>
                <div>HDD: 8-10W each</div>
                <div>NVMe SSD: 5-7W each</div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Cooling & Other</h3>
              <div className="text-sm text-orange-800 space-y-1">
                <div>Stock Cooler: 5W</div>
                <div>Air Cooler: 10W</div>
                <div>AIO Liquid: 20W</div>
                <div>Motherboard: 50W base</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">PSU Efficiency and Load</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Load Range</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommendation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">0-20%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">Poor (70-80%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Consider smaller PSU</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">20-50%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-yellow-600">Good (85-90%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Acceptable range</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">50-80%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600">Optimal (90-94%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Best efficiency range</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">80-90%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-yellow-600">Good (85-90%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Still acceptable</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">90-100%</td>
                  <td className="px-4 py-3 text-sm font-semibold text-red-600">Poor (70-85%)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Consider larger PSU</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Categories</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Budget Gaming (450-550W)</h3>
              <p className="text-sm text-blue-800">
                Entry-level gaming with mid-range CPU and GPU. Suitable for 1080p gaming at medium-high settings.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Mid-Range Gaming (650-750W)</h3>
              <p className="text-sm text-green-800">
                Balanced gaming build for 1440p performance. Good for most modern games at high settings.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">High-End Gaming (850-1000W)</h3>
              <p className="text-sm text-purple-800">
                Premium gaming setup for 4K gaming and content creation. Supports high-end GPUs and overclocking.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Enthusiast Build (1200W+)</h3>
              <p className="text-sm text-red-800">
                Top-tier performance with flagship components. Designed for extreme gaming and professional workloads.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Office/Productivity (300-450W)</h3>
              <p className="text-sm text-yellow-800">
                Basic computing tasks with integrated graphics or entry-level discrete GPU.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Workstation (750-1000W)</h3>
              <p className="text-sm text-orange-800">
                Professional content creation with high-core CPUs and workstation GPUs for rendering and CAD work.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">PSU Selection Tips</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-yellow-900">
              <strong>80+ Certification:</strong> Choose PSUs with 80+ Bronze or higher certification for better efficiency and lower electricity costs.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Modular Cables:</strong> Semi-modular or fully modular PSUs improve airflow and cable management in your case.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Future Upgrades:</strong> Consider a slightly higher wattage PSU if you plan to upgrade your GPU or add more components.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Quality Brands:</strong> Invest in reputable PSU manufacturers with good warranties and reviews for reliability.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Connector Requirements:</strong> Ensure your PSU has enough PCIe power connectors for your graphics card.
            </p>
            <p className="text-sm text-yellow-900">
              <strong>Form Factor:</strong> Verify that the PSU fits your case (ATX, SFX, etc.) and check clearance requirements.
            </p>
          </div>
        </section>

        <ToolFaq items={faq} />

      </div>
    </div>
  );
}