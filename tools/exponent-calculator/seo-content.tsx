import React from "react";

export default function ToolSEOContent() {
  return (
    <div className="mt-12 space-y-12">
      {/* Introduction Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
            <span>🚀</span> What is the Exponent Calculator?
          </h2>
          <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
            <p>
              An <strong>Exponent Calculator</strong> is a specialized mathematical tool designed to compute the result of raising a base number to a specific power. This operation, known as exponentiation, represents the process of multiplying a number by itself designated times.
            </p>
            <p className="mt-4">
              Our advanced calculator handles everything from simple integer powers to complex negative and fractional exponents. It provides <strong>instant calculations</strong> processed entirely within your browser for maximum privacy and performance.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>⚙️</span> How to Calculate Powers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800">Basic Exponents</h3>
            <p className="text-sm text-gray-600 italic leading-relaxed">
              When you raise 2 to the power of 3 (2³), you multiply 2 by itself three times: 2 × 2 × 2 = 8.
            </p>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 font-mono text-xs text-primary">
              x^y = x multiplied by itself y times
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800">Advanced Scenarios</h3>
            <ul className="text-sm text-gray-600 space-y-3 list-disc pl-5 font-medium">
              <li><strong>Negative Exponents:</strong> x⁻ⁿ = 1/xⁿ (result is a reciprocal)</li>
              <li><strong>Zero Exponents:</strong> Any non-zero number raised to 0 equals 1 (x⁰ = 1)</li>
              <li><strong>Fractional Exponents:</strong> x¹/² is the square root, x¹/³ is the cube root.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 inline-flex items-center gap-2">
          <span>💎</span> Key Tool Advantages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Real-Time Updates", desc: "Results recalculate instantly as you modify base or exponent values.", icon: "⚡" },
            { title: "Step Expansion", desc: "Visualizes the multiplication process for small integer powers.", icon: "🗺️" },
            { title: "Smart Formatting", desc: "Automatically adjusts to scientific notation for extremely large results.", icon: "🔬" },
            { title: "Privacy First", desc: "Calculations run 100% client-side. No data is sent to a server.", icon: "🔒" }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-2xl mb-1">{feature.icon}</span>
              <h4 className="font-bold text-gray-900 text-sm">{feature.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 inline-flex items-center gap-2">
          <span>💬</span> Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Can I perform conversions with extremely large numbers?</h3>
            <p className="text-gray-600 leading-relaxed font-medium">Yes. The tool leverages JavaScript's native precision. For very large results, you should enable the <strong>Scientific Notation</strong> checkbox to make the result readable.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">What is the result of 0⁰?</h3>
            <p className="text-gray-600 leading-relaxed font-medium">In many mathematical contexts, 0⁰ is considered an indeterminate form, though most calculators and programming languages (including this one) return 1 by convention.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Is there a limit on decimal places?</h3>
            <p className="text-gray-600 leading-relaxed font-medium">The precision slider allows you to display up to 6 decimal places. We use standard rounding rules (0.5 rounds up) for the final display.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
