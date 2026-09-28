export const toolConfig = {
  slug: "cron-expression-generator",
  name: "Cron Expression Generator",
  description: "Build cron schedules visually with dropdowns and see human-readable description instantly.",
  category: "developer",
  icon: "⏰",
  free: true,
  backend: false,
  seo: {
    title: "Cron Expression Generator – Build & Explain Cron Jobs",
    description: "Build a cron schedule with dropdowns or paste one to check it. See the five fields, a plain-English reading and common presets like every 5 minutes.",
    keywords: [
      "cron expression generator",
      "cron builder",
      "visual cron generator",
      "cron schedule builder",
      "cron syntax generator",
      "linux cron",
      "devops cron",
      "backend scheduler",
      "cron job builder",
      "cron parser",
      "cron validator",
      "schedule generator",
      "task scheduler",
      "automation tool"
    ],
    openGraph: {
      title: "Cron Expression Generator – Build & Explain Cron Jobs",
      description: "Build a cron schedule with dropdowns or paste one to check it. See the five fields, a plain-English reading and common presets like every 5 minutes.",
      type: "website",
      url: "https://productivetoolbox.com/tools/developer/cron-expression-generator"
    },
    howToSteps: [
      { name: "Start from a preset or the builder", text: "Pick a preset such as Every 15 minutes or Weekdays at 9 AM, or choose the minute, hour, day of month, month and day of week in the dropdowns." },
      { name: "Or paste an expression", text: "Paste an existing five-field expression, such as 0 9 * * 1-5, to check it and edit it in the builder." },
      { name: "Read the schedule", text: "The tool validates every field and shows the schedule in plain English, for example At 09:00 on weekdays." },
      { name: "Copy it", text: "Copy the expression or its description, or download both, and paste the expression into crontab, a Kubernetes CronJob or your CI scheduler." },
    ],
    faq: [
      { q: "What do the five fields of a cron expression mean?", a: "From left to right: minute (0–59), hour (0–23), day of month (1–31), month (1–12 or JAN–DEC) and day of week (0–7 or SUN–SAT, where both 0 and 7 are Sunday). For example 30 2 * * 1 runs at 02:30 every Monday." },
      { q: "What do *, comma, hyphen and slash mean?", a: "* matches every value. A comma lists values (1,15), a hyphen gives a range (1-5 = Monday to Friday) and a slash gives a step (*/15 = every 15 units, 10-50/10 = 10, 20, 30, 40 and 50)." },
      { q: "How do I run a job every 5 minutes?", a: "Use */5 * * * *. It runs at minutes 0, 5, 10 … 55 of every hour. For every 5 minutes during working hours only, use */5 9-17 * * 1-5." },
      { q: "What happens if I set both day of month and day of week?", a: "Standard cron runs the job when either field matches, not both. 0 0 1 * 1 runs at midnight on the 1st of every month and also every Monday. To run only on a Monday that is the 1st, check the date inside the script." },
      { q: "Which time zone does cron use?", a: "The time zone of the server or service running it. Linux crontab uses the system time zone, while GitHub Actions and many cloud schedulers use UTC unless you set a time zone, so convert your local time or daylight saving changes may shift the run." },
      { q: "Does this work with Quartz, Spring or AWS cron?", a: "It uses the standard five-field Unix format used by crontab, Kubernetes CronJobs and GitHub Actions. Quartz and Spring add a seconds field at the start, and AWS EventBridge adds a year field and requires ? in one of the day fields, so adapt the expression for those." },
    ],
  },
  features: [
    "Visual cron expression builder with dropdowns",
    "Instant human-readable description",
    "Real-time cron expression generation",
    "Copy cron expression and description",
    "Reverse parser (paste cron → update UI)",
    "Common cron presets library",
    "Cron validation system",
    "Syntax highlighting",
    "Mobile responsive design",
    "No backend required - 100% client-side"
  ]
};