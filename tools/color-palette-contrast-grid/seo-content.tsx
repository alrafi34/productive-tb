import React from 'react';

export default function ColorPaletteContrastGridSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding WCAG Color Contrast Standards
        </h2>
        <p className="text-gray-700 mb-4">
          The Web Content Accessibility Guidelines (WCAG) define specific contrast ratios that ensure text is readable for users with visual impairments. These standards help create inclusive designs that work for everyone, including users with color blindness, low vision, or other visual disabilities.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">AAA Level (7:1)</h3>
            <p className="text-green-700 text-sm">
              The highest standard for normal text. Provides excellent readability for all users.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">AA Level (4.5:1)</h3>
            <p className="text-blue-700 text-sm">
              The minimum standard for normal text. Required for WCAG compliance in most cases.
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Large Text (3:1)</h3>
            <p className="text-yellow-700 text-sm">
              Lower requirement for large text (18pt+ or 14pt+ bold). Easier to read at larger sizes.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Use the Color Palette Contrast Grid
        </h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">1. Build Your Color Palette</h3>
            <p className="text-gray-700 text-sm">
              Add colors to your palette using the color picker or by entering HEX values. You can also use preset palettes from popular design systems like Material Design, Tailwind, or Bootstrap.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">2. Review the Contrast Grid</h3>
            <p className="text-gray-700 text-sm">
              The grid automatically shows every possible text and background color combination from your palette. Each cell displays the contrast ratio and WCAG compliance level with color-coded indicators.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">3. Filter and Sort Results</h3>
            <p className="text-gray-700 text-sm">
              Use the filter options to show only accessible combinations or sort by contrast ratio to find the best and worst performing pairs in your palette.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">4. Inspect Color Pairs</h3>
            <p className="text-gray-700 text-sm">
              Click on any grid cell to see detailed information about that color combination, including the exact contrast ratio and ready-to-use CSS code.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">5. Export Your Palette</h3>
            <p className="text-gray-700 text-sm">
              Export your color palette as CSS variables, SCSS variables, or design tokens for use in your development workflow.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          WCAG Compliance Levels Explained
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Normal Text Requirements</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>AAA Compliance:</span>
                <span className="font-mono">≥ 7:1 contrast ratio</span>
              </div>
              <div className="flex justify-between">
                <span>AA Compliance:</span>
                <span className="font-mono">≥ 4.5:1 contrast ratio</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum for large text:</span>
                <span className="font-mono">≥ 3:1 contrast ratio</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Large Text Requirements</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>AAA Compliance:</span>
                <span className="font-mono">≥ 4.5:1 contrast ratio</span>
              </div>
              <div className="flex justify-between">
                <span>AA Compliance:</span>
                <span className="font-mono">≥ 3:1 contrast ratio</span>
              </div>
              <p className="text-gray-600 mt-2">
                Large text is defined as 18pt (24px) or larger, or 14pt (18.5px) or larger if bold.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Color Contrast Calculation Method
        </h2>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Relative Luminance Formula</h3>
          <p className="text-purple-700 mb-4">
            Contrast ratios are calculated using the relative luminance of colors as defined by WCAG 2.1. The formula considers how the human eye perceives different colors and brightness levels.
          </p>
          
          <div className="bg-purple-100 p-4 rounded">
            <h4 className="font-medium mb-2">Calculation Steps:</h4>
            <ol className="text-sm space-y-1">
              <li>1. Convert colors from HEX to RGB values</li>
              <li>2. Calculate relative luminance for each color</li>
              <li>3. Apply gamma correction for accurate perception</li>
              <li>4. Calculate contrast ratio: (L1 + 0.05) / (L2 + 0.05)</li>
              <li>5. Compare result against WCAG thresholds</li>
            </ol>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Best Practices for Accessible Color Design
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Design System Planning</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Test all color combinations early in the design process</li>
              <li>• Create a contrast matrix for your brand colors</li>
              <li>• Document which combinations are safe to use</li>
              <li>• Consider both light and dark mode variations</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Implementation Tips</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Use semantic color names in your CSS variables</li>
              <li>• Test with actual content, not just placeholder text</li>
              <li>• Consider users with different types of color blindness</li>
              <li>• Provide alternative indicators beyond color alone</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Common Mistakes</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Relying only on color to convey information</li>
              <li>• Not testing with different screen brightness levels</li>
              <li>• Ignoring contrast in interactive states (hover, focus)</li>
              <li>• Using low contrast for "subtle" design elements</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Testing Methods</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Use automated contrast checking tools</li>
              <li>• Test with screen readers and assistive technology</li>
              <li>• Simulate different types of color blindness</li>
              <li>• Get feedback from users with visual impairments</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Popular Design System Color Palettes
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Material Design</h3>
            <p className="text-gray-700 text-sm mb-2">
              Google's Material Design system provides carefully tested color combinations with built-in accessibility considerations. The palette includes primary, secondary, and surface colors that work well together.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Tailwind CSS</h3>
            <p className="text-gray-700 text-sm mb-2">
              Tailwind's color palette offers a wide range of hues with multiple shades. The numbered system (50-900) makes it easy to find contrasting pairs within the same color family.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Bootstrap</h3>
            <p className="text-gray-700 text-sm mb-2">
              Bootstrap's semantic color system (primary, secondary, success, danger, etc.) provides meaningful color relationships that work well for UI components and messaging.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Legal and Compliance Considerations
        </h2>
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">Accessibility Requirements</h3>
          <p className="text-red-700 mb-4">
            Many jurisdictions require digital accessibility compliance for public websites and services. WCAG AA compliance is often the legal minimum standard.
          </p>
          
          <div className="space-y-2 text-sm">
            <div><strong>United States:</strong> Section 508, ADA compliance requirements</div>
            <div><strong>European Union:</strong> EN 301 549 accessibility standard</div>
            <div><strong>Canada:</strong> AODA (Accessibility for Ontarians with Disabilities Act)</div>
            <div><strong>Australia:</strong> DDA (Disability Discrimination Act) requirements</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Why do some color combinations show different results for normal vs. large text?</h3>
            <p className="text-gray-700 text-sm">
              WCAG recognizes that larger text is easier to read, so it has lower contrast requirements. Text that's 18pt+ (or 14pt+ bold) only needs a 3:1 ratio for AA compliance instead of 4.5:1.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Should I always aim for AAA compliance?</h3>
            <p className="text-gray-700 text-sm">
              While AAA provides the best accessibility, AA compliance is usually sufficient and more practical. AAA can be challenging to achieve with brand colors and may limit design flexibility.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How do I handle brand colors that don't meet contrast requirements?</h3>
            <p className="text-gray-700 text-sm">
              Consider using brand colors for decorative elements and creating accessible variations for text. You can also use techniques like outlines, shadows, or background overlays to improve contrast.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Do these standards apply to images and icons?</h3>
            <p className="text-gray-700 text-sm">
              WCAG contrast requirements primarily apply to text. However, important graphical elements like icons that convey information should also meet contrast standards when possible.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Advanced Accessibility Techniques
        </h2>
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h3 className="font-semibold text-indigo-800 mb-2">Beyond Basic Contrast</h3>
          <p className="text-indigo-700 mb-4">
            While contrast ratios are important, comprehensive accessibility involves additional considerations:
          </p>
          
          <ul className="space-y-2 text-sm text-indigo-700">
            <li>• <strong>Focus indicators:</strong> Ensure interactive elements have visible focus states</li>
            <li>• <strong>Color independence:</strong> Don't rely solely on color to convey information</li>
            <li>• <strong>Motion sensitivity:</strong> Provide options to reduce animations and transitions</li>
            <li>• <strong>Text alternatives:</strong> Include alt text and ARIA labels where appropriate</li>
            <li>• <strong>Keyboard navigation:</strong> Ensure all functionality is keyboard accessible</li>
          </ul>
        </div>
      </section>
    </div>
  );
}