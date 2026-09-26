import { siteConfig } from "@/config/site";

export const kgToPoundConverterConfig = {
  name: "Kilograms to Pounds Converter",
  slug: "kg-to-pound-converter",
  category: "calculator",
  description: "Convert kilograms to pounds and pounds to kilograms, with stones and pounds for UK body weight, the formula and a chart.",
  icon: "⚖️",
  free: true,
  keywords: ["kg to lbs", "kg to pounds", "kilograms to pounds", "lbs to kg", "pounds to kg", "convert kg to lbs", "kg to stone", "weight converter"],
  seo: {
    title: "Kg to Lbs Converter – Kilograms to Pounds & Back",
    description: "Convert kilograms to pounds and pounds to kg instantly. 1 kg = 2.20462 lb, with stones and pounds for body weight, the formula and a conversion chart.",
    keywords: "kg to lbs, kg to pounds, kilograms to pounds, lbs to kg, pounds to kg, convert kg to lbs, kg to stone, weight converter",
    openGraph: {
      title: "Kg to Lbs Converter – Kilograms to Pounds & Back",
      description: "Convert kilograms to pounds and pounds to kg instantly. 1 kg = 2.20462 lb, with stones and pounds for body weight, the formula and a conversion chart.",
      type: "website",
      url: `${siteConfig.url}/tools/calculator/kg-to-pound-converter`,
    },
    howToSteps: [
      { name: "Type kilograms or pounds", text: "Enter a weight in either box; the other converts as you type." },
      { name: "See stones and pounds", text: "Below the result, the weight is also shown in stones and pounds, as used for body weight in the UK." },
      { name: "Check the steps", text: "The working shows the multiplication by 2.20462 with your number." },
      { name: "Copy the result", text: "Copy the conversion for a recipe, a luggage limit or a fitness log." },
    ],
    faq: [
      { q: "How do I convert kg to lbs?", a: "Multiply kilograms by 2.20462. For example, 70 kg × 2.20462 = 154.32 lb." },
      { q: "How do I convert lbs to kg?", a: "Multiply pounds by 0.45359237 (or divide by 2.20462). For example, 150 lb × 0.45359 = 68.04 kg." },
      { q: "Is a pound exactly 0.45359237 kg?", a: "Yes. The international avoirdupois pound has been defined as exactly 0.45359237 kg since 1959." },
      { q: "How many stones is 70 kg?", a: "About 11 stone 0.3 lb. One stone is 14 pounds (6.35 kg); stones are still common for body weight in the UK and Ireland." },
      { q: "What is 23 kg in pounds for a luggage limit?", a: "23 kg is 50.71 lb, which airlines usually round to 50 lb." },
    ],
  },
};
