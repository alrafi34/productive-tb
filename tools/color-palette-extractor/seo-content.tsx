import React from 'react';

export default function ColorPaletteExtractorSEOContent() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-sm mt-8">
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          What is a Color Palette Extractor?
        </h2>
        <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          A Color Palette Extractor is a powerful design tool that automatically analyzes images and extracts the most dominant colors. 
          It uses advanced color quantization algorithms like median cut and k-means clustering to identify the 5 most prominent colors 
          in any image. This tool is essential for designers, developers, and marketers who need to create cohesive color schemes based 
          on existing images, brand assets, or inspiration photos.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How Does Color Extraction Work?
        </h2>
        <div className="space-y-4 text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <p className="leading-relaxed">
            Our color palette extractor uses sophisticated algorithms to analyze your images:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Image Processing:</strong> The image is resized for optimal performance while maintaining color accuracy</li>
            <li><strong>Pixel Sampling:</strong> Strategic pixel sampling reduces processing time without sacrificing quality</li>
            <li><strong>Color Quantization:</strong> The median cut algorithm groups similar colors together</li>
            <li><strong>Dominant Color Selection:</strong> The 5 most prominent colors are extracted based on frequency and distribution</li>
            <li><strong>Format Conversion:</strong> Colors are automatically converted to HEX, RGB, and HSL formats</li>
          </ul>
          <p className="leading-relaxed">
            All processing happens entirely in your browser using the Canvas API and JavaScript, ensuring your images remain private 
            and extraction is instant.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎨 Dominant Color Extraction</h3>
            <p className="text-sm text-slate-600">
              Automatically extract the 5 most dominant colors from any image using advanced algorithms
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📤 Multiple Upload Methods</h3>
            <p className="text-sm text-slate-600">
              Upload files, drag & drop, or paste images directly from your clipboard
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎭 Palette Variations</h3>
            <p className="text-sm text-slate-600">
              Generate light, dark, saturated, and muted variations of your extracted palette
            </p>
          </div>
          
          <div className="p-4 bg-pink-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🌈 Gradient Generator</h3>
            <p className="text-sm text-slate-600">
              Automatically create beautiful CSS gradients from your color palette
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">♿ Accessibility Check</h3>
            <p className="text-sm text-slate-600">
              Check WCAG AA and AAA contrast ratios between extracted colors
            </p>
          </div>
          
          <div className="p-4 bg-cyan-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">👁️ Live UI Preview</h3>
            <p className="text-sm text-slate-600">
              Visualize your palette applied to buttons, cards, and UI components
            </p>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">💾 Multiple Export Formats</h3>
            <p className="text-sm text-slate-600">
              Export as CSS variables, SCSS, JSON, or Tailwind config
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🖼️ Download Palette Image</h3>
            <p className="text-sm text-slate-600">
              Export your color palette as a PNG image for presentations
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Use Cases
        </h2>
        <div className="space-y-4 text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">🎨 Brand Design</h3>
            <p className="leading-relaxed">
              Extract colors from logos, product photos, or brand imagery to create consistent color schemes across all marketing materials.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">🌐 Web Development</h3>
            <p className="leading-relaxed">
              Generate CSS color variables from design mockups or inspiration images to speed up your development workflow.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">📱 UI/UX Design</h3>
            <p className="leading-relaxed">
              Create harmonious color palettes for mobile apps and websites based on hero images or photography.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">🎬 Content Creation</h3>
            <p className="leading-relaxed">
              Extract colors from video thumbnails, social media graphics, or photography to maintain visual consistency.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">🖌️ Digital Art</h3>
            <p className="leading-relaxed">
              Analyze artwork and illustrations to understand color relationships and create complementary palettes.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How to Use the Color Palette Extractor
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <li className="leading-relaxed">
            <strong>Upload Your Image:</strong> Click the upload area, drag & drop an image, or paste from clipboard (Ctrl+V)
          </li>
          <li className="leading-relaxed">
            <strong>Automatic Extraction:</strong> The tool instantly analyzes your image and extracts the 5 dominant colors
          </li>
          <li className="leading-relaxed">
            <strong>View Color Details:</strong> See each color in HEX, RGB, and HSL formats with percentage distribution
          </li>
          <li className="leading-relaxed">
            <strong>Try Variations:</strong> Generate light, dark, saturated, or muted versions of your palette
          </li>
          <li className="leading-relaxed">
            <strong>Check Accessibility:</strong> Review contrast ratios to ensure WCAG compliance
          </li>
          <li className="leading-relaxed">
            <strong>Preview UI:</strong> See how your colors look on buttons, cards, and other UI elements
          </li>
          <li className="leading-relaxed">
            <strong>Export:</strong> Download your palette as CSS, SCSS, JSON, Tailwind config, or PNG image
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Understanding Color Formats
        </h2>
        <div className="space-y-4 text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">HEX (Hexadecimal)</h3>
            <p className="leading-relaxed mb-2">
              The most common format for web colors. Format: #RRGGBB where RR (red), GG (green), and BB (blue) are hexadecimal values from 00 to FF.
            </p>
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">Example: #4A90E2</code>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">RGB (Red, Green, Blue)</h3>
            <p className="leading-relaxed mb-2">
              Defines colors using red, green, and blue values from 0 to 255. Widely supported in CSS and design tools.
            </p>
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">Example: rgb(74, 144, 226)</code>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">HSL (Hue, Saturation, Lightness)</h3>
            <p className="leading-relaxed mb-2">
              More intuitive for humans. Hue (0-360°), Saturation (0-100%), Lightness (0-100%). Great for creating color variations.
            </p>
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">Example: hsl(209, 73%, 59%)</code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Tips for Best Results
        </h2>
        <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          <li>Use high-quality images with clear, distinct colors for better extraction accuracy</li>
          <li>Images with fewer colors will produce more accurate dominant color results</li>
          <li>Try different palette variations to find the perfect mood for your project</li>
          <li>Always check accessibility contrast ratios when using colors for text and backgrounds</li>
          <li>Use the gradient generator to create smooth transitions between your extracted colors</li>
          <li>Export to CSS variables for easy theme switching in your web projects</li>
          <li>Download the palette PNG for client presentations and design documentation</li>
          <li>Combine with the UI preview to see how colors work together in real interfaces</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">How accurate is the color extraction?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Our tool uses the median cut algorithm, which is highly accurate for identifying dominant colors. The algorithm analyzes 
              pixel distribution and groups similar colors together to find the most representative colors in your image.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Are my images uploaded to a server?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              No! All image processing happens entirely in your browser using JavaScript and the Canvas API. Your images never leave 
              your device, ensuring complete privacy and security.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">What image formats are supported?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              The tool supports PNG, JPEG, WEBP, and GIF formats. For GIF files, only the first frame is analyzed.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Can I extract more than 5 colors?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              The tool is optimized to extract the 5 most dominant colors, which provides the best balance between variety and usability 
              for most design projects. This number is ideal for creating cohesive color schemes.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">What are WCAG AA and AAA standards?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              WCAG (Web Content Accessibility Guidelines) defines contrast ratios for accessible design. AA requires a 4.5:1 ratio for 
              normal text, while AAA requires 7:1. Our tool automatically checks all color combinations against these standards.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">How do I use the exported CSS variables?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Add the exported CSS to your stylesheet's :root selector, then reference colors using var(--color-1), var(--color-2), etc. 
              This makes it easy to maintain consistent colors across your entire website.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Can I use this tool for commercial projects?</h3>
            <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Yes! The Color Palette Extractor is completely free to use for both personal and commercial projects. Extract colors from 
              any image and use them in your designs without restrictions.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Color Theory and Palette Creation
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          Understanding color relationships helps you make the most of extracted palettes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          <li><strong>Complementary Colors:</strong> Colors opposite on the color wheel create high contrast and visual interest</li>
          <li><strong>Analogous Colors:</strong> Colors next to each other create harmonious, cohesive designs</li>
          <li><strong>Triadic Colors:</strong> Three colors evenly spaced on the color wheel provide balanced variety</li>
          <li><strong>Monochromatic:</strong> Variations of a single hue create sophisticated, unified designs</li>
          <li><strong>60-30-10 Rule:</strong> Use 60% dominant color, 30% secondary, and 10% accent for balanced designs</li>
        </ul>
      </section>
    </div>
  );
}
