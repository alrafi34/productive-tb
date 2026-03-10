export default function ContrastCheckerSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the WCAG Contrast Checker
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Select your text color using the color picker or hex input</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Choose your background color</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Adjust font size to test different text sizes</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Check WCAG compliance results and copy the report</span>
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
                Real-time contrast calculation
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                WCAG 2.1 AA and AAA compliance
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Live text preview
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Multiple color format support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Accessibility suggestions
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Ready-made color presets
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* WCAG Standards Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Understanding WCAG Contrast Standards
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">WCAG 2.1 Levels</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Level AA (Minimum)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Normal text: 4.5:1 contrast ratio</li>
                  <li>• Large text: 3:1 contrast ratio</li>
                  <li>• Required for most websites</li>
                  <li>• Legal compliance standard</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Level AAA (Enhanced)</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Normal text: 7:1 contrast ratio</li>
                  <li>• Large text: 4.5:1 contrast ratio</li>
                  <li>• Highest accessibility standard</li>
                  <li>• Recommended for critical content</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Text Size Definitions</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Normal Text</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Less than 18pt (24px)</li>
                  <li>• Less than 14pt (18.7px) bold</li>
                  <li>• Requires higher contrast ratios</li>
                  <li>• Most body text falls here</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Large Text</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 18pt (24px) or larger</li>
                  <li>• 14pt (18.7px) bold or larger</li>
                  <li>• Lower contrast requirements</li>
                  <li>• Headers and large UI elements</li>
                </ul>
              </div>
            </div>
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
              What is color contrast and why does it matter?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Color contrast is the difference in luminance between foreground text and background colors. 
              Good contrast ensures that text is readable for everyone, including people with visual impairments, 
              color blindness, or those viewing content in bright sunlight.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What's the difference between AA and AAA compliance?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              AA is the minimum legal standard for web accessibility, requiring 4.5:1 contrast for normal text. 
              AAA is the enhanced standard requiring 7:1 contrast, providing better accessibility for users with 
              more severe visual impairments. Most websites aim for AA compliance.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How is the contrast ratio calculated?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Contrast ratio is calculated using the WCAG formula: (L1 + 0.05) / (L2 + 0.05), where L1 is the 
              relative luminance of the lighter color and L2 is the relative luminance of the darker color. 
              The result ranges from 1:1 (no contrast) to 21:1 (maximum contrast).
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Do I need to check every color combination on my website?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes, you should check all text and background color combinations, including buttons, links, form inputs, 
              and any text overlays on images. Don't forget to test different states like hover, focus, and active states.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What if my brand colors don't meet WCAG standards?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You can still use your brand colors for decorative elements, but ensure text has sufficient contrast. 
              Consider using darker or lighter variations of your brand colors for text, or add background overlays 
              to improve contrast while maintaining brand identity.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Are there legal requirements for color contrast?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Many countries have laws requiring digital accessibility. In the US, Section 508 and ADA compliance 
              often reference WCAG standards. The EU has similar requirements. AA level compliance is typically 
              the minimum legal standard for public and commercial websites.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our Contrast Checker?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
            <p className="text-gray-600 text-sm">Get immediate WCAG compliance feedback as you adjust colors</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">Accurate Calculations</h3>
            <p className="text-gray-600 text-sm">Uses official WCAG 2.1 formula for precise contrast measurements</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Suggestions</h3>
            <p className="text-gray-600 text-sm">Get automatic color suggestions to meet accessibility standards</p>
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Color Contrast Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Design Guidelines</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                <span>Test contrast early in the design process</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                <span>Don't rely on color alone to convey information</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                <span>Consider different viewing conditions and devices</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></span>
                <span>Test with actual users who have visual impairments</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Common Mistakes</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <span>Using light gray text on white backgrounds</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <span>Placing text directly over busy background images</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <span>Ignoring link and button hover states</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <span>Assuming brand colors automatically work for text</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tools Integration Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Accessibility Testing Workflow
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Design Phase</h4>
              <p className="text-gray-600 text-sm">Use this contrast checker during design to ensure color choices meet accessibility standards from the start.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Development Phase</h4>
              <p className="text-gray-600 text-sm">Test all interactive states (hover, focus, active) and dynamic content to maintain accessibility.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Testing Phase</h4>
              <p className="text-gray-600 text-sm">Validate final implementation with automated tools and manual testing across different devices and conditions.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}