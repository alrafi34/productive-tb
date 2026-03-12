export default function SteganographyToolSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Steganography Tool
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Hide Message in Image
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Select <strong>Hide Message</strong> mode</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Upload an image (PNG recommended)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Enter your secret message</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Optionally add password protection</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">5</span>
                <span>Click <strong>Encode Message</strong></span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">6</span>
                <span>Download the encoded image</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Extract Hidden Message
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Select <strong>Extract Message</strong> mode</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Upload the encoded image</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Enter password if protected</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Select the encoding strength used</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">5</span>
                <span>Click <strong>Extract Message</strong></span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">6</span>
                <span>View and copy the hidden message</span>
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
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="font-semibold text-gray-900 mb-2">LSB Steganography</h3>
            <p className="text-sm text-gray-600">Uses Least Significant Bit technique to hide data invisibly in image pixels</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">🔑</div>
            <h3 className="font-semibold text-gray-900 mb-2">Password Protection</h3>
            <p className="text-sm text-gray-600">Optional encryption layer for extra security of hidden messages</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Capacity Calculator</h3>
            <p className="text-sm text-gray-600">Automatically calculates maximum message size based on image dimensions</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Encoding Strength</h3>
            <p className="text-sm text-gray-600">Choose between low, balanced, or high strength encoding</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">🔢</div>
            <h3 className="font-semibold text-gray-900 mb-2">Binary Visualization</h3>
            <p className="text-sm text-gray-600">See how pixel bits are modified to hide your message</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-semibold text-gray-900 mb-2">100% Client-Side</h3>
            <p className="text-sm text-gray-600">All processing happens locally. No images uploaded to servers</p>
          </div>
        </div>
      </section>

      {/* What is Steganography */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          What is Steganography?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            <strong>Steganography</strong> is the practice of hiding secret information within ordinary files or messages. Unlike encryption which scrambles data, steganography conceals the very existence of the data.
          </p>
          <p className="text-gray-600 mb-4">
            This tool uses <strong>LSB (Least Significant Bit)</strong> steganography, which modifies the last bit of pixel color values to encode your message. Since changing the LSB only alters the color value by ±1, the changes are invisible to the human eye.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            How LSB Steganography Works
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Pixel modification:</strong> Each pixel has RGB values (0-255). Only the last bit is changed</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Invisible changes:</strong> Changing 10101010 to 10101011 is visually undetectable</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>High capacity:</strong> A 1920×1080 image can hide over 700KB of text</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Lossless format:</strong> PNG preserves the hidden data, JPEG may corrupt it</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Encoding Strength Explained */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Encoding Strength Levels
        </h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">Low Strength</h3>
            <p className="text-sm text-gray-600 mb-2">
              Encodes message in consecutive pixels. Faster processing but message is concentrated in one area.
            </p>
            <p className="text-xs text-gray-500">Best for: Quick encoding, small messages</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">Balanced (Recommended)</h3>
            <p className="text-sm text-gray-600 mb-2">
              Distributes message across pixels with moderate spacing. Good balance of speed and distribution.
            </p>
            <p className="text-xs text-gray-500">Best for: General use, recommended default</p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">High Strength</h3>
            <p className="text-sm text-gray-600 mb-2">
              Spreads message across more pixels with wider spacing. More secure but slower processing.
            </p>
            <p className="text-xs text-gray-500">Best for: Maximum security, sensitive messages</p>
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
            <h3 className="font-semibold text-gray-900 mb-2">🔒 Secure Communication</h3>
            <p className="text-sm text-gray-600">Send hidden messages through public channels without detection</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">🎓 Educational Purposes</h3>
            <p className="text-sm text-gray-600">Learn about steganography and information hiding techniques</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔐 Digital Watermarking</h3>
            <p className="text-sm text-gray-600">Embed copyright or ownership information in images</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">📝 Secret Notes</h3>
            <p className="text-sm text-gray-600">Hide personal notes or passwords within innocent-looking images</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">🎮 Puzzle Games</h3>
            <p className="text-sm text-gray-600">Create treasure hunts or ARGs with hidden clues in images</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔬 Research</h3>
            <p className="text-sm text-gray-600">Study information hiding and digital forensics</p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mt-8 bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          🛡️ Best Practices
        </h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Use PNG Format</h3>
            <p className="text-sm text-gray-600">PNG is lossless and preserves hidden data. JPEG compression may corrupt the message</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Add Password Protection</h3>
            <p className="text-sm text-gray-600">For sensitive messages, always use password protection for an extra security layer</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Check Message Capacity</h3>
            <p className="text-sm text-gray-600">Ensure your message fits within the image capacity to avoid encoding errors</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Remember Encoding Settings</h3>
            <p className="text-sm text-gray-600">Note the encoding strength used - you&apos;ll need it to extract the message</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Avoid Re-compression</h3>
            <p className="text-sm text-gray-600">Don&apos;t upload encoded images to services that compress them (social media, etc.)</p>
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
            <h3 className="font-semibold text-gray-900 mb-2">Are my images uploaded to a server?</h3>
            <p className="text-gray-600">No. All image processing happens locally in your browser using the Canvas API. Your images and messages never leave your device.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can the hidden message be detected?</h3>
            <p className="text-gray-600">LSB steganography is visually undetectable. However, specialized steganalysis tools can detect the presence of hidden data through statistical analysis.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What image format should I use?</h3>
            <p className="text-gray-600">PNG is strongly recommended as it&apos;s lossless. JPEG uses lossy compression which may corrupt the hidden message.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How much text can I hide?</h3>
            <p className="text-gray-600">It depends on image size. A 1920×1080 image can hide approximately 700,000 characters. The tool shows capacity for each image.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What if I forget the password?</h3>
            <p className="text-gray-600">The message cannot be recovered without the correct password. Make sure to remember or securely store your password.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I hide files instead of text?</h3>
            <p className="text-gray-600">This tool is designed for text messages only. For file hiding, you would need specialized steganography software.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Is this secure for sensitive data?</h3>
            <p className="text-gray-600">While LSB steganography hides data well, it&apos;s not cryptographically secure. For highly sensitive data, combine with strong encryption.</p>
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
            <p>The tool uses the HTML5 Canvas API to read and modify pixel data. Each pixel&apos;s RGB values are converted to binary, and the message bits replace the least significant bits. A 32-bit header stores the message length for extraction.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Encryption Method</h3>
            <p>When password protection is enabled, the message is encrypted using XOR cipher before embedding. While simple, it provides basic protection against casual inspection.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Browser Compatibility</h3>
            <p>Works in all modern browsers that support Canvas API: Chrome, Firefox, Safari, Edge, and Opera.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Performance</h3>
            <p>Processing speed depends on image size and encoding strength. Large images (&gt;5MB) may take a few seconds to process.</p>
          </div>
        </div>
      </section>
    </>
  );
}
