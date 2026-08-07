import { siteConfig } from "@/config/site";

export const sessionDurationCalculatorConfig = {
  slug: "session-duration-calculator",
  name: "Session Duration Calculator",
  description: "Calculate average session duration, total session time, and engagement time from website, app, or analytics data. Supports hours/minutes/seconds, total seconds, and bulk-paste modes with CSV/JSON export. Free browser-based tool.",
  category: "data-analytics",
  icon: "⏱️",
  free: true,
  relatedTools: [
    "page-speed-score-calculator",
    "bounce-rate-calculator",
    "conversion-rate-calculator",
    "retention-rate-calculator",
    "engagement-rate-calculator",
    "impressions-calculator",
  ],
  seo: {
    title: "Session Duration Calculator — Free Average Session Time Tool",
    description: "Calculate average session duration instantly using total session time and number of sessions. Supports hours, minutes, seconds, bulk calculations, CSV export, JSON export, and live results. Free online Session Duration Calculator.",
    keywords: [
      "session duration calculator",
      "average session duration",
      "average session time calculator",
      "engagement time calculator",
      "website session calculator",
      "ga4 session duration",
      "google analytics calculator",
      "analytics calculator",
      "average visit duration",
      "online session duration tool",
      "session length calculator",
      "app session time calculator",
      "user engagement calculator",
      "session time converter",
      "seconds to minutes calculator",
      "bulk session calculator",
      "free session duration tool",
      "analytics time calculator",
      "average time on site calculator",
      "session metrics calculator",
    ],
    openGraph: {
      title: "Session Duration Calculator — Free Average Session Time Tool",
      description: "Calculate average session duration instantly from total session time and number of sessions. Supports bulk data, CSV/JSON export, and live results — free and browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/data-analytics/session-duration-calculator`,
    },
    og: {
      title: "Session Duration Calculator — Free Average Session Time Tool",
      description: "Calculate average session duration instantly from total session time and number of sessions. Supports bulk data, CSV/JSON export, and live results — free and browser-based.",
      url: `${siteConfig.url}/tools/data-analytics/session-duration-calculator`,
    },
    howToSteps: [
      {
        name: "Choose a Calculation Mode",
        text: "Select Hours/Minutes/Seconds for manual entry, Total Seconds for a single number, or Paste Analytics Data to bulk-process a list of session durations.",
      },
      {
        name: "Enter Your Session Data",
        text: "Type your total session time and number of sessions, or paste one duration per line — supporting plain seconds, HH:MM:SS, MM:SS, or 'Session N = seconds' formats.",
      },
      {
        name: "Read the Live Average",
        text: "The average session duration updates instantly in human-readable format, HH:MM:SS, decimal minutes, and decimal hours as you type.",
      },
      {
        name: "Review the Calculation Breakdown",
        text: "Check exactly how your total time and session count produced the result, including the raw formula and hour/minute/second parts.",
      },
      {
        name: "Copy, Export, or Save",
        text: "Copy the result or full report, download as CSV or JSON, print a report, or save the calculation to your local history for later comparison.",
      },
    ],
    faq: [
      {
        q: "What is a session duration calculator?",
        a: "A session duration calculator is a free browser-based tool that computes the average length of a session — such as a website visit, app session, or video watch time — by dividing total session time by the number of sessions. It also converts the result into human-readable, HH:MM:SS, and decimal formats.",
      },
      {
        q: "How is average session duration calculated?",
        a: "Average Session Duration = Total Session Time ÷ Number of Sessions. For example, 2 hours (7,200 seconds) of total session time across 24 sessions gives 7,200 ÷ 24 = 300 seconds, or 5 minutes per session.",
      },
      {
        q: "What input formats does bulk mode support?",
        a: "Bulk mode accepts one duration per line in plain seconds (e.g. 240), HH:MM:SS (e.g. 01:02:03), MM:SS (e.g. 02:30), or the 'Session N = seconds' format (e.g. Session 1 = 240). Unrecognized lines are automatically ignored and flagged.",
      },
      {
        q: "What is the difference between average session duration and engagement time?",
        a: "Average session duration measures the typical length of a single session across your total dataset, while engagement time (as reported by GA4) measures time the app or site was actively in the foreground. This calculator computes the former from raw totals you provide.",
      },
      {
        q: "Can I calculate session duration from GA4 or Google Analytics data?",
        a: "Yes. Export your total session time and session count from GA4 or Universal Analytics, then enter them in Hours/Minutes/Seconds or Total Seconds mode, or paste individual session lengths in bulk mode for a per-session breakdown.",
      },
      {
        q: "Why does the calculator show both HH:MM:SS and decimal formats?",
        a: "Different tools expect different formats — spreadsheets and dashboards often prefer decimal minutes or hours for calculations, while reports typically display HH:MM:SS or a human-readable string like '2m 18s' for readability.",
      },
      {
        q: "What happens if I enter zero sessions?",
        a: "The calculator requires at least one session to compute an average, since dividing by zero is undefined. You'll see a validation message: 'Number of sessions must be greater than zero.'",
      },
      {
        q: "Does bulk mode let me set a custom session count?",
        a: "No — in bulk mode, the number of sessions is automatically derived from the count of valid duration lines you paste, ensuring the average always reflects the exact dataset provided.",
      },
      {
        q: "Can I process thousands of session durations at once?",
        a: "Yes. Bulk mode is designed to handle large pasted datasets efficiently in the browser, though the chart preview displays only the first 60 sessions for readability while the calculation itself uses the complete dataset.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your session data is never transmitted to any server, stored in any database, or accessible to anyone other than you. Calculation history is stored only in your browser's local storage.",
      },
    ],
  },
};
