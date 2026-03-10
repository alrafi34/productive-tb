export default function ColorPaletteGeneratorSEOContent() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Use the Color Palette Generator</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Quick Start Guide</h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Enter a base color using HEX code or select visually with the color picker</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Choose a palette type: Analogous, Complementary, Triadic, Monochromatic, Tetradic, or Random</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Click Generate Palette to create 5 harmonious colors based on color theory</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Lock colors you like and regenerate to keep them while changing others</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Multiple color harmony algorithms</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Lock individual colors</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>WCAG contrast checker</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Gradient preview generator</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Export to CSS/SCSS/JSON/Tailwind</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Copy HEX, RGB, HSL values</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">What is a color palette generator?</h3>
            <p className="text-gray-600 leading-relaxed">A color palette generator is a free online tool that creates harmonious color schemes based on color theory principles. It generates 3-5 colors that work well together for design projects, websites, branding, and UI/UX work.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">What are the different palette types?</h3>
            <p className="text-gray-600 leading-relaxed">Our generator supports Analogous (adjacent colors on the wheel), Complementary (opposite colors), Triadic (three evenly spaced colors), Monochromatic (shades of one color), Tetradic (four colors forming a rectangle), and Random palettes for creative exploration.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I lock colors in my palette?</h3>
            <p className="text-gray-600 leading-relaxed">Hover over any color block and click the lock icon. Locked colors stay the same when you regenerate the palette, allowing you to keep colors you like while exploring new combinations for the unlocked positions.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Can I export palettes for my design tools?</h3>
            <p className="text-gray-600 leading-relaxed">Yes! Export your palette as CSS variables, SCSS variables, JSON format, or Tailwind config. Simply click the copy button next to your preferred format and paste it directly into your project files.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">What is the accessibility checker?</h3>
            <p className="text-gray-600 leading-relaxed">The accessibility checker displays the contrast ratio between the first two colors in your palette and indicates if it meets WCAG AA (4.5:1) or AAA (7:1) standards for text readability, ensuring your designs are accessible to all users.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Is this color palette generator free?</h3>
            <p className="text-gray-600 leading-relaxed">Yes, this online color palette generator is completely free with no registration required. Generate unlimited palettes, export in any format, and use them in your personal or commercial projects without restrictions.</p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Use Our Color Palette Generator?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Generation</h3>
            <p className="text-gray-600 text-sm">Generate beautiful color palettes instantly based on proven color theory algorithms</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">Professional Tools</h3>
            <p className="text-gray-600 text-sm">Lock colors, check accessibility, preview gradients, and export to any format</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Works Everywhere</h3>
            <p className="text-gray-600 text-sm">Fully responsive design works on desktop, tablet, and mobile devices</p>
          </div>
        </div>
      </section>
    </>
  );
}
