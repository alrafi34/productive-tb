export default function EncodingEfficiencyCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Encoding Efficiency Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>encoding efficiency calculator</strong> is a free browser-based tool that measures how efficiently an encoding method represents data by comparing the original data size to the encoded size. It answers a question every backend engineer eventually asks: <em>how much bigger does Base64, Hex, or another encoding actually make my data?</em>
          </p>
          <p>
            Enter the original and encoded data sizes in any unit — Bytes, KB, MB, GB, TB, or Bits — and the calculator instantly returns the encoding overhead percentage, expansion ratio, compression ratio, encoding efficiency percentage, and the exact additional storage required.
          </p>
          <p>
            This tool is built for <strong>software developers, backend engineers, data engineers, API developers, security engineers, cloud engineers, QA engineers, compression researchers, and students</strong>. It runs entirely in your browser — no data is ever uploaded, and nothing leaves your device.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Encoding Efficiency Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator compares your original data size against the encoded data size to compute overhead, expansion, and efficiency metrics in real time. If your encoded output happens to be smaller than the original — uncommon, but possible with some binary-packing schemes — it detects and labels that case as a reduction instead of assuming every encoding expands data.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Encoding Overhead % = ((Encoded − Original) ÷ Original) × 100</p>
              <p>Expansion Ratio = Encoded ÷ Original</p>
              <p>Compression Ratio = Original ÷ Encoded</p>
              <p>Encoding Efficiency % = (Original ÷ Encoded) × 100</p>
              <p>Additional Storage = Encoded − Original</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Encoding Overhead", "The percentage increase in size caused by encoding — Base64 typically adds about 33% overhead."],
              ["Expansion Ratio", "How many times larger the encoded data is than the original, expressed as a multiplier like 1.336×."],
              ["Encoding Efficiency", "The inverse view — what percentage of the encoded output is actual data versus overhead. Higher is better."],
              ["Additional Storage", "The exact extra space, in your chosen unit, that the encoded version requires over the original."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step + Key Features ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Encoding Efficiency Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter the Original Data Size", "Type the size of your data before encoding."],
                ["Enter the Encoded Data Size", "Type the size of the same data after encoding."],
                ["Choose a Size Unit", "Select Bytes, KB, MB, GB, TB, or Bits to match your input values."],
                ["Select an Encoding Type", "Optionally choose Base64, Hex, UTF-8, or another method for reference and reporting."],
                ["Adjust Decimal Precision", "Choose how many decimal places to display, from 0 to 5."],
                ["Read the Live Result", "Overhead, expansion ratio, compression ratio, efficiency, and additional storage update instantly as you type."],
                ["Export or Share", "Copy the results, download a CSV, TXT, or JSON report, print it, or copy a shareable URL with your inputs encoded."],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Encoding overhead, expansion ratio, compression ratio, and efficiency in one view",
                "Circular efficiency gauge and linear progress bar visualization",
                "Automatic performance rating from Poor to Highly Efficient",
                "Reference table comparing overhead across 11 common encoding methods",
                "Smart unit formatting that expresses additional storage in its most readable unit",
                "Support for Bytes, KB, MB, GB, TB, and Bits",
                "Adjustable decimal precision (0–5 places)",
                "Swap Values, Reset, and quick example presets",
                "Instant calculation with a 150ms debounce as you type",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past results",
                "Clear validation for zero, negative, and undefined inputs",
                "All processing runs locally — no data is ever uploaded",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span><span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Evaluating Base64 Image Overhead",
              scenario: "A frontend developer embeds a 1024-byte icon as a Base64 data URI and gets 1368 bytes. The calculator confirms this is the expected ~33.6% overhead, not a bug in the encoding pipeline.",
            },
            {
              title: "API Payload Size Planning",
              scenario: "An API developer needs to estimate how much larger JSON payloads become after Base64-encoding binary attachments, using the calculator to budget request size limits before hitting a gateway's payload cap.",
            },
            {
              title: "Choosing Between Hex and Base64",
              scenario: "A security engineer compares Hexadecimal (100% overhead) against Base64 (33% overhead) for representing binary tokens in logs, choosing Base64 to reduce log storage costs at scale.",
            },
            {
              title: "Bandwidth Impact Estimation",
              scenario: "A cloud engineer calculates the additional bandwidth required when a data pipeline switches from raw binary transfer to Base64-encoded transfer over a REST API, informing a monthly egress cost forecast.",
            },
            {
              title: "Diagnosing Unexpected Expansion",
              scenario: "A QA engineer notices an encoded field ballooned by over 100% in size during testing and uses the calculator to quantify and document the issue before filing a bug report.",
            },
            {
              title: "Teaching Encoding Fundamentals",
              scenario: "A computer science student uses the calculator to verify manually computed overhead percentages for Base64 and UTF-16 while studying data representation.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Common Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "A ~33% overhead from Base64 is normal and expected — it's not a sign of a broken encoder.",
                "Use the encoding comparison table to pick the most compact text-safe encoding before implementing a new API contract.",
                "An expansion ratio and an overhead percentage describe the same growth two different ways — 1.336× is the same as 33.6% overhead.",
                "When budgeting API payload limits, always calculate expected size after encoding, not before.",
                "Use Swap Values to quickly see what compression would be needed to reverse an encoding's expansion.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't confuse encoding overhead with compression — encoding methods like Base64 exist for safe text representation, not to shrink data.",
                "Don't compare overhead percentages across encodings meant for different purposes — Hex is for readability and debugging, not efficiency.",
                "Don't forget that an encoded size of zero makes efficiency mathematically undefined — the calculator flags this rather than showing an infinite value.",
                "Don't assume Unicode text sizes are fixed — UTF-8, UTF-16, and UTF-32 all encode the same characters at very different byte counts.",
                "Don't ignore consistently high overhead in production — it often means the wrong encoding was chosen for a bandwidth-sensitive path.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Encoding Overhead Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Original</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Encoded</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Overhead</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Expansion</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1024 Bytes", "1368 Bytes", "33.59%", "1.336×", "Moderately Efficient"],
                ["5 MB", "6.67 MB", "33.40%", "1.334×", "Moderately Efficient"],
                ["250 KB", "500 KB", "100%", "2×", "Low Efficiency"],
                ["1 KB", "1.33 KB", "33%", "1.33×", "Moderately Efficient"],
                ["100 Bytes", "180 Bytes", "80%", "1.8×", "Low Efficiency"],
              ].map(([orig, enc, overhead, exp, rating]) => (
                <tr key={orig + enc} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{orig}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{enc}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{overhead}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{exp}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is an encoding efficiency calculator?",
              a: "An encoding efficiency calculator is a free browser-based tool that measures how much larger data becomes after encoding by comparing the original size to the encoded size. It returns the encoding overhead, expansion ratio, compression ratio, and efficiency percentage.",
            },
            {
              q: "How is encoding overhead calculated?",
              a: "Encoding overhead equals ((Encoded Size − Original Size) ÷ Original Size) × 100. For example, 1024 bytes encoded to 1368 bytes has an overhead of 33.59%, since (1368 − 1024) ÷ 1024 × 100 = 33.59%.",
            },
            {
              q: "Why does Base64 encoding increase file size?",
              a: "Base64 represents every 3 bytes of binary data as 4 ASCII characters, so encoded data is always about 33% larger than the original. This is expected, predictable overhead, not an error.",
            },
            {
              q: "What is the difference between expansion ratio and encoding overhead?",
              a: "They describe the same growth in two formats. An expansion ratio of 1.336× means the encoded data is 1.336 times the original size, which is the same as a 33.6% overhead. Ratio = Encoded ÷ Original, while overhead is that same relationship expressed as a percentage increase.",
            },
            {
              q: "What is encoding efficiency?",
              a: "Encoding efficiency is calculated as (Original Size ÷ Encoded Size) × 100. It represents what percentage of the encoded output is actual original data versus encoding overhead — higher efficiency means less overhead added.",
            },
            {
              q: "Why can't I enter an encoded size of zero?",
              a: "An encoded size of zero would make the efficiency and compression ratio mathematically undefined, since you cannot divide by zero. The calculator flags this case explicitly rather than displaying a misleading result.",
            },
            {
              q: "Which encoding method has the least overhead?",
              a: "Among common text-safe binary encodings, Base64 (about 33% overhead) is more compact than Base32 (about 60%) or Hexadecimal (100%). Raw binary transmission has 0% overhead but isn't always practical for text-based protocols like JSON or XML.",
            },
            {
              q: "Can encoded data ever be smaller than the original?",
              a: "It's uncommon but possible with some binary-packing or compression-aware encoding schemes. The calculator detects this case and labels it 'Reduced' instead of assuming every encoding always expands data.",
            },
            {
              q: "How is the performance rating determined?",
              a: "The rating is based on encoding efficiency: 90% and above is Highly Efficient, 75–89% Efficient, 60–74% Moderately Efficient, 40–59% Low Efficiency, and below 40% Poor Efficiency.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your data sizes are never transmitted to any server, and no actual file or data content is ever uploaded — you only enter numeric sizes.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "💻", title: "Software Developers", desc: "Check encoding overhead for data URIs, tokens, and serialized payloads." },
            { icon: "🔌", title: "API Developers", desc: "Estimate encoded payload sizes before hitting gateway or request size limits." },
            { icon: "🔒", title: "Security Engineers", desc: "Compare overhead across Base64, Hex, and other encodings used for tokens and hashes." },
            { icon: "🗄️", title: "Data & Backend Engineers", desc: "Plan bandwidth and storage budgets around real encoding performance." },
            { icon: "☁️", title: "Cloud Engineers", desc: "Estimate cloud egress cost impact from encoded data transfer." },
            { icon: "🎓", title: "Students & Researchers", desc: "Learn and verify encoding overhead and efficiency calculations." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
