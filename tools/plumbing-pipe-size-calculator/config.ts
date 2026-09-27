export const plumbingPipeSizeCalculatorConfig = {
  name: "Plumbing Pipe Size Calculator",
  slug: "plumbing-pipe-size-calculator",
  category: "architecture",
  description: "Calculate pipe diameter, flow rate, and velocity instantly with this free plumbing pipe size calculator. Supports metric and imperial units with real-time results.",
  icon: "🔧",
  color: "#058554",
  featured: false,
  keywords: [
    "pipe size calculator",
    "plumbing calculator",
    "pipe diameter calculator",
    "flow rate calculator",
    "fluid velocity pipe sizing",
    "hydraulic pipe calculator",
    "water pipe sizing"
  ],
  seo: {
    title: "Pipe Size Calculator – Diameter from Flow & Velocity",
    description: "Size a water pipe from the flow rate and velocity, or find the velocity or flow for a given diameter. L/s, m³/h, GPM and ft³/s, with limits by material.",
    keywords: "pipe size calculator, plumbing calculator, pipe diameter calculator, flow rate calculator, fluid velocity pipe sizing",
    og: {
      title: "Plumbing Pipe Size Calculator – Free Hydraulic Sizing Tool",
      description: "Calculate pipe diameter based on flow rate and velocity. Instant results for plumbing and hydraulic system design.",
      type: "website",
      url: "/tools/architecture/plumbing-pipe-size-calculator"
    },
    howToSteps: [
      { name: "Choose what to calculate", text: "Pick pipe diameter, velocity or flow rate." },
      { name: "Pick the material", text: "Choose PVC, copper, steel or cast iron to see its recommended velocity range." },
      { name: "Enter the known values", text: "Type the flow in L/s, m³/h, GPM or ft³/s and the velocity in m/s or ft/s, or the diameter in mm." },
      { name: "Read and round up", text: "See the result in several units, then choose the next standard pipe size up." },
    ],
    faq: [
      { q: "How do I calculate pipe diameter from flow rate?", a: "D = √(4Q ÷ πV). 1 L/s (15.85 GPM) at 1.5 m/s needs an inside diameter of √(4 × 0.001 ÷ (π × 1.5)) = 29 mm, so the next size up: 32 mm (1¼ in) pipe." },
      { q: "What velocity should water pipes have?", a: "About 1.2–2.0 m/s (4–6.5 ft/s) in homes, lower for hot water in copper (under about 5 ft/s) to limit noise and erosion. Plastic pipes tolerate up to about 2.5–3 m/s (8–10 ft/s)." },
      { q: "How do I convert flow units?", a: "1 L/s = 15.85 US GPM = 3.6 m³/h = 0.0353 ft³/s." },
      { q: "Does this replace fixture-unit sizing?", a: "No. US codes (IPC, UPC) size supply pipes by water supply fixture units and pressure loss, and European standard EN 806-3 by loading units. Use this calculator to check velocities and for single known flows." },
      { q: "Why do actual pipe sizes differ from the calculated diameter?", a: "Pipes are sold in nominal sizes whose inside diameter depends on the material and wall thickness. A ¾ in type L copper tube has a 0.785 in bore; 22 mm copper about 20 mm. Always compare the calculated bore with the pipe's actual inside diameter." },
    ],
  },
  relatedTools: [
    "drainage-flow-calculator",
    "water-tank-capacity-calculator",
    "concrete-volume-calculator"
  ]
};
