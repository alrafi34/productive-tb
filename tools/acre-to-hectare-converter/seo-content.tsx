import React from "react";

export default function AcreToHectareConverterSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">
      {/* What is Section */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is an Acre to Hectare Converter?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            An <strong>Acre to Hectare Converter</strong> is a specialized land measurement tool that instantly converts 
            area values from acres to hectares. This converter is essential for professionals working with land, 
            agriculture, real estate, and construction projects where accurate area measurements are critical.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The conversion uses the standard formula: <strong>1 acre = 0.404686 hectares</strong>. Our converter 
            provides real-time calculations with customizable precision, making it perfect for both quick estimates 
            and precise professional measurements.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're a farmer planning crop areas, a real estate agent working with international clients, 
            or a surveyor preparing land documentation, this tool ensures accurate conversions every time.
          </p>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Acre to Hectare Converter
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <span>Enter the acre value in the input field</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <span>Choose your desired decimal precision (2-8 places)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <span>View the instant hectare conversion result</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                <span>Copy, save, or export your results as needed</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Use preset buttons for common values</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Results update automatically as you type</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Access conversion history for reference</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Export results to text files</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Conversion Formula Section */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Acre to Hectare Conversion Formula
        </h2>
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Basic Formula</h3>
            <div className="font-mono text-lg text-blue-800 bg-white p-4 rounded border">
              Hectares = Acres × 0.404686
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Example Calculation</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div>Input: 10 acres</div>
                <div>Calculation: 10 × 0.404686</div>
                <div className="font-semibold text-primary">Result: 4.04686 hectares</div>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Conversion Factor</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div>1 acre = 0.404686 hectares</div>
                <div>1 hectare = 2.47105 acres</div>
                <div className="text-xs text-gray-500">Based on international standards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Conversions Section */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Acre to Hectare Conversions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acres</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Hectares</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Common Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-mono">0.25</td>
                <td className="py-3 px-4 font-mono font-semibold">0.101172</td>
                <td className="py-3 px-4 text-gray-600">Quarter acre lot</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-mono">0.5</td>
                <td className="py-3 px-4 font-mono font-semibold">0.202343</td>
                <td className="py-3 px-4 text-gray-600">Half acre property</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-mono">1</td>
                <td className="py-3 px-4 font-mono font-semibold">0.404686</td>
                <td className="py-3 px-4 text-gray-600">Standard acre</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-mono">5</td>
                <td className="py-3 px-4 font-mono font-semibold">2.02343</td>
                <td className="py-3 px-4 text-gray-600">Small farm plot</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-mono">10</td>
                <td className="py-3 px-4 font-mono font-semibold">4.04686</td>
                <td className="py-3 px-4 text-gray-600">Medium farm field</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-mono">100</td>
                <td className="py-3 px-4 font-mono font-semibold">40.4686</td>
                <td className="py-3 px-4 text-gray-600">Large agricultural area</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Applications Section */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Applications and Use Cases
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-2xl mb-3">🌾</div>
            <h3 className="font-semibold text-green-900 mb-2">Agriculture</h3>
            <p className="text-sm text-green-800">
              Convert farm sizes, crop areas, and agricultural land measurements for international farming operations.
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="text-2xl mb-3">🏠</div>
            <h3 className="font-semibold text-blue-900 mb-2">Real Estate</h3>
            <p className="text-sm text-blue-800">
              Help international clients understand property sizes and convert listings between measurement systems.
            </p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="text-2xl mb-3">📐</div>
            <h3 className="font-semibold text-purple-900 mb-2">Surveying</h3>
            <p className="text-sm text-purple-800">
              Prepare accurate land surveys and legal documents with precise area measurements in both units.
            </p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="text-2xl mb-3">🏗️</div>
            <h3 className="font-semibold text-orange-900 mb-2">Construction</h3>
            <p className="text-sm text-orange-800">
              Plan construction projects and calculate material requirements based on accurate land area measurements.
            </p>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-2xl mb-3">🎓</div>
            <h3 className="font-semibold text-red-900 mb-2">Education</h3>
            <p className="text-sm text-red-800">
              Teach students about different measurement systems and provide practical conversion examples.
            </p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Research</h3>
            <p className="text-sm text-gray-800">
              Convert land area data for scientific studies, environmental research, and geographic analysis.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-6">
            <h3 className="font-semibold text-gray-800 mb-2">How many hectares are in one acre?</h3>
            <p className="text-gray-700">
              One acre equals exactly 0.404686 hectares. This conversion factor is based on the international 
              definition where 1 acre = 4,047 square meters and 1 hectare = 10,000 square meters.
            </p>
          </div>
          
          <div className="border-b border-gray-100 pb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Is this converter accurate for legal documents?</h3>
            <p className="text-gray-700">
              Yes, our converter uses the official conversion factor (0.404686) recognized internationally. 
              However, for legal documents, always verify with local authorities as some jurisdictions may 
              have specific rounding requirements.
            </p>
          </div>
          
          <div className="border-b border-gray-100 pb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Can I convert fractional acres?</h3>
            <p className="text-gray-700">
              Absolutely! The converter accepts decimal values, so you can convert fractional acres like 
              0.25 acres (quarter acre) or 1.5 acres with full precision.
            </p>
          </div>
          
          <div className="border-b border-gray-100 pb-6">
            <h3 className="font-semibold text-gray-800 mb-2">What's the difference between acres and hectares?</h3>
            <p className="text-gray-700">
              Acres are part of the imperial system (primarily used in the US and UK), while hectares 
              are part of the metric system (used internationally). One hectare is larger than one acre 
              (1 hectare = 2.47105 acres).
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How precise are the conversion results?</h3>
            <p className="text-gray-700">
              You can choose precision from 2 to 8 decimal places depending on your needs. For most 
              practical purposes, 4 decimal places provide sufficient accuracy, while 8 decimal places 
              are suitable for highly precise scientific calculations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}