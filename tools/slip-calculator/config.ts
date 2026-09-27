import { siteConfig } from "@/config/site";

export const slipCalculatorConfig = {
  name: "Slip Calculator",
  description: "Calculate slip in induction motors using synchronous speed and rotor speed.",
  icon: "⚡",
  category: "electrical",
  slug: "slip-calculator",
  seo: {
    title: "Motor Slip Calculator – Induction Motor Slip %",
    description: "Calculate induction motor slip from synchronous and rotor speed, or find synchronous speed from 50 or 60 Hz and the number of poles.",
    keywords: [
      "slip calculator",
      "induction motor slip formula",
      "calculate slip rpm",
      "electrical engineering calculator",
      "motor slip percentage",
      "synchronous speed calculator",
      "rotor speed calculator",
      "AC motor slip",
      "motor slip analysis",
      "electrical motor calculator"
    ],
    og: {
      title: "Motor Slip Calculator – Induction Motor Slip %",
      description: "Calculate induction motor slip from synchronous and rotor speed, or find synchronous speed from 50 or 60 Hz and the number of poles.",
      url: `${siteConfig.url}/tools/electrical/slip-calculator`
    },
    howToSteps: [
      { name: "Enter the synchronous speed", text: "Type Ns in RPM, or let the calculator work it out from the frequency and number of poles." },
      { name: "Enter the rotor speed", text: "Type the measured or nameplate rotor speed Nr in RPM, or pick a preset." },
      { name: "Read the slip", text: "See the slip as a decimal and a percentage, with what the value means." },
    ],
    faq: [
      { q: "How is slip calculated?", a: "Slip = (Ns − Nr) ÷ Ns × 100%. A 4-pole, 60 Hz motor with Ns = 1,800 RPM running at 1,750 RPM has 2.8% slip; a 4-pole, 50 Hz motor at 1,440 RPM against 1,500 RPM has 4%." },
      { q: "What is normal slip?", a: "About 2–5% at full load for standard motors, less for large and premium-efficiency motors, and close to zero at no load." },
      { q: "Can slip be zero?", a: "Not in an induction motor, because torque needs the rotor to run slower than the field. Synchronous motors run at zero slip." },
      { q: "What causes high slip?", a: "Overload, low supply voltage, broken rotor bars or high rotor resistance. It makes the rotor run hotter." },
      { q: "How are slip and torque related?", a: "In the normal operating range torque rises roughly in proportion to slip, up to the breakdown torque, beyond which the motor stalls." },
    ],
  }
};
