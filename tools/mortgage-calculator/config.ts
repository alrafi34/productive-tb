import { siteConfig } from "@/config/site";

export const mortgageCalculatorConfig = {
  slug: "mortgage-calculator",
  name: "Mortgage Calculator",
  description: "Estimate your monthly mortgage payment with property tax, insurance, PMI and HOA, plus total interest, extra payments and a full amortization schedule.",
  category: "calculator",
  icon: "🏠",
  free: true,
  backend: false,
  seo: {
    title: "Mortgage Calculator – Monthly Payment with Taxes & PMI",
    description: "Estimate your monthly mortgage payment including property tax, insurance, PMI and HOA. See total interest, compare 15 vs 30 years and model extra payments.",
    keywords: [
      "mortgage calculator",
      "mortgage payment calculator",
      "monthly mortgage payment",
      "mortgage calculator with taxes and insurance",
      "mortgage calculator with pmi",
      "piti calculator",
      "home loan calculator",
      "house payment calculator",
      "mortgage amortization schedule",
      "amortization calculator",
      "15 vs 30 year mortgage",
      "extra mortgage payment calculator",
      "mortgage payoff calculator",
      "mortgage interest calculator"
    ],
    openGraph: {
      title: "Mortgage Calculator – Monthly Payment with Taxes & PMI",
      description: "Monthly mortgage payment with property tax, insurance, PMI and HOA, total interest, term comparison and an amortization schedule.",
      type: "website",
      url: `${siteConfig.url}/tools/calculator/mortgage-calculator`
    },
    howToSteps: [
      { name: "Enter the home price and down payment", text: "Type the purchase price and how much you will put down; the loan amount is the difference." },
      { name: "Set the interest rate and term", text: "Enter the annual rate from your lender's quote and the term in years, usually 15 or 30." },
      { name: "Add taxes, insurance, PMI and HOA", text: "Open \"Taxes, insurance & fees\" and enter your property tax rate, yearly insurance premium, PMI rate and any monthly HOA or service charge. They vary by location and lender, so use your own figures." },
      { name: "Try an extra monthly payment", text: "Add an amount to pay on top of each payment to see how many months and how much interest you save." },
      { name: "Compare terms or view the schedule", text: "Switch to Compare Terms for 15, 20 and 30 years side by side, or to Schedule for every monthly payment, which you can export to CSV." },
    ],
    faq: [
      { q: "How is a monthly mortgage payment calculated?", a: "Principal and interest use the amortization formula M = P × r(1 + r)^n ÷ ((1 + r)^n − 1), where P is the loan, r the monthly rate and n the number of payments. A $320,000 loan at 6.5% for 30 years is $2,022.62 a month. Property tax, insurance, PMI and HOA are then added on top." },
      { q: "What does PITI mean?", a: "Principal, Interest, Taxes and Insurance: the four parts of a typical monthly housing payment. With a $400,000 home, 20% down, 6.5% for 30 years, 1.1% property tax and $1,800 a year insurance, PITI is about $2,539 a month." },
      { q: "What is PMI and when does it stop?", a: "Private mortgage insurance is charged on many conventional loans when the down payment is under 20%. It is usually 0.3–1.5% of the loan a year and can be removed once the balance falls to 80% of the home's original value; this calculator stops it at that point." },
      { q: "Is a 15-year or 30-year mortgage better?", a: "A 15-year loan costs more each month but far less interest. On a $320,000 loan at 6.5%, the 15-year payment is $2,787.54 with $181,758 of interest, against $2,022.62 and $408,142 over 30 years (in practice 15-year rates are also a little lower)." },
      { q: "How much do extra payments save?", a: "Paying $200 more each month on a $320,000, 6.5%, 30-year loan clears it in 281 months instead of 360 and saves about $105,000 in interest." },
      { q: "Which property tax rate should I use?", a: "Use your local rate. In the U.S. effective rates range from well under 1% to over 2% of the home's value depending on the state and county; outside the U.S. property taxes are often a fixed annual amount, which you can convert to a percentage of the price." },
      { q: "Does this work outside the United States?", a: "Yes. Choose your currency and enter your own rate, term, tax and insurance figures. Leave PMI at 0 if your country has no mortgage insurance, and use the HOA field for service charges or ground rent." },
      { q: "Is my data stored anywhere?", a: "No. All calculations run in your browser and nothing you type is sent to a server." },
    ],
  },
  features: [
    "Monthly payment with property tax, insurance, PMI and HOA",
    "PMI that stops at 80% loan-to-value",
    "Total interest and total cost of the loan",
    "Compare 15, 20 and 30-year terms",
    "Extra payment savings",
    "Full amortization schedule with CSV export",
    "Multi-currency: USD, EUR, GBP, CAD, AUD, CHF, INR",
    "100% client-side processing"
  ]
};
