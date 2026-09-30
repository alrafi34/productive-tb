export const toolConfig = {
  slug: "time-duration-calculator",
  name: "Time Duration Calculator",
  description: "Calculate hours and minutes between two times instantly. Handles overnight durations and seconds precision.",
  category: "calculator",
  icon: "⏳",
  free: true,
  backend: false,
  seo: {
    title: "Time Duration Calculator – Hours Between Two Times",
    description: "Calculate the hours, minutes and seconds between two times, including overnight shifts, with the total in hours, minutes and seconds.",
    keywords: [
      "time duration calculator",
      "time difference calculator",
      "calculate time between two times",
      "hours and minutes calculator",
      "elapsed time calculator",
      "work hours calculator",
      "shift duration calculator",
      "overnight time calculator",
      "time interval calculator",
      "time span calculator",
      "hours calculator",
      "minutes calculator",
      "calculate elapsed time online",
      "time tracking calculator"
    ],
    openGraph: {
      title: "Time Duration Calculator - Calculate Time Between Two Times",
      description: "Fast and accurate time duration calculator with overnight handling, seconds precision, and detailed total output.",
      type: "website",
      url: "/tools/time-duration-calculator"
    },
    howToSteps: [
      { name: "Enter your start time", text: "Enter your start time." },
      { name: "Enter your end time", text: "Enter your end time." },
      { name: "Enable seconds precision if needed", text: "Enable seconds precision if needed." },
      { name: "Read instant duration plus total hours", text: "Read instant duration plus total hours, minutes, and seconds." },
      { name: "Copy or save the result for later use", text: "Copy or save the result for later use." },
    ],
    faq: [
      { q: "Can I calculate time across midnight?", a: "Yes. If your end time is earlier than your start time, the tool treats it as next-day time. For example, 22:30 to 06:15 is calculated as 7 hours and 45 minutes." },
      { q: "Does this tool support seconds?", a: "Yes. Enable seconds precision to enter HH:MM:SS values and get second-level duration output for sports, production, lab work, and detailed timing tasks." },
      { q: "Can I use this as a work hours or shift duration calculator?", a: "Yes. It works well for shift planning, attendance checks, overtime estimates, and daily time tracking. Quick presets and swap controls help speed up repeated calculations." },
      { q: "Is my time data stored or sent to a server?", a: "Calculations are processed in your browser. Recent history is stored locally on your device for convenience, and your inputs are not required to be sent to a backend for calculation." },
      { q: "What time format should I use?", a: "Use 24-hour format. Enter HH:MM for standard mode or HH:MM:SS when seconds precision is enabled." },
      { q: "Can I copy results quickly?", a: "Yes. Use the copy button to copy the main duration result and paste it directly into timesheets, reports, chat messages, or planning notes." },
    ],
  },
  features: [
    "Calculate duration in hours, minutes, and seconds",
    "Automatic overnight duration handling",
    "Optional seconds precision",
    "Swap start and end times",
    "Copy results to clipboard",
    "Recent calculations history"
  ]
};
