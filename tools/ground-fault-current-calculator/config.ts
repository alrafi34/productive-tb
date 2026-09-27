import { siteConfig } from "@/config/site";

export const groundFaultCurrentCalculatorConfig = {
  name: "Ground Fault Current Calculator",
  description: "Calculate ground fault current instantly using voltage and impedance. Free online electrical engineering calculator for fault analysis, safety design, and industrial applications.",
  icon: "⚡",
  category: "electrical",
  slug: "ground-fault-current-calculator",
  seo: {
    title: "Ground Fault Current Calculator – Earth Fault Loop",
    description: "Calculate prospective ground (earth) fault current from phase-to-ground voltage and fault loop impedance, or from source, cable and transformer data.",
    keywords: [
      "ground fault current calculator",
      "fault current calculator",
      "electrical fault current tool",
      "ohms law calculator",
      "earth fault current calculation",
      "electrical safety calculator",
      "fault analysis tool",
      "electrical engineering calculator",
      "short circuit current calculator",
      "electrical protection calculator"
    ],
    og: {
      title: "Ground Fault Current Calculator – Earth Fault Loop",
      description: "Calculate prospective ground (earth) fault current from phase-to-ground voltage and fault loop impedance, or from source, cable and transformer data.",
      url: `${siteConfig.url}/tools/electrical/ground-fault-current-calculator`,
    },
    howToSteps: [
      { name: "Choose the mode", text: "Use basic mode if you know the total fault loop impedance Zs, or advanced mode to add up source, cable and transformer impedances." },
      { name: "Enter the voltage to ground", text: "Type the phase-to-ground voltage U₀: 120 V or 277 V in the US, 230 V in the UK and Europe." },
      { name: "Enter the impedances", text: "Type Zs, or the source impedance, the cable loop impedance (phase plus ground conductor), and the transformer's % impedance and kVA." },
      { name: "Read the fault current", text: "See the prospective ground fault current, its level and the calculation steps." },
    ],
    faq: [
      { q: "How is ground fault current calculated?", a: "I = U₀ ÷ Zs, where U₀ is the voltage to ground and Zs the whole fault loop impedance. A 230 V circuit with Zs = 0.8 Ω gives 287.5 A; a 120 V circuit with 0.4 Ω gives 300 A." },
      { q: "Why use voltage to ground, not line-to-line?", a: "A ground fault drives current from one phase back through the ground path, so the voltage across the loop is the phase-to-ground voltage: 230 V on a 400/230 V system, 277 V on 480Y/277 V." },
      { q: "What is fault loop impedance (Zs)?", a: "The impedance of the whole path the fault current takes: the supply transformer, the phase conductor to the fault, and the protective ground conductor back. Electricians measure it with a loop impedance tester." },
      { q: "Why does ground fault current matter?", a: "The protective device must trip fast enough. A type B 32 A breaker needs at least 5 × 32 = 160 A to trip instantly, so at 230 V the loop impedance must be below about 1.4 Ω (BS 7671 lists 1.37 Ω)." },
      { q: "How is a transformer's % impedance converted to ohms?", a: "Per phase, Z = Z% ÷ 100 × VLL² ÷ S. A 100 kVA, 400 V transformer with 4% impedance is 0.04 × 400² ÷ 100,000 = 0.064 Ω." },
    ],
  },
};