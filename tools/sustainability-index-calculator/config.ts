export const sustainabilityIndexCalculatorConfig = {
  name: "Sustainability Index Calculator",
  slug: "sustainability-index-calculator",
  category: "architecture",
  description: "Calculate building sustainability score instantly. Evaluate energy, water, materials, and environmental impact with this free sustainability index calculator.",
  icon: "🌱",
  color: "#058554",
  featured: false,
  keywords: [
    "sustainability calculator",
    "building sustainability score",
    "green building tool",
    "energy efficiency calculator",
    "architecture sustainability index",
    "environmental impact calculator",
    "sustainable building assessment"
  ],
  seo: {
    title: "Sustainability Index Calculator – Green Building Score",
    description: "Score a building's sustainability from energy, water, materials, waste and indoor environment, weighted into a 0–100 index with improvement tips.",
    keywords: "sustainability calculator, building sustainability score, green building tool, energy efficiency calculator, architecture sustainability index",
    og: {
      title: "Sustainability Index Calculator – Evaluate Building Sustainability",
      description: "Assess building environmental performance with instant sustainability scoring. Free online tool for architects and engineers.",
      type: "website",
      url: "/tools/architecture/sustainability-index-calculator"
    },
    howToSteps: [
      { name: "Score energy", text: "Rate energy efficiency from 0 to 100, or start from a preset building type." },
      { name: "Score the other areas", text: "Rate water efficiency, materials, waste management and indoor environmental quality." },
      { name: "Read the index", text: "See the weighted index, its rating and each category's contribution." },
      { name: "Improve", text: "Use the suggestions to find which improvements raise the score most." },
    ],
    faq: [
      { q: "How is the sustainability index calculated?", a: "Each area is scored from 0 to 100 and weighted: energy 30%, water 20%, materials 20%, waste 15% and indoor environment 15%. Scores of 80, 60, 70, 50 and 70 give 0.3 × 80 + 0.2 × 60 + 0.2 × 70 + 0.15 × 50 + 0.15 × 70 = 68." },
      { q: "What is a good score?", a: "70 or more indicates strong performance, roughly in line with buildings that pursue green certification; 40–69 is moderate and below 40 needs attention." },
      { q: "Is this the same as LEED or BREEAM?", a: "No. LEED (US Green Building Council), BREEAM (UK) and DGNB (Germany) are formal certification systems with detailed credits and third-party assessment. This index is a quick self-assessment to compare options and prepare for them." },
      { q: "Why does energy have the largest weight?", a: "Operating energy is usually the largest source of a building's lifetime carbon emissions and running costs; buildings account for roughly a third of global energy-related CO₂ emissions." },
      { q: "How do I score each area?", a: "Compare the building with good practice: code-minimum insulation and systems might score 50 for energy, a very efficient or net-zero building 90–100. The presets give starting points for common building types." },
    ],
  },
  relatedTools: [
    "green-building-score-calculator",
    "energy-efficiency-calculator-building",
    "carbon-footprint-calculator-construction"
  ]
};

export const toolConfig = sustainabilityIndexCalculatorConfig;
