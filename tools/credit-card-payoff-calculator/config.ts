import { siteConfig } from "@/config/site";

export const creditCardPayoffCalculatorConfig = {
  name: "Credit Card Payoff Calculator",
  description: "See how long it takes to pay off a credit card, how much interest you will pay, and the payment needed to be debt-free by a set date.",
  icon: "💳",
  category: "calculator",
  slug: "credit-card-payoff-calculator",
  seo: {
    title: "Credit Card Payoff Calculator – Months & Interest to Pay",
    description: "Find how many months it takes to pay off a credit card and the total interest, or the payment to be debt-free by a date. Compare with paying the minimum.",
    keywords: [
      "credit card payoff calculator",
      "credit card calculator",
      "pay off credit card calculator",
      "credit card interest calculator",
      "how long to pay off credit card",
      "credit card minimum payment calculator",
      "debt payoff calculator",
      "credit card repayment calculator",
      "months to pay off credit card",
      "credit card debt calculator",
    ],
    og: {
      title: "Credit Card Payoff Calculator – Months & Interest to Pay",
      description: "Find how many months it takes to pay off a credit card and the total interest, or the payment to be debt-free by a date. Compare with paying the minimum.",
      url: `${siteConfig.url}/tools/calculator/credit-card-payoff-calculator`,
    },
    howToSteps: [
      { name: "Choose your goal", text: "Pick I can pay a fixed amount to see how long payoff takes, or I want to be debt-free by to find the monthly payment for a target number of months." },
      { name: "Enter the balance and APR", text: "Type the current balance and the purchase APR from your statement, in your currency." },
      { name: "Enter your payment or deadline", text: "Type the fixed monthly payment you can afford, or the number of months you want to be debt-free in." },
      { name: "Read the plan", text: "See the months to payoff, the monthly payment, the total interest and the total you will pay." },
      { name: "Compare with the minimum", text: "See how long paying only the card's minimum would take and how much more interest it would cost; set the card's minimum payment floor to match your statement." },
    ],
    faq: [
      { q: "How is credit card payoff time calculated?", a: "Each month, interest of APR ÷ 12 is added to the balance and your payment is subtracted, until the balance reaches zero. A $5,000 balance at 22.9% APR paid at $200 a month takes 35 months and costs about $1,860 in interest." },
      { q: "Why does paying only the minimum take so long?", a: "Minimum payments are usually the month's interest plus about 1% of the balance, so most of each payment goes to interest and the minimum shrinks as the balance falls. On the $5,000 example at 22.9%, paying only the minimum (interest + 1%, at least $25) takes about 19 years and costs about $8,450 in interest, more than four times as much as a fixed $200 a month." },
      { q: "What happens if my payment is less than the interest?", a: "The balance never goes down. At 22.9% APR, a $5,000 balance builds about $95 of interest in the first month, so any payment below that leaves you owing the same or more. The calculator tells you when this happens." },
      { q: "How do I pay off a credit card faster?", a: "Pay a fixed amount every month rather than the falling minimum, add any extra money to the card with the highest APR first (the avalanche method), stop adding new purchases, and consider a 0% balance transfer card if the transfer fee (often 3–5%) is less than the interest you would pay." },
      { q: "Is APR the same as the monthly interest rate?", a: "No. The monthly periodic rate is the APR divided by 12, so 24% APR is 2% a month. Most US cards actually charge a daily rate of APR ÷ 365 on the average daily balance, which gives almost the same result as this monthly calculation." },
      { q: "Does this work for cards outside the US?", a: "Yes. Choose your currency and enter your card's annual rate. UK cards quote a representative APR and set the minimum by their own rule, often 1% plus interest or a flat percentage, so adjust the minimum floor to match your statement." },
    ],
  },
};
