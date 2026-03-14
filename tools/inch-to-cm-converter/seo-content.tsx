import React from "react";

export default function ToolSEOContent() {
  return (
    <div className="mt-12 space-y-12">
      {/* What is Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>❓</span> What is the Inch to CM Converter?
        </h2>
        <div className="prose prose-primary max-w-none text-gray-600 leading-relaxed">
          <p>
            The <strong>Inch to Centimeter Converter</strong> is a high-performance web utility designed to provide instantaneous length conversions. Whether you are moving between imperial measurements and the metric system for a DIY project, engineering calculation, or academic study, this tool ensures absolute accuracy with sub-millisecond response times.
          </p>
          <p className="mt-3">
            Built using modern web technologies, the converter operates <strong>100% in your browser</strong>. This means your data is never sent to a server, providing total privacy and the ability to work offline once the page is loaded.
          </p>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>🛠️</span> How to Use the Tool
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">1. Input Value</h3>
            <p className="text-sm text-gray-600">Type your measurement into the input field or use the interactive slider for quick adjustments up to 500 inches.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">2. Swap Direction</h3>
            <p className="text-sm text-gray-600">Click the swap button (🔄) to quickly flip between Inch-to-CM and CM-to-Inch conversion modes.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">3. Save or Copy</h3>
            <p className="text-sm text-gray-600">Instantly copy the result to your clipboard or save it to your local history log for future reference.</p>
          </div>
        </div>
      </section>

      {/* Formula Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>🧮</span> Scientific Conversion Formula
        </h2>
        <div className="prose prose-primary max-w-none text-gray-600 leading-relaxed">
          <p>
            The international standard for the inch was defined in 1959. Since then, the exact conversion factor used by scientists and engineers globally is:
          </p>
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 mt-4 flex flex-col items-center">
            <code className="text-2xl font-black text-primary">1 inch = 2.54 centimeters</code>
            <p className="text-xs text-primary/60 mt-2 font-bold uppercase tracking-widest">Global Standard Definition</p>
          </div>
          <p className="mt-6">
            To calculate centimeters from inches, multiply by 2.54. To calculate inches from centimeters, divide by 2.54. Our tool handles this math with high precision, providing results up to 4 decimal places.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>💬</span> Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is this tool free to use?</h3>
            <p className="text-gray-600 leading-relaxed">Yes, our conversion tool is free and will always remain free. There are no limits on the number of conversions you can perform.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Does this work on mobile devices?</h3>
            <p className="text-gray-600 leading-relaxed">Absolutely. The interface is fully responsive and features touch-friendly controls like a large slider and optimized input fields.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is the conversion?</h3>
            <p className="text-gray-600 leading-relaxed">We use the exact scientific definition (1 inch = 2.54 cm). The calculations are performed with JavaScript's floating-point precision and formatted for clear reading.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
