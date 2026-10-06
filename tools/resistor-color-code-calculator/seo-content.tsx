import ToolFaq from "@/components/ToolFaq";
import { resistorColorCodeCalculatorConfig } from "./config";

export default function ResistorColorCodeCalculatorSEO() {
  const { howToSteps, faq } = resistorColorCodeCalculatorConfig.seo;
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Resistor Color Code Calculator</h2>
        <p className="mb-4">
          The Resistor Color Code Calculator is a fast, online tool that helps you decode resistor color bands 
          into resistance values and tolerance levels instantly. Whether you're working with 4-band, 5-band, or 6-band 
          resistors, this calculator provides accurate results with step-by-step explanations.
        </p>
        <p>
          Perfect for electronics students, electrical engineers, hobbyists, and repair technicians, this tool eliminates 
          the need for manual lookup charts and reduces errors when reading resistor values.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Resistor Color Code Chart</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Color</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Digit</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Multiplier</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Tolerance</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Temp Coeff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#000000'}}></span> Black</td><td className="px-4 py-3">0</td><td className="px-4 py-3">×1</td><td className="px-4 py-3">-</td><td className="px-4 py-3">-</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#8B4513'}}></span> Brown</td><td className="px-4 py-3">1</td><td className="px-4 py-3">×10</td><td className="px-4 py-3">±1%</td><td className="px-4 py-3">100 ppm</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#FF0000'}}></span> Red</td><td className="px-4 py-3">2</td><td className="px-4 py-3">×100</td><td className="px-4 py-3">±2%</td><td className="px-4 py-3">50 ppm</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#FFA500'}}></span> Orange</td><td className="px-4 py-3">3</td><td className="px-4 py-3">×1k</td><td className="px-4 py-3">-</td><td className="px-4 py-3">15 ppm</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#FFFF00'}}></span> Yellow</td><td className="px-4 py-3">4</td><td className="px-4 py-3">×10k</td><td className="px-4 py-3">-</td><td className="px-4 py-3">25 ppm</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#00FF00'}}></span> Green</td><td className="px-4 py-3">5</td><td className="px-4 py-3">×100k</td><td className="px-4 py-3">±0.5%</td><td className="px-4 py-3">-</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#0000FF'}}></span> Blue</td><td className="px-4 py-3">6</td><td className="px-4 py-3">×1M</td><td className="px-4 py-3">±0.25%</td><td className="px-4 py-3">-</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#9400D3'}}></span> Violet</td><td className="px-4 py-3">7</td><td className="px-4 py-3">×10M</td><td className="px-4 py-3">±0.1%</td><td className="px-4 py-3">-</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#808080'}}></span> Gray</td><td className="px-4 py-3">8</td><td className="px-4 py-3">×100M</td><td className="px-4 py-3">±0.05%</td><td className="px-4 py-3">-</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#FFFFFF'}}></span> White</td><td className="px-4 py-3">9</td><td className="px-4 py-3">×1G</td><td className="px-4 py-3">-</td><td className="px-4 py-3">-</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#FFD700'}}></span> Gold</td><td className="px-4 py-3">-</td><td className="px-4 py-3">×0.1</td><td className="px-4 py-3">±5%</td><td className="px-4 py-3">-</td></tr>
              <tr><td className="px-4 py-3 flex items-center gap-2"><span className="w-6 h-6 rounded border border-gray-300" style={{backgroundColor: '#C0C0C0'}}></span> Silver</td><td className="px-4 py-3">-</td><td className="px-4 py-3">×0.01</td><td className="px-4 py-3">±10%</td><td className="px-4 py-3">-</td></tr>
              <tr><td className="px-4 py-3">None</td><td className="px-4 py-3">-</td><td className="px-4 py-3">-</td><td className="px-4 py-3">±20%</td><td className="px-4 py-3">-</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Resistor Bands</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <span>📊</span> 4-Band Resistors
            </h3>
            <p className="text-blue-800 text-sm mb-2">
              <strong>Formula:</strong> (Band1 × 10 + Band2) × Multiplier ± Tolerance
            </p>
            <p className="text-blue-800 text-sm">
              Most common type. First two bands are digits, third is multiplier, fourth is tolerance.
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <span>📊</span> 5-Band Resistors
            </h3>
            <p className="text-green-800 text-sm mb-2">
              <strong>Formula:</strong> (Band1 × 100 + Band2 × 10 + Band3) × Multiplier ± Tolerance
            </p>
            <p className="text-green-800 text-sm">
              Precision resistors. First three bands are digits, fourth is multiplier, fifth is tolerance.
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <span>📊</span> 6-Band Resistors
            </h3>
            <p className="text-purple-800 text-sm mb-2">
              <strong>Formula:</strong> Same as 5-band + Temperature Coefficient
            </p>
            <p className="text-purple-800 text-sm">
              High-precision resistors. Includes temperature coefficient band for temperature stability specification.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Resistor Values</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="font-bold text-gray-900 text-lg">1kΩ</div>
            <div className="text-sm text-gray-600">Pull-up resistor</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="font-bold text-gray-900 text-lg">10kΩ</div>
            <div className="text-sm text-gray-600">Standard value</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="font-bold text-gray-900 text-lg">470Ω</div>
            <div className="text-sm text-gray-600">LED limiting</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="font-bold text-gray-900 text-lg">100kΩ</div>
            <div className="text-sm text-gray-600">High impedance</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Instant Calculation</h3>
              <p className="text-sm text-gray-600">Real-time results as you select colors with no delays</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-2xl">🎨</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Visual Preview</h3>
              <p className="text-sm text-gray-600">See resistor with color bands applied dynamically</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Multiple Formats</h3>
              <p className="text-sm text-gray-600">Supports 4, 5, and 6 band resistor configurations</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-2xl">💾</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">History & Export</h3>
              <p className="text-sm text-gray-600">Save calculations and export detailed reports</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-2xl">📱</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Mobile Friendly</h3>
              <p className="text-sm text-gray-600">Responsive design works on all devices</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Privacy First</h3>
              <p className="text-sm text-gray-600">Your inputs are not collected or stored</p>
            </div>
          </div>
        </div>
      </section>

      <ToolFaq items={faq} />

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Reading Resistors</h2>
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <ul className="space-y-2 text-sm text-yellow-900">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Look for the tolerance band (gold/silver) to identify which end to start reading from</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Use good lighting - some colors like brown and violet can be hard to distinguish</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>If unsure, use a multimeter to verify the resistance value</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Clean resistors if they're dusty or oxidized for better color visibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Remember: Black=0, Brown=1, Red=2, Orange=3, Yellow=4, Green=5, Blue=6, Violet=7, Gray=8, White=9</span>
            </li>
          </ul>
        </div>
      </section>

    </div>
  );
}
