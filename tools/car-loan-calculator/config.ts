import { siteConfig } from "@/config/site";

export const carLoanCalculatorConfig = {
  name: "Car Loan Calculator",
  description: "Work out the monthly payment on an auto loan with down payment, trade-in, sales tax and fees, and compare 36- to 84-month terms.",
  icon: "🚗",
  category: "calculator",
  slug: "car-loan-calculator",
  seo: {
    title: "Car Loan Calculator – Monthly Auto Payment with Trade-In",
    description: "Estimate your monthly car payment with down payment, trade-in, sales tax and fees. See total interest, compare 36–84 month terms and view the amortization.",
    keywords: [
      "car loan calculator",
      "auto loan calculator",
      "car payment calculator",
      "monthly car payment",
      "auto loan calculator with trade in",
      "car loan interest calculator",
      "car finance calculator",
      "vehicle loan calculator",
      "car payment with tax and fees",
      "72 month car loan calculator",
    ],
    og: {
      title: "Car Loan Calculator – Monthly Auto Payment with Trade-In",
      description: "Estimate your monthly car payment with down payment, trade-in, sales tax and fees. See total interest, compare 36–84 month terms and view the amortization.",
      url: `${siteConfig.url}/tools/calculator/car-loan-calculator`,
    },
    howToSteps: [
      { name: "Enter the car price and down payment", text: "Type the vehicle's price and the cash you will put down, in your currency." },
      { name: "Add your trade-in", text: "Enter what the dealer will give you for your current car and how much you still owe on it; owing more than it is worth adds negative equity to the loan." },
      { name: "Add sales tax and fees", text: "Enter your sales tax rate and the title, registration and dealer fees, and choose whether to pay them upfront or roll them into the loan." },
      { name: "Set the rate and term", text: "Enter the APR from your lender or dealer and choose a term from 24 to 96 months." },
      { name: "Compare and check the schedule", text: "See the monthly payment, the amount financed, total interest and total cost, compare terms side by side, and open the year-by-year amortization." },
    ],
    faq: [
      { q: "How is a car loan payment calculated?", a: "With the standard amortization formula: payment = L × r ÷ (1 − (1 + r)^−n), where L is the amount financed, r the APR divided by 12 and n the number of months. Financing $32,950 at 6.5% for 60 months gives about $644.70 a month and roughly $5,730 of interest." },
      { q: "How does a trade-in lower my payment?", a: "Its value, minus anything you still owe on it, is subtracted from the price like extra down payment. In most US states it also reduces sales tax, because tax is charged only on the price minus the trade-in; a few states, including California, tax the full price." },
      { q: "What is negative equity?", a: "Owing more on your current car than it is worth. If your trade-in is worth $12,000 and you owe $15,000, the $3,000 difference is added to the new loan, so you pay interest on a car you no longer have." },
      { q: "Is a longer loan term a good idea?", a: "A 72- or 84-month loan lowers the monthly payment but costs more interest and often comes with a higher rate. Because cars lose value quickly, a long loan also makes it more likely you will owe more than the car is worth for years. The comparison table shows the extra interest for each term." },
      { q: "Should I roll taxes and fees into the loan?", a: "Paying them upfront means borrowing less and paying less interest. Rolling them in keeps cash in hand but you pay interest on them for the whole term." },
      { q: "What is a good APR for a car loan?", a: "It depends on your credit score, whether the car is new or used, the term and current interest rates; used-car loans and longer terms usually cost more. Get quotes from your bank or credit union before visiting the dealer and compare them with dealer financing." },
      { q: "Does this work outside the US?", a: "Yes. Choose your currency and set the tax to 0 if VAT is already included in the car's price, as in the UK and Europe. For a PCP or lease with a final balloon payment, the monthly figure here will be higher than the dealer's quote." },
    ],
  },
};
