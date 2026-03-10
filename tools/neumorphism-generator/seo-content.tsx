export default function NeumorphismSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Neumorphism Generator
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
                <span>Adjust background color and shadow properties</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Toggle between raised and pressed effects</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Copy the generated CSS code for your project</span>
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
                Live neumorphic preview
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Raised and pressed modes
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Light source direction control
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Dark mode support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Ready-made presets
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                CSS and SCSS output
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What is Neumorphism Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is Neumorphism?
        </h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Neumorphism (also called Soft UI) is a design trend that creates soft, extruded plastic-like elements 
            that appear to emerge from or sink into the background. It combines elements of skeuomorphism and flat design.
          </p>
          <p className="mb-4">
            The effect is achieved using two opposite box shadows - one light and one dark - positioned on opposite 
            sides of an element. This creates the illusion of depth and makes elements appear three-dimensional.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Core Principles:</h4>
            <ul className="space-y-1 text-sm">
              <li><strong>Subtle shadows:</strong> Two shadows create the 3D effect</li>
              <li><strong>Monochromatic colors:</strong> Background and element colors are similar</li>
              <li><strong>Soft edges:</strong> Rounded corners enhance the soft appearance</li>
              <li><strong>Low contrast:</strong> Gentle differences in brightness</li>
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
              What's the difference between raised and pressed modes?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Raised mode creates elements that appear to float above the surface, while pressed mode (inset) 
              makes elements appear pushed into the surface. Pressed mode uses the 'inset' keyword in box-shadow 
              to create the sunken effect.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How do I choose the right background color for neumorphism?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Neumorphism works best with neutral, mid-tone colors like light grays (#e0e0e0) for light themes 
              or dark grays (#2e2e2e) for dark themes. Avoid pure white, pure black, or highly saturated colors 
              as they don't provide enough contrast variation for the shadow effect.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What are the accessibility concerns with neumorphism?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Neumorphism can have low contrast, making it difficult for users with visual impairments to distinguish 
              elements. Always ensure sufficient color contrast for text and important interactive elements. 
              Consider using neumorphism for decorative elements rather than critical UI components.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I use neumorphism with brand colors?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes, but you'll need to adjust the saturation and brightness. Highly saturated brand colors should 
              be toned down to work with neumorphism. Use your brand colors as accent colors while keeping the 
              main neumorphic elements in neutral tones.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How does light direction affect the neumorphic effect?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Light direction determines where the highlight and shadow appear. Top-left lighting (most common) 
              places the light shadow on the top-left and dark shadow on the bottom-right. Consistent light 
              direction across your interface creates a cohesive 3D environment.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What's the best way to implement neumorphism in production?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Use CSS custom properties (variables) to maintain consistency across components. Define your 
              base colors, shadow distances, and blur values as variables. This makes it easy to adjust 
              the entire design system and maintain consistency across different screen sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our Neumorphism Generator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Real-time Preview</h3>
            <p className="text-gray-600 text-sm">See your neumorphic effects instantly as you adjust settings</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Color Generation</h3>
            <p className="text-gray-600 text-sm">Automatically generates perfect shadow colors based on your background</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-800 mb-2">Production Ready</h3>
            <p className="text-gray-600 text-sm">Copy clean CSS code ready for use in your projects</p>
          </div>
        </div>
      </section>

      {/* Design Tips Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Neumorphism Design Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Best Practices</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                <span>Use subtle shadows with moderate blur values</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                <span>Maintain consistent light direction across your design</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                <span>Use rounded corners to enhance the soft appearance</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                <span>Test on different screen sizes and resolutions</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Common Mistakes</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <span>Using too much contrast between shadows</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <span>Applying neumorphism to every element</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <span>Ignoring accessibility and contrast requirements</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <span>Using inconsistent shadow directions</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Perfect Use Cases for Neumorphism
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">UI Components</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Buttons and interactive elements
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Cards and content containers
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Form inputs and controls
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Toggle switches and sliders
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Applications</h3>
            <ul className="space-y-2 text-gray-600">
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
                Smart home control interfaces
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Music and media players
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}