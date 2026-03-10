export default function GlassmorphismSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the CSS Glassmorphism Generator
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Choose a preset or start with default settings</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Adjust blur, opacity, and color using sliders</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Customize border radius and shadow effects</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Copy the generated CSS or Tailwind code</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Real-time live preview
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                CSS and Tailwind output
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                5 ready-made presets
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Custom background support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Adjustable glass properties
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                One-click code copying
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What is Glassmorphism Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is Glassmorphism?
        </h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Glassmorphism is a modern UI design trend that creates frosted glass-like effects using CSS. 
            It combines transparency, blur effects, and subtle borders to create elements that appear to be made of glass.
          </p>
          <p className="mb-4">
            The effect is achieved primarily using the <code className="bg-gray-100 px-2 py-1 rounded text-sm">backdrop-filter</code> CSS property 
            with blur values, combined with semi-transparent backgrounds and borders.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Core CSS Properties:</h4>
            <ul className="space-y-1 text-sm">
              <li><strong>backdrop-filter:</strong> Creates the blur effect</li>
              <li><strong>background:</strong> Semi-transparent color overlay</li>
              <li><strong>border:</strong> Subtle border with transparency</li>
              <li><strong>box-shadow:</strong> Soft shadow for depth</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What browsers support glassmorphism effects?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Modern browsers including Chrome 76+, Firefox 70+, Safari 9+, and Edge 79+ support backdrop-filter. 
              Always include the -webkit-backdrop-filter prefix for better compatibility.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How do I use the generated CSS code?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Copy the generated CSS and apply it to any HTML element. The effect works best on elements positioned 
              over colorful backgrounds or images. Make sure the parent container has a background for the blur effect to work.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I customize the glass card size?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! The generated CSS doesn't include width and height properties, so you can apply it to elements of any size. 
              The glassmorphism effect will scale accordingly.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What's the difference between CSS and Tailwind output?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              CSS output provides standard CSS properties you can use anywhere. Tailwind output gives you utility classes 
              that work with the Tailwind CSS framework, offering a more concise syntax.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Why isn't my glassmorphism effect showing?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Glassmorphism requires a background behind the element to blur. Make sure your glass element is positioned 
              over content, images, or gradients. The effect won't be visible over plain white backgrounds.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Are glassmorphism effects performance-heavy?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Backdrop-filter can impact performance, especially with high blur values or many glass elements. 
              Use moderate blur values (10-20px) and limit the number of glass elements for optimal performance.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our Glassmorphism Generator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
            <p className="text-gray-600 text-sm">See your glassmorphism effects in real-time as you adjust settings</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">Visual Controls</h3>
            <p className="text-gray-600 text-sm">Intuitive sliders and color pickers for easy customization</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-800 mb-2">Ready-to-Use Code</h3>
            <p className="text-gray-600 text-sm">Copy CSS or Tailwind code instantly for your projects</p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Popular Use Cases for Glassmorphism
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">UI Components</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Modal dialogs and overlays
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Navigation bars and menus
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Card components and panels
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Sidebar and drawer components
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Design Applications</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Modern web applications
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Mobile app interfaces
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Dashboard and admin panels
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Landing pages and portfolios
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}