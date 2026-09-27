import { siteConfig } from "@/config/site";

export const downPaymentCalculatorConfig = {
  name: "Down Payment Calculator",
  slug: "down-payment-calculator",
  description: "Calculate upfront down payment, remaining financing amount, and estimated monthly payments for property, land, or vehicle purchases.",
  category: "land",
  icon: "💵",
  free: true,
  seo: {
    title: "Down Payment Calculator – Deposit, Loan and Payment",
    description: "Work out a down payment or deposit as a percentage or amount, the loan left to finance, and the monthly payment, in $, €, £ and more.",
    keywords: [
      "down payment calculator",
      "mortgage down payment calculator",
      "house down payment calculator",
      "land down payment calculator",
      "property financing calculator",
      "calculate upfront payment",
      "home down payment estimator",
    ],
    og: {
      title: "Down Payment Calculator – Deposit, Loan and Payment",
      description: "Work out a down payment or deposit as a percentage or amount, the loan left to finance, and the monthly payment, in $, €, £ and more.",
      url: `${siteConfig.url}/tools/land/down-payment-calculator`,
    },
    howToSteps: [
      { name: "Enter the price", text: "Type the purchase price of the home, land or other purchase, and pick your currency." },
      { name: "Choose the mode", text: "Select a percentage of the price or a fixed amount." },
      { name: "Enter the down payment", text: "Type the percentage or amount, or use the slider and quick presets." },
      { name: "Add the loan terms", text: "Optionally type the interest rate and choose the loan term for a monthly payment estimate." },
      { name: "Compare", text: "See the split between down payment and loan, and open the scenario comparison to compare other down payments." },
    ],
    faq: [
      { q: "How is the down payment calculated?", a: "Down payment = price × percentage. 20% of $400,000 is $80,000, leaving a $320,000 loan; at 6.5% over 30 years that is about $2,023 a month in principal and interest." },
      { q: "How much down payment do I need?", a: "It depends on the loan and the country. In the US, conventional loans start at 3–5%, FHA at 3.5%, and VA and USDA loans can be 0%. In the UK, deposits usually start at 5–10%, and in much of Europe lenders expect 10–20% plus purchase costs." },
      { q: "What is PMI?", a: "Private mortgage insurance, which US lenders usually require on a conventional loan with less than 20% down. It adds a monthly cost until you reach enough equity. In other countries, a smaller deposit usually means a higher interest rate instead." },
      { q: "Is a bigger down payment always better?", a: "It lowers the loan, the monthly payment and the total interest, but it ties up cash. Keep an emergency fund and money for closing costs, moving and repairs." },
      { q: "Does the monthly payment include taxes and insurance?", a: "No. It is principal and interest only. Property tax, homeowners insurance, PMI and HOA or service charges come on top." },
    ],
  },
};
