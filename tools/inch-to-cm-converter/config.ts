import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "inch-to-cm-converter",
  name: "Inch to Centimeter Converter",
  description: "Convert inches to centimeters and back, including fractions like 5 3/8 and heights like 5' 10\", with charts for common lengths, screens and paper.",
  category: "calculator",
  icon: "📏",
  free: true,
  backend: false,
  seo: {
    title: "Inches to cm Converter – Fractions, Height & Chart",
    description: "Convert inches to centimeters (1 in = 2.54 cm) and back. Type fractions like 5 3/8 or heights like 5' 10\", and see charts for screens, paper and heights.",
    keywords: [
      "inches to cm",
      "inch to cm converter",
      "cm to inches",
      "inches to centimeters",
      "5 foot 10 in cm",
      "inches to cm chart",
      "fraction inches to cm",
      "tv size in cm",
      "height in cm",
      "convert inches to centimeters",
    ],
    og: {
      title: "Inches to cm Converter – Fractions, Height & Chart",
      description: "Convert inches to centimeters (1 in = 2.54 cm) and back. Type fractions like 5 3/8 or heights like 5' 10\", and see charts for screens, paper and heights.",
      url: `${siteConfig.url}/tools/calculator/inch-to-cm-converter`,
    },
    howToSteps: [
      { name: "Enter inches", text: "Type a length in inches: a decimal (5.375), a fraction as on a tape measure (5 3/8) or a height in feet and inches (5' 10\" or 5 ft 10 in)." },
      { name: "Read the centimeters", text: "The result appears as you type, multiplied by exactly 2.54, with feet and inches shown for lengths of a foot or more." },
      { name: "Convert the other way", text: "Click the swap button to turn centimeters into inches; the result is also shown to the nearest 1/16 inch and in feet and inches." },
      { name: "Copy or save", text: "Copy the conversion as text or save it to the history on this device." },
    ],
    faq: [
      { q: "How many centimeters are in an inch?", a: "Exactly 2.54. The international inch was defined in 1959 as 25.4 millimeters, so the conversion is exact rather than rounded. To convert inches to centimeters, multiply by 2.54; to convert centimeters to inches, divide by 2.54." },
      { q: "How do I convert a height like 5 feet 10 inches to cm?", a: "Turn it into inches first (5 × 12 + 10 = 70 inches), then multiply by 2.54: 70 × 2.54 = 177.8 cm. You can type 5' 10\" or 5 ft 10 in directly into the converter." },
      { q: "How do I convert fractions of an inch to cm?", a: "Convert the fraction to a decimal and multiply by 2.54: 5 3/8 inches is 5.375 × 2.54 = 13.6525 cm. Type 5 3/8 into the converter and it does both steps." },
      { q: "How many inches is 10 cm?", a: "10 ÷ 2.54 = 3.937 inches, which is just under 3 15/16 inches on a tape measure. The converter shows cm results both as decimals and to the nearest 1/16 inch." },
      { q: "How big is a 55-inch TV in cm?", a: "TV and monitor sizes are measured diagonally, so a 55-inch TV is 139.7 cm across the diagonal. A 65-inch screen is 165.1 cm and a 24-inch monitor is 60.96 cm." },
      { q: "Is an inch the same everywhere?", a: "Yes. The US, UK, Canada, Australia and every other country use the same international inch of 2.54 cm. Only the old US survey foot and inch differed, by about two parts per million, and they were retired from 1 January 2023." },
    ],
  },
};
