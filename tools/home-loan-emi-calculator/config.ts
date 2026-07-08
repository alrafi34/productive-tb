import { siteConfig } from "@/config/site";

export const homeLoanEmiCalculatorConfig = {
  name: "Home Loan EMI Calculator",
  slug: "home-loan-emi-calculator",
  description: "Calculate your home loan EMI instantly. Estimate monthly payments, total interest, amortization schedule, and compare loan scenarios.",
  category: "land",
  icon: "🏠",
  free: true,
  backend: false,
  seo: {
    title: "Home Loan EMI Calculator — Free Mortgage Calculator Online | Productive Toolbox",
    description: "Calculate home loan EMI instantly. Get monthly payment, total interest, full amortization schedule, and compare two loan scenarios. Free, no signup, browser-based.",
    keywords: [
      "home loan EMI calculator",
      "home loan calculator",
      "mortgage EMI calculator",
      "mortgage calculator",
      "EMI calculator",
      "housing loan EMI calculator",
      "property loan calculator",
      "monthly mortgage payment calculator",
      "home loan interest calculator",
      "loan amortization calculator",
      "amortization schedule calculator",
      "home loan repayment calculator",
      "mortgage repayment calculator",
      "calculate EMI online",
      "home loan EMI formula",
      "how to calculate home loan EMI",
      "mortgage payment calculator online free",
      "home loan tenure calculator",
      "home loan down payment calculator",
      "loan comparison calculator",
      "EMI calculator with amortization",
      "free home loan calculator",
      "housing loan calculator online",
      "mortgage interest calculator",
      "property loan EMI calculator",
    ],
    openGraph: {
      title: "Home Loan EMI Calculator — Free Mortgage EMI Calculator Online",
      description: "Calculate home loan EMI, total interest, and full amortization schedule. Compare two loan scenarios. Free and 100% browser-based.",
      type: "website",
      url: `${siteConfig.url}/tools/land/home-loan-emi-calculator`,
    },
    og: {
      title: "Home Loan EMI Calculator — Free Mortgage EMI Calculator Online",
      description: "Calculate home loan EMI, total interest, and full amortization schedule. Compare two loan scenarios. Free and 100% browser-based.",
      url: `${siteConfig.url}/tools/land/home-loan-emi-calculator`,
    },
    howToSteps: [
      {
        name: "Enter the loan amount",
        text: "Type the total home loan amount you need to borrow, or use the slider. Enter the property price minus your down payment, or enter the gross amount and let the down payment field reduce it.",
      },
      {
        name: "Set the annual interest rate",
        text: "Enter the annual interest rate offered by your lender. Banks quote rates as an annual percentage. The calculator converts this to a monthly rate internally for the EMI formula.",
      },
      {
        name: "Choose the loan tenure",
        text: "Set the repayment period in years or months. Most home loans range from 5 to 30 years. Shorter tenures mean higher EMIs but far less total interest paid over the life of the loan.",
      },
      {
        name: "Add a down payment if applicable",
        text: "Enter the down payment amount to reduce the principal. The calculator subtracts the down payment from the loan amount and recalculates the EMI on the net principal.",
      },
      {
        name: "Read the EMI and cost breakdown",
        text: "Your monthly EMI, total interest, total repayment, and estimated payoff date appear instantly. Review the pie chart and loan balance chart for a visual summary.",
      },
      {
        name: "Explore the amortization schedule",
        text: "Scroll to the amortization table to see every payment broken down by principal and interest in monthly or yearly view. Export the full schedule as a CSV file.",
      },
      {
        name: "Compare loan scenarios",
        text: "Open the Scenario Comparison panel and enter a second loan rate and tenure. The table shows both options side by side — monthly EMI, total interest, and total payment.",
      },
    ],
    faq: [
      {
        q: "What is a home loan EMI and how is it calculated?",
        a: "EMI stands for Equated Monthly Installment — the fixed amount paid every month to repay a home loan. The formula is EMI = P times r(1+r) to the power of n divided by ((1+r) to the power of n minus 1), where P is the principal, r is the monthly interest rate (annual rate divided by 12 divided by 100), and n is the total number of months. This calculator applies that formula instantly as you adjust inputs.",
      },
      {
        q: "Why does a longer loan tenure reduce my EMI but increase total interest?",
        a: "Spreading the principal over more months reduces each individual payment. However, you are also paying interest for a longer period. A $500,000 loan at 7.5% costs $198,160 in total interest over 10 years but $758,920 over 30 years — nearly four times more, despite the lower monthly payment.",
      },
      {
        q: "How does a down payment affect my EMI?",
        a: "A down payment reduces the loan principal directly. Every dollar of down payment is a dollar less that you borrow and pay interest on. For a $600,000 home, a $100,000 down payment reduces the principal to $500,000, lowering both the monthly EMI and the total interest paid over the loan term.",
      },
      {
        q: "What is an amortization schedule and why does it matter?",
        a: "An amortization schedule is a complete table of every payment over the life of the loan, showing how much of each EMI goes toward interest and how much reduces the principal. In the early years, the majority of each payment is interest. Understanding your schedule helps you evaluate whether making extra payments or refinancing would save significant money.",
      },
      {
        q: "What is the difference between fixed-rate and variable-rate home loans?",
        a: "A fixed-rate loan keeps the same interest rate for the entire tenure, so your EMI never changes. A variable-rate loan has an interest rate that changes periodically. This calculator computes the EMI for a fixed rate, but you can manually enter a new rate at any time to see how a rate change would affect your payment.",
      },
      {
        q: "How do I compare two loan offers using this calculator?",
        a: "Use the Scenario Comparison panel. Enter your primary loan details in the main calculator, then open Scenario and enter the alternative loan's rate and tenure. The side-by-side table shows monthly EMI, total interest, and total payment for both options.",
      },
      {
        q: "Should I choose the shortest tenure I can afford?",
        a: "Shorter tenures reduce total interest dramatically but require higher monthly payments. Calculate the EMI for your target tenure, then check whether it leaves enough monthly buffer for savings, emergencies, and other obligations. If a 15-year tenure is affordable without stress, it saves substantially more than a 30-year loan.",
      },
      {
        q: "Can I use this calculator for mortgages outside India?",
        a: "Yes. The EMI formula is the standard amortization formula used by banks worldwide. The calculator supports USD, EUR, GBP, INR, and BDT. For country-specific considerations like government subsidies, stamp duty, or tax deductions, consult a local financial adviser.",
      },
      {
        q: "What happens to my EMI if interest rates rise after I take the loan?",
        a: "On a fixed-rate loan, nothing changes. On a variable-rate loan, your bank will typically either increase your EMI or extend your tenure. You can model both scenarios in this calculator: enter the new rate to see the revised EMI, or extend the tenure to find the term needed to keep the payment the same.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. The loan amount, interest rate, and other figures you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you. The CSV export is generated locally on your device without any server-side processing.",
      },
    ],
  },
  features: [
    "Monthly EMI — recalculates instantly as you adjust inputs",
    "Total interest payable over the full loan term",
    "Total repayment amount (principal + interest)",
    "Estimated payoff date",
    "Principal vs interest pie chart",
    "Loan balance over time chart",
    "Full amortization schedule — monthly and yearly view",
    "Scenario comparison — two loan options side by side",
    "Down payment support to reduce principal",
    "CSV export of the complete repayment schedule",
    "Supports USD, EUR, GBP, INR, BDT",
    "100% browser-based — no data sent to any server",
  ],
  relatedTools: [
    "loan-emi-calculator",
    "mortgage-calculator",
    "compound-interest-calculator",
    "down-payment-calculator",
    "investment-return-calculator",
    "rental-yield-calculator",
  ],
};
