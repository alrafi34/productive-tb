import { siteConfig } from "@/config/site";

export const feetToMeterConverterConfig = {
  name: "Feet to Meters Converter",
  slug: "feet-to-meter-converter",
  category: "calculator",
  description: "Convert feet to meters and meters to feet, including height in feet and inches, with the formula and a conversion chart.",
  icon: "📏",
  free: true,
  keywords: ["feet to meters", "ft to m", "feet to meter converter", "meters to feet", "m to ft", "convert feet to meters", "height in feet to meters", "feet and inches to meters", "feet to cm"],
  seo: {
    title: "Feet to Meters Converter (ft to m) – With Height",
    description: "Convert feet to meters and meters to feet instantly, including height in feet and inches to meters and cm. 1 ft = 0.3048 m, with steps and a chart.",
    keywords: "feet to meters, ft to m, feet to meter converter, meters to feet, m to ft, convert feet to meters, height in feet to meters, feet and inches to meters, feet to cm",
    openGraph: {
      title: "Feet to Meters Converter (ft to m) – With Height",
      description: "Convert feet to meters and meters to feet instantly, including height in feet and inches to meters and cm. 1 ft = 0.3048 m, with steps and a chart.",
      type: "website",
      url: `${siteConfig.url}/tools/calculator/feet-to-meter-converter`,
    },
    howToSteps: [
      { name: "Type feet or meters", text: "Enter a value in either box; the other box converts as you type." },
      { name: "Or enter a height", text: "Use the feet and inches boxes to convert a height such as 5 ft 7 in to meters and centimeters." },
      { name: "Check the steps", text: "The working shows the multiplication by 0.3048 with your number." },
      { name: "Copy the result", text: "Copy the conversion to paste it into a form, plan or message." },
    ],
    faq: [
      { q: "How do I convert feet to meters?", a: "Multiply feet by 0.3048. For example, 10 ft × 0.3048 = 3.048 m." },
      { q: "How do I convert meters to feet?", a: "Divide meters by 0.3048, or multiply by about 3.28084. For example, 2 m ÷ 0.3048 = 6.5617 ft." },
      { q: "How do I convert my height from feet and inches to meters?", a: "Turn it into inches first (feet × 12 + inches), then multiply by 0.0254. 5 ft 7 in is 67 in, and 67 × 0.0254 = 1.702 m, or 170.18 cm." },
      { q: "Why is 1 foot exactly 0.3048 meters?", a: "Since the 1959 international yard and pound agreement, the foot has been defined as exactly 0.3048 m, so the conversion is exact, not rounded." },
      { q: "How many feet are in a mile?", a: "5,280 feet, which is 1,609.344 meters." },
    ],
  },
};
