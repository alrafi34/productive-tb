export default function CableLengthCalculatorSEO() {
  const faqItems = [
    { q: "What is a cable length calculator?", a: "A cable length calculator is a tool that determines the total amount of cable you need to buy for an installation, starting from the measured point-to-point distance and adding slack, bend allowance, and an installation-type multiplier. It answers the practical question every installer faces before ordering material: how many meters of cable do I actually need, not just the straight-line distance between the two ends." },
    { q: "How is total cable length calculated?", a: "The calculator takes your base distance, adds a slack percentage (extra length for terminations and service loops), adds a fixed allowance per bend or turn in the route, sums those three figures into a subtotal, then multiplies the subtotal by an installation factor that reflects how much the routing method itself adds — 1.0 for a straight run up to 1.15 for underground burial. The result is returned in both meters and feet." },
    { q: "How much slack should I add to a cable run?", a: "Ten percent is a reasonable default for electrical and Ethernet cable, covering termination stripping and a small service loop at each end. Fiber optic cable needs 15% because of splice tray requirements, and underground runs need 15–20% to allow for soil settling and future access without re-trenching. The calculator's 'Use Recommended' button fills in the correct figure automatically once you select a cable type." },
    { q: "What is bend allowance and why does it matter?", a: "Bend allowance is the extra cable length consumed by each turn in the physical route that a straight-line distance measurement doesn't capture — a cable rarely runs in a perfectly straight line from source to load. The calculator multiplies your entered bend allowance (typically 0.3–0.5 meters per 90-degree bend) by the number of bends and adds that to the total, so a route with five turns through a conduit needs meaningfully more cable than the raw distance suggests." },
    { q: "What do the installation type multipliers mean?", a: "Each installation type applies a different multiplier to the subtotal to reflect how routing conditions add hidden length: straight run is 1.0× (no addition), conduit is 1.05×, wall routing is 1.1×, overhead is 1.08×, and underground is 1.15×, the highest because buried cable needs extra length for settling, depth variation, and future splice access without full excavation." },
    { q: "Why does the calculator warn me about Ethernet runs over 90 meters?", a: "The TIA/EIA-568 standard caps a solid-core twisted-pair Ethernet channel at 100 meters total, with the fixed cable segment limited to 90 meters (295 feet) to leave headroom for patch cords at each end. If your base distance exceeds 90 meters, the calculator flags this because signal attenuation beyond that point causes packet loss and unreliable link negotiation — the fix is a fiber run or an intermediate switch, not a longer copper cable." },
    { q: "Does this calculator size electrical wire gauge or check voltage drop?", a: "No. This calculator answers only 'how much cable length do I need to purchase' — it does not check ampacity or voltage drop, which depend on conductor cross-section, current, and voltage rather than route length alone. For gauge selection and voltage drop analysis on electrical runs, use a dedicated wire size calculator alongside this tool once you know your total run length." },
    { q: "Can I use this calculator for both electrical and data cabling?", a: "Yes. The calculator supports four cable types — electrical power, Ethernet (Cat5e/6), fiber optic, and coaxial — each with its own recommended slack percentage and its own installation-specific guidance in the results panel. The underlying length formula (distance + slack + bend allowance, then installation factor) is the same across all four; only the recommended defaults and warnings differ by cable type." },
    { q: "What is the difference between measured distance and total cable length?", a: "Measured distance is the point-to-point span between the cable's origin and destination, often taken with a tape measure or from a floor plan. Total cable length is what you actually need to buy — measured distance plus slack for terminations, plus bend allowance for every turn in the route, plus the installation factor for the routing method. On a run with several bends through conduit, total cable length can run 15–25% higher than the raw measured distance." },
    { q: "Is my data private when using this calculator?", a: "Yes. All calculations run entirely in your browser using JavaScript. Your distance, slack, bend, and installation inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you." },
  ];

  const howToSteps: [string, string][] = [
    ["Enter the measured distance", "Type the point-to-point distance between the cable origin and destination, measured with a tape measure or laser meter, and choose meters or feet. This is your base distance before any allowances are added."],
    ["Select the cable type", "Choose electrical power, Ethernet (Cat5e/6), fiber optic, or coaxial. This sets the recommended slack percentage the calculator suggests and determines which cable-specific warnings appear in your results."],
    ["Choose the installation method", "Select straight run, conduit, wall routing, underground, or overhead. Each method applies a different multiplier to your subtotal — underground adds the most length (1.15×) for settling and future access, straight run adds none (1.0×)."],
    ["Set slack percentage and bend count", "Adjust the slack slider or click 'Use Recommended' to auto-fill the standard percentage for your cable type. Enter the number of 90-degree bends or turns in the route and the allowance per bend, typically 0.3–0.5 meters."],
    ["Read the total length and breakdown", "The calculator instantly shows total cable length in meters and feet, plus a line-by-line breakdown of base distance, slack added, bend allowance, and the installation factor applied. Review any recommendations flagged for your specific inputs."],
    ["Save, export, or apply a preset", "Save the calculation to your local history for later reference, export a text or CSV report for purchasing, or start from one of six built-in presets — home electrical run, office network cable, data center fiber, and more — then adjust from there."],
  ];

  return (
    <>
      {/* 1. Introduction */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Cable Length Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>cable length calculator</strong> is a free tool that converts a raw point-to-point
            distance into the actual amount of cable you need to buy, by adding slack for terminations,
            allowance for bends and turns, and an installation-type multiplier for the routing method. It
            answers the question every electrician, network installer, and project planner asks before
            placing an order: <em>how much cable do I actually need for this run?</em>
          </p>
          <p>
            Getting this number wrong is expensive in both directions. Underestimating length forces a
            mid-installation splice or a second material run, adding delay, labor cost, and — for electrical
            circuits — a potential code violation if splices aren't made in an approved enclosure. Overestimating
            wastes budget and leaves excess cable that still needs storing or returning. Professional
            installations always add slack and bend allowance on top of the measured distance, because a cable
            rarely runs in a perfectly straight line from source to destination.
          </p>
          <p>
            This tool is built for <strong>electricians planning branch circuit and feeder runs, network
            installers cabling offices and data centers, low-voltage and security system installers, solar
            technicians routing DC wiring, and project estimators</strong> who need an accurate material
            quantity before ordering. It supports electrical, Ethernet, fiber optic, and coaxial cable types,
            with cable-specific slack recommendations, six built-in installation presets, calculation history,
            and text/CSV export. Everything runs in your browser — free, no signup required.
          </p>
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Cable Length Calculation Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
            <div className="space-y-1 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Slack</span> = Distance × (Slack % ÷ 100)</p>
              <p><span className="font-semibold">Bend Allowance</span> = Bends × Allowance per Bend</p>
              <p><span className="font-semibold">Subtotal</span> = Distance + Slack + Bend Allowance</p>
              <p><span className="font-semibold">Total Length</span> = Subtotal × Installation Factor</p>
              <p className="text-gray-500 text-xs mt-2">Distance is entered in meters or feet · Installation Factor ranges 1.0–1.15 by routing method</p>
            </div>
          </div>
          <ul className="space-y-1 ml-4 list-disc text-gray-600">
            <li><strong>Base distance:</strong> your measured point-to-point span, converted internally to meters for calculation and reported back in both meters and feet</li>
            <li><strong>Slack:</strong> a percentage of the base distance reserved for terminations and service loops — recommended slack varies by cable type (10% electrical/Ethernet/coaxial, 15% fiber)</li>
            <li><strong>Bend allowance:</strong> a fixed length added per bend or turn in the physical route, since actual cable paths are rarely straight lines</li>
            <li><strong>Installation factor:</strong> a multiplier applied to the whole subtotal — 1.0× straight run, 1.05× conduit, 1.08× overhead, 1.1× wall routing, 1.15× underground</li>
            <li><strong>Smart recommendations:</strong> the tool flags low slack for underground runs, excessive bends on fiber, Ethernet runs approaching the 90m limit, and missing bend allowance when a non-straight installation type is selected</li>
          </ul>
        </div>
      </section>

      {/* 3. Step-by-Step */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Cable Length Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Tool Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time calculation as you type or adjust the slider",
                "Results in both meters and feet",
                "Four cable types: electrical, Ethernet, fiber, coaxial",
                "Five installation methods with accurate multipliers",
                "One-click recommended slack per cable type",
                "Smart warnings for excessive bends and long runs",
                "Six built-in scenario presets to start from",
                "Calculation history (last 20 entries) saved locally",
                "Export results as text report or CSV",
                "Copy result to clipboard",
                "100% browser-based — no data sent to a server",
                "No registration required",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Use Cases */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Home Electrical Circuit",
              scenario: "An electrician is running a dedicated 15-meter electrical circuit through wall cavities with 2 bends, using the default 0.5m bend allowance and 10% slack. The calculator returns a subtotal of 15 + 1.5 + 1.0 = 17.5m, then applies the 1.1× wall routing factor for a final total of 19.25 meters (63.16 feet) — enough to buy a 20-meter roll with margin to spare.",
            },
            {
              title: "Office Ethernet Drop",
              scenario: "A network installer is cabling a workstation 25 meters from the patch panel through conduit, with 3 bends and 10% slack. The subtotal is 25 + 2.5 + 1.5 = 29m, multiplied by the 1.05× conduit factor for 30.45 meters total — well under the 90-meter TIA/EIA-568 limit, so a standard Cat6 pull is safe.",
            },
            {
              title: "Data Center Fiber Backbone",
              scenario: "A data center technician is routing a 50-meter fiber backbone overhead with 4 bends and 15% slack (fiber's higher recommended percentage for splice trays). The subtotal is 50 + 7.5 + 2.0 = 59.5m, multiplied by the 1.08× overhead factor for 64.26 meters — the technician orders a 65-meter fiber spool.",
            },
            {
              title: "Buried Electrical Feeder",
              scenario: "A contractor is burying a 30-meter electrical feeder to a detached structure with 1 bend and bumps slack to 20% per the calculator's underground recommendation. The subtotal is 30 + 6.0 + 0.5 = 36.5m, multiplied by the 1.15× underground factor for 41.98 meters — nearly 40% more than the raw 30-meter distance, avoiding a mid-trench splice.",
            },
            {
              title: "Outdoor Satellite Coax Run",
              scenario: "An installer is running 20 meters of coaxial cable overhead from a roof antenna to an indoor receiver, with 2 bends and 12% slack. The subtotal is 20 + 2.4 + 1.0 = 23.4m, multiplied by the 1.08× overhead factor for 25.27 meters — the installer rounds up and orders a 25-meter coax spool with connectors for both ends.",
            },
            {
              title: "Maximum-Length Ethernet Run",
              scenario: "A facilities technician needs a 90-meter Ethernet run through conduit with 5 bends and standard 10% slack — right at the TIA/EIA-568 limit. The calculator's subtotal is 90 + 9.0 + 2.5 = 101.5m, and the tool immediately flags the warning that runs over 90 meters risk signal degradation, prompting the technician to switch to a fiber run or add an intermediate switch instead.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Tips & Mistakes */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Measure the actual routed path, not the straight-line distance between two points. If the cable has to rise through a ceiling, cross a hallway, and drop down a wall, add each segment separately rather than measuring point-to-point through the floor plan — the calculator's bend and installation factors assume you've already captured the real path length.",
                "Use the 'Use Recommended' slack button as a starting point, then adjust upward if your installation has unusual access constraints. Fiber optic splice trays, for example, often need closer to 20% rather than the default 15% if the splice enclosure is mounted far from the equipment rack.",
                "Count every 90-degree equivalent bend, not just visually obvious corners. A cable that curves gradually around a wide radius still consumes extra length even without a sharp corner — estimate the equivalent number of 90-degree bends for gradual curves.",
                "For underground runs, don't skimp on slack just because the trench is freshly dug. Soil settles over months, and a taut buried cable with no service loop can be damaged or pulled tight at termination points — the 15–20% recommendation exists specifically for this reason.",
                "When ordering cable, round the calculator's total up to the next standard spool or box size rather than ordering the exact calculated length. Cable is typically sold in 15m, 30m, 50m, 100m, or 305m (1000ft) increments, and cutting waste plus measurement error easily consumes a meter or two of margin.",
                "Save each calculation to history before starting a new one if you're estimating multiple runs for the same project. The history panel lets you review distance, cable type, slack, and bend count for every saved run when compiling a full material list.",
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
                "Don't enter the straight-line floor-plan distance as your base distance when the actual cable route is longer. A cable running from a first-floor panel to a second-floor outlet travels up through a wall cavity and across a ceiling void — the vertical rise alone can add several meters that a flat floor-plan measurement misses entirely.",
                "Don't leave bend allowance at zero for a conduit, wall, or underground installation. These installation types imply the cable isn't running in a straight line, and the calculator itself warns when bends are set to 0 with a non-straight installation type selected — skipping this understates your total by a meaningful margin on runs with multiple turns.",
                "Don't ignore the calculator's warning about Ethernet runs approaching or exceeding 90 meters. This isn't a soft guideline — beyond 90 meters of fixed cable, TIA/EIA-568 signal timing budgets are exceeded and the link becomes unreliable regardless of cable quality; the fix is a switch or fiber, not a longer copper run.",
                "Don't apply the same slack percentage to every cable type out of habit. Fiber optic cable's splice tray requirements genuinely need more slack (15–20%) than a simple electrical termination (10%), and using a flat 10% across all cable types under-orders fiber and over-orders electrical cable.",
                "Don't order the exact calculated total with zero buffer. The calculator's output is a precise estimate based on your inputs, but on-site conditions — an unexpected obstruction, a miscounted bend, a cutting error — routinely consume a meter or more. Round up to the next practical spool length rather than ordering to the decimal.",
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

      {/* 6. Reference Table */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Slack &amp; Installation Factor Reference
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Recommended Slack by Cable Type</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Cable Type</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Recommended Slack</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Electrical Power", "10%", "Terminations at junction boxes and panels"],
                    ["Ethernet (Cat5e/6)", "10%", "Patch panel and jack termination"],
                    ["Fiber Optic", "15%", "Splice tray and connector service loop"],
                    ["Coaxial", "10%", "Connector installation and weatherproofing"],
                  ].map(([type, slack, reason]) => (
                    <tr key={type} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{type}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{slack}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Installation Type Multipliers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Installation Type</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Factor</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Straight Run", "1.00×", "Direct unobstructed path, no additional length"],
                    ["In Conduit", "1.05×", "Friction and pulling constraints through the conduit"],
                    ["Overhead", "1.08×", "Sag between supports and pole-to-pole span allowance"],
                    ["Wall Routing", "1.10×", "Vertical and horizontal runs through studs and joists"],
                    ["Underground", "1.15×", "Settling, depth changes, and future access without excavation"],
                  ].map(([type, factor, why]) => (
                    <tr key={type} className="hover:bg-gray-50">
                      <td className="py-1.5 px-3 font-mono font-semibold text-primary text-xs">{type}</td>
                      <td className="py-1.5 px-3 font-mono text-gray-900 font-semibold text-xs">{factor}</td>
                      <td className="py-1.5 px-3 text-gray-500 text-xs">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Multipliers are applied to the subtotal of base distance + slack + bend allowance, not to base distance alone.</p>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={i} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Who Uses This */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Cable Length Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "⚡", title: "Licensed Electricians", desc: "Estimate cable material for branch circuits, feeders, and panel-to-subpanel runs before ordering, accounting for conduit routing and termination slack." },
            { icon: "🌐", title: "Network Installers", desc: "Plan Ethernet and fiber runs across offices and data centers, checking cable-type-specific slack and staying under the 90-meter copper limit." },
            { icon: "📹", title: "Security System Installers", desc: "Calculate coaxial and low-voltage cable runs for cameras and access control devices, including bend allowance around corners and door frames." },
            { icon: "☀️", title: "Solar Installers", desc: "Size DC wiring runs from roof-mounted panels to ground-level inverters, factoring in overhead or conduit routing multipliers for accurate material orders." },
            { icon: "📋", title: "Project Estimators", desc: "Generate accurate material quantities for bids and purchase orders across multiple cable runs, saving each calculation to history for the final takeoff list." },
            { icon: "🏠", title: "Homeowners & DIYers", desc: "Plan cable purchases for home network upgrades, security cameras, or small electrical additions without over- or under-buying material." },
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
