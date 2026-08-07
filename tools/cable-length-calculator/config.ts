export const cableLengthCalculatorConfig = {
  name: "Cable Length Calculator",
  slug: "cable-length-calculator",
  category: "electrical",
  description: "Calculate accurate cable length for electrical, Ethernet, and fiber installations. Add slack, bends, and installation type to get precise results instantly.",
  icon: "📏",
  color: "#058554",
  featured: false,
  keywords: [
    "cable length calculator",
    "wire length calculator",
    "electrical cable calculator",
    "ethernet cable length",
    "fiber cable calculation",
    "cable slack calculator",
    "wire sizing calculator",
    "cable installation calculator"
  ],
  seo: {
    title: "Cable Length Calculator — Free Wire & Cable Length Tool Online",
    description: "Calculate total cable length instantly with slack, bend allowance, and installation factor. Get results in meters and feet. Free, browser-based, no signup.",
    keywords: [
      "cable length calculator",
      "wire length calculator",
      "cable length calculator online",
      "electrical cable calculator",
      "ethernet cable length calculator",
      "fiber cable length calculator",
      "cable slack calculator",
      "cable installation calculator",
      "cable run length calculator",
      "coaxial cable length calculator",
      "conduit cable length calculator",
      "cable length estimator",
      "how much cable do i need",
      "cable length with slack and bends",
      "underground cable length calculator",
      "network cable length calculator",
      "cable length calculator meters feet",
      "wire slack calculator",
      "bend allowance cable calculator",
      "free cable length calculator",
      "cable material estimator",
      "cat6 cable length calculator",
    ],
    og: {
      title: "Cable Length Calculator — Free Wire & Cable Length Tool Online",
      description: "Calculate total cable length instantly with slack, bend allowance, and installation factor. Get results in meters and feet. Free, browser-based, no signup.",
      type: "website",
      url: "/tools/electrical/cable-length-calculator"
    },
    howToSteps: [
      {
        name: "Enter the Measured Distance",
        text: "Type the point-to-point distance between the cable origin and destination, choosing meters or feet. This is the base distance before any allowances are added.",
      },
      {
        name: "Select the Cable Type",
        text: "Choose electrical power, Ethernet, fiber optic, or coaxial. This sets the recommended slack percentage and determines which cable-specific warnings appear.",
      },
      {
        name: "Choose the Installation Method",
        text: "Select straight run, conduit, wall routing, underground, or overhead. Each method applies a different multiplier, from 1.0x for straight runs to 1.15x for underground.",
      },
      {
        name: "Set Slack Percentage and Bend Count",
        text: "Use the recommended slack for your cable type or adjust manually. Enter the number of bends in the route and the allowance per bend, typically 0.3 to 0.5 meters.",
      },
      {
        name: "Read the Total Length and Breakdown",
        text: "The calculator shows total cable length in meters and feet with a line-by-line breakdown of base distance, slack, bend allowance, and installation factor.",
      },
      {
        name: "Save, Export, or Apply a Preset",
        text: "Save the calculation to history, export a text or CSV report for purchasing, or start from one of six built-in scenario presets.",
      },
    ],
    faq: [
      {
        q: "What is a cable length calculator?",
        a: "A cable length calculator is a tool that determines the total amount of cable you need to buy for an installation, starting from the measured point-to-point distance and adding slack, bend allowance, and an installation-type multiplier. It answers the practical question every installer faces before ordering material: how many meters of cable do I actually need, not just the straight-line distance between the two ends.",
      },
      {
        q: "How is total cable length calculated?",
        a: "The calculator takes your base distance, adds a slack percentage for terminations and service loops, adds a fixed allowance per bend or turn in the route, sums those three figures into a subtotal, then multiplies the subtotal by an installation factor that reflects the routing method, from 1.0 for a straight run up to 1.15 for underground burial. The result is returned in both meters and feet.",
      },
      {
        q: "How much slack should I add to a cable run?",
        a: "Ten percent is a reasonable default for electrical and Ethernet cable, covering termination stripping and a small service loop at each end. Fiber optic cable needs 15 percent because of splice tray requirements, and underground runs need 15 to 20 percent to allow for soil settling and future access without re-trenching. The calculator's Use Recommended button fills in the correct figure automatically.",
      },
      {
        q: "What is bend allowance and why does it matter?",
        a: "Bend allowance is the extra cable length consumed by each turn in the physical route that a straight-line distance measurement does not capture, since a cable rarely runs in a perfectly straight line from source to load. The calculator multiplies the entered bend allowance, typically 0.3 to 0.5 meters per 90-degree bend, by the number of bends and adds that to the total.",
      },
      {
        q: "What do the installation type multipliers mean?",
        a: "Each installation type applies a different multiplier to the subtotal to reflect how routing conditions add hidden length: straight run is 1.0x with no addition, conduit is 1.05x, wall routing is 1.1x, overhead is 1.08x, and underground is 1.15x, the highest because buried cable needs extra length for settling, depth variation, and future splice access.",
      },
      {
        q: "Why does the calculator warn me about Ethernet runs over 90 meters?",
        a: "The TIA/EIA-568 standard caps a solid-core twisted-pair Ethernet channel at 100 meters total, with the fixed cable segment limited to 90 meters to leave headroom for patch cords at each end. If your base distance exceeds 90 meters, the calculator flags this because signal attenuation beyond that point causes packet loss and unreliable link negotiation.",
      },
      {
        q: "Does this calculator size electrical wire gauge or check voltage drop?",
        a: "No. This calculator answers only how much cable length you need to purchase. It does not check ampacity or voltage drop, which depend on conductor cross-section, current, and voltage rather than route length alone. For gauge selection and voltage drop analysis, use a dedicated wire size calculator alongside this tool once you know your total run length.",
      },
      {
        q: "Can I use this calculator for both electrical and data cabling?",
        a: "Yes. The calculator supports four cable types: electrical power, Ethernet, fiber optic, and coaxial, each with its own recommended slack percentage and installation-specific guidance. The underlying length formula of distance plus slack plus bend allowance, then installation factor, is the same across all four; only the recommended defaults and warnings differ by cable type.",
      },
      {
        q: "What is the difference between measured distance and total cable length?",
        a: "Measured distance is the point-to-point span between the cable's origin and destination, often taken with a tape measure or from a floor plan. Total cable length is what you actually need to buy: measured distance plus slack for terminations, plus bend allowance for every turn, plus the installation factor for the routing method. On a run with several bends through conduit, total cable length can run 15 to 25 percent higher than the raw measured distance.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your distance, slack, bend, and installation inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "wire-size-calculator",
    "voltage-drop-calculator",
    "circuit-breaker-calculator",
    "earthing-resistance-calculator",
    "house-wiring-load-calculator",
    "electrical-load-calculator-building"
  ]
};

export const toolConfig = cableLengthCalculatorConfig;
