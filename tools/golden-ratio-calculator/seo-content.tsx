import React from 'react';

export default function GoldenRatioCalculatorSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          What is the Golden Ratio?
        </h2>
        <p className="leading-relaxed">
          The Golden Ratio, also known as Phi (φ), is a mathematical constant approximately equal to 1.618. It appears 
          throughout nature, art, and architecture, creating aesthetically pleasing proportions. When a line is divided 
          into two parts following the golden ratio, the ratio of the whole line to the larger part equals the ratio of 
          the larger part to the smaller part.
        </p>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="font-mono text-center text-lg">
            φ = (1 + √5) / 2 ≈ 1.618033988749895
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How Golden Ratio Calculation Works
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">Forward Calculation</h3>
            <p className="text-sm mb-2">Given a total value, split it into two parts:</p>
            <div className="space-y-1 text-sm font-mono">
              <div>Large Part = Total ÷ 1.618 ≈ 61.8% of total</div>
              <div>Small Part = Total - Large Part ≈ 38.2% of total</div>
            </div>
            <p className="text-sm mt-3">
              Example: Total = 1000<br/>
              Large Part = 1000 ÷ 1.618 ≈ 618<br/>
              Small Part = 1000 - 618 = 382
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">Reverse Calculation</h3>
            <p className="text-sm mb-2">Calculate total from either part:</p>
            <div className="space-y-1 text-sm font-mono">
              <div>From Small: Total = Small × φ / (φ - 1)</div>
              <div>From Large: Total = Large × φ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🧮 Smart Calculator</h3>
            <p className="text-sm">Forward and reverse calculations with support for px, %, and plain numbers.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🌀 Golden Spiral</h3>
            <p className="text-sm">Visual representation with golden rectangle and spiral overlay.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📝 Typography Scale</h3>
            <p className="text-sm">Generate harmonious font sizes based on golden ratio.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📏 Spacing System</h3>
            <p className="text-sm">Create consistent spacing values for UI design.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎨 Layout Generator</h3>
            <p className="text-sm">Split layouts into main content and sidebar areas.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">💻 CSS Code</h3>
            <p className="text-sm">Generate ready-to-use CSS for Grid, Flexbox, and more.</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Common Use Cases
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">🎨 Web Design</h3>
            <p className="text-sm text-blue-800">
              Create visually balanced layouts by splitting page width into main content (61.8%) and sidebar (38.2%).
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">📱 UI Design</h3>
            <p className="text-sm text-purple-800">
              Generate spacing systems and component sizes that feel naturally harmonious.
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">✍️ Typography</h3>
            <p className="text-sm text-green-800">
              Create type scales where each size relates to the next by the golden ratio for perfect hierarchy.
            </p>
          </div>

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">📐 Architecture</h3>
            <p className="text-sm text-orange-800">
              Calculate proportions for building dimensions, room layouts, and structural elements.
            </p>
          </div>

          <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
            <h3 className="font-semibold text-pink-900 mb-2">📷 Photography</h3>
            <p className="text-sm text-pink-800">
              Use golden ratio for composition, cropping, and placing focal points in images.
            </p>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How to Use
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Basic Calculator</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Choose calculation mode (Forward, From Small, or From Large)</li>
              <li>Enter your value (supports numbers, px, %)</li>
              <li>View the golden ratio split instantly</li>
              <li>See visual representation with golden spiral</li>
              <li>Copy results or export as JSON/TXT</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Typography Scale</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Switch to "Typography" tab</li>
              <li>Enter base font size (e.g., 16px)</li>
              <li>View generated scale with visual samples</li>
              <li>Copy individual sizes or entire scale</li>
              <li>Use in your design system or CSS</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Spacing System</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Switch to "Spacing" tab</li>
              <li>Enter base spacing value (e.g., 8px)</li>
              <li>View generated spacing scale with visual bars</li>
              <li>Copy values for your design tokens</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Layout Split</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Switch to "Layout" tab</li>
              <li>Enter total width (e.g., 1440px)</li>
              <li>View main content and sidebar widths</li>
              <li>See visual layout preview</li>
              <li>Copy CSS code for implementation</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Golden Ratio in Nature */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Golden Ratio in Nature and Design
        </h2>
        <div className="space-y-3 text-sm">
          <p className="leading-relaxed">
            The golden ratio appears throughout nature and has been used in art and architecture for centuries:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Nature:</strong> Spiral patterns in shells, flower petals, pinecones, and galaxies</li>
            <li><strong>Human Body:</strong> Proportions of face, fingers, and body segments</li>
            <li><strong>Architecture:</strong> Parthenon, Great Pyramid of Giza, Notre-Dame Cathedral</li>
            <li><strong>Art:</strong> Leonardo da Vinci's works, Salvador Dalí's paintings</li>
            <li><strong>Design:</strong> Apple products, Twitter logo, Pepsi logo</li>
            <li><strong>Music:</strong> Compositions by Mozart, Beethoven, and Debussy</li>
          </ul>
        </div>
      </section>

      {/* CSS Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          CSS Implementation Examples
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">CSS Grid Layout</h3>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`.container {
  display: grid;
  grid-template-columns: 1.618fr 1fr;
  gap: 20px;
}

/* Main content gets 61.8% */
/* Sidebar gets 38.2% */`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Flexbox Layout</h3>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`.container {
  display: flex;
  gap: 20px;
}

.main {
  flex: 1.618;
}

.sidebar {
  flex: 1;
}`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Typography Scale</h3>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`:root {
  --text-xs: 10px;
  --text-sm: 16px;
  --text-base: 26px;
  --text-lg: 42px;
  --text-xl: 68px;
}

/* Each size is previous × 1.618 */`}
            </pre>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Design Tips
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Start with base values:</strong> Use 8px or 16px as base for spacing and typography.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Don't overuse:</strong> Apply golden ratio to key elements, not everything.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Round values:</strong> Round to whole pixels for cleaner implementation.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Test responsiveness:</strong> Ensure golden ratio layouts work on all screen sizes.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Combine with other principles:</strong> Use alongside grid systems and design tokens.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Why is the golden ratio considered aesthetically pleasing?</h3>
            <p className="text-sm">
              The golden ratio creates proportions that feel naturally balanced and harmonious. It appears throughout nature, 
              and humans have evolved to find these proportions visually appealing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Should I use golden ratio for all my designs?</h3>
            <p className="text-sm">
              No. The golden ratio is a helpful guideline, not a strict rule. Use it where it makes sense, but prioritize 
              usability, accessibility, and your specific design requirements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">How do I apply golden ratio to responsive design?</h3>
            <p className="text-sm">
              Use CSS Grid with fr units (1.618fr and 1fr) or Flexbox with flex values. These scale proportionally across 
              different screen sizes while maintaining the golden ratio.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can I use golden ratio for mobile layouts?</h3>
            <p className="text-sm">
              Yes, but consider stacking elements vertically on mobile instead of side-by-side. Apply golden ratio to 
              vertical spacing, typography scales, and component sizing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">What's the difference between golden ratio and rule of thirds?</h3>
            <p className="text-sm">
              Rule of thirds divides space into equal thirds (33.3% each), while golden ratio uses 61.8% and 38.2%. 
              Golden ratio is more precise and creates slightly different visual balance.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 text-center">
          This golden ratio calculator is a free, browser-based tool for designers, developers, and creators. 
          All calculations and visualizations happen locally with no server communication.
        </p>
      </section>
    </div>
  );
}
