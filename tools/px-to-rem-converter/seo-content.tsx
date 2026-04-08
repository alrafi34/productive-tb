import React from "react";

export default function PxToRemSEOContent() {
  return (
    <section className="mt-16 space-y-12 text-gray-700">
      {/* Introduction */}
      <article className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">What is a PX to REM Converter?</h2>
        <p>
          A PX to REM converter is a developer tool that instantly converts pixel (px) values into rem or em units. 
          This is essential for modern responsive web design, where rem units provide better scalability and accessibility 
          compared to fixed pixel values.
        </p>
        <p>
          The tool uses a simple mathematical formula: <code className="bg-gray-100 px-2 py-1 rounded">rem = px ÷ base font size</code>. 
          By default, the base font size is 16px, but you can customize it to match your project's requirements.
        </p>
      </article>

      {/* Why Use REM Units */}
      <article className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Why Use REM Units Instead of Pixels?</h2>
        <ul className="space-y-3 list-disc list-inside">
          <li><strong>Scalability:</strong> REM units scale relative to the root font size, making responsive design easier</li>
          <li><strong>Accessibility:</strong> Users can adjust their browser's base font size, and rem-based layouts respect this preference</li>
          <li><strong>Consistency:</strong> Using rem across your project ensures uniform spacing and sizing</li>
          <li><strong>Maintainability:</strong> Changing the base font size updates all rem-based values automatically</li>
          <li><strong>Mobile-Friendly:</strong> REM units adapt better to different screen sizes and zoom levels</li>
        </ul>
      </article>

      {/* How to Use */}
      <article className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">How to Use the PX to REM Converter</h2>
        <ol className="space-y-3 list-decimal list-inside">
          <li>Enter your pixel values in the input field (one per line, comma-separated, or space-separated)</li>
          <li>Set your base font size (default is 16px, but adjust if your project uses a different base)</li>
          <li>Choose your output unit (REM or EM)</li>
          <li>View the instant conversion results</li>
          <li>Copy the values or CSS-ready output to your clipboard</li>
        </ol>
      </article>

      {/* Common Conversions */}
      <article className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Common PX to REM Conversions (Base 16px)</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="px-4 py-2 text-left font-bold">Pixels (px)</th>
                <th className="px-4 py-2 text-left font-bold">REM Units</th>
                <th className="px-4 py-2 text-left font-bold">Common Use</th>
              </tr>
            </thead>
            <tbody>
              {[
                { px: 8, rem: 0.5, use: "Small spacing, borders" },
                { px: 12, rem: 0.75, use: "Small text, tight spacing" },
                { px: 16, rem: 1, use: "Base font size" },
                { px: 20, rem: 1.25, use: "Slightly larger text" },
                { px: 24, rem: 1.5, use: "Headings, large text" },
                { px: 32, rem: 2, use: "Large headings, major spacing" },
                { px: 48, rem: 3, use: "Hero sections, large headings" },
                { px: 64, rem: 4, use: "Extra large elements" }
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 font-mono font-bold text-gray-900">{row.px}px</td>
                  <td className="px-4 py-2 font-mono font-bold text-blue-600">{row.rem}rem</td>
                  <td className="px-4 py-2 text-gray-600">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      {/* REM vs EM */}
      <article className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">REM vs EM: What's the Difference?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">REM (Root EM)</h3>
            <p className="text-sm">
              Relative to the root element's font size (usually the <code className="bg-white px-1 rounded">html</code> tag). 
              Most consistent for responsive design.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-bold text-purple-900 mb-2">EM</h3>
            <p className="text-sm">
              Relative to the parent element's font size. Can compound if nested, making it harder to predict sizes.
            </p>
          </div>
        </div>
      </article>

      {/* Best Practices */}
      <article className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Best Practices for Using REM Units</h2>
        <ul className="space-y-3 list-disc list-inside">
          <li><strong>Set a base font size:</strong> Define a clear base font size in your CSS (e.g., <code className="bg-gray-100 px-2 py-1 rounded">html {'{'}font-size: 16px;{'}'}</code>)</li>
          <li><strong>Use REM for most properties:</strong> Apply rem to font-size, padding, margin, and width/height</li>
          <li><strong>Avoid mixing units:</strong> Stick to rem throughout your project for consistency</li>
          <li><strong>Test responsiveness:</strong> Verify that your layout scales correctly when users adjust their browser font size</li>
          <li><strong>Use media queries:</strong> Adjust the base font size at different breakpoints for better mobile experience</li>
        </ul>
      </article>

      {/* Features */}
      <article className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Tool Features</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>Real-time conversion as you type</li>
          <li>Batch conversion for multiple values</li>
          <li>Configurable base font size (8-40px)</li>
          <li>Support for both REM and EM units</li>
          <li>Reverse conversion (REM → PX)</li>
          <li>Copy individual values or CSS-ready output</li>
          <li>Quick preset buttons for common base sizes</li>
          <li>Conversion history with localStorage</li>
          <li>Mobile-responsive design</li>
          <li>No installation or signup required</li>
        </ul>
      </article>

      {/* FAQ */}
      <article className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">What's the default base font size?</h3>
            <p className="text-sm">The default is 16px, which is the standard browser default. You can change it to match your project.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Can I convert multiple values at once?</h3>
            <p className="text-sm">Yes! Enter values separated by commas, spaces, or on new lines, and the tool will convert them all instantly.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Is this tool free?</h3>
            <p className="text-sm">Yes, completely free! No ads, no signup, no hidden costs. It runs entirely in your browser.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Can I use this offline?</h3>
            <p className="text-sm">Yes, once loaded, the tool works offline. Your conversion history is saved locally in your browser.</p>
          </div>
        </div>
      </article>
    </section>
  );
}
