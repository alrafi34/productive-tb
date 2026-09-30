import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "hex-to-rgb-converter",
  name: "HEX to RGB Converter",
  description: "Convert HEX color codes to RGB and RGB back to HEX, with the working shown step by step and a chart of common colors.",
  category: "design",
  icon: "🎨",
  free: true,
  backend: false,
  seo: {
    title: "HEX to RGB Converter – and RGB to HEX, With Steps",
    description: "Convert HEX to RGB (#FF5733 = rgb(255, 87, 51)) or paste RGB to get HEX. Shows the base-16 math per channel, 0–1 values and a common colors chart.",
    keywords: [
      "hex to rgb",
      "hex to rgb converter",
      "rgb to hex",
      "rgb to hex converter",
      "convert hex to rgb",
      "hex color to rgb",
      "hex code to rgb",
      "how to convert hex to rgb",
      "hex to rgb formula",
      "rgb 0-1 values",
    ],
    og: {
      title: "HEX to RGB Converter – and RGB to HEX, With Steps",
      description: "Convert HEX to RGB (#FF5733 = rgb(255, 87, 51)) or paste RGB to get HEX. Shows the base-16 math per channel, 0–1 values and a common colors chart.",
      url: `${siteConfig.url}/tools/design/hex-to-rgb-converter`,
    },
    howToSteps: [
      { name: "Enter a HEX code", text: "Type or paste a 3- or 6-digit HEX code, with or without #, or pick a color with the color picker." },
      { name: "Or enter RGB", text: "To go the other way, type three numbers from 0 to 255 such as 255, 87, 51 or rgb(255 87 51), or drag the red, green and blue sliders." },
      { name: "Check the working", text: "The step-by-step panel shows how each pair of hex digits becomes a number from 0 to 255." },
      { name: "Copy the format you need", text: "Copy HEX, CSS rgb(), the space-separated modern syntax, 0–1 values for Unity or SwiftUI, or HSL." },
    ],
    faq: [
      { q: "How do I convert HEX to RGB?", a: "Split the six digits into three pairs for red, green and blue, and convert each pair from base 16: first digit × 16 + second digit, where A–F mean 10–15. For #FF5733: FF = 15 × 16 + 15 = 255, 57 = 5 × 16 + 7 = 87 and 33 = 3 × 16 + 3 = 51, so rgb(255, 87, 51)." },
      { q: "How do I convert RGB to HEX?", a: "Divide each value by 16. The whole-number result is the first hex digit and the remainder the second. For 87: 87 ÷ 16 = 5 remainder 7, so 57. Put the three pairs after a #: rgb(255, 87, 51) is #FF5733." },
      { q: "What does a 3-digit HEX code like #F53 mean?", a: "It is shorthand in which every digit is doubled, so #F53 is #FF5533 and #FFF is #FFFFFF (white). Only colors whose pairs repeat a digit can be written this way." },
      { q: "What about 8-digit HEX codes like #FF573380?", a: "The last two digits are transparency (alpha), which plain RGB cannot store. This converter uses the first six digits; use the HEX to RGBA converter to keep the transparency as rgba()." },
      { q: "How do I get RGB values between 0 and 1?", a: "Divide each value by 255. rgb(255, 87, 51) becomes 1, 0.341, 0.2. Unity, SwiftUI, OpenGL, Blender and most shader code use this 0–1 form, and the converter shows it ready to copy." },
      { q: "Is HEX or RGB better for CSS?", a: "They describe exactly the same colors, and browsers treat them identically. HEX is shorter and common in design handoffs; rgb() is easier to read and to adjust one channel at a time." },
    ],
  },
};
