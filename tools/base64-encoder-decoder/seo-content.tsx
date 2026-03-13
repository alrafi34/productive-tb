export default function Base64EncoderDecoderSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          About Base64 Encoder/Decoder
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The Base64 Encoder/Decoder is a fast, browser-based utility for converting text to Base64 format 
          and decoding Base64 back to readable text. Base64 encoding is essential for web development, APIs, 
          email attachments, data URLs, and authentication headers. This tool handles all conversions instantly 
          in your browser with no server required.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Key Features
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Encode to Base64:</strong> Convert any text to Base64 format instantly</li>
          <li><strong>Decode from Base64:</strong> Convert Base64 strings back to readable text</li>
          <li><strong>Auto-Detect Mode:</strong> Automatically detect whether input is Base64 or plain text</li>
          <li><strong>File Upload:</strong> Upload .txt, .json, .csv, or .xml files to encode</li>
          <li><strong>Drag & Drop:</strong> Drop files directly into the input area</li>
          <li><strong>Live Preview:</strong> See results instantly as you type</li>
          <li><strong>Character Counter:</strong> Track input and output character counts</li>
          <li><strong>Size Comparison:</strong> View original vs encoded file size</li>
          <li><strong>Swap Function:</strong> Quickly reverse input and output</li>
          <li><strong>Copy to Clipboard:</strong> One-click copying with visual feedback</li>
          <li><strong>Conversion History:</strong> Save last 20 conversions locally</li>
          <li><strong>Export Options:</strong> Download as TXT or save history as JSON</li>
          <li><strong>Keyboard Shortcuts:</strong> Ctrl+Enter to convert, Ctrl+C to copy</li>
          <li><strong>Large Text Support:</strong> Handle 100,000+ characters efficiently</li>
          <li><strong>100% Client-Side:</strong> All processing happens in your browser</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use
        </h2>
        <ol className="space-y-3 text-gray-700 list-decimal list-inside">
          <li>
            <strong>Choose Conversion Mode:</strong> Select "Encode" to convert text to Base64, "Decode" to 
            convert Base64 to text, or "Auto Detect" to let the tool decide automatically.
          </li>
          <li>
            <strong>Enter or Upload Text:</strong> Paste text in the input area or upload a file using the 
            upload button or drag & drop.
          </li>
          <li>
            <strong>View Results:</strong> The converted text appears instantly in the output panel.
          </li>
          <li>
            <strong>Copy Output:</strong> Click the "Copy" button to copy the result to your clipboard.
          </li>
          <li>
            <strong>Swap Input/Output:</strong> Use the "Swap" button to reverse the input and output for 
            quick decoding workflows.
          </li>
          <li>
            <strong>Export Results:</strong> Download the output as a .txt file or save your conversion 
            history as JSON.
          </li>
          <li>
            <strong>Access History:</strong> Click "Show" to view your last 20 conversions and reload any 
            previous conversion.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What is Base64?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. 
          It uses 64 characters (A-Z, a-z, 0-9, +, /) to encode data, making it safe for transmission over 
          text-only systems like email and HTTP headers.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-3">
          <p className="text-sm text-gray-700"><strong>Example:</strong></p>
          <p className="text-sm text-gray-600 font-mono mt-1">Plain text: "Hello World"</p>
          <p className="text-sm text-gray-600 font-mono">Base64: "SGVsbG8gV29ybGQ="</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Email Attachments</h3>
            <p>Email systems use Base64 to encode binary attachments so they can be transmitted as text.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Data URLs</h3>
            <p>Embed images directly in HTML/CSS using Base64-encoded data URLs without external files.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">API Authentication</h3>
            <p>Many APIs use Base64 encoding for authentication headers and credentials.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">JSON Web Tokens (JWT)</h3>
            <p>JWTs use Base64 encoding for their payload and signature components.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Configuration Files</h3>
            <p>Store sensitive data in configuration files using Base64 encoding.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Binary Data Transfer</h3>
            <p>Transmit binary data over text-only protocols like HTTP or SMTP.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">QR Codes</h3>
            <p>Some QR code generators use Base64 encoding for data storage.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Database Storage</h3>
            <p>Store binary data in text-based databases using Base64 encoding.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Auto-Detect Mode Explained
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          The Auto-Detect mode intelligently determines whether your input is Base64 or plain text:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>If input looks like Base64:</strong> The tool decodes it to plain text</li>
          <li><strong>If input is plain text:</strong> The tool encodes it to Base64</li>
          <li><strong>Detection is smart:</strong> Checks for valid Base64 characters and structure</li>
          <li><strong>Perfect for workflows:</strong> Quickly toggle between encoding and decoding</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          UTF-8 Support
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This tool uses UTF-8 safe Base64 encoding, which means it can handle special characters, emojis, 
          and non-ASCII text correctly. The encoding process uses encodeURIComponent() to ensure all 
          characters are properly converted before Base64 encoding.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Size Comparison
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Base64 encoding increases file size by approximately 33% because it uses 4 characters to represent 
          3 bytes of data. The tool shows you the exact size difference:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700"><strong>Example:</strong></p>
          <p className="text-sm text-gray-600 mt-2">Original: 120 bytes</p>
          <p className="text-sm text-gray-600">Encoded: 160 bytes</p>
          <p className="text-sm text-gray-600">Increase: +33.3%</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          File Upload Support
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          You can upload text files to encode them to Base64. Supported formats:
        </p>
        <ul className="space-y-1 text-gray-700">
          <li><strong>.txt</strong> - Plain text files</li>
          <li><strong>.json</strong> - JSON configuration files</li>
          <li><strong>.csv</strong> - Comma-separated values</li>
          <li><strong>.xml</strong> - XML data files</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          You can also drag and drop files directly into the input area for quick encoding.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Conversion History
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          The tool automatically saves your last 20 conversions in browser localStorage. You can:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li>View all recent conversions with timestamps</li>
          <li>Click any history item to reload it instantly</li>
          <li>Export your entire history as a JSON file</li>
          <li>Clear history with one click</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Performance Optimization
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          This tool is optimized for handling large text blocks:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Debounced Input:</strong> For text over 1,000 characters, conversions are debounced by 300ms</li>
          <li><strong>Instant Processing:</strong> Smaller text blocks are converted instantly</li>
          <li><strong>Efficient Algorithms:</strong> Uses optimized string operations</li>
          <li><strong>100k+ Character Support:</strong> Can handle massive text blocks without freezing</li>
          <li><strong>Minimal DOM Updates:</strong> Only updates when necessary</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Keyboard Shortcuts
        </h2>
        <div className="space-y-2 text-gray-700">
          <div>
            <strong>Ctrl+Enter (or Cmd+Enter on Mac):</strong> Convert the text in the input area
          </div>
          <div>
            <strong>Ctrl+C (or Cmd+C on Mac):</strong> Copy the output to clipboard when output area is focused
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Export Options
        </h2>
        <div className="space-y-3 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Export as TXT</h3>
            <p>Download the converted output as a plain text file (.txt) for easy sharing or storage.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Export History as JSON</h3>
            <p>Save your entire conversion history as a JSON file for record keeping or team sharing.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Security & Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Your privacy is our priority:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>100% Client-Side:</strong> All conversions happen in your browser</li>
          <li><strong>No Server Communication:</strong> Nothing is sent to any server</li>
          <li><strong>No Tracking:</strong> We don't track what you encode or decode</li>
          <li><strong>Local Storage Only:</strong> History is stored only in your browser</li>
          <li><strong>No Third-Party Scripts:</strong> No analytics or tracking code</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          <strong>Important Note:</strong> Base64 is an encoding scheme, not an encryption method. It provides 
          obfuscation but not security. For actual encryption, use proper cryptographic tools.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Common Errors and Solutions
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Error: Invalid Base64 string</h3>
            <p className="text-sm">The input contains characters not valid in Base64. Make sure you're decoding 
            actual Base64-encoded text. Base64 only uses A-Z, a-z, 0-9, +, /, and = for padding.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Error: Invalid characters for Base64 encoding</h3>
            <p className="text-sm">The input contains special Unicode characters. The tool handles this 
            automatically using UTF-8 encoding, so this error is rare.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Output looks garbled</h3>
            <p className="text-sm">If decoding produces garbled text, the input might not be valid Base64. 
            Try using Auto-Detect mode to let the tool determine the correct conversion.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Technical Details
        </h2>
        <div className="space-y-3 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Encoding Algorithm</h3>
            <p className="text-sm">Uses browser's native btoa() function with UTF-8 support via 
            encodeURIComponent() for proper handling of special characters.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Decoding Algorithm</h3>
            <p className="text-sm">Uses browser's native atob() function with UTF-8 support via 
            decodeURIComponent() for proper handling of special characters.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Auto-Detection</h3>
            <p className="text-sm">Validates input against Base64 character set and structure. If valid 
            Base64 is detected, the tool decodes it; otherwise, it encodes the input.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Browser Compatibility</h3>
            <p className="text-sm">Works in all modern browsers (Chrome, Firefox, Safari, Edge, Opera). 
            The btoa() and atob() functions are supported in all browsers released after 2012.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Is Base64 secure?</h3>
            <p className="text-sm">No, Base64 is an encoding scheme, not encryption. It's easily reversible 
            and provides no security. Use proper encryption for sensitive data.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Can I encode binary files?</h3>
            <p className="text-sm">This tool works with text files. For binary files, you need a specialized 
            tool that can read binary data.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">How large can files be?</h3>
            <p className="text-sm">The tool can handle 100,000+ characters efficiently. Very large files 
            may take a moment to process.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Is my data stored anywhere?</h3>
            <p className="text-sm">No, all processing happens in your browser. Only conversion history is 
            stored locally in your browser's localStorage.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Can I use this offline?</h3>
            <p className="text-sm">Yes, once the page loads, all functionality works offline. No internet 
            connection is required for encoding/decoding.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">What's the difference between Base64 and Base32?</h3>
            <p className="text-sm">Base64 uses 64 characters (A-Z, a-z, 0-9, +, /), while Base32 uses 32 
            characters (A-Z, 2-7). Base32 is case-insensitive and used in authenticator apps.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Browser Compatibility
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This tool works in all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. 
          The btoa() and atob() functions for Base64 are supported in all browsers released after 2012. 
          All other features use standard JavaScript with universal support.
        </p>
      </section>
    </div>
  );
}
