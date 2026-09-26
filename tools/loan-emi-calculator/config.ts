export const toolConfig = {
  slug: "loan-calculator",
  name: "Loan Calculator",
  description: "Calculate the monthly payment, total interest and amortization schedule for a car, personal or student loan, compare two loans and see what extra payments save.",
  category: "calculator",
  icon: "💰",
  free: true,
  backend: false,
  seo: {
    title: "Loan Calculator – Monthly Payment, Interest & Schedule",
    description: "Calculate the monthly payment and total interest on a car, personal or student loan. Compare two loan offers, see the full schedule and test extra payments.",
    keywords: [
      "loan calculator",
      "loan payment calculator",
      "monthly payment calculator",
      "loan interest calculator",
      "car loan calculator",
      "auto loan calculator",
      "personal loan calculator",
      "student loan calculator",
      "loan repayment calculator",
      "amortization calculator",
      "loan amortization schedule",
      "loan comparison calculator",
      "extra payment calculator",
      "loan payoff calculator",
      "emi calculator"
    ],
    openGraph: {
      title: "Loan Calculator – Monthly Payment, Interest & Schedule",
      description: "Monthly payment, total interest and a full amortization schedule for any fixed-rate loan, with loan comparison and extra payments.",
      type: "website",
      url: "/tools/calculator/loan-calculator"
    },
    howToSteps: [
      { name: "Enter the loan amount", text: "Type how much you are borrowing, after any down payment or trade-in." },
      { name: "Enter the interest rate", text: "Use the annual interest rate (APR) from your lender's offer." },
      { name: "Set the term", text: "Enter the length of the loan in years or months, for example 5 years or 60 months for a car loan." },
      { name: "Read the payment and interest", text: "The monthly payment, total interest and total cost update as you type." },
      { name: "Compare, schedule or pay extra", text: "Compare two loan offers side by side, open the month-by-month schedule, or add an extra monthly payment to see how much sooner you finish and how much interest you save." },
    ],
    faq: [
      { q: "How is a monthly loan payment calculated?", a: "For a fixed-rate loan, M = P × r(1 + r)^n ÷ ((1 + r)^n − 1), where P is the amount borrowed, r the monthly rate (annual rate ÷ 12) and n the number of payments. A $25,000 loan at 7% for 5 years is $495.03 a month." },
      { q: "How much interest will I pay?", a: "Multiply the payment by the number of payments and subtract the amount borrowed. On $25,000 at 7% over 60 months that is $495.03 × 60 − $25,000 = $4,701.80." },
      { q: "Is a shorter loan term better?", a: "It raises the monthly payment but cuts total interest. The same $25,000 at 7% costs $771.93 a month over 3 years with $2,789.39 of interest, against $495.03 a month and $4,701.80 over 5 years." },
      { q: "How much do extra payments save?", a: "Paying $100 more each month on $25,000 at 7% for 5 years clears the loan 11 months early and saves about $939 in interest, as long as your lender applies extra payments to the principal and has no prepayment penalty." },
      { q: "What is the difference between APR and interest rate?", a: "The interest rate is the cost of borrowing the principal. APR adds most lender fees, so it is the better number for comparing offers. Enter APR here to see the true monthly cost if fees are rolled into the loan." },
      { q: "Can I use it for car, personal and student loans?", a: "Yes, for any fixed-rate loan with equal monthly payments: auto loans, personal loans, student loans and small business loans. For a home loan with property tax, insurance and PMI, use the mortgage calculator." },
      { q: "What is EMI?", a: "EMI (equated monthly installment) is the term used in India and some other countries for the same fixed monthly payment this calculator shows." },
      { q: "Is my data private?", a: "Yes. Every calculation runs in your browser and nothing you enter is sent to a server." },
    ],
  },
  features: [
    "Instantly calculate the monthly loan payment",
    "Generate full monthly amortization schedules safely client-side",
    "Toggle between local and generic currency formats",
    "Compare dual loan scenarios (Loan A vs Loan B)",
    "Simulate the massive impact of making extra monthly payments",
    "Visualize Total Principal vs Total Interest scales"
  ]
};
