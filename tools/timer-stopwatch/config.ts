export const toolConfig = {
  slug: "timer-stopwatch",
  name: "Stopwatch & Timer",
  description: "High-precision stopwatch and countdown timer with lap tracking and multi-timer support.",
  category: "utility",
  icon: "⏱️",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "Is this timer accurate?", a: "Yes. We use the High Resolution Time API (`performance.now()`) to measure the precise passage of time regardless of browser event loop congestion." },
      { q: "Can I run multiple countdowns?", a: "Absolutely. You can add as many countdown timers as you need, label them, and run them concurrently. Each has its own progress tracker and alarm." },
    ],
    title: "Stopwatch & Countdown Timer – High Precision Online Timer",
    description: "Use a high-precision stopwatch and countdown timer directly in your browser. Track lap times and manage multiple timers instantly.",
    keywords: [
      "online stopwatch",
      "countdown timer",
      "lap timer",
      "high precision timer",
      "multi timer online",
      "workout timer",
      "cooking timer"
    ],
    openGraph: {
      title: "Stopwatch & Countdown Timer - Precise & Multi-Mode",
      description: "A professional-grade timing suite with lap tracking and multiple simultaneous countdowns.",
      type: "website",
      url: "/tools/timer-stopwatch"
    }
  },
  features: [
    "High-precision timing using performance.now()",
    "Stopwatch with detailed lap analysis (fastest/slowest)",
    "Multiple simultaneous countdown timers",
    "Keyboard shortcuts (Space, L, R) for professional use",
    "Session history saved locally in your browser"
  ]
};
