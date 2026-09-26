import { siteConfig } from "@/config/site";

export const literToMlConverterConfig = {
  name: "Liters to Milliliters Converter",
  slug: "liter-to-ml-converter",
  category: "calculator",
  description: "Convert liters to milliliters and milliliters to liters, with US and UK fluid ounces and US cups, the formula and a chart.",
  icon: "🥤",
  free: true,
  keywords: ["liters to ml", "l to ml", "ml to liters", "ml to l", "liters to milliliters", "litre to ml", "liters to cups", "liters to fl oz"],
  seo: {
    title: "Liters to mL Converter (L to mL) – With Cups & fl oz",
    description: "Convert liters to milliliters and mL to liters instantly: 1 L = 1,000 mL. Also shows US and UK fluid ounces and US cups, with a quick conversion chart.",
    keywords: "liters to ml, l to ml, ml to liters, ml to l, liters to milliliters, litre to ml, liters to cups, liters to fl oz",
    openGraph: {
      title: "Liters to mL Converter (L to mL) – With Cups & fl oz",
      description: "Convert liters to milliliters and mL to liters instantly: 1 L = 1,000 mL. Also shows US and UK fluid ounces and US cups, with a quick conversion chart.",
      type: "website",
      url: `${siteConfig.url}/tools/calculator/liter-to-ml-converter`,
    },
    howToSteps: [
      { name: "Type liters or milliliters", text: "Enter a volume in either box; the other converts as you type." },
      { name: "See cups and fluid ounces", text: "Below the result the same volume is shown in US cups, US fluid ounces and UK fluid ounces." },
      { name: "Check the steps", text: "The working shows the multiplication by 1,000." },
      { name: "Copy the result", text: "Copy the conversion for a recipe, a medicine dose or a drink size." },
    ],
    faq: [
      { q: "How do I convert liters to mL?", a: "Multiply liters by 1,000. For example, 1.5 L × 1,000 = 1,500 mL." },
      { q: "How do I convert mL to liters?", a: "Divide milliliters by 1,000. For example, 330 mL ÷ 1,000 = 0.33 L." },
      { q: "How many cups are in a liter?", a: "About 4.23 US cups (a US cup is 236.59 mL). A metric cup, used in Australia and elsewhere, is exactly 250 mL, so 1 L is 4 metric cups." },
      { q: "How many fluid ounces are in a liter?", a: "33.81 US fluid ounces or 35.2 UK (imperial) fluid ounces; the two fluid ounces differ in size." },
      { q: "Is a milliliter the same as a cubic centimeter?", a: "Yes. 1 mL = 1 cm³ (cc), so 1 L = 1,000 cm³." },
    ],
  },
};
