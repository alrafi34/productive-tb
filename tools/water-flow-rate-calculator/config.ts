export const waterFlowRateCalculatorConfig = {
  name: "Water Flow Rate Calculator",
  slug: "water-flow-rate-calculator",
  category: "architecture",
  description: "Calculate water flow rate, velocity, and pipe diameter instantly. Free online plumbing calculator for engineers, architects, and builders.",
  icon: "💧",
  color: "#058554",
  featured: false,
  keywords: [
    "water flow calculator",
    "pipe flow rate calculator",
    "plumbing flow calculator",
    "flow rate formula",
    "pipe velocity calculator",
    "building water flow",
    "hydraulic calculator"
  ],
  seo: {
    title: "Water Flow Rate Calculator – Pipe Flow & Velocity",
    description: "Calculate water flow rate, velocity or pipe diameter from the other two with Q = A × v. Results in L/min, GPM and m³/s, with velocity checks.",
    keywords: "water flow calculator, pipe flow rate calculator, plumbing flow calculator, flow rate formula, pipe velocity calculator",
    og: {
      title: "Water Flow Rate Calculator – Building Plumbing Tool",
      description: "Calculate water flow rate based on pipe dimensions and velocity. Instant results for plumbing system design.",
      type: "website",
      url: "/tools/architecture/water-flow-rate-calculator"
    },
    howToSteps: [
      { name: "Choose what to calculate", text: "Select flow rate, velocity or pipe diameter." },
      { name: "Enter the known values", text: "Type the pipe's internal diameter in mm, the velocity in m/s or the flow in L/min." },
      { name: "Read the results", text: "See the answer in L/min, US GPM and m³/s, with a note if the velocity is too low or too high." },
    ],
    faq: [
      { q: "How is flow rate calculated from pipe size and velocity?", a: "Q = A × v, where A = π × (D/2)². A pipe with a 20 mm inside diameter at 1.5 m/s carries 0.000471 m³/s, which is 28.3 L/min or 7.5 US gallons per minute." },
      { q: "What velocity should water pipes be designed for?", a: "About 1–2.5 m/s (3–8 ft/s) for domestic cold water, with the lower end for hot water to limit noise and erosion. Many US designers use 8 ft/s as the upper limit for cold and 5 ft/s for hot water in copper." },
      { q: "How do I convert L/min to GPM?", a: "Divide L/min by 3.785 for US gallons per minute, or by 4.546 for UK (imperial) gallons. 28.3 L/min = 7.5 US GPM = 6.2 UK GPM." },
      { q: "Which diameter should I enter?", a: "The internal diameter. Nominal pipe sizes differ from the bore: a ¾ in type L copper pipe has an ID of 0.785 in (19.9 mm), and 22 mm copper in Europe has about 20 mm inside." },
      { q: "What is water hammer?", a: "A pressure surge when flowing water stops suddenly, for example when a valve slams shut. Keeping velocities below about 2.5–3 m/s, using slow-closing valves and fitting water hammer arrestors all reduce it." },
    ],
  },
  relatedTools: [
    "plumbing-pipe-size-calculator",
    "drainage-flow-calculator",
    "water-tank-capacity-calculator"
  ]
};
