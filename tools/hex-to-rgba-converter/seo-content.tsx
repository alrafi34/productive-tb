export default function HexToRgbaConverterSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          About HEX to RGBA Converter
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The HEX to RGBA Converter is a powerful, fast, and developer-friendly tool that converts HEX color codes 
          into RGBA values with full alpha transparency control. Perfect for web designers, front-end developers, 
          and UI/UX professionals who need precise color control with transparency.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Key Features
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Instant Conversion:</strong> Convert HEX to RGBA in real-time with zero lag</li>
          <li><strong>Alpha Transparency Slider:</strong> Smooth slider control from 0 to 1 with 0.01 precision</li>
          <li><strong>Dual Preview Panels:</strong> See your color on solid and transparent backgrounds</li>
          <li><strong>Multiple Output Formats:</strong> Get RGBA, RGB, HEX, HEX with Alpha, HSLA, and HSL</li>
          <li><strong>Color Shade Generator:</strong> Automatically generate lighter and darker variations</li>
          <li><strong>Opacity Scale:</strong> Full opacity scale from 100% to 0% for design systems</li>
          <li><strong>Gradient Generator:</strong> Create transparent gradients for overlays and fades</li>
          <li><strong>CSS Utilities:</strong> Generate ready-to-use CSS classes with opacity variants</li>
          <li><strong>Smart Validation:</strong> Instant feedback for invalid HEX codes</li>
          <li><strong>Local Storage:</strong> Automatically saves your last used color</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use
        </h2>
        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
          <li>Enter a HEX color code (supports #RGB, #RRGGBB, or #RRGGBBAA formats)</li>
          <li>Use the color picker for visual selection</li>
          <li>Adjust the alpha transparency slider to control opacity</li>
          <li>View live previews on solid and transparent backgrounds</li>
          <li>Copy any output format with one click</li>
          <li>Explore color shades, opacity scales, gradients, and CSS utilities in tabs</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Supported HEX Formats
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>#RGB:</strong> 3-digit shorthand (e.g., #f00 = #ff0000)</li>
          <li><strong>#RRGGBB:</strong> Standard 6-digit format (e.g., #3498db)</li>
          <li><strong>#RRGGBBAA:</strong> 8-digit format with alpha channel (e.g., #3498dbcc)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Use Cases
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Web Design:</strong> Create transparent overlays, modals, and UI elements</li>
          <li><strong>CSS Development:</strong> Generate RGBA values for modern CSS properties</li>
          <li><strong>Design Systems:</strong> Build consistent opacity scales for brand colors</li>
          <li><strong>UI/UX:</strong> Test color accessibility and contrast with transparency</li>
          <li><strong>Gradient Design:</strong> Create smooth transparent gradients for hero sections</li>
          <li><strong>Utility Classes:</strong> Generate Tailwind-style CSS utilities for projects</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use RGBA?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          RGBA (Red, Green, Blue, Alpha) is a CSS color format that extends RGB by adding an alpha channel 
          for transparency control. Unlike opacity which affects the entire element, RGBA only affects the 
          color itself, making it perfect for:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li>Transparent backgrounds without affecting text</li>
          <li>Layered UI elements with precise opacity</li>
          <li>Smooth color transitions and gradients</li>
          <li>Modern glassmorphism and neumorphism effects</li>
          <li>Accessible design with proper contrast ratios</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Advanced Features
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Color Shade Generator</h3>
            <p>Automatically generates 20% lighter, 10% lighter, 10% darker, and 20% darker variations 
            of your color, perfect for hover states and UI variations.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Opacity Scale</h3>
            <p>Creates a complete opacity scale from 100% to 0% in 10% increments, ideal for building 
            design systems and maintaining consistency across projects.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Transparent Gradient</h3>
            <p>Generates CSS linear gradients that fade from solid to transparent, commonly used for 
            image overlays, hero sections, and fade effects.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">CSS Utility Generator</h3>
            <p>Creates ready-to-use CSS utility classes for background, text, and border colors with 
            opacity variants (100, 90, 80, 70, 60, 50, 40, 30, 20, 10).</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Performance & Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This tool runs entirely in your browser using vanilla JavaScript. No data is sent to any server, 
          ensuring complete privacy. All calculations happen instantly on your device with zero lag, even 
          on low-end hardware. The tool uses local storage only to save your last used color for convenience.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Browser Compatibility
        </h2>
        <p className="text-gray-700 leading-relaxed">
          RGBA colors are supported in all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. 
          The format has been part of the CSS3 specification since 2011 and is widely used in production websites.
        </p>
      </section>
    </div>
  );
}
