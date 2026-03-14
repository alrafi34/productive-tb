import React from "react";

export default function ToolSEOContent() {
  return (
    <div className="mt-12 space-y-12">
      {/* What is Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>❓</span> What is the Square Root Calculator?
        </h2>
        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
          <p>
            An online <strong>Square Root Calculator</strong> is an essential mathematical tool designed to find the specific value which, when multiplied by itself, produces the original number. This process is the inverse of squaring a number.
          </p>
          <p className="mt-3">
            Our tool leverage the <strong>Newton-Raphson method</strong> (via JavaScript's native Math.sqrt) to provide high-precision results for everything from small integers to complex decimal values and scientific figures. It runs 100% locally on your machine, ensuring data safety and zero latency.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>🚀</span> Key Features & Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Decimal Precision</h3>
            <p className="text-sm text-gray-600">Toggle the slider to get results rounded to anywhere between 0 and 10 decimal places instantly.</p>
          </div>
          <div className="p-5 bg-green-50/50 rounded-2xl border border-green-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Batch Processing</h3>
            <p className="text-sm text-gray-600">Calculate the roots of hundreds of numbers at once using our unique batch mode comma-separated input.</p>
          </div>
          <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Verification Loop</h3>
            <p className="text-sm text-gray-600">We don't just give you the answer; we show you the math by multiplying the result back into the original sum.</p>
          </div>
        </div>
      </section>

      {/* Formula & Explanation Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
          <span>🧮</span> The Square Root Formula
        </h2>
        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
          <p>
            Mathematically, the square root of a number <em>x</em> is written as <strong>√x</strong>. If <strong>y² = x</strong>, then <strong>y = √x</strong>.
          </p>
          <div className="bg-gray-900 text-white p-6 rounded-2xl border border-gray-800 mt-6 shadow-xl max-w-md mx-auto text-center font-mono">
             <div className="text-3xl font-black text-primary">√9 = 3</div>
             <div className="text-xs text-gray-400 mt-2">because 3 × 3 = 9</div>
          </div>
          <h4 className="font-bold text-gray-800 mt-8 mb-3">Square Root Properties:</h4>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Positive Numbers:</strong> Only positive numbers have real square roots.</li>
            <li><strong>Negative Numbers:</strong> Negative numbers require <em>imaginary units (i)</em> for square roots.</li>
            <li><strong>Perfect Squares:</strong> Numbers like 4, 9, 16, and 25 have integers as square roots.</li>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is this calculator?</h3>
            <p className="text-gray-600 leading-relaxed">The calculator uses IEEE 754 floating-point arithmetic. For 99.9% of engineering and educational use cases, the accuracy is more than sufficient.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I export my batch results?</h3>
            <p className="text-gray-600 leading-relaxed">Yes! If you use the batch mode, an export button will appear allowing you to download a CSV file containing all your inputs and their corresponding roots.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the square root of a negative number?</h3>
            <p className="text-gray-600 leading-relaxed">By default, our tool alerts you that negative numbers result in complex/imaginary numbers. Standard calculators cannot find a "real" number because no real number multiplied by itself can be negative.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
