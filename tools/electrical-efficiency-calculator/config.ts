import { siteConfig } from "@/config/site";

export const electricalEfficiencyCalculatorConfig = {
  name: "Electrical Efficiency Calculator",
  description: "Calculate system efficiency by comparing output power vs input power. Get instant results with efficiency analysis and power loss calculations.",
  icon: "⚡",
  category: "electrical",
  slug: "electrical-efficiency-calculator",
  seo: {
    title: "Efficiency Calculator – Output ÷ Input Power",
    description: "Calculate electrical efficiency from input and output power in W, kW or MW, with the power loss and a rating for motors, supplies and inverters.",
    keywords: [
      "electrical efficiency calculator",
      "efficiency formula calculator",
      "power efficiency tool",
      "watt efficiency calculator",
      "electrical engineering calculator",
      "motor efficiency calculator",
      "power loss calculator",
      "energy efficiency calculator",
      "system efficiency analysis",
      "electrical system performance"
    ],
    og: {
      title: "Efficiency Calculator – Output ÷ Input Power",
      description: "Calculate electrical efficiency from input and output power in W, kW or MW, with the power loss and a rating for motors, supplies and inverters.",
      url: `${siteConfig.url}/tools/electrical/electrical-efficiency-calculator`,
    },
    howToSteps: [
      { name: "Enter the input power", text: "Type the power the device draws and choose W, kW or MW." },
      { name: "Enter the output power", text: "Type the useful power it delivers, in any unit." },
      { name: "Set the precision", text: "Choose how many decimal places to show." },
      { name: "Read the results", text: "See the efficiency percentage, the power lost as heat and a rating, with a power flow diagram." },
    ],
    faq: [
      { q: "How is efficiency calculated?", a: "Efficiency = output power ÷ input power × 100. A motor that draws 10 kW and delivers 9.2 kW of shaft power is 92% efficient; the other 0.8 kW is lost as heat." },
      { q: "Can efficiency be more than 100%?", a: "No. Energy cannot be created, so a result above 100% means a measurement error, such as mixed units or reading apparent power (VA) instead of real power (W)." },
      { q: "How do I measure input and output power?", a: "Use a true-RMS power meter that reads watts, so the power factor is included. For motors, output is shaft power; for supplies and inverters, it is the power delivered to the load." },
      { q: "What efficiency is typical?", a: "Transformers 95–99%, solar inverters 95–98%, switching power supplies 85–95%, and electric motors about 85–96%, higher for larger and premium-efficiency (IE3/IE4, NEMA Premium) motors." },
      { q: "Does efficiency change with load?", a: "Yes. Most equipment is most efficient near 50–100% of its rating and much less efficient at light load." },
    ],
  },
};