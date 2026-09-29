import { siteConfig } from "@/config/site";

export const salesTaxCalculatorConfig = {
  name: "Sales Tax Calculator",
  description: "Add sales tax to a price, take it out of a total, or work out the rate, with every US state's base rate built in.",
  icon: "🧾",
  category: "calculator",
  slug: "sales-tax-calculator",
  seo: {
    title: "Sales Tax Calculator – Add or Remove Tax, All US States",
    description: "Add sales tax to a price, remove it from a receipt total or find the rate charged. US state base rates built in, plus your local rate. $, €, £ and more.",
    keywords: [
      "sales tax calculator",
      "reverse sales tax calculator",
      "calculate sales tax",
      "price before tax calculator",
      "sales tax rate calculator",
      "state sales tax calculator",
      "how much is tax on",
      "remove tax from total",
      "add tax to price",
      "tax included price calculator",
    ],
    og: {
      title: "Sales Tax Calculator – Add or Remove Tax, All US States",
      description: "Add sales tax to a price, remove it from a receipt total or find the rate charged. US state base rates built in, plus your local rate. $, €, £ and more.",
      url: `${siteConfig.url}/tools/calculator/sales-tax-calculator`,
    },
    howToSteps: [
      { name: "Choose what to calculate", text: "Add tax to a price, remove tax from a total that already includes it, or find the tax rate from a price and the total you paid." },
      { name: "Enter the amount", text: "Type the price before tax, the total including tax, or both, and pick your currency." },
      { name: "Set the tax rate", text: "Choose a US state to fill in its base rate and add your county or city rate as the local rate, or type any rate yourself." },
      { name: "Read the result", text: "See the price before tax, the tax amount, the total and the combined rate, updated as you type." },
    ],
    faq: [
      { q: "How do I calculate sales tax?", a: "Multiply the price by the rate and divide by 100. For a $100 item at 8.25%, the tax is $100 × 8.25 ÷ 100 = $8.25, so you pay $108.25. The same works for any currency." },
      { q: "How do I find the price before tax from a total?", a: "Divide the total by 1 plus the rate as a decimal. A receipt total of $108.25 at 8.25% tax means $108.25 ÷ 1.0825 = $100 before tax, and $8.25 of tax. Do not just subtract 8.25% of the total; that gives $99.32, which is wrong." },
      { q: "How do I work out what tax rate I was charged?", a: "Subtract the price from the total, divide by the price and multiply by 100. Paying $54.13 for a $50 item means ($54.13 − $50) ÷ $50 × 100 = 8.26%." },
      { q: "Why is my local rate higher than the state rate?", a: "In most states, counties, cities and special districts add their own sales tax on top of the state rate, so the rate at the register can be several points higher. Enter that extra as the local rate; your state's revenue department publishes rates by address." },
      { q: "Which states have no sales tax?", a: "Alaska, Delaware, Montana, New Hampshire and Oregon have no statewide sales tax. Some Alaska and Montana towns still charge a local sales tax, and some states tax specific items such as meals or lodging." },
      { q: "Is VAT the same as sales tax?", a: "Both are consumption taxes, but VAT, used in the UK, the EU and most other countries, is usually already included in the shelf price, while US sales tax is added at the register. Use Remove tax to find the price before VAT, for example £120 at 20% VAT is £100 plus £20 VAT." },
      { q: "Are the state rates up to date?", a: "The built-in rates are state base rates from the Tax Foundation as of January 1, 2025. States change rates occasionally and many items, such as groceries or clothing, are taxed at lower rates or exempt, so check your state's revenue department for official figures." },
    ],
  },
};
