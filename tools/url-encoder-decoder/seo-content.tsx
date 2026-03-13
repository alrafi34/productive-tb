import React from 'react';

export default function URLEncoderSEO() {
  return (
    <div className="space-y-12 py-12 border-t border-gray-200">
      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">What is URL Encoding?</h2>
        <p className="text-gray-600 leading-relaxed">
          URL encoding (also called percent encoding) is a mechanism for encoding information in a URL. It is used to convert characters that have special meaning in URLs into a format that can be safely transmitted over the internet. When you have special characters in a URL, they need to be encoded using the percent sign (%) followed by two hexadecimal digits.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">Why Use URL Encoding?</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex gap-3">
            <span className="text-primary font-black">✓</span>
            <span><strong>Reserved Characters:</strong> Some characters like ?, &, =, and # have special meanings in URLs and must be encoded when used as data.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-black">✓</span>
            <span><strong>Unsafe Characters:</strong> Spaces and other characters cannot be transmitted directly in URLs and must be encoded.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-black">✓</span>
            <span><strong>International Characters:</strong> Non-ASCII characters must be encoded to ensure compatibility across systems.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary font-black">✓</span>
            <span><strong>API Compatibility:</strong> Many APIs require URL-encoded parameters for proper data transmission.</span>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">Common URL Encoding Examples</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900">Space</h3>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-600">Plain: hello world</div>
              <div className="text-primary font-bold">Encoded: hello%20world</div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900">Question Mark</h3>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-600">Plain: what?</div>
              <div className="text-primary font-bold">Encoded: what%3F</div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900">Ampersand</h3>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-600">Plain: a&b</div>
              <div className="text-primary font-bold">Encoded: a%26b</div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900">Equals Sign</h3>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-600">Plain: key=value</div>
              <div className="text-primary font-bold">Encoded: key%3Dvalue</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">encodeURI vs encodeURIComponent</h2>
        <div className="space-y-4 text-gray-600">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">encodeURI()</h3>
            <p>Used for encoding complete URLs. It does NOT encode reserved characters like :, /, ?, #, &, =, which are needed for URL structure.</p>
            <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mt-2">
              encodeURI("https://example.com/search?q=hello world")
              <br/>
              → https://example.com/search?q=hello%20world
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">encodeURIComponent()</h3>
            <p>Used for encoding URL components (query parameters, path segments). It encodes ALL special characters including :, /, ?, #, &, =.</p>
            <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mt-2">
              encodeURIComponent("hello world")
              <br/>
              → hello%20world
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">How to Use This Tool</h2>
        <ol className="space-y-4 text-gray-600">
          <li className="flex gap-3">
            <span className="font-black text-primary flex-shrink-0">1.</span>
            <span><strong>Paste Your Content:</strong> Enter a URL, query string, or text in the input field.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-black text-primary flex-shrink-0">2.</span>
            <span><strong>Select Mode:</strong> Choose between Encode, Decode, or Auto Detect mode.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-black text-primary flex-shrink-0">3.</span>
            <span><strong>Choose Method:</strong> Select encodeURI for full URLs or encodeURIComponent for URL components.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-black text-primary flex-shrink-0">4.</span>
            <span><strong>Get Results:</strong> The output updates automatically as you type, or click Encode/Decode for manual processing.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-black text-primary flex-shrink-0">5.</span>
            <span><strong>Copy Output:</strong> Click the Copy button to copy the result to your clipboard.</span>
          </li>
        </ol>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">Advanced Features</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">🔍 Query Parameter Viewer</h3>
            <p className="text-gray-600">Automatically extracts and displays all query parameters from your URL.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">🔗 URL Breakdown</h3>
            <p className="text-gray-600">Shows the components of your URL: protocol, domain, path, query, and fragment.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">📊 Character Encoding Table</h3>
            <p className="text-gray-600">Reference table showing common characters and their percent-encoded equivalents.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">📋 History Tracking</h3>
            <p className="text-gray-600">Keeps track of your recent encodings and decodings for quick access.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">⌨️ Keyboard Shortcuts</h3>
            <p className="text-gray-600">Use Ctrl+Enter to encode, Ctrl+Shift+D to decode, and Ctrl+L to clear.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">🌙 Dark Mode</h3>
            <p className="text-gray-600">Toggle between light and dark themes for comfortable viewing.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gray-900">Use Cases</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            <strong>Web Development:</strong> Encode query parameters when building URLs dynamically in JavaScript or other languages.
          </p>
          <p>
            <strong>API Integration:</strong> Prepare data for API requests that require URL-encoded parameters.
          </p>
          <p>
            <strong>SEO & Analytics:</strong> Decode tracking URLs to understand what parameters are being passed.
          </p>
          <p>
            <strong>Debugging:</strong> Decode error messages or logs that contain encoded URLs to understand what went wrong.
          </p>
          <p>
            <strong>Data Migration:</strong> Convert between encoded and decoded formats when moving data between systems.
          </p>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 space-y-4">
        <h3 className="text-xl font-black text-gray-900">Ready to Encode or Decode URLs?</h3>
        <p className="text-gray-600">
          Start using this free URL Encoder/Decoder tool today. No signup required, no server processing, 100% browser-based. Perfect for developers, testers, and anyone working with URLs!
        </p>
      </div>
    </div>
  );
}
