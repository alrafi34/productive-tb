export default function CPCCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Cost Per Click (CPC) Calculator?
        </h2>
        <div className="prose-style space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>Cost Per Click (CPC) calculator</strong> tells you exactly how much you are paying for every visitor your paid ads deliver. It takes two numbers — total ad spend and total clicks — and produces the single metric that determines whether your paid acquisition channel is economically viable: average CPC. It answers the question every advertiser, marketing manager, and founder needs to answer before scaling a campaign: <em>how much does one click cost, and is that sustainable?</em>
          </p>
          <p>
            CPC is the foundation of performance marketing economics. It sits at the start of a conversion funnel calculation that flows from clicks → leads → customers → revenue. Without a clear CPC figure, you cannot calculate Cost Per Lead, Cost Per Acquisition, or Return on Ad Spend — the metrics that determine whether a channel is profitable or not. A campaign generating 10,000 clicks sounds impressive; a CPC of $0.18 and a CPC of $12.50 on those same 10,000 clicks represent completely different business realities.
          </p>
          <p>
            This tool is built for <strong>PPC specialists, media buyers, social media managers, ecommerce marketers, marketing agency teams, startup founders, and digital marketing students</strong> who need to audit campaign efficiency, compare platforms, report to clients, and make budgeting decisions — fast, without a spreadsheet. It supports 9 currencies, includes industry preset buttons for quick benchmarking, exports to CSV and TXT, and runs entirely in your browser with no data sent to any server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How CPC Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            CPC has one of the simplest formulas in digital marketing — but its implications are anything but simple. The calculation divides total advertising cost by the total number of clicks generated during the same period. The result is the average amount paid for each individual click, regardless of what that click did after it landed on your page.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">CPC</span> = Total Advertising Cost ÷ Total Clicks</p>
            </div>
            <p className="text-xs text-gray-400 mt-3">Example: $1,200 spent ÷ 480 clicks = <span className="font-semibold text-primary">$2.50 CPC</span></p>
          </div>
          <p>
            While the formula is fixed, what counts as "cost" and "clicks" varies by context. Understanding the distinctions below helps you use CPC data correctly:
          </p>
          <ul className="space-y-3 text-sm">
            {[
              ["Total Advertising Cost", "The gross amount billed by the ad platform for the period — including all clicks, regardless of whether they converted. This should not be confused with net spend after credits or refunds, unless you are specifically reporting on net efficiency."],
              ["Total Clicks", "The raw click count reported by the ad platform. This is not the same as sessions in Google Analytics — discrepancies between platform clicks and analytics sessions are normal (typically 10–30%) due to bot filtering, redirect timing, and tracking differences."],
              ["Average CPC vs. Actual CPC", "Ad platforms like Google Ads show an 'average CPC' because you rarely pay your maximum bid. In a second-price auction, you pay $0.01 above the next highest bidder — so your average CPC is almost always below your max bid. This calculator computes the average CPC from your actual billing data."],
              ["CPC by Campaign vs. Account", "CPC at the account level blends all campaigns. A single high-spend, high-CPC campaign can dramatically raise the account average. Always calculate CPC at the campaign or ad group level when diagnosing performance — the account average alone rarely tells you where to act."],
              ["Platform Differences", "CPC varies significantly by platform. Google Search Ads target high-intent keyword queries and command higher CPCs. Facebook and Instagram Ads use interest and demographic targeting and typically have lower CPCs but lower purchase intent. LinkedIn Ads have the highest average CPC of major platforms due to professional audience precision."],
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
          How to Use the CPC Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Total Advertising Cost", "Type the total amount billed by your ad platform for the campaign period — this is the gross spend figure from your Google Ads, Facebook Ads, or other platform billing summary. Include all charges for the period, not just approved conversions."],
                ["Enter Total Clicks", "Type the total number of clicks your ads received during the same period. Pull this directly from your platform's campaign report. Make sure the date range matches your cost figure exactly — mismatched periods are the most common source of inaccurate CPC calculations."],
                ["Select Your Currency", "Choose from 9 supported currencies including USD, EUR, GBP, INR, AED, and more. Currency is applied to display formatting only — no conversion is performed, so you can use any consistent unit of value."],
                ["Use Industry Presets (Optional)", "Click any of the preset buttons to instantly load a real-world example — useful for quickly seeing how your CPC compares to typical figures for ecommerce, SaaS, legal, or other industries without entering numbers manually."],
                ["Read the Performance Badge", "Your CPC result appears instantly alongside a performance badge — Very Low, Low, Average, High, or Very High — with a plain-language interpretation of what the number means in context."],
                ["Export or Share", "Copy the result to clipboard, export a full report as CSV or TXT, or use the shareable URL to send the exact calculation with all inputs pre-filled to a colleague or client."],
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
                "Real-time CPC calculation as you type — no submit button",
                "Performance badge: Very Low / Low / Average / High / Very High",
                "Plain-language interpretation for every result",
                "Industry preset buttons for instant benchmarking",
                "9 currency options (USD, EUR, GBP, INR, AED, and more)",
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
              title: "Auditing Google Ads Campaign Efficiency",
              scenario: "A PPC specialist pulls the monthly billing summary from a Google Ads account: $4,200 spent, 1,680 clicks across three search campaigns. Entering these into the calculator returns a $2.50 average CPC — rated Average. Breaking the audit down by campaign, they find one campaign has a $6.80 CPC (Very High) while another runs at $1.10 (Low). The high-CPC campaign is flagged for keyword review and bid strategy adjustment before the next monthly budget is committed.",
            },
            {
              title: "Comparing Platform Efficiency Across Channels",
              scenario: "A D2C brand runs simultaneous campaigns on Google, Meta, and TikTok with a $3,000 total monthly budget split three ways. Google delivers 320 clicks at $3.12 CPC. Meta delivers 2,100 clicks at $0.47 CPC. TikTok delivers 4,400 clicks at $0.23 CPC. The marketing manager uses the calculator on each platform's data separately, then weighs CPC against conversion rate per channel — finding that Google's higher CPC is justified by a 4.2% conversion rate vs. TikTok's 0.6%.",
            },
            {
              title: "Agency Monthly Client Reporting",
              scenario: "A digital marketing agency manages 12 client ad accounts. At month end, an account manager uses the CPC calculator for each client to quickly verify the average CPC against the previous month and against the client's target CPC. For a legal services client with a $45 target CPC, the actual result of $38.20 is copy-exported via the CSV export and dropped directly into the monthly client report template — no manual calculation needed.",
            },
            {
              title: "Validating an Ad Budget Before Launch",
              scenario: "A startup founder is planning their first paid acquisition test on LinkedIn. Their budget is $2,000. Industry average LinkedIn CPC for B2B SaaS is around $8–$12. Entering $2,000 cost and an estimated 200 clicks (assuming $10 CPC) returns the expected CPC and helps the founder set realistic expectations: at a 3% conversion rate, 200 clicks yields roughly 6 leads — giving a Cost Per Lead of $333 before any optimisation. This frames the test budget decision clearly.",
            },
            {
              title: "Ecommerce ROAS Sanity Check",
              scenario: "An ecommerce seller runs Google Shopping ads and wants to know if their CPC is sustainable against their average order value of $65 and a 2.8% conversion rate. They enter $1,800 spend and 900 clicks to get a $2.00 CPC. With a 2.8% conversion rate, that's 25 sales from 900 clicks — a Cost Per Acquisition of $72. Since $72 CPA exceeds the $65 AOV, the math shows the campaign is unprofitable at current CPC and conversion rate, prompting a landing page optimisation effort before increasing spend.",
            },
            {
              title: "Benchmarking After a Bidding Strategy Change",
              scenario: "A marketing manager switches a Google Ads campaign from Manual CPC to Target CPA bidding. After two weeks, they pull the new data: $2,600 spent, 740 clicks. The calculator returns $3.51 CPC — up from the previous $2.20 CPC under Manual CPC. However, the conversion rate also rose from 2.1% to 3.8%, meaning Cost Per Acquisition actually dropped. The CPC calculator result is shared via the shareable URL in a Slack message to the head of growth, with both periods compared side by side.",
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
                "Never evaluate CPC in isolation — always pair it with conversion rate. A $0.50 CPC sounds cheap, but if conversion rate is 0.1%, your Cost Per Acquisition is $500. A $5.00 CPC with a 10% conversion rate gives a $50 CPA. The CPC metric only becomes meaningful once you know what percentage of those clicks become customers.",
                "Calculate CPC at the ad group or keyword level, not just the campaign level. Campaign-level averages mask huge variance. A single broad-match keyword bleeding budget at $15 CPC can coexist with ten exact-match keywords running at $1.50 CPC in the same campaign — the average hides the problem entirely.",
                "Use CPC trends over time, not just point-in-time snapshots. A $3.00 CPC is different when it was $1.80 three months ago vs. when it was $4.50. Rising CPC trends signal increasing competition on your keywords, audience fatigue, or quality score degradation — all of which need different responses.",
                "Improve Quality Score to reduce CPC without changing your bid. On Google Ads, Quality Score (1–10) directly affects your Ad Rank and actual CPC paid. Improving ad relevance, landing page experience, and expected CTR can reduce your actual CPC by 30–50% at the same max bid. It is the highest-leverage CPC reduction lever available.",
                "Segment CPC by device, location, and audience before making optimisation decisions. Mobile CPC is often lower than desktop but converts at a lower rate in many industries. Geographic CPC varies enormously — the same keyword in New York can cost 3× more than in a mid-sized market. Bid adjustments only work if you know where your CPC inefficiency lives.",
                "For branded keywords, a high CPC is almost always worth paying. Branded keyword CPC is typically 5–10× lower than non-branded, but for competitor brand terms you bid on, CPC can be high. Users searching your brand name have the highest purchase intent of any segment — a $6 CPC on a branded term that converts at 15% is far more efficient than a $1 CPC on a generic term converting at 1%.",
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
                "Don't compare CPC across platforms without accounting for traffic quality. A $0.30 Facebook CPC and a $3.00 Google Search CPC are not directly comparable — Google Search clicks come from users actively searching for your product, while Facebook clicks come from users who were interrupted by your ad. Higher intent traffic justifies higher CPC.",
                "Don't use mismatched date ranges between cost and click data. If your billing period runs the 1st–31st but your platform report defaults to a different timezone cutoff, a day's worth of clicks can fall outside the cost window. Always verify both figures cover exactly the same period before calculating.",
                "Don't optimise purely for lowest CPC. Bidding strategies that minimise CPC (like Manual CPC with low bids) often win the cheapest clicks — which are frequently the lowest-intent clicks. The goal is the lowest Cost Per Acquisition, not the lowest CPC. These are related but not the same, and optimising the wrong metric degrades campaign performance.",
                "Don't ignore impression share when analysing CPC. If your CPC is low but your impression share is also low (under 40%), you may be underbidding and losing valuable high-intent clicks to competitors. A slightly higher CPC that captures 80% impression share on your best keywords often outperforms a low CPC with 20% impression share.",
                "Don't set the same CPC target across all campaigns regardless of funnel stage. Top-of-funnel awareness campaigns targeting broad audiences should have lower CPC targets because conversion rates are low. Bottom-of-funnel retargeting campaigns with high purchase intent can justify much higher CPCs — the audience is warmer and converts at a higher rate.",
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
          CPC Formula Reference
        </h2>
        <div className="space-y-4 mb-8">
          {[
            { name: "CPC",                  formula: "Total Advertising Cost ÷ Total Clicks",                              example: "$1,200 ÷ 480 = $2.50" },
            { name: "Total Cost",           formula: "CPC × Total Clicks",                                                  example: "$2.50 × 480 = $1,200" },
            { name: "Total Clicks",         formula: "Total Advertising Cost ÷ CPC",                                        example: "$1,200 ÷ $2.50 = 480 clicks" },
            { name: "Cost Per Lead (CPL)",  formula: "Total Ad Spend ÷ Total Leads",                                        example: "$1,200 ÷ 24 leads = $50 CPL" },
            { name: "Cost Per Acquisition", formula: "Total Ad Spend ÷ Total Conversions",                                  example: "$1,200 ÷ 12 sales = $100 CPA" },
            { name: "ROAS",                 formula: "Revenue from Ads ÷ Total Ad Spend",                                   example: "$4,800 ÷ $1,200 = 4.0× ROAS" },
            { name: "Max Viable CPC",       formula: "Average Order Value × Conversion Rate",                               example: "$80 AOV × 3% CVR = $2.40 max CPC" },
          ].map(({ name, formula, example }) => (
            <div key={name} className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="md:w-44 flex-shrink-0">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{name}</span>
              </div>
              <div className="flex-1 font-mono text-sm text-gray-800">{formula}</div>
              <div className="md:w-52 text-sm text-green-600 font-semibold font-mono">{example}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
          <strong>Max Viable CPC:</strong> Multiply your average order value by your conversion rate to find the absolute ceiling CPC at which a campaign breaks even. Any CPC below this number is theoretically profitable; any CPC above it means you are paying more per click than each click is worth on average. Factor in your target margin to set a more conservative CPC ceiling.
        </div>
      </section>

      {/* ── Benchmarks ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Average CPC Benchmarks by Industry &amp; Platform
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Google Search Avg CPC</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Meta Ads Avg CPC</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">LinkedIn Ads Avg CPC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Legal / Attorneys",       "$6–$100+",  "$1.32",    "$4–$8",    ],
                ["Finance & Insurance",     "$3–$15",    "$3.77",    "$5–$10",   ],
                ["Health & Medical",        "$2–$7",     "$1.32",    "$3–$6",    ],
                ["Technology / SaaS",       "$1–$6",     "$1.27",    "$5–$12",   ],
                ["Ecommerce (General)",     "$0.50–$2",  "$0.45",    "N/A",      ],
                ["Education",              "$1–$4",     "$1.06",    "$3–$7",    ],
                ["Travel & Hospitality",   "$0.50–$3",  "$0.63",    "$2–$5",    ],
                ["Real Estate",            "$1–$5",     "$1.81",    "$3–$6",    ],
                ["B2B / Professional Svcs","$2–$8",     "$2.52",    "$5–$15",   ],
                ["Retail / Fashion",       "$0.50–$2",  "$0.45",    "N/A",      ],
              ].map(([industry, google, meta, linkedin]) => (
                <tr key={industry} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{industry}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{google}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{meta}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600">{linkedin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Benchmarks are approximate industry averages. Actual CPC varies by keyword, targeting, quality score, bid strategy, geographic market, and competition level. LinkedIn CPC is not applicable for most B2C ecommerce and retail campaigns.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Cost Per Click (CPC)?",
              a: "Cost Per Click (CPC) is the amount an advertiser pays each time a user clicks on their ad. It is the standard pricing model for paid search advertising on platforms like Google Ads and Microsoft Ads, and is also used in paid social advertising on Meta, LinkedIn, TikTok, and Pinterest. CPC tells you the cost of acquiring one website visitor through paid traffic — the foundational metric for evaluating the efficiency of any paid acquisition channel.",
            },
            {
              q: "How is CPC calculated?",
              a: "CPC is calculated by dividing total advertising cost by the total number of clicks received during the same period. For example, if you spent $800 and received 400 clicks, your average CPC is $800 ÷ 400 = $2.00. The formula always uses actual billed cost — not budget — and actual platform-reported clicks for the matching time period.",
            },
            {
              q: "What is a good CPC?",
              a: "A good CPC is entirely relative to the value of a conversion in your business. The only reliable way to define a 'good' CPC is to calculate your Maximum Viable CPC: multiply your average order value (or lifetime value) by your conversion rate. For example, if your average order value is $90 and your conversion rate is 3%, your break-even CPC is $2.70. Any CPC below that is profitable; any CPC above it is losing money on average. Industry benchmarks provide useful context, but your own unit economics set the real ceiling.",
            },
            {
              q: "What is the difference between CPC and CPM?",
              a: "CPC (Cost Per Click) charges advertisers only when a user clicks the ad — you pay for traffic. CPM (Cost Per Mille) charges per 1,000 ad impressions regardless of clicks — you pay for exposure. CPC is the right model for direct-response campaigns where you want measurable clicks and conversions. CPM is better suited to brand awareness campaigns where reach and frequency matter more than immediate clicks. Most platforms let you choose between the two bidding models.",
            },
            {
              q: "What is the difference between maximum CPC and average CPC?",
              a: "Maximum CPC (max bid) is the ceiling you set — the most you are willing to pay for a single click. Average CPC is what you actually paid on average across all clicks in a period, which is almost always lower than your max bid. In Google Ads' auction system, you pay $0.01 above the next-highest Ad Rank competitor, not your full max bid. This calculator computes average CPC from your actual billing data, not your bid settings.",
            },
            {
              q: "Why does my Google Analytics show fewer sessions than the clicks in Google Ads?",
              a: "A discrepancy of 10–30% between Google Ads clicks and Google Analytics sessions is normal and expected. Reasons include: users clicking an ad but hitting the back button before the Analytics tag fires, bot and invalid click filtering that Ads applies post-auction, users with JavaScript disabled, redirect timing issues, and ad blockers. Google Ads' click count is the correct figure for CPC calculation — use that number, not GA sessions, when computing your average CPC.",
            },
            {
              q: "How can I lower my CPC on Google Ads?",
              a: "The most effective levers are: (1) Improve Quality Score — a higher score directly reduces your actual CPC at the same bid by improving your Ad Rank. Focus on ad relevance, landing page experience, and expected CTR. (2) Use exact and phrase match keywords instead of broad match to reduce irrelevant clicks that inflate spend. (3) Add negative keywords to prevent your ads from showing on low-intent or irrelevant queries. (4) Improve CTR through better ad copy — higher CTR raises Quality Score and lowers CPC. (5) Use bid adjustments to reduce bids on low-converting devices, locations, and time slots.",
            },
            {
              q: "What is the relationship between CPC and Quality Score?",
              a: "Quality Score is Google's 1–10 rating of your ad's relevance and expected performance, based on expected CTR, ad relevance, and landing page experience. It directly affects your Ad Rank and the actual CPC you pay. A higher Quality Score means you can achieve the same Ad Rank at a lower bid — effectively paying less per click than a competitor with a lower Quality Score but higher bid. Improving Quality Score from 5 to 8 on a competitive keyword can reduce actual CPC by 30–50% without changing your max bid.",
            },
            {
              q: "How is CPC different on search vs. display vs. social ads?",
              a: "Search CPC (Google Search, Microsoft Ads) is driven by keyword auction competition and user intent. Users are actively searching for something, so purchase intent is high — justifying higher CPCs. Display CPC (Google Display Network, programmatic) is generally much lower because ads appear on third-party sites to users not actively searching; intent is lower and click-through rates are minimal. Social CPC (Meta, LinkedIn, TikTok) falls between the two — targeting is demographic and behavioural rather than intent-based, with CPCs varying widely by audience quality and platform.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your advertising cost figures, click counts, and any campaign data you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature uses your browser's localStorage, which is local to your device only. This makes the tool safe to use for confidential campaign data, client account figures, and internal budget planning.",
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
            { icon: "📢", title: "PPC Specialists",       desc: "Audit campaign cost efficiency across Google Ads and Microsoft Ads accounts, compare periods, and identify high-CPC campaigns that need bid strategy or Quality Score fixes." },
            { icon: "📱", title: "Social Media Managers", desc: "Track CPC across Meta, LinkedIn, TikTok, and Pinterest campaigns to compare platform efficiency and make data-driven budget allocation decisions." },
            { icon: "🛍️", title: "Ecommerce Marketers",   desc: "Monitor product ad CPC against average order value and conversion rate to ensure paid traffic stays profitable and ROAS targets are met." },
            { icon: "🏢", title: "Marketing Agencies",    desc: "Calculate and report CPC metrics for multiple client accounts across industries — with shareable URLs that make client-facing reporting fast and transparent." },
            { icon: "🚀", title: "Startup Founders",      desc: "Validate paid acquisition channel economics before scaling spend — using CPC alongside estimated conversion rates to project Cost Per Acquisition before committing budget." },
            { icon: "🎓", title: "Marketing Students",    desc: "Learn digital advertising fundamentals and PPC measurement with a real-time calculator that shows formula workings and contextual performance benchmarks." },
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
