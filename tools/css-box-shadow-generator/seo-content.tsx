export default function CSSBoxShadowGeneratorSEOContent() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Use the CSS Box Shadow Generator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Quick Start Guide</h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Adjust horizontal and vertical offset sliders to position your shadow</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Control blur radius for softness and spread radius for shadow size</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Choose shadow color and adjust opacity for the perfect effect</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Copy the generated CSS code and paste it into your stylesheet</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Real-time shadow preview</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Multiple shadow layers</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Inset shadow support</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Shadow presets library</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Background color picker</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Border radius control</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">What is a CSS box shadow generator?</h3>
            <p className="text-gray-600 leading-relaxed">A CSS box shadow generator is a free online tool that helps you create box shadow effects visually using sliders and controls, then generates the corresponding CSS code. It eliminates the need to manually write box-shadow properties and allows you to see results in real-time.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I create multiple shadows?</h3>
            <p className="text-gray-600 leading-relaxed">Click the "+ Add Layer" button to create additional shadow layers. Each layer can have different offset, blur, spread, color, and opacity settings. Multiple shadows are combined in the CSS output, separated by commas, creating complex shadow effects.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">What is an inset shadow?</h3>
            <p className="text-gray-600 leading-relaxed">An inset shadow appears inside the element rather than outside, creating a recessed or pressed effect. Enable the "Inset Shadow" checkbox to change the shadow from an outer drop shadow to an inner shadow effect.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">What do the shadow parameters mean?</h3>
            <p className="text-gray-600 leading-relaxed">Horizontal offset (X) moves shadow left/right, vertical offset (Y) moves it up/down, blur radius controls softness, and spread radius expands or contracts the shadow. Adjust these values to create different shadow styles from subtle to dramatic.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Can I use shadow presets?</h3>
            <p className="text-gray-600 leading-relaxed">Yes! We provide popular shadow presets including Soft Shadow, Material Design, Deep Shadow, Floating Card, and Neumorphism. Click any preset to instantly apply it, then customize further to match your design needs.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Is this box shadow generator free?</h3>
            <p className="text-gray-600 leading-relaxed">Yes, this online CSS box shadow generator is completely free with no registration required. Create unlimited shadows, use all features including multiple layers and presets, and export CSS code for any project.</p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Use Our CSS Box Shadow Generator?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Preview</h3>
            <p className="text-gray-600 text-sm">See shadow changes in real-time as you adjust sliders and settings</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">Multiple Layers</h3>
            <p className="text-gray-600 text-sm">Create complex shadow effects with multiple shadow layers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Mobile Ready</h3>
            <p className="text-gray-600 text-sm">Fully responsive design works on all devices and screen sizes</p>
          </div>
        </div>
      </section>
    </>
  );
}
