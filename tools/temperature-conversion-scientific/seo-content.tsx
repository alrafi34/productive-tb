import React from "react";

export default function ToolSEOContent() {
  return (
    <div className="mt-12 space-y-12">
      {/* What is Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>❓</span> What is the Temperature Conversion Tool?
        </h2>
        <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed">
          <p>
            The <strong>Temperature Conversion (Scientific)</strong> tool is a powerful utility designed for students, educators, scientists, and professionals who need fast, precise conversions between various temperature scales. 
          </p>
          <p className="mt-3">
            Our tool allows you to instantly translate temperature values across four primary scales: <strong>Celsius (°C)</strong>, the global standard; <strong>Fahrenheit (°F)</strong>, primarily used in the United States; <strong>Kelvin (K)</strong>, the base universal unit of thermodynamic temperature; and <strong>Rankine (°R)</strong>, an absolute scale used frequently in aerospace engineering systems. 
          </p>
          <p className="mt-3">
            All calculations are performed entirely in your browser without requiring a backend, ensuring complete privacy, zero latency, and the ability to operate offline once the page is loaded.
          </p>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>🛠️</span> How to Use the Converter
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Enter a Value</h3>
              <p className="text-gray-600">Type the numeric temperature into the input field. The tool supports negative numbers, decimals, and extremely large numbers.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Select Input Scale</h3>
              <p className="text-gray-600">Choose the original temperature scale (Celsius, Fahrenheit, Kelvin, or Rankine) from the dropdown options.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Adjust Precision</h3>
              <p className="text-gray-600">Use the precision slider to determine how many decimal places you want displayed. The default is set to 2 decimal places to keep data clean.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">4</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Copy and Save</h3>
              <p className="text-gray-600">Use the "Copy All" button to instantly copy all four scale conversions to your clipboard. Click "Save to History" to log the conversion into your local storage list.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulas Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>🧮</span> Scientific Conversion Formulas
        </h2>
        <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed">
          <p>
            For those interested in the mathematics behind the tool, here are the core formulas used to compute the conversions seamlessly:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">From Celsius (°C)</h4>
              <ul className="text-sm space-y-2 list-disc pl-4">
                <li><strong>Kelvin:</strong> K = °C + 273.15</li>
                <li><strong>Fahrenheit:</strong> °F = (°C × 9/5) + 32</li>
                <li><strong>Rankine:</strong> °R = (°C + 273.15) × 9/5</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">From Fahrenheit (°F)</h4>
              <ul className="text-sm space-y-2 list-disc pl-4">
                <li><strong>Celsius:</strong> °C = (°F - 32) × 5/9</li>
                <li><strong>Kelvin:</strong> K = (°F + 459.67) × 5/9</li>
                <li><strong>Rankine:</strong> °R = °F + 459.67</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">From Kelvin (K)</h4>
              <ul className="text-sm space-y-2 list-disc pl-4">
                <li><strong>Celsius:</strong> °C = K - 273.15</li>
                <li><strong>Fahrenheit:</strong> °F = (K × 9/5) - 459.67</li>
                <li><strong>Rankine:</strong> °R = K × 9/5</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">From Rankine (°R)</h4>
              <ul className="text-sm space-y-2 list-disc pl-4">
                <li><strong>Celsius:</strong> °C = (°R - 491.67) × 5/9</li>
                <li><strong>Fahrenheit:</strong> °F = °R - 459.67</li>
                <li><strong>Kelvin:</strong> K = °R × 5/9</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>💬</span> Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the difference between Kelvin and Celsius?</h3>
            <p className="text-gray-600 leading-relaxed">Kelvin is an absolute temperature scale, meaning its zero point (0 K) represents absolute zero, the theoretical point where all atomic motion stops. Celsius is a relative scale where 0 °C is the freezing point of water. To convert Celsius to Kelvin, simply add 273.15.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Who uses the Rankine scale?</h3>
            <p className="text-gray-600 leading-relaxed">The Rankine scale is primarily used by engineers in the United States, particularly in the aerospace and thermodynamics fields. Like Kelvin, it is an absolute temperature scale, but its degrees are the same size as Fahrenheit degrees rather than Celsius degrees.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data sent to a server for processing?</h3>
            <p className="text-gray-600 leading-relaxed">No. Every conversion happens live directly within your browser utilizing our optimized JavaScript. We do not transmit your inputs, outputs, or history logs to any external servers, ensuring maximum security and performance.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
