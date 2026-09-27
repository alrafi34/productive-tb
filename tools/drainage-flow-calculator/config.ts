export const drainageFlowCalculatorConfig = {
  name: "Drainage Flow Calculator",
  slug: "drainage-flow-calculator",
  category: "architecture",
  description: "Calculate drainage flow instantly using Manning's equation. Estimate pipe and open channel flow rates with accurate, fast, and free online calculator.",
  icon: "💧",
  color: "#058554",
  featured: false,
  keywords: [
    "drainage flow calculator",
    "manning equation calculator",
    "pipe flow calculator",
    "open channel flow calculator",
    "hydraulic flow tool",
    "stormwater drainage",
    "sewer flow calculator"
  ],
  seo: {
    title: "Drainage Flow Calculator – Manning's Equation",
    description: "Calculate flow rate and velocity in a full drainage pipe or a rectangular open channel with Manning's equation, in m³/s, L/s and GPM. Metric or imperial.",
    keywords: "drainage flow calculator, manning equation calculator, pipe flow calculator, open channel flow calculator, hydraulic flow tool",
    og: {
      title: "Drainage Flow Calculator – Free Hydraulic Flow Analysis Tool",
      description: "Calculate drainage flow rates for pipes and channels using Manning's equation. Instant results for civil engineering and stormwater design.",
      type: "website",
      url: "/tools/architecture/drainage-flow-calculator"
    },
    howToSteps: [
      { name: "Choose the drainage type", text: "Pick pipe flow (circular, flowing full) or open channel (rectangular)." },
      { name: "Choose the units", text: "Select metric or imperial." },
      { name: "Enter the geometry", text: "Type the pipe diameter, or the channel width and water depth." },
      { name: "Set slope and material", text: "Enter the slope as a decimal (0.01 = 1%) and choose a material to set Manning's n." },
      { name: "Read the flow", text: "See the flow rate in m³/s, L/s and GPM, the velocity, the hydraulic radius and notes." },
    ],
    faq: [
      { q: "What is Manning's equation?", a: "V = (1/n) R^(2/3) S^(1/2) in SI units (1.49/n in US units), where R is the hydraulic radius and S the slope; flow Q = V × A. A 300 mm concrete pipe (n = 0.013) flowing full at 1% slope carries about 0.097 m³/s (97 L/s) at 1.37 m/s." },
      { q: "How do I choose Manning's n?", a: "About 0.009–0.011 for PVC and HDPE, 0.013 for concrete, 0.024 for corrugated metal and 0.022–0.035 for earth channels, depending on condition and vegetation." },
      { q: "What slope should drain pipes have?", a: "Building drains need at least ¼ in per foot (2%) for pipes up to 3 in and ⅛ in per foot (1%) for 4–6 in pipes under the IPC and UPC. Gravity sewers are designed to keep at least 2 ft/s (0.6 m/s) so solids do not settle." },
      { q: "Does it handle partly full pipes?", a: "No. It assumes a pipe flowing full. At about 80–95% depth a circular pipe can carry slightly more than full; for other depths use partial-flow charts." },
      { q: "How do I convert m³/s to GPM?", a: "1 m³/s = 15,850 US GPM; 1 L/s = 15.85 GPM. 97 L/s is about 1,530 GPM." },
    ],
  },
  relatedTools: [
    "excavation-volume-calculator",
    "concrete-volume-calculator",
    "slope-stability-calculator"
  ]
};
