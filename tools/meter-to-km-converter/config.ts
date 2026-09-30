import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "meter-to-km-converter",
  name: "Meter to Kilometer Converter",
  description: "Convert meters to kilometers and back, with the same distance in miles and feet, and charts of running and everyday distances.",
  category: "calculator",
  icon: "🛣️",
  free: true,
  backend: false,
  seo: {
    title: "Meters to Kilometers (m to km) – With Miles & Race Chart",
    description: "Convert meters to km (divide by 1,000) and back, with miles and feet shown too. Charts for 5K, 10K, half marathon and marathon distances.",
    keywords: [
      "meters to km",
      "m to km",
      "meter to kilometer converter",
      "km to meters",
      "how many meters in a km",
      "5k in miles",
      "marathon distance km",
      "meters to miles",
      "metric distance converter",
      "convert meters to kilometers",
    ],
    og: {
      title: "Meters to Kilometers (m to km) – With Miles & Race Chart",
      description: "Convert meters to km (divide by 1,000) and back, with miles and feet shown too. Charts for 5K, 10K, half marathon and marathon distances.",
      url: `${siteConfig.url}/tools/calculator/meter-to-km-converter`,
    },
    howToSteps: [
      { name: "Enter meters", text: "Type a distance in meters; the kilometers appear as you type, together with the same distance in miles and feet." },
      { name: "Set the precision", text: "Use the precision slider to choose how many decimal places to show, from whole numbers to six decimals." },
      { name: "Swap to km → m", text: "Click Swap to convert kilometers into meters instead." },
      { name: "Copy or save", text: "Copy the result as text or save it to the history on this device." },
    ],
    faq: [
      { q: "How do I convert meters to kilometers?", a: "Divide by 1,000, because the prefix kilo means a thousand: 2,500 m ÷ 1,000 = 2.5 km. Moving the decimal point three places to the left does the same thing." },
      { q: "How do I convert kilometers to meters?", a: "Multiply by 1,000: 2.5 km × 1,000 = 2,500 m. Click Swap in the converter to work in that direction." },
      { q: "How many miles is a kilometer?", a: "One kilometer is about 0.621 miles, and one mile is exactly 1,609.344 meters (1.609 km). So 5 km is 3.107 miles and 10 km is 6.214 miles." },
      { q: "How far is a 5K, 10K, half marathon and marathon?", a: "A 5K is 5,000 m (3.1 miles) and a 10K is 10,000 m (6.2 miles). A half marathon is 21,097.5 m (21.1 km or 13.1 miles), and a marathon is 42,195 m (42.195 km or 26.2 miles)." },
      { q: "How long does it take to walk a kilometer?", a: "About 12 minutes at an average walking pace of 5 km/h (3.1 mph), and roughly 1,300 to 1,500 steps depending on stride length. Running a kilometer takes most recreational runners 5 to 7 minutes." },
      { q: "How many feet are in a meter?", a: "One meter is 3.2808 feet, since a foot is defined as exactly 0.3048 m. That makes a kilometer 3,280.8 feet." },
    ],
  },
};
