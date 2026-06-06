export default function FileSizeConverterSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the File Size Converter
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Enter a file size</strong> — Type any number into the file size field. Supports decimals and very large values.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Select the source unit</strong> — Choose Bytes, KB, MB, GB, TB, or PB from the dropdown.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Choose a standard</strong> — Select Binary (1024) for OS/filesystem conversions, or Decimal (1000) for storage hardware.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">4</span>
                <span><strong>Get instant results</strong> — All units update in real time. Copy individual values or export the full result.</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              {[
                "Instant real-time conversion while typing",
                "Binary (1024) and Decimal (1000) standards",
                "Covers Bytes, KB, MB, GB, TB, and PB",
                "Copy individual unit values to clipboard",
                "Export full results as TXT or CSV",
                "Share-ready formatted output string",
                "Conversion history saved locally",
                "100% browser-based — no data leaves your device",
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
          Storage Unit Reference
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { unit: "Byte (B)", binary: "1 B", decimal: "1 B", note: "Smallest addressable unit" },
            { unit: "Kilobyte (KB / KiB)", binary: "1,024 B", decimal: "1,000 B", note: "Text files, small documents" },
            { unit: "Megabyte (MB / MiB)", binary: "1,048,576 B", decimal: "1,000,000 B", note: "Images, audio tracks" },
            { unit: "Gigabyte (GB / GiB)", binary: "1,073,741,824 B", decimal: "1,000,000,000 B", note: "Apps, HD videos" },
            { unit: "Terabyte (TB / TiB)", binary: "≈ 1.099 TB (decimal)", decimal: "1,000 GB", note: "Hard drives, backups" },
            { unit: "Petabyte (PB / PiB)", binary: "≈ 1.126 PB (decimal)", decimal: "1,000 TB", note: "Data centers, cloud storage" },
          ].map(row => (
            <div key={row.unit} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-gray-800 text-sm mb-2">{row.unit}</p>
              <div className="flex gap-4 text-xs text-gray-600 mb-1">
                <span><span className="font-medium">Binary:</span> {row.binary}</span>
                <span><span className="font-medium">Decimal:</span> {row.decimal}</span>
              </div>
              <p className="text-xs text-gray-400">{row.note}</p>
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
              q: "Why does my 1 TB hard drive show 931 GB on Windows?",
              a: "Hard drive manufacturers use decimal units (1 TB = 1,000,000,000,000 bytes). Windows uses binary units (1 GiB = 1,073,741,824 bytes). So 1,000,000,000,000 ÷ 1,073,741,824 ≈ 931 GiB, which Windows displays as 931 GB.",
            },
            {
              q: "What is the difference between MB and MiB?",
              a: "MB (Megabyte) in decimal standard = 1,000,000 bytes. MiB (Mebibyte) in binary standard = 1,048,576 bytes. The IEC introduced the binary prefixes (KiB, MiB, GiB) to eliminate the ambiguity, but both terms are used interchangeably in everyday usage.",
            },
            {
              q: "Which standard should I use?",
              a: "Use Binary (1024) when working with operating systems, file systems, RAM, or programming. Use Decimal (1000) when dealing with hard drive specs, SSD marketing, or internet/cloud storage providers.",
            },
            {
              q: "Can this tool handle very large file sizes like PB?",
              a: "Yes. The tool uses JavaScript's floating-point arithmetic which handles up to approximately 10^308. Petabyte values and beyond are supported with full precision display.",
            },
            {
              q: "Is my data sent anywhere when I use this tool?",
              a: "No. All conversions happen entirely in your browser using JavaScript. No data is sent to any server, logged, or stored externally. Conversion history is saved only in your browser's localStorage.",
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
