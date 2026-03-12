export default function CurrencyFormatPreviewerSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Mastering Global Currency Formatting
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Why Locale Matters
            </h3>
            <p className="text-gray-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Formatting numbers is not just about the currency symbol. Different regions use different separators for thousands and decimals. For example, while the US uses a dot for decimals (1.23), many European countries use a comma (1,23).
            </p>
            <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="text-primary mr-2 font-bold">●</span>
                <span><strong>Accounting Styles:</strong> Many financial applications require parentheses for negative numbers rather than a minus sign.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 font-bold">●</span>
                <span><strong>Grouping:</strong> Indian number systems use a unique grouping style (12,34,567.89) different from the standard Western style.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 font-bold">●</span>
                <span><strong>Precision:</strong> Currencies like JPY (Japanese Yen) typically don't use decimals, while others might require 3 or more places.</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Developer Features
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Instant preview for over 20+ major currencies.
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Support for the full ECMAScript Intl specification.
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Interactive code snippet generator for rapid implementation.
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Batch formatting for processing multiple price points at once.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What is the `Intl.NumberFormat` API?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              It is a standard JavaScript built-in object that enables language-sensitive number formatting. It is highly efficient and built directly into all modern browsers, removing the need for heavy external libraries like Moment or Numeral.js for simple formatting tasks.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Does this tool support all global currencies?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes, our tool supports any valid ISO 4217 currency code and BCP 47 locale tag supported by your browser's implementation of the Internationalization API.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
