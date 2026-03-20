import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Power Consumption Calculator Online – Estimate Electric Bill by Appliance Usage | Productive Toolbox",
  description: "Free online Power Consumption Calculator. Add appliances, set wattage and usage hours, input electricity rate, and instantly calculate daily, monthly, and yearly electricity costs entirely in your browser.",
  keywords: [
    "power consumption calculator",
    "electricity bill calculator",
    "electric bill estimator",
    "appliance power calculator",
    "energy consumption calculator",
    "kWh calculator",
    "electricity cost calculator",
    "monthly electricity bill",
    "power usage calculator",
    "energy usage calculator",
    "wattage calculator",
    "electricity rate calculator",
    "home energy calculator",
    "appliance energy calculator",
    "free electricity calculator"
  ],
  openGraph: {
    title: "Power Consumption Calculator Online – Estimate Electric Bill by Appliance Usage",
    description: "Calculate electricity consumption and costs for multiple appliances. Add wattage, usage hours, and electricity rates to estimate daily, monthly, and yearly bills instantly.",
    type: "website",
    url: "/tools/power-consumption-calculator"
  }
};

export default function PowerConsumptionCalculatorSEO() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Power Consumption Calculator",
    "description": "Free online Power Consumption Calculator. Add appliances, set wattage and usage hours, input electricity rate, and instantly calculate daily, monthly, and yearly electricity costs entirely in your browser.",
    "url": "https://www.productivetoolbox.com/tools/calculator/power-consumption-calculator",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Add multiple appliances with custom wattage and usage hours",
      "Real-time consumption and cost calculations",
      "Calculate daily, monthly, and yearly electricity usage",
      "Editable appliance table for instant recalculation",
      "Remove individual appliances from the list",
      "Customizable electricity rate per kWh",
      "View total consumption and estimated bills",
      "Copy results to clipboard",
      "Download appliance list as CSV",
      "Save appliance list to browser storage",
      "Load previously saved appliance lists",
      "Clear all appliances with one click",
      "Responsive design for all devices",
      "100% client-side processing"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a power consumption calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A power consumption calculator estimates how much electricity your appliances use and how much that usage costs. It converts watts and daily runtime into kWh, then multiplies by your electricity rate."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate electricity bill from wattage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use this formula: Daily kWh = (Wattage x Hours per Day) / 1000. Monthly kWh = Daily kWh x 30. Monthly Cost = Monthly kWh x Electricity Rate per kWh."
        }
      },
      {
        "@type": "Question",
        "name": "Can I add multiple appliances in one calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. This calculator is designed for multi-appliance tracking. You can add each appliance separately and get combined daily, monthly, and yearly totals."
        }
      },
      {
        "@type": "Question",
        "name": "Is this electricity cost calculator free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The tool is completely free and runs in your browser with no sign-up required."
        }
      },
      {
        "@type": "Question",
        "name": "Does this tool work for home and office energy planning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can use it for home appliances, office equipment, studio setups, classroom devices, and other environments where wattage and usage hours are known."
        }
      },
      {
        "@type": "Question",
        "name": "What makes this tool better than many basic calculators?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many calculators only handle one device at a time. This tool supports multiple appliances, editable rows, instant totals, CSV export, copy summary, and save or load appliance lists for repeat planning."
        }
      },
      {
        "@type": "Question",
        "name": "Are the results exact?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Results are planning estimates. Actual bills can vary because of tiered rates, fixed charges, taxes, seasonal tariffs, and time-of-use billing policies from your electricity provider."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Appliance Power Consumption and Electricity Cost",
    "description": "Step-by-step method to estimate electricity usage and bill using appliance wattage and runtime.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Add appliance details",
        "text": "Enter appliance name, wattage, and hours used per day."
      },
      {
        "@type": "HowToStep",
        "name": "Set electricity rate",
        "text": "Input your local electricity rate in cost per kWh."
      },
      {
        "@type": "HowToStep",
        "name": "Review usage totals",
        "text": "Check daily, monthly, and yearly kWh and bill estimates."
      },
      {
        "@type": "HowToStep",
        "name": "Adjust and compare scenarios",
        "text": "Edit appliance wattage, hours, or rates to compare different usage patterns."
      },
      {
        "@type": "HowToStep",
        "name": "Export or save the estimate",
        "text": "Copy summary, download CSV, or save the appliance list for future tracking."
      }
    ]
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto p-6 space-y-8 text-slate-700" style={{ fontFamily: "var(--font-body)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Power Consumption Calculator to Estimate Appliance Energy Use and Electricity Bill
        </h2>
        <p className="leading-relaxed">
          This free power consumption calculator helps you estimate electricity usage and energy cost for individual appliances
          and full household setups. If you are searching for an electricity bill calculator, kWh calculator, appliance energy
          calculator, or wattage calculator, this tool combines all of those use cases in one place.
        </p>
        <p className="leading-relaxed">
          Instead of guessing your monthly bill, you can enter the actual appliance wattage, average runtime in hours per day,
          and your local electricity rate per kWh. The calculator instantly shows daily, monthly, and yearly power consumption
          with cost breakdowns so you can plan spending, compare devices, and reduce unnecessary energy waste.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Electricity Calculation Formula Used by the Tool
        </h2>
        <p className="leading-relaxed">
          The logic follows the standard energy conversion method used in most utility calculations:
        </p>
        <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`Daily kWh = (Wattage x Hours per Day) / 1000
Monthly kWh = Daily kWh x 30
Yearly kWh = Monthly kWh x 12
Cost = kWh x Electricity Rate`}
        </pre>
        <p className="leading-relaxed">
          Example: a 100W device used for 8 hours per day consumes 0.8 kWh daily. At $0.15 per kWh, monthly cost is about
          $3.60 and yearly cost is about $43.20. The calculator automates this across multiple appliances and totals everything
          in one view.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Power Consumption Calculator
        </h2>
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-2">1. Add each appliance</h3>
            <p className="text-sm">
              Enter appliance name, power in watts, and average hours used per day. Add all devices you want to track.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-2">2. Enter your electricity rate</h3>
            <p className="text-sm">
              Set cost per kWh based on your utility bill or current tariff. This ensures realistic cost estimation.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-2">3. Review daily, monthly, and yearly totals</h3>
            <p className="text-sm">
              The tool shows combined kWh and cost so you can understand both short-term and long-term energy impact.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-2">4. Edit values to compare scenarios</h3>
            <p className="text-sm">
              Change wattage, hours, or rate to compare device choices, usage habits, and expected bill differences.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-2">5. Save or export your data</h3>
            <p className="text-sm">
              Copy summary, download CSV, or save your appliance list in browser storage for future bill planning.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Why This Tool Is Better Than Many Basic Online Electricity Calculators
        </h2>
        <p className="leading-relaxed">
          Many tools only offer a single-device estimate and force you to recalculate repeatedly. This calculator is built for
          real usage planning where people need multiple appliances, editable rows, and full cost summaries.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Multi-Appliance Estimation</h3>
            <p className="text-sm">
              Track refrigerator, AC, fan, lights, laptop, TV, and more together instead of calculating one by one.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Instant Editable Results</h3>
            <p className="text-sm">
              Update any row and instantly see new totals. Useful for quick what-if analysis before buying new devices.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Planning-Friendly Outputs</h3>
            <p className="text-sm">
              See daily, monthly, and yearly kWh and cost in one place to support both budget and efficiency decisions.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">CSV Export and Shareable Summary</h3>
            <p className="text-sm">
              Download structured data for reports, utility planning, and client or family discussion.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Save and Load Appliance Lists</h3>
            <p className="text-sm">
              Reuse your setup without retyping everything. Helpful for recurring monthly tracking.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Private, Browser-Based Experience</h3>
            <p className="text-sm">
              Calculations run on your device with no account required, which keeps the workflow fast and friction-free.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Common Appliance Power Ranges for Quick Estimation
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                <th className="text-left p-3 border-b border-slate-200">Appliance</th>
                <th className="text-left p-3 border-b border-slate-200">Typical Wattage Range</th>
                <th className="text-left p-3 border-b border-slate-200">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="p-3">LED Bulb</td>
                <td className="p-3">5W - 15W</td>
                <td className="p-3">Low-cost lighting, ideal for all-day usage scenarios.</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3">Ceiling Fan</td>
                <td className="p-3">50W - 90W</td>
                <td className="p-3">High runtime can create noticeable monthly cost.</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3">Laptop</td>
                <td className="p-3">30W - 100W</td>
                <td className="p-3">Depends on workload and charger type.</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3">Refrigerator</td>
                <td className="p-3">100W - 800W</td>
                <td className="p-3">Runs in cycles, effective daily use is spread over 24 hours.</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-3">Air Conditioner</td>
                <td className="p-3">1000W - 5000W</td>
                <td className="p-3">One of the largest contributors to summer electricity bills.</td>
              </tr>
              <tr>
                <td className="p-3">Washing Machine</td>
                <td className="p-3">500W - 2000W</td>
                <td className="p-3">Cost impact depends mostly on cycle count per week.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Actual values vary by model, inverter technology, cycle behavior, climate, and user settings. Use manufacturer labels
          or smart plug measurements when possible for higher accuracy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Who Should Use an Electricity Consumption Calculator
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Homeowners and tenants planning monthly utility budgets.</li>
          <li>Students and shared apartments splitting electricity costs fairly.</li>
          <li>Small offices checking workstation and cooling energy usage.</li>
          <li>Facility managers comparing appliance replacement options.</li>
          <li>Solar and energy-efficiency planners estimating baseline demand.</li>
          <li>Anyone trying to reduce electricity bill with data-driven decisions.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Practical Tips to Reduce Your Electricity Bill
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Prioritize high-wattage devices first because they create the largest savings potential.</li>
          <li>Reduce unnecessary runtime for AC, heaters, dryers, and entertainment devices.</li>
          <li>Replace older appliances with energy-efficient models where payback period is practical.</li>
          <li>Use timers and smart plugs to control standby or overnight consumption.</li>
          <li>Track monthly usage with this calculator and compare against your utility bill trend.</li>
          <li>Recheck local tariff structure if your provider uses tiered or time-of-use pricing.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">What is kWh and why does it matter?</h3>
            <p className="text-sm">
              kWh stands for kilowatt-hour, the unit utility companies use for billing electricity usage.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">Can I use this as a home energy calculator?</h3>
            <p className="text-sm">
              Yes. Add all major home appliances and use your utility rate for a practical whole-home estimate.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">Does this include taxes and fixed charges?</h3>
            <p className="text-sm">
              No. Results estimate variable energy cost. Final utility bills may include taxes, service fees, and surcharges.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">Is this tool mobile friendly?</h3>
            <p className="text-sm">
              Yes. The interface is responsive and works on desktop, tablet, and mobile browsers.
            </p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h3 className="font-semibold text-slate-900 mb-1">Do I need to create an account?</h3>
            <p className="text-sm">
              No sign-up is required. You can calculate, copy, export, save, and load your appliance list directly in browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
