import { siteConfig } from "@/config/site";

export const currentDividerCalculatorConfig = {
  name: "Current Divider Calculator",
  description: "Calculate current distribution in parallel circuits instantly. Free Current Divider Calculator for electrical engineering students and professionals.",
  icon: "⚡",
  category: "electrical",
  slug: "current-divider-calculator",
  seo: {
    title: "Current Divider Calculator – Parallel Branch Current",
    description: "Calculate how current splits between parallel resistors with the current divider rule, with each branch's current, share and power.",
    keywords: [
      "current divider calculator",
      "parallel circuit calculator", 
      "electrical current distribution",
      "current division rule",
      "parallel resistor current",
      "circuit analysis tool",
      "electrical engineering calculator",
      "branch current calculator",
      "parallel circuit analysis",
      "current sharing calculator"
    ],
    og: {
      title: "Current Divider Calculator – Parallel Branch Current",
      description: "Calculate how current splits between parallel resistors with the current divider rule, with each branch's current, share and power.",
      url: `${siteConfig.url}/tools/electrical/current-divider-calculator`,
    },
    howToSteps: [
      { name: "Enter the total current", text: "Type the current flowing into the parallel network, in amperes." },
      { name: "Add the resistors", text: "Type each branch resistance and choose Ω, kΩ or MΩ." },
      { name: "Add more branches", text: "Click Add Resistor for up to 10 parallel branches, or start from a preset." },
      { name: "Read the results", text: "See each branch current, its share of the total and its power, with the total power and the steps." },
    ],
    faq: [
      { q: "What is the current divider rule?", a: "In parallel, each branch takes a share of the current in proportion to its conductance: Ik = Itotal × (1/Rk) ÷ Σ(1/R). For two resistors, I1 = Itotal × R2 ÷ (R1 + R2)." },
      { q: "Can you give an example?", a: "10 mA into 1 kΩ and 3 kΩ in parallel: the 1 kΩ branch carries 10 × 3 ÷ 4 = 7.5 mA and the 3 kΩ branch 2.5 mA. The voltage across both is 7.5 V." },
      { q: "Why does the smaller resistor carry more current?", a: "All branches have the same voltage across them, and I = V ÷ R, so a lower resistance draws more current." },
      { q: "Does this work for AC?", a: "For purely resistive circuits, yes. With capacitors or inductors use impedances, which are complex numbers." },
      { q: "How do I make parallel parts share current equally?", a: "Use equal resistances with tight tolerance, or add small ballast resistors in each branch, as is done with parallel LEDs and transistors." },
    ],
  },
};