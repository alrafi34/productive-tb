import { siteConfig } from "@/config/site";

export const loanInterestCalculatorPropertyConfig = {
  name: "Loan Interest Calculator (Property)",
  slug: "loan-interest-calculator-property",
  description: "Calculate property and land loan payments, total interest and the amortization schedule, with amortized, simple or compound interest.",
  category: "land",
  icon: "💰",
  free: true,
  seo: {
    title: "Property Loan Calculator – Mortgage Payment & Interest",
    description: "Calculate the payment, total interest and amortization schedule for a mortgage or land loan, with monthly, quarterly or yearly payments.",
    keywords: [
      "loan interest calculator property",
      "property loan calculator",
      "land loan payment calculator",
      "real estate loan calculator",
      "mortgage payment calculator",
      "loan repayment calculator",
      "property loan interest",
      "land loan calculator",
    ],
    og: {
      title: "Property Loan Calculator – Mortgage Payment & Interest",
      description: "Calculate the payment, total interest and amortization schedule for a mortgage or land loan, with monthly, quarterly or yearly payments.",
      url: `${siteConfig.url}/tools/land/loan-interest-calculator-property`,
    },
    howToSteps: [
      { name: "Choose the interest type", text: "Select amortized (a fixed installment, like a standard mortgage), simple or compound interest." },
      { name: "Choose the payment frequency", text: "Select monthly, quarterly or yearly payments." },
      { name: "Enter the amounts", text: "Type the property price or loan amount and, optionally, the down payment, which is subtracted from it." },
      { name: "Enter the rate and term", text: "Type the annual interest rate and the loan term in years or months." },
      { name: "Read the results", text: "See the payment per period, total interest, total paid, payoff date and the full schedule, and export it as CSV." },
    ],
    faq: [
      { q: "How is a mortgage payment calculated?", a: "Payment = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the loan, r the rate per period and n the number of payments. $300,000 at 6.5% over 30 years is $1,896.20 a month, with $382,633 of interest in total." },
      { q: "What is the difference between amortized and simple interest?", a: "An amortized loan has a fixed installment; each payment covers that period's interest and repays some principal, so the interest share falls over time. Simple interest is charged on the original principal for the whole term and spread evenly across the payments." },
      { q: "When is compound interest used?", a: "Mainly for bridging and development loans where interest is rolled up and paid at the end rather than monthly. It costs more than an amortized loan at the same rate and term." },
      { q: "How does payment frequency affect interest?", a: "Paying more often reduces the balance sooner, so monthly payments cost slightly less interest in total than quarterly or yearly ones at the same annual rate." },
      { q: "How do I use the down payment field?", a: "Enter the full price as the loan amount and your down payment separately; the calculator finances the difference. A $400,000 home with $80,000 down is a $320,000 loan." },
      { q: "Does the payment include property tax and insurance?", a: "No. It is principal and interest only. In the US, lenders often add escrow for property tax and homeowners insurance to the monthly bill." },
    ],
  },
};
