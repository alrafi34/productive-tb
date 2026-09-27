export const cementCalculatorConfig = {
  name: "Cement Calculator",
  slug: "cement-calculator",
  description: "Free online cement calculator to estimate cement required for concrete, slabs, plaster, and brickwork. Get instant results with accurate formulas.",
  category: "architecture",
  icon: "🏗️",
  free: true,
  seo: {
    title: "Cement Calculator – Bags for Concrete, Mortar & Plaster",
    description: "Work out cement bags, sand and gravel for concrete, brick mortar or plaster from the volume or area and mix ratio. Bags of 50 kg, 25 kg or US 94 lb.",
    keywords: [
      "cement calculator",
      "construction calculator",
      "concrete mix calculator",
      "cement bags calculation",
      "building materials estimator",
      "cement quantity calculator",
      "concrete calculator",
      "plaster calculator",
      "mortar calculator",
      "construction material calculator"
    ],
    openGraph: {
      title: "Cement Calculator – Calculate Cement Bags for Concrete, Plaster & Mortar",
      description: "Calculate exact amount of cement needed for construction projects with accurate formulas.",
      type: "website",
      url: "/tools/architecture/cement-calculator"
    },
    howToSteps: [
      { name: "Choose the job", text: "Select concrete, plaster or brick mortar." },
      { name: "Choose the unit", text: "Select feet or meters." },
      { name: "Enter the size", text: "Type length, width and thickness for concrete, or area and thickness for plaster and mortar." },
      { name: "Pick the mix ratio", text: "Choose a preset such as 1:2:4 for concrete or 1:4 for plaster, or enter your own." },
      { name: "Read the materials", text: "See cement in 50 kg bags with the 25 kg and US 94 lb equivalents, and the sand and gravel volumes." },
    ],
    faq: [
      { q: "How many bags of cement for a cubic meter of concrete?", a: "For a 1:2:4 mix, about 6.3 bags of 50 kg (317 kg), 12.7 bags of 25 kg or 7.4 US bags of 94 lb. A 1:1.5:3 mix needs about 8 bags of 50 kg." },
      { q: "How is the cement quantity worked out?", a: "Dry volume = wet volume × 1.54, cement volume = dry volume × cement parts ÷ total parts, and one 50 kg bag holds about 0.035 m³. A US 94 lb bag of portland cement holds 1 cubic foot. For mortar and plaster many estimators use a dry factor of 1.27–1.33 instead of 1.54, so the result errs on the generous side." },
      { q: "What mix ratio should I use for plaster and mortar?", a: "1:4 to 1:6 cement:sand for internal plaster and 1:3 to 1:4 for external render. For brick mortar, 1:5 or 1:6 for general walls and 1:3–1:4 for strong or below-ground work; in the US, Type N or S mortar is usually bought premixed." },
      { q: "How many 94 lb bags are in a cubic yard of concrete?", a: "About 5.7 bags for a 1:2:4 mix and about 7.2 for 1:1.5:3. Ready-mix suppliers specify it by strength instead, such as 3,000 or 4,000 psi." },
      { q: "Can I use this for bagged premix concrete?", a: "No. Premix already contains cement, sand and gravel; divide the volume by the bag yield instead (about 0.6 cu ft per 80 lb bag)." },
    ],
  },
  features: [
    "Multiple calculation modes",
    "Real-time calculations",
    "Mix ratio presets",
    "Unit conversion",
    "Sand & aggregate estimates",
    "Calculation history",
    "Export functionality",
    "Mobile responsive"
  ]
};
