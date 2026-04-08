export default function CSSTriangleGeneratorSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-gray">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          CSS Triangle Generator - Create Pure CSS Arrows & Shapes
        </h2>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Generate pure CSS triangles for tooltips, arrows, dropdown indicators, speech bubbles, and UI decorations. 
            Our CSS Triangle Generator uses the border trick technique to create triangles with zero width and height, 
            making them perfect for modern web design.
          </p>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              How CSS Triangles Work
            </h3>
            <p>
              CSS triangles are created using the border property trick. By setting width and height to 0 and using 
              transparent borders on three sides with a colored border on one side, you can create triangle shapes 
              pointing in any direction. This technique is widely used for tooltips, dropdown arrows, and speech bubble pointers.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Common Use Cases
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Tooltip Arrows:</strong> Point to specific elements with triangle indicators</li>
              <li><strong>Dropdown Menus:</strong> Create arrow indicators for expandable content</li>
              <li><strong>Speech Bubbles:</strong> Add pointer tails to chat messages and callouts</li>
              <li><strong>Card Decorations:</strong> Enhance UI cards with geometric triangle accents</li>
              <li><strong>Navigation Elements:</strong> Create directional arrows for pagination and breadcrumbs</li>
              <li><strong>Progress Indicators:</strong> Use triangles as step markers in multi-step processes</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Triangle Direction Guide
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Upward Triangle (Top)</h4>
                <p className="text-sm">Perfect for tooltips that appear below elements, dropdown indicators, and upward-pointing arrows.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Downward Triangle (Bottom)</h4>
                <p className="text-sm">Ideal for tooltips above elements, menu dropdowns, and downward navigation arrows.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Left Triangle</h4>
                <p className="text-sm">Great for side tooltips, previous buttons, and left-pointing navigation elements.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Right Triangle</h4>
                <p className="text-sm">Perfect for next buttons, right-side tooltips, and forward navigation indicators.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Size Recommendations
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2 text-sm">
                <li><strong>Small (20×15px):</strong> Subtle indicators and small UI elements</li>
                <li><strong>Medium (40×30px):</strong> Standard tooltips and dropdown arrows</li>
                <li><strong>Large (60×45px):</strong> Prominent navigation arrows and decorative elements</li>
                <li><strong>Tooltip (16×8px):</strong> Optimized for tooltip pointers</li>
                <li><strong>Arrow (24×12px):</strong> Perfect for button arrows and indicators</li>
                <li><strong>Pointer (32×24px):</strong> Ideal for speech bubble tails</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Implementation Tips
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Use relative positioning to precisely place triangles next to other elements</li>
              <li>Combine with pseudo-elements (::before, ::after) for cleaner HTML structure</li>
              <li>Consider using CSS custom properties for dynamic color theming</li>
              <li>Test triangle visibility against different background colors</li>
              <li>Use transform properties for rotation and advanced positioning</li>
              <li>Ensure triangles scale properly on different screen sizes</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Browser Compatibility
            </h3>
            <p>
              CSS triangles using the border technique are supported in all modern browsers including Chrome, Firefox, 
              Safari, Edge, and Internet Explorer 9+. This makes them a reliable choice for cross-browser compatible 
              UI elements without requiring additional JavaScript or image assets.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
            <p className="text-blue-800 text-sm">
              For responsive designs, consider using viewport units (vw, vh) or em units instead of fixed pixels 
              to ensure your triangles scale appropriately across different screen sizes and zoom levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}