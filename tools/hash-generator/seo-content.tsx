import React from 'react';

export default function HashGeneratorSEO() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-slate-700" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          What is a Hash Generator?
        </h2>
        <p className="leading-relaxed">
          A hash generator is a cryptographic tool that converts input data (text or files) into a fixed-length string of characters called a hash. 
          This hash acts as a unique digital fingerprint for your data. Our tool supports three popular algorithms: MD5, SHA-1, and SHA-256, 
          all running entirely in your browser for maximum privacy and speed.
        </p>
      </section>

      {/* Supported Algorithms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Supported Hash Algorithms
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">MD5 (Message Digest 5)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Produces 32-character hexadecimal hash</li>
              <li>Fast and widely used for checksums</li>
              <li>Not recommended for security-critical applications</li>
              <li>Perfect for file integrity checks and non-cryptographic purposes</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">SHA-1 (Secure Hash Algorithm 1)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Produces 40-character hexadecimal hash</li>
              <li>More secure than MD5 but considered deprecated for cryptographic use</li>
              <li>Still used in Git version control and legacy systems</li>
              <li>Good balance between speed and security for non-critical applications</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">SHA-256 (Secure Hash Algorithm 256-bit)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Produces 64-character hexadecimal hash</li>
              <li>Part of the SHA-2 family, highly secure</li>
              <li>Used in blockchain, SSL certificates, and password storage</li>
              <li>Recommended for all security-sensitive applications</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🔒 Privacy First</h3>
            <p className="text-sm">All hashing happens in your browser. No data is sent to any server.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">⚡ Instant Results</h3>
            <p className="text-sm">Real-time hash generation as you type with zero lag.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📁 File Hashing</h3>
            <p className="text-sm">Upload files to generate MD5, SHA-1, and SHA-256 hashes simultaneously.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">📋 Bulk Processing</h3>
            <p className="text-sm">Hash multiple lines of text at once with export options.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">✓ Hash Verification</h3>
            <p className="text-sm">Compare input against expected hash for integrity verification.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">🎨 Case Toggle</h3>
            <p className="text-sm">Switch between uppercase and lowercase output instantly.</p>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          How to Use
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Text Hashing</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Select your preferred algorithm (MD5, SHA-1, or SHA-256)</li>
              <li>Choose output case (lowercase or uppercase)</li>
              <li>Enter or paste your text in the input area</li>
              <li>Hash appears instantly in the output panel</li>
              <li>Click "Copy" to copy the hash to clipboard</li>
              <li>Enable "Show All Hashes" to generate all three algorithms at once</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">File Hashing</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Switch to the "File Hash" tab</li>
              <li>Click the upload area or drag and drop a file</li>
              <li>All three hashes (MD5, SHA-1, SHA-256) are generated automatically</li>
              <li>File name and size are displayed for reference</li>
              <li>Copy individual hashes or all at once</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Bulk Hashing</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Switch to the "Bulk Hash" tab</li>
              <li>Select your algorithm</li>
              <li>Enter multiple lines of text (one per line)</li>
              <li>Click "Generate Hashes"</li>
              <li>Export results as TXT or JSON file</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Hash Verification</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Switch to the "Verify Hash" tab</li>
              <li>Select the algorithm used for the original hash</li>
              <li>Enter the original text/data</li>
              <li>Paste the expected hash</li>
              <li>Click "Verify Hash" to check if they match</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Common Use Cases
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">File Integrity Verification</h3>
            <p className="text-sm text-blue-800">
              Verify downloaded files haven't been corrupted or tampered with by comparing their hash against the official hash provided by the source.
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Password Storage</h3>
            <p className="text-sm text-green-800">
              Generate hashes for passwords before storing them in databases (use SHA-256 with salt for production systems).
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Data Deduplication</h3>
            <p className="text-sm text-purple-800">
              Identify duplicate content by comparing hashes instead of comparing entire files or text blocks.
            </p>
          </div>

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">Digital Signatures</h3>
            <p className="text-sm text-orange-800">
              Create unique identifiers for documents, contracts, or any digital content for verification purposes.
            </p>
          </div>

          <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
            <h3 className="font-semibold text-pink-900 mb-2">API Authentication</h3>
            <p className="text-sm text-pink-800">
              Generate hash-based signatures for API requests to ensure data integrity and authenticity.
            </p>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="font-semibold text-indigo-900 mb-2">Version Control</h3>
            <p className="text-sm text-indigo-800">
              Track changes in files or content by comparing hashes across different versions.
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Best Practices
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Use SHA-256 for security:</strong> When security matters, always choose SHA-256 over MD5 or SHA-1.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Add salt for passwords:</strong> Never hash passwords without adding a unique salt to prevent rainbow table attacks.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Verify file downloads:</strong> Always compare file hashes when downloading software or important files.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-[#058554] font-bold">✓</span>
            <p><strong>Use consistent formatting:</strong> Be aware that whitespace and case sensitivity affect hash output.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-red-600 font-bold">✗</span>
            <p><strong>Don't use MD5 for security:</strong> MD5 is cryptographically broken and should only be used for checksums.</p>
          </div>
          <div className="flex gap-3">
            <span className="text-red-600 font-bold">✗</span>
            <p><strong>Don't hash sensitive data without encryption:</strong> Hashing is one-way but not encryption.</p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Technical Details
        </h2>
        <div className="space-y-3 text-sm">
          <p>
            <strong>Implementation:</strong> This tool uses a pure JavaScript implementation of MD5 and the Web Crypto API 
            (crypto.subtle.digest) for SHA-1 and SHA-256, ensuring fast performance and browser compatibility.
          </p>
          <p>
            <strong>Privacy:</strong> All computations happen locally in your browser. No data is transmitted to any server, 
            making this tool completely private and secure.
          </p>
          <p>
            <strong>Performance:</strong> The tool can handle large text inputs and files efficiently. For very large files 
            (100MB+), processing may take a few seconds depending on your device.
          </p>
          <p>
            <strong>Browser Support:</strong> Works in all modern browsers that support the Web Crypto API (Chrome, Firefox, 
            Safari, Edge).
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can I reverse a hash to get the original data?</h3>
            <p className="text-sm">No, hash functions are one-way. You cannot reverse a hash to get the original input. This is by design for security purposes.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Why do I get different hashes for the same text?</h3>
            <p className="text-sm">Check for hidden whitespace, line breaks, or case differences. Even a single character change produces a completely different hash.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Is this tool safe for sensitive data?</h3>
            <p className="text-sm">Yes, all processing happens in your browser. However, remember that hashing is not encryption—don't share hashes of sensitive passwords.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Which algorithm should I use?</h3>
            <p className="text-sm">Use SHA-256 for security-critical applications, SHA-1 for legacy compatibility, and MD5 for simple checksums and non-security purposes.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Can two different inputs produce the same hash?</h3>
            <p className="text-sm">Theoretically yes (called a collision), but it's extremely rare with SHA-256. MD5 and SHA-1 have known collision vulnerabilities.</p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 text-center">
          This hash generator is a free, open-source tool designed for developers, security professionals, and anyone 
          needing quick and reliable hash generation. All operations are performed locally for maximum privacy and speed.
        </p>
      </section>
    </div>
  );
}
