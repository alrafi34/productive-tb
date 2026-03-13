import React from "react";

export default function ToolSEOContent() {
  return (
    <div className="mt-12 space-y-12">
      {/* What is Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>❓</span> What is the CM to Meter Converter?
        </h2>
        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
          <p>
            The <strong>Centimeter to Meter Converter</strong> is an efficient and free online utility tool that translates physical length measurements from centimeters (CM) into standard meters (M).
          </p>
          <p className="mt-3">
            Because this tool operates natively inside your browser using pure JavaScript, every calculation occurs instantly without making network requests to remote servers. This guarantees lightning-fast feedback loops, 100% data privacy, and the ability to continue executing unit conversions even if you lose internet connectivity.
          </p>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>🛠️</span> How to Convert CM to M
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Type Your Value</h3>
              <p className="text-gray-600">Simply enter the numeric centimeter value into the large text field. You can input whole numbers, fractions, or extremely large values as needed.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Automatic Calculation</h3>
              <p className="text-gray-600">You don't need to press a calculate button. The tool listens to your keystrokes and automatically processes the underlying division algorithm the moment you type.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Use the Result</h3>
              <p className="text-gray-600">Highlight the giant result display to copy it manually, or use the convenient "Copy Result" button at the bottom to send the data directly to your device clipboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formula Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>🧮</span> The Conversion Formula
        </h2>
        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
          <p>
            The mathematical formula to convert centimeters into equivalent meters is extremely straightforward. The prefix "centi" in the metric system denotes a factor of one hundredth (1/100). Therefore, there are exactly 100 centimeters in 1 meter.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6 max-w-lg">
             <h4 className="font-bold text-gray-900 mb-2">Equation:</h4>
             <div className="mt-3 text-xl font-bold text-blue-600 font-mono tracking-wider items-center flex">
               Meters = CM ÷ 100
             </div>
          </div>
          <h4 className="font-bold text-gray-800 mt-6 mb-3">Quick Reference Examples:</h4>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>150 cm</strong> translates to 150 ÷ 100 = <strong>1.5 meters</strong></li>
            <li><strong>75 cm</strong> translates to 75 ÷ 100 = <strong>0.75 meters</strong></li>
            <li><strong>1,000 cm</strong> translates to 1,000 ÷ 100 = <strong>10 meters</strong></li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>💬</span> Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I convert meters back to centimeters here?</h3>
            <p className="text-gray-600 leading-relaxed">This specific tool is optimized purely for one-way centimeter extraction to keep the layout fast and minimal. However, calculating the reverse is simple manually: simply multiply your meters by 100.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Where does this calculator run?</h3>
            <p className="text-gray-600 leading-relaxed">It runs securely inside your web browser (Chrome, Safari, Edge, Firefox, etc.). Your inputs are not recorded or sent across the web, preserving your privacy and saving server bandwidth.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What does the precision slider do?</h3>
            <p className="text-gray-600 leading-relaxed">The precision slider dictates how many numbers appear after the decimal point in your final meter result. For general lifestyle calculations, 2 decimal places is standard, but you can crank the precision up for engineering applications.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
