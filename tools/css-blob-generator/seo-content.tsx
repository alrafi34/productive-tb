import React from 'react';

export default function CSSBlobGeneratorSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          What is a CSS Blob Generator?
        </h2>
        <p className="leading-relaxed">
          A CSS blob generator creates organic, irregular shapes using the border-radius property with 8 different values. 
          These modern, fluid shapes are perfect for hero sections, background decorations, and contemporary web design. 
          Unlike simple rounded corners, blob shapes use complex border-radius syntax to create unique, eye-catching visuals.
        </p>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How CSS Blob Shapes Work
        </h2>
        <p className="leading-relaxed">
          CSS blob shapes use the advanced border-radius syntax with 8 values: 4 for horizontal radii and 4 for vertical radii.
        </p>
        
        <div className="p-4 bg-slate-50 rounded-lg">
          <h3 className="font-semibold text-slate-800 mb-2">Border-Radius Syntax</h3>
          <pre className="p-3 bg-white rounded font-mono text-sm border border-slate-200">
border-radius: TL TR BR BL / TL TR BR BL;
          </pre>
          <p className="text-sm mt-3">
            First 4 values = Horizontal radii (top-left, top-right, bottom-right, bottom-left)<br/>
            Last 4 values = Vertical radii (same order)
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg">
          <h3 className="font-semibold text-slate-800 mb-2">Example</h3>
          <pre className="p-3 bg-white rounded font-mono text-sm border border-slate-200">
border-radius: 60% 40% 30% 70% / 50% 30% 70% 40%;
          </pre>
          <p className="text-sm mt-3">
            This creates an organic blob shape with varying curvature at each corner.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎨 Live Preview</h3>
            <p className="text-sm">See your blob shape update in real-time as you adjust sliders.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎲 Random Generator</h3>
            <p className="text-sm">Generate unique blob shapes with one click.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎬 Animation Creator</h3>
            <p className="text-sm">Generate CSS keyframes for morphing blob animations.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📦 Preset Library</h3>
            <p className="text-sm">6 pre-designed blob shapes for quick starts.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎨 Background Options</h3>
            <p className="text-sm">Choose from gradients, solid colors, or transparent.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">💾 Export Options</h3>
            <p className="text-sm">Download as SVG, CSS, or JSON format.</p>
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
            <h3 className="font-semibold text-blue-900 mb-2">🎯 Hero Sections</h3>
            <p className="text-sm text-blue-800">
              Add organic blob shapes as background elements in hero sections for modern, eye-catching designs.
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">🎨 Background Decorations</h3>
            <p className="text-sm text-purple-800">
              Use animated blobs as decorative elements to add visual interest without overwhelming content.
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">🖼️ Image Masks</h3>
            <p className="text-sm text-green-800">
              Apply blob shapes as clip-path or mask for unique image presentations.
            </p>
          </div>

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">💼 Landing Pages</h3>
            <p className="text-sm text-orange-800">
              Create distinctive landing page designs with organic shapes that stand out.
            </p>
          </div>

          <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
            <h3 className="font-semibold text-pink-900 mb-2">🎭 Brand Identity</h3>
            <p className="text-sm text-pink-800">
              Design unique brand elements and visual identities using custom blob shapes.
            </p>
          </div>
        </div>
      </section>

      {/* CSS Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Implementation Examples
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Basic Blob</h3>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`.blob {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 60% 40% 30% 70% / 50% 30% 70% 40%;
}`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Animated Blob</h3>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`@keyframes blob-morph {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 50% 30% 70% 40%;
  }
  50% {
    border-radius: 40% 60% 70% 30% / 70% 50% 40% 60%;
  }
}

.blob {
  animation: blob-morph 8s ease-in-out infinite;
}`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Responsive Blob</h3>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`.blob {
  aspect-ratio: 1;
  width: min(40vw, 400px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 60% 40% 30% 70% / 50% 30% 70% 40%;
}`}
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
            <p><strong>Use subtle animations:</strong> Keep animation duration between 6-10 seconds for smooth, calming effects.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Layer multiple blobs:</strong> Stack blobs with different sizes and opacities for depth.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Match brand colors:</strong> Use gradients that align with your brand palette.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Consider performance:</strong> Limit animated blobs to 2-3 per page for optimal performance.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Test responsiveness:</strong> Ensure blobs scale properly on mobile devices.</p>
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
            <h3 className="font-semibold text-slate-800 mb-1">What browsers support complex border-radius?</h3>
            <p className="text-sm">
              All modern browsers support the 8-value border-radius syntax (Chrome, Firefox, Safari, Edge). 
              It's been supported since 2011.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can I use blob shapes for images?</h3>
            <p className="text-sm">
              Yes! Apply the border-radius to an img element or use it as a clip-path. You can also use the SVG export 
              as a mask for more complex effects.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Do animated blobs affect performance?</h3>
            <p className="text-sm">
              CSS animations are GPU-accelerated and generally performant. However, limit to 2-3 animated blobs per page 
              and avoid animating on mobile for best performance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">How do I make blobs responsive?</h3>
            <p className="text-sm">
              Use relative units like vw, vh, or percentage widths. The responsive CSS output uses min() function to cap 
              maximum size while allowing scaling.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can I export blobs as images?</h3>
            <p className="text-sm">
              You can export as SVG, which is a vector format. To convert to PNG/JPG, open the SVG in a graphics editor 
              or use an online SVG-to-PNG converter.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 text-center">
          This CSS blob generator is a free, browser-based tool for designers and developers. 
          All generation and exports happen locally with no server communication.
        </p>
      </section>
    </div>
  );
}
