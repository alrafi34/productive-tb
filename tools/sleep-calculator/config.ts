import { siteConfig } from "@/config/site";

export const sleepCalculatorConfig = {
  name: "Sleep Calculator",
  description: "Find the best time to go to bed or wake up, timed to 90-minute sleep cycles, so you wake up between cycles rather than in deep sleep.",
  icon: "😴",
  category: "health",
  slug: "sleep-calculator",
  seo: {
    title: "Sleep Calculator – Best Time to Sleep and Wake Up",
    description: "Work out when to go to bed or set your alarm so you wake up at the end of a 90-minute sleep cycle. Includes time to fall asleep and sleep needs by age.",
    keywords: [
      "sleep calculator",
      "bedtime calculator",
      "when should i go to bed",
      "sleep cycle calculator",
      "wake up time calculator",
      "what time should i wake up",
      "90 minute sleep cycle",
      "how much sleep do i need",
      "sleep cycle alarm",
      "best time to sleep",
    ],
    og: {
      title: "Sleep Calculator – Best Time to Sleep and Wake Up",
      description: "Work out when to go to bed or set your alarm so you wake up at the end of a 90-minute sleep cycle. Includes time to fall asleep and sleep needs by age.",
      url: `${siteConfig.url}/tools/health/sleep-calculator`,
    },
    howToSteps: [
      { name: "Choose what you know", text: "Pick I want to wake up at to get bedtimes, I'm going to bed at to get alarm times, or I'm going to bed now." },
      { name: "Enter the time", text: "Set your wake-up time or bedtime; times use your device's 12- or 24-hour format." },
      { name: "Adjust the details", text: "Set how long you usually take to fall asleep (15 minutes is typical) and, if you know it, your sleep cycle length." },
      { name: "Pick a time", text: "Choose one of the suggested times; 5 or 6 cycles give 7.5 to 9 hours of sleep, the range recommended for adults." },
    ],
    faq: [
      { q: "How does the sleep calculator work?", a: "Sleep runs in cycles of light, deep and REM sleep that last about 90 minutes. The calculator counts back (or forward) whole cycles from your wake-up time or bedtime and adds the time it takes to fall asleep. To wake at 7:00 AM after six cycles and 15 minutes to fall asleep, go to bed at 9:45 PM." },
      { q: "Why wake up at the end of a sleep cycle?", a: "Waking from deep sleep often leaves you groggy, a state called sleep inertia. Waking in light sleep near the end of a cycle usually feels easier. Cycle length varies from person to person and through the night, so treat the times as a guide." },
      { q: "How much sleep do adults need?", a: "At least 7 hours a night, and 7–9 hours for most adults, according to the American Academy of Sleep Medicine and the Sleep Research Society. Five cycles is 7.5 hours and six cycles is 9 hours." },
      { q: "How long should it take to fall asleep?", a: "Around 10–20 minutes for most healthy adults. Falling asleep within a couple of minutes every night can be a sign of sleep deprivation, while regularly taking longer than 30 minutes may point to insomnia." },
      { q: "Is a sleep cycle always 90 minutes?", a: "No. Cycles typically last 70–120 minutes, with more deep sleep early in the night and more REM sleep toward morning. If you know your own pattern from a sleep tracker, change the cycle length." },
      { q: "What if I often wake up tired?", a: "Keep a regular sleep and wake time, including weekends, limit caffeine after midday and screens before bed, and keep your bedroom dark and cool. See a doctor if you snore loudly, stop breathing during sleep or feel sleepy during the day despite enough sleep." },
    ],
  },
};
