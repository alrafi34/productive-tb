import { siteConfig } from "@/config/site";

export const rfPowerCalculatorConfig = {
  name: "RF Power Calculator",
  description: "Calculate and convert RF signal power between Watts, dBm, and dBW. Includes voltage-to-power conversion for RF engineering and wireless systems.",
  icon: "📻",
  category: "electrical",
  slug: "rf-power-calculator",
  seo: {
    title: "RF Power Calculator – Watts to dBm and dBW",
    description: "Convert RF power between watts, milliwatts, dBm and dBW, or find power from voltage across a 50 Ω or 75 Ω load, with the steps shown.",
    keywords: [
      "RF power calculator",
      "dBm to watts converter",
      "watts to dBm calculator",
      "dBW converter",
      "RF engineering calculator",
      "wireless power calculator",
      "signal power calculator",
      "telecommunications calculator",
      "radio frequency calculator",
      "antenna power calculator"
    ],
    og: {
      title: "RF Power Calculator – Watts to dBm and dBW",
      description: "Convert RF power between watts, milliwatts, dBm and dBW, or find power from voltage across a 50 Ω or 75 Ω load, with the steps shown.",
      url: `${siteConfig.url}/tools/electrical/rf-power-calculator`,
    },
    howToSteps: [
      { name: "Choose what you know", text: "Select watts, dBm, dBW or voltage and resistance." },
      { name: "Enter the value", text: "Type the power, or the RMS voltage and load resistance." },
      { name: "Read the conversions", text: "See the power in watts, milliwatts, dBm and dBW." },
      { name: "Check the steps", text: "Review the formulas used, or pick a preset for common power levels." },
    ],
    faq: [
      { q: "How do I convert watts to dBm?", a: "dBm = 10 × log₁₀(P in mW). 1 W is 30 dBm, 100 mW is 20 dBm and 10 W is 40 dBm. Going back, P(mW) = 10^(dBm ÷ 10)." },
      { q: "What is the difference between dBm and dBW?", a: "dBm is referenced to 1 milliwatt and dBW to 1 watt, so dBW = dBm − 30. 30 dBm and 0 dBW are both 1 W." },
      { q: "How do I find power from voltage?", a: "P = V² ÷ R, using the RMS voltage across the load. 10 V RMS across 50 Ω is 2 W, or 33 dBm." },
      { q: "Why use dB units for RF?", a: "RF levels span from picowatts to kilowatts. Decibels compress that range, and gains and losses simply add and subtract." },
      { q: "How much power does a Wi-Fi router transmit?", a: "Typically up to about 100 mW (20 dBm) at 2.4 GHz. Limits depend on the band and the regulator, such as the FCC in the US and ETSI rules in Europe." },
    ],
  },
};
