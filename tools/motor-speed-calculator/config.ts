import { siteConfig } from "@/config/site";

export const motorSpeedCalculatorConfig = {
  name: "Motor Speed Calculator",
  description: "Calculate motor speed (RPM) from frequency, number of poles, and slip percentage.",
  icon: "⚙️",
  category: "electrical",
  slug: "motor-speed-calculator",
  seo: {
    title: "Motor Speed Calculator – RPM from Frequency & Poles",
    description: "Calculate an AC induction motor's synchronous speed and actual RPM from supply frequency (50 or 60 Hz), number of poles and slip.",
    keywords: [
      "motor speed calculator",
      "RPM calculator",
      "synchronous speed formula",
      "motor RPM calculation",
      "electrical motor speed",
      "induction motor speed",
      "motor slip calculator",
      "AC motor speed",
      "motor frequency calculator",
      "electric motor RPM"
    ],
    og: {
      title: "Motor Speed Calculator – RPM from Frequency & Poles",
      description: "Calculate an AC induction motor's synchronous speed and actual RPM from supply frequency (50 or 60 Hz), number of poles and slip.",
      url: `${siteConfig.url}/tools/electrical/motor-speed-calculator`
    },
    howToSteps: [
      { name: "Enter the frequency", text: "Type the supply frequency: 60 Hz in North America, 50 Hz in Europe, the UK and most other countries, or the output frequency of a VFD." },
      { name: "Choose the poles", text: "Select 2, 4, 6, 8, 10 or 12 poles." },
      { name: "Set the slip", text: "Use the slider for the slip, typically 2–5% at full load." },
      { name: "Read the speeds", text: "See the synchronous and actual speed in RPM or rad/s, with the calculation steps." },
    ],
    faq: [
      { q: "How do I calculate motor speed?", a: "Synchronous speed Ns = 120 × f ÷ poles, and actual speed = Ns × (1 − slip). A 4-pole motor at 60 Hz has Ns = 1,800 RPM, so 3% slip gives 1,746 RPM; at 50 Hz, 1,500 and 1,455 RPM." },
      { q: "Why does an induction motor run below synchronous speed?", a: "The rotor needs to slip behind the rotating field so that current is induced in it; at synchronous speed there would be no induced current and no torque." },
      { q: "What slip is typical?", a: "About 2–5% at full load for standard motors, less for large and premium-efficiency motors. Slip rises with load." },
      { q: "How many poles do I need?", a: "Fewer poles mean higher speed: 2 poles run near 3,600 RPM at 60 Hz (3,000 at 50 Hz), 4 poles near 1,800 (1,500), 6 poles near 1,200 (1,000)." },
      { q: "Can I change the speed with frequency?", a: "Yes. A variable frequency drive changes the supply frequency, and the speed changes in proportion: the same 4-pole motor runs at about 900 RPM on 30 Hz." },
    ],
  }
};
