import { siteConfig } from "@/config/site";

export const countdownTimerConfig = {
  name: "Countdown Timer",
  description: "Count down the days, hours, minutes and seconds to any date and time, or to holidays like Christmas, and share the countdown with a link.",
  icon: "⏳",
  category: "productivity",
  slug: "countdown-timer",
  seo: {
    title: "Countdown Timer to Any Date – Days Until Christmas & More",
    description: "Count down the days, hours, minutes and seconds to a birthday, trip, deadline or holiday like Christmas or New Year, in your own timezone. Share it with a link.",
    keywords: [
      "countdown timer",
      "countdown to date",
      "days until",
      "how many days until christmas",
      "days until new year",
      "event countdown",
      "birthday countdown",
      "countdown clock",
      "days until halloween",
      "days until thanksgiving",
    ],
    og: {
      title: "Countdown Timer to Any Date – Days Until Christmas & More",
      description: "Count down the days, hours, minutes and seconds to a birthday, trip, deadline or holiday like Christmas or New Year, in your own timezone. Share it with a link.",
      url: `${siteConfig.url}/tools/productivity/countdown-timer`,
    },
    howToSteps: [
      { name: "Name your event", text: "Type what you are counting down to, such as a birthday, a trip or a deadline." },
      { name: "Set the date and time", text: "Pick the date and, if it matters, the time, or tap a holiday such as Christmas or New Year's Day to fill it in." },
      { name: "Watch the countdown", text: "See the days, hours, minutes and seconds left, updated every second, plus the total in weeks, hours and minutes." },
      { name: "Share it", text: "Copy the share link so friends open the same countdown; each person sees it in their own timezone." },
    ],
    faq: [
      { q: "How many days until Christmas?", a: "Tap the Christmas button and the countdown shows the days, hours, minutes and seconds until midnight at the start of December 25 in your timezone. From September 29, 2026, it is 87 days." },
      { q: "Which timezone does the countdown use?", a: "Your device's own timezone. A countdown to midnight on January 1 reaches zero when the new year starts where you are, so friends in other timezones see it finish at their own midnight." },
      { q: "How does the share link work?", a: "The event name and the date and time are saved in the link itself, with nothing stored on a server. Anyone who opens the link sees the same countdown, counted to that local time where they are." },
      { q: "When are Easter and Thanksgiving this year?", a: "Easter Sunday moves each year: April 5 in 2026, March 28 in 2027 and April 16 in 2028. US Thanksgiving is the fourth Thursday of November: November 26 in 2026 and November 25 in 2027. The buttons always pick the next one." },
      { q: "Does the countdown keep running if I close the page?", a: "The countdown is worked out from the target date each time you open the page, so it is always right when you come back. Bookmark it or save the share link to return to it later." },
    ],
  },
};
