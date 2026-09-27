import { siteConfig } from "@/config/site";

export const shortCircuitCurrentCalculatorConfig = {
  name: "Short Circuit Current Calculator",
  description: "Calculate fault current levels in electrical systems for circuit breaker selection, protective relay settings, and safety analysis.",
  icon: "⚡",
  category: "electrical",
  slug: "short-circuit-current-calculator",
  seo: {
    title: "Short Circuit Current Calculator – 1-Phase & 3-Phase",
    description: "Calculate prospective short circuit current from system voltage and impedance for single-phase and three-phase bolted faults, in A and kA.",
    keywords: [
      "short circuit current calculator",
      "fault current calculator",
      "electrical engineering calculator",
      "three phase short circuit calculation",
      "power system fault current tool",
      "circuit breaker sizing calculator",
      "electrical fault analysis",
      "system impedance calculator",
      "protective relay calculator",
      "arc flash calculator"
    ],
    og: {
      title: "Short Circuit Current Calculator – 1-Phase & 3-Phase",
      description: "Calculate prospective short circuit current from system voltage and impedance for single-phase and three-phase bolted faults, in A and kA.",
      url: `${siteConfig.url}/tools/electrical/short-circuit-current-calculator`,
    },
    howToSteps: [
      { name: "Enter the voltage", text: "Type the line-to-line voltage for three-phase systems (208, 400 or 480 V), or the supply voltage for single-phase (120, 230 or 240 V)." },
      { name: "Enter the impedance", text: "Type the impedance per phase for three-phase, or the loop impedance for single-phase, including source, transformer and cable." },
      { name: "Choose the system type", text: "Select single-phase or three-phase." },
      { name: "Read the fault current", text: "See the prospective short circuit current in A or kA, its level and the calculation steps." },
    ],
    faq: [
      { q: "How is three-phase short circuit current calculated?", a: "Isc = VLL ÷ (√3 × Z), with Z the impedance per phase. 400 V with 0.2 Ω per phase gives 400 ÷ (1.732 × 0.2) = 1,155 A; 480 V with 0.02 Ω gives about 13.9 kA." },
      { q: "How is single-phase short circuit current calculated?", a: "Isc = V ÷ Z, with Z the loop impedance out and back. 230 V with a 0.5 Ω loop gives 460 A." },
      { q: "Why does short circuit current matter?", a: "Breakers and fuses must have an interrupting rating (kA) above the prospective fault current, cables and busbars must withstand it, and it sets the arc flash hazard." },
      { q: "How do I find the system impedance?", a: "Add the source impedance from the utility's fault level, the transformer impedance (Z% × VLL² ÷ S) and the cable impedance from its length and size. Utilities publish or supply the fault level at your service." },
      { q: "How accurate is this?", a: "It is a bolted fault estimate with impedance magnitudes added directly, which is slightly conservative. Motor contribution, X/R ratio and asymmetrical peak current need a full study." },
    ],
  },
};