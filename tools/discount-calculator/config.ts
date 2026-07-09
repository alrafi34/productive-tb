export const toolConfig = {
  slug: "discount-calculator",
  name: "Discount Calculator",
  description: "Calculate sale price, stacked discounts, tax, and reverse original price. Free online percent off calculator with batch mode and CSV export.",
  category: "calculator",
  icon: "🏷️",
  free: true,
  backend: false,
  seo: {
    title: "Discount Calculator — Free Percent Off Calculator Online | Productive Toolbox",
    description: "Calculate sale price with percent off or fixed discounts. Stacked coupons, tax, reverse pricing, batch CSV export. Free, no signup.",
    keywords: [
      // Primary
      "discount calculator",
      "percent off calculator",
      "sale price calculator",
      // Stacked / multi
      "stacked discount calculator",
      "multiple discount calculator",
      "coupon stack calculator",
      // With tax
      "discount calculator with tax",
      "sale price with tax calculator",
      // Reverse
      "reverse discount calculator",
      "original price calculator",
      "find original price before discount",
      // Variants
      "percentage discount calculator",
      "price discount calculator",
      "shopping discount calculator",
      "savings calculator",
      "how much is 20 percent off",
      "how much is 30 percent off",
      "calculate percent off",
      "calculate sale price",
      "discount price calculator",
      "online discount calculator",
      "free discount calculator",
      "coupon discount calculator",
      "retail price calculator",
      "batch discount calculator",
    ],
    openGraph: {
      title: "Discount Calculator — Free Percent Off Calculator Online",
      description: "Calculate sale price with percent off or fixed discounts. Stacked coupons, tax, reverse pricing, batch CSV export. Free, no signup.",
      type: "website",
      url: "/tools/calculator/discount-calculator",
    },
    howToSteps: [
      {
        name: "Enter the Original Price",
        text: "Type the pre-discount price of the item. Results update instantly as you type. This is the starting price before any coupons, promotions, or reductions.",
      },
      {
        name: "Add a Discount Step",
        text: "Enter a percentage or fixed-amount discount. Click Add Step to stack a second discount — each step applies to the running subtotal from the previous step, matching real checkout logic.",
      },
      {
        name: "Add Tax if Needed",
        text: "Enter your local tax rate to include tax in the final total. Tax is applied after all discounts to produce a realistic checkout amount.",
      },
      {
        name: "Review the Step-by-Step Breakdown",
        text: "The results panel shows each price change in sequence — original price, after each discount, and after tax. This makes it easy to see exactly where each dollar was saved.",
      },
      {
        name: "Use Reverse Mode",
        text: "Switch to reverse mode, enter a sale price and discount percentage, and the calculator returns the original pre-discount price. Useful for retail analysis and margin verification.",
      },
      {
        name: "Batch Mode and Export",
        text: "Paste a list of prices one per line, configure your discount, and export the full results as CSV for spreadsheets, inventory pricing, or client handoff.",
      },
    ],
    faq: [
      {
        q: "What is a discount calculator?",
        a: "A discount calculator computes the final sale price after one or more discounts are applied to an original price. Enter the original price and a percentage or fixed-amount discount, and the calculator instantly returns the discounted price, the amount saved, and the savings percentage. This tool extends the basic formula to support stacked discounts, optional tax, reverse pricing, and batch processing.",
      },
      {
        q: "How is percent off calculated?",
        a: "Sale Price = Original Price times (1 minus Discount divided by 100). For example, 25 percent off a $120 item: $120 times 0.75 = $90. Amount saved: $120 minus $90 = $30. Enter any original price and discount percentage and the sale price updates instantly.",
      },
      {
        q: "How do stacked discounts work?",
        a: "Stacked discounts are applied sequentially, each to the running subtotal — not to the original price. A 30 percent discount followed by a 10 percent discount on a $100 item gives: $100 times 0.70 = $70, then $70 times 0.90 = $63. The combined effect is 37 percent off, not 40 percent. This tool shows each step so you can see exactly how the price changes at every stage.",
      },
      {
        q: "How is the original price calculated from a sale price?",
        a: "The reverse discount formula is: Original Price = Sale Price divided by (1 minus Discount divided by 100). For example, if a sale price is $70 after a 30 percent discount: $70 divided by 0.70 = $100 original price. Use reverse mode when you know the final price and the discount percentage but need to recover the original price.",
      },
      {
        q: "How is tax applied after a discount?",
        a: "Tax is applied to the discounted subtotal, not the original price. Formula: Final Total = Discounted Price times (1 + Tax Rate divided by 100). For a $90 discounted item with 8 percent tax: $90 times 1.08 = $97.20. This matches how most tax jurisdictions work — sales tax is calculated on the actual amount paid after discounts.",
      },
      {
        q: "What is the difference between a percentage discount and a fixed discount?",
        a: "A percentage discount reduces the price by a proportion of the current amount — 20 percent off $80 saves $16. A fixed discount reduces the price by a set dollar amount regardless of the original price — $15 off an $80 item saves $15. This tool supports both types and lets you mix them in a single stacked calculation.",
      },
      {
        q: "How do I calculate the original price before a discount?",
        a: "Use reverse mode and enter the sale price along with the discount percentage. The formula is: Original Price = Sale Price divided by (1 minus Discount divided by 100). If an item is $51 after a 15 percent discount: $51 divided by 0.85 = $60 original price.",
      },
      {
        q: "Can I calculate discounts for multiple items at once?",
        a: "Yes. Use batch mode to paste a list of original prices one per line and the tool applies the same discount configuration to every item simultaneously. The full batch results can be exported as CSV for spreadsheets, inventory pricing tools, or client reports.",
      },
      {
        q: "What is a good discount percentage?",
        a: "From a retail perspective, discounts of 10 to 20 percent are standard promotional discounts. Discounts of 25 to 40 percent signal clearance or seasonal events. Discounts over 50 percent typically indicate end-of-line or loss-leader pricing. From a buyer's perspective, always compare the discounted price against other retailers, not just the stated original price.",
      },
      {
        q: "Is my pricing data private when using this calculator?",
        a: "Yes. All calculations run entirely in your browser using JavaScript. Your prices, discount values, and tax rates are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
  relatedTools: [
    "profit-margin-calculator",
    "percentage-calculator",
    "gst-vat-calculator",
    "tip-calculator",
    "break-even-calculator",
    "markup-calculator",
  ],
};
