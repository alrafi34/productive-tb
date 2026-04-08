import React from "react";

export default function HTMLEntityEncoderSEOContent() {
  return (
    <div className="mt-12 space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What is HTML Entity Encoding?
        </h2>
        <p className="mb-4">
          HTML entity encoding converts special characters into safe, displayable representations. This is essential when embedding HTML inside JavaScript strings, JSON responses, or database fields to prevent parsing errors and XSS vulnerabilities.
        </p>
        <p>
          Common characters like <code className="bg-gray-100 px-2 py-1 rounded">&lt;</code>, <code className="bg-gray-100 px-2 py-1 rounded">&gt;</code>, <code className="bg-gray-100 px-2 py-1 rounded">&amp;</code>, <code className="bg-gray-100 px-2 py-1 rounded">"</code>, and <code className="bg-gray-100 px-2 py-1 rounded">'</code> are encoded to prevent the browser from interpreting them as HTML markup.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Entity Types
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Named Entities</h3>
            <p className="mb-2">Human-readable entity names:</p>
            <code className="block bg-gray-100 p-3 rounded mb-2 font-mono text-sm">
              &lt; = &amp;lt;<br />
              &gt; = &amp;gt;<br />
              &amp; = &amp;amp;<br />
              " = &amp;quot;<br />
              ' = &amp;#39;
            </code>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Decimal Entities</h3>
            <p className="mb-2">Character codes in decimal format:</p>
            <code className="block bg-gray-100 p-3 rounded mb-2 font-mono text-sm">
              &lt; = &amp;#60;<br />
              &gt; = &amp;#62;<br />
              &amp; = &amp;#38;
            </code>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Hexadecimal Entities</h3>
            <p className="mb-2">Character codes in hexadecimal format:</p>
            <code className="block bg-gray-100 p-3 rounded mb-2 font-mono text-sm">
              &lt; = &amp;#x3C;<br />
              &gt; = &amp;#x3E;<br />
              &amp; = &amp;#x26;
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Use Cases
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Embedding HTML inside JavaScript strings</li>
          <li>Storing HTML in JSON responses</li>
          <li>Preventing XSS attacks in web applications</li>
          <li>Displaying HTML code in documentation</li>
          <li>Storing HTML in database fields safely</li>
          <li>Creating HTML email templates</li>
          <li>Debugging HTML rendering issues</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Features
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Encode HTML to safe entities (named, decimal, or hex)</li>
          <li>Decode HTML entities back to readable characters</li>
          <li>Auto-detect mode for smart encoding/decoding</li>
          <li>Live real-time transformation</li>
          <li>Character and entity counters</li>
          <li>Swap input/output for quick reversal</li>
          <li>Copy to clipboard with feedback</li>
          <li>Transformation history (last 20)</li>
          <li>Export results as text file</li>
          <li>Keyboard shortcuts for power users</li>
          <li>100% client-side processing (no backend)</li>
          <li>Mobile responsive design</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Examples
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: Basic HTML</h3>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm mb-2"><strong>Input:</strong></p>
              <code className="block bg-white p-2 rounded mb-3 font-mono text-sm border border-gray-200">
                &lt;div&gt;Hello &amp; Welcome&lt;/div&gt;
              </code>
              <p className="text-sm mb-2"><strong>Output (Named):</strong></p>
              <code className="block bg-white p-2 rounded font-mono text-sm border border-gray-200">
                &amp;lt;div&amp;gt;Hello &amp;amp; Welcome&amp;lt;/div&amp;gt;
              </code>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Comparison Operators</h3>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm mb-2"><strong>Input:</strong></p>
              <code className="block bg-white p-2 rounded mb-3 font-mono text-sm border border-gray-200">
                5 &gt; 3 &amp;&amp; 2 &lt; 4
              </code>
              <p className="text-sm mb-2"><strong>Output (Decimal):</strong></p>
              <code className="block bg-white p-2 rounded font-mono text-sm border border-gray-200">
                5 &amp;#62; 3 &amp;#38;&amp;#38; 2 &amp;#60; 4
              </code>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Tips & Best Practices
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Use Named Entities:</strong> Most readable and widely supported</li>
          <li><strong>Use Decimal/Hex for Special Characters:</strong> When named entities aren't available</li>
          <li><strong>Always Encode User Input:</strong> Prevent XSS attacks in web applications</li>
          <li><strong>Decode Before Display:</strong> Browsers automatically decode entities in HTML</li>
          <li><strong>Test in Context:</strong> Verify encoding works in your specific use case</li>
          <li><strong>Use Auto-Detect:</strong> Let the tool intelligently choose encode or decode</li>
        </ul>
      </section>
    </div>
  );
}
