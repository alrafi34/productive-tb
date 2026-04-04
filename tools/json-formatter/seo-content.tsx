import { toolConfig } from "./config";

export default function JSONFormatterSEOContent() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": toolConfig.name,
    "description": toolConfig.description,
    "url": `https://productivetoolbox.com/tools/developer/${toolConfig.slug}`,
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2500"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="max-w-4xl mx-auto px-4 py-16 text-gray-700">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              What is a JSON Formatter?
            </h2>
            <p className="mb-4">
              A JSON Formatter is a developer tool that helps you format, validate, and beautify JSON data instantly in your browser. Whether you're working with API responses, configuration files, or data structures, this tool makes it easy to read, understand, and debug JSON.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Key Features
            </h2>
            <ul className="space-y-2">
              {toolConfig.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              How to Use
            </h2>
            <ol className="space-y-3 list-decimal list-inside">
              <li>Paste your JSON data into the editor or upload a .json file</li>
              <li>The tool automatically validates your JSON in real-time</li>
              <li>Click "Beautify" to format with proper indentation</li>
              <li>Use "Minify" to compress JSON for production</li>
              <li>Switch to "Tree View" to explore nested structures</li>
              <li>Copy or download your formatted JSON</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Why Use This Tool?
            </h2>
            <ul className="space-y-2">
              <li>✓ <strong>100% Free</strong> - No registration or payment required</li>
              <li>✓ <strong>Privacy First</strong> - All processing happens in your browser</li>
              <li>✓ <strong>Fast & Responsive</strong> - Instant formatting and validation</li>
              <li>✓ <strong>Developer Friendly</strong> - Perfect for API debugging</li>
              <li>✓ <strong>Mobile Optimized</strong> - Works on all devices</li>
              <li>✓ <strong>No Dependencies</strong> - Pure JavaScript, no external APIs</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Common Use Cases
            </h2>
            <ul className="space-y-2">
              <li>🔍 <strong>API Response Debugging</strong> - Format messy API responses for easier reading</li>
              <li>✅ <strong>JSON Validation</strong> - Check if your JSON is valid before deployment</li>
              <li>📦 <strong>Data Compression</strong> - Minify JSON to reduce file size</li>
              <li>🌳 <strong>Structure Exploration</strong> - Visualize nested JSON with tree view</li>
              <li>⚙️ <strong>Configuration Files</strong> - Format and validate config files</li>
              <li>🔄 <strong>Data Transformation</strong> - Convert between formatted and minified JSON</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Tips & Tricks
            </h2>
            <ul className="space-y-2">
              <li>💡 Drag and drop JSON files directly into the editor</li>
              <li>💡 Use different indentation sizes (2 spaces, 4 spaces, or tabs)</li>
              <li>💡 Tree view is perfect for exploring deeply nested structures</li>
              <li>💡 Copy formatted or minified JSON with one click</li>
              <li>💡 Download your formatted JSON as a file</li>
              <li>💡 Works with large JSON files (several MB)</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
