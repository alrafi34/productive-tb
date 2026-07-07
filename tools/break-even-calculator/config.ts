import { siteConfig } from "@/config/site";

export const breakEvenCalculatorConfig = {
  slug: "break-even-calculator",
  name: "Break Even Calculator",
  description:
    "Calculate your break-even point instantly. Find break-even units, revenue, contribution margin, margin of safety, and target profit sales — free and 100% browser-based.",
  category: "marketing",
  icon: "⚖️",
  free: true,
  seo: {
    title:
      "Free Break Even Calculator Online | Calculate Break-even Point Instantly",
    description:
      "Calculate your business break-even point instantly using our free Break Even Calculator. Determine break-even units, revenue, contribution margin, profit, margin of safety, and target sales. Fast, mobile-friendly, and completely browser-based.",
    keywords: [
      "break even calculator",
      "break-even point calculator",
      "business calculator",
      "contribution margin calculator",
      "fixed cost calculator",
      "break even analysis",
      "online break even calculator",
      "business planning calculator",
      "startup financial calculator",
      "profit calculator",
      "margin of safety calculator",
      "break even revenue calculator",
      "unit break even calculator",
    ],
    openGraph: {
      title: "Free Break Even Calculator – Calculate Break-even Point Instantly",
      description:
        "Find your break-even units, revenue, and contribution margin instantly. Free, browser-based, no signup required.",
      type: "website",
      url: `${siteConfig.url}/tools/marketing/break-even-calculator`,
    },
    howToSteps: [
      { name: "Enter Fixed Costs", text: "Enter all costs that remain constant regardless of output — rent, salaries, insurance, software subscriptions, and equipment depreciation. These are costs incurred whether you sell 0 or 10,000 units." },
      { name: "Enter Variable Cost per Unit", text: "Enter the cost incurred for each unit produced or delivered — raw materials, packaging, per-item shipping, payment processing fees, and sales commissions. These scale directly with output volume." },
      { name: "Enter Selling Price per Unit", text: "Enter the price one customer pays for one unit. The selling price must be higher than the variable cost per unit — otherwise every sale increases losses." },
      { name: "Add Current Units Sold (Optional)", text: "Enter how many units you currently sell per period to unlock the profit/loss calculation and margin of safety, showing whether you are above or below break-even right now." },
      { name: "Set a Target Profit (Optional)", text: "Enter a profit goal to calculate the exact sales volume needed to achieve it. Formula: (Fixed Costs + Target Profit) ÷ Contribution Margin." },
      { name: "Review Results and Export", text: "Break-even units, revenue, contribution margin, CM ratio, margin of safety, and target profit units appear instantly. Export as CSV or TXT, or copy the shareable URL." },
    ],
    faq: [
      { q: "What is the break-even point?", a: "The break-even point is the level of sales at which total revenue exactly equals total costs — producing neither profit nor loss. It sets the minimum performance threshold for a business and is the first number every business owner should know." },
      { q: "What is contribution margin?", a: "Contribution margin is the revenue left after variable costs are subtracted from selling price. It is what each unit sale contributes toward covering fixed costs. Before break-even, every unit's CM pays down fixed costs. After break-even, every unit's CM flows directly to profit." },
      { q: "How is break-even calculated?", a: "Break-Even Units = Fixed Costs ÷ Contribution Margin. Break-Even Revenue = Break-Even Units × Selling Price. Contribution Margin = Selling Price − Variable Cost per Unit." },
      { q: "What is the margin of safety?", a: "Margin of safety measures how much current sales exceed the break-even point, as a percentage. A 30% margin of safety means sales can fall 30% before losses begin. A healthy operating margin of safety for most small businesses is 20–35%." },
      { q: "How do I reduce my break-even point?", a: "Four levers: increase selling price (most powerful), reduce variable costs per unit, reduce fixed costs, or improve product mix toward higher-margin items. Most businesses achieve the fastest improvement by combining a modest price increase with a fixed-cost review." },
      { q: "What is target profit analysis?", a: "Target profit analysis answers: how many units must I sell to achieve a specific profit goal? Formula: (Fixed Costs + Target Profit) ÷ Contribution Margin. This transforms break-even analysis into an active planning tool for setting sales targets." },
      { q: "What is the CM ratio?", a: "The contribution margin ratio is CM as a percentage of selling price. A 60% CM ratio means 60 cents of every dollar goes toward fixed costs and profit. Higher CM ratios mean faster break-even as revenue scales." },
      { q: "Can I use this for a service business?", a: "Yes. For pure service businesses with no per-client material cost, set variable cost to zero. Your selling price is your rate. Fixed costs are your monthly overhead. Break-even is the number of projects needed to cover costs." },
      { q: "What is the difference between fixed and variable costs?", a: "Fixed costs remain constant regardless of output — rent, insurance, salaries, subscriptions. Variable costs change with output — materials, packaging, shipping, commissions. Reducing fixed costs lowers break-even permanently; reducing variable costs raises CM on every unit." },
      { q: "Is my data private when using this calculator?", a: "Yes. All calculations run in your browser. Your fixed costs, variable costs, selling prices, and profit targets are never transmitted to any server or stored in any database." },
    ],
  },
};
