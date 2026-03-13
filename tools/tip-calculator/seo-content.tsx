export default function TipCalculatorSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">How the Tip Calculator Works</h2>
        <p>
          Our Tip Calculator uses simple mathematical formulas to instantly calculate tips and split bills between multiple people. Here's how it works:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900">Step 1: Enter Bill Amount</h3>
            <p className="text-sm">Input the total bill amount before tip.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Step 2: Select Tip Percentage</h3>
            <p className="text-sm">Choose from preset options (10%, 15%, 18%, 20%) or use the slider for custom percentages.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Step 3: Set Number of People</h3>
            <p className="text-sm">Specify how many people are splitting the bill.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Step 4: View Results</h3>
            <p className="text-sm">See the tip amount, total bill, and per-person cost instantly.</p>
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Calculation Formulas</h2>
        <div className="bg-blue-50 p-4 rounded-lg space-y-3 font-mono text-sm">
          <div>
            <p className="font-semibold text-blue-900">Tip Amount:</p>
            <p className="text-blue-800">Tip = Bill Amount × (Tip % ÷ 100)</p>
          </div>
          <div>
            <p className="font-semibold text-blue-900">Total Bill:</p>
            <p className="text-blue-800">Total = Bill Amount + Tip Amount</p>
          </div>
          <div>
            <p className="font-semibold text-blue-900">Per Person Cost:</p>
            <p className="text-blue-800">Per Person = Total Bill ÷ Number of People</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Common Use Cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🍽️ Restaurant Dining</h3>
            <p className="text-sm">Calculate tips for restaurant bills and split costs among dining companions.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🚕 Taxi & Ride Services</h3>
            <p className="text-sm">Quickly calculate tips for drivers and split ride costs with passengers.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">✂️ Salon & Spa Services</h3>
            <p className="text-sm">Determine appropriate tips for haircuts, massages, and beauty treatments.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🏨 Hotel & Travel</h3>
            <p className="text-sm">Calculate tips for hotel staff, tour guides, and travel services.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🍕 Food Delivery</h3>
            <p className="text-sm">Determine fair tips for delivery drivers and split group orders.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🎉 Event Expenses</h3>
            <p className="text-sm">Split event costs and calculate service charges among attendees.</p>
          </div>
        </div>
      </section>

      {/* Tipping Guidelines */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Tipping Guidelines by Service</h2>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900">Restaurants</h3>
            <p className="text-sm">Standard: 15-20% | Excellent service: 20%+ | Poor service: 10-15%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900">Delivery Services</h3>
            <p className="text-sm">Standard: $2-5 or 15% | Long distance: $5-10 | Bad weather: Add 20%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900">Taxi & Rideshare</h3>
            <p className="text-sm">Standard: 15-20% | Short rides: $1-2 minimum | Long rides: 15-18%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900">Hair & Beauty</h3>
            <p className="text-sm">Standard: 15-20% | Excellent service: 20%+ | Haircut: 15-18%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900">Hotel Staff</h3>
            <p className="text-sm">Housekeeping: $2-5/night | Bellhop: $1-2/bag | Concierge: $5-10</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">What's a standard tip percentage?</h3>
            <p className="text-sm">In the US, 15-20% is standard for restaurants. 15% for average service, 18-20% for good service, and 20%+ for excellent service.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Should I tip on the pre-tax or post-tax amount?</h3>
            <p className="text-sm">Traditionally, tips are calculated on the pre-tax amount, but many people now tip on the total including tax. Use whichever feels right to you.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">How do I split a bill fairly?</h3>
            <p className="text-sm">Our calculator divides the total (including tip) equally among all people. For unequal splits, calculate each person's portion separately.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Can I round up the per-person amount?</h3>
            <p className="text-sm">Yes! Use the "Round up" option to round each person's share to the nearest dollar for easier payment.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Is my data saved?</h3>
            <p className="text-sm">Yes, your last settings and calculation history are saved locally in your browser using localStorage. No data is sent to servers.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Can I use this offline?</h3>
            <p className="text-sm">Yes! This calculator runs 100% in your browser with no internet required after the initial page load.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">What currencies are supported?</h3>
            <p className="text-sm">We support USD ($), EUR (€), GBP (£), and BDT (৳). The calculations work the same regardless of currency.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Can I copy the results?</h3>
            <p className="text-sm">Yes! Click any "Copy" button to copy individual amounts or the full summary to your clipboard.</p>
          </div>
        </div>
      </section>

      {/* Tips for Better Tipping */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Tips for Better Tipping Decisions</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="font-bold text-primary">✓</span>
            <span><strong>Consider service quality:</strong> Adjust your tip based on the quality of service received.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">✓</span>
            <span><strong>Account for difficulty:</strong> Tip more for complex orders or challenging situations.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">✓</span>
            <span><strong>Be consistent:</strong> Maintain similar tipping percentages across similar services.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">✓</span>
            <span><strong>Round up for small bills:</strong> For small amounts, rounding up is often appreciated.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">✓</span>
            <span><strong>Check local customs:</strong> Tipping norms vary by country and region.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">✓</span>
            <span><strong>Tip in cash when possible:</strong> Service workers often prefer cash tips.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">✓</span>
            <span><strong>Don't forget delivery drivers:</strong> They use their own vehicles and deserve fair compensation.</span>
          </li>
        </ul>
      </section>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">⚡</span>
            <span>Real-time calculations as you type</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">🎚️</span>
            <span>Interactive tip percentage slider</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">👥</span>
            <span>Split bills among multiple people</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">💱</span>
            <span>Multiple currency support</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">📋</span>
            <span>Copy results to clipboard</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">📊</span>
            <span>Visual bill split breakdown</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">💾</span>
            <span>Calculation history tracking</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">📱</span>
            <span>Mobile-responsive design</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">🔒</span>
            <span>100% client-side processing</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-primary font-bold">⚙️</span>
            <span>Settings saved locally</span>
          </div>
        </div>
      </section>

      {/* Example Calculations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Example Calculations</h2>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 1: Basic Restaurant Bill</h3>
            <p className="text-sm mb-2"><strong>Scenario:</strong> You have a $50 restaurant bill and want to leave a 18% tip.</p>
            <p className="text-sm mb-2"><strong>Calculation:</strong></p>
            <p className="text-sm font-mono">Tip = $50 × 0.18 = $9</p>
            <p className="text-sm font-mono">Total = $50 + $9 = $59</p>
            <p className="text-sm"><strong>Result:</strong> Leave a $9 tip for a $59 total.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 2: Splitting a Group Bill</h3>
            <p className="text-sm mb-2"><strong>Scenario:</strong> $120 bill for 4 people with 20% tip.</p>
            <p className="text-sm mb-2"><strong>Calculation:</strong></p>
            <p className="text-sm font-mono">Tip = $120 × 0.20 = $24</p>
            <p className="text-sm font-mono">Total = $120 + $24 = $144</p>
            <p className="text-sm font-mono">Per Person = $144 ÷ 4 = $36</p>
            <p className="text-sm"><strong>Result:</strong> Each person pays $36.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Example 3: Delivery with Rounding</h3>
            <p className="text-sm mb-2"><strong>Scenario:</strong> $35.50 delivery order, 15% tip, 2 people, round up.</p>
            <p className="text-sm mb-2"><strong>Calculation:</strong></p>
            <p className="text-sm font-mono">Tip = $35.50 × 0.15 = $5.33</p>
            <p className="text-sm font-mono">Total = $35.50 + $5.33 = $40.83</p>
            <p className="text-sm font-mono">Per Person = $40.83 ÷ 2 = $20.42 → Rounded = $21</p>
            <p className="text-sm"><strong>Result:</strong> Each person pays $21 (rounded up).</p>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Privacy & Security</h2>
        <p className="text-sm">
          Your privacy is important to us. This Tip Calculator:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Runs 100% in your browser with no server communication</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Stores settings locally using browser localStorage only</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Never collects or transmits your personal data</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Works offline after initial page load</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>No tracking, analytics, or third-party scripts</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
