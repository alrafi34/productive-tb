export default function SRIGeneratorSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the SRI Generator Tool
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Enter a CDN URL, upload a file, or paste content directly</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Select your preferred hash algorithm (SHA-384 recommended)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Copy the generated SRI hash or HTML snippet</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              What You Get
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                SHA-256, SHA-384, and SHA-512 hashes
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Ready-to-use HTML snippets
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Batch processing for multiple URLs
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Export options (TXT/HTML)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Example HTML Output:</h4>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
        integrity="sha384-vtXRMe3mGCbOeY7l30aIg8H9p3GdeSe4IFlP6G8JMa7o7lXvnz3GFKzPxzJdPfGK"
        crossorigin="anonymous"></script>`}
          </pre>
        </div>
      </section>

      {/* What is SRI Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          What is Subresource Integrity (SRI)?
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Subresource Integrity (SRI) is a security feature that enables browsers to verify that resources they fetch 
          (for example, from a CDN) are delivered without unexpected manipulation. It works by allowing you to provide 
          a cryptographic hash that a fetched resource must match.
        </p>
        <p className="text-gray-600 leading-relaxed">
          When you include external scripts or stylesheets in your web pages, you're trusting that the CDN or external 
          server hasn't been compromised. SRI adds an extra layer of security by ensuring the file content matches 
          exactly what you expect.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-violet-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">🔒 SHA-256</h4>
            <p className="text-sm text-gray-600">Fast and secure for most use cases. Produces 256-bit hash.</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">✅ SHA-384 (Recommended)</h4>
            <p className="text-sm text-gray-600">Best balance between security and performance. Industry standard.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">🛡️ SHA-512</h4>
            <p className="text-sm text-gray-600">Maximum security with 512-bit hash. Highest protection level.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Do I need SRI for all external resources?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              While not required, it's highly recommended for any external scripts or stylesheets, especially from 
              third-party CDNs. It adds minimal overhead but significantly improves security by protecting against 
              compromised CDN resources and man-in-the-middle attacks.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What happens if the CDN updates the file?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The browser will block the resource because the hash won't match. This is intentional security behavior - you should 
              pin specific versions in your CDN URLs and update hashes deliberately when upgrading. Avoid using "latest" or version ranges.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Which hash algorithm should I choose?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              SHA-384 is recommended for most use cases as it provides strong security with reasonable hash length and is the industry standard. 
              Use SHA-512 for maximum security or SHA-256 if you need shorter hashes. You can also specify multiple algorithms for broader compatibility.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Is my data secure when using this tool?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Absolutely! All hashing is performed locally in your browser using the Web Crypto API. No data is sent to any server or third party. 
              Your scripts, URLs, and content remain completely private. The tool even works offline after initial page load.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I use SRI with dynamic content?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              SRI is designed for static resources with predictable content. It's not suitable for dynamically 
              generated scripts or resources that change frequently. Use SRI for versioned CDN libraries, frameworks, and static assets.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Does SRI slow down my website?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The performance impact is negligible. Browsers compute hashes very quickly using native cryptographic functions, and the security benefits 
              far outweigh any minimal overhead. SRI actually helps prevent security incidents that could severely impact performance.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our SRI Generator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Generation</h3>
            <p className="text-gray-600 text-sm">Generate SRI hashes in milliseconds using Web Crypto API</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2">100% Private</h3>
            <p className="text-gray-600 text-sm">All processing happens locally - no data sent to servers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="font-semibold text-gray-800 mb-2">Batch Processing</h3>
            <p className="text-gray-600 text-sm">Process multiple URLs at once and export results</p>
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Best Practices for Using SRI
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Security Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Use SHA-384 or SHA-512 for production environments</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Always include crossorigin="anonymous" attribute</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Pin specific versions of CDN resources</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Test pages after adding SRI to ensure resources load</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Common Use Cases</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Secure jQuery, Bootstrap, React from CDNs</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Verify third-party analytics and widget scripts</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Protect CSS frameworks and icon fonts</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Meet PCI-DSS, HIPAA security requirements</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
