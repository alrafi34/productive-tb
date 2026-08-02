export default function ScrollDepthCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Scroll Depth Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>scroll depth calculator</strong> is a free browser-based tool that measures how far a visitor has scrolled through a webpage, expressed as both a percentage and a pixel value. It answers a question every content-heavy website needs to understand: <em>how much of my page do visitors actually see before they leave?</em>
          </p>
          <p>
            Unlike full analytics platforms that require tracking scripts, dashboards, and historical data, this calculator lets you compute scroll depth instantly from three numbers — document height, viewport height, and scroll position — or switch to Live Browser Simulation mode to see the real scroll depth of the page you're on right now, calculated from your actual browser window as you scroll.
          </p>
          <p>
            This tool is built for <strong>digital marketers, SEO professionals, UX designers, product managers, web developers, bloggers, website owners, and analytics professionals</strong> who want to understand content engagement, optimize article length, and identify where visitors typically stop reading. It includes engagement scoring, calculation history, scenario comparison, an embeddable JavaScript scroll tracker snippet, and export as CSV, JSON, or a print-ready report — entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Scroll Depth Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            In Manual Calculation mode, enter your page's document height, viewport height, and current scroll position (or drag the slider), and the calculator instantly returns the percentage of the page that has been viewed. In Live Browser Simulation mode, the calculator listens to this page's real scroll events and computes your actual scroll depth in real time.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Effective Scroll = Current Scroll + Viewport Height</p>
              <p>Scroll Depth (%) = (Effective Scroll ÷ Document Height) × 100, clamped 0–100</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Document Height", "The total scrollable height of the page in pixels — the denominator of the formula."],
              ["Viewport Height", "The visible height of the browser window. Because a visitor has 'seen' everything from the top of the page down to the bottom of their current viewport, this is added to the scroll position."],
              ["Sticky Header Height", "Optional — reduces the effective viewport, since a fixed header permanently occupies part of the visible screen and isn't new content being read."],
              ["Footer Height", "Optional — reduces the effective document height, since footer content (links, copyright text) generally isn't the 'content' being measured for engagement."],
              ["Offset Adjustment", "Optional — a manual pixel correction added to the scroll position, useful for anchor-link offsets or fixed positioning quirks."],
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
          How to Use the Scroll Depth Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Mode", "Select Manual Calculation to enter your own numbers, or Live Browser Simulation to track this page's real scroll position."],
                ["Try an Example (Optional)", "Click Blog Post, Landing Page Bottom, or Long-Form Article to instantly load realistic sample figures."],
                ["Enter Your Page Dimensions", "Type the document height and viewport height, then drag the scroll position slider. Results update instantly with a 150ms debounce."],
                ["Set Optional Adjustments", "Expand Optional Inputs to account for a sticky header, footer height, or a manual offset adjustment."],
                ["Review Scroll Depth and Engagement", "Check the gauge, progress bar, pixels viewed and remaining, and engagement rating (Bounced through Completed)."],
                ["Compare, Export, or Share", "Use Compare as A/B to evaluate two pages side by side, export as CSV or JSON, print a formatted report, or copy a shareable URL."],
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
                "Manual Calculation and Live Browser Simulation modes",
                "Live mode tracks this page's real scroll position in real time",
                "Interactive circular gauge with color-coded engagement rating",
                "Sticky header, footer height, and offset adjustment support",
                "5-tier engagement scoring (Bounced to Completed) with recommendations",
                "Pixels viewed, pixels remaining, and reading completion estimate",
                "Copy-ready embeddable JavaScript scroll tracker snippet",
                "Compare-as-A/B page comparison mode",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with full breakdown",
                "Print-ready formatted report",
                "Copy full report to clipboard in one click",
                "Calculation history — save and reload up to 20 past results",
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
              title: "Blog Post Engagement Check",
              scenario: "A blogger's post is 6,000px tall with a 900px viewport. At a scroll position of 2,700px, the calculator returns a 60% scroll depth in the Engaged tier — confirming most readers are reaching well past the introduction.",
            },
            {
              title: "Landing Page Bottom Reached",
              scenario: "A 3,000px landing page with an 800px viewport shows a visitor scrolled to 2,200px, reaching exactly 100% scroll depth — Completed — meaning the visitor saw the entire page, including the final call-to-action.",
            },
            {
              title: "Long-Form Article Drop-Off",
              scenario: "A 12,000px long-form article with a 1,000px viewport shows a typical visitor stopping at 3,500px scrolled, a 37.5% scroll depth in the Skimmed tier — signaling that content and calls-to-action placed near the bottom likely go unseen by most readers.",
            },
            {
              title: "Accounting for a Sticky Header and Footer",
              scenario: "A page with an 80px sticky header and 150px footer is measured with the same raw numbers as the Manual mode default. After the header reduces effective viewport and the footer reduces effective document height, the calculated scroll depth is slightly higher than the raw formula would suggest — a more accurate reflection of actual content consumed.",
            },
            {
              title: "Live Page Self-Test",
              scenario: "A UX designer switches to Live Browser Simulation mode while reading this very tool's page, watching the scroll depth percentage update in real time as they scroll — a quick way to sanity-check how the formula behaves against real browser scroll events.",
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
                "Place your most important call-to-action within the scroll depth your typical visitors actually reach — measure real behavior with analytics rather than assuming everyone scrolls to the bottom.",
                "Account for sticky headers and footers when interpreting scroll depth — a large sticky header can meaningfully shrink the effective viewport a visitor sees at any given scroll position.",
                "Use scroll depth alongside time-on-page — a visitor who scrolls to 90% instantly by pressing End didn't necessarily read the content, while a slower scroll pattern suggests genuine reading.",
                "Test different content lengths and structures on similar pages to see how scroll depth patterns shift with formatting changes like subheadings, images, and shorter paragraphs.",
                "Use the embeddable JavaScript snippet as a starting point for real analytics integration — swap the console.log call for your analytics platform's event tracking call.",
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
                "Don't measure scroll depth using only the raw scroll position without adding viewport height — a visitor has 'seen' everything down to the bottom of their screen, not just the exact scroll offset.",
                "Don't ignore mobile viewport differences — a page that shows 100% scroll depth on a tall desktop viewport might show a much lower depth on a short mobile viewport for the same scroll position.",
                "Don't place critical content or forms below the depth most visitors realistically reach without first checking real scroll behavior data.",
                "Don't forget that document height can change dynamically on pages with lazy-loaded content or infinite scroll — a static one-time measurement may not reflect the true final page height.",
                "Don't treat a single scroll depth snapshot as a trend — track it across many sessions to understand typical visitor behavior on a page.",
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

      {/* ── Benchmark Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Scroll Depth Engagement Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Scroll Depth</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Engagement Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["0% – 25%", "Bounced", "Visitors are leaving early without engaging with the main content."],
                ["25% – 50%", "Skimmed", "Visitors are skimming the page but not reaching deeper content."],
                ["50% – 75%", "Engaged", "Visitors are engaging with a majority of the page content."],
                ["75% – 90%", "Highly Engaged", "Most visitors are reading through nearly all of the page."],
                ["90% – 100%", "Completed", "Visitors are reaching the very bottom of the page."],
              ].map(([range, level, meaning]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{range}</td>
                  <td className="py-2.5 px-4 text-gray-700">{level}</td>
                  <td className="py-2.5 px-4 text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Scroll Depth = ((Current Scroll + Viewport Height) ÷ Document Height) × 100, clamped between 0% and 100%.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is scroll depth?",
              a: "Scroll depth is the percentage of a webpage a visitor has scrolled through, measuring how much content they've been exposed to relative to the total page length.",
            },
            {
              q: "How do I calculate scroll depth?",
              a: "Add the current scroll position to the viewport height, divide by the total document height, and multiply by 100: Scroll Depth = ((Scroll + Viewport) ÷ Document Height) × 100, clamped between 0% and 100%.",
            },
            {
              q: "Why do you add viewport height to the scroll position?",
              a: "A visitor has 'seen' everything from the top of the page down to the bottom of their currently visible screen, not just the exact pixel their scroll position sits at. Adding viewport height accounts for the content currently on screen.",
            },
            {
              q: "What does Live Browser Simulation mode do?",
              a: "It attaches a real scroll listener to this page and computes your actual scroll depth using your browser's live document height, viewport height, and scroll position — updating in real time as you scroll, without any manual input.",
            },
            {
              q: "How do sticky headers and footers affect scroll depth?",
              a: "A sticky header permanently occupies part of the viewport, so it reduces the effective viewport height used in the calculation. A footer isn't typically considered readable content, so it reduces the effective document height. Both are optional adjustments in this calculator.",
            },
            {
              q: "What is a good scroll depth for a webpage?",
              a: "This varies heavily by content type and length, but generally 50%+ scroll depth suggests a majority of visitors are engaging with the main content, while under 25% suggests most visitors are bouncing before reaching meaningful content.",
            },
            {
              q: "Can I use this calculator to track a live website?",
              a: "Yes — use Live Browser Simulation mode to see this page's own real-time scroll depth, or copy the embeddable JavaScript snippet to add basic scroll depth logging to your own site.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your page dimensions and scroll data are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 7 ? "border-b border-gray-100 pb-6" : ""}>
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
            { icon: "📣", title: "Digital Marketers & SEO Professionals", desc: "Understand how far visitors read into content and optimize page structure and calls-to-action accordingly." },
            { icon: "🎨", title: "UX Designers", desc: "Identify where visitors typically stop scrolling to guide layout, content hierarchy, and visual design decisions." },
            { icon: "📊", title: "Product Managers", desc: "Use scroll depth as a proxy for content engagement when evaluating page redesigns or content strategy changes." },
            { icon: "💻", title: "Web Developers", desc: "Prototype and sanity-check scroll depth tracking logic before implementing it in production analytics." },
            { icon: "✍️", title: "Bloggers & Website Owners", desc: "Gauge whether readers are making it through long-form content or dropping off early." },
            { icon: "📈", title: "Analytics Professionals", desc: "Cross-check scroll depth formulas and edge cases against a simple, transparent reference calculator." },
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
