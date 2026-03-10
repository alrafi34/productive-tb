export default function CSSGradientGeneratorSEOContent() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Use the CSS Gradient Generator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Quick Start Guide</h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Choose gradient type: Linear or Radial</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Adjust angle (linear) or shape (radial) settings</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Add, remove, or adjust color stops with position sliders</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Copy the generated CSS code and use it in your project</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Linear and radial gradients</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Multiple color stops</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Live preview updates</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Angle control (0-360°)</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Reverse gradient button</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Random gradient generator</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Beautiful gradient presets</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">What is a CSS gradient generator?</h3>
            <p className="text-gray-600 leading-relaxed">A CSS gradient generator is a free online tool that helps you create linear and radial gradients visually and generates the corresponding CSS code. It allows you to customize colors, angles, positions, and instantly see the results in a live preview.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">What's the difference between linear and radial gradients?</h3>
            <p className="text-gray-600 leading-relaxed">Linear gradients transition colors along a straight line at a specified angle (like left to right or top to bottom). Radial gradients transition colors from a center point outward in a circular or elliptical pattern. Both are useful for different design effects.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I add multiple colors to my gradient?</h3>
            <p className="text-gray-600 leading-relaxed">Click the "+ Add Stop" button to add more color stops to your gradient. Each color stop has a color picker, position slider (0-100%), and can be removed individually. You can add as many color stops as needed for complex gradient effects.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Can I use the generated CSS in my projects?</h3>
            <p className="text-gray-600 leading-relaxed">Yes! Simply click the "Copy CSS" button and paste the code directly into your CSS file or style attribute. The generated code works in all modern browsers and is production-ready for personal and commercial projects.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">What are gradient presets?</h3>
            <p className="text-gray-600 leading-relaxed">Gradient presets are pre-designed color combinations like Sunset, Ocean, Purple Dream, Fire, and Pastel. Click any preset to instantly apply it to your gradient, then customize it further to match your design needs.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Is this CSS gradient generator free?</h3>
            <p className="text-gray-600 leading-relaxed">Yes, this online CSS gradient generator is completely free with no registration required. Create unlimited gradients, use all features, and export CSS code for any project without restrictions.</p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Use Our CSS Gradient Generator?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Real-Time Preview</h3>
            <p className="text-gray-600 text-sm">See your gradient changes instantly with live preview as you adjust colors and settings</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">Easy to Use</h3>
            <p className="text-gray-600 text-sm">Intuitive interface with color pickers, sliders, and presets makes gradient creation simple</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
            <p className="text-gray-600 text-sm">Fully responsive design works perfectly on desktop, tablet, and mobile devices</p>
          </div>
        </div>
      </section>
    </>
  );
}
