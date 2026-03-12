export default function AESEncryptorSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the AES Text Encryptor Tool
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Encrypting Text
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Select <strong>Encrypt</strong> mode</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Enter or paste your text</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Create a strong password</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Choose output format (Base64, Hex, or JSON)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">5</span>
                <span>Click <strong>Encrypt Text</strong></span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">6</span>
                <span>Copy or download the encrypted output</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Decrypting Text
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Select <strong>Decrypt</strong> mode</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Paste the encrypted text</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Enter the same password used for encryption</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Click <strong>Decrypt Text</strong></span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">5</span>
                <span>View your decrypted message</span>
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
            <h3 className="font-semibold text-gray-900 mb-2">AES-GCM Encryption</h3>
            <p className="text-sm text-gray-600">Military-grade encryption using Web Crypto API with authenticated encryption mode</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">🔑</div>
            <h3 className="font-semibold text-gray-900 mb-2">PBKDF2 Key Derivation</h3>
            <p className="text-sm text-gray-600">100,000 iterations of password-based key derivation for maximum security</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-semibold text-gray-900 mb-2">100% Client-Side</h3>
            <p className="text-sm text-gray-600">All encryption happens in your browser. Zero data sent to servers</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
            <p className="text-sm text-gray-600">Export as Base64, Hex, or JSON package for flexible integration</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">📁</div>
            <h3 className="font-semibold text-gray-900 mb-2">File Support</h3>
            <p className="text-sm text-gray-600">Upload and encrypt text files, download encrypted versions</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <div className="text-3xl mb-3">💪</div>
            <h3 className="font-semibold text-gray-900 mb-2">Password Strength</h3>
            <p className="text-sm text-gray-600">Real-time password strength indicator to ensure secure encryption</p>
          </div>
        </div>
      </section>

      {/* What is AES Encryption */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          What is AES Encryption?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            <strong>AES (Advanced Encryption Standard)</strong> is a symmetric encryption algorithm adopted by the U.S. government and used worldwide for securing sensitive data. It's considered one of the most secure encryption methods available today.
          </p>
          <p className="text-gray-600 mb-4">
            Our tool uses <strong>AES-GCM (Galois/Counter Mode)</strong>, which provides both encryption and authentication, ensuring your data is not only encrypted but also protected against tampering.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Why Use AES-GCM?
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Military-grade security:</strong> Used by governments and enterprises worldwide</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Authenticated encryption:</strong> Detects if encrypted data has been tampered with</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Fast performance:</strong> Optimized for modern processors</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span><strong>Industry standard:</strong> Widely supported and thoroughly tested</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔒 Secure Messaging</h3>
            <p className="text-sm text-gray-600">Encrypt sensitive messages before sending them through email or messaging apps</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔑 Password Storage</h3>
            <p className="text-sm text-gray-600">Safely store passwords and API keys in encrypted format</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">📝 Private Notes</h3>
            <p className="text-sm text-gray-600">Encrypt personal notes and sensitive information before cloud storage</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">⚙️ Configuration Files</h3>
            <p className="text-sm text-gray-600">Protect configuration files containing sensitive settings</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">💼 Business Data</h3>
            <p className="text-sm text-gray-600">Encrypt confidential business information and contracts</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">🎓 Educational Use</h3>
            <p className="text-sm text-gray-600">Learn about cryptography and encryption techniques hands-on</p>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="mt-8 bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          🛡️ Security Best Practices
        </h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Use Strong Passwords</h3>
            <p className="text-sm text-gray-600">Create passwords with at least 12 characters, mixing uppercase, lowercase, numbers, and symbols</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Never Share Passwords</h3>
            <p className="text-sm text-gray-600">Share encrypted text and passwords through separate, secure channels</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Store Passwords Safely</h3>
            <p className="text-sm text-gray-600">Use a password manager to store encryption passwords securely</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-yellow-100">
            <h3 className="font-semibold text-gray-900 mb-2">✅ Backup Encrypted Data</h3>
            <p className="text-sm text-gray-600">Keep backups of encrypted data and passwords in separate secure locations</p>
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
            <h3 className="font-semibold text-gray-900 mb-2">Is my data sent to any server?</h3>
            <p className="text-gray-600">No. All encryption and decryption happens entirely in your browser using the Web Crypto API. No data is ever transmitted to our servers.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How secure is AES-GCM encryption?</h3>
            <p className="text-gray-600">AES-GCM is military-grade encryption used by governments worldwide. With a strong password, it's virtually impossible to break.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What if I forget my password?</h3>
            <p className="text-gray-600">Unfortunately, encrypted data cannot be recovered without the correct password. This is by design to ensure maximum security.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I encrypt large files?</h3>
            <p className="text-gray-600">Yes, the tool supports encrypting large text files. However, very large files may take longer to process depending on your device.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What's the difference between Base64, Hex, and JSON formats?</h3>
            <p className="text-gray-600">Base64 is compact and URL-safe, Hex is human-readable, and JSON includes all metadata in a structured format for easy storage and sharing.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I use this for commercial purposes?</h3>
            <p className="text-gray-600">Yes, this tool is completely free to use for personal and commercial purposes.</p>
          </div>
        </div>
      </section>
    </>
  );
}
