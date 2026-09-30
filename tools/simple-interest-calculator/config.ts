export const toolConfig = {
  slug: "simple-interest-calculator",
  name: "Simple Interest Calculator",
  description: "Calculate simple interest and total amount based on principal, rate, and time instantly.",
  category: "calculator",
  icon: "💰",
  free: true,
  backend: false,
  seo: {
    title: "Simple Interest Calculator – Interest, Total & Formula",
    description: "Calculate simple interest and the total amount from principal, rate and time in years, months or days, with the I = P × r × t formula shown step by step.",
    keywords: [
      "simple interest calculator",
      "simple interest formula",
      "calculate interest",
      "interest rate calculator",
      "principal interest calculator",
      "loan interest calculator",
      "savings interest calculator",
      "simple interest amount calculator",
      "interest calculator with time",
      "simple interest in months and days",
      "online simple interest calculator"
    ],
    openGraph: {
      title: "Simple Interest Calculator Online - Fast and Accurate Calculations",
      description: "Calculate simple interest and total payable amount instantly with support for years, months, and days.",
      type: "website",
      url: "/tools/simple-interest-calculator"
    },
    howToSteps: [
      { name: "Enter the principal amount", text: "Enter the principal amount." },
      { name: "Enter annual interest rate in percent", text: "Enter annual interest rate in percent." },
      { name: "Enter the time period value", text: "Enter the time period value." },
      { name: "Choose the time unit", text: "Choose the time unit: years, months, or days." },
      { name: "Read the calculated interest and total amount instantly", text: "Read the calculated interest and total amount instantly." },
      { name: "Adjust decimal precision or copy/save the result if needed", text: "Adjust decimal precision or copy/save the result if needed." },
    ],
    faq: [
      { q: "What does a simple interest calculator do?", a: "A simple interest calculator estimates how much interest is earned or owed based on principal amount, annual interest rate, and time period. It also shows the total amount after adding interest to principal." },
      { q: "What is the formula for simple interest?", a: "The core formula is SI = (P * R * T) / 100, where P is principal, R is annual rate in percent, and T is time in years. Total amount is A = P + SI." },
      { q: "Can I calculate interest in months or days?", a: "Yes. This calculator accepts years, months, and days. It converts months to years by dividing by 12 and days to years by dividing by 365 before calculating the final interest." },
      { q: "How is this different from compound interest?", a: "Simple interest is calculated only on the original principal. Compound interest adds interest to principal and then calculates future interest on that growing balance." },
      { q: "Can I use this for loans and savings estimates?", a: "Yes. It is useful for quick planning across personal loans, informal borrowing, and basic savings growth where simple interest applies." },
      { q: "Is this calculator free and private?", a: "Yes. It is free to use and calculations happen in your browser. No sign-up is required for standard use." },
    ],
  },
  features: [
    "Instant interest and total amount calculation",
    "Support for multiple time units (Years, Months, Days)",
    "Real-time updates as you type",
    "Calculation history saved locally",
    "Input validation and smart formatting",
    "Decimal precision control",
    "Copy results to clipboard",
    "Mobile-friendly responsive design"
  ]
};
