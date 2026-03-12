export default function RandomNumberGeneratorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Professional Random number Generation Tools
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Versatile Utility
            </h3>
            <p className="text-gray-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Whether you are running a giveaway, sampling data for an experiment, or simply need to pick a random winner from a list, our tool provides the most robust browser-based solution available.
            </p>
            <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="text-primary mr-2">✦</span>
                <span><strong>Secure Randomness:</strong> Leverage the Web Crypto API for cryptographically strong random values that are suitable for security-sensitive applications.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✦</span>
                <span><strong>Unique Sampling:</strong> Generate lists of distinct numbers with no duplicates, perfect for lottery simulations or random assignment.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✦</span>
                <span><strong>Random Pickers:</strong> Simply paste your list of options and let our algorithm select a winner fairly and instantly.</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Why Use Our Generator?
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                100% Client-Side: No data ever leaves your computer.
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Precision Control: Support for decimals up to 6 places.
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Visual Feedback: Animated "spin" results for engaging UX.
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                History Tracking: Review and export recent results easily.
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
              What is the difference between Standard and Secure random?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Standard random uses `Math.random()`, which is fast but pseudorandom and potentially predictable. Secure mode uses `window.crypto.getRandomValues()`, which connects to hardware-level entropy for true cryptographic security.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How many numbers can I generate at once?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Our tool is optimized for performance and can generate thousands of numbers in milliseconds. We've capped the UI display for smoothness, but you can export large batches via CSV.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
