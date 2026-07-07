export default function CPACalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Cost Per Acquisition (CPA) Calculator?
        </h2>
        <div className="prose-style space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>Cost Per Acquisition (CPA) calculator</strong> tells you exactly how much you spend in marketing to acquire one customer, lead, or conversion. It takes your total marketing spend and divides it by the number of acquisitions during the same period — producing the metric that directly determines whether a marketing channel is profitable: <em>how much does one customer cost, and is that less than what they are worth?</em>
          </p>
          <p>
            CPA sits at the heart of performance marketing. Unlike Cost Per Click (which measures traffic efficiency) or impressions (which measure reach), CPA measures the bottom-line efficiency of your entire acquisition funnel — from first ad impression through to completed conversion. A campaign with a $0.50 CPC can still have a $300 CPA if the funnel leaks at every stage. CPA is the metric that exposes that reality.
          </p>
          <p>
            This tool is built for <strong>performance marketers, PPC managers, media buyers, growth teams, marketing agency analysts, ecommerce operators, SaaS founders, and marketing students</strong> who need to measure, report, and optimise acquisition cost across channels. It supports 10 currencies, includes industry preset buttons for instant benchmarking, exports to CSV and TXT, saves shareable URLs for every calculation, and runs entirely in your browser with no data sent to any server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How CPA Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The CPA formula is a single division: total marketing spend divided by the number of acquisitions in the same period. The result is the average cost incurred for each unit of acquisition — whether that acquisition is defined as a purchase, a free trial sign-up, a lead form submission, an app install, or any other conversion event your business tracks.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">CPA</span> = Total Marketing Spend ÷ Total Acquisitions</p>
            </div>
            <p className="text-xs text-gray-400 mt-3">Example: $3,000 spent ÷ 60 customers = <span className="font-semibold text-primary">$50.00 CPA</span></p>
          </div>
          <p>
            The simplicity of the formula masks several important definitional choices that determine whether your CPA figure is meaningful or misleading:
          </p>
          <ul className="space-y-3 text-sm">
            {[
              ["What counts as 'spend'", "CPA should include all costs attributable to acquisition — not just media spend. Agency fees, creative production costs, landing page tool subscriptions, and A/B testing platform costs all contribute to the real cost of acquiring a customer. Many marketers understate CPA by excluding these."],
              ["What counts as an 'acquisition'", "Define your conversion event precisely and consistently. A purchase is the clearest acquisition. A free trial, a lead form, a booked demo, or an app install are all valid acquisition events — but they have different downstream conversion rates and therefore different economic values. CPA only becomes comparable across periods when the definition stays fixed."],
              ["Attribution model impact", "CPA changes dramatically based on the attribution model used. Last-click attribution assigns 100% of the acquisition credit to the last touchpoint before conversion — typically undervaluing top-of-funnel channels and overstating their CPA. Data-driven and linear attribution models distribute credit across all touchpoints and produce a more accurate picture of channel CPA."],
              ["CPA vs. CAC", "CPA (Cost Per Acquisition) typically refers to a specific campaign or channel metric. CAC (Customer Acquisition Cost) is a broader business metric that includes all sales and marketing costs — salaries, tools, events, and overhead — divided by all new customers acquired in a period. CAC is always higher than channel CPA."],
              ["Time period alignment", "Spend and acquisitions must cover exactly the same date range. Mismatched periods — especially at month boundaries — are the most common source of inaccurate CPA calculations. If there is a conversion lag (time between click and purchase), consider using a 7–14 day lookback window for conversions rather than same-day attribution."],
            ].map(([term, desc]) => (
              <li key={term} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{term}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the CPA Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Total Marketing Spend", "Type the total amount spent on your campaign or channel for the period. Pull this directly from your ad platform billing summary, agency invoice, or attribution dashboard. Include all costs attributable to acquisition for the period — media spend, creative fees, and any variable tool costs — for the most accurate CPA figure."],
                ["Enter Total Acquisitions", "Type the number of customers, conversions, or leads acquired during the same period. Define your acquisition event before entering — a purchase, a sign-up, a booked demo, or an app install are all valid. Make sure the conversion count matches the same date window as your spend figure."],
                ["Select Your Currency", "Choose from 10 supported currencies including USD, EUR, GBP, INR, AED, and more. Currency applies to display formatting only — no conversion is performed, so the tool works correctly for any market."],
                ["Use Industry Presets (Optional)", "Click a preset button to instantly load a typical spend and acquisition scenario for your industry — useful for benchmarking your current CPA against what well-run campaigns in your sector typically achieve."],
                ["Read the Performance Badge", "Your CPA result appears instantly alongside a badge — Excellent, Good, Average, High, or Very High — with a plain-language interpretation of what that number means relative to typical acquisition costs."],
                ["Export or Share", "Copy the result to clipboard, export a full report as CSV or TXT, or use the shareable URL to send the exact calculation with all inputs pre-filled to a colleague, client, or investor."],
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
                "Real-time CPA calculation as you type — no submit button",
                "Performance badge: Excellent / Good / Average / High / Very High",
                "Plain-language interpretation for every result",
                "Industry preset buttons for instant benchmarking",
                "10 currency options (USD, EUR, GBP, INR, AED, and more)",
                "Step-by-step formula breakdown shown",
                "Copy result or full summary to clipboard",
                "Export full report as CSV or TXT",
                "Shareable URL — every calculation gets a permanent link",
                "Calculation history saved locally (up to 20 entries)",
                "100% browser-based — no data leaves your device",
                "No signup, no account, no rate limits",
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
              title: "Measuring Paid Channel Profitability for Ecommerce",
              scenario: "A Shopify store runs Google Shopping and Meta Ads simultaneously. Google spent $2,200 and drove 44 purchases — a $50 CPA. Meta spent $1,800 and drove 60 purchases — a $30 CPA. The store's average order value is $85 and product margin is 55% ($46.75 gross profit per order). Google's $50 CPA exceeds the gross profit per order, making it unprofitable at the current conversion rate. Meta's $30 CPA leaves $16.75 gross profit per acquisition. Budget is reallocated accordingly.",
            },
            {
              title: "SaaS Paid Acquisition Unit Economics",
              scenario: "A B2B SaaS startup runs LinkedIn Ads targeting mid-market operations managers. Monthly spend is $8,500. Over 30 days, 17 free trials were activated, producing a $500 CPA. Average trial-to-paid conversion rate is 25%, making the effective cost per paying customer $2,000. Average contract value is $4,800/year with a 3-year average retention — LTV of $14,400. The CPA:LTV ratio is 1:7.2, well above the 1:3 benchmark, confirming the channel is viable at current scale.",
            },
            {
              title: "Agency Monthly Client Performance Report",
              scenario: "A performance marketing agency runs campaigns for 8 clients. An account manager uses the CPA calculator for each client to produce the month-end summary: actual CPA vs. target CPA, delta percentage, and trend vs. prior month. For a legal services client with a $350 target CPA, the actual result of $298 is a 14.9% improvement — exported as CSV and dropped into the client report template. The shareable URL is included so the client can verify inputs directly.",
            },
            {
              title: "Validating a New Channel Before Scaling Budget",
              scenario: "A growth team is testing Pinterest Ads as a new acquisition channel with a $1,500 test budget. After 3 weeks, 12 conversions are recorded — a $125 CPA. Their existing Google Ads CPA is $65. Before recommending a budget increase, the growth manager enters both figures into the CPA calculator and compares against the maximum viable CPA (LTV × target payback period). Pinterest's higher CPA disqualifies it from immediate scaling, but the data is saved via shareable URL for a follow-up review after creative optimisation.",
            },
            {
              title: "Modelling CPA Improvement from Funnel Optimisation",
              scenario: "An ecommerce team is considering a landing page redesign that is projected to improve conversion rate from 2.1% to 3.5%. Current spend is $5,000/month with 105 acquisitions — a $47.62 CPA. If the redesign delivers the projected CVR improvement, the same $5,000 spend would produce 175 acquisitions — a $28.57 CPA. The team enters both scenarios into the calculator and uses the shareable URLs for both in the A/B test project brief, showing the CPA reduction that would justify the design investment.",
            },
            {
              title: "Investor Pitch Unit Economics Slide",
              scenario: "A consumer app founder is preparing a Series A pitch. They use the CPA calculator to present acquisition economics across three channels: paid social ($18 CPA, 2,200 installs/month), influencer ($11 CPA, 900 installs/month), and referral ($4 CPA, 600 installs/month). Each scenario's shareable URL is embedded in the pitch deck appendix. The blended CPA of $13.50 is compared against a $42 LTV — a 1:3.1 ratio that demonstrates scalable, profitable acquisition ahead of the raise.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Best Practices ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Set your target CPA before launching a campaign, not after. Work backward from your unit economics: take your average order value, multiply by gross margin, then multiply by the fraction of that profit you are willing to invest in acquisition. This gives you a maximum viable CPA — your pre-launch ceiling. Campaigns that cannot reach this ceiling at scale should be stopped or restructured.",
                "Calculate CPA at the product or SKU level for ecommerce, not just at the campaign level. A campaign selling three products at wildly different margins produces a blended CPA that hides the fact that one product is unprofitable. Use product-segmented reporting to calculate CPA per product against per-product gross profit.",
                "Track CPA trends weekly, not just monthly. A monthly snapshot misses mid-month degradation caused by auction changes, competitor budget increases, or audience fatigue. A rising CPA trend over 2–3 weeks is an early warning signal — catching it at week 3 is far less expensive than discovering it at month end.",
                "Use Target CPA bidding in Google Ads only after you have at least 30–50 conversions per month per campaign. Smart bidding algorithms need sufficient conversion data to optimise effectively. Setting a Target CPA bid on a new campaign with 5 conversions per month will produce erratic results — use Manual CPC or Maximize Conversions first to build the dataset.",
                "Always compare CPA against LTV, not just order value. A $120 CPA on a product with an $80 AOV looks unprofitable — but if those customers return 3 times per year, the 12-month LTV is $240. CPA:LTV ratio, not CPA:AOV, is the correct profitability test for subscription and repeat-purchase businesses.",
                "Segment CPA by new customer vs. returning customer. Most attribution systems mix the two. Returning customers cost less to acquire (lower CPCs on branded terms, higher organic return rate) and inflate the perceived efficiency of paid channels. True new customer CPA — often 2–4× the blended figure — is the metric that determines whether your acquisition engine is actually growing the customer base.",
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
                "Don't optimise for CPA without considering conversion quality. A campaign that lowers CPA by attracting less-qualified leads may produce customers with lower LTV, higher churn, or more support costs. Always validate that CPA improvements translate to equivalent revenue improvements — not just cheaper, lower-value acquisitions.",
                "Don't use last-click attribution to evaluate top-of-funnel channels. A YouTube awareness campaign will never have a great last-click CPA — users rarely convert directly from a video ad. Using last-click attribution to judge it starves a channel that may be contributing significantly to conversions attributed to other touchpoints. Use data-driven or position-based attribution when evaluating multi-touch campaigns.",
                "Don't set the same CPA target for all campaigns in a portfolio. A retargeting campaign targeting users who added to cart should achieve a much lower CPA than a prospecting campaign targeting cold audiences. Applying one blended CPA target across both types results in over-bidding on prospecting (wasting budget) or under-bidding on retargeting (leaving easy conversions on the table).",
                "Don't ignore the post-acquisition funnel when CPA looks good. A low CPA can mask a broken post-acquisition experience. If 60% of acquired users churn in the first 30 days, your effective cost per retained customer is 2.5× your reported CPA. Monitor 30-day and 90-day retention alongside CPA to get a complete picture.",
                "Don't compare CPA across channels without adjusting for conversion lag. Google Search conversions often happen within hours of a click. Facebook awareness campaigns may produce conversions 7–14 days after exposure. A 7-day CPA on Meta may look artificially high if measured the same day, while appearing reasonable with a 14-day attribution window. Always use consistent attribution windows when comparing channels.",
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

      {/* ── 6. Formula Reference ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          CPA Formula Reference
        </h2>
        <div className="space-y-4 mb-8">
          {[
            { name: "CPA",                    formula: "Total Marketing Spend ÷ Total Acquisitions",                         example: "$3,000 ÷ 60 = $50.00" },
            { name: "Total Spend",            formula: "CPA × Total Acquisitions",                                           example: "$50 × 60 = $3,000" },
            { name: "Total Acquisitions",     formula: "Total Marketing Spend ÷ CPA",                                        example: "$3,000 ÷ $50 = 60 acquisitions" },
            { name: "Max Viable CPA",         formula: "Average Order Value × Gross Margin %",                               example: "$120 × 40% = $48 max CPA" },
            { name: "CPA from CPC + CVR",     formula: "CPC ÷ Conversion Rate",                                              example: "$2.00 ÷ 4% = $50.00 CPA" },
            { name: "Customer Acq. Cost",     formula: "(Total Sales & Marketing Costs) ÷ New Customers",                    example: "$25,000 ÷ 200 = $125 CAC" },
            { name: "CPA:LTV Ratio",          formula: "Customer Lifetime Value ÷ CPA",                                      example: "$450 LTV ÷ $50 CPA = 9× ratio" },
            { name: "ROAS",                   formula: "Revenue from Ads ÷ Total Ad Spend",                                   example: "$9,000 ÷ $3,000 = 3.0× ROAS" },
          ].map(({ name, formula, example }) => (
            <div key={name} className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="md:w-48 flex-shrink-0">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{name}</span>
              </div>
              <div className="flex-1 font-mono text-sm text-gray-800">{formula}</div>
              <div className="md:w-52 text-sm text-green-600 font-semibold font-mono">{example}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
          <strong>CPA:LTV Rule of Thumb:</strong> A healthy acquisition business typically targets a CPA:LTV ratio of 1:3 or better — meaning each customer is worth at least 3× what it cost to acquire them. Ratios below 1:1 mean the business loses money on every customer. Ratios above 1:5 suggest the business is underinvesting in growth relative to the value it creates.
        </div>
      </section>

      {/* ── Benchmarks ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Average CPA Benchmarks by Industry
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Google Ads Avg CPA</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Meta Ads Avg CPA</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Ecommerce (General)",     "$45–$65",    "$38–$55",    "Varies heavily by product price and AOV"],
                ["SaaS / Technology",       "$100–$300",  "$75–$200",   "Higher LTV justifies elevated CPA"],
                ["Finance & Insurance",     "$175–$400",  "$100–$250",  "High-value conversions drive premium CPAs"],
                ["Health & Fitness",        "$40–$80",    "$30–$60",    "Broad audience keeps costs moderate"],
                ["Education / eLearning",   "$60–$150",   "$40–$100",   "Course price and funnel depth affect CPA"],
                ["Travel & Hospitality",    "$50–$120",   "$35–$90",    "Seasonal swings significantly impact CPA"],
                ["Real Estate",             "$200–$500+", "$150–$350",  "Long sales cycles inflate acquisition cost"],
                ["Legal Services",          "$300–$900+", "$200–$500",  "Very high lead values justify extreme CPAs"],
                ["B2B Lead Generation",     "$150–$400",  "$100–$300",  "Offline sales cycle means CPA:LTV ratio matters more than absolute CPA"],
                ["Consumer Apps",           "$2–$25",     "$1–$15",     "Mobile installs are cheap; paying user CPA is 5–10× higher"],
              ].map(([industry, google, meta, note]) => (
                <tr key={industry} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{industry}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{google}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{meta}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Benchmarks are approximate industry averages. Actual CPA varies by keyword targeting, audience quality, landing page conversion rate, campaign maturity, and attribution model used.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Cost Per Acquisition (CPA)?",
              a: "Cost Per Acquisition (CPA) is the average amount spent in marketing to acquire one customer, lead, or conversion. It is calculated by dividing total marketing spend by the number of acquisitions in the same period. CPA is the most direct measure of paid acquisition efficiency because it links spend to outcomes — not just traffic or impressions. It answers the fundamental performance marketing question: how much does it cost to get one customer?",
            },
            {
              q: "How is CPA calculated?",
              a: "CPA is calculated by dividing total marketing spend by the number of acquisitions. For example, if you spent $4,500 and acquired 90 customers, your CPA is $4,500 ÷ 90 = $50. The key is ensuring that spend and acquisitions cover exactly the same date range and that you have a consistent definition of what counts as an acquisition — a purchase, a sign-up, a booked call, or any other defined conversion event.",
            },
            {
              q: "What is a good CPA?",
              a: "A good CPA is one that is below your maximum viable CPA — the threshold at which acquiring a customer is still profitable. Calculate your max viable CPA by multiplying average order value by gross margin percentage. For example, $100 AOV × 40% margin = $40 max CPA. Any CPA below that threshold means each acquisition contributes positively to profit. For subscription businesses, multiply by LTV instead of AOV. There is no universal 'good' CPA — it is always relative to what an acquired customer is worth.",
            },
            {
              q: "What is the difference between CPA and CPC?",
              a: "CPC (Cost Per Click) measures the cost of each click on your ad — it tells you traffic acquisition efficiency. CPA (Cost Per Acquisition) measures the cost of each conversion — it tells you customer acquisition efficiency. CPA = CPC ÷ Conversion Rate. A low CPC does not guarantee a low CPA — if your landing page converts at 0.5%, a $1.00 CPC produces a $200 CPA. CPA is the downstream metric that matters for business profitability; CPC is an upstream input that contributes to it.",
            },
            {
              q: "What is Target CPA (tCPA) in Google Ads?",
              a: "Target CPA is a Smart Bidding strategy in Google Ads where the algorithm automatically sets bids in each auction to try to achieve your specified CPA goal on average. Instead of managing bids manually, you set the CPA you want (e.g., $50), and Google's machine learning adjusts bids up or down in real time based on predicted conversion probability. tCPA requires at least 30–50 conversions per month per campaign to perform well — below that threshold, the algorithm lacks sufficient data to optimise effectively.",
            },
            {
              q: "What is the difference between CPA and CAC?",
              a: "CPA (Cost Per Acquisition) typically refers to a specific campaign, channel, or ad set metric — it reflects the direct media cost of one conversion. CAC (Customer Acquisition Cost) is a broader business metric that includes all sales and marketing expenses: salaries, tools, events, content production, and agency fees — divided by all new customers acquired in a period. CAC is always higher than channel CPA. CAC is used for business-level unit economics; CPA is used for campaign-level optimisation.",
            },
            {
              q: "How do I reduce my CPA?",
              a: "There are four main levers: (1) Improve landing page conversion rate — this is the highest-impact lever because every percentage point improvement reduces CPA proportionally. (2) Tighten audience targeting to reduce irrelevant traffic that clicks but does not convert. (3) Improve ad creative to increase CTR and attract higher-intent clicks, which tend to convert at a higher rate. (4) Add negative keywords to stop paying for clicks from users who will never convert. Reducing CPC alone rarely produces sustained CPA improvements unless conversion rate is also addressed.",
            },
            {
              q: "What is a good CPA:LTV ratio?",
              a: "A CPA:LTV ratio of 1:3 or better is the standard benchmark for healthy paid acquisition — meaning each customer is worth at least three times what it cost to acquire them. Ratios of 1:5 or higher suggest the business is underinvesting in paid growth relative to the value it creates. Ratios below 1:2 put businesses in a difficult cash flow position where payback period exceeds retention rates. Calculating LTV requires knowing average order value, purchase frequency, and average customer lifespan.",
            },
            {
              q: "How does attribution model affect CPA calculations?",
              a: "Attribution model determines which marketing touchpoints receive credit for a conversion, which directly affects reported CPA per channel. Last-click attribution assigns 100% of credit to the final touchpoint before conversion — this understates the contribution of top-of-funnel channels (display, social awareness) and overstates their CPA. Data-driven attribution distributes credit across all touchpoints based on their actual contribution to conversion, producing more accurate per-channel CPAs. When comparing channel CPAs, always specify and standardise the attribution model being used.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your marketing spend figures, acquisition counts, and any other data you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature uses your browser's localStorage — data stays on your device only. This makes the tool safe to use for confidential campaign data, client account figures, and internal financial planning.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "📢", title: "PPC Managers",              desc: "Track acquisition costs across Google Ads and Microsoft Ads campaigns, audit against target CPA, and identify campaigns that need bid strategy or funnel fixes." },
            { icon: "📱", title: "Social Media Advertisers",  desc: "Measure CPA across Meta, LinkedIn, TikTok, and Pinterest to compare channel efficiency and shift budget from high-CPA to low-CPA acquisition sources." },
            { icon: "🛍️", title: "Ecommerce Operators",       desc: "Monitor campaign CPA against product-level gross margins to ensure every paid acquisition is profitable — at the SKU level, not just the account level." },
            { icon: "🏢", title: "Marketing Agencies",        desc: "Calculate and report CPA for multiple client accounts across channels and industries — with shareable URLs for transparent, verifiable client reporting." },
            { icon: "🚀", title: "Startup Founders",          desc: "Model acquisition economics across channels before scaling spend — using CPA alongside LTV to demonstrate viable unit economics to investors and the board." },
            { icon: "🎓", title: "Marketing Students",        desc: "Learn performance marketing fundamentals by calculating CPA from real campaign examples, with contextual benchmarks and plain-language interpretations." },
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
