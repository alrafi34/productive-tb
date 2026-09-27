export const workforceRequirementCalculatorConfig = {
  name: "Workforce Requirement Calculator",
  slug: "workforce-requirement-calculator",
  category: "architecture",
  description: "Calculate how many workers you need for any project using workload, productivity, and time. Fast, accurate, and free online workforce calculator.",
  icon: "👥",
  color: "#058554",
  featured: false,
  keywords: [
    "workforce calculator",
    "manpower calculator",
    "labor requirement calculator",
    "project workforce estimator",
    "staff planning tool",
    "worker requirement calculator",
    "manpower planning calculator"
  ],
  seo: {
    title: "Workforce Calculator – How Many Workers Do I Need?",
    description: "Work out how many workers a job needs from the total work, output per worker and the days available. For construction crews, cleaning, packing and more.",
    keywords: "workforce calculator, manpower calculator, labor requirement calculator, project workforce estimator, staff planning tool",
    og: {
      title: "Workforce Requirement Calculator – Free Manpower Planning Tool",
      description: "Estimate required workers based on workload, productivity rates, and time constraints. Instant calculations with detailed breakdown.",
      type: "website",
      url: "/tools/architecture/workforce-requirement-calculator"
    },
    howToSteps: [
      { name: "Enter the total work", text: "Type the amount of work and its unit: square feet, units, tasks, items or your own." },
      { name: "Enter the output per worker", text: "Type how much one worker completes per day or per hour." },
      { name: "Set the time available", text: "Enter the number of working days and hours per day." },
      { name: "Read the crew size", text: "See the number of workers needed, rounded up, with the workload per worker and an optional labor cost." },
    ],
    faq: [
      { q: "How do you calculate the number of workers needed?", a: "Workers = total work ÷ (output per worker per day × working days), rounded up. Painting 12,000 sq ft in 5 days at 400 sq ft per painter per day needs 12,000 ÷ (400 × 5) = 6 painters." },
      { q: "What if productivity is given per hour?", a: "Multiply the hourly output by the hours worked per day. At 50 sq ft per hour and 8-hour days, one worker covers 400 sq ft a day." },
      { q: "Why is the result always rounded up?", a: "You cannot hire part of a worker, and rounding down would miss the deadline. If the unrounded figure is 5.2, six workers finish slightly early; five would need overtime." },
      { q: "Should I allow for breaks, weather and absences?", a: "Yes. Use realistic output rates rather than best-case ones, or add 10–20% to the crew for absences, weather, rework and coordination on construction sites." },
      { q: "Does adding workers always shorten the job?", a: "Not in proportion. Crowded work areas, shared equipment and supervision limits reduce each worker's output, so doubling a crew rarely halves the time." },
    ],
  },
  relatedTools: [
    "labor-cost-calculator",
    "project-timeline-calculator",
    "construction-cost-estimator"
  ]
};