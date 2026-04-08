export default function PlaceholderImageGeneratorSEOContent() {
  return (
    <div className="max-w-5xl mx-auto mt-12 mb-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          About Placeholder Image Generator
        </h2>
        
        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
          <p>
            The Placeholder Image Generator is a fast, browser-based tool for creating custom placeholder images for UI mockups, wireframes, and prototypes. Generate SVG or PNG images with custom dimensions, colors, and text labels instantly.
          </p>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Key Features</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Custom dimensions from 50×50 to 5000×5000 pixels</li>
            <li>SVG and PNG export formats</li>
            <li>Customizable background and text colors</li>
            <li>Adjustable font sizes</li>
            <li>Optional border overlay</li>
            <li>Common preset sizes (thumbnail, square, social, banner)</li>
            <li>Copy to clipboard functionality</li>
            <li>History tracking with localStorage</li>
            <li>Real-time preview updates</li>
            <li>100% browser-based, no server required</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Use Cases</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>UI/UX Design: Create placeholder images for mockups and prototypes</li>
            <li>Web Development: Generate temporary images during development</li>
            <li>Responsive Testing: Test layouts with various image dimensions</li>
            <li>Presentations: Quick placeholder images for slides</li>
            <li>Wireframing: Visual placeholders for design systems</li>
            <li>Social Media: Generate images for specific platform dimensions</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Set your desired width and height (or choose a preset)</li>
            <li>Customize the text, colors, and font size</li>
            <li>Toggle border display if needed</li>
            <li>Preview updates in real-time</li>
            <li>Download as SVG or PNG, or copy to clipboard</li>
            <li>Access recent placeholders from history</li>
          </ol>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Why SVG vs PNG?</h3>
          <p>
            <strong>SVG:</strong> Infinitely scalable, smaller file size, perfect for web. Best for responsive designs.
          </p>
          <p>
            <strong>PNG:</strong> Compatible with all design tools (Figma, Photoshop), better for direct use in designs.
          </p>
        </div>
      </div>
    </div>
  );
}
