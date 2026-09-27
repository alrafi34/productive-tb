export const projectTimelineCalculatorConfig = {
  name: "Project Timeline Calculator",
  slug: "project-timeline-calculator",
  category: "architecture",
  description: "Easily calculate project timelines for construction and planning. Add tasks, set dependencies, and estimate completion dates instantly with this free online calculator.",
  icon: "📅",
  color: "#058554",
  featured: false,
  keywords: [
    "project timeline calculator",
    "construction duration calculator",
    "task scheduling tool",
    "gantt chart calculator",
    "project planning tool",
    "critical path method",
    "construction timeline estimator"
  ],
  seo: {
    title: "Project Timeline Calculator – Construction Schedule",
    description: "Plan a project schedule: list tasks with durations and dependencies, pick 5, 6 or 7 working days a week and get start and finish dates and a Gantt chart.",
    keywords: "project timeline calculator, construction duration calculator, task scheduling tool, gantt chart calculator, project planning tool",
    og: {
      title: "Project Timeline Calculator – Free Construction Timeline Estimator",
      description: "Calculate project duration with task dependencies and parallel execution. Visual timeline with critical path analysis.",
      type: "website",
      url: "/tools/architecture/project-timeline-calculator"
    },
    howToSteps: [
      { name: "Set the start date", text: "Pick the project start date and the working days per week (5, 6 or 7)." },
      { name: "Add the tasks", text: "Enter each task's name and duration in working days, or load a construction template." },
      { name: "Link the tasks", text: "Choose which task each one depends on, and whether it runs in sequence or in parallel." },
      { name: "Read the schedule", text: "See each task's start and finish dates, the total duration, the completion date and a Gantt chart." },
    ],
    faq: [
      { q: "How is a project's completion date calculated?", a: "Each task starts after the tasks it depends on finish; tasks with no dependency start on the project start date. The finish date is the latest task end, counted in working days, so a 20-working-day job starting on a Monday with a 5-day week ends four weeks later on a Friday." },
      { q: "What is the critical path?", a: "The longest chain of dependent tasks from start to finish. Any delay on it delays the whole project, while tasks off the critical path have float and can slip a little." },
      { q: "How long does it take to build a house?", a: "In the US, a site-built single-family home takes about 7–8 months on average from start to completion (US Census Bureau Survey of Construction), longer for custom and owner-built homes." },
      { q: "Should I plan with 5 or 6 working days a week?", a: "Use the schedule your crews actually work. Most US and European sites work Monday to Friday; 6-day weeks shorten a schedule by about 17% but raise labor costs and fatigue." },
      { q: "How much contingency should I add?", a: "Add 10–20% to durations for weather, inspections, material delays and rework, and more for renovation, where hidden conditions are common." },
    ],
  },
  relatedTools: [
    "construction-cost-estimator",
    "labor-cost-calculator",
    "material-cost-calculator"
  ]
};