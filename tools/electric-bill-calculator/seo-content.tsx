export default function ElectricBillCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-12">

      {/* Introduction */}
      <section className="prose prose-slate max-w-none">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Electric Bill Calculator – Estimate Your Electricity Cost Instantly</h2>
        
        <p className="text-lg text-gray-700 leading-relaxed">
          Calculate your electricity bill accurately with our free online electric bill calculator. Support for both flat rate and tiered (slab) billing systems, with detailed cost breakdowns, tax calculations, and export options. Perfect for homeowners, tenants, and businesses.
        </p>
      </section>

      {/* How to Use */}
      <section className="bg-blue-50 rounded-xl p-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Calculator</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { step: "1", title: "Enter Consumption", desc: "Input your electricity usage in kWh (kilowatt-hours)" },
            { step: "2", title: "Select Billing Type", desc: "Choose between flat rate or tiered (slab) rate system" },
            { step: "3", title: "Set Rates", desc: "Enter your electricity rate or configure slab rates" },
            { step: "4", title: "Add Charges", desc: "Include service charges, meter charges, and tax if applicable" }
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">{item.step}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="prose prose-slate max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-4 not-prose">
          {[
            { icon: "⚡", title: "Real-Time Calculation", desc: "Instant results as you type" },
            { icon: "📊", title: "Detailed Breakdown", desc: "See cost per slab and charges" },
            { icon: "💾", title: "Save History", desc: "Track previous calculations" },
            { icon: "📥", title: "Export Options", desc: "Download as CSV or TXT" },
            { icon: "🌍", title: "Multi-Currency", desc: "Support for BDT, USD, EUR, GBP, INR" },
            { icon: "🎯", title: "Quick Presets", desc: "Pre-configured tariff templates" }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Understanding Billing Types */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Understanding Billing Types</h3>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 border border-amber-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📏</span>
              Flat Rate Billing
            </h4>
            <p className="text-gray-700 mb-3">
              Simple pricing where every unit of electricity costs the same amount regardless of consumption.
            </p>
            <div className="bg-gray-50 rounded p-3 font-mono text-sm">
              <strong>Formula:</strong> Total = Units × Rate + Fixed Charges + Tax
            </div>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Example:</strong> 200 kWh × $0.12 = $24.00
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-amber-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Tiered (Slab) Rate Billing
            </h4>
            <p className="text-gray-700 mb-3">
              Progressive pricing where different consumption ranges have different rates. Higher consumption typically costs more per unit.
            </p>
            <div className="bg-gray-50 rounded p-3 text-sm space-y-1">
              <div><strong>Slab 1:</strong> 0-100 kWh @ $0.08/unit = $8.00</div>
              <div><strong>Slab 2:</strong> 101-200 kWh @ $0.10/unit = $10.00</div>
              <div><strong>Slab 3:</strong> 201-300 kWh @ $0.12/unit = $12.00</div>
              <div className="pt-2 border-t border-gray-200"><strong>Total:</strong> $30.00</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips to Reduce Bill */}
      <section className="prose prose-slate max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">10 Tips to Reduce Your Electricity Bill</h3>
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          {[
            { tip: "Use LED Bulbs", desc: "Replace incandescent bulbs with energy-efficient LEDs" },
            { tip: "Unplug Devices", desc: "Eliminate phantom power drain from idle electronics" },
            { tip: "Optimize AC Usage", desc: "Set thermostat to 24-26°C and use fans" },
            { tip: "Use Energy Star Appliances", desc: "Choose certified energy-efficient appliances" },
            { tip: "Wash with Cold Water", desc: "Use cold water for laundry when possible" },
            { tip: "Seal Air Leaks", desc: "Improve insulation to reduce heating/cooling costs" },
            { tip: "Use Natural Light", desc: "Open curtains during day to reduce lighting needs" },
            { tip: "Regular Maintenance", desc: "Clean AC filters and service appliances regularly" },
            { tip: "Smart Power Strips", desc: "Use power strips to easily turn off multiple devices" },
            { tip: "Time-of-Use Rates", desc: "Run heavy appliances during off-peak hours" }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">{index + 1}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.tip}</h4>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Tariff Examples */}
      <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Electricity Tariff Examples</h3>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 border-l-4 border-amber-500">
            <h4 className="font-bold text-gray-900 mb-2">Bangladesh Residential Tariff</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div>0-75 kWh: 4.00 BDT/unit</div>
              <div>76-200 kWh: 5.30 BDT/unit</div>
              <div>201-300 kWh: 5.80 BDT/unit</div>
              <div>301-400 kWh: 6.00 BDT/unit</div>
              <div>401-600 kWh: 9.50 BDT/unit</div>
              <div>601+ kWh: 11.00 BDT/unit</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-900 mb-2">India Residential Tariff (Typical)</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div>0-100 kWh: 3.00 INR/unit</div>
              <div>101-200 kWh: 4.50 INR/unit</div>
              <div>201-500 kWh: 6.00 INR/unit</div>
              <div>501+ kWh: 7.00 INR/unit</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-l-4 border-green-500">
            <h4 className="font-bold text-gray-900 mb-2">USA Average Residential Rate</h4>
            <div className="text-sm text-gray-700">
              Flat Rate: $0.12 - $0.15 per kWh (varies by state)
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="prose prose-slate max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4 not-prose">
          {[
            {
              q: "How do I find my electricity consumption in kWh?",
              a: "Check your electricity bill for the 'Units Consumed' or 'kWh Used' section. You can also read your meter at the beginning and end of the month and calculate the difference."
            },
            {
              q: "What is the difference between kW and kWh?",
              a: "kW (kilowatt) is a measure of power (rate of energy use), while kWh (kilowatt-hour) is a measure of energy consumption over time. Your bill is based on kWh. For example, a 1000W (1kW) appliance running for 1 hour uses 1 kWh."
            },
            {
              q: "Why is tiered billing used?",
              a: "Tiered (slab) billing encourages energy conservation by charging higher rates for higher consumption levels. It makes electricity more affordable for low-usage households while discouraging excessive consumption."
            },
            {
              q: "What are service charges and meter charges?",
              a: "Service charges are fixed monthly fees for maintaining the electricity infrastructure. Meter charges cover the cost of meter reading and maintenance. These are added to your energy consumption cost."
            },
            {
              q: "How accurate is this calculator?",
              a: "This calculator provides accurate estimates based on the rates and charges you input. However, actual bills may vary slightly due to rounding, additional fees, or billing adjustments by your utility company."
            },
            {
              q: "Can I use this for commercial billing?",
              a: "Yes! Simply enter your commercial tariff rates. Commercial rates are often different from residential rates and may have different slab structures or flat rates."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                <span className="text-amber-600">Q:</span>
                {faq.q}
              </h4>
              <p className="text-sm text-gray-700 pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Energy Saving Tips */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Electricity Usage</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Average Household Consumption</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span><strong>Small Apartment:</strong> 100-200 kWh/month</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span><strong>Medium House:</strong> 300-500 kWh/month</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span><strong>Large House:</strong> 600-1000 kWh/month</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">High-Consumption Appliances</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span><strong>Air Conditioner:</strong> 1000-3000W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span><strong>Water Heater:</strong> 3000-4500W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span><strong>Electric Oven:</strong> 2000-5000W</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span><strong>Refrigerator:</strong> 100-800W</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "Percentage Calculator", desc: "Calculate percentages easily" },
            { name: "Discount Calculator", desc: "Find discounted prices" },
            { name: "Tip Calculator", desc: "Calculate tips and split bills" },
            { name: "Loan EMI Calculator", desc: "Calculate loan payments" },
            { name: "GST/VAT Calculator", desc: "Calculate tax amounts" },
            { name: "Salary Calculator", desc: "Calculate take-home pay" }
          ].map((tool, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{tool.name}</h4>
              <p className="text-xs text-gray-600">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
