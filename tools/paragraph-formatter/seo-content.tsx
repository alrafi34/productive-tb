export default function ParagraphFormatterSEOContent() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          How to Use the Paragraph Formatter Tool
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Paste or type your messy text into the input area</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Choose a formatting action (remove spaces, fix line breaks, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Copy the formatted text or download as TXT file</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Available Formatting Options
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Remove Extra Spaces - Clean multiple spaces
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Fix Line Breaks - Merge broken sentences
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Trim Empty Lines - Remove blank lines
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Format Paragraphs - Structure text properly
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Auto-Format - Apply all fixes at once
              </li>
            </ul>
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
              What is a paragraph formatter?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              A paragraph formatter is a free online tool that cleans up messy text by removing extra spaces, fixing line breaks, and properly formatting paragraphs. It's perfect for cleaning up text copied from PDFs, emails, or other sources that may have formatting issues.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              How do I remove extra spaces from text?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Simply paste your text into the formatter, click "Remove Extra Spaces," and the tool will automatically convert multiple spaces into single spaces while preserving your paragraph structure. This is useful for cleaning up text with inconsistent spacing.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I fix line breaks in copied text?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! The "Fix Line Breaks" feature merges broken sentences that were split across multiple lines, which commonly happens when copying text from PDFs or formatted documents. It intelligently joins lines while preserving intentional paragraph breaks.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Is this paragraph formatter free to use?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Absolutely! Our paragraph formatter is completely free with no registration required. You can format unlimited text, remove extra spaces, fix line breaks, and download your formatted text without any restrictions or hidden fees.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              What does the Auto-Format option do?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The Auto-Format option applies multiple formatting fixes at once, including removing extra spaces, fixing line breaks, and cleaning up empty lines. It's the quickest way to clean up messy text with a single click.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Can I download the formatted text?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! After formatting your text, you can either copy it to your clipboard or download it as a TXT file. This makes it easy to save your formatted text or use it in other applications.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Why Use Our Paragraph Formatter?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Formatting</h3>
            <p className="text-gray-600 text-sm">Clean up messy text with one click</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">Multiple Options</h3>
            <p className="text-gray-600 text-sm">5 formatting actions plus advanced settings</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💾</div>
            <h3 className="font-semibold text-gray-800 mb-2">Export Options</h3>
            <p className="text-gray-600 text-sm">Copy or download formatted text</p>
          </div>
        </div>
      </section>
    </>
  );
}
