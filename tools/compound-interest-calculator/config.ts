export const toolConfig = {
  slug: "compound-interest-calculator",
  name: "Compound Interest Calculator",
  description: "Calculate compound interest and visualize investment growth over time with interactive charts.",
  category: "calculator",
  icon: "📈",
  free: true,
  backend: false,
  seo: {
    title: "Compound Interest Calculator – With Monthly Contributions",
    description: "Calculate compound interest with optional monthly, quarterly or yearly contributions. Compare compounding frequencies, see growth year by year and export CSV.",
    keywords: [
      "compound interest calculator",
      "investment calculator",
      "future value calculator",
      "compound growth calculator",
      "savings calculator",
      "interest rate calculator",
      "financial planning tool",
      "compound annual growth calculator",
      "monthly compound interest calculator",
      "daily compounding calculator",
      "interest growth calculator",
      "investment growth projection"
    ],
    openGraph: {
      title: "Compound Interest Calculator Online - Compare Growth Scenarios",
      description: "Calculate future value with annual, quarterly, monthly, or daily compounding and review yearly growth breakdowns.",
      type: "website",
      url: "/tools/compound-interest-calculator"
    },
    howToSteps: [
      { name: "Enter principal amount", text: "Enter principal amount." },
      { name: "Enter annual interest rate in percent", text: "Enter annual interest rate in percent." },
      { name: "Enter time in years", text: "Enter time in years." },
      { name: "Choose compounding frequency", text: "Choose compounding frequency." },
      { name: "Review future value and total interest earned instantly", text: "Review future value and total interest earned instantly." },
      { name: "Use chart/table", text: "Use chart/table, copy summary, export CSV, or save history as needed." },
    ],
    faq: [
      { q: "What does this compound interest calculator calculate?", a: "It calculates future value, total interest earned, and an annual growth breakdown using principal, annual rate, time, and compounding frequency." },
      { q: "What formula is used for compound interest?", a: "The calculator uses FV = P * (1 + r/n)^(n*t), where P is principal, r is annual rate (decimal), n is compounding periods per year, and t is years." },
      { q: "What compounding frequencies are supported?", a: "Annual, semi-annual, quarterly, monthly, and daily compounding are supported." },
      { q: "Can I use this for savings and investment planning?", a: "Yes. It is useful for forecasting growth scenarios for savings, recurring investment comparisons, and long-term financial planning assumptions." },
      { q: "Is this calculator free and private?", a: "Yes. It is free to use and runs directly in your browser for standard calculations." },
    ],
  },
  features: [
    "Real-time compound interest calculations",
    "Interactive growth chart visualization",
    "Multiple compounding frequencies (Annual, Semi-Annual, Quarterly, Monthly, Daily)",
    "Currency formatting and precision control",
    "Copy results to clipboard",
    "Download yearly breakdown as CSV",
    "Calculation history with local storage",
    "Mobile-friendly responsive design",
    "Dark/light theme support"
  ]
};
