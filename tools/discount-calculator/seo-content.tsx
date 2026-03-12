export default function DiscountCalculatorSEO() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Calculate Sale Prices Like a Pro
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Step-by-Step Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Enter the Original Price:</strong> Input the item's current cost before any sales are applied.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Set the Discount:</strong> Use the slider or enter a specific percentage or fixed dollar amount off.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Add Extra Discounts (Stacking):</strong> Click "Add Stacked Discount" if there are secondary sales or promo codes to apply sequentially.</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Advanced Features
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Calculate local sales tax easily
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Interactive, touch-friendly savings slider
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Quick preset buttons for standard sales (10%, 20%, etc.)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Support for bulk / batch price conversions
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How do stacked multiple discounts work?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Stacked discounts are applied sequentially, not collectively. For example, if a $100 item has a 50% discount and a secondary 20% off coupon, the math uses the first promotion to reach $50, and then applies the 20% discount on the new <em>$50 total</em>, resulting in a final price of $40 (not a full 70% off which would be $30).
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What is a reverse discount calculator?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              If you know an item is 30% off and costs $70 at checkout, our reverse calculator lets you input those details to determine what the original price was before the sale started (in this example, $100).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can I determine sales tax using this tool?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes! We offer a dedicated field where you can input your respective local, state, or federal sales tax percentage, and it will be properly added to the final tallied result after taking out the discounts.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Is this calculator safe to use?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Absolutely. In fact, everything calculates straight on your device using Client-Side JavaScript. No numbers or shopping lists interact with an external server or databases. It is instantly reliable and 100% private.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Discount Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Lightning Fast</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Watch final prices update instantly as you adjust sliders or modify inputs dynamically. No lag at all.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Optimized for Mobile</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Calculations are extremely easy on the go. Large buttons, readable outputs, and smooth inputs make checking store prices easy.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Batch Processing Tools</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Copy and paste a dozen list prices simultaneously to retrieve discount variations in tables formatted explicitly for exportation.</p>
          </div>
        </div>
      </section>
    </>
  );
}
