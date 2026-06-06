export default function ChecksumCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Checksum Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Choose input mode:</strong> Switch between Text Input (paste or type text) and File Upload (drag and drop any file).</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Select algorithm:</strong> Pick from MD5, SHA-1, SHA-256, SHA-384, SHA-512, CRC32, or Adler-32. SHA-256 is recommended for most uses.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Get your checksum:</strong> Results appear instantly for text input. Copy, export as TXT or JSON, or compare with a known hash.</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              {[
                "MD5, SHA-1, SHA-256, SHA-384, SHA-512, CRC32, Adler-32 support",
                "Text input with real-time checksum generation",
                "File upload with drag & drop – any file type",
                "Multi-algorithm mode – compute all hashes at once",
                "Checksum comparison tool for integrity verification",
                "Export as TXT or JSON",
                "Calculation history saved locally",
                "100% browser-based – no uploads, full privacy",
              ].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Algorithm Guide
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "MD5", bits: "128-bit", use: "Fast checksum for non-security purposes. Not cryptographically safe." },
            { name: "SHA-1", bits: "160-bit", use: "Legacy algorithm. Avoid for new security implementations." },
            { name: "SHA-256", bits: "256-bit", use: "Recommended default. Secure and widely supported." },
            { name: "SHA-384", bits: "384-bit", use: "Stronger SHA-2 variant used in TLS certificates." },
            { name: "SHA-512", bits: "512-bit", use: "Maximum SHA-2 strength for high-security applications." },
            { name: "CRC32", bits: "32-bit", use: "Fast error detection for file integrity. Not for cryptography." },
            { name: "Adler-32", bits: "32-bit", use: "Used in zlib/PNG. Faster than CRC32 for large data." },
          ].map(a => (
            <div key={a.name} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800 text-sm">{a.name}</span>
                <span className="text-xs text-gray-400 font-mono">{a.bits}</span>
              </div>
              <p className="text-xs text-gray-600">{a.use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          {[
            {
              q: "What is a checksum and why do I need it?",
              a: "A checksum is a fixed-length value derived from data using a hash algorithm. It acts as a unique fingerprint — if the data changes even slightly, the checksum changes entirely. It is used to verify file integrity, detect corruption, and validate downloads.",
            },
            {
              q: "Is this tool safe to use with sensitive files?",
              a: "Yes. All computation happens entirely in your browser. Your files are never uploaded to any server. You can even disconnect from the internet while using this tool.",
            },
            {
              q: "Which algorithm should I use?",
              a: "Use SHA-256 for general file integrity checks and security verification. Use MD5 or CRC32 only for quick non-security checks. Avoid SHA-1 and MD5 for cryptographic or security-critical use cases.",
            },
            {
              q: "Can I process multiple files at once?",
              a: "Yes. Drag and drop multiple files into the upload zone simultaneously and each will be processed with a live progress indicator.",
            },
            {
              q: "How do I verify a downloaded file?",
              a: "Upload the downloaded file, select the same algorithm listed on the software's download page (usually SHA-256), then paste the official checksum into the Compare panel. A match means the file is authentic and unaltered.",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="text-base font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed text-sm" style={{ fontFamily: "var(--font-body)" }}>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
