export const laborCostCalculatorConfig = {
  name: "Labor Cost Calculator",
  slug: "labor-cost-calculator",
  category: "architecture",
  description: "Calculate labor costs instantly for construction projects. Support hourly and daily wages, overtime, and multiple workers. Free online labor cost calculator tool.",
  icon: "👷",
  color: "#058554",
  featured: false,
  keywords: [
    "labor cost calculator",
    "construction cost calculator",
    "worker wage calculator",
    "hourly wage calculator",
    "project cost estimation tool",
    "workforce cost calculator",
    "construction labor estimator"
  ],
  seo: {
    title: "Labor Cost Calculator – Crew Cost with Overtime",
    description: "Work out the cost of a crew from hourly or daily wages, number of workers, time on the job, overtime and extra expenses, in $, €, £, CA$ or A$.",
    keywords: "labor cost calculator, construction cost calculator, worker wage calculator, hourly wage calculator, project cost estimation tool",
    og: {
      title: "Labor Cost Calculator – Free Construction Workforce Cost Estimator",
      description: "Calculate total labor costs with hourly/daily wages, overtime rates, and multiple workers. Instant results with detailed breakdown.",
      type: "website",
      url: "/tools/architecture/labor-cost-calculator"
    },
    howToSteps: [
      { name: "Choose the wage type", text: "Select hourly or daily wages and your currency." },
      { name: "Enter the crew", text: "Type the wage per worker, the number of workers and the hours or days worked." },
      { name: "Add overtime", text: "Turn on overtime and enter the hours and multiplier, for example 1.5 for time-and-a-half." },
      { name: "Add other costs", text: "Enter extra expenses such as travel, equipment or permits." },
      { name: "Read the total", text: "See the base cost, overtime, extras, total, cost per worker and average hourly rate." },
    ],
    faq: [
      { q: "How is labor cost calculated?", a: "Base cost = wage × workers × hours (or days). Overtime = wage × multiplier × overtime hours × workers. A crew of 4 at $25/hour for 40 hours costs $4,000, and 5 overtime hours each at 1.5× adds $750." },
      { q: "What is time-and-a-half?", a: "Overtime paid at 1.5 times the normal rate. Under the US Fair Labor Standards Act, non-exempt employees get it for hours over 40 in a workweek; some states, such as California, also pay daily overtime." },
      { q: "Does the wage include burden costs?", a: "Only if you include it. Employers also pay payroll taxes, workers' compensation insurance, benefits and paid leave, which typically add 25–40% to the base wage in the US. Enter a loaded rate, or add these as extra expenses." },
      { q: "Where do the wage presets come from?", a: "From the US Bureau of Labor Statistics Occupational Outlook Handbook: median pay for construction laborers (about $21.50/hour) and electricians and plumbers (about $29.60/hour) in May 2023. They are in US dollars; use local rates elsewhere." },
      { q: "Can I use this outside construction?", a: "Yes. It works for any crew paid by the hour or day: cleaning, landscaping, events, warehousing or manufacturing." },
    ],
  },
  relatedTools: [
    "construction-cost-estimator",
    "material-cost-calculator",
    "escalation-cost-calculator"
  ]
};