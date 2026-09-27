import { siteConfig } from "@/config/site";

export const roiRealEstateCalculatorConfig = {
  name: "ROI Real Estate Calculator",
  slug: "roi-real-estate-calculator",
  description: "Calculate real estate ROI, monthly cash flow, appreciation, and investment returns. Includes mortgage estimator, expense breakdown, and future value projection.",
  category: "land",
  icon: "📈",
  free: true,
  seo: {
    title: "Real Estate ROI Calculator – Rental Property Returns",
    description: "Calculate cash-on-cash ROI, cash flow, gross and net yield, appreciation and total return for a rental property, with your mortgage and expenses.",
    keywords: [
      "real estate roi calculator",
      "rental property roi calculator",
      "property investment calculator",
      "cash flow real estate calculator",
      "rental income roi",
      "real estate investment return",
      "property roi estimator",
    ],
    og: {
      title: "Real Estate ROI Calculator – Rental Property Returns",
      description: "Calculate cash-on-cash ROI, cash flow, gross and net yield, appreciation and total return for a rental property, with your mortgage and expenses.",
      url: `${siteConfig.url}/tools/land/roi-real-estate-calculator`,
    },
    howToSteps: [
      { name: "Enter the purchase", text: "Type the purchase price, down payment, closing costs and any renovation cost." },
      { name: "Enter the mortgage", text: "Type the interest rate and pick the mortgage term." },
      { name: "Enter the income", text: "Type the monthly rent and any other monthly income, and set the vacancy rate." },
      { name: "Enter the expenses", text: "Type monthly property tax, insurance, maintenance, management and HOA or service charges." },
      { name: "Set the horizon", text: "Type the expected annual appreciation and choose how many years you plan to hold." },
      { name: "Read the returns", text: "See monthly cash flow, cash-on-cash ROI, gross and net yield, total ROI, break-even and a year-by-year projection." },
    ],
    faq: [
      { q: "What is a good real estate ROI?", a: "Many investors aim for a cash-on-cash return of about 8–12% on a rental. Lower returns can still work in markets where you expect strong appreciation, but they leave less room for vacancies and repairs." },
      { q: "What is the difference between cash-on-cash and total ROI?", a: "Cash-on-cash ROI is one year's cash flow divided by the cash you put in (down payment, closing costs and renovation). Total ROI adds up the cash flow over the whole holding period plus the rise in the property's value." },
      { q: "Are mortgage payments included?", a: "Yes. Cash flow is income after vacancy, minus expenses and the monthly mortgage payment. That is why a leveraged purchase can show a higher cash-on-cash return than an all-cash one." },
      { q: "How does appreciation affect ROI?", a: "It adds to total return but is not guaranteed. At 3% a year, a $200,000 property gains about $68,783 over 10 years. The calculator compounds the rate you enter." },
      { q: "What is break-even?", a: "The months of positive cash flow needed to earn back the cash you invested. $60,000 invested with $450 a month of cash flow takes about 134 months, a little over 11 years." },
      { q: "What does the calculator leave out?", a: "Income tax, depreciation, selling costs, rent growth and rate changes. Treat the projections as planning estimates." },
    ],
  },
};
