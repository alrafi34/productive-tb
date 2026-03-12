import React from 'react';

export default function AspectRatioCalculatorSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          What is an Aspect Ratio Calculator?
        </h2>
        <p className="leading-relaxed">
          An aspect ratio calculator helps you determine the proportional relationship between width and height of images, 
          videos, and screens. It automatically calculates missing dimensions based on a given aspect ratio, ensuring your 
          content maintains proper proportions across different sizes and devices.
        </p>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How Aspect Ratio Works
        </h2>
        <p className="leading-relaxed">
          Aspect ratio is expressed as two numbers separated by a colon (e.g., 16:9). The first number represents width, 
          and the second represents height. For example, a 16:9 ratio means for every 16 units of width, there are 9 units 
          of height.
        </p>
        
        <div className="p-4 bg-slate-50 rounded-lg">
          <h3 className="font-semibold text-slate-800 mb-2">Calculation Formula</h3>
          <div className="space-y-2 text-sm font-mono">
            <div>Height = (Width × Ratio Height) / Ratio Width</div>
            <div>Width = (Height × Ratio Width) / Ratio Height</div>
          </div>
          <p className="text-sm mt-3">
            Example: For 16:9 ratio with width 1920px<br/>
            Height = (1920 × 9) / 16 = 1080px
          </p>
        </div>
      </section>

      {/* Common Aspect Ratios */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Common Aspect Ratios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📺 16:9 (HD Video)</h3>
            <p className="text-sm">Standard for HD TVs, YouTube, and most modern displays. Used for 1080p, 4K content.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">⬛ 1:1 (Square)</h3>
            <p className="text-sm">Perfect for Instagram posts, profile pictures, and social media thumbnails.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📱 9:16 (Vertical)</h3>
            <p className="text-sm">Instagram Stories, TikTok, YouTube Shorts, and mobile-first content.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🖥️ 21:9 (Ultrawide)</h3>
            <p className="text-sm">Ultrawide monitors, cinematic content, and immersive gaming displays.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📷 3:2 (Photography)</h3>
            <p className="text-sm">DSLR cameras, 35mm film, and professional photography standard.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎬 4:3 (Classic)</h3>
            <p className="text-sm">Old TV standard, vintage content, and some presentation formats.</p>
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
            <h3 className="font-semibold text-slate-800 mb-2">🧮 Auto-Calculate</h3>
            <p className="text-sm">Enter any two values and the third calculates automatically.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">👁️ Visual Preview</h3>
            <p className="text-sm">See a live preview box that updates with your dimensions.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎚️ Resize Simulator</h3>
            <p className="text-sm">Interactive slider to test different widths instantly.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎯 Preset Ratios</h3>
            <p className="text-sm">Quick access to 8 common aspect ratios.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📸 Image Upload</h3>
            <p className="text-sm">Upload images to detect their aspect ratio automatically.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">💻 CSS Generator</h3>
            <p className="text-sm">Generate modern and legacy CSS code instantly.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🔄 Resolution Converter</h3>
            <p className="text-sm">Convert resolutions between different aspect ratios.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📊 Ratio Simplifier</h3>
            <p className="text-sm">Automatically simplifies ratios (1920:1080 → 16:9).</p>
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
              <li>Enter width, height, or aspect ratio (any two values)</li>
              <li>The third value calculates automatically</li>
              <li>View the visual preview to see proportions</li>
              <li>Use the resize simulator to test different sizes</li>
              <li>Copy dimensions or export as JSON/TXT</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Using Presets</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Click any preset ratio button (16:9, 4:3, etc.)</li>
              <li>The aspect ratio field updates automatically</li>
              <li>Height recalculates based on current width</li>
              <li>Adjust width or height as needed</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Image Upload</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Switch to "Image Upload" tab</li>
              <li>Click to upload or drag and drop an image</li>
              <li>View detected dimensions and aspect ratio</li>
              <li>Click "Use These Dimensions" to apply to calculator</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Resolution Converter</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Switch to "Converter" tab</li>
              <li>Enter original width and height</li>
              <li>Enter target aspect ratio</li>
              <li>Click "Convert Resolution" to see new dimensions</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">CSS Generation</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Set your desired aspect ratio in the calculator</li>
              <li>Scroll to "CSS Code" section</li>
              <li>Choose modern (aspect-ratio) or legacy (padding-top)</li>
              <li>Click copy button to copy code to clipboard</li>
              <li>Paste into your CSS file</li>
            </ol>
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
            <h3 className="font-semibold text-blue-900 mb-2">🎬 Video Production</h3>
            <p className="text-sm text-blue-800">
              Calculate dimensions for YouTube videos, social media content, and video editing projects.
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">🎨 Graphic Design</h3>
            <p className="text-sm text-purple-800">
              Ensure images maintain proper proportions when resizing for different platforms.
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">💻 Web Development</h3>
            <p className="text-sm text-green-800">
              Generate responsive CSS for images, videos, and embedded content.
            </p>
          </div>

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">📱 Social Media</h3>
            <p className="text-sm text-orange-800">
              Create content with correct dimensions for Instagram, TikTok, YouTube, and other platforms.
            </p>
          </div>

          <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
            <h3 className="font-semibold text-pink-900 mb-2">🖼️ Photography</h3>
            <p className="text-sm text-pink-800">
              Calculate print sizes and crop dimensions while maintaining aspect ratio.
            </p>
          </div>
        </div>
      </section>

      {/* CSS Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          CSS Implementation Examples
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Modern Approach (aspect-ratio)</h3>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
  overflow: hidden;
}

.video-container iframe {
  width: 100%;
  height: 100%;
}`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Legacy Approach (padding-top)</h3>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`.video-container {
  position: relative;
  padding-top: 56.25%; /* 16:9 */
  width: 100%;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Pro Tips
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Maintain quality:</strong> Always scale down, never up. Upscaling reduces image quality.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Use presets:</strong> Start with common ratios (16:9, 1:1) for social media content.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Test responsiveness:</strong> Use the resize simulator to see how content looks at different sizes.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Modern CSS:</strong> Use aspect-ratio property for cleaner, more maintainable code.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Simplify ratios:</strong> Use simplified ratios (16:9 instead of 1920:1080) for clarity.</p>
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
            <h3 className="font-semibold text-slate-800 mb-1">What happens if I change the aspect ratio?</h3>
            <p className="text-sm">
              When you change the aspect ratio, the height automatically recalculates based on the current width to maintain 
              the new proportions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can I use decimal aspect ratios?</h3>
            <p className="text-sm">
              Yes! You can enter ratios like 2.39:1 or 1.618:1. The calculator handles both whole numbers and decimals.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">What's the difference between aspect-ratio and padding-top CSS?</h3>
            <p className="text-sm">
              aspect-ratio is the modern CSS property with better browser support. padding-top is the legacy method using 
              percentage padding for older browsers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">How do I maintain aspect ratio when resizing images?</h3>
            <p className="text-sm">
              Enter your original dimensions, then use the resize simulator slider to find the new width. The height will 
              automatically adjust to maintain the aspect ratio.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can I upload images to detect their aspect ratio?</h3>
            <p className="text-sm">
              Yes! Switch to the "Image Upload" tab, upload your image, and the tool will automatically detect and display 
              its dimensions and aspect ratio.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 text-center">
          This aspect ratio calculator is a free, browser-based tool for designers, developers, and content creators. 
          All calculations happen locally with no server communication.
        </p>
      </section>
    </div>
  );
}
