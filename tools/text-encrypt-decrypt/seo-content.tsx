export default function TextEncryptDecryptSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          About Text Encrypt & Decrypt Tool
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The Text Encrypt & Decrypt Tool is a versatile, browser-based utility for transforming text using 
          various encoding and encryption methods. Whether you need simple text obfuscation with ROT13, 
          data encoding with Base64, or binary representation, this tool handles it all instantly in your 
          browser. Perfect for developers, students, and anyone needing quick text transformations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Key Features
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Multiple Modes:</strong> ROT13, Base64, Base32, Binary, and URL-safe variants</li>
          <li><strong>Live Dual-Panel:</strong> See input and output side-by-side with instant updates</li>
          <li><strong>Large Text Support:</strong> Efficiently handles 100,000+ characters</li>
          <li><strong>Debounced Processing:</strong> Smooth performance even with massive text blocks</li>
          <li><strong>Transformation History:</strong> Saves last 10 transformations locally</li>
          <li><strong>Swap Function:</strong> Quickly reverse input and output</li>
          <li><strong>Copy to Clipboard:</strong> One-click copying with visual feedback</li>
          <li><strong>Export Options:</strong> Download as TXT or JSON files</li>
          <li><strong>Keyboard Shortcuts:</strong> Ctrl+Enter to transform, Ctrl+C to copy</li>
          <li><strong>100% Client-Side:</strong> All processing happens in your browser</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use
        </h2>
        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
          <li>Select your desired encryption/encoding mode</li>
          <li>Enter or paste text in the input panel</li>
          <li>See the transformed result instantly in the output panel</li>
          <li>Click "Copy" to copy the output to clipboard</li>
          <li>Use "Swap" to reverse input and output for decryption</li>
          <li>Export results as TXT or save history as JSON</li>
          <li>Access previous transformations from history</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Encryption Modes Explained
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">ROT13</h3>
            <p>A simple letter substitution cipher that shifts each letter by 13 positions in the alphabet. 
            It's symmetric, meaning applying ROT13 twice returns the original text. Commonly used for 
            spoiler protection and simple text obfuscation.</p>
            <p className="text-sm mt-1"><strong>Example:</strong> "Hello" → "Uryyb"</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Base64 Encode/Decode</h3>
            <p>Converts text to Base64 format, which represents binary data in ASCII string format using 
            64 characters (A-Z, a-z, 0-9, +, /). Widely used for encoding data in emails, URLs, and data URIs.</p>
            <p className="text-sm mt-1"><strong>Example:</strong> "Hello" → "SGVsbG8="</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Base64 URL-Safe</h3>
            <p>A variant of Base64 that uses URL-safe characters (- and _ instead of + and /). Perfect for 
            encoding data in URLs and filenames without special character issues.</p>
            <p className="text-sm mt-1"><strong>Example:</strong> "Hello" → "SGVsbG8" (no padding)</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Base32</h3>
            <p>Uses only uppercase letters A-Z and digits 2-7, making it case-insensitive and easier to 
            communicate verbally. Commonly used in TOTP (authenticator apps) and some file systems.</p>
            <p className="text-sm mt-1"><strong>Example:</strong> "Hello" → "JBSWY3DP"</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Binary</h3>
            <p>Converts text to binary representation (0s and 1s). Each character is represented by its 
            8-bit binary code. Useful for understanding how computers store text.</p>
            <p className="text-sm mt-1"><strong>Example:</strong> "Hi" → "01001000 01101001"</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Use Cases
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Spoiler Protection:</strong> Use ROT13 to hide spoilers in forums and discussions</li>
          <li><strong>Data Encoding:</strong> Encode binary data for transmission in text-only systems</li>
          <li><strong>Email Attachments:</strong> Base64 encoding for inline images and files</li>
          <li><strong>URL Parameters:</strong> URL-safe Base64 for encoding data in URLs</li>
          <li><strong>Configuration Files:</strong> Encode sensitive data in config files</li>
          <li><strong>API Tokens:</strong> Base64 encoding for authentication tokens</li>
          <li><strong>Learning:</strong> Understand different encoding schemes and their applications</li>
          <li><strong>Data URIs:</strong> Create data URIs for embedding images in CSS/HTML</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Performance Optimization
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          This tool is optimized to handle large text blocks efficiently:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Debounced Input:</strong> For text over 1,000 characters, transformations are 
          debounced by 300ms to prevent lag while typing</li>
          <li><strong>Instant Processing:</strong> Smaller text blocks are transformed instantly</li>
          <li><strong>Efficient Algorithms:</strong> Uses optimized string operations and typed arrays</li>
          <li><strong>Minimal DOM Updates:</strong> Only updates when necessary to maintain smooth UI</li>
          <li><strong>100k+ Character Support:</strong> Can handle massive text blocks without freezing</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Advanced Features
        </h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Transformation History</h3>
            <p>Automatically saves your last 10 transformations in browser localStorage. Click any 
            history item to reload it instantly. Perfect for comparing different encoding methods or 
            retrieving previous work.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Swap Function</h3>
            <p>Quickly reverse input and output with one click. Useful for decryption workflows where 
            you want to decode the output and encode it again with a different method.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Export Options</h3>
            <p>Export your transformed text as a .txt file or save your entire transformation history 
            as a .json file for record keeping or sharing with team members.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Keyboard Shortcuts</h3>
            <p>Speed up your workflow with keyboard shortcuts: Ctrl+Enter to transform text, and 
            Ctrl+C to copy output when the output panel is focused.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Security & Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Your privacy is important:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>100% Client-Side:</strong> All transformations happen in your browser</li>
          <li><strong>No Server Communication:</strong> Nothing is sent to any server</li>
          <li><strong>No Tracking:</strong> We don't track what you encrypt or decrypt</li>
          <li><strong>Local Storage Only:</strong> History is stored only in your browser</li>
          <li><strong>No Analytics:</strong> No third-party scripts or tracking</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-3">
          <strong>Important Note:</strong> ROT13 and Base64 are NOT secure encryption methods. They are 
          encoding schemes that provide obfuscation, not security. For actual encryption, use proper 
          cryptographic tools like AES or RSA.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          ROT13 vs Base64: When to Use Each
        </h2>
        <div className="space-y-3 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900">Use ROT13 When:</h3>
            <ul className="list-disc list-inside text-sm">
              <li>You need simple, reversible text obfuscation</li>
              <li>Hiding spoilers in forums or discussions</li>
              <li>Creating puzzles or games</li>
              <li>You want human-readable output (still letters)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Use Base64 When:</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Encoding binary data for text-only systems</li>
              <li>Creating data URIs for images</li>
              <li>Encoding email attachments</li>
              <li>Storing binary data in JSON or XML</li>
              <li>Working with APIs that require Base64</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Common Errors and Solutions
        </h2>
        <div className="space-y-3 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900">Error: Invalid Base64 string</h3>
            <p className="text-sm">The input contains characters not valid in Base64. Make sure you're 
            decoding actual Base64-encoded text.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Error: Invalid characters for Base64 encoding</h3>
            <p className="text-sm">The input contains special Unicode characters that can't be directly 
            encoded. The tool handles this automatically using UTF-8 encoding.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Error: Invalid Base32 string</h3>
            <p className="text-sm">Base32 only accepts uppercase letters A-Z and digits 2-7. Check your 
            input for invalid characters.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Technical Details
        </h2>
        <div className="space-y-3 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900">ROT13 Implementation</h3>
            <p className="text-sm">Uses character code manipulation to shift letters by 13 positions. 
            Non-alphabetic characters remain unchanged. Case is preserved.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Base64 Implementation</h3>
            <p className="text-sm">Uses browser's native btoa() and atob() functions with UTF-8 encoding 
            support via encodeURIComponent/decodeURIComponent.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Base32 Implementation</h3>
            <p className="text-sm">Follows RFC 4648 standard. Converts text to binary, then groups into 
            5-bit chunks mapped to the Base32 alphabet.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Binary Implementation</h3>
            <p className="text-sm">Converts each character to its 8-bit binary representation using 
            charCodeAt() and toString(2).</p>
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
          All other encoding methods use standard JavaScript string operations with universal support.
        </p>
      </section>
    </div>
  );
}
