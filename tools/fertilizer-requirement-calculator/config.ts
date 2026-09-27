import { siteConfig } from "@/config/site";

export const fertilizerRequirementCalculatorConfig = {
  name: "Fertilizer Requirement Calculator",
  slug: "fertilizer-requirement-calculator",
  description: "Calculate fertilizer requirements for crops based on land size, crop type, and nutrient needs. Estimate Urea, DAP, NPK, and more with instant calculations.",
  category: "land",
  icon: "🌾",
  free: true,
  seo: {
    title: "Fertilizer Calculator – How Much per Acre?",
    description: "Work out how much urea, DAP, potash or NPK fertilizer a field needs from its area, crop and nutrient targets, in kg and lb, with cost in your currency.",
    keywords: [
      "fertilizer calculator",
      "fertilizer requirement calculator", 
      "crop fertilizer calculator",
      "NPK calculator",
      "urea fertilizer calculator",
      "fertilizer estimation tool",
      "agriculture calculator",
      "crop nutrition calculator",
      "farm fertilizer calculator",
      "soil nutrient calculator",
    ],
    og: {
      title: "Fertilizer Requirement Calculator – Estimate Fertilizer for Crops Online",
      description: "Calculate fertilizer requirements instantly for crops based on land size, crop type, and nutrient needs. Free agricultural calculator.",
      url: `${siteConfig.url}/tools/land/fertilizer-requirement-calculator`,
    },
    howToSteps: [
      { name: "Enter the area", text: "Type the field size in acres, hectares, square feet or square meters." },
      { name: "Pick the crop", text: "Choose a crop to fill typical nitrogen, phosphate and potash targets, or enter your own from a soil test." },
      { name: "Pick the fertilizer", text: "Choose urea, DAP, MOP (potash), an NPK blend, compost or a custom analysis." },
      { name: "Add the price", text: "Optionally enter the price per kg and your currency." },
      { name: "Read the amounts", text: "See the fertilizer needed per acre and in total, the cost and application tips." },
    ],
    faq: [
      { q: "How do I calculate how much fertilizer to apply?", a: "Fertilizer = nutrient needed ÷ nutrient share of the product. To supply 60 kg of nitrogen per acre with urea (46% N): 60 ÷ 0.46 = 130 kg of urea per acre (287 lb)." },
      { q: "What do the numbers on a fertilizer bag mean?", a: "The N-P-K grade: percent nitrogen, phosphate (P₂O₅) and potash (K₂O) by weight. A 50 lb bag of 10-10-10 contains 5 lb of each." },
      { q: "How much nitrogen does corn or wheat need?", a: "US extension guidance is roughly 150–180 lb N per acre for corn after soybeans or with good yield goals, and 90–120 lb for wheat, adjusted for soil tests, previous crops and manure. The presets use the middle of these ranges and are starting points only." },
      { q: "Why should I soil test first?", a: "Many fields already hold enough phosphorus and potassium, and over-applying wastes money and pollutes water. A soil test every 2–4 years sets the real rates." },
      { q: "How do I convert kg per acre to lb per acre or kg per hectare?", a: "1 kg/acre = 2.205 lb/acre = 2.471 kg/ha. 60 kg N/acre is 132 lb/acre or 148 kg/ha." },
    ],
  },
};