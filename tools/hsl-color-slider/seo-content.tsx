import React from 'react';

export default function HSLColorSliderSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding HSL Color Model
        </h2>
        <p className="text-gray-700 mb-4">
          HSL (Hue, Saturation, Lightness) is an intuitive color model that represents colors in a way that closely matches human perception. Unlike RGB or HEX, HSL separates color information into three distinct components, making it easier to understand and manipulate colors for design purposes.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Hue (0-360°)</h3>
            <p className="text-red-700 text-sm">
              Represents the color type on the color wheel. 0° is red, 120° is green, 240° is blue.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Saturation (0-100%)</h3>
            <p className="text-blue-700 text-sm">
              Controls color intensity. 0% is grayscale, 100% is full color vibrancy.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Lightness (0-100%)</h3>
            <p className="text-green-700 text-sm">
              Determines brightness. 0% is black, 50% is normal, 100% is white.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the HSL Color Slider
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">1. Adjust the Sliders</h3>
            <p className="text-gray-700">
              Use the three interactive sliders to modify hue, saturation, and lightness values. The color preview updates in real-time as you make adjustments.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">2. Input Precise Values</h3>
            <p className="text-gray-700">
              Enter specific numeric values in the input fields for precise color control. Values automatically sync with the sliders.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">3. Copy Color Formats</h3>
            <p className="text-gray-700">
              Get your color in HSL, HEX, or RGB format with one-click copy buttons. Perfect for CSS, design software, or documentation.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">4. Generate Color Palettes</h3>
            <p className="text-gray-700">
              Create harmonious color schemes using analogous, triadic, tetradic, monochromatic, or complementary color relationships.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Color Theory and Palette Types
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Analogous Colors</h3>
            <p className="text-gray-700">
              Colors that are adjacent on the color wheel (within 30° of each other). They create harmonious, pleasing combinations often found in nature.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Triadic Colors</h3>
            <p className="text-gray-700">
              Three colors evenly spaced around the color wheel (120° apart). This scheme offers strong visual contrast while maintaining harmony.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Complementary Colors</h3>
            <p className="text-gray-700">
              Colors directly opposite each other on the color wheel (180° apart). They create maximum contrast and vibrant, eye-catching designs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Monochromatic Colors</h3>
            <p className="text-gray-700">
              Variations of a single hue using different saturation and lightness values. Creates sophisticated, cohesive color schemes.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Practical Applications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Web Development</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• CSS color properties and variables</li>
              <li>• Theme color selection</li>
              <li>• Accessibility-compliant color choices</li>
              <li>• Responsive design color schemes</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Graphic Design</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Brand color palette development</li>
              <li>• Print and digital media colors</li>
              <li>• Logo and identity design</li>
              <li>• Marketing material color schemes</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">UI/UX Design</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Interface color systems</li>
              <li>• Button and component styling</li>
              <li>• Visual hierarchy through color</li>
              <li>• User experience optimization</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Digital Art</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Color mixing and blending</li>
              <li>• Mood and atmosphere creation</li>
              <li>• Character and environment design</li>
              <li>• Digital painting techniques</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What's the difference between HSL and RGB?</h3>
            <p className="text-gray-700">
              RGB uses red, green, and blue light values, while HSL uses hue, saturation, and lightness. HSL is more intuitive for humans as it separates color (hue) from intensity (saturation) and brightness (lightness).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How do I choose colors for accessibility?</h3>
            <p className="text-gray-700">
              Ensure sufficient contrast between text and background colors. Use our WCAG contrast checker tool alongside this HSL slider to verify accessibility compliance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Can I use HSL colors in all browsers?</h3>
            <p className="text-gray-700">
              Yes, HSL color format is supported in all modern browsers. It's part of the CSS3 specification and widely adopted across web development.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How do I create a professional color palette?</h3>
            <p className="text-gray-700">
              Start with a base color that represents your brand or design goal. Use our palette generators to create harmonious combinations, then adjust saturation and lightness for different use cases.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tips for Better Color Selection
        </h2>
        <div className="bg-blue-50 p-6 rounded-lg">
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Start with hue:</strong> Choose the basic color family first, then adjust saturation and lightness</li>
            <li>• <strong>Consider context:</strong> Colors appear different depending on surrounding colors and lighting</li>
            <li>• <strong>Test on devices:</strong> Colors may look different on various screens and devices</li>
            <li>• <strong>Use the 60-30-10 rule:</strong> 60% dominant color, 30% secondary, 10% accent color</li>
            <li>• <strong>Save your favorites:</strong> Use the color history feature to track successful color combinations</li>
            <li>• <strong>Export for teams:</strong> Use the export feature to share color data with team members</li>
          </ul>
        </div>
      </section>
    </div>
  );
}