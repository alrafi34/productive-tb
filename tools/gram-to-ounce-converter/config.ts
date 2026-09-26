import { siteConfig } from "@/config/site";

export const gramToOunceConverterConfig = {
  name: "Grams to Ounces Converter",
  slug: "gram-to-ounce-converter",
  category: "calculator",
  description: "Convert grams to ounces and ounces to grams for cooking and baking, with the formula and a conversion chart.",
  icon: "⚖️",
  free: true,
  keywords: ["grams to ounces", "g to oz", "ounces to grams", "oz to g", "convert grams to ounces", "grams to oz cooking", "baking conversion"],
  seo: {
    title: "Grams to Ounces Converter (g to oz) – For Cooking",
    description: "Convert grams to ounces and ounces to grams for recipes and postage. 1 oz = 28.3495 g, with the formula, steps and a quick conversion chart.",
    keywords: "grams to ounces, g to oz, ounces to grams, oz to g, convert grams to ounces, grams to oz cooking, baking conversion",
    openGraph: {
      title: "Grams to Ounces Converter (g to oz) – For Cooking",
      description: "Convert grams to ounces and ounces to grams for recipes and postage. 1 oz = 28.3495 g, with the formula, steps and a quick conversion chart.",
      type: "website",
      url: `${siteConfig.url}/tools/calculator/gram-to-ounce-converter`,
    },
    howToSteps: [
      { name: "Type grams or ounces", text: "Enter a weight in either box; the other converts as you type." },
      { name: "Use a quick value", text: "Tap a common amount such as 100 g, 250 g or 454 g (1 lb)." },
      { name: "Check the steps", text: "The working shows the conversion with your number." },
      { name: "Copy the result", text: "Copy it into your recipe or shopping list." },
    ],
    faq: [
      { q: "How do I convert grams to ounces?", a: "Divide grams by 28.3495, or multiply by 0.035274. For example, 100 g ÷ 28.3495 = 3.527 oz." },
      { q: "How do I convert ounces to grams?", a: "Multiply ounces by 28.3495. For example, 4 oz × 28.3495 = 113.4 g." },
      { q: "How many grams are in a pound?", a: "453.59 g. A pound is 16 ounces, and each ounce is 28.3495 g." },
      { q: "Are dry ounces and fluid ounces the same?", a: "No. Ounces (oz) measure weight; fluid ounces (fl oz) measure volume. A US fluid ounce of water weighs about 29.6 g, so use this tool only for weight." },
      { q: "Why do recipes round 1 oz to 28 or 30 g?", a: "For convenience in the kitchen. The exact value is 28.349523125 g; rounding to 30 g makes an 8 oz recipe about 6% heavier." },
    ],
  },
};
