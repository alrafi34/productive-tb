export default function CPMCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a CPM Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>CPM calculator</strong> is a free browser-based tool that instantly calculates Cost Per Mille — the cost per 1,000 ad impressions — from your advertising cost and impression count. It answers the question every media buyer asks before, during, and after a campaign: <em>how much am I really paying to put this ad in front of a thousand views?</em>
          </p>
          <p>
            CPM is the foundational pricing model behind most digital advertising platforms, including Google Ads, Meta Ads (Facebook and Instagram), TikTok Ads, LinkedIn Ads, X (Twitter) Ads, Pinterest Ads, Snapchat Ads, YouTube Ads, Microsoft Ads, and nearly every programmatic display network. Because CPM connects three variables — cost, impressions, and the CPM rate itself — knowing any two lets you solve for the third. This calculator supports all three directions: calculate CPM from cost and impressions, calculate the advertising cost required to hit a target CPM, or calculate how many impressions a given budget will buy at a known CPM.
          </p>
          <p>
            This tool is built for <strong>digital marketers, advertisers, agencies, social media managers, publishers, media buyers, business owners, freelancers, and students</strong> who need instant, accurate CPM math without opening a spreadsheet. It supports global currencies including USD, EUR, GBP, INR, BDT, AED, SAR, PKR, and a custom symbol option, with results exportable as TXT, JSON, or a print-ready report, and a shareable calculation URL for sending results to teammates.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the CPM Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator uses three interchangeable formulas depending on which value you're solving for. Select a calculation mode, enter the two known values, and the third updates instantly.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>CPM = (Advertising Cost ÷ Impressions) × 1000</p>
              <p>Advertising Cost = (CPM × Impressions) ÷ 1000</p>
              <p>Impressions = (Advertising Cost × 1000) ÷ CPM</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Calculate CPM", "Enter your total advertising cost and total impressions to find the effective cost per 1,000 impressions — the most common use case for reviewing a campaign that has already run."],
              ["Calculate Advertising Cost", "Enter a target CPM and the number of impressions you need, and the calculator returns the budget required — useful when planning a media buy against a rate card."],
              ["Calculate Impressions", "Enter your available budget and a known or target CPM to find out how many impressions that budget can purchase — useful for forecasting reach before a campaign launches."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the CPM Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Mode", "Select Calculate CPM, Calculate Advertising Cost, or Calculate Impressions from the dropdown, or click the ⇄ Swap button to cycle between modes. The field being solved for is automatically shown as read-only."],
                ["Select Your Currency", "Choose from USD, EUR, GBP, CAD, AUD, JPY, INR, BDT, AED, SAR, PKR, or enter a custom symbol for any other currency."],
                ["Enter the Two Known Values", "Type your advertising cost, impressions, or CPM depending on the mode — the third field updates instantly as you type, with a 150ms debounce."],
                ["Try a Quick Example", "Click a platform preset — Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, or YouTube Ads — to instantly load realistic sample numbers and see the calculator in action."],
                ["Adjust Decimal Precision", "Choose 0–4 decimal places depending on how exact you need your result — 2 decimals is standard for most media plans."],
                ["Review the Breakdown", "Check the Formula & Calculation Breakdown card to see exactly how the result was derived, useful for double-checking numbers before sharing with a client or manager."],
                ["Export, Share, or Save", "Copy the result or the full report, download as TXT or JSON, print a PDF-ready report, copy a shareable URL with your inputs baked in, or save the calculation to your local history."],
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
                "3 calculation modes: CPM, Advertising Cost, Impressions",
                "Real-time results with 150ms debounced updates",
                "12 currency options including a custom symbol",
                "Configurable decimal precision from 0 to 4 places",
                "Automatic comma formatting for large numbers",
                "Quick example presets for 5 major ad platforms",
                "Built-in advertising metric glossary (CPM, eCPM, and more)",
                "Formula and calculation breakdown shown for every result",
                "Shareable calculation URL using query parameters",
                "Export report as TXT or JSON with timestamp",
                "Print-ready PDF report",
                "Copy result or full report to clipboard in one click",
                "Calculation history — save and reload up to 20 past results",
                "Keyboard shortcuts — Enter to jump to results, Esc to reset",
                "Inline validation with auto-focus on the first invalid field",
                "No signup required — 100% free to use",
                "All processing runs locally — no data leaves your browser",
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
              title: "Post-Campaign CPM Review",
              scenario: "A media buyer wraps up a Google Display campaign that spent $600 and delivered 150,000 impressions. Using Calculate CPM mode, the calculator returns $4.00 — comfortably within the buyer's $3.50–$5.00 target range for that ad category, confirming the campaign delivered efficient reach.",
            },
            {
              title: "Budget Planning Against a Rate Card",
              scenario: "A publisher's sales team quotes a client a $8.00 CPM for a 120,000-impression YouTube pre-roll package. Using Calculate Advertising Cost mode, the calculator returns $960 — the exact number the sales team includes in the insertion order sent to the client.",
            },
            {
              title: "Forecasting Reach from a Fixed Budget",
              scenario: "A startup founder has a $500 budget for a LinkedIn Ads brand awareness push and knows LinkedIn's typical CPM for their industry is around $4.00 (as €500 at a €4 target CPM in the same math). Using Calculate Impressions mode, the calculator returns 125,000 impressions — the number the founder uses to set expectations for the campaign's reach before it launches.",
            },
            {
              title: "Cross-Platform CPM Comparison",
              scenario: "An agency media planner runs the same $850 budget through Calculate CPM mode across three platform impression estimates — Meta (212,500 impressions), LinkedIn (42,500 impressions), and TikTok (170,000 impressions) — quickly seeing that the resulting CPMs of $4.00, $20.00, and $5.00 respectively reveal LinkedIn's premium B2B audience commands a five-times-higher CPM than Meta for the same spend.",
            },
            {
              title: "Currency Conversion for a Global Client",
              scenario: "A freelance media buyer working with a client based in Bangladesh switches the currency selector to BDT to present campaign costs and CPM figures in the client's local currency symbol (৳) rather than converting manually in a spreadsheet before every report.",
            },
            {
              title: "Rate Negotiation with a Publisher",
              scenario: "An advertiser is offered a direct-buy placement at a flat $1,200 for an estimated 200,000 impressions. Using Calculate CPM mode, the calculator reveals an effective CPM of $6.00 — higher than the advertiser's $4.50 benchmark for that ad size — giving them a concrete, formula-backed number to use in rate negotiation with the publisher.",
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
                "Always calculate effective CPM (the actual cost divided by actual impressions delivered) rather than relying on the platform's target or bid CPM — auction dynamics mean the two can differ significantly by the end of a campaign.",
                "Use Calculate Impressions mode during the planning phase to set realistic reach expectations with stakeholders before a campaign launches, rather than discovering the actual reach only after spend is committed.",
                "When comparing CPMs across platforms, always normalize for ad placement and format — a video pre-roll CPM and a static banner CPM are not directly comparable even on the same platform.",
                "Save recurring calculations to history when running the same budget scenarios repeatedly across multiple ad sets — it's faster to reload a past calculation than to re-enter the same numbers.",
                "Use the shareable URL feature to send a specific calculation to a teammate or client — the link preserves your exact inputs so they see the same numbers without re-entering anything.",
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
                "Don't confuse CPM with CPC or CPA. CPM prices exposure (every 1,000 impressions), while CPC and CPA price outcomes (clicks or conversions) — mixing them up in a media plan can lead to badly miscalculated budgets.",
                "Don't compare CPM figures across currencies without converting first. A $5.00 CPM and a €5.00 CPM are not equal — always convert to a single currency before benchmarking campaigns run in different markets.",
                "Don't assume a low CPM automatically means a good deal. Extremely cheap impressions are often low-quality inventory, bot traffic, or poorly targeted placements — always evaluate CPM alongside viewability and engagement metrics.",
                "Don't forget that CPM alone doesn't account for click-through or conversion rate. A higher-CPM placement with a much better CTR can still produce a lower effective cost per acquisition than a cheap, low-performing one.",
                "Don't enter impressions as zero or leave it blank when calculating CPM — the formula requires a positive impression count, and the calculator will show a clear validation error rather than a silent divide-by-zero result.",
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

      {/* ── Formula Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Formula Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Output</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["CPM", "(Advertising Cost ÷ Impressions) × 1000", "($250 ÷ 50,000) × 1000 = $5.00"],
                ["Advertising Cost", "(CPM × Impressions) ÷ 1000", "($8 × 120,000) ÷ 1000 = $960"],
                ["Impressions", "(Advertising Cost × 1000) ÷ CPM", "(€500 × 1000) ÷ €4 = 125,000"],
              ].map(([name, formula, example]) => (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary uppercase text-xs tracking-wide">{name}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{formula}</td>
                  <td className="py-2.5 px-4 font-mono text-green-700">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* CPM stands for Cost Per Mille — "mille" is Latin for one thousand.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What does CPM mean?",
              a: "CPM stands for Cost Per Mille, from the Latin word 'mille' meaning one thousand. It represents the price an advertiser pays for every 1,000 impressions their ad receives, regardless of clicks or conversions. It is one of the oldest and most widely used pricing models in both digital and traditional advertising.",
            },
            {
              q: "How is CPM calculated?",
              a: "CPM is calculated by dividing the total advertising cost by the total number of impressions, then multiplying by 1,000: CPM = (Cost ÷ Impressions) × 1000. For example, a campaign that spends $250 and generates 50,000 impressions has a CPM of $5.00.",
            },
            {
              q: "What is a good CPM rate?",
              a: "A good CPM varies enormously by platform, industry, ad format, and audience targeting. Display ads often range from $2 to $10 CPM, social media platforms like Facebook and Instagram typically range from $5 to $15, LinkedIn often runs $6 to $30 due to its professional audience, and premium video placements on YouTube can range from $10 to $30 or higher. The only reliable benchmark is your own historical campaign data for the same platform and audience.",
            },
            {
              q: "How do I calculate advertising cost from a CPM rate?",
              a: "Multiply your target CPM by the number of impressions you want, then divide by 1,000: Cost = (CPM × Impressions) ÷ 1000. For example, a $8 CPM targeting 120,000 impressions requires a budget of $960.",
            },
            {
              q: "How do I calculate how many impressions my budget will buy?",
              a: "Multiply your advertising budget by 1,000, then divide by the CPM rate: Impressions = (Cost × 1000) ÷ CPM. For example, a €500 budget at a €4 CPM buys 125,000 impressions.",
            },
            {
              q: "What is the difference between CPM and CPC?",
              a: "CPM (Cost Per Mille) charges advertisers based on impressions delivered — you pay for exposure whether or not anyone clicks. CPC (Cost Per Click) charges only when someone actually clicks the ad. CPM is generally used for brand awareness and reach objectives, while CPC is used for direct-response campaigns focused on driving traffic or conversions.",
            },
            {
              q: "What is eCPM and how is it different from CPM?",
              a: "eCPM (effective CPM) is a normalized metric used to compare campaigns priced under different models on a common CPM basis. For a CPC campaign, eCPM is calculated as (Total Clicks × CPC ÷ Impressions) × 1000. It lets advertisers compare the true cost-per-thousand-impressions across CPM, CPC, and CPA campaigns side by side.",
            },
            {
              q: "Does CPM include viewability?",
              a: "Standard CPM does not guarantee viewability — it only measures that an impression was served, which some ad servers count even if the ad never actually appeared in a visible part of the screen. Many platforms now also report a 'viewable CPM' (vCPM), which only counts impressions that met a minimum viewability threshold, typically 50% of the ad in view for at least one second.",
            },
            {
              q: "Why do CPM rates vary so much between platforms?",
              a: "CPM rates reflect supply and demand for a platform's advertising inventory combined with the value of its audience. Platforms with highly targeted, professional, or high-intent audiences (like LinkedIn) typically command higher CPMs than platforms with broader, less commercially valuable audiences. Ad format also matters — video and native placements usually carry higher CPMs than standard display banners.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your advertising cost, impression counts, and CPM figures are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "📊", title: "Digital Marketers",  desc: "Verify campaign CPM after a flight ends, and plan budgets against target CPM benchmarks before launching a new campaign." },
            { icon: "💼", title: "Media Buyers",        desc: "Negotiate rates with publishers using formula-backed effective CPM figures, and forecast reach from a fixed budget across multiple platforms." },
            { icon: "🏢", title: "Advertising Agencies", desc: "Compare CPM efficiency across client campaigns and platforms, and quickly generate cost estimates for new insertion orders." },
            { icon: "📰", title: "Publishers",          desc: "Set and validate CPM rate cards for direct ad sales, and quote advertisers accurate cost estimates for a given impression volume." },
            { icon: "🏪", title: "Small Business Owners", desc: "Understand what a limited ad budget will realistically buy in impressions before committing spend to a new advertising platform." },
            { icon: "🎓", title: "Marketing Students",  desc: "Learn the relationship between cost, impressions, and CPM, and practice reverse-engineering media plans from a target budget or rate." },
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
