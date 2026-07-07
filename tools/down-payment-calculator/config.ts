import { siteConfig } from "@/config/site";

export const downPaymentCalculatorConfig = {
  name: "Down Payment Calculator",
  slug: "down-payment-calculator",
  description: "Calculate upfront down payment, remaining financing amount, and estimated monthly payments for property, land, or vehicle purchases.",
  category: "land",
  icon: "💵",
  free: true,
  seo: {
    title: "Down Payment Calculator – Calculate Upfront Payment Instantly",
    description: "Use our free Down Payment Calculator to instantly calculate upfront payment, remaining financing amount, and loan estimates for property, land, or vehicle purchases.",
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
      title: "Down Payment Calculator – Calculate Upfront Payment Instantly",
      description: "Calculate upfront down payment, remaining financing, and monthly payment estimates for property, land, or vehicle purchases.",
      url: `${siteConfig.url}/tools/land/down-payment-calculator`,
    },
  },
};
