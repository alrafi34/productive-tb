export default function EmailObfuscatorSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Email Obfuscator Tool
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Encoding Single Email
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Enter your email address</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Choose encoding method (Decimal, Hex, JavaScript, or Mixed)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Click <strong>Encode Email</strong></span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Copy the encoded output</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">5</span>
                <span>Paste into your HTML code</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Batch Encoding
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Switch to <strong>Batch Encode</strong> tab</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Enter multiple emails (one per line)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Select encoding method</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>View all encoded results</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">5</span>
                <span>Copy each encoded email individually</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">🔢</div>
            <h3 className="font-semibold text-gray-900 mb-2">HTML Character Codes</h3>
            <p className="text-sm text-gray-600">Convert emails to decimal HTML entities that browsers render correctly</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">🔠</div>
            <h3 className="font-semibold text-gray-900 mb-2">Hexadecimal Encoding</h3>
            <p className="text-sm text-gray-600">Use hex format for alternative obfuscation method</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">💻</div>
            <h3 className="font-semibold text-gray-900 mb-2">JavaScript Obfuscation</h3>
            <p className="text-sm text-gray-600">Generate JavaScript snippets that dynamically write emails</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">🎲</div>
            <h3 className="font-semibold text-gray-900 mb-2">Mixed Encoding</h3>
            <p className="text-sm text-gray-600">Random mix of decimal and hex for maximum protection</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-semibold text-gray-900 mb-2">Mailto Link Generator</h3>
            <p className="text-sm text-gray-600">Create clickable email links with obfuscated addresses</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-900 mb-2">Batch Processing</h3>
            <p className="text-sm text-gray-600">Encode multiple email addresses at once</p>
          </div>
        </div>
      </section>

      {/* What is Email Obfuscation */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          What is Email Obfuscation?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            <strong>Email obfuscation</strong> is the practice of disguising email addresses on websites to prevent automated bots from harvesting them for spam purposes. While the email remains readable to humans and clickable in browsers, it becomes much harder for scrapers to detect.
          </p>
          <p className="text-gray-600 mb-4">
            Our tool converts plain text emails into HTML character codes. For example, the "@" symbol becomes <code className="bg-gray-100 px-2 py-1 rounded text-sm">&#38;#64;</code> which browsers render as "@" but bots may not recognize.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Why Obfuscate Email Addresses?
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Reduce spam:</strong> Bots can't easily harvest obfuscated emails</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Maintain functionality:</strong> Emails remain clickable for users</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>No JavaScript required:</strong> HTML entities work without scripts</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>SEO friendly:</strong> Search engines can still index your content</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Encoding Methods Explained */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Encoding Methods Explained
        </h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">Decimal HTML Entities</h3>
            <p className="text-sm text-gray-600 mb-2">
              Converts each character to its decimal ASCII code. Example: <code className="bg-gray-100 px-2 py-1 rounded text-xs">a</code> becomes <code className="bg-gray-100 px-2 py-1 rounded text-xs">&#38;#97;</code>
            </p>
            <p className="text-xs text-gray-500">Best for: General use, widely supported</p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">Hexadecimal Encoding</h3>
            <p className="text-sm text-gray-600 mb-2">
              Uses hexadecimal format. Example: <code className="bg-gray-100 px-2 py-1 rounded text-xs">a</code> becomes <code className="bg-gray-100 px-2 py-1 rounded text-xs">&#38;#x61;</code>
            </p>
            <p className="text-xs text-gray-500">Best for: Alternative format, same protection level</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">JavaScript Obfuscation</h3>
            <p className="text-sm text-gray-600 mb-2">
              Generates a script that writes the email dynamically using character codes
            </p>
            <p className="text-xs text-gray-500">Best for: Maximum protection, requires JavaScript enabled</p>
          </div>
          
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">Mixed Encoding</h3>
            <p className="text-sm text-gray-600 mb-2">
              Randomly mixes decimal and hexadecimal encoding for each character
            </p>
            <p className="text-xs text-gray-500">Best for: Highest protection, harder for bots to detect patterns</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">📧 Contact Pages</h3>
            <p className="text-sm text-gray-600">Display support emails without exposing them to scrapers</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">👥 Team Pages</h3>
            <p className="text-sm text-gray-600">Show team member emails while protecting from spam</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">🏢 Business Websites</h3>
            <p className="text-sm text-gray-600">Protect sales and support email addresses</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">📝 Blog Posts</h3>
            <p className="text-sm text-gray-600">Include contact emails in articles safely</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">🛒 E-commerce Sites</h3>
            <p className="text-sm text-gray-600">Display customer service emails securely</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">📄 Footer Sections</h3>
            <p className="text-sm text-gray-600">Add obfuscated emails to website footers</p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mt-8 bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          🛡️ Best Practices for Email Protection
        </h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Use Multiple Methods</h3>
            <p className="text-sm text-gray-600">Combine obfuscation with contact forms for maximum protection</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Update Regularly</h3>
            <p className="text-sm text-gray-600">Re-encode emails periodically, especially if spam increases</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Test Functionality</h3>
            <p className="text-sm text-gray-600">Always verify that mailto links work correctly after encoding</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Consider Contact Forms</h3>
            <p className="text-sm text-gray-600">For high-traffic sites, use contact forms instead of direct emails</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Use Mixed Encoding</h3>
            <p className="text-sm text-gray-600">Mixed encoding provides better protection than single-method encoding</p>
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
            <h3 className="font-semibold text-gray-900 mb-2">Does email obfuscation really work?</h3>
            <p className="text-gray-600">Yes, it significantly reduces spam by making it harder for basic bots to harvest emails. However, sophisticated scrapers may still detect them, so combine with other methods like contact forms.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Will obfuscated emails work in all browsers?</h3>
            <p className="text-gray-600">Yes, HTML character entities are supported by all modern browsers and have been for decades. They render correctly and remain clickable.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Does obfuscation affect SEO?</h3>
            <p className="text-gray-600">No, search engines can read HTML entities correctly. Your content remains indexable and SEO-friendly.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Which encoding method is best?</h3>
            <p className="text-gray-600">Mixed encoding provides the best protection as it's harder for bots to detect patterns. JavaScript obfuscation is also very effective but requires JavaScript to be enabled.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I decode obfuscated emails?</h3>
            <p className="text-gray-600">Yes, use the Decode tab in this tool to convert obfuscated emails back to plain text.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Is this tool free to use?</h3>
            <p className="text-gray-600">Yes, completely free for personal and commercial use. All processing happens in your browser with no data sent to servers.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Do I need to install anything?</h3>
            <p className="text-gray-600">No, this is a web-based tool that works entirely in your browser. No installation or registration required.</p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="mt-8 bg-gray-50 rounded-xl border border-gray-200 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Technical Details
        </h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How It Works</h3>
            <p>The tool converts each character in your email address to its corresponding HTML entity code. For example:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li><code className="bg-white px-2 py-1 rounded">@</code> (ASCII 64) becomes <code className="bg-white px-2 py-1 rounded">&#38;#64;</code></li>
              <li><code className="bg-white px-2 py-1 rounded">.</code> (ASCII 46) becomes <code className="bg-white px-2 py-1 rounded">&#38;#46;</code></li>
              <li><code className="bg-white px-2 py-1 rounded">a</code> (ASCII 97) becomes <code className="bg-white px-2 py-1 rounded">&#38;#97;</code></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Browser Compatibility</h3>
            <p>HTML character entities are part of the HTML standard and work in all browsers including Chrome, Firefox, Safari, Edge, and Internet Explorer.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Privacy</h3>
            <p>All encoding happens locally in your browser using JavaScript. No email addresses are sent to any server or stored anywhere.</p>
          </div>
        </div>
      </section>
    </>
  );
}
