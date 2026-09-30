import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "square-root-calculator",
  name: "Square Root Calculator",
  description: "Find the square root of any number, simplify it to radical form (√50 = 5√2) with steps, and check the answer by squaring it.",
  category: "math",
  icon: "√",
  free: true,
  backend: false,
  seo: {
    title: "Square Root Calculator – Simplify Radicals With Steps",
    description: "Find the square root of any number to up to 10 decimals, simplify it to radical form (√50 = 5√2) with steps, and see a perfect squares chart.",
    keywords: [
      "square root calculator",
      "simplify square root",
      "simplest radical form calculator",
      "square root of 50",
      "perfect squares chart",
      "square root of a negative number",
      "cube root calculator",
      "sqrt calculator",
      "how to find square root",
      "batch square root",
    ],
    og: {
      title: "Square Root Calculator – Simplify Radicals With Steps",
      description: "Find the square root of any number to up to 10 decimals, simplify it to radical form (√50 = 5√2) with steps, and see a perfect squares chart.",
      url: `${siteConfig.url}/tools/math/square-root-calculator`,
    },
    howToSteps: [
      { name: "Enter a number", text: "Type any number; the square root appears as you type, together with the cube root." },
      { name: "Read the simplified form", text: "For whole numbers the calculator also gives the simplest radical form, such as √72 = 6√2, and explains the steps." },
      { name: "Choose the precision", text: "Move the slider to show between 0 and 10 decimal places, and keep verification on to see the result squared back." },
      { name: "Work out many roots at once", text: "Switch on batch mode and paste numbers separated by commas or spaces, then export the results as CSV." },
    ],
    faq: [
      { q: "How do I simplify a square root?", a: "Split the number into its largest perfect square factor times what is left, then take the root of the square. For 50: 50 = 25 × 2, so √50 = √25 × √2 = 5√2. For 72: 72 = 36 × 2, so √72 = 6√2." },
      { q: "What are the perfect squares from 1 to 400?", a: "1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361 and 400, the squares of 1 to 20. Their square roots are whole numbers; every other whole number has an irrational square root." },
      { q: "What is the square root of 2?", a: "About 1.41421356. It is irrational, so its decimals never end or repeat. It is also the ratio of an A4 sheet's long side to its short side (297 mm ÷ 210 mm ≈ 1.414)." },
      { q: "What is the square root of a negative number?", a: "It is not a real number, because any real number multiplied by itself is zero or positive. It is written with the imaginary unit i = √−1: √−16 = 4i and √−2 ≈ 1.4142i. The calculator shows this imaginary result for negative inputs." },
      { q: "What is the difference between a square root and a cube root?", a: "A square root multiplied by itself gives the number (√64 = 8, since 8 × 8 = 64); a cube root multiplied by itself three times does (∛64 = 4, since 4 × 4 × 4 = 64). Unlike square roots, cube roots of negative numbers are real: ∛−8 = −2." },
      { q: "How accurate is the calculator?", a: "It uses standard double-precision arithmetic, which is correct to about 15 significant digits, far more than the 10 decimal places you can display." },
    ],
  },
};
