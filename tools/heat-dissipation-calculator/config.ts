import { siteConfig } from "@/config/site";

export const heatDissipationCalculatorConfig = {
  name: "Heat Dissipation Calculator",
  description: "Calculate heat dissipation in electrical circuits instantly using voltage, current, or resistance. Free online electrical power loss calculator for engineers and students.",
  icon: "🔥",
  category: "electrical",
  slug: "heat-dissipation-calculator",
  seo: {
    title: "Heat Dissipation Calculator – Watts and BTU/h",
    description: "Calculate the heat a resistor, wire or circuit dissipates from voltage, current or resistance (P = VI, V²/R, I²R), in watts and BTU/h.",
    keywords: [
      "heat dissipation calculator",
      "power loss calculator",
      "electrical power calculator",
      "joule heating calculator",
      "circuit heat calculator",
      "electrical engineering tools",
      "thermal analysis calculator",
      "power dissipation calculator",
      "electrical heat generation",
      "circuit thermal calculator"
    ],
    og: {
      title: "Heat Dissipation Calculator – Watts and BTU/h",
      description: "Calculate the heat a resistor, wire or circuit dissipates from voltage, current or resistance (P = VI, V²/R, I²R), in watts and BTU/h.",
      url: `${siteConfig.url}/tools/electrical/heat-dissipation-calculator`,
    },
    howToSteps: [
      { name: "Choose what you know", text: "Select V × I, V² ÷ R, I² × R, or enter the power directly." },
      { name: "Enter the values", text: "Type the voltage, current or resistance for the method you chose." },
      { name: "Set the precision", text: "Choose how many decimal places to show." },
      { name: "Read the heat", text: "See the heat dissipated in watts and BTU/h, the other circuit values and the heat level." },
    ],
    faq: [
      { q: "How is heat dissipation calculated?", a: "Electrical power turned into heat: P = V × I = V² ÷ R = I² × R. 12 V at 2 A is 24 W; 10 A through 0.05 Ω of wire is 10² × 0.05 = 5 W." },
      { q: "How do I convert watts to BTU/h?", a: "Multiply by 3.412. 24 W is about 82 BTU/h, and 1 kW is 3,412 BTU/h, which is how HVAC engineers size cooling for equipment rooms." },
      { q: "Does all electrical power become heat?", a: "In a resistor, yes. In a motor, light or amplifier, the useful output leaves as work, light or sound and only the losses heat the device, although in a closed room nearly all of it ends up as heat." },
      { q: "How do I choose a resistor's power rating?", a: "Pick a rating at least twice the calculated dissipation: a resistor dissipating 0.2 W should be rated 0.5 W or more, and more if it is enclosed or hot." },
      { q: "What temperature rise will I get?", a: "Temperature rise = power × thermal resistance. Use the heatsink calculator with the component's thermal resistance to find the temperature." },
    ],
  },
};