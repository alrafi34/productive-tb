import { siteConfig } from "@/config/site";

export const rentalYieldCalculatorConfig = {
  name: "Rental Yield Calculator",
  slug: "rental-yield-calculator",
  description: "Calculate gross and net rental yield, monthly cash flow, and ROI for investment properties. Includes vacancy adjustment and expense breakdown.",
  category: "land",
  icon: "📊",
  free: true,
  seo: {
    title: "Rental Yield Calculator – Gross & Net Yield",
    description: "Calculate gross and net rental yield, cash flow and cash-on-cash return for a rental property, after vacancy, expenses and the mortgage.",
    keywords: [
      "rental yield calculator",
      "property yield calculator",
      "rental ROI calculator",
      "real estate investment calculator",
      "gross rental yield",
      "net rental yield",
      "rental property return calculator",
      "investment property calculator",
    ],
    og: {
      title: "Rental Yield Calculator – Gross & Net Yield",
      description: "Calculate gross and net rental yield, cash flow and cash-on-cash return for a rental property, after vacancy, expenses and the mortgage.",
      url: `${siteConfig.url}/tools/land/rental-yield-calculator`,
    },
    howToSteps: [
      { name: "Enter the price and rent", text: "Type the property price and the monthly rent, and pick your currency." },
      { name: "Set the vacancy rate", text: "Use the slider for the share of the year you expect the property to be empty." },
      { name: "Add annual expenses", text: "Open annual expenses and type property tax, insurance, maintenance, management fees and HOA or service charges." },
      { name: "Add the mortgage", text: "Optionally type the down payment, interest rate and term for cash flow and cash-on-cash return." },
      { name: "Read the results", text: "See gross and net yield, yields after vacancy, monthly cash flow, cash-on-cash return and a rating." },
    ],
    faq: [
      { q: "How is rental yield calculated?", a: "Gross yield = annual rent ÷ price × 100. Net yield = (annual rent − annual expenses) ÷ price × 100. A $300,000 property renting for $2,000 a month has an 8% gross yield; with $6,000 a year of expenses the net yield is 6%." },
      { q: "What is a good rental yield?", a: "It varies by market. A net yield around 5–7% is typical for residential property; much higher yields often come with more risk, lower-demand areas or underestimated costs." },
      { q: "How does vacancy affect the result?", a: "A 5% vacancy rate is about 18 empty days a year and cuts rent by 5%: $24,000 a year becomes $22,800. The vacancy-adjusted yields and the cash flow include it." },
      { q: "What is cash-on-cash return?", a: "Annual cash flow after expenses and mortgage payments, divided by the cash you put in. $6,000 a year of cash flow on a $50,000 down payment is 12%." },
      { q: "Are mortgage payments included in yield?", a: "No. Yield is measured before financing so properties can be compared however they are bought. Mortgage payments are included in cash flow and cash-on-cash return." },
      { q: "Which expenses should I include?", a: "Property tax, insurance, maintenance (often budgeted at 1–2% of the value a year), management fees and HOA or service charges. Leave out mortgage payments." },
    ],
  },
};
